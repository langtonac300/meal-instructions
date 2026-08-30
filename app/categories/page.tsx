import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { RECIPES } from '@/data/recipes';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Recipe Categories',
  description:
    'Every recipe category on Meal Instructions — 15-minute meals, high-protein, kid-approved, and more. No fluff, just the instructions.',
  alternates: {
    canonical: absoluteUrl('/categories'),
  },
};

export default function CategoriesIndexPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
      <div className="mb-8 sm:mb-10">
        <div className="text-[11px] font-mono uppercase tracking-widest text-ink-subtle mb-2">
          Directory
        </div>
        <h1 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-ink">
          Recipe categories
        </h1>
        <p className="mt-3 text-ink-muted max-w-2xl">
          Every category on the site, each linking to the full list of verified
          meals in it.
        </p>
      </div>

      <ul className="divide-y divide-hairline border-t border-b border-hairline">
        {CATEGORIES.map((cat) => {
          const count = RECIPES.filter((r) =>
            (r.categories as string[]).includes(cat.slug)
          ).length;
          return (
            <li key={cat.slug}>
              <Link
                href={`/categories/${cat.slug}`}
                className="flex items-center justify-between gap-4 py-4 sm:py-5 group hover:bg-paper-50 -mx-2 sm:-mx-3 px-2 sm:px-3 rounded"
              >
                <div className="min-w-0">
                  <div className="text-base sm:text-lg font-semibold text-ink group-hover:text-accent transition-colors">
                    {cat.name}
                  </div>
                  <p className="text-sm text-ink-muted mt-0.5 line-clamp-1">
                    {cat.shortDescription}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-xs text-ink-subtle">
                    {count} meals
                  </span>
                  <ArrowRight className="w-4 h-4 text-ink-subtle group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
