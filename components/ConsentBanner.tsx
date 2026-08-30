'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'mi_consent_v1';

type ConsentState = 'granted' | 'denied' | 'unset';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function pushConsent(state: 'granted' | 'denied') {
  try {
    window.dataLayer = window.dataLayer || [];
    // Google Consent Mode v2
    window.dataLayer.push([
      'consent',
      'update',
      {
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state,
        analytics_storage: state,
      },
    ]);
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
      className="fixed bottom-0 inset-x-0 z-50 bg-paper-card hairline-t shadow-lg"
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
