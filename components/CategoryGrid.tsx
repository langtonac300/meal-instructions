'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/data/categories';
import { RECIPES } from '@/data/recipes';

interface CategoryGridProps {
  onSelectCategory?: (slug: string) => void;
  selectedCategory?: string;
}

export default function CategoryGrid({ onSelectCategory, selectedCategory }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {CATEGORIES.map((cat) => {
        const recipeCount = RECIPES.filter((r) =>
          (r.categories as string[]).includes(cat.slug)
        ).length;
        const isSelected = selectedCategory === cat.slug;

        return (
          <div
            key={cat.slug}
            onClick={() => onSelectCategory && onSelectCategory(isSelected ? 'all' : cat.slug)}
            className={`group relative bg-paper-card hairline-border overflow-hidden cursor-pointer transition-all duration-200 flex flex-col justify-between ${
              isSelected ? 'ring-2 ring-ink border-transparent' : 'hover:border-ink/60'
            }`}
          >
            {/* Image Thumbnail */}
            {cat.image ? (
              <div className="relative w-full h-24 sm:h-28 overflow-hidden bg-paper-200">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
                <span className="absolute bottom-2 left-2 text-[9px] font-mono font-bold uppercase tracking-wider text-paper bg-ink/80 px-1.5 py-0.5 rounded">
                  {recipeCount} {recipeCount === 1 ? 'Meal' : 'Meals'}
                </span>
              </div>
            ) : (
              <div className="w-full h-24 bg-paper-200 flex items-center justify-center font-mono text-[10px] text-ink-muted uppercase">
                {recipeCount} Meals
              </div>
            )}

            {/* Content & Label */}
            <div className="p-2.5 space-y-1">
              <h4 className="font-sans text-xs sm:text-sm font-bold uppercase text-ink group-hover:text-accent transition-colors leading-tight line-clamp-1">
                {cat.name.replace(' Staples', '').replace(' Meals', '')}
              </h4>
              <p className="text-[10px] text-ink-muted line-clamp-1 font-mono uppercase tracking-wider">
                {cat.heroTag}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
