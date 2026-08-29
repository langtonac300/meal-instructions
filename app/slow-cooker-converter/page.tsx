import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import SlowCookerConverter from '@/components/tools/SlowCookerConverter';
import { SLOW_COOKER_TIME_MAP } from '@/data/tools-data';

export const metadata: Metadata = {
  title: 'Slow Cooker to Oven Conversion Calculator — High vs Low Times',
  description: 'Convert between Slow Cooker LOW, Slow Cooker HIGH, Dutch Oven, and Conventional 350°F Oven. Liquid reduction formulas, dairy addition timing, and meat tenderness rules.',
  alternates: {
    canonical: absoluteUrl('/slow-cooker-converter'),
  },
};

export default function SlowCookerConverterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Slow Cooker to Oven & High-to-Low Conversion Calculator',
    url: absoluteUrl('/slow-cooker-converter'),
    description: 'Calculate cooking duration and liquid adjustments between slow cookers, dutch ovens, and standard ovens.',
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
          label="PRINT CROCKPOT RULES"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">THERMAL CONVECTION &amp; MOISTURE PHYSICS</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Slow Cooker to Oven Converter
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Slow cookers trap 100% of moisture vapor. Convert standard oven braises into crockpot recipes by applying the 40% liquid reduction rule and exact High (300°F) vs Low (200°F) time equivalents.
        </p>
      </section>

      {/* Interactive Tool */}
      <SlowCookerConverter />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED SLOW COOKER VS OVEN COOKING TIMELINES
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Meat / Dish Type</th>
                <th className="py-2">Oven 350°F</th>
                <th className="py-2">Slow Cooker LOW</th>
                <th className="py-2">Slow Cooker HIGH</th>
                <th className="py-2">Dutch Oven</th>
                <th className="py-2">Liquid Reduction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {SLOW_COOKER_TIME_MAP.map((d) => (
                <tr key={d.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{d.category}</td>
                  <td className="py-2 font-bold text-accent">{d.oven350Hours} hrs</td>
                  <td className="py-2">{d.slowCookerLowHours} hrs</td>
                  <td className="py-2">{d.slowCookerHighHours} hrs</td>
                  <td className="py-2">{d.dutchOvenHours} hrs</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{d.liquidAdjustment}</td>
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
