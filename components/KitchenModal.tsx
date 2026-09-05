'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Check } from 'lucide-react';
import { APPLIANCES } from '@/data/appliances';
import { LeanIcon } from '@/components/icons/Lean5SIcons';
import { EMPTY_PROFILE, isConfigured, readProfile, writeProfile } from '@/lib/profile';
import { track } from '@/lib/analytics';
import type { Appliance } from '@/lib/types';

const SEEN_KEY = 'mi_kitchen_modal_v1';

/**
 * On-arrival kitchen setup overlay.
 *
 * TRADEOFF, recorded deliberately: AGENTS.md HR-7 bans modals and interstitials
 * because Google treats content-blocking overlays as a ranking negative and they
 * damage LCP/CLS. Nearly all traffic here lands on a datasheet from search, which
 * is the audience that penalty targets. This was shipped on an explicit product
 * decision by Alex, weighed against that cost. Three things keep the damage as
 * low as an on-arrival overlay allows:
 *
 *   1. It renders only after hydration, so the SSR HTML is untouched — crawlers
 *      never see an overlay, and there is no layout shift on first paint.
 *   2. It is fixed-position, so it never displaces content (no CLS).
 *   3. It shows once per visitor, ever. Dismissed or completed, it never returns.
 *
 * If organic rankings or Core Web Vitals move, this component is the first thing
 * to switch back to the sticky inline banner HR-7 prescribes.
 */
export default function KitchenModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<Appliance[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((reason: 'dismissed' | 'completed') => {
    try {
      localStorage.setItem(SEEN_KEY, '1');
    } catch {
      // private mode — it reappears next visit, which is the safe failure
    }
    setOpen(false);
    if (reason === 'dismissed') track('profile_start', { surface: 'modal', outcome: 'dismissed' });
  }, []);

  useEffect(() => {
    // Never on the setup page itself, and never for someone already set up.
    if (pathname?.startsWith('/account/setup')) return;
    if (isConfigured(readProfile())) return;
    try {
      if (localStorage.getItem(SEEN_KEY) === '1') return;
    } catch {
      return;
    }

    // A short beat so the overlay never competes with the page's own largest
    // paint. Still on arrival; just not before the content behind it exists.
    const timer = setTimeout(() => {
      setOpen(true);
      track('profile_start', { surface: 'modal', outcome: 'shown' });
    }, 900);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Escape to dismiss, and hold body scroll while it is up.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close('dismissed');
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstButtonRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  if (!open) return null;

  const toggle = (slug: Appliance) =>
    setPicked((p) => (p.includes(slug) ? p.filter((a) => a !== slug) : [...p, slug]));

  const save = () => {
    writeProfile({ ...EMPTY_PROFILE, appliances: picked });
    track('profile_complete', {
      appliances: picked.length,
      surface: 'modal',
      partial: true,
    });
    close('completed');
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm"
      onClick={() => close('dismissed')}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="kitchen-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-paper hairline-border shadow-float max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between gap-4 p-5 hairline-b">
          <div>
            <div className="micro-label text-accent">30 SECONDS, ONCE</div>
            <h2
              id="kitchen-modal-title"
              className="text-xl font-bold uppercase tracking-tight text-ink font-sans mt-1"
            >
              What do you cook on?
            </h2>
            <p className="text-sm text-ink-muted mt-1 font-sans leading-relaxed">
              378 cook-time datasheets across 11 appliances. Tell us what you own and every
              chart puts yours first.
            </p>
          </div>
          <button
            type="button"
            onClick={() => close('dismissed')}
            aria-label="Close"
            className="p-1 text-ink-subtle hover:text-ink transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {APPLIANCES.map((app, i) => {
            const on = picked.includes(app.slug);
            return (
              <button
                key={app.slug}
                ref={i === 0 ? firstButtonRef : undefined}
                type="button"
                onClick={() => toggle(app.slug)}
                aria-pressed={on}
                className={`flex items-center gap-2 p-2.5 hairline-border text-left transition-colors cursor-pointer ${
                  on
                    ? 'bg-ink text-paper border-ink'
                    : 'bg-paper-card text-ink-muted hover:text-ink hover:border-ink'
                }`}
              >
                <LeanIcon
                  name={app.slug}
                  size={18}
                  className={on ? 'text-paper' : 'text-ink-muted'}
                />
                <span className="font-mono text-[10px] uppercase tracking-wider leading-tight">
                  {app.name}
                </span>
                {on && <Check className="w-3 h-3 ml-auto shrink-0" />}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-3 p-5 hairline-t">
          <button
            type="button"
            onClick={() => close('dismissed')}
            className="font-mono text-[10px] uppercase tracking-wider text-ink-subtle hover:text-ink transition-colors cursor-pointer"
          >
            Not now
          </button>
          <div className="flex items-center gap-2">
            <Link
              href="/account/setup"
              onClick={() => close('completed')}
              className="font-mono text-[10px] uppercase tracking-wider text-ink-muted hover:text-ink underline"
            >
              Full setup
            </Link>
            <button
              type="button"
              onClick={save}
              disabled={picked.length === 0}
              className="px-4 py-2 bg-ink text-paper font-mono text-[10px] uppercase tracking-wider hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Personalise {picked.length > 0 && `(${picked.length})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
