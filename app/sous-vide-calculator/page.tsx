import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import SousVideCalculator from '@/components/tools/SousVideCalculator';
import { SOUS_VIDE_SPECS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Sous Vide Time & Temperature Immersion Calculator — Baldwin Pasteurization',
  description: 'Precision water bath temperatures and minimum immersion times based on meat thickness: Ribeye steak, chicken breast, pork tenderloin, and salmon. Pasteurization hold tables included.',
  alternates: {
    canonical: absoluteUrl('/sous-vide-calculator'),
  },
};

export default function SousVideCalculatorPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Sous Vide Time & Temperature Immersion Calculator', path: '/sous-vide-calculator' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Sous Vide Time & Temperature Immersion Calculator',
    url: absoluteUrl('/sous-vide-calculator'),
    description: 'Calculate exact water bath temperatures and minimum/maximum immersion times based on meat thickness.',
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
          label="PRINT SOUS VIDE CHART"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">PRECISION EQUILIBRIUM IMMERSION</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Sous Vide Time &amp; Temp Calculator
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Water conducts thermal energy 24x faster than air. Calculate minimum Baldwin pasteurization times, maximum hold boundaries, and post-bath blazing sear protocols based on exact cut thickness.
        </p>
      </section>

      {/* Interactive Tool */}
      <SousVideCalculator />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED SOUS VIDE IMMERSION STANDARDS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Cut / Food</th>
                <th className="py-2">Med-Rare Temp</th>
                <th className="py-2">Medium Temp</th>
                <th className="py-2">Min Time (1-inch)</th>
                <th className="py-2">Max Hold Time</th>
                <th className="py-2">Finishing Sear</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {SOUS_VIDE_SPECS.map((s) => (
                <tr key={s.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{s.name}</td>
                  <td className="py-2 font-bold text-accent">{s.medRareTempF}°F</td>
                  <td className="py-2">{s.mediumTempF}°F</td>
                  <td className="py-2">{s.minTimeMinutes} mins</td>
                  <td className="py-2">{Math.round(s.maxTimeMinutes / 60)} hrs</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{s.searMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Deep Dive & Sous Vide Thermodynamics */}
      <section className="space-y-8 font-sans">
        {/* Section 1: Baldwin Pasteurization Mathematics */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">THERMAL LETHALITY KINETICS &amp; MICROBIOLOGY</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Baldwin Pasteurization Curves: The Science of Low-Temperature Safety
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              In traditional high-heat cooking, food safety relies on instantaneous thermal destruction (e.g. 165°F poultry). In sous vide, meat is vacuum-sealed and held at precise water bath equilibrium. Pathogens like <em>Salmonella enterica</em>, <em>Listeria monocytogenes</em>, and <em>E. coli</em> are eliminated through <strong>time-at-temperature lethality integration</strong> (D-value and z-value kinetics published by Dr. Douglas Baldwin).
            </p>
            <div className="bg-paper p-4 border-l-2 border-accent text-xs font-mono text-ink space-y-1">
              <div className="font-bold uppercase">The 130.0°F (54.4°C) Anaerobic Safety Threshold:</div>
              <div>
                Cooking meats below 130°F (54.4°C) for longer than 2.5 hours is strictly unsafe. In the vacuum-sealed, anaerobic (oxygen-depleted) environment of a sous vide pouch, spores of <em>Clostridium botulinum</em> and <em>Clostridium perfringens</em> can germinate and produce deadly neurotoxins between 40°F and 126°F. Never cook sous vide below 130°F for more than 120 minutes.
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Non-Linear Thickness Conduction */}
        <div className="bg-paper hairline-border p-6 sm:p-8 space-y-4 font-mono text-xs">
          <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
            THE SQUARE LAW OF HEAT CONDUCTION: t ∝ d²
          </div>
          <p className="font-sans text-xs text-ink-muted leading-relaxed">
            Thermal energy conducts through meat non-linearly. Doubling meat thickness does NOT double immersion time—it quadruples it:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs pt-1">
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-accent font-bold uppercase text-[11px]">0.75-INCH CUT (19mm)</div>
              <div className="font-bold text-ink">~35 Minutes to Core Equilibrium</div>
              <p className="text-ink-muted leading-relaxed">
                Thin steaks and small chicken tenders equilibrate rapidly. Minimal holding time required for tender cuts.
              </p>
            </div>
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-ink font-bold uppercase text-[11px]">1.5-INCH CUT (38mm)</div>
              <div className="font-bold text-ink">~90 Minutes to Core Equilibrium</div>
              <p className="text-ink-muted leading-relaxed">
                Standard artisan steak cut. Requires 1.5 to 2 hours in a 131°F bath to ensure the thermal center matches the bath.
              </p>
            </div>
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-ink-subtle font-bold uppercase text-[11px]">2.5-INCH CUT (64mm)</div>
              <div className="font-bold text-ink">~3.5 to 4 Hours to Core Equilibrium</div>
              <p className="text-ink-muted leading-relaxed">
                Double-thick tomahawks and roasts take over 3 hours just to bring the geometric core to temperature.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: The Ice-Bath Pre-Sear Shock Protocol */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">TECHNIQUE MASTERY</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            The Ice-Bath Shock: How to Sear Without Overcooking the Core
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3 font-sans">
            <p>
              The most common failure in home sous vide cooking is ruining a perfectly edge-to-edge medium-rare steak during the final skillet sear.
            </p>
            <p>
              When a steak emerges from a 130°F bath, its core is already at 130°F. Searing it immediately in a 500°F skillet conducts heat into the center, instantly pushing the meat to 145°F (medium-well) and creating the dreaded gray band.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-ink pt-1">
              <div className="p-3 bg-paper border border-hairline">
                <div className="font-bold text-accent">1. ICE SHOCK:</div>
                <div className="text-ink-muted font-sans text-xs mt-1">
                  Submerge the sealed bag in a bowl of ice water for 5 to 10 minutes. This chills the outer 2mm down to 90°F while the core remains warm.
                </div>
              </div>
              <div className="p-3 bg-paper border border-hairline">
                <div className="font-bold text-accent">2. DESICCATE SURFACE:</div>
                <div className="text-ink-muted font-sans text-xs mt-1">
                  Remove steak from pouch and blot aggressively with paper towels until the surface is completely dry to eliminate boiling steam.
                </div>
              </div>
              <div className="p-3 bg-paper border border-hairline">
                <div className="font-bold text-accent">3. 60-SEC FLASH SEAR:</div>
                <div className="text-ink-muted font-sans text-xs mt-1">
                  Sear in smoking cast iron with avocado oil for exactly 45–60 seconds per side. The crust crisps without overshooting the core.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Frequently Asked Questions */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
          <div className="micro-label text-accent">EXPERT OPERATIONAL Q&amp;A</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Frequently Asked Questions: Sous Vide Cooking
          </h2>
          <div className="space-y-4 divide-y divide-hairline text-sm text-ink-muted">
            <div className="pt-4 first:pt-0 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Why shouldn't you leave tender steaks in a sous vide bath for more than 4 hours?
              </div>
              <p className="text-xs leading-relaxed">
                While meat cannot technically overcook in temperature (it will never exceed 131°F in a 131°F bath), naturally occurring proteolytic enzymes (cathepsins and calpains) remain active at 130°F. Over 4 hours, they relentlessly dissolve structural muscle fibers, transforming a tender ribeye into a mealy, mushy, liver-like texture.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Can you cook sous vide in standard Ziploc freezer bags without a vacuum sealer?
              </div>
              <p className="text-xs leading-relaxed">
                Yes, using the water displacement method. Place meat in a heavy-duty gallon freezer bag, seal all but 1 inch of the zip-top, and slowly lower the bag into the water bath. Water pressure forces all air up and out through the opening. Seal the final inch just before the zipper submerges.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Why does sous vide chicken breast taste radically different at 145°F versus 165°F?
              </div>
              <p className="text-xs leading-relaxed">
                At 165°F, actin muscle proteins denature violently, squeezing out up to 20% of intracellular moisture and creating chalky poultry. In sous vide, holding chicken breast at 145°F for 10 minutes achieves full USDA 7-log10 Salmonella pasteurization while keeping muscle cells hydrated, resulting in velvety, juicy chicken breast impossible to achieve in a conventional oven.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Can you cook food straight from frozen in a sous vide water bath?
              </div>
              <p className="text-xs leading-relaxed">
                Yes! Sous vide is the safest method for cooking frozen foods because water transfers heat 24× faster than air. Simply add 50% more time to the minimum cook duration (e.g., an item requiring 60 minutes fresh should cook for 90 minutes from rock-frozen).
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
                name: 'Why is cooking sous vide below 130°F dangerous for long cooks?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Anaerobic vacuum pouches held below 130°F (54.4°C) for over 2.5 hours enter the danger zone for Clostridium botulinum and perfringens spore germination. Never hold below 130°F for more than 2 hours.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why shouldn’t you leave tender steaks in a sous vide bath past 4 hours?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Endogenous proteolytic enzymes continue breaking down muscle fibers, turning tender cuts mealy and mushy after 4 hours.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the ice-bath shock technique for sous vide searing?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Chilling the sealed bag in ice water for 5 minutes cools the outer surface to 90°F, allowing a smoking-hot skillet sear without overcooking the medium-rare core.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can you cook from frozen in a sous vide bath?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Simply add 50% more immersion time to the fresh baseline. High water conduction thaws and cooks the protein safely.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

