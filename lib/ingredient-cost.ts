/**
 * Costs a recipe from real package prices.
 *
 * The chain is: recipe line ("2 tbsp olive oil") -> canonical ingredient
 * ("olive oil") -> a matched grocery product with a price and a package size
 * -> the fraction of that package the line uses -> dollars.
 *
 * HR-2 runs through the whole file: a line is costed only when every step has
 * a sourced number. Nothing is estimated to make a total look complete. A
 * recipe whose lines cannot all be costed reports a FLOOR ("$3.40+") and says
 * how many lines are missing, which is the honest shape of a partial answer.
 *
 * Density is needed less often than it first appears. It converts volume to
 * weight, so it is only required when the recipe measures by volume AND the
 * package is sold by weight. These pair up with no density at all:
 *
 *   recipe lbs/oz   + package lbs/oz   ->  weight / weight
 *   recipe pieces   + package "12 ct"  ->  count  / count
 *   recipe cups     + package "fl oz"  ->  volume / volume
 */

import { INGREDIENT_DENSITIES, INGREDIENT_PIECE_WEIGHTS } from '@/data/ingredient-densities';

/* ------------------------------------------------------------------ units */

const GRAMS_PER_OZ = 28.349523125; // international avoirdupois ounce, exact
const GRAMS_PER_LB = 453.59237; // exact by definition
const CUPS_PER_FL_OZ = 1 / 8; // US customary cup = 8 US fl oz, exact

/** Recipe volume units expressed in cups. */
const VOLUME_IN_CUPS: Record<string, number> = {
  tsp: 1 / 48,
  tbsp: 1 / 16,
  cup: 1,
  cups: 1,
  pint: 2,
  pints: 2,
  quart: 4,
  quarts: 4,
  // A pinch has no standard; the common baking convention is 1/16 tsp. It is
  // listed so those lines cost as ~0 rather than reporting as un-costable,
  // which would overstate the gap. At 1/16 tsp of salt this is fractions of a
  // cent either way.
  pinch: 1 / 768,
};

/** Recipe weight units expressed in grams. */
const WEIGHT_IN_GRAMS: Record<string, number> = {
  oz: GRAMS_PER_OZ,
  ounce: GRAMS_PER_OZ,
  ounces: GRAMS_PER_OZ,
  lb: GRAMS_PER_LB,
  lbs: GRAMS_PER_LB,
  pound: GRAMS_PER_LB,
  pounds: GRAMS_PER_LB,
  g: 1,
  gram: 1,
  grams: 1,
  kg: 1000,
};

/**
 * Units where one unit IS one of whatever the package counts. "2 pieces"
 * against a "12 ct" carton of eggs is two twelfths of it.
 */
const WHOLE_ITEM_UNITS = new Set([
  'piece', 'pieces', 'large', 'medium', 'small', 'whole', 'egg', 'eggs',
  'ear', 'ears', 'head', 'thigh', 'thighs', 'breast', 'breasts', 'fillet',
  'fillets', 'bun', 'buns', 'tortilla', 'tortillas', 'link', 'links',
  'steak', 'steaks', 'chop', 'chops', 'rack', 'racks', 'can', 'cans',
  'roll', 'rolls', 'pepper', 'peppers', 'onion', 'onions', 'potato',
  'potatoes', 'lemon', 'lime', 'orange', 'sheet', 'sheets', 'packet',
  'packets',
]);

/**
 * Units naming a PART of the thing the package counts. A clove is part of a
 * head; a sprig is part of a bunch; a slice is part of a loaf.
 *
 * These must never divide into a count-sold package, because "1 ct" counts the
 * whole item and the recipe counts its pieces. Kroger sells `Garlic Cloves` as
 * `1 ct` — one bulb — so treating cloves as whole items priced 3 cloves at
 * $2.55 against a $0.85 head. A 9x overcost, and silent: the build was green
 * and the number looked ordinary. It is only wrong if you know a head has
 * about ten cloves.
 *
 * How many parts are in one item is genuine produce variance that no source
 * here publishes, so these stay un-costable against a count package rather
 * than being divided by a guessed ratio.
 */
const SUB_ITEM_UNITS = new Set([
  'clove', 'cloves', 'slice', 'slices', 'stalk', 'stalks', 'rib', 'ribs',
  'sprig', 'sprigs', 'leaf', 'leaves', 'wedge', 'wedges', 'strip', 'strips',
  'chunk', 'chunks',
]);

const COUNT_UNITS = new Set([...WHOLE_ITEM_UNITS, ...SUB_ITEM_UNITS]);

/**
 * Ingredients that are free at the tap. `lib/kroger/normalize.ts` already
 * refuses to send these to a grocery API for the same reason; here they must
 * cost $0 rather than fall through to "no price", which would wrongly mark
 * every recipe using water as a partial total.
 */
const FREE_INGREDIENTS = new Set([
  'water', 'ice', 'ice water', 'cold water', 'warm water', 'hot water',
  'water for bath', 'water or broth',
]);

/* ---------------------------------------------------------- canonicalising */

/**
 * Words describing how an ingredient is cut or handled, not what you buy.
 * Dropped so "Chopped Fresh Parsley" and "Fresh Parsley" cost the same.
 *
 * Deliberately NOT dropped, because each changes the product and its price:
 * fresh, dried, frozen, ground, smoked, canned, boneless, skinless, bone-in,
 * skin-on, unsalted, salted, low-sodium, sharp, baby, whole, sweet, hot.
 * Merging fresh thyme (sold as a $1.99 clamshell, used in sprigs) with dried
 * thyme (a $2.79 jar, used in tsp) was an actual bug caught while building
 * this — the two are different rows and must stay that way.
 */
const COSMETIC_MODIFIERS = [
  'chopped', 'minced', 'sliced', 'thin-sliced', 'shredded', 'grated',
  'crushed', 'packed', 'cooked', 'cold', 'day-old', 'thick', 'thick-cut',
  'thin', 'large', 'small', 'medium', 'jumbo', 'petite', 'coarse', 'fine',
  'flaky', 'freshly', 'ripe', 'overripe', 'split', 'bulk', 'plain', 'pure',
  'refrigerated', 'shelf-stable', 'jarred', 'toasted', 'raw', 'center-cut',
  'lean', 'whole-milk', 'full-fat', 'softened', 'melted',
];

/** Trailing nouns naming a form, not a product. */
const TRAILING_FORM =
  /\s+(sprigs?|leaves|wedges?|stalks?|fillets?|cubes|slices|pieces|halves|crumbles|to taste)$/;

const MODIFIER_RE = new RegExp(`^(?:${COSMETIC_MODIFIERS.join('|')})\\s+`);

/**
 * Trailing-plural rules, in order. A bare /s$/ was the first attempt and it
 * produced "potatoe" and "tomatoe" — visible in the coverage report as two
 * ingredients that could never match a price key. English plural endings need
 * their own cases before the general one.
 */
function singularise(s: string): string {
  if (/(?:^|\s)(?:asparagus|molasses|hummus|couscous)$/.test(s)) return s; // already singular
  if (/[^aeiou]ies$/.test(s)) return s.replace(/ies$/, 'y'); // berries -> berry
  if (/(?:o|ch|sh|s|x|z)es$/.test(s)) return s.replace(/es$/, ''); // potatoes -> potato
  if (/[^s]s$/.test(s)) return s.replace(/s$/, ''); // onions -> onion
  return s;
}

/**
 * Synonyms that canonicalise to different strings but name the same product.
 *
 * Applied as the last step of `canonicalIngredient`, so the price table and
 * the costing pass agree by construction — the alternative is two maps that
 * drift, which is the failure this repo already paid for once in its MCP tool
 * definitions.
 *
 * Deliberately conservative: only pairs where the two names denote the same
 * thing on a shelf. Not aliased, though they look tempting:
 *
 *   sea salt -> kosher salt        flaky finishing salt is a different SKU
 *                                  at several times the price per ounce
 *   san marzano -> whole peeled    San Marzano is a protected designation and
 *                                  costs roughly double plain canned tomatoes
 */
const INGREDIENT_ALIASES: Record<string, string> = {
  cayenne: 'cayenne pepper',
  parmesan: 'parmesan cheese',
  scallion: 'green onion',
  'sweet paprika': 'paprika',
  // "neutral oil" is a recipe-writing convention meaning exactly this.
  'neutral oil': 'vegetable oil',
  'neutral frying oil': 'vegetable oil',
  'neutral vegetable oil': 'vegetable oil',
};

/**
 * Reduces a recipe `Ingredient.item` to a stable key.
 *
 * Mirrors the intent of `lib/kroger/normalize.ts` but answers a different
 * question: that file builds *search queries* and relaxes aggressively until
 * something matches, while this one needs a single stable *identity* so two
 * spellings of the same ingredient share one price. Keeping them separate is
 * deliberate — relaxing "boneless chicken thighs" to "chicken" is right for
 * search and wrong for cost.
 */
export function canonicalIngredient(item: string): string {
  let s = item
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents: Jalapeño -> Jalapeno
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ') // "Salmon (Center Cut)" -> "salmon"
    .replace(/[^a-z0-9\s&/-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  let previous = '';
  while (previous !== s) {
    previous = s;
    s = s.replace(MODIFIER_RE, '');
  }

  s = s.replace(TRAILING_FORM, '');
  s = singularise(s).trim();
  return INGREDIENT_ALIASES[s] ?? s;
}

/* --------------------------------------------------------- package parsing */

export type PackageBasis = 'weight' | 'volume' | 'count';

export interface ParsedPackage {
  /** Grams in the package, when it is sold by weight. */
  grams?: number;
  /** Cups in the package, when it is sold by volume. */
  cups?: number;
  /** Items in the package, when it is sold by count. */
  count?: number;
  basis: PackageBasis;
}

/**
 * Parses a Kroger `size` string.
 *
 * 94% of the 571 size strings in `data/kroger-matches.generated.json` are a
 * plain "<number> <unit>". The rest are compounds where the useful half is the
 * weight: "4 sticks / 16 oz", "12 slices / 8 oz", "8 ct / 30.4 ounce". Those
 * are handled by preferring the LAST weight-looking clause, because the
 * leading clause counts pieces whose individual weight is unknown.
 *
 * Returns null rather than a guess for anything unrecognised ("1 each",
 * "large"); the caller then reports the line as un-costable.
 *
 * KNOWN LIMITATION: a bare "oz" is read as WEIGHT. For liquids that is
 * probably wrong — Kroger reports a Swanson broth carton as "32 oz" where the
 * carton itself says 32 FL oz, and 32 fl oz of broth weighs about 964g rather
 * than the 907g this returns. The resulting bias is around 6% and always in
 * the same direction (over-costing the liquid), which is small next to the
 * ingredients it sits beside. It is left alone because separating the two
 * needs a liquid/solid signal the size string does not carry, and guessing
 * from the ingredient name would be a rule with no source behind it.
 */
export function parsePackageSize(size: string): ParsedPackage | null {
  if (!size) return null;
  const s = size.toLowerCase().replace(/\bounces?\b/g, 'oz').replace(/\bfo\b/g, 'fl oz');

  // "6 x 2.5oz" -> 15 oz total.
  const multi = s.match(/([\d.]+)\s*x\s*([\d.]+)\s*(fl\s*oz|oz|lb|lbs|g|kg|ml|l)\b/);
  if (multi) {
    const total = parseFloat(multi[1]) * parseFloat(multi[2]);
    return unitToPackage(total, multi[3]);
  }

  // Prefer the last weight/volume clause in a compound like "8 ct / 20 oz".
  const all = [...s.matchAll(/([\d.]+)\s*(fl\s*oz|oz|lb|lbs|g|kg|ml|l|pt|qt|gal|ct|count|dozen|each)\b/g)];
  if (all.length === 0) return null;
  const weighed = all.filter((m) => !/^(ct|count|dozen|each)$/.test(m[2]));
  const pick = weighed.length > 0 ? weighed[weighed.length - 1] : all[0];
  return unitToPackage(parseFloat(pick[1]), pick[2]);
}

function unitToPackage(qty: number, unit: string): ParsedPackage | null {
  const u = unit.replace(/\s+/g, ' ').trim();
  if (u === 'oz') return { grams: qty * GRAMS_PER_OZ, basis: 'weight' };
  if (u === 'lb' || u === 'lbs') return { grams: qty * GRAMS_PER_LB, basis: 'weight' };
  if (u === 'g') return { grams: qty, basis: 'weight' };
  if (u === 'kg') return { grams: qty * 1000, basis: 'weight' };
  if (u === 'fl oz') return { cups: qty * CUPS_PER_FL_OZ, basis: 'volume' };
  if (u === 'ml') return { cups: qty / 236.588, basis: 'volume' };
  if (u === 'l') return { cups: (qty * 1000) / 236.588, basis: 'volume' };
  if (u === 'pt') return { cups: qty * 2, basis: 'volume' };
  if (u === 'qt') return { cups: qty * 4, basis: 'volume' };
  if (u === 'gal') return { cups: qty * 16, basis: 'volume' };
  if (u === 'ct' || u === 'count') return { count: qty, basis: 'count' };
  if (u === 'dozen') return { count: qty * 12, basis: 'count' };
  // "1 each" carries no size at all — not a package we can divide.
  return null;
}

/* ------------------------------------------------------------------ costing */

/** A priced grocery product standing behind one ingredient. */
export interface IngredientPrice {
  /** Price of one whole package, in dollars. */
  packagePrice: number;
  /** The package `size` string as the source reported it. */
  packageSize: string;
  /** Where the price came from — a store and a date, or an explicit estimate. */
  source: string;
  /** When the price was read. */
  fetchedAt: string;
}

export type UncostableReason =
  | 'no-price' // nothing priced this ingredient
  | 'unparsed-package' // priced, but the package size is not a size ("1 each")
  | 'no-density' // volume line against a weight package, density not sourced
  | 'count-vs-weight' // "2 pieces" against a package sold by the pound
  | 'sub-unit-vs-item' // "3 cloves" against a package counting whole heads
  | 'no-quantity'; // the recipe line carries no number

export interface LineCost {
  item: string;
  canonical: string;
  /** Dollars for this line, or null when it could not be costed. */
  dollars: number | null;
  reason?: UncostableReason;
  /**
   * True when this line is big enough to plausibly dominate the recipe's cost:
   * any weight, any count, or a quarter cup or more by volume.
   *
   * The distinction exists because a floor built while a MAJOR line is missing
   * is not a usable floor. Three real examples from this corpus, all of which
   * passed a purely count-based guard:
   *
   *   Dutch Oven No-Knead Bread   $0.01/serving  — the flour was unpriced
   *   Perfect Al Dente Pasta      $0.04/serving  — the pasta was unpriced
   *   Oven Crispy Chicken Wings   $0.05/serving  — the WINGS were unpriced
   *
   * Each was reporting the price of its seasoning. A tsp or tbsp of anything
   * is bounded small and can go missing without wrecking a floor; a pound of
   * meat cannot.
   */
  isMajor: boolean;
}

export interface RecipeCost {
  /** Dollars for every line that could be costed. */
  dollars: number;
  /** Dollars per serving. */
  perServing: number;
  linesCosted: number;
  linesTotal: number;
  /**
   * Lines that cost $0 because the ingredient is free (water, ice).
   *
   * Tracked separately because they are costed but contribute nothing, so
   * counting them as evidence that a total is trustworthy is exactly wrong —
   * see `costFor` in lib/ingredient-prices.ts.
   */
  linesFree: number;
  /** True when some line is missing, so `dollars` is a floor, not a total. */
  isFloor: boolean;
  /** Major lines that could not be priced. Non-zero means the floor is not usable. */
  majorLinesUnpriced: number;
  lines: LineCost[];
}

interface RecipeIngredientLike {
  item: string;
  qtyNumeric?: number | null;
  unit?: string | null;
}

/**
 * Costs one ingredient line.
 *
 * Every branch that cannot reach a sourced number returns `dollars: null` with
 * a reason rather than falling back to an assumption. The reasons are what
 * `npm run report:cost` groups by, so each one names a specific fixable gap.
 */
/** See `LineCost.isMajor`. Unrecognised units count as major — assume it matters. */
function isMajorLine(ingredient: RecipeIngredientLike): boolean {
  const unit = (ingredient.unit ?? '').toLowerCase().trim();
  const cups = VOLUME_IN_CUPS[unit];
  if (cups === undefined) return true;
  return (ingredient.qtyNumeric ?? 0) * cups >= 0.25;
}

export function costLine(
  ingredient: RecipeIngredientLike,
  prices: Record<string, IngredientPrice>
): LineCost {
  const canonical = canonicalIngredient(ingredient.item);
  const base: LineCost = {
    item: ingredient.item,
    canonical,
    dollars: null,
    isMajor: isMajorLine(ingredient),
  };

  const qty = ingredient.qtyNumeric;
  if (qty == null || !Number.isFinite(qty) || qty <= 0) {
    return { ...base, reason: 'no-quantity' };
  }

  // Water and ice cost nothing. Reporting them as gaps overstated the gap by
  // ~27 lines and left recipes flagged as floors when they were in fact whole.
  if (FREE_INGREDIENTS.has(canonical)) return { ...base, dollars: 0 };

  const price = prices[canonical];
  if (!price) return { ...base, reason: 'no-price' };

  const pack = parsePackageSize(price.packageSize);
  if (!pack) return { ...base, reason: 'unparsed-package' };

  const unit = (ingredient.unit ?? '').toLowerCase().trim();
  const fraction = packageFractionUsed(qty, unit, canonical, pack);
  if (typeof fraction !== 'number') return { ...base, reason: fraction };

  return { ...base, dollars: price.packagePrice * fraction };
}

/**
 * What share of one package a line uses, or the reason it cannot be known.
 *
 * Kept separate from `costLine` so the unit algebra is testable without
 * needing a price table.
 */
function packageFractionUsed(
  qty: number,
  unit: string,
  canonical: string,
  pack: ParsedPackage
): number | UncostableReason {
  const cupsPerUnit = VOLUME_IN_CUPS[unit];
  const gramsPerUnit = WEIGHT_IN_GRAMS[unit];

  // Volume line.
  if (cupsPerUnit !== undefined) {
    const cups = qty * cupsPerUnit;
    if (pack.cups) return cups / pack.cups; // volume / volume, no density
    if (pack.grams) {
      const density = INGREDIENT_DENSITIES[canonical];
      if (!density) return 'no-density';
      return (cups * density.gramsPerCup) / pack.grams;
    }
    return 'no-density';
  }

  // Weight line.
  if (gramsPerUnit !== undefined) {
    const grams = qty * gramsPerUnit;
    if (pack.grams) return grams / pack.grams; // weight / weight, no density
    if (pack.cups) {
      const density = INGREDIENT_DENSITIES[canonical];
      if (!density) return 'no-density';
      return grams / (pack.cups * density.gramsPerCup);
    }
    return 'count-vs-weight';
  }

  // Count line. A count-sold package divides directly. Against a weight-sold
  // package it needs a sourced grams-per-piece; where USDA publishes one, the
  // size word in the unit ("1 large onion") picks the right weight.
  if (COUNT_UNITS.has(unit)) {
    // A sub-unit never divides into a count package — see SUB_ITEM_UNITS.
    if (pack.count) {
      if (SUB_ITEM_UNITS.has(unit)) return 'sub-unit-vs-item';
      return qty / pack.count;
    }
    if (pack.grams) {
      const piece = INGREDIENT_PIECE_WEIGHTS[canonical];
      if (!piece) return 'count-vs-weight';
      const sized =
        unit === 'small' || unit === 'medium' || unit === 'large'
          ? piece.bySize?.[unit]
          : undefined;
      return (qty * (sized ?? piece.default)) / pack.grams;
    }
    return 'count-vs-weight';
  }

  // Units carrying their own size, e.g. "can (15 oz)", "fillets (6 oz each)".
  const embedded = unit.match(/([\d.]+)\s*(oz|ounces?|lb|lbs|fl\s*oz)/);
  if (embedded) {
    const each = unitToPackage(parseFloat(embedded[1]), embedded[2].replace(/ounces?/, 'oz'));
    if (each?.grams && pack.grams) return (qty * each.grams) / pack.grams;
    if (each?.cups && pack.cups) return (qty * each.cups) / pack.cups;
  }

  return 'no-quantity';
}

/** Costs a whole recipe. `dollars` is a floor whenever `isFloor` is true. */
export function costRecipe(
  ingredients: RecipeIngredientLike[],
  servings: number,
  prices: Record<string, IngredientPrice>
): RecipeCost {
  const lines = ingredients.map((i) => costLine(i, prices));
  const costed = lines.filter((l) => l.dollars !== null);
  const dollars = costed.reduce((sum, l) => sum + (l.dollars ?? 0), 0);
  const safeServings = servings > 0 ? servings : 1;
  return {
    dollars,
    perServing: dollars / safeServings,
    linesCosted: costed.length,
    linesFree: costed.filter((l) => l.dollars === 0).length,
    linesTotal: lines.length,
    isFloor: costed.length < lines.length,
    majorLinesUnpriced: lines.filter((l) => l.dollars === null && l.isMajor).length,
    lines,
  };
}
