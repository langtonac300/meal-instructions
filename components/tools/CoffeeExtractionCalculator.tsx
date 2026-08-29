'use client';

import React, { useState, useEffect } from 'react';
import { COFFEE_EXTRACTION_PROFILES, CoffeeExtractionProfile } from '@/data/tools-data';
import { Coffee, Droplets, Thermometer, Clock, Play, Pause, RotateCcw, Scale } from 'lucide-react';

export default function CoffeeExtractionCalculator() {
  const [selectedProfileId, setSelectedProfileId] = useState<string>(COFFEE_EXTRACTION_PROFILES[0].id);
  const [waterVolumeMl, setWaterVolumeMl] = useState<number>(500);

  const activeProfile =
    COFFEE_EXTRACTION_PROFILES.find((p) => p.id === selectedProfileId) ||
    COFFEE_EXTRACTION_PROFILES[0];

  // Calculations
  // coffee grams = (waterVolumeMl / 1000) * defaultRatioGramsPerLiter
  const doseGrams = Math.round(((waterVolumeMl / 1000) * activeProfile.defaultRatioGramsPerLiter) * 10) / 10;
  const bloomWaterGrams = Math.round(doseGrams * 3);

  // Live Timer
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(activeProfile.brewTimeSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    setTimerSecondsLeft(activeProfile.brewTimeSeconds);
    setIsRunning(false);
  }, [activeProfile]);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerSecondsLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timerSecondsLeft]);

  const minsDisplay = Math.floor(timerSecondsLeft / 60);
  const secsDisplay = timerSecondsLeft % 60;
  const formattedTime = `${minsDisplay}:${secsDisplay < 10 ? '0' : ''}${secsDisplay}`;

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Method Selector */}
      <div className="space-y-2">
        <div className="micro-label text-ink-muted">1. CHOOSE EXTRACTION METHOD:</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {COFFEE_EXTRACTION_PROFILES.map((prof) => {
            const isSelected = prof.id === selectedProfileId;
            return (
              <button
                key={prof.id}
                onClick={() => setSelectedProfileId(prof.id)}
                className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[75px] ${
                  isSelected
                    ? 'bg-paper-card border-2 border-ink shadow-subtle'
                    : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
                }`}
              >
                <span className={`font-bold font-sans text-xs ${isSelected ? 'text-ink' : ''}`}>
                  {prof.name.split('(')[0]}
                </span>
                <span className="text-[10px] text-accent font-bold mt-2">
                  {prof.waterTempF}°F
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Water / Liquid Volume Slider */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        <div className="bg-paper hairline-border p-4 space-y-2 font-mono text-xs">
          <div className="flex justify-between items-center">
            <label className="font-bold text-ink uppercase">WATER VOLUME TO BREW:</label>
            <span className="text-xl font-bold text-accent">
              {waterVolumeMl} ML (~{(waterVolumeMl / 240).toFixed(1)} CUPS)
            </span>
          </div>
          <input
            type="range"
            min="200"
            max="1200"
            step="50"
            value={waterVolumeMl}
            onChange={(e) => setWaterVolumeMl(Number(e.target.value))}
            className="w-full accent-accent cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-ink-subtle">
            <span>200 ml (1 Mug)</span>
            <span>500 ml (Standard Chemex/Press)</span>
            <span>1000 ml (Full Liter Carafe)</span>
          </div>
        </div>

        {/* 3. Output Requirements Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Coffee / Tea Dose */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono border-2 border-ink">
            <div className="micro-label text-accent font-bold flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-accent" />
              {activeProfile.beverageType === 'coffee' ? 'COFFEE DOSE' : 'TEA LEAF DOSE'}
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              {doseGrams}g
            </div>
            <div className="text-[11px] text-ink-muted pt-1">
              {activeProfile.ratioDisplay}
            </div>
          </div>

          {/* Water Temperature */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-accent" />
              WATER TEMPERATURE
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              {activeProfile.waterTempF}°F
            </div>
            <div className="text-[11px] text-accent font-bold pt-1">
              ({activeProfile.waterTempC}°C) Target Kettle Temp
            </div>
          </div>

          {/* Grind Size */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted">GRIND SIZE SPEC</div>
            <div className="text-xl sm:text-2xl font-bold text-ink truncate">
              {activeProfile.grindSize.split('(')[0]}
            </div>
            <div className="text-[11px] text-ink-subtle pt-1 truncate">
              {activeProfile.grindSize}
            </div>
          </div>

        </div>

        {/* 4. Live Countdown Extraction Timer */}
        <div className="bg-paper hairline-border p-6 flex flex-col items-center justify-center space-y-3 font-mono border-2 border-ink">
          <div className="micro-label text-accent font-bold">
            EXTRACTION TIMER ({activeProfile.brewTimeSeconds} SECONDS)
          </div>
          <div className="text-5xl sm:text-6xl font-bold text-ink">
            {formattedTime}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-6 py-2 bg-ink text-paper font-mono text-xs font-bold uppercase hover:bg-accent transition-colors flex items-center gap-2 cursor-pointer"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'PAUSE' : 'START TIMER'}</span>
            </button>
            <button
              onClick={() => {
                setIsRunning(false);
                setTimerSecondsLeft(activeProfile.brewTimeSeconds);
              }}
              className="px-4 py-2 bg-paper hairline-border font-mono text-xs font-bold text-ink uppercase hover:border-ink transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET</span>
            </button>
          </div>
        </div>

        {/* Step-by-step key technique */}
        <div className="bg-paper hairline-border p-4 border-l-4 border-l-ink text-xs font-mono">
          <span className="font-bold uppercase text-ink">BREWING BLUEPRINT: </span>
          <span className="text-ink-muted font-sans">{activeProfile.stepByStepKey}</span>
        </div>

      </div>
    </div>
  );
}
