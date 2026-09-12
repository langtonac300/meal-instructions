import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import GrillFuelEstimator from '@/components/tools/GrillFuelEstimator';
import { GRILL_FUEL_SPECS } from '@/data/tools-data';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'BBQ Charcoal, Wood & Propane Burn Rate Calculator',
  description: 'Calculate exact charcoal chimneys, lump charcoal pounds, and propane tank percentage for low-and-slow smoking (225°F) or direct high searing (500°F).',
  alternates: {
    canonical: absoluteUrl('/grill-fuel-estimator'),
  },
};

const FAQ_ENTRIES = [
  {
    q: 'How long will a standard 20 lb propane tank last on a 3-burner gas grill?',
    a: 'A standard 20 lb LP tank holds approximately 430,000 BTUs of total energy (21,500 BTU per pound). A typical 3-burner grill rated at 36,000 BTUs/hr running wide open burns through a full tank in roughly 12 hours. At medium-low indirect heat (~12,000 to 15,000 BTUs/hr), a single 20 lb tank delivers 28 to 35 hours of active cook time.',
  },
  {
    q: 'What is the physical difference in burn rate between lump charcoal and briquettes?',
    a: 'Lump charcoal consists of 100% carbonized hardwood with minimal mineral ash content. Its irregular shape creates large air voids, yielding rapid combustion, higher peak temperatures (up to 900°F), and higher airflow sensitivity (~1.2 to 1.8 lbs/hr). Compressed briquettes contain carbonized wood bound with starch and mineral binders; their uniform geometry packs tightly, delivering a lower, exceptionally steady heat release (0.8 to 1.1 lbs/hr) ideal for long overnight cooks.',
  },
  {
    q: 'How does the "Snake Method" maintain 225°F in a kettle grill for 12 hours?',
    a: 'The snake method arranges unlit briquettes in a semi-circular two-by-two chain around the perimeter of a 22-inch kettle. When 8 to 10 lit coals are placed at the leading edge, combustion propagates linearly like a fuse at a rate of approximately 3 to 4 briquettes per hour. By restricting oxygen intake via the bottom vent to 25%, thermal output remains locked between 225°F and 250°F without needing mid-cook fuel replenishment.',
  },
  {
    q: 'Why does opening the lid make a charcoal grill hotter but a gas grill colder?',
    a: 'Charcoal combustion is strictly oxygen-limited. Opening the lid floods the charcoal bed with fresh ambient oxygen, causing coals to burn aggressively and spike metal grate temperatures. Conversely, gas grills are fuel-metered by brass orifices; opening the lid does not increase gas flow but allows buoyant hot convective air to exhaust immediately into the atmosphere, causing cooking chamber temperatures to collapse.',
  },
  {
    q: 'How many pounds of wood pellets does a pellet grill consume per hour?',
    a: 'Wood pellet consumption is directly proportional to target chamber temperature and ambient weather conditions. At low-and-slow smoking temperatures (225°F), an insulated pellet grill consumes 1.0 to 1.25 pounds of hardwood pellets per hour. At high searing temperatures (450°F–500°F) or in sub-freezing ambient winter winds, the motorized auger feed rate ramps up to 2.5 to 3.0 pounds per hour.',
  },
];

export default function GrillFuelEstimatorPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Tools', path: '/tools' },
    { name: 'BBQ Charcoal, Wood & Propane Burn Rate Calculator', path: '/grill-fuel-estimator' },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'BBQ Charcoal & Propane Fuel Burn Estimator',
    url: absoluteUrl('/grill-fuel-estimator'),
    description: 'Calculate fuel consumption rates for Weber kettles, Kamados, smokers, and gas grills based on cook duration.',
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
          label="PRINT FUEL SHEET"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">THERMAL CONSUMPTION &amp; COMBUSTION AIRFLOW MATH</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          BBQ Charcoal &amp; Propane Estimator
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Never run out of fuel halfway through a 14-hour brisket smoke. Calculate exact charcoal chimneys, snake method briquette counts, pellet hopper feed rates, and propane tank percentages.
        </p>
      </section>

      {/* Interactive Tool */}
      <GrillFuelEstimator />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED GRILL HARDWARE &amp; FUEL CONSUMPTION BENCHMARKS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Grill Type</th>
                <th className="py-2">Fuel Type</th>
                <th className="py-2">Temp Category</th>
                <th className="py-2">Burn Rate / Hr</th>
                <th className="py-2">Vent Setting</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {GRILL_FUEL_SPECS.map((g) => (
                <tr key={g.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{g.hardwareName}</td>
                  <td className="py-2 uppercase text-[10px] text-ink-muted">{g.fuelType}</td>
                  <td className="py-2 font-bold text-accent">{g.tempCategory}</td>
                  <td className="py-2">{g.burnRatePerHour} {g.burnRateUnit.split(' ')[0]}/hr</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{g.airVentSetting}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Reference Guide: Combustion Thermodynamics */}
      <section className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6 font-mono text-xs text-ink-muted">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent">THERMAL ENGINEERING</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Combustion Energetics: BTU Densities &amp; Draft Fluid Dynamics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="space-y-2 p-4 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              Liquid Propane (LP)
            </div>
            <div className="text-[11px] text-ink-subtle font-mono">21,548 BTU / lb</div>
            <p className="text-xs leading-relaxed">
              Standard 20 lb steel cylinder contains ~16.5 to 17 lbs of actual gas (4.0 to 4.2 gal), delivering ~360,000–430,000 total BTUs. Tank pressure drops dramatically in cold ambient temperatures (&lt; 32°F) as vaporization rate collapses.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              Lump Charcoal
            </div>
            <div className="text-[11px] text-ink-subtle font-mono">13,500 BTU / lb</div>
            <p className="text-xs leading-relaxed">
              Raw hardwood carbonized under pyrolysis. Extremely fast ignition and high porosity. Burns hot and clean with near-zero ash buildup, but irregular particle sizing causes variable burn rates unless sorted.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              Hardwood Briquettes
            </div>
            <div className="text-[11px] text-ink-subtle font-mono">10,500 BTU / lb</div>
            <p className="text-xs leading-relaxed">
              Uniform geometry stamped with vegetable starch binders. Controlled density limits oxygen permeability, creating consistent linear burn lines essential for snake-method offsets and 12-hour low-and-slow sessions.
            </p>
          </div>
        </div>

        <div className="p-4 bg-paper hairline-border space-y-2">
          <div className="font-bold text-ink uppercase text-[11px] font-mono">
            The Damper Airflow Rule: Intake vs Exhaust Mechanics
          </div>
          <p className="font-sans text-xs leading-relaxed">
            In solid-fuel cookers (charcoal and wood), <strong>the bottom intake damper is the gas pedal</strong> (meters oxygen volume available for combustion), while <strong>the top exhaust vent is the chimney draft</strong> (controls convective velocity and prevents bitter creosote accumulation). Never choke the top vent below 50% open; restricting exhaust stalls draft, smothering combustion into dirty, smoldering, gray acrid smoke.
          </p>
        </div>
      </section>

      {/* On-Page FAQs */}
      <section className="bg-paper hairline-border p-6 sm:p-8 space-y-6">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent font-mono">E-E-A-T COMBUSTION SCIENCE</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Frequently Asked Questions: BBQ Fuel Consumption
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
