import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import FrozenCookMatrix from '@/components/tools/FrozenCookMatrix';
import { FROZEN_ITEMS } from '@/data/tools-data';

export const metadata: Metadata = {
  title: 'Cook From Frozen & Emergency Thaw Matrix — Safe Cooking Rules',
  description: 'Can you cook rock-frozen chicken, steak, ground beef, or salmon directly? USDA FSIS safety rules, +50% cook time curves, and cold-water rapid thaw protocols.',
  alternates: {
    canonical: absoluteUrl('/frozen-cook'),
  },
};

export default function FrozenCookPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Emergency Frozen Cook & Rapid Thaw Matrix',
    url: absoluteUrl('/frozen-cook'),
    description: 'USDA food safety guidelines and exact cook time multipliers for cooking proteins straight from the freezer.',
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
          label="PRINT THAW GUIDE"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">USDA FSIS SAFETY PROTOCOL</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Forgot to Thaw? Freezer-to-Plate Matrix
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Dinner is in 30 minutes and your meat is rock-solid. Exact science on when it is safe to cook directly from frozen, what appliances to never use, and the 50% time rule.
        </p>
      </section>

      {/* Interactive Tool Component */}
      <FrozenCookMatrix />

      {/* SSR Static Reference Table for Search Engines */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED FROZEN COOK SAFETY SPECS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Cut / Meat</th>
                <th className="py-2">Direct Frozen Safe?</th>
                <th className="py-2">Fresh Time</th>
                <th className="py-2">Frozen Time</th>
                <th className="py-2">USDA Safe Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {FROZEN_ITEMS.map((item) => (
                <tr key={item.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{item.name}</td>
                  <td className="py-2 font-bold text-accent">
                    {item.canCookFromFrozen ? '✓ SAFE (CONVECTION)' : '⚠ THAW FIRST'}
                  </td>
                  <td className="py-2">{item.freshCookMinutes} mins</td>
                  <td className="py-2 font-bold">{item.frozenCookMinutes} mins</td>
                  <td className="py-2">{item.internalTargetTemp}°F</td>
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
