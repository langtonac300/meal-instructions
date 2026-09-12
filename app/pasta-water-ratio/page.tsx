import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import GrainWaterRatioMatrix from '@/components/tools/GrainWaterRatioMatrix';
import { GRAIN_WATER_SPECS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Rice, Grains & Pasta Water-to-Grain Ratio Matrix — Stovetop & Instant Pot',
  description: 'Exact liquid absorption ratios and simmer times for Jasmine rice, Basmati, Brown rice, Quinoa, Steel-cut oats, and Pasta. Stovetop and pressure cooker calculations.',
  alternates: {
    canonical: absoluteUrl('/pasta-water-ratio'),
  },
};

export default function PastaWaterRatioPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Rice, Grains & Pasta Water-to-Grain Ratio Matrix', path: '/pasta-water-ratio' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Rice, Grains & Pasta Water-to-Grain Ratio Calculator',
    url: absoluteUrl('/pasta-water-ratio'),
    description: 'Calculate water volume, salt teaspoons, and simmer minutes across 18 grain and pasta types.',
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
          label="PRINT RATIO CHART"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">HYDRATION &amp; STARCH GELATINIZATION</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Rice, Grains &amp; Pasta Ratio Matrix
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Stop serving mushy rice and chewy quinoa. Calculate exact water-to-grain liquid volumes, cold water rinsing protocols, salt amounts, and mandatory steam rest windows for stovetop and Instant Pot.
        </p>
      </section>

      {/* Interactive Tool */}
      <GrainWaterRatioMatrix />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED GRAIN WATER ABSORPTION &amp; SIMMER TIMELINES
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Grain / Pasta</th>
                <th className="py-2">Stovetop Ratio</th>
                <th className="py-2">Simmer Time</th>
                <th className="py-2">Instant Pot Ratio</th>
                <th className="py-2">IP High Pressure</th>
                <th className="py-2">Steam Rest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {GRAIN_WATER_SPECS.map((g) => (
                <tr key={g.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{g.name}</td>
                  <td className="py-2 font-bold text-accent">1:{g.volumeLiquidToGrainRatio}</td>
                  <td className="py-2">{g.stovetopSimmerMinutes} mins</td>
                  <td className="py-2">1:{g.instantPotLiquidRatio}</td>
                  <td className="py-2">{g.instantPotMinutes} mins</td>
                  <td className="py-2 font-bold text-ink">{g.mandatoryRestMinutes} mins</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Deep Dive & Starch Gelatinization Physics */}
      <section className="space-y-8 font-sans">
        {/* Section 1: Amylose vs Amylopectin Starch Chemistry */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">CARBOHYDRATE MOLECULAR STRUCTURE</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Why Rice Turns Gummy: The Amylose vs Amylopectin Equation
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              The texture of cooked grains is determined by the ratio of two distinct starch molecules inside the grain endosperm:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs pt-1">
              <div className="bg-paper p-4 border border-hairline space-y-1">
                <div className="font-bold text-accent">LINEAR AMYLOSE (19%–24%):</div>
                <p className="font-sans text-xs text-ink-muted leading-relaxed">
                  Dominant in long-grain rice (Basmati, Jasmine). Linear chains pack tightly and resist swelling, producing fluffy, separate, non-sticky grains that hold individual structural integrity when cooked.
                </p>
              </div>
              <div className="bg-paper p-4 border border-hairline space-y-1">
                <div className="font-bold text-accent">BRANCHED AMYLOPECTIN (80%+):</div>
                <p className="font-sans text-xs text-ink-muted leading-relaxed">
                  Dominant in short-grain (sushi rice, arborio). Highly branched polymer chains absorb liquid rapidly and burst at 150°F (65°C), forming a thick, sticky, cohesive gel web ideal for risotto and chopsticks.
                </p>
              </div>
            </div>
            <p>
              <strong>The Rinsing Protocol:</strong> Commercial milling shatters surface endosperm cells into a fine coating of loose starch dust. If not rinsed in cold water until the water runs 100% crystal clear (typically 3 to 4 rinses), that surface dust gelatinizes into a viscous paste in the pot, boiling over and turning the entire batch into glue.
            </p>
          </div>
        </div>

        {/* Section 2: Zero-Evaporation Pressure Cooker Ratios */}
        <div className="bg-paper hairline-border p-6 sm:p-8 space-y-4 font-mono text-xs">
          <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
            STOVETOP VS INSTANT POT: THE EVAPORATION GAP
          </div>
          <p className="font-sans text-xs text-ink-muted leading-relaxed">
            The single most common mistake when using an Instant Pot or pressure cooker for rice is using standard stovetop liquid ratios:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs pt-1">
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-accent font-bold uppercase text-[11px]">STOVETOP RATIO (1 : 1.5–1.75)</div>
              <p className="text-ink-muted leading-relaxed">
                A loose stovetop saucepan lid continuously vents steam throughout the 15-minute simmer. Up to 1/2 cup of water is lost directly into kitchen air via evaporation; the extra liquid accounts for this environmental loss.
              </p>
            </div>
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-ink font-bold uppercase text-[11px]">INSTANT POT RATIO (1 : 1.0–1.2)</div>
              <p className="text-ink-muted leading-relaxed">
                The sealed pressure vessel has <strong>zero evaporative loss</strong>. Every drop of water added remains inside the chamber. Using 1.5 cups of water in an Instant Pot results in waterlogged, soupy mush. Use a strict 1:1 ratio for white jasmine or basmati.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: The Pasta Water Emulsion Science */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">COLLOIDAL EMULSION PHYSICS</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            The Magic of Pasta Water: The Hydrocolloid Emulsifier
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3 font-sans">
            <p>
              Why do restaurant pasta sauces (carbonara, cacio e pepe, aglio e olio) cling silkily to noodles while homemade sauces separate into a puddle of oil at the bottom of the bowl?
            </p>
            <p>
              When pasta boils, starch granules swell, burst, and leach amylose into the cooking water. Clouded pasta water is a <strong>colloidal suspension of charged starch particles</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-ink-muted">
              <li>
                <strong>Surfactant Mechanism:</strong> Starch molecules act as physical emulsifying agents, lowering interfacial tension between hydrophobic cooking fats (butter, olive oil, rendered pancetta) and hydrophilic liquids (tomato sauce, wine, broth).
              </li>
              <li>
                <strong>The Skillet Swirl:</strong> When hot al dente pasta is tossed vigorously in a skillet with 1/4 cup of starchy pasta water and grated cheese, mechanical shear energy forces fat droplets into a permanent, velvety, glossy suspension that never separates.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 4: Frequently Asked Questions */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
          <div className="micro-label text-accent">EXPERT OPERATIONAL Q&amp;A</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Frequently Asked Questions: Rice &amp; Grain Cooking
          </h2>
          <div className="space-y-4 divide-y divide-hairline text-sm text-ink-muted">
            <div className="pt-4 first:pt-0 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Why is the 10-minute off-heat steam rest mandatory for rice?
              </div>
              <p className="text-xs leading-relaxed">
                When the timer rings and liquid is absorbed, moisture distribution is violently unequal: grains at the bottom of the pot are dry and scorching, while surface grains are coated in condensed water. Turning off the heat and leaving the lid sealed for 10 minutes allows ambient steam pressure to equalize, softening the top layer and pulling moisture into the core without scorching the bottom.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Why does quinoa taste bitter if not rinsed?
              </div>
              <p className="text-xs leading-relaxed">
                Raw quinoa grains are naturally coated in <em>saponin</em>—a bitter, soapy, insect-repelling chemical compound produced by the plant. Always rinse quinoa in a fine-mesh strainer under cold running water for 30 seconds to dissolve the saponin layer before cooking.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                How much salt should you add to pasta cooking water?
              </div>
              <p className="text-xs leading-relaxed">
                The standard culinary ratio is 1 tablespoon of Diamond Crystal kosher salt (or 1.5 teaspoons table salt) per 4 quarts of water. Pasta does not absorb seasoning from sauce effectively; salt must be absorbed into the starch matrix during gelatinization.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Should you ever stir rice while it is simmering?
              </div>
              <p className="text-xs leading-relaxed">
                Never stir rice during cooking. Agitating swelling rice grains mechanically ruptures starch cell walls, releasing sticky amylopectin into the liquid and turning your pot into sticky paste. Stir only once when adding water, bring to a boil, cover tightly, and leave undisturbed.
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
                name: 'Why does rice need to be rinsed before cooking?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Rinsing removes surface starch dust left from commercial milling that would otherwise gelatinize into a gummy, sticky paste in the pot.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why does pasta water create velvety sauces?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cloudy pasta water contains suspended amylose starches that act as physical emulsifiers, binding fats (butter, oil) and water into a glossy, stable sauce.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why is the Instant Pot rice ratio different from stovetop?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Pressure cookers have zero evaporative moisture loss. Stovetop pots lose up to 1/2 cup of steam into the room, requiring higher initial liquid ratios.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why is the 10-minute off-heat steam rest mandatory for rice?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Resting off the heat equalizes trapped steam across all grain layers, ensuring top grains soften while preventing bottom grains from burning.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

