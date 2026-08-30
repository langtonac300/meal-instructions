// audit:seo requires pre-rendered .html at build time for the SEO/LLM engine.
export const dynamic = 'force-static';

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import CoffeeExtractionCalculator from '@/components/tools/CoffeeExtractionCalculator';
import { COFFEE_EXTRACTION_PROFILES } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Coffee & Tea Extraction Ratio Calculator — French Press, Pour Over & AeroPress',
  description: 'Precision coffee-to-water ratios (1:15 to 1:17), exact kettle water temperatures (°F/°C), grind size specifications, and live extraction timers for coffee and tea.',
  alternates: {
    canonical: absoluteUrl('/caffeine-steep-timer'),
  },
};

export default function CaffeineSteepTimerPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Coffee & Tea Extraction Ratio Calculator', path: '/caffeine-steep-timer' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Coffee & Tea Extraction Ratio & Steep Timer',
    url: absoluteUrl('/caffeine-steep-timer'),
    description: 'Calculate coffee dose grams, water volume, and extraction times across French Press, V60, AeroPress, and Green Tea.',
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
          label="PRINT COFFEE RATIOS"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">TOTAL DISSOLVED SOLIDS &amp; EXTRACTION YIELD</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Coffee &amp; Tea Extraction Calculator
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Bitter coffee is over-extracted; sour coffee is under-extracted. Calculate golden 1:15–1:17 coffee doses on your digital scale, kettle water temps, and run the precision countdown timer.
        </p>
      </section>

      {/* Interactive Tool */}
      <CoffeeExtractionCalculator />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED COFFEE &amp; TEA BREWING PARAMETERS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Brew Method</th>
                <th className="py-2">Golden Ratio</th>
                <th className="py-2">Water Temp (°F)</th>
                <th className="py-2">Grind Size</th>
                <th className="py-2">Extraction Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {COFFEE_EXTRACTION_PROFILES.map((c) => (
                <tr key={c.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{c.name}</td>
                  <td className="py-2 font-bold text-accent">{c.ratioDisplay.split('(')[0]}</td>
                  <td className="py-2 font-bold text-ink">{c.waterTempF}°F</td>
                  <td className="py-2 text-ink-muted">{c.grindSize.split('(')[0]}</td>
                  <td className="py-2">{Math.round(c.brewTimeSeconds / 60)} mins</td>
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
