'use client';

import React, { useEffect } from 'react';
import { Zap, BookOpen } from 'lucide-react';

export type RecipeMode = 'quick' | 'detailed';

interface RecipeModeSwitchProps {
  mode: RecipeMode;
  onChange: (mode: RecipeMode) => void;
}

export default function RecipeModeSwitch({ mode, onChange }: RecipeModeSwitchProps) {
  useEffect(() => {
    const saved = localStorage.getItem('dad_recipe_mode');
    if (saved === 'quick' || saved === 'detailed') {
      onChange(saved);
    }
  }, [onChange]);

  const handleSelect = (newMode: RecipeMode) => {
    onChange(newMode);
    localStorage.setItem('dad_recipe_mode', newMode);
  };

  return (
    <div className="w-full my-6 p-1.5 bg-paper-200 rounded-lg border border-hairline select-none">
      <div className="text-[10px] font-mono uppercase tracking-widest text-ink-muted px-2 py-1 flex items-center justify-between">
        <span>CHOOSE YOUR COOKING MODE:</span>
        <span className="text-[9px] text-ink-subtle">PREFERENCE SAVED AUTOMATICALLY</span>
      </div>

      <div className="grid grid-cols-2 gap-1.5 mt-1">
        {/* Quick Mode Button */}
        <button
          type="button"
          onClick={() => handleSelect('quick')}
          className={`flex flex-col items-center sm:items-start p-3 rounded-md transition-all cursor-pointer text-left ${
            mode === 'quick'
              ? 'bg-paper-50 border border-ink/20 shadow-subtle text-ink ring-1 ring-accent/30'
              : 'bg-transparent text-ink-muted hover:text-ink hover:bg-paper-100/60'
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`p-1 rounded ${
                mode === 'quick' ? 'bg-accent text-white' : 'bg-paper-300 text-ink-muted'
              }`}
            >
              <Zap className="w-4 h-4" />
            </div>
            <span className="font-mono font-bold text-xs sm:text-sm tracking-wider uppercase text-ink">
              GET TO THE POINT
            </span>
          </div>
          <span className="text-[11px] text-ink-muted mt-1 hidden sm:block">
            Ultra-concise telegram format. Temp, time, flip marker, zero fluff.
          </span>
        </button>

        {/* Detailed Mode Button */}
        <button
          type="button"
          onClick={() => handleSelect('detailed')}
          className={`flex flex-col items-center sm:items-start p-3 rounded-md transition-all cursor-pointer text-left ${
            mode === 'detailed'
              ? 'bg-paper-50 border border-ink/20 shadow-subtle text-ink ring-1 ring-accent/30'
              : 'bg-transparent text-ink-muted hover:text-ink hover:bg-paper-100/60'
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`p-1 rounded ${
                mode === 'detailed' ? 'bg-ink text-paper' : 'bg-paper-300 text-ink-muted'
              }`}
            >
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="font-mono font-bold text-xs sm:text-sm tracking-wider uppercase text-ink">
              STEP-BY-STEP
            </span>
          </div>
          <span className="text-[11px] text-ink-muted mt-1 hidden sm:block">
            Fluff-free guided instructions with doneness cues and pro dad tips.
          </span>
        </button>
      </div>
    </div>
  );
}
