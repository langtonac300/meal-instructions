/**
 * Kroger authorization_code flow — the shopper-facing half of the integration.
 *
 * Required because the token endpoint refuses `cart.basic:write` for
 * client_credentials ("scope cart.basic:write cannot be used for grant_type
 * client_credentials"). Carting is always done as an individual shopper, with
 * their own Kroger login, never as the site.
 *
 * The redirect URI must byte-match what is registered in the Kroger developer
 * portal, in both the /authorize redirect and the token exchange. It is
 * registered as the www host; the apex 308-redirects to www, and a redirect
 * mid-flow breaks the exchange.
 */

import { randomBytes } from 'node:crypto';

const AUTHORIZE_URL = 'https://api.kroger.com/v1/connect/oauth2/authorize';
const TOKEN_URL = 'https://api.kroger.com/v1/connect/oauth2/token';

export const CART_SCOPE = 'cart.basic:write';

/** Cookie names. All httpOnly — none of these may be readable from client JS. */
export const COOKIE = {
  state: 'kroger_oauth_state',
  accessToken: 'kroger_access_token',
  refreshToken: 'kroger_refresh_token',
  returnTo: 'kroger_return_to',
} as const;

export function getRedirectUri(): string {
  return (
    process.env.KROGER_REDIRECT_URI ??
    'https://www.mealinstructions.com/api/kroger/callback'
  );
}

function basicAuthHeader(): string {
  const id = process.env.KROGER_CLIENT_ID;
  const secret = process.env.KROGER_CLIENT_SECRET;
  if (!id || !secret) throw new Error('KROGER_CLIENT_ID / KROGER_CLIENT_SECRET are not set');
  return `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`;
}

/** Opaque, single-use CSRF token tying the callback to the request that began it. */
export function createState(): string {
  return randomBytes(32).toString('hex');
}

export function buildAuthorizeUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.KROGER_CLIENT_ID ?? '',
    redirect_uri: getRedirectUri(),
    response_type: 'code',
    scope: CART_SCOPE,
    state,
  });
  return `${AUTHORIZE_URL}?${params}`;
}

export interface KrogerTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

async function tokenRequest(body: string): Promise<KrogerTokens> {
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: basicAuthHeader(),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!res.ok) {
    throw new Error(`Kroger token exchange failed: ${res.status} ${(await res.text()).slice(0, 200)}`);
  }

  const json = (await res.json()) as {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  };
  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token,
    expiresIn: json.expires_in,
  };
}

export function exchangeCodeForTokens(code: string): Promise<KrogerTokens> {
  return tokenRequest(
    new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: getRedirectUri(),
    }).toString(),
  );
}

export function refreshAccessToken(refreshToken: string): Promise<KrogerTokens> {
  return tokenRequest(
    new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }).toString(),
  );
}

export interface CartItem {
  upc: string;
  quantity: number;
}

/**
 * Adds items to the signed-in shopper's Kroger cart.
 *
 * Returns 204 with no body on success. The token belongs to the shopper, not
 * to the site — it must come from the authorization_code flow above.
 */
export async function addToCart(accessToken: string, items: CartItem[]): Promise<void> {
  const res = await fetch('https://api.kroger.com/v1/cart/add', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items }),
  });

  if (!res.ok) {
    throw new Error(`Kroger cart/add failed: ${res.status} ${(await res.text()).slice(0, 200)}`);
  }
}
