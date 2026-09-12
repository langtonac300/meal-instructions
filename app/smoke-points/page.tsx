import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import SmokePointsMatrix from '@/components/tools/SmokePointsMatrix';
import { SMOKE_POINTS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Cooking Oil Smoke Point Chart & Cast Iron Searing Matrix',
  description: 'Complete culinary oil smoke point index: Avocado, Ghee, Beef Tallow, Duck Fat, Peanut, and Olive Oil. Fat compositions, acrolein thresholds, and cast iron ratings.',
  alternates: {
    canonical: absoluteUrl('/smoke-points'),
  },
};

export default function SmokePointsPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Cooking Oil Smoke Point Chart & Cast Iron Searing Matrix', path: '/smoke-points' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Cooking Oil Smoke Point & Searing Matrix',
    url: absoluteUrl('/smoke-points'),
    description: 'Technical reference for cooking oil smoke points, fat profiles, and high-heat searing recommendations.',
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
          label="PRINT OIL CHART"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">THERMAL DEGRADATION &amp; SEARING SCIENCE</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Cooking Oil Smoke Point Matrix
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Never sear a ribeye in extra virgin olive oil. Understand exact smoke thresholds, lipid breakdowns (mono vs poly vs saturated), and acrolein release boundaries for cast iron, wok, and air frying.
        </p>
      </section>

      {/* Interactive Tool */}
      <SmokePointsMatrix />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED OIL SMOKE POINTS &amp; FAT COMPOSITION
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Fat / Oil</th>
                <th className="py-2">Smoke Point (°F)</th>
                <th className="py-2">Smoke Point (°C)</th>
                <th className="py-2">Flavor Profile</th>
                <th className="py-2">Cast Iron Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {SMOKE_POINTS.map((oil) => (
                <tr key={oil.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{oil.name}</td>
                  <td className="py-2 font-bold text-accent">{oil.smokePointF}°F</td>
                  <td className="py-2">{oil.smokePointC}°C</td>
                  <td className="py-2">{oil.flavor}</td>
                  <td className="py-2 font-bold uppercase">{oil.castIronRating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Deep Dive & Lipid Science */}
      <section className="space-y-8 font-sans">
        {/* Section 1: Lipid Degradation & Acrolein Chemistry */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">LIPID THERMODYNAMICS &amp; HYDROLYSIS</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            The Biochemistry of Smoke Points: Free Fatty Acids &amp; Acrolein
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              The smoke point of an oil is the exact thermal threshold where volatile degradation products and free fatty acids (FFAs) evaporate as a continuous, visible bluish smoke.
            </p>
            <p>
              When cooking fats are heated past their stability threshold, triglycerides undergo thermal hydrolysis, breaking apart into individual free fatty acids and glycerol. The glycerol molecule subsequently dehydrates into <strong>acrolein (propenal, CH2=CH-CHO)</strong>:
            </p>
            <div className="bg-paper p-4 border-l-2 border-accent text-xs font-mono text-ink space-y-1">
              <div className="font-bold uppercase">The Acrolein Reaction:</div>
              <div>C3H8O3 (Glycerol) + Heat (300°F–400°F) → CH2=CH-CHO (Acrolein) + 2 H2O</div>
              <div className="text-ink-muted text-[11px] mt-1">
                Acrolein is a toxic, pungent, mucous-membrane-irritating aldehyde. Once acrolein forms, the oil turns bitter, carcinogens multiply, and the food absorbs an acrid burnt-chemical flavor.
              </div>
            </div>
            <p>
              Oils with low free fatty acid levels (such as highly refined avocado oil or clarified ghee) require drastically higher temperatures to release smoke and acrolein, making them ideal for high-heat searing.
            </p>
          </div>
        </div>

        {/* Section 2: Refined vs Unrefined Fats */}
        <div className="bg-paper hairline-border p-6 sm:p-8 space-y-4 font-mono text-xs">
          <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
            THERMAL CLASS MATRIX: SEARING VS SAUTÉ VS FINISHING
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-accent font-bold uppercase text-[11px]">HIGH-HEAT SEARING (450°F–520°F)</div>
              <div className="font-bold text-ink">Avocado Oil, Ghee, Beef Tallow</div>
              <p className="text-ink-muted leading-relaxed">
                Refined avocado oil (520°F) and clarified butter/ghee (485°F) have virtually zero moisture and sub-0.1% free fatty acid content. Capable of surviving white-hot cast iron without acrolein formation.
              </p>
            </div>
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-ink font-bold uppercase text-[11px]">MEDIUM SAUTÉ (375°F–425°F)</div>
              <div className="font-bold text-ink">Peanut Oil, Canola, Virgin Olive Oil</div>
              <p className="text-ink-muted leading-relaxed">
                Balanced smoke points suitable for shallow pan-frying, stir-frying, and baking. Canola and peanut oil provide neutral flavors with high smoke boundaries.
              </p>
            </div>
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-ink-subtle font-bold uppercase text-[11px]">LOW HEAT &amp; FINISHING (&lt; 350°F)</div>
              <div className="font-bold text-ink">EVOO, Unclarified Butter, Toasted Sesame</div>
              <p className="text-ink-muted leading-relaxed">
                Rich in volatile flavor compounds, suspended polyphenols, and milk solids. Standard butter burns at 302°F due to lactose browning; extra virgin olive oil degrades above 375°F.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Cast Iron Seasoning vs Searing Fats */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">POLYMERIZATION CHEMISTRY</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Cast Iron Seasoning Science: The Iodine Value Rule
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3 font-sans">
            <p>
              Seasoning a cast-iron or carbon-steel skillet is not an oily coating—it is an impermeable, slick polymer plastic created by <strong>lipid polymerization</strong>.
            </p>
            <p>
              When a thin film of polyunsaturated fat is heated past its smoke point in the presence of atmospheric oxygen and catalytic iron, the carbon-carbon double bonds cross-link into a hard, non-stick crystalline matrix.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-ink pt-1">
              <div className="p-3 bg-paper border border-hairline">
                <div className="font-bold text-accent">FOR BUILDING SEASONING:</div>
                <div className="text-ink-muted font-sans text-xs mt-1">
                  Use oils high in polyunsaturated fatty acids with a high Iodine Value (grapeseed oil, canola, or refined flaxseed). They cross-link readily into tough polymers.
                </div>
              </div>
              <div className="p-3 bg-paper border border-hairline">
                <div className="font-bold text-accent">FOR SEARING FOOD:</div>
                <div className="text-ink-muted font-sans text-xs mt-1">
                  Use saturated or monounsaturated fats (beef tallow, ghee, or avocado oil). Saturated fats resist lipid oxidation and thermal breakdown during high-heat contact.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Frequently Asked Questions */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
          <div className="micro-label text-accent">EXPERT OPERATIONAL Q&amp;A</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Frequently Asked Questions: Cooking Oil Smoke Points
          </h2>
          <div className="space-y-4 divide-y divide-hairline text-sm text-ink-muted">
            <div className="pt-4 first:pt-0 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                What oil is best for searing a thick ribeye steak in cast iron?
              </div>
              <p className="text-xs leading-relaxed">
                Avocado oil or clarified beef tallow. Cast iron for steak searing easily exceeds 450°F–500°F. Avocado oil (520°F smoke point) and tallow (420°F–450°F) provide the thermal ceiling necessary to generate a deep Maillard crust without burning, smoking out the kitchen, or leaving an acrid flavor.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Can you fry food in Extra Virgin Olive Oil?
              </div>
              <p className="text-xs leading-relaxed">
                Yes, for shallow pan frying below 375°F. High-quality EVOO with low acidity (&lt; 0.3% FFA) has a real smoke point around 390°F–405°F. However, intense heat destroys the delicate polyphenols and floral aromatic hydrocarbons that make EVOO expensive. For deep frying or searing, neutral high-heat oils are more economical and stable.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Why does reused frying oil smoke at lower temperatures?
              </div>
              <p className="text-xs leading-relaxed">
                Every time oil is heated, free fatty acids accumulate and microscopic suspended food particles (flour, starch, proteins) stay behind. Each reuse cycle drops the smoke point by 10°F to 30°F. If oil foams when food is added, darkens significantly, or smokes at 325°F, the lipid structure has broken down and must be discarded.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                What should you do if cooking oil catches fire in a pan?
              </div>
              <p className="text-xs leading-relaxed">
                NEVER pour water on an oil fire. Water sinks to the bottom of the superheated pan, instantaneously flashes to steam, expands by 1,700×, and throws burning oil droplets into the air in a violent fireball. Immediately slide a metal lid over the pan to smother oxygen, turn off the heat burner, and leave the lid on until completely cold.
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
                name: 'What oil is best for searing a thick ribeye steak in cast iron?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Refined avocado oil (520°F smoke point) or clarified beef tallow. They withstand the 450°F+ surface temperatures of cast iron without breaking down into bitter acrolein.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can you fry food in Extra Virgin Olive Oil?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, for light pan-frying below 375°F. However, high heat destroys EVOO’s delicate polyphenols and floral flavor compounds, making neutral high-heat oils better for deep frying.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why does reused frying oil smoke at lower temperatures?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Thermal breakdown increases free fatty acid concentration, and residual food particles lower the smoke threshold by 10°F to 30°F per reuse.',
                },
              },
              {
                '@type': 'Question',
                name: 'What should you do if cooking oil catches fire in a pan?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Never use water; it vaporizes instantly into steam and creates a fireball. Slide a metal lid over the pan to smother oxygen and turn off the heat.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

