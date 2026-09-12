import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import FrozenCookMatrix from '@/components/tools/FrozenCookMatrix';
import { FROZEN_ITEMS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Cook From Frozen & Emergency Thaw Matrix — Safe Cooking Rules',
  description: 'Can you cook rock-frozen chicken, steak, ground beef, or salmon directly? USDA FSIS safety rules, +50% cook time curves, and cold-water rapid thaw protocols.',
  alternates: {
    canonical: absoluteUrl('/frozen-cook'),
  },
};

export default function FrozenCookPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Cook From Frozen & Emergency Thaw Matrix', path: '/frozen-cook' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Emergency Frozen Cook & Rapid Thaw Matrix',
    url: absoluteUrl('/frozen-cook'),
    description: 'USDA food safety guidelines and exact cook time multipliers for cooking proteins straight from the freezer.',
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
          label="PRINT THAW GUIDE"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">USDA FSIS SAFETY PROTOCOL</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Forgot to Thaw? Freezer-to-Plate Matrix
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Dinner is in 30 minutes and your meat is rock-solid. Exact science on when it is safe to cook directly from frozen, what appliances to never use, and the 50% time rule.
        </p>
      </section>

      {/* Interactive Tool Component */}
      <FrozenCookMatrix />

      {/* SSR Static Reference Table for Search Engines */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED FROZEN COOK SAFETY SPECS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Cut / Meat</th>
                <th className="py-2">Direct Frozen Safe?</th>
                <th className="py-2">Fresh Time</th>
                <th className="py-2">Frozen Time</th>
                <th className="py-2">USDA Safe Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {FROZEN_ITEMS.map((item) => (
                <tr key={item.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{item.name}</td>
                  <td className="py-2 font-bold text-accent">
                    {item.canCookFromFrozen ? '✓ SAFE (CONVECTION)' : '⚠ THAW FIRST'}
                  </td>
                  <td className="py-2">{item.freshCookMinutes} mins</td>
                  <td className="py-2 font-bold">{item.frozenCookMinutes} mins</td>
                  <td className="py-2">{item.internalTargetTemp}°F</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Deep Dive & Food Safety Science */}
      <section className="space-y-8 font-sans">
        {/* Section 1: Latent Heat Physics */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">THERMAL PHASE DYNAMICS</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            The Physics of Cooking From Frozen: Latent Heat of Fusion
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              Cooking meat straight from the freezer requires overcoming the <strong>latent heat of fusion</strong>. It takes 1 calorie of energy to raise 1 gram of liquid water by 1°C. However, transitioning 1 gram of ice at 32°F (0°C) into liquid water at 32°F requires <strong>79.7 calories of energy</strong> with zero rise in temperature.
            </p>
            <p>
              This enormous energy sink is why frozen meats absorb substantial thermal energy before the core even begins to warm. Across convection ovens, air fryers, and grills, the standard culinary multiplier is <strong>1.5× (50% additional cook time)</strong> relative to fresh cuts.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs pt-2">
              <div className="bg-paper p-3 border border-hairline">
                <div className="text-accent font-bold">1.5× TIME RULE</div>
                <div className="text-ink-muted mt-1">Multiply fresh cooking time by 1.5 (e.g., 20 mins fresh becomes 30 mins frozen).</div>
              </div>
              <div className="bg-paper p-3 border border-hairline">
                <div className="text-accent font-bold">-25°F TEMP DROP</div>
                <div className="text-ink-muted mt-1">Lower oven/air fryer temp by 25°F to prevent burning exterior before core thaws.</div>
              </div>
              <div className="bg-paper p-3 border border-hairline">
                <div className="text-accent font-bold">TWO-STAGE SEAR</div>
                <div className="text-ink-muted mt-1">Bake 60% of time to thaw surface, blot dry, oil &amp; season, then finish on high heat.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Slow Cooker Prohibition */}
        <div className="bg-paper hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">USDA FSIS SAFETY DIRECTIVE</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Why Frozen Meat Must NEVER Go in a Slow Cooker
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3 font-sans">
            <p>
              The USDA Food Safety and Inspection Service (FSIS) explicitly bans cooking rock-frozen roasts or poultry in slow cookers or crockpots.
            </p>
            <p>
              Slow cookers operate on low wattage and heat ceramic slowly. A 4-pound frozen roast or whole chicken will linger in the <strong>bacterial danger zone (40°F to 140°F / 4.4°C to 60°C) for over 3 to 4 hours</strong> before the liquid achieves pasteurization temperatures.
            </p>
            <div className="bg-paper-card p-4 border-l-2 border-accent text-xs font-mono text-ink space-y-1">
              <div className="font-bold uppercase">The Enterotoxin Hazard:</div>
              <div>
                Bacteria such as <em>Staphylococcus aureus</em> and <em>Bacillus cereus</em> produce heat-stable enterotoxins when allowed to incubate between 70°F and 115°F. Even if the slow cooker eventually reaches 200°F and kills living bacterial cells, these toxins survive boiling temperatures and cause severe foodborne illness.
              </div>
            </div>
            <p>
              <strong>The Safe Alternatives:</strong> Pressure cookers (Instant Pot) and air fryers transfer energy rapidly through forced convection or pressurized steam, bypassing the danger zone within minutes.
            </p>
          </div>
        </div>

        {/* Section 3: The 30-Minute Cold Water Rapid Thaw Protocol */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">EMERGENCY PROTOCOL</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            The 30-Minute Cold Water Bath Protocol (When You Must Thaw Fast)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-ink-muted">
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">1. Seal in Watertight Leakproof Bag</div>
              <p className="text-xs leading-relaxed">
                Never submerge bare meat directly in water. Water dissolves soluble myofibrillar proteins and waterlogged muscle fibers cannot brown. Use heavy-duty zip-top bags with the water displacement method to expel all air.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">2. Submerge in Cold Tap Water Only</div>
              <p className="text-xs leading-relaxed">
                Never use warm or hot water. Hot water warms the exterior above 40°F while the interior remains rock-solid, initiating rapid bacterial multiplication. Cold water (under 50°F) provides 24× higher thermal conduction than air without danger.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">3. Refresh Water Every 30 Minutes</div>
              <p className="text-xs leading-relaxed">
                As the frozen meat absorbs thermal energy, the surrounding water chills to near-freezing, slowing heat transfer. Empty the bowl and refill with fresh cold tap water every 30 minutes to sustain rapid conduction.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">4. Immediate Cooking Mandatory</div>
              <p className="text-xs leading-relaxed">
                Meat thawed via cold water bath must be cooked immediately. Unlike refrigerator-thawed meat, cold-water thawed proteins cannot be returned to the refrigerator for storage in their raw state.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Frequently Asked Questions */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
          <div className="micro-label text-accent">EXPERT OPERATIONAL Q&amp;A</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Frequently Asked Questions: Cooking From Frozen
          </h2>
          <div className="space-y-4 divide-y divide-hairline text-sm text-ink-muted">
            <div className="pt-4 first:pt-0 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Can you cook a frozen steak directly in a hot cast iron skillet?
              </div>
              <p className="text-xs leading-relaxed">
                Thick steaks (1.5–2 inches) should not be seared directly in a smoking cast-iron pan from rock-frozen. The extreme surface heat will char the exterior bitter black before the core reaches 100°F. Instead, use the reverse-sear method: bake in a 250°F oven or air fryer until the core hits 115°F, blot dry, and sear in a smoking skillet for 60 seconds per side.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Why won&apos;t seasoning stick to frozen meat?
              </div>
              <p className="text-xs leading-relaxed">
                Frozen meat is coated in microscopic ice crystals. Salt and spices bounce off or dissolve into ice melt, forming a puddle of liquid that boils rather than browns. The solution is the two-stage cook: cook frozen for 5 to 7 minutes to melt surface frost, remove, blot completely dry with paper towels, brush with oil, season aggressively, and continue cooking.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Can you refreeze food that was cooked straight from frozen?
              </div>
              <p className="text-xs leading-relaxed">
                Yes. Once meat has been fully cooked to USDA pasteurization temperatures (e.g., poultry to 165°F, ground beef to 160°F), any vegetative bacteria present have been destroyed. The cooked meal can safely be portioned, chilled, and refrozen for up to 3 to 4 months.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Is it safe to cook frozen ground beef in a skillet?
              </div>
              <p className="text-xs leading-relaxed">
                Yes, if broken down progressively. Place the frozen block in a medium skillet with 1/4 cup water, cover with a lid for 5 minutes on medium heat to create steam thawing, scrape off the softened browned outer layer, flip, and repeat until the entire block is crumbled and cooked through to 160°F.
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
                name: 'Can you cook a frozen steak directly in a hot cast iron skillet?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Thick steaks should not be seared directly in smoking cast iron from frozen because the exterior burns before the core thaws. Use a 250°F oven or air fryer first, then finish with a 60-second skillet sear.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why won’t seasoning stick to frozen meat?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Surface ice crystals dissolve seasoning and create steam. Cook frozen for 5 minutes, blot dry with paper towels, brush with oil, season, and resume cooking.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why must frozen meat never go in a slow cooker?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Slow cookers heat too slowly, keeping frozen meat in the USDA bacterial danger zone (40°F–140°F) for up to 4 hours. This allows bacteria like Staphylococcus aureus to produce heat-resistant toxins.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can you refreeze food that was cooked straight from frozen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Once fully cooked to USDA pasteurization temperatures, bacteria are eliminated and the cooked dish can safely be cooled and refrozen.',
                },
              },
            ],
          }),
        }}
      />

    </div>
  );
}

