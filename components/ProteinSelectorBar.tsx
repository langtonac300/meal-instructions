'use client';

import React from 'react';
import {
  LeanChickenIcon,
  LeanBeefIcon,
  LeanPorkIcon,
  LeanFishIcon,
  LeanTurkeyIcon,
  LeanLambIcon,
  LeanVegetarianIcon,
  LeanDairyEggsIcon,
  LeanAllProteinsIcon,
} from '@/components/icons/Lean5SIcons';
import { RECIPES } from '@/data/recipes';
import { ProteinType } from '@/lib/types';

export interface ProteinOption {
  slug: 'all' | ProteinType;
  label: string;
  sublabel?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export const PROTEIN_OPTIONS: ProteinOption[] = [
  { slug: 'all', label: 'All Cuts', sublabel: 'Complete Index', icon: LeanAllProteinsIcon },
  { slug: 'chicken', label: 'Chicken', sublabel: 'Poultry', icon: LeanChickenIcon },
  { slug: 'beef', label: 'Beef', sublabel: 'Steaks & Ground', icon: LeanBeefIcon },
  { slug: 'pork', label: 'Pork', sublabel: 'Chops & Bacon', icon: LeanPorkIcon },
  { slug: 'seafood', label: 'Seafood', sublabel: 'Fish & Shrimp', icon: LeanFishIcon },
  { slug: 'turkey', label: 'Turkey', sublabel: 'Lean Poultry', icon: LeanTurkeyIcon },
  { slug: 'lamb', label: 'Lamb', sublabel: 'Chops & Roasts', icon: LeanLambIcon },
  { slug: 'vegetarian', label: 'Plant / Veg', sublabel: 'Meatless', icon: LeanVegetarianIcon },
  { slug: 'dairy-eggs', label: 'Dairy & Eggs', sublabel: 'Fast Skillets', icon: LeanDairyEggsIcon },
];

interface ProteinSelectorBarProps {
  selectedProtein: string;
  onSelectProtein: (protein: string) => void;
  className?: string;
}

export default function ProteinSelectorBar({
  selectedProtein,
  onSelectProtein,
  className = '',
}: ProteinSelectorBarProps) {
  return (
    <div className={`w-full bg-paper hairline-b ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3">
        {/* Top Section Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-bold text-ink">PRIMARY PROTEIN SELECTOR</span>
            <span className="hidden md:inline text-ink-muted/60">— FILTER BY WHAT&apos;S IN YOUR FRIDGE</span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted">
            {selectedProtein === 'all'
              ? `SHOWING ALL ${RECIPES.length} MEALS`
              : `FILTERED: ${selectedProtein.toUpperCase()}`}
          </span>
        </div>

        {/* Tactile Protein Specimen Cards Carousel / Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none">
          {PROTEIN_OPTIONS.map((opt) => {
            const isSelected = selectedProtein === opt.slug;
            const Icon = opt.icon;
            const count =
              opt.slug === 'all'
                ? RECIPES.length
                : RECIPES.filter((r) => r.protein === opt.slug).length;

            if (count === 0 && opt.slug !== 'all') return null;

            return (
              <button
                key={opt.slug}
                type="button"
                onClick={() => onSelectProtein(isSelected && opt.slug !== 'all' ? 'all' : opt.slug)}
                className={`group shrink-0 flex items-center gap-2.5 px-3 py-2 rounded border transition-all duration-150 cursor-pointer select-none font-mono ${
                  isSelected
                    ? 'bg-ink text-paper border-ink shadow-sm ring-1 ring-ink'
                    : 'bg-paper-card hover:bg-paper-200 border-hairline text-ink hover:border-ink/60'
                }`}
                title={`Filter recipes by ${opt.label}`}
              >
                <div
                  className={`p-1 rounded transition-colors ${
                    isSelected
                      ? 'text-accent bg-paper/10'
                      : 'text-ink-muted group-hover:text-ink'
                  }`}
                >
                  <Icon size={20} />
                </div>
                
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                      {opt.label}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1 py-0.2 rounded ${
                        isSelected
                          ? 'bg-accent text-white'
                          : 'bg-paper-200 text-ink-subtle group-hover:text-ink'
                      }`}
                    >
                      {count}
                    </span>
                  </div>
                  {opt.sublabel && (
                    <span
                      className={`block text-[9px] uppercase tracking-tight hidden sm:block ${
                        isSelected ? 'text-paper/70' : 'text-ink-muted/70'
                      }`}
                    >
                      {opt.sublabel}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
