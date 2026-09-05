'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { recordMilestone } from '@/lib/engagement';
import { emitCrossing } from '@/lib/analytics';

/**
 * Feeds the passive engagement signals — time on site, scroll depth, and
 * whether someone looked at more than one recipe — into the session score.
 *
 * Mounted once in the root layout. The dwell timers deliberately start at mount
 * and run for the whole session rather than resetting per page, because the
 * question is "how long has this person been here", not "how long on this page".
 */
export default function EngagementTracker() {
  const pathname = usePathname();
  const recipesSeen = useRef<Set<string>>(new Set());

  // Session dwell. Client-side navigation keeps this layout mounted, so these
  // survive route changes; only a hard reload restarts them.
  useEffect(() => {
    const atOneMinute = setTimeout(() => emitCrossing(recordMilestone('dwell_60s')), 60_000);
    const atThreeMinutes = setTimeout(() => emitCrossing(recordMilestone('dwell_180s')), 180_000);
    return () => {
      clearTimeout(atOneMinute);
      clearTimeout(atThreeMinutes);
    };
  }, []);

  // A second distinct recipe means browsing rather than bouncing.
  useEffect(() => {
    if (!pathname?.startsWith('/recipes/')) return;
    recipesSeen.current.add(pathname);
    if (recipesSeen.current.size >= 2) {
      emitCrossing(recordMilestone('recipe_view_repeat'));
    }
  }, [pathname]);

  // Scroll depth, re-armed per route. recordMilestone is once-per-session, so
  // reaching the bottom of a second page costs nothing.
  useEffect(() => {
    let reached = false;
    const onScroll = () => {
      if (reached) return;
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      if (scrollable <= 0) return;
      if (el.scrollTop / scrollable >= 0.75) {
        reached = true;
        emitCrossing(recordMilestone('scroll_75'));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return null;
}
