import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import DutchOvenBreadTimer from '@/components/tools/DutchOvenBreadTimer';
import { DUTCH_OVEN_BREAD_SPECS } from '@/data/tools-data';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'No-Knead Dutch Oven Bread Timer — Steam, Crust & Internal Temp Guide',
  description: 'Precision timing for artisan Dutch oven sourdough and country boules: 450°F cast iron preheat, lid-on steam expansion minutes, lid-off Maillard browning, and 208°F internal pull temp.',
  alternates: {
    canonical: absoluteUrl('/dutch-oven-bread-timer'),
  },
};

const FAQ_ENTRIES = [
  {
    q: 'Why must the Dutch oven be preheated empty for a full 45 to 60 minutes?',
    a: 'Cast iron possesses high volumetric heat capacity but low thermal conductivity. Heating a 5-to-7 quart enameled pot for a full hour charges the metal walls with sufficient stored thermal energy to prevent temperature collapse when a cold 900g dough mass is loaded. Radiative heat transfer from the searing iron base instantly superheats dough moisture, sparking instantaneous yeast gas expansion (oven spring) before the bottom crust burns.',
  },
  {
    q: 'How does trapped steam prevent premature crust formation during Phase 1?',
    a: 'As dough heats, evaporating moisture cannot escape the heavy-lidded sealed chamber. Superheated steam condenses onto the cooler dough skin, keeping surface starches hydrated and pliable for 20 minutes. Without steam, dry oven air would bake a rigid crust in under 5 minutes, mechanically trapping expanding carbon dioxide inside and preventing the loaf from rising and forming open artisan honeycomb crumb structure.',
  },
  {
    q: 'What causes blistered "micro-bubbles" on artisan sourdough crusts?',
    a: 'Micro-blistering results from cold retard fermentation combined with high-humidity steam condensation. Cold overnight refrigeration (38°F) slows yeast while bacterial lactic acid enzymes break down starches into simple maltose sugars. When loaded into a 450°F steamy Dutch oven, moisture dissolves these surface sugars into a gelatinous dextrin film. Expanding steam bubbles burst through this film, forming millions of crisp, glass-like blisters.',
  },
  {
    q: 'What is the exact target internal temperature for artisan lean doughs?',
    a: 'Lean artisan boules (flour, water, salt, yeast) must reach an internal core temperature between 205°F and 210°F (96°C–99°C). At this threshold, amylose and amylopectin starches fully gelatinize and rigidify, while excess free moisture evaporates out of the crumb structure. Pulling bread below 200°F leaves soggy, ungelatinized dough pockets in the center.',
  },
  {
    q: 'Why does slicing a hot loaf of bread ruin its internal texture?',
    a: 'Hot bread straight out of the oven is still actively setting. At 205°F, gelatinized wheat starches are soft and fragile, and excess steam is still escaping through the cooling crust. Slicing into a loaf hotter than 100°F (38°C) crushes delicate crumb cells and causes warm steam to condense on the knife blade, permanently turning the center into gummy, damp dough balls.',
  },
];

export default function DutchOvenBreadTimerPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Tools', path: '/tools' },
    { name: 'No-Knead Dutch Oven Bread Timer', path: '/dutch-oven-bread-timer' },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'No-Knead Dutch Oven Bread Baking Timer',
    url: absoluteUrl('/dutch-oven-bread-timer'),
    description: 'Calculate steam baking minutes, crust browning time, and internal temperature for Dutch oven bread.',
    applicationCategory: 'CulinaryApplication',
    operatingSystem: 'All',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ENTRIES.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
          label="PRINT BREAD GUIDE"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">STEAM RETENTION &amp; CRUST MAILLARD PHYSICS</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Dutch Oven Artisan Bread Timer
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          A heavy enameled cast iron pot mimics a commercial steam-injected deck oven. Master the exact 2-phase bake: lid-on trapped steam for massive oven spring, followed by lid-off radiant heat for a blistered mahogany crust.
        </p>
      </section>

      {/* Interactive Tool */}
      <DutchOvenBreadTimer />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED DUTCH OVEN BREAD BAKING STANDARDS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Loaf Archetype</th>
                <th className="py-2">Hydration %</th>
                <th className="py-2">Preheat Temp</th>
                <th className="py-2">Lid-On Steam</th>
                <th className="py-2">Lid-Off Crisp</th>
                <th className="py-2">Internal Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {DUTCH_OVEN_BREAD_SPECS.map((b) => (
                <tr key={b.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{b.name.split('(')[0]}</td>
                  <td className="py-2 font-bold text-accent">{b.waterHydrationPct}%</td>
                  <td className="py-2">{b.preheatTempF}°F</td>
                  <td className="py-2 font-bold text-ink">{b.lidOnSteamMins} mins</td>
                  <td className="py-2">{b.lidOffBrowningMins} mins</td>
                  <td className="py-2 text-accent font-bold">{b.internalTargetTempF}°F</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Guide: The 2-Phase Bake Thermodynamics */}
      <section className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6 font-mono text-xs text-ink-muted">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent">THERMAL PHYSICS &amp; STARCH HYDROLYSIS</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            The Two-Phase Bake: Condensation Latent Heat &amp; Maillard Pyrolysis
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          <div className="space-y-3 p-5 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              Phase 1: Lid-On Steam Expansion (0 – 25 Mins)
            </div>
            <p className="text-xs leading-relaxed">
              When a wet dough boule hits 450°F cast iron, escaping surface water instantly converts to steam inside the sealed chamber. Steam has a colossal latent heat of vaporization (<strong>2,260 kJ/kg</strong>). As it condenses on the cooler dough exterior, it transfers heat 10x faster than dry air while keeping the crust moist, supple, and stretchy.
            </p>
            <div className="p-2.5 bg-paper-card border border-hairline font-mono text-[11px] text-ink">
              ✓ Prevents premature starch shell formation<br />
              ✓ Enables gas cells to expand 40–50% in volume<br />
              ✓ Dissolves surface starches into liquid dextrin glaze
            </div>
          </div>

          <div className="space-y-3 p-5 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              Phase 2: Lid-Off Radiant Browning (25 – 45 Mins)
            </div>
            <p className="text-xs leading-relaxed">
              Removing the lid exhausts trapped steam, reducing ambient chamber humidity from ~100% to dry oven air. Surface temperatures skyrocket past 300°F (149°C), triggering the classic Maillard cascade between reducing sugars and free amino acids, followed by caramelization (pyrolysis) at 350°F+.
            </p>
            <div className="p-2.5 bg-paper-card border border-hairline font-mono text-[11px] text-ink">
              ✓ Dehydrates outer crust into a brittle, shatterproof shell<br />
              ✓ Creates deep chestnut/mahogany flavor compounds<br />
              ✓ Drives internal core temperature to final 208°F target
            </div>
          </div>
        </div>

        <div className="p-4 bg-paper hairline-border space-y-2">
          <div className="font-bold text-ink uppercase text-[11px] font-mono">
            Crumb Setting Physics: The Danger of Premature Slicing
          </div>
          <p className="font-sans text-xs leading-relaxed">
            When pulled from the oven at 208°F, the bread’s amylose and amylopectin gel matrix is still molten and fragile. Cooling on an elevated wire rack for a minimum of <strong>60 to 90 minutes</strong> allows retrogradation—starches recrystallize into a firm, resilient cellular sponge, and moisture redistributes uniformly. Slicing too early causes steam flash, instantly condensing the crumb into a wet, rubbery mush.
          </p>
        </div>
      </section>

      {/* On-Page FAQs */}
      <section className="bg-paper hairline-border p-6 sm:p-8 space-y-6">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent font-mono">E-E-A-T ARTISAN BAKING BENCHMARKS</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Frequently Asked Questions: Dutch Oven Bread Mechanics
          </h2>
        </div>

        <div className="space-y-6">
          {FAQ_ENTRIES.map((faq, i) => (
            <div key={i} className="space-y-2">
              <h3 className="text-sm font-bold uppercase text-ink font-sans flex items-baseline gap-2">
                <span className="text-accent font-mono text-xs">0{i + 1}.</span>
                {faq.q}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed font-sans pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
