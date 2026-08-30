// audit:seo requires pre-rendered .html at build time for the SEO/LLM engine.
export const dynamic = 'force-static';

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import InternalTempCalculator from '@/components/tools/InternalTempCalculator';
import { INTERNAL_TEMP_SPECS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Meat Thermometer Pull Temp & Thermal Carryover Chart — Safe Rest Targets',
  description: 'When to pull steak, chicken, pork, and salmon off the heat. Accounts for +5°F to +8°F thermal carryover resting rise to achieve peak juiciness while satisfying USDA pasteurization standards.',
  alternates: {
    canonical: absoluteUrl('/internal-temp'),
  },
};

export default function InternalTempPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Meat Thermometer Pull Temp & Thermal Carryover Chart', path: '/internal-temp' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Meat Thermometer Pull Temp & Thermal Carryover Calculator',
    url: absoluteUrl('/internal-temp'),
    description: 'Calculate exact pull temperatures and resting windows to prevent overcooked meat.',
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
          href="/"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <PrintButton
          label="PRINT TEMP CHART"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">THERMAL CARRYOVER PHYSICS</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          The Thermometer Pull Temp Guide
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          If you pull chicken at 165°F or steak at 135°F, it keeps cooking on the cutting board and turns into dry cardboard. Pull early, let carryover heat finish the job.
        </p>
      </section>

      {/* Interactive Tool Component */}
      <InternalTempCalculator />

      {/* SSR Static Reference Table for Search Engines */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED PULL & RESTING REFERENCE TABLE
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Cut</th>
                <th className="py-2">Ideal Doneness</th>
                <th className="py-2">Pull Temp</th>
                <th className="py-2">Carryover</th>
                <th className="py-2">Rest Window</th>
                <th className="py-2">Final Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {INTERNAL_TEMP_SPECS.map((spec) => {
                const idealLevel = spec.donenessLevels[1] || spec.donenessLevels[0];
                return (
                  <tr key={spec.id} className="hover:bg-paper-card">
                    <td className="py-2 font-bold text-ink">{spec.name.split('(')[0]}</td>
                    <td className="py-2">{idealLevel.label}</td>
                    <td className="py-2 text-accent font-bold">{idealLevel.pullTemp}°F</td>
                    <td className="py-2">+{idealLevel.carryoverRise}°F</td>
                    <td className="py-2">{idealLevel.restMinutes} mins</td>
                    <td className="py-2 font-bold text-ink">{idealLevel.finalTargetTemp}°F</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

    </div>
  );
}
