import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import GroundBeefFatMatrix from '@/components/tools/GroundBeefFatMatrix';
import { GROUND_BEEF_FAT_SPECS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Ground Beef Lean-to-Fat Yield & Calorie Matrix — 80/20 vs 93/7',
  description: 'Calculate cooked weight yield, rendered liquid fat ounces, and drained vs undrained calories across 73/27, 80/20, 85/15, 90/10, and 93/7 ground beef blends.',
  alternates: {
    canonical: absoluteUrl('/ground-beef-fat-ratio'),
  },
};

export default function GroundBeefFatRatioPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Ground Beef Lean-to-Fat Yield & Calorie Matrix', path: '/ground-beef-fat-ratio' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Ground Beef Lean-to-Fat Ratio & Yield Matrix',
    url: absoluteUrl('/ground-beef-fat-ratio'),
    description: 'Calculate cooked yield weight, fat rendering ounces, and drained calories across ground beef blends.',
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
          label="PRINT BEEF MATRIX"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">LIPID RENDERING &amp; COOKED YIELD SCIENCE</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Ground Beef Lean-to-Fat Ratio Matrix
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Buying 73/27 ground beef because it is cheaper often costs more per cooked pound. Calculate actual cooked plate yield, rendered pan fat ounces, and drained vs undrained calorie totals.
        </p>
      </section>

      {/* Interactive Tool */}
      <GroundBeefFatMatrix />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED GROUND BEEF BLEND YIELDS &amp; NUTRITION
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Blend</th>
                <th className="py-2">Cooked Yield %</th>
                <th className="py-2">Rendered Fat / Lb</th>
                <th className="py-2">Drained Cal (4oz)</th>
                <th className="py-2">Undrained Cal</th>
                <th className="py-2">Best Culinary Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {GROUND_BEEF_FAT_SPECS.map((b) => (
                <tr key={b.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{b.label}</td>
                  <td className="py-2 font-bold text-accent">{b.cookedYieldWeightPct}%</td>
                  <td className="py-2">{b.fatRenderedOzPerLbRaw} oz</td>
                  <td className="py-2 font-bold text-ink">{b.drainedCaloriesPer4ozCooked} kcal</td>
                  <td className="py-2">{b.undrainedCaloriesPer4ozCooked} kcal</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{b.bestUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Deep Dive & Ground Beef Economics */}
      <section className="space-y-8 font-sans">
        {/* Section 1: The True Cost Economic Formula */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">YIELD MATHEMATICS &amp; GROCERY ARBITRAGE</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            The 73/27 Price Illusion: True Cost Per Cooked Pound
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              Shoppers frequently buy 73/27 ground beef because the raw price tag appears significantly cheaper per pound than 85/15 or 93/7. In practice, cheap ground beef often costs <strong>more per edible ounce</strong> due to severe cooking shrink:
            </p>
            <div className="bg-paper p-4 border-l-2 border-accent text-xs font-mono text-ink space-y-1">
              <div className="font-bold uppercase">The True Cooked Cost Formula:</div>
              <div>Actual Cost Per Cooked Lb = Raw Price Per Lb ÷ (Cooked Yield Percentage ÷ 100)</div>
              <div className="text-ink-muted text-[11px] mt-1">
                A 1-pound package of 73/27 ground beef loses 4.3 ounces of rendered tallow and water vapor during cooking, yielding only <strong>9.9 ounces (62%)</strong> of cooked meat on your plate. If purchased at $4.29/lb raw, your real cooked cost is <strong>$6.92 per pound</strong>. By comparison, 90/10 at $5.99/lb raw yields 12.8 ounces (80%), costing <strong>$7.48 per cooked pound</strong> with virtually zero pan grease to discard.
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Blend Functionality Matrix */}
        <div className="bg-paper hairline-border p-6 sm:p-8 space-y-4 font-mono text-xs">
          <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
            LIPID FUNCTIONALITY: MATCHING BLEND TO CULINARY APPLICATION
          </div>
          <p className="font-sans text-xs text-ink-muted leading-relaxed">
            Fat is flavor, lubricity, and structural binder. Choosing the wrong lean-to-fat ratio compromises dinner texture:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs pt-1">
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-accent font-bold uppercase text-[11px]">80/20 GROUND CHUCK</div>
              <div className="font-bold text-ink">Smash Burgers &amp; Grilled Patties</div>
              <p className="text-ink-muted leading-relaxed">
                The gold standard for burgers. 20% fat is required to fry the meat in its own rendered tallow against a 450°F cast iron skillet, generating the iconic crispy lace edge while keeping the center juicy.
              </p>
            </div>
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-ink font-bold uppercase text-[11px]">85/15 GROUND ROUND</div>
              <div className="font-bold text-ink">Meatballs, Meatloaf, Casseroles</div>
              <p className="text-ink-muted leading-relaxed">
                The ideal balance for enclosed baking. Delivers sufficient fat to melt and tenderize breadcrumbs without pooling an inch of liquid oil in baking dishes.
              </p>
            </div>
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-ink-subtle font-bold uppercase text-[11px]">90/10 &amp; 93/7 GROUND SIRLOIN</div>
              <div className="font-bold text-ink">Taco Meat, Chili, Meal Prep</div>
              <p className="text-ink-muted leading-relaxed">
                Best for sauced dishes where meat crumbles simmer in spices. Draining grease is unnecessary, preserving 100% of added taco seasonings and broth in the pan.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: The Gray Boiling Trap */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">THERMODYNAMIC BROWNING DEFECTS</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Why Ground Beef Boils Gray: The Pan Overcrowding Law
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3 font-sans">
            <p>
              When 2 pounds of cold ground beef are dumped into a skillet simultaneously, the thermal mass of the meat overwhelms the burner.
            </p>
            <p>
              Cellular water and rendered fat rapidly pool in the bottom of the pan faster than the heat can evaporate them. Pan temperature plummets from 400°F to <strong>212°F (100°C)</strong>—the boiling point of water. At 212°F, the Maillard browning reaction (which requires 285°F+) is physically impossible. The meat boils into rubbery, gray, unappetizing pellets.
            </p>
            <p>
              <strong>The Fix:</strong> Brown ground beef in 1-pound batches in a wide 12-inch skillet. Leave the meat undisturbed in large chunks for the first 3 minutes without chopping; allow a deep brown crust to form before breaking it apart.
            </p>
          </div>
        </div>

        {/* Section 4: Frequently Asked Questions */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
          <div className="micro-label text-accent">EXPERT OPERATIONAL Q&amp;A</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Frequently Asked Questions: Ground Beef Ratios &amp; Cooking
          </h2>
          <div className="space-y-4 divide-y divide-hairline text-sm text-ink-muted">
            <div className="pt-4 first:pt-0 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Why does ground beef require 160°F internal temp while steaks can be eaten at 130°F?
              </div>
              <p className="text-xs leading-relaxed">
                Bacteria like E. coli and Salmonella reside exclusively on the outside surfaces of whole muscle cuts. When a steak is seared, the exterior temperature exceeds 300°F, killing surface pathogens immediately. Commercial grinding redistributes exterior surface bacteria uniformly throughout the entire meat mass. Therefore, every burger and meatball core must reach the USDA safe pasteurization threshold of 160°F.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Does rinsing cooked ground beef under warm water remove calories?
              </div>
              <p className="text-xs leading-relaxed">
                Rinsing cooked ground beef in a colander under hot tap water removes up to 50% of residual surface fat, but washes away water-soluble B vitamins, iron, and savory beef flavor compounds down the drain. If you want lean beef, purchase 90/10 or 93/7 directly rather than washing 73/27.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Why do supermarket ground beef packages look bright red outside but gray inside?
              </div>
              <p className="text-xs leading-relaxed">
                Freshly ground beef is naturally purplish-red. When exposed to atmospheric oxygen through permeable plastic wrap, the muscle protein myoglobin reacts to form <em>oxymyoglobin</em>, which is bright cherry red. The interior of the package lacks oxygen, turning into un-oxygenated deoxymyoglobin (gray-brown). This is completely normal and safe.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                What can you do with leftover rendered beef fat from the skillet?
              </div>
              <p className="text-xs leading-relaxed">
                Never pour warm beef fat down the kitchen sink drain; it solidifies in pipes and causes plumbing blockages. Pour it into a glass jar. Clarified beef tallow can be refrigerated for months and used as an incredible high-smoke-point cooking fat for frying eggs, roasting potatoes, or searing steaks.
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
                name: 'Is 73/27 ground beef really cheaper than 90/10?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. 73/27 loses 38% of raw weight in rendered fat and water, yielding only 9.9 oz cooked meat per pound. 90/10 yields 12.8 oz, making the true cooked cost per pound virtually identical.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the best ground beef ratio for smash burgers?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '80/20 ground chuck. The 20% fat renders onto the screaming-hot cast iron surface to fry the meat into crispy lace edges without drying out.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why must ground beef reach 160°F internal temperature?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Grinding mixes surface bacteria throughout the entire meat blend. The internal core must reach 160°F to guarantee complete pasteurization.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why does ground beef boil gray in a skillet?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Overcrowding the skillet drops pan temperature to 212°F, trapping moisture and boiling the meat rather than searing it at Maillard temperatures (285°F+).',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

