'use client';

import React, { useState } from 'react';
import { GROUND_BEEF_FAT_SPECS, GroundBeefFatSpec } from '@/data/tools-data';
import { Flame, Scale, Droplets, PieChart, Sparkles } from 'lucide-react';

export default function GroundBeefFatMatrix() {
  const [selectedBlendId, setSelectedBlendId] = useState<string>(GROUND_BEEF_FAT_SPECS[1].id); // 80/20 Chuck
  const [rawWeightLbs, setRawWeightLbs] = useState<number>(1.0);
  const [isDrained, setIsDrained] = useState<boolean>(true);

  const activeSpec =
    GROUND_BEEF_FAT_SPECS.find((s) => s.id === selectedBlendId) ||
    GROUND_BEEF_FAT_SPECS[1];

  // Mathematical Calculations:
  const rawWeightOz = rawWeightLbs * 16;
  const rawWeightGrams = Math.round(rawWeightLbs * 453.592);

  // Cooked yield
  const cookedWeightOz = Math.round((rawWeightOz * (activeSpec.cookedYieldWeightPct / 100)) * 10) / 10;
  const cookedWeightGrams = Math.round(rawWeightGrams * (activeSpec.cookedYieldWeightPct / 100));

  // Rendered fat
  const renderedFatOz = Math.round(rawWeightLbs * activeSpec.fatRenderedOzPerLbRaw * 10) / 10;
  const renderedFatGrams = Math.round(renderedFatOz * 28.3495);

  // Macros (per total batch based on 4oz servings)
  const numberOf4ozServings = cookedWeightOz / 4;
  const caloriesPerBatch = Math.round(
    numberOf4ozServings *
      (isDrained
        ? activeSpec.drainedCaloriesPer4ozCooked
        : activeSpec.undrainedCaloriesPer4ozCooked)
  );
  const fatGramsPerBatch = Math.round(
    numberOf4ozServings *
      (isDrained
        ? activeSpec.drainedFatGramsPer4ozCooked
        : activeSpec.undrainedFatGramsPer4ozCooked)
  );
  const proteinGramsPerBatch = Math.round(
    numberOf4ozServings * activeSpec.drainedProteinGramsPer4ozCooked
  );

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Beef Blend Archetype Selector */}
      <div className="space-y-2">
        <div className="micro-label text-ink-muted">1. CHOOSE GROUND BEEF BLEND:</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {GROUND_BEEF_FAT_SPECS.map((blend) => {
            const isSelected = blend.id === selectedBlendId;
            return (
              <button
                key={blend.id}
                onClick={() => setSelectedBlendId(blend.id)}
                className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[85px] ${
                  isSelected
                    ? 'bg-paper-card border-2 border-ink shadow-subtle'
                    : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
                }`}
              >
                <span className={`font-bold font-sans text-xs ${isSelected ? 'text-ink' : ''}`}>
                  {blend.label}
                </span>
                <span className="text-[10px] text-accent font-bold mt-2">
                  ~{blend.cookedYieldWeightPct}% Cooked Yield
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Weight & Drain Status Controls */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          {/* Raw Weight Slider */}
          <div className="bg-paper hairline-border p-4 space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-ink uppercase">RAW STARTING WEIGHT:</label>
              <span className="text-xl font-bold text-accent">{rawWeightLbs} LBS ({rawWeightOz} OZ)</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.5"
              value={rawWeightLbs}
              onChange={(e) => setRawWeightLbs(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-ink-subtle">
              <span>0.5 lb</span>
              <span>1.0 lb (Standard Pack)</span>
              <span>5.0 lbs (Costco Bulk Chub)</span>
            </div>
          </div>

          {/* Drained Toggle */}
          <div className="bg-paper hairline-border p-4 space-y-2">
            <label className="font-bold text-ink uppercase">SKILLET GREASE DRAIN STATUS:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsDrained(true)}
                className={`py-2 text-center font-bold uppercase transition-colors cursor-pointer ${
                  isDrained
                    ? 'bg-ink text-paper'
                    : 'bg-paper hairline-border text-ink-muted hover:text-ink'
                }`}
              >
                Drained (Tacos / Chili)
              </button>
              <button
                onClick={() => setIsDrained(false)}
                className={`py-2 text-center font-bold uppercase transition-colors cursor-pointer ${
                  !isDrained
                    ? 'bg-ink text-paper'
                    : 'bg-paper hairline-border text-ink-muted hover:text-ink'
                }`}
              >
                Undrained (Burgers)
              </button>
            </div>
          </div>
        </div>

        {/* 3. Output Calculations */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Cooked Weight */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono border-2 border-ink">
            <div className="micro-label text-accent font-bold flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-accent" />
              COOKED PLATE WEIGHT
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              {cookedWeightOz} OZ
            </div>
            <div className="text-[11px] text-ink-muted pt-1">
              {cookedWeightGrams}g yield ({activeSpec.cookedYieldWeightPct}% of raw)
            </div>
          </div>

          {/* Rendered Fat */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-accent" />
              RENDERED LIQUID FAT
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-accent">
              {renderedFatOz} OZ
            </div>
            <div className="text-[11px] text-ink-subtle pt-1">
              ~{renderedFatGrams}g liquid grease left in pan
            </div>
          </div>

          {/* Total Calories */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted">TOTAL BATCH NUTRITION</div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              {caloriesPerBatch} KCAL
            </div>
            <div className="text-[11px] text-ink-subtle pt-1">
              {proteinGramsPerBatch}g Protein | {fatGramsPerBatch}g Fat
            </div>
          </div>

        </div>

        {/* 4. Best Culinary Use */}
        <div className="bg-paper hairline-border p-4 border-l-4 border-l-ink text-xs font-mono">
          <span className="font-bold uppercase text-ink">BEST CULINARY APPLICATION: </span>
          <span className="text-ink-muted font-sans">{activeSpec.bestUse}</span>
        </div>

      </div>
    </div>
  );
}
