import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl, SITE_NAME } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${SITE_NAME} collects, uses, and protects visitor data — including cookies, analytics, and third-party advertising.`,
  alternates: { canonical: absoluteUrl('/privacy') },
};

const LAST_UPDATED = 'August 29, 2026';
const CONTACT_EMAIL = 'privacy@mealinstructions.com';

export default function PrivacyPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Privacy Policy', path: '/privacy' }]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-16 space-y-10">
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
        <span className="uppercase text-ink-muted">DOCUMENT // PRIVACY</span>
      </div>

      <header className="space-y-4">
        <div className="micro-label text-accent">LEGAL</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-ink-muted uppercase">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <article className="prose-content space-y-8 text-ink font-sans text-sm sm:text-base leading-relaxed">

        <section className="space-y-3">
          <p>
            {SITE_NAME} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the website
            mealinstructions.com (the &ldquo;Site&rdquo;). This Privacy Policy explains what
            information we collect when you visit the Site, how we use it, and the choices
            you have regarding that information.
          </p>
          <p>
            By using the Site, you agree to the collection and use of information in
            accordance with this policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            1. Information We Collect
          </h2>
          <p><strong>Information you provide directly.</strong> If you email us or use the
            contact form, we receive the email address and message contents you send. If
            you place an order in the shop, we receive the name, shipping address, and
            order details you supply.</p>
          <p><strong>Information collected automatically.</strong> When you visit the Site
            our servers and our third-party providers automatically log standard request
            data: IP address, browser type and version, device type, operating system,
            referring URL, pages viewed, timestamps, and interaction events. We use this
            to operate, secure, and improve the Site.</p>
          <p><strong>Cookies and similar technologies.</strong> We and our partners use
            cookies, local storage, and similar technologies. Some are strictly
            necessary; others measure traffic and personalize advertising.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            2. How We Use Information
          </h2>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Operate, maintain, and improve the Site and its features.</li>
            <li>Understand how visitors use the Site (aggregate analytics).</li>
            <li>Serve advertising, including personalized advertising where permitted.</li>
            <li>Respond to inquiries and provide customer support.</li>
            <li>Fulfill and ship merchandise orders.</li>
            <li>Detect, investigate, and prevent fraud, abuse, and security incidents.</li>
            <li>Comply with legal obligations.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            3. Third-Party Advertising (Google AdSense)
          </h2>
          <p>
            We use Google AdSense, a third-party advertising service provided by Google
            LLC, to display advertisements on the Site.
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Google, as a third-party vendor, uses cookies (including the DoubleClick
              DART cookie) to serve ads based on prior visits to this Site and other sites
              on the internet.</li>
            <li>Google&apos;s use of advertising cookies enables it and its partners to serve
              ads to users based on their visits to this Site and other sites.</li>
            <li>Third-party vendors and ad networks may also use cookies to serve ads on the
              Site.</li>
            <li>You can opt out of personalized advertising by visiting Google&apos;s{' '}
              <a href="https://adssettings.google.com" className="underline" target="_blank" rel="noopener noreferrer">Ads Settings</a>,
              or opt out of a third-party vendor&apos;s use of cookies for personalized
              advertising by visiting{' '}
              <a href="https://www.aboutads.info" className="underline" target="_blank" rel="noopener noreferrer">aboutads.info</a>,{' '}
              <a href="https://www.youronlinechoices.eu" className="underline" target="_blank" rel="noopener noreferrer">youronlinechoices.eu</a>{' '}
              (EEA/UK), or{' '}
              <a href="https://youradchoices.ca" className="underline" target="_blank" rel="noopener noreferrer">youradchoices.ca</a>{' '}
              (Canada).</li>
          </ul>
          <p>
            For visitors in the European Economic Area, the United Kingdom, and
            Switzerland, we present a consent management prompt before personalized ads
            or non-essential cookies are set. Non-personalized ads may still be shown
            where consent is not provided, using only limited data (such as coarse
            location and page context) required to serve and measure the ad.
          </p>
          <p>
            Learn more about how Google uses information from sites that use its services
            at{' '}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              policies.google.com/technologies/partner-sites
            </a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            4. Analytics
          </h2>
          <p>
            We use Google Analytics 4 to understand how visitors interact with the Site.
            Google Analytics uses cookies and similar identifiers to collect information
            about Site usage. IP addresses are truncated where supported. You can opt out
            of Google Analytics by installing the{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics opt-out browser add-on
            </a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            5. How We Share Information
          </h2>
          <p>We do not sell personal information. We share information only with:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Service providers who help us operate the Site (hosting, analytics, ad
              serving, email, payments, fulfillment) under contracts that limit their use
              to those services.</li>
            <li>Authorities when required by law, subpoena, or to protect rights, safety,
              or property.</li>
            <li>A successor in the event of a merger, acquisition, or sale of assets,
              under equivalent confidentiality obligations.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            6. Your Rights and Choices
          </h2>
          <p>
            Depending on where you live, you may have the right to access, correct,
            delete, port, or restrict processing of your personal information, and to
            object to certain uses (including targeted advertising). To exercise these
            rights, email us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
            We will respond within the timeframes required by applicable law.
          </p>
          <p>
            <strong>California residents (CCPA/CPRA):</strong> You may request disclosure
            of the categories and specific pieces of personal information we have
            collected about you, request deletion, and opt out of the &ldquo;sharing&rdquo;
            of personal information for cross-context behavioral advertising. To opt out,
            email us at the address above or use your browser&apos;s Global Privacy Control
            signal, which we honor.
          </p>
          <p>
            <strong>EEA, UK, and Swiss residents:</strong> We rely on your consent for
            non-essential cookies and personalized advertising, and on legitimate
            interests for aggregate analytics and Site security. You may withdraw consent
            at any time via the consent prompt or by clearing cookies for this Site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            7. Data Retention
          </h2>
          <p>
            We keep server logs for up to 90 days, analytics data for up to 14 months,
            order records for 7 years (as required by tax law), and email correspondence
            until it is no longer needed to serve your request.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            8. Children&apos;s Privacy
          </h2>
          <p>
            The Site is not directed to children under 13, and we do not knowingly
            collect personal information from children under 13. If you believe a child
            has provided us with information, contact us and we will delete it.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            9. Security
          </h2>
          <p>
            We use reasonable technical and organizational measures to protect
            information — TLS in transit, access controls, and a limited retention
            window. No system is perfectly secure; we cannot guarantee absolute security.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            10. International Transfers
          </h2>
          <p>
            The Site is hosted in the United States. If you access it from outside the
            United States, your information may be transferred to, stored, and processed
            in the United States or other countries where our service providers operate.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            11. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. The &ldquo;Last
            updated&rdquo; date at the top will reflect the most recent revision.
            Material changes will be noted on the Site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            12. Contact
          </h2>
          <p>
            Questions or requests about this Privacy Policy:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
          </p>
        </section>

      </article>
    </div>
  );
}
