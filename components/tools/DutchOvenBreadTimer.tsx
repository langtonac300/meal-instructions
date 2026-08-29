'use client';

import React, { useState } from 'react';
import { DUTCH_OVEN_BREAD_SPECS, DutchOvenBreadSpec } from '@/data/tools-data';
import { Flame, Clock, Thermometer, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export default function DutchOvenBreadTimer() {
  const [selectedLoafId, setSelectedLoafId] = useState<string>(DUTCH_OVEN_BREAD_SPECS[0].id);
  const [flourWeightGrams, setFlourWeightGrams] = useState<number>(500);

  const activeSpec =
    DUTCH_OVEN_BREAD_SPECS.find((s) => s.id === selectedLoafId) ||
    DUTCH_OVEN_BREAD_SPECS[0];

  // Mathematical Scaling based on flour weight
  const scale = flourWeightGrams / activeSpec.flourWeightGrams;
  const waterGrams = Math.round(flourWeightGrams * (activeSpec.waterHydrationPct / 100));
  const saltGrams = Math.round(flourWeightGrams * 0.02 * 10) / 10; // 2% salt standard
  const totalLoafGrams = flourWeightGrams + waterGrams + Math.round(saltGrams);

  const lidOnMins = Math.round(activeSpec.lidOnSteamMins * Math.pow(scale, 0.4));
  const lidOffMins = Math.round(activeSpec.lidOffBrowningMins * Math.pow(scale, 0.4));
  const totalBakeMins = lidOnMins + lidOffMins;

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Loaf Style Selector */}
      <div className="space-y-2">
        <div className="micro-label text-ink-muted">1. CHOOSE BREAD &amp; CRUST STYLE:</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {DUTCH_OVEN_BREAD_SPECS.map((spec) => {
            const isSelected = spec.id === selectedLoafId;
            return (
              <button
                key={spec.id}
                onClick={() => {
                  setSelectedLoafId(spec.id);
                  setFlourWeightGrams(spec.flourWeightGrams);
                }}
                className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[85px] ${
                  isSelected
                    ? 'bg-paper-card border-2 border-ink shadow-subtle'
                    : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
                }`}
              >
                <span className={`font-bold font-sans text-xs sm:text-sm ${isSelected ? 'text-ink' : ''}`}>
                  {spec.name.split('(')[0]}
                </span>
                <span className="text-[10px] text-accent font-bold mt-2">
                  {spec.waterHydrationPct}% Hydration @ {spec.preheatTempF}°F
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Flour Configurator */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        <div className="bg-paper hairline-border p-4 space-y-2 font-mono text-xs">
          <div className="flex justify-between items-center">
            <label className="font-bold text-ink uppercase">FLOUR BASE WEIGHT:</label>
            <span className="text-xl font-bold text-accent">{flourWeightGrams}g FLOUR</span>
          </div>
          <input
            type="range"
            min="300"
            max="800"
            step="50"
            value={flourWeightGrams}
            onChange={(e) => setFlourWeightGrams(Number(e.target.value))}
            className="w-full accent-accent cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-ink-subtle">
            <span>300g (Small Boule)</span>
            <span>500g (Standard Dutch Oven Loaf)</span>
            <span>800g (Extra Large Boule)</span>
          </div>
        </div>

        {/* 3. The 3-Phase Dutch Oven Roadmap */}
        <div className="space-y-3 pt-2 font-mono">
          <div className="micro-label text-accent font-bold">
            BAKING PHASES // PREHEAT, STEAM, CRUST &amp; COOLING
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Phase 0: Preheat */}
            <div className="bg-paper hairline-border p-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="micro-label text-ink-muted">0. PREHEAT</span>
                <span className="text-[10px] bg-paper-subtle px-1 py-0.5 hairline-border">{activeSpec.preheatTempF}°F</span>
              </div>
              <div className="text-2xl font-bold text-ink">
                {activeSpec.preheatDurationMins} MINS
              </div>
              <p className="text-[11px] text-ink-muted font-sans leading-snug">
                Preheat Dutch oven + lid INSIDE oven to absorb maximum thermal energy.
              </p>
            </div>

            {/* Phase 1: Lid On */}
            <div className="bg-paper hairline-border p-4 space-y-1 border-2 border-ink">
              <div className="flex items-center justify-between">
                <span className="micro-label text-accent font-bold">1. LID ON</span>
                <span className="text-[10px] bg-ink text-paper px-1.5 py-0.5 font-bold">STEAM</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-ink">
                {lidOnMins} MINS
              </div>
              <p className="text-[11px] text-ink-muted font-sans leading-snug">
                Traps steam. Allows dough expansion (oven spring) before crust hardens.
              </p>
            </div>

            {/* Phase 2: Lid Off */}
            <div className="bg-paper hairline-border p-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="micro-label text-ink-muted">2. LID OFF</span>
                <span className="text-[10px] bg-paper-subtle px-1 py-0.5 hairline-border">CRISP</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-ink">
                {lidOffMins} MINS
              </div>
              <p className="text-[11px] text-ink-muted font-sans leading-snug">
                Maillard reaction develops dark mahogany blistered crust.
              </p>
            </div>

            {/* Phase 3: Wire Rack Rest */}
            <div className="bg-paper hairline-border p-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="micro-label text-ink-muted">3. WIRE RACK</span>
                <span className="text-[10px] bg-paper-subtle px-1 py-0.5 hairline-border">COOL</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-accent">
                {activeSpec.coolingRestMins} MINS
              </div>
              <p className="text-[11px] text-ink-muted font-sans leading-snug">
                Do NOT slice early or steam turns crumb into dense gummy paste.
              </p>
            </div>

          </div>
        </div>

        {/* 4. Internal Temp & Formula Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono text-xs">
          <div className="bg-paper hairline-border p-4 space-y-2 border-l-4 border-l-ink">
            <div className="flex items-center justify-between">
              <span className="font-bold text-ink uppercase">INTERNAL DONENESS PROBE:</span>
              <span className="text-accent font-bold text-base">{activeSpec.internalTargetTempF}°F</span>
            </div>
            <p className="text-ink-muted font-sans text-xs leading-relaxed">
              Insert instant-read probe into bottom center of loaf. Starch gelatinization is 100% complete at 205°F–210°F.
            </p>
          </div>

          <div className="bg-paper hairline-border p-4 space-y-2 border-l-4 border-l-accent">
            <div className="micro-label text-accent font-bold">BATCH FORMULATION</div>
            <div className="text-ink text-[11px] space-y-1">
              <div>• Flour: <strong>{flourWeightGrams}g</strong></div>
              <div>• Water: <strong>{waterGrams}g</strong> ({activeSpec.waterHydrationPct}% Hydration)</div>
              <div>• Salt: <strong>{saltGrams}g</strong> (2%)</div>
            </div>
          </div>
        </div>

        {/* Chef Technique Tip */}
        <div className="bg-paper hairline-border p-3 text-[11px] text-ink-subtle font-mono">
          <strong>Crust Engineering:</strong> {activeSpec.techniqueTip}
        </div>

      </div>
    </div>
  );
}
