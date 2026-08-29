'use client';

import React from 'react';
import { Users } from 'lucide-react';

interface PortionScalerProps {
  currentServings: number;
  baseServings: number;
  onChange: (servings: number) => void;
}

export default function PortionScaler({
  currentServings,
  baseServings,
  onChange,
}: PortionScalerProps) {
  const options = [2, 4, 6, 8];

  return (
    <div className="flex items-center gap-2 font-mono text-xs select-none">
      <div className="flex items-center gap-1 text-ink-muted text-[10px] uppercase tracking-wider">
        <Users className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">SERVINGS:</span>
      </div>

      <div className="flex items-center bg-paper-200 p-0.5 rounded border border-hairline">
        {options.map((count) => {
          const isActive = currentServings === count;
          return (
            <button
              key={count}
              type="button"
              onClick={() => onChange(count)}
              className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                isActive
                  ? 'bg-ink text-paper shadow-sm'
                  : 'text-ink-muted hover:text-ink hover:bg-paper-100'
              }`}
            >
              {count}
              {count === 8 && <span className="hidden md:inline ml-0.5 text-[8px] text-accent">★</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
