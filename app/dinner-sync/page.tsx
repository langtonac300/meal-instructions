import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import DinnerSyncTimeline from '@/components/tools/DinnerSyncTimeline';

export const metadata: Metadata = {
  title: 'Multi-Appliance Dinner Sync Timeline — Reverse Cook Orchestrator',
  description: 'Reverse-engineer your dinner prep timeline so the air fryer protein, oven roasted vegetables, and stovetop carbs all finish hot at the exact same minute.',
  alternates: {
    canonical: absoluteUrl('/dinner-sync'),
  },
};

export default function DinnerSyncPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Multi-Appliance Dinner Sync Timeline',
    url: absoluteUrl('/dinner-sync'),
    description: 'Reverse timeline cooking scheduler to synchronize multiple dishes and appliances.',
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
          label="PRINT SCHEDULE"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">REVERSE-ENGINEERED TIMING</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          The Two-Appliance Dinner Sync
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          End cold sides and overcooked meats. Tell us what you are making and what time you want to eat; we calculate the military-precision countdown to start each appliance.
        </p>
      </section>

      {/* Interactive Tool Component */}
      <DinnerSyncTimeline />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

    </div>
  );
}
