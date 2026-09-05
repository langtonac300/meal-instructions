import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/current-user';
import { mealsConfigured } from '@/lib/supabase-admin';
import { getLatestPlan, savePlan } from '@/lib/meals-db';
import { getRecipeBySlug } from '@/data/recipes';
import {
  DEFAULT_DINNER_TIME,
  MAX_PLAN_ITEMS,
  isValidDate,
  isValidTime,
  isValidTimeZone,
} from '@/lib/plan';

export const runtime = 'nodejs';

export async function GET() {
  if (!mealsConfigured()) {
    return NextResponse.json({ error: 'meals_not_configured' }, { status: 503 });
  }
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'signin_required' }, { status: 401 });

  const plan = await getLatestPlan(user.id);
  return NextResponse.json({ plan });
}

interface IncomingItem {
  recipeSlug?: unknown;
  cookDate?: unknown;
  dinnerTime?: unknown;
}

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

  const { dinnerTime, timeZone, items } = (body ?? {}) as {
    dinnerTime?: unknown;
    timeZone?: unknown;
    items?: unknown;
  };

  if (dinnerTime !== undefined && !isValidTime(dinnerTime)) {
    return NextResponse.json({ error: 'bad_dinner_time' }, { status: 400 });
  }
  if (!isValidTimeZone(timeZone)) {
    return NextResponse.json({ error: 'bad_time_zone' }, { status: 400 });
  }
  if (!Array.isArray(items)) {
    return NextResponse.json({ error: 'items_required' }, { status: 400 });
  }
  if (items.length > MAX_PLAN_ITEMS) {
    return NextResponse.json({ error: 'too_many_items', max: MAX_PLAN_ITEMS }, { status: 400 });
  }

  const seenDates = new Set<string>();
  const clean: Array<{ recipeSlug: string; cookDate: string; dinnerTime: string | null }> = [];

  for (const raw of items as IncomingItem[]) {
    const slug = raw?.recipeSlug;
    const date = raw?.cookDate;
    const time = raw?.dinnerTime ?? null;

    if (typeof slug !== 'string' || !getRecipeBySlug(slug)) {
      return NextResponse.json({ error: 'unknown_recipe', slug }, { status: 400 });
    }
    if (!isValidDate(date)) {
      return NextResponse.json({ error: 'bad_cook_date', cookDate: date }, { status: 400 });
    }
    // The unique constraint would catch this, but a 500 from Postgres is a
    // worse answer than naming the night that is doubled up.
    if (seenDates.has(date)) {
      return NextResponse.json({ error: 'duplicate_date', cookDate: date }, { status: 400 });
    }
    if (time !== null && !isValidTime(time)) {
      return NextResponse.json({ error: 'bad_item_time', cookDate: date }, { status: 400 });
    }

    seenDates.add(date);
    clean.push({ recipeSlug: slug, cookDate: date, dinnerTime: time });
  }

  const { plan, orphanedEventIds } = await savePlan(user.id, {
    dinnerTime: isValidTime(dinnerTime) ? dinnerTime : DEFAULT_DINNER_TIME,
    timeZone,
    items: clean,
  });

  // The caller re-syncs to clear these from Google. Reported rather than
  // silently dropped so a stale event is a visible number, not a mystery.
  return NextResponse.json({ plan, orphanedEventIds });
}
