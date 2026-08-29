'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Zap, Clock, Flame, CheckCircle2, Search, ArrowUpRight, 
  LayoutGrid, List, SlidersHorizontal, ChevronRight, Sparkles 
} from 'lucide-react';
import { RECIPES } from '@/data/recipes';
import { CATEGORIES } from '@/data/categories';
import { APPLIANCES } from '@/data/appliances';
import { Recipe, Category, Appliance } from '@/lib/types';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeAppliance, setActiveAppliance] = useState<string>('all');
  const [activeProtein, setActiveProtein] = useState<string>('all');
  const [maxTime, setMaxTime] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 24;

  // Filter recipes dynamically
  const filteredRecipes = useMemo(() => {
    return RECIPES.filter((recipe) => {
      // Category filter
      if (activeCategory !== 'all' && !recipe.categories.includes(activeCategory as Category)) {
        return false;
      }
      // Appliance filter
      if (activeAppliance !== 'all' && recipe.appliance !== activeAppliance) {
        return false;
      }
      // Protein filter
      if (activeProtein !== 'all' && recipe.protein !== activeProtein) {
        return false;
      }
      // Time filter
      if (maxTime > 0 && recipe.totalMinutes > maxTime) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          recipe.title.toLowerCase().includes(q) ||
          recipe.tagline.toLowerCase().includes(q) ||
          recipe.appliance.toLowerCase().includes(q) ||
          recipe.protein.toLowerCase().includes(q) ||
          recipe.keywords.some((k) => k.toLowerCase().includes(q)) ||
          recipe.ingredients.some((i) => i.item.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [activeCategory, activeAppliance, activeProtein, maxTime, searchQuery]);

  // Pagination slice
  const paginatedRecipes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecipes.slice(start, start + itemsPerPage);
  }, [filteredRecipes, currentPage]);

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Hero Statement (Kellerstöckl Architectural Manifesto Style) */}
      <section className="space-y-6 pt-4 sm:pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 hairline-b pb-4">
          <div className="micro-label text-ink-muted">
            INDEX ARCHIVE // EDITION 2026.1
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px] text-ink-subtle">
            <span>TOTAL RECIPES: {RECIPES.length}</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">100% FLUFF-FREE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink uppercase leading-none font-sans">
              Direct Cooking.<br />
              <span className="text-ink-muted font-normal">Zero Childhood Stories.</span>
            </h1>
            <p className="text-base sm:text-lg text-ink-muted max-w-2xl font-sans leading-relaxed">
              Every recipe opens with a telegram-style 20-word execution mode. Exact temperatures, single-pan workflows, and family portion multipliers engineered for busy parents.
            </p>
          </div>

          <div className="lg:col-span-4 bg-paper-card p-6 hairline-border space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center hairline-b pb-2">
              <span className="text-ink-subtle uppercase">DATABASE STATS</span>
              <span className="font-bold text-ink">LIVE INDEX</span>
            </div>
            <div className="space-y-2 text-ink">
              <div className="flex justify-between">
                <span className="text-ink-muted">Air Fryer Speed Meals:</span>
                <span className="font-bold">300+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">15-Min Skillet Staples:</span>
                <span className="font-bold">200+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Sheet Pan Zero-Dishes:</span>
                <span className="font-bold">150+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Kid Approved Rating:</span>
                <span className="font-bold text-emerald-700">98.4%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Search & Live Filter Bar */}
      <section className="bg-paper-card hairline-border p-4 sm:p-6 space-y-6">
        
        {/* Search Input Row */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-subtle" />
          <input
            type="text"
            placeholder="Search 1,050 recipes by ingredient, meal name, or keyword (e.g. wings, salmon, smash burger, 10 min)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleFilterChange();
            }}
            className="w-full pl-11 pr-4 py-3 bg-paper hairline-border text-ink font-mono text-sm focus:outline-none focus:border-ink placeholder-ink-subtle transition-colors"
          />
        </div>

        {/* Categories Pills */}
        <div className="space-y-2">
          <div className="micro-label">Filter by Category</div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveCategory('all');
                handleFilterChange();
              }}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors hairline-border ${
                activeCategory === 'all'
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-paper text-ink-muted hover:text-ink hover:border-ink'
              }`}
            >
              All ({RECIPES.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = RECIPES.filter((r) => r.categories.includes(cat.slug)).length;
              return (
                <button
                  key={cat.slug}
                  onClick={() => {
                    setActiveCategory(cat.slug);
                    handleFilterChange();
                  }}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors hairline-border ${
                    activeCategory === cat.slug
                      ? 'bg-ink text-paper border-ink font-bold'
                      : 'bg-paper text-ink-muted hover:text-ink hover:border-ink'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filters: Appliance, Protein, Max Time & View Switcher */}
        <div className="hairline-t pt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          
          <div className="flex flex-wrap items-center gap-4">
            {/* Appliance Select */}
            <div className="flex items-center gap-2">
              <span className="text-ink-subtle uppercase">Appliance:</span>
              <select
                value={activeAppliance}
                onChange={(e) => {
                  setActiveAppliance(e.target.value);
                  handleFilterChange();
                }}
                className="bg-paper hairline-border px-2.5 py-1 text-ink focus:outline-none uppercase font-mono cursor-pointer"
              >
                <option value="all">ALL APPLIANCES</option>
                {APPLIANCES.map((a) => (
                  <option key={a.slug} value={a.slug}>
                    {a.name.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Protein Select */}
            <div className="flex items-center gap-2">
              <span className="text-ink-subtle uppercase">Protein:</span>
              <select
                value={activeProtein}
                onChange={(e) => {
                  setActiveProtein(e.target.value);
                  handleFilterChange();
                }}
                className="bg-paper hairline-border px-2.5 py-1 text-ink focus:outline-none uppercase font-mono cursor-pointer"
              >
                <option value="all">ALL PROTEINS</option>
                <option value="chicken">CHICKEN</option>
                <option value="beef">BEEF</option>
                <option value="pork">PORK</option>
                <option value="seafood">SEAFOOD</option>
                <option value="turkey">TURKEY</option>
                <option value="dairy-eggs">EGGS & CHEESE</option>
                <option value="vegetarian">VEGETARIAN</option>
              </select>
            </div>

            {/* Time Filter Buttons */}
            <div className="flex items-center gap-1.5">
              <span className="text-ink-subtle uppercase">Max Time:</span>
              {[0, 15, 30].map((mins) => (
                <button
                  key={mins}
                  onClick={() => {
                    setMaxTime(mins);
                    handleFilterChange();
                  }}
                  className={`px-2 py-0.5 text-[11px] hairline-border ${
                    maxTime === mins ? 'bg-ink text-paper font-bold' : 'bg-paper text-ink-muted'
                  }`}
                >
                  {mins === 0 ? 'ANY' : `≤${mins}M`}
                </button>
              ))}
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-paper hairline-border p-0.5">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 flex items-center gap-1.5 text-[11px] uppercase transition-colors ${
                viewMode === 'table' ? 'bg-ink text-paper font-bold' : 'text-ink-muted hover:text-ink'
              }`}
              title="Index Table View"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Index List</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 flex items-center gap-1.5 text-[11px] uppercase transition-colors ${
                viewMode === 'grid' ? 'bg-ink text-paper font-bold' : 'text-ink-muted hover:text-ink'
              }`}
              title="Visual Card Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Grid View</span>
            </button>
          </div>

        </div>

      </section>

      {/* Result Count and Active Filters Bar */}
      <div className="flex justify-between items-center text-xs font-mono text-ink-muted hairline-b pb-3">
        <div>
          SHOWING <span className="font-bold text-ink">{filteredRecipes.length}</span> MATCHING RECIPES (PAGE {currentPage} OF {totalPages || 1})
        </div>
        {(activeCategory !== 'all' || activeAppliance !== 'all' || activeProtein !== 'all' || maxTime > 0 || searchQuery) && (
          <button
            onClick={() => {
              setActiveCategory('all');
              setActiveAppliance('all');
              setActiveProtein('all');
              setMaxTime(0);
              setSearchQuery('');
              setCurrentPage(1);
            }}
            className="text-accent hover:underline uppercase"
          >
            Reset All Filters ✕
          </button>
        )}
      </div>

      {/* VIEW MODE 1: Swiss Architectural Table View (High Density) */}
      {viewMode === 'table' && (
        <section className="bg-paper-card hairline-border overflow-x-auto shadow-subtle">
          <table className="w-full text-left font-mono text-xs divide-y divide-hairline">
            <thead className="bg-paper uppercase text-[10px] tracking-wider text-ink-subtle">
              <tr>
                <th className="py-3 px-4 w-16">ID</th>
                <th className="py-3 px-4">Recipe Title & Description</th>
                <th className="py-3 px-4 w-32 hidden md:table-cell">Appliance</th>
                <th className="py-3 px-4 w-28 hidden sm:table-cell">Total Time</th>
                <th className="py-3 px-4 w-28 hidden lg:table-cell">Protein</th>
                <th className="py-3 px-4 w-28 hidden xl:table-cell">Calories</th>
                <th className="py-3 px-4 w-24 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {paginatedRecipes.map((recipe) => (
                <tr
                  key={recipe.id}
                  className="hover:bg-paper-subtle/50 transition-colors group cursor-pointer"
                >
                  <td className="py-3.5 px-4 font-bold text-ink-subtle">
                    #{recipe.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <Link
                      href={`/recipes/${recipe.slug}`}
                      className="block group-hover:text-accent transition-colors"
                    >
                      <div className="font-bold text-sm text-ink font-sans">
                        {recipe.title}
                      </div>
                      <div className="text-xs text-ink-muted font-sans line-clamp-1 mt-0.5">
                        {recipe.tagline}
                      </div>
                    </Link>
                  </td>
                  <td className="py-3.5 px-4 hidden md:table-cell uppercase text-ink-muted">
                    <span className="px-2 py-0.5 bg-paper hairline-border inline-block">
                      {recipe.appliance}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 hidden sm:table-cell font-bold text-ink">
                    {recipe.totalMinutes} MINS
                  </td>
                  <td className="py-3.5 px-4 hidden lg:table-cell uppercase text-ink-muted">
                    {recipe.protein}
                  </td>
                  <td className="py-3.5 px-4 hidden xl:table-cell text-ink-muted">
                    {recipe.nutrition.calories} kcal
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/recipes/${recipe.slug}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-paper hairline-border group-hover:bg-ink group-hover:text-paper uppercase transition-colors"
                    >
                      <span>COOK</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* VIEW MODE 2: Visual Card Grid */}
      {viewMode === 'grid' && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.slug}`}
              className="bg-paper-card hairline-border p-6 flex flex-col justify-between hover:border-ink hover:shadow-card transition-all group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[11px] font-mono text-ink-subtle">
                  <span className="font-bold">#{recipe.id}</span>
                  <span className="uppercase px-2 py-0.5 bg-paper hairline-border">
                    {recipe.appliance}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-ink font-sans group-hover:text-accent transition-colors leading-snug">
                  {recipe.title}
                </h3>

                <p className="text-xs text-ink-muted font-sans leading-relaxed line-clamp-2">
                  {recipe.tagline}
                </p>

                {/* Telegram 20-word quick preview */}
                <div className="bg-paper p-3 hairline-border text-[11px] font-mono text-ink-muted space-y-1">
                  <div className="text-ink font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 text-accent">
                    <Zap className="w-3 h-3" /> GET TO THE POINT:
                  </div>
                  <p className="line-clamp-2 text-ink leading-tight">
                    {recipe.quickVersion.bullets[0]}
                  </p>
                </div>
              </div>

              <div className="hairline-t mt-4 pt-3 flex justify-between items-center text-xs font-mono text-ink-muted">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-ink-subtle" />
                  {recipe.totalMinutes} MINS
                </span>
                <span className="text-ink font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  VIEW RECIPE →
                </span>
              </div>
            </Link>
          ))}
        </section>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 font-mono text-xs pt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 bg-paper-card hairline-border disabled:opacity-30 hover:border-ink uppercase"
          >
            ← Previous
          </button>
          <span className="px-4 py-2 bg-paper hairline-border font-bold">
            PAGE {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-2 bg-paper-card hairline-border disabled:opacity-30 hover:border-ink uppercase"
          >
            Next →
          </button>
        </div>
      )}

      {/* Homepage Fast Air Fryer Temperature Cheatsheet */}
      <section className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 hairline-b pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink font-sans">
              Air Fryer Temperature & Shake Matrix
            </h2>
            <p className="text-xs text-ink-muted font-sans">
              Quick reference for the most common family proteins and frozen foods.
            </p>
          </div>
          <Link
            href="/cheat-sheet"
            className="text-xs font-mono uppercase tracking-wider text-ink border-b border-ink hover:opacity-60"
          >
            Full Printable Cheatsheet →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          {APPLIANCES[0].tempGuide.slice(0, 9).map((guide, idx) => (
            <div key={idx} className="bg-paper p-4 hairline-border space-y-1.5">
              <div className="font-bold text-ink text-sm font-sans">{guide.food}</div>
              <div className="flex justify-between text-ink-muted">
                <span>Temp: <strong className="text-ink">{guide.temp}</strong></span>
                <span>Time: <strong className="text-ink">{guide.time}</strong></span>
              </div>
              <div className="text-[11px] text-accent font-bold">
                ↻ {guide.shake}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
