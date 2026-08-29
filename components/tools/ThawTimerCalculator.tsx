'use client';

import React, { useState } from 'react';
import { THAW_SPECS, ThawSpec } from '@/data/tools-data';
import { Snowflake, Clock, AlertTriangle, ShieldCheck, Waves, Zap } from 'lucide-react';

export default function ThawTimerCalculator() {
  const [selectedCutId, setSelectedCutId] = useState<string>(THAW_SPECS[0].id);
  const [weightLbs, setWeightLbs] = useState<number>(2.0);

  const activeSpec =
    THAW_SPECS.find((s) => s.id === selectedCutId) || THAW_SPECS[0];

  // Mathematical Calculations:
  // Fridge: approx 24 hrs per 4-5 lbs
  const fridgeHours = Math.round(weightLbs * (activeSpec.fridgeThawHours / activeSpec.weightLbs));
  const fridgeDays = Math.floor(fridgeHours / 24);
  const fridgeRemainingHours = fridgeHours % 24;

  // Cold Water Bath: approx 30-35 mins per lb
  const coldWaterMins = Math.round(weightLbs * (activeSpec.coldWaterThawMinutes / activeSpec.weightLbs));
  const coldWaterHours = Math.floor(coldWaterMins / 60);
  const coldWaterRemainingMins = coldWaterMins % 60;
  const coldWaterCycleSwaps = Math.max(1, Math.ceil(coldWaterMins / 30));

  // Microwave Defrost:
  const microwaveMins = Math.round(weightLbs * (activeSpec.microwaveDefrostMinutes / activeSpec.weightLbs));

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Cut Selector */}
      <div className="space-y-2">
        <div className="micro-label text-ink-muted">1. SELECT FROZEN MEAT CUT:</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {THAW_SPECS.map((spec) => {
            const isSelected = spec.id === selectedCutId;
            return (
              <button
                key={spec.id}
                onClick={() => {
                  setSelectedCutId(spec.id);
                  setWeightLbs(spec.weightLbs);
                }}
                className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[80px] ${
                  isSelected
                    ? 'bg-paper-card border-2 border-ink shadow-subtle'
                    : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
                }`}
              >
                <span className={`font-bold font-sans text-xs ${isSelected ? 'text-ink' : ''}`}>
                  {spec.name.split('(')[0]}
                </span>
                <span className="text-[10px] text-accent font-bold mt-2">
                  {spec.fridgeThawHours}h / {spec.weightLbs} lb fridge
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Weight Configurator */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        {/* Weight Slider */}
        <div className="bg-paper hairline-border p-4 space-y-2 font-mono text-xs">
          <div className="flex justify-between items-center">
            <label className="font-bold text-ink uppercase">FROZEN PACKAGE WEIGHT:</label>
            <span className="text-xl font-bold text-accent">{weightLbs} LBS</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="20"
            step="0.5"
            value={weightLbs}
            onChange={(e) => setWeightLbs(Number(e.target.value))}
            className="w-full accent-accent cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-ink-subtle">
            <span>0.5 lb</span>
            <span>2.0 lbs (Dinner Pack)</span>
            <span>8.0 lbs (Roast)</span>
            <span>20 lbs (Max Turkey)</span>
          </div>
        </div>

        {/* 3. The Three USDA Safe Thaw Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
          
          {/* Method 1: Refrigerator (Gold Standard) */}
          <div className="bg-paper hairline-border p-5 space-y-2 border-2 border-ink">
            <div className="flex items-center justify-between">
              <span className="micro-label text-accent font-bold">1. REFRIGERATOR (38°F)</span>
              <span className="text-[10px] bg-ink text-paper px-1.5 py-0.5 font-bold">SAFEST</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              {fridgeDays > 0 ? `${fridgeDays}d ${fridgeRemainingHours}h` : `${fridgeRemainingHours} hrs`}
            </div>
            <div className="text-xs text-ink font-bold pt-1">
              Zero Danger Zone Exposure
            </div>
            <p className="text-[11px] text-ink-muted font-sans pt-1 leading-snug">
              Place on bottom shelf inside rimmed tray to catch condensation.
            </p>
          </div>

          {/* Method 2: Cold Water Bath */}
          <div className="bg-paper hairline-border p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="micro-label text-ink-muted">2. COLD WATER BATH</span>
              <span className="text-[10px] bg-paper-subtle px-1.5 py-0.5 hairline-border">RAPID</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              {coldWaterHours > 0 ? `${coldWaterHours}h ${coldWaterRemainingMins}m` : `${coldWaterRemainingMins}m`}
            </div>
            <div className="text-xs text-accent font-bold pt-1">
              {coldWaterCycleSwaps} Water Refresh Cycles (30m)
            </div>
            <p className="text-[11px] text-ink-muted font-sans pt-1 leading-snug">
              Submerge in cold tap water (&lt;40°F). Swap water every 30 mins.
            </p>
          </div>

          {/* Method 3: Microwave Defrost */}
          <div className="bg-paper hairline-border p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="micro-label text-ink-muted">3. MICROWAVE DEFROST</span>
              <span className="text-[10px] bg-paper-subtle px-1.5 py-0.5 hairline-border">EMERGENCY</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-accent">
              ~{microwaveMins} MINS
            </div>
            <div className="text-xs text-ink font-bold pt-1">
              30% Power (Defrost Cycle)
            </div>
            <p className="text-[11px] text-ink-muted font-sans pt-1 leading-snug">
              Flip meat every 2 mins. Must cook immediately after thawing.
            </p>
          </div>

        </div>

        {/* 4. Safety & Danger Zone Protocol */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono text-xs">
          <div className="bg-paper hairline-border p-4 space-y-2 border-l-4 border-l-accent">
            <div className="flex items-center gap-1.5 font-bold text-accent uppercase">
              <AlertTriangle className="w-4 h-4" />
              <span>THE 2-HOUR COUNTERTOP HAZARD:</span>
            </div>
            <p className="text-ink-muted font-sans text-xs leading-relaxed">
              {activeSpec.dangerAlert}
            </p>
          </div>

          <div className="bg-paper hairline-border p-4 space-y-2 border-l-4 border-l-ink">
            <div className="micro-label text-ink font-bold">REFREEZING SAFETY CONTRACT</div>
            <p className="text-ink-muted font-sans text-xs leading-relaxed">
              {activeSpec.refreezeSafety}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
