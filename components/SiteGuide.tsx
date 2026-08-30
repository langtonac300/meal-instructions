'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  X,
  ArrowRight,
  Clock,
  Flame,
  Wrench,
  Compass,
  ChevronLeft,
  Zap,
  Sunrise,
  Sun,
  CloudSun,
  Sunset,
  Moon,
  Coffee,
} from 'lucide-react';

const STORAGE_KEY = 'meal_instructions_guide_seen';
const AUTO_OPEN_DELAY_MS = 4500;

type IntentId = 'dinner' | 'cooktime' | 'problem' | 'browse';
type StepTwoId =
  // dinner
  | '15-min'
  | '30-min'
  | 'hands-off'
  | 'no-thaw'
  // appliance
  | 'air-fryer'
  | 'grill'
  | 'cast-iron'
  | 'sheet-pan'
  | 'slow-cooker'
  // problem
  | 'temps'
  | 'storage'
  | 'scaling'
  | 'subs';

interface Destination {
  label: string;
  href: string;
  blurb: string;
}

type TimeBucket =
  | 'early-morning'
  | 'morning'
  | 'lunch'
  | 'afternoon-plan'
  | 'dinner-rush'
  | 'evening'
  | 'late-night';

interface TimeContext {
  bucket: TimeBucket;
  badge: string;
  headline: string;
  subhead: string;
  icon: React.ComponentType<{ className?: string }>;
  quickPick: {
    label: string;
    hint: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  };
}

function bucketFromDate(d: Date): TimeBucket {
  const h = d.getHours();
  const m = d.getMinutes();
  const t = h + m / 60;
  if (t < 5) return 'late-night';
  if (t < 7) return 'early-morning';
  if (t < 10.5) return 'morning';
  if (t < 14) return 'lunch';
  if (t < 16.5) return 'afternoon-plan';
  if (t < 19) return 'dinner-rush';
  if (t < 22) return 'evening';
  return 'late-night';
}

function formatClock(d: Date): string {
  const h = d.getHours();
  const m = d.getMinutes();
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${m.toString().padStart(2, '0')} ${suffix}`;
}

function getTimeContext(d: Date): TimeContext {
  const bucket = bucketFromDate(d);
  const clock = formatClock(d);
  switch (bucket) {
    case 'early-morning':
      return {
        bucket,
        badge: `${clock} · PRE-DAWN`,
        headline: 'Up early. What are you making?',
        subhead: 'Coffee, eggs, or something you can eat with one hand.',
        icon: Coffee,
        quickPick: {
          label: 'Breakfast recipes',
          hint: 'Fast plates before the day starts',
          href: '/categories/breakfast',
          icon: Coffee,
        },
      };
    case 'morning':
      return {
        bucket,
        badge: `${clock} · MORNING`,
        headline: 'Morning move — what are you cooking?',
        subhead: 'Breakfast, meal-prep for later, or lunch on the calendar.',
        icon: Sunrise,
        quickPick: {
          label: 'Breakfast recipes',
          hint: '10-minute plates, no essay',
          href: '/categories/breakfast',
          icon: Sunrise,
        },
      };
    case 'lunch':
      return {
        bucket,
        badge: `${clock} · LUNCH WINDOW`,
        headline: 'What is lunch?',
        subhead: 'Fast, protein-forward, one pan.',
        icon: Sun,
        quickPick: {
          label: '15-minute meals',
          hint: 'On the table in a quarter-hour',
          href: '/categories/15-minute',
          icon: Zap,
        },
      };
    case 'afternoon-plan':
      return {
        bucket,
        badge: `${clock} · DINNER PLANNING`,
        headline: 'Get ahead of dinner.',
        subhead: 'Slow-cooker window is still open. Load it now, eat at 6.',
        icon: CloudSun,
        quickPick: {
          label: 'Slow-cooker reference',
          hint: 'Load, walk away, eat at 6:00',
          href: '/appliances/slow-cooker',
          icon: Clock,
        },
      };
    case 'dinner-rush':
      return {
        bucket,
        badge: `${clock} · DINNER RUSH`,
        headline: 'Kids hungry. What is the play?',
        subhead: 'You have ~20 minutes. No thaw, no fluff.',
        icon: Sunset,
        quickPick: {
          label: '15-minute meals',
          hint: 'Fastest path to plates',
          href: '/categories/15-minute',
          icon: Zap,
        },
      };
    case 'evening':
      return {
        bucket,
        badge: `${clock} · EVENING`,
        headline: 'Post-dinner. What do you need?',
        subhead: 'Snacks, leftover reheat done right, or tomorrow.',
        icon: Moon,
        quickPick: {
          label: 'Reheat guide',
          hint: 'Bring it back without ruining it',
          href: '/reheat',
          icon: Flame,
        },
      };
    case 'late-night':
      return {
        bucket,
        badge: `${clock} · LATE`,
        headline: 'Up late. What are you after?',
        subhead: 'Snack, midnight fix, or planning tomorrow.',
        icon: Moon,
        quickPick: {
          label: 'Snacks',
          hint: 'Quick, tasty, no equipment',
          href: '/categories/snacks',
          icon: Zap,
        },
      };
  }
}

const INTENTS: {
  id: IntentId;
  label: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: 'dinner', label: 'Dinner tonight', hint: 'Pick something to cook now', icon: Clock },
  { id: 'cooktime', label: 'Look up a cook time', hint: 'Time + temp for a specific cut', icon: Flame },
  { id: 'problem', label: 'Fix a cooking problem', hint: 'Temps, storage, scaling, subs', icon: Wrench },
  { id: 'browse', label: 'Just show me around', hint: 'Give me the tour', icon: Compass },
];

const STEP_TWO: Record<IntentId, { id: StepTwoId; label: string; hint: string }[]> = {
  dinner: [
    { id: '15-min', label: 'Under 15 minutes', hint: 'Weeknight-fast execution' },
    { id: '30-min', label: '30 min or less', hint: 'Still fast, more range' },
    { id: 'hands-off', label: 'Set-and-forget', hint: 'Slow cooker / dump-and-go' },
    { id: 'no-thaw', label: 'From frozen', hint: 'No thaw required' },
  ],
  cooktime: [
    { id: 'air-fryer', label: 'Air fryer', hint: 'Every cut, verified' },
    { id: 'grill', label: 'Grill', hint: 'Direct + indirect times' },
    { id: 'cast-iron', label: 'Cast iron', hint: 'Sear + finish specs' },
    { id: 'sheet-pan', label: 'Sheet pan', hint: '425°F reference times' },
    { id: 'slow-cooker', label: 'Slow cooker', hint: 'Low vs. high timings' },
  ],
  problem: [
    { id: 'temps', label: 'Internal temperatures', hint: 'Doneness by protein' },
    { id: 'storage', label: 'How long does X keep?', hint: 'Fridge / freezer / pantry' },
    { id: 'scaling', label: 'Scale a recipe up/down', hint: 'Halve, double, 3x' },
    { id: 'subs', label: 'Ingredient substitutions', hint: 'What can I swap?' },
  ],
  browse: [],
};

const DESTINATIONS: Record<StepTwoId | 'browse-tour', Destination[]> = {
  '15-min': [
    { label: '15-Minute Dinners', href: '/categories/15-minute', blurb: 'Every recipe on the site under 15 minutes, total.' },
    { label: 'Home directory', href: '/', blurb: 'Drag the time-scrubber to your exact minute budget.' },
  ],
  '30-min': [
    { label: 'One-Pan Dinners', href: '/categories/one-pan', blurb: 'Bigger flavor, one pan, ~30 minutes.' },
    { label: 'High-Protein Meals', href: '/categories/high-protein', blurb: '40g+ protein without a two-hour cook.' },
  ],
  'hands-off': [
    { label: 'Slow-Cooker Reference', href: '/appliances/slow-cooker', blurb: 'Load, walk away, eat. Verified low/high times.' },
    { label: 'Slow-Cooker Converter', href: '/slow-cooker-converter', blurb: 'Turn any oven recipe into a slow-cooker one.' },
  ],
  'no-thaw': [
    { label: 'No-Thaw Recipes', href: '/categories/no-thaw', blurb: 'Straight from frozen. No planning ahead.' },
    { label: 'Frozen Cook Times', href: '/frozen-cook', blurb: 'How long to cook it straight from the freezer.' },
  ],
  'air-fryer': [
    { label: 'Air Fryer Reference', href: '/appliances/air-fryer', blurb: 'Every cut, verified time + temp.' },
    { label: 'Air Fryer Calculator', href: '/air-fryer-calculator', blurb: 'Pick a food. Get an exact time.' },
  ],
  grill: [
    { label: 'Grill Reference', href: '/appliances/grill', blurb: 'Direct + indirect times for every protein.' },
    { label: 'Grill Fuel Estimator', href: '/grill-fuel-estimator', blurb: 'How much charcoal / propane you actually need.' },
  ],
  'cast-iron': [
    { label: 'Cast-Iron Reference', href: '/appliances/cast-iron', blurb: 'Sear temps, finish times, verified.' },
    { label: 'Steak Timer', href: '/steak-timer', blurb: 'Exact flip + rest schedule by thickness.' },
  ],
  'sheet-pan': [
    { label: 'Sheet-Pan Reference', href: '/appliances/sheet-pan', blurb: 'All 425°F. Every cut. Real times.' },
    { label: 'One-Pan Dinners', href: '/categories/one-pan', blurb: 'Full meals on a single sheet.' },
  ],
  'slow-cooker': [
    { label: 'Slow-Cooker Reference', href: '/appliances/slow-cooker', blurb: 'Verified low + high timings.' },
    { label: 'Slow-Cooker Converter', href: '/slow-cooker-converter', blurb: 'Oven recipe → slow-cooker in one step.' },
  ],
  temps: [
    { label: 'Internal Temp Guide', href: '/internal-temp', blurb: 'Doneness by protein, USDA + chef-safe.' },
    { label: 'Cooking Cheat Sheet', href: '/cheat-sheet', blurb: 'One page. Every temp you actually need.' },
  ],
  storage: [
    { label: 'Food Storage Times', href: '/storage', blurb: 'Fridge, freezer, pantry — with sources.' },
    { label: 'Thaw Timer', href: '/thaw-timer', blurb: 'Safe defrost times by weight + method.' },
  ],
  scaling: [
    { label: 'Recipe Scaler', href: '/recipe-scaler', blurb: 'Halve, double, or 3× any recipe cleanly.' },
    { label: 'Portion Scaler', href: '/kid-split', blurb: 'Adjust for kid vs. adult portions.' },
  ],
  subs: [
    { label: 'Substitutions', href: '/substitutions', blurb: 'What to swap and what breaks the dish.' },
    { label: 'Troubleshooting', href: '/troubleshoot', blurb: 'Why it went wrong. How to save it.' },
  ],
  'browse-tour': [
    { label: 'Cooking Cheat Sheet', href: '/cheat-sheet', blurb: 'The one-page reference. Start here.' },
    { label: 'Cook-Time Datasheets', href: '/appliances/air-fryer', blurb: 'Every appliance × every cut. Verified.' },
    { label: 'All Tools & Calculators', href: '/tools', blurb: 'Scalers, timers, calculators, converters.' },
  ],
};

function readSeen(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return true;
  }
}

function markSeen() {
  try {
    window.localStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* ignore */
  }
}

export default function SiteGuide() {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<IntentId | null>(null);
  const [answer, setAnswer] = useState<StepTwoId | 'browse-tour' | null>(null);
  const [timeCtx, setTimeCtx] = useState<TimeContext | null>(null);

  // Compute time context each time the modal opens so it stays fresh across
  // long-lived tabs. Deliberately client-only to dodge SSR/tz mismatches.
  useEffect(() => {
    if (open && !timeCtx) setTimeCtx(getTimeContext(new Date()));
    if (!open) setTimeCtx(null);
  }, [open, timeCtx]);

  // Auto-open once, on first landing, after a short delay.
  useEffect(() => {
    if (readSeen()) return;
    const t = window.setTimeout(() => setOpen(true), AUTO_OPEN_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    markSeen();
  }, []);

  // Esc closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    // Lock body scroll while open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  const openManually = () => {
    setIntent(null);
    setAnswer(null);
    setOpen(true);
  };

  const back = () => {
    if (answer) setAnswer(null);
    else if (intent) setIntent(null);
  };

  const stepIndex = answer ? 3 : intent ? 2 : 1;
  const totalSteps = intent === 'browse' ? 2 : 3;
  const destinations: Destination[] | null = answer ? DESTINATIONS[answer] : null;

  return (
    <>
      {/* Persistent floating trigger — subtle, always available on the home page */}
      <button
        type="button"
        onClick={openManually}
        className="fixed bottom-4 right-4 z-30 hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded bg-ink text-paper font-mono text-[10px] uppercase tracking-widest shadow-subtle hover:bg-ink-muted transition-colors no-print"
        aria-label="Open site guide"
      >
        <Zap className="w-3.5 h-3.5 text-accent" />
        Not sure where to start?
      </button>

      {!open ? null : (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/70 backdrop-blur-sm no-print"
          role="dialog"
          aria-modal="true"
          aria-labelledby="site-guide-title"
          onClick={close}
        >
          <div
            className="relative w-full sm:max-w-lg bg-paper border-t sm:border border-hairline sm:rounded shadow-subtle max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-hairline bg-paper-100">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span>{timeCtx ? timeCtx.badge : 'Site Guide'}</span>
                <span className="text-ink-subtle">
                  · Step {stepIndex}/{totalSteps}
                </span>
              </div>
              <button
                type="button"
                onClick={close}
                className="p-1 rounded hover:bg-paper-200 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-ink-muted" />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-5">
              {/* Step 1 — pick intent */}
              {!intent && (
                <>
                  <h2
                    id="site-guide-title"
                    className="font-sans text-2xl font-black tracking-tight text-ink uppercase leading-tight"
                  >
                    {timeCtx ? timeCtx.headline : 'Point me at what you need.'}
                  </h2>
                  <p className="mt-2 text-sm text-ink-muted">
                    {timeCtx
                      ? timeCtx.subhead
                      : 'Four options. One question. You’re out in ten seconds.'}
                  </p>

                  {timeCtx && (
                    <Link
                      href={timeCtx.quickPick.href}
                      onClick={close}
                      className="group mt-4 flex items-center gap-3 text-left px-3 py-3 rounded bg-ink text-paper border border-ink hover:bg-ink-muted transition-colors"
                    >
                      <span className="flex-shrink-0 w-9 h-9 rounded bg-accent border border-accent flex items-center justify-center">
                        <timeCtx.quickPick.icon className="w-4 h-4 text-white" />
                      </span>
                      <span className="flex-1">
                        <span className="block font-mono text-[10px] uppercase tracking-widest text-paper/70">
                          Best pick right now
                        </span>
                        <span className="block font-sans font-bold text-paper text-sm">
                          {timeCtx.quickPick.label}
                        </span>
                        <span className="block text-xs text-paper/70">
                          {timeCtx.quickPick.hint}
                        </span>
                      </span>
                      <ArrowRight className="w-4 h-4 text-accent" />
                    </Link>
                  )}

                  {timeCtx && (
                    <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-ink-subtle border-t border-hairline pt-3">
                      Or pick your own path:
                    </div>
                  )}

                  <div className="mt-3 grid grid-cols-1 gap-2">
                    {INTENTS.map(({ id, label, hint, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          if (id === 'browse') {
                            setIntent('browse');
                            setAnswer('browse-tour');
                          } else {
                            setIntent(id);
                          }
                        }}
                        className="group flex items-center gap-3 text-left px-3 py-3 border border-hairline rounded bg-paper hover:bg-paper-100 hover:border-ink transition-colors"
                      >
                        <span className="flex-shrink-0 w-9 h-9 rounded bg-paper-200 border border-hairline flex items-center justify-center group-hover:bg-ink group-hover:border-ink transition-colors">
                          <Icon className="w-4 h-4 text-ink group-hover:text-paper transition-colors" />
                        </span>
                        <span className="flex-1">
                          <span className="block font-sans font-bold text-ink text-sm">{label}</span>
                          <span className="block text-xs text-ink-muted">{hint}</span>
                        </span>
                        <ArrowRight className="w-4 h-4 text-ink-subtle group-hover:text-accent transition-colors" />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Step 2 — refine within intent */}
              {intent && !answer && STEP_TWO[intent].length > 0 && (
                <>
                  <h2
                    id="site-guide-title"
                    className="font-sans text-2xl font-black tracking-tight text-ink uppercase leading-tight"
                  >
                    {intent === 'dinner' && 'How much time do you have?'}
                    {intent === 'cooktime' && 'Which appliance?'}
                    {intent === 'problem' && 'What are you fixing?'}
                  </h2>
                  <p className="mt-2 text-sm text-ink-muted">
                    Pick one — we&apos;ll drop you on the exact page.
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-2">
                    {STEP_TWO[intent].map(({ id, label, hint }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setAnswer(id)}
                        className="group flex items-center justify-between text-left px-3 py-2.5 border border-hairline rounded bg-paper hover:bg-paper-100 hover:border-ink transition-colors"
                      >
                        <span>
                          <span className="block font-sans font-bold text-ink text-sm">{label}</span>
                          <span className="block text-xs text-ink-muted">{hint}</span>
                        </span>
                        <ArrowRight className="w-4 h-4 text-ink-subtle group-hover:text-accent transition-colors" />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Step 3 — recommendations */}
              {destinations && (
                <>
                  <h2
                    id="site-guide-title"
                    className="font-sans text-2xl font-black tracking-tight text-ink uppercase leading-tight"
                  >
                    Start here.
                  </h2>
                  <p className="mt-2 text-sm text-ink-muted">
                    {destinations.length === 1
                      ? 'Your best next step:'
                      : `Your best next ${destinations.length} steps, in order:`}
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-2">
                    {destinations.map((d) => (
                      <Link
                        key={d.href}
                        href={d.href}
                        onClick={close}
                        className="group flex items-start gap-3 text-left px-3 py-3 border border-hairline rounded bg-paper hover:bg-paper-100 hover:border-ink transition-colors"
                      >
                        <span className="flex-shrink-0 w-1 self-stretch bg-accent rounded-sm" />
                        <span className="flex-1">
                          <span className="block font-sans font-bold text-ink text-sm">
                            {d.label}
                          </span>
                          <span className="block text-xs text-ink-muted mt-0.5">{d.blurb}</span>
                          <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
                            {d.href}
                          </span>
                        </span>
                        <ArrowRight className="w-4 h-4 text-ink-subtle group-hover:text-accent transition-colors mt-1" />
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-hairline bg-paper-100">
              {intent ? (
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-ink-muted hover:text-ink transition-colors"
                >
                  <ChevronLeft className="w-3 h-3" />
                  Back
                </button>
              ) : (
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
                  Esc to close
                </span>
              )}
              <button
                type="button"
                onClick={close}
                className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle hover:text-ink transition-colors"
              >
                No thanks
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
