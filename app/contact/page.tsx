import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare, ShieldCheck, MapPin } from 'lucide-react';
import { SITE_NAME, SITE_URL, absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact Editorial & Support',
  description: `Contact the team behind ${SITE_NAME} for recipe corrections, culinary inquiries, or advertising compliance.`,
  alternates: { canonical: absoluteUrl('/contact') },
};

export default function ContactPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Contact', path: '/contact' }]);

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
        <span className="uppercase text-ink-muted">EDITORIAL // CONTACT</span>
      </div>

      <article className="space-y-8 text-ink">
        <div className="space-y-3">
          <div className="micro-label text-accent">COMMUNICATIONS & EDITORIAL</div>
          <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight font-sans">
            Contact Us
          </h1>
          <p className="text-sm text-ink-muted font-sans leading-relaxed">
            Have a question about a cook-time datasheet, a recipe correction, or partnership inquiry?
            Get in touch with the editorial team at <strong className="text-ink">{SITE_NAME}</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 bg-paper-card hairline-border space-y-3">
            <div className="flex items-center gap-2 font-bold text-ink uppercase text-sm font-sans">
              <Mail className="w-4 h-4 text-accent" />
              <span>Editorial Inquiries</span>
            </div>
            <p className="text-xs text-ink-muted font-sans">
              For recipe testing notes, temperature discrepancies, or technical corrections:
            </p>
            <p className="text-xs font-mono text-ink font-bold pt-1">
              editorial@mealinstructions.com
            </p>
          </div>

          <div className="p-6 bg-paper-card hairline-border space-y-3">
            <div className="flex items-center gap-2 font-bold text-ink uppercase text-sm font-sans">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Privacy &amp; Compliance</span>
            </div>
            <p className="text-xs text-ink-muted font-sans">
              For privacy, GDPR/CCPA requests, or advertising disclosures:
            </p>
            <p className="text-xs font-mono text-ink font-bold pt-1">
              privacy@mealinstructions.com
            </p>
          </div>
        </div>

        <div className="p-6 bg-paper-card hairline-border space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-tight text-ink font-sans">
            Publisher Transparency &amp; Physical Standards
          </h2>
          <p className="text-xs text-ink-muted font-sans leading-relaxed">
            {SITE_NAME} is an independent parametric cooking reference. Every recipe and cook-time datasheet is authored, verified, and test-calibrated to eliminate fluff and food waste.
          </p>
          <div className="pt-2 text-xs font-mono text-ink-muted">
            <p>PUBLISHER: Meal Instructions Kitchen</p>
            <p>WEB: {SITE_URL}</p>
          </div>
        </div>
      </article>
    </div>
  );
}
