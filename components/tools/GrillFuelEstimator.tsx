'use client';

import React, { useState } from 'react';
import { GRILL_FUEL_SPECS, GrillFuelSpec } from '@/data/tools-data';
import { Flame, Clock, Gauge, Wind, AlertCircle } from 'lucide-react';

export default function GrillFuelEstimator() {
  const [selectedHardwareId, setSelectedHardwareId] = useState<string>(GRILL_FUEL_SPECS[0].id);
  const [cookDurationHours, setCookDurationHours] = useState<number>(6);

  const activeSpec =
    GRILL_FUEL_SPECS.find((s) => s.id === selectedHardwareId) || GRILL_FUEL_SPECS[0];

  // Mathematical Calculations:
  const totalFuelLbs = Math.round(activeSpec.burnRatePerHour * cookDurationHours * 10) / 10;
  
  // Chimneys required (approx 4.5 lbs briquettes per full Weber chimney)
  const chimneysRequired = Math.round((totalFuelLbs / 4.5) * 10) / 10;

  // Propane 20lb tank percentage (1 full tank holds 20 lbs of liquid propane)
  const propaneTankPct = Math.min(100, Math.round((totalFuelLbs / 20) * 100));

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Hardware & Cooking Style Selector */}
      <div className="space-y-2">
        <div className="micro-label text-ink-muted">1. CHOOSE GRILL &amp; TEMPERATURE PROFILE:</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {GRILL_FUEL_SPECS.map((spec) => {
            const isSelected = spec.id === selectedHardwareId;
            return (
              <button
                key={spec.id}
                onClick={() => setSelectedHardwareId(spec.id)}
                className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[85px] ${
                  isSelected
                    ? 'bg-paper-card border-2 border-ink shadow-subtle'
                    : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
                }`}
              >
                <span className={`font-bold font-sans text-xs ${isSelected ? 'text-ink' : ''}`}>
                  {spec.hardwareName}
                </span>
                <span className="text-[10px] text-accent font-bold mt-2">
                  {spec.tempCategory} (~{spec.burnRatePerHour} {spec.burnRateUnit.split(' ')[0]}/hr)
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Duration Slider & Calculator Panel */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        {/* Hours Slider */}
        <div className="bg-paper hairline-border p-4 space-y-2 font-mono text-xs">
          <div className="flex justify-between items-center">
            <label className="font-bold text-ink uppercase">COOK SESSION DURATION:</label>
            <span className="text-xl font-bold text-accent">{cookDurationHours} HOURS</span>
          </div>
          <input
            type="range"
            min="1"
            max="16"
            step="0.5"
            value={cookDurationHours}
            onChange={(e) => setCookDurationHours(Number(e.target.value))}
            className="w-full accent-accent cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-ink-subtle">
            <span>1 hr (Burgers / Steaks)</span>
            <span>4 hrs (Ribs)</span>
            <span>8 hrs (Pork Butt)</span>
            <span>14+ hrs (Brisket)</span>
          </div>
        </div>

        {/* 3. Output Requirements Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Primary Fuel Weight */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono border-2 border-ink">
            <div className="micro-label text-accent font-bold flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-accent" />
              TOTAL FUEL CONSUMPTION
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              {totalFuelLbs} LBS
            </div>
            <div className="text-[11px] text-ink-muted pt-1">
              {activeSpec.fuelType.toUpperCase().replace('-', ' ')}
            </div>
          </div>

          {/* Practical Measurement (Chimneys or Tank %) */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-accent" />
              {activeSpec.fuelType === 'propane-20lb' ? 'PROPANE TANK USAGE' : 'CHIMNEY STARTERS'}
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              {activeSpec.fuelType === 'propane-20lb' ? `${propaneTankPct}%` : `${chimneysRequired} Chimneys`}
            </div>
            <div className="text-[11px] text-accent font-bold pt-1">
              {activeSpec.fuelType === 'propane-20lb'
                ? 'Of standard 20 lb gas cylinder'
                : 'Full Weber chimney starters'}
            </div>
          </div>

          {/* Target Temp Zone */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted">HEAT OPERATING ZONE</div>
            <div className="text-2xl sm:text-3xl font-bold text-accent">
              {activeSpec.tempCategory.split('(')[1].replace(')', '')}
            </div>
            <div className="text-[11px] text-ink-subtle pt-1">
              {activeSpec.tempCategory.split('(')[0]}
            </div>
          </div>

        </div>

        {/* 4. Airflow & Ignition Protocol */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono text-xs">
          
          <div className="bg-paper hairline-border p-4 space-y-2 border-l-4 border-l-ink">
            <div className="flex items-center gap-1.5 font-bold text-ink uppercase">
              <Flame className="w-4 h-4 text-accent" />
              <span>IGNITION &amp; SETUP PROTOCOL:</span>
            </div>
            <p className="text-ink-muted font-sans text-xs leading-relaxed">
              {activeSpec.starterRequirement}
            </p>
          </div>

          <div className="bg-paper hairline-border p-4 space-y-2 border-l-4 border-l-accent">
            <div className="flex items-center gap-1.5 font-bold text-accent uppercase">
              <Wind className="w-4 h-4" />
              <span>DAMPER &amp; AIRFLOW REGULATION:</span>
            </div>
            <p className="text-ink-muted font-sans text-xs leading-relaxed">
              {activeSpec.airVentSetting}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
