import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import BoiledEggTimer from '@/components/tools/BoiledEggTimer';
import { EGG_DONENESS_PROFILES } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Jammy Ramen Egg & Boiled Egg Precision Timer — Soft to Hard Boiled',
  description: 'Precision timing for runny soft-boiled eggs, 6.5-minute jammy ramen eggs (Ajitsuke Tamago), custard yolks, and hard-boiled eggs without gray rings. Boiling, steaming, and air fryer modes.',
  alternates: {
    canonical: absoluteUrl('/egg-timer'),
  },
};

export default function EggTimerPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Jammy Ramen Egg & Boiled Egg Precision Timer', path: '/egg-timer' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Precision Boiled & Jammy Egg Timer',
    url: absoluteUrl('/egg-timer'),
    description: 'Calculate boiling and air fryer times for soft, jammy, and hard-boiled eggs based on size and starting temperature.',
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
          label="PRINT EGG CHART"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">YOLK PROTEIN COAGULATION PHYSICS</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Jammy &amp; Boiled Egg Precision Timer
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Egg whites set at 145°F–150°F; yolks coagulate at 158°F. Master the precise 30-second window for gooey fudge-like ramen yolks or vibrant yellow hard-boiled eggs with zero sulfuric green rings.
        </p>
      </section>

      {/* Interactive Tool */}
      <BoiledEggTimer />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED EGG DONENESS PROFILES &amp; BOIL TIMELINES
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Doneness Style</th>
                <th className="py-2">Boil Time (Large)</th>
                <th className="py-2">Steam Time</th>
                <th className="py-2">Air Fryer 270°F</th>
                <th className="py-2">Yolk Texture</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {EGG_DONENESS_PROFILES.map((e) => (
                <tr key={e.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{e.name}</td>
                  <td className="py-2 font-bold text-accent">{e.boilTimeMins} mins</td>
                  <td className="py-2">{e.steamTimeMins} mins</td>
                  <td className="py-2">{e.airFryerTimeMins} mins</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{e.yolkState}</td>
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
