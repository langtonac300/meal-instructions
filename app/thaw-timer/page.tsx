import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import ThawTimerCalculator from '@/components/tools/ThawTimerCalculator';
import { THAW_SPECS } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Meat Thawing & Defrost Time Calculator — Fridge, Cold Water & Microwave',
  description: 'Calculate exact USDA safe thawing times for ground beef, chicken breasts, steaks, roasts, and whole turkeys. Refrigerator hours, 30-minute cold water bath cycles, and microwave power settings.',
  alternates: {
    canonical: absoluteUrl('/thaw-timer'),
  },
};

export default function ThawTimerPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Meat Thawing & Defrost Time Calculator', path: '/thaw-timer' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Meat Thawing & Defrost Time Calculator',
    url: absoluteUrl('/thaw-timer'),
    description: 'Calculate defrost durations across refrigerator, cold water bath, and microwave methods.',
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
          label="PRINT THAW GUIDE"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">USDA BACTERIAL DANGER ZONE TIMELINES</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Safe Meat Defrost &amp; Thaw Calculator
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Never thaw meat on the kitchen counter. Warm air warms the surface to the bacterial danger zone (40°F–140°F) in 2 hours while the core stays frozen. Calculate refrigerator days, rapid 30-min cold-water submersion swaps, and emergency microwave defrosting.
        </p>
      </section>

      {/* Interactive Tool */}
      <ThawTimerCalculator />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED USDA SAFE THAWING TIMELINES
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Cut / Package</th>
                <th className="py-2">Weight</th>
                <th className="py-2">Fridge (38°F)</th>
                <th className="py-2">Cold Water Bath</th>
                <th className="py-2">Microwave (30%)</th>
                <th className="py-2">Refreeze Policy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {THAW_SPECS.map((s) => (
                <tr key={s.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{s.name.split('(')[0]}</td>
                  <td className="py-2">{s.weightLbs} lbs</td>
                  <td className="py-2 font-bold text-accent">{s.fridgeThawHours} hrs</td>
                  <td className="py-2 font-bold text-ink">{s.coldWaterThawMinutes} mins</td>
                  <td className="py-2">{s.microwaveDefrostMinutes} mins</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{s.refreezeSafety.split(';')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Deep Dive & Food Safety Microbiology */}
      <section className="space-y-8 font-sans">
        {/* Section 1: Danger Zone Kinetics & Microbial Exponential Growth */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">MICROBIAL KINETICS &amp; GENERATION TIME</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Why Countertop Thawing is Dangerous: The 20-Minute Doubling Law
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              The most dangerous kitchen myth is thawing frozen meat at ambient room temperature on the kitchen counter. Air is an insulator with exceptionally poor thermal conductivity (<strong>k ≈ 0.026 W/m·K</strong>).
            </p>
            <p>
              When a frozen steak or chicken package sits at room temperature (72°F / 22°C), ambient air warms the outer millimeter past 40°F within 60 to 90 minutes. However, the frozen thermal core remains at 20°F–28°F for another 4 to 6 hours.
            </p>
            <div className="bg-paper p-4 border-l-2 border-accent text-xs font-mono text-ink space-y-1">
              <div className="font-bold uppercase">Bacterial Exponential Doubling Equation:</div>
              <div>N(t) = N₀ × 2^(t / g)</div>
              <div className="text-ink-muted text-[11px] mt-1">
                Where generation time (g) in the 70°F–100°F danger zone drops to just 20 minutes for pathogens like <em>Salmonella enterica</em> and <em>Staphylococcus aureus</em>. In 4 hours at room temperature, a baseline count of 100 bacterial cells multiplies into over 400,000 viable bacteria on the warm surface before the center ever thaws.
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Water vs Air Conduction Physics */}
        <div className="bg-paper hairline-border p-6 sm:p-8 space-y-4 font-mono text-xs">
          <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
            THERMAL CONDUCTION DYNAMICS: WATER (0.60 W/m·K) VS AIR (0.026 W/m·K)
          </div>
          <p className="font-sans text-xs text-ink-muted leading-relaxed">
            The cold-water submersion bath works exponentially faster than refrigerator thawing because liquid water conducts heat approximately <strong>23 to 24 times faster than air</strong>:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-xs pt-1">
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-accent font-bold uppercase text-[11px]">REFRIGERATOR (35°F–38°F)</div>
              <div className="font-bold text-ink">Slowest // Safest</div>
              <p className="text-ink-muted leading-relaxed">
                Requires 24 hours per 4–5 lbs. Cold ambient air preserves muscle cell integrity and prevents any surface warming past 38°F. Safe to refreeze raw if plans change.
              </p>
            </div>
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-ink font-bold uppercase text-[11px]">COLD WATER BATH (40°F)</div>
              <div className="font-bold text-ink">Rapid // 30-Min Swaps</div>
              <p className="text-ink-muted leading-relaxed">
                Requires 30 mins per pound. High-density water transfers heat rapidly while staying below the danger zone. Water must be refreshed every 30 mins. Must cook immediately.
              </p>
            </div>
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-ink-subtle font-bold uppercase text-[11px]">MICROWAVE DEFROST (30%)</div>
              <div className="font-bold text-ink">Emergency // Uneven</div>
              <p className="text-ink-muted leading-relaxed">
                Microwaves penetrate ~1 inch deep and heat water molecules unevenly, creating localized cooked hot spots. Useful only in true emergencies; must cook immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Re-freezing Microbiological Protocol */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">USDA SAFETY PROTOCOL</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            The Refreeze Rules: What Can and Cannot Go Back to the Freezer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-ink-muted">
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">✓ Refrigerator Thawed: Safe to Refreeze Raw</div>
              <p className="text-xs leading-relaxed">
                According to the USDA FSIS, if meat was thawed entirely inside a refrigerator operating below 40°F, it may be refrozen raw without cooking. However, the secondary freeze cycle causes additional ice crystal growth that punctures cellular walls, resulting in a 5%–10% moisture loss upon second thaw.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase font-bold text-ink">⚠ Cold Water / Microwave: Must Cook First</div>
              <p className="text-xs leading-relaxed">
                Meat thawed via cold water bath or microwave has experienced surface warming that allows bacterial reactivation. You cannot return it raw to the freezer. You must cook it fully to safe internal pasteurization temperatures before freezing.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Frequently Asked Questions */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
          <div className="micro-label text-accent">EXPERT OPERATIONAL Q&amp;A</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Frequently Asked Questions: Safe Meat Thawing
          </h2>
          <div className="space-y-4 divide-y divide-hairline text-sm text-ink-muted">
            <div className="pt-4 first:pt-0 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Can you leave frozen chicken breasts on the counter while at work for 8 hours?
              </div>
              <p className="text-xs leading-relaxed">
                Absolutely not. Leaving poultry on the counter for 8 hours leaves the exterior in the 40°F–140°F danger zone for 6+ hours. Pathogenic bacteria multiply into dangerous colonies and produce heat-resistant toxins that cannot be destroyed even if you bake the chicken to 165°F later. Any meat left at room temperature for over 2 hours (or 1 hour above 90°F) must be discarded.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Why must you refresh the cold water bath every 30 minutes?
              </div>
              <p className="text-xs leading-relaxed">
                Two reasons: First, as heat transfers from the tap water into the frozen protein, the water chills down to near 32°F, collapsing the thermal gradient and halting the thaw. Second, if left stagnant, the surface water will slowly warm to room temperature, potentially entering the danger zone. Refreshing every 30 minutes keeps the water cold (safe) while maintaining high conduction.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                How long can meat sit in the refrigerator after it is fully thawed?
              </div>
              <p className="text-xs leading-relaxed">
                Ground poultry, ground beef, and fresh poultry breasts should be cooked within 1 to 2 days of thawing in the refrigerator. Whole muscle cuts of beef, pork, veal, and lamb (steaks, roasts, chops) can safely remain refrigerated for 3 to 5 days before cooking.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Can you thaw meat in hot or warm water to speed it up?
              </div>
              <p className="text-xs leading-relaxed">
                No. Hot water causes the exterior meat fibers to cook, denature, and heat into the bacterial danger zone while the core remains frozen solid. Always use cold tap water under 50°F.
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
                name: 'Can you leave frozen chicken breasts on the counter while at work for 8 hours?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. Countertop thawing keeps the exterior in the USDA bacterial danger zone (40°F–140°F) for hours, allowing bacteria to multiply and produce heat-stable enterotoxins.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why must you refresh the cold water bath every 30 minutes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Refreshing the water maintains high thermal conduction while preventing the water from cooling down to near-freezing or warming up into the danger zone.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can you refreeze meat that was thawed in the refrigerator?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Meat thawed completely in a refrigerator below 40°F can be safely refrozen raw without cooking, though minor moisture loss may occur.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long can thawed meat sit safely in the refrigerator before cooking?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Poultry and ground meats can sit 1 to 2 days; whole beef and pork steaks or roasts can sit 3 to 5 days before cooking.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

