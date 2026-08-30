import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl, SITE_NAME } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of Service governing use of ${SITE_NAME}, its content, tools, and shop.`,
  alternates: { canonical: absoluteUrl('/terms') },
};

const LAST_UPDATED = 'August 29, 2026';
const CONTACT_EMAIL = 'hello@mealinstructions.com';

export default function TermsPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Terms of Service', path: '/terms' }]);

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
        <span className="uppercase text-ink-muted">DOCUMENT // TERMS</span>
      </div>

      <header className="space-y-4">
        <div className="micro-label text-accent">LEGAL</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Terms of Service
        </h1>
        <p className="text-xs font-mono text-ink-muted uppercase">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <article className="space-y-8 text-ink font-sans text-sm sm:text-base leading-relaxed">

        <section className="space-y-3">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of
            mealinstructions.com and any services, tools, content, and merchandise
            offered on it (together, the &ldquo;Site&rdquo;) operated by {SITE_NAME}
            (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;). By using the Site,
            you agree to these Terms. If you do not agree, do not use the Site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            1. Eligibility
          </h2>
          <p>
            You must be at least 13 years old to use the Site. If you are between 13 and
            the age of majority in your jurisdiction, you may use the Site only with the
            involvement of a parent or legal guardian.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            2. Content and Intellectual Property
          </h2>
          <p>
            All recipes, datasheets, guides, calculators, code, graphics, and other
            material on the Site are the property of {SITE_NAME} or its licensors and
            are protected by copyright, trademark, and other laws.
          </p>
          <p>
            You may view and print reasonable copies of individual recipes for your own
            personal, non-commercial use. You may not scrape, mirror, republish, resell,
            or use content from the Site to train machine-learning models except as
            expressly permitted (for example, via the published{' '}
            <Link href="/llms.txt" className="underline">/llms.txt</Link> feed with
            attribution, or under a separate written agreement).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            3. Cooking, Food Safety, and No Professional Advice
          </h2>
          <p>
            Recipes, cook times, temperatures, and other guidance on the Site are
            provided for general informational purposes only. Cooking involves inherent
            risk: heat, sharp tools, foodborne illness, and allergens. You are solely
            responsible for verifying doneness with a calibrated thermometer, following
            USDA/FSIS or equivalent local food-safety guidance, and adapting recipes for
            your appliances and dietary needs.
          </p>
          <p>
            Nutritional values are estimates. The Site does not provide medical, dietary,
            allergy, or nutritional advice. Consult a qualified professional for any
            question about a specific medical or dietary condition.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            4. User Conduct
          </h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Access the Site by any automated means other than published, documented
              endpoints (sitemap, /llms.txt, /llms-full.txt, MCP server card) and only
              at a reasonable rate.</li>
            <li>Attempt to bypass any security or rate-limiting measure.</li>
            <li>Upload or transmit malware, worms, or exploits.</li>
            <li>Use the Site to infringe any third-party right or to violate any law.</li>
            <li>Impersonate any person or entity.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            5. Shop and Purchases
          </h2>
          <p>
            Merchandise offered through the Site is subject to our{' '}
            <Link href="/shipping" className="underline">Shipping Policy</Link> and{' '}
            <Link href="/refunds" className="underline">Refund &amp; Returns Policy</Link>.
            Prices are shown in U.S. dollars and are subject to change. Sales taxes are
            calculated at checkout where applicable. All sales are subject to
            availability. We may refuse or cancel any order.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            6. Third-Party Services and Links
          </h2>
          <p>
            The Site includes advertisements served by Google AdSense and its partners,
            analytics from Google Analytics, and links to third-party sites. We do not
            control the content of those services and are not responsible for their
            availability, accuracy, or policies. Your interaction with third parties is
            solely between you and them.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            7. Disclaimers
          </h2>
          <p className="uppercase text-xs font-mono">
            THE SITE AND ITS CONTENT ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
            AVAILABLE,&rdquo; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED,
            INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
            NON-INFRINGEMENT, ACCURACY, OR AVAILABILITY. WE DO NOT WARRANT THAT THE SITE
            WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            8. Limitation of Liability
          </h2>
          <p className="uppercase text-xs font-mono">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, {SITE_NAME.toUpperCase()} AND ITS
            OFFICERS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF
            PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE
            SITE. OUR TOTAL LIABILITY FOR ANY CLAIM RELATED TO THE SITE WILL NOT EXCEED
            THE GREATER OF (A) THE AMOUNT YOU PAID US IN THE PRIOR TWELVE MONTHS OR (B)
            USD $100.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            9. Indemnification
          </h2>
          <p>
            You agree to defend, indemnify, and hold harmless {SITE_NAME} from any
            claims, damages, and expenses (including reasonable attorneys&apos; fees)
            arising from your use of the Site, your violation of these Terms, or your
            violation of any right of a third party.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            10. Governing Law and Disputes
          </h2>
          <p>
            These Terms are governed by the laws of the State of Delaware, United States,
            without regard to conflict-of-laws principles. Any dispute will be brought
            exclusively in the state or federal courts located in Delaware, and you
            consent to the personal jurisdiction of those courts.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            11. Changes
          </h2>
          <p>
            We may update these Terms from time to time. The &ldquo;Last updated&rdquo;
            date reflects the most recent revision. Continued use of the Site after
            changes take effect constitutes acceptance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            12. Contact
          </h2>
          <p>
            Questions about these Terms:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
          </p>
        </section>

      </article>
    </div>
  );
}
