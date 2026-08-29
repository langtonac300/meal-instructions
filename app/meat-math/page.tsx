import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import MeatMathScaler from '@/components/tools/MeatMathScaler';
import { MEAT_MATH_PROFILES } from '@/data/tools-data';

export const metadata: Metadata = {
  title: 'Meat Math & BBQ Party Scaler — Raw Butcher Weight & Group Calculator',
  description: 'Hosting a backyard BBQ, game day party, or family cookout? Calculate exact raw meat poundage to buy at Costco or butcher, factoring in 25-45% cooking shrinkage, bones, and buns.',
  alternates: {
    canonical: absoluteUrl('/meat-math'),
  },
};

export default function MeatMathPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Feed The Crew Meat Math & BBQ Party Scaler',
    url: absoluteUrl('/meat-math'),
    description: 'Calculate raw butcher weight, shrinkage loss, and side dishes for groups and cookouts.',
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
          label="PRINT PURCHASE ORDER"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">GROUP PORTIONING & COSTCO MATH</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Feed The Crew Meat Math
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Never run short on burgers or overspend on brisket again. Factored for real thermal moisture shrinkage, bone discard weight, and appetite tiers.
        </p>
      </section>

      {/* Interactive Tool Component */}
      <MeatMathScaler />

      {/* SSR Static Reference Table for Search Engines */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED RAW-TO-COOKED SHRINKAGE CONSTANTS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Style / Cut</th>
                <th className="py-2">Raw Oz / Adult</th>
                <th className="py-2">Cook Shrinkage</th>
                <th className="py-2">Bone-In?</th>
                <th className="py-2">Standard Side</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {MEAT_MATH_PROFILES.map((p) => (
                <tr key={p.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{p.name}</td>
                  <td className="py-2 font-bold text-accent">{p.rawOzPerAdult} oz</td>
                  <td className="py-2">{p.shrinkagePercent}%</td>
                  <td className="py-2">{p.isBoneIn ? 'Yes' : 'No'}</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{p.sideRecommendations[0]?.item}</td>
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
