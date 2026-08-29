'use client';

import React, { useState } from 'react';
import { SLOW_COOKER_TIME_MAP, SlowCookerTimeMap } from '@/data/tools-data';
import { Clock, Droplets, AlertTriangle, CheckCircle, ArrowRight, Flame } from 'lucide-react';

export default function SlowCookerConverter() {
  const [sourceMode, setSourceMode] = useState<'oven' | 'low' | 'high' | 'dutch'>('oven');
  const [targetMode, setTargetMode] = useState<'low' | 'high' | 'oven' | 'dutch'>('low');
  const [sourceHours, setSourceHours] = useState<number>(1.0);
  const [selectedDishId, setSelectedDishId] = useState<string>(SLOW_COOKER_TIME_MAP[0].id);

  const activeDish =
    SLOW_COOKER_TIME_MAP.find((d) => d.id === selectedDishId) || SLOW_COOKER_TIME_MAP[0];

  // Mathematical Time Conversions:
  // Standard Ratios:
  // 1 hr Oven (350°F) = 6-8 hrs Slow Cooker LOW = 3-4 hrs Slow Cooker HIGH = 1 hr Dutch Oven (325°F)
  const getConvertedHours = (from: string, to: string, hrs: number) => {
    // Normalize to Oven Hours first
    let normalizedOvenHrs = hrs;
    if (from === 'low') normalizedOvenHrs = hrs / 6.5;
    else if (from === 'high') normalizedOvenHrs = hrs / 3.5;
    else if (from === 'dutch') normalizedOvenHrs = hrs * 1.1;

    // Convert from Oven to target
    if (to === 'oven') return Math.round(normalizedOvenHrs * 10) / 10;
    if (to === 'low') return Math.round(normalizedOvenHrs * 6.5 * 10) / 10;
    if (to === 'high') return Math.round(normalizedOvenHrs * 3.5 * 10) / 10;
    if (to === 'dutch') return Math.round(normalizedOvenHrs * 0.9 * 10) / 10;
    return hrs;
  };

  const convertedHours = getConvertedHours(sourceMode, targetMode, sourceHours);
  const convWholeHours = Math.floor(convertedHours);
  const convMins = Math.round((convertedHours - convWholeHours) * 60);

  const isConvertingToSlowCooker = targetMode === 'low' || targetMode === 'high';

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Dish Archetype Selector */}
      <div className="space-y-2">
        <div className="micro-label text-ink-muted">1. SELECT MEAT OR DISH CATEGORY:</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {SLOW_COOKER_TIME_MAP.map((dish) => {
            const isSelected = dish.id === selectedDishId;
            return (
              <button
                key={dish.id}
                onClick={() => setSelectedDishId(dish.id)}
                className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[75px] ${
                  isSelected
                    ? 'bg-paper-card border-2 border-ink shadow-subtle'
                    : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
                }`}
              >
                <span className={`font-bold font-sans text-xs ${isSelected ? 'text-ink' : ''}`}>
                  {dish.category}
                </span>
                <span className="text-[10px] text-accent font-bold mt-2">
                  Low: {dish.slowCookerLowHours}h | High: {dish.slowCookerHighHours}h
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Conversion Engine */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        {/* Source & Target Appliance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Source Selector */}
          <div className="space-y-3 font-mono text-xs">
            <label className="font-bold text-ink-muted uppercase">CONVERT FROM:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'oven', label: '350°F Oven' },
                { id: 'low', label: 'Slow Cooker LOW' },
                { id: 'high', label: 'Slow Cooker HIGH' },
                { id: 'dutch', label: 'Dutch Oven' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSourceMode(m.id as any)}
                  className={`p-2.5 font-bold uppercase transition-colors cursor-pointer text-center ${
                    sourceMode === m.id
                      ? 'bg-ink text-paper'
                      : 'bg-paper hairline-border text-ink-muted hover:text-ink'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Time Input Slider */}
            <div className="bg-paper hairline-border p-4 space-y-2 mt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-ink uppercase">ORIGINAL TIME:</span>
                <span className="text-base font-bold text-accent">{sourceHours} HOURS</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="12"
                step="0.5"
                value={sourceHours}
                onChange={(e) => setSourceHours(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
              />
            </div>
          </div>

          {/* Target Selector */}
          <div className="space-y-3 font-mono text-xs border-t md:border-t-0 md:border-l border-hairline md:pl-6 pt-4 md:pt-0">
            <label className="font-bold text-accent uppercase">CONVERT TO:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'low', label: 'Slow Cooker LOW' },
                { id: 'high', label: 'Slow Cooker HIGH' },
                { id: 'oven', label: '350°F Oven' },
                { id: 'dutch', label: 'Dutch Oven' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setTargetMode(m.id as any)}
                  className={`p-2.5 font-bold uppercase transition-colors cursor-pointer text-center ${
                    targetMode === m.id
                      ? 'bg-ink text-paper'
                      : 'bg-paper hairline-border text-ink-muted hover:text-ink'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Converted Output Display */}
            <div className="bg-paper hairline-border p-4 space-y-1 mt-4 border-2 border-ink">
              <div className="micro-label text-accent font-bold">CALCULATED TARGET TIME</div>
              <div className="text-3xl sm:text-4xl font-bold text-ink">
                {convWholeHours > 0 ? `${convWholeHours}h ${convMins > 0 ? `${convMins}m` : ''}` : `${convMins} mins`}
              </div>
              <div className="text-[11px] text-ink-muted">
                Equivalent heat transfer for {activeDish.category.split('(')[0]}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Liquid Reduction & Culinary Physics Warnings */}
        <div className="space-y-3 pt-4 border-t border-hairline font-mono text-xs">
          <div className="micro-label text-ink font-bold">ESSENTIAL SLOW COOKER ADAPTATION RULES</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Liquid Rule */}
            <div className="bg-paper hairline-border p-4 space-y-1 border-l-4 border-l-accent">
              <div className="flex items-center gap-1.5 font-bold text-accent uppercase">
                <Droplets className="w-4 h-4" />
                <span>LIQUID REDUCTION (-33% TO -50%):</span>
              </div>
              <p className="text-ink-muted font-sans text-xs leading-relaxed">
                {activeDish.liquidAdjustment}
              </p>
            </div>

            {/* Dairy & Veg Rule */}
            <div className="bg-paper hairline-border p-4 space-y-1 border-l-4 border-l-ink">
              <div className="flex items-center gap-1.5 font-bold text-ink uppercase">
                <AlertTriangle className="w-4 h-4 text-accent" />
                <span>DAIRY &amp; TEXTURE PROTOCOL:</span>
              </div>
              <p className="text-ink-muted font-sans text-xs leading-relaxed">
                Add milk, sour cream, or heavy cream ONLY during the final 15 minutes of slow cooking to prevent curdling.
              </p>
            </div>
          </div>

          <div className="bg-paper hairline-border p-3 text-[11px] text-ink-subtle">
            <strong>Culinary Note:</strong> {activeDish.keyRule}
          </div>
        </div>

      </div>
    </div>
  );
}
