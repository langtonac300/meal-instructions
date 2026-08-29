import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import ThawTimerCalculator from '@/components/tools/ThawTimerCalculator';
import { THAW_SPECS } from '@/data/tools-data';

export const metadata: Metadata = {
  title: 'Meat Thawing & Defrost Time Calculator — Fridge, Cold Water & Microwave',
  description: 'Calculate exact USDA safe thawing times for ground beef, chicken breasts, steaks, roasts, and whole turkeys. Refrigerator hours, 30-minute cold water bath cycles, and microwave power settings.',
  alternates: {
    canonical: absoluteUrl('/thaw-timer'),
  },
};

export default function ThawTimerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Meat Thawing & Defrost Time Calculator',
    url: absoluteUrl('/thaw-timer'),
    description: 'Calculate defrost durations across refrigerator, cold water bath, and microwave methods.',
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
          label="PRINT THAW GUIDE"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">USDA BACTERIAL DANGER ZONE TIMELINES</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Safe Meat Defrost &amp; Thaw Calculator
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Never thaw meat on the kitchen counter. Warm air warms the surface to the bacterial danger zone (40°F–140°F) in 2 hours while the core stays frozen. Calculate refrigerator days, rapid 30-min cold-water submersion swaps, and emergency microwave defrosting.
        </p>
      </section>

      {/* Interactive Tool */}
      <ThawTimerCalculator />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED USDA SAFE THAWING TIMELINES
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Cut / Package</th>
                <th className="py-2">Weight</th>
                <th className="py-2">Fridge (38°F)</th>
                <th className="py-2">Cold Water Bath</th>
                <th className="py-2">Microwave (30%)</th>
                <th className="py-2">Refreeze Policy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {THAW_SPECS.map((s) => (
                <tr key={s.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{s.name.split('(')[0]}</td>
                  <td className="py-2">{s.weightLbs} lbs</td>
                  <td className="py-2 font-bold text-accent">{s.fridgeThawHours} hrs</td>
                  <td className="py-2 font-bold text-ink">{s.coldWaterThawMinutes} mins</td>
                  <td className="py-2">{s.microwaveDefrostMinutes} mins</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{s.refreezeSafety.split(';')[0]}</td>
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
