import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import MacroTargetMeatScaler from '@/components/tools/MacroTargetMeatScaler';
import { MACRO_PROTEIN_SOURCES } from '@/data/tools-data';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Protein Target Meat Scaler — Raw to Cooked Macro Weight Calculator',
  description: 'Calculate exact raw butcher scale weight vs cooked plate weight to hit target protein goals: Chicken breast, 93/7 beef, salmon, pork tenderloin, and egg whites. Water loss shrinkage included.',
  alternates: {
    canonical: absoluteUrl('/macronutrient-calculator'),
  },
};

const FAQ_ENTRIES = [
  {
    q: 'Should I weigh meat raw or cooked for accurate macronutrient tracking?',
    a: 'Weighing meat raw is universally more accurate because water loss during cooking varies wildly (from 15% in gentle sous-vide up to 40% in well-done grilling). However, if tracking cooked meat, you must log it against a verified "cooked" database entry (e.g., USDA Cooked Roasted Chicken Breast) rather than the raw entry, which would underestimate actual protein and caloric density by 25% to 35%.',
  },
  {
    q: 'Why does meat lose 25% of its weight during cooking?',
    a: 'Raw muscle tissue consists of approximately 75% water, 20% protein, and 3–5% intracellular lipids. As internal temperature climbs past 140°F (60°C), myosin and actin protein filaments denature and contract like squeezing a sponge. This physical contraction expels sarcoplasmic intracellular fluid (thermal purge). Water evaporates or collects in the pan, concentrating the remaining protein mass.',
  },
  {
    q: 'What is the "Leucine Threshold" for muscle protein synthesis?',
    a: 'Muscle Protein Synthesis (MPS) is triggered through the mTORC1 biochemical pathway, which requires a transient intracellular concentration of roughly 2.7 to 3.0 grams of the essential branched-chain amino acid L-leucine. In whole food terms, this equates to approximately 35 to 45 grams of high-quality animal protein (roughly 5 to 6 ounces of cooked lean poultry, beef, or fish).',
  },
  {
    q: 'Does protein degrade or disappear when cooked at high heat?',
    a: 'No. Standard cooking temperatures (up to 450°F / 232°C) denature tertiary and quaternary protein structures (unfolding amino acid chains, which actually improves human digestive enzymatic access), but do not destroy primary peptide bonds. Only prolonged extreme charring and carbonization past 600°F chemically alters surface amino acids into heterocyclic amines (HCAs).',
  },
  {
    q: 'How much fat renders out of ground beef during browning?',
    a: 'When pan-browning 80/20 ground beef to a well-done crumbled state, roughly 50% to 60% of the total lipid content renders into liquid tallow in the skillet. If thoroughly drained on paper towels, 100 grams of cooked 80/20 beef finishes with approximately 15–16% residual fat. For 93/7 lean ground beef, minimal rendering occurs (~15%), meaning nearly all lipids remain in the cooked meat.',
  },
];

export default function MacronutrientCalculatorPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Tools', path: '/tools' },
    { name: 'Protein Target Meat Scaler', path: '/macronutrient-calculator' },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Protein Target Meat Scaler & Raw-to-Cooked Macro Calculator',
    url: absoluteUrl('/macronutrient-calculator'),
    description: 'Calculate raw meat portion scale weights to hit exact protein targets factoring in cooking shrinkage.',
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
          label="PRINT MACRO GUIDE"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">THERMAL SHRINKAGE &amp; PROTEIN CONCENTRATION PHYSICS</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Protein Target Meat Scaler
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Raw meat loses 20%–35% of its weight to water purge and lipid rendering in the pan. Input your target meal protein goal to calculate exact butcher scale weight needed before cooking.
        </p>
      </section>

      {/* Interactive Tool */}
      <MacroTargetMeatScaler />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED PROTEIN DENSITIES &amp; COOKING SHRINKAGE BENCHMARKS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Protein Cut</th>
                <th className="py-2">Raw Protein (100g)</th>
                <th className="py-2">Cooked Protein / Oz</th>
                <th className="py-2">Avg Shrinkage %</th>
                <th className="py-2">Raw Calories (100g)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {MACRO_PROTEIN_SOURCES.map((s) => (
                <tr key={s.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{s.name}</td>
                  <td className="py-2 font-bold text-accent">{s.rawProteinPer100g}g</td>
                  <td className="py-2 font-bold text-ink">{s.cookedProteinPerOz}g / oz</td>
                  <td className="py-2">-{s.shrinkageWeightLossPct}%</td>
                  <td className="py-2">{s.rawCaloriesPer100g} kcal</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Reference Guide: Muscle Tissue Physics */}
      <section className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6 font-mono text-xs text-ink-muted">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent">BIOCHEMICAL THERMODYNAMICS</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Muscle Shrinkage Kinetics: Thermal Purge &amp; Protein Densification
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          <div className="space-y-3 p-5 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              The Concentration Phenomenon
            </div>
            <p className="text-xs leading-relaxed">
              When muscle tissue is heated, water evaporates while protein grams remain constant. Consequently, the nutritional density per ounce increases:
            </p>
            <div className="p-3 bg-paper-card border border-hairline font-mono text-[11px] text-ink space-y-1">
              <div>Raw Chicken Breast: ~6.5g protein / oz (23% protein)</div>
              <div>Cooked Chicken Breast: ~8.8g protein / oz (31% protein)</div>
              <div className="text-accent font-bold pt-1">
                4 oz Raw = ~26g Protein | 4 oz Cooked = ~35g Protein
              </div>
            </div>
          </div>

          <div className="space-y-3 p-5 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              mTORC1 &amp; The Leucine Trigger
            </div>
            <p className="text-xs leading-relaxed">
              Maximizing muscle protein synthesis requires crossing the leucine threshold in a single bolus meal:
            </p>
            <div className="p-3 bg-paper-card border border-hairline font-mono text-[11px] text-ink space-y-1">
              <div>Target L-Leucine per Meal: 2.7g – 3.2g</div>
              <div>Whole Animal Protein Required: 35g – 45g</div>
              <div className="text-accent font-bold pt-1">
                Optimal Cooked Portion: 4.5 oz to 5.5 oz lean cut
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-paper hairline-border space-y-2">
          <div className="font-bold text-ink uppercase text-[11px] font-mono">
            Scale Calibration Rule for Meal Preppers
          </div>
          <p className="font-sans text-xs leading-relaxed">
            When preparing batch meals for the week, weigh the total raw meat before cooking to verify macro targets, then weigh the final cooked batch after cooling. Divide the cooked weight by the number of portions. Example: 48 oz raw chicken breast (312g protein) cooks down to ~34 oz. Dividing into 4 meal containers requires <strong>8.5 oz of cooked meat per bowl</strong> to deliver 78g of protein per serving.
          </p>
        </div>
      </section>

      {/* On-Page FAQs */}
      <section className="bg-paper hairline-border p-6 sm:p-8 space-y-6">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent font-mono">E-E-A-T MACRONUTRIENT SCIENCE</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Frequently Asked Questions: Protein Density &amp; Meat Weighing
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
