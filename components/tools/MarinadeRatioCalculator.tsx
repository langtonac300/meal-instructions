'use client';

import React, { useState } from 'react';
import { MARINADE_PROFILES, MarinadeProfile } from '@/data/tools-data';
import { Droplets, Clock, AlertTriangle, Scale, Sparkles } from 'lucide-react';

export default function MarinadeRatioCalculator() {
  const [selectedProteinId, setSelectedProteinId] = useState<string>(MARINADE_PROFILES[0].id);
  const [meatWeightLbs, setMeatWeightLbs] = useState<number>(2.0);
  const [ratioMode, setRatioMode] = useState<'3:1' | '2:1' | '1:1'>('3:1');

  const activeProfile =
    MARINADE_PROFILES.find((p) => p.id === selectedProteinId) || MARINADE_PROFILES[0];

  // Mathematical Calculations
  // Standard marinade formula: ~1/4 cup (4 tbsp) liquid per 1 lb of meat
  const totalTablespoons = meatWeightLbs * 4;
  
  let oilParts = 3;
  let acidParts = 1;
  if (ratioMode === '2:1') {
    oilParts = 2;
    acidParts = 1;
  } else if (ratioMode === '1:1') {
    oilParts = 1;
    acidParts = 1;
  }

  const totalParts = oilParts + acidParts;
  const oilTbsp = Math.round(((totalTablespoons * oilParts) / totalParts) * 10) / 10;
  const acidTbsp = Math.round(((totalTablespoons * acidParts) / totalParts) * 10) / 10;

  // Salt Math: ~1.2% salinity of meat weight
  // 1 lb = 453.6g -> 2 lbs = 907g -> 1.2% = 10.8g = ~2 tsp Diamond Crystal / 1.2 tsp Morton
  const totalMeatGrams = meatWeightLbs * 453.592;
  const saltGrams = Math.round((totalMeatGrams * (activeProfile.targetSalinityPct / 100)) * 10) / 10;
  const diamondTsps = Math.round((saltGrams / 2.8) * 10) / 10;

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Protein Archetype Selector */}
      <div className="space-y-2">
        <div className="micro-label text-ink-muted">1. SELECT PROTEIN / MEAT CUT:</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {MARINADE_PROFILES.map((profile) => {
            const isSelected = profile.id === selectedProteinId;
            return (
              <button
                key={profile.id}
                onClick={() => setSelectedProteinId(profile.id)}
                className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[85px] ${
                  isSelected
                    ? 'bg-paper-card border-2 border-ink shadow-subtle'
                    : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
                }`}
              >
                <span className={`font-bold font-sans text-xs sm:text-sm ${isSelected ? 'text-ink' : ''}`}>
                  {profile.protein}
                </span>
                <span className="text-[10px] text-accent font-bold mt-2">
                  Max: {profile.safeMarinateHoursMax} {profile.safeMarinateHoursMax === 1 ? 'hr' : 'hrs'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Weight & Ratio Controls */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          {/* Meat Weight Slider */}
          <div className="bg-paper hairline-border p-4 space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-ink uppercase">MEAT WEIGHT:</label>
              <span className="text-xl font-bold text-accent">{meatWeightLbs} LBS</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={meatWeightLbs}
              onChange={(e) => setMeatWeightLbs(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-ink-subtle">
              <span>0.5 lb</span>
              <span>2.0 lbs (Dinner)</span>
              <span>10 lbs (Party Pack)</span>
            </div>
          </div>

          {/* Ratio Selector */}
          <div className="bg-paper hairline-border p-4 space-y-2">
            <label className="font-bold text-ink uppercase">OIL-TO-ACID RATIO:</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: '3:1', label: '3:1 Golden' },
                { id: '2:1', label: '2:1 Bold Acid' },
                { id: '1:1', label: '1:1 High Citrus' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRatioMode(r.id as any)}
                  className={`py-2 text-center font-bold uppercase transition-colors cursor-pointer text-[11px] ${
                    ratioMode === r.id
                      ? 'bg-ink text-paper'
                      : 'bg-paper hairline-border text-ink-muted hover:text-ink'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Output Formula Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Oil & Fat */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono border-2 border-ink">
            <div className="micro-label text-accent font-bold">1. OIL / FAT BASE</div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              {oilTbsp} Tbsp
            </div>
            <div className="text-[11px] text-ink-muted pt-1">
              {activeProfile.recommendedOil}
            </div>
          </div>

          {/* Acid */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted">2. ACIDIC AGENT</div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              {acidTbsp} Tbsp
            </div>
            <div className="text-[11px] text-accent font-bold pt-1">
              {activeProfile.recommendedAcid}
            </div>
          </div>

          {/* Salt */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted">3. EXACT SALT</div>
            <div className="text-3xl sm:text-4xl font-bold text-accent">
              {diamondTsps} tsp
            </div>
            <div className="text-[11px] text-ink-subtle pt-1">
              {saltGrams}g Diamond Crystal Kosher
            </div>
          </div>

        </div>

        {/* 4. Marination Window & Enzyme Warning */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          
          {/* Safe Window */}
          <div className="bg-paper hairline-border p-4 space-y-2 border-l-4 border-l-ink">
            <div className="flex items-center gap-1.5 font-bold text-ink uppercase">
              <Clock className="w-4 h-4 text-accent" />
              <span>MARINATION TIME WINDOW:</span>
            </div>
            <div className="text-xl font-bold text-ink">
              {activeProfile.safeMarinateHoursMin} to {activeProfile.safeMarinateHoursMax} HOURS
            </div>
            <p className="text-ink-muted font-sans text-xs">
              Always marinate inside refrigerator below 40°F in sealed bag or glass vessel.
            </p>
          </div>

          {/* Enzyme Warning */}
          <div className="bg-paper hairline-border p-4 space-y-2 border-l-4 border-l-accent">
            <div className="flex items-center gap-1.5 font-bold text-accent uppercase">
              <AlertTriangle className="w-4 h-4" />
              <span>ENZYME &amp; ACID HAZARD:</span>
            </div>
            <p className="text-ink-muted font-sans text-xs leading-relaxed">
              {activeProfile.enzymeWarning}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
