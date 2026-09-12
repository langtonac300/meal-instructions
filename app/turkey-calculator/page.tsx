import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import TurkeyRoasterCalculator from '@/components/tools/TurkeyRoasterCalculator';
import { TURKEY_METHODS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Turkey Roaster & Thawing Calculator — Spatchcock vs Traditional Times',
  description: 'Calculate exact turkey roasting times, refrigerator thaw days, rapid cold-water submersion timelines, dry-brine salt math, and pull temperatures for birds 6 to 26 lbs.',
  alternates: {
    canonical: absoluteUrl('/turkey-calculator'),
  },
};

export default function TurkeyCalculatorPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Turkey Roaster & Thawing Calculator', path: '/turkey-calculator' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Turkey Roasting & Thaw Time Calculator',
    url: absoluteUrl('/turkey-calculator'),
    description: 'Precision thaw schedule, dry brine calculations, and roasting minutes by turkey weight.',
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
          label="PRINT TURKEY SCHEDULE"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">POULTRY SAFETY &amp; ROASTING TIMELINE</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Turkey Roasting &amp; Thaw Calculator
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Eliminate Thanksgiving guesswork. Calculate refrigerator defrost days, cold-water bath minutes, 1.0% dry-brine kosher salt tablespoons, and exact cook times for spatchcocked, traditional, or smoked turkey.
        </p>
      </section>

      {/* Interactive Tool */}
      <TurkeyRoasterCalculator />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED TURKEY ROASTING METHODS &amp; TIME SPECS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Method</th>
                <th className="py-2">Oven Temp</th>
                <th className="py-2">Mins / Lb</th>
                <th className="py-2">Breast Pull Target</th>
                <th className="py-2">Thigh Target</th>
                <th className="py-2">Rest Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {TURKEY_METHODS.map((m) => (
                <tr key={m.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{m.name.split('—')[0]}</td>
                  <td className="py-2 font-bold text-accent">{m.ovenTempF}°F</td>
                  <td className="py-2">~{m.minsPerPound} min/lb</td>
                  <td className="py-2 font-bold text-ink">{m.targetBreastPullTempF}°F</td>
                  <td className="py-2">{m.targetThighPullTempF}°F</td>
                  <td className="py-2 text-accent font-bold">{m.restMinutes} mins</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Deep Dive & Turkey Thermodynamics */}
      <section className="space-y-8 font-sans">
        {/* Section 1: Spatchcock Physics */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">GEOMETRIC HEAT TRANSFER &amp; ANATOMY</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            The Spatchcock Breakthrough: Why Flattening Cuts Cook Time by 50%
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              A whole trussed turkey is a culinary paradox. Turkey consists of two distinct muscle groups with opposing thermal requirements:
            </p>
            <ul className="list-disc pl-5 space-y-1 font-mono text-xs text-ink">
              <li><strong>Breast Meat (White):</strong> Extremely lean and low in collagen. Begins expelling moisture rapidly above 150°F; dries out completely and turns chalky at 165°F+.</li>
              <li><strong>Thigh &amp; Leg Meat (Dark):</strong> High in tough connective collagen and intramuscular fat. Requires 175°F to 180°F to break down collagen into liquid gelatin.</li>
            </ul>
            <p>
              In a traditional spherical bird, the hollow interior cavity acts as an insulating barrier, preventing convective heat from cooking the dark thighs from the inside. To make matters worse, the delicate breast sits elevated in the hottest zone of the oven, drying out hours before the legs are safe.
            </p>
            <div className="bg-paper p-4 border-l-2 border-accent text-xs font-mono text-ink space-y-1">
              <div className="font-bold uppercase">The Butterfly Geometry:</div>
              <div>
                By cutting out the backbone with heavy-duty poultry shears and flattening the carcass onto a rimmed sheet pan, all skin faces upward in a single horizontal plane. The legs and thighs sit on the outside periphery (where oven heat is highest), while the thicker breast rests in the center. An 18-lb turkey roasts to perfection in <strong>75 to 90 minutes</strong> instead of 3.5 to 4 hours.
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Dry Brining vs Wet Brining */}
        <div className="bg-paper hairline-border p-6 sm:p-8 space-y-4 font-mono text-xs">
          <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
            OSMOTIC MARGINS: DRY BRINING VS WET SOAKING
          </div>
          <p className="font-sans text-xs text-ink-muted leading-relaxed">
            Wet brining (submerging a raw bird in salt water buckets) increases bird weight by 8% to 10% through capillary water uptake. However, that absorbed water is bland, diluting the bird's natural turkey flavor while saturating the skin with moisture that turns rubbery instead of crisp.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs pt-1">
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-accent font-bold uppercase text-[11px]">THE 1.0% DRY BRINE FORMULA</div>
              <p className="text-ink-muted leading-relaxed">
                Use <strong>1/2 teaspoon of Diamond Crystal kosher salt per pound of turkey</strong> (or 1/4 tsp Morton kosher / table salt). Rub evenly under the breast skin and over the exterior 24 to 48 hours before roasting. Salt denatures myosin proteins to lock in natural juices without waterlogging.
              </p>
            </div>
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-ink font-bold uppercase text-[11px]">PARCHMENT-CRISP SKIN DESICCATION</div>
              <p className="text-ink-muted leading-relaxed">
                Refrigerate the salted turkey uncovered on a wire rack inside a rimmed baking sheet for the final 12 to 24 hours. Cold circulating refrigerator air desiccates the surface skin into translucent parchment, ensuring explosive glass-like crackling upon roasting.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Food Safety & Stuffing Physics */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">USDA FSIS SAFETY HAZARD</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Why Stuffing Inside the Cavity is Banned in Food Science
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3 font-sans">
            <p>
              As raw turkey roasts, salmonella-laden juices drip into the porous bread stuffing inside the cavity. For that stuffing to be safe to eat, the geometric center of the stuffing mass must reach <strong>165°F (74°C)</strong>.
            </p>
            <p>
              Because dense bread is a powerful thermal insulator, bringing the interior stuffing to 165°F requires keeping the bird in the oven for an extra 45 to 60 minutes. By the time the stuffing is safe, the surrounding white breast meat has reached 185°F+, turning into bone-dry sawdust.
            </p>
            <p>
              <strong>The Solution:</strong> Bake stuffing separately in a shallow buttered casserole dish (or &quot;dressing&quot;). Drizzle it with rich turkey stock made from simmering the discarded turkey backbone, neck, and giblets for unmatched flavor.
            </p>
          </div>
        </div>

        {/* Section 4: Frequently Asked Questions */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
          <div className="micro-label text-accent">EXPERT OPERATIONAL Q&amp;A</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Frequently Asked Questions: Turkey Roasting
          </h2>
          <div className="space-y-4 divide-y divide-hairline text-sm text-ink-muted">
            <div className="pt-4 first:pt-0 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Should you wash a raw turkey in the sink before cooking?
              </div>
              <p className="text-xs leading-relaxed">
                Never wash raw turkey. Washing raw poultry does not eliminate bacteria; instead, aerosolized water droplets spray Salmonella and Campylobacter up to 3 feet across countertops, faucets, sponges, and nearby utensils. Heat from the oven is the only mechanism that pasteurizes poultry.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                What is the correct way to carve a roasted turkey?
              </div>
              <p className="text-xs leading-relaxed">
                Do not shave thin slices off the breast while it remains on the carcass. Instead, slice downward along the breastbone and wishbone to remove each entire breast lobe as a single solid roast. Place the breast on a cutting board and slice crosswise into 1/2-inch thick medallions across the grain. Every slice gets crispy skin and stays moist.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                How long does a frozen turkey take to thaw in the refrigerator?
              </div>
              <p className="text-xs leading-relaxed">
                Allow 24 hours of refrigerator thawing for every 4 to 5 pounds of turkey. A 16-pound turkey requires a full 4 days (96 hours) in a 38°F refrigerator. Plan ahead and place the frozen bird on a rimmed baking sheet in the fridge the Saturday before Thanksgiving.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                What temperature should turkey breast be pulled from the oven?
              </div>
              <p className="text-xs leading-relaxed">
                Pull whole turkey when the thickest part of the breast reaches 155°F to 158°F (with thighs at 170°F–175°F). During the 30-minute rest on a wire rack, carryover heat conducts inward, raising the breast temperature to a safe 165°F while preserving extraordinary juiciness.
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
                name: 'Why is spatchcocking turkey better than traditional whole roasting?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Flattening the bird exposes all skin to direct radiant heat, cooks thighs and breasts to their respective ideal doneness simultaneously, and cuts total roasting time by up to 50%.',
                },
              },
              {
                '@type': 'Question',
                name: 'Should you wash a raw turkey in the sink before cooking?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. Washing poultry aerosolizes Salmonella bacteria across kitchen counters and sinks. Oven heat is the only way to sanitize poultry.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the correct way to carve turkey breast?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Remove the entire breast lobe from the ribcage in one piece, then slice crosswise into thick medallions across the grain to retain skin and juices.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why shouldn’t you cook stuffing inside the turkey cavity?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Stuffing absorbs raw poultry juices and must reach 165°F to be safe, which overcooks and dries out the surrounding breast meat. Bake stuffing in a separate dish.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

