'use client';

import React, { useState } from 'react';
import { SMOKE_POINTS, SmokePointItem } from '@/data/tools-data';
import { Flame, ShieldAlert, Check, Filter, Search, ArrowDownUp } from 'lucide-react';

export default function SmokePointsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [minTempFilter, setMinTempFilter] = useState<number>(300);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [unit, setUnit] = useState<'F' | 'C'>('F');

  const categories = [
    { id: 'all', label: 'All Cooking Fats' },
    { id: 'high-sear', label: 'High-Sear (450°F+)' },
    { id: 'animal-fat', label: 'Animal Fats & Tallow' },
    { id: 'medium-cook', label: 'Sauté & Baking (350–425°F)' },
    { id: 'finishing', label: 'Finishing & Dressings (<375°F)' },
  ];

  const filteredOils = SMOKE_POINTS.filter((oil) => {
    const matchesCategory =
      selectedCategory === 'all' || oil.category === selectedCategory;
    const matchesTemp = oil.smokePointF >= minTempFilter;
    const matchesSearch =
      oil.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      oil.bestUses.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTemp && matchesSearch;
  }).sort((a, b) => b.smokePointF - a.smokePointF);

  return (
    <div className="space-y-8 font-sans">
      {/* Controls Bar */}
      <div className="bg-paper-card hairline-border p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-hairline pb-4">
          <div>
            <div className="micro-label text-accent font-bold">INTERACTIVE SEARING FILTER</div>
            <h2 className="text-xl font-bold uppercase text-ink font-sans">
              Cooking Fat &amp; Smoke Point Matrix
            </h2>
          </div>
          {/* Temperature Unit Toggle */}
          <div className="flex items-center bg-paper hairline-border p-1 font-mono text-xs">
            <button
              onClick={() => setUnit('F')}
              className={`px-3 py-1 uppercase font-bold transition-colors cursor-pointer ${
                unit === 'F' ? 'bg-ink text-paper' : 'text-ink-muted hover:text-ink'
              }`}
            >
              °F Fahrenheit
            </button>
            <button
              onClick={() => setUnit('C')}
              className={`px-3 py-1 uppercase font-bold transition-colors cursor-pointer ${
                unit === 'C' ? 'bg-ink text-paper' : 'text-ink-muted hover:text-ink'
              }`}
            >
              °C Celsius
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-ink text-paper font-bold'
                  : 'bg-paper hairline-border text-ink-muted hover:border-ink hover:text-ink'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Minimum Temp Slider */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="relative">
            <Search className="w-4 h-4 text-ink-subtle absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by fat (e.g. Avocado, Ghee, Duck Fat, Olive)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-paper hairline-border font-mono text-xs text-ink placeholder:text-ink-subtle focus:outline-none focus:border-ink"
            />
          </div>

          <div className="bg-paper hairline-border p-3 space-y-1 font-mono text-xs flex flex-col justify-center">
            <div className="flex justify-between items-center text-ink-muted">
              <span className="uppercase font-bold">Min Smoke Point:</span>
              <span className="text-accent font-bold text-sm">
                {unit === 'F' ? `${minTempFilter}°F` : `${Math.round(((minTempFilter - 32) * 5) / 9)}°C`}
              </span>
            </div>
            <input
              type="range"
              min="300"
              max="520"
              step="10"
              value={minTempFilter}
              onChange={(e) => setMinTempFilter(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Grid of Cooking Fats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOils.map((oil) => {
          const tempDisplay =
            unit === 'F' ? `${oil.smokePointF}°F` : `${oil.smokePointC}°C`;
          const isHighSear = oil.smokePointF >= 450;
          const isDangerLow = oil.smokePointF <= 350;

          return (
            <div
              key={oil.id}
              className="bg-paper-card hairline-border p-5 space-y-4 hover:border-ink transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="micro-label text-accent font-mono">
                      {oil.category.toUpperCase().replace('-', ' ')}
                    </span>
                    <h3 className="text-lg font-bold text-ink uppercase tracking-tight font-sans mt-0.5">
                      {oil.name}
                    </h3>
                  </div>
                  <div
                    className={`px-3 py-1.5 font-mono text-base font-bold text-center flex-shrink-0 ${
                      isHighSear
                        ? 'bg-ink text-paper'
                        : isDangerLow
                        ? 'bg-paper hairline-border border-accent text-accent'
                        : 'bg-paper hairline-border text-ink'
                    }`}
                  >
                    {tempDisplay}
                  </div>
                </div>

                <p className="text-xs text-ink-muted leading-relaxed font-sans">
                  {oil.bestUses}
                </p>

                {/* Technical Fat Ratio Bar */}
                <div className="space-y-1 font-mono text-[10px]">
                  <div className="flex justify-between text-ink-subtle">
                    <span>Mono: {oil.monounsaturatedPct}%</span>
                    <span>Poly: {oil.polyunsaturatedPct}%</span>
                    <span>Sat: {oil.saturatedPct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-200 flex overflow-hidden">
                    <div
                      style={{ width: `${oil.monounsaturatedPct}%` }}
                      className="bg-emerald-600"
                      title={`Monounsaturated ${oil.monounsaturatedPct}%`}
                    />
                    <div
                      style={{ width: `${oil.polyunsaturatedPct}%` }}
                      className="bg-amber-500"
                      title={`Polyunsaturated ${oil.polyunsaturatedPct}%`}
                    />
                    <div
                      style={{ width: `${oil.saturatedPct}%` }}
                      className="bg-neutral-800"
                      title={`Saturated ${oil.saturatedPct}%`}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Specs & Warning */}
              <div className="pt-3 border-t border-hairline space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-ink-muted">
                  <span>Cast Iron Rating:</span>
                  <span
                    className={`font-bold uppercase ${
                      oil.castIronRating === 'Ideal'
                        ? 'text-emerald-600'
                        : oil.castIronRating === 'Avoid'
                        ? 'text-accent'
                        : 'text-ink'
                    }`}
                  >
                    {oil.castIronRating}
                  </span>
                </div>
                <div className="text-[11px] text-ink-subtle bg-paper p-2 hairline-border leading-snug">
                  <strong>Acrolein / Heat Physics:</strong> {oil.acroleinWarning}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
