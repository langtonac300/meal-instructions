'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  Clock,
  Flame,
  LayoutGrid,
  ListFilter,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
} from 'lucide-react';
import { RECIPES } from '@/data/recipes';
import { CATEGORIES } from '@/data/categories';
import { APPLIANCES } from '@/data/appliances';
import RecipeCard from '@/components/RecipeCard';
import RecipeTable from '@/components/RecipeTable';
import RecipeScrubber from '@/components/RecipeScrubber';
import AirFryerCalculator from '@/components/AirFryerCalculator';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAppliance, setSelectedAppliance] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter recipes based on category & appliance
  const filteredRecipes = RECIPES.filter((recipe) => {
    const matchesCategory =
      selectedCategory === 'all' || (recipe.categories as string[]).includes(selectedCategory);
    const matchesAppliance =
      selectedAppliance === 'all' || recipe.appliance === selectedAppliance;
    return matchesCategory && matchesAppliance;
  });

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      {/* ── TOP INTERACTIVE SCRUBBER (Kellerstöckl Inspired) ── */}
      <RecipeScrubber />

      {/* ── HERO ARCHITECTURAL SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 sm:pt-16 pb-8 w-full border-b border-hairline">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Main Title & Subtitle */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-paper-200 border border-hairline text-ink font-mono text-[10px] uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>THE ANTI-ESSAY COOKING PLATFORM</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-ink uppercase leading-[0.95]">
              ZERO FLUFF.
              <br />
              <span className="text-accent">JUST DIRECTIONS.</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-ink-muted font-sans max-w-2xl leading-relaxed">
              Every recipe starts with a toggle: choose <strong>&ldquo;Get to the Point&rdquo;</strong> for
              a 20-word telegram execution, or <strong>&ldquo;Step-by-Step&rdquo;</strong> for fluff-free
              guided steps. No life stories. No ads jumping around your screen.
            </p>
          </div>

          {/* Key Quick Stats Box */}
          <div className="lg:col-span-4 bg-paper-100 border border-hairline p-5 rounded font-mono text-xs shadow-subtle">
            <div className="text-[10px] uppercase tracking-widest text-ink-subtle border-b border-hairline pb-2 mb-3 flex items-center justify-between">
              <span>SYSTEM SPECIFICATIONS</span>
              <span className="text-accent font-bold">V 1.0</span>
            </div>

            <div className="space-y-2.5 text-ink">
              <div className="flex justify-between items-center">
                <span className="text-ink-muted">TOTAL INDEXED MEALS:</span>
                <span className="font-bold">{RECIPES.length} RECIPES</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ink-muted">AVG PREP + COOK:</span>
                <span className="font-bold">12.8 MINUTES</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ink-muted">LIFE STORIES REMOVED:</span>
                <span className="font-bold text-accent">100% (0 WORDS)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ink-muted">AI & LLM SCRAPER:</span>
                <Link
                  href="/llms.txt"
                  target="_blank"
                  className="font-bold underline hover:text-accent"
                >
                  LLMS.TXT READY
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAST APPLIANCE QUICK-JUMP BAR ── */}
        <div className="mt-8 pt-4 border-t border-hairline/80 flex items-center gap-2 overflow-x-auto text-[11px] font-mono uppercase tracking-wider text-ink-muted">
          <span className="shrink-0 text-ink-subtle font-bold">POPULAR APPLIANCES:</span>
          {APPLIANCES.map((app) => (
            <button
              key={app.slug}
              onClick={() =>
                setSelectedAppliance(selectedAppliance === app.slug ? 'all' : app.slug)
              }
              className={`px-3 py-1 rounded border transition-all shrink-0 cursor-pointer ${
                selectedAppliance === app.slug
                  ? 'bg-ink text-paper border-ink font-bold shadow-sm'
                  : 'bg-paper-50 hover:bg-paper-200 border-hairline text-ink'
              }`}
            >
              {app.name}
            </button>
          ))}
        </div>
      </section>

      {/* ── RECIPES DIRECTORY SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full">
        {/* Category Pills & View Switcher */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-hairline pb-4 mb-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-[11px] font-mono uppercase tracking-wider pb-1 md:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded transition-all shrink-0 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-ink text-paper font-bold'
                  : 'bg-paper-100 hover:bg-paper-200 text-ink border border-hairline'
              }`}
            >
              ALL [{RECIPES.length}]
            </button>

            {CATEGORIES.map((cat) => {
              const count = RECIPES.filter((r) =>
                (r.categories as string[]).includes(cat.slug)
              ).length;
              const isActive = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3 py-1.5 rounded transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-ink text-paper font-bold'
                      : 'bg-paper-100 hover:bg-paper-200 text-ink border border-hairline'
                  }`}
                >
                  {cat.name.replace(' Staples', '').replace(' Meals', '')} [{count}]
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle (Grid vs Table) */}
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0 font-mono text-xs">
            <span className="text-[10px] uppercase tracking-wider text-ink-subtle hidden sm:inline">
              VIEW:
            </span>
            <div className="flex items-center bg-paper-200 p-0.5 rounded border border-hairline">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-all ${
                  viewMode === 'grid'
                    ? 'bg-ink text-paper shadow-sm'
                    : 'text-ink-muted hover:text-ink'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded transition-all ${
                  viewMode === 'table'
                    ? 'bg-ink text-paper shadow-sm'
                    : 'text-ink-muted hover:text-ink'
                }`}
                title="Index Table View"
              >
                <ListFilter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Display: Grid or Table */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <RecipeTable recipes={filteredRecipes} />
        )}

        {filteredRecipes.length === 0 && (
          <div className="text-center py-16 bg-paper-50 rounded border border-hairline p-8 font-mono">
            <p className="text-base text-ink font-bold">No meals match your active filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedAppliance('all');
              }}
              className="mt-3 px-4 py-2 bg-ink text-paper rounded text-xs uppercase font-bold hover:bg-accent transition-colors"
            >
              RESET ALL FILTERS
            </button>
          </div>
        )}
      </section>

      {/* ── INTERACTIVE OVEN TO AIR FRYER CALCULATOR SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 w-full">
        <AirFryerCalculator />
      </section>

      {/* ── QUICK AIR FRYER TEMPERATURE MATRIX CHEAT SHEET ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10 w-full">
        <div className="bg-paper-100 border border-hairline rounded-lg p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-hairline pb-4 mb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
                INSTANT REFERENCE
              </span>
              <h3 className="font-serif text-2xl font-bold text-ink uppercase mt-0.5">
                DAD AIR FRYER QUICK TEMPERATURE MATRIX
              </h3>
            </div>
            <Link
              href="/cheat-sheet"
              className="px-3 py-1.5 bg-ink text-paper rounded text-xs font-mono font-bold uppercase hover:bg-accent transition-colors shrink-0"
            >
              VIEW FULL CHEAT SHEET →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 font-mono text-center">
            {[
              { item: 'CHICKEN TENDERS', temp: '400°F', time: '10 MIN', flip: 'Flip @ 5m' },
              { item: 'BEEF BURGERS', temp: '375°F', time: '10 MIN', flip: 'Flip @ 6m' },
              { item: 'SALMON FILLETS', temp: '400°F', time: '9 MIN', flip: 'Skin down' },
              { item: 'PORK CHOPS', temp: '380°F', time: '12 MIN', flip: 'Flip @ 6m' },
              { item: 'FROZEN FRIES', temp: '400°F', time: '14 MIN', flip: 'Shake @ 5m' },
              { item: 'BUFFALO WINGS', temp: '380°/400°', time: '20 MIN', flip: 'Shake @ 8m' },
            ].map((m) => (
              <div
                key={m.item}
                className="bg-paper-50 p-3 rounded border border-hairline flex flex-col justify-between"
              >
                <span className="text-[10px] font-bold text-ink-subtle uppercase truncate">
                  {m.item}
                </span>
                <div className="my-1.5">
                  <span className="text-base font-black text-ink block">{m.temp}</span>
                  <span className="text-xs font-bold text-accent">{m.time}</span>
                </div>
                <span className="text-[9px] text-ink-muted bg-paper-200 px-1 py-0.5 rounded">
                  {m.flip}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE ZERO-FLUFF MANIFESTO STRIP ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 w-full border-t border-hairline">
        <div className="bg-ink text-paper rounded-lg p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle architectural background line */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[repeating-linear-gradient(45deg,#fff,#fff_1px,transparent_1px,transparent_12px)] pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold block mb-2">
              WHY DAD MEALS EXISTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight uppercase leading-tight">
              NO ESSAYS ABOUT GRANDMOTHER’S CABIN. NO 5-PAGE ADS.
            </h2>
            <p className="font-sans text-sm sm:text-base text-paper/80 mt-4 leading-relaxed">
              When you have hungry kids asking what’s for dinner at 6:15 PM, you do not need 2,000 words
              on the cultural significance of chicken tenders. You need to know the temperature, the
              time, and when to flip the basket. That’s it.
            </p>

            <div className="mt-6 flex items-center gap-4 flex-wrap">
              <Link
                href="/about"
                className="px-4 py-2 bg-paper text-ink rounded font-mono text-xs uppercase font-bold hover:bg-accent hover:text-white transition-colors"
              >
                READ THE MANIFESTO
              </Link>
              <Link
                href="/llms.txt"
                target="_blank"
                className="font-mono text-xs uppercase tracking-wider text-paper/70 hover:text-white underline underline-offset-4"
              >
                VIEW MACHINE-READABLE LLMS.TXT →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
