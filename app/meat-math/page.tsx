import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Users, ShieldCheck, Scale, Calculator, HelpCircle } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import MeatMathScaler from '@/components/tools/MeatMathScaler';
import { MEAT_MATH_PROFILES } from '@/data/tools-data';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Meat Math & BBQ Crowd Scaler — Raw Butcher Weight & Shrinkage Calculator',
  description:
    'Hosting a cookout, holiday party, or backyard BBQ? Calculate exact raw butcher poundage factoring in 25-50% thermal moisture shrinkage, bone discard, and appetite tiers with full formulas and FAQs.',
  alternates: {
    canonical: absoluteUrl('/meat-math'),
  },
};

export default function MeatMathPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Tools', path: '/tools' },
    { name: 'Meat Math & BBQ Party Scaler', path: '/meat-math' },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Feed The Crew Meat Math & BBQ Party Scaler',
    url: absoluteUrl('/meat-math'),
    description: 'Calculate raw butcher weight, shrinkage loss, and side dishes for groups and cookouts.',
    applicationCategory: 'CulinaryApplication',
    operatingSystem: 'All',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much meat do I buy per person for a barbecue or party?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The universal rule of thumb is 1/3 pound (approx. 5.5 oz) of cooked boneless meat per adult for a standard buffet with multiple side dishes, or 1/2 pound (8 oz) cooked meat per person if serving big eaters or minimal sides. To reach that cooked amount, you must buy 8 to 12 raw ounces per person to account for thermal moisture shrinkage and fat rendering.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does meat shrink when cooked?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Lean boneless meats (chicken breast, pork tenderloin) shrink by 20% to 25% due to water evaporation. Fatty ground beef (80/20) and pork shoulder shrink by 30% to 40% as fat renders out. Whole briskets shrink by 40% to 50% after exterior fat cap trimming and 12 hours of thermal rendering.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you calculate bone-in meat like ribs and chicken wings?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bones account for 35% to 50% of the raw weight. For bone-in baby back ribs, plan on 1 full rack per 2 adults (approx. 1 lb per person raw). For party chicken wings, buy 1 to 1.25 lbs raw per person (yielding about 8-10 wings cooked).',
        },
      },
      {
        '@type': 'Question',
        name: 'How do side dishes affect meat consumption at a party?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Heavy, starch-dense side dishes (mac and cheese, baked beans, potato salad, dinner rolls) reduce protein consumption by 15% to 20%. If serving 3 or more hearty sides, calculate meat at the lower end of the raw poundage scale.',
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
          label="PRINT PURCHASE ORDER"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card border border-hairline hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <header className="border-b border-ink pb-8 space-y-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent">
          GROUP PORTIONING &amp; BUTCHER MATH
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-ink uppercase font-sans">
          Feed The Crew Meat Math
        </h1>
        <p className="text-base sm:text-lg text-ink-muted max-w-3xl leading-relaxed">
          Never run short on burgers or overspend on brisket again. Factored for real thermal moisture shrinkage, bone discard weight, and appetite tiers.
        </p>
      </header>

      {/* Interactive Tool Component */}
      <MeatMathScaler />

      {/* Culinary Physics: Shrinkage Math Explained */}
      <section className="bg-paper-card border border-hairline p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent mb-2">
            <Scale className="w-4 h-4" />
            <span>The Butcher Calculation Equation</span>
          </div>
          <h2 className="text-2xl font-bold uppercase text-ink">
            Why 10 Pounds of Raw Meat Never Feeds 10 People 1 Pound Each
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed mt-2">
            When raw meat cooks, two physical processes cause weight loss: moisture evaporation (muscle cells contract and expel water at temperatures above 140°F) and fat rendering (intramuscular collagen and lipid pockets melt into liquid runoff). Depending on the cut, you lose between 20% and 50% of the butcher weight between the grocery scale and the dinner plate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 bg-paper border border-hairline space-y-2">
            <span className="font-bold text-ink uppercase text-[12px] font-sans">1. Raw Butcher Weight</span>
            <p className="text-ink-muted font-sans text-xs">
              The weight on the butcher tag. Includes surface fat caps, internal moisture, and bones (for ribs/wings/chops).
            </p>
          </div>
          <div className="p-4 bg-paper border border-hairline space-y-2">
            <span className="font-bold text-accent uppercase text-[12px] font-sans">2. Thermal Shrinkage Factor</span>
            <p className="text-ink-muted font-sans text-xs">
              Lean poultry: 20-25% loss.<br />
              Ground beef / pork: 30-35% loss.<br />
              Whole brisket: 45-50% loss.
            </p>
          </div>
          <div className="p-4 bg-paper border border-hairline space-y-2">
            <span className="font-bold text-emerald-800 uppercase text-[12px] font-sans">3. Net Plate Yield</span>
            <p className="text-ink-muted font-sans text-xs">
              The actual edible weight served on the bun or plate. Target 5.5 to 8 oz per adult for full satiety.
            </p>
          </div>
        </div>
      </section>

      {/* SSR Static Reference Table for Search Engines */}
      <section className="bg-paper border border-hairline p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] border-b border-hairline pb-2">
          INDEXED RAW-TO-COOKED SHRINKAGE CONSTANTS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2.5">Style / Cut</th>
                <th className="py-2.5">Raw Oz / Adult</th>
                <th className="py-2.5">Cook Shrinkage</th>
                <th className="py-2.5">Bone-In?</th>
                <th className="py-2.5">Standard Side</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {MEAT_MATH_PROFILES.map((p) => (
                <tr key={p.id} className="hover:bg-paper-card">
                  <td className="py-2.5 font-bold text-ink">{p.name}</td>
                  <td className="py-2.5 font-bold text-accent">{p.rawOzPerAdult} oz</td>
                  <td className="py-2.5">{p.shrinkagePercent}%</td>
                  <td className="py-2.5">{p.isBoneIn ? 'Yes' : 'No'}</td>
                  <td className="py-2.5 text-ink-muted font-sans text-xs">{p.sideRecommendations[0]?.item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Meat Math FAQs */}
      <section className="border-t border-ink pt-8 space-y-6">
        <h2 className="text-[24px] font-extrabold uppercase tracking-tight">
          Crowd Cooking &amp; Portioning FAQs
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
