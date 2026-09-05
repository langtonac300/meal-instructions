import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/data/categories';
import { RECIPES } from '@/data/recipes';

/**
 * Display names shortened for scanning. The canonical names in
 * data/categories.ts still drive every category page and its metadata;
 * these only shorten the tile caption. Anything not listed falls back to
 * the full name.
 */
const SHORT_NAMES: Record<string, string> = {
  '15-minute': '15-Minute Meals',
  'high-protein': 'High Protein',
  'kid-approved': 'Kid Approved',
  'no-thaw': 'No-Thaw / Frozen',
  'one-pan': 'One-Pan & Sheet Pan',
  budget: 'Budget & Pantry',
  'five-ingredient': 'Five-Ingredient',
  sides: 'Rapid Sides',
  'game-day': 'Game Day',
  snacks: 'Late Night Snacks',
  breakfast: 'Weekend Breakfast',
  weekend: 'Weekend Projects',
};

/**
 * Twelve category tiles, each a plain navigation to /categories/{slug}.
 * Server component: no client state — the recipe directory lives on the
 * category pages, not here.
 */
export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {CATEGORIES.map((cat) => {
        const recipeCount = RECIPES.filter((r) =>
          (r.categories as string[]).includes(cat.slug)
        ).length;
        const name = SHORT_NAMES[cat.slug] ?? cat.name;

        return (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="group block bg-paper border border-hairline hover:border-ink transition-colors"
            aria-label={`${cat.name} — ${recipeCount} meals`}
          >
            <div className="relative w-full h-[150px] overflow-hidden bg-paper-200">
              {cat.image && (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 300px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
            <div className="px-4 py-3.5 flex items-baseline justify-between gap-2">
              <span className="text-[17px] font-bold text-ink leading-tight">{name}</span>
              <span className="font-mono text-[13px] text-ink-subtle shrink-0">{recipeCount}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
