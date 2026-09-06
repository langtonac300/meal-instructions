'use client';

/**
 * Floating "Add to Google Calendar" button on every recipe page.
 *
 * One tap does the whole job: the meal goes onto the next free night of the
 * reader's plan, and the plan is written to their Google calendar. The button
 * says Google Calendar, so it has to actually reach Google Calendar — adding
 * to a plan and stopping there would be a lie told in Google's own colours.
 *
 * Not connected yet: the tap sends them through the one-time consent screen
 * and the write resumes on return, so the round trip still costs one press.
 *
 * Styling follows Google's button convention — white surface, #DADCE0 border,
 * #3C4043 label — so it reads as an integration rather than as our own UI.
 *
 * It never blocks content: it waits until the reader has scrolled, holds back
 * while the cookie banner owns the bottom of the screen, clears the safe area
 * on phones, and is removed entirely from print.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Check, RefreshCw } from 'lucide-react';
import { track } from '@/lib/analytics';
import { consentAnswered } from '@/components/ConsentBanner';
import GoogleCalendarMark from '@/components/GoogleCalendarMark';

interface Props {
  recipeSlug: string;
}

type State =
  | { kind: 'idle' }
  | { kind: 'working'; message: string }
  | { kind: 'done'; cookDate: string; onCalendar: boolean }
  | { kind: 'error'; message: string };

/** Marks a return trip from Google so the write can finish itself. */
const RESUME_PARAM = 'gcal';

const BUTTON =
  'inline-flex items-center gap-2.5 px-4 sm:px-[18px] py-3 bg-white text-[#3C4043] ' +
  'text-[15px] font-medium border border-[#DADCE0] rounded-[4px] shadow-lg ' +
  'hover:bg-[#F8F9FA] hover:border-[#D2E3FC] transition-colors cursor-pointer ' +
  'disabled:opacity-70 disabled:cursor-not-allowed';

function weekdayLabel(date: string): string {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export default function PlanFab({ recipeSlug }: Props) {
  const { data: session, status } = useSession();
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [visible, setVisible] = useState(false);
  const [consentPending, setConsentPending] = useState(true);

  // The cookie banner is fixed across the bottom at z-50. Use its own exported
  // predicate so the two cannot drift apart and land this button on its
  // Accept control.
  useEffect(() => {
    if (consentAnswered()) {
      setConsentPending(false);
      return;
    }
    // The banner writes the key from another component with no event to
    // listen for. Self-terminating: once answered, the interval clears.
    const id = setInterval(() => {
      if (consentAnswered()) {
        setConsentPending(false);
        clearInterval(id);
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Hold back until the reader has actually started reading. Appearing over
  // the hero on load is what makes a floating button feel like an ad.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (state.kind !== 'done') return;
    const t = setTimeout(() => setState({ kind: 'idle' }), 7000);
    return () => clearTimeout(t);
  }, [state]);

  const run = useCallback(async () => {
    setState({ kind: 'working', message: 'Adding…' });

    let cookDate: string;
    try {
      const res = await fetch('/api/meals/plan/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: recipeSlug,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });
      if (res.status === 409) {
        setState({ kind: 'error', message: 'Your plan is full — open it to free a night.' });
        return;
      }
      if (!res.ok) {
        setState({ kind: 'error', message: 'Could not add it. Try again.' });
        return;
      }
      ({ cookDate } = (await res.json()) as { cookDate: string });
    } catch {
      setState({ kind: 'error', message: 'Could not add it. Try again.' });
      return;
    }

    track('tool_used', { tool: 'meal_plan', action: 'quick_add', recipe: recipeSlug });

    // The night is saved either way from here, so a Google failure below costs
    // the calendar entry, never the plan.
    setState({ kind: 'working', message: 'Writing to Google Calendar…' });
    try {
      const res = await fetch('/api/calendar/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (res.status === 401) {
        const { error } = (await res.json().catch(() => ({}))) as { error?: string };
        if (error === 'not_connected') {
          // One-time consent, then finish the write on the way back.
          const back = `${window.location.pathname}?${RESUME_PARAM}=resume`;
          window.location.href = `/api/calendar/authorize?returnTo=${encodeURIComponent(back)}`;
          return;
        }
      }
      if (!res.ok) {
        setState({ kind: 'done', cookDate, onCalendar: false });
        return;
      }
      track('tool_used', { tool: 'meal_plan', action: 'calendar_sync', recipe: recipeSlug });
      setState({ kind: 'done', cookDate, onCalendar: true });
    } catch {
      setState({ kind: 'done', cookDate, onCalendar: false });
    }
  }, [recipeSlug]);

  // Finish an interrupted write after the consent round trip. The param is
  // stripped first so a reload cannot start another one.
  const runRef = useRef(run);
  runRef.current = run;
  useEffect(() => {
    if (!session?.user) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get(RESUME_PARAM) !== 'resume') return;
    window.history.replaceState(null, '', window.location.pathname + window.location.hash);
    setVisible(true);
    void runRef.current();
  }, [session]);

  if (status === 'loading' || consentPending) return null;
  // Stay mounted through a resume even before the reader scrolls.
  if (!visible && state.kind === 'idle') return null;

  const shell =
    'fixed z-40 right-4 sm:right-6 bottom-4 sm:bottom-6 no-print pb-[env(safe-area-inset-bottom)]';

  if (!session?.user) {
    return (
      <div className={shell}>
        <Link href={`/plan?add=${encodeURIComponent(recipeSlug)}`} className={BUTTON}>
          <GoogleCalendarMark />
          Add to Google Calendar
        </Link>
      </div>
    );
  }

  if (state.kind === 'done') {
    return (
      <div className={shell}>
        <div className="flex items-center gap-2.5 px-4 sm:px-[18px] py-3 bg-white text-[#3C4043] text-[15px] border border-[#DADCE0] rounded-[4px] shadow-lg max-w-[86vw]">
          <Check className="w-[17px] h-[17px] shrink-0 text-[#34A853]" aria-hidden="true" />
          <span className="truncate">
            {state.onCalendar ? 'On your calendar' : 'Planned'} ·{' '}
            <strong className="font-semibold">{weekdayLabel(state.cookDate)}</strong>
          </span>
          <Link
            href="/plan"
            className="shrink-0 text-[#1A73E8] font-medium hover:underline underline-offset-2"
          >
            View
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={shell}>
      <div className="flex flex-col items-end gap-2">
        {state.kind === 'error' && (
          <p
            role="status"
            className="px-3 py-2 bg-white border border-[#DADCE0] rounded-[4px] text-[#3C4043] text-[13px] max-w-[70vw] shadow-lg"
          >
            {state.message}
          </p>
        )}
        <button
          type="button"
          onClick={() => void run()}
          disabled={state.kind === 'working'}
          className={BUTTON}
        >
          {state.kind === 'working' ? (
            <RefreshCw className="w-[17px] h-[17px] animate-spin text-[#5F6368]" aria-hidden="true" />
          ) : (
            <GoogleCalendarMark />
          )}
          {state.kind === 'working' ? state.message : 'Add to Google Calendar'}
        </button>
      </div>
    </div>
  );
}
