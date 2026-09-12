import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Flame, ShieldCheck, Zap, Sparkles, Filter } from 'lucide-react';
import { RECIPES } from '@/data/recipes';
import { CATEGORIES } from '@/data/categories';
import { APPLIANCES } from '@/data/appliances';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import RecipeTable from '@/components/RecipeTable';

export const metadata: Metadata = {
  title: `The Complete No-Fluff Recipe Library (${RECIPES.length} Verified Meals)`,
  description: `Browse all ${RECIPES.length} individually tested, fluff-free dinners. Exact temperatures, cook times, flip marks, and portion scalers for air fryer, cast iron, skillet, sheet pan, and Instant Pot.`,
  alternates: {
    canonical: absoluteUrl('/recipes'),
  },
  openGraph: {
    title: `The Complete No-Fluff Recipe Library (${RECIPES.length} Verified Meals)`,
    description: `All ${RECIPES.length} verified recipes with exact times, temperatures, and zero life stories.`,
    url: absoluteUrl('/recipes'),
  },
};

const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-ink-subtle';

export default function RecipesIndexPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Recipes', path: '/recipes' }]);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'The Complete No-Fluff Recipe Library',
    description: `Comprehensive database of ${RECIPES.length} individually tested, fluff-free recipes engineered for busy parents and weeknight cooks.`,
    url: absoluteUrl('/recipes'),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: RECIPES.length,
      itemListElement: RECIPES.map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: r.title,
        url: absoluteUrl(`/recipes/${r.slug}`),
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes Meal Instructions recipes different from food blogs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Zero blog stories, popups, or filler. Every recipe provides an immediate executive brief (cook temperature, flip mark, internal pull target) followed by step-by-step instructions. Both Quick Mode and Detailed Mode exist in server-rendered HTML for instant loading.',
        },
      },
      {
        '@type': 'Question',
        name: 'How are cook times and temperatures verified?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every recipe is tested on real consumer kitchen hardware (such as 6-quart air fryers, 12-inch cast iron skillets, and standard ovens) using calibrated instant-read thermometers to reach USDA Food Safety and Inspection Service (FSIS) minimum safe internal temperatures.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I scale portion sizes for my family?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Every recipe page features an integrated portion scaler (0.5x, 1x, 1.5x, 2x) that automatically recalculates exact ingredient quantities with proper unit conversions without causing layout shifts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are all recipes kid-tested?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Each meal includes a dedicated "Kid & Toddler Adjustment" field with plain-flavor variations, sauce-on-the-side suggestions, and deconstruction tips so parents never have to cook two separate meals.',
        },
      },
    ],
  };

  // Speed highlights
  const fastest = [...RECIPES].sort((a, b) => a.totalMinutes - b.totalMinutes).slice(0, 4);
  // High-protein highlights
  const highestProtein = [...RECIPES]
    .filter((r) => (r.nutrition?.proteinGrams ?? 0) > 35)
    .sort((a, b) => (b.nutrition?.proteinGrams ?? 0) - (a.nutrition?.proteinGrams ?? 0))
    .slice(0, 4);

  return (
    <div className="max-w-[1100px] mx-auto px-5 sm:px-10 pt-12 pb-20 text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb */}
      <div className="flex items-center justify-between font-mono text-[12px] uppercase tracking-[0.08em] text-ink-muted mb-6">
        <Link href="/" className="inline-flex items-center gap-1.5 hover:text-ink transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Home</span>
        </Link>
        <span>DATABASE // {RECIPES.length} VERIFIED MEALS</span>
      </div>

      {/* Header */}
      <header className="border-b border-ink pb-8">
        <div className={EYEBROW}>THE COMPLETE SPECIFICATION REPOSITORY</div>
        <h1 className="mt-2 font-sans text-[36px] sm:text-[50px] font-black tracking-[-0.02em] leading-[1.05] uppercase">
          Master Recipe Library
        </h1>
        <p className="mt-4 text-[19px] sm:text-[21px] leading-[1.5] text-ink-muted max-w-[65ch]">
          {RECIPES.length} verified, fluff-free dinners. Every single recipe has been individually tested on real kitchen hardware, verified for USDA internal safety, and engineered for minimal dirty dishes.
        </p>

        {/* High-level category pill navigation */}
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="px-3 py-1.5 text-[13px] font-mono uppercase bg-paper border border-hairline hover:border-ink hover:bg-paper-100 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </header>

      {/* Testing Standard & Editorial Manifesto */}
      <section className="mt-12 bg-paper-card border border-hairline p-6 sm:p-8 font-sans">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Our Technical Standard</span>
        </div>
        <h2 className="text-[22px] sm:text-[26px] font-extrabold tracking-[-0.01em] uppercase text-ink">
          Zero Hallucinations. Zero Filler. 100% Tested Execution.
        </h2>
        <p className="mt-3 text-[16px] text-ink-muted leading-[1.6] max-w-[80ch]">
          Every recipe published in this library is governed by strict physics-based constraints. We do not generate recipes algorithmically, we do not guess cooking times, and we never extrapolate nutrition. Cook times specify testing basis hardware (e.g. 6-quart basket air fryer, seasoned cast iron skillet), internal temperatures follow USDA pasteurization standards, and portion scalers calculate actual physical ratios.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-hairline pt-6 font-mono text-xs">
          <div>
            <span className="block font-bold text-ink uppercase">1. Dual-Mode SSR Delivery</span>
            <span className="text-ink-muted">Switch seamlessly between &ldquo;Get to the Point&rdquo; and &ldquo;Step by Step&rdquo; modes without layout shifts or reload latency.</span>
          </div>
          <div>
            <span className="block font-bold text-ink uppercase">2. Single-Vessel Architecture</span>
            <span className="text-ink-muted">Engineered for a single sheet pan, one skillet, or one air fryer basket. Zero multi-pot choreography.</span>
          </div>
          <div>
            <span className="block font-bold text-ink uppercase">3. Kid-Tested Adaptations</span>
            <span className="text-ink-muted">Every meal includes plain-flavor tweaks and deconstruction notes so you cook once for the entire family.</span>
          </div>
        </div>
      </section>

      {/* Curated Highlights Grid */}
      <section className="mt-14 space-y-10">
        <div>
          <div className="flex items-baseline justify-between border-b border-ink pb-3 mb-6">
            <h2 className="text-[22px] font-extrabold tracking-[-0.01em] uppercase">
              ⚡ Ultra-Fast: Ready in 15 Minutes or Less
            </h2>
            <Link href="/categories/15-minute" className="font-mono text-xs font-bold text-accent uppercase hover:underline">
              View All 15-Min Meals →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fastest.map((r) => (
              <Link
                key={r.id}
                href={`/recipes/${r.slug}`}
                className="p-4 bg-paper border border-hairline hover:border-ink transition-colors flex flex-col justify-between group"
              >
                <div>
                  <span className="font-mono text-[11px] text-ink-subtle block uppercase mb-1">#{r.id} · {r.appliance.replace(/-/g, ' ')}</span>
                  <h3 className="text-[17px] font-bold leading-tight group-hover:text-accent transition-colors">{r.title}</h3>
                </div>
                <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between font-mono text-xs text-ink-muted">
                  <span>{r.cookTemp.split(' ')[0]}</span>
                  <span className="font-bold text-ink">{r.totalMinutes} MINS</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between border-b border-ink pb-3 mb-6">
            <h2 className="text-[22px] font-extrabold tracking-[-0.01em] uppercase">
              🥩 High-Protein Anchors (35g+ per serving)
            </h2>
            <Link href="/categories/high-protein" className="font-mono text-xs font-bold text-accent uppercase hover:underline">
              View All High-Protein Meals →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {highestProtein.map((r) => (
              <Link
                key={r.id}
                href={`/recipes/${r.slug}`}
                className="p-4 bg-paper border border-hairline hover:border-ink transition-colors flex flex-col justify-between group"
              >
                <div>
                  <span className="font-mono text-[11px] text-ink-subtle block uppercase mb-1">#{r.id} · {r.protein}</span>
                  <h3 className="text-[17px] font-bold leading-tight group-hover:text-accent transition-colors">{r.title}</h3>
                </div>
                <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between font-mono text-xs text-ink-muted">
                  <span className="text-accent font-bold">{r.nutrition?.proteinGrams}g Protein</span>
                  <span>{r.totalMinutes} MINS</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Full Interactive Table Directory */}
      <section className="mt-16 space-y-4" id="all-recipes">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink pb-3">
          <div>
            <h2 className="text-[24px] font-black tracking-[-0.01em] uppercase">
              All {RECIPES.length} Recipes
            </h2>
            <p className="text-[14px] text-ink-muted mt-0.5">
              Click any column header to sort by cooking time, protein content, temperature, or recipe title.
            </p>
          </div>
        </div>

        <RecipeTable recipes={RECIPES} />
      </section>

      {/* Recipe Library FAQs (Schema-backed) */}
      <section className="mt-20 border-t border-ink pt-12 space-y-6">
        <h2 className="text-[26px] font-extrabold uppercase tracking-tight">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqSchema.mainEntity.map((faq, i) => (
            <div key={i} className="border-b border-hairline pb-6">
              <h3 className="font-bold text-[18px] text-ink mb-2">
                {faq.name}
              </h3>
              <p className="text-[15px] leading-[1.6] text-ink-muted">
                {faq.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
