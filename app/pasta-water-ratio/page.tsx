import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import GrainWaterRatioMatrix from '@/components/tools/GrainWaterRatioMatrix';
import { GRAIN_WATER_SPECS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Rice, Grains & Pasta Water-to-Grain Ratio Matrix — Stovetop & Instant Pot',
  description: 'Exact liquid absorption ratios and simmer times for Jasmine rice, Basmati, Brown rice, Quinoa, Steel-cut oats, and Pasta. Stovetop and pressure cooker calculations.',
  alternates: {
    canonical: absoluteUrl('/pasta-water-ratio'),
  },
};

export default function PastaWaterRatioPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Rice, Grains & Pasta Water-to-Grain Ratio Matrix', path: '/pasta-water-ratio' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Rice, Grains & Pasta Water-to-Grain Ratio Calculator',
    url: absoluteUrl('/pasta-water-ratio'),
    description: 'Calculate water volume, salt teaspoons, and simmer minutes across 18 grain and pasta types.',
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
          label="PRINT RATIO CHART"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">HYDRATION &amp; STARCH GELATINIZATION</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Rice, Grains &amp; Pasta Ratio Matrix
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Stop serving mushy rice and chewy quinoa. Calculate exact water-to-grain liquid volumes, cold water rinsing protocols, salt amounts, and mandatory steam rest windows for stovetop and Instant Pot.
        </p>
      </section>

      {/* Interactive Tool */}
      <GrainWaterRatioMatrix />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED GRAIN WATER ABSORPTION &amp; SIMMER TIMELINES
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Grain / Pasta</th>
                <th className="py-2">Stovetop Ratio</th>
                <th className="py-2">Simmer Time</th>
                <th className="py-2">Instant Pot Ratio</th>
                <th className="py-2">IP High Pressure</th>
                <th className="py-2">Steam Rest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {GRAIN_WATER_SPECS.map((g) => (
                <tr key={g.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{g.name}</td>
                  <td className="py-2 font-bold text-accent">1:{g.volumeLiquidToGrainRatio}</td>
                  <td className="py-2">{g.stovetopSimmerMinutes} mins</td>
                  <td className="py-2">1:{g.instantPotLiquidRatio}</td>
                  <td className="py-2">{g.instantPotMinutes} mins</td>
                  <td className="py-2 font-bold text-ink">{g.mandatoryRestMinutes} mins</td>
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
