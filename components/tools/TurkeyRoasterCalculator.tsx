'use client';

import React, { useState } from 'react';
import { TURKEY_METHODS, TurkeyMethodSpec } from '@/data/tools-data';
import { Flame, Clock, Thermometer, ShieldCheck, Scale, AlertTriangle } from 'lucide-react';

export default function TurkeyRoasterCalculator() {
  const [weightLbs, setWeightLbs] = useState<number>(14);
  const [selectedMethodId, setSelectedMethodId] = useState<string>(TURKEY_METHODS[0].id);

  const activeMethod =
    TURKEY_METHODS.find((m) => m.id === selectedMethodId) || TURKEY_METHODS[0];

  // Mathematical Calculations:
  // Thaw Time:
  // Fridge: 24 hrs per 4 lbs (approx 6 hrs per lb)
  const fridgeThawDays = Math.round((weightLbs / 4) * 10) / 10;
  // Cold water bath: 30 mins per lb
  const coldWaterHours = Math.round(((weightLbs * 30) / 60) * 10) / 10;

  // Dry Brine Math (1.0% salt by weight):
  // 1 lb = 453.6g
  const totalGrams = weightLbs * 453.592;
  const dryBrineSaltGrams = Math.round((totalGrams * 0.01) * 10) / 10;
  // Diamond Crystal: 2.8g/tsp, Morton: 4.8g/tsp
  const diamondCrystalTbsp = Math.round((dryBrineSaltGrams / (2.8 * 3)) * 10) / 10;
  const mortonTbsp = Math.round((dryBrineSaltGrams / (4.8 * 3)) * 10) / 10;

  // Total Cooking Minutes:
  const totalCookMinutes = Math.round(weightLbs * activeMethod.minsPerPound);
  const cookHours = Math.floor(totalCookMinutes / 60);
  const cookRemainingMinutes = totalCookMinutes % 60;

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Method Selector */}
      <div className="space-y-2">
        <div className="micro-label text-ink-muted">1. CHOOSE ROASTING TECHNIQUE:</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {TURKEY_METHODS.map((method) => {
            const isSelected = method.id === activeMethod.id;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethodId(method.id)}
                className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[85px] ${
                  isSelected
                    ? 'bg-paper-card border-2 border-ink shadow-subtle'
                    : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
                }`}
              >
                <div>
                  <span className={`font-bold font-sans text-xs sm:text-sm line-clamp-2 ${isSelected ? 'text-ink' : ''}`}>
                    {method.name.split('—')[0]}
                  </span>
                </div>
                <span className="text-[10px] text-accent font-bold mt-2">
                  {method.ovenTempF}°F @ ~{method.minsPerPound} min/lb
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Weight Configurator */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        <div className="bg-paper hairline-border p-4 space-y-2 font-mono text-xs">
          <div className="flex justify-between items-center">
            <label className="font-bold text-ink uppercase">TURKEY WEIGHT (LBS):</label>
            <span className="text-xl font-bold text-accent">{weightLbs} LBS ({Math.round(totalGrams)}g)</span>
          </div>
          <input
            type="range"
            min="6"
            max="26"
            step="1"
            value={weightLbs}
            onChange={(e) => setWeightLbs(Number(e.target.value))}
            className="w-full accent-accent cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-ink-subtle">
            <span>6 lbs (Breast / Small)</span>
            <span>14 lbs (Standard Family)</span>
            <span>20 lbs (Big Gathering)</span>
            <span>26 lbs (Max Feast)</span>
          </div>
        </div>

        {/* 3. High Impact Key Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Estimated Cook Time */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono border-2 border-ink">
            <div className="micro-label text-accent font-bold flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" />
              ROASTING TIME ({activeMethod.ovenTempF}°F)
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              {cookHours > 0 ? `${cookHours}h ${cookRemainingMinutes}m` : `${cookRemainingMinutes} mins`}
            </div>
            <div className="text-[11px] text-ink-muted pt-1">
              ~{activeMethod.minsPerPound} mins/lb @ {activeMethod.ovenTempF}°F
            </div>
          </div>

          {/* Thermometer Pull Target */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-accent" />
              PULL TEMPERATURES
            </div>
            <div className="text-3xl font-bold text-ink">
              {activeMethod.targetBreastPullTempF}°F Breast
            </div>
            <div className="text-[11px] text-accent font-bold pt-1">
              {activeMethod.targetThighPullTempF}°F Dark Meat Thigh
            </div>
          </div>

          {/* Mandatory Rest Time */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted">CARVE REST TIME</div>
            <div className="text-3xl sm:text-4xl font-bold text-accent">
              {activeMethod.restMinutes} MINS
            </div>
            <div className="text-[11px] text-ink-subtle pt-1">
              Tent loosely with foil on cutting board
            </div>
          </div>
        </div>

        {/* 4. Thaw Schedule & Dry Brine Math Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono text-xs">
          {/* Defrost Protocols */}
          <div className="bg-paper hairline-border p-4 space-y-3">
            <div className="micro-label text-ink font-bold">THAWING TIMELINE (USDA SAFE)</div>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-hairline pb-1.5">
                <span className="text-ink-muted">Refrigerator (38°F):</span>
                <span className="font-bold text-ink">{fridgeThawDays} FULL DAYS</span>
              </div>
              <div className="flex justify-between border-b border-hairline pb-1.5">
                <span className="text-ink-muted">Cold Water Bath (Rapid):</span>
                <span className="font-bold text-ink">{coldWaterHours} HOURS</span>
              </div>
              <p className="text-[10px] text-ink-subtle font-sans leading-relaxed">
                If using cold water bath, submerge bird in leakproof bag and swap water every 30 minutes.
              </p>
            </div>
          </div>

          {/* Dry Brine Salting Math */}
          <div className="bg-paper hairline-border p-4 space-y-3">
            <div className="micro-label text-ink font-bold">1.0% EQUILIBRIUM DRY-BRINE</div>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-hairline pb-1.5">
                <span className="text-ink-muted">Scale Weight:</span>
                <span className="font-bold text-ink">{dryBrineSaltGrams}g Total Salt</span>
              </div>
              <div className="flex justify-between border-b border-hairline pb-1.5">
                <span className="text-ink-muted">Diamond Crystal Kosher:</span>
                <span className="font-bold text-accent">{diamondCrystalTbsp} Tbsp</span>
              </div>
              <div className="flex justify-between border-b border-hairline pb-1.5">
                <span className="text-ink-muted">Morton Kosher Salt:</span>
                <span className="font-bold text-ink">{mortonTbsp} Tbsp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pro Tip */}
        <div className="bg-paper hairline-border p-4 border-l-4 border-l-accent font-mono text-xs space-y-1">
          <div className="font-bold text-accent uppercase">CHEF PRO-TIP:</div>
          <p className="text-ink-muted font-sans text-xs leading-relaxed">
            {activeMethod.proTip}
          </p>
        </div>
      </div>
    </div>
  );
}
