'use client';

import React, { useState } from 'react';
import { CHEESE_MELT_SPECS, CheeseMeltSpec } from '@/data/tools-data';
import { Flame, Search, Sparkles, Scale, AlertCircle } from 'lucide-react';

export default function CheeseMeltMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sauceCheeseWeightGrams, setSauceCheeseWeightGrams] = useState<number>(250);

  const categories = [
    { id: 'all', label: 'All Cheeses' },
    { id: 'high-melt', label: 'Silky Smooth Melters' },
    { id: 'stretch', label: 'Elastic Pizza Stretch' },
    { id: 'hard-grating', label: 'Hard Aged / Grating' },
    { id: 'non-melting', label: 'Non-Melting (Grilling / Searing)' },
  ];

  const filteredCheeses = CHEESE_MELT_SPECS.filter((cheese) => {
    const matchesCat =
      selectedCategory === 'all' || cheese.category === selectedCategory;
    const matchesSearch =
      cheese.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cheese.bestCulinaryUse.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Header & Search Filters */}
      <div className="bg-paper-card hairline-border p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-hairline pb-4">
          <div>
            <div className="micro-label text-accent font-bold">THERMAL EMULSION &amp; STRETCH INDEX</div>
            <h2 className="text-xl font-bold uppercase text-ink font-sans">
              Cheese Melting Temperature &amp; Emulsion Matrix
            </h2>
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

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-ink-subtle absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search cheese (e.g. Mozzarella, Cheddar, Gruyère, American, Halloumi, Feta)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-paper hairline-border font-mono text-xs text-ink placeholder:text-ink-subtle focus:outline-none focus:border-ink"
          />
        </div>
      </div>

      {/* 2. Sodium Citrate Modernist Sauce Ratio Tool */}
      <div className="bg-paper-card hairline-border p-6 space-y-4 font-mono text-xs border-2 border-ink">
        <div className="flex items-center justify-between">
          <div className="micro-label text-accent font-bold">
            MODERNIST CHEESE SAUCE FORMULA (SODIUM CITRATE)
          </div>
          <span className="text-[10px] bg-ink text-paper px-2 py-0.5 font-bold">SILKY NO-SPLIT SAUCE</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-ink">
              <span>CHEESE WEIGHT:</span>
              <span className="font-bold text-accent">{sauceCheeseWeightGrams}g (~{(sauceCheeseWeightGrams / 28.35).toFixed(1)} oz)</span>
            </div>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={sauceCheeseWeightGrams}
              onChange={(e) => setSauceCheeseWeightGrams(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
          </div>

          <div className="bg-paper hairline-border p-3 space-y-1">
            <div className="text-ink-muted">Calculated Emulsifier Additions:</div>
            <div className="text-ink font-bold">
              • Sodium Citrate: <span className="text-accent">{Math.round(sauceCheeseWeightGrams * 0.03 * 10) / 10}g</span> (3% by weight)
            </div>
            <div className="text-ink font-bold">
              • Water / Beer / Milk: <span className="text-ink">{Math.round(sauceCheeseWeightGrams * 0.85)}g</span> (85% liquid ratio)
            </div>
          </div>
        </div>
      </div>

      {/* 3. Cheese Specimen Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCheeses.map((cheese) => {
          const isNonMelting = cheese.category === 'non-melting';
          return (
            <div
              key={cheese.id}
              className="bg-paper-card hairline-border p-5 space-y-3 hover:border-ink transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="micro-label text-accent font-mono">
                      {cheese.category.toUpperCase().replace('-', ' ')}
                    </span>
                    <h3 className="text-base font-bold text-ink uppercase tracking-tight font-sans">
                      {cheese.name}
                    </h3>
                  </div>
                  <div
                    className={`px-2.5 py-1 font-mono text-sm font-bold flex-shrink-0 ${
                      isNonMelting
                        ? 'bg-paper hairline-border text-accent border-accent'
                        : 'bg-ink text-paper'
                    }`}
                  >
                    {cheese.meltingTempF}°F
                  </div>
                </div>

                <div className="flex items-center gap-3 font-mono text-[11px] text-ink-muted">
                  <span>Moisture: <strong>{cheese.moisturePct}%</strong></span>
                  <span>•</span>
                  <span>Fat: <strong>{cheese.fatPct}%</strong></span>
                </div>

                <div className="bg-paper p-2 hairline-border font-mono text-[11px] text-ink">
                  <strong>Melt Behavior:</strong> {cheese.meltBehavior}
                </div>

                <p className="text-xs text-ink-muted font-sans leading-relaxed">
                  {cheese.bestCulinaryUse}
                </p>
              </div>

              {cheese.sodiumCitrateGramsPer100g > 0 && (
                <div className="pt-2 border-t border-hairline font-mono text-[10px] text-ink-subtle">
                  Sodium Citrate Ratio: <strong>{cheese.sodiumCitrateGramsPer100g}g / 100g</strong>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
