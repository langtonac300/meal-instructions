'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, Clock, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { LeanAirFryerIcon, LeanHeatWavesIcon, LeanClockIcon, LeanFlipIcon } from './icons/Lean5SIcons';
import { RECIPES } from '@/data/recipes';

export default function AirFryerCalculator() {
  const [ovenTemp, setOvenTemp] = useState<number>(400);
  const [ovenMinutes, setOvenMinutes] = useState<number>(25);
  const [unit, setUnit] = useState<'F' | 'C'>('F');

  // Conversion Math:
  // Air Fryer Temp: Conventional Oven Temp minus 25°F (or minus 15°C)
  // Air Fryer Time: Conventional Oven Time minus 20% to 25%
  const airFryerTemp = unit === 'F' ? ovenTemp - 25 : ovenTemp - 15;
  const airFryerMinTime = Math.max(1, Math.round(ovenMinutes * 0.75));
  const airFryerMaxTime = Math.max(1, Math.round(ovenMinutes * 0.8));
  const flipTime = Math.round(airFryerMinTime / 2);

  // Find matching recipes with similar cook time/temp
  const matchingRecipes = RECIPES.filter(
    (r) =>
      r.appliance === 'air-fryer' &&
      Math.abs(r.cookMinutes - airFryerMinTime) <= 4
  ).slice(0, 3);

  return (
    <div className="bg-paper-50 border border-hairline rounded-lg p-6 sm:p-8 shadow-subtle">
      {/* Header */}
      <div className="border-b border-hairline pb-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-paper-100 rounded border border-hairline">
              <LeanAirFryerIcon size={24} className="text-accent" />
            </div>
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-ink">
              OVEN TO AIR FRYER CONVERSION CALCULATOR
            </h2>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center bg-paper-200 p-0.5 rounded border border-hairline font-mono text-xs">
            <button
              onClick={() => setUnit('F')}
              className={`px-2 py-0.5 rounded ${
                unit === 'F' ? 'bg-ink text-paper font-bold' : 'text-ink-muted'
              }`}
            >
              °FAHRENHEIT
            </button>
            <button
              onClick={() => setUnit('C')}
              className={`px-2 py-0.5 rounded ${
                unit === 'C' ? 'bg-ink text-paper font-bold' : 'text-ink-muted'
              }`}
            >
              °CELSIUS
            </button>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-ink-muted mt-1">
          The 25° / 20% Rule: Convection air fryers cook hotter and faster than conventional ovens.
        </p>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Oven Temp Input */}
        <div className="bg-paper-100 p-4 rounded border border-hairline">
          <div className="flex justify-between items-center mb-2 font-mono">
            <label className="text-xs font-bold text-ink uppercase tracking-wider">
              ORIGINAL OVEN TEMP:
            </label>
            <span className="text-sm font-bold text-accent">
              {ovenTemp}°{unit}
            </span>
          </div>
          <input
            type="range"
            min={unit === 'F' ? 300 : 150}
            max={unit === 'F' ? 475 : 245}
            step={5}
            value={ovenTemp}
            onChange={(e) => setOvenTemp(Number(e.target.value))}
            className="w-full accent-accent cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-ink-subtle mt-1">
            <span>{unit === 'F' ? '300°F' : '150°C'}</span>
            <span>{unit === 'F' ? '400°F (Standard)' : '200°C'}</span>
            <span>{unit === 'F' ? '475°F' : '245°C'}</span>
          </div>
        </div>

        {/* Oven Time Input */}
        <div className="bg-paper-100 p-4 rounded border border-hairline">
          <div className="flex justify-between items-center mb-2 font-mono">
            <label className="text-xs font-bold text-ink uppercase tracking-wider">
              ORIGINAL OVEN TIME:
            </label>
            <span className="text-sm font-bold text-accent">
              {ovenMinutes} MINUTES
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={60}
            step={1}
            value={ovenMinutes}
            onChange={(e) => setOvenMinutes(Number(e.target.value))}
            className="w-full accent-accent cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-ink-subtle mt-1">
            <span>5m</span>
            <span>25m (Average)</span>
            <span>60m</span>
          </div>
        </div>
      </div>

      {/* Big Result Display */}
      <div className="bg-paper-200/80 rounded-lg p-6 border-2 border-dashed border-ink/30 text-center font-mono">
        <span className="text-[10px] uppercase font-bold tracking-widest text-ink-muted block mb-2">
          ⚡ AIR FRYER TARGET PARAMETERS
        </span>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 my-2">
          {/* Target Temp */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[10px] text-ink-subtle uppercase mb-1">
              <LeanHeatWavesIcon size={16} className="text-accent" />
              <span>SET TEMPERATURE TO</span>
            </div>
            <span className="text-3xl sm:text-4xl font-black text-ink">
              {airFryerTemp}°{unit}
            </span>
            <span className="text-[10px] text-ink-muted block mt-0.5">
              (-{unit === 'F' ? '25°F' : '15°C'} reduction)
            </span>
          </div>

          <div className="text-2xl text-ink-subtle hidden sm:block">×</div>

          {/* Target Time */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[10px] text-ink-subtle uppercase mb-1">
              <LeanClockIcon size={16} className="text-accent" />
              <span>SET COOK TIME TO</span>
            </div>
            <span className="text-3xl sm:text-4xl font-black text-accent">
              {airFryerMinTime === airFryerMaxTime
                ? `${airFryerMinTime}`
                : `${airFryerMinTime}-${airFryerMaxTime}`}{' '}
              MINS
            </span>
            <span className="text-[10px] text-ink-muted flex items-center gap-1 mt-0.5">
              <LeanFlipIcon size={12} className="text-accent" />
              <span>Shake or Flip at {flipTime} mins</span>
            </span>
          </div>
        </div>

        {/* Dad Quick Advice */}
        <div className="mt-4 pt-4 border-t border-hairline text-xs font-sans text-ink-muted max-w-xl mx-auto">
          <strong>Dad Rule of Thumb:</strong> Check food at the {airFryerMinTime}-minute mark. Air
          fryers circulate dry heat rapidly; food browns 2-3x faster than still oven air.
        </div>
      </div>

      {/* Suggested Matching Recipes */}
      {matchingRecipes.length > 0 && (
        <div className="mt-8 pt-6 border-t border-hairline">
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block mb-3">
            VERIFIED RECIPES MATCHING THIS TIME RANGE ({airFryerMinTime} MINS):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {matchingRecipes.map((r) => (
              <Link
                key={r.id}
                href={`/recipes/${r.slug}`}
                className="p-3 bg-paper-100 hover:bg-paper-200 rounded border border-hairline transition-colors flex items-center justify-between group"
              >
                <div>
                  <span className="font-mono text-[9px] text-ink-muted block font-bold">
                    {r.id}
                  </span>
                  <span className="font-medium text-xs text-ink group-hover:text-accent truncate block">
                    {r.title}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-accent shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
