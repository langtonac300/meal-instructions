'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'mi_consent_v1';

type ConsentState = 'granted' | 'denied' | 'unset';

/**
 * True once the reader has answered the cookie prompt, so the banner is gone.
 *
 * Exported because anything else pinned to the bottom of the viewport has to
 * stay out of the banner's way — it sits at z-50 across the full width, and a
 * floating control landing on its Accept button is not a cosmetic problem.
 * One definition, so a second copy cannot drift: only 'granted' and 'denied'
 * count, exactly as the banner's own check below does. Unreadable storage
 * counts as answered — the banner cannot render either, and hiding a feature
 * forever is the worse failure.
 */
export function consentAnswered(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'granted' || stored === 'denied';
  } catch {
    return true;
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function pushConsent(state: 'granted' | 'denied') {
  try {
    window.dataLayer = window.dataLayer || [];
    const payload = {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state,
    };

    // Google Consent Mode v2 reads the `arguments` object that gtag() pushes.
    // A real Array pushed onto dataLayer is NOT equivalent — Google ignores it,
    // so the update silently never applies and tags stay gated at the default.
    // The inline script in <head> defines window.gtag synchronously on every
    // render and this only runs post-hydration, so it is always set by the time
    // a user can click; if it somehow isn't, that script still restores the
    // stored choice as the default on the next page load.
    window.gtag?.('consent', 'update', payload);
  } catch {
    // ignore
  }
}

export default function ConsentBanner() {
  const [state, setState] = useState<ConsentState>('unset');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'granted' || stored === 'denied') {
        setState(stored);
      } else {
        setState('unset');
      }
    } catch {
      setState('unset');
    }
  }, []);

  const record = (next: 'granted' | 'denied') => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
    pushConsent(next);
    setState(next);
  };

  if (state !== 'unset') return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-50 bg-paper-card hairline-t shadow-lg no-print"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
        <p className="text-xs sm:text-sm text-ink font-sans leading-relaxed">
          We use cookies for essential site functions, aggregate analytics, and
          personalized advertising served by Google and its partners. You can
          accept all, reject non-essential, or read our{' '}
          <Link href="/privacy" className="underline">Privacy Policy</Link>.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => record('denied')}
            className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider bg-paper hairline-border text-ink hover:border-ink transition-colors cursor-pointer"
          >
            Reject non-essential
          </button>
          <button
            onClick={() => record('granted')}
            className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider bg-ink text-paper hover:bg-accent transition-colors cursor-pointer"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
