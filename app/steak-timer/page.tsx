// audit:seo requires pre-rendered .html at build time for the SEO/LLM engine.
export const dynamic = 'force-static';

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import SteakDonenessTimer from '@/components/tools/SteakDonenessTimer';
import { STEAK_DONENESS_TARGETS, STEAK_CUT_SPECS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Reverse Sear Steak Calculator & Doneness Pull Temperature Guide',
  description: 'Precision reverse sear timing and thermometer pull temperatures for thick Ribeye, NY Strip, Filet Mignon, and Tomahawk steaks. Thermal carryover math included.',
  alternates: {
    canonical: absoluteUrl('/steak-timer'),
  },
};

export default function SteakTimerPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Reverse Sear Steak Calculator & Doneness Pull Temperature Guide', path: '/steak-timer' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Reverse Sear Steak Calculator & Doneness Timer',
    url: absoluteUrl('/steak-timer'),
    description: 'Calculate low-oven cook times, pull temperatures, and 60-second cast iron sear durations based on steak thickness.',
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
          label="PRINT STEAK GUIDE"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">THERMAL GRADIENT ELIMINATION</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Reverse Sear &amp; Steak Doneness Calculator
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Banish the gray overcooked band forever. Low-and-slow convection heat gently brings the interior core to exact pull temperature before a blazing 60-second cast iron butter baste.
        </p>
      </section>

      {/* Interactive Tool */}
      <SteakDonenessTimer />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED DONENESS TEMPERATURE TARGETS &amp; CARRYOVER
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Doneness</th>
                <th className="py-2">Oven Pull Temp</th>
                <th className="py-2">Post-Sear Core</th>
                <th className="py-2">Final Rested Target</th>
                <th className="py-2">Visual Characteristics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {STEAK_DONENESS_TARGETS.map((t) => (
                <tr key={t.doneness} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{t.label}</td>
                  <td className="py-2 font-bold text-accent">{t.ovenPullTempF}°F</td>
                  <td className="py-2">{t.searFinishInternalTempF}°F</td>
                  <td className="py-2 font-bold text-ink">{t.finalRestedTempF}°F</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{t.colorCenter}</td>
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
