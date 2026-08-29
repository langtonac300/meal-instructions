'use client';

import React, { useState } from 'react';
import { MACRO_PROTEIN_SOURCES, MacroProteinSource } from '@/data/tools-data';
import { Dumbbell, Scale, Flame, Sparkles, PieChart } from 'lucide-react';

export default function MacroTargetMeatScaler() {
  const [selectedSourceId, setSelectedSourceId] = useState<string>(MACRO_PROTEIN_SOURCES[0].id);
  const [targetProteinGrams, setTargetProteinGrams] = useState<number>(45);

  const activeSource =
    MACRO_PROTEIN_SOURCES.find((s) => s.id === selectedSourceId) ||
    MACRO_PROTEIN_SOURCES[0];

  // Mathematical Calculations:
  // Raw weight required to hit target protein:
  // (targetProtein / rawProteinPer100g) * 100g
  const rawWeightGrams = Math.round((targetProteinGrams / (activeSource.rawProteinPer100g / 100)));
  const rawWeightOz = Math.round((rawWeightGrams / 28.3495) * 10) / 10;

  // Cooked weight after shrinkage:
  const shrinkageMultiplier = (100 - activeSource.shrinkageWeightLossPct) / 100;
  const cookedWeightGrams = Math.round(rawWeightGrams * shrinkageMultiplier);
  const cookedWeightOz = Math.round((cookedWeightGrams / 28.3495) * 10) / 10;

  // Total macros for this raw portion:
  const factor = rawWeightGrams / 100;
  const totalFatGrams = Math.round(activeSource.rawFatPer100g * factor * 10) / 10;
  const totalCarbsGrams = Math.round(activeSource.rawCarbsPer100g * factor * 10) / 10;
  const totalCalories = Math.round(activeSource.rawCaloriesPer100g * factor);

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Source Archetype Selector */}
      <div className="space-y-2">
        <div className="micro-label text-ink-muted">1. CHOOSE PROTEIN SOURCE:</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {MACRO_PROTEIN_SOURCES.map((source) => {
            const isSelected = source.id === selectedSourceId;
            return (
              <button
                key={source.id}
                onClick={() => setSelectedSourceId(source.id)}
                className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[85px] ${
                  isSelected
                    ? 'bg-paper-card border-2 border-ink shadow-subtle'
                    : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
                }`}
              >
                <span className={`font-bold font-sans text-xs ${isSelected ? 'text-ink' : ''}`}>
                  {source.name}
                </span>
                <span className="text-[10px] text-accent font-bold mt-2">
                  {source.rawProteinPer100g}g P / 100g raw
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Target Configurator */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        {/* Target Protein Slider */}
        <div className="bg-paper hairline-border p-4 space-y-2 font-mono text-xs">
          <div className="flex justify-between items-center">
            <label className="font-bold text-ink uppercase flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4 text-accent" />
              TARGET PROTEIN GOAL FOR MEAL:
            </label>
            <span className="text-2xl font-bold text-accent">{targetProteinGrams}g PROTEIN</span>
          </div>
          <input
            type="range"
            min="20"
            max="90"
            step="5"
            value={targetProteinGrams}
            onChange={(e) => setTargetProteinGrams(Number(e.target.value))}
            className="w-full accent-accent cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-ink-subtle">
            <span>20g (Light Snack)</span>
            <span>45g (Standard Lifter Meal)</span>
            <span>90g (Mega Portion)</span>
          </div>
        </div>

        {/* 3. Scaled Butcher vs Plate Weights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Raw Butcher Scale Weight */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono border-2 border-ink">
            <div className="micro-label text-accent font-bold flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-accent" />
              RAW SCALE WEIGHT (BUTCHER)
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              {rawWeightOz} OZ
            </div>
            <div className="text-[11px] text-ink-muted pt-1">
              {rawWeightGrams} grams on kitchen scale
            </div>
          </div>

          {/* Cooked Plate Weight */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted">COOKED YIELD (PLATE)</div>
            <div className="text-3xl sm:text-4xl font-bold text-accent">
              {cookedWeightOz} OZ
            </div>
            <div className="text-[11px] text-ink-subtle pt-1">
              {cookedWeightGrams}g (after -{activeSource.shrinkageWeightLossPct}% water/fat loss)
            </div>
          </div>

          {/* Calorie Total */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted">CALORIE DENSITY</div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              {totalCalories} KCAL
            </div>
            <div className="text-[11px] text-ink-subtle pt-1">
              P: {targetProteinGrams}g | F: {totalFatGrams}g | C: {totalCarbsGrams}g
            </div>
          </div>

        </div>

        {/* 4. Macro Ratio Bar & Prep Notes */}
        <div className="space-y-3 pt-2 font-mono text-xs">
          
          {/* Macro Visual Bar */}
          <div className="bg-paper hairline-border p-4 space-y-2">
            <div className="flex justify-between items-center text-ink-muted">
              <span>PROTEIN: {targetProteinGrams}g ({Math.round((targetProteinGrams * 4 * 100) / totalCalories)}%)</span>
              <span>FAT: {totalFatGrams}g ({Math.round((totalFatGrams * 9 * 100) / totalCalories)}%)</span>
              <span>CARBS: {totalCarbsGrams}g</span>
            </div>
            <div className="h-2 w-full bg-neutral-200 flex overflow-hidden">
              <div
                style={{ width: `${Math.min(100, Math.round((targetProteinGrams * 4 * 100) / totalCalories))}%` }}
                className="bg-accent"
                title="Protein"
              />
              <div
                style={{ width: `${Math.min(100, Math.round((totalFatGrams * 9 * 100) / totalCalories))}%` }}
                className="bg-neutral-800"
                title="Fat"
              />
            </div>
          </div>

          {/* Chef Prep Note */}
          <div className="bg-paper hairline-border p-4 border-l-4 border-l-ink text-xs font-mono">
            <span className="font-bold uppercase text-ink">PORTIONING DIRECTIVE: </span>
            <span className="text-ink-muted font-sans">{activeSource.optimalPortionNote}</span>
          </div>

        </div>

      </div>
    </div>
  );
}
