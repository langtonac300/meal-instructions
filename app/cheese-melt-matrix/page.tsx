import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import CheeseMeltMatrix from '@/components/tools/CheeseMeltMatrix';
import { CHEESE_MELT_SPECS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Cheese Melting Point Chart & Sodium Citrate Emulsion Calculator',
  description: 'Melting temperatures, moisture percentages, and stretch ratings for 24 cheeses. Calculate sodium citrate ratios (3%) for ultra-smooth cheese sauces that never break or oil off.',
  alternates: {
    canonical: absoluteUrl('/cheese-melt-matrix'),
  },
};

export default function CheeseMeltMatrixPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Cheese Melting Point Chart & Sodium Citrate Emulsion Calculator', path: '/cheese-melt-matrix' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Cheese Melting Temperature & Sodium Citrate Emulsion Matrix',
    url: absoluteUrl('/cheese-melt-matrix'),
    description: 'Reference melting temperatures, elasticity indexes, and sodium citrate emulsion ratios across cheeses.',
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
          label="PRINT CHEESE CHART"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">CASEIN PROTEIN EMULSION &amp; THERMAL LIQUEFACTION</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Cheese Melting &amp; Emulsion Matrix
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Why aged cheddar breaks into greasy oil while mozzarella stretches and American melts into liquid gold. Understand casein matrix collapse temperatures and apply the 3% sodium citrate ratio for flawless cheese sauces.
        </p>
      </section>

      {/* Interactive Tool */}
      <CheeseMeltMatrix />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED CHEESE MELTING TEMPERATURES &amp; EMULSION BEHAVIOR
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Cheese</th>
                <th className="py-2">Melting Temp (°F)</th>
                <th className="py-2">Moisture %</th>
                <th className="py-2">Fat %</th>
                <th className="py-2">Melt Behavior</th>
                <th className="py-2">Sodium Citrate / 100g</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {CHEESE_MELT_SPECS.map((c) => (
                <tr key={c.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{c.name}</td>
                  <td className="py-2 font-bold text-accent">{c.meltingTempF}°F</td>
                  <td className="py-2">{c.moisturePct}%</td>
                  <td className="py-2">{c.fatPct}%</td>
                  <td className="py-2 text-ink font-sans text-xs">{c.meltBehavior}</td>
                  <td className="py-2 font-mono font-bold text-ink">{c.sodiumCitrateGramsPer100g}g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Deep Dive & Cheese Rheology */}
      <section className="space-y-8 font-sans">
        {/* Section 1: The Casein Matrix Collapse */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">PROTEIN RHEOLOGY &amp; CALCIUM CROSS-LINKS</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            The Physics of Melting Cheese: Casein Micelles &amp; Fat Traps
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              Cheese is not solid fat—it is a continuous 3D sponge of milk proteins (<strong>casein</strong>) held together by calcium phosphate bridges, trapping microscopic droplets of water and butterfat.
            </p>
            <p>
              When cheese is heated, melting occurs in two distinct thermal stages:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-ink-muted font-mono">
              <li><strong>Stage 1 (90°F / 32°C):</strong> Solid milk fat liquefies into free liquid butterfat, giving the surface a glossy, sweating sheen.</li>
              <li><strong>Stage 2 (130°F–150°F / 55°C–65°C):</strong> Thermal energy overcomes the weak hydrophobic bonds holding casein micelles together. The protein matrix collapses, flowing into a fluid molten stream.</li>
            </ul>
          </div>
        </div>

        {/* Section 2: Why Aged Cheese Breaks */}
        <div className="bg-paper hairline-border p-6 sm:p-8 space-y-4 font-mono text-xs">
          <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
            THE AGED CHEESE PARADOX: MOISTURE LOSS &amp; PROTEIN FRAGMENTATION
          </div>
          <p className="font-sans text-xs text-ink-muted leading-relaxed">
            Young cheeses (Mozzarella, Monterey Jack, Young Gouda) contain 45%–52% water and long, intact, elastic casein chains that stretch across a pizza. As cheese ages into sharp cheddar, Gruyère, or Parmesan:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs pt-1">
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-accent font-bold uppercase text-[11px]">PROTEOLYTIC FRAGMENTATION</div>
              <p className="text-ink-muted leading-relaxed">
                Aging enzymes break long protein chains into short fragments. When melted, these fragmented proteins tighten into knotty rubber curds, violently expelling trapped butterfat into an unsightly pool of yellow grease.
              </p>
            </div>
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-ink font-bold uppercase text-[11px]">THE CELLULOSE ANTI-CAKING DEFECT</div>
              <p className="text-ink-muted leading-relaxed">
                Pre-shredded bagged cheese is dusted with powdered wood cellulose and potato starch to prevent clumping in the bag. These starches absorb sauce liquid and coat cheese shreds, guaranteeing a gritty, broken sauce.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Sodium Citrate Chemistry */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">MOLECULAR GASTRONOMY EMULSIFIER</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            The 3% Sodium Citrate Formula: Silky Cheese Sauce That Never Breaks
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3 font-sans">
            <p>
              Traditional mac-and-cheese relies on a flour roux (butter + flour) to trap free fats, diluting sharp cheese flavor with dull starch. Molecular gastronomy solves this using <strong>Sodium Citrate (Na₃C₆H₅O₇)</strong>:
            </p>
            <div className="bg-paper p-4 border-l-2 border-accent text-xs font-mono text-ink space-y-1">
              <div className="font-bold uppercase">The Ion-Exchange Reaction:</div>
              <div>Sodium Citrate + Calcium Phosphate Casein Bridges → Calcium Citrate + Dispersed Sodium Caseinate</div>
              <div className="text-ink-muted text-[11px] mt-1">
                Sodium citrate strips the calcium out of the rigid casein matrix. The casein proteins untether into individual charged molecules that act as super-emulsifiers, locking liquid fat and water into a glossy, velvety liquid gold sauce that never separates, even when reheated.
              </div>
            </div>
            <p className="text-xs text-ink-muted">
              <strong>The Exact Ratio:</strong> Dissolve <strong>3g sodium citrate</strong> in 85g liquid (milk, beer, water, or cider) over medium heat, then whisk in <strong>100g of any cheese</strong> (even 5-year sharp cheddar).
            </p>
          </div>
        </div>

        {/* Section 4: Frequently Asked Questions */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
          <div className="micro-label text-accent">EXPERT OPERATIONAL Q&amp;A</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Frequently Asked Questions: Cheese Melting &amp; Sauces
          </h2>
          <div className="space-y-4 divide-y divide-hairline text-sm text-ink-muted">
            <div className="pt-4 first:pt-0 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Why does American cheese melt so much better than real cheddar?
              </div>
              <p className="text-xs leading-relaxed">
                American cheese is real cheddar or Colby that has been pasteurized with sodium citrate and sodium phosphate emulsifying salts. These salts permanently loosen the protein matrix so that American cheese melts into a smooth, liquid emulsion at 130°F with zero greasy oil separation.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                How do you fix a broken, greasy cheese sauce on the stove?
              </div>
              <p className="text-xs leading-relaxed">
                Remove from direct heat immediately. Whisk in 2 to 3 tablespoons of ice-cold milk or heavy cream along with a slice of American cheese (which supplies emergency sodium citrate). Vigorously whisk off the heat; the cold liquid drops the temperature below the separation threshold while the emulsifying salts rebind the emulsion.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                What makes cheeses like Halloumi, Paneer, and Queso Blanco impossible to melt?
              </div>
              <p className="text-xs leading-relaxed">
                Halloumi and Paneer are made by acid coagulation or high-temperature curd cooking that strips away acid-labile minerals and creates ultra-tight, irreversible protein bonds. Instead of melting into liquid when seared in a skillet, their proteins simply brown, allowing you to grill or fry them like steak without collapsing.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Why shouldn't you boil cheese sauces over high heat?
              </div>
              <p className="text-xs leading-relaxed">
                Temperatures above 160°F–170°F cause casein proteins to denature violently and contract. As proteins curl tightly into balls, they squeeze out all water and fat molecules, turning a smooth sauce into gritty, oily soup. Always melt cheese over gentle medium-low heat.
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
                name: 'Why does aged cheddar break into grease when melted?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Aging breaks long casein protein chains into short fragments. When melted, these fragmented proteins contract into rubbery curds and expel liquid fat.',
                },
              },
              {
                '@type': 'Question',
                name: 'What does sodium citrate do in cheese sauces?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sodium citrate swaps sodium for calcium in the casein matrix, freeing protein chains to act as powerful emulsifiers that prevent oil separation.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why should you avoid pre-shredded cheese for sauces?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Bagged cheese is coated with powdered cellulose and potato starch to prevent caking, which absorbs moisture and creates a gritty, grainy sauce.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do you fix a separated, broken cheese sauce?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Remove from heat, whisk in 2 tablespoons of cold milk, and melt in one slice of American cheese to supply restorative emulsifying salts.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

