'use client';

import React, { useState } from 'react';
import { BAKERS_PRESETS, BakersPreset } from '@/data/tools-data';
import { Scale, PieChart, Sparkles, Layers, Sliders } from 'lucide-react';

export default function BakersPercentageCalculator() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(BAKERS_PRESETS[0].id);
  const [flourGrams, setFlourGrams] = useState<number>(500);
  const [hydrationPct, setHydrationPct] = useState<number>(BAKERS_PRESETS[0].hydrationPct);
  const [saltPct, setSaltPct] = useState<number>(BAKERS_PRESETS[0].saltPct);
  const [yeastPct, setYeastPct] = useState<number>(BAKERS_PRESETS[0].yeastPct);
  const [oilPct, setOilPct] = useState<number>(BAKERS_PRESETS[0].oilPct);
  const [sugarPct, setSugarPct] = useState<number>(BAKERS_PRESETS[0].sugarPct);
  const [numberOfBalls, setNumberOfBalls] = useState<number>(2);

  const applyPreset = (preset: BakersPreset) => {
    setSelectedPresetId(preset.id);
    setHydrationPct(preset.hydrationPct);
    setSaltPct(preset.saltPct);
    setYeastPct(preset.yeastPct);
    setOilPct(preset.oilPct);
    setSugarPct(preset.sugarPct);
  };

  // Calculations (Baker's percentages are always relative to 100% flour weight)
  const waterGrams = Math.round((flourGrams * (hydrationPct / 100)) * 10) / 10;
  const saltGrams = Math.round((flourGrams * (saltPct / 100)) * 10) / 10;
  const yeastGrams = Math.round((flourGrams * (yeastPct / 100)) * 10) / 10;
  const oilGrams = Math.round((flourGrams * (oilPct / 100)) * 10) / 10;
  const sugarGrams = Math.round((flourGrams * (sugarPct / 100)) * 10) / 10;

  const totalDoughGrams = Math.round(flourGrams + waterGrams + saltGrams + yeastGrams + oilGrams + sugarGrams);
  const singleBallGrams = Math.round(totalDoughGrams / numberOfBalls);

  const activePreset = BAKERS_PRESETS.find((p) => p.id === selectedPresetId);

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Preset Blueprints */}
      <div className="space-y-2">
        <div className="micro-label text-ink-muted">1. CHOOSE DOUGH ARCHETYPE (OR CUSTOMIZE BELOW):</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {BAKERS_PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[85px] ${
                  isSelected
                    ? 'bg-paper-card border-2 border-ink shadow-subtle'
                    : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
                }`}
              >
                <div>
                  <span className={`font-bold font-sans text-xs line-clamp-1 ${isSelected ? 'text-ink' : ''}`}>
                    {preset.name.split('(')[0]}
                  </span>
                </div>
                <span className="text-[10px] text-accent font-bold mt-2">
                  {preset.hydrationPct}% Hydration
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Calculator Main Panel */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        {/* Base Flour Input & Ball Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-paper hairline-border p-4 space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center">
              <label className="font-bold text-ink uppercase">BASE FLOUR WEIGHT (100%):</label>
              <span className="text-xl font-bold text-accent">{flourGrams}g</span>
            </div>
            <input
              type="range"
              min="200"
              max="2500"
              step="50"
              value={flourGrams}
              onChange={(e) => setFlourGrams(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-ink-subtle">
              <span>200g (1 Pizza)</span>
              <span>500g (1 Loaf)</span>
              <span>1000g (Party Batch)</span>
            </div>
          </div>

          <div className="bg-paper hairline-border p-4 space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center">
              <label className="font-bold text-ink uppercase">DIVIDE INTO BALLS / LOAVES:</label>
              <span className="text-xl font-bold text-ink">{numberOfBalls} PORTIONS</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              step="1"
              value={numberOfBalls}
              onChange={(e) => setNumberOfBalls(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-ink-subtle">
              <span>1 Big Boule</span>
              <span>4 Pizza Doughs</span>
              <span>12 Dinner Rolls</span>
            </div>
          </div>
        </div>

        {/* Sliders for percentages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
          {/* Hydration */}
          <div className="bg-paper hairline-border p-3 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-ink">HYDRATION:</span>
              <span className="text-accent font-bold">{hydrationPct}%</span>
            </div>
            <input
              type="range"
              min="55"
              max="90"
              step="1"
              value={hydrationPct}
              onChange={(e) => {
                setHydrationPct(Number(e.target.value));
                setSelectedPresetId('custom');
              }}
              className="w-full accent-accent cursor-pointer"
            />
          </div>

          {/* Salt */}
          <div className="bg-paper hairline-border p-3 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-ink">SALT:</span>
              <span className="text-accent font-bold">{saltPct}%</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="3.5"
              step="0.1"
              value={saltPct}
              onChange={(e) => {
                setSaltPct(Number(e.target.value));
                setSelectedPresetId('custom');
              }}
              className="w-full accent-accent cursor-pointer"
            />
          </div>

          {/* Instant Yeast */}
          <div className="bg-paper hairline-border p-3 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-ink">INSTANT YEAST:</span>
              <span className="text-accent font-bold">{yeastPct}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="3.0"
              step="0.1"
              value={yeastPct}
              onChange={(e) => {
                setYeastPct(Number(e.target.value));
                setSelectedPresetId('custom');
              }}
              className="w-full accent-accent cursor-pointer"
            />
          </div>

          {/* Olive Oil */}
          <div className="bg-paper hairline-border p-3 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-ink">OIL / FAT:</span>
              <span className="text-accent font-bold">{oilPct}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={oilPct}
              onChange={(e) => {
                setOilPct(Number(e.target.value));
                setSelectedPresetId('custom');
              }}
              className="w-full accent-accent cursor-pointer"
            />
          </div>

          {/* Sugar */}
          <div className="bg-paper hairline-border p-3 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-ink">SUGAR / HONEY:</span>
              <span className="text-accent font-bold">{sugarPct}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={sugarPct}
              onChange={(e) => {
                setSugarPct(Number(e.target.value));
                setSelectedPresetId('custom');
              }}
              className="w-full accent-accent cursor-pointer"
            />
          </div>
        </div>

        {/* 3. Output Table (Scale Grams & Oz) */}
        <div className="space-y-3 pt-2">
          <div className="micro-label text-accent font-bold">CALCULATED BATCH FORMULATION (GRAMS ON SCALE)</div>
          
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-xs border-collapse">
              <thead>
                <tr className="bg-paper hairline-border text-ink-muted text-left">
                  <th className="p-3 uppercase">Ingredient</th>
                  <th className="p-3 uppercase">Baker's %</th>
                  <th className="p-3 uppercase">Grams (Scale)</th>
                  <th className="p-3 uppercase">Ounces</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr className="bg-paper-card font-bold text-ink">
                  <td className="p-3">Bread / All-Purpose Flour</td>
                  <td className="p-3">100.0%</td>
                  <td className="p-3 text-accent text-base">{flourGrams}g</td>
                  <td className="p-3">{(flourGrams / 28.35).toFixed(1)} oz</td>
                </tr>
                <tr className="bg-paper-card">
                  <td className="p-3">Water (Lukewarm 90°F)</td>
                  <td className="p-3 font-mono">{hydrationPct}%</td>
                  <td className="p-3 font-bold text-accent text-base">{waterGrams}g</td>
                  <td className="p-3">{(waterGrams / 28.35).toFixed(1)} oz</td>
                </tr>
                <tr className="bg-paper-card">
                  <td className="p-3">Fine Sea Salt</td>
                  <td className="p-3 font-mono">{saltPct}%</td>
                  <td className="p-3 font-bold text-ink">{saltGrams}g</td>
                  <td className="p-3">{(saltGrams / 28.35).toFixed(2)} oz</td>
                </tr>
                <tr className="bg-paper-card">
                  <td className="p-3">Instant Dry Yeast</td>
                  <td className="p-3 font-mono">{yeastPct}%</td>
                  <td className="p-3 font-bold text-ink">{yeastGrams}g</td>
                  <td className="p-3">{(yeastGrams / 28.35).toFixed(2)} oz</td>
                </tr>
                {oilGrams > 0 && (
                  <tr className="bg-paper-card">
                    <td className="p-3">Olive Oil</td>
                    <td className="p-3 font-mono">{oilPct}%</td>
                    <td className="p-3 font-bold text-ink">{oilGrams}g</td>
                    <td className="p-3">{(oilGrams / 28.35).toFixed(2)} oz</td>
                  </tr>
                )}
                {sugarGrams > 0 && (
                  <tr className="bg-paper-card">
                    <td className="p-3">Sugar</td>
                    <td className="p-3 font-mono">{sugarPct}%</td>
                    <td className="p-3 font-bold text-ink">{sugarGrams}g</td>
                    <td className="p-3">{(sugarGrams / 28.35).toFixed(2)} oz</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Batch Summary Metric */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono">
          <div className="bg-paper hairline-border p-4 border-2 border-ink">
            <div className="micro-label text-ink-muted">TOTAL DOUGH YIELD</div>
            <div className="text-3xl font-bold text-ink">{totalDoughGrams}g</div>
            <div className="text-xs text-ink-muted mt-1">
              ({(totalDoughGrams / 453.6).toFixed(2)} lbs total batch)
            </div>
          </div>

          <div className="bg-paper hairline-border p-4">
            <div className="micro-label text-accent font-bold">PER PORTION WEIGHT</div>
            <div className="text-3xl font-bold text-accent">{singleBallGrams}g</div>
            <div className="text-xs text-ink-muted mt-1">
              Per ball across {numberOfBalls} portions
            </div>
          </div>
        </div>

        {activePreset && (
          <div className="bg-paper hairline-border p-4 border-l-4 border-l-ink text-xs font-mono">
            <span className="font-bold uppercase text-ink">FERMENTATION &amp; BAKE SPEC: </span>
            <span className="text-ink-muted font-sans">{activePreset.description} (Bake @ {activePreset.bakeTempF}°F)</span>
          </div>
        )}
      </div>
    </div>
  );
}
