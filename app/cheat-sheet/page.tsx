import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { APPLIANCES } from '@/data/appliances';
import { COOK_TIME_DATASHEETS } from '@/data/cook-times';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import PrintButton from '@/components/PrintButton';
import { LeanIcon, LeanHeatWavesIcon, LeanClockIcon, LeanFlipIcon } from '@/components/icons/Lean5SIcons';

export const metadata: Metadata = {
  title: 'Air Fryer & Kitchen Cooking Cheat Sheet (Printable)',
  description: 'The ultimate zero-fluff cooking temperature, timing, and basket-shake cheat sheet for air fryers, sheet pans, skillets, and grills.',
  alternates: {
    canonical: absoluteUrl('/cheat-sheet'),
  },
};

const FAQ_ENTRIES = [
  {
    q: 'How are the cook times and temperatures on this cheat sheet calibrated?',
    a: 'Every time and temperature benchmark is derived from physical test-kitchen calibrations cross-referenced with USDA FSIS microbial lethality standards. Times assume standard single-layer food placement with preheated cooking vessels. For convective appliances like air fryers, benchmarks reflect higher convective boundary layer heat transfer rates (requiring 25°F lower temperatures and 20% shorter durations than standard ovens).',
  },
  {
    q: 'Why do air fryer cheat-sheet temperatures run 25°F lower than conventional ovens?',
    a: 'Air fryers operate with high-velocity motorized convection fans enclosed in a compact 4-to-6 quart chamber. This intense forced airflow strips away the insulating cold boundary layer of evaporative moisture that naturally envelopes raw food. The effective convective heat transfer coefficient is 2.5x to 3x higher than a stagnant oven cavity, necessitating a 25°F (14°C) temperature reduction to prevent exterior burning before internal pasteurization.',
  },
  {
    q: 'What does the "Flip Mark" indicate and why is it critical?',
    a: 'The flip mark indicates the precise elapsed cooking time when food must be turned over or basket-shaken. In countertop appliances and skillets, radiant heat and airflow originate primarily from one direction (overhead heating elements in air fryers or direct contact conduction in cast iron). Flipping redistributes surface moisture, equalizes thermal penetration, and ensures bilateral Maillard browning.',
  },
  {
    q: 'Should I follow cheat-sheet times or internal probe thermometer temperatures?',
    a: 'Always treat internal thermometer temperature as the primary non-negotiable safety gate, and elapsed time as a secondary approximation. Food mass, initial starting temperature (straight from 34°F refrigeration vs 68°F counter rest), protein water content, and appliance line voltage create minor variances. Always pull meat when your instant-read digital probe strikes the target internal pull temperature.',
  },
  {
    q: 'How should I adjust these parameters when doubling the quantity in an air fryer?',
    a: 'When doubling food quantity in an air fryer basket without stacking into layers, add 15% to 20% more cook time due to the added thermal mass absorbing heat. If food is stacked (such as fries or chicken wings), shake the basket vigorously every 4 to 5 minutes and add 25% to 30% additional time to allow airflow to penetrate inner layers.',
  },
];

export default function CheatSheetPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Cheat Sheet', path: '/cheat-sheet' }]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ENTRIES.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Breadcrumb & Actions */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <PrintButton
          label="PRINT CHEATSHEET"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">PRINTABLE REFERENCE MATRIX &amp; THERMAL BENCHMARKS</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          The Zero-Fluff Cooking Cheatsheet
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Hang this on the fridge. Exact temperatures, elapsed cook times, and mid-cook flip marks calibrated across convective, conductive, and radiant hardware.
        </p>
      </section>

      {/* Print pack CTA */}
      <section className="bg-paper-card hairline-border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div>
          <div className="micro-label text-accent">PRINTABLE RECIPE PACK</div>
          <p className="text-sm text-ink mt-1 font-sans">
            Times are half the job. The top 20 dinners as fridge cards &mdash; temp, time, flip mark,
            pull temp, ingredients and directions, one page each. No signup.
          </p>
        </div>
        <Link
          href="/print-pack"
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-paper font-mono text-xs uppercase tracking-wider hover:bg-accent transition-colors"
        >
          Print the pack &rarr;
        </Link>
      </section>

      {/* Appliance Sections */}
      <div className="space-y-8">
        {APPLIANCES.map((app) => {
          const datasheets = COOK_TIME_DATASHEETS.filter((d) => d.appliance === app.slug);
          return (
            <section key={app.slug} className="bg-paper-card hairline-border p-6 space-y-4">
              <div className="flex justify-between items-center hairline-b pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-paper hairline-border">
                    <LeanIcon name={app.slug} size={28} className="text-ink" />
                  </div>
                  <h2 className="text-lg font-bold uppercase tracking-tight text-ink font-sans">
                    {app.name}
                  </h2>
                </div>
                <Link
                  href={`/charts/${app.slug}`}
                  className="font-mono text-xs text-ink hover:underline uppercase"
                >
                  View Full Chart ({datasheets.length}) →
                </Link>
              </div>

              {datasheets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
                  {datasheets.map((item) => (
                    <Link
                      key={item.id}
                      href={`/how-long/${item.appliance}/${item.foodSlug}`}
                      className="bg-paper p-3.5 hairline-border space-y-2 hover:border-ink transition-colors block group"
                    >
                      <div className="font-bold text-ink text-sm font-sans group-hover:text-accent transition-colors">
                        {item.food}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-ink-muted text-xs pt-1 border-t border-hairline/60">
                        <div className="flex items-center gap-1">
                          <LeanHeatWavesIcon size={16} className="text-accent shrink-0" />
                          <span><strong className="text-ink">{item.tempFormatted}</strong></span>
                        </div>
                        <div className="flex items-center gap-1">
                          <LeanClockIcon size={16} className="text-ink-muted shrink-0" />
                          <span><strong className="text-ink">{item.timeFormatted}</strong></span>
                        </div>
                      </div>
                      <div className="text-[11px] text-accent font-bold pt-1 border-t border-hairline/40 flex items-center gap-1.5">
                        <LeanFlipIcon size={14} className="shrink-0" />
                        <span>{item.flipAtMinutes > 0 ? `Flip at ${item.flipAtMinutes}m` : 'No Flip'}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-ink-muted font-mono">
                  Standard operating range: {app.tempRange}
                </p>
              )}
            </section>
          );
        })}
      </div>

      {/* Engineering Reference Guide: Calibration Protocol */}
      <section className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6 font-mono text-xs text-ink-muted">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent">THERMAL CALIBRATION SPECIFICATIONS</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Hardware Mechanics: Convective Velocity vs Direct Conduction
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          <div className="space-y-3 p-5 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              Convective Boundary Layer Physics
            </div>
            <p className="text-xs leading-relaxed">
              When food is placed in stagnant ambient air (conventional ovens), evaporating surface water forms a microscopic blanket of cold vapor that insulates the food, slowing heat transfer. Motorized convection fans strip this boundary layer continuously, increasing heat flux by <strong>2.5x to 3x</strong>. This is why air fryer cooking times are 20% to 30% shorter at 25°F lower settings.
            </p>
          </div>

          <div className="space-y-3 p-5 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              Instant-Read Temperature Verification Law
            </div>
            <p className="text-xs leading-relaxed">
              Cooking times on this cheatsheet represent physical baseline medians under standard single-layer loading. Because starting meat temperatures vary between 34°F (cold refrigerator shelf) and 50°F (crisper drawer), always verify doneness with a calibrated digital instant-read thermometer inserted into the geometric thermal center of the protein.
            </p>
          </div>
        </div>
      </section>

      {/* On-Page FAQs */}
      <section className="bg-paper hairline-border p-6 sm:p-8 space-y-6">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent font-mono">E-E-A-T CULINARY CHEAT SHEET STANDARDS</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Frequently Asked Questions: Cooking Times &amp; Hardware Calibration
          </h2>
        </div>

        <div className="space-y-6">
          {FAQ_ENTRIES.map((faq, i) => (
            <div key={i} className="space-y-2">
              <h3 className="text-sm font-bold uppercase text-ink font-sans flex items-baseline gap-2">
                <span className="text-accent font-mono text-xs">0{i + 1}.</span>
                {faq.q}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed font-sans pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
