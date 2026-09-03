'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Flame,
  Clock,
  ArrowRight,
  RefreshCw,
  Scale,
  Sparkles,
  Thermometer,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import {
  LeanAirFryerIcon,
  LeanProbeIcon,
  LeanScaleIcon,
  LeanPanHeatIcon,
  LeanFlipIcon,
  LeanHeatWavesIcon,
  LeanClockIcon,
} from './icons/Lean5SIcons';

type ActiveEngine = 'air-fryer' | 'steak-pull' | 'takeout-revive' | 'meat-math';

export default function KitchenEnginesDock() {
  const [activeEngine, setActiveEngine] = useState<ActiveEngine>('air-fryer');

  // --- ENGINE 1: OVEN TO AIR FRYER CONVERTER STATE ---
  const [ovenTemp, setOvenTemp] = useState<number>(400);
  const [ovenMinutes, setOvenMinutes] = useState<number>(25);
  const [unit, setUnit] = useState<'F' | 'C'>('F');

  const afTemp = unit === 'F' ? ovenTemp - 25 : ovenTemp - 15;
  const afMinTime = Math.max(1, Math.round(ovenMinutes * 0.75));
  const afMaxTime = Math.max(1, Math.round(ovenMinutes * 0.8));
  const afFlipTime = Math.round(afMinTime / 2);

  // --- ENGINE 2: STEAK PULL TEMP STATE ---
  const [steakThickness, setSteakThickness] = useState<1 | 1.5 | 2>(1.5);
  const [targetDoneness, setTargetDoneness] = useState<
    'rare' | 'med-rare' | 'medium' | 'med-well'
  >('med-rare');

  const donenessData = {
    rare: { final: 125, desc: 'Cool red center', color: 'bg-red-900 text-white' },
    'med-rare': { final: 135, desc: 'Warm red center with pink ring (Chef Standard)', color: 'bg-red-700 text-white' },
    medium: { final: 145, desc: 'Warm pink center throughout', color: 'bg-rose-600 text-white' },
    'med-well': { final: 155, desc: 'Slight pink trace at center', color: 'bg-stone-600 text-white' },
  };

  const carryoverRise = steakThickness === 1 ? 4 : steakThickness === 1.5 ? 7 : 10;
  const pullTemp = donenessData[targetDoneness].final - carryoverRise;

  // --- ENGINE 3: TAKEOUT REVIVE STATE ---
  const [reviveItem, setReviveItem] = useState<string>('pizza');
  const reviveGuides: Record<
    string,
    { name: string; appliance: string; temp: string; time: string; cue: string; tip: string }
  > = {
    pizza: {
      name: 'Cold Pizza Slice',
      appliance: 'Air Fryer or Skillet',
      temp: '360°F (182°C)',
      time: '3–4 mins',
      cue: 'Bottom crust is rock-hard crisp, cheese is bubbling.',
      tip: 'Do not microwave. Microwave steams moisture out of sauce directly into the bottom crust, creating soggy cardboard.',
    },
    fries: {
      name: 'Limp French Fries',
      appliance: 'Air Fryer',
      temp: '400°F (204°C)',
      time: '3–5 mins',
      cue: 'Golden, sizzles when shaken, taps rigid with tongs.',
      tip: 'Spread in single layer. High-velocity airflow strips the surface humidity instantly.',
    },
    tenders: {
      name: 'Soggy Fried Chicken / Tenders',
      appliance: 'Air Fryer',
      temp: '375°F (190°C)',
      time: '4–5 mins',
      cue: 'Breading crackles, surface grease sizzles.',
      tip: 'No extra oil needed. The residual fry oil in breading re-fries the crust.',
    },
    eggrolls: {
      name: 'Takeout Egg Rolls / Spring Rolls',
      appliance: 'Air Fryer',
      temp: '380°F (193°C)',
      time: '4 mins',
      cue: 'Blistered, brittle wrapper.',
      tip: 'Flip at 2 minutes for even 360-degree crisping.',
    },
    fish: {
      name: 'Fried Fish & Shrimp',
      appliance: 'Air Fryer',
      temp: '375°F (190°C)',
      time: '3–4 mins',
      cue: 'Batter is rigid and hot to center.',
      tip: 'Line basket with perforated parchment if batter is delicate.',
    },
  };

  // --- ENGINE 4: MEAT MATH STATE ---
  const [adults, setAdults] = useState<number>(4);
  const [kids, setKids] = useState<number>(2);
  const [meatCut, setMeatCut] = useState<string>('boneless-poultry');

  const meatFactors: Record<
    string,
    { name: string; adultRawLb: number; kidRawLb: number; shrinkLossPct: number; note: string }
  > = {
    'boneless-poultry': {
      name: 'Boneless Chicken Breast / Thighs',
      adultRawLb: 0.5,
      kidRawLb: 0.25,
      shrinkLossPct: 20,
      note: '20% water weight loss during cooking.',
    },
    'bone-in-steak-chops': {
      name: 'Bone-In Steaks / Pork Chops',
      adultRawLb: 0.85,
      kidRawLb: 0.45,
      shrinkLossPct: 35,
      note: 'Includes 25% bone weight + 10% cook shrink.',
    },
    'ground-beef': {
      name: '80/20 Ground Beef Burgers',
      adultRawLb: 0.45,
      kidRawLb: 0.25,
      shrinkLossPct: 25,
      note: 'Renders 25% fat/moisture. 0.45 lb raw yields a 1/3 lb burger.',
    },
    'smoked-bbq': {
      name: 'Smoked Brisket / Pulled Pork',
      adultRawLb: 1.0,
      kidRawLb: 0.5,
      shrinkLossPct: 50,
      note: '50% total loss: fat cap trim + render + moisture evaporative stall.',
    },
    salmon: {
      name: 'Salmon & Whitefish Fillets',
      adultRawLb: 0.5,
      kidRawLb: 0.3,
      shrinkLossPct: 15,
      note: 'Gentle moisture loss. High satiety protein.',
    },
  };

  const factor = meatFactors[meatCut];
  const rawPurchaseWeight = Math.round((adults * factor.adultRawLb + kids * factor.kidRawLb) * 10) / 10;
  const cookedYieldWeight = Math.round(rawPurchaseWeight * (1 - factor.shrinkLossPct / 100) * 10) / 10;

  return (
    <div className="bg-paper-100 border border-hairline rounded-lg p-5 sm:p-8 shadow-subtle font-mono">
      {/* Dock Header & Tab Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-hairline pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-accent uppercase tracking-widest font-bold mb-1">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            <span>INTERACTIVE KITCHEN ENGINES DOCK</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-ink uppercase tracking-tight font-sans">
            Tactile Kitchen Calculators
          </h2>
        </div>

        {/* 4 Primary Engine Tabs */}
        <div className="flex items-center gap-1.5 bg-paper-200 p-1 rounded border border-hairline overflow-x-auto scrollbar-none text-xs">
          <button
            type="button"
            onClick={() => setActiveEngine('air-fryer')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer font-bold whitespace-nowrap flex items-center gap-1.5 ${
              activeEngine === 'air-fryer'
                ? 'bg-ink text-paper shadow-sm'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <LeanAirFryerIcon size={14} className={activeEngine === 'air-fryer' ? 'text-accent' : ''} />
            <span>AIR FRYER CONVERT</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveEngine('steak-pull')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer font-bold whitespace-nowrap flex items-center gap-1.5 ${
              activeEngine === 'steak-pull'
                ? 'bg-ink text-paper shadow-sm'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <LeanProbeIcon size={14} className={activeEngine === 'steak-pull' ? 'text-accent' : ''} />
            <span>STEAK PULL TEMP</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveEngine('takeout-revive')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer font-bold whitespace-nowrap flex items-center gap-1.5 ${
              activeEngine === 'takeout-revive'
                ? 'bg-ink text-paper shadow-sm'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <LeanPanHeatIcon size={14} className={activeEngine === 'takeout-revive' ? 'text-accent' : ''} />
            <span>CRISP REVIVE</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveEngine('meat-math')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer font-bold whitespace-nowrap flex items-center gap-1.5 ${
              activeEngine === 'meat-math'
                ? 'bg-ink text-paper shadow-sm'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <LeanScaleIcon size={14} className={activeEngine === 'meat-math' ? 'text-accent' : ''} />
            <span>MEAT MATH</span>
          </button>
        </div>
      </div>

      {/* ── TAB 1: OVEN TO AIR FRYER CONVERTER ── */}
      {activeEngine === 'air-fryer' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input 1: Original Oven Temp */}
            <div className="bg-paper p-4 rounded border border-hairline space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-ink uppercase">ORIGINAL OVEN TEMP:</span>
                <span className="font-bold text-accent text-sm">{ovenTemp}°{unit}</span>
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
              <div className="flex justify-between text-[10px] text-ink-subtle">
                <span>{unit === 'F' ? '300°F' : '150°C'}</span>
                <span>{unit === 'F' ? '400°F (Standard)' : '200°C'}</span>
                <span>{unit === 'F' ? '475°F' : '245°C'}</span>
              </div>
            </div>

            {/* Input 2: Original Oven Time */}
            <div className="bg-paper p-4 rounded border border-hairline space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-ink uppercase">ORIGINAL OVEN TIME:</span>
                <span className="font-bold text-accent text-sm">{ovenMinutes} MINS</span>
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
              <div className="flex justify-between text-[10px] text-ink-subtle">
                <span>5 MINS</span>
                <span>25 MINS (Avg)</span>
                <span>60 MINS</span>
              </div>
            </div>
          </div>

          {/* Air Fryer Converted Output Specimen */}
          <div className="bg-paper p-5 rounded border-2 border-ink flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="grid grid-cols-3 gap-4 w-full md:w-auto flex-1 text-center">
              <div className="bg-paper-100 p-3 rounded border border-hairline">
                <span className="text-[9px] uppercase tracking-wider text-ink-subtle block">AIR FRYER TEMP</span>
                <span className="text-xl sm:text-2xl font-black text-ink">{afTemp}°{unit}</span>
                <span className="text-[9px] text-accent font-bold block mt-0.5">-25°F RULE</span>
              </div>

              <div className="bg-paper-100 p-3 rounded border border-hairline">
                <span className="text-[9px] uppercase tracking-wider text-ink-subtle block">AIR FRYER TIME</span>
                <span className="text-xl sm:text-2xl font-black text-ink">{afMinTime}–{afMaxTime}m</span>
                <span className="text-[9px] text-accent font-bold block mt-0.5">-20% TIME</span>
              </div>

              <div className="bg-paper-100 p-3 rounded border border-hairline">
                <span className="text-[9px] uppercase tracking-wider text-ink-subtle block">MIDPOINT FLIP</span>
                <span className="text-xl sm:text-2xl font-black text-accent">@ {afFlipTime}m</span>
                <span className="text-[9px] text-ink-muted block mt-0.5">SHAKE BASKET</span>
              </div>
            </div>

            <Link
              href="/air-fryer-calculator"
              className="px-4 py-2 bg-ink text-paper rounded text-xs font-bold uppercase hover:bg-accent transition-colors shrink-0 flex items-center gap-1"
            >
              <span>Full Converter Engine</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      )}

      {/* ── TAB 2: STEAK PULL TEMP GUIDE ── */}
      {activeEngine === 'steak-pull' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cut Thickness */}
            <div className="bg-paper p-4 rounded border border-hairline space-y-2">
              <label className="text-xs font-bold text-ink uppercase block">
                STEAK THICKNESS:
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {([1, 1.5, 2] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSteakThickness(t)}
                    className={`py-2 rounded border font-bold cursor-pointer transition-all ${
                      steakThickness === t
                        ? 'bg-ink text-paper border-ink'
                        : 'bg-paper-100 hover:bg-paper-200 text-ink border-hairline'
                    }`}
                  >
                    {t}&quot; THICK
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-ink-subtle block">
                Thicker steaks carry higher thermal mass and rise 7–10°F during rest.
              </span>
            </div>

            {/* Target Doneness */}
            <div className="bg-paper p-4 rounded border border-hairline space-y-2">
              <label className="text-xs font-bold text-ink uppercase block">
                DESIRED FINAL DONENESS:
              </label>
              <div className="grid grid-cols-4 gap-1.5 text-xs">
                {(['rare', 'med-rare', 'medium', 'med-well'] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setTargetDoneness(d)}
                    className={`py-2 rounded border font-bold uppercase cursor-pointer text-[10px] transition-all ${
                      targetDoneness === d
                        ? 'bg-accent text-white border-accent'
                        : 'bg-paper-100 hover:bg-paper-200 text-ink border-hairline'
                    }`}
                  >
                    {d.replace('-', ' ')}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-ink-subtle block">
                {donenessData[targetDoneness].desc}
              </span>
            </div>
          </div>

          {/* Pull Temp Result Matrix */}
          <div className="bg-paper p-5 rounded border-2 border-ink flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] text-ink-subtle uppercase font-bold">
                THERMOMETER PULL INSTRUCTION
              </span>
              <div className="text-2xl sm:text-3xl font-black text-accent">
                PULL AT {pullTemp}°F (RISES TO {donenessData[targetDoneness].final}°F)
              </div>
              <p className="text-xs text-ink-muted font-sans">
                Remove steak from heat immediately when probe hits {pullTemp}°F. Rest on cutting board for {steakThickness === 1 ? '5' : '8'} minutes before slicing.
              </p>
            </div>

            <Link
              href="/internal-temp"
              className="px-4 py-2 bg-ink text-paper rounded text-xs font-bold uppercase hover:bg-accent transition-colors shrink-0 flex items-center gap-1"
            >
              <span>Full Temp Guide</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      )}

      {/* ── TAB 3: TAKEOUT CRISP REVIVE ── */}
      {activeEngine === 'takeout-revive' && (
        <div className="space-y-6">
          {/* Item Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {Object.keys(reviveGuides).map((key) => {
              const item = reviveGuides[key];
              const isSelected = reviveItem === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setReviveItem(key)}
                  className={`px-3 py-1.5 rounded border transition-all cursor-pointer font-bold uppercase shrink-0 ${
                    isSelected
                      ? 'bg-accent text-white border-accent'
                      : 'bg-paper hover:bg-paper-200 border-hairline text-ink'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Revive Result Card */}
          {(() => {
            const cur = reviveGuides[reviveItem];
            return (
              <div className="bg-paper p-5 rounded border-2 border-ink space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-accent">REVIVE PROTOCOL</span>
                    <h3 className="text-xl font-black text-ink uppercase font-sans">{cur.name}</h3>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-paper-200 border border-hairline rounded text-ink self-start sm:self-auto">
                    HARDWARE: {cur.appliance.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                  <div className="bg-paper-100 p-3 rounded border border-hairline">
                    <span className="text-[9px] uppercase text-ink-subtle block">SET TEMP</span>
                    <span className="text-lg font-black text-ink">{cur.temp}</span>
                  </div>
                  <div className="bg-paper-100 p-3 rounded border border-hairline">
                    <span className="text-[9px] uppercase text-ink-subtle block">DURATION</span>
                    <span className="text-lg font-black text-accent">{cur.time}</span>
                  </div>
                  <div className="bg-paper-100 p-3 rounded border border-hairline col-span-2 sm:col-span-1">
                    <span className="text-[9px] uppercase text-ink-subtle block">DONENESS CUE</span>
                    <span className="text-xs font-bold text-ink block mt-1">{cur.cue}</span>
                  </div>
                </div>

                <div className="text-xs font-sans text-ink-muted bg-paper-100 p-3 rounded border border-hairline/60">
                  <strong className="text-ink font-mono uppercase">Why it works:</strong> {cur.tip}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ── TAB 4: MEAT MATH SCALER ── */}
      {activeEngine === 'meat-math' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Adults */}
            <div className="bg-paper p-4 rounded border border-hairline space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-ink uppercase">ADULTS:</span>
                <span className="font-bold text-accent text-sm">{adults}</span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
              />
            </div>

            {/* Kids */}
            <div className="bg-paper p-4 rounded border border-hairline space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-ink uppercase">KIDS:</span>
                <span className="font-bold text-accent text-sm">{kids}</span>
              </div>
              <input
                type="range"
                min={0}
                max={15}
                value={kids}
                onChange={(e) => setKids(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
              />
            </div>

            {/* Protein Selector */}
            <div className="bg-paper p-4 rounded border border-hairline space-y-2">
              <label className="text-xs font-bold text-ink uppercase block">CUT TYPE:</label>
              <select
                value={meatCut}
                onChange={(e) => setMeatCut(e.target.value)}
                className="w-full bg-paper-100 border border-hairline rounded p-2 text-xs font-bold text-ink uppercase focus:outline-none"
              >
                {Object.keys(meatFactors).map((k) => (
                  <option key={k} value={k}>
                    {meatFactors[k].name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Meat Math Output Card */}
          <div className="bg-paper p-5 rounded border-2 border-ink flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full sm:w-auto flex-1 text-center">
              <div className="bg-paper-100 p-3 rounded border border-hairline">
                <span className="text-[9px] uppercase tracking-wider text-ink-subtle block">RAW TO BUY</span>
                <span className="text-xl sm:text-2xl font-black text-accent">{rawPurchaseWeight} LBS</span>
                <span className="text-[9px] text-ink-muted block mt-0.5">BUTCHER COUNTER</span>
              </div>

              <div className="bg-paper-100 p-3 rounded border border-hairline">
                <span className="text-[9px] uppercase tracking-wider text-ink-subtle block">COOKED YIELD</span>
                <span className="text-xl sm:text-2xl font-black text-ink">{cookedYieldWeight} LBS</span>
                <span className="text-[9px] text-ink-muted block mt-0.5">ON THE TABLE</span>
              </div>

              <div className="bg-paper-100 p-3 rounded border border-hairline col-span-2 sm:col-span-1">
                <span className="text-[9px] uppercase tracking-wider text-ink-subtle block">SHRINK / BONE</span>
                <span className="text-xl sm:text-2xl font-black text-ink">-{factor.shrinkLossPct}%</span>
                <span className="text-[9px] text-ink-muted block mt-0.5">ACCOUNTED FOR</span>
              </div>
            </div>

            <Link
              href="/meat-math"
              className="px-4 py-2 bg-ink text-paper rounded text-xs font-bold uppercase hover:bg-accent transition-colors shrink-0 flex items-center gap-1"
            >
              <span>Full Meat Math</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
