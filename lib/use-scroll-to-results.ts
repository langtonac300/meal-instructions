'use client';

import { useEffect, useRef } from 'react';

/**
 * Sticky header is `h-16` (64px) in components/Navbar.tsx. The thin status bar
 * above it scrolls away, so it does not count. A little extra keeps the section
 * heading off the header's bottom hairline.
 */
const HEADER_OFFSET = 76;

/**
 * When a filter changes, bring the results into view.
 *
 * Filter controls are often a screen or more above the results they drive, so
 * pressing one appears to do nothing — the page updates below the fold. This
 * returns a ref to put on the results container; whenever `deps` change it
 * scrolls that container under the sticky header.
 *
 * Deliberately does nothing when:
 *  - it is the first render (landing on the page should not move the page)
 *  - the container is already sitting in the top half of the viewport, so a
 *    desktop user who can see the results is not yanked around
 *
 * Pass only the values a user picks — a category, an appliance, a time cap.
 * Never pass a search query: scrolling on every keystroke is miserable.
 *
 * `options.offset` overrides the sticky-header allowance. Raise it on pages that
 * stack a second sticky bar under the header (the recipe page's mode selector).
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

    // Two frames, not zero: the effect runs before the browser has laid out
    // React's commit. Both surfaces resize hard on change — the homepage list
    // goes 70 items to 4, the recipe page shows/hides a whole panel — and a
    // smooth scroll started against the pre-change layout gets cancelled by
    // that resize. Measure after paint, then verify we actually arrived.
    let inner = 0;
    const timers: number[] = [];

    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        const el = ref.current;
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

        // A cancelled smooth scroll leaves the user exactly where the problem
        // started, which is the bug this hook exists to fix. Re-aim a few times
        // while the list settles, then snap so we never silently do nothing.
        const checkpoints = [300, 700, 1100];
        checkpoints.forEach((delay, i) => {
          timers.push(
            window.setTimeout(() => {
              const el2 = ref.current;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
