import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import SaltMathCalculator from '@/components/tools/SaltMathCalculator';
import { SALT_BRANDS } from '@/data/tools-data';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Equilibrium Salting & Dry-Brine Calculator — Diamond Crystal vs Morton Conversions',
  description: 'Convert salt weight to volume accurately across Diamond Crystal, Morton Kosher, Table Salt, and Sea Salt. Calculate 1.0% to 1.2% equilibrium salinity and dry-brine timing.',
  alternates: {
    canonical: absoluteUrl('/salt-math'),
  },
};

const FAQ_ENTRIES = [
  {
    q: 'Why does 1 tablespoon of Morton Kosher weigh nearly double Diamond Crystal?',
    a: 'Manufacturing crystal morphology dictates bulk packing density. Diamond Crystal uses the patented Alberger open-pan evaporation process, creating hollow, fragile pyramid-shaped flakes that pack loosely with immense air voids (bulk density ~0.56 g/cm³ or 2.8g per teaspoon). Morton Kosher is produced via mechanical rolling of evaporated salt granules into dense, flat plate crystals that pack tightly together (bulk density ~0.96 g/cm³ or 4.8g per teaspoon). Consequently, substitution by volume without correction delivers a 71% sodium overdose.',
  },
  {
    q: 'What is equilibrium salting and why is it superior to wet brining?',
    a: 'Equilibrium salting measures an exact percentage of salt relative to meat weight (typically 1.0% to 1.25% by mass). The meat absorbs exactly that ratio through osmotic equilibrium until salt concentration is completely uniform from surface to core. Traditional wet brining immerses meat in a hypertonic 5–6% saline bath; it hydrates the muscle tissue with excess water (causing steam dilution during searing) and requires strict timing to prevent oversalted exterior layers.',
  },
  {
    q: 'How does salt dissolve muscle filaments to retain moisture during searing?',
    a: 'When sodium (Na+) and chloride (Cl-) ions penetrate muscle fibers at a 1.0% concentration, they alter electrical charges along protein lattices. Chloride ions bind preferentially to actin and myosin filaments, causing them to repel one another and partially dissolve. This loose, gelatinous protein network swells and mechanically binds 10% to 12% more cellular water. During cooking, as proteins denature and contract at 140°F–165°F, this dissolved matrix resists moisture expulsion (thermal purge).',
  },
  {
    q: 'Why should ground beef burgers NEVER be salted inside the mix?',
    a: 'Salting raw ground meat before forming patties initiates rapid myosin dissolution. The dissolved myosin links together during handling, forming cross-linked protein networks identical to sausage emulsification. The resulting cooked burger becomes bouncy, rubbery, and dense rather than tender and crumbly. Ground beef should only receive external surface salting seconds before hitting a screaming-hot cast iron skillet or grill grate.',
  },
  {
    q: 'Does dry brining chicken skin make it rubbery or crispy?',
    a: 'Dry brining on an elevated wire rack in the refrigerator produces intensely crispy skin. While salt initially draws water to the surface via osmosis (15–30 minutes), the moisture quickly dissolves the salt and reabsorbs into the muscle. Over the subsequent 12–24 hours, the dry, cold convective airflow of modern frost-free refrigerators sublimates remaining water from the skin epidermis. This desiccated collagen-rich skin crisps and blisters rapidly in hot air or fat without boiling in surface moisture.',
  },
];

export default function SaltMathPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Tools', path: '/tools' },
    { name: 'Equilibrium Salting & Dry-Brine Calculator', path: '/salt-math' },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Equilibrium Salting & Kosher Salt Density Calculator',
    url: absoluteUrl('/salt-math'),
    description: 'Precision salt density and dry-brine calculator for meats and poultry.',
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
          label="PRINT SALT CHART"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">CULINARY DENSITY CONVERSION &amp; OSMOTIC EQUILIBRIUM</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Equilibrium Salting &amp; Dry-Brine Math
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          A tablespoon of Morton salt has almost twice the sodium of Diamond Crystal. Stop ruining good meat with volume-based guessing. Precise 1.0%–1.2% salt weight, crystal packing densities, and diffusion kinetics.
        </p>
      </section>

      {/* Interactive Tool Component */}
      <SaltMathCalculator />

      {/* SSR Static Reference Table for Search Engines */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED PHYSICAL SALT DENSITIES &amp; CRYSTAL MORPHOLOGY
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Salt Variety</th>
                <th className="py-2">Density (Grams / Tsp)</th>
                <th className="py-2">Crystal Structure</th>
                <th className="py-2">Pinch Characteristics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {SALT_BRANDS.map((b) => (
                <tr key={b.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{b.name}</td>
                  <td className="py-2 font-bold text-accent">{b.gramsPerTeaspoon}g</td>
                  <td className="py-2">{b.crystalType}</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{b.pinchFeel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Technical Reference Guide: The Volumetric Trap */}
      <section className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6 font-mono text-xs text-ink-muted">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent">MATHEMATICAL CALIBRATION</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            The Volumetric Trap: Crystal Geometry &amp; Bulk Packing Density
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="space-y-2 p-4 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">Diamond Crystal Flake</div>
            <p className="text-xs leading-relaxed">
              Manufactured through the Alberger open-pan mechanical process. Generates hollow inverted pyramid flakes that crush easily under finger pressure. Extreme void volume yields a featherweight <strong>2.8g per teaspoon</strong>. Preferred in commercial kitchens because volumetric overshoot is forgiving.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">Morton Coarse Kosher</div>
            <p className="text-xs leading-relaxed">
              Created by running vacuum-pan salt brine through industrial steel rollers. Crystals are flattened into dense, opaque, brittle plates with minimal internal air voids. Packs tightly at <strong>4.8g per teaspoon</strong>. Measuring 1 tbsp Morton where Diamond Crystal was specified delivers 1.71x the intended salinity.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">Fine Table &amp; Sea Salt</div>
            <p className="text-xs leading-relaxed">
              Formed as microscopic, rigid cubic crystals that pack with virtually zero intergranular porosity. Weighs <strong>5.7g to 6.0g per teaspoon</strong>. Often compounded with sodium silicoaluminate anti-caking agents and potassium iodide, imparting a subtle metallic, medicinal astringency to slow-roasted proteins.
            </p>
          </div>
        </div>

        <div className="p-4 bg-paper hairline-border space-y-2">
          <div className="font-bold text-ink uppercase text-[11px] font-mono">
            Volumetric Conversion Formula
          </div>
          <p className="font-sans text-xs leading-relaxed">
            When converting recipes authored for Diamond Crystal to Morton Kosher without a gram scale:
            <br />
            <code className="font-mono text-ink font-bold bg-paper-card px-1.5 py-0.5 mt-1 inline-block">
              Morton Volume = Diamond Crystal Volume × (2.80 / 4.80) ≈ Diamond Volume × 0.58
            </code>
            <br />
            To convert a recipe written with standard table salt to Diamond Crystal:
            <code className="font-mono text-ink font-bold bg-paper-card px-1.5 py-0.5 mt-1 inline-block">
              Diamond Volume = Table Salt Volume × (5.69 / 2.80) ≈ Table Volume × 2.03
            </code>
          </p>
        </div>
      </section>

      {/* Osmosis & Myosin Dissolution Guide */}
      <section className="bg-paper hairline-border p-6 sm:p-8 space-y-6 font-mono text-xs text-ink-muted">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent">BIOCHEMICAL MECHANICS</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Osmosis &amp; Myosin Dissolution: The Physics of Dry Brining
          </h2>
        </div>

        <div className="space-y-4 font-sans text-xs leading-relaxed">
          <p>
            Dry brining is an active tripartite biochemical process driven by osmotic potential and ion-exchange kinetics. It transforms both the water-holding capacity and surface texture of whole muscle cuts:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-paper-card hairline-border space-y-2">
              <div className="font-bold text-accent uppercase">Phase 1: Osmotic Draw</div>
              <div className="text-[11px] text-ink-subtle">0 to 15 Minutes</div>
              <p className="font-sans text-[11px] text-ink-muted">
                Surface salt dissolves in microscopic ambient moisture, creating a hypertonic microclimate. High osmotic pressure draws intracellular sarcoplasmic water across cell membranes to the protein exterior, forming beads of surface moisture.
              </p>
            </div>

            <div className="p-4 bg-paper-card hairline-border space-y-2">
              <div className="font-bold text-accent uppercase">Phase 2: Brine Reabsorption</div>
              <div className="text-[11px] text-ink-subtle">15 to 45 Minutes</div>
              <p className="font-sans text-[11px] text-ink-muted">
                Drawn water completely dissolves crystal solids into a concentrated saline film. As concentration gradients invert, the hypertonic droplet is pulled back into the muscle interior through simple diffusion, pulling sodium and chloride ions inward.
              </p>
            </div>

            <div className="p-4 bg-paper-card hairline-border space-y-2">
              <div className="font-bold text-accent uppercase">Phase 3: Protein Unfolding</div>
              <div className="text-[11px] text-ink-subtle">45 Mins to 24 Hours</div>
              <p className="font-sans text-[11px] text-ink-muted">
                Chloride ions shield positively charged amino acids on myosin and actin protein filaments. Muscle fibers repel each other and unwind, creating a porous gel matrix that mechanically binds 10–12% more water against heat-induced shrinkage.
              </p>
            </div>
          </div>

          <div className="p-4 bg-paper-card hairline-border space-y-2">
            <div className="font-bold text-ink uppercase text-[11px] font-mono">
              The Critical Rate of Diffusion: Depth vs Time
            </div>
            <p className="font-sans text-xs text-ink-muted leading-relaxed">
              Salt ions migrate through raw bovine and avian muscle tissue at an average velocity of <strong>0.5 to 0.75 inches (12–19 mm) per 24 hours</strong> at standard refrigeration temperatures (34°F–38°F). A 2-inch thick bone-in ribeye requires a full 24 to 36 hours of dry brining to achieve true cross-sectional salinity. Salting a thick roast 30 minutes before searing seasons only the exterior 2 millimeters, leaving the core unseasoned and unable to retain moisture during thermal contraction.
            </p>
          </div>
        </div>
      </section>

      {/* Salting Ratios by Cut */}
      <section className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          EQUILIBRIUM SALTING PROTOCOLS ACROSS PROTEIN ARCHETYPES
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Protein Class</th>
                <th className="py-2">Target Salinity</th>
                <th className="py-2">Dry-Brine Window</th>
                <th className="py-2">Aeration Protocol</th>
                <th className="py-2">Culinary Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline text-xs">
              <tr className="hover:bg-paper">
                <td className="py-2.5 font-bold text-ink">Thick Steaks &amp; Chops (1.5"+)</td>
                <td className="py-2.5 font-bold text-accent">1.1% – 1.25%</td>
                <td className="py-2.5">18 – 36 Hours</td>
                <td className="py-2.5 text-ink-muted">Elevated wire rack, uncovered</td>
                <td className="py-2.5 text-ink-muted">Deep seasoned core, rapid desiccated crust</td>
              </tr>
              <tr className="hover:bg-paper">
                <td className="py-2.5 font-bold text-ink">Whole Poultry (Roasters, Turkeys)</td>
                <td className="py-2.5 font-bold text-accent">1.0% – 1.1%</td>
                <td className="py-2.5">24 – 48 Hours</td>
                <td className="py-2.5 text-ink-muted">Sheet pan rack, open airflow</td>
                <td className="py-2.5 text-ink-muted">Sublimated paper-thin blistered skin</td>
              </tr>
              <tr className="hover:bg-paper">
                <td className="py-2.5 font-bold text-ink">Whole Pork Shoulders &amp; Roasts</td>
                <td className="py-2.5 font-bold text-accent">1.25% – 1.5%</td>
                <td className="py-2.5">24 – 48 Hours</td>
                <td className="py-2.5 text-ink-muted">Chilled rack, uncovered</td>
                <td className="py-2.5 text-ink-muted">Penetrates dense fat cap, preserves bark</td>
              </tr>
              <tr className="hover:bg-paper">
                <td className="py-2.5 font-bold text-ink">Salmon &amp; White Fish Fillets</td>
                <td className="py-2.5 font-bold text-accent">0.75% – 0.9%</td>
                <td className="py-2.5">15 – 30 Minutes</td>
                <td className="py-2.5 text-ink-muted">Paper towel lined plate</td>
                <td className="py-2.5 text-ink-muted">Suppresses albumin leakage, firms delicate flesh</td>
              </tr>
              <tr className="hover:bg-paper">
                <td className="py-2.5 font-bold text-ink">Ground Beef (Burgers)</td>
                <td className="py-2.5 font-bold text-accent">1.0% (Exterior Only)</td>
                <td className="py-2.5">&lt; 30 Seconds</td>
                <td className="py-2.5 text-ink-muted">Season immediately prior to grill</td>
                <td className="py-2.5 text-ink-muted">Prevents bouncy sausage-like myosin binding</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* On-Page FAQs */}
      <section className="bg-paper hairline-border p-6 sm:p-8 space-y-6">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent font-mono">E-E-A-T SCIENTIFIC REFERENCE</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Frequently Asked Questions: Salt Physics &amp; Brining Kinetics
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
