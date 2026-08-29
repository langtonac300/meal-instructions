import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { TOP_10_GUIDES, GuideCategory } from '@/data/top-10-lists';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: '20 Zero-Fluff Top 10 Guides for Dads & Real Home Cooks',
  description:
    'Exact temperatures, physics-backed meat rules, pick-kid strategies, cast iron truths, and 15-minute emergency dinner protocols. Zero fluff, zero AI filler.',
  alternates: {
    canonical: absoluteUrl('/guides'),
  },
};

const CATEGORIES: { slug: GuideCategory | 'all'; name: string }[] = [
  { slug: 'all', name: 'All Guides (20)' },
  { slug: 'mindset', name: 'Kitchen Mechanics' },
  { slug: 'kids', name: 'Family & Kids' },
  { slug: 'appliances', name: 'Hardware & Gear' },
  { slug: 'meat-science', name: 'Meat & Science' },
  { slug: 'weeknight-ops', name: 'Weeknight Operations' },
  { slug: 'budget', name: 'Budget & Grocery' },
  { slug: 'safety', name: 'Safety & Physics' },
];

export default function GuidesIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '20 Zero-Fluff Top 10 Guides for Dads & Home Cooks',
    url: absoluteUrl('/guides'),
    description:
      'A technical collection of 20 top 10 lists detailing heat management, kid dining psychology, meat science, cast iron mechanics, and emergency dinners.',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10 font-sans">
      
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
          INDEX // 20 OPERATIONAL GUIDES
        </span>
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">ZERO-FLUFF OPERATIONAL KNOWLEDGE</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          The Top 10 Kitchen Guides
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans leading-relaxed">
          No childhood memories, no sponsored filler. 200 battlefield-tested rules covering meat science, picky eater mechanics, cast iron physics, and weeknight survival.
        </p>
      </section>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOP_10_GUIDES.map((guide, idx) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="bg-paper-card hairline-border p-6 space-y-4 hover:border-ink transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="micro-label text-accent font-mono">
                  REF-{String(idx + 1).padStart(2, '0')} // {guide.categoryName.toUpperCase()}
                </span>
                <span className="font-mono text-[11px] text-ink-subtle flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{guide.readMinutes} MIN</span>
                </span>
              </div>

              <h2 className="text-lg font-bold text-ink uppercase tracking-tight font-sans group-hover:text-accent transition-colors">
                {guide.title}
              </h2>

              <p className="text-xs text-ink-muted font-sans leading-relaxed">
                {guide.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-hairline/60 flex items-center justify-between font-mono text-xs text-ink font-bold uppercase">
              <span className="text-[11px] text-ink-muted">10 Actionable Rules</span>
              <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Read Guide <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

    </div>
  );
}
