import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import MarinadeRatioCalculator from '@/components/tools/MarinadeRatioCalculator';
import { MARINADE_PROFILES } from '@/data/tools-data';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Golden Marinade Ratio Calculator — Acid to Oil Formula & Timing',
  description: 'The definitive 3:1 fat-to-acid marinade formula with exact salinity math (1.2%), emulsifiers, and maximum safe marination hours to prevent mealy chicken and ceviche mush.',
  alternates: {
    canonical: absoluteUrl('/marinade-ratio'),
  },
};

export default function MarinadeRatioPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: 'Golden Marinade Ratio Calculator', path: '/marinade-ratio' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Golden Marinade Acid-to-Oil Ratio Calculator',
    url: absoluteUrl('/marinade-ratio'),
    description: 'Calculate exact tablespoons of oil, acid, salt grams, and safe marination durations for chicken, steak, pork, and seafood.',
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
          label="PRINT MARINADE RULES"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">PROTEIN DENATURATION &amp; FLAVOR EQUILIBRIUM</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Golden Marinade Formula &amp; Ratio Engine
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Too much acid dissolves meat into chalky mush; too little salt prevents deep penetration. Calculate exact 3:1 fat-to-acid volumes, salinity grams, and maximum safe soaking hours.
        </p>
      </section>

      {/* Interactive Tool */}
      <MarinadeRatioCalculator />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED MARINATION STANDARDS BY PROTEIN
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Protein</th>
                <th className="py-2">Ideal Ratio</th>
                <th className="py-2">Salinity %</th>
                <th className="py-2">Min Soak</th>
                <th className="py-2">Max Safe Limit</th>
                <th className="py-2">Acid Danger</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {MARINADE_PROFILES.map((p) => (
                <tr key={p.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{p.protein}</td>
                  <td className="py-2 font-bold text-accent">{p.fatToAcidRatio.split(' ')[0]}</td>
                  <td className="py-2">{p.targetSalinityPct}%</td>
                  <td className="py-2">{p.safeMarinateHoursMin} hr</td>
                  <td className="py-2 font-bold text-ink">{p.safeMarinateHoursMax} hrs</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{p.enzymeWarning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Deep Dive & Marinade Chemistry */}
      <section className="space-y-8 font-sans">
        {/* Section 1: The Penetration Fallacy */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">MOLECULAR DIFFUSION KINETICS</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            The Marinade Fallacy: Why Flavors Never Penetrate Past 2mm
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              One of the most persistent culinary myths is that overnight marinating infuses herbs, garlic, and spices deep into the center of a chicken breast or steak. In reality, intact muscle tissue is 75% water held inside dense capillary tubes:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-ink-muted">
              <li>
                <strong>Molecular Size Barrier:</strong> Flavor molecules—such as allicin from garlic, terpenes from herbs, and capsanthin from chilis—are massive organic hydrocarbons. They are physically incapable of penetrating between tightly packed myofibrillar proteins, traveling less than <strong>1.0 to 2.0 millimeters</strong> after 24 hours of soaking.
              </li>
              <li>
                <strong>The Solitary Exception (Salt):</strong> Sodium (Na+) and chloride (Cl-) are tiny ionic minerals. Driven by osmotic pressure, salt ions readily diffuse completely to the thermal center of meat over 12 to 24 hours. A marinade is functionally a <em>surface glaze combined with an osmotic brine</em>.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 2: The 3:1 Fat-to-Acid Buffer Formula */}
        <div className="bg-paper hairline-border p-6 sm:p-8 space-y-4 font-mono text-xs">
          <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
            THE 3:1 LIPID-ACID BUFFER EQUATION &amp; SALINITY
          </div>
          <p className="font-sans text-xs text-ink-muted leading-relaxed">
            Acids (citrus juice, wine, vinegar) denature proteins chemically, functioning exactly like heat. If a marinade contains excessive acid or soaks too long:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs pt-1">
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-accent font-bold uppercase text-[11px]">THE 3:1 FAT-TO-ACID BUFFER</div>
              <p className="text-ink-muted leading-relaxed">
                Formulate <strong>3 parts oil or yogurt to 1 part acid</strong>. The lipid base acts as a protective buffer, slowing acid penetration and coating the meat so surface proteins don't curdle into dry, chalky &quot;ceviche&quot; before hitting the grill.
              </p>
            </div>
            <div className="bg-paper-card p-4 border border-hairline space-y-2">
              <div className="font-mono text-ink font-bold uppercase text-[11px]">THE 1.2% SALINITY TARGET</div>
              <p className="text-ink-muted leading-relaxed">
                Add <strong>3/4 teaspoon of Diamond Crystal kosher salt per pound of meat</strong>. This delivers an exact 1.0%–1.2% internal salinity, dissolving muscle filaments so they retain up to 12% more juice during cooking.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Proteolytic Enzyme Warnings */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">BIOCHEMICAL TENDERIZATION HAZARDS</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            The Proteolytic Enzyme Danger: Pineapple, Papaya &amp; Kiwi
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3 font-sans">
            <p>
              Certain fresh fruits contain powerful protease enzymes that break down protein peptide bonds:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-ink-muted">
              <li><strong>Pineapple:</strong> Contains <em>bromelain</em>, an extremely aggressive enzyme that digests collagen and muscle fibers.</li>
              <li><strong>Papaya:</strong> Contains <em>papain</em>, commonly used in commercial meat tenderizer powders.</li>
              <li><strong>Kiwi:</strong> Contains <em>actinidin</em>, which tenderizes connective tissue rapidly without overpowering flavor.</li>
            </ul>
            <div className="bg-paper p-4 border-l-2 border-accent text-xs font-mono text-ink space-y-1 mt-2">
              <div className="font-bold uppercase">The 30-Minute Maximum Rule:</div>
              <div>
                Never marinate chicken, steak, or pork with fresh pineapple, papaya, or kiwi for longer than <strong>30 to 45 minutes</strong>. Past 45 minutes, the enzymes completely dissolve muscle cell walls, transforming the outer layer into a slimy, mushy, baby-food paste that cannot sear. Canned pineapple is heat-pasteurized, which deactivates bromelain.
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Frequently Asked Questions */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
          <div className="micro-label text-accent">EXPERT OPERATIONAL Q&amp;A</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Frequently Asked Questions: Marinades &amp; Soaking Timelines
          </h2>
          <div className="space-y-4 divide-y divide-hairline text-sm text-ink-muted">
            <div className="pt-4 first:pt-0 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Can you reuse leftover marinade as a serving sauce?
              </div>
              <p className="text-xs leading-relaxed">
                Only if brought to a vigorous rolling boil for at least 3 full minutes. Raw meat juices shed Salmonella, Campylobacter, and E. coli into the marinade liquid. Pouring unboiled marinade over cooked meat causes immediate bacterial cross-contamination. Alternatively, reserve 1/3 of the fresh marinade before adding raw meat to use as a clean basting sauce.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Why should you wipe off excess marinade before grilling or searing?
              </div>
              <p className="text-xs leading-relaxed">
                Excess liquid marinade on the meat surface prevents the Maillard browning reaction (which requires 285°F+) by trapping surface temperature at 212°F boiling. Furthermore, dripping oils fuel grease flare-ups on the grill that deposit bitter black soot onto food. Wipe meat with paper towels before searing.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                How long can shrimp and fish fillets sit in a citrus marinade?
              </div>
              <p className="text-xs leading-relaxed">
                Maximum 20 to 30 minutes. Seafood proteins are delicate with minimal connective tissue. Citric acid coagulates fish proteins quickly (the ceviche reaction). After 30 minutes, fish fillets become chalky, dry, and begin flaking apart in the raw liquid.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                What does yogurt or buttermilk do in marinades that oil cannot?
              </div>
              <p className="text-xs leading-relaxed">
                Yogurt and buttermilk contain lactic acid (milder and slower-acting than citric or acetic acid) and calcium ions. Calcium activates endogenous enzymes inside meat that break down muscle fibers naturally, producing exceptionally tender chicken tikka or shawarma without acidity bite.
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
                name: 'Do marinades penetrate deep into meat?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. Large flavor molecules (garlic, herbs, oils) only penetrate 1 to 2 millimeters. Only salt ions diffuse deeply via osmotic pressure.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the golden fat-to-acid ratio for marinades?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '3 parts oil or yogurt to 1 part acid. The lipid base buffers the acid, preventing meat from turning chalky and mushy.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why should you never marinate meat in pineapple for hours?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Fresh pineapple contains bromelain, an aggressive protease enzyme that digests muscle fibers into a mushy pulp after 45 minutes.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can you use leftover marinade as a sauce?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Only if boiled vigorously for at least 3 minutes to kill foodborne pathogens, or by reserving clean marinade before adding raw meat.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

