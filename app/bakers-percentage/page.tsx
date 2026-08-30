// audit:seo requires pre-rendered .html at build time for the SEO/LLM engine.
export const dynamic = 'force-static';

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import BakersPercentageCalculator from '@/components/tools/BakersPercentageCalculator';
import { BAKERS_PRESETS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: "Baker's Percentage & Dough Hydration Calculator — Pizza & Bread Math",
  description: 'Precision baker percentage and hydration calculator for Neapolitan pizza, Detroit pan pizza, sourdough boules, and sandwich loaves. Real-time gram scale scaling.',
  alternates: {
    canonical: absoluteUrl('/bakers-percentage'),
  },
};

export default function BakersPercentagePage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: "Baker's Percentage & Dough Hydration Calculator", path: '/bakers-percentage' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: "Baker's Percentage & Dough Hydration Calculator",
    url: absoluteUrl('/bakers-percentage'),
    description: 'Calculate exact hydration percentage, salt, yeast, and olive oil grams relative to 100% flour weight.',
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
          label="PRINT DOUGH SHEET"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">MATHEMATICAL DOUGH FORMULATION</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Baker's Percentage &amp; Hydration Calculator
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Flour is always 100%. Master hydration, salinity, and yeast ratios to scale artisan sourdough boules, Detroit-style crispy edge pan pizza, and soft everyday sandwich bread.
        </p>
      </section>

      {/* Interactive Tool */}
      <BakersPercentageCalculator />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED DOUGH ARCHETYPES &amp; BAKER'S RATIOS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Dough Style</th>
                <th className="py-2">Hydration %</th>
                <th className="py-2">Salt %</th>
                <th className="py-2">Yeast %</th>
                <th className="py-2">Fermentation</th>
                <th className="py-2">Bake Temp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {BAKERS_PRESETS.map((p) => (
                <tr key={p.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{p.name}</td>
                  <td className="py-2 font-bold text-accent">{p.hydrationPct}%</td>
                  <td className="py-2">{p.saltPct}%</td>
                  <td className="py-2">{p.yeastPct}%</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{p.fermentationType}</td>
                  <td className="py-2 font-bold text-ink">{p.bakeTempF}°F</td>
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
