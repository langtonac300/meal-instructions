import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import ReheatEngine from '@/components/tools/ReheatEngine';
import { REHEAT_ITEMS } from '@/data/tools-data';

export const metadata: Metadata = {
  title: 'Leftover & Takeout Revive Engine — Zero-Fluff Reheat Times & Temps',
  description: 'Exact air fryer and skillet reheat times, temperatures, and crisp-restoration protocols for pizza, French fries, wings, burgers, and takeout.',
  alternates: {
    canonical: absoluteUrl('/reheat'),
  },
};

export default function ReheatPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Zero-Fluff Leftover & Takeout Revive Engine',
    url: absoluteUrl('/reheat'),
    description: 'Exact times, temperatures, and methods to reheat restaurant takeout and leftovers without sogginess.',
    applicationCategory: 'CulinaryApplication',
    operatingSystem: 'All',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Breadcrumb & Actions */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <PrintButton
          label="PRINT REHEAT CHART"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">CRISP PRESERVATION ENGINE</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          The Takeout Revive Engine
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Never nuke leftovers in the microwave again. Exact temperatures and times to revive day-old fries, pizza, wings, and tenders back to fresh-out-of-the-fryer crunch.
        </p>
      </section>

      {/* Interactive Tool Component */}
      <ReheatEngine />

      {/* SSR Static Reference Table for Search Engines & LLM Ingestion */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED REHEAT SPECIFICATION TABLE
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Item</th>
                <th className="py-2">Air Fryer Temp</th>
                <th className="py-2">Time</th>
                <th className="py-2">Shake Mark</th>
                <th className="py-2">Anti-Soggy Secret</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {REHEAT_ITEMS.map((item) => (
                <tr key={item.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{item.name}</td>
                  <td className="py-2 text-accent font-bold">{item.airFryerTemp}°F</td>
                  <td className="py-2">{item.airFryerMinutes} mins</td>
                  <td className="py-2">{item.shakeAtMinute ? `${item.shakeAtMinute}m` : '—'}</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{item.antiSoggyTip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

    </div>
  );
}
