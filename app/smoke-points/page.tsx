import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import SmokePointsMatrix from '@/components/tools/SmokePointsMatrix';
import { SMOKE_POINTS } from '@/data/tools-data';

export const metadata: Metadata = {
  title: 'Cooking Oil Smoke Point Chart & Cast Iron Searing Matrix',
  description: 'Complete culinary oil smoke point index: Avocado, Ghee, Beef Tallow, Duck Fat, Peanut, and Olive Oil. Fat compositions, acrolein thresholds, and cast iron ratings.',
  alternates: {
    canonical: absoluteUrl('/smoke-points'),
  },
};

export default function SmokePointsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Cooking Oil Smoke Point & Searing Matrix',
    url: absoluteUrl('/smoke-points'),
    description: 'Technical reference for cooking oil smoke points, fat profiles, and high-heat searing recommendations.',
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
          label="PRINT OIL CHART"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">THERMAL DEGRADATION &amp; SEARING SCIENCE</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Cooking Oil Smoke Point Matrix
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Never sear a ribeye in extra virgin olive oil. Understand exact smoke thresholds, lipid breakdowns (mono vs poly vs saturated), and acrolein release boundaries for cast iron, wok, and air frying.
        </p>
      </section>

      {/* Interactive Tool */}
      <SmokePointsMatrix />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED OIL SMOKE POINTS &amp; FAT COMPOSITION
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Fat / Oil</th>
                <th className="py-2">Smoke Point (°F)</th>
                <th className="py-2">Smoke Point (°C)</th>
                <th className="py-2">Flavor Profile</th>
                <th className="py-2">Cast Iron Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {SMOKE_POINTS.map((oil) => (
                <tr key={oil.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{oil.name}</td>
                  <td className="py-2 font-bold text-accent">{oil.smokePointF}°F</td>
                  <td className="py-2">{oil.smokePointC}°C</td>
                  <td className="py-2">{oil.flavor}</td>
                  <td className="py-2 font-bold uppercase">{oil.castIronRating}</td>
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
