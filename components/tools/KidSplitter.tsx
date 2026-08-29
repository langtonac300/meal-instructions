'use client';

import React, { useState } from 'react';
import { KID_SPLIT_STRATEGIES, KidSplitStrategy } from '@/data/tools-data';
import { Sparkles, Utensils, Heart, ArrowRight, CheckCircle2, Split } from 'lucide-react';

export default function KidSplitter() {
  const [selectedMealId, setSelectedMealId] = useState<string>(KID_SPLIT_STRATEGIES[0].id);

  const activeStrategy = KID_SPLIT_STRATEGIES.find((s) => s.id === selectedMealId) || KID_SPLIT_STRATEGIES[0];

  return (
    <div className="space-y-8 font-sans">
      
      {/* Meal Selection Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {KID_SPLIT_STRATEGIES.map((strategy) => {
          const isSelected = strategy.id === activeStrategy.id;
          return (
            <button
              key={strategy.id}
              onClick={() => setSelectedMealId(strategy.id)}
              className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[80px] ${
                isSelected
                  ? 'bg-paper-card border-2 border-ink shadow-subtle'
                  : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
              }`}
            >
              <span className={`font-bold font-sans text-xs sm:text-sm line-clamp-2 ${isSelected ? 'text-ink' : ''}`}>
                {strategy.mealName}
              </span>
              <span className="text-[10px] tracking-widest text-accent font-bold mt-2 uppercase flex items-center gap-1">
                <Split className="w-3 h-3" />
                SPLIT BLUEPRINT
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Deconstruction Spec */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hairline-b pb-4">
          <div>
            <div className="micro-label text-accent">THE ANTI-DOUBLE-COOKING ENGINE // 1 MEAL, 2 PLATES</div>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink mt-1">
              {activeStrategy.mealName}
            </h2>
          </div>
          <div className="px-3 py-1.5 bg-paper hairline-border text-accent font-mono text-xs font-bold border-l-4 border-l-accent">
            NO SEPARATE MEALS REQUIRED
          </div>
        </div>

        {/* Adult vs Child Flavor Contrast */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-paper hairline-border p-4 space-y-2">
            <div className="text-[11px] font-bold text-ink uppercase tracking-wider">
              🌶️ ADULT DESIRED PROFILE
            </div>
            <p className="text-ink-muted font-sans text-xs sm:text-sm leading-relaxed">
              {activeStrategy.adultFlavorProfile}
            </p>
          </div>

          <div className="bg-paper hairline-border p-4 space-y-2 border-l-4 border-l-accent">
            <div className="text-[11px] font-bold text-accent uppercase tracking-wider">
              👶 TODDLER / KID SENSITIVITY
            </div>
            <p className="text-ink-muted font-sans text-xs sm:text-sm leading-relaxed">
              Needs separated textures, unmixed sauces, zero spicy heat, and familiar finger-food geometry.
            </p>
          </div>
        </div>

        {/* The 60-Second Intercept Step */}
        <div className="bg-paper hairline-border p-5 space-y-2 border-l-4 border-l-ink">
          <div className="micro-label text-accent font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
            THE 60-SECOND PULL-ASIDE STEP
          </div>
          <p className="text-sm sm:text-base font-mono text-ink leading-relaxed">
            {activeStrategy.deconstructStep}
          </p>
        </div>

        {/* The Deconstructed Bento Plate Layout */}
        <div className="bg-paper hairline-border p-5 space-y-3 font-mono text-xs">
          <div className="text-[11px] font-bold text-ink uppercase tracking-wider">
            KID COMPARTMENT TRAY LAYOUT (SERVED UNMIXED):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {activeStrategy.kidBentoLayout.map((comp, idx) => (
              <div key={comp} className="bg-paper-card hairline-border p-3 space-y-1">
                <div className="text-[10px] text-accent font-bold">SECTION {idx + 1}</div>
                <div className="font-bold text-ink font-sans text-xs sm:text-sm">{comp}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dip Translation Matrix */}
        <div className="bg-paper hairline-border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="space-y-1">
            <span className="font-bold text-ink uppercase">DIP & SAUCE TRANSLATION:</span>
            <p className="text-ink-muted">{activeStrategy.dipConversion}</p>
          </div>
          <span className="text-[11px] text-accent font-bold flex-shrink-0">Dipping &gt; Mixed Sauces</span>
        </div>

      </div>
    </div>
  );
}
