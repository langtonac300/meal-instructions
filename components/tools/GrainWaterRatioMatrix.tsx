'use client';

import React, { useState } from 'react';
import { GRAIN_WATER_SPECS, GrainWaterSpec } from '@/data/tools-data';
import { Droplets, Clock, Zap, Scale, Sparkles, AlertCircle } from 'lucide-react';

export default function GrainWaterRatioMatrix() {
  const [selectedGrainId, setSelectedGrainId] = useState<string>(GRAIN_WATER_SPECS[0].id);
  const [dryCups, setDryCups] = useState<number>(1.0);
  const [appliance, setAppliance] = useState<'stovetop' | 'instant-pot'>('stovetop');

  const activeGrain =
    GRAIN_WATER_SPECS.find((g) => g.id === selectedGrainId) || GRAIN_WATER_SPECS[0];

  // Mathematical Calculations
  const liquidRatio =
    appliance === 'stovetop'
      ? activeGrain.volumeLiquidToGrainRatio
      : activeGrain.instantPotLiquidRatio;

  const totalLiquidCups = Math.round(dryCups * liquidRatio * 100) / 100;
  const totalSaltTsps = Math.round(dryCups * activeGrain.saltPerDryCupTsp * 10) / 10;
  
  // Format fractions nicely (e.g. 1.25 -> 1 1/4 cups)
  const formatCups = (cups: number) => {
    const whole = Math.floor(cups);
    const remainder = Math.round((cups - whole) * 100) / 100;
    if (remainder === 0.25) return whole > 0 ? `${whole} ¼ cups` : '¼ cup';
    if (remainder === 0.33 || remainder === 0.34) return whole > 0 ? `${whole} ⅓ cups` : '⅓ cup';
    if (remainder === 0.5) return whole > 0 ? `${whole} ½ cups` : '½ cup';
    if (remainder === 0.66 || remainder === 0.67) return whole > 0 ? `${whole} ⅔ cups` : '⅔ cup';
    if (remainder === 0.75) return whole > 0 ? `${whole} ¾ cups` : '¾ cup';
    return `${cups} cups`;
  };

  const cookTimeMinutes =
    appliance === 'stovetop'
      ? activeGrain.stovetopSimmerMinutes
      : activeGrain.instantPotMinutes;

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Grain Selector */}
      <div className="space-y-2">
        <div className="micro-label text-ink-muted">1. SELECT RICE, GRAIN, OR PASTA:</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {GRAIN_WATER_SPECS.map((grain) => {
            const isSelected = grain.id === selectedGrainId;
            return (
              <button
                key={grain.id}
                onClick={() => setSelectedGrainId(grain.id)}
                className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[75px] ${
                  isSelected
                    ? 'bg-paper-card border-2 border-ink shadow-subtle'
                    : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
                }`}
              >
                <span className={`font-bold font-sans text-xs sm:text-sm ${isSelected ? 'text-ink' : ''}`}>
                  {grain.name}
                </span>
                <span className="text-[10px] text-accent font-bold mt-2">
                  1:{grain.volumeLiquidToGrainRatio} Stovetop Ratio
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Configurator */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        {/* Quantity and Appliance Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          {/* Dry Amount Slider */}
          <div className="bg-paper hairline-border p-4 space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-ink uppercase">DRY GRAIN AMOUNT:</label>
              <span className="text-xl font-bold text-accent">{dryCups} CUPS</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="4.0"
              step="0.25"
              value={dryCups}
              onChange={(e) => setDryCups(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-ink-subtle">
              <span>0.5 cup (1 serving)</span>
              <span>1 cup (Standard family)</span>
              <span>4 cups (Meal Prep)</span>
            </div>
          </div>

          {/* Cooking Appliance */}
          <div className="bg-paper hairline-border p-4 space-y-2">
            <label className="font-bold text-ink uppercase">COOKING HARDWARE:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setAppliance('stovetop')}
                className={`py-2 text-center font-bold uppercase transition-colors cursor-pointer ${
                  appliance === 'stovetop'
                    ? 'bg-ink text-paper'
                    : 'bg-paper hairline-border text-ink-muted hover:text-ink'
                }`}
              >
                Stovetop Pot
              </button>
              <button
                onClick={() => setAppliance('instant-pot')}
                className={`py-2 text-center font-bold uppercase transition-colors cursor-pointer ${
                  appliance === 'instant-pot'
                    ? 'bg-ink text-paper'
                    : 'bg-paper hairline-border text-ink-muted hover:text-ink'
                }`}
              >
                Instant Pot / Pressure
              </button>
            </div>
          </div>
        </div>

        {/* 3. Output Calculations */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Liquid Output */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono border-2 border-ink">
            <div className="micro-label text-accent font-bold flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-accent" />
              WATER / BROTH NEEDED
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              {formatCups(totalLiquidCups)}
            </div>
            <div className="text-[11px] text-ink-muted pt-1">
              {Math.round(totalLiquidCups * 240)} ml (Ratio 1:{liquidRatio})
            </div>
          </div>

          {/* Active Simmer / Cook Time */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" />
              {appliance === 'instant-pot' ? 'HIGH PRESSURE TIME' : 'LOW SIMMER TIME'}
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              {cookTimeMinutes} MINS
            </div>
            <div className="text-[11px] text-accent font-bold pt-1">
              {appliance === 'instant-pot' ? activeGrain.instantPotRelease : 'Covered tight with lid'}
            </div>
          </div>

          {/* Mandatory Steam Rest */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted">MANDATORY REST</div>
            <div className="text-3xl sm:text-4xl font-bold text-accent">
              {activeGrain.mandatoryRestMinutes} MINS
            </div>
            <div className="text-[11px] text-ink-subtle pt-1">
              Off heat, lid remains ON
            </div>
          </div>

        </div>

        {/* 4. Salt and Rinse Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono text-xs">
          <div className="bg-paper hairline-border p-4 space-y-2 border-l-4 border-l-ink">
            <div className="micro-label text-ink font-bold">RINSING &amp; PREPARATION PROTOCOL</div>
            <p className="text-ink-muted font-sans text-xs leading-relaxed">
              {activeGrain.washInstruction}
            </p>
          </div>

          <div className="bg-paper hairline-border p-4 space-y-2 border-l-4 border-l-accent">
            <div className="micro-label text-accent font-bold">RECOMMENDED SALTING</div>
            <div className="flex justify-between items-center text-ink">
              <span>Fine Salt for {dryCups} cups:</span>
              <span className="font-bold">{totalSaltTsps} tsp</span>
            </div>
            <p className="text-[10px] text-ink-subtle font-sans">
              Add salt to cold liquid before bringing to a boil for even absorption.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
