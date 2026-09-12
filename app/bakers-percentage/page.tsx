import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import BakersPercentageCalculator from '@/components/tools/BakersPercentageCalculator';
import { BAKERS_PRESETS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: "Baker's Percentage & Dough Hydration Calculator — Pizza & Bread Math",
  description: 'Precision baker percentage and hydration calculator for Neapolitan pizza, Detroit pan pizza, sourdough boules, and sandwich loaves. Real-time gram scale scaling.',
  alternates: {
    canonical: absoluteUrl('/bakers-percentage'),
  },
};

export default function BakersPercentagePage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: "Baker's Percentage & Dough Hydration Calculator", path: '/bakers-percentage' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: "Baker's Percentage & Dough Hydration Calculator",
    url: absoluteUrl('/bakers-percentage'),
    description: 'Calculate exact hydration percentage, salt, yeast, and olive oil grams relative to 100% flour weight.',
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
          label="PRINT DOUGH SHEET"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">MATHEMATICAL DOUGH FORMULATION</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Baker's Percentage &amp; Hydration Calculator
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Flour is always 100%. Master hydration, salinity, and yeast ratios to scale artisan sourdough boules, Detroit-style crispy edge pan pizza, and soft everyday sandwich bread.
        </p>
      </section>

      {/* Interactive Tool */}
      <BakersPercentageCalculator />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED DOUGH ARCHETYPES &amp; BAKER'S RATIOS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Dough Style</th>
                <th className="py-2">Hydration %</th>
                <th className="py-2">Salt %</th>
                <th className="py-2">Yeast %</th>
                <th className="py-2">Fermentation</th>
                <th className="py-2">Bake Temp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {BAKERS_PRESETS.map((p) => (
                <tr key={p.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{p.name}</td>
                  <td className="py-2 font-bold text-accent">{p.hydrationPct}%</td>
                  <td className="py-2">{p.saltPct}%</td>
                  <td className="py-2">{p.yeastPct}%</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{p.fermentationType}</td>
                  <td className="py-2 font-bold text-ink">{p.bakeTempF}°F</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Deep Dive & Dough Physics */}
      <section className="space-y-8 font-sans">
        {/* Section 1: The Flour Baseline Principle */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">STOICHIOMETRIC NORMALIZATION</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            The Law of Baker's Percentages: Why Flour is Always 100%
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              In professional bread and pizza baking, standard recipe percentages fail because total dough weight shifts with every batch. Instead, bakers normalize all formulas to <strong>Total Flour Weight = 100.0%</strong>.
            </p>
            <p>
              Every other ingredient is expressed as a direct mathematical ratio of that flour weight:
            </p>
            <div className="bg-paper p-4 border-l-2 border-accent text-xs font-mono text-ink space-y-1">
              <div className="font-bold uppercase">The Baker's Formula:</div>
              <div>Ingredient % = (Weight of Ingredient in Grams / Total Flour Weight in Grams) × 100</div>
              <div className="text-ink-muted text-[11px] mt-1">
                For example, a dough with 1,000g flour, 700g water, and 20g salt is written as: 100% Flour, 70% Hydration, 2.0% Salt. If you want to make 3 pizzas instead of 1, you simply adjust the flour to 450g; water automatically calculates to 315g (70%) and salt to 9g (2%).
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Hydration Curves & Gluten Matrix */}
        <div className="bg-paper hairline-border p-6 sm:p-8 space-y-4 font-mono text-xs">
          <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
            HYDRATION CURVES &amp; CRUMB CELL ARCHITECTURE
          </div>
          <p className="font-sans text-xs text-ink-muted leading-relaxed">
            Hydration (the water-to-flour percentage) dictates dough rheology, oven spring, and interior crumb openness:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs pt-1">
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-accent font-bold uppercase text-[11px]">58%–62% STIFF DOUGH</div>
              <div className="font-bold text-ink">Bagels, Sandwich Loaves</div>
              <p className="text-ink-muted leading-relaxed">
                Tightly organized gluten network with low extensibility. Easy to shape by hand, holds structural shape during proofing, and produces a dense, uniform, velvety crumb ideal for slicing.
              </p>
            </div>
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-ink font-bold uppercase text-[11px]">65%–70% ARTISAN STANDARD</div>
              <div className="font-bold text-ink">Neapolitan Pizza, Baguettes</div>
              <p className="text-ink-muted leading-relaxed">
                The golden weeknight sweet spot. Provides sufficient free water to steam and expand rapidly during oven spring without turning the dough too slack or sticky to stretch onto a peel.
              </p>
            </div>
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-ink-subtle font-bold uppercase text-[11px]">75%–85% HIGH HYDRATION</div>
              <div className="font-bold text-ink">Focaccia, Ciabatta, Detroit Pan</div>
              <p className="text-ink-muted leading-relaxed">
                Fluid dough that cannot be kneaded traditionally. Generates massive, irregular open air pockets (custardy crumb) and crisp, blistered exterior crusts when baked in oiled steel pans.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: The Chemistry of Salt in Dough */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">IONIC GLUTEN TIGHTENING</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Why Salt is Never Optional: The 2.0% Rule
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3 font-sans">
            <p>
              In bread dough, salt (NaCl) serves critical biochemical functions far beyond seasoning:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-ink-muted">
              <li>
                <strong>Gluten Ionic Shielding:</strong> Glutenin and gliadin protein strands carry matching electrical charges that naturally repel one another. Sodium (Na+) and chloride (Cl-) ions neutralize these repelling charges, allowing the protein chains to slide tightly together into a strong, cohesive, elastic membrane that traps fermentation gas bubbles.
              </li>
              <li>
                <strong>Enzymatic &amp; Yeast Osmotic Brake:</strong> Salt exerts osmotic pressure on yeast cells, moderating their consumption of maltose and glucose. Without salt, yeast ferments violently out of control, exhausting all sugars before the dough has time to develop complex organic acids, leaving a pale crust and flat flavor.
              </li>
              <li>
                <strong>Standard Salinity:</strong> Professional bakers consistently formulate salt at <strong>2.0% to 2.5%</strong>. Less than 1.8% yields slack, sticky dough; greater than 3.0% suppresses yeast activity excessively.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 4: Frequently Asked Questions */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
          <div className="micro-label text-accent">EXPERT OPERATIONAL Q&amp;A</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Frequently Asked Questions: Baker's Percentages &amp; Hydration
          </h2>
          <div className="space-y-4 divide-y divide-hairline text-sm text-ink-muted">
            <div className="pt-4 first:pt-0 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Why do professional bakers weigh water in grams instead of measuring in cups?
              </div>
              <p className="text-xs leading-relaxed">
                Volumetric measuring cups are inherently imprecise. A fluid ounce cup reading can vary by 5% to 10% depending on angle and surface tension meniscus. Furthermore, 1 gram of water equals exactly 1 milliliter at room temperature. Weighing water on the same digital scale as flour eliminates measuring errors and dirty dishes.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                What is the autolyse phase and why does it make dough easier to handle?
              </div>
              <p className="text-xs leading-relaxed">
                Autolyse is mixing only the flour and water together and resting for 20 to 45 minutes before adding salt or yeast. During this rest, endogenous protease enzymes relax protein chains and amylase enzymes convert complex starches into fermentable sugars. Gluten develops spontaneously without physical kneading, resulting in a silkier, more extensible dough.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Why does high-hydration dough require high-protein bread flour?
              </div>
              <p className="text-xs leading-relaxed">
                Standard all-purpose flour contains 10% to 11% protein, which saturates with water around 65% hydration. At 75%+ hydration, all-purpose flour turns into soup. Bread flour (12.5% to 14% protein) contains higher concentrations of glutenin and gliadin, creating a robust structural web capable of absorbing high water volume while maintaining tension.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                How do you convert between Instant Dry Yeast (IDY) and Active Dry Yeast (ADY)?
              </div>
              <p className="text-xs leading-relaxed">
                Instant Dry Yeast is more concentrated and has a smaller particle size with higher live cell counts. If a recipe calls for Active Dry Yeast and you are using Instant Yeast, multiply by 0.75 (use 25% less Instant Yeast). Instant Yeast can be mixed directly with dry flour, whereas Active Dry should be bloomed in lukewarm water first.
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
                name: 'What is a Baker’s Percentage and why is flour always 100%?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Baker’s percentage defines total flour as 100.0%, with water, salt, and yeast expressed as direct mathematical ratios of that flour weight. This enables instant batch scaling without formula distortion.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why do bakers weigh water in grams instead of measuring in cups?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '1 gram of water equals exactly 1 milliliter. Weighing water on a gram scale eliminates meniscus reading errors and guarantees exact hydration precision.',
                },
              },
              {
                '@type': 'Question',
                name: 'What does salt do in bread dough beyond flavor?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Salt chemically tightens gluten by neutralizing repelling ionic charges on protein strands, and moderates yeast fermentation speed to allow organic acids to develop.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the autolyse phase in bread baking?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Autolyse is resting flour and water together before adding salt or yeast. Gluten hydrates and aligns spontaneously, reducing kneading time and improving dough extensibility.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

