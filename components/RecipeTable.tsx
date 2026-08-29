'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpDown, ArrowRight } from 'lucide-react';
import { Recipe } from '@/lib/types';
import { LeanHeatWavesIcon, LeanClockIcon, LeanForkIcon, LeanIcon } from './icons/Lean5SIcons';

interface RecipeTableProps {
  recipes: Recipe[];
}

export default function RecipeTable({ recipes }: RecipeTableProps) {
  const [sortField, setSortField] = useState<'id' | 'title' | 'time' | 'protein' | 'temp'>('id');
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (field: 'id' | 'title' | 'time' | 'protein' | 'temp') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
    }
  };

  const sortedRecipes = [...recipes].sort((a, b) => {
    let comp = 0;
    if (sortField === 'id') comp = a.id.localeCompare(b.id);
    if (sortField === 'title') comp = a.title.localeCompare(b.title);
    if (sortField === 'time') comp = a.totalMinutes - b.totalMinutes;
    if (sortField === 'protein') {
      const pA = a.nutrition?.proteinGrams ?? 0;
      const pB = b.nutrition?.proteinGrams ?? 0;
      comp = pA - pB;
    }
    if (sortField === 'temp') comp = a.cookTempF - b.cookTempF;
    return sortAsc ? comp : -comp;
  });

  return (
    <div className="w-full overflow-x-auto bg-paper-50 border border-hairline rounded shadow-subtle">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-hairline bg-paper-200/70 text-[10px] uppercase font-mono tracking-widest text-ink">
            <th
              className="py-3 px-4 cursor-pointer hover:text-accent select-none"
              onClick={() => handleSort('id')}
            >
              <div className="flex items-center gap-1">
                <span>INDEX #</span>
                <ArrowUpDown className="w-3 h-3 text-ink-subtle" />
              </div>
            </th>
            <th
              className="py-3 px-4 cursor-pointer hover:text-accent select-none"
              onClick={() => handleSort('title')}
            >
              <div className="flex items-center gap-1">
                <span>RECIPE TITLE</span>
                <ArrowUpDown className="w-3 h-3 text-ink-subtle" />
              </div>
            </th>
            <th className="py-3 px-4 select-none">APPLIANCE</th>
            <th
              className="py-3 px-4 cursor-pointer hover:text-accent select-none text-right"
              onClick={() => handleSort('temp')}
            >
              <div className="flex items-center justify-end gap-1.5">
                <LeanHeatWavesIcon size={14} className="text-accent" />
                <span>TEMP</span>
                <ArrowUpDown className="w-3 h-3 text-ink-subtle" />
              </div>
            </th>
            <th
              className="py-3 px-4 cursor-pointer hover:text-accent select-none text-right"
              onClick={() => handleSort('time')}
            >
              <div className="flex items-center justify-end gap-1.5">
                <LeanClockIcon size={14} className="text-ink-subtle" />
                <span>TIME</span>
                <ArrowUpDown className="w-3 h-3 text-ink-subtle" />
              </div>
            </th>
            <th
              className="py-3 px-4 cursor-pointer hover:text-accent select-none text-right"
              onClick={() => handleSort('protein')}
            >
              <div className="flex items-center justify-end gap-1.5">
                <LeanForkIcon size={14} className="text-accent" />
                <span>PROTEIN</span>
                <ArrowUpDown className="w-3 h-3 text-ink-subtle" />
              </div>
            </th>
            <th className="py-3 px-4 text-center">ACTION</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-hairline/60 font-mono text-xs">
          {sortedRecipes.map((recipe) => (
            <tr
              key={recipe.id}
              className="hover:bg-paper-100/90 transition-colors group cursor-pointer"
            >
              {/* ID */}
              <td className="py-3 px-4 font-bold text-ink group-hover:text-accent">
                {recipe.id}
              </td>

              {/* Title & Tagline */}
              <td className="py-3 px-4">
                <Link
                  href={`/recipes/${recipe.slug}`}
                  className="block font-sans font-semibold text-sm text-ink group-hover:text-accent transition-colors"
                >
                  {recipe.title}
                </Link>
                <span className="text-[11px] font-sans text-ink-muted line-clamp-1">
                  {recipe.tagline}
                </span>
              </td>

              {/* Appliance with 28x28 icon */}
              <td className="py-3 px-4">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] uppercase bg-paper border border-hairline text-ink">
                  <LeanIcon name={recipe.appliance} size={14} className="text-ink-muted" />
                  <span>{recipe.appliance.replace('-', ' ')}</span>
                </span>
              </td>

              {/* Temp */}
              <td className="py-3 px-4 text-right font-semibold text-ink">
                {recipe.cookTemp.split(' ')[0]}
              </td>

              {/* Time */}
              <td className="py-3 px-4 text-right text-ink">
                {recipe.totalMinutes}m
              </td>

              {/* Protein */}
              <td className="py-3 px-4 text-right font-bold text-accent">
                {recipe.nutrition?.proteinGrams ?? 30}g
              </td>

              {/* Action Link */}
              <td className="py-3 px-4 text-center">
                <Link
                  href={`/recipes/${recipe.slug}`}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-ink group-hover:text-accent uppercase hover:underline"
                >
                  <span>GO</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
