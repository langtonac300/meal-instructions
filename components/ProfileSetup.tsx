'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { APPLIANCES } from '@/data/appliances';
import { LeanIcon } from '@/components/icons/Lean5SIcons';
import {
  AVOIDABLE,
  EMPTY_PROFILE,
  readProfile,
  writeProfile,
  type Avoidable,
  type KitchenProfile,
  type SpiceLevel,
} from '@/lib/profile';
import { track } from '@/lib/analytics';
import type { Appliance } from '@/lib/types';

const STEPS = ['Kitchen', 'Household', 'Preferences'] as const;

interface Props {
  /** True when a session exists, which turns the closing CTA from sign-in to done. */
  signedIn: boolean;
}

export default function ProfileSetup({ signedIn }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<KitchenProfile>(EMPTY_PROFILE);
  const [saving, setSaving] = useState(false);

  // Editing an existing profile rather than creating one.
  useEffect(() => {
    const existing = readProfile();
    if (existing) setProfile(existing);
    track('profile_start', { editing: !!existing, signed_in: signedIn });
  }, [signedIn]);

  const toggleAppliance = (slug: Appliance) =>
    setProfile((p) => ({
      ...p,
      appliances: p.appliances.includes(slug)
        ? p.appliances.filter((a) => a !== slug)
        : [...p.appliances, slug],
    }));

  const toggleAvoid = (item: Avoidable) =>
    setProfile((p) => ({
      ...p,
      avoid: p.avoid.includes(item) ? p.avoid.filter((a) => a !== item) : [...p.avoid, item],
    }));

  const finish = async () => {
    setSaving(true);
    // Local first: this is the read path for every page, and it must not depend
    // on the network or on being signed in.
    writeProfile(profile);
    track('profile_complete', {
      appliances: profile.appliances.length,
      kids: profile.kids,
      adults: profile.adults,
      avoids: profile.avoid.length,
      signed_in: signedIn,
    });

    if (signedIn) {
      // Best effort. A failed sync must not block someone from using the site.
      try {
        await fetch('/api/meals/profile', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(profile),
        });
      } catch {
        // local profile still applies
      }
    }
    router.push(signedIn ? '/account' : '/');
    router.refresh();
  };

  const canAdvance = step > 0 || profile.appliances.length > 0;

  return (
    <div className="space-y-6">
      {/* Step rail */}
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
        {STEPS.map((label, i) => (
          <React.Fragment key={label}>
            <span
              className={
                i === step
                  ? 'text-ink font-bold'
                  : i < step
                    ? 'text-ink-muted'
                    : 'text-ink-subtle'
              }
            >
              {i < step ? '✓ ' : ''}
              {label}
            </span>
            {i < STEPS.length - 1 && <span className="text-ink-subtle">/</span>}
          </React.Fragment>
        ))}
      </div>

      {/* ── Step 1: appliances ───────────────────────────────────────────── */}
      {step === 0 && (
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
              What do you cook on?
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Every cook-time chart and recipe gets sorted to your equipment first. Pick
              everything you own.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {APPLIANCES.map((app) => {
              const owned = profile.appliances.includes(app.slug);
              return (
                <button
                  key={app.slug}
                  type="button"
                  onClick={() => toggleAppliance(app.slug)}
                  aria-pressed={owned}
                  className={`flex items-center gap-2 p-3 hairline-border text-left transition-colors cursor-pointer ${
                    owned
                      ? 'bg-ink text-paper border-ink'
                      : 'bg-paper text-ink-muted hover:text-ink hover:border-ink'
                  }`}
                >
                  <LeanIcon
                    name={app.slug}
                    size={20}
                    className={owned ? 'text-paper' : 'text-ink-muted'}
                  />
                  <span className="font-mono text-[11px] uppercase tracking-wider leading-tight">
                    {app.name}
                  </span>
                  {owned && <Check className="w-3.5 h-3.5 ml-auto shrink-0" />}
                </button>
              );
            })}
          </div>

          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-subtle">
            {profile.appliances.length} selected
          </p>
        </section>
      )}

      {/* ── Step 2: household ────────────────────────────────────────────── */}
      {step === 1 && (
        <section className="space-y-5">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
              Who are you feeding?
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Sets the default serving size on every recipe so you stop doing mental maths at
              6pm.
            </p>
          </div>

          {(['adults', 'kids'] as const).map((key) => (
            <div key={key} className="space-y-2">
              <div className="micro-label text-ink-muted">{key}</div>
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4, 5, 6].map((n) => {
                  if (key === 'adults' && n === 0) return null;
                  const active = profile[key] === n;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setProfile((p) => ({ ...p, [key]: n }))}
                      className={`px-3 py-1.5 hairline-border font-mono text-xs transition-colors cursor-pointer ${
                        active
                          ? 'bg-ink text-paper font-bold'
                          : 'bg-paper text-ink-muted hover:text-ink hover:border-ink'
                      }`}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {profile.kids > 0 && (
            <p className="text-xs text-ink-muted font-sans hairline-t pt-3">
              Recipes with a kid adjustment will surface it automatically.
            </p>
          )}
        </section>
      )}

      {/* ── Step 3: preferences ──────────────────────────────────────────── */}
      {step === 2 && (
        <section className="space-y-5">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
              Anything to skip?
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Optional. Recipes built on these get pushed down, never deleted — the data stays
              if you go looking.
            </p>
          </div>

          <div className="space-y-2">
            <div className="micro-label text-ink-muted">Avoid</div>
            <div className="flex flex-wrap gap-2">
              {AVOIDABLE.map((item) => {
                const on = profile.avoid.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleAvoid(item)}
                    aria-pressed={on}
                    className={`px-3 py-1.5 hairline-border font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${
                      on
                        ? 'bg-ink text-paper font-bold'
                        : 'bg-paper text-ink-muted hover:text-ink hover:border-ink'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <div className="micro-label text-ink-muted">Spice</div>
            <div className="flex items-center gap-1">
              {(['mild', 'medium', 'hot'] as SpiceLevel[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setProfile((p) => ({ ...p, spice: level }))}
                  className={`px-3 py-1.5 hairline-border font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${
                    profile.spice === level
                      ? 'bg-ink text-paper font-bold'
                      : 'bg-paper text-ink-muted hover:text-ink hover:border-ink'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="micro-label text-ink-muted">Weeknight ceiling</div>
            <div className="flex items-center gap-1">
              {[15, 30, 45, null].map((mins) => (
                <button
                  key={String(mins)}
                  type="button"
                  onClick={() => setProfile((p) => ({ ...p, maxWeeknightMinutes: mins }))}
                  className={`px-3 py-1.5 hairline-border font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${
                    profile.maxWeeknightMinutes === mins
                      ? 'bg-ink text-paper font-bold'
                      : 'bg-paper text-ink-muted hover:text-ink hover:border-ink'
                  }`}
                >
                  {mins ? `${mins} min` : 'No limit'}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between hairline-t pt-4">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-1.5 px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canAdvance}
            className="flex items-center gap-1.5 px-4 py-2 bg-ink text-paper font-mono text-[11px] uppercase tracking-wider hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Next
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={finish}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 bg-ink text-paper font-mono text-[11px] uppercase tracking-wider hover:bg-accent disabled:opacity-50 transition-colors cursor-pointer"
          >
            {saving ? 'Saving…' : 'Save my kitchen'}
            <Check className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
