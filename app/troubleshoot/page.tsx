import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import TroubleshootMatrix from '@/components/tools/TroubleshootMatrix';
import { TROUBLESHOOT_ISSUES } from '@/data/tools-data';

export const metadata: Metadata = {
  title: 'Kitchen Troubleshooter & Dinner Rescue — 5-Second Fixes for Cooking Disasters',
  description: 'Air fryer smoking? Fries soggy? Steak gray with no crust? Breading sliding off? Instant 5-second diagnostic fixes for common kitchen emergencies.',
  alternates: {
    canonical: absoluteUrl('/troubleshoot'),
  },
};

export default function TroubleshootPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Kitchen Troubleshooter & 5-Second Dinner Rescue Matrix',
    url: absoluteUrl('/troubleshoot'),
    description: 'Instant actionable solutions for common cooking mistakes and kitchen failures.',
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
          label="PRINT RESCUE GUIDE"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">INSTANT EMERGENCY TRIAGE</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Fix My Cook // 5-Second Dinner Rescue
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          When something goes wrong in the pan or air fryer, you have 15 seconds before dinner is ruined or the smoke alarm goes off. Zero fluff remedies right now.
        </p>
      </section>

      {/* Interactive Tool Component */}
      <TroubleshootMatrix />

      {/* SSR Static Reference Table for Search Engines */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED KITCHEN EMERGENCY REMEDIES
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Emergency Symptom</th>
                <th className="py-2">Root Cause</th>
                <th className="py-2">5-Second Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {TROUBLESHOOT_ISSUES.map((issue) => (
                <tr key={issue.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{issue.symptom}</td>
                  <td className="py-2 text-ink-muted">{issue.rootCause}</td>
                  <td className="py-2 text-accent font-bold font-sans text-xs">{issue.instantFiveSecFix}</td>
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
