import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import FoodCostCalculator from '@/components/tools/FoodCostCalculator';
import { FOOD_COST_PRESETS } from '@/data/tools-data';

export const metadata: Metadata = {
  title: 'Meal Prep Batch Cost & Portion Calculator — Grocery Savings Math',
  description: 'Calculate exact ingredient costs, total batch price, cost per serving, and restaurant takeout savings for weekly meal prepping and family dinners.',
  alternates: {
    canonical: absoluteUrl('/food-cost-calculator'),
  },
};

export default function FoodCostCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Meal Prep Batch Food Cost & Portion Calculator',
    url: absoluteUrl('/food-cost-calculator'),
    description: 'Calculate unit costs, recipe batch totals, and compare home cooking savings against restaurant meals.',
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
          label="PRINT COST BREAKDOWN"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">GROCERY BUDGET &amp; UNIT COST ITEMIZATION</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Meal Prep &amp; Food Cost Calculator
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Cook restaurant-quality meals for a fraction of the cost. Itemize grocery package sizes, calculate true portion prices, and see real dollar savings vs $15+ takeout meals.
        </p>
      </section>

      {/* Interactive Tool */}
      <FoodCostCalculator />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED BATCH COOKING COST ARCHETYPES
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Meal Archetype</th>
                <th className="py-2">Servings</th>
                <th className="py-2">Takeout Equivalent</th>
                <th className="py-2">Key Ingredients</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {FOOD_COST_PRESETS.map((p) => (
                <tr key={p.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{p.mealName.split('(')[0]}</td>
                  <td className="py-2 font-bold text-accent">{p.servings} portions</td>
                  <td className="py-2 font-bold text-ink">${p.restaurantEquivalentPrice.toFixed(2)}</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">
                    {p.defaultItems.map((i) => i.name).join(', ')}
                  </td>
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
