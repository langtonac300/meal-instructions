'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Settings2, X } from 'lucide-react';
import { isConfigured, readProfile, type KitchenProfile } from '@/lib/profile';
import { APPLIANCES } from '@/data/appliances';

const DISMISS_KEY = 'mi_profile_prompt_dismissed_v1';

/**
 * Invites setup when there is no profile, and summarises it when there is.
 *
 * Renders nothing on the server and nothing on first paint — the profile lives
 * in localStorage, so anything else would either flash or mismatch hydration.
 * The page underneath is complete without it.
 */
export default function KitchenPrompt() {
  const [profile, setProfile] = useState<KitchenProfile | null>(null);
  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setProfile(readProfile());
    try {
      setDismissed(localStorage.getItem(DISMISS_KEY) === '1');
    } catch {
      setDismissed(false);
    }
    setReady(true);
  }, []);

  if (!ready) return null;

  if (isConfigured(profile)) {
    const names = profile.appliances
      .map((slug) => APPLIANCES.find((a) => a.slug === slug)?.name ?? slug)
      .slice(0, 3);
    const extra = profile.appliances.length - names.length;

    return (
      <div className="flex items-center justify-between gap-3 bg-paper-subtle hairline-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider">
        <span className="text-ink-muted">
          Your kitchen first: <span className="text-ink font-bold">{names.join(', ')}</span>
          {extra > 0 && <span className="text-ink-subtle"> +{extra}</span>}
        </span>
        <Link href="/account/setup" className="text-ink-muted hover:text-ink underline shrink-0">
          Edit
        </Link>
      </div>
    );
  }

  if (dismissed) return null;

  return (
    <div className="flex items-center justify-between gap-3 bg-paper-card hairline-border px-4 py-3">
      <div className="flex items-center gap-3 min-w-0">
        <Settings2 className="w-4 h-4 text-accent shrink-0" />
        <p className="text-xs sm:text-sm text-ink font-sans leading-snug">
          <span className="font-bold">Own an air fryer but no smoker?</span>{' '}
          <span className="text-ink-muted">
            Tell us your equipment once and every chart puts yours first.
          </span>
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href="/account/setup"
          className="px-3 py-1.5 bg-ink text-paper font-mono text-[10px] uppercase tracking-wider hover:bg-accent transition-colors whitespace-nowrap"
        >
          Set up
        </Link>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            try {
              localStorage.setItem(DISMISS_KEY, '1');
            } catch {
              // ignore
            }
            setDismissed(true);
          }}
          className="p-1 text-ink-subtle hover:text-ink transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
