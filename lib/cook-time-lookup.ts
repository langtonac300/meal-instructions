/**
 * Slim, serializable search index for the home-page cook-time lookup.
 *
 * Server-side only: this module reads the full datasheet and recipe corpora.
 * The home page passes the result into <CookTimeLookup />, a client island,
 * so the browser gets a few hundred bytes per entry instead of the whole
 * 670 KB cook-time dataset and every recipe record — the same reasoning as
 * packCatalog() in lib/print-pack.ts.
 *
 * The index is kept small two ways: the display fields (food, appliance,
 * state, title, slug) are also what the query is matched against, and
 * `terms` holds only the *extra* lowercased words from keywords, tagline,
 * protein and ingredients that those fields do not already contain.
 *
 * Nothing here invents a value (HR-2): every field is copied straight off
 * the datasheet or recipe.
 */
import { COOK_TIME_DATASHEETS } from '@/data/cook-times';
import { RECIPES } from '@/data/recipes';
import { tokenize } from '@/lib/lookup-tokenize';

export interface LookupDatasheet {
  food: string;
  appliance: string;
  foodSlug: string;
  tempFormatted: string;
  timeFormatted: string;
  state: string;
  /** Extra lowercased search words not already in food / appliance / state. */
  terms: string;
}

export interface LookupRecipe {
  slug: string;
  title: string;
  totalMinutes: number;
  /** Extra lowercased search words not already in title / slug. */
  terms: string;
}

export interface LookupIndex {
  datasheets: LookupDatasheet[];
  recipes: LookupRecipe[];
}

/** Words from `extra` that are not already substrings of `base`. Order preserved, deduped. */
function extraTerms(base: string, extra: (string | undefined)[]): string {
  const haystack = base.toLowerCase();
  const seen = new Set<string>();
  const out: string[] = [];
  for (const chunk of extra) {
    if (!chunk) continue;
    for (const w of tokenize(chunk)) {
      if (seen.has(w) || haystack.includes(w)) continue;
      seen.add(w);
      out.push(w);
    }
  }
  return out.join(' ');
}

export function lookupIndex(): LookupIndex {
  const datasheets: LookupDatasheet[] = COOK_TIME_DATASHEETS.map((d) => ({
    food: d.food,
    appliance: d.appliance,
    foodSlug: d.foodSlug,
    tempFormatted: d.tempFormatted,
    timeFormatted: d.timeFormatted,
    state: d.state,
    terms: extraTerms(`${d.food} ${d.appliance} ${d.state}`, d.keywords ?? []),
  }));

  const recipes: LookupRecipe[] = RECIPES.map((r) => ({
    slug: r.slug,
    title: r.title,
    totalMinutes: r.totalMinutes,
    terms: extraTerms(`${r.title} ${r.slug}`, [
      r.protein,
      r.appliance,
      r.tagline,
      ...(r.keywords ?? []),
      ...(r.ingredients ?? []).map((i) => i.item),
    ]),
  }));

  return { datasheets, recipes };
}
