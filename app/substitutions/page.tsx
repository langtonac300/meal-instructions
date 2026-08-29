import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import IngredientSubstitutionsEngine from '@/components/tools/IngredientSubstitutionsEngine';
import { INGREDIENT_SUBSTITUTIONS } from '@/data/tools-data';

export const metadata: Metadata = {
  title: 'Emergency Kitchen Ingredient Substitutions Engine — Exact Conversion Ratios',
  description: 'Instant culinary substitutes for buttermilk, heavy cream, cornstarch, eggs in baking, baking powder, brown sugar, tomato paste, and mirin. Physical chemistry explanations and ratio math.',
  alternates: {
    canonical: absoluteUrl('/substitutions'),
  },
};

export default function SubstitutionsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Emergency Kitchen Ingredient Substitutions Engine',
    url: absoluteUrl('/substitutions'),
    description: 'Find physical cooking and baking substitutes with exact ratio formulas and chemistry explanations.',
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
          label="PRINT SUB GUIDE"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">PANTRY CHEMISTRY TRIAGE</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Kitchen Ingredient Substitution Engine
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Don't stop cooking for a missing ingredient. Reconstruct buttermilk with milk and acid, replace heavy cream with milk and butter emulsion, and substitute cornstarch with double flour.
        </p>
      </section>

      {/* Interactive Tool */}
      <IngredientSubstitutionsEngine />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED KITCHEN INGREDIENT SUBSTITUTIONS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Missing Ingredient</th>
                <th className="py-2">Emergency Replacement</th>
                <th className="py-2">Ratio / Formula</th>
                <th className="py-2">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {INGREDIENT_SUBSTITUTIONS.map((s) => (
                <tr key={s.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{s.missingIngredient}</td>
                  <td className="py-2 font-bold text-accent">{s.substituteSolution}</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{s.exactRatioFormula}</td>
                  <td className="py-2 uppercase text-[10px] text-ink-muted">{s.category}</td>
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
