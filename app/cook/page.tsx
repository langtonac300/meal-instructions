import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import { buildDatasheetIndex, resolvePlan, type CookPlan } from '@/lib/cook-session';
import CookClient from './CookClient';

export const metadata: Metadata = {
  title: 'Cook Now — live-cook companion',
  description: 'Live-cook companion. Runs up to three verified cook-time datasheets on one screen: countdown, flip prompts, target internal temp, rest stage.',
  robots: { index: false, follow: false },
  alternates: { canonical: absoluteUrl('/cook') },
};

const MAX_TIMERS = 3;

interface PageProps {
  searchParams: Promise<{ ds?: string | string[] }>;
}

function normalizeParam(param: string | string[] | undefined): string[] {
  if (!param) return [];
  const arr = Array.isArray(param) ? param : [param];
  return arr.flatMap((s) => s.split(',')).map((s) => s.trim()).filter(Boolean);
}

export default async function CookPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const requested = normalizeParam(sp.ds).slice(0, MAX_TIMERS);

  const plans: CookPlan[] = [];
  const unresolved: string[] = [];
  for (const id of requested) {
    const plan = resolvePlan(id);
    if (plan) plans.push(plan);
    else unresolved.push(id);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-10 space-y-8">
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle">
        <Link
          href="/cheat-sheet"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All cook times</span>
        </Link>
        <span className="uppercase text-ink-muted">COOK MODE · LIVE</span>
      </div>

      <header className="space-y-2">
        <div className="micro-label text-accent">LIVE COOK COMPANION</div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink uppercase font-sans">
          {plans.length === 0 ? 'Cook now' : plans.length === 1 ? plans[0].title : `Running ${plans.length} timers`}
        </h1>
        <p className="text-sm text-ink-muted max-w-2xl">
          Verified countdowns from your datasheets. Screen stays awake. Reload-safe. Add up to {MAX_TIMERS} at once.
        </p>
      </header>

      <CookClient
        plans={plans}
        maxTimers={MAX_TIMERS}
        datasheetIndex={buildDatasheetIndex()}
      />

      {plans.length > 0 && unresolved.length > 0 && (
        <div className="hairline-border bg-paper-card p-4 text-xs font-mono text-ink-muted uppercase">
          Ignored (no matching datasheet): {unresolved.join(', ')}
        </div>
      )}
    </div>
  );
}
