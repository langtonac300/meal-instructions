/**
 * Server-side Kroger API client.
 *
 * Scope note, established empirically rather than from the docs: the token
 * endpoint rejects `cart.basic:write` for client_credentials outright —
 * "scope cart.basic:write cannot be used for grant_type client_credentials".
 * Only product/location data is reachable server-to-server. Anything touching
 * a cart needs an authorization_code token belonging to an individual shopper,
 * so it cannot live in this module.
 *
 * Credentials are read from the environment and must never reach the client
 * bundle — nothing here is safe to import from a component.
 */

import { normalizeIngredient, relaxationLadder } from './normalize';
import { scoreCandidates, type Candidate, type ScoredMatch } from './match';

const TOKEN_URL = 'https://api.kroger.com/v1/connect/oauth2/token';
const API = 'https://api.kroger.com/v1';

let cachedToken: { value: string; expiresAt: number } | null = null;

export async function getAccessToken(): Promise<string> {
  const id = process.env.KROGER_CLIENT_ID;
  const secret = process.env.KROGER_CLIENT_SECRET;
  if (!id || !secret) {
    throw new Error('KROGER_CLIENT_ID / KROGER_CLIENT_SECRET are not set');
  }

  // Tokens last 30 minutes; refresh a minute early to avoid a race at the edge.
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.value;
  }

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&scope=product.compact',
  });

  if (!res.ok) {
    throw new Error(`Kroger token request failed: ${res.status} ${await res.text()}`);
  }

  const json = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    value: json.access_token,
    expiresAt: Date.now() + json.expires_in * 1000,
  };
  return cachedToken.value;
}

/** Minimum gap between requests. Kroger throttles aggressively on bulk runs. */
const MIN_REQUEST_INTERVAL_MS = 120;
let lastRequestAt = 0;

async function pace(): Promise<void> {
  const wait = lastRequestAt + MIN_REQUEST_INTERVAL_MS - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastRequestAt = Date.now();
}

/**
 * GETs a Kroger endpoint, retrying transient failures.
 *
 * Returning [] on a non-OK response makes a rate limit look identical to
 * "no such product", which silently turns throttling into missing ingredients.
 * A bulk run over 554 ingredient strings is exactly where that bites: the
 * first pass abstained on "Fresh Parsley" purely because the request was
 * throttled, while the same lookup in isolation matched fine. Retry what is
 * worth retrying, and throw on anything else rather than inventing an
 * empty result.
 */
async function krogerGet(url: string, attempts = 5): Promise<any> {
  const token = await getAccessToken();

  for (let i = 0; i < attempts; i++) {
    await pace();
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) return res.json();

    const body = await res.text();

    // Under load the edge returns a bare nginx 404 HTML page rather than a JSON
    // error. A genuine "no such product" is a 200 with an empty data array, so
    // a 404 that isn't JSON is throttling in disguise — retry it.
    const isEdgeThrottle = res.status === 404 && !body.trimStart().startsWith('{');
    const retryable = res.status === 429 || res.status >= 500 || isEdgeThrottle;

    if (!retryable || i === attempts - 1) {
      throw new Error(`Kroger GET ${res.status} for ${url}: ${body.slice(0, 160)}`);
    }

    // Honour Retry-After when offered, otherwise exponential backoff.
    const retryAfter = Number(res.headers.get('retry-after'));
    const waitMs = Number.isFinite(retryAfter) && retryAfter > 0
      ? retryAfter * 1000
      : 500 * 2 ** i;
    await new Promise((r) => setTimeout(r, waitMs));
  }

  throw new Error(`Kroger GET exhausted retries: ${url}`);
}

export interface KrogerLocation {
  locationId: string;
  name: string;
  address?: string;
}

export async function findLocations(zipCode: string, limit = 5): Promise<KrogerLocation[]> {
  const url = `${API}/locations?filter.zipCode.near=${encodeURIComponent(zipCode)}&filter.limit=${limit}`;
  const json = (await krogerGet(url)) as { data?: Array<Record<string, any>> };
  return (json.data ?? []).map((l) => ({
    locationId: l.locationId,
    name: l.name,
    address: [l.address?.addressLine1, l.address?.city, l.address?.state].filter(Boolean).join(', '),
  }));
}

/**
 * `locationId` is optional. Without one Kroger returns the same products with
 * the same productIds — only store price and availability are missing. That is
 * what makes build-time resolution possible: ingredients resolve to stable
 * productIds once, and a store is only needed later to price or cart them.
 */
export async function searchProducts(
  term: string,
  locationId?: string,
  limit = 10,
): Promise<Candidate[]> {
  const loc = locationId ? `&filter.locationId=${locationId}` : '';
  const url = `${API}/products?filter.term=${encodeURIComponent(term)}${loc}&filter.limit=${limit}`;
  const json = (await krogerGet(url)) as { data?: Array<Record<string, any>> };
  return (json.data ?? []).map((p) => ({
    productId: p.productId,
    upc: p.upc,
    description: p.description,
    categories: p.categories,
    brand: p.brand,
    size: p.items?.[0]?.size,
  }));
}

export interface IngredientMatch {
  ingredient: string;
  /** One resolved product per distinct item in the ingredient line. */
  matches: ScoredMatch[];
  /** Queries that produced no confident match — surfaced, never silently dropped. */
  unmatched: string[];
}

/**
 * Resolves one recipe ingredient line to Kroger products.
 *
 * Walks the relaxation ladder and stops at the first query that yields a
 * confident match, so specific queries keep their specificity and only the
 * ones that genuinely fail get broadened.
 */
export async function matchIngredient(
  item: string,
  locationId?: string,
): Promise<IngredientMatch> {
  const { queries } = normalizeIngredient(item);
  const matches: ScoredMatch[] = [];
  const unmatched: string[] = [];

  for (const query of queries) {
    let found: ScoredMatch | null = null;

    for (const attempt of relaxationLadder(query)) {
      const candidates = await searchProducts(attempt, locationId);
      found = scoreCandidates(attempt, candidates);
      if (found) break;
    }

    if (found) matches.push(found);
    else unmatched.push(query);
  }

  return { ingredient: item, matches, unmatched };
}
