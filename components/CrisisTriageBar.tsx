'use client';

import React from 'react';
import {
  Flame,
  Zap,
  ShieldAlert,
  Sparkles,
  DollarSign,
  Utensils,
  Layers,
  HeartHandshake,
  Clock,
} from 'lucide-react';
import { RECIPES } from '@/data/recipes';

export interface CrisisPreset {
  id: string;
  title: string;
  subtitle: string;
  category?: string;
  maxMinutes?: number;
  fromFrozenOnly?: boolean;
  count: number;
}

interface CrisisTriageBarProps {
  activePreset: string | null;
  onSelectPreset: (preset: CrisisPreset | null) => void;
}

export default function CrisisTriageBar({
  activePreset,
  onSelectPreset,
}: CrisisTriageBarProps) {
  const presets: CrisisPreset[] = [
    {
      id: 'no-thaw',
      title: 'Forgot To Thaw',
      subtitle: 'Cook direct from frozen',
      category: 'no-thaw',
      fromFrozenOnly: true,
      count: RECIPES.filter((r) => (r.categories as string[]).includes('no-thaw') || r.fromFrozen?.supported).length,
    },
    {
      id: 'sub-15',
      title: 'Sub-15 Min Rush',
      subtitle: 'Dinner before meltdown',
      maxMinutes: 15,
      count: RECIPES.filter((r) => r.totalMinutes <= 15).length,
    },
    {
      id: 'picky-kids',
      title: 'Picky Eater Proof',
      subtitle: 'Zero table negotiation',
      category: 'kid-approved',
      count: RECIPES.filter((r) => (r.categories as string[]).includes('kid-approved')).length,
    },
    {
      id: 'one-pan',
      title: 'Zero Dish Duty',
      subtitle: 'Sheet pan & 1-skillet only',
      category: 'one-pan',
      count: RECIPES.filter((r) => (r.categories as string[]).includes('one-pan')).length,
    },
    {
      id: 'high-protein',
      title: 'High Protein (30g+)',
      subtitle: 'Pure muscle & satiety',
      category: 'high-protein',
      count: RECIPES.filter((r) => (r.categories as string[]).includes('high-protein')).length,
    },
    {
      id: 'budget',
      title: 'Under $12 Budget',
      subtitle: 'Pantry staple savings',
      category: 'budget',
      count: RECIPES.filter((r) => (r.categories as string[]).includes('budget')).length,
    },
  ];

  return (
    <div className="w-full bg-paper-100 border-b border-hairline py-3 px-4 sm:px-8 select-none">
      <div className="max-w-7xl mx-auto space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-bold text-ink">DINNER CRISIS TRIAGE</span>
            <span className="hidden md:inline text-ink-muted/70">— SELECT YOUR IMMEDIATE SITUATION</span>
          </div>
          {activePreset && (
            <button
              type="button"
              onClick={() => onSelectPreset(null)}
              className="text-[10px] font-mono font-bold text-accent hover:underline uppercase"
            >
              Reset Triage
            </button>
          )}
        </div>

        {/* Tactile Preset Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 font-mono">
          {presets.map((p) => {
            const isActive = activePreset === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectPreset(isActive ? null : p)}
                className={`p-2.5 rounded border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between group ${
                  isActive
                    ? 'bg-ink text-paper border-ink shadow-sm'
                    : 'bg-paper-card hover:bg-paper-200 border-hairline text-ink hover:border-ink/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider ${
                      isActive ? 'text-accent' : 'text-ink-subtle'
                    }`}
                  >
                    PRESET // 0{presets.indexOf(p) + 1}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      isActive ? 'bg-accent text-white' : 'bg-paper-200 text-ink-muted'
                    }`}
                  >
                    {p.count}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-bold font-sans uppercase tracking-tight line-clamp-1 group-hover:text-accent transition-colors">
                    {p.title}
                  </div>
                  <div
                    className={`text-[10px] truncate ${
                      isActive ? 'text-paper/70' : 'text-ink-muted'
                    }`}
                  >
                    {p.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
