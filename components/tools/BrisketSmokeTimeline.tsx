'use client';

import React, { useState } from 'react';
import { BRISKET_TIMELINE_SPECS, BrisketTimelineSpec } from '@/data/tools-data';
import { Flame, Clock, Bell, ShieldCheck, Thermometer, Sparkles } from 'lucide-react';

export default function BrisketSmokeTimeline() {
  const [selectedCutId, setSelectedCutId] = useState<string>(BRISKET_TIMELINE_SPECS[0].id);
  const [weightLbs, setWeightLbs] = useState<number>(14);
  const [serveTimeHour, setServeTimeHour] = useState<number>(18); // 6:00 PM in 24hr format
  const [coolerRestHours, setCoolerRestHours] = useState<number>(3);

  const activeSpec =
    BRISKET_TIMELINE_SPECS.find((s) => s.id === selectedCutId) ||
    BRISKET_TIMELINE_SPECS[0];

  // Mathematical Schedule Back-Calculation
  const totalCookMinutes = Math.round(weightLbs * activeSpec.estimatedMinutesPerLb);
  const totalRestMinutes = coolerRestHours * 60;
  const totalSessionMinutes = totalCookMinutes + totalRestMinutes;

  // Format 24-hour time to 12-hour AM/PM string
  const formatTime = (totalMinutesFromMidnight: number) => {
    // Wrap around 24 hours (1440 minutes)
    let mins = (totalMinutesFromMidnight % 1440 + 1440) % 1440;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const displayM = m < 10 ? `0${m}` : m;
    return `${displayH}:${displayM} ${period}`;
  };

  const serveTimeMinutes = serveTimeHour * 60;
  const pullOffSmokerMinutes = serveTimeMinutes - totalRestMinutes;
  const wrapButcherPaperMinutes = pullOffSmokerMinutes - Math.round(totalCookMinutes * 0.45);
  const meatOnSmokerMinutes = serveTimeMinutes - totalSessionMinutes;
  const fireSmokerMinutes = meatOnSmokerMinutes - 45; // 45 min preheat

  return (
    <div className="space-y-8 font-sans">
      {/* 1. BBQ Cut Selector */}
      <div className="space-y-2">
        <div className="micro-label text-ink-muted">1. CHOOSE BBQ CUT &amp; SMOKER TEMP:</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {BRISKET_TIMELINE_SPECS.map((spec) => {
            const isSelected = spec.id === selectedCutId;
            return (
              <button
                key={spec.id}
                onClick={() => setSelectedCutId(spec.id)}
                className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[85px] ${
                  isSelected
                    ? 'bg-paper-card border-2 border-ink shadow-subtle'
                    : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
                }`}
              >
                <span className={`font-bold font-sans text-xs ${isSelected ? 'text-ink' : ''}`}>
                  {spec.cutName.split('(')[0]}
                </span>
                <span className="text-[10px] text-accent font-bold mt-2">
                  {spec.smokerTempF}°F Smoker (~{spec.estimatedMinutesPerLb} min/lb)
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Configuration Grid */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          {/* Target Dinner Serve Time */}
          <div className="bg-paper hairline-border p-4 space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-ink uppercase">TARGET SERVE TIME:</label>
              <span className="text-base font-bold text-accent">{formatTime(serveTimeHour * 60)}</span>
            </div>
            <input
              type="range"
              min="12"
              max="22"
              step="0.5"
              value={serveTimeHour}
              onChange={(e) => setServeTimeHour(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
          </div>

          {/* Meat Weight */}
          <div className="bg-paper hairline-border p-4 space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-ink uppercase">TRIMMED WEIGHT:</label>
              <span className="text-base font-bold text-ink">{weightLbs} LBS</span>
            </div>
            <input
              type="range"
              min="6"
              max="20"
              step="1"
              value={weightLbs}
              onChange={(e) => setWeightLbs(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
          </div>

          {/* Cooler Rest Hours */}
          <div className="bg-paper hairline-border p-4 space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-ink uppercase">COOLER REST BUFFER:</label>
              <span className="text-base font-bold text-ink">{coolerRestHours} HOURS</span>
            </div>
            <input
              type="range"
              min="1.5"
              max="5"
              step="0.5"
              value={coolerRestHours}
              onChange={(e) => setCoolerRestHours(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
          </div>
        </div>

        {/* 3. The Reverse-Scheduled Step Timeline */}
        <div className="space-y-3 pt-2 font-mono">
          <div className="micro-label text-accent font-bold">
            MASTER SCHEDULE // SET ALARMS FOR THESE EXACT MILESTONES
          </div>

          <div className="space-y-2.5">
            
            {/* Step 1: Light Smoker */}
            <div className="bg-paper hairline-border p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-ink-muted">STEP 1</span>
                  <span className="text-sm font-bold text-ink uppercase font-sans">Light Smoker &amp; Add Wood</span>
                </div>
                <div className="text-[11px] text-ink-muted font-sans">
                  Stabilize clean blue smoke at {activeSpec.smokerTempF}°F.
                </div>
              </div>
              <div className="text-2xl font-bold text-accent">
                {formatTime(fireSmokerMinutes)}
              </div>
            </div>

            {/* Step 2: Meat On */}
            <div className="bg-paper hairline-border p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-2 border-ink">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-accent">STEP 2</span>
                  <span className="text-sm font-bold text-ink uppercase font-sans">Place Meat on Grates</span>
                </div>
                <div className="text-[11px] text-ink-muted font-sans">
                  Fat-side up or facing heat source. Insert thermometer probe into thickest flat.
                </div>
              </div>
              <div className="text-2xl font-bold text-ink">
                {formatTime(meatOnSmokerMinutes)}
              </div>
            </div>

            {/* Step 3: Wrap Stall */}
            <div className="bg-paper hairline-border p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-ink-muted">STEP 3</span>
                  <span className="text-sm font-bold text-ink uppercase font-sans">The Stall ({activeSpec.expectedStallTempF}°F) — Wrap in Paper</span>
                </div>
                <div className="text-[11px] text-ink-muted font-sans">
                  Wrap tightly in pink butcher paper with rendered tallow when mahogany bark sets.
                </div>
              </div>
              <div className="text-2xl font-bold text-ink">
                ~{formatTime(wrapButcherPaperMinutes)}
              </div>
            </div>

            {/* Step 4: Pull Off */}
            <div className="bg-paper hairline-border p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-ink-muted">STEP 4</span>
                  <span className="text-sm font-bold text-ink uppercase font-sans">Pull Off Heat ({activeSpec.finalTargetTempF}°F)</span>
                </div>
                <div className="text-[11px] text-ink-muted font-sans">
                  Probe feels like hot knife through butter with zero resistance.
                </div>
              </div>
              <div className="text-2xl font-bold text-ink">
                {formatTime(pullOffSmokerMinutes)}
              </div>
            </div>

            {/* Step 5: Cooler Rest */}
            <div className="bg-paper hairline-border p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-l-4 border-l-accent">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-accent">STEP 5</span>
                  <span className="text-sm font-bold text-accent uppercase font-sans">Cooler Rest &amp; Slice</span>
                </div>
                <div className="text-[11px] text-ink-muted font-sans">
                  Wrap in old bath towels, place inside dry insulated cooler for {coolerRestHours} hrs. Slice against grain!
                </div>
              </div>
              <div className="text-2xl font-bold text-accent">
                {formatTime(serveTimeMinutes)} (DINNER)
              </div>
            </div>

          </div>
        </div>

        {/* 4. Chef Key Action */}
        <div className="bg-paper hairline-border p-4 border-l-4 border-l-ink text-xs font-mono">
          <span className="font-bold uppercase text-ink">BBQ PITMASTER RULE: </span>
          <span className="text-ink-muted font-sans">{activeSpec.keyAction}</span>
        </div>

      </div>
    </div>
  );
}
