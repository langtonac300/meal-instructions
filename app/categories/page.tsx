import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { RECIPES } from '@/data/recipes';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Recipe Categories',
  description:
    'Every recipe category on Meal Instructions — 15-minute meals, high-protein, kid-approved, and more. No fluff, just the instructions.',
  alternates: {
    canonical: absoluteUrl('/categories'),
  },
};

export default function CategoriesIndexPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Recipe Categories', path: '/categories' },
  ]);

  return (
    <main className="max-w-[1000px] mx-auto px-5 sm:px-10 pt-14 pb-16 text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <h1 className="font-sans text-[34px] sm:text-[46px] font-black tracking-[-0.02em] leading-[1.05] uppercase">
        Recipe categories
      </h1>
      <p className="mt-[18px] text-[19px] sm:text-[21px] leading-[1.5] text-ink-muted max-w-[56ch]">
        Every category on the site, each one opening the full list of verified meals in it.
      </p>

      <ul className="mt-10 border-t border-ink">
        {CATEGORIES.map((cat) => {
          const count = RECIPES.filter((r) => (r.categories as string[]).includes(cat.slug)).length;
          return (
            <li key={cat.slug} className="border-b border-hairline">
              <Link
                href={`/categories/${cat.slug}`}
                className="flex items-center gap-4 sm:gap-7 py-5 -mx-3 px-3 hover:bg-paper-50 transition-colors group"
              >
                <div className="relative w-[88px] h-[60px] sm:w-[120px] sm:h-[80px] shrink-0 bg-paper-200 overflow-hidden">
                  {cat.image && (
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[21px] sm:text-[26px] font-bold tracking-[-0.01em] leading-tight group-hover:text-accent transition-colors">
                    {cat.name}
                  </div>
                  <p className="mt-1 text-[16px] sm:text-[17px] leading-[1.5] text-ink-muted">
                    {cat.shortDescription}
                  </p>
                  <span className="sm:hidden block mt-1.5 font-mono text-[15px] text-ink-muted">
                    {count} meals
                  </span>
                </div>
                <span className="hidden sm:inline font-mono text-[17px] text-ink-muted whitespace-nowrap shrink-0">
                  {count} meals
                </span>
                <ArrowRight
                  className="hidden sm:block w-[18px] h-[18px] text-ink-muted shrink-0 group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
