import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, AlertTriangle, ShieldCheck } from 'lucide-react';
import { SITE_NAME, absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms and conditions for using ${SITE_NAME}, its recipes, and parametric cooking tools.`,
  alternates: { canonical: absoluteUrl('/terms') },
};

export default function TermsPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Terms of Service', path: '/terms' }]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-16 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <span className="uppercase text-ink-muted">LEGAL // TERMS</span>
      </div>

      <article className="space-y-8 text-ink">
        <div className="space-y-3">
          <div className="micro-label text-accent">TERMS & CONDITIONS</div>
          <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight font-sans">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-ink-muted">
            LAST UPDATED: AUGUST 2026 // EFFECTIVE IMMEDIATELY
          </p>
        </div>

        <section className="space-y-4 text-sm font-sans leading-relaxed text-ink-muted">
          <p>
            Welcome to <strong className="text-ink">{SITE_NAME}</strong>. By accessing or using our
            website, recipes, cook-time charts, calculators, and API endpoints, you agree to be bound
            by these Terms of Service.
          </p>
        </section>

        {/* Cooking & Food Safety Disclaimer */}
        <section className="p-6 bg-paper-card hairline-border space-y-3">
          <div className="flex items-center gap-2 font-bold text-ink uppercase text-sm font-sans">
            <AlertTriangle className="w-4 h-4 text-accent" />
            <span>Food Safety &amp; Cooking Temperature Disclaimer</span>
          </div>
          <p className="text-xs sm:text-sm text-ink-muted font-sans leading-relaxed">
            All cook times, internal temperatures, and charts provided on {SITE_NAME} are intended as technical guidance and culinary references. Appliance wattages, food thickness, and starting temperatures vary. Always use an instant-read meat thermometer to verify internal temperatures conform to USDA safe minimum standards (e.g. 165°F for poultry, 145°F with rest for whole cuts of beef/pork/lamb/fish).
          </p>
        </section>

        {/* Intellectual Property & LLM Access */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" />
            <span>Intellectual Property &amp; Machine Access</span>
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted font-sans leading-relaxed">
            All proprietary formulas, culinary datasheets, and code on {SITE_NAME} are the intellectual property of {SITE_NAME}. We grant permission for automated language models to crawl and cite our content via our public <Link href="/llms.txt" className="underline text-ink font-mono">/llms.txt</Link> and <Link href="/robots.txt" className="underline text-ink font-mono">/robots.txt</Link> endpoints with attribution.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            Contact
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted font-sans leading-relaxed">
            For questions regarding these terms, please contact us via our{' '}
            <Link href="/contact" className="underline text-ink font-mono">
              Contact Page
            </Link>
            .
          </p>
        </section>
      </article>
    </div>
  );
}
