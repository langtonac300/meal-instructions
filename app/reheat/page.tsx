import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Flame, ShieldCheck, Zap, AlertTriangle, HelpCircle } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import ReheatEngine from '@/components/tools/ReheatEngine';
import { REHEAT_ITEMS } from '@/data/tools-data';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Leftover & Takeout Revive Engine — Zero-Fluff Reheat Times & Temps',
  description:
    'Exact air fryer and skillet reheat times, temperatures, and crisp-restoration protocols for pizza, French fries, wings, burgers, and takeout. Never microwave again.',
  alternates: {
    canonical: absoluteUrl('/reheat'),
  },
};

export default function ReheatPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Tools', path: '/tools' },
    { name: 'Leftover & Takeout Revive Engine', path: '/reheat' },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Zero-Fluff Leftover & Takeout Revive Engine',
    url: absoluteUrl('/reheat'),
    description: 'Exact times, temperatures, and methods to reheat restaurant takeout and leftovers without sogginess.',
    applicationCategory: 'CulinaryApplication',
    operatingSystem: 'All',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why does the microwave make leftover pizza and fries soggy and rubbery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Microwaves work by exciting water molecules inside the food. This creates pressurized steam that pushes outward through the crust or batter. Once the steam reaches the exterior, it condenses into water droplets that dissolve the crispy starch matrix into a gummy sponge. Air fryers and ovens use dry radiant heat that rapidly evaporates this surface water, restoring crunch.',
        },
      },
      {
        '@type': 'Question',
        name: 'What temperature is best for reheating in the air fryer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For most fried foods (wings, tenders, fries, egg rolls), 360°F to 375°F for 3 to 5 minutes is optimal. Temperatures above 380°F risk burning the exterior breading before the refrigerated interior reaches safe serving temperatures.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you reheat a hamburger or steak without overcooking the meat?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Separate the bun and fresh toppings (lettuce, tomato) first. Reheat the meat patty in an air fryer at 350°F for 3 to 4 minutes or in a covered skillet over medium-low heat with 1 teaspoon of water. Toast the bun separately in the final 60 seconds, then reassemble.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you reheat restaurant takeout in its original cardboard or styrofoam container?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Never reheat food in styrofoam, plastic takeout containers, or cardboard boxes with metal staples or wax coatings. Always transfer leftovers directly onto a clean air fryer crisper plate, cast iron skillet, or parchment-lined sheet pan.',
        },
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-12 text-ink font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
          <span>Back to Tools</span>
        </Link>
        <PrintButton
          label="PRINT REHEAT CHART"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card border border-hairline hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <header className="border-b border-ink pb-8 space-y-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent">
          CRISP PRESERVATION &amp; REHEAT PROTOCOL
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-ink uppercase font-sans">
          The Takeout Revive Engine
        </h1>
        <p className="text-base sm:text-lg text-ink-muted max-w-3xl leading-relaxed">
          Never nuke leftovers in the microwave again. Exact temperatures and times to revive day-old fries, pizza, wings, and tenders back to fresh-out-of-the-fryer crunch.
        </p>
      </header>

      {/* Interactive Tool Component */}
      <ReheatEngine />

      {/* The Physics of Starch Retrogradation */}
      <section className="bg-paper-card border border-hairline p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent mb-2">
            <Flame className="w-4 h-4" />
            <span>Culinary Physics</span>
          </div>
          <h2 className="text-2xl font-bold uppercase text-ink">
            Why Refrigeration Makes Food Stale and How Dry Heat Reverses It
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed mt-2">
            When baked goods and fried batters cool in the refrigerator, gelatinized starches crystallize into a rigid, chalky structure in a process called <em>starch retrogradation</em>. Simultaneously, internal moisture migrates toward the crispy exterior crust. Reheating in a microwave boils this trapped moisture, creating high-pressure steam that turns the crust soggy. Dry convection heat in an air fryer or hot skillet re-gelatinizes the starches and flashes away exterior moisture, restoring day-one crunch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 bg-paper border border-hairline space-y-1.5">
            <strong className="text-ink uppercase block text-[12px] font-sans">1. Moderate Temperature</strong>
            <p className="text-ink-muted font-sans text-xs">
              Reheat at 360°F to 375°F. Excessively high heat (400°F+) burns pre-cooked breading before the chilled interior warms through.
            </p>
          </div>
          <div className="p-4 bg-paper border border-hairline space-y-1.5">
            <strong className="text-ink uppercase block text-[12px] font-sans">2. Air Circulation</strong>
            <p className="text-ink-muted font-sans text-xs">
              Place items directly on the wire crisper plate with space between them. Trapped steam under flat items causes soft bottoms.
            </p>
          </div>
          <div className="p-4 bg-paper border border-hairline space-y-1.5">
            <strong className="text-ink uppercase block text-[12px] font-sans">3. The 60-Second Rest</strong>
            <p className="text-ink-muted font-sans text-xs">
              Rest revived foods on a wire rack for 60 seconds before eating. Starches firm and harden into glass-like crunch as surface steam vents.
            </p>
          </div>
        </div>
      </section>

      {/* SSR Static Reference Table for Search Engines */}
      <section className="bg-paper border border-hairline p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] border-b border-hairline pb-2">
          INDEXED REHEAT SPECIFICATION TABLE
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2.5">Item</th>
                <th className="py-2.5">Air Fryer Temp</th>
                <th className="py-2.5">Time</th>
                <th className="py-2.5">Shake Mark</th>
                <th className="py-2.5">Anti-Soggy Secret</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {REHEAT_ITEMS.map((item) => (
                <tr key={item.id} className="hover:bg-paper-card">
                  <td className="py-2.5 font-bold text-ink font-sans text-xs">{item.name}</td>
                  <td className="py-2.5 text-accent font-bold">{item.airFryerTemp}°F</td>
                  <td className="py-2.5 font-bold text-ink">{item.airFryerMinutes} mins</td>
                  <td className="py-2.5 text-ink-muted">{item.shakeAtMinute ? `${item.shakeAtMinute}m` : '—'}</td>
                  <td className="py-2.5 text-ink-muted font-sans text-xs">{item.antiSoggyTip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reheat FAQs */}
      <section className="border-t border-ink pt-8 space-y-6">
        <h2 className="text-[24px] font-extrabold uppercase tracking-tight">
          Leftover &amp; Reheat FAQs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqSchema.mainEntity.map((faq, i) => (
            <div key={i} className="border-b border-hairline pb-4 space-y-1.5">
              <h3 className="font-bold text-[16px] text-ink">
                {faq.name}
              </h3>
              <p className="text-[14px] leading-[1.6] text-ink-muted">
                {faq.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
