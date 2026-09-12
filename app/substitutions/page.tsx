import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import IngredientSubstitutionsEngine from '@/components/tools/IngredientSubstitutionsEngine';
import { INGREDIENT_SUBSTITUTIONS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Emergency Kitchen Ingredient Substitutions Engine — Exact Conversion Ratios',
  description: 'Instant culinary substitutes for buttermilk, heavy cream, cornstarch, eggs in baking, baking powder, brown sugar, tomato paste, and mirin. Physical chemistry explanations and ratio math.',
  alternates: {
    canonical: absoluteUrl('/substitutions'),
  },
};

export default function SubstitutionsPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Emergency Kitchen Ingredient Substitutions Engine', path: '/substitutions' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Emergency Kitchen Ingredient Substitutions Engine',
    url: absoluteUrl('/substitutions'),
    description: 'Find physical cooking and baking substitutes with exact ratio formulas and chemistry explanations.',
    applicationCategory: 'CulinaryApplication',
    operatingSystem: 'All',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {/* Breadcrumb & Actions */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle no-print">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Tools</span>
        </Link>
        <PrintButton
          label="PRINT SUB GUIDE"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">PANTRY CHEMISTRY TRIAGE</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Kitchen Ingredient Substitution Engine
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Don't stop cooking for a missing ingredient. Reconstruct buttermilk with milk and acid, replace heavy cream with milk and butter emulsion, and substitute cornstarch with double flour.
        </p>
      </section>

      {/* Interactive Tool */}
      <IngredientSubstitutionsEngine />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED KITCHEN INGREDIENT SUBSTITUTIONS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Missing Ingredient</th>
                <th className="py-2">Emergency Replacement</th>
                <th className="py-2">Ratio / Formula</th>
                <th className="py-2">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {INGREDIENT_SUBSTITUTIONS.map((s) => (
                <tr key={s.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{s.missingIngredient}</td>
                  <td className="py-2 font-bold text-accent">{s.substituteSolution}</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{s.exactRatioFormula}</td>
                  <td className="py-2 uppercase text-[10px] text-ink-muted">{s.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Deep Dive & Pantry Chemistry */}
      <section className="space-y-8 font-sans">
        {/* Section 1: Acid-Base & Leavening Chemistry */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">REACTION STOICHIOMETRY &amp; PH ADJUSTMENT</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Pantry Chemistry: The Science of Emergency Kitchen Swaps
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              Culinary substitutions fail when cooks replace flavor without replicating <strong>physical functionality</strong>. In culinary chemistry, ingredients serve mechanical roles: acid-base gas leaveners, hygroscopic humectants, lipid emulsifiers, and starch gelatinizers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-ink pt-1">
              <div className="p-4 bg-paper border border-hairline space-y-1">
                <div className="font-bold text-accent">BUTTERMILK ACIDIFICATION:</div>
                <p className="font-sans text-xs text-ink-muted leading-relaxed">
                  Whole milk has a neutral pH of ~6.7. Adding 1 tbsp lemon juice or white vinegar per cup lowers the pH to ~4.5 (the isoelectric point of casein). This curdles milk proteins into a thick suspension and provides the acidic H+ protons needed to react with baking soda to produce CO2 leavening bubbles.
                </p>
              </div>
              <div className="p-4 bg-paper border border-hairline space-y-1">
                <div className="font-bold text-accent">HEAVY CREAM LIPID RECONSTRUCTION:</div>
                <p className="font-sans text-xs text-ink-muted leading-relaxed">
                  Heavy whipping cream contains 36% butterfat. Reconstruct it for pan sauces, curries, and soups by emulsifying <strong>3/4 cup whole milk (3.25% fat) + 1/4 cup melted unsalted butter (82% fat)</strong>. This delivers an identical 23%–28% total fat ratio that prevents curds from breaking under simmer heat.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Starch Gelatinization Curves */}
        <div className="bg-paper hairline-border p-6 sm:p-8 space-y-4 font-mono text-xs">
          <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
            STARCH GELATINIZATION &amp; THICKENER DYNAMICS
          </div>
          <p className="font-sans text-xs text-ink-muted leading-relaxed">
            Never substitute starches 1-to-1. Cornstarch is 100% pure starch granules, whereas all-purpose flour is only ~70% starch alongside 10%–12% gluten proteins.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                  <th className="py-2">Thickening Agent</th>
                  <th className="py-2">Ratio Multiplier</th>
                  <th className="py-2">Gelation Temp</th>
                  <th className="py-2">Clarity &amp; Finish</th>
                  <th className="py-2">Freeze-Thaw Stability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-accent">Pure Cornstarch</td>
                  <td className="py-2">1.0× (Baseline)</td>
                  <td className="py-2">144°F–162°F</td>
                  <td className="py-2">High gloss, translucent sheen</td>
                  <td className="py-2 text-ink-muted">Poor (spongy retrogradation)</td>
                </tr>
                <tr className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">All-Purpose Flour</td>
                  <td className="py-2">2.0× (Double volume)</td>
                  <td className="py-2">180°F–190°F</td>
                  <td className="py-2">Opaque, matte gravy texture</td>
                  <td className="py-2">Moderate (roux required)</td>
                </tr>
                <tr className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">Arrowroot Starch</td>
                  <td className="py-2">1.0× (Direct match)</td>
                  <td className="py-2">150°F–160°F</td>
                  <td className="py-2">Crystal clear, neutral flavor</td>
                  <td className="py-2 font-bold text-accent">Excellent (acid resistant)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: The 3 Golden Rules of Emergency Cooking Swaps */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">ERROR PREVENTION</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            The 3 Golden Rules of Ingredient Substitutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-ink-muted">
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">1. Never Swap Soda for Powder 1:1</div>
              <p className="text-xs leading-relaxed">
                Baking soda is pure alkaline sodium bicarbonate—4× stronger than baking powder and requiring external culinary acid (buttermilk, yogurt, lemon juice). Using soda without acid leaves bitter metallic soap notes.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">2. Cook Flour Thickeners for 2+ Minutes</div>
              <p className="text-xs leading-relaxed">
                Raw flour contains active amylase enzymes and raw cereal starches. Always simmer a flour-thickened sauce for at least 120 seconds post-boil to neutralize enzymes and eliminate chalkiness.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">3. Maintain Moisture in Sugar Reductions</div>
              <p className="text-xs leading-relaxed">
                Sugar is hygroscopic (holds moisture). When cutting sugar by 50% in baked goods, add 1–2 tablespoons of applesauce or yogurt to prevent crumb dryness.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Frequently Asked Questions */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
          <div className="micro-label text-accent">EXPERT OPERATIONAL Q&amp;A</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Frequently Asked Questions: Emergency Substitutions
          </h2>
          <div className="space-y-4 divide-y divide-hairline text-sm text-ink-muted">
            <div className="pt-4 first:pt-0 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Can you whip milk and melted butter into whipped cream?
              </div>
              <p className="text-xs leading-relaxed">
                No. While milk and melted butter match heavy cream&apos;s fat percentage for cooking in sauces, soups, and fillings, the mechanical homogenization process has disrupted the milk fat globule membrane (MFGM). Without intact fat globule membranes, air bubbles cannot be stabilized, and the mixture will not whip into peaks.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                What is the best egg substitute for binding meatballs or meatloaf?
              </div>
              <p className="text-xs leading-relaxed">
                A panade (mashed white bread soaked in milk) or 2 tablespoons of unsweetened applesauce mixed with 1 tablespoon of breadcrumbs. In meatballs and meatloaf, eggs serve strictly to bind proteins and trap moisture; a panade creates a gelatinous starch network that actually keeps meatballs significantly more tender than egg proteins alone.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                What is the conversion ratio between dried herbs and fresh herbs?
              </div>
              <p className="text-xs leading-relaxed">
                The standard ratio is 1:3 (1 teaspoon dried herbs = 1 tablespoon fresh herbs). Dehydration concentrates volatile essential oils by approximately 3×. However, add dried herbs early in the simmer to rehydrate, whereas delicate fresh herbs (basil, cilantro, parsley) should be added in the final 60 seconds of cooking.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                How do you make brown sugar if you only have white granulated sugar?
              </div>
              <p className="text-xs leading-relaxed">
                Commercial brown sugar is simply granulated white sugar mixed with cane molasses. Combine 1 cup granulated white sugar with 1 tablespoon unsulphured molasses (for light brown sugar) or 2 tablespoons molasses (for dark brown sugar). Blend with a fork or food processor until uniformly incorporated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Can you whip milk and melted butter into whipped cream?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. Milk and melted butter replicate the fat content for cooking sauces, but lack the intact fat globule membranes required to trap air and create whipped peaks.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the best egg substitute for binding meatballs or meatloaf?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A panade (white bread soaked in milk). It binds ground meat while maintaining higher tenderness and moisture retention than egg proteins.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the conversion ratio between dried herbs and fresh herbs?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '1:3 ratio. 1 teaspoon of dried herbs equals 1 tablespoon of finely chopped fresh herbs.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do you make brown sugar if you only have white granulated sugar?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Mix 1 cup white granulated sugar with 1 tablespoon unsulphured molasses for light brown sugar, or 2 tablespoons molasses for dark brown sugar.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

