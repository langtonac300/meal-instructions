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
    if (typeof window !== 'undefined') {
      const w = window as unknown as { __srlog?: unknown[] };
      if (!w.__srlog) w.__srlog = [];
      w.__srlog.push({
        ev: 'effect',
        skippedMountWas: skippedMount.current,
        deps: JSON.stringify(deps),
        top: ref.current ? Math.round(ref.current.getBoundingClientRect().top) : null,
        offset,
      });
    }
    if (!skippedMount.current) {
      skippedMount.current = true;
      return;
    }

    const el = ref.current;
    if (typeof window === 'undefined' || !el) return;

    const top = el.getBoundingClientRect().top;

    // Already comfortably visible — leave the page where it is.
    if (top >= offset && top <= window.innerHeight * 0.5) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    window.scrollTo({
      top: Math.max(0, window.scrollY + top - offset),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
