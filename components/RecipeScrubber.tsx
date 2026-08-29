'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { RECIPES } from '@/data/recipes';
import { Recipe } from '@/lib/types';

interface RecipeScrubberProps {
  onSelectRecipe?: (recipe: Recipe) => void;
  activeRecipeId?: string;
}

export default function RecipeScrubber({ onSelectRecipe, activeRecipeId }: RecipeScrubberProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sliderPos, setSliderPos] = useState(0); // 0 to 100%
  const trackRef = useRef<HTMLDivElement>(null);

  const activeRecipe = hoveredIndex !== null ? RECIPES[hoveredIndex] : RECIPES[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = x / rect.width;
    const index = Math.min(Math.floor(percentage * RECIPES.length), RECIPES.length - 1);
    setHoveredIndex(index);
    setSliderPos(percentage * 100);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="w-full bg-paper-100 border-y border-hairline py-4 px-4 sm:px-8 select-none">
      <div className="max-w-7xl mx-auto">
        {/* Scrubber Label & Active Preview */}
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-ink mb-2">
          <div className="flex items-center gap-3">
            <span className="text-accent font-bold">
              {activeRecipe ? `INDEX [ ${activeRecipe.id} ]` : 'INDEX BROWSER'}
            </span>
            <span className="text-hairline-dark/30 hidden sm:inline">—</span>
            <span className="text-ink font-semibold truncate max-w-[240px] sm:max-w-md">
              {activeRecipe ? activeRecipe.title : 'HOVER OR DRAG TO SCRUB RECIPES'}
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-[10px] text-ink-muted">
            <span className="hidden md:inline">{activeRecipe.cookTemp}</span>
            <span className="hidden md:inline">•</span>
            <span>{activeRecipe.totalMinutes} MINS</span>
            <Link
              href={`/recipes/${activeRecipe.slug}`}
              className="px-2 py-0.5 bg-ink text-paper rounded text-[9px] hover:bg-accent transition-colors"
            >
              VIEW RECIPE →
            </Link>
          </div>
        </div>

        {/* The Kellerstöckl-inspired Tick Track */}
        <div
          ref={trackRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-12 bg-paper-200/60 rounded border border-hairline cursor-ew-resize flex items-center px-1 group overflow-hidden"
        >
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:8px_8px]" />

          {/* Scrubber Ticks */}
          <div className="relative w-full h-full flex items-center justify-between">
            {RECIPES.map((recipe, index) => {
              const isMajor = index % 5 === 0;
              const isHovered = hoveredIndex === index;
              return (
                <Link
                  key={recipe.id}
                  href={`/recipes/${recipe.slug}`}
                  className="h-full flex flex-col justify-center items-center px-0.5 flex-1 relative group/tick"
                  title={`${recipe.id}: ${recipe.title}`}
                >
                  <div
                    className={`w-[1.5px] rounded-full transition-all duration-150 ${
                      isHovered
                        ? 'h-8 bg-accent scale-150 z-20'
                        : isMajor
                        ? 'h-5 bg-ink-muted group-hover/tick:h-7 group-hover/tick:bg-ink'
                        : 'h-2.5 bg-hairline-dark/30 group-hover/tick:h-4 group-hover/tick:bg-ink'
                    }`}
                  />
                  {isMajor && (
                    <span className="absolute bottom-0.5 text-[8px] font-mono text-ink-subtle opacity-70 hidden sm:block">
                      {recipe.id}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Slider Cursor Indicator */}
          {hoveredIndex !== null && (
            <div
              className="absolute top-0 bottom-0 pointer-events-none transition-all duration-75 flex flex-col items-center"
              style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-1.5 h-1.5 bg-accent rounded-full -mt-0.5" />
              <div className="w-[1.5px] h-full bg-accent/80" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
