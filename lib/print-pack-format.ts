/**
 * Pure display helpers for the printable recipe pack. No data imports: this is
 * the module client components reach for, so it must never pull the recipe
 * corpus into a browser bundle. Selection and lookup live in lib/print-pack.ts.
 *
 * Nothing here invents a number (HR-2). Every value is read straight off the
 * recipe or is a display-only reformatting of one.
 */
import type { Appliance, Ingredient, NutritionInfo, Recipe } from '@/lib/types';

/**
 * Pack size ceiling. The cover index holds 20 rows in one column and 40 in
 * two; past that the index would need pages of its own.
 */
export const PACK_MAX = 40;

export type PaperSize = 'letter' | 'a4';

/** localStorage key for the paper-size toggle. Deliberately not one of the recipe-mode keys. */
export const PAPER_KEY = 'mi_print_paper';

export function parsePaper(value: unknown): PaperSize {
  return value === 'a4' ? 'a4' : 'letter';
}

export function packHref(slugs: readonly string[], paper: PaperSize = 'letter'): string {
  // Slugs are [a-z0-9-], so the list is URL-safe as written and stays readable.
  return `/print-pack/custom?r=${slugs.join(',')}${paper === 'a4' ? '&size=a4' : ''}`;
}

/** Sheets in a pack: one per recipe plus the cover — except a single recipe, which is one card and no cover. */
export function packPageCount(recipes: number): number {
  return recipes === 1 ? 1 : recipes + 1;
}

export interface PackCatalogEntry {
  id: string;
  slug: string;
  title: string;
  appliance: Appliance;
  protein: string;
  totalMinutes: number;
}

// ─── Derived display values ──────────────────────────────────────────────────

/** "15m" under 90 minutes, "1.5h" from there — the strip has room for one number. */
export function timeLabel(minutes: number): string {
  return minutes >= 90 ? `${Math.round(minutes / 6) / 10}h` : `${minutes}m`;
}

/** 'air-fryer' → 'AIR FRYER'. Derived from the slug so the Appliance union stays the contract (HR-12). */
export function applianceLabel(appliance: Appliance): string {
  return appliance.replace(/-/g, ' ').toUpperCase();
}

const TEMP_TOKEN = /\d+\s*°F\+?/g;

function compactStage(s: string): string {
  return s
    .replace(/smoking hot(?:\s+high heat)?/i, 'SMOKING')
    .replace(/\bmedium simmer\b/i, 'SIMMER')
    .replace(/\bmedium-high\b/i, 'MED-HIGH')
    .replace(/\bmedium-low\b/i, 'MED-LOW')
    .replace(/\bcast iron\b/i, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}

/** A stove setting, possibly staged: "Medium then Low Heat" → "MEDIUM → LOW HEAT". */
function compactPhrase(s: string): string {
  return s.split(/\s+(?:then|to)\s+/i).map(compactStage).filter(Boolean).join(' → ');
}

/**
 * The cook-temp cell headline. `cookTemp` is written for the recipe page —
 * "225°F (107°C) Indirect then 600°F (316°C) Direct Sear" — and the cell has
 * room for one number, or two joined by an arrow. Parentheticals are always
 * restatements (°C, psi, "approx"), so they go first; anything after a comma,
 * semicolon or "with" is method detail the directions already carry.
 *
 *   "400°F (204°C)"                    → "400°F"
 *   "380°F then 400°F (193°C / 204°C)" → "380°F → 400°F"
 *   "225°F – 250°F (107°C – 121°C)"    → "225–250°F"
 *   "Medium-High (375°F / 190°C)"      → "MED-HIGH"
 *   "Smoking Hot (450°F+)"             → "SMOKING"
 *   "425°F (218°C) + Broil"            → "425°F +BROIL"
 *   "Medium then 400°F oven finish"    → "MEDIUM → 400°F"
 */
export function tempShort(raw: string): string {
  const bare = raw.replace(/\s*\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
  const temps = (bare.match(TEMP_TOKEN) ?? []).map((t) => t.replace(/\s+/g, ''));

  if (temps.length >= 2) {
    const isRange = /°F\+?\s*[–-]\s*\d/.test(bare);
    return isRange ? temps.join('–').replace(/°F(?=–)/, '') : temps.join(' → ');
  }

  const head = bare.split(/\s*[,;]\s*|\s+with\s+/i)[0];
  const at = head.search(/\d+\s*°F/);
  if (at === -1) return compactPhrase(head);

  const temp = temps[0];
  if (at === 0) {
    const suffix = /\+\s*broil|\bplus\b.*\bbroil\b/i.test(head)
      ? ' +BROIL'
      : /\+\s*high sear/i.test(head)
        ? ' +SEAR'
        : '';
    return temp + suffix;
  }
  // A stove stage first, then a temperature: "Cold Start to 400°F".
  const stage = compactPhrase(head.slice(0, at).replace(/\s*\b(?:then|to)\s*$/i, ''));
  return stage ? `${stage} → ${temp}` : temp;
}

/** Font size for the cook-temp value: 17px fits "400°F"; "MED-HIGH → MEDIUM" needs smaller. */
export function tempSize(label: string): number {
  const n = label.length;
  return n <= 8 ? 17 : n <= 13 ? 15 : n <= 17 ? 13 : 11;
}

export interface SpecValue {
  label: string;
  value: string;
}

/** Third cell: the flip mark when there is one, otherwise the rest. */
export function midCell(recipe: Recipe): SpecValue {
  const flip = recipe.quickVersion.flipAtMinutes ?? 0;
  if (flip > 0) return { label: 'FLIP AT', value: `${flip}m` };
  return { label: 'REST', value: recipe.restMinutes != null ? `${recipe.restMinutes}m` : '—' };
}

/**
 * Fifth cell, on solid ink: the USDA pull temp. Sides, eggs and pasta have
 * none, and a dash on the page's boldest cell reads as an error, so those
 * show prep time — the one strip number the card doesn't already carry.
 */
export function pullCell(recipe: Recipe): SpecValue {
  if (recipe.safeInternalTempF != null) {
    return { label: 'PULL AT', value: `${recipe.safeInternalTempF}°F` };
  }
  return { label: 'PREP', value: `${recipe.prepMinutes}m` };
}

/** "1.5 lbs Chicken Tenderloins — tendons trimmed" */
export function ingredientLine(ingredient: Ingredient): string {
  const head = [ingredient.qty, ingredient.unit, ingredient.item]
    .map((s) => s.trim())
    .filter(Boolean)
    .join(' ');
  return ingredient.notes ? `${head} — ${ingredient.notes}` : head;
}

/** "340 kcal · 42g protein · 18g carbs · 11g fat" */
export function nutritionLine(n: NutritionInfo): string {
  return `${n.calories} kcal · ${n.proteinGrams}g protein · ${n.carbsGrams}g carbs · ${n.fatGrams}g fat`;
}
