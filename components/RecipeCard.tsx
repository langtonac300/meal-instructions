'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Recipe } from '@/lib/types';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const getApplianceColor = (appliance: string) => {
    switch (appliance) {
      case 'air-fryer':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'sheet-pan':
        return 'bg-paper-200 text-ink border-hairline';
      case 'cast-iron':
        return 'bg-zinc-200 text-zinc-800 border-zinc-300';
      default:
        return 'bg-paper-200 text-ink border-hairline';
    }
  };

  return (
    <article className="group relative bg-paper-50 hover:bg-paper-100 border border-hairline hover:border-ink/40 transition-all duration-200 rounded p-5 flex flex-col justify-between shadow-subtle hover:shadow-card">
      <div>
        {/* Top Architectural Number & Appliance */}
        <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-ink-muted mb-3">
          <span className="font-bold text-ink group-hover:text-accent transition-colors">
            {recipe.id}
          </span>
          <span
            className={`text-[9px] uppercase px-2 py-0.5 rounded border font-mono font-semibold ${getApplianceColor(
              recipe.appliance
            )}`}
          >
            {recipe.appliance.replace('-', ' ')}
          </span>
        </div>

        {/* Title */}
        <Link href={`/recipes/${recipe.slug}`} className="block focus:outline-none">
          <h3 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-ink group-hover:text-accent transition-colors leading-snug">
            {recipe.title}
          </h3>
        </Link>

        {/* Tagline */}
        <p className="text-xs sm:text-sm text-ink-muted mt-2 line-clamp-2 leading-relaxed">
          {recipe.tagline}
        </p>

        {/* Fast Specs Matrix */}
        <div className="mt-4 pt-3 border-t border-hairline grid grid-cols-3 gap-2 text-center font-mono">
          <div className="bg-paper-100 p-1.5 rounded border border-hairline/60">
            <span className="block text-[8px] uppercase tracking-wider text-ink-subtle">TEMP</span>
            <span className="text-[11px] font-bold text-ink">{recipe.cookTemp.split(' ')[0]}</span>
          </div>

          <div className="bg-paper-100 p-1.5 rounded border border-hairline/60">
            <span className="block text-[8px] uppercase tracking-wider text-ink-subtle">TIME</span>
            <span className="text-[11px] font-bold text-ink">{recipe.totalMinutes} MIN</span>
          </div>

          <div className="bg-paper-100 p-1.5 rounded border border-hairline/60">
            <span className="block text-[8px] uppercase tracking-wider text-ink-subtle">PROTEIN</span>
            <span className="text-[11px] font-bold text-accent">
              {recipe.nutrition?.proteinGrams ?? 30}G
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer & Action */}
      <div className="mt-4 pt-3 border-t border-hairline/60 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-ink-muted text-[10px]">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-700" />
          <span>{recipe.difficulty}</span>
        </div>

        <Link
          href={`/recipes/${recipe.slug}`}
          className="inline-flex items-center gap-1 text-ink font-semibold group-hover:text-accent transition-colors text-[10px] tracking-wider uppercase"
        >
          <span>DIRECTIONS</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
