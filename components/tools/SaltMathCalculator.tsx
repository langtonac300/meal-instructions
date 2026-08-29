'use client';

import React, { useState } from 'react';
import { SALT_BRANDS, BRINE_USE_PROFILES, SaltBrand, BrineUseProfile } from '@/data/tools-data';
import { Scale, Clock, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function SaltMathCalculator() {
  const [meatWeightLbs, setMeatWeightLbs] = useState<number>(2.0);
  const [selectedBrandId, setSelectedBrandId] = useState<string>(SALT_BRANDS[0].id);
  const [selectedProfileId, setSelectedProfileId] = useState<string>(BRINE_USE_PROFILES[0].id);

  const activeBrand = SALT_BRANDS.find((b) => b.id === selectedBrandId) || SALT_BRANDS[0];
  const activeProfile = BRINE_USE_PROFILES.find((p) => p.id === selectedProfileId) || BRINE_USE_PROFILES[0];

  // Calculation Math:
  // 1 lb = 453.592 grams
  const totalMeatGrams = meatWeightLbs * 453.592;
  const saltWeightGrams = Math.round((totalMeatGrams * (activeProfile.targetSaltPercent / 100)) * 10) / 10;
  
  // Teaspoon conversion based on brand density (gramsPerTeaspoon)
  const totalTeaspoons = Math.round((saltWeightGrams / activeBrand.gramsPerTeaspoon) * 10) / 10;
  
  // Format fraction/spoon representation
  const formatSpoons = (tsps: number) => {
    if (tsps >= 3) {
      const tbsp = Math.floor(tsps / 3);
      const remTsp = Math.round((tsps % 3) * 10) / 10;
      return remTsp > 0 ? `${tbsp} tbsp + ${remTsp} tsp` : `${tbsp} tbsp`;
    }
    return `${tsps} tsp`;
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Salt Brand Selector */}
      <div className="space-y-2">
        <div className="micro-label text-ink-muted">1. CHOOSE YOUR EXACT SALT BRAND (CRUCIAL FOR VOLUME):</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {SALT_BRANDS.map((brand) => {
            const isSelected = brand.id === activeBrand.id;
            return (
              <button
                key={brand.id}
                onClick={() => setSelectedBrandId(brand.id)}
                className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[88px] ${
                  isSelected
                    ? 'bg-paper-card border-2 border-ink shadow-subtle'
                    : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
                }`}
              >
                <div>
                  <span className={`font-bold font-sans text-xs sm:text-sm line-clamp-1 ${isSelected ? 'text-ink' : ''}`}>
                    {brand.name}
                  </span>
                  <div className="text-[10px] text-ink-muted mt-1">{brand.crystalType}</div>
                </div>
                <span className="text-[10px] tracking-widest text-accent font-bold mt-2">
                  {brand.gramsPerTeaspoon}g / tsp
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Application & Weight Configurator */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        {/* Application Selector */}
        <div className="space-y-2">
          <div className="micro-label text-ink-muted">2. SELECT CUT & BRINING STYLE:</div>
          <div className="flex flex-wrap gap-2">
            {BRINE_USE_PROFILES.map((prof) => (
              <button
                key={prof.id}
                onClick={() => setSelectedProfileId(prof.id)}
                className={`px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedProfileId === prof.id
                    ? 'bg-ink text-paper font-bold'
                    : 'bg-paper hairline-border text-ink-muted hover:border-ink hover:text-ink'
                }`}
              >
                {prof.name} ({prof.targetSaltPercent}%)
              </button>
            ))}
          </div>
        </div>

        {/* Meat Weight Slider */}
        <div className="bg-paper hairline-border p-4 space-y-2 font-mono text-xs">
          <div className="flex justify-between items-center">
            <label className="font-bold text-ink uppercase">MEAT WEIGHT (LBS):</label>
            <span className="text-base font-bold text-accent">{meatWeightLbs} LBS ({Math.round(totalMeatGrams)}g)</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0.5"
              max="15"
              step="0.25"
              value={meatWeightLbs}
              onChange={(e) => setMeatWeightLbs(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-[10px] text-ink-subtle">
            <span>0.5 lb (Single Chop)</span>
            <span>2.0 lbs (Family Steak)</span>
            <span>5.0 lbs (Roast)</span>
            <span>15 lbs (Whole Bird)</span>
          </div>
        </div>

        {/* Output Calculation Result */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono border-2 border-ink bg-paper-100">
            <div className="micro-label text-accent font-bold flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-accent" />
              VOLUME MEASUREMENT
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
              {formatSpoons(totalTeaspoons)}
            </div>
            <div className="text-[11px] text-ink-muted pt-1">
              Calibrated for {activeBrand.name.split(' ')[0]} density
            </div>
          </div>

          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted">EXACT GRAM WEIGHT (SCALE)</div>
            <div className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
              {saltWeightGrams}g
            </div>
            <div className="text-[11px] text-ink-subtle pt-1">
              {activeProfile.targetSaltPercent}% of {Math.round(totalMeatGrams)}g meat
            </div>
          </div>

          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" />
              REFRIGERATOR REST
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-accent tracking-tight">
              {activeProfile.recommendedHoursMin > 0
                ? `${activeProfile.recommendedHoursMin}–${activeProfile.recommendedHoursMax} HRS`
                : 'INSTANT AT SEAR'}
            </div>
            <div className="text-[11px] text-ink-subtle pt-1">
              Uncovered on wire rack
            </div>
          </div>
        </div>

        {/* The Density Hazard Warning */}
        <div className="bg-paper hairline-border p-4 flex items-start gap-3 border-l-4 border-l-accent font-mono text-xs">
          <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-accent uppercase">THE KOSHER SALT DENSITY TRAP:</span>
            <p className="text-ink-muted font-sans text-xs leading-relaxed">
              1 tsp of <strong>Morton Kosher Salt ({SALT_BRANDS[1].gramsPerTeaspoon}g)</strong> has nearly <strong>double</strong> the salinity of 1 tsp of <strong>Diamond Crystal ({SALT_BRANDS[0].gramsPerTeaspoon}g)</strong>. Never substitute kosher salt brands 1:1 by volume without weighing or adjusting spoons.
            </p>
          </div>
        </div>

        {/* Technique Instructions */}
        <div className="bg-paper hairline-border p-5 space-y-2 border-l-4 border-l-ink">
          <div className="micro-label text-accent font-bold">DRY-BRINE PROTOCOL</div>
          <p className="text-xs sm:text-sm font-mono text-ink leading-relaxed">
            {activeProfile.technique}
          </p>
        </div>

      </div>
    </div>
  );
}
