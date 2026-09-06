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
 * too little of this recipe is actually priced. A "$2.10+" built from 3 of 14
 * ingredients is not a floor a reader can act on — it reads as the price of
 * the meal and is off by a factor of four.
 *
 * Two count-based guards were tried and both shipped nonsense, which is why
 * the rule is now about WHICH line is missing rather than how many:
 *
 *   >=50% of lines      "Perfect Soft-Boiled Eggs" costed 3 of 6 lines and
 *                       passed — all three were water and ice, the eggs were
 *                       unpriced, and the page read $0.00.
 *   >=50% excl. free    "Dutch Oven No-Knead Bread" costed 2 of 3 priceable
 *                       lines and passed — they were the yeast and the salt,
 *                       and the flour was unpriced. $0.01/serving.
 *
 * A seasoning-scale line can go missing without wrecking a floor. The main
 * ingredient cannot, so any unpriced major line means no number at all.
 */
export function costFor(recipe: CostableRecipe): RecipeCost | null {
  if (!hasPrices()) return null;
  const servings = recipe.defaultServings && recipe.defaultServings > 0 ? recipe.defaultServings : 4;
  const cost = costRecipe(recipe.ingredients, servings, PRICES);
  if (cost.linesTotal === 0) return null;
  // Any unpriced MAJOR line invalidates the floor — see LineCost.isMajor. A
  // count-based ratio cannot catch this: the bread recipe below priced 2 of
  // its 3 priceable lines and reported $0.01/serving, because the two it
  // priced were the yeast and the salt and the one it missed was the flour.
  if (cost.majorLinesUnpriced > 0) return null;
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

/**
 * slug -> dollars per serving, for the whole corpus.
 *
 * Just the one number per recipe. The cost filter on /what-can-i-make needs
 * to compare every recipe at once, and that page's matcher is a client
 * component, so this crosses the boundary — but only as ~228 floats, not as
 * the per-ingredient breakdown behind them.
 *
 * Recipes `costFor` declines to price (no store priced, or under half the
 * lines costable) are simply absent, so a filter built on this hides them
 * rather than treating them as free.
 */
export function costIndex(
  recipes: (CostableRecipe & { slug: string })[]
): Record<string, number> {
  const index: Record<string, number> = {};
  if (!hasPrices()) return index;
  for (const recipe of recipes) {
    const cost = costFor(recipe);
    if (cost) index[recipe.slug] = Number(cost.perServing.toFixed(2));
  }
  return index;
}
