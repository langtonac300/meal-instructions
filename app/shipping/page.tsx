import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl, SITE_NAME } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description: `Shipping methods, timelines, rates, and international policies for the ${SITE_NAME} shop.`,
  alternates: { canonical: absoluteUrl('/shipping') },
};

const CONTACT_EMAIL = 'support@mealinstructions.com';

export default function ShippingPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Shipping', path: '/shipping' }]);

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
        <span className="uppercase text-ink-muted">DOCUMENT // SHIPPING</span>
      </div>

      <header className="space-y-4">
        <div className="micro-label text-accent">SHOP POLICY</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Shipping Policy
        </h1>
        <p className="text-base text-ink-muted font-sans">
          How and when {SITE_NAME} shop orders reach you.
        </p>
      </header>

      <article className="space-y-8 text-ink font-sans text-sm sm:text-base leading-relaxed">

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            Processing Time
          </h2>
          <p>
            Merch and print orders are processed within 2–4 business days of purchase.
            You will receive a shipping confirmation email with a tracking number when
            the order leaves the fulfillment facility.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            Shipping Methods and Transit Times
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-xs sm:text-sm hairline-border">
              <thead>
                <tr className="hairline-b bg-paper-card">
                  <th className="text-left p-3 uppercase text-ink">Destination</th>
                  <th className="text-left p-3 uppercase text-ink">Method</th>
                  <th className="text-left p-3 uppercase text-ink">Transit</th>
                  <th className="text-left p-3 uppercase text-ink">Rate</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="hairline-b">
                  <td className="p-3">United States</td>
                  <td className="p-3">USPS Ground Advantage</td>
                  <td className="p-3">3–7 business days</td>
                  <td className="p-3">Calculated at checkout</td>
                </tr>
                <tr className="hairline-b">
                  <td className="p-3">United States</td>
                  <td className="p-3">USPS Priority</td>
                  <td className="p-3">2–3 business days</td>
                  <td className="p-3">Calculated at checkout</td>
                </tr>
                <tr className="hairline-b">
                  <td className="p-3">Canada</td>
                  <td className="p-3">USPS International</td>
                  <td className="p-3">7–14 business days</td>
                  <td className="p-3">Calculated at checkout</td>
                </tr>
                <tr>
                  <td className="p-3">Other International</td>
                  <td className="p-3">USPS International</td>
                  <td className="p-3">10–21 business days</td>
                  <td className="p-3">Calculated at checkout</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-ink-muted">
            Transit times are estimates from the fulfillment carrier and are not
            guaranteed. Weather, customs, and postal service disruptions can extend
            delivery windows.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            Customs, Duties, and Taxes
          </h2>
          <p>
            International orders may be subject to import duties, VAT, and customs
            handling fees assessed by the destination country. These fees are the
            recipient&apos;s responsibility and are collected at delivery by the local
            carrier. We cannot pre-pay or estimate these charges.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            Order Tracking
          </h2>
          <p>
            Every shipping confirmation email includes a tracking number. If you have
            not received a confirmation within 5 business days of ordering, check your
            spam folder and then email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>{' '}
            with your order number.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            Lost, Damaged, or Missing Shipments
          </h2>
          <p>
            If tracking has not updated for 10 business days (domestic) or 21 business
            days (international), or if your package arrives damaged, contact{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>{' '}
            within 30 days of the ship date. Include your order number and, for damage
            claims, photos of the packaging and product. We will file a carrier claim and
            reship or refund at our option.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            Address Errors
          </h2>
          <p>
            Please double-check your shipping address at checkout. We cannot re-route a
            package once it has been dispatched. Packages returned to us as undeliverable
            can be reshipped at your expense or refunded (less shipping) at your choice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            Related
          </h2>
          <p>
            See our <Link href="/refunds" className="underline">Refund &amp; Returns Policy</Link>{' '}
            and <Link href="/terms" className="underline">Terms of Service</Link> for
            additional information about shop purchases.
          </p>
        </section>

      </article>
    </div>
  );
}
