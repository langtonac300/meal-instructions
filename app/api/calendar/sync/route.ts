import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@/lib/current-user';
import { mealsConfigured } from '@/lib/supabase-admin';
import {
  getLatestPlan,
  getCalendarId,
  setCalendarId,
  clearCalendarLink,
  setPlanItemEventId,
} from '@/lib/meals-db';
import { getRecipeBySlug } from '@/data/recipes';
import { abs } from '@/lib/site';
import { eventWindow, eventDescription } from '@/lib/plan';
import { COOKIE, refreshAccessToken } from '@/lib/calendar/oauth';
import {
  CalendarApiError,
  calendarExists,
  createMealCalendar,
  deleteEvent,
  insertEvent,
  patchEvent,
} from '@/lib/calendar/google';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Popup this long before the cook has to start. */
const REMIND_MINUTES_BEFORE = 15;

/**
 * Holds the shopper's access token across a batch of calls and renews it once
 * if Google rejects it.
 *
 * A plan is up to fourteen writes. The access token lasts an hour, so it will
 * not expire mid-batch — but it may already be stale when the batch begins, and
 * refreshing per call would spend a token request on every night.
 */
class TokenSession {
  private refreshed = false;
  /** Set when a refresh produced a new token the response should persist. */
  renewedToken: string | null = null;
  renewedExpiresIn = 0;

  constructor(
    private accessToken: string | undefined,
    private readonly refreshToken: string | undefined,
  ) {}

  get connected(): boolean {
    return Boolean(this.accessToken || this.refreshToken);
  }

  /** Runs `fn` with a live token, refreshing once on 401 and retrying. */
  async run<T>(fn: (accessToken: string) => Promise<T>): Promise<T> {
    if (!this.accessToken) {
      await this.renew();
    }
    try {
      return await fn(this.accessToken as string);
    } catch (err) {
      const unauthorized = err instanceof CalendarApiError && err.status === 401;
      if (!unauthorized || this.refreshed) throw err;
      await this.renew();
      return fn(this.accessToken as string);
    }
  }

  private async renew(): Promise<void> {
    if (!this.refreshToken) throw new CalendarApiError(401, 'no refresh token');
    this.refreshed = true;
    const tokens = await refreshAccessToken(this.refreshToken);
    this.accessToken = tokens.accessToken;
    this.renewedToken = tokens.accessToken;
    this.renewedExpiresIn = tokens.expiresIn;
  }
}

/**
 * Writes the signed-in user's plan to their app-created Google calendar.
 *
 * Idempotent by design: a night already carrying an event id is patched, never
 * re-inserted, so pressing the button twice does not double up Tuesday.
 */
export async function POST(req: NextRequest) {
  if (!mealsConfigured()) {
    return NextResponse.json({ error: 'meals_not_configured' }, { status: 503 });
  }
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'signin_required' }, { status: 401 });

  const plan = await getLatestPlan(user.id);
  if (!plan || plan.items.length === 0) {
    return NextResponse.json({ error: 'no_plan' }, { status: 400 });
  }

  const session = new TokenSession(
    req.cookies.get(COOKIE.accessToken)?.value,
    req.cookies.get(COOKIE.refreshToken)?.value,
  );
  if (!session.connected) {
    return NextResponse.json({ error: 'not_connected' }, { status: 401 });
  }

  // Nights the user dropped since the last sync. Cleared before the writes so
  // a later failure cannot leave a deleted night on the calendar.
  let orphanedEventIds: string[] = [];
  try {
    const body = (await req.json()) as { orphanedEventIds?: unknown };
    if (Array.isArray(body?.orphanedEventIds)) {
      orphanedEventIds = body.orphanedEventIds.filter((id): id is string => typeof id === 'string');
    }
  } catch {
    // No body is fine — a plain re-sync sends nothing.
  }

  let calendarId: string | null;
  try {
    calendarId = await getCalendarId(user.id);

    // The user may have deleted the calendar in Google. Its id and every event
    // id under it are then dead, and patching would 404 forever.
    if (calendarId && !(await session.run((t) => calendarExists(t, calendarId as string)))) {
      await clearCalendarLink(user.id);
      calendarId = null;
    }

    if (!calendarId) {
      const created = await session.run((t) => createMealCalendar(t, plan.time_zone));
      calendarId = created.id;
      await setCalendarId(user.id, calendarId);
    }
  } catch (err) {
    if (err instanceof CalendarApiError && (err.status === 401 || err.status === 403)) {
      return NextResponse.json({ error: 'not_connected' }, { status: 401 });
    }
    console.error('[calendar] could not resolve the meal calendar', err);
    return NextResponse.json({ error: 'calendar_unavailable' }, { status: 502 });
  }

  // A plan whose event ids point at a calendar that has since been recreated
  // would patch into nothing; clearCalendarLink already nulled them, so re-read.
  const current = (await getLatestPlan(user.id)) ?? plan;

  const failures: Array<{ cookDate: string; reason: string }> = [];
  let written = 0;

  for (const eventId of orphanedEventIds) {
    try {
      await session.run((t) => deleteEvent(t, calendarId as string, eventId));
    } catch (err) {
      // A 404/410 means it is already gone, which is the outcome we wanted.
      const gone =
        err instanceof CalendarApiError && (err.status === 404 || err.status === 410);
      if (!gone) console.error('[calendar] could not remove a dropped night', err);
    }
  }

  for (const item of current.items) {
    const recipe = getRecipeBySlug(item.recipe_slug);
    if (!recipe) {
      // A slug that no longer exists in the content files. Skipped rather than
      // written as a placeholder — an event with no instructions is noise.
      failures.push({ cookDate: item.cook_date, reason: 'unknown_recipe' });
      continue;
    }

    const dinnerTime = item.dinner_time ?? current.dinner_time;
    const { start, end } = eventWindow(recipe, item.cook_date, dinnerTime);
    const recipeUrl = abs(`/recipes/${recipe.slug}`);

    const input = {
      summary: recipe.title,
      description: eventDescription(recipe, recipeUrl, dinnerTime),
      start,
      end,
      timeZone: current.time_zone,
      sourceUrl: recipeUrl,
      remindMinutesBefore: REMIND_MINUTES_BEFORE,
    };

    try {
      if (item.google_event_id) {
        try {
          await session.run((t) =>
            patchEvent(t, calendarId as string, item.google_event_id as string, input),
          );
        } catch (err) {
          // Deleted from inside Google Calendar. Recreate rather than fail:
          // the plan is the source of truth for what should be there.
          const gone =
            err instanceof CalendarApiError && (err.status === 404 || err.status === 410);
          if (!gone) throw err;
          const created = await session.run((t) => insertEvent(t, calendarId as string, input));
          await setPlanItemEventId(current.id, item.cook_date, created.id);
        }
      } else {
        const created = await session.run((t) => insertEvent(t, calendarId as string, input));
        await setPlanItemEventId(current.id, item.cook_date, created.id);
      }
      written += 1;
    } catch (err) {
      if (err instanceof CalendarApiError && err.status === 401) {
        return NextResponse.json({ error: 'not_connected' }, { status: 401 });
      }
      console.error(`[calendar] could not write ${item.cook_date}`, err);
      failures.push({ cookDate: item.cook_date, reason: 'write_failed' });
    }
  }

  const res = NextResponse.json({
    ok: failures.length === 0,
    written,
    failures,
    calendarId,
  });

  // Persist a token renewed mid-batch so the next sync does not have to repeat
  // the refresh round trip.
  if (session.renewedToken) {
    res.cookies.set(COOKIE.accessToken, session.renewedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: session.renewedExpiresIn,
    });
  }

  return res;
}
