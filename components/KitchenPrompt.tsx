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
interface Props {
  /** 'bar' is the slim in-page strip; 'card' is the fuller block for /account. */
  variant?: 'bar' | 'card';
}

export default function KitchenPrompt({ variant = 'bar' }: Props) {
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

    if (variant === 'card') {
      const all = profile.appliances.map(
        (slug) => APPLIANCES.find((a) => a.slug === slug)?.name ?? slug
      );
      return (
        <div className="hairline-border bg-paper-card p-4 space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {all.map((name) => (
              <span
                key={name}
                className="px-2 py-1 bg-paper hairline-border font-mono text-[10px] uppercase tracking-wider text-ink"
              >
                {name}
              </span>
            ))}
          </div>
          <p className="text-sm text-ink-muted font-sans">
            Feeding {profile.adults} adult{profile.adults === 1 ? '' : 's'}
            {profile.kids > 0 && ` and ${profile.kids} kid${profile.kids === 1 ? '' : 's'}`}.
            {profile.avoid.length > 0 && ` Avoiding ${profile.avoid.join(', ')}.`}
          </p>
          <Link
            href="/account/setup"
            className="inline-block px-3 py-1.5 bg-ink text-paper font-mono text-[10px] uppercase tracking-wider hover:bg-accent transition-colors"
          >
            Edit kitchen
          </Link>
        </div>
      );
    }

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

  if (variant === 'card') {
    return (
      <div className="hairline-border bg-paper-card p-4 space-y-2">
        <p className="text-sm text-ink font-sans">
          You have not set up your kitchen yet. Tell us what you own and every cook-time chart
          and recipe sorts to your equipment.
        </p>
        <Link
          href="/account/setup"
          className="inline-block px-3 py-1.5 bg-ink text-paper font-mono text-[10px] uppercase tracking-wider hover:bg-accent transition-colors"
        >
          Set up my kitchen
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
