import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import SlowCookerConverter from '@/components/tools/SlowCookerConverter';
import { SLOW_COOKER_TIME_MAP } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Slow Cooker to Oven Conversion Calculator — High vs Low Times',
  description: 'Convert between Slow Cooker LOW, Slow Cooker HIGH, Dutch Oven, and Conventional 350°F Oven. Liquid reduction formulas, dairy addition timing, and meat tenderness rules.',
  alternates: {
    canonical: absoluteUrl('/slow-cooker-converter'),
  },
};

export default function SlowCookerConverterPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Slow Cooker to Oven Conversion Calculator', path: '/slow-cooker-converter' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Slow Cooker to Oven & High-to-Low Conversion Calculator',
    url: absoluteUrl('/slow-cooker-converter'),
    description: 'Calculate cooking duration and liquid adjustments between slow cookers, dutch ovens, and standard ovens.',
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
          label="PRINT CROCKPOT RULES"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">THERMAL CONVECTION &amp; MOISTURE PHYSICS</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Slow Cooker to Oven Converter
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Slow cookers trap 100% of moisture vapor. Convert standard oven braises into crockpot recipes by applying the 40% liquid reduction rule and exact High (300°F) vs Low (200°F) time equivalents.
        </p>
      </section>

      {/* Interactive Tool */}
      <SlowCookerConverter />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED SLOW COOKER VS OVEN COOKING TIMELINES
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Meat / Dish Type</th>
                <th className="py-2">Oven 350°F</th>
                <th className="py-2">Slow Cooker LOW</th>
                <th className="py-2">Slow Cooker HIGH</th>
                <th className="py-2">Dutch Oven</th>
                <th className="py-2">Liquid Reduction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {SLOW_COOKER_TIME_MAP.map((d) => (
                <tr key={d.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{d.category}</td>
                  <td className="py-2 font-bold text-accent">{d.oven350Hours} hrs</td>
                  <td className="py-2">{d.slowCookerLowHours} hrs</td>
                  <td className="py-2">{d.slowCookerHighHours} hrs</td>
                  <td className="py-2">{d.dutchOvenHours} hrs</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{d.liquidAdjustment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Deep Dive & Slow Cooker Physics */}
      <section className="space-y-8 font-sans">
        {/* Section 1: Closed System Thermodynamics & Zero Evaporation */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">CLOSED-VESSEL THERMODYNAMICS</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            The Zero-Evaporation Law: Why Oven Recipes Get Watery in a Crockpot
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              In a conventional oven or Dutch oven braise, hot dry air circulates across the vessel surface, continuously evaporating liquid. Over 3 hours, a standard braise loses <strong>30% to 50% of its initial moisture</strong>, concentrating natural gelatin, lipids, and savory glutamates into a thick sauce.
            </p>
            <p>
              A slow cooker is a hermetically sealed condensation chamber. Evaporating steam rises, hits the heavy glass or stoneware lid, cools, and drips straight back into the vessel. In addition, raw beef chuck or pork shoulder sheds <strong>15% to 20% of its raw weight in cellular water</strong> as muscle fibers contract.
            </p>
            <div className="bg-paper p-4 border-l-2 border-accent text-xs font-mono text-ink space-y-1">
              <div className="font-bold uppercase">The 50% Liquid Reduction Rule:</div>
              <div>When adapting standard oven or stovetop recipes to a slow cooker, reduce all added broths, wine, or water by <strong>30% to 50%</strong>. Liquid should never submerge the meat—it should come no higher than 1/3 to 1/2 up the sides of the protein.</div>
            </div>
          </div>
        </div>

        {/* Section 2: Low vs High Thermal Kinetics */}
        <div className="bg-paper hairline-border p-6 sm:p-8 space-y-4 font-mono text-xs">
          <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
            THERMAL KINETICS: LOW (200°F) VS HIGH (300°F) EQUILIBRIUM
          </div>
          <p className="font-sans text-xs text-ink-muted leading-relaxed">
            Contrary to popular belief, &quot;LOW&quot; and &quot;HIGH&quot; slow cooker settings do not stabilize at different finish temperatures. Both settings ultimately reach the same plateau of <strong>209°F (98.3°C)</strong>, just beneath boiling. The difference is the speed of thermal rise:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs pt-1">
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-accent font-bold uppercase text-[11px]">SLOW COOKER LOW (7–8 HRS TO 209°F)</div>
              <div className="font-bold text-ink">Optimal for Tough Collagen Cuts</div>
              <p className="text-ink-muted leading-relaxed">
                Collagen begins unwinding into gelatin between 160°F and 180°F. The gradual temperature climb of the LOW setting allows muscle proteins to spend 3+ hours in this sweet spot, producing fall-apart tenderness without boiling muscle fibers into stringy dryness.
              </p>
            </div>
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-ink font-bold uppercase text-[11px]">SLOW COOKER HIGH (3–4 HRS TO 209°F)</div>
              <div className="font-bold text-ink">Faster Rise // Higher Risk of Toughness</div>
              <p className="text-ink-muted leading-relaxed">
                Reaches near-boiling in half the time. Suitable for soups, stews, chilis, or leaner meats that don&apos;t rely on extensive collagen gelatinization. For lean cuts like pork loin or chicken breast, HIGH can rapidly cause severe protein contraction.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: The 4 Golden Rules of Slow Cooker Loading */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">VESSEL ARCHITECTURE</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            4 Rules for Perfect Crockpot Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-ink-muted">
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">1. Dense Root Vegetables on the Bottom</div>
              <p className="text-xs leading-relaxed">
                Potatoes, carrots, and onions require sustained temperatures above 183°F to break down tough pectin and hemicellulose cell walls. The bottom of the slow cooker receives direct conductive heat from the element; layer vegetables under the meat.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">2. Pre-Sear the Meat in Skillet First</div>
              <p className="text-xs leading-relaxed">
                Slow cookers cannot achieve the 300°F+ temperatures required for the Maillard browning reaction. Spending 5 minutes browning your roast in a hot skillet builds deep savory complexity and rendering fat that a slow cooker cannot replicate alone.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">3. Add Dairy in the Final 20 Minutes</div>
              <p className="text-xs leading-relaxed">
                Prolonged exposure to heat causes milk proteins (casein) to denature, break emulsion, and curdle into grainy specks. Always stir in sour cream, heavy cream, cream cheese, or yogurt at the very end of cooking.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">4. Keep the Lid Closed (The 20-Min Penalty)</div>
              <p className="text-xs leading-relaxed">
                Every time you lift the lid to check food, accumulated heat and steam vapor escape. Rebuilding the internal thermodynamic pressure takes approximately 15 to 20 minutes, extending total cook time.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Frequently Asked Questions */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
          <div className="micro-label text-accent">EXPERT OPERATIONAL Q&amp;A</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Frequently Asked Questions: Slow Cooker Conversions
          </h2>
          <div className="space-y-4 divide-y divide-hairline text-sm text-ink-muted">
            <div className="pt-4 first:pt-0 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Can you convert any oven recipe to a slow cooker?
              </div>
              <p className="text-xs leading-relaxed">
                Most braises, stews, pulled meats, and soups convert exceptionally well. However, recipes requiring crisp skin or crusts (like roast chicken with crispy skin, baked pasta with browned cheese, or roasted vegetables) will turn soggy in a slow cooker due to 100% humidity.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                How do you thicken slow cooker sauce that is too watery at the end?
              </div>
              <p className="text-xs leading-relaxed">
                Remove the lid, turn the slow cooker to HIGH, and stir in a cornstarch slurry (2 tablespoons cornstarch whisked into 2 tablespoons cold water). Let bubble uncovered for 15 minutes. Alternatively, ladle cooking juices into a saucepan and boil vigorously on the stove to reduce by half.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Is Slow Cooker LOW safer or better than HIGH?
              </div>
              <p className="text-xs leading-relaxed">
                For collagen-rich cuts (chuck roast, pork shoulder, short ribs), LOW is dramatically better because it holds meat in the 160°F–180°F gelatin melting zone longer. HIGH reaches boiling quickly and can boil the meat, causing muscle fibers to tighten and squeeze out water before collagen has melted.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Why do onions and carrots take longer to cook than meat in a crockpot?
              </div>
              <p className="text-xs leading-relaxed">
                Meat proteins begin denaturing and tenderizing at 140°F–160°F. Plant cell walls, however, are made of pectin and cellulose which only soften above 183°F. If vegetables sit on top of the meat where steam is cooler, they will still be crunchy when the meat is done. Always place root vegetables at the bottom.
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
                name: 'Can you convert any oven recipe to a slow cooker?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most braises, stews, and soups convert well by reducing liquid by 30%–50%. However, dishes needing a crisp skin or crust fail because crockpots maintain 100% moisture humidity.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do you thicken slow cooker sauce that is too watery at the end?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Whisk 2 tbsp cornstarch with 2 tbsp cold water, stir into the pot, and cook on HIGH uncovered for 15 minutes, or reduce juices in a skillet on the stove.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Slow Cooker LOW better than HIGH for tough meats?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. LOW keeps collagen-rich cuts in the 160°F–180°F gelatin melting zone for hours. HIGH reaches near-boiling too fast and can toughen meat fibers.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why do carrots and potatoes take longer to cook than meat in a crockpot?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Plant pectin and cellulose require 183°F+ to soften. Always place root vegetables at the bottom of the crockpot where direct conductive heat is highest.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

