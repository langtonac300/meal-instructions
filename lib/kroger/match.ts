/**
 * Scores Kroger product candidates against a normalized ingredient query.
 *
 * The failure this exists to prevent: searching "baby red potatoes" returns
 * three results, all of them boxed Idahoan mashed-potato mix, because the
 * phrase collides with that brand name. Taking `filter.limit=1` blindly puts
 * instant mash on a pot-roast shopping list. A wrong item is worse than a
 * missing one — the shopper trusts the list and goes home with the wrong thing.
 * So this scorer is built to abstain rather than guess, in the same spirit as
 * HR-2's rule against unsourced numbers.
 */

/** Product forms that are a different food from the raw ingredient. */
const FORM_NOISE = [
  'mashed', 'instant', 'mix', 'seasoning', 'seasoned', 'flavored', 'flavor',
  'dressing', 'marinade', 'soup', 'chips', 'crisps', 'juice', 'sauce',
  'powder', 'extract', 'candied', 'pickled', 'frozen', 'canned', 'dried',
  // "Red Wine Vinegar" satisfies every token of "red wine" and is not wine.
  'vinegar', 'concentrate', 'substitute', 'imitation',
];

/** Coarse keyword → expected Kroger category. Used as a signal, not a filter. */
const CATEGORY_HINTS: Array<[RegExp, string[]]> = [
  [/\b(potato|onion|carrot|garlic|pepper|tomato|lettuce|celery|broccoli|asparagus|corn|lime|lemon|avocado|cilantro|parsley|rosemary|thyme|basil|ginger|scallion|mushroom|zucchini|cabbage|spinach|green bean)\b/, ['Produce', 'Natural & Organic']],
  [/\b(beef|chuck|steak|ribeye|brisket|pork|chicken|thigh|breast|wing|turkey|salmon|shrimp|tilapia|sausage|bacon|lamb|roast|tenderloin)\b/, ['Meat & Seafood', 'Deli']],
  [/\b(milk|butter|cheese|cream|yogurt|egg|parmesan|cheddar|mozzarella)\b/, ['Dairy', 'Natural & Organic']],
  [/\b(flour|sugar|baking|vanilla|yeast|cornstarch)\b/, ['Baking Goods']],
  [/\b(broth|stock|paste|beans|salsa|sauce|tomatoes)\b/, ['Canned & Packaged']],
  [/\b(wine|beer|cabernet|chardonnay)\b/, ['Adult Beverage']],
];

export interface Candidate {
  productId: string;
  /** What the cart endpoint actually takes. Equal to productId in every sampled
   *  case, but captured separately rather than assumed. */
  upc?: string;
  description: string;
  categories?: string[];
  brand?: string;
  size?: string;
}

export interface ScoredMatch extends Candidate {
  score: number;
  /** The query that produced this candidate — may be a relaxed form. */
  matchedQuery: string;
}

function tokens(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

/**
 * Crude suffix stemmer, applied identically to both sides so it only ever has
 * to be self-consistent — "cheese" stemming to "chees" is harmless as long as
 * the catalogue side stems the same way.
 *
 * Exists because an exact-token gate rejected obviously-correct products:
 * "Egg" never matched "…Large Brown Eggs".
 */
function stem(t: string): string {
  return t.replace(/ies$/, 'y').replace(/(es|s)$/, '');
}

/**
 * The set of forms a product description can satisfy, including adjacent-token
 * concatenations.
 *
 * Kroger writes compounds as two words where recipes write one: "Corn Starch"
 * vs "cornstarch", "Bread Crumbs" vs "breadcrumbs". Joining neighbouring tokens
 * lets those meet in the middle.
 */
function descriptionForms(description: string): Set<string> {
  const raw = tokens(description);
  const forms = new Set(raw.map(stem));
  for (let i = 0; i < raw.length - 1; i++) {
    forms.add(stem(raw[i] + raw[i + 1]));
  }
  return forms;
}

function expectedCategories(query: string): string[] {
  for (const [pattern, cats] of CATEGORY_HINTS) {
    if (pattern.test(query.toLowerCase())) return cats;
  }
  return [];
}

/**
 * Returns the best candidate, or null when nothing clears the bar.
 *
 * Every query token must appear in the description — a partial hit is how
 * "baby red potatoes" latched onto "Baby Reds ... Mashed Potatoes". Beyond
 * that, extra words are mild evidence of a different product and FORM_NOISE
 * words are strong evidence, unless the ingredient asked for them ("dried
 * thyme" should match a dried product).
 */
export function scoreCandidates(
  query: string,
  candidates: Candidate[],
  { minScore = 40 }: { minScore?: number } = {},
): ScoredMatch | null {
  const qTokens = tokens(query);
  if (!qTokens.length || !candidates.length) return null;

  const wanted = expectedCategories(query);
  let best: ScoredMatch | null = null;

  const qStems = qTokens.map(stem);

  for (const c of candidates) {
    const dTokens = tokens(c.description);
    const forms = descriptionForms(c.description);
    const covered = qStems.filter((s) => forms.has(s)).length;

    // Hard gate: every query token must be present.
    if (covered !== qStems.length) continue;

    let score = 100;

    // Extra words dilute the match: "Red Potatoes" beats "Petite Red Gourmet Potatoes".
    const extras = dTokens.filter((t) => !qStems.includes(stem(t)));
    score -= extras.length * 4;

    // A form word the ingredient never asked for means a different food.
    const unwantedForm = extras.filter((t) => FORM_NOISE.includes(t));
    score -= unwantedForm.length * 45;

    // Category agreement is the strongest single signal we get back.
    if (wanted.length) {
      const cat = c.categories?.[0] ?? '';
      score += wanted.includes(cat) ? 25 : -30;
    }

    if (!best || score > best.score) {
      best = { ...c, score, matchedQuery: query };
    }
  }

  return best && best.score >= minScore ? best : null;
}
