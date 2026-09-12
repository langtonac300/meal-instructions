import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import BoiledEggTimer from '@/components/tools/BoiledEggTimer';
import { EGG_DONENESS_PROFILES } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Jammy Ramen Egg & Boiled Egg Precision Timer — Soft to Hard Boiled',
  description: 'Precision timing for runny soft-boiled eggs, 6.5-minute jammy ramen eggs (Ajitsuke Tamago), custard yolks, and hard-boiled eggs without gray rings. Boiling, steaming, and air fryer modes.',
  alternates: {
    canonical: absoluteUrl('/egg-timer'),
  },
};

export default function EggTimerPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Jammy Ramen Egg & Boiled Egg Precision Timer', path: '/egg-timer' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Precision Boiled & Jammy Egg Timer',
    url: absoluteUrl('/egg-timer'),
    description: 'Calculate boiling and air fryer times for soft, jammy, and hard-boiled eggs based on size and starting temperature.',
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
          label="PRINT EGG CHART"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">YOLK PROTEIN COAGULATION PHYSICS</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Jammy &amp; Boiled Egg Precision Timer
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Egg whites set at 145°F–150°F; yolks coagulate at 158°F. Master the precise 30-second window for gooey fudge-like ramen yolks or vibrant yellow hard-boiled eggs with zero sulfuric green rings.
        </p>
      </section>

      {/* Interactive Tool */}
      <BoiledEggTimer />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED EGG DONENESS PROFILES &amp; BOIL TIMELINES
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Doneness Style</th>
                <th className="py-2">Boil Time (Large)</th>
                <th className="py-2">Steam Time</th>
                <th className="py-2">Air Fryer 270°F</th>
                <th className="py-2">Yolk Texture</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {EGG_DONENESS_PROFILES.map((e) => (
                <tr key={e.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{e.name}</td>
                  <td className="py-2 font-bold text-accent">{e.boilTimeMins} mins</td>
                  <td className="py-2">{e.steamTimeMins} mins</td>
                  <td className="py-2">{e.airFryerTimeMins} mins</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{e.yolkState}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Deep Dive & Egg Biophysics */}
      <section className="space-y-8 font-sans">
        {/* Section 1: Differential Coagulation Temperatures */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">PROTEIN DENATURATION KINETICS</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            The Science of the 6.5-Minute Jammy Egg: Thermal Protein Gaps
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              An egg is not a uniform protein. Egg white (albumen) and egg yolk (lipovitellin) are composed of radically different proteins with distinct coagulation thresholds:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs pt-1">
              <div className="bg-paper p-4 border border-hairline space-y-1">
                <div className="font-bold text-accent">EGG WHITE (ALBUMEN) PROTEINS:</div>
                <ul className="list-disc pl-4 space-y-1 font-sans text-xs text-ink-muted mt-1">
                  <li><strong>Ovotransferrin (12%):</strong> Sets at 144°F (62°C) into a soft milk gel.</li>
                  <li><strong>Ovalbumin (54%):</strong> Requires 176°F (80°C) to fully cross-link into a firm, sliceable solid white.</li>
                </ul>
              </div>
              <div className="bg-paper p-4 border border-hairline space-y-1">
                <div className="font-bold text-accent">EGG YOLK LIPOPROTEINS:</div>
                <ul className="list-disc pl-4 space-y-1 font-sans text-xs text-ink-muted mt-1">
                  <li><strong>149°F (65°C):</strong> Begins thickening into a rich warm sauce.</li>
                  <li><strong>158°F (70°C):</strong> Coagulates into a spreadable, velvety jammy fudge (ramen egg standard).</li>
                  <li><strong>165°F (74°C):</strong> Hardens into a firm, crumbly solid yolk.</li>
                </ul>
              </div>
            </div>
            <p>
              The famous <strong>6-minute 30-second boiling mark</strong> is the exact physical inflection point where conductive heat from 212°F boiling water has fully set the outer ovalbumin while the interior yolk has heated to precisely 155°F–158°F.
            </p>
          </div>
        </div>

        {/* Section 2: Ferrous Sulfide Chemistry */}
        <div className="bg-paper hairline-border p-6 sm:p-8 space-y-4 font-mono text-xs">
          <div className="micro-label text-accent">CHEMICAL REACTION MECHANISM</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink font-sans">
            Why Hard-Boiled Yolks Turn Gray-Green: Ferrous Sulfide (FeS)
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3 font-sans">
            <p>
              The repulsive greenish-gray ring and foul sulfuric odor around overcooked yolks is not rot—it is a chemical reaction between iron and sulfur:
            </p>
            <div className="bg-paper-card p-4 border-l-2 border-accent text-xs font-mono text-ink space-y-1">
              <div className="font-bold uppercase">The Reaction:</div>
              <div>Fe²⁺ (Yolk Iron) + H₂S (White Hydrogen Sulfide) → FeS (Ferrous Sulfide Green Precipitate) + 2H⁺</div>
              <div className="text-ink-muted text-[11px] mt-1">
                When an egg cooks past 11 minutes at high heat, sulfur-containing amino acids (cysteine and methionine) in the white break down, liberating hydrogen sulfide gas. The gas diffuses inward toward the lower-pressure, cooler yolk, reacting with iron in the yolk surface to form a dark layer of ferrous sulfide.
              </div>
            </div>
            <p>
              <strong>The Ice-Bath Prevention:</strong> Plunging hot eggs immediately into ice water instantly drops exterior pressure, reversing the thermodynamic gradient and pulling sulfur gas <em>outward</em> through the porous shell instead of into the yolk.
            </p>
          </div>
        </div>

        {/* Section 3: Hot-Start Peeling Physics */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">SHELL ADHESION MECHANICS</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Why Cold-Water Starts Make Eggs Impossible to Peel
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-ink-muted">
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">⚠ Cold Start (Gradual Heat): The Shell Trap</div>
              <p className="text-xs leading-relaxed">
                Starting eggs in cold water allows proteins to heat gradually. As albumen slowly warms past 140°F, it bonds chemically to the inner keratin shell membrane. When you peel the egg, the fused membrane tears off large craters of egg white.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">✓ Hot Start (Boiling Water Shock): Clean Slide</div>
              <p className="text-xs leading-relaxed">
                Lowering refrigerator-cold eggs directly into rapidly boiling water (212°F) creates an instantaneous thermal shock. The outer layer of albumen coagulates instantly and shrinks away from the shell membrane, allowing the shell to slide off in two large pieces.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Frequently Asked Questions */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
          <div className="micro-label text-accent">EXPERT OPERATIONAL Q&amp;A</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Frequently Asked Questions: Boiled Eggs &amp; Jammy Yolks
          </h2>
          <div className="space-y-4 divide-y divide-hairline text-sm text-ink-muted">
            <div className="pt-4 first:pt-0 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                How do you make Japanese marinated ramen eggs (Ajitsuke Tamago)?
              </div>
              <p className="text-xs leading-relaxed">
                Boil large eggs straight from the fridge for exactly 6 minutes and 30 seconds. Transfer immediately to an ice-water bath for 10 minutes. Peel gently under running water, then submerge peeled eggs in a marinade of 1/2 cup water, 1/2 cup soy sauce, 1/4 cup mirin, and 1 tbsp sugar in a zip-top bag for 12 to 24 hours.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Does steaming eggs work better than boiling in water?
              </div>
              <p className="text-xs leading-relaxed">
                Yes! Steaming requires only 1 inch of water in a covered pot and boils in 2 minutes instead of 10 minutes. Steam transfers heat at the exact same 212°F temperature as boiling water but with less turbulence, drastically reducing the chance of eggs cracking against the pot bottom.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Can you "hard boil" eggs in an air fryer?
              </div>
              <p className="text-xs leading-relaxed">
                Yes. Place raw eggs directly in the air fryer basket and cook at 270°F (132°C) for 15 minutes (for hard-boiled) or 11 minutes (for jammy). Transfer directly to an ice bath. No water, no boiling pot required.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Does adding vinegar or baking soda to water make eggs easier to peel?
              </div>
              <p className="text-xs leading-relaxed">
                The effect is negligible compared to the hot-start method. Vinegar dissolves calcium carbonate in shells, but requires hours of soaking to make a difference. The only variables that truly guarantee easy peeling are: (1) starting in boiling water or steam, (2) using eggs that are at least 7 to 10 days old (higher albumen pH), and (3) shocking in ice water for 5+ minutes.
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
                name: 'Why do hard-boiled yolks develop a green-gray ring?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Overcooking causes sulfur in egg whites to react with iron in the yolk, forming ferrous sulfide (FeS). Shocking eggs in an ice bath halts the reaction and prevents green discoloration.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do you make boiled eggs easy to peel?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Always lower eggs into boiling water or steam (hot start) rather than cold water. The sudden 212°F thermal shock prevents white proteins from bonding to the shell membrane.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long do you boil eggs for jammy ramen yolks?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Boil large refrigerator-cold eggs for exactly 6 minutes and 30 seconds, then transfer immediately to an ice water bath for 10 minutes.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can you cook boiled eggs in an air fryer?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Cook raw eggs at 270°F for 11 minutes for jammy yolks or 15 minutes for hard boiled, followed by an immediate ice water shock.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

