'use client';

import React, { useState, useEffect } from 'react';
import { EGG_DONENESS_PROFILES, EggDonenessProfile } from '@/data/tools-data';
import { Clock, Play, Pause, RotateCcw, Sparkles, Snowflake, Flame } from 'lucide-react';

export default function BoiledEggTimer() {
  const [selectedDonenessId, setSelectedDonenessId] = useState<string>(EGG_DONENESS_PROFILES[1].id); // Jammy 6.5
  const [eggSize, setEggSize] = useState<'medium' | 'large' | 'xl' | 'jumbo'>('large');
  const [startingTemp, setStartingTemp] = useState<'fridge' | 'room'>('fridge');
  const [cookMethod, setCookMethod] = useState<'boil' | 'steam' | 'air-fryer'>('boil');

  const activeDoneness =
    EGG_DONENESS_PROFILES.find((p) => p.id === selectedDonenessId) ||
    EGG_DONENESS_PROFILES[1];

  // Base cook time in minutes:
  let baseMinutes = activeDoneness.boilTimeMins;
  if (cookMethod === 'steam') baseMinutes = activeDoneness.steamTimeMins;
  if (cookMethod === 'air-fryer') baseMinutes = activeDoneness.airFryerTimeMins;

  // Size modifiers:
  let sizeModifier = 0;
  if (eggSize === 'medium') sizeModifier = -0.5;
  if (eggSize === 'xl') sizeModifier = 0.5;
  if (eggSize === 'jumbo') sizeModifier = 1.0;

  // Temp modifier (room temp eggs cook faster):
  const tempModifier = startingTemp === 'room' ? -1.0 : 0;

  const totalCalculatedMinutes = Math.max(3.0, baseMinutes + sizeModifier + tempModifier);
  const totalSeconds = Math.round(totalCalculatedMinutes * 60);

  // Live Timer State
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(totalSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    setTimerSecondsLeft(totalSeconds);
    setIsRunning(false);
  }, [totalSeconds]);

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
      {/* 1. Visual Doneness Selector */}
      <div className="space-y-2">
        <div className="micro-label text-ink-muted">1. CHOOSE YOLK TEXTURE:</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {EGG_DONENESS_PROFILES.map((profile) => {
            const isSelected = profile.id === selectedDonenessId;
            return (
              <button
                key={profile.id}
                onClick={() => setSelectedDonenessId(profile.id)}
                className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[85px] ${
                  isSelected
                    ? 'bg-paper-card border-2 border-ink shadow-subtle'
                    : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
                }`}
              >
                <div>
                  <span className={`font-bold font-sans text-xs sm:text-sm ${isSelected ? 'text-ink' : ''}`}>
                    {profile.name.split('(')[0]}
                  </span>
                  <div className="text-[10px] text-ink-muted mt-0.5 line-clamp-1">{profile.yolkState}</div>
                </div>
                <span className="text-[10px] text-accent font-bold mt-2">
                  {profile.boilTimeMins} min baseline
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Configuration Grid */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          {/* Method */}
          <div className="space-y-2">
            <label className="font-bold text-ink uppercase">COOK METHOD:</label>
            <div className="flex flex-col gap-1.5">
              {[
                { id: 'boil', label: 'Boiling Water (Gentle Boil)' },
                { id: 'steam', label: 'Steamer Basket' },
                { id: 'air-fryer', label: 'Air Fryer @ 270°F' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setCookMethod(m.id as any)}
                  className={`p-2 text-left font-bold transition-colors cursor-pointer ${
                    cookMethod === m.id
                      ? 'bg-ink text-paper'
                      : 'bg-paper hairline-border text-ink-muted hover:text-ink'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="space-y-2">
            <label className="font-bold text-ink uppercase">EGG SIZE:</label>
            <div className="flex flex-col gap-1.5">
              {[
                { id: 'medium', label: 'Medium' },
                { id: 'large', label: 'Large (Standard USDA)' },
                { id: 'xl', label: 'Extra Large' },
                { id: 'jumbo', label: 'Jumbo' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setEggSize(s.id as any)}
                  className={`p-2 text-left font-bold transition-colors cursor-pointer ${
                    eggSize === s.id
                      ? 'bg-ink text-paper'
                      : 'bg-paper hairline-border text-ink-muted hover:text-ink'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Starting Temp */}
          <div className="space-y-2">
            <label className="font-bold text-ink uppercase">STARTING TEMP:</label>
            <div className="flex flex-col gap-1.5">
              {[
                { id: 'fridge', label: 'Cold From Refrigerator (38°F)' },
                { id: 'room', label: 'Room Temperature (70°F)' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setStartingTemp(t.id as any)}
                  className={`p-2 text-left font-bold transition-colors cursor-pointer ${
                    startingTemp === t.id
                      ? 'bg-ink text-paper'
                      : 'bg-paper hairline-border text-ink-muted hover:text-ink'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Live Countdown Timer & Output Display */}
        <div className="bg-paper hairline-border p-6 sm:p-8 flex flex-col items-center justify-center space-y-4 border-2 border-ink">
          <div className="micro-label text-accent font-bold">
            CALIBRATED TIMER // {activeDoneness.name.toUpperCase()}
          </div>
          
          <div className="text-6xl sm:text-7xl font-bold font-mono text-ink tracking-tight">
            {formattedTime}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-6 py-2.5 bg-ink text-paper font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent transition-colors flex items-center gap-2 cursor-pointer"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'PAUSE' : 'START TIMER'}</span>
            </button>

            <button
              onClick={() => {
                setIsRunning(false);
                setTimerSecondsLeft(totalSeconds);
              }}
              className="px-4 py-2.5 bg-paper hairline-border font-mono text-xs font-bold text-ink uppercase tracking-wider hover:border-ink transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET</span>
            </button>
          </div>
        </div>

        {/* 4. Mandatory Ice Bath Protocol */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-paper hairline-border p-4 space-y-2 border-l-4 border-l-accent">
            <div className="flex items-center gap-1.5 font-bold text-accent uppercase">
              <Snowflake className="w-4 h-4" />
              <span>MANDATORY ICE BATH (3–5 MINS):</span>
            </div>
            <p className="text-ink-muted font-sans text-xs leading-relaxed">
              Transfer eggs immediately to a 50/50 ice and water bath the second timer beeps. Rapid thermal shock halts carryover cooking and causes the egg to shrink slightly inside the shell for effortless peeling.
            </p>
          </div>

          <div className="bg-paper hairline-border p-4 space-y-2 border-l-4 border-l-ink">
            <div className="micro-label text-ink font-bold">BEST APPLICATION</div>
            <p className="text-ink-muted font-sans text-xs leading-relaxed">
              {activeDoneness.bestApplication}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
