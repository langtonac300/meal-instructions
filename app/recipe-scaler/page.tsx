import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import RecipePanScaler from '@/components/tools/RecipePanScaler';
import { PAN_SPECS } from '@/data/tools-data';

export const metadata: Metadata = {
  title: 'Recipe Pan Size Converter & Baking Dish Area Scaler',
  description: 'Convert recipe ingredients and baking times across different pan sizes: 8x8 square to 9x13 rectangle, 8" round cake to 10" cast iron skillet. Exact geometric surface area multipliers.',
  alternates: {
    canonical: absoluteUrl('/recipe-scaler'),
  },
};

export default function RecipeScalerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Recipe Pan Size Converter & Area Scaler',
    url: absoluteUrl('/recipe-scaler'),
    description: 'Calculate ingredient scaling factors, surface area ratios, and baking time adjustments when swapping baking dishes.',
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
          label="PRINT PAN MATRIX"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">GEOMETRIC SURFACE AREA SCALER</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Recipe Scaler &amp; Pan Converter
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Swapping an 8x8 pan for a 9x13 without adjusting ingredients causes dried-out thin casseroles. Calculate exact geometric multipliers, batter depth changes, and oven time shifts.
        </p>
      </section>

      {/* Interactive Tool */}
      <RecipePanScaler />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED BAKING DISH &amp; PAN SURFACE AREAS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Pan Geometry</th>
                <th className="py-2">Dimensions</th>
                <th className="py-2">Surface Area (Sq In)</th>
                <th className="py-2">Approx Capacity</th>
                <th className="py-2">Shape</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {PAN_SPECS.map((p) => (
                <tr key={p.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{p.name}</td>
                  <td className="py-2">{p.dimensions}</td>
                  <td className="py-2 font-bold text-accent">{p.areaSqInches} sq in</td>
                  <td className="py-2">{p.standardVolumeCups} cups</td>
                  <td className="py-2 uppercase text-ink-muted">{p.shape}</td>
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
