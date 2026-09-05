import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { RECIPES } from '@/data/recipes';
import { PANTRY_GROUPS, PANTRY_ITEMS } from '@/data/pantry';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import { pantryIndex } from '@/lib/pantry-index';
import { basicsFor, labelFor, MAX_MISSING, MIN_ASK } from '@/lib/pantry-match';
import PantryMatcher from '@/components/PantryMatcher';

export const metadata: Metadata = {
  title: 'What Can I Make With What I Have? — Pantry Recipe Finder',
  description: `Tick the meat, produce, spices, and condiments in your kitchen and see which of ${RECIPES.length} verified meals you can cook tonight, plus what you'd need to grab for the near-misses.`,
  alternates: {
    canonical: absoluteUrl('/what-can-i-make'),
  },
};

/** How the matching decides. Each row is a rule in lib/pantry-match.ts. */
const rules = (basics: string) => [
  {
    title: 'Protein first, because it changes the most',
    body: 'One tap on chicken cuts the list to the chicken meals. No chicken tapped means no chicken meals. A thigh recipe stays in view for someone with breasts, marked as short the thighs.',
  },
  {
    title: 'Then whatever splits what is left',
    body: `The next chips are the ingredients used by closest to half of the meals still in play, so each tap moves the most meals. Nothing used by fewer than ${MIN_ASK} meals is ever asked about; it shows up as a named gap instead.`,
  },
  {
    title: 'The basics are assumed',
    body: `Anything in a quarter or more of the recipes — ${basics} — is ticked from the start. Untap what you're out of and the count adjusts.`,
  },
  {
    title: 'Anything the dish is named for is non-negotiable',
    body:
      'No lemon, no lemon garlic butter shrimp. Everything else is leeway: a meal missing up to ' +
      `${MAX_MISSING} supporting ingredients still shows, with the gaps listed. Whether no mayo is a problem is your call.`,
  },
  {
    title: 'Swaps count',
    body: 'Garlic powder stands in for fresh garlic, lime for lemon, neutral oil for olive oil, yogurt for sour cream. A swap never hides a meal.',
  },
  {
    title: 'It remembers',
    body: 'Your taps are saved on this device. Next time it asks one question: same fridge as last time?',
  },
];

const RELATED = [
  {
    title: 'Emergency substitutions',
    description: 'No buttermilk, no cornstarch, no eggs: exact ratios for what you do have',
    href: '/substitutions',
  },
  {
    title: 'Cook it from frozen',
    description: 'Forgot to thaw? What is safe to cook straight from the freezer',
    href: '/frozen-cook',
  },
  {
    title: 'Recipes by category',
    description: '15-minute, kid-approved, high-protein, one-pan',
    href: '/categories',
  },
];

export default function WhatCanIMakePage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'What can I make?', path: '/what-can-i-make' },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'What Can I Make? — Pantry Recipe Finder',
    url: absoluteUrl('/what-can-i-make'),
    description: `Match ${RECIPES.length} verified recipes against the ${PANTRY_ITEMS.length} ingredients you tick as in your kitchen.`,
    applicationCategory: 'CulinaryApplication',
    operatingSystem: 'All',
  };

  const index = pantryIndex();
  const basics = basicsFor(index);
  const basicsText = basics
    .map((id) =>
      labelFor(id)
        .replace(/\s*\([^)]*\)\s*$/, '')
        .toLowerCase(),
    )
    .join(', ');

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
          What can I make?
        </h1>
        <p className="mt-[18px] text-[19px] sm:text-[21px] leading-[1.5] text-ink-muted max-w-[58ch]">
          Tap the protein, answer a question or two, and the meals you can cook tonight are counted
          as you go. The basics are assumed, the gaps are named, and you can stop the moment the
          number looks good.
        </p>
        <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-subtle">
          {RECIPES.length} meals · {PANTRY_ITEMS.length} ingredients on {PANTRY_GROUPS.length}{' '}
          shelves · {basics.length} assumed · saved on this device
        </p>
      </header>

      {/* ── The tool ── */}
      <PantryMatcher recipes={index} basics={basics} />

      {/* ── How it decides ── */}
      <section className="pt-14" aria-labelledby="rules-heading">
        <h2
          id="rules-heading"
          className="text-[24px] font-extrabold tracking-[-0.01em] uppercase mb-4"
        >
          How it decides
        </h2>
        <ol className="border-t border-ink">
          {rules(basicsText).map((rule, i) => (
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
          When the fridge loses
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
