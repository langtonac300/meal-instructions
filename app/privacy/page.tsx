import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Cookie, Eye, Lock } from 'lucide-react';
import { SITE_NAME, absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy and cookie disclosures for ${SITE_NAME}, including Google AdSense and Analytics data practices.`,
  alternates: { canonical: absoluteUrl('/privacy') },
};

export default function PrivacyPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Privacy Policy', path: '/privacy' }]);

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
        <span className="uppercase text-ink-muted">LEGAL // PRIVACY</span>
      </div>

      <article className="space-y-8 text-ink">
        <div className="space-y-3">
          <div className="micro-label text-accent">LEGAL & DATA PROTECTION</div>
          <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight font-sans">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-ink-muted">
            LAST UPDATED: AUGUST 2026 // EFFECTIVE IMMEDIATELY
          </p>
        </div>

        <section className="space-y-4 text-sm font-sans leading-relaxed text-ink-muted">
          <p>
            At <strong className="text-ink">{SITE_NAME}</strong>, accessible from{' '}
            <Link href="/" className="underline text-ink">
              {absoluteUrl('/')}
            </Link>
            , the privacy of our visitors is one of our top priorities. This Privacy Policy document
            outlines the types of personal information that is received and collected by{' '}
            {SITE_NAME} and how it is used.
          </p>
        </section>

        {/* Google AdSense & Third-Party Advertising */}
        <section className="p-6 bg-paper-card hairline-border space-y-3">
          <div className="flex items-center gap-2 font-bold text-ink uppercase text-sm font-sans">
            <Cookie className="w-4 h-4 text-accent" />
            <span>Google AdSense &amp; Third-Party Advertising Cookies</span>
          </div>
          <div className="text-xs sm:text-sm text-ink-muted font-sans space-y-2 leading-relaxed">
            <p>
              Google is a third-party vendor on our site. It uses cookies, known as DART cookies and advertising cookies, to serve ads to our site visitors based upon their visit to this site and other websites on the internet.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to our website or other websites.
              </li>
              <li>
                Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
              </li>
              <li>
                Users may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-ink font-mono"
                >
                  Google Ads Settings
                </a>{' '}
                or by visiting{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-ink font-mono"
                >
                  aboutads.info
                </a>
                .
              </li>
            </ul>
          </div>
        </section>

        {/* Web Analytics (Google Analytics) */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans flex items-center gap-2">
            <Eye className="w-4 h-4 text-accent" />
            <span>Google Analytics &amp; Web Measurement</span>
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted font-sans leading-relaxed">
            We use Google Analytics (gtag.js) to monitor aggregated traffic patterns, popular recipes, and reader search preferences. This service collects standard internet log information and visitor behavior in an anonymous format. No personally identifiable information (PII) is sold or shared with unrelated third parties.
          </p>
        </section>

        {/* Log Files */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans flex items-center gap-2">
            <Lock className="w-4 h-4 text-accent" />
            <span>Log Files &amp; Hosting Architecture</span>
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted font-sans leading-relaxed">
            Like many web platforms, {SITE_NAME} utilizes standard edge hosting logs. These files log visitors to the site—a standard procedure for hosting services and analytics. Information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and number of clicks.
          </p>
        </section>

        {/* CCPA & GDPR */}
        <section className="p-6 bg-paper-card hairline-border space-y-3">
          <div className="flex items-center gap-2 font-bold text-ink uppercase text-sm font-sans">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>CCPA Privacy Rights &amp; GDPR Data Protection</span>
          </div>
          <div className="text-xs sm:text-sm text-ink-muted font-sans space-y-2 leading-relaxed">
            <p>
              Under California Consumer Privacy Act (CCPA) and European General Data Protection Regulation (GDPR), users have rights including:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The right to request disclosure of personal data collected.</li>
              <li>The right to request deletion of any personal data.</li>
              <li>The right to opt-out of the sale or sharing of personal data (we do not sell user data).</li>
              <li>The right to access, rectification, and portability of your data.</li>
            </ul>
            <p className="pt-2">
              To exercise any of these rights, please contact our privacy compliance team via our{' '}
              <Link href="/contact" className="underline text-ink font-mono">
                Contact Page
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            Questions &amp; Contact Information
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted font-sans leading-relaxed">
            If you have any questions or require more information about our Privacy Policy, please reach out through our{' '}
            <Link href="/contact" className="underline text-ink font-mono">
              Contact Form
            </Link>
            .
          </p>
        </section>
      </article>
    </div>
  );
}
