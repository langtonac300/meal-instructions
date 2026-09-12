import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Cpu, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { RECIPES } from '@/data/recipes';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Recipe Categories — Intent & Weeknight Constraints | Meal Instructions',
  description:
    'Explore verified weeknight meals organized by real kitchen constraints: 15-minute speed, kid-approved, one-pan cleanup, budget staples, and high protein. No fluff, exact instructions.',
  alternates: {
    canonical: absoluteUrl('/categories'),
  },
  openGraph: {
    title: 'Recipe Categories | Meal Instructions',
    description: 'Every recipe category organized by practical intent and weeknight constraints.',
    url: absoluteUrl('/categories'),
  },
};

const categoryFaqs = [
  {
    q: 'How are recipe categories structured differently from cooking appliances?',
    a: 'Categories on Meal Instructions define real-world intent and kitchen constraints (such as 15-minute speed, one-pan cleanup, kid modifications, or budget limits). In contrast, appliances (such as air fryer, cast iron, smoker, and grill) define cooking physics and thermodynamic transfer. This strict taxonomy prevents duplicate content and helps cooks find meals based on either their available time or their countertop equipment.',
  },
  {
    q: 'What qualifies a meal for the "15-Minute Meals" category?',
    a: 'Every recipe in the 15-Minute category is physically clocked from the moment the refrigerator door opens to hot dinner on the table in 15 minutes or less. This includes high-efficiency pan-sears, rapid air fryer proteins, pre-cut sheet pan meals, and quick-simmer skillet sauces tested under weeknight household conditions.',
  },
  {
    q: 'How is nutritional data calculated for High-Protein and Budget recipes?',
    a: 'Nutrition is never derived from algorithmic guesswork or arbitrary macros. Macro values are calculated from USDA FoodData Central reference values based on exact portion weights. Budget staples are benchmarked against standardized grocery staple costs without requiring specialty or imported pantry items.',
  },
  {
    q: 'How are "Kid & Toddler Approved" adaptations tested?',
    a: 'Every recipe featuring a kid-approved tag includes explicit authoring notes for plain-flavor modifications, sauce-on-the-side plating, and texture adjustments. These adaptations allow parents to cook a single meal for the entire family without preparing separate dishes.',
  },
  {
    q: 'Where can I view the complete, unfiltered list of all recipes?',
    a: 'You can explore our entire catalog of 228 verified dinners in our Master Recipe Library at /recipes, which includes interactive filters for cooking speed, protein type, and appliance hardware.',
  },
];

export default function CategoriesIndexPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Recipe Categories', path: '/categories' },
  ]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: categoryFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <main className="max-w-[1000px] mx-auto px-5 sm:px-10 pt-14 pb-16 text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-ink-subtle mb-2">
        Taxonomy // Intent &amp; Constraints
      </div>
      <h1 className="font-sans text-[34px] sm:text-[46px] font-black tracking-[-0.02em] leading-[1.05] uppercase">
        Recipe Categories
      </h1>
      <p className="mt-[18px] text-[19px] sm:text-[21px] leading-[1.5] text-ink-muted max-w-[65ch]">
        Browse our verified dinner library by weeknight constraints — whether you have 15 minutes before bedtime, need zero sink cleanup, or are feeding picky kids.
      </p>

      {/* Directory Routing Guide */}
      <div className="mt-8 p-5 bg-paper-50 border border-hairline grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/recipes"
          className="flex items-start gap-3 p-3 bg-paper border border-hairline hover:border-ink transition-colors group"
        >
          <BookOpen className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <div>
            <div className="text-[15px] font-bold uppercase tracking-tight group-hover:text-accent transition-colors">
              Master Recipe Library ({RECIPES.length} Meals) →
            </div>
            <p className="text-[13px] text-ink-muted mt-1 leading-snug">
              Search and filter all recipes with sortable cook times, temperatures, and protein grams.
            </p>
          </div>
        </Link>
        <Link
          href="/appliances"
          className="flex items-start gap-3 p-3 bg-paper border border-hairline hover:border-ink transition-colors group"
        >
          <Cpu className="w-5 h-5 text-ink shrink-0 mt-0.5" />
          <div>
            <div className="text-[15px] font-bold uppercase tracking-tight group-hover:text-accent transition-colors">
              Appliance Reference Matrix →
            </div>
            <p className="text-[13px] text-ink-muted mt-1 leading-snug">
              Browse by cooking hardware: air fryer, cast iron, smoker, grill, sheet pan, and more.
            </p>
          </div>
        </Link>
      </div>

      {/* Category List */}
      <ul className="mt-12 border-t border-ink">
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

      {/* Frequently Asked Questions */}
      <section className="mt-20 border-t border-ink pt-12" aria-labelledby="categories-faq-heading">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Taxonomy &amp; Methodology</span>
        </div>
        <h2 id="categories-faq-heading" className="text-[28px] font-black uppercase tracking-tight text-ink">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-[16px] text-ink-muted max-w-[70ch]">
          Understanding how meals are authored, categorized, and tested on Meal Instructions.
        </p>

        <div className="mt-8 border-t border-hairline divide-y divide-hairline">
          {categoryFaqs.map((faq, idx) => (
            <div key={idx} className="py-6 space-y-2">
              <h3 className="text-[18px] sm:text-[20px] font-bold text-ink leading-snug">
                {faq.q}
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-ink-muted max-w-[85ch]">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
