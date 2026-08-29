'use client';

import { useCallback, useEffect, useRef } from 'react';

/**
 * Sticky header is `h-16` (64px) in components/Navbar.tsx. The thin status bar
 * above it scrolls away, so it does not count. A little extra keeps the section
 * heading off the header's bottom hairline.
 */
const HEADER_OFFSET = 76;

/**
 * Bring `el` under the sticky header.
 *
 * Both surfaces this is used on resize hard when they change — the homepage list
 * goes from 70 items to 4, the recipe page shows and hides a whole panel — and a
 * smooth scroll started against the pre-change layout gets cancelled by that
 * resize. So: measure after two frames rather than immediately, then re-aim a
 * few times while things settle and snap on the last attempt. A cancelled
 * animation must never leave the reader where they started, because that is
 * exactly the bug this exists to fix.
 *
 * Returns a cancel function for the pending frames and timers.
 */
function scrollElementIntoView(
  getEl: () => HTMLElement | null,
  offset: number
): () => void {
  let inner = 0;
  const timers: number[] = [];

  const outer = requestAnimationFrame(() => {
    inner = requestAnimationFrame(() => {
      const el = getEl();
      if (!el) return;

      const top = el.getBoundingClientRect().top;

      // Already comfortably visible — leave the page where it is.
      if (top >= offset && top <= window.innerHeight * 0.5) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      el.style.scrollMarginTop = `${offset}px`;
      el.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });

      if (prefersReducedMotion) return;

      const checkpoints = [300, 700, 1100];
      checkpoints.forEach((delay, i) => {
        timers.push(
          window.setTimeout(() => {
            const el2 = getEl();
            if (!el2) return;
            if (Math.abs(el2.getBoundingClientRect().top - offset) <= 24) return;
            el2.scrollIntoView({
              behavior: i === checkpoints.length - 1 ? 'auto' : 'smooth',
              block: 'start',
            });
          }, delay)
        );
      });
    });
  });

  return () => {
    cancelAnimationFrame(outer);
    if (inner) cancelAnimationFrame(inner);
    timers.forEach((t) => window.clearTimeout(t));
  };
}

/**
 * Scroll the results into view whenever `deps` change.
 *
 * Filter controls are often a screen or more above the results they drive, so
 * pressing one appears to do nothing — the page updates below the fold. Put the
 * returned ref on the results container.
 *
 * Skips the first render, so landing on the page never moves it.
 *
 * Pass only the values a user picks — a category, an appliance, a time cap.
 * Never pass a search query: scrolling on every keystroke is miserable.
 *
 * Use this where the change comes from ordinary state. Where you have the click
 * itself, prefer `useScrollToTarget` — triggering from the handler is immune to
 * effects re-running and cancelling the scroll mid-flight.
 */
export function useScrollToResults<T extends HTMLElement = HTMLDivElement>(
  deps: readonly unknown[],
  options: { offset?: number } = {}
) {
  const { offset = HEADER_OFFSET } = options;
  const ref = useRef<T>(null);
  const skippedMount = useRef(false);

  useEffect(() => {
    if (!skippedMount.current) {
      skippedMount.current = true;
      return;
    }
    if (typeof window === 'undefined' || !ref.current) return;
    return scrollElementIntoView(() => ref.current, offset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/**
 * Imperative form: a ref for the target, and a function to call from the click
 * handler that caused the change.
 *
 * `options.offset` should clear everything pinned above the target — on the
 * recipe page that is the 64px header plus the sticky mode selector.
 */
export function useScrollToTarget<T extends HTMLElement = HTMLDivElement>(
  options: { offset?: number } = {}
) {
  const { offset = HEADER_OFFSET } = options;
  const ref = useRef<T>(null);
  const cancelRef = useRef<(() => void) | null>(null);

  const scrollToTarget = useCallback(() => {
    if (typeof window === 'undefined') return;
    cancelRef.current?.();
    cancelRef.current = scrollElementIntoView(() => ref.current, offset);
  }, [offset]);

  useEffect(() => () => cancelRef.current?.(), []);

  return [ref, scrollToTarget] as const;
}
