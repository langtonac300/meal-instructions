import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import TurkeyRoasterCalculator from '@/components/tools/TurkeyRoasterCalculator';
import { TURKEY_METHODS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Turkey Roaster & Thawing Calculator — Spatchcock vs Traditional Times',
  description: 'Calculate exact turkey roasting times, refrigerator thaw days, rapid cold-water submersion timelines, dry-brine salt math, and pull temperatures for birds 6 to 26 lbs.',
  alternates: {
    canonical: absoluteUrl('/turkey-calculator'),
  },
};

export default function TurkeyCalculatorPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Turkey Roaster & Thawing Calculator', path: '/turkey-calculator' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Turkey Roasting & Thaw Time Calculator',
    url: absoluteUrl('/turkey-calculator'),
    description: 'Precision thaw schedule, dry brine calculations, and roasting minutes by turkey weight.',
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
          label="PRINT TURKEY SCHEDULE"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">POULTRY SAFETY &amp; ROASTING TIMELINE</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Turkey Roasting &amp; Thaw Calculator
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Eliminate Thanksgiving guesswork. Calculate refrigerator defrost days, cold-water bath minutes, 1.0% dry-brine kosher salt tablespoons, and exact cook times for spatchcocked, traditional, or smoked turkey.
        </p>
      </section>

      {/* Interactive Tool */}
      <TurkeyRoasterCalculator />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED TURKEY ROASTING METHODS &amp; TIME SPECS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Method</th>
                <th className="py-2">Oven Temp</th>
                <th className="py-2">Mins / Lb</th>
                <th className="py-2">Breast Pull Target</th>
                <th className="py-2">Thigh Target</th>
                <th className="py-2">Rest Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {TURKEY_METHODS.map((m) => (
                <tr key={m.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{m.name.split('—')[0]}</td>
                  <td className="py-2 font-bold text-accent">{m.ovenTempF}°F</td>
                  <td className="py-2">~{m.minsPerPound} min/lb</td>
                  <td className="py-2 font-bold text-ink">{m.targetBreastPullTempF}°F</td>
                  <td className="py-2">{m.targetThighPullTempF}°F</td>
                  <td className="py-2 text-accent font-bold">{m.restMinutes} mins</td>
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
