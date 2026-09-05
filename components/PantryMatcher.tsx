'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Search } from 'lucide-react';
import { PANTRY_GROUPS, PANTRY_ITEMS, STAPLE_IDS } from '@/data/pantry';
import {
  labelFor,
  matchPantry,
  MAX_MISSING,
  type PantryRecipe,
  type PantryVerdict,
} from '@/lib/pantry-match';
import { track } from '@/lib/analytics';

/** Same shape as the kitchen profile: local first, so it works signed out. */
const STORAGE_KEY = 'mi_pantry_v1';
const VALID_IDS = new Set(PANTRY_GROUPS.flatMap((g) => g.items.map((i) => i.id)));

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
const BUTTON =
  'px-3.5 py-2 border border-ink text-[14px] font-semibold text-ink hover:bg-ink hover:text-paper transition-colors cursor-pointer';

function readStored(): string[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    const have = (parsed as { have?: unknown } | null)?.have;
    return Array.isArray(have)
      ? have.filter((x): x is string => typeof x === 'string' && VALID_IDS.has(x))
      : null;
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

/** "Other cheese (provolone, feta, …)" → "Other cheese" in the missing list. */
const shortLabel = (id: string) => labelFor(id).replace(/\s*\([^)]*\)\s*$/, '');
const applianceLabel = (appliance: string) => appliance.replace(/-/g, ' ');

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

interface PantryMatcherProps {
  recipes: PantryRecipe[];
}

/**
 * The /what-can-i-make island: tick what is in the house, see what you can
 * cook. The vocabulary and the rules live in data/pantry.ts and
 * lib/pantry-match.ts; this file is the checkboxes and the list.
 */
export default function PantryMatcher({ recipes }: PantryMatcherProps) {
  // The staples are the deterministic first render; the stored selection
  // replaces them after mount so server and client HTML agree.
  const [have, setHave] = useState<string[]>(STAPLE_IDS);
  const [hydrated, setHydrated] = useState(false);
  const [filter, setFilter] = useState('');
  const [showFar, setShowFar] = useState(false);

  useEffect(() => {
    const fromUrl = readUrlHave();
    const base = readStored() ?? STAPLE_IDS;
    setHave(Array.from(new Set([...base, ...fromUrl])));
    setHydrated(true);
    if (fromUrl.length > 0) {
      window.history.replaceState(null, '', window.location.pathname + window.location.hash);
    }
  }, []);

  useEffect(() => {
    if (hydrated) writeStored(have);
  }, [have, hydrated]);

  const haveSet = useMemo(() => new Set(have), [have]);
  const results = useMemo(() => matchPantry(recipes, haveSet), [recipes, haveSet]);

  // One event per settled change, never one per click, never on load.
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
        results_ready: results.ready.length,
        results_close: results.close.length,
      });
    }, 1200);
    return () => clearTimeout(timer);
  }, [have, hydrated, results]);

  const toggle = (id: string) =>
    setHave((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const tickBasics = () => setHave((prev) => Array.from(new Set([...prev, ...STAPLE_IDS])));
  const clearAll = () => setHave([]);

  const query = filter.trim().toLowerCase();
  const groups = PANTRY_GROUPS.map((group) => ({
    ...group,
    visible: query
      ? group.items.filter((i) => SEARCH_TEXT.get(i.id)?.includes(query))
      : group.items,
    ticked: group.items.filter((i) => haveSet.has(i.id)).length,
  })).filter((g) => g.visible.length > 0);

  const shown = results.ready.length + results.close.length;
  const summary = `${results.ready.length} ready · ${results.close.length} close · ${have.length} ticked`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-10 items-start">
      {/* Phones: the list sits under 160 chips, so a sticky line keeps the count in view. */}
      <div className="lg:hidden sticky top-[72px] z-20 -mx-5 sm:-mx-10 px-5 sm:px-10 py-2.5 bg-paper border-b border-ink flex items-center justify-between gap-4 text-[14px]">
        <span className="font-mono text-[13px]">{summary}</span>
        <a href="#results" className="font-semibold shrink-0 hover:text-accent transition-colors">
          See meals ↓
        </a>
      </div>

      {/* ── Picker ── */}
      <div>
        <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-ink">
          <label className="flex items-center gap-2.5 px-3.5 py-2.5 bg-paper-50 border-2 border-ink flex-1 min-w-[220px] cursor-text">
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
          <button type="button" onClick={tickBasics} className={BUTTON}>
            Tick the basics
          </button>
          <button type="button" onClick={clearAll} className={BUTTON}>
            Clear all
          </button>
        </div>

        {groups.length === 0 ? (
          <p className="pt-7 text-ink-muted">
            No ingredient matches &ldquo;{filter}&rdquo;. Try a plainer word — chicken, cheese,
            rice.
          </p>
        ) : (
          groups.map((group) => (
            <section key={group.id} className="pt-7" aria-labelledby={`pantry-${group.id}`}>
              <h2
                id={`pantry-${group.id}`}
                className="flex items-baseline gap-3 text-[18px] font-extrabold tracking-[-0.01em] uppercase"
              >
                {group.label}
                <span className="font-mono text-[12px] font-normal tracking-normal normal-case text-ink-subtle">
                  {group.ticked}/{group.items.length}
                </span>
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.visible.map((item) => {
                  const on = haveSet.has(item.id);
                  return (
                    <li key={item.id}>
                      <label
                        className={`inline-flex items-center gap-1.5 px-3 py-[7px] border text-[14px] leading-none cursor-pointer select-none transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-accent ${
                          on
                            ? 'bg-ink text-paper border-ink'
                            : 'bg-paper-50 text-ink border-hairline hover:border-ink'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={on}
                          onChange={() => toggle(item.id)}
                        />
                        {on && <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
                        {item.label}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))
        )}
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
          <p className="mt-1 font-mono text-[13px] text-ink-muted" aria-live="polite">
            {summary}
          </p>
        </div>

        {have.length === 0 ? (
          <div className="px-5 py-8">
            <p className="text-[16px] font-semibold">Nothing ticked yet.</p>
            <p className="mt-1.5 text-ink-muted leading-[1.55]">
              Tick a protein or two — or the basics — and the meals you can cook show up here.
            </p>
            <button type="button" onClick={tickBasics} className={`${BUTTON} mt-4`}>
              Tick the basics
            </button>
          </div>
        ) : (
          <>
            {shown === 0 && (
              <div className="px-5 py-8">
                <p className="text-[16px] font-semibold">Nothing close yet.</p>
                <p className="mt-1.5 text-ink-muted leading-[1.55]">
                  Most meals hinge on a protein plus a few supporting things. Tick the meat, fish,
                  or eggs you have, then the onions, garlic, and sauces, and this fills in.
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
                  Short a thing or two ({results.close.length})
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
          {results.hiddenNamed} hidden because a main ingredient isn&rsquo;t ticked: the protein, or
          something the dish is named for.
        </p>
      </aside>
    </div>
  );
}
