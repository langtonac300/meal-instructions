'use client';

import React, { useState } from 'react';
import { SOUS_VIDE_SPECS, SousVideSpec } from '@/data/tools-data';
import { Thermometer, Clock, ShieldCheck, Flame, Layers } from 'lucide-react';

export default function SousVideCalculator() {
  const [selectedFoodId, setSelectedFoodId] = useState<string>(SOUS_VIDE_SPECS[0].id);
  const [thicknessInches, setThicknessInches] = useState<number>(1.5);
  const [targetDoneness, setTargetDoneness] = useState<'rare' | 'med-rare' | 'medium' | 'well'>('med-rare');

  const activeSpec =
    SOUS_VIDE_SPECS.find((s) => s.id === selectedFoodId) || SOUS_VIDE_SPECS[0];

  // Water bath temperature based on doneness
  let bathTempF = activeSpec.medRareTempF;
  if (targetDoneness === 'rare' && activeSpec.rareTempF) bathTempF = activeSpec.rareTempF;
  else if (targetDoneness === 'medium') bathTempF = activeSpec.mediumTempF;
  else if (targetDoneness === 'well' && activeSpec.wellTempF) bathTempF = activeSpec.wellTempF;

  // Time Calculation (Thermal conduction scales quadratically with thickness):
  // Baldwin table baseline: 1.0 inch = ~60 mins, 1.5 inch = ~90 mins, 2.0 inch = ~140 mins
  const thicknessScale = Math.pow(thicknessInches / 1.0, 1.4);
  const minBathMinutes = Math.round(activeSpec.minTimeMinutes * thicknessScale);
  const minHours = Math.floor(minBathMinutes / 60);
  const minRemainingMins = minBathMinutes % 60;

  const maxHours = Math.round((activeSpec.maxTimeMinutes / 60) * 10) / 10;

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Protein Archetype Selector */}
      <div className="space-y-2">
        <div className="micro-label text-ink-muted">1. CHOOSE FOOD / PROTEIN CUT:</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {SOUS_VIDE_SPECS.map((spec) => {
            const isSelected = spec.id === selectedFoodId;
            return (
              <button
                key={spec.id}
                onClick={() => setSelectedFoodId(spec.id)}
                className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[75px] ${
                  isSelected
                    ? 'bg-paper-card border-2 border-ink shadow-subtle'
                    : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
                }`}
              >
                <span className={`font-bold font-sans text-xs ${isSelected ? 'text-ink' : ''}`}>
                  {spec.name}
                </span>
                <span className="text-[10px] text-accent font-bold mt-2">
                  {spec.medRareTempF}°F Standard
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Doneness & Thickness Inputs */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        {/* Doneness Selector */}
        <div className="space-y-2">
          <div className="micro-label text-ink-muted">2. DESIRED DONENESS PROFILE:</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
            {[
              { id: 'rare', label: 'Rare / Silken', available: !!activeSpec.rareTempF },
              { id: 'med-rare', label: 'Medium-Rare (Chef Choice)', available: true },
              { id: 'medium', label: 'Medium (Firm)', available: true },
              { id: 'well', label: 'Well-Done', available: !!activeSpec.wellTempF },
            ].map((d) => (
              <button
                key={d.id}
                disabled={!d.available}
                onClick={() => setTargetDoneness(d.id as any)}
                className={`p-3 text-center font-bold uppercase transition-colors cursor-pointer ${
                  !d.available
                    ? 'opacity-30 cursor-not-allowed bg-paper'
                    : targetDoneness === d.id
                    ? 'bg-ink text-paper'
                    : 'bg-paper hairline-border text-ink-muted hover:text-ink'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Thickness Slider */}
        <div className="bg-paper hairline-border p-4 space-y-2 font-mono text-xs">
          <div className="flex justify-between items-center">
            <label className="font-bold text-ink uppercase">THICKNESS AT THICKEST POINT:</label>
            <span className="text-base font-bold text-accent">{thicknessInches.toFixed(2)} INCHES</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.25"
            value={thicknessInches}
            onChange={(e) => setThicknessInches(Number(e.target.value))}
            className="w-full accent-accent cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-ink-subtle">
            <span>0.5" (Thin Cutlet)</span>
            <span>1.5" (Standard Butcher Cut)</span>
            <span>3.0" (Thick Roast)</span>
          </div>
        </div>

        {/* 3. Output Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Water Bath Temp */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono border-2 border-ink">
            <div className="micro-label text-accent font-bold flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-accent" />
              WATER BATH TEMP
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              {bathTempF}°F
            </div>
            <div className="text-[11px] text-ink-muted pt-1">
              ({Math.round(((bathTempF - 32) * 5) / 9)}°C) Precision Immersion
            </div>
          </div>

          {/* Minimum Pasteurization Time */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" />
              MINIMUM BATH TIME
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              {minHours > 0 ? `${minHours}h ${minRemainingMins}m` : `${minRemainingMins}m`}
            </div>
            <div className="text-[11px] text-accent font-bold pt-1">
              Baldwin thermal core equilibrium
            </div>
          </div>

          {/* Maximum Hold Window */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted">MAX HOLD LIMIT</div>
            <div className="text-3xl sm:text-4xl font-bold text-accent">
              {maxHours} HRS
            </div>
            <div className="text-[11px] text-ink-subtle pt-1">
              Before meat enzymes break down texture
            </div>
          </div>

        </div>

        {/* 4. Sear & Food Safety Directives */}
        <div className="space-y-3 pt-2 font-mono text-xs">
          <div className="bg-paper hairline-border p-4 border-l-4 border-l-ink space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-ink uppercase">
              <Flame className="w-4 h-4 text-accent" />
              <span>POST-BATH SEAR PROTOCOL:</span>
            </div>
            <p className="text-ink-muted font-sans text-xs leading-relaxed">
              {activeSpec.searMethod}
            </p>
          </div>

          <div className="bg-paper hairline-border p-3 text-[11px] text-ink-subtle">
            <strong>Thermal Science:</strong> {activeSpec.scienceDetail}
          </div>
        </div>

      </div>
    </div>
  );
}
