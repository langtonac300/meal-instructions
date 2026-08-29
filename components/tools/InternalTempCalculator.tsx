'use client';

import React, { useState } from 'react';
import { INTERNAL_TEMP_SPECS, InternalTempSpec } from '@/data/tools-data';
import { Thermometer, Clock, ShieldCheck, Flame, ArrowRight, Activity, Sparkles } from 'lucide-react';

export default function InternalTempCalculator() {
  const [selectedSpecId, setSelectedSpecId] = useState<string>(INTERNAL_TEMP_SPECS[0].id);
  const [selectedLevelIdx, setSelectedLevelIdx] = useState<number>(1); // Med-Rare default for steak

  const activeSpec = INTERNAL_TEMP_SPECS.find((s) => s.id === selectedSpecId) || INTERNAL_TEMP_SPECS[0];
  
  // Safe level index clamp
  const levelIdx = Math.min(selectedLevelIdx, activeSpec.donenessLevels.length - 1);
  const activeLevel = activeSpec.donenessLevels[levelIdx] || activeSpec.donenessLevels[0];

  const handleSelectSpec = (id: string) => {
    setSelectedSpecId(id);
    setSelectedLevelIdx(0); // reset to first level
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Meat Cut Selector Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {INTERNAL_TEMP_SPECS.map((spec) => {
          const isSelected = spec.id === activeSpec.id;
          return (
            <button
              key={spec.id}
              onClick={() => handleSelectSpec(spec.id)}
              className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[80px] ${
                isSelected
                  ? 'bg-paper-card border-2 border-ink shadow-subtle'
                  : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
              }`}
            >
              <span className={`font-bold font-sans text-xs line-clamp-2 ${isSelected ? 'text-ink' : ''}`}>
                {spec.name.split('(')[0]}
              </span>
              <span className="text-[10px] tracking-widest text-accent font-bold mt-2 uppercase">
                {spec.thickness}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Spec Sheet */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hairline-b pb-4">
          <div>
            <div className="micro-label text-accent">THERMAL CARRYOVER PHYSICS // THE RESTING RISE</div>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink mt-1">
              {activeSpec.name}
            </h2>
            <div className="font-mono text-xs text-ink-subtle mt-1">
              STANDARD THICKNESS: {activeSpec.thickness} • USDA MINIMUM: {activeSpec.usdaSafeMin}°F
            </div>
          </div>
        </div>

        {/* Doneness Selector Tabs */}
        <div className="space-y-2">
          <div className="micro-label text-ink-muted">CHOOSE DESIRED DONENESS:</div>
          <div className="flex flex-wrap gap-2">
            {activeSpec.donenessLevels.map((lvl, idx) => (
              <button
                key={lvl.label}
                onClick={() => setSelectedLevelIdx(idx)}
                className={`px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                  levelIdx === idx
                    ? 'bg-ink text-paper font-bold'
                    : 'bg-paper hairline-border text-ink-muted hover:border-ink hover:text-ink'
                }`}
              >
                {lvl.label} ({lvl.finalTargetTemp}°F)
              </button>
            ))}
          </div>
        </div>

        {/* The Core Carryover Math Trio */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Pull Temperature */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono border-2 border-accent bg-paper-50">
            <div className="micro-label text-accent font-bold flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-accent" />
              PULL FROM HEAT AT
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-accent tracking-tight">
              {activeLevel.pullTemp}°F
            </div>
            <div className="text-[11px] text-ink-muted pt-1">
              ({Math.round((activeLevel.pullTemp - 32) * (5 / 9))}°C) Instant probe reading
            </div>
          </div>

          {/* Resting Duration & Rise */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" />
              REST TENTED (FOIL)
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
              {activeLevel.restMinutes} MINS
            </div>
            <div className="text-[11px] text-accent font-bold pt-1">
              +{activeLevel.carryoverRise}°F thermal momentum rise
            </div>
          </div>

          {/* Final Rested Temperature */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-accent" />
              FINAL SERVE TARGET
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
              {activeLevel.finalTargetTemp}°F
            </div>
            <div className="text-[11px] text-ink-muted pt-1">
              {activeLevel.colorVisual}
            </div>
          </div>
        </div>

        {/* Visual Temperature Arc */}
        <div className="bg-paper hairline-border p-5 space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center text-[11px] font-bold uppercase text-ink">
            <span>Pull off heat: <strong>{activeLevel.pullTemp}°F</strong></span>
            <span className="text-accent">Carryover Phase (+{activeLevel.carryoverRise}°F)</span>
            <span>Slice & Serve: <strong>{activeLevel.finalTargetTemp}°F</strong></span>
          </div>

          <div className="w-full h-3 bg-paper-200 rounded-full overflow-hidden flex">
            <div className="h-full bg-ink" style={{ width: '60%' }} />
            <div className="h-full bg-accent" style={{ width: '40%' }} />
          </div>

          <div className="text-ink-muted text-[11px] flex justify-between">
            <span>Searing / Roasting</span>
            <span>Resting on warm cutting board under foil</span>
          </div>
        </div>

        {/* Science & Safety Explanation */}
        <div className="bg-paper hairline-border p-4 sm:p-5 space-y-2 border-l-4 border-l-ink">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-ink">
            <Activity className="w-4 h-4 text-accent" />
            <span>The Thermal Science Behind The Number</span>
          </div>
          <p className="text-xs sm:text-sm text-ink-muted font-mono leading-relaxed">
            {activeSpec.scienceNote}
          </p>
        </div>

      </div>
    </div>
  );
}
