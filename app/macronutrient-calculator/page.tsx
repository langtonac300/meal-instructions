// audit:seo requires pre-rendered .html at build time for the SEO/LLM engine.
export const dynamic = 'force-static';

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import MacroTargetMeatScaler from '@/components/tools/MacroTargetMeatScaler';
import { MACRO_PROTEIN_SOURCES } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Protein Target Meat Scaler — Raw to Cooked Macro Weight Calculator',
  description: 'Calculate exact raw butcher scale weight vs cooked plate weight to hit target protein goals: Chicken breast, 93/7 beef, salmon, pork tenderloin, and egg whites. Water loss shrinkage included.',
  alternates: {
    canonical: absoluteUrl('/macronutrient-calculator'),
  },
};

export default function MacronutrientCalculatorPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Protein Target Meat Scaler', path: '/macronutrient-calculator' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Protein Target Meat Scaler & Raw-to-Cooked Macro Calculator',
    url: absoluteUrl('/macronutrient-calculator'),
    description: 'Calculate raw meat portion scale weights to hit exact protein targets factoring in cooking shrinkage.',
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
          label="PRINT MACRO GUIDE"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">THERMAL SHRINKAGE &amp; PROTEIN DENSITY</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Protein Target Meat Scaler
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Raw meat loses 20%–35% of its weight to water and fat evaporation in the pan. Input your target meal protein goal and get the exact raw butcher scale weight needed before cooking.
        </p>
      </section>

      {/* Interactive Tool */}
      <MacroTargetMeatScaler />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED PROTEIN DENSITIES &amp; COOKING SHRINKAGE
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Protein Cut</th>
                <th className="py-2">Raw Protein (100g)</th>
                <th className="py-2">Cooked Protein / Oz</th>
                <th className="py-2">Avg Shrinkage %</th>
                <th className="py-2">Raw Calories (100g)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {MACRO_PROTEIN_SOURCES.map((s) => (
                <tr key={s.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{s.name}</td>
                  <td className="py-2 font-bold text-accent">{s.rawProteinPer100g}g</td>
                  <td className="py-2 font-bold text-ink">{s.cookedProteinPerOz}g / oz</td>
                  <td className="py-2">-{s.shrinkageWeightLossPct}%</td>
                  <td className="py-2">{s.rawCaloriesPer100g} kcal</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
