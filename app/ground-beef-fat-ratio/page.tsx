import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import GroundBeefFatMatrix from '@/components/tools/GroundBeefFatMatrix';
import { GROUND_BEEF_FAT_SPECS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Ground Beef Lean-to-Fat Yield & Calorie Matrix — 80/20 vs 93/7',
  description: 'Calculate cooked weight yield, rendered liquid fat ounces, and drained vs undrained calories across 73/27, 80/20, 85/15, 90/10, and 93/7 ground beef blends.',
  alternates: {
    canonical: absoluteUrl('/ground-beef-fat-ratio'),
  },
};

export default function GroundBeefFatRatioPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Ground Beef Lean-to-Fat Yield & Calorie Matrix', path: '/ground-beef-fat-ratio' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Ground Beef Lean-to-Fat Ratio & Yield Matrix',
    url: absoluteUrl('/ground-beef-fat-ratio'),
    description: 'Calculate cooked yield weight, fat rendering ounces, and drained calories across ground beef blends.',
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
          label="PRINT BEEF MATRIX"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">LIPID RENDERING &amp; COOKED YIELD SCIENCE</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Ground Beef Lean-to-Fat Ratio Matrix
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Buying 73/27 ground beef because it is cheaper often costs more per cooked pound. Calculate actual cooked plate yield, rendered pan fat ounces, and drained vs undrained calorie totals.
        </p>
      </section>

      {/* Interactive Tool */}
      <GroundBeefFatMatrix />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED GROUND BEEF BLEND YIELDS &amp; NUTRITION
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Blend</th>
                <th className="py-2">Cooked Yield %</th>
                <th className="py-2">Rendered Fat / Lb</th>
                <th className="py-2">Drained Cal (4oz)</th>
                <th className="py-2">Undrained Cal</th>
                <th className="py-2">Best Culinary Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {GROUND_BEEF_FAT_SPECS.map((b) => (
                <tr key={b.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{b.label}</td>
                  <td className="py-2 font-bold text-accent">{b.cookedYieldWeightPct}%</td>
                  <td className="py-2">{b.fatRenderedOzPerLbRaw} oz</td>
                  <td className="py-2 font-bold text-ink">{b.drainedCaloriesPer4ozCooked} kcal</td>
                  <td className="py-2">{b.undrainedCaloriesPer4ozCooked} kcal</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{b.bestUse}</td>
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
