'use client';

import React, { useState, useMemo, useRef, useEffect, useId } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import type { LookupDatasheet, LookupRecipe } from '@/lib/cook-time-lookup';
import { tokenize } from '@/lib/lookup-tokenize';
import { track, searchTerm } from '@/lib/analytics';

interface CookTimeLookupProps {
  datasheets: LookupDatasheet[];
  recipes: LookupRecipe[];
  /** Total datasheet count, printed under the input (card variant only). */
  datasheetCount: number;
  /** 'card' is the home page's starting-point card; 'hero' is the larger /how-long field. */
  variant?: 'card' | 'hero';
}

const datasheetHref = (d: LookupDatasheet) => `/how-long/${d.appliance}/${d.foodSlug}`;
const recipeHref = (r: LookupRecipe) => `/recipes/${r.slug}`;

/**
 * The home page's one client island: the "Look up a cook time" input.
 *
 * Replaces the search half of the old <KitchenHud />: same on-every-keystroke
 * matching (per word now, so "air fryer chicken" works), over the slim index
 * from lib/cook-time-lookup.ts instead of the full corpus. Results are links;
 * Enter takes the first one; Escape and an outside click close the list.
 */
export default function CookTimeLookup({
  datasheets,
  recipes,
  datasheetCount,
  variant = 'card',
}: CookTimeLookupProps) {
  const hero = variant === 'hero';
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const listId = useId();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // One lowercased haystack per entry, built once. The display fields are
  // part of it, so the index only carries the extra words (lib/cook-time-lookup.ts).
  const datasheetHay = useMemo(
    () =>
      datasheets.map((d) =>
        `${d.food} ${d.appliance.replace(/-/g, ' ')} ${d.state} ${d.terms}`.toLowerCase(),
      ),
    [datasheets],
  );
  const recipeHay = useMemo(
    () => recipes.map((r) => `${r.title} ${r.slug.replace(/-/g, ' ')} ${r.terms}`.toLowerCase()),
    [recipes],
  );

  // Every query word must appear somewhere in the entry ("air fryer chicken",
  // "chicken br", "frozen fries" all work). Word order does not matter.
  const results = useMemo(() => {
    const words = tokenize(query);
    if (words.length === 0)
      return {
        datasheets: [] as LookupDatasheet[],
        recipes: [] as LookupRecipe[],
      };
    const matches = (hay: string) => words.every((w) => hay.includes(w));
    return {
      datasheets: datasheets.filter((_, i) => matches(datasheetHay[i])).slice(0, 5),
      recipes: recipes.filter((_, i) => matches(recipeHay[i])).slice(0, 5),
    };
  }, [query, datasheets, recipes, datasheetHay, recipeHay]);

  const hasResults = results.datasheets.length > 0 || results.recipes.length > 0;
  const isOpen = isFocused && query.trim().length > 1;

  const firstHref = results.datasheets[0]
    ? datasheetHref(results.datasheets[0])
    : results.recipes[0]
      ? recipeHref(results.recipes[0])
      : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstHref) {
      track('search_select', {
        search_term: searchTerm(query),
        href: firstHref,
        result_type: results.datasheets[0] ? 'datasheet' : 'recipe',
        position: 1,
        method: 'keyboard',
      });
      setIsFocused(false);
      router.push(firstHref);
    }
  };

  const selectResult = (href: string, type: 'datasheet' | 'recipe', position: number) => {
    track('search_select', {
      search_term: searchTerm(query),
      href,
      result_type: type,
      position,
      method: 'click',
    });
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsFocused(false);
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="relative">
        <form onSubmit={handleSubmit} role="search" aria-label="Look up a cook time">
          <label
            className={`flex items-center bg-paper border-2 border-ink cursor-text focus-within:border-ink ${
              hero ? 'gap-3 px-[18px] py-4 bg-paper-50' : 'gap-2.5 px-3.5 py-3'
            }`}
            htmlFor={`${listId}-input`}
          >
            <Search className="w-[18px] h-[18px] text-accent shrink-0" aria-hidden="true" />
            <input
              id={`${listId}-input`}
              type="search"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onKeyDown={handleKeyDown}
              placeholder={
                hero
                  ? 'What are you cooking? chicken breast, brisket, frozen fries…'
                  : 'chicken breast, salmon, frozen fries…'
              }
              aria-expanded={isOpen}
              aria-controls={isOpen ? `${listId}-results` : undefined}
              className={`w-full min-w-0 bg-transparent text-ink placeholder:text-ink-subtle focus:outline-none [&::-webkit-search-cancel-button]:appearance-none ${
                hero ? 'text-[18px]' : 'text-[15px]'
              }`}
            />
          </label>
        </form>

        {isOpen && (
          <div
            id={`${listId}-results`}
            className="absolute left-0 right-0 top-full mt-1 bg-paper border-2 border-ink max-h-96 overflow-y-auto z-50 text-[14px]"
          >
            {hasResults ? (
              <>
                {results.datasheets.length > 0 && (
                  <div className="p-2">
                    <div className="px-2 py-1 font-mono text-[11px] font-bold text-accent uppercase tracking-[0.08em] flex items-center justify-between">
                      <span>Cook-time datasheets</span>
                      <span>{results.datasheets.length}</span>
                    </div>
                    <ul>
                      {results.datasheets.map((d) => (
                        <li key={`${d.appliance}/${d.foodSlug}`}>
                          <Link
                            href={datasheetHref(d)}
                            onClick={() => setIsFocused(false)}
                            className="block px-2 py-2 hover:bg-paper-200 transition-colors group"
                          >
                            <span className="block font-semibold text-ink group-hover:text-accent transition-colors truncate">
                              {d.food}
                            </span>
                            <span className="mt-1 flex items-center gap-2 font-mono text-[12px] text-ink-muted">
                              <span className="px-1.5 py-0.5 bg-ink text-paper text-[11px] uppercase shrink-0">
                                {d.appliance.replace(/-/g, ' ')}
                              </span>
                              <span className="uppercase text-ink-subtle">{d.state}</span>
                              <span className="ml-auto font-bold text-ink">
                                {d.tempFormatted.split(' ')[0]}
                              </span>
                              <span>{d.timeFormatted}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {results.recipes.length > 0 && (
                  <div className="p-2 bg-paper-50 border-t border-hairline">
                    <div className="px-2 py-1 font-mono text-[11px] font-bold text-ink-subtle uppercase tracking-[0.08em] flex items-center justify-between">
                      <span>Recipes</span>
                      <span>{results.recipes.length}</span>
                    </div>
                    <ul>
                      {results.recipes.map((r) => (
                        <li key={r.slug}>
                          <Link
                            href={recipeHref(r)}
                            onClick={() => setIsFocused(false)}
                            className="block px-2 py-2 hover:bg-paper-200 transition-colors group"
                          >
                            <span className="block font-semibold text-ink group-hover:text-accent transition-colors truncate">
                              {r.title}
                            </span>
                            <span className="mt-1 flex items-center gap-2 font-mono text-[12px] text-ink-muted">
                              <span className="px-1.5 py-0.5 bg-paper-300 text-ink text-[11px] uppercase shrink-0">
                                Recipe
                              </span>
                              <span className="ml-auto">{r.totalMinutes} min</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="p-5 text-center text-ink-muted">
                <p className="font-semibold">No match for &ldquo;{query}&rdquo;</p>
                <p className="text-[12px] mt-1 text-ink-subtle">
                  Try a food (chicken, salmon, fries) or an appliance (air fryer, oven).
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {!hero && (
        <p className="mt-2.5 font-mono text-[12px] text-ink-subtle uppercase tracking-[0.08em]">
          {datasheetCount.toLocaleString('en-US')} verified datasheets
        </p>
      )}
    </div>
  );
}
