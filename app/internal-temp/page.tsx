import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import InternalTempCalculator from '@/components/tools/InternalTempCalculator';
import { INTERNAL_TEMP_SPECS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Meat Thermometer Pull Temp & Thermal Carryover Chart — Safe Rest Targets',
  description: 'When to pull steak, chicken, pork, and salmon off the heat. Accounts for +5°F to +8°F thermal carryover resting rise to achieve peak juiciness while satisfying USDA pasteurization standards.',
  alternates: {
    canonical: absoluteUrl('/internal-temp'),
  },
};

export default function InternalTempPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Meat Thermometer Pull Temp & Thermal Carryover Chart', path: '/internal-temp' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Meat Thermometer Pull Temp & Thermal Carryover Calculator',
    url: absoluteUrl('/internal-temp'),
    description: 'Calculate exact pull temperatures and resting windows to prevent overcooked meat.',
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
          href="/"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <PrintButton
          label="PRINT TEMP CHART"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">THERMAL CARRYOVER PHYSICS</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          The Thermometer Pull Temp Guide
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          If you pull chicken at 165°F or steak at 135°F, it keeps cooking on the cutting board and turns into dry cardboard. Pull early, let carryover heat finish the job.
        </p>
      </section>

      {/* Interactive Tool Component */}
      <InternalTempCalculator />

      {/* SSR Static Reference Table for Search Engines */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED PULL & RESTING REFERENCE TABLE
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Cut</th>
                <th className="py-2">Ideal Doneness</th>
                <th className="py-2">Pull Temp</th>
                <th className="py-2">Carryover</th>
                <th className="py-2">Rest Window</th>
                <th className="py-2">Final Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {INTERNAL_TEMP_SPECS.map((spec) => {
                const idealLevel = spec.donenessLevels[1] || spec.donenessLevels[0];
                return (
                  <tr key={spec.id} className="hover:bg-paper-card">
                    <td className="py-2 font-bold text-ink">{spec.name.split('(')[0]}</td>
                    <td className="py-2">{idealLevel.label}</td>
                    <td className="py-2 text-accent font-bold">{idealLevel.pullTemp}°F</td>
                    <td className="py-2">+{idealLevel.carryoverRise}°F</td>
                    <td className="py-2">{idealLevel.restMinutes} mins</td>
                    <td className="py-2 font-bold text-ink">{idealLevel.finalTargetTemp}°F</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Deep Dive & Food Science */}
      <section className="space-y-8 font-sans">
        {/* Section 1: Carryover Thermodynamics */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">THERMAL INERTIA &amp; FOURIER'S LAW</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            The Physics of Carryover Cooking: Why Meat Keeps Heating Off the Heat
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              When a steak or roast cooks in an oven, skillet, or grill, heat transfers from the exterior inward. By the time the core reaches 125°F (medium-rare), the outer millimeters of the meat are frequently between 250°F and 350°F due to intense conduction and radiative sear.
            </p>
            <p>
              Removing the meat from the heat source halts external thermal transfer, but it does not halt internal energy equilibrium. Following Fourier&apos;s law of thermal conduction, heat flows downhill from the superheated outer muscle fibers into the colder core. Depending on mass, ambient kitchen temperature, and cooking surface heat:
            </p>
            <ul className="list-disc pl-5 space-y-1 font-mono text-xs text-ink">
              <li><strong>Thin Cuts (under 1 inch):</strong> +3°F to +5°F carryover rise; rest 3 to 5 minutes.</li>
              <li><strong>Thick Steaks &amp; Chicken Breasts (1.5–2 inches):</strong> +5°F to +8°F carryover rise; rest 7 to 10 minutes.</li>
              <li><strong>Large Roasts, Pork Butts, &amp; Whole Turkeys (5+ lbs):</strong> +10°F to +15°F carryover rise; rest 20 to 35 minutes.</li>
            </ul>
            <p>
              Pulling meat at your desired final serving temperature guarantees an overcooked core. You must always pull early at the calibrated pull temperature.
            </p>
          </div>
        </div>

        {/* Section 2: Time-Temperature Lethality Table */}
        <div className="bg-paper hairline-border p-6 sm:p-8 space-y-4 font-mono text-xs">
          <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
            USDA FSIS TIME-TEMPERATURE LETHALITY TABLE (7.0-LOG10 SALMONELLA REDUCTION)
          </div>
          <p className="font-sans text-xs text-ink-muted leading-relaxed">
            The widespread kitchen belief that poultry is dangerous below 165°F is an oversimplification of USDA FSIS guidelines. 165°F represents <em>instantaneous</em> pasteurization (&lt; 1 second). Complete, food-safe pathogen destruction occurs at lower temperatures when sustained over time:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                  <th className="py-2">Internal Core Temp</th>
                  <th className="py-2">Holding Time Required</th>
                  <th className="py-2">Protein Hydration Impact</th>
                  <th className="py-2">Culinary Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-accent">165°F (73.9°C)</td>
                  <td className="py-2">&lt; 1.0 second (Instant)</td>
                  <td className="py-2">Muscle fibers violently contract; severe moisture expulsion</td>
                  <td className="py-2 font-bold text-ink">Chalky, dry chicken breast</td>
                </tr>
                <tr className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">160°F (71.1°C)</td>
                  <td className="py-2">13.8 seconds</td>
                  <td className="py-2">Substantial moisture loss; actin denaturing underway</td>
                  <td className="py-2">Tolerable, firm texture</td>
                </tr>
                <tr className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-accent">155°F (68.3°C)</td>
                  <td className="py-2">44.2 seconds</td>
                  <td className="py-2">Optimal balance: tender fibers with high moisture retention</td>
                  <td className="py-2 font-bold text-ink">Extremely juicy, safe poultry</td>
                </tr>
                <tr className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">150°F (65.6°C)</td>
                  <td className="py-2">2.7 minutes</td>
                  <td className="py-2">Maximal cellular moisture retained in myofibrillar matrix</td>
                  <td className="py-2">Sous-vide standard; velvety texture</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="font-sans text-[11px] text-ink-subtle">
            <em>Source: USDA FSIS Notice 94-05 &amp; Food Safety Inspection Service Cooking Guideline for Meat and Poultry Products.</em>
          </p>
        </div>

        {/* Section 3: Probe Placement Protocol */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">CALIBRATION &amp; TECHNIQUE</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Probe Anatomy: 4 Rules for Zero-Error Temperature Reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-ink-muted">
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">1. Target the Geometric Thermal Core</div>
              <p className="text-xs leading-relaxed">
                Insert probe horizontally from the side of steaks or chicken breasts rather than downward from the top. This embeds 1.5 to 2 inches of the probe shaft inside the meat, insulating the sensing tip against ambient oven or pan air.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">2. Avoid Bone &amp; Intramuscular Fat Pockets</div>
              <p className="text-xs leading-relaxed">
                Bone conducts thermal energy significantly faster than muscle tissue (+15°F artifact), while pure fat deposits heat unevenly. Keep the probe sensor tip at least 0.75 inches away from any bone structure.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">3. Rest on an Elevated Wire Rack, Never a Plate</div>
              <p className="text-xs leading-relaxed">
                Placing hot seared meat directly on a cold ceramic plate creates thermal shock and traps escaping steam underneath, dissolving crust crispness. An elevated wire rack over a rimmed sheet ensures 360° air circulation and keeps the crust pristine.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">4. Ice-Bath Thermometer Calibration</div>
              <p className="text-xs leading-relaxed">
                Digital instant-read probes drift over time. Fill a glass completely with crushed ice, top with cold water, stir, and submerge probe. After 60 seconds, it must read 32.0°F (±0.5°F). Re-calibrate if it deviates.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Frequently Asked Questions */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
          <div className="micro-label text-accent">EXPERT OPERATIONAL Q&amp;A</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Frequently Asked Questions: Meat Pull Temps &amp; Carryover
          </h2>
          <div className="space-y-4 divide-y divide-hairline text-sm text-ink-muted">
            <div className="pt-4 first:pt-0 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Why does ground beef require 160°F while whole muscle beef can be pulled at 130°F?
              </div>
              <p className="text-xs leading-relaxed">
                On whole muscle cuts like ribeyes and strip steaks, bacterial pathogens (such as E. coli) reside solely on the exterior surface, which is instantly sanitized during searing (exceeding 250°F–400°F). During commercial grinding, exterior surface bacteria are distributed uniformly throughout the entire mass. Therefore, the internal thermal core of ground meat must reach pasteurization temperatures.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Should you tent resting meat tightly with aluminum foil?
              </div>
              <p className="text-xs leading-relaxed">
                No. Tenting meat tightly creates a miniature steam sauna. Trapped moisture condensates on the aluminum foil and drips back onto the meat, completely softening the crisp Maillard crust you worked hard to build. Instead, rest meat uncovered in a draft-free kitchen spot, or drape foil very loosely only if resting outdoors in cold weather.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Does carryover cooking occur when cooking sous-vide?
              </div>
              <p className="text-xs leading-relaxed">
                No. In sous-vide cooking, the water bath is set precisely to the target internal finish temperature (e.g., 132°F for medium-rare). There is no severe thermal gradient between the surface of the meat and the core; both equalize at exactly 132°F. Carryover cooking only occurs when external cooking temperatures significantly exceed the desired target core temperature.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                What happens to meat fibers if you slice immediately without resting?
              </div>
              <p className="text-xs leading-relaxed">
                At peak cooking temperature, actin and myosin filaments are contracted, squeezing water into the extracellular space under high pressure. Resting allows the muscle fibers to relax and re-absorb up to 15% of that expelled cellular moisture. Slicing too early causes immediate liquid drainage onto the cutting board, leaving the interior dry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
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
                name: 'Why does ground beef require 160°F while whole muscle beef can be pulled at 130°F?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'On whole muscle cuts like ribeyes and strip steaks, bacterial pathogens reside solely on the exterior surface, which is instantly sanitized during searing. Grinding mixes exterior surface bacteria throughout the meat, requiring the core to reach pasteurization temperature.',
                },
              },
              {
                '@type': 'Question',
                name: 'Should you tent resting meat tightly with aluminum foil?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. Tenting meat tightly creates a miniature steam chamber, ruining crisp seared crusts. Rest meat uncovered on an elevated wire rack in a draft-free room.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does carryover cooking occur when cooking sous-vide?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. Sous-vide equalizes meat to the exact water bath temperature without creating a high-heat thermal gradient between the surface and core.',
                },
              },
              {
                '@type': 'Question',
                name: 'What happens to meat fibers if you slice immediately without resting?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Resting allows contracted muscle fibers to relax and re-absorb up to 15% of free intracellular juices. Immediate slicing dumps this moisture onto the cutting board.',
                },
              },
            ],
          }),
        }}
      />

    </div>
  );
}

