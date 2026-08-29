import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import SousVideCalculator from '@/components/tools/SousVideCalculator';
import { SOUS_VIDE_SPECS } from '@/data/tools-data';

export const metadata: Metadata = {
  title: 'Sous Vide Time & Temperature Immersion Calculator — Baldwin Pasteurization',
  description: 'Precision water bath temperatures and minimum immersion times based on meat thickness: Ribeye steak, chicken breast, pork tenderloin, and salmon. Pasteurization hold tables included.',
  alternates: {
    canonical: absoluteUrl('/sous-vide-calculator'),
  },
};

export default function SousVideCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Sous Vide Time & Temperature Immersion Calculator',
    url: absoluteUrl('/sous-vide-calculator'),
    description: 'Calculate exact water bath temperatures and minimum/maximum immersion times based on meat thickness.',
    applicationCategory: 'CulinaryApplication',
    operatingSystem: 'All',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
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
          label="PRINT SOUS VIDE CHART"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">PRECISION EQUILIBRIUM IMMERSION</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Sous Vide Time &amp; Temp Calculator
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Water conducts thermal energy 24x faster than air. Calculate minimum Baldwin pasteurization times, maximum hold boundaries, and post-bath blazing sear protocols based on exact cut thickness.
        </p>
      </section>

      {/* Interactive Tool */}
      <SousVideCalculator />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED SOUS VIDE IMMERSION STANDARDS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Cut / Food</th>
                <th className="py-2">Med-Rare Temp</th>
                <th className="py-2">Medium Temp</th>
                <th className="py-2">Min Time (1-inch)</th>
                <th className="py-2">Max Hold Time</th>
                <th className="py-2">Finishing Sear</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {SOUS_VIDE_SPECS.map((s) => (
                <tr key={s.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{s.name}</td>
                  <td className="py-2 font-bold text-accent">{s.medRareTempF}°F</td>
                  <td className="py-2">{s.mediumTempF}°F</td>
                  <td className="py-2">{s.minTimeMinutes} mins</td>
                  <td className="py-2">{Math.round(s.maxTimeMinutes / 60)} hrs</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{s.searMethod}</td>
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
