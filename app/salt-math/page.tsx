import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import SaltMathCalculator from '@/components/tools/SaltMathCalculator';
import { SALT_BRANDS } from '@/data/tools-data';

export const metadata: Metadata = {
  title: 'Equilibrium Salting & Dry-Brine Calculator — Diamond Crystal vs Morton Conversions',
  description: 'Convert salt weight to volume accurately across Diamond Crystal, Morton Kosher, Table Salt, and Sea Salt. Calculate 1.0% to 1.2% equilibrium salinity and dry-brine timing.',
  alternates: {
    canonical: absoluteUrl('/salt-math'),
  },
};

export default function SaltMathPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Equilibrium Salting & Kosher Salt Density Calculator',
    url: absoluteUrl('/salt-math'),
    description: 'Precision salt density and dry-brine calculator for meats and poultry.',
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
          label="PRINT SALT CHART"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">CULINARY DENSITY CONVERSION</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Equilibrium Salting & Dry-Brine Math
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          A tablespoon of Morton salt has almost twice the sodium of Diamond Crystal. Stop ruining good meat with volume-based guessing. Precise 1.0%–1.2% salt weight and teaspoon conversions.
        </p>
      </section>

      {/* Interactive Tool Component */}
      <SaltMathCalculator />

      {/* SSR Static Reference Table for Search Engines */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED PHYSICAL SALT DENSITIES
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Salt Variety</th>
                <th className="py-2">Density (Grams / Tsp)</th>
                <th className="py-2">Crystal Structure</th>
                <th className="py-2">Pinch Characteristics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {SALT_BRANDS.map((b) => (
                <tr key={b.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{b.name}</td>
                  <td className="py-2 font-bold text-accent">{b.gramsPerTeaspoon}g</td>
                  <td className="py-2">{b.crystalType}</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{b.pinchFeel}</td>
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
