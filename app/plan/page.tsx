import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { RECIPES } from '@/data/recipes';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import { MAX_PLAN_ITEMS, type PlannerRecipe } from '@/lib/plan';
import PlanBuilder from '@/components/PlanBuilder';

export const metadata: Metadata = {
  title: 'Plan Your Week of Dinners — Straight Onto Your Calendar',
  description: `Pick what you are cooking for the next ${MAX_PLAN_ITEMS} nights and push it to Google Calendar. Each night arrives with the ingredients, the temperature, and the short version of the steps.`,
  alternates: {
    canonical: absoluteUrl('/plan'),
  },
};

/** How it behaves, stated before anyone connects an account. */
const RULES = [
  {
    title: 'The event ends at dinner time',
    body: 'It starts when the cooking has to start — prep, cook, and rest, read from the recipe. An event that merely begins at 6:30 tells you nothing you did not already know.',
  },
  {
    title: 'Its own calendar, not your main one',
    body: 'Meals land on a separate "Meal Instructions" calendar this site creates. That is the only calendar it can see. Delete it in Google and every planned dinner goes with it.',
  },
  {
    title: 'Pressing it twice is safe',
    body: 'Nights are matched by date. Re-syncing updates the events already there instead of stacking a second copy of Tuesday, and swapping a meal edits that night in place.',
  },
  {
    title: 'The whole recipe travels with it',
    body: 'Ingredients, temperature, internal temp, and the short version of the steps are in the event description — so the calendar entry is useful in the shop and at the stove.',
  },
];

const RELATED = [
  {
    title: 'What can I make?',
    description: 'Tick what is in the house and see tonight from what you already have',
    href: '/what-can-i-make',
  },
  {
    title: 'Multi-appliance dinner sync',
    description: 'Get the protein, the vegetables, and the carbs finishing at the same minute',
    href: '/dinner-sync',
  },
  {
    title: 'Recipes by category',
    description: '15-minute, kid-approved, high-protein, one-pan',
    href: '/categories',
  },
];

/**
 * The planner only needs timing and identity per meal. Shipping the whole
 * record — every ingredient, every step — would put the entire recipe corpus
 * in the browser bundle to populate a dropdown.
 */
function toPlannerRecipe(): PlannerRecipe[] {
  return RECIPES.map((r) => ({
    slug: r.slug,
    title: r.title,
    totalMinutes: r.totalMinutes,
    prepMinutes: r.prepMinutes,
    cookMinutes: r.cookMinutes,
    restMinutes: r.restMinutes,
    appliance: r.appliance,
    protein: r.protein,
    categories: r.categories,
    difficulty: r.difficulty,
  })).sort((a, b) => a.title.localeCompare(b.title));
}

export default function PlanPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Plan the week', path: '/plan' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Meal Planner — Dinners Straight Onto Your Calendar',
    url: absoluteUrl('/plan'),
    description: `Plan up to ${MAX_PLAN_ITEMS} nights from ${RECIPES.length} verified meals and write them to Google Calendar with the full recipe attached.`,
    applicationCategory: 'CulinaryApplication',
    operatingSystem: 'All',
  };

  const recipes = toPlannerRecipe();

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-10 pb-16 text-ink text-[15px] leading-[1.5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <header className="pt-14 pb-8">
        <h1 className="font-sans text-[34px] sm:text-[46px] font-black tracking-[-0.02em] leading-[1.05] uppercase max-w-[20ch]">
          Plan the week
        </h1>
        <p className="mt-[18px] text-[19px] sm:text-[21px] leading-[1.5] text-ink-muted max-w-[58ch]">
          Pick what you&rsquo;re cooking, say when you eat, and put the lot on your calendar —
          each night carrying the ingredients, the temperature, and the steps.
        </p>
        <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-subtle">
          {RECIPES.length} meals · up to {MAX_PLAN_ITEMS} nights · its own Google calendar
        </p>
      </header>

      {/* useSearchParams reads the OAuth round trip's result, so the builder
          needs a boundary to stream behind rather than forcing the whole page
          to render on demand. */}
      <Suspense
        fallback={<div className="border-t border-ink py-8 text-ink-muted">Loading the planner…</div>}
      >
        <PlanBuilder recipes={recipes} />
      </Suspense>

      {/* ── How it behaves ── */}
      <section className="pt-14" aria-labelledby="rules-heading">
        <h2
          id="rules-heading"
          className="text-[24px] font-extrabold tracking-[-0.01em] uppercase mb-4"
        >
          How it behaves
        </h2>
        <ol className="border-t border-ink">
          {RULES.map((rule, i) => (
            <li key={rule.title} className="flex gap-6 py-[18px] border-b border-hairline">
              <span
                className={`font-mono text-[14px] font-bold w-[2em] shrink-0 ${
                  i === 0 ? 'text-accent' : 'text-ink-subtle'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-[19px] font-bold leading-tight">{rule.title}</h3>
                <p className="mt-1 text-[16px] leading-[1.55] text-ink-muted max-w-[70ch]">
                  {rule.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Related ── */}
      <section className="pt-14" aria-labelledby="related-heading">
        <h2
          id="related-heading"
          className="text-[24px] font-extrabold tracking-[-0.01em] uppercase mb-4"
        >
          Before you plan
        </h2>
        <ul className="border-t border-ink">
          {RELATED.map((ref) => (
            <li key={ref.href} className="border-b border-hairline">
              <Link
                href={ref.href}
                className="flex items-center justify-between gap-6 py-[18px] group"
              >
                <span>
                  <span className="block text-[20px] font-semibold group-hover:text-accent transition-colors">
                    {ref.title}
                  </span>
                  <span className="block mt-0.5 text-[16px] text-ink-muted">{ref.description}</span>
                </span>
                <ArrowRight
                  className="w-[18px] h-[18px] text-ink-muted shrink-0 group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
