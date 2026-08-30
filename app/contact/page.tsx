import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare, ShoppingBag, Shield } from 'lucide-react';
import { absoluteUrl, SITE_NAME } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${SITE_NAME} — recipe corrections, press inquiries, shop support, and privacy requests.`,
  alternates: { canonical: absoluteUrl('/contact') },
};

const GENERAL_EMAIL = 'hello@mealinstructions.com';
const SUPPORT_EMAIL = 'support@mealinstructions.com';
const PRIVACY_EMAIL = 'privacy@mealinstructions.com';

export default function ContactPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Contact', path: '/contact' }]);

  const contactPointsSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: absoluteUrl('/'),
    email: GENERAL_EMAIL,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: GENERAL_EMAIL,
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: SUPPORT_EMAIL,
        availableLanguage: ['English'],
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-16 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPointsSchema) }}
      />

      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <span className="uppercase text-ink-muted">DOCUMENT // CONTACT</span>
      </div>

      <header className="space-y-4">
        <div className="micro-label text-accent">GET IN TOUCH</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Contact Meal Instructions
        </h1>
        <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-sans">
          The fastest way to reach us is email. We respond to legitimate inquiries within
          two business days.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="p-6 bg-paper-card hairline-border space-y-3">
          <div className="flex items-center gap-2 text-ink">
            <Mail className="w-4 h-4" />
            <h2 className="font-bold uppercase tracking-tight font-sans text-base">
              General &amp; Editorial
            </h2>
          </div>
          <p className="text-sm text-ink-muted font-sans leading-relaxed">
            Recipe corrections, press, partnerships, feedback on any datasheet or guide.
          </p>
          <a href={`mailto:${GENERAL_EMAIL}`} className="font-mono text-sm text-accent underline break-all">
            {GENERAL_EMAIL}
          </a>
        </div>

        <div className="p-6 bg-paper-card hairline-border space-y-3">
          <div className="flex items-center gap-2 text-ink">
            <ShoppingBag className="w-4 h-4" />
            <h2 className="font-bold uppercase tracking-tight font-sans text-base">
              Shop &amp; Order Support
            </h2>
          </div>
          <p className="text-sm text-ink-muted font-sans leading-relaxed">
            Order status, shipping questions, returns, exchanges, and refund requests.
          </p>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="font-mono text-sm text-accent underline break-all">
            {SUPPORT_EMAIL}
          </a>
        </div>

        <div className="p-6 bg-paper-card hairline-border space-y-3">
          <div className="flex items-center gap-2 text-ink">
            <Shield className="w-4 h-4" />
            <h2 className="font-bold uppercase tracking-tight font-sans text-base">
              Privacy &amp; Legal
            </h2>
          </div>
          <p className="text-sm text-ink-muted font-sans leading-relaxed">
            Data access and deletion requests, DMCA notices, and any policy questions.
          </p>
          <a href={`mailto:${PRIVACY_EMAIL}`} className="font-mono text-sm text-accent underline break-all">
            {PRIVACY_EMAIL}
          </a>
        </div>

        <div className="p-6 bg-paper-card hairline-border space-y-3">
          <div className="flex items-center gap-2 text-ink">
            <MessageSquare className="w-4 h-4" />
            <h2 className="font-bold uppercase tracking-tight font-sans text-base">
              Response Time
            </h2>
          </div>
          <p className="text-sm text-ink-muted font-sans leading-relaxed">
            Monday–Friday. Most emails answered within 2 business days. Order and privacy
            requests are prioritized.
          </p>
        </div>

      </section>

      <section className="space-y-3 hairline-t pt-8">
        <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
          Mailing Address
        </h2>
        <p className="text-sm text-ink-muted font-sans leading-relaxed">
          Meal Instructions<br />
          c/o Editorial Desk<br />
          Please email first — physical mail is checked weekly.
        </p>
      </section>

      <section className="space-y-3 hairline-t pt-8">
        <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
          Before You Email
        </h2>
        <ul className="list-disc pl-6 text-sm text-ink-muted font-sans leading-relaxed space-y-1.5">
          <li>For order questions, include your order number.</li>
          <li>For recipe corrections, include the recipe URL and the specific step.</li>
          <li>For privacy requests, include the email address associated with the request
            and enough context to locate the record.</li>
          <li>Unsolicited pitches (guest posts, backlink swaps, SEO services) are declined
            by default.</li>
        </ul>
      </section>

    </div>
  );
}
