'use client';

import React, { useState } from 'react';
import { INGREDIENT_SUBSTITUTIONS, IngredientSub } from '@/data/tools-data';
import { Search, Sparkles, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function IngredientSubstitutionsEngine() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Staples' },
    { id: 'dairy', label: 'Dairy & Creams' },
    { id: 'baking', label: 'Baking & Leaveners' },
    { id: 'thickener', label: 'Thickeners & Starches' },
    { id: 'asian-sauces', label: 'Sauces & Asian' },
    { id: 'pantry', label: 'Pantry Staples' },
  ];

  const filteredSubs = INGREDIENT_SUBSTITUTIONS.filter((sub) => {
    const matchesCat =
      selectedCategory === 'all' || sub.category === selectedCategory;
    const matchesSearch =
      sub.missingIngredient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.substituteSolution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.exactRatioFormula.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Header & Search Filter */}
      <div className="bg-paper-card hairline-border p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-hairline pb-4">
          <div>
            <div className="micro-label text-accent font-bold">EMERGENCY PANTRY TRIAGE</div>
            <h2 className="text-xl font-bold uppercase text-ink font-sans">
              Kitchen Ingredient Substitution Matrix
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
            placeholder="Search missing ingredient (e.g. Buttermilk, Heavy Cream, Cornstarch, Egg, Brown Sugar)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-paper hairline-border font-mono text-xs text-ink placeholder:text-ink-subtle focus:outline-none focus:border-ink"
          />
        </div>
      </div>

      {/* 2. Substitutions Specimen Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSubs.map((sub) => (
          <div
            key={sub.id}
            className="bg-paper-card hairline-border p-5 space-y-4 hover:border-ink transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="micro-label text-accent font-mono">
                  MISSING INGREDIENT
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-paper hairline-border text-ink-muted">
                  {sub.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-ink uppercase tracking-tight font-sans">
                {sub.missingIngredient}
              </h3>

              {/* Exact Solution Box */}
              <div className="bg-paper hairline-border p-3 space-y-1 border-l-4 border-l-ink">
                <div className="micro-label text-accent font-bold">EMERGENCY SUBSTITUTE</div>
                <div className="font-bold text-sm font-sans text-ink">
                  {sub.substituteSolution}
                </div>
                <div className="font-mono text-xs text-ink-muted pt-1 leading-snug">
                  {sub.exactRatioFormula}
                </div>
              </div>

              <p className="text-xs text-ink-muted font-sans leading-relaxed">
                <strong>Chemistry Effect:</strong> {sub.culinaryEffect}
              </p>
            </div>

            <div className="pt-3 border-t border-hairline font-mono text-[11px] text-ink-subtle bg-paper p-2 hairline-border leading-snug">
              <strong className="text-accent">When to Avoid:</strong> {sub.avoidWhen}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
