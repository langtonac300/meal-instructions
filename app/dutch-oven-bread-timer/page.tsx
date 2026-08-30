// audit:seo requires pre-rendered .html at build time for the SEO/LLM engine.
export const dynamic = 'force-static';

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import DutchOvenBreadTimer from '@/components/tools/DutchOvenBreadTimer';
import { DUTCH_OVEN_BREAD_SPECS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'No-Knead Dutch Oven Bread Timer — Steam, Crust & Internal Temp Guide',
  description: 'Precision timing for artisan Dutch oven sourdough and country boules: 450°F cast iron preheat, lid-on steam expansion minutes, lid-off Maillard browning, and 208°F internal pull temp.',
  alternates: {
    canonical: absoluteUrl('/dutch-oven-bread-timer'),
  },
};

export default function DutchOvenBreadTimerPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'No-Knead Dutch Oven Bread Timer', path: '/dutch-oven-bread-timer' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'No-Knead Dutch Oven Bread Baking Timer',
    url: absoluteUrl('/dutch-oven-bread-timer'),
    description: 'Calculate steam baking minutes, crust browning time, and internal temperature for Dutch oven bread.',
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
          label="PRINT BREAD GUIDE"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">STEAM RETENTION &amp; CRUST MAILLARD PHYSICS</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Dutch Oven Artisan Bread Timer
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          A heavy enameled cast iron pot mimics a professional deck oven. Master the exact 2-phase bake: lid-on trapped steam for massive oven spring, followed by lid-off heat for a blistered mahogany crust.
        </p>
      </section>

      {/* Interactive Tool */}
      <DutchOvenBreadTimer />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED DUTCH OVEN BREAD BAKING STANDARDS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Loaf Archetype</th>
                <th className="py-2">Hydration %</th>
                <th className="py-2">Preheat Temp</th>
                <th className="py-2">Lid-On Steam</th>
                <th className="py-2">Lid-Off Crisp</th>
                <th className="py-2">Internal Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {DUTCH_OVEN_BREAD_SPECS.map((b) => (
                <tr key={b.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{b.name.split('(')[0]}</td>
                  <td className="py-2 font-bold text-accent">{b.waterHydrationPct}%</td>
                  <td className="py-2">{b.preheatTempF}°F</td>
                  <td className="py-2 font-bold text-ink">{b.lidOnSteamMins} mins</td>
                  <td className="py-2">{b.lidOffBrowningMins} mins</td>
                  <td className="py-2 text-accent font-bold">{b.internalTargetTempF}°F</td>
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
