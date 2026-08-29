'use client';

import React, { useState, useRef } from 'react';
import { Clock, Zap, RotateCcw, ArrowRight } from 'lucide-react';
import { Recipe } from '@/lib/types';
import { RECIPES } from '@/data/recipes';

interface RecipeScrubberProps {
  maxMinutes: number | null;
  onTimeChange: (mins: number | null) => void;
  filteredCount?: number;
}

const TIME_STOPS = [
  { value: 10, label: '10 MINS', sublabel: 'Flash Sizzle (5-10m)' },
  { value: 15, label: '15 MINS', sublabel: 'Weeknight Rush (≤15m)' },
  { value: 20, label: '20 MINS', sublabel: 'Standard Dinners (≤20m)' },
  { value: 25, label: '25 MINS', sublabel: 'Full Meal / Wings (≤25m)' },
  { value: 35, label: '35 MINS', sublabel: 'Sheet Pan Roasts (≤35m)' },
  { value: null, label: 'ALL MEALS', sublabel: 'Complete Index' },
];

export default function RecipeScrubber({
  maxMinutes,
  onTimeChange,
  filteredCount,
}: RecipeScrubberProps) {
  const [hoveredMins, setHoveredMins] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const activeTime = hoveredMins !== null ? hoveredMins : maxMinutes;
  
  const matchingRecipes = activeTime === null
    ? RECIPES
    : RECIPES.filter((r) => r.totalMinutes <= activeTime);

  // Fast sample recipe for the active time
  const sampleRecipe = matchingRecipes[0] || RECIPES[0];

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = x / rect.width;

    if (percentage > 0.88) {
      onTimeChange(null);
    } else if (percentage < 0.20) {
      onTimeChange(10);
    } else if (percentage < 0.40) {
      onTimeChange(15);
    } else if (percentage < 0.60) {
      onTimeChange(20);
    } else if (percentage < 0.75) {
      onTimeChange(25);
    } else {
      onTimeChange(35);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = x / rect.width;

    if (percentage > 0.88) {
      setHoveredMins(null);
    } else if (percentage < 0.20) {
      setHoveredMins(10);
    } else if (percentage < 0.40) {
      setHoveredMins(15);
    } else if (percentage < 0.60) {
      setHoveredMins(20);
    } else if (percentage < 0.75) {
      setHoveredMins(25);
    } else {
      setHoveredMins(35);
    }
  };

  const getSliderPosition = () => {
    if (activeTime === 10) return '10%';
    if (activeTime === 15) return '30%';
    if (activeTime === 20) return '50%';
    if (activeTime === 25) return '68%';
    if (activeTime === 35) return '83%';
    return '95%';
  };

  return (
    <div className="w-full bg-paper-100 border-y border-hairline py-4 px-4 sm:px-8 select-none shadow-subtle">
      <div className="max-w-7xl mx-auto space-y-2.5">
        
        {/* Scrubber Label & Active Preview */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono uppercase tracking-widest text-ink">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-paper hairline-border font-bold text-accent">
              <Clock className="w-3.5 h-3.5" />
              <span>TIME BUDGET:</span>
              <span>{activeTime ? `≤ ${activeTime} MINS` : 'ALL (SHOW ALL)'}</span>
            </span>
            <span className="text-hairline-dark/30 hidden sm:inline">—</span>
            <span className="text-ink font-semibold">
              {matchingRecipes.length} {matchingRecipes.length === 1 ? 'MEAL' : 'MEALS'} READY BEFORE MELTDOWN
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[10px] text-ink-muted">
            {sampleRecipe && (
              <span className="hidden md:inline truncate max-w-xs text-ink-subtle">
                e.g. {sampleRecipe.title} ({sampleRecipe.totalMinutes}m)
              </span>
            )}
            {maxMinutes !== null && (
              <button
                onClick={() => onTimeChange(null)}
                className="flex items-center gap-1 px-2 py-0.5 bg-paper hover:bg-paper-200 hairline-border text-ink cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>SHOW ALL</span>
              </button>
            )}
          </div>
        </div>

        {/* The Kellerstöckl-inspired Ruler Track */}
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredMins(null)}
          className="relative w-full h-14 bg-paper-200/80 rounded border border-hairline cursor-pointer flex items-center px-3 group overflow-hidden"
        >
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:8px_8px]" />

          {/* Time Stop Columns */}
          <div className="relative w-full h-full flex items-center justify-between text-center font-mono">
            {TIME_STOPS.map((stop) => {
              const isSelected = maxMinutes === stop.value;
              const isHovered = hoveredMins === stop.value;
              const count = stop.value === null
                ? RECIPES.length
                : RECIPES.filter((r) => r.totalMinutes <= stop.value).length;

              return (
                <button
                  key={String(stop.value)}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTimeChange(stop.value);
                  }}
                  className={`h-full flex flex-col justify-between py-1.5 px-2 flex-1 relative group/stop transition-all ${
                    isSelected ? 'bg-paper-50/70' : 'hover:bg-paper-card/50'
                  }`}
                >
                  {/* Top Tick */}
                  <div className="flex justify-center">
                    <div
                      className={`w-[1.5px] transition-all duration-150 ${
                        isSelected || isHovered
                          ? 'h-4 bg-accent scale-125'
                          : 'h-2.5 bg-ink-muted group-hover/stop:h-3.5 group-hover/stop:bg-ink'
                      }`}
                    />
                  </div>

                  {/* Center Time Label */}
                  <div className="space-y-0.5">
                    <span
                      className={`block text-[11px] font-bold tracking-tight uppercase transition-colors ${
                        isSelected
                          ? 'text-accent'
                          : isHovered
                          ? 'text-ink'
                          : 'text-ink-muted'
                      }`}
                    >
                      {stop.label}
                    </span>
                    <span className="block text-[9px] text-ink-subtle hidden sm:block font-sans">
                      {count} {count === 1 ? 'meal' : 'meals'}
                    </span>
                  </div>

                  {/* Bottom Sublabel / Minor Ticks */}
                  <div className="flex justify-center">
                    <div
                      className={`w-[1.5px] transition-all duration-150 ${
                        isSelected || isHovered
                          ? 'h-3 bg-accent'
                          : 'h-1.5 bg-hairline-dark/40 group-hover/stop:h-2.5'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Slider Needle / Hairline Indicator */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none transition-all duration-150 flex flex-col items-center z-20"
            style={{ left: getSliderPosition(), transform: 'translateX(-50%)' }}
          >
            <div className="w-2 h-2 bg-accent rotate-45 -mt-1 shadow-sm" />
            <div className="w-[2px] h-full bg-accent" />
            <div className="w-2 h-2 bg-accent rotate-45 -mb-1 shadow-sm" />
          </div>
        </div>

        {/* Micro helper under track */}
        <div className="flex justify-between items-center text-[9px] font-mono text-ink-subtle uppercase px-1">
          <span>⚡ 5-10 MIN RAPID FLASH</span>
          <span>⏱️ 15 MIN WEEKNIGHT SWEET SPOT</span>
          <span>🔥 25-35 MIN FULL ROASTS</span>
        </div>

      </div>
    </div>
  );
}
