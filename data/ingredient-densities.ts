/**
 * Grams per US cup for ingredients recipes measure by volume.
 *
 * Why this file has to exist: 66.5% of the 1,989 ingredient lines in
 * `data/recipes.json` are volume (tsp/tbsp/cup), but groceries are sold by
 * weight. "2 tbsp olive oil" cannot be costed against a "16.9 fl oz" bottle
 * without knowing what a cup of olive oil weighs. Nothing in the corpus
 * carries that, so it is stated here once and reused.
 *
 * HR-2: every number below is transcribed from a published chart, not
 * estimated. `basis` names the source on each entry. An ingredient with no
 * sourced density is DELIBERATELY ABSENT — the cost engine reports its line as
 * un-costable rather than guessing, and `npm run report:cost` lists it. Do not
 * fill a gap here from memory: nine values were checked against recall while
 * building this and five were wrong by 6-14% (cornstarch 128 vs 112,
 * vegetable oil 218 vs 198, grated parmesan 90 vs 100, rice 185 vs 198,
 * confectioners' sugar 120 vs 113).
 *
 * Values printed per part-cup or per-spoon on the source are converted to a
 * full cup here (x4 from 1/4 cup, x2 from 1/2 cup, x16 from 1 tbsp, x48 from
 * 1 tsp) and the printed measure is kept in `basis` so the arithmetic stays
 * checkable.
 */

export interface IngredientDensity {
  /** Grams in one US cup. */
  gramsPerCup: number;
  /** Where the number came from, including the measure as printed. */
  basis: string;
}

const KAB = 'King Arthur Baking ingredient weight chart';
const USDA = 'USDA FoodData Central SR Legacy';

/**
 * Keyed by the canonical ingredient name produced by `canonicalIngredient()`
 * in `lib/ingredient-cost.ts`. Keep that function and these keys in sync — the
 * coverage report fails loudly when a key here matches nothing in the corpus,
 * which is how a typo gets caught.
 */
export const INGREDIENT_DENSITIES: Record<string, IngredientDensity> = {
  // --- Salt. Three different products, up to 2.25x apart by volume. The
  // recipes name Diamond Crystal explicitly 12 times; unqualified "kosher
  // salt" is treated as Diamond Crystal because that is what the recipe
  // development used. Morton and table salt are here for lines that say so.
  'kosher salt': { gramsPerCup: 128, basis: `${KAB}: Salt (Kosher, Diamond Crystal) 1 tbsp = 8g` },
  'diamond crystal kosher salt': { gramsPerCup: 128, basis: `${KAB}: Salt (Kosher, Diamond Crystal) 1 tbsp = 8g` },
  'morton kosher salt': { gramsPerCup: 256, basis: `${KAB}: Salt (Kosher, Morton's) 1 tbsp = 16g` },
  'table salt': { gramsPerCup: 288, basis: `${KAB}: Salt (table) 1 tbsp = 18g` },
  'fine table salt': { gramsPerCup: 288, basis: `${KAB}: Salt (table) 1 tbsp = 18g` },

  // --- Fats. Butter is sold in sticks; 1 cup = 2 sticks = 227g.
  'butter': { gramsPerCup: 227, basis: `${KAB}: Butter 1/2 cup (8 tbsp) = 113g` },
  'unsalted butter': { gramsPerCup: 227, basis: `${KAB}: Butter 1/2 cup (8 tbsp) = 113g` },
  'salted butter': { gramsPerCup: 227, basis: `${KAB}: Butter 1/2 cup (8 tbsp) = 113g` },
  'olive oil': { gramsPerCup: 200, basis: `${KAB}: Olive Oil 1/4 cup = 50g` },
  'extra-virgin olive oil': { gramsPerCup: 200, basis: `${KAB}: Olive Oil 1/4 cup = 50g` },
  'vegetable oil': { gramsPerCup: 198, basis: `${KAB}: Vegetable Oil 1 cup = 198g` },
  'canola oil': { gramsPerCup: 198, basis: `${KAB}: Vegetable Oil 1 cup = 198g` },

  // --- Liquids and cultured dairy. The chart gives 227g/cup for water and
  // every pourable dairy, i.e. it treats 1 cup as 8 oz by weight.
  'water': { gramsPerCup: 227, basis: `${KAB}: Water 1 cup = 227g` },
  'whole milk': { gramsPerCup: 227, basis: `${KAB}: Milk 1 cup = 227g` },
  'milk': { gramsPerCup: 227, basis: `${KAB}: Milk 1 cup = 227g` },
  'buttermilk': { gramsPerCup: 227, basis: `${KAB}: Buttermilk 1 cup = 227g` },
  'heavy cream': { gramsPerCup: 227, basis: `${KAB}: Heavy Cream 1 cup = 227g` },
  'sour cream': { gramsPerCup: 227, basis: `${KAB}: Sour Cream 1 cup = 227g` },
  'cream cheese': { gramsPerCup: 227, basis: `${KAB}: Cream cheese 1 cup = 227g` },
  'yogurt': { gramsPerCup: 227, basis: `${KAB}: Yogurt 1 cup = 227g` },
  'plain yogurt': { gramsPerCup: 227, basis: `${KAB}: Yogurt 1 cup = 227g` },
  'mayonnaise': { gramsPerCup: 226, basis: `${KAB}: Mayonnaise 1/2 cup = 113g` },

  // --- Flour, starch, sugar.
  'all-purpose flour': { gramsPerCup: 120, basis: `${KAB}: All-Purpose Flour 1 cup = 120g` },
  'flour': { gramsPerCup: 120, basis: `${KAB}: All-Purpose Flour 1 cup = 120g` },
  'cornstarch': { gramsPerCup: 112, basis: `${KAB}: Cornstarch 1/4 cup = 28g` },
  'granulated sugar': { gramsPerCup: 198, basis: `${KAB}: Granulated Sugar 1 cup = 198g` },
  'sugar': { gramsPerCup: 198, basis: `${KAB}: Granulated Sugar 1 cup = 198g` },
  'brown sugar': { gramsPerCup: 213, basis: `${KAB}: Light Brown Sugar (packed) 1 cup = 213g` },
  'powdered sugar': { gramsPerCup: 113, basis: `${KAB}: Confectioners' Sugar 1 cup = 113g` },

  // --- Leaveners. Small volumes, but they appear in every baked recipe.
  'baking powder': { gramsPerCup: 192, basis: `${KAB}: Baking powder 1 tsp = 4g` },
  'baking soda': { gramsPerCup: 288, basis: `${KAB}: Baking soda 1/2 tsp = 3g` },
  'instant yeast': { gramsPerCup: 144, basis: `${KAB}: Yeast (instant) 1 tbsp = 9g` },

  // --- Crumbs and grains. Panko is roughly half the density of dried crumbs;
  // they are not interchangeable for cost.
  'panko breadcrumb': { gramsPerCup: 50, basis: `${KAB}: Breadcrumbs (Japanese Panko) 1 cup = 50g` },
  'breadcrumb': { gramsPerCup: 112, basis: `${KAB}: Breadcrumbs (dried) 1/4 cup = 28g` },
  'oat': { gramsPerCup: 89, basis: `${KAB}: Oats (old-fashioned or quick-cooking) 1 cup = 89g` },
  'cornmeal': { gramsPerCup: 156, basis: `${KAB}: Cornmeal (yellow, Quaker) 1 cup = 156g` },
  'yellow cornmeal': { gramsPerCup: 156, basis: `${KAB}: Cornmeal (yellow, Quaker) 1 cup = 156g` },
  'rice': { gramsPerCup: 198, basis: `${KAB}: Long-Grain Rice 1/2 cup = 99g` },
  'long-grain white rice': { gramsPerCup: 198, basis: `${KAB}: Long-Grain Rice 1/2 cup = 99g` },

  // --- Cheese. Grated (hard, powdery) and shredded (soft, springy) differ.
  'parmesan cheese': { gramsPerCup: 100, basis: `${KAB}: Grated Parmesan 1/2 cup = 50g` },
  'shredded cheese': { gramsPerCup: 113, basis: `${KAB}: Shredded Cheese 1 cup = 113g` },
  'cheddar cheese': { gramsPerCup: 113, basis: `${KAB}: Shredded Cheese 1 cup = 113g` },
  'mozzarella': { gramsPerCup: 113, basis: `${KAB}: Shredded Cheese 1 cup = 113g` },

  // --- Syrups and sticky sweeteners.
  'honey': { gramsPerCup: 336, basis: `${KAB}: Honey 1 tbsp = 21g` },
  'maple syrup': { gramsPerCup: 312, basis: `${KAB}: Maple syrup 1/2 cup = 156g` },
  'molasse': { gramsPerCup: 340, basis: `${KAB}: Molasses 1/4 cup = 85g` },
  'corn syrup': { gramsPerCup: 312, basis: `${KAB}: Corn syrup 1 cup = 312g` },
  'peanut butter': { gramsPerCup: 270, basis: `${KAB}: Peanut butter 1/2 cup = 135g` },

  // --- Nuts, chocolate, cocoa.
  'walnut': { gramsPerCup: 113, basis: `${KAB}: Walnuts (chopped) 1 cup = 113g` },
  'pecan': { gramsPerCup: 105, basis: `${KAB}: Pecans (whole) 1 cup = 105g` },
  'chocolate chip': { gramsPerCup: 170, basis: `${KAB}: Chocolate Chips 1 cup = 170g` },
  'cocoa powder': { gramsPerCup: 84, basis: `${KAB}: Cocoa (unsweetened) 1/2 cup = 42g` },

  // --- Dried herb blends. The chart carries blends but NOT single ground
  // spices (no entry for black pepper, paprika, cumin, garlic powder). Those
  // are the corpus's 2nd, 3rd and 6th most-used ingredients and are therefore
  // the largest known gap — see `npm run report:cost`. Do not invent them.

  // --- Single ground spices and dried herbs. King Arthur carries only
  // blends, so these come from USDA SR Legacy, which publishes a gram
  // weight per teaspoon for each. Converted x48 to a cup. These 14 keys
  // unblock the corpus's 2nd, 3rd and 4th most-used ingredients.
  'black pepper': { gramsPerCup: 110.4, basis: `${USDA} #170931 (Spices, pepper, black): 1 tsp, ground = 2.3g` },
  'garlic powder': { gramsPerCup: 148.8, basis: `${USDA} #171325 (Spices, garlic powder): 1 tsp = 3.1g` },
  'paprika': { gramsPerCup: 110.4, basis: `${USDA} #171329 (Spices, paprika): 1 tsp = 2.3g` },
  'smoked paprika': { gramsPerCup: 110.4, basis: `${USDA} #171329 (Spices, paprika): 1 tsp = 2.3g` },
  'sweet paprika': { gramsPerCup: 110.4, basis: `${USDA} #171329 (Spices, paprika): 1 tsp = 2.3g` },
  'onion powder': { gramsPerCup: 115.2, basis: `${USDA} #171327 (Spices, onion powder): 1 tsp = 2.4g` },
  'chili powder': { gramsPerCup: 129.6, basis: `${USDA} #171319 (Spices, chili powder): 1 tsp = 2.7g` },
  'dried oregano': { gramsPerCup: 48.0, basis: `${USDA} #171328 (Spices, oregano, dried): 1 tsp, leaves = 1.0g` },
  'dried thyme': { gramsPerCup: 48.0, basis: `${USDA} #170938 (Spices, thyme, dried): 1 tsp, leaves = 1.0g` },
  'dried basil': { gramsPerCup: 33.6, basis: `${USDA} #171317 (Spices, basil, dried): 1 tsp, leaves = 0.7g` },
  'dried rosemary': { gramsPerCup: 57.6, basis: `${USDA} #171333 (Spices, rosemary, dried): 1 tsp = 1.2g` },
  'cayenne': { gramsPerCup: 86.4, basis: `${USDA} #170932 (Spices, pepper, red or cayenne): 1 tsp = 1.8g` },
  'cayenne pepper': { gramsPerCup: 86.4, basis: `${USDA} #170932 (Spices, pepper, red or cayenne): 1 tsp = 1.8g` },
  'ground cinnamon': { gramsPerCup: 124.8, basis: `${USDA} #171320 (Spices, cinnamon, ground): 1 tsp = 2.6g` },

  'italian seasoning': { gramsPerCup: 112, basis: `${KAB}: Italian Herb Seasoning 2 tbsp = 14g` },
  'caraway seed': { gramsPerCup: 144, basis: `${KAB}: Caraway seeds 2 tbsp = 18g` },
};

/**
 * Grams in one piece of a whole ingredient.
 *
 * Separate from density because it answers a different question. A recipe
 * saying "1 medium yellow onion" against a package sold as "3 lb bag" needs
 * grams-per-onion, not grams-per-cup — no volume is involved at any point.
 *
 * `default` is used when the recipe says "1 onion" or "2 pieces" with no size
 * word. USDA publishes distinct weights for small/medium/large where the size
 * is stated, and those are carried in `bySize` so "1 large onion" does not
 * cost the same as "1 small onion" (110g vs 150g is a 36% difference).
 *
 * HR-2: as with densities, an ingredient with no sourced piece weight is
 * absent on purpose and its lines report as un-costable.
 */
export interface PieceWeight {
  /** Grams for an unqualified single piece. */
  default: number;
  /** Grams when the recipe names a size. */
  bySize?: Partial<Record<'small' | 'medium' | 'large', number>>;
  basis: string;
}

/**
 * Known trap: USDA's only cumin entry (#170923, "Spices, cumin seed") reports
 * `1 tsp, whole = 2.1 g`. Every recipe here calls for GROUND cumin, which
 * packs differently from whole seed. Ground cumin is therefore left as a gap
 * rather than costed off the wrong form — 30 lines, the largest single
 * remaining `no-density`.
 */
export const INGREDIENT_PIECE_WEIGHTS: Record<string, PieceWeight> = {
  'yellow onion': {
    default: 110,
    bySize: { medium: 110, large: 150 },
    basis: `${USDA} #170000 (Onions, raw): 1 medium (2-1/2" dia) = 110g; 1 large = 150g`,
  },
  'red onion': {
    default: 110,
    bySize: { medium: 110, large: 150 },
    basis: `${USDA} #170000 (Onions, raw): 1 medium (2-1/2" dia) = 110g; 1 large = 150g`,
  },
  onion: {
    default: 110,
    bySize: { medium: 110, large: 150 },
    basis: `${USDA} #170000 (Onions, raw): 1 medium (2-1/2" dia) = 110g; 1 large = 150g`,
  },
  carrot: {
    default: 61,
    bySize: { small: 50, medium: 61, large: 72 },
    basis: `${USDA} #170393 (Carrots, raw): 1 small = 50g; 1 medium = 61g; 1 large = 72g`,
  },
  lemon: {
    default: 84,
    basis: `${USDA} #167746 (Lemons, raw, without peel): 1 fruit (2-3/8" dia) = 84g`,
  },
  'bell pepper': {
    default: 119,
    bySize: { small: 74, medium: 119, large: 164 },
    basis: `${USDA} #170108 (Peppers, sweet, red, raw): 1 small = 74g; 1 medium = 119g; 1 large = 164g`,
  },
  'red bell pepper': {
    default: 119,
    bySize: { small: 74, medium: 119, large: 164 },
    basis: `${USDA} #170108 (Peppers, sweet, red, raw): 1 small = 74g; 1 medium = 119g; 1 large = 164g`,
  },
  'green bell pepper': {
    default: 119,
    bySize: { small: 74, medium: 119, large: 164 },
    basis: `${USDA} #170108 (Peppers, sweet, red, raw): 1 small = 74g; 1 medium = 119g; 1 large = 164g`,
  },
  'russet potato': {
    default: 173,
    bySize: { small: 138, medium: 173, large: 299 },
    basis: `${USDA} #170030 (Potatoes, Russet, flesh and skin): 1 small = 138g; 1 medium = 173g; 1 large = 299g`,
  },
  potato: {
    default: 173,
    bySize: { small: 138, medium: 173, large: 299 },
    basis: `${USDA} #170030 (Potatoes, Russet, flesh and skin): 1 small = 138g; 1 medium = 173g; 1 large = 299g`,
  },
};
