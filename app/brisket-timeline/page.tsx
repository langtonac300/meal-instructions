import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import BrisketSmokeTimeline from '@/components/tools/BrisketSmokeTimeline';
import { BRISKET_TIMELINE_SPECS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'BBQ Brisket Timeline & Stall Calculator — Backwards Scheduled Alarm Clock',
  description: 'Backwards schedule your 14-hour Texas brisket or pork butt smoke session. Calculate exact wake-up alarm times, butcher paper wrap milestones during the stall, pull temperatures, and cooler rest windows.',
  alternates: {
    canonical: absoluteUrl('/brisket-timeline'),
  },
};

export default function BrisketTimelinePage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'BBQ Brisket Timeline & Stall Calculator', path: '/brisket-timeline' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'BBQ Brisket Timeline & Reverse Smoke Schedule Planner',
    url: absoluteUrl('/brisket-timeline'),
    description: 'Calculate start times and milestone alarms to serve smoked brisket and pork butt on time.',
    applicationCategory: 'CulinaryApplication',
    operatingSystem: 'All',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {/* Breadcrumb & Actions */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle no-print">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Tools</span>
        </Link>
        <PrintButton
          label="PRINT SMOKE SCHEDULE"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">EVAPORATIVE STALL &amp; COLLAGEN HYDROLYSIS</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          BBQ Brisket Timeline &amp; Stall Planner
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Serving dinner 3 hours late is the #1 BBQ failure. Input your desired dinner time and meat weight to generate exact backwards-scheduled alarm milestones from lighting the smoker to the 3-hour cooler rest.
        </p>
      </section>

      {/* Interactive Tool */}
      <BrisketSmokeTimeline />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED BBQ SMOKING BENCHMARKS &amp; TEMPERATURE THRESHOLDS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">BBQ Cut</th>
                <th className="py-2">Smoker Temp</th>
                <th className="py-2">Estimated Rate</th>
                <th className="py-2">Stall Window</th>
                <th className="py-2">Final Pull Target</th>
                <th className="py-2">Cooler Rest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {BRISKET_TIMELINE_SPECS.map((b) => (
                <tr key={b.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{b.cutName.split('(')[0]}</td>
                  <td className="py-2 font-bold text-accent">{b.smokerTempF}°F</td>
                  <td className="py-2">~{b.estimatedMinutesPerLb} min/lb</td>
                  <td className="py-2">{b.expectedStallTempF}°F–{b.butcherPaperWrapTempF}°F</td>
                  <td className="py-2 font-bold text-ink">{b.finalTargetTempF}°F</td>
                  <td className="py-2">{b.minCoolerRestHours}–{b.maxCoolerRestHours} hrs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Deep Dive & BBQ Thermodynamics */}
      <section className="space-y-8 font-sans">
        {/* Section 1: The Physics of the Stall */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">THERMODYNAMIC EQUILIBRIUM &amp; EVAPORATIVE COOLING</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            The Physics of the BBQ Stall: Why Brisket Freezes at 160°F
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              Around hour 5 or 6 of smoking a full packer brisket, the internal temperature climbs steadily to roughly 155°F–165°F (68°C–74°C) and then flatlines completely. It can sit frozen at this exact temperature for <strong>2 to 6 hours</strong>.
            </p>
            <p>
              This phenomenon—the &quot;BBQ Stall&quot;—was proven by thermodynamicist Dr. Greg Blonder to be pure <strong>evaporative cooling (the latent heat of vaporization)</strong>:
            </p>
            <div className="bg-paper p-4 border-l-2 border-accent text-xs font-mono text-ink space-y-1">
              <div className="font-bold uppercase">The Sweating Mechanism:</div>
              <div>
                As muscle fibers contract at 150°F+, water is squeezed out of the cells and diffuses to the surface. In a 225°F smoker, that moisture evaporates into the air. The energy absorbed to vaporize liquid water (540 calories per gram) exactly matches the heat energy entering the meat from the fire. The meat literally sweats to keep itself cool. The temperature cannot rise until the surface moisture reservoir is exhausted.
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: The Texas Crutch */}
        <div className="bg-paper hairline-border p-6 sm:p-8 space-y-4 font-mono text-xs">
          <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
            THE TEXAS CRUTCH: PEACH BUTCHER PAPER VS HEAVY-DUTY FOIL
          </div>
          <p className="font-sans text-xs text-ink-muted leading-relaxed">
            Wrapping the meat at 165°F creates a humid boundary layer that halts surface evaporation, driving the temperature swiftly through the stall:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs pt-1">
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-accent font-bold uppercase text-[11px]">PEACH / PINK BUTCHER PAPER (RECOMMENDED)</div>
              <p className="text-ink-muted leading-relaxed">
                Porous un-waxed Kraft paper breathes just enough to allow excess steam to vent, preserving the crispy, peppery mahogany bark while holding in rendered beef tallow to lubricate the flat and bypass the stall in 60 minutes.
              </p>
            </div>
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-ink font-bold uppercase text-[11px]">HEAVY-DUTY ALUMINUM FOIL</div>
              <p className="text-ink-muted leading-relaxed">
                Forms a 100% hermetic seal that traps liquid. It pushes through the stall fastest, but essentially boils and braises the meat in its own juices (the &quot;pot roast effect&quot;), turning the outer bark into soft mush.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: The Faux Cambro Cooler Rest */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">COLLAGEN GELATINIZATION &amp; RESTING</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            The Faux Cambro Protocol: Why the 3-Hour Rest is Mandatory
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3 font-sans">
            <p>
              Taking a 203°F brisket directly off the smoker and slicing it immediately is a catastrophic failure. Boiling juices will erupt onto the cutting board, leaving the flat dry within 60 seconds.
            </p>
            <p>
              <strong>The Cooler Rest Protocol:</strong> Wrap the paper-wrapped brisket in two thick bath towels. Place it inside a standard dry picnic cooler (the &quot;Faux Cambro&quot;) and close the lid tightly.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-ink-muted">
              <li>
                <strong>Gelatin Solidification:</strong> Over 2 to 4 hours in the cooler, the temperature slowly drops from 203°F to the ideal slicing window of <strong>140°F–145°F</strong>. Melted collagen cools into a rich, viscous liquid gelatin that clings to individual muscle fibers.
              </li>
              <li>
                <strong>The Probe Test:</strong> Never pull brisket by clock or internal thermometer alone. Pull only when a probe inserted into the flat slides in with zero friction, feeling like a warm skewer pushed into room-temperature butter.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 4: Frequently Asked Questions */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
          <div className="micro-label text-accent">EXPERT OPERATIONAL Q&amp;A</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Frequently Asked Questions: BBQ Brisket Timelines
          </h2>
          <div className="space-y-4 divide-y divide-hairline text-sm text-ink-muted">
            <div className="pt-4 first:pt-0 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                What should you do if your brisket is done 4 hours before dinner guests arrive?
              </div>
              <p className="text-xs leading-relaxed">
                Celebrate! That is the ideal scenario for Texas barbecue. Wrapped in butcher paper, swaddled in towels, and rested inside an insulated cooler, a brisket will safely hold its thermal core above 145°F for 4 to 6 hours. In fact, a 4-hour cooler rest produces a significantly more tender, juicy brisket than a rushed 1-hour rest.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Should you trim the fat cap completely off a brisket flat?
              </div>
              <p className="text-xs leading-relaxed">
                No. Leave a uniform 1/4-inch fat cap across the entire brisket. The fat cap insulates the lean flat meat against direct radiative heat from the firebox and melts slowly during the 14-hour cook, keeping the meat moist. Trim off all hard, yellow kernel fat and silver skin, which will never render.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Should you smoke brisket fat-side up or fat-side down?
              </div>
              <p className="text-xs leading-relaxed">
                Position the fat cap facing the heat source. In an offset smoker where heat radiates from the top, place fat-side up. In vertical bullet smokers, pellet grills, or drum smokers where heat radiates directly upward from the bottom, place fat-side down to act as a thermal heat shield for the delicate meat.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                How do you know when to wrap during the stall?
              </div>
              <p className="text-xs leading-relaxed">
                Do not wrap strictly by temperature. Wrap only when two conditions are met: (1) the meat has reached 160°F–170°F, AND (2) the surface bark is dark mahogany black and fully set. If you rub your thumb firmly across the surface and seasoning does not scrape off, the bark is set and ready for butcher paper.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What causes the BBQ stall at 160°F?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Evaporative cooling. Surface moisture evaporates at a rate that absorbs heat energy at the exact same pace the smoker inputs heat, flatlining temperature for 2 to 6 hours.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why is peach butcher paper better than aluminum foil for brisket?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Porous butcher paper allows excess moisture vapor to vent to preserve crispy bark, while retaining rendered tallow to push past the stall without boiling.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long should you rest a smoked brisket in a cooler?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '2 to 4 hours. Wrapped in towels inside an insulated cooler, the internal temperature gently drops to 145°F while gelatin thickens and reabsorbs into the fibers.',
                },
              },
              {
                '@type': 'Question',
                name: 'Should you cook brisket fat-side up or fat-side down?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Always face the fat cap toward the primary heat source to act as a thermal shield against scorching.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

