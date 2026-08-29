import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import KidSplitter from '@/components/tools/KidSplitter';
import { KID_SPLIT_STRATEGIES } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Picky Kid Meal Deconstructor — The Anti-Double-Cooking Blueprint',
  description: 'How to cook one delicious, flavorful dinner for adults while seamlessly plating a deconstructed, non-spicy, kid-approved version in 60 seconds without making two meals.',
  alternates: {
    canonical: absoluteUrl('/kid-split'),
  },
};

export default function KidSplitPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Picky Kid Meal Deconstructor', path: '/kid-split' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Picky Kid Meal Deconstructor & Side-Car Splitter',
    url: absoluteUrl('/kid-split'),
    description: 'Deconstruction strategies to feed toddlers and adults from a single cooking session.',
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
          href="/"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <PrintButton
          label="PRINT BLUEPRINTS"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">ZERO DOUBLE-COOKING</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          The Picky Kid Deconstructor
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          You don&apos;t need to cook chicken nuggets when you want steak fajitas or spicy pasta. The exact 60-second pull-aside steps to satisfy toddler sensory preferences from the same pan.
        </p>
      </section>

      {/* Interactive Tool Component */}
      <KidSplitter />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

    </div>
  );
}
