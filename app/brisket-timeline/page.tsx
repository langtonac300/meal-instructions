// audit:seo requires pre-rendered .html at build time for the SEO/LLM engine.
export const dynamic = 'force-static';

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import BrisketSmokeTimeline from '@/components/tools/BrisketSmokeTimeline';
import { BRISKET_TIMELINE_SPECS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'BBQ Brisket Timeline & Stall Calculator — Backwards Scheduled Alarm Clock',
  description: 'Backwards schedule your 14-hour Texas brisket or pork butt smoke session. Calculate exact wake-up alarm times, butcher paper wrap milestones during the stall, pull temperatures, and cooler rest windows.',
  alternates: {
    canonical: absoluteUrl('/brisket-timeline'),
  },
};

export default function BrisketTimelinePage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'BBQ Brisket Timeline & Stall Calculator', path: '/brisket-timeline' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'BBQ Brisket Timeline & Reverse Smoke Schedule Planner',
    url: absoluteUrl('/brisket-timeline'),
    description: 'Calculate start times and milestone alarms to serve smoked brisket and pork butt on time.',
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
          label="PRINT SMOKE SCHEDULE"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">EVAPORATIVE STALL &amp; COLLAGEN HYDROLYSIS</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          BBQ Brisket Timeline &amp; Stall Planner
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Serving dinner 3 hours late is the #1 BBQ failure. Input your desired dinner time and meat weight to generate exact backwards-scheduled alarm milestones from lighting the smoker to the 3-hour cooler rest.
        </p>
      </section>

      {/* Interactive Tool */}
      <BrisketSmokeTimeline />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED BBQ SMOKING BENCHMARKS &amp; TEMPERATURE THRESHOLDS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">BBQ Cut</th>
                <th className="py-2">Smoker Temp</th>
                <th className="py-2">Estimated Rate</th>
                <th className="py-2">Stall Window</th>
                <th className="py-2">Final Pull Target</th>
                <th className="py-2">Cooler Rest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {BRISKET_TIMELINE_SPECS.map((b) => (
                <tr key={b.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{b.cutName.split('(')[0]}</td>
                  <td className="py-2 font-bold text-accent">{b.smokerTempF}°F</td>
                  <td className="py-2">~{b.estimatedMinutesPerLb} min/lb</td>
                  <td className="py-2">{b.expectedStallTempF}°F–{b.butcherPaperWrapTempF}°F</td>
                  <td className="py-2 font-bold text-ink">{b.finalTargetTempF}°F</td>
                  <td className="py-2">{b.minCoolerRestHours}–{b.maxCoolerRestHours} hrs</td>
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
