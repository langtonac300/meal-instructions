'use client';

import React, { useState } from 'react';
import {
  STEAK_CUT_SPECS,
  STEAK_DONENESS_TARGETS,
  SteakCutSpec,
  SteakDonenessTarget,
} from '@/data/tools-data';
import { Flame, Clock, Thermometer, Sparkles, ShieldCheck } from 'lucide-react';

export default function SteakDonenessTimer() {
  const [selectedCutId, setSelectedCutId] = useState<string>(STEAK_CUT_SPECS[0].id);
  const [thickness, setThickness] = useState<number>(1.5);
  const [doneness, setDoneness] = useState<string>('medium-rare');
  const [isBoneIn, setIsBoneIn] = useState<boolean>(false);

  const activeCut =
    STEAK_CUT_SPECS.find((c) => c.id === selectedCutId) || STEAK_CUT_SPECS[0];
  const activeDoneness =
    STEAK_DONENESS_TARGETS.find((d) => d.doneness === doneness) ||
    STEAK_DONENESS_TARGETS[1];

  // Thermal Physics Calculations (Reverse Sear Method @ 225°F oven / indirect grill)
  // Base time for 1.5 inch steak to reach medium rare (115°F pull): approx 35 mins
  // Scales with thickness squared (Fourier heat conduction equation approximation):
  const thicknessFactor = Math.pow(thickness / 1.5, 1.4);
  const donenessTempDelta = (activeDoneness.ovenPullTempF - 105) / 10; // factor for higher pull temp
  const boneModifier = isBoneIn ? 1.15 : 1.0;

  const lowOvenMinutes = Math.round(
    (30 + donenessTempDelta * 5) * thicknessFactor * boneModifier
  );

  // High heat sear timing (per side):
  const searSecondsPerSide = thickness < 1.0 ? 45 : thickness <= 1.75 ? 60 : 75;
  const butterBasteSeconds = 45;
  const restMinutes = Math.max(5, Math.round(thickness * 4));

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Cut Selector */}
      <div className="space-y-2">
        <div className="micro-label text-ink-muted">1. SELECT YOUR STEAK CUT:</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {STEAK_CUT_SPECS.map((cut) => {
            const isSelected = cut.id === activeCut.id;
            return (
              <button
                key={cut.id}
                onClick={() => {
                  setSelectedCutId(cut.id);
                  setThickness(cut.defaultThicknessInches);
                  setIsBoneIn(cut.boneIn);
                }}
                className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[80px] ${
                  isSelected
                    ? 'bg-paper-card border-2 border-ink shadow-subtle'
                    : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
                }`}
              >
                <span className={`font-bold font-sans text-xs sm:text-sm ${isSelected ? 'text-ink' : ''}`}>
                  {cut.name}
                </span>
                <span className="text-[10px] text-accent font-bold mt-2">
                  {cut.fatMarbling} Marbling
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Doneness Segmented Control */}
      <div className="space-y-2">
        <div className="micro-label text-ink-muted">2. CHOOSE TARGET DONENESS:</div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {STEAK_DONENESS_TARGETS.map((target) => {
            const isSelected = target.doneness === doneness;
            return (
              <button
                key={target.doneness}
                onClick={() => setDoneness(target.doneness)}
                className={`p-3 text-center transition-all cursor-pointer font-mono text-xs ${
                  isSelected
                    ? 'bg-ink text-paper font-bold'
                    : 'bg-paper hairline-border text-ink-muted hover:border-ink hover:text-ink'
                }`}
              >
                <div className="font-bold font-sans">{target.label}</div>
                <div className={`text-[10px] mt-1 ${isSelected ? 'text-neutral-300' : 'text-accent'}`}>
                  {target.finalRestedTempF}°F Rested
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Parameter Controls (Thickness & Bone-in) */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Thickness Slider */}
          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center">
              <label className="font-bold text-ink uppercase">STEAK THICKNESS:</label>
              <span className="text-base font-bold text-accent">{thickness.toFixed(2)} INCHES</span>
            </div>
            <input
              type="range"
              min="0.75"
              max="3.0"
              step="0.25"
              value={thickness}
              onChange={(e) => setThickness(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-ink-subtle">
              <span>0.75" (Thin Cut)</span>
              <span>1.5" (Butcher Standard)</span>
              <span>3.0" (Double Thick)</span>
            </div>
          </div>

          {/* Bone-in Toggle */}
          <div className="space-y-2 font-mono text-xs flex flex-col justify-center">
            <label className="font-bold text-ink uppercase">BONE SPECIFICATION:</label>
            <div className="flex gap-2">
              <button
                onClick={() => setIsBoneIn(false)}
                className={`flex-1 py-2 font-bold uppercase transition-colors cursor-pointer ${
                  !isBoneIn
                    ? 'bg-ink text-paper'
                    : 'bg-paper hairline-border text-ink-muted hover:text-ink'
                }`}
              >
                Boneless
              </button>
              <button
                onClick={() => setIsBoneIn(true)}
                className={`flex-1 py-2 font-bold uppercase transition-colors cursor-pointer ${
                  isBoneIn
                    ? 'bg-ink text-paper'
                    : 'bg-paper hairline-border text-ink-muted hover:text-ink'
                }`}
              >
                Bone-In (+15% Time)
              </button>
            </div>
          </div>
        </div>

        {/* 4. The 3-Phase Execution Roadmap */}
        <div className="space-y-3 pt-4 border-t border-hairline">
          <div className="micro-label text-accent font-bold">
            REVERSE-SEAR TIMING &amp; TEMPERATURE BLUEPRINT
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Phase 1: Low Oven */}
            <div className="bg-paper hairline-border p-5 space-y-2 font-mono">
              <div className="flex items-center justify-between">
                <span className="micro-label text-ink-muted">PHASE 1: LOW OVEN</span>
                <span className="text-[10px] bg-paper-subtle px-1.5 py-0.5 hairline-border">225°F OVEN</span>
              </div>
              <div className="text-3xl font-bold text-ink">
                ~{lowOvenMinutes} MINS
              </div>
              <div className="text-xs text-accent font-bold">
                Pull when core hits {activeDoneness.ovenPullTempF}°F
              </div>
              <p className="text-[11px] text-ink-muted font-sans pt-1 leading-snug">
                Bake on wire rack over baking sheet. Convection air dries the surface completely.
              </p>
            </div>

            {/* Phase 2: Cast Iron Sear */}
            <div className="bg-paper hairline-border p-5 space-y-2 font-mono border-2 border-ink">
              <div className="flex items-center justify-between">
                <span className="micro-label text-accent font-bold">PHASE 2: CAST IRON SEAR</span>
                <span className="text-[10px] bg-ink text-paper px-1.5 py-0.5 font-bold">500°F PAN</span>
              </div>
              <div className="text-3xl font-bold text-ink">
                {searSecondsPerSide}s / SIDE
              </div>
              <div className="text-xs text-ink font-bold">
                + {butterBasteSeconds}s Garlic Butter Baste
              </div>
              <p className="text-[11px] text-ink-muted font-sans pt-1 leading-snug">
                Use 1 tbsp {activeCut.recommendedSearOil}. Sear 60s, flip 60s, then baste.
              </p>
            </div>

            {/* Phase 3: Cutting Board Rest */}
            <div className="bg-paper hairline-border p-5 space-y-2 font-mono">
              <div className="flex items-center justify-between">
                <span className="micro-label text-ink-muted">PHASE 3: BOARD REST</span>
                <span className="text-[10px] bg-paper-subtle px-1.5 py-0.5 hairline-border">CARRYOVER</span>
              </div>
              <div className="text-3xl font-bold text-accent">
                {restMinutes} MINS
              </div>
              <div className="text-xs text-ink font-bold">
                Rises to Final {activeDoneness.finalRestedTempF}°F Target
              </div>
              <p className="text-[11px] text-ink-muted font-sans pt-1 leading-snug">
                Rest uncovered on warm board. Muscle fibers relax and reabsorb juices.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Anatomy & Science Detail */}
        <div className="bg-paper hairline-border p-4 space-y-2 border-l-4 border-l-ink font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-ink uppercase">VISUAL DONENESS:</span>
            <span className="text-accent font-bold">{activeDoneness.colorCenter}</span>
          </div>
          <p className="text-ink-muted font-sans text-xs leading-relaxed">
            {activeDoneness.textureDescription}. <em>{activeCut.notes}</em>
          </p>
        </div>
      </div>
    </div>
  );
}
