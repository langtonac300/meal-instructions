'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Search, X } from 'lucide-react';
import { APPLIANCES } from '@/data/appliances';
import { track } from '@/lib/analytics';
import { isConfigured, readProfile } from '@/lib/profile';
import {
  PACK_MAX,
  PAPER_KEY,
  applianceLabel,
  packHref,
  parsePaper,
  timeLabel,
  type PackCatalogEntry,
  type PaperSize,
} from '@/lib/print-pack';
import type { Appliance } from '@/lib/types';

type Filter = 'all' | 'selected' | 'mine' | Appliance;

interface Props {
  catalog: PackCatalogEntry[];
  /** Slugs already in the pack shown on this page, in order. */
  initial: readonly string[];
  /** The default pack, offered as a one-click preset. */
  top20: readonly string[];
}

interface SavedResponse {
  signedIn: boolean;
  slugs: string[];
}

interface ChipProps {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function Chip({ active, disabled, onClick, children }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`px-2 py-1 border transition-colors disabled:opacity-40 ${
        active
          ? 'bg-ink text-paper border-ink'
          : 'bg-paper text-ink-muted border-hairline hover:border-ink hover:text-ink'
      }`}
    >
      {children}
    </button>
  );
}

/**
 * Pick the recipes for a custom pack. The selection lives in the URL
 * (`/print-pack/custom?r=slug,slug`), so building a pack is a navigation and
 * the result is a link that can be bookmarked or sent — the server renders the
 * pages, and this component never needs the recipe records themselves.
 *
 * The kitchen profile (localStorage) and saved meals (signed-in only) are read
 * after mount; the page is complete without either.
 */
export default function PackBuilder({ catalog, initial, top20 }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([...initial]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [owned, setOwned] = useState<Appliance[]>([]);
  const [saved, setSaved] = useState<SavedResponse | null>(null);

  useEffect(() => {
    const profile = readProfile();
    if (isConfigured(profile)) setOwned(profile.appliances);

    let cancelled = false;
    fetch('/api/meals/saved')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: SavedResponse | null) => {
        if (!cancelled && data?.signedIn) setSaved(data);
      })
      .catch(() => {
        // signed out, or meals not configured — the preset just doesn't appear
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const known = useMemo(() => new Set(catalog.map((entry) => entry.slug)), [catalog]);
  const selectedSet = useMemo(() => new Set(selected), [selected]);
  const counts = useMemo(() => {
    const map = new Map<Appliance, number>();
    for (const entry of catalog) map.set(entry.appliance, (map.get(entry.appliance) ?? 0) + 1);
    return map;
  }, [catalog]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog.filter((entry) => {
      if (filter === 'selected' && !selectedSet.has(entry.slug)) return false;
      if (filter === 'mine' && !owned.includes(entry.appliance)) return false;
      if (filter !== 'all' && filter !== 'selected' && filter !== 'mine' && entry.appliance !== filter) {
        return false;
      }
      if (!q) return true;
      return (
        entry.title.toLowerCase().includes(q) ||
        entry.slug.includes(q) ||
        entry.id.includes(q) ||
        entry.appliance.includes(q) ||
        entry.protein.includes(q)
      );
    });
  }, [catalog, filter, query, selectedSet, owned]);

  const full = selected.length >= PACK_MAX;

  const toggle = (slug: string) => {
    if (selectedSet.has(slug)) {
      setSelected(selected.filter((s) => s !== slug));
    } else if (!full) {
      setSelected([...selected, slug]);
    }
  };

  const replaceWith = (slugs: readonly string[]) => {
    setSelected(slugs.filter((slug) => known.has(slug)).slice(0, PACK_MAX));
  };

  const dirty = selected.join(',') !== initial.join(',');

  const build = () => {
    if (selected.length === 0) return;
    track('tool_used', { tool: 'print_pack', items_selected: selected.length });
    let paper: PaperSize = 'letter';
    try {
      paper = parsePaper(localStorage.getItem(PAPER_KEY));
    } catch {
      // Letter
    }
    router.push(`${packHref(selected, paper)}#pack`);
  };

  return (
    <section
      id="builder"
      aria-labelledby="builder-heading"
      className="no-print scroll-mt-20 hairline-border bg-paper-card"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 px-4 py-3 hairline-b">
        <div>
          <h2 id="builder-heading" className="micro-label text-accent">
            Build your own pack
          </h2>
          <p className="text-xs text-ink-muted mt-1 font-sans">
            Tick up to {PACK_MAX} of the {catalog.length} recipes. Each one prints as a page; the
            cover index rebuilds itself.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
          <span className="text-ink-subtle">Presets</span>
          <Chip onClick={() => replaceWith(top20)}>Top 20</Chip>
          {saved && (
            <Chip onClick={() => replaceWith(saved.slugs)} disabled={saved.slugs.length === 0}>
              Saved meals ({saved.slugs.length})
            </Chip>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 px-4 py-3 hairline-b">
        <label className="relative flex-1 min-w-[12rem]">
          <Search
            className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-subtle"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${catalog.length} recipes`}
            aria-label="Search recipes"
            className="w-full pl-8 pr-3 py-1.5 bg-paper hairline-border font-sans text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-ink"
          />
        </label>
        <div className="flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-wider">
          <Chip active={filter === 'all'} onClick={() => setFilter('all')}>
            All
          </Chip>
          {owned.length > 0 && (
            <Chip active={filter === 'mine'} onClick={() => setFilter('mine')}>
              My kitchen
            </Chip>
          )}
          <Chip active={filter === 'selected'} onClick={() => setFilter('selected')}>
            Selected ({selected.length})
          </Chip>
          {APPLIANCES.map((appliance) =>
            counts.get(appliance.slug) ? (
              <Chip
                key={appliance.slug}
                active={filter === appliance.slug}
                onClick={() => setFilter(appliance.slug)}
              >
                {applianceLabel(appliance.slug)}
              </Chip>
            ) : null
          )}
        </div>
      </div>

      <ul className="max-h-72 overflow-y-auto divide-y divide-paper-200" aria-label="Recipes">
        {visible.length === 0 && (
          <li className="px-4 py-6 text-center font-mono text-[11px] uppercase tracking-wider text-ink-subtle">
            No recipes match
          </li>
        )}
        {visible.map((entry) => {
          const checked = selectedSet.has(entry.slug);
          const disabled = !checked && full;
          return (
            <li key={entry.slug}>
              <label
                className={`flex items-center gap-3 px-4 py-2 transition-colors ${
                  checked ? 'bg-paper' : 'hover:bg-paper'
                } ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled}
                  onChange={() => toggle(entry.slug)}
                  className="w-3.5 h-3.5 accent-ink shrink-0"
                />
                <span className="w-9 shrink-0 font-mono text-[11px] font-bold text-accent">{entry.id}</span>
                <span className="flex-1 min-w-0 truncate font-sans text-[13px] font-semibold text-ink">
                  {entry.title}
                </span>
                <span className="hidden sm:inline w-24 shrink-0 text-right font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                  {applianceLabel(entry.appliance)}
                </span>
                <span className="w-10 shrink-0 text-right font-mono text-[11px] font-bold text-ink">
                  {timeLabel(entry.totalMinutes)}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 hairline-t">
        <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
          <span className="text-ink font-bold">{selected.length} selected</span> // {selected.length + 1}{' '}
          pages
          {full && <span className="text-accent"> // pack full — {PACK_MAX} max</span>}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => replaceWith([])}
            disabled={selected.length === 0}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-paper hairline-border font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink hover:border-ink transition-colors disabled:opacity-40"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
          <button
            type="button"
            onClick={build}
            disabled={selected.length === 0 || !dirty}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-ink text-paper font-mono text-[11px] uppercase tracking-wider hover:bg-accent transition-colors disabled:opacity-40 disabled:hover:bg-ink"
          >
            {dirty ? 'Build pack' : 'This pack is below'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
