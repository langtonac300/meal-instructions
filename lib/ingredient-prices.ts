/**
 * Reads the build-time ingredient price cache and costs recipes with it.
 *
 * Server-only, and deliberately not imported from a client component — the
 * cache covers every ingredient in the corpus, and shipping all of it to the
 * browser to price one recipe would repeat the mistake `lib/kroger/matches.ts`
 * calls out. Pages cost their own recipe here and pass the result down.
 *
 * The cache is committed EMPTY until someone runs `npm run build:prices`
 * against a real store. Everything below is written so that state is normal,
 * not an error: `hasPrices()` is false, `costFor()` returns null, and the cost
 * surfaces render nothing at all. A site with no priced store shows no prices;
 * it never shows $0.
 */

import cache from '@/data/ingredient-prices.generated.json';
import { costRecipe, type IngredientPrice, type RecipeCost } from '@/lib/ingredient-cost';

interface PriceCache {
  generatedAt: string | null;
  locationId: string | null;
  prices: Record<string, IngredientPrice>;
}

const CACHE = cache as PriceCache;
const PRICES = CACHE.prices ?? {};

/** True once a store has been priced. Gate every cost surface on this. */
export function hasPrices(): boolean {
  return Object.keys(PRICES).length > 0;
}

/** Store and date behind the numbers, for the disclosure line. HR-2. */
export function priceProvenance(): { locationId: string; pricedOn: string } | null {
  if (!CACHE.locationId || !CACHE.generatedAt) return null;
  return { locationId: CACHE.locationId, pricedOn: CACHE.generatedAt };
}

interface CostableRecipe {
  ingredients: { item: string; qtyNumeric?: number | null; unit?: string | null }[];
  defaultServings?: number;
}

/**
 * Costs one recipe, or returns null when there is nothing to show.
 *
 * Null rather than a zeroed result in two cases, both of which would otherwise
 * put a misleading number on the page: no store has been priced at all, and
 * fewer than half this recipe's lines could be costed. A "$2.10+" built from
 * 3 of 14 ingredients is not a floor a reader can act on — it reads as the
 * price of the meal and is off by a factor of four.
 */
export function costFor(recipe: CostableRecipe): RecipeCost | null {
  if (!hasPrices()) return null;
  const servings = recipe.defaultServings && recipe.defaultServings > 0 ? recipe.defaultServings : 4;
  const cost = costRecipe(recipe.ingredients, servings, PRICES);
  if (cost.linesTotal === 0) return null;
  if (cost.linesCosted / cost.linesTotal < 0.5) return null;
  return cost;
}

/** `$3.40`, or `$3.40+` when some line could not be priced. */
export function formatCost(dollars: number, isFloor: boolean): string {
  return `$${dollars.toFixed(2)}${isFloor ? '+' : ''}`;
}

/**
 * The shape passed to a client component.
 *
 * Deliberately not `RecipeCost`: that carries a `lines` array with an entry per
 * ingredient, and none of it is rendered. Sending it would put the whole cost
 * breakdown in the page payload to display two strings.
 */
export interface RecipeCostSummary {
  /** Pre-formatted, e.g. "$3.40" or "$3.40+". */
  perServing: string;
  /** Pre-formatted total for the batch. */
  total: string;
  servings: number;
  /** How many lines went unpriced; 0 when the total is complete. */
  linesMissing: number;
  /** "Kroger store 01400513 · priced 6 Sep 2026" */
  provenance: string;
}

export function costSummaryFor(recipe: CostableRecipe): RecipeCostSummary | null {
  const cost = costFor(recipe);
  if (!cost) return null;
  const prov = priceProvenance();
  const servings = recipe.defaultServings && recipe.defaultServings > 0 ? recipe.defaultServings : 4;
  return {
    perServing: formatCost(cost.perServing, cost.isFloor),
    total: formatCost(cost.dollars, cost.isFloor),
    servings,
    linesMissing: cost.linesTotal - cost.linesCosted,
    provenance: prov
      ? `Kroger store ${prov.locationId} · priced ${new Date(prov.pricedOn).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`
      : 'price source unavailable',
  };
}
