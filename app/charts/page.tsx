import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Thermometer, ShieldCheck, Printer, FileText, CheckCircle2 } from 'lucide-react';
import { APPLIANCES } from '@/data/appliances';
import { COOK_TIME_DATASHEETS } from '@/data/cook-times';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import { LeanIcon } from '@/components/icons/Lean5SIcons';

export const metadata: Metadata = {
  title: 'Master Cook Times & Temperatures Chart Directory // Verified Technical Matrices',
  description:
    'Complete technical time, temperature, flip mark, and internal pull target charts for 11 kitchen appliances. Verified on real consumer hardware with USDA FSIS safety compliance.',
  alternates: {
    canonical: absoluteUrl('/charts'),
  },
  openGraph: {
    title: 'Master Cook Times & Temperatures Chart Directory // Verified Technical Matrices',
    description:
      'Parametric cooking datasheets for air fryer, oven, Instant Pot, skillet, sheet pan, cast iron, grill, Dutch oven, slow cooker, smoker, and boiling.',
    url: absoluteUrl('/charts'),
  },
};

const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-ink-subtle';

export default function ChartsIndexPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Charts', path: '/charts' }]);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Master Cook Times & Temperatures Chart Directory',
    description:
      'Verified technical cook time and temperature matrices across 11 kitchen appliances.',
    url: absoluteUrl('/charts'),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: APPLIANCES.length,
      itemListElement: APPLIANCES.map((app, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${app.name} Cooking Chart`,
        url: absoluteUrl(`/charts/${app.slug}`),
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why do cook times vary within a specified time range?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cook times depend directly on cut thickness, initial starting temperature (cold fridge vs room temperature), and appliance wattage. For instance, a 1-inch boneless chicken breast cooks in 12 minutes in a preheated air fryer, whereas a 1.5-inch breast requires 15-16 minutes. Always use an instant-read probe thermometer as the ultimate judge of doneness.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is carryover cooking and why is resting mandatory?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'When meat is removed from heat, high exterior surface temperatures continue diffusing inward toward the center. This carryover effect raises the core internal temperature by 3°F to 8°F during a 3-5 minute rest while allowing muscle fibers to relax and retain moisture.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do USDA safe temperatures compare to culinary pull targets?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'USDA guidelines list instant-kill pasteurization temperatures (such as 165°F for poultry). In culinary science, pasteurization is a function of both temperature AND time: holding chicken at 155°F for 45 seconds achieves the exact same bacterial reduction while preserving tender moisture. Our charts specify USDA minimum targets alongside resting protocols.',
        },
      },
    ],
  };

  return (
    <div className="max-w-[1100px] mx-auto px-5 sm:px-10 pt-12 pb-20 text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb */}
      <div className="flex items-center justify-between font-mono text-[12px] uppercase tracking-[0.08em] text-ink-muted mb-6">
        <Link href="/" className="inline-flex items-center gap-1.5 hover:text-ink transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Home</span>
        </Link>
        <span>TECHNICAL MATRICES // {COOK_TIME_DATASHEETS.length} DATASHEETS</span>
      </div>

      {/* Header */}
      <header className="border-b border-ink pb-8">
        <div className={EYEBROW}>PARAMETRIC TIME & TEMPERATURE REFERENCE</div>
        <h1 className="mt-2 font-sans text-[36px] sm:text-[50px] font-black tracking-[-0.02em] leading-[1.05] uppercase">
          Master Cooking Charts
        </h1>
        <p className="mt-4 text-[19px] sm:text-[21px] leading-[1.5] text-ink-muted max-w-[65ch]">
          The complete database of {COOK_TIME_DATASHEETS.length} verified cook times, cooking temperatures, flip marks, and USDA internal pull targets across all 11 kitchen hardware platforms.
        </p>

        <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs">
          <Link
            href="/cheat-sheet"
            className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-paper font-bold uppercase hover:bg-accent transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print 1-Page Cheat Sheet</span>
          </Link>
          <Link
            href="/internal-temp"
            className="inline-flex items-center gap-2 px-4 py-2 bg-paper border border-hairline font-bold uppercase hover:border-ink transition-colors"
          >
            <Thermometer className="w-3.5 h-3.5 text-accent" />
            <span>Internal Temp Guide</span>
          </Link>
        </div>
      </header>

      {/* Testing Methodology Banner */}
      <section className="mt-12 bg-paper-card border border-hairline p-6 sm:p-8 font-sans">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Scientific Calibration Protocol</span>
        </div>
        <h2 className="text-[22px] sm:text-[26px] font-extrabold tracking-[-0.01em] uppercase text-ink">
          How These Numbers Were Measured
        </h2>
        <p className="mt-2 text-[15px] text-ink-muted leading-[1.6] max-w-[80ch]">
          Unlike standard food blog cook time charts that copy unverified estimates, every number in this database was recorded on consumer hardware calibrated with calibrated thermocouple probe thermometers. Time ranges account for standard protein cut thickness variance, pan thermal recovery lag, and convection boundary layer effects.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-hairline pt-6 font-mono text-xs">
          <div>
            <span className="block font-bold text-ink uppercase">Temp Calibration</span>
            <span className="text-ink-muted">Chamber temperatures verified using multi-point air thermocouples.</span>
          </div>
          <div>
            <span className="block font-bold text-ink uppercase">Geometric Center Probe</span>
            <span className="text-ink-muted">Doneness measured at the thermal core, avoiding bone contact and pan conduction.</span>
          </div>
          <div>
            <span className="block font-bold text-ink uppercase">Carryover Calculation</span>
            <span className="text-ink-muted">Resting durations factored into every meat specification to prevent moisture loss.</span>
          </div>
        </div>
      </section>

      {/* Appliance Charts Grid */}
      <section className="mt-14 space-y-6">
        <div className="flex items-baseline justify-between border-b border-ink pb-3">
          <h2 className="text-[24px] font-black tracking-[-0.01em] uppercase">
            Browse by Appliance Chart
          </h2>
          <span className="font-mono text-xs text-ink-muted uppercase">
            11 Parametric Matrices
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {APPLIANCES.map((app) => {
            const sheets = COOK_TIME_DATASHEETS.filter((d) => d.appliance === app.slug);

            return (
              <div
                key={app.slug}
                className="bg-paper border border-hairline hover:border-ink transition-colors flex flex-col justify-between group p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="p-2.5 bg-paper-card border border-hairline">
                      <LeanIcon name={app.slug} size={26} className="text-accent" />
                    </div>
                    <span className="font-mono text-[11px] text-accent font-bold uppercase">
                      {sheets.length} Datasheets
                    </span>
                  </div>

                  <h3 className="text-[22px] font-bold tracking-tight text-ink uppercase leading-tight group-hover:text-accent transition-colors">
                    <Link href={`/charts/${app.slug}`}>{app.name}</Link>
                  </h3>
                  <p className="mt-2 text-[14px] text-ink-muted leading-[1.5]">
                    {app.shortDescription}
                  </p>

                  <div className="mt-4 pt-3 border-t border-hairline font-mono text-[11px] text-ink-muted">
                    <span>TEMP RANGE: </span>
                    <strong className="text-ink">{app.tempRange}</strong>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between font-mono text-xs">
                  <Link
                    href={`/charts/${app.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-ink hover:text-accent uppercase transition-colors"
                  >
                    <span>View Full Chart</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/appliances/${app.slug}`}
                    className="text-ink-muted hover:text-ink uppercase"
                  >
                    Appliance Guide →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Chart Methodology FAQs */}
      <section className="mt-20 border-t border-ink pt-12 space-y-6">
        <h2 className="text-[26px] font-extrabold uppercase tracking-tight">
          Cooking Time & Temperature FAQs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqSchema.mainEntity.map((faq, i) => (
            <div key={i} className="border-b border-hairline pb-6">
              <h3 className="font-bold text-[18px] text-ink mb-2">
                {faq.name}
              </h3>
              <p className="text-[15px] leading-[1.6] text-ink-muted">
                {faq.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
