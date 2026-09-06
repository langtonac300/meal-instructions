import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/current-user';
import { mealsConfigured } from '@/lib/supabase-admin';
import { getLatestPlan, savePlan } from '@/lib/meals-db';
import { getRecipeBySlug } from '@/data/recipes';
import { DEFAULT_DINNER_TIME, MAX_PLAN_ITEMS, isValidTimeZone } from '@/lib/plan';

export const runtime = 'nodejs';

/** Local "YYYY-MM-DD" for a zone, so "tomorrow" means the reader's tomorrow. */
function todayIn(timeZone: string): string {
  // en-CA formats as YYYY-MM-DD, which is the shape the column wants.
  return new Intl.DateTimeFormat('en-CA', { timeZone }).format(new Date());
}

function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Adds one recipe to the end of the reader's plan — the one-tap path from a
 * recipe page, which must not make them open the planner and pick a date.
 *
 * "The end" is the night after the last one already planned, or tomorrow when
 * the plan is empty or has run out. Never today: a meal you are told about at
 * six in the evening is not a plan.
 */
export async function POST(req: Request) {
  if (!mealsConfigured()) {
    return NextResponse.json({ error: 'meals_not_configured' }, { status: 503 });
  }
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'signin_required' }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }
  const { slug, timeZone } = (body ?? {}) as { slug?: unknown; timeZone?: unknown };

  if (typeof slug !== 'string' || !getRecipeBySlug(slug)) {
    return NextResponse.json({ error: 'unknown_recipe' }, { status: 400 });
  }
  const zone = isValidTimeZone(timeZone) ? timeZone : 'UTC';

  const plan = await getLatestPlan(user.id);
  const tomorrow = addDays(todayIn(zone), 1);

  const existing = (plan?.items ?? []).map((i) => ({
    recipeSlug: i.recipe_slug,
    cookDate: i.cook_date,
    dinnerTime: i.dinner_time,
  }));

  // Already on the plan: report the night it is on rather than adding a second
  // copy. Pressing the button twice should reassure, not duplicate.
  const already = existing.find((i) => i.recipeSlug === slug);
  if (already) {
    return NextResponse.json({ ok: true, cookDate: already.cookDate, alreadyPlanned: true });
  }

  if (existing.length >= MAX_PLAN_ITEMS) {
    return NextResponse.json({ error: 'plan_full', max: MAX_PLAN_ITEMS }, { status: 409 });
  }

  const lastDate = existing.reduce<string | null>(
    (latest, i) => (latest === null || i.cookDate > latest ? i.cookDate : latest),
    null,
  );
  const cookDate = lastDate && lastDate >= tomorrow ? addDays(lastDate, 1) : tomorrow;

  await savePlan(user.id, {
    dinnerTime: plan?.dinner_time ?? DEFAULT_DINNER_TIME,
    timeZone: plan?.time_zone ?? zone,
    items: [...existing, { recipeSlug: slug, cookDate, dinnerTime: null }],
  });

  return NextResponse.json({ ok: true, cookDate, alreadyPlanned: false });
}
