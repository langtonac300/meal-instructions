/**
 * "What can I make?" — the matching rules, shared by the server (which
 * classifies every recipe once) and the client island (which scores them
 * against what the reader tapped, and picks the next question).
 *
 * Two tiers, on purpose:
 *   required — the recipe's main protein, plus anything the dish is named for.
 *              Missing one hides the meal. No chicken means no chicken meals.
 *              A cut whose cousin is ticked (thighs for breasts) is listed as
 *              missing instead of hiding the meal.
 *   flex     — everything else. Missing some is listed, never hidden; the
 *              reader decides whether no mayo is a problem.
 *
 * Nothing here is a number: which meals show, what is assumed, and what gets
 * asked next are all derived from the recipe data at render time (HR-2).
 */

import type { ProteinType, Recipe } from './types';
import { PANTRY_GROUPS, PANTRY_ITEMS, PANTRY_ITEM_BY_ID, type PantryItem } from '@/data/pantry';

/** A recipe in the slim, serialisable form the client island receives. */
export interface PantryRecipe {
  id: string;
  slug: string;
  title: string;
  appliance: string;
  protein: ProteinType;
  totalMinutes: number;
  image: string;
  /** Pantry item ids the meal is hidden without. */
  required: string[];
  /** Pantry item ids that are listed when missing, but never hide the meal. */
  flex: string[];
  /** Groups where one ticked item is enough ("cheese" in the title: any cheese the recipe uses). */
  anyOf?: string[][];
}

/** Meals missing more flex items than this go under "needs a proper shop". */
export const MAX_MISSING = 3;
/** Never ask about an ingredient used by fewer meals than this; it shows as a named gap instead. */
export const MIN_ASK = 4;
/** An ingredient in at least this share of recipes is assumed present until untapped. */
export const BASICS_SHARE = 0.25;

/** Ingredient lines that are water or equipment: not pantry, not a gap. */
const IGNORE =
  /^(cold |warm |hot |room temp )?(tap )?water( \(room temp\)| for bath)?$|^ice cubes$|foil|cedar plank|wood (pellets|chunks)|cherry wood|sauce of choice/i;

interface Compiled {
  item: PantryItem;
  match: RegExp[];
  exclude: RegExp[];
  title: RegExp[];
}

const rx = (source: string) => new RegExp(source, 'i');

const COMPILED: Compiled[] = PANTRY_ITEMS.map((item) => ({
  item,
  match: item.match.map(rx),
  exclude: (item.exclude ?? []).map(rx),
  title: [...item.match, ...(item.titleMatch ?? [])].map(rx),
}));

const hits = (text: string, patterns: RegExp[], excludes: RegExp[]) =>
  patterns.some((p) => p.test(text)) && !excludes.some((e) => e.test(text));

/** Every pantry item an ingredient line belongs to ("salsa & sour cream" is two). */
export function itemsForLine(line: string): PantryItem[] {
  const text = line.toLowerCase();
  return COMPILED.filter((c) => hits(text, c.match, c.exclude)).map((c) => c.item);
}

const coversProtein = (item: PantryItem, protein: ProteinType) =>
  Array.isArray(item.protein) ? item.protein.includes(protein) : item.protein === protein;

export interface Classification {
  required: string[];
  /** One item from each group is enough. */
  anyOf: string[][];
  flex: string[];
  /** Ingredient lines no pantry item claims — see `npm run report:pantry`. */
  unmatched: string[];
  ignored: string[];
}

export function classifyRecipe(
  recipe: Pick<Recipe, 'title' | 'protein' | 'ingredients'>,
): Classification {
  const needs = new Map<string, Compiled>();
  const unmatched: string[] = [];
  const ignored: string[] = [];

  for (const ing of recipe.ingredients) {
    const line = ing.item.trim();
    if (IGNORE.test(line)) {
      ignored.push(line);
      continue;
    }
    const text = line.toLowerCase();
    const found = COMPILED.filter((c) => hits(text, c.match, c.exclude));
    if (found.length === 0) {
      unmatched.push(line);
      continue;
    }
    for (const c of found) needs.set(c.item.id, c);
  }

  const title = recipe.title.toLowerCase();
  const required: string[] = [];
  const flex: string[] = [];
  const families = new Map<string, string[]>();
  for (const c of needs.values()) {
    const isMain = coversProtein(c.item, recipe.protein);
    const namedInTitle = hits(title, c.match, c.exclude);
    const familyInTitle = !namedInTitle && hits(title, c.title, c.exclude);
    if (isMain || namedInTitle || (familyInTitle && !c.item.family)) {
      required.push(c.item.id);
    }
    if (c.item.family && (namedInTitle || familyInTitle)) {
      families.set(c.item.family, [...(families.get(c.item.family) ?? []), c.item.id]);
    } else if (!isMain && !namedInTitle && !familyInTitle) {
      flex.push(c.item.id);
    }
  }
  // "Cheese" in the title: one of the cheeses the recipe uses is enough. When a
  // member is named outright ("Smoked Gouda Mac & Cheese") that one is already
  // required and the rest are ordinary leeway.
  const anyOf: string[][] = [];
  for (const ids of families.values()) {
    const named = ids.filter((id) => required.includes(id));
    if (named.length > 0) {
      for (const id of ids) if (!required.includes(id)) flex.push(id);
    } else if (ids.length === 1) {
      required.push(ids[0]);
    } else {
      anyOf.push(ids);
    }
  }
  return { required, anyOf, flex, unmatched, ignored };
}

// ── Client side ─────────────────────────────────────────────────────────────

export interface PantryVerdict {
  recipe: PantryRecipe;
  missing: string[];
}

export interface PantryResults {
  /** Nothing missing. Fastest first. */
  ready: PantryVerdict[];
  /** Missing 1–MAX_MISSING items. Fewest missing first, then fastest. */
  close: PantryVerdict[];
  /** Missing more than MAX_MISSING items: a proper shop. Same order as `close`. */
  far: PantryVerdict[];
  /** Hidden: a required item (main protein, or something in the name) is not ticked. */
  hiddenNamed: number;
}

/** Ticked, or covered by one of its swaps (garlic powder stands in for fresh garlic). */
export function hasItem(have: ReadonlySet<string>, id: string): boolean {
  if (have.has(id)) return true;
  const item = PANTRY_ITEM_BY_ID.get(id);
  return !!item?.swaps?.some((s) => have.has(s));
}

/** A cut that can stand in for this one, with a note, is ticked. */
const cousinTicked = (have: ReadonlySet<string>, id: string) =>
  !!PANTRY_ITEM_BY_ID.get(id)?.cousins?.some((c) => have.has(c));

export function labelFor(id: string): string {
  return PANTRY_ITEM_BY_ID.get(id)?.label ?? id;
}

/** Every pantry item a recipe touches, required or not. */
const touches = (r: PantryRecipe) => new Set([...r.required, ...r.flex, ...(r.anyOf ?? []).flat()]);

export function matchPantry(recipes: PantryRecipe[], have: ReadonlySet<string>): PantryResults {
  const ready: PantryVerdict[] = [];
  const close: PantryVerdict[] = [];
  const far: PantryVerdict[] = [];
  let hiddenNamed = 0;

  for (const recipe of recipes) {
    const missing: string[] = [];
    let hidden = false;
    for (const id of recipe.required) {
      if (hasItem(have, id)) continue;
      if (cousinTicked(have, id)) missing.push(id);
      else {
        hidden = true;
        break;
      }
    }
    if (!hidden && (recipe.anyOf ?? []).some((group) => !group.some((id) => hasItem(have, id)))) {
      hidden = true;
    }
    if (hidden) {
      hiddenNamed++;
      continue;
    }
    for (const id of recipe.flex) if (!hasItem(have, id)) missing.push(id);
    if (missing.length === 0) ready.push({ recipe, missing });
    else if (missing.length <= MAX_MISSING) close.push({ recipe, missing });
    else far.push({ recipe, missing });
  }

  const byGap = (a: PantryVerdict, b: PantryVerdict) =>
    a.missing.length - b.missing.length || a.recipe.totalMinutes - b.recipe.totalMinutes;
  ready.sort((a, b) => a.recipe.totalMinutes - b.recipe.totalMinutes);
  close.sort(byGap);
  far.sort(byGap);
  return { ready, close, far, hiddenNamed };
}

/**
 * What to assume: every non-protein item used by at least BASICS_SHARE of the
 * recipes, most-used first. Asking about salt costs a tap for no change in
 * the answer; a reader who is out of it untaps it.
 */
export function basicsFor(recipes: PantryRecipe[]): string[] {
  const counts = new Map<string, number>();
  for (const r of recipes) for (const id of touches(r)) counts.set(id, (counts.get(id) ?? 0) + 1);
  return PANTRY_ITEMS.filter(
    (i) => !i.protein && (counts.get(i.id) ?? 0) >= recipes.length * BASICS_SHARE,
  )
    .map((i) => i.id)
    .sort((a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0));
}

/** The first question: the meat and seafood shelves grouped by animal, plus eggs. */
export interface ProteinFamily {
  id: ProteinType;
  label: string;
  items: string[];
  /** Recipes built on this protein. */
  meals: number;
}

const FAMILY_LABELS: Partial<Record<ProteinType, string>> = {
  chicken: 'Chicken',
  beef: 'Beef',
  pork: 'Pork',
  turkey: 'Turkey',
  seafood: 'Seafood',
  'dairy-eggs': 'Eggs',
};

export function proteinFamilies(recipes: PantryRecipe[]): ProteinFamily[] {
  const meals = new Map<ProteinType, number>();
  for (const r of recipes) meals.set(r.protein, (meals.get(r.protein) ?? 0) + 1);
  const families = new Map<ProteinType, string[]>();
  for (const group of PANTRY_GROUPS) {
    if (group.id !== 'meat' && group.id !== 'seafood') continue;
    for (const item of group.items) {
      if (typeof item.protein !== 'string') continue;
      families.set(item.protein, [...(families.get(item.protein) ?? []), item.id]);
    }
  }
  const eggs = PANTRY_ITEMS.find((i) => i.protein === 'dairy-eggs');
  if (eggs) families.set('dairy-eggs', [eggs.id]);
  return [...families.entries()]
    .map(([id, items]) => ({
      id,
      label: items.length === 1 ? labelFor(items[0]) : (FAMILY_LABELS[id] ?? id),
      items,
      meals: meals.get(id) ?? 0,
    }))
    .sort((a, b) => b.meals - a.meals);
}

/** Is the meat this recipe is built on in the house? (Title-named extras and cheese are not counted here.) */
export function proteinSatisfied(recipe: PantryRecipe, have: ReadonlySet<string>): boolean {
  return recipe.required.every(
    (id) => !PANTRY_ITEM_BY_ID.get(id)?.protein || hasItem(have, id) || cousinTicked(have, id),
  );
}

export interface Splitter {
  id: string;
  /** Meals in play that use it. */
  count: number;
}

export interface SplitterPick {
  /** Meals whose protein is in the house. */
  inPlay: number;
  picks: Splitter[];
}

/**
 * The next question. Of the meals whose protein is in the house, which unasked
 * ingredients are used by closest to half? Each of those taps moves the most
 * meals. Anything used by fewer than MIN_ASK meals is never asked about.
 */
export function pickSplitters(
  recipes: PantryRecipe[],
  have: ReadonlySet<string>,
  skip: ReadonlySet<string>,
  limit = 4,
): SplitterPick {
  const inPlay = recipes.filter((r) => proteinSatisfied(r, have));
  const counts = new Map<string, number>();
  for (const r of inPlay) for (const id of touches(r)) counts.set(id, (counts.get(id) ?? 0) + 1);
  const n = inPlay.length;
  const picks = [...counts.entries()]
    .filter(
      ([id, count]) =>
        count >= MIN_ASK &&
        !skip.has(id) &&
        !hasItem(have, id) &&
        !PANTRY_ITEM_BY_ID.get(id)?.protein,
    )
    .map(([id, count]) => ({ id, count, score: Math.abs(count / n - 0.5) }))
    .sort((a, b) => a.score - b.score || b.count - a.count || a.id.localeCompare(b.id))
    .slice(0, limit)
    .map(({ id, count }) => ({ id, count }));
  return { inPlay: n, picks };
}
