'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, ChevronDown, Search } from 'lucide-react';
import { PANTRY_GROUPS, PANTRY_ITEMS, PANTRY_ITEM_BY_ID } from '@/data/pantry';
import {
  labelFor,
  matchPantry,
  pickSplitters,
  proteinFamilies,
  MAX_MISSING,
  type PantryRecipe,
  type PantryVerdict,
  type ProteinFamily,
} from '@/lib/pantry-match';
import { track } from '@/lib/analytics';

/** Same shape as the kitchen profile: local first, so it works signed out. */
const STORAGE_KEY = 'mi_pantry_v1';
const VALID_IDS = new Set(PANTRY_ITEMS.map((i) => i.id));

// What the filter box searches: the label plus the words the item matches on,
// so "cheese" finds cheddar and parmesan and "canola" finds neutral oil.
const SEARCH_TEXT = new Map(
  PANTRY_ITEMS.map((i) => [
    i.id,
    [i.label, i.id, ...i.match, ...(i.titleMatch ?? [])]
      .join(' ')
      .toLowerCase()
      .replace(/\\b/g, '')
      .replace(/[()?|[\]{}^$.*+\\]/g, ''),
  ]),
);

const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.14em] font-bold';
const STEP = 'font-mono text-[12px] uppercase tracking-[0.14em] text-ink-muted';
const BUTTON_INK =
  'inline-flex items-center justify-center gap-2 px-[18px] py-3 bg-ink text-paper text-[15px] font-bold hover:bg-accent transition-colors cursor-pointer';
const LINK =
  'underline underline-offset-4 text-ink-muted hover:text-ink transition-colors cursor-pointer';

interface Stored {
  have: string[];
  updatedAt: string | null;
}

function readStored(): Stored | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { have?: unknown; updatedAt?: unknown } | null;
    if (!parsed || !Array.isArray(parsed.have)) return null;
    return {
      have: parsed.have.filter((x): x is string => typeof x === 'string' && VALID_IDS.has(x)),
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : null,
    };
  } catch {
    return null;
  }
}

function writeStored(have: string[]): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ have, updatedAt: new Date().toISOString() }),
    );
  } catch {
    // private mode or quota — the selection still works for this visit
  }
}

/** `?have=chicken-breast,rice` — what the home page's quick picks hand over. */
function readUrlHave(): string[] {
  try {
    const param = new URLSearchParams(window.location.search).get('have');
    if (!param) return [];
    return param
      .split(',')
      .map((s) => s.trim())
      .filter((id) => VALID_IDS.has(id));
  } catch {
    return [];
  }
}

/** "Tuesday" for a selection saved this week, "earlier today", otherwise "last time". */
function whenLabel(iso: string | null): string {
  if (!iso) return 'last time';
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) return 'last time';
  const now = new Date();
  if (then.toDateString() === now.toDateString()) return 'earlier today';
  const days = (now.getTime() - then.getTime()) / 86_400_000;
  if (days < 7) return then.toLocaleDateString('en-US', { weekday: 'long' });
  return 'last time';
}

/** "Other cheese (provolone, feta, …)" → "Other cheese" wherever space is short. */
const shortLabel = (id: string) => labelFor(id).replace(/\s*\([^)]*\)\s*$/, '');
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const applianceLabel = (appliance: string) => appliance.replace(/-/g, ' ');

/** "Chicken thighs" → "Thighs" inside the Chicken row; "Turkey (whole or breast)" → "Whole or breast". */
function cutLabel(family: ProteinFamily, id: string): string {
  const stripped = labelFor(id)
    .replace(new RegExp(family.label, 'i'), '')
    .replace(/\s+/g, ' ')
    .trim();
  const bare =
    stripped
      .replace(/^\((.*)\)$/, '$1')
      .replace(/^\/\s*/, '')
      .trim() || labelFor(id);
  return bare.charAt(0).toUpperCase() + bare.slice(1);
}

interface ChipProps {
  on: boolean;
  /**
   * Tapped, but nothing chosen underneath yet — a protein family whose cut list
   * is open. Without this the multi-cut families read as dead: tapping "Chicken"
   * opens the cut list further down the page and leaves the chip looking
   * untouched, while a single-cut family toggles straight to `on` and goes
   * black. Same gesture, two different-looking outcomes.
   */
  open?: boolean;
  onClick: () => void;
  size?: 'md' | 'lg';
  children: React.ReactNode;
}

function Chip({ on, open = false, onClick, size = 'md', children }: ChipProps) {
  const state = on
    ? 'bg-ink text-paper border-ink'
    : open
      ? 'bg-paper-200 text-ink border-ink border-2 -m-px'
      : 'bg-paper-50 text-ink border-hairline hover:border-ink';
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-expanded={open || undefined}
      onClick={onClick}
      className={`inline-flex items-center gap-2 border leading-none cursor-pointer select-none transition-colors ${
        size === 'lg' ? 'px-[18px] py-[13px] text-[17px]' : 'px-3 py-[9px] text-[14px]'
      } ${state}`}
    >
      {on && (
        <Check
          className={size === 'lg' ? 'w-4 h-4 shrink-0' : 'w-3.5 h-3.5 shrink-0'}
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}

function ResultRow({ verdict }: { verdict: PantryVerdict }) {
  const { recipe, missing } = verdict;
  return (
    <li className="border-b border-hairline last:border-b-0">
      <Link
        href={`/recipes/${recipe.slug}`}
        className="flex gap-4 py-3.5 px-5 hover:bg-paper transition-colors group"
      >
        <Image
          src={recipe.image}
          alt=""
          width={84}
          height={56}
          className="w-[84px] h-[56px] object-cover shrink-0 bg-paper-200"
        />
        <span className="min-w-0 flex-1">
          <span className="block text-[16px] font-bold leading-[1.25] group-hover:text-accent transition-colors">
            {recipe.title}
          </span>
          <span className="block mt-1 font-mono text-[12px] uppercase tracking-[0.06em] text-ink-muted">
            {applianceLabel(recipe.appliance)} · {recipe.totalMinutes} min
          </span>
          {missing.length > 0 && (
            <span className="block mt-1 text-[13px] leading-[1.4] text-ink-muted">
              Missing{missing.length > MAX_MISSING ? ` ${missing.length}` : ''}:{' '}
              <span className="text-ink">{missing.map(shortLabel).join(', ')}</span>
            </span>
          )}
        </span>
      </Link>
    </li>
  );
}

interface ShelvesProps {
  id: string;
  haveSet: ReadonlySet<string>;
  toggle: (id: string) => void;
}

/** Every ingredient, by shelf, with a filter box. The "Change it" view behind the questions. */
function Shelves({ id, haveSet, toggle }: ShelvesProps) {
  const [filter, setFilter] = useState('');
  const query = filter.trim().toLowerCase();
  const groups = PANTRY_GROUPS.map((group) => ({
    ...group,
    visible: query
      ? group.items.filter((i) => SEARCH_TEXT.get(i.id)?.includes(query))
      : group.items,
    ticked: group.items.filter((i) => haveSet.has(i.id)).length,
  })).filter((g) => g.visible.length > 0);

  return (
    <div id={id} className="mt-5 pt-5 border-t border-ink">
      <label className="flex items-center gap-2.5 px-3.5 py-2.5 bg-paper-50 border-2 border-ink cursor-text max-w-[420px]">
        <Search className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
        <input
          type="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Find an ingredient…"
          aria-label="Find an ingredient"
          autoComplete="off"
          className="w-full min-w-0 bg-transparent text-[15px] text-ink placeholder:text-ink-subtle focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
        />
      </label>

      {groups.length === 0 ? (
        <p className="pt-6 text-ink-muted">
          No ingredient matches &ldquo;{filter}&rdquo;. Try a plainer word — chicken, cheese, rice.
        </p>
      ) : (
        groups.map((group) => (
          <section key={group.id} className="pt-7" aria-labelledby={`pantry-${group.id}`}>
            <h3
              id={`pantry-${group.id}`}
              className="flex items-baseline gap-3 text-[17px] font-extrabold tracking-[-0.01em] uppercase"
            >
              {group.label}
              <span className="font-mono text-[12px] font-normal tracking-normal normal-case text-ink-subtle">
                {group.ticked}/{group.items.length}
              </span>
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.visible.map((item) => (
                <Chip key={item.id} on={haveSet.has(item.id)} onClick={() => toggle(item.id)}>
                  {item.label}
                </Chip>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

interface PantryMatcherProps {
  recipes: PantryRecipe[];
  /** Assumed present until untapped; computed from the corpus on the server. */
  basics: string[];
}

/**
 * The /what-can-i-make island. Four taps, not seventy: the basics are assumed,
 * the protein is the one question always asked, the next question is whichever
 * ingredients split the meals still in play nearly in half, and the count is
 * live from the first tap. The full shelves sit behind "See all ingredients".
 * The rules live in lib/pantry-match.ts; this file is the taps and the list.
 */
export default function PantryMatcher({ recipes, basics }: PantryMatcherProps) {
  const basicsSet = useMemo(() => new Set(basics), [basics]);
  const families = useMemo(() => proteinFamilies(recipes), [recipes]);

  // The basics are the deterministic first render; the stored selection
  // replaces them after mount so server and client HTML agree.
  const [have, setHave] = useState<string[]>(basics);
  const [hydrated, setHydrated] = useState(false);
  const [visit, setVisit] = useState<'flow' | 'return'>('flow');
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [basicsOpen, setBasicsOpen] = useState(false);
  const [openFamilies, setOpenFamilies] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [shelvesOpen, setShelvesOpen] = useState(false);
  const [showFar, setShowFar] = useState(false);

  useEffect(() => {
    const fromUrl = readUrlHave();
    const stored = readStored();
    const base = stored?.have ?? basics;
    setHave(Array.from(new Set([...base, ...fromUrl])));
    // A quick pick from the home page is a new intent; otherwise a saved
    // fridge with anything beyond the basics gets the one-tap confirmation.
    if (stored && fromUrl.length === 0 && stored.have.some((id) => !basicsSet.has(id))) {
      setVisit('return');
      setSavedAt(stored.updatedAt);
    }
    setHydrated(true);
    if (fromUrl.length > 0) {
      window.history.replaceState(null, '', window.location.pathname + window.location.hash);
    }
  }, [basics, basicsSet]);

  useEffect(() => {
    if (hydrated) writeStored(have);
  }, [have, hydrated]);

  const haveSet = useMemo(() => new Set(have), [have]);
  const results = useMemo(() => matchPantry(recipes, haveSet), [recipes, haveSet]);
  const skip = useMemo(() => new Set([...basics, ...dismissed]), [basics, dismissed]);
  const splitters = useMemo(() => pickSplitters(recipes, haveSet, skip), [recipes, haveSet, skip]);

  const basicsOff = basics.filter((id) => !haveSet.has(id));
  // What untapping a basic costs: meals in view that now list it as a gap.
  const offSet = new Set(basicsOff);
  const affected =
    basicsOff.length === 0
      ? 0
      : [...results.close, ...results.far].filter((v) => v.missing.some((id) => offSet.has(id)))
          .length;

  const extras = have.filter((id) => !basicsSet.has(id) && !PANTRY_ITEM_BY_ID.get(id)?.protein);
  const proteins = have.filter((id) => PANTRY_ITEM_BY_ID.get(id)?.protein);

  // One event per settled change, never one per tap, never on load.
  const firstRun = useRef(true);
  useEffect(() => {
    if (!hydrated) return;
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const timer = setTimeout(() => {
      track('tool_used', {
        tool: 'what_can_i_make',
        items_selected: have.length,
        basics_off: basicsOff.length,
        results_ready: results.ready.length,
        results_close: results.close.length,
      });
    }, 1200);
    return () => clearTimeout(timer);
  }, [have, hydrated, results, basicsOff.length]);

  const toggle = (id: string) =>
    setHave((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const tapFamily = (family: ProteinFamily) => {
    if (family.items.length === 1) {
      toggle(family.items[0]);
      return;
    }
    if (family.items.some((id) => haveSet.has(id))) {
      // Tapping a ticked family clears its cuts: "no chicken after all".
      setHave((prev) => prev.filter((id) => !family.items.includes(id)));
      setOpenFamilies((prev) => prev.filter((x) => x !== family.id));
      return;
    }
    setOpenFamilies((prev) =>
      prev.includes(family.id) ? prev.filter((x) => x !== family.id) : [...prev, family.id],
    );
  };

  const dismissSplitters = () =>
    setDismissed((prev) => [...prev, ...splitters.picks.map((s) => s.id)]);

  const startOver = () => {
    setHave(basics);
    setDismissed([]);
    setOpenFamilies([]);
    setBasicsOpen(false);
    setVisit('flow');
  };

  const summaryParts = [
    ...[...proteins, ...extras].slice(0, 5).map(shortLabel),
    ...(proteins.length + extras.length > 5 ? [`${proteins.length + extras.length - 5} more`] : []),
    basicsOff.length > 0
      ? `the basics minus ${basicsOff.map((id) => lower(shortLabel(id))).join(', ')}`
      : 'the basics',
  ];
  const summary = summaryParts.map((part, i) => (i === 0 ? part : lower(part))).join(', ');
  const inReach = results.ready.length + results.close.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-10 items-start">
      {/* Phones: the list sits under the questions, so a sticky line keeps the count in view. */}
      <div
        data-count-bar="mobile"
        className="lg:hidden sticky top-[72px] z-20 -mx-5 sm:-mx-10 px-5 sm:px-10 py-2.5 bg-paper border-b border-ink flex items-center justify-between gap-4"
      >
        <p aria-live="polite" className="font-mono text-[14px]">
          <strong>{inReach}</strong> in reach · <strong>{results.ready.length}</strong> ready ·{' '}
          {have.length} tapped
        </p>
        <a
          href="#results"
          className="text-[14px] font-semibold shrink-0 hover:text-accent transition-colors"
        >
          Show meals ↓
        </a>
      </div>

      {/* ── The questions ── */}
      <div>
        {visit === 'return' && (
          <section
            className="mb-8 border border-ink bg-paper-50 px-5 py-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-4"
            aria-labelledby="return-heading"
          >
            <div className="min-w-0">
              <h2 id="return-heading" className="text-[22px] font-bold tracking-[-0.01em]">
                Same fridge as {whenLabel(savedAt)}?
              </h2>
              <p className="mt-1 text-[15px] text-ink-muted">
                {summary} · <span className="font-mono text-ink">{inReach}</span> meals in reach
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a href="#results" onClick={() => setVisit('flow')} className={BUTTON_INK}>
                Yes, show meals
              </a>
              <button type="button" onClick={() => setVisit('flow')} className={LINK}>
                Change it
              </button>
            </div>
          </section>
        )}

        {/* Basics: assumed, visible, one tap to edit. */}
        <section className="border border-ink bg-paper-50" aria-labelledby="basics-heading">
          <div className="px-5 py-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <h2 id="basics-heading" className="flex items-center gap-3 text-[16px] font-normal">
              <span
                className={`w-[26px] h-[26px] inline-flex items-center justify-center shrink-0 ${
                  basicsOff.length === 0 ? 'bg-ink' : 'border-2 border-ink'
                }`}
                aria-hidden="true"
              >
                {basicsOff.length === 0 ? (
                  <Check className="w-4 h-4 text-paper" />
                ) : (
                  <span className="font-mono text-[11px] font-bold">
                    {basics.length - basicsOff.length}
                  </span>
                )}
              </span>
              <span>
                <strong>
                  {basicsOff.length === 0 ? 'You have the basics' : 'Most of the basics'}
                </strong>{' '}
                <span className="text-ink-muted">
                  —{' '}
                  {basicsOff.length === 0
                    ? basics.map((id) => lower(shortLabel(id))).join(', ')
                    : `out of ${basicsOff.map((id) => lower(shortLabel(id))).join(', ')}`}
                </span>
              </span>
            </h2>
            <button
              type="button"
              onClick={() => setBasicsOpen((v) => !v)}
              aria-expanded={basicsOpen}
              aria-controls="basics-row"
              className={LINK}
            >
              {basicsOpen ? 'Done' : basicsOff.length === 0 ? 'Not all of them' : 'Edit'}
            </button>
          </div>
          {basicsOpen && (
            <div id="basics-row" className="px-5 pb-5 border-t border-hairline">
              <p className="pt-4 mb-3 text-[14px] text-ink-muted">
                Assumed because each is in a quarter or more of the recipes. Untap anything
                you&rsquo;re out of.
              </p>
              <div className="flex flex-wrap gap-2">
                {basics.map((id) => (
                  <Chip key={id} on={haveSet.has(id)} onClick={() => toggle(id)}>
                    {shortLabel(id)}
                  </Chip>
                ))}
              </div>
              {basicsOff.length > 0 && (
                <p className="mt-3 text-[14px] text-ink-muted">
                  Without {basicsOff.map((id) => lower(shortLabel(id))).join(' and ')}:{' '}
                  {affected === 0 ? (
                    'nothing in reach needed it.'
                  ) : (
                    <>
                      <strong className="text-ink">
                        {affected} {affected === 1 ? 'meal' : 'meals'}
                      </strong>{' '}
                      now list it as a gap.
                    </>
                  )}
                </p>
              )}
            </div>
          )}
        </section>

        {/* 1 · Protein */}
        <section className="mt-9" aria-labelledby="protein-heading">
          <p className={STEP}>1 · Protein</p>
          <h2 id="protein-heading" className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[22px] font-bold tracking-[-0.01em]">
              What protein is in the house?
            </span>
            <span className="text-[15px] text-ink-muted">
              Tap any. This is the one that changes everything.
            </span>
          </h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {families.map((family) => {
              const ticked = family.items.filter((id) => haveSet.has(id)).length;
              return (
                <Chip
                  key={family.id}
                  size="lg"
                  on={ticked > 0}
                  open={ticked === 0 && openFamilies.includes(family.id)}
                  onClick={() => tapFamily(family)}
                >
                  {family.label}
                  {ticked > 0 && family.items.length > 1 ? (
                    <span className="font-mono text-[13px] opacity-80">· {ticked}</span>
                  ) : ticked === 0 ? (
                    <span className="font-mono text-[12px] text-ink-subtle">{family.meals}</span>
                  ) : null}
                </Chip>
              );
            })}
          </div>
          {families
            .filter(
              (f) =>
                f.items.length > 1 &&
                (openFamilies.includes(f.id) || f.items.some((id) => haveSet.has(id))),
            )
            .map((family) => (
              <div key={family.id} className="mt-4 pl-4 border-l-2 border-ink">
                <p className="mb-2.5 text-[15px]">
                  <strong>Which {lower(family.label)}?</strong>{' '}
                  <span className="text-ink-muted">Tap every cut you have.</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {family.items.map((id) => (
                    <Chip key={id} on={haveSet.has(id)} onClick={() => toggle(id)}>
                      {cutLabel(family, id)}
                    </Chip>
                  ))}
                </div>
              </div>
            ))}
          <p className="mt-4 text-[14px] text-ink-muted">
            No meat tonight? Skip this — the veg meals are already in the count.
          </p>
        </section>

        {/* 2 · The splitters */}
        {splitters.picks.length > 0 && (
          <section className="mt-9" aria-labelledby="splitters-heading">
            <p className={STEP}>2 · What moves the most meals</p>
            <h2
              id="splitters-heading"
              className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1"
            >
              <span className="text-[22px] font-bold tracking-[-0.01em]">Any of these?</span>
              <span className="text-[15px] text-ink-muted">
                Picked because they split the {splitters.inPlay} meals in play nearly in half.
              </span>
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              {splitters.picks.map((s) => (
                <Chip key={s.id} size="lg" on={false} onClick={() => toggle(s.id)}>
                  {shortLabel(s.id)}
                </Chip>
              ))}
              <button
                type="button"
                onClick={dismissSplitters}
                className={`${LINK} ml-1 text-[14px]`}
              >
                None of these
              </button>
            </div>
            <p className="mt-3 text-[14px] text-ink-muted">
              Skipping is fine — they only move meals between the two lists, never out of them.
            </p>
          </section>
        )}

        {extras.length > 0 && (
          <section className="mt-8" aria-labelledby="extras-heading">
            <h2 id="extras-heading" className={`${EYEBROW} text-ink-subtle`}>
              You also have <span className="font-normal">· tap to remove</span>
            </h2>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {extras.map((id) => (
                <Chip key={id} on onClick={() => toggle(id)}>
                  {shortLabel(id)}
                </Chip>
              ))}
            </div>
          </section>
        )}

        {/* The live count, as the design has it: the number is the point. */}
        <div
          data-count-bar="desktop"
          className="hidden lg:flex mt-9 px-5 py-4 bg-paper-50 border border-ink items-center justify-between gap-6"
        >
          <p className="flex items-baseline gap-x-2.5 flex-wrap">
            <span className="font-mono text-[28px] font-black leading-none">{inReach}</span>
            <span className="text-[15px]">meals in reach from what you tapped</span>
            <span className="text-ink-subtle">·</span>
            <span className="text-[15px]">
              <strong className="font-mono text-accent">{results.ready.length}</strong> with nothing
              missing
            </span>
          </p>
          <button type="button" onClick={startOver} className={`${LINK} text-[14px] shrink-0`}>
            Start over
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          <button
            type="button"
            onClick={() => setShelvesOpen((v) => !v)}
            aria-expanded={shelvesOpen}
            aria-controls="shelves"
            className="inline-flex items-center gap-2 text-[15px] font-semibold hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${shelvesOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
            {shelvesOpen ? 'Hide' : 'See'} all {PANTRY_ITEMS.length} ingredients
          </button>
          <button type="button" onClick={startOver} className={`${LINK} text-[14px] lg:hidden`}>
            Start over
          </button>
        </div>
        {shelvesOpen && <Shelves id="shelves" haveSet={haveSet} toggle={toggle} />}
      </div>

      {/* ── Results ── */}
      <aside
        id="results"
        aria-labelledby="results-heading"
        className="scroll-mt-[124px] lg:sticky lg:top-[88px] lg:max-h-[calc(100vh-104px)] lg:overflow-y-auto border border-ink bg-paper-50"
      >
        <div className="px-5 py-4 border-b border-ink lg:sticky lg:top-0 bg-paper-50 z-10">
          <h2
            id="results-heading"
            className="text-[22px] font-extrabold tracking-[-0.01em] uppercase"
          >
            What you can make
          </h2>
          <p className="mt-1 font-mono text-[13px] text-ink-muted">
            {inReach} in reach · {results.ready.length} ready · {have.length} tapped
          </p>
        </div>

        {have.length === 0 ? (
          <div className="px-5 py-8">
            <p className="text-[16px] font-semibold">Nothing tapped — not even the basics.</p>
            <p className="mt-1.5 text-ink-muted leading-[1.55]">
              Tap a protein, or put the basics back, and the meals you can cook show up here.
            </p>
            <button type="button" onClick={startOver} className={`${BUTTON_INK} mt-4`}>
              Start over
            </button>
          </div>
        ) : (
          <>
            {inReach === 0 && (
              <div className="px-5 py-8">
                <p className="text-[16px] font-semibold">Nothing close yet.</p>
                <p className="mt-1.5 text-ink-muted leading-[1.55]">
                  Most meals hinge on a protein plus a few supporting things. Tap the meat, fish, or
                  eggs you have, then answer the next question, and this fills in.
                </p>
              </div>
            )}
            {results.ready.length > 0 && (
              <section aria-labelledby="ready-heading">
                <h3 id="ready-heading" className={`${EYEBROW} text-accent px-5 pt-4 pb-2`}>
                  Cook now · nothing missing ({results.ready.length})
                </h3>
                <ul className="border-t border-hairline">
                  {results.ready.map((v) => (
                    <ResultRow key={v.recipe.slug} verdict={v} />
                  ))}
                </ul>
              </section>
            )}
            {results.close.length > 0 && (
              <section aria-labelledby="close-heading" className="border-t border-hairline">
                <h3 id="close-heading" className={`${EYEBROW} text-ink-subtle px-5 pt-4 pb-2`}>
                  A thing or two short ({results.close.length})
                </h3>
                <ul className="border-t border-hairline">
                  {results.close.map((v) => (
                    <ResultRow key={v.recipe.slug} verdict={v} />
                  ))}
                </ul>
              </section>
            )}
            {results.far.length > 0 && (
              <section aria-labelledby="far-heading" className="border-t border-hairline">
                <h3
                  id="far-heading"
                  className={`${EYEBROW} text-ink-subtle px-5 pt-4 pb-2 flex items-center justify-between gap-3`}
                >
                  <span>Needs a proper shop ({results.far.length})</span>
                  <button
                    type="button"
                    onClick={() => setShowFar((v) => !v)}
                    aria-expanded={showFar}
                    aria-controls="far-list"
                    className="font-sans normal-case tracking-normal text-[13px] font-semibold text-ink hover:text-accent transition-colors cursor-pointer"
                  >
                    {showFar ? 'Hide' : 'Show'}
                  </button>
                </h3>
                {showFar && (
                  <ul id="far-list" className="border-t border-hairline">
                    {results.far.map((v) => (
                      <ResultRow key={v.recipe.slug} verdict={v} />
                    ))}
                  </ul>
                )}
              </section>
            )}
          </>
        )}

        <p className="px-5 py-4 border-t border-hairline text-[13px] leading-[1.5] text-ink-muted">
          {results.hiddenNamed} hidden because a main ingredient isn&rsquo;t tapped: the protein, or
          something the dish is named for.
        </p>
      </aside>
    </div>
  );
}
