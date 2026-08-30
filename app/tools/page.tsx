// audit:seo requires pre-rendered .html at build time for the SEO/LLM engine.
export const dynamic = 'force-static';

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import ToolsDirectory from '@/components/tools/ToolsDirectory';
import { ALL_TOOLS } from '@/data/tools-directory';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Zero-Fluff Kitchen Calculators & Cooking Tools Directory (30 Engines)',
  description: 'Precision cooking utilities for busy cooks and dads: oven-to-air fryer converters, oil smoke points, reverse sear timers, baker percentages, turkey thaw math, and dinner sync timelines.',
  alternates: {
    canonical: absoluteUrl('/tools'),
  },
};

export default function ToolsPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Zero-Fluff Kitchen Calculators & Cooking Engines Directory',
    url: absoluteUrl('/tools'),
    description: '30 interactive cooking calculators, converters, and parametric reference charts for busy cooks.',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      
      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <span className="font-mono text-xs text-accent font-bold uppercase">
          30 INTERACTIVE ENGINES
        </span>
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">ARCHITECTURAL UTILITIES</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Kitchen Engines &amp; Calculators
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          No life stories, no clutter. Instant calculations for cooking temperatures, meat poundage, freezer emergencies, dough hydration, smoke points, and dinner sync timelines.
        </p>
      </section>

      {/* Interactive Directory with Search & Filtering */}
      <ToolsDirectory />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          DIRECTORY OF 30 PRECISION KITCHEN ENGINES
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Tool Name</th>
                <th className="py-2">Route</th>
                <th className="py-2">Category</th>
                <th className="py-2">Engineering Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {ALL_TOOLS.map((t) => (
                <tr key={t.href} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{t.title}</td>
                  <td className="py-2 font-mono text-accent">
                    <Link href={t.href} className="hover:underline">{t.href}</Link>
                  </td>
                  <td className="py-2 uppercase text-[10px] text-ink-muted">{t.category}</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{t.description}</td>
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
