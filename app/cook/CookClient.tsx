'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Play, Pause, RotateCcw, Plus, ChevronsRight, X, ArrowUpRight, ExternalLink } from 'lucide-react';
import type { CookPlan } from '@/lib/cook-session';
import { formatClock, totalPlanSeconds } from '@/lib/cook-session';

interface FiredEvent {
  id: string;              // stable across ticks: `${runId}:${eventKey}`
  runId: string;
  planTitle: string;
  text: string;
  at: number;              // wall ms fired
}

interface TimerRun {
  runId: string;
  planId: string;
  stageIndex: number;
  stageStartMs: number | null;   // null = not started yet
  pausedAtMs: number | null;     // null when running; nonzero when paused
  bonusSec: number;              // accumulated "+2 min" on the current stage; reset on advance
  firedIds: string[];            // prompt/complete events already fired
  completed: boolean;
}

interface PersistedState {
  v: 1;
  runs: TimerRun[];
  primaryRunId: string | null;
}

const STORAGE_KEY = 'cook:v1';

interface Props {
  plans: CookPlan[];
  maxTimers: number;
}

function makeRunId(planId: string): string {
  return `${planId}#${Math.random().toString(36).slice(2, 8)}`;
}

function freshRun(plan: CookPlan): TimerRun {
  return {
    runId: makeRunId(plan.planId),
    planId: plan.planId,
    stageIndex: 0,
    stageStartMs: null,
    pausedAtMs: null,
    bonusSec: 0,
    firedIds: [],
    completed: false,
  };
}

function loadPersisted(): PersistedState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedState;
    if (parsed?.v !== 1 || !Array.isArray(parsed.runs)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function savePersisted(state: PersistedState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full / private mode — non-fatal
  }
}

function stageElapsedSec(run: TimerRun, now: number): number {
  if (run.stageStartMs == null) return 0;
  const end = run.pausedAtMs ?? now;
  return Math.max(0, (end - run.stageStartMs) / 1000);
}

function stageRemainingSec(run: TimerRun, plan: CookPlan, now: number): number {
  const stage = plan.stages[run.stageIndex];
  if (!stage) return 0;
  return stage.durationSec + run.bonusSec - stageElapsedSec(run, now);
}

function isRunning(run: TimerRun): boolean {
  return run.stageStartMs != null && run.pausedAtMs == null && !run.completed;
}

function vibrate(pattern: number | number[]): void {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  } catch {
    // Safari without user gesture — ignore
  }
}

export default function CookClient({ plans, maxTimers }: Props) {
  const plansById = useMemo(() => {
    const m = new Map<string, CookPlan>();
    for (const p of plans) m.set(p.planId, p);
    return m;
  }, [plans]);

  const [runs, setRuns] = useState<TimerRun[]>(() => plans.map(freshRun));
  const [primaryRunId, setPrimaryRunId] = useState<string | null>(() => (plans[0] ? null : null));
  const [events, setEvents] = useState<FiredEvent[]>([]);
  const [nowTick, setNowTick] = useState<number>(() => Date.now());
  const hydratedRef = useRef(false);

  // Hydrate from localStorage after first mount, matching runs to current plan ids.
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    const persisted = loadPersisted();
    if (!persisted) return;
    // Only restore runs whose planId is present in current props.
    const usable = persisted.runs.filter((r) => plansById.has(r.planId));
    if (usable.length === 0) return;
    // Prefer restored runs; fill any missing plans with fresh runs.
    setRuns((current) => {
      const byPlan = new Map<string, TimerRun>();
      for (const r of usable) byPlan.set(r.planId, r);
      return current.map((fresh) => byPlan.get(fresh.planId) ?? fresh);
    });
    if (persisted.primaryRunId) setPrimaryRunId(persisted.primaryRunId);
  }, [plansById]);

  // Tick.
  useEffect(() => {
    const id = window.setInterval(() => setNowTick(Date.now()), 500);
    return () => window.clearInterval(id);
  }, []);

  // Fire prompts + completion events.
  useEffect(() => {
    setRuns((prev) => {
      let mutated = false;
      const nextEvents: FiredEvent[] = [];
      const next = prev.map((run) => {
        const plan = plansById.get(run.planId);
        if (!plan || run.completed || run.stageStartMs == null) return run;
        const stage = plan.stages[run.stageIndex];
        if (!stage) return run;
        const elapsed = stageElapsedSec(run, nowTick);
        const newlyFired: string[] = [];
        // Mid-stage prompts.
        (stage.prompts ?? []).forEach((p, i) => {
          const key = `${stage.id}:prompt:${i}`;
          if (elapsed >= p.atSec && !run.firedIds.includes(key)) {
            newlyFired.push(key);
            nextEvents.push({
              id: `${run.runId}:${key}`,
              runId: run.runId,
              planTitle: plan.title,
              text: p.text,
              at: nowTick,
            });
          }
        });
        // Stage complete.
        const remaining = stage.durationSec + run.bonusSec - elapsed;
        if (remaining <= 0) {
          const doneKey = `${stage.id}:done`;
          if (!run.firedIds.includes(doneKey)) {
            newlyFired.push(doneKey);
            const isLast = run.stageIndex >= plan.stages.length - 1;
            nextEvents.push({
              id: `${run.runId}:${doneKey}`,
              runId: run.runId,
              planTitle: plan.title,
              text: isLast
                ? `${plan.title} — DONE. Pull, rest, plate.`
                : `${stage.label} done. Advance to “${plan.stages[run.stageIndex + 1].label}” when ready.`,
              at: nowTick,
            });
          }
        }
        if (newlyFired.length === 0) return run;
        mutated = true;
        return { ...run, firedIds: [...run.firedIds, ...newlyFired] };
      });
      if (nextEvents.length > 0) {
        vibrate([180, 90, 180]);
        setEvents((ev) => [...nextEvents, ...ev].slice(0, 8));
      }
      return mutated ? next : prev;
    });
  }, [nowTick, plansById]);

  // Persist.
  useEffect(() => {
    if (!hydratedRef.current) return;
    savePersisted({ v: 1, runs, primaryRunId });
  }, [runs, primaryRunId]);

  // Wake Lock while any timer is running.
  useEffect(() => {
    const anyRunning = runs.some(isRunning);
    if (!anyRunning) return;
    let sentinel: { release: () => Promise<void> } | null = null;
    let cancelled = false;
    const wlNav = navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<{ release: () => Promise<void> }> } };
    const req = wlNav.wakeLock?.request;
    if (req) {
      req.call(wlNav.wakeLock, 'screen')
        .then((s) => { if (!cancelled) sentinel = s; })
        .catch(() => { /* denied or unsupported */ });
    }
    return () => {
      cancelled = true;
      sentinel?.release().catch(() => { /* noop */ });
    };
  }, [runs]);

  // Actions.
  const patchRun = useCallback((runId: string, patch: (r: TimerRun) => TimerRun) => {
    setRuns((prev) => prev.map((r) => (r.runId === runId ? patch(r) : r)));
  }, []);

  const startTimer = useCallback((runId: string) => {
    patchRun(runId, (r) => ({ ...r, stageStartMs: Date.now(), pausedAtMs: null }));
  }, [patchRun]);

  const pauseResume = useCallback((runId: string) => {
    patchRun(runId, (r) => {
      if (r.stageStartMs == null) return { ...r, stageStartMs: Date.now(), pausedAtMs: null };
      if (r.pausedAtMs != null) {
        // Resume: shift stageStartMs by the pause duration.
        const shift = Date.now() - r.pausedAtMs;
        return { ...r, stageStartMs: r.stageStartMs + shift, pausedAtMs: null };
      }
      return { ...r, pausedAtMs: Date.now() };
    });
  }, [patchRun]);

  const addTwoMinutes = useCallback((runId: string) => {
    patchRun(runId, (r) => ({ ...r, bonusSec: r.bonusSec + 120 }));
  }, [patchRun]);

  const advanceStage = useCallback((runId: string) => {
    patchRun(runId, (r) => {
      const plan = plansById.get(r.planId);
      if (!plan) return r;
      const nextIdx = r.stageIndex + 1;
      if (nextIdx >= plan.stages.length) {
        return { ...r, completed: true, pausedAtMs: Date.now() };
      }
      return {
        ...r,
        stageIndex: nextIdx,
        stageStartMs: Date.now(),
        pausedAtMs: null,
        bonusSec: 0,
      };
    });
  }, [patchRun, plansById]);

  const resetTimer = useCallback((runId: string) => {
    patchRun(runId, (r) => ({
      ...r,
      stageIndex: 0,
      stageStartMs: null,
      pausedAtMs: null,
      bonusSec: 0,
      firedIds: [],
      completed: false,
    }));
  }, [patchRun]);

  const removeTimer = useCallback((runId: string) => {
    setRuns((prev) => {
      const next = prev.filter((r) => r.runId !== runId);
      return next;
    });
    setEvents((prev) => prev.filter((e) => e.runId !== runId));
    setPrimaryRunId((cur) => (cur === runId ? null : cur));
  }, []);

  const promoteToPrimary = useCallback((runId: string) => {
    setPrimaryRunId(runId);
  }, []);

  const dismissEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  // Layout.
  const primary = useMemo(() => {
    if (runs.length === 0) return null;
    const byId = primaryRunId ? runs.find((r) => r.runId === primaryRunId) : null;
    return byId ?? runs[0];
  }, [runs, primaryRunId]);
  const secondaries = runs.filter((r) => r.runId !== primary?.runId);

  const canAdd = runs.length < maxTimers && plansById.size > runs.length;

  return (
    <div className="space-y-6">
      {events.length > 0 && (
        <div className="space-y-2">
          {events.map((e) => (
            <EventBanner key={e.id} event={e} onDismiss={() => dismissEvent(e.id)} />
          ))}
        </div>
      )}

      {primary && (
        <PrimaryCard
          run={primary}
          plan={plansById.get(primary.planId)!}
          now={nowTick}
          onStart={() => startTimer(primary.runId)}
          onPauseResume={() => pauseResume(primary.runId)}
          onAdd={() => addTwoMinutes(primary.runId)}
          onAdvance={() => advanceStage(primary.runId)}
          onReset={() => resetTimer(primary.runId)}
          onRemove={() => removeTimer(primary.runId)}
        />
      )}

      {secondaries.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {secondaries.map((r) => (
            <SecondaryCard
              key={r.runId}
              run={r}
              plan={plansById.get(r.planId)!}
              now={nowTick}
              onPromote={() => promoteToPrimary(r.runId)}
              onPauseResume={() => pauseResume(r.runId)}
              onAdvance={() => advanceStage(r.runId)}
              onRemove={() => removeTimer(r.runId)}
            />
          ))}
        </div>
      )}

      {canAdd && (
        <div className="hairline-border bg-paper-card p-4 text-xs font-mono text-ink-muted uppercase flex items-center justify-between gap-3">
          <span>Add another timer — open any datasheet and press START COOK.</span>
          <Link
            href="/cheat-sheet"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-ink text-paper hover:bg-accent uppercase font-bold"
          >
            <span>Browse datasheets</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

function EventBanner({ event, onDismiss }: { event: FiredEvent; onDismiss: () => void }) {
  return (
    <div className="flex items-start gap-3 bg-accent text-paper p-4 hairline-border">
      <div className="flex-1 space-y-0.5">
        <div className="micro-label opacity-80">{event.planTitle}</div>
        <div className="font-bold font-sans text-sm">{event.text}</div>
      </div>
      <button
        onClick={onDismiss}
        className="text-paper/80 hover:text-paper p-1"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

interface CardProps {
  run: TimerRun;
  plan: CookPlan;
  now: number;
}

function PrimaryCard({
  run, plan, now, onStart, onPauseResume, onAdd, onAdvance, onReset, onRemove,
}: CardProps & {
  onStart: () => void;
  onPauseResume: () => void;
  onAdd: () => void;
  onAdvance: () => void;
  onReset: () => void;
  onRemove: () => void;
}) {
  const stage = plan.stages[run.stageIndex];
  const remaining = stageRemainingSec(run, plan, now);
  const overrun = remaining < 0;
  const notStarted = run.stageStartMs == null;
  const paused = run.pausedAtMs != null && !run.completed;
  const running = isRunning(run);

  return (
    <section className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="micro-label text-ink-muted">STAGE {run.stageIndex + 1} / {plan.stages.length}</span>
            {running && <span className="micro-label text-accent">· RUNNING</span>}
            {paused && <span className="micro-label text-ink-muted">· PAUSED</span>}
            {run.completed && <span className="micro-label text-emerald-800">· COMPLETE</span>}
          </div>
          <h2 className="text-lg sm:text-2xl font-bold uppercase tracking-tight text-ink font-sans truncate">
            {stage?.label ?? '—'}
          </h2>
          <div className="text-xs font-mono text-ink-muted uppercase truncate">{plan.title}</div>
        </div>
        <button
          onClick={onRemove}
          className="text-ink-subtle hover:text-ink p-1 shrink-0"
          aria-label="Remove timer"
          title="Remove"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Primary action row — always ABOVE the clock so it's above the fold on mobile. */}
      {notStarted ? (
        <button
          onClick={onStart}
          className="w-full flex items-center justify-center gap-2 py-5 bg-accent text-paper font-bold uppercase font-mono text-base tracking-wider hover:bg-accent-dark"
        >
          <Play className="w-5 h-5" />
          START COOK
        </button>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={onPauseResume}
            disabled={run.completed}
            className="flex items-center justify-center gap-2 py-3 bg-ink text-paper font-bold uppercase font-mono text-xs hairline-border disabled:opacity-40 hover:bg-accent"
          >
            {paused ? <><Play className="w-4 h-4" /> Resume</> : <><Pause className="w-4 h-4" /> Pause</>}
          </button>
          <button
            onClick={onAdd}
            disabled={run.completed}
            className="flex items-center justify-center gap-2 py-3 bg-paper text-ink font-bold uppercase font-mono text-xs hairline-border disabled:opacity-40 hover:border-ink"
          >
            <Plus className="w-4 h-4" /> 2 min
          </button>
          <button
            onClick={onAdvance}
            disabled={run.completed}
            className="flex items-center justify-center gap-2 py-3 bg-paper text-ink font-bold uppercase font-mono text-xs hairline-border disabled:opacity-40 hover:border-ink"
          >
            <ChevronsRight className="w-4 h-4" />
            {run.stageIndex >= plan.stages.length - 1 ? 'Finish' : 'Next stage'}
          </button>
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 py-3 bg-paper text-ink-muted font-bold uppercase font-mono text-xs hairline-border hover:text-ink hover:border-ink"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      )}

      <div className={`text-center py-6 hairline-border bg-paper ${overrun ? 'text-accent-dark' : 'text-ink'}`}>
        <div
          className="font-mono font-bold tabular-nums leading-none tracking-tighter"
          style={{ fontSize: 'clamp(3rem, 15vw, 7rem)' }}
        >
          {formatClock(remaining)}
        </div>
        {overrun && (
          <div className="mt-2 micro-label text-accent">OVERRUN — CHECK & PULL</div>
        )}
      </div>

      {stage?.targetTempFormatted && (
        <div className="hairline-border bg-paper p-4 font-mono text-xs uppercase">
          <div className="text-ink-muted mb-1">Pull at internal temp</div>
          <div className="text-xl font-bold text-ink tracking-tight">{stage.targetTempFormatted}</div>
        </div>
      )}

      {stage?.donenessCue && (
        <div className="hairline-border bg-paper p-4 text-sm font-sans text-ink">
          <div className="micro-label text-ink-muted mb-1">Doneness cue</div>
          {stage.donenessCue}
        </div>
      )}

      <div className="hairline-t pt-4 flex items-center justify-between text-xs font-mono text-ink-muted">
        <span className="uppercase">Total plan: {formatClock(totalPlanSeconds(plan))}</span>
        <Link
          href={plan.sourceHref}
          className="inline-flex items-center gap-1 hover:text-ink uppercase"
        >
          Datasheet <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </section>
  );
}

function SecondaryCard({
  run, plan, now, onPromote, onPauseResume, onAdvance, onRemove,
}: CardProps & {
  onPromote: () => void;
  onPauseResume: () => void;
  onAdvance: () => void;
  onRemove: () => void;
}) {
  const stage = plan.stages[run.stageIndex];
  const remaining = stageRemainingSec(run, plan, now);
  const overrun = remaining < 0;
  const running = isRunning(run);
  const paused = run.pausedAtMs != null && !run.completed;

  return (
    <div className="bg-paper-card hairline-border p-4 space-y-3">
      <button
        onClick={onPromote}
        className="w-full text-left space-y-1"
        title="Tap to promote"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="micro-label text-ink-muted">S{run.stageIndex + 1}/{plan.stages.length}</span>
          {running && <span className="micro-label text-accent">· RUN</span>}
          {paused && <span className="micro-label text-ink-muted">· PAUSED</span>}
          {run.completed && <span className="micro-label text-emerald-800">· DONE</span>}
        </div>
        <div className="text-sm font-bold uppercase text-ink font-sans truncate">{stage?.label ?? '—'}</div>
        <div className="text-[11px] font-mono text-ink-muted uppercase truncate">{plan.title}</div>
      </button>

      <div className={`text-center py-3 hairline-border bg-paper ${overrun ? 'text-accent-dark' : 'text-ink'}`}>
        <div className="font-mono font-bold tabular-nums text-3xl tracking-tight">
          {formatClock(remaining)}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={onPauseResume}
          disabled={run.completed}
          className="flex items-center justify-center py-2 bg-ink text-paper font-mono text-[11px] uppercase disabled:opacity-40"
          aria-label={paused ? 'Resume' : 'Pause'}
        >
          {paused || run.stageStartMs == null ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={onAdvance}
          disabled={run.completed}
          className="flex items-center justify-center py-2 bg-paper text-ink font-mono text-[11px] uppercase hairline-border disabled:opacity-40"
          aria-label="Next stage"
        >
          <ChevronsRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onRemove}
          className="flex items-center justify-center py-2 bg-paper text-ink-muted font-mono text-[11px] uppercase hairline-border hover:text-ink"
          aria-label="Remove"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
