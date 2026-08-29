import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import GrillFuelEstimator from '@/components/tools/GrillFuelEstimator';
import { GRILL_FUEL_SPECS } from '@/data/tools-data';

export const metadata: Metadata = {
  title: 'BBQ Charcoal, Wood & Propane Burn Rate Calculator',
  description: 'Calculate exact charcoal chimneys, lump charcoal pounds, and propane tank percentage for low-and-slow smoking (225°F) or direct high searing (500°F).',
  alternates: {
    canonical: absoluteUrl('/grill-fuel-estimator'),
  },
};

export default function GrillFuelEstimatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'BBQ Charcoal & Propane Fuel Burn Estimator',
    url: absoluteUrl('/grill-fuel-estimator'),
    description: 'Calculate fuel consumption rates for Weber kettles, Kamados, smokers, and gas grills based on cook duration.',
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
          label="PRINT FUEL SHEET"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">THERMAL CONSUMPTION &amp; AIRFLOW MATH</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          BBQ Charcoal &amp; Propane Estimator
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Never run out of fuel halfway through a 14-hour brisket smoke. Calculate exact charcoal chimneys, snake method briquette counts, or propane tank percentage based on target cooking temperature.
        </p>
      </section>

      {/* Interactive Tool */}
      <GrillFuelEstimator />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED GRILL HARDWARE &amp; FUEL CONSUMPTION BENCHMARKS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Grill Type</th>
                <th className="py-2">Fuel Type</th>
                <th className="py-2">Temp Category</th>
                <th className="py-2">Burn Rate / Hr</th>
                <th className="py-2">Vent Setting</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {GRILL_FUEL_SPECS.map((g) => (
                <tr key={g.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{g.hardwareName}</td>
                  <td className="py-2 uppercase text-[10px] text-ink-muted">{g.fuelType}</td>
                  <td className="py-2 font-bold text-accent">{g.tempCategory}</td>
                  <td className="py-2">{g.burnRatePerHour} {g.burnRateUnit.split(' ')[0]}/hr</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{g.airVentSetting}</td>
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
