/**
 * Reads the build-time ingredient → product cache.
 *
 * Server-only, and deliberately not imported from any client component: the
 * cache covers all 554 ingredient strings across the whole recipe corpus, and
 * shipping that to the browser for a single recipe page would be absurd. Pages
 * resolve just their own ingredients here and pass the result down as props.
 */

import cache from '@/data/kroger-matches.generated.json';

export interface CachedProduct {
  productId: string;
  upc?: string;
  description: string;
  category?: string;
  brand?: string;
  size?: string;
  matchedQuery: string;
  score: number;
}

interface MatchCache {
  generatedAt: string;
  ingredients: Record<string, CachedProduct[]>;
}

const MATCHES = (cache as MatchCache).ingredients ?? {};

export interface ResolvedIngredient {
  /** The recipe's own wording, always shown to the reader. */
  item: string;
  /** Kroger products for this line. Empty means no confident match. */
  products: CachedProduct[];
}

export function resolveIngredients(items: string[]): ResolvedIngredient[] {
  return items.map((item) => ({ item, products: MATCHES[item] ?? [] }));
}

/** True when at least one ingredient resolved — used to hide the panel entirely. */
export function hasAnyMatch(resolved: ResolvedIngredient[]): boolean {
  return resolved.some((r) => r.products.length > 0);
}
