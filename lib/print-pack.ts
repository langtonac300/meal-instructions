/**
 * Printable recipe pack — which recipes go in and in what order. Server-side
 * only: this module reads the recipe corpus. The display helpers it re-exports
 * live in lib/print-pack-format.ts, which client components import directly so
 * the corpus never lands in a browser bundle.
 */
import { RECIPES, RECIPE_BY_SLUG } from '@/data/recipes';
import { SITE_URL } from '@/lib/site';
import type { Recipe } from '@/lib/types';
import { PACK_MAX, type PackCatalogEntry } from './print-pack-format';

export * from './print-pack-format';

/**
 * "Top 20" is the site's own index order, #0001–#0020 — what the homepage
 * shows by default. Pinned by slug rather than derived from ids so a renamed or
 * renumbered recipe fails the build instead of silently swapping a page.
 * Reorder from print / pageview analytics once there are enough of them.
 */
export const TOP_20_SLUGS: readonly string[] = [
  'crispy-air-fryer-chicken-tenders',
  'air-fryer-juicy-bacon-cheeseburgers',
  'air-fryer-10-minute-garlic-butter-salmon',
  'cast-iron-lacy-edge-smash-burgers',
  'sheet-pan-chicken-fajitas',
  'air-fryer-crispy-garlic-parm-wings',
  '15-minute-skillet-beef-taco-meat',
  'air-fryer-sirloin-steak-bites',
  'sheet-pan-smoked-sausage-peppers-potatoes',
  'cast-iron-butter-basted-ribeye',
  'air-fryer-crispy-parmesan-pork-chops',
  '15-minute-lemon-garlic-butter-shrimp',
  '15-minute-egg-roll-in-a-bowl',
  'air-fryer-bbq-chicken-drumsticks',
  'sheet-pan-honey-garlic-salmon-green-beans',
  'air-fryer-loaded-baked-potatoes',
  'sheet-pan-loaded-game-day-nachos',
  'air-fryer-frozen-gyoza-potstickers',
  'smoker-st-louis-pork-ribs-3-2-1',
  'dutch-oven-dad-chili',
];

export function topTwenty(): Recipe[] {
  return TOP_20_SLUGS.map((slug) => {
    const recipe = RECIPE_BY_SLUG[slug];
    if (!recipe) {
      throw new Error(
        `print-pack: top-20 recipe "${slug}" is not in content/recipes — fix TOP_20_SLUGS or the recipe`
      );
    }
    return recipe;
  });
}

/**
 * `?r=slug,slug` → recipes, in the order given. Unknown slugs are dropped
 * rather than rejected so an old link survives a renamed recipe; duplicates
 * collapse; the list is capped at PACK_MAX.
 */
export function packFromParam(raw: string | string[] | undefined): Recipe[] {
  const joined = Array.isArray(raw) ? raw.join(',') : raw ?? '';
  const out: Recipe[] = [];
  const seen = new Set<string>();
  for (const part of joined.split(',')) {
    const slug = part.trim();
    if (!slug || seen.has(slug)) continue;
    const recipe = RECIPE_BY_SLUG[slug];
    if (!recipe) continue;
    seen.add(slug);
    out.push(recipe);
    if (out.length >= PACK_MAX) break;
  }
  return out;
}

/** What the builder needs to list a recipe — ~30 KB for the whole catalogue, against 1.3 MB for the records. */
export function packCatalog(): PackCatalogEntry[] {
  return [...RECIPES]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      appliance: r.appliance,
      protein: r.protein,
      totalMinutes: r.totalMinutes,
    }));
}

/** "mealinstructions.com" — from lib/site, never a literal (HR-10). */
export function siteHost(): string {
  try {
    return new URL(SITE_URL).host.replace(/^www\./, '');
  } catch {
    return SITE_URL;
  }
}
