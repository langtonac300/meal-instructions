// audit:seo requires pre-rendered .html at build time for the SEO/LLM engine.
export const dynamic = 'force-static';

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import MarinadeRatioCalculator from '@/components/tools/MarinadeRatioCalculator';
import { MARINADE_PROFILES } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Golden Marinade Ratio Calculator — Acid to Oil Formula & Timing',
  description: 'The definitive 3:1 fat-to-acid marinade formula with exact salinity math (1.2%), emulsifiers, and maximum safe marination hours to prevent mealy chicken and ceviche mush.',
  alternates: {
    canonical: absoluteUrl('/marinade-ratio'),
  },
};

export default function MarinadeRatioPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Golden Marinade Ratio Calculator', path: '/marinade-ratio' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Golden Marinade Acid-to-Oil Ratio Calculator',
    url: absoluteUrl('/marinade-ratio'),
    description: 'Calculate exact tablespoons of oil, acid, salt grams, and safe marination durations for chicken, steak, pork, and seafood.',
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
          label="PRINT MARINADE RULES"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">PROTEIN DENATURATION &amp; FLAVOR EQUILIBRIUM</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Golden Marinade Formula &amp; Ratio Engine
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Too much acid dissolves meat into chalky mush; too little salt prevents deep penetration. Calculate exact 3:1 fat-to-acid volumes, salinity grams, and maximum safe soaking hours.
        </p>
      </section>

      {/* Interactive Tool */}
      <MarinadeRatioCalculator />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED MARINATION STANDARDS BY PROTEIN
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Protein</th>
                <th className="py-2">Ideal Ratio</th>
                <th className="py-2">Salinity %</th>
                <th className="py-2">Min Soak</th>
                <th className="py-2">Max Safe Limit</th>
                <th className="py-2">Acid Danger</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {MARINADE_PROFILES.map((p) => (
                <tr key={p.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{p.protein}</td>
                  <td className="py-2 font-bold text-accent">{p.fatToAcidRatio.split(' ')[0]}</td>
                  <td className="py-2">{p.targetSalinityPct}%</td>
                  <td className="py-2">{p.safeMarinateHoursMin} hr</td>
                  <td className="py-2 font-bold text-ink">{p.safeMarinateHoursMax} hrs</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{p.enzymeWarning}</td>
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
