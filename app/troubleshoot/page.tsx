import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import TroubleshootMatrix from '@/components/tools/TroubleshootMatrix';
import { TROUBLESHOOT_ISSUES } from '@/data/tools-data';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Kitchen Troubleshooter & Dinner Rescue — 5-Second Fixes for Cooking Disasters',
  description: 'Air fryer smoking? Fries soggy? Steak gray with no crust? Breading sliding off? Instant 5-second diagnostic fixes for common kitchen emergencies.',
  alternates: {
    canonical: absoluteUrl('/troubleshoot'),
  },
};

const FAQ_ENTRIES = [
  {
    q: 'Why did my steak turn gray and rubbery instead of forming a brown crust?',
    a: 'Surface water is the enemy of the Maillard reaction. Water requires 2,260 kJ/kg of latent heat to vaporize. If a steak enters a hot pan with microscopic surface moisture, all thermal energy is spent boiling the water into 212°F (100°C) steam. The Maillard reaction requires temperatures above 285°F (140°C). The meat steams in its own puddle rather than searing. Always pat meat aggressively with paper towels or dry-brine uncovered in the fridge before searing.',
  },
  {
    q: 'How do you fix a broken pan sauce that has separated into oily grease and curdled solids?',
    a: 'A broken sauce occurs when emulsion micelles collapse and bound water molecules detach from lipids. Immediately remove the pan from direct heat. Vigorously whisk in 1 tablespoon of ice-cold water or heavy cream, or whisk in 1 teaspoon of Dijon mustard. The cold water drops the emulsion temperature below the lipid breaking point, while mustard introduces natural amphiphilic lecithin molecules that rebuild the water-in-oil micelle bridges.',
  },
  {
    q: 'Why is my air fryer billowing acrid white smoke into the kitchen?',
    a: 'White smoke occurs when rendered fat (from bacon, burger patties, or chicken wings) drips into the hot bottom drawer beneath the crisper basket. Direct radiant heat from the lower chassis superheats the pooled grease past its smoke point, decomposing triglycerides into acrid, throat-stinging acrolein gas. To immediately eliminate smoke: pour 2 tablespoons of water into the bottom drawer to form a steam buffer, or place a slice of bread on the bottom to absorb dripping oil.',
  },
  {
    q: 'Why does crispy breading slide off fried chicken cutlets like a wet jacket?',
    a: 'Breading delamination is caused by trapped steam. As the cold meat heats, internal water vaporizes and tries to vent outward. If the raw meat surface was not dusted with dry flour or cornstarch prior to the egg wash, or if the breaded cutlets were fried immediately without resting, escaping steam pools under the breading layer and dissolves the egg bond. Rest breaded cutlets on a wire rack for 10–15 minutes before frying to allow the protein binders to hydrate and fuse.',
  },
  {
    q: 'How do you salvage a soup or stew that was accidentally oversalted?',
    a: 'The old wives’ tale of dropping a raw potato into oversalted soup does not chemically reduce sodium concentration. The only mathematically valid remedies are volumetric dilution and sensory masking. Add unsalted liquid (water, low-sodium stock, or heavy cream), introduce acid (fresh lemon juice or vinegar) to counter perceived salinity on the tongue’s ion channels, or incorporate unseasoned cooked starches (such as unsalted beans or pasta) to expand the dish’s total volume.',
  },
];

export default function TroubleshootPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Tools', path: '/tools' },
    { name: 'Kitchen Troubleshooter & Dinner Rescue', path: '/troubleshoot' },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Kitchen Troubleshooter & 5-Second Dinner Rescue Matrix',
    url: absoluteUrl('/troubleshoot'),
    description: 'Instant actionable solutions for common cooking mistakes and kitchen failures.',
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
          label="PRINT RESCUE GUIDE"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">INSTANT EMERGENCY TRIAGE &amp; BIOCHEMICAL REMEDIATION</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Fix My Cook // 5-Second Dinner Rescue
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          When something goes wrong in the pan or air fryer, you have 15 seconds before dinner is ruined or the smoke alarm triggers. Zero fluff, instant thermodynamic and chemical corrections.
        </p>
      </section>

      {/* Interactive Tool Component */}
      <TroubleshootMatrix />

      {/* SSR Static Reference Table for Search Engines */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED KITCHEN EMERGENCY REMEDIES &amp; ROOT CAUSES
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Emergency Symptom</th>
                <th className="py-2">Biophysical Root Cause</th>
                <th className="py-2">5-Second Actionable Triage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {TROUBLESHOOT_ISSUES.map((issue) => (
                <tr key={issue.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{issue.symptom}</td>
                  <td className="py-2 text-ink-muted text-[11px]">{issue.rootCause}</td>
                  <td className="py-2 text-accent font-bold font-sans text-xs">{issue.instantFiveSecFix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Reference Guide: Failure Thermodynamics */}
      <section className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6 font-mono text-xs text-ink-muted">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent">CULINARY PATHOLOGY</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Thermodynamic Failures: Latent Heat Vaporization &amp; Emulsion Breakdown
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="space-y-2 p-4 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              01. The Boiling Gray Trap
            </div>
            <p className="text-xs leading-relaxed">
              Water caps surface heat at 212°F (100°C). Maillard browning cannot occur below 285°F (140°C). Overcrowding a pan dumps cold thermal mass and intracellular water faster than the burner can vaporize it, transforming searing into gray poaching.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              02. Acrolein Pyrolysis Smoke
            </div>
            <p className="text-xs leading-relaxed">
              When animal lipids drip into uncooled cookware bases, thermal decomposition shears glycerol from fatty acid tails, yielding toxic, eye-watering acrolein gas. Adding water to grease pans caps base heat at 212°F, halting chemical pyrolysis.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              03. Emulsion Phase Inversion
            </div>
            <p className="text-xs leading-relaxed">
              Pan sauces hold fat and water in suspension via protein or phospholipid surfactants. Excessive heat (&gt; 185°F) denatures protein surfactants, forcing dispersed lipid droplets to coalesce into a separated oily slick on top of watery sediment.
            </p>
          </div>
        </div>

        <div className="p-4 bg-paper hairline-border space-y-2">
          <div className="font-bold text-ink uppercase text-[11px] font-mono">
            The Three-Step Breading Fuse Protocol
          </div>
          <p className="font-sans text-xs leading-relaxed">
            To guarantee breading never delaminates: (1) <strong>Dry &amp; Dust:</strong> Pat cutlets bone-dry with paper towels, then dust lightly in unseasoned flour or cornstarch to absorb surface condensation; (2) <strong>Egg Wash Glue:</strong> Dip in whole beaten egg with 1 tbsp water to dilute thick albumen strands; (3) <strong>The 10-Minute Rest:</strong> Rest breaded cutlets on a wire rack for 10 minutes prior to frying so starches hydrate and form a continuous protein skin.
          </p>
        </div>
      </section>

      {/* On-Page FAQs */}
      <section className="bg-paper hairline-border p-6 sm:p-8 space-y-6">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent font-mono">E-E-A-T CULINARY EMERGENCY TRIAGE</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Frequently Asked Questions: Dinner Rescue &amp; Mistake Reversals
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

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
