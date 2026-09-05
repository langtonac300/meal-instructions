'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  X,
  ArrowRight,
  Flame,
  Clock,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { COOK_TIME_DATASHEETS } from '@/data/cook-times';
import { RECIPES } from '@/data/recipes';
import { POPULAR_PRESETS } from '@/data/cook-time-presets';
import type { CookTimeDatasheet, Recipe } from '@/lib/types';
import {
  LeanAirFryerIcon,
  LeanHeatWavesIcon,
  LeanClockIcon,
  LeanFlipIcon,
  LeanProbeIcon,
  LeanSafetyShieldIcon,
  LeanStopwatchIcon,
} from './icons/Lean5SIcons';


export default function KitchenHud() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeDatasheetSlug, setActiveDatasheetSlug] = useState<string>(
    'air-fryer-chicken-breast-boneless'
  );
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Active datasheet lookup
  const activeDatasheet = useMemo(() => {
    return (
      COOK_TIME_DATASHEETS.find((d) => d.slug === activeDatasheetSlug) ||
      COOK_TIME_DATASHEETS[0]
    );
  }, [activeDatasheetSlug]);

  // Unified Omnibar Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { datasheets: [], recipes: [] };

    const q = searchQuery.toLowerCase().trim();

    const matchedDatasheets = COOK_TIME_DATASHEETS.filter(
      (d) =>
        d.food.toLowerCase().includes(q) ||
        d.appliance.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q) ||
        (d.keywords && d.keywords.some((k) => k.toLowerCase().includes(q)))
    ).slice(0, 5);

    const matchedRecipes = RECIPES.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.tagline.toLowerCase().includes(q) ||
        r.protein.toLowerCase().includes(q) ||
        r.appliance.toLowerCase().includes(q) ||
        (r.keywords && r.keywords.some((k) => k.toLowerCase().includes(q))) ||
        (r.ingredients && r.ingredients.some((i) => i.item.toLowerCase().includes(q)))
    ).slice(0, 5);

    return { datasheets: matchedDatasheets, recipes: matchedRecipes };
  }, [searchQuery]);

  const hasResults =
    searchResults.datasheets.length > 0 || searchResults.recipes.length > 0;

  return (
    <div className="w-full bg-paper border-b border-hairline py-6 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Top Header Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-bold text-ink">PRECISION KITCHEN HUD</span>
              <span className="hidden sm:inline text-ink-muted/70">
                — INSTANT TEMPERATURE, TIME &amp; SAFETY LOOKUP
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-ink uppercase tracking-tight font-sans mt-0.5">
              The 5-Second Cook-Time Terminal
            </h2>
          </div>

          <div className="font-mono text-[11px] text-ink-muted flex items-center gap-3">
            <span className="px-2 py-0.5 bg-paper-100 border border-hairline rounded font-bold text-ink">
              {COOK_TIME_DATASHEETS.length} USDA DATASHEETS
            </span>
            <span className="px-2 py-0.5 bg-paper-100 border border-hairline rounded font-bold text-ink">
              {RECIPES.length} MEALS
            </span>
          </div>
        </div>

        {/* ── OMNI-SEARCH INPUT BAR ── */}
        <div ref={searchContainerRef} className="relative w-full">
          <div className="relative flex items-center bg-paper-50 border-2 border-ink rounded shadow-subtle focus-within:ring-2 focus-within:ring-accent transition-all">
            <div className="pl-4 pr-2 text-ink">
              <Search className="w-5 h-5 text-accent" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Instant food lookup: type 'chicken breast', 'salmon', 'frozen burger', 'bacon', 'wings'..."
              className="w-full py-3 pr-10 bg-transparent font-mono text-sm text-ink placeholder:text-ink-subtle placeholder:font-sans focus:outline-none"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="pr-3 text-ink-muted hover:text-ink cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <div className="hidden lg:flex items-center gap-1 pr-3 text-[10px] font-mono text-ink-subtle uppercase">
              <kbd className="px-1.5 py-0.5 bg-paper-200 border border-hairline rounded">
                LIVE
              </kbd>
              <span>LOOKUP</span>
            </div>
          </div>

          {/* Real-Time Live Search Dropdown */}
          {isSearchFocused && searchQuery.trim().length > 1 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-paper border-2 border-ink rounded shadow-float z-50 max-h-96 overflow-y-auto font-mono text-xs divide-y divide-hairline">
              {hasResults ? (
                <>
                  {/* Verified Datasheet Matches */}
                  {searchResults.datasheets.length > 0 && (
                    <div className="p-2">
                      <div className="px-2 py-1 text-[10px] font-bold text-accent uppercase tracking-wider flex items-center justify-between">
                        <span>VERIFIED COOK-TIME DATASHEETS</span>
                        <span>{searchResults.datasheets.length} MATCHES</span>
                      </div>
                      <div className="space-y-1">
                        {searchResults.datasheets.map((ds) => (
                          <div
                            key={ds.slug}
                            onClick={() => {
                              setActiveDatasheetSlug(ds.slug);
                              setIsSearchFocused(false);
                            }}
                            className="p-2 hover:bg-paper-200 rounded cursor-pointer flex items-center justify-between transition-colors group"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="px-1.5 py-0.5 bg-ink text-paper rounded text-[9px] uppercase font-bold">
                                {ds.appliance}
                              </span>
                              <span className="font-bold text-ink group-hover:text-accent transition-colors">
                                {ds.food}
                              </span>
                              <span className="text-[10px] text-ink-subtle uppercase">
                                ({ds.state})
                              </span>
                            </div>

                            <div className="flex items-center gap-3 text-right">
                              <span className="font-bold text-ink">
                                {ds.tempFormatted.split(' ')[0]}
                              </span>
                              <span className="text-ink-muted">
                                {ds.timeFormatted}
                              </span>
                              <span className="text-[10px] text-accent font-bold group-hover:underline">
                                LOAD →
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recipe Matches */}
                  {searchResults.recipes.length > 0 && (
                    <div className="p-2 bg-paper-50">
                      <div className="px-2 py-1 text-[10px] font-bold text-ink-subtle uppercase tracking-wider flex items-center justify-between">
                        <span>MATCHING WEEKNIGHT RECIPES</span>
                        <span>{searchResults.recipes.length} MATCHES</span>
                      </div>
                      <div className="space-y-1">
                        {searchResults.recipes.map((rc) => (
                          <Link
                            key={rc.slug}
                            href={`/recipes/${rc.slug}`}
                            className="p-2 hover:bg-paper-200 rounded flex items-center justify-between transition-colors group"
                          >
                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 bg-paper-300 text-ink rounded text-[9px] uppercase font-bold">
                                RECIPE
                              </span>
                              <span className="font-bold text-ink group-hover:text-accent transition-colors font-sans">
                                {rc.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-3 text-ink-muted text-right font-mono">
                              <span>{rc.totalMinutes} MIN</span>
                              <span className="text-[10px] text-accent font-bold group-hover:underline">
                                VIEW →
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-6 text-center text-ink-muted">
                  <p className="font-bold">No exact match for &quot;{searchQuery}&quot;</p>
                  <p className="text-[11px] mt-1 text-ink-subtle">
                    Try searching by ingredient (e.g. &apos;chicken&apos;, &apos;beef&apos;, &apos;salmon&apos;) or appliance.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── FAST POPULAR PRESET PILLS ── */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-mono uppercase tracking-wider scrollbar-none">
          <span className="shrink-0 text-ink-subtle font-bold mr-1">TOP QUERIES:</span>
          {POPULAR_PRESETS.map((preset) => {
            const isActive = activeDatasheetSlug === preset.slug;
            return (
              <button
                key={preset.slug}
                type="button"
                onClick={() => setActiveDatasheetSlug(preset.slug)}
                className={`px-2.5 py-1 rounded border transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-accent text-white border-accent font-bold shadow-sm'
                    : 'bg-paper-100 hover:bg-paper-200 border-hairline text-ink'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* ── ACTIVE DATASHEET SPECIMEN READ-OUT BOX ── */}
        <div className="bg-paper-100 border-2 border-hairline hover:border-ink/70 transition-colors rounded-lg p-4 sm:p-6 shadow-subtle">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-hairline pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-ink text-paper rounded font-mono text-[9px] font-bold uppercase tracking-wider">
                  {activeDatasheet.appliance.replace('-', ' ')}
                </span>
                <span className="px-2 py-0.5 bg-paper-200 text-ink rounded font-mono text-[9px] font-bold uppercase border border-hairline">
                  STATE: {activeDatasheet.state.toUpperCase()}
                </span>
                <span className="font-mono text-[10px] text-ink-subtle">
                  REF ID: {activeDatasheet.id}
                </span>
              </div>

              <h3 className="font-sans text-xl sm:text-2xl font-black text-ink uppercase tracking-tight">
                {activeDatasheet.food}
              </h3>
              <p className="font-sans text-xs text-ink-muted mt-0.5">
                {activeDatasheet.cutOrPrep}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
              {activeDatasheet.relatedRecipeSlug && (
                <Link
                  href={`/recipes/${activeDatasheet.relatedRecipeSlug}`}
                  className="px-3.5 py-1.5 bg-ink text-paper hover:bg-accent rounded font-mono text-xs font-bold uppercase transition-colors flex items-center gap-1.5"
                >
                  <span>Cook Recipe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
              <Link
                href={`/how-long/${activeDatasheet.appliance}/${activeDatasheet.foodSlug}`}
                className="px-3 py-1.5 bg-paper-50 hover:bg-paper-200 border border-hairline rounded font-mono text-xs font-bold uppercase text-ink transition-colors flex items-center gap-1"
              >
                <span>Full Datasheet</span>
                <ExternalLink className="w-3 h-3 text-ink-muted" />
              </Link>
            </div>
          </div>

          {/* 5-Column High Precision Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono">
            {/* 1. Temp */}
            <div className="bg-paper p-3 rounded border border-hairline flex flex-col justify-between">
              <div className="flex items-center justify-between text-ink-subtle text-[10px] uppercase font-bold">
                <span>COOK TEMP</span>
                <LeanHeatWavesIcon size={16} className="text-accent" />
              </div>
              <div className="my-1 text-lg sm:text-xl font-black text-ink">
                {activeDatasheet.tempFormatted.split(' ')[0]}
              </div>
              <div className="text-[9px] text-ink-muted truncate">
                {activeDatasheet.tempC}°C CONVECTION
              </div>
            </div>

            {/* 2. Time */}
            <div className="bg-paper p-3 rounded border border-hairline flex flex-col justify-between">
              <div className="flex items-center justify-between text-ink-subtle text-[10px] uppercase font-bold">
                <span>TOTAL TIME</span>
                <LeanClockIcon size={16} className="text-ink-muted" />
              </div>
              <div className="my-1 text-lg sm:text-xl font-black text-ink">
                {activeDatasheet.timeFormatted}
              </div>
              <div className="text-[9px] text-ink-muted">
                {activeDatasheet.timeMinMinutes}–{activeDatasheet.timeMaxMinutes} MIN RANGE
              </div>
            </div>

            {/* 3. Midpoint Flip */}
            <div className="bg-paper p-3 rounded border border-hairline flex flex-col justify-between">
              <div className="flex items-center justify-between text-ink-subtle text-[10px] uppercase font-bold">
                <span>MIDPOINT FLIP</span>
                <LeanFlipIcon size={16} className="text-accent" />
              </div>
              <div className="my-1 text-lg sm:text-xl font-black text-ink">
                {activeDatasheet.flipAtMinutes > 0
                  ? `@ ${activeDatasheet.flipAtMinutes}m`
                  : 'No Flip'}
              </div>
              <div className="text-[9px] text-ink-muted">
                {activeDatasheet.flipAtMinutes > 0 ? 'SHAKE / TURN OVER' : 'SINGLE SIDE COOK'}
              </div>
            </div>

            {/* 4. Internal Temp Pull Target */}
            <div className="bg-paper p-3 rounded border border-hairline flex flex-col justify-between">
              <div className="flex items-center justify-between text-ink-subtle text-[10px] uppercase font-bold">
                <span>INTERNAL TARGET</span>
                <LeanProbeIcon size={16} className="text-accent" />
              </div>
              <div className="my-1 text-lg sm:text-xl font-black text-accent">
                {(activeDatasheet.internalTempTargetF ?? 0) > 0
                  ? `${activeDatasheet.internalTempTargetF}°F`
                  : 'Visual Cue'}
              </div>
              <div className="text-[9px] text-ink-muted truncate">
                {activeDatasheet.internalTempTargetFormatted || 'Check doneness cue'}
              </div>
            </div>

            {/* 5. Rest & Oil */}
            <div className="bg-paper p-3 rounded border border-hairline col-span-2 sm:col-span-1 flex flex-col justify-between">
              <div className="flex items-center justify-between text-ink-subtle text-[10px] uppercase font-bold">
                <span>REST &amp; SPRAY</span>
                <LeanStopwatchIcon size={16} className="text-ink-muted" />
              </div>
              <div className="my-1 text-lg sm:text-xl font-black text-ink">
                {activeDatasheet.restMinutes ?? 0}m REST
              </div>
              <div className="text-[9px] text-ink-muted">
                OIL SPRAY: {activeDatasheet.oilSprayRequired ? 'REQUIRED' : 'NONE'}
              </div>
            </div>
          </div>

          {/* Pro Tip & Doneness Banner */}
          <div className="mt-3 pt-3 border-t border-hairline/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-sans">
            <div className="flex items-start sm:items-center gap-2">
              <span className="font-mono text-[9px] font-bold bg-paper-200 text-ink px-1.5 py-0.5 rounded uppercase shrink-0">
                DONENESS CUE
              </span>
              <span className="text-ink-muted font-medium">
                {activeDatasheet.donenessCue}
              </span>
            </div>

            <div className="text-[10px] font-mono text-ink-subtle shrink-0">
              BASIS: {activeDatasheet.verificationBasis}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
