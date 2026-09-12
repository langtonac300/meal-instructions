import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import SteakDonenessTimer from '@/components/tools/SteakDonenessTimer';
import { STEAK_DONENESS_TARGETS, STEAK_CUT_SPECS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Reverse Sear Steak Calculator & Doneness Pull Temperature Guide',
  description: 'Precision reverse sear timing and thermometer pull temperatures for thick Ribeye, NY Strip, Filet Mignon, and Tomahawk steaks. Thermal carryover math included.',
  alternates: {
    canonical: absoluteUrl('/steak-timer'),
  },
};

export default function SteakTimerPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Reverse Sear Steak Calculator & Doneness Pull Temperature Guide', path: '/steak-timer' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Reverse Sear Steak Calculator & Doneness Timer',
    url: absoluteUrl('/steak-timer'),
    description: 'Calculate low-oven cook times, pull temperatures, and 60-second cast iron sear durations based on steak thickness.',
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
          label="PRINT STEAK GUIDE"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">THERMAL GRADIENT ELIMINATION</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Reverse Sear &amp; Steak Doneness Calculator
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Banish the gray overcooked band forever. Low-and-slow convection heat gently brings the interior core to exact pull temperature before a blazing 60-second cast iron butter baste.
        </p>
      </section>

      {/* Interactive Tool */}
      <SteakDonenessTimer />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED DONENESS TEMPERATURE TARGETS &amp; CARRYOVER
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Doneness</th>
                <th className="py-2">Oven Pull Temp</th>
                <th className="py-2">Post-Sear Core</th>
                <th className="py-2">Final Rested Target</th>
                <th className="py-2">Visual Characteristics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {STEAK_DONENESS_TARGETS.map((t) => (
                <tr key={t.doneness} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{t.label}</td>
                  <td className="py-2 font-bold text-accent">{t.ovenPullTempF}°F</td>
                  <td className="py-2">{t.searFinishInternalTempF}°F</td>
                  <td className="py-2 font-bold text-ink">{t.finalRestedTempF}°F</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{t.colorCenter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Deep Dive & Steak Thermodynamics */}
      <section className="space-y-8 font-sans">
        {/* Section 1: The Gray Band Physics */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">THERMAL GRADIENTS &amp; FOURIER'S LAW</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Why Traditional Searing Fails: The Physics of the Gray Band
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              In traditional steak cooking (placing a cold 40°F steak straight into a 500°F cast iron skillet), heat conducts inward according to Fourier&apos;s law. To get the center of a 1.5-inch thick ribeye to 130°F (medium-rare), the meat must stay in the screaming-hot pan for 10 to 14 minutes.
            </p>
            <p>
              By the time the thermal core reaches 130°F, the outer 4 to 6 millimeters of meat have been exposed to temperatures exceeding 250°F–350°F. The actin and myosin protein filaments violently tighten and dehydrate, creating a thick, rubbery, dry gray ring of well-done meat surrounding a small bullseye of pink.
            </p>
            <div className="bg-paper p-4 border-l-2 border-accent text-xs font-mono text-ink space-y-1">
              <div className="font-bold uppercase">The Reverse Sear Solution:</div>
              <div>
                By reversing the sequence—baking low and slow at 225°F–250°F first—the entire steak gently warms into uniform thermal equilibrium from edge to center. The final sear requires only <strong>45 to 60 seconds per side</strong> in a smoking pan, developing a paper-thin, mahogany Maillard crust with <strong>zero gray band</strong>.
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Surface Dehydration Physics */}
        <div className="bg-paper hairline-border p-6 sm:p-8 space-y-4 font-mono text-xs">
          <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
            SURFACE DEHYDRATION &amp; THE LATENT HEAT OF VAPORIZATION
          </div>
          <p className="font-sans text-xs text-ink-muted leading-relaxed">
            The Maillard browning reaction cannot occur until surface temperatures exceed <strong>285°F (140°C)</strong>. Liquid water cannot exceed 212°F (100°C) at atmospheric pressure. If your steak is wet when it hits the skillet, 100% of the pan's thermal energy is consumed by the <em>latent heat of vaporization</em> (540 calories per gram of water) just boiling surface moisture:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs pt-1">
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-accent font-bold uppercase text-[11px]">THE LOW-OVEN SURFACE DESICCATOR</div>
              <p className="text-ink-muted leading-relaxed">
                During the 35–45 minutes in a 225°F oven on an elevated wire rack, dry air circulates around the steak, evaporating surface moisture. The surface forms a dry, tacky pellicle that browns instantaneously upon hitting hot fat.
              </p>
            </div>
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-ink font-bold uppercase text-[11px]">THE BUTTER BASTE (ARROSÉ) FINISH</div>
              <p className="text-ink-muted leading-relaxed">
                During the final 30 seconds of searing, drop 2 tablespoons of unsalted butter, crushed garlic cloves, and rosemary into the skillet. Spoon the foaming brown butter (beurre noisette) over the top surface. The browned milk solids coat the steak in savory nutty pyrazines.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Cut Selection & Muscle Anatomy */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">BUTCHER ANATOMY</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Steak Anatomy: Which Cuts Must Be Reverse Seared
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-ink-muted">
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">Thick Ribeye (1.5"–2"+)</div>
              <p className="text-xs leading-relaxed">
                Consists of the tender <em>spinalis dorsi</em> (ribeye cap) and the central <em>longissimus</em>. Heavy intramuscular fat marbling requires sustained low heat to render into succulent moisture before the sear.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">New York Strip (1.5"+)</div>
              <p className="text-xs leading-relaxed">
                A single dense muscle (<em>longissimus dorsi</em>) with a tight fiber grain and an exterior fat cap. Reverse searing tenderizes the dense muscle fibers uniformly while rendering the fat strip crisp.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">Filet Mignon / Tenderloin</div>
              <p className="text-xs leading-relaxed">
                Extremely lean muscle (<em>psoas major</em>) with virtually zero intramuscular fat. Traditional searing quickly turns the exterior stringy. Reverse searing preserves maximum tenderness and cellular hydration.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Frequently Asked Questions */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
          <div className="micro-label text-accent">EXPERT OPERATIONAL Q&amp;A</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Frequently Asked Questions: Reverse Sear Steaks
          </h2>
          <div className="space-y-4 divide-y divide-hairline text-sm text-ink-muted">
            <div className="pt-4 first:pt-0 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Can you reverse sear thin steaks (under 1 inch thick)?
              </div>
              <p className="text-xs leading-relaxed">
                No. Reverse searing is designed for thick-cut steaks (1.5 inches to 2.5 inches). On a thin 0.75-inch supermarket steak, the 60-second sear in a hot skillet will instantly overcook the core to medium-well. For steaks under 1 inch, sear straight from the cold refrigerator on high heat with frequent 30-second flips.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Do you need to rest a reverse-seared steak after the final sear?
              </div>
              <p className="text-xs leading-relaxed">
                Unlike traditionally seared steaks that require 10 to 15 minutes of resting, a reverse-seared steak needs only 2 to 3 minutes. Because the steak came up to temperature slowly in the oven, there is no extreme internal thermal pressure pushing juices outward. You can serve it hot and crisp immediately.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Why should you salt your steak 12 to 24 hours in advance (Dry Brining)?
              </div>
              <p className="text-xs leading-relaxed">
                Dry brining utilizes osmosis. Salt draws moisture to the surface, dissolves into a concentrated brine, and is reabsorbed deep into the muscle tissue via diffusion. This permanently denatures muscle proteins, allowing them to retain 11% more water during cooking while desiccating the exterior surface for maximum sear crispness.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                What oil should you use in the cast iron skillet for the final sear?
              </div>
              <p className="text-xs leading-relaxed">
                Use a neutral high-smoke-point fat with a smoke threshold above 450°F, such as refined avocado oil (520°F), beef tallow (420°F–450°F), or clarified butter / ghee (485°F). Never sear with unclarified butter or extra virgin olive oil, which burn and turn bitter within 30 seconds.
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
                name: 'Can you reverse sear thin steaks under 1 inch?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. Reverse searing is engineered for cuts 1.5 inches or thicker. Thin steaks will overcook during the final sear.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do you need to rest a reverse-seared steak?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Only 2 to 3 minutes. Because the steak was heated gradually, internal pressure is minimal and juices remain locked in.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why should you dry brine steak in advance?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Dry brining dissolves salt into interior muscle fibers through osmosis, retaining up to 11% more moisture and drying the surface for a better sear.',
                },
              },
              {
                '@type': 'Question',
                name: 'What oil should you use for the final cast iron sear?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Refined avocado oil, beef tallow, or clarified ghee. Avoid regular butter or extra virgin olive oil which burn below 400°F.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

