/**
 * Meal plans — the shape shared by the planner UI, the API routes, and the
 * calendar writer.
 *
 * A plan is deliberately thin: a recipe slug, a date, and a time. Everything
 * shown on a calendar event (how long it takes, what to buy, what temperature)
 * is read from the recipe at write time, never copied into the plan. HR-2:
 * a stored duplicate of a cook time is a number with no basis the moment the
 * recipe is corrected.
 */

import type { Recipe } from './types';

/** "HH:MM", 24-hour. Matches the CHECK constraint on meals_plans.dinner_time. */
export const TIME_RE = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
/** "YYYY-MM-DD". */
export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export const DEFAULT_DINNER_TIME = '18:30';

/** Nights a single plan may cover. A fortnight of dinners is already a stretch. */
export const MAX_PLAN_ITEMS = 14;

export interface PlanItem {
  recipeSlug: string;
  /** Local calendar date, "YYYY-MM-DD". */
  cookDate: string;
  /** Per-night override; null means the plan's dinnerTime applies. */
  dinnerTime: string | null;
  /** Set once the night has been written to Google. */
  googleEventId?: string | null;
}

export interface Plan {
  id: string;
  dinnerTime: string;
  timeZone: string;
  items: PlanItem[];
  updatedAt: string;
}

export function isValidTime(value: unknown): value is string {
  return typeof value === 'string' && TIME_RE.test(value);
}

export function isValidDate(value: unknown): value is string {
  if (typeof value !== 'string' || !DATE_RE.test(value)) return false;
  // Rejects 2026-02-31: Date normalises it to March, so the round trip differs.
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

/**
 * IANA zone names only, and only ones this runtime actually knows. An
 * unrecognised zone is not rejected upstream by Google — it is accepted and
 * the event lands at the wrong hour, which is worse than a 400 here.
 */
export function isValidTimeZone(value: unknown): value is string {
  if (typeof value !== 'string' || !value || value.length > 64) return false;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

/**
 * The timing fields the planner needs. A structural subset of Recipe so the
 * browser bundle carries four numbers per meal instead of the whole record —
 * ingredients and step text are only ever needed server-side, at write time.
 */
export type Timed = Pick<Recipe, 'totalMinutes' | 'prepMinutes' | 'cookMinutes'> & {
  restMinutes?: number;
};

/** One meal as the planner UI sees it. Built by the page from RECIPES. */
export interface PlannerRecipe extends Timed {
  slug: string;
  title: string;
  appliance: Recipe['appliance'];
  protein: Recipe['protein'];
  categories: Recipe['categories'];
  difficulty: Recipe['difficulty'];
}

/** Minutes to subtract from dinner to know when to start. Prep + cook + rest. */
export function leadMinutes(recipe: Timed): number {
  const rest = recipe.restMinutes ?? 0;
  // totalMinutes is the authored, verified figure (it carries `basis`); the
  // prep + cook sum is only a fallback for older records missing it.
  const total = recipe.totalMinutes || recipe.prepMinutes + recipe.cookMinutes;
  return total + rest;
}

function addMinutes(time: string, delta: number): { time: string; dayOffset: number } {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + delta;
  // Floor division so a negative total (starting a brisket before midnight)
  // rolls back a day instead of producing "-2:30".
  const dayOffset = Math.floor(total / (24 * 60));
  const within = total - dayOffset * 24 * 60;
  const hh = String(Math.floor(within / 60)).padStart(2, '0');
  const mm = String(within % 60).padStart(2, '0');
  return { time: `${hh}:${mm}`, dayOffset };
}

function shiftDate(date: string, days: number): string {
  if (days === 0) return date;
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** "18:30" minus a lead time, as a display string. Used by the planner UI. */
export function startTimeLabel(recipe: Timed, dinnerTime: string): string {
  return addMinutes(dinnerTime, -leadMinutes(recipe)).time;
}

export interface EventWindow {
  /** Local wall time the cook starts, "YYYY-MM-DDTHH:MM:SS". */
  start: string;
  /** Local wall time the food is on the table. */
  end: string;
}

/**
 * The calendar block for one planned dinner.
 *
 * The block *ends* at dinner time and starts when the cooking has to start —
 * an event that merely begins at 18:30 tells you nothing you did not already
 * know, and the default calendar notification would fire as the food was
 * supposed to be ready.
 *
 * Times are emitted as wall-clock strings with no offset. Google resolves them
 * against the timeZone sent alongside, which is what keeps "dinner at 6:30"
 * true across a DST boundary.
 */
export function eventWindow(recipe: Timed, cookDate: string, dinnerTime: string): EventWindow {
  const lead = leadMinutes(recipe);
  const { time: startTime, dayOffset } = addMinutes(dinnerTime, -lead);
  return {
    start: `${shiftDate(cookDate, dayOffset)}T${startTime}:00`,
    end: `${cookDate}T${dinnerTime}:00`,
  };
}

/**
 * Event body text. Plain text, not HTML: Google renders a limited subset and
 * the description is read on a phone lock screen as often as in the web UI.
 *
 * Everything here is read from the recipe. Nothing is computed, rounded, or
 * inferred (HR-2).
 */
export function eventDescription(recipe: Recipe, recipeUrl: string, dinnerTime: string): string {
  const lines: string[] = [];

  lines.push(recipe.tagline);
  lines.push('');
  lines.push(
    `ON THE TABLE ${dinnerTime} · ${recipe.totalMinutes} MIN TOTAL ` +
      `(${recipe.prepMinutes} PREP + ${recipe.cookMinutes} COOK` +
      (recipe.restMinutes ? ` + ${recipe.restMinutes} REST` : '') +
      `) · SERVES ${recipe.defaultServings}`,
  );
  lines.push(`${recipe.appliance.toUpperCase().replace(/-/g, ' ')} · ${recipe.cookTemp}`);
  if (recipe.safeInternalTempF) {
    lines.push(`PULL AT ${recipe.safeInternalTempF}°F INTERNAL`);
  }

  lines.push('');
  lines.push('SHOPPING');
  for (const ing of recipe.ingredients) {
    const qty = [ing.qty, ing.unit].filter(Boolean).join(' ').trim();
    lines.push(`· ${qty ? `${qty} ` : ''}${ing.item}${ing.notes ? ` (${ing.notes})` : ''}`);
  }

  lines.push('');
  lines.push('THE SHORT VERSION');
  for (const bullet of recipe.quickVersion.bullets) {
    lines.push(`· ${bullet}`);
  }

  if (recipe.dadProTip) {
    lines.push('');
    lines.push(`PRO TIP: ${recipe.dadProTip}`);
  }

  lines.push('');
  lines.push(`Full instructions, timers, and the step-by-step version:`);
  lines.push(recipeUrl);

  return lines.join('\n');
}
