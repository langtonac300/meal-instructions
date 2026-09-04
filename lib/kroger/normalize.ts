/**
 * Turns a recipe `Ingredient.item` string into one or more Kroger search queries.
 *
 * Designed against the real corpus (554 unique ingredient strings across 180
 * recipes), not against guesses. The patterns that actually occur:
 *
 *   59  parentheticals   "Salmon Fillets (Center Cut)", "Bell Peppers (Red & Yellow)"
 *   45  "or" alternates  "Water or Broth", "Avocado Oil or Olive Oil"
 *   33  "&"/"and" pairs  "Kosher Salt & Black Pepper", "Dried Thyme & Bay Leaf"
 *    9  slashes          "80/20 Ground Chuck", "Ground Beef (85/15)"
 *
 * Two of those look like separators and are not:
 *   - "/" is a fat ratio, never a list. Splitting it yields "80" and "20 Ground Chuck".
 *   - "&" inside parentheses describes one product ("Flats & Drums"), not two.
 */

/** Non-purchasable pantry constants — no point sending these to a grocery API. */
const NOT_SHOPPABLE = new Set(['water', 'ice', 'ice water', 'cold water', 'warm water']);

/**
 * Leading modifiers dropped one at a time during progressive relaxation.
 *
 * Ordered least-meaningful first, because relaxation stops as soon as a query
 * returns usable candidates. "baby red potatoes" returns only boxed Idahoan
 * mash — the phrase collides with that brand name — while "red potatoes"
 * returns actual Produce. But "boneless" in "boneless chicken thighs" is
 * load-bearing, so it sits late in the list and is only dropped as a last
 * resort, after the more specific queries have already had their chance.
 */
const RELAXABLE_MODIFIERS = [
  'baby', 'dry', 'fresh', 'ripe', 'raw', 'whole', 'large', 'small', 'jumbo',
  'petite', 'thick', 'thick-cut', 'thin', 'extra', 'coarse', 'packed', 'chopped',
  'minced', 'sliced', 'shredded', 'grated', 'crushed', 'toasted', 'unsalted',
  'salted', 'low-sodium', 'reduced-sodium', 'boneless', 'skinless', 'bone-in',
  'skin-on', 'center-cut', 'lean', 'ground',
];

/** Trailing nouns that describe form, not product, and hurt matching. */
const TRAILING_NOISE = [
  'sprigs', 'sprig', 'leaves', 'cloves', 'clove', 'wedges', 'to taste',
  'stalks', 'stalk', 'fillets', 'fillet', 'cubes', 'slices', 'pieces', 'halves',
];

function stripParentheticals(s: string): string {
  return s.replace(/\([^)]*\)/g, ' ');
}

/**
 * Strips diacritics so accented letters survive tokenization.
 *
 * Without this, "Jalapeño" hits `[^\w\s]` at the ñ and shatters into "jalape"
 * and "o" — and the relaxation ladder then queried Kroger for "o", which is a
 * 400. Decompose to base letters plus combining marks, then drop the marks.
 */
function deaccent(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function tidy(s: string): string {
  return deaccent(s).replace(/[^\w\s&/-]/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Splits compounds like "Kosher Salt & Black Pepper" into separate queries,
 * but only on separators outside parentheses — parentheticals are removed
 * first precisely so "(Flats & Drums)" cannot be mistaken for a list.
 */
function splitCompounds(s: string): string[] {
  return s
    .split(/\s+&\s+|\s+\band\b\s+/i)
    .map((p) => p.trim())
    .filter(Boolean);
}

/**
 * "Avocado Oil or Olive Oil" → "Avocado Oil". The first is what the author meant.
 *
 * One wrinkle: sometimes only the modifier is alternated and the head noun
 * appears once, at the end — "Cherry or Grape Tomatoes". Taking the first part
 * verbatim yields "cherry", which matches actual cherries. When the first
 * alternative is a bare modifier and the last one carries extra words, borrow
 * that trailing noun back.
 */
function takeFirstAlternative(s: string): string {
  const parts = s.split(/\s+\bor\b\s+/i).map((p) => p.trim()).filter(Boolean);
  if (parts.length < 2) return s.trim();

  const first = parts[0];
  const last = parts[parts.length - 1];
  const firstTokens = first.split(/\s+/);
  const lastTokens = last.split(/\s+/);

  if (firstTokens.length === 1 && lastTokens.length > 1) {
    return `${first} ${lastTokens[lastTokens.length - 1]}`;
  }
  return first;
}

function dropTrailingNoise(s: string): string {
  let out = s;
  for (const noise of TRAILING_NOISE) {
    out = out.replace(new RegExp(`\\s+${noise}$`, 'i'), '');
  }
  return out.trim();
}

/**
 * Progressive relaxation ladder for a single query, most specific first.
 * Callers try each in order and stop at the first that yields a confident
 * match, so specificity is preserved wherever it actually works.
 */
export function relaxationLadder(query: string): string[] {
  const ladder = [query];
  let tokens = query.split(/\s+/);

  // Drop one leading modifier at a time, in RELAXABLE_MODIFIERS order.
  for (const mod of RELAXABLE_MODIFIERS) {
    const next = tokens.filter((t) => t.toLowerCase() !== mod);
    if (next.length !== tokens.length && next.length > 0) {
      tokens = next;
      const candidate = tokens.join(' ');
      if (!ladder.includes(candidate)) ladder.push(candidate);
    }
  }

  // Last resort: a single noun. Try the trailing word first, since English puts
  // the head noun last ("baby red potatoes" → "potatoes"), then the leading one,
  // which is the head when the phrase names a form ("celery stalks" → "celery").
  for (const head of [tokens[tokens.length - 1], tokens[0]]) {
    if (head && !ladder.includes(head)) ladder.push(head);
  }

  // Never send a one-character term — Kroger answers those with a 400.
  return ladder.filter((q) => q.length > 1);
}

export interface NormalizedIngredient {
  /** The original `Ingredient.item`, preserved for display. */
  original: string;
  /** One entry per distinct product to search for. Empty when not shoppable. */
  queries: string[];
}

export function normalizeIngredient(item: string): NormalizedIngredient {
  const base = tidy(stripParentheticals(item)).toLowerCase();

  if (!base || NOT_SHOPPABLE.has(base)) {
    return { original: item, queries: [] };
  }

  const queries = splitCompounds(base)
    .map(takeFirstAlternative)
    .map(dropTrailingNoise)
    .map((q) => q.trim())
    .filter((q) => q.length > 1 && !NOT_SHOPPABLE.has(q));

  return { original: item, queries: [...new Set(queries)] };
}
