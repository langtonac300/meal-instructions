import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl, SITE_NAME } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Refund & Returns Policy',
  description: `Refund, return, and exchange policy for the ${SITE_NAME} shop.`,
  alternates: { canonical: absoluteUrl('/refunds') },
};

const CONTACT_EMAIL = 'support@mealinstructions.com';

export default function RefundsPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Refunds', path: '/refunds' }]);

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
        <span className="uppercase text-ink-muted">DOCUMENT // REFUNDS</span>
      </div>

      <header className="space-y-4">
        <div className="micro-label text-accent">SHOP POLICY</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Refund &amp; Returns
        </h1>
        <p className="text-base text-ink-muted font-sans">
          If a {SITE_NAME} shop order arrives wrong, damaged, or defective, we will make
          it right.
        </p>
      </header>

      <article className="space-y-8 text-ink font-sans text-sm sm:text-base leading-relaxed">

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            Damaged, Defective, or Incorrect Items
          </h2>
          <p>
            If your order arrives damaged, defective, or is not what you ordered, email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>{' '}
            within 30 days of delivery with your order number and clear photos of the
            item and packaging. We will send a replacement at no cost or issue a full
            refund, at your choice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            Standard Returns
          </h2>
          <p>
            Unworn, unwashed apparel and unopened print goods can be returned within 30
            days of delivery for a refund of the item price (original shipping is
            non-refundable). Return shipping is the customer&apos;s responsibility unless
            the return is due to our error. Please email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>{' '}
            before returning any item to receive return instructions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            Print-on-Demand and Personalized Items
          </h2>
          <p>
            Some apparel and print items are produced on demand for each order.
            Print-on-demand items are non-refundable except in the case of defect,
            damage, or fulfillment error covered above. Sizing and color are the
            customer&apos;s responsibility — please consult the size chart on each
            product page before ordering.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            Exchanges
          </h2>
          <p>
            For wrong sizes on eligible items, place a new order for the correct size and
            return the original per the standard-returns process above. This is the
            fastest way to get the item you want.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            Refund Processing
          </h2>
          <p>
            Approved refunds are issued to the original payment method within 5–10
            business days of receipt of the returned item or, for damage/defect claims,
            within 5 business days of claim approval. Depending on your bank or card
            issuer, the credit may take an additional billing cycle to appear.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            Cancellations
          </h2>
          <p>
            Orders can be cancelled for a full refund if they have not yet entered
            production or shipping. Email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>{' '}
            with your order number as soon as possible.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            Non-Returnable
          </h2>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Digital downloads and gift cards.</li>
            <li>Items marked &ldquo;Final Sale&rdquo; on the product page.</li>
            <li>Items returned more than 30 days after delivery.</li>
            <li>Items returned in used, washed, or non-resalable condition.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            Related
          </h2>
          <p>
            See our <Link href="/shipping" className="underline">Shipping Policy</Link>{' '}
            and <Link href="/terms" className="underline">Terms of Service</Link> for
            additional details.
          </p>
        </section>

      </article>
    </div>
  );
}
