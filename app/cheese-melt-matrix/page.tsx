import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import CheeseMeltMatrix from '@/components/tools/CheeseMeltMatrix';
import { CHEESE_MELT_SPECS } from '@/data/tools-data';

export const metadata: Metadata = {
  title: 'Cheese Melting Point Chart & Sodium Citrate Emulsion Calculator',
  description: 'Melting temperatures, moisture percentages, and stretch ratings for 24 cheeses. Calculate sodium citrate ratios (3%) for ultra-smooth cheese sauces that never break or oil off.',
  alternates: {
    canonical: absoluteUrl('/cheese-melt-matrix'),
  },
};

export default function CheeseMeltMatrixPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Cheese Melting Temperature & Sodium Citrate Emulsion Matrix',
    url: absoluteUrl('/cheese-melt-matrix'),
    description: 'Reference melting temperatures, elasticity indexes, and sodium citrate emulsion ratios across cheeses.',
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
          label="PRINT CHEESE CHART"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">CASEIN PROTEIN EMULSION &amp; THERMAL LIQUEFACTION</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Cheese Melting &amp; Emulsion Matrix
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Why aged cheddar breaks into greasy oil while mozzarella stretches and American melts into liquid gold. Understand casein matrix collapse temperatures and apply the 3% sodium citrate ratio for flawless cheese sauces.
        </p>
      </section>

      {/* Interactive Tool */}
      <CheeseMeltMatrix />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED CHEESE MELTING TEMPERATURES &amp; EMULSION BEHAVIOR
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Cheese</th>
                <th className="py-2">Melting Temp (°F)</th>
                <th className="py-2">Moisture %</th>
                <th className="py-2">Fat %</th>
                <th className="py-2">Melt Behavior</th>
                <th className="py-2">Sodium Citrate / 100g</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {CHEESE_MELT_SPECS.map((c) => (
                <tr key={c.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{c.name}</td>
                  <td className="py-2 font-bold text-accent">{c.meltingTempF}°F</td>
                  <td className="py-2">{c.moisturePct}%</td>
                  <td className="py-2">{c.fatPct}%</td>
                  <td className="py-2 text-ink font-sans text-xs">{c.meltBehavior}</td>
                  <td className="py-2 font-mono font-bold text-ink">{c.sodiumCitrateGramsPer100g}g</td>
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
