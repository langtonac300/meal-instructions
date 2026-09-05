'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell, X, Volume2 } from 'lucide-react';
import { track } from '@/lib/analytics';

interface KitchenTimerProps {
  initialMinutes?: number;
  label?: string;
  autoStart?: boolean;
  onClose?: () => void;
}

export default function KitchenTimer({
  initialMinutes = 10,
  label = 'Air Fryer Timer',
  autoStart = false,
  onClose,
}: KitchenTimerProps) {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [secondsRemaining, setSecondsRemaining] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isFinished, setIsFinished] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  // Guards the completion event: the tick writes isFinished from inside a state
  // updater, which React invokes twice under StrictMode in dev.
  const completionLogged = useRef(false);

  useEffect(() => {
    if (!isFinished) {
      completionLogged.current = false;
      return;
    }
    if (completionLogged.current) return;
    completionLogged.current = true;
    track('cook_complete', { label, minutes: Math.round(totalSeconds / 60) });
  }, [isFinished, label, totalSeconds]);

  // Sync if initialMinutes changes
  useEffect(() => {
    setTotalSeconds(initialMinutes * 60);
    setSecondsRemaining(initialMinutes * 60);
    setIsFinished(false);
  }, [initialMinutes]);

  // Timer Tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsRemaining]);

  // Synthesize Kitchen Bell Chime with Web Audio API (Zero external assets needed)
  const playChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      const now = ctx.currentTime;
      // Tone 1: High Bell (880Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now);
      gain1.gain.setValueAtTime(0.4, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 1.2);

      // Tone 2: Harmonic Bell (1320Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1320, now + 0.15);
      gain2.gain.setValueAtTime(0.3, now + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.15);
      osc2.stop(now + 1.5);
    } catch (e) {
      console.log('Audio chime error:', e);
    }
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const progress = totalSeconds > 0 ? ((totalSeconds - secondsRemaining) / totalSeconds) * 100 : 0;

  const handleReset = () => {
    setIsRunning(false);
    setSecondsRemaining(totalSeconds);
    setIsFinished(false);
  };

  const addTime = (mins: number) => {
    track('timer_extend', { minutes: mins, label });
    setTotalSeconds((prev) => prev + mins * 60);
    setSecondsRemaining((prev) => prev + mins * 60);
    setIsFinished(false);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 bg-paper-50 border border-hairline rounded-lg shadow-float p-4 w-72 sm:w-80 transition-all font-mono select-none ${
        isFinished ? 'ring-2 ring-accent animate-bounce' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-hairline pb-2 mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isRunning ? 'bg-accent animate-ping' : isFinished ? 'bg-accent' : 'bg-ink-muted'
            }`}
          />
          <span className="text-[10px] uppercase font-bold tracking-wider text-ink truncate max-w-[170px]">
            {label}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={playChime}
            title="Test Sound"
            className="p-1 hover:bg-paper-200 rounded text-ink-muted hover:text-ink transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-paper-200 rounded text-ink-muted hover:text-ink transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Countdown Display */}
      <div className="text-center my-2">
        <div
          className={`text-4xl sm:text-5xl font-black tracking-tight ${
            isFinished ? 'text-accent animate-pulse' : 'text-ink'
          }`}
        >
          {formattedTime}
        </div>
        {isFinished && (
          <div className="text-xs font-bold text-accent uppercase tracking-widest mt-1">
            ⚡ TIME’S UP! CHECK FOOD!
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-paper-200 h-1.5 rounded-full overflow-hidden my-3">
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Quick Add Buttons */}
      <div className="flex items-center justify-between gap-1 mb-3 text-[10px]">
        <button
          onClick={() => addTime(1)}
          className="flex-1 py-1 rounded bg-paper-200/80 hover:bg-paper-300 text-ink"
        >
          +1 MIN
        </button>
        <button
          onClick={() => addTime(2)}
          className="flex-1 py-1 rounded bg-paper-200/80 hover:bg-paper-300 text-ink"
        >
          +2 MIN
        </button>
        <button
          onClick={() => addTime(5)}
          className="flex-1 py-1 rounded bg-paper-200/80 hover:bg-paper-300 text-ink"
        >
          +5 MIN
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            const next = !isRunning;
            track(next ? 'cook_start' : 'cook_pause', {
              label,
              minutes: Math.round(totalSeconds / 60),
              remaining: secondsRemaining,
            });
            setIsRunning(next);
          }}
          className={`flex-1 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
            isRunning
              ? 'bg-amber-600 hover:bg-amber-700 text-white'
              : 'bg-ink hover:bg-accent text-paper'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>PAUSE</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>{secondsRemaining === totalSeconds ? 'START TIMER' : 'RESUME'}</span>
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="p-2 rounded bg-paper-200 hover:bg-paper-300 text-ink"
          title="Reset"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
