'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { CalendarPlus, Check, LogIn, RefreshCw, X } from 'lucide-react';
import {
  DEFAULT_DINNER_TIME,
  MAX_PLAN_ITEMS,
  startTimeLabel,
  leadMinutes,
  type PlannerRecipe,
} from '@/lib/plan';
import { track } from '@/lib/analytics';

const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.14em] font-bold';
const BUTTON =
  'px-3.5 py-2 border border-ink text-[14px] font-semibold text-ink hover:bg-ink hover:text-paper transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-ink';
const PRIMARY =
  'px-4 py-2.5 bg-ink text-paper text-[14px] font-semibold hover:bg-accent transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-ink';

const NIGHT_PRESETS = [3, 5, 7] as const;

/** Local "YYYY-MM-DD". toISOString would answer in UTC and shift the date. */
function toLocalDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function addDays(date: string, days: number): string {
  const [y, m, d] = date.split('-').map(Number);
  const next = new Date(y, m - 1, d + days);
  return toLocalDate(next);
}

function tomorrow(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return toLocalDate(d);
}

function weekdayLabel(date: string): string {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

interface Night {
  cookDate: string;
  recipeSlug: string | null;
}

function buildNights(startDate: string, count: number, previous: Night[]): Night[] {
  // Keep whatever was already chosen for a date that survives the resize, so
  // changing 5 nights to 7 does not wipe the five meals already picked.
  const bySlug = new Map(previous.map((n) => [n.cookDate, n.recipeSlug]));
  return Array.from({ length: count }, (_, i) => {
    const cookDate = addDays(startDate, i);
    return { cookDate, recipeSlug: bySlug.get(cookDate) ?? null };
  });
}

/** Feedback from the OAuth round trip, which comes back as ?calendar=… */
const CALLBACK_MESSAGE: Record<string, string> = {
  connected: 'Google Calendar connected.',
  denied: 'Calendar access was declined, so nothing was written.',
  state_mismatch: 'That connection attempt expired. Try again.',
  exchange_failed: 'Google refused the connection. Try again.',
  invalid: 'That connection attempt was incomplete. Try again.',
  error: 'Google returned an error. Try again.',
};

type Status =
  | { kind: 'idle' }
  | { kind: 'busy'; message: string }
  | { kind: 'ok'; message: string }
  | { kind: 'error'; message: string };

export default function PlanBuilder({ recipes }: { recipes: PlannerRecipe[] }) {
  const { data: session, status: authStatus } = useSession();
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState(tomorrow);
  const [dinnerTime, setDinnerTime] = useState(DEFAULT_DINNER_TIME);
  const [nights, setNights] = useState<Night[]>(() => buildNights(tomorrow(), 5, []));
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [loaded, setLoaded] = useState(false);
  /** Set when we return from Google mid-way through an "add to calendar". */
  const [resumeSync, setResumeSync] = useState(false);

  const bySlug = useMemo(() => new Map(recipes.map((r) => [r.slug, r])), [recipes]);
  const chosen = nights.filter((n) => n.recipeSlug);
  const signedIn = Boolean(session?.user);

  // The OAuth round trip's outcome. Coming back "connected" is the middle of
  // an action, not the end of one: the reader pressed "add to calendar", got
  // sent to Google, and said yes. Reporting success and stopping there leaves
  // the plan unwritten and looks, correctly, like the button did nothing —
  // so the write is resumed automatically instead of waiting for a second press.
  useEffect(() => {
    const outcome = searchParams?.get('calendar');
    if (!outcome) return;
    // Strip it first: this must not re-fire on every later render, and a
    // reload should not kick off another write.
    window.history.replaceState(null, '', window.location.pathname + window.location.hash);
    if (outcome === 'connected') {
      setResumeSync(true);
      return;
    }
    setStatus({
      kind: 'error',
      message: CALLBACK_MESSAGE[outcome] ?? 'Something went wrong connecting Google Calendar.',
    });
  }, [searchParams]);

  // `?add=<slug>` — what the "Plan this for a night" button on a recipe page
  // hands over. It fills the first night with nothing on it, so arriving from
  // a recipe puts you one click from a calendar entry rather than back at an
  // empty grid. The param is stripped afterwards: a reload should not silently
  // re-add the meal to a night the reader has since cleared.
  useEffect(() => {
    // Gated on `loaded`: the saved-plan restore below is a fetch, and applying
    // the handoff first would let that response land afterwards and wipe it.
    if (!loaded) return;
    const slug = searchParams?.get('add');
    if (!slug || !bySlug.has(slug)) return;
    setNights((prev) => {
      if (prev.some((n) => n.recipeSlug === slug)) return prev;
      const target = prev.find((n) => !n.recipeSlug);
      if (target) {
        return prev.map((n) => (n.cookDate === target.cookDate ? { ...n, recipeSlug: slug } : n));
      }
      // Every night already has a meal. Add one on the end rather than doing
      // nothing — arriving from a recipe page is a request to cook that meal,
      // and silently ignoring it looks like a broken button.
      if (prev.length >= MAX_PLAN_ITEMS) return prev;
      const last = prev[prev.length - 1];
      const cookDate = last ? addDays(last.cookDate, 1) : startDate;
      return [...prev, { cookDate, recipeSlug: slug }];
    });
    window.history.replaceState(null, '', window.location.pathname + window.location.hash);
  }, [searchParams, bySlug, loaded, startDate]);

  // Load whatever plan is already saved, so the page reopens where it was left.
  useEffect(() => {
    if (loaded) return;
    // Nothing to restore when signed out, but the flag still has to flip: the
    // ?add= handoff waits on it, and signing in returns to this same URL.
    if (!signedIn) {
      setLoaded(true);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/meals/plan');
        if (!res.ok) return;
        const { plan } = (await res.json()) as {
          plan: {
            dinner_time: string;
            items: Array<{ recipe_slug: string; cook_date: string }>;
          } | null;
        };
        if (cancelled || !plan || plan.items.length === 0) return;
        setDinnerTime(plan.dinner_time);
        setStartDate(plan.items[0].cook_date);
        setNights(
          plan.items.map((i) => ({ cookDate: i.cook_date, recipeSlug: i.recipe_slug })),
        );
      } catch {
        // A failed restore is not worth an error banner — the planner still works empty.
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [signedIn, loaded]);

  const resize = useCallback(
    (count: number) => setNights((prev) => buildNights(startDate, count, prev)),
    [startDate],
  );

  const restart = useCallback(
    (date: string) => {
      setStartDate(date);
      setNights((prev) => buildNights(date, prev.length, prev));
    },
    [],
  );

  const setMeal = useCallback((cookDate: string, recipeSlug: string | null) => {
    setNights((prev) => prev.map((n) => (n.cookDate === cookDate ? { ...n, recipeSlug } : n)));
    setStatus({ kind: 'idle' });
  }, []);

  /** Saves and returns the ids of events for nights that were dropped. */
  async function savePlan(): Promise<string[]> {
    const res = await fetch('/api/meals/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dinnerTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        items: chosen.map((n) => ({
          recipeSlug: n.recipeSlug,
          cookDate: n.cookDate,
          dinnerTime: null,
        })),
      }),
    });
    if (!res.ok) {
      const { error } = (await res.json().catch(() => ({}))) as { error?: string };
      throw new Error(error ?? 'save_failed');
    }
    const { orphanedEventIds } = (await res.json()) as { orphanedEventIds?: string[] };
    return orphanedEventIds ?? [];
  }

  async function onSave() {
    setStatus({ kind: 'busy', message: 'Saving…' });
    try {
      await savePlan();
      setStatus({ kind: 'ok', message: `Plan saved — ${chosen.length} nights.` });
      track('tool_used', { tool: 'meal_plan', nights_planned: chosen.length, action: 'save' });
    } catch {
      setStatus({ kind: 'error', message: 'Could not save the plan. Try again.' });
    }
  }

  async function onSync() {
    setStatus({ kind: 'busy', message: 'Saving the plan…' });
    let orphanedEventIds: string[];
    try {
      orphanedEventIds = await savePlan();
    } catch {
      setStatus({ kind: 'error', message: 'Could not save the plan, so nothing was written.' });
      return;
    }

    setStatus({ kind: 'busy', message: 'Writing to Google Calendar…' });
    try {
      const res = await fetch('/api/calendar/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orphanedEventIds }),
      });

      // Not connected yet, or the grant lapsed: send them through consent and
      // come back here. The plan is already saved, so nothing is lost.
      if (res.status === 401) {
        const { error } = (await res.json().catch(() => ({}))) as { error?: string };
        if (error === 'not_connected') {
          window.location.href = '/api/calendar/authorize?returnTo=/plan';
          return;
        }
        setStatus({ kind: 'error', message: 'Sign in again to write to your calendar.' });
        return;
      }

      // Token accepted, call refused. Another consent screen cannot fix this,
      // so do not send them round the loop again — say what to check.
      if (res.status === 403) {
        setStatus({
          kind: 'error',
          message:
            'Google accepted the sign-in but refused the calendar. The plan is saved — this needs fixing on our side.',
        });
        return;
      }

      if (!res.ok) {
        setStatus({ kind: 'error', message: 'Google would not take the events. Try again.' });
        return;
      }

      const { written, failures } = (await res.json()) as {
        written: number;
        failures: Array<{ cookDate: string }>;
      };
      track('tool_used', { tool: 'meal_plan', nights_planned: written, action: 'calendar_sync' });
      setStatus({
        kind: failures.length ? 'error' : 'ok',
        message: failures.length
          ? `${written} on the calendar, ${failures.length} could not be written.`
          : `${written} dinners on your calendar.`,
      });
    } catch {
      setStatus({ kind: 'error', message: 'Could not reach Google Calendar. Try again.' });
    }
  }

  // onSync is redeclared every render; the ref keeps the resume effect from
  // re-firing each time while still calling the current closure.
  const syncRef = useRef(onSync);
  syncRef.current = onSync;

  useEffect(() => {
    if (!resumeSync || !loaded) return;
    setResumeSync(false);
    void syncRef.current();
  }, [resumeSync, loaded]);

  if (authStatus === 'loading') {
    return <div className="border-t border-ink py-8 text-ink-muted">Loading…</div>;
  }

  if (!signedIn) {
    return (
      <section className="border border-ink p-6 sm:p-8">
        <p className={`${EYEBROW} text-ink-subtle`}>Sign-in required</p>
        <h2 className="mt-2 text-[24px] font-extrabold tracking-[-0.01em] uppercase">
          A plan follows you across devices
        </h2>
        <p className="mt-2 text-[16px] text-ink-muted max-w-[60ch]">
          Planned nights are stored against your account so the calendar can be rebuilt from
          your phone or your laptop. Everything else on this site works signed out.
        </p>
        <button type="button" onClick={() => signIn('google')} className={`${PRIMARY} mt-5 inline-flex items-center gap-2`}>
          <LogIn className="w-[15px] h-[15px]" aria-hidden="true" />
          Sign in with Google
        </button>
      </section>
    );
  }

  return (
    <section>
      {/* ── Controls ── */}
      <div className="border-t border-ink pt-5 flex flex-wrap items-end gap-x-8 gap-y-4">
        <label className="block">
          <span className={`${EYEBROW} text-ink-subtle block mb-1.5`}>First night</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => e.target.value && restart(e.target.value)}
            className="border border-hairline bg-paper-50 px-3 py-2 text-[14px] focus:border-ink outline-none"
          />
        </label>

        <label className="block">
          <span className={`${EYEBROW} text-ink-subtle block mb-1.5`}>On the table</span>
          <input
            type="time"
            value={dinnerTime}
            onChange={(e) => e.target.value && setDinnerTime(e.target.value)}
            className="border border-hairline bg-paper-50 px-3 py-2 text-[14px] focus:border-ink outline-none"
          />
        </label>

        <div>
          <span className={`${EYEBROW} text-ink-subtle block mb-1.5`}>How many nights</span>
          <div className="flex gap-2">
            {NIGHT_PRESETS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => resize(n)}
                aria-pressed={nights.length === n}
                className={`px-3.5 py-2 border text-[14px] font-semibold transition-colors cursor-pointer ${
                  nights.length === n
                    ? 'border-ink bg-ink text-paper'
                    : 'border-hairline text-ink-muted hover:border-ink hover:text-ink'
                }`}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => resize(Math.min(nights.length + 1, MAX_PLAN_ITEMS))}
              disabled={nights.length >= MAX_PLAN_ITEMS}
              className={BUTTON}
            >
              + night
            </button>
          </div>
        </div>
      </div>

      {/* ── The nights ── */}
      <ol className="mt-8 border-t border-ink">
        {nights.map((night) => {
          const recipe = night.recipeSlug ? bySlug.get(night.recipeSlug) : undefined;
          return (
            <li
              key={night.cookDate}
              className="grid grid-cols-1 sm:grid-cols-[9rem_1fr_auto] items-center gap-x-6 gap-y-2 py-[14px] border-b border-hairline"
            >
              <span className="font-mono text-[13px] uppercase tracking-[0.08em] text-ink">
                {weekdayLabel(night.cookDate)}
              </span>

              <div className="flex items-center gap-3 min-w-0">
                <select
                  value={night.recipeSlug ?? ''}
                  onChange={(e) => setMeal(night.cookDate, e.target.value || null)}
                  aria-label={`Meal for ${weekdayLabel(night.cookDate)}`}
                  className="w-full max-w-[42ch] border border-hairline bg-paper-50 px-3 py-2 text-[14px] focus:border-ink outline-none"
                >
                  <option value="">— nothing planned —</option>
                  {recipes.map((r) => (
                    <option key={r.slug} value={r.slug}>
                      {r.title} · {r.totalMinutes} min
                    </option>
                  ))}
                </select>
                {night.recipeSlug && (
                  <button
                    type="button"
                    onClick={() => setMeal(night.cookDate, null)}
                    aria-label={`Clear ${weekdayLabel(night.cookDate)}`}
                    className="text-ink-subtle hover:text-ink transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Derived from the recipe's own timing, never stored (HR-2). */}
              <span className="font-mono text-[12px] text-ink-subtle whitespace-nowrap">
                {recipe
                  ? `start ${startTimeLabel(recipe, dinnerTime)} · ${leadMinutes(recipe)} min`
                  : '—'}
              </span>
            </li>
          );
        })}
      </ol>

      {/* ── Actions ── */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onSync}
          disabled={chosen.length === 0 || status.kind === 'busy'}
          className={`${PRIMARY} inline-flex items-center gap-2`}
        >
          {status.kind === 'busy' ? (
            <RefreshCw className="w-[15px] h-[15px] animate-spin" aria-hidden="true" />
          ) : (
            <CalendarPlus className="w-[15px] h-[15px]" aria-hidden="true" />
          )}
          Add {chosen.length || ''} {chosen.length === 1 ? 'dinner' : 'dinners'} to Google Calendar
        </button>

        <button
          type="button"
          onClick={onSave}
          disabled={chosen.length === 0 || status.kind === 'busy'}
          className={BUTTON}
        >
          Save without the calendar
        </button>

        {status.kind !== 'idle' && (
          <p
            role="status"
            className={`text-[14px] inline-flex items-center gap-1.5 ${
              status.kind === 'error' ? 'text-accent font-semibold' : 'text-ink-muted'
            }`}
          >
            {status.kind === 'ok' && <Check className="w-4 h-4" aria-hidden="true" />}
            {status.message}
          </p>
        )}
      </div>

      <p className="mt-4 text-[13px] text-ink-subtle max-w-[70ch]">
        Meals go on their own <strong className="font-semibold text-ink-muted">Meal Instructions</strong>{' '}
        calendar, not your main one. This site can only see the calendar it made — delete it in
        Google and every planned dinner goes with it. Pressing the button again updates the same
        events rather than adding a second copy.{' '}
        <Link href="/privacy" className="underline hover:text-ink">
          Privacy
        </Link>
      </p>
    </section>
  );
}
