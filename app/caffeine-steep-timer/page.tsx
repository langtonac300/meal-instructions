import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import CoffeeExtractionCalculator from '@/components/tools/CoffeeExtractionCalculator';
import { COFFEE_EXTRACTION_PROFILES } from '@/data/tools-data';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Coffee & Tea Extraction Ratio Calculator — French Press, Pour Over & AeroPress',
  description: 'Precision coffee-to-water ratios (1:15 to 1:17), exact kettle water temperatures (°F/°C), grind size specifications, and live extraction timers for coffee and tea.',
  alternates: {
    canonical: absoluteUrl('/caffeine-steep-timer'),
  },
};

const FAQ_ENTRIES = [
  {
    q: 'What is the SCA Golden Cup Standard extraction yield and TDS?',
    a: 'The Specialty Coffee Association (SCA) defines optimal coffee extraction as dissolving 18% to 22% of total bean mass into the brewed cup, producing a Total Dissolved Solids (TDS) concentration between 1.15% and 1.45%. Extractions below 18% leave sweet aromatic compounds trapped in the grounds (sour, under-extracted). Extractions exceeding 22% pull harsh, astringent chlorogenic acid breakdown products and plant cellulose into the cup (bitter, over-extracted).',
  },
  {
    q: 'Why does sour coffee indicate under-extraction while bitter coffee means over-extraction?',
    a: 'Soluble coffee compounds dissolve in strict sequential order based on molecular polarity. Highly polar organic acids (citric, malic, acetic) dissolve instantaneously during the initial pour. Lipids, caramels, and sweet sucrose molecules require intermediate heat and contact time to dissolve. Astringent polyphenols, chlorogenic acid lactones, and phenylindanes dissolve very slowly. Stopping a brew prematurely yields an acidic, sour cup devoid of sweetness; brewing too long or too hot extracts the harsh tail compounds.',
  },
  {
    q: 'Why should water for green tea never exceed 175°F (80°C)?',
    a: 'Green tea leaves are rich in delicate epigallocatechin gallate (EGCG) catechins and volatile aromatic esters. Water above 175°F (80°C) denatures delicate amino acids (L-theanine) and accelerates the rapid leaching of bitter astringent tannins. Steeping green tea at 160°F–175°F for 2–3 minutes preserves sweet, umami-rich amino acids while preventing catechin bitterness from overwhelming the palate.',
  },
  {
    q: 'How does grind size control the rate of extraction?',
    a: 'Grind size dictates the total exposed surface area per gram of coffee and hydrodynamic flow resistance. Fine grinds expose massive surface area and create dense packed beds, which slow water velocity and accelerate extraction kinetics (ideal for 1–2 minute AeroPress or espresso extractions). Coarse grinds possess small surface-to-volume ratios and low flow resistance, requiring long 4-minute immersion steeping (French press) to reach the sweet 18–22% extraction band without over-extracting fines.',
  },
  {
    q: 'What is the purpose of the 45-second bloom phase in pour-over brewing?',
    a: 'Roasted coffee beans trap substantial volumes of gaseous carbon dioxide (CO2) inside their porous cellulose matrix. Pouring 2x the coffee dose in hot water initiates the "bloom," causing rapid degassing. If not bloomed, bubbling CO2 creates turbulent hydraulic channels, repelling incoming brew water and causing severe uneven channeling where some grounds under-extract while others over-extract.',
  },
];

export default function CaffeineSteepTimerPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Tools', path: '/tools' },
    { name: 'Coffee & Tea Extraction Ratio Calculator', path: '/caffeine-steep-timer' },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Coffee & Tea Extraction Ratio & Steep Timer',
    url: absoluteUrl('/caffeine-steep-timer'),
    description: 'Calculate coffee dose grams, water volume, and extraction times across French Press, V60, AeroPress, and Green Tea.',
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
          label="PRINT COFFEE RATIOS"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">TOTAL DISSOLVED SOLIDS &amp; EXTRACTION YIELD</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Coffee &amp; Tea Extraction Calculator
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Bitter coffee is over-extracted; sour coffee is under-extracted. Calculate golden 1:15–1:17 coffee doses on your digital scale, kettle water temps, and run the precision countdown timer.
        </p>
      </section>

      {/* Interactive Tool */}
      <CoffeeExtractionCalculator />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED COFFEE &amp; TEA BREWING PARAMETERS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Brew Method</th>
                <th className="py-2">Golden Ratio</th>
                <th className="py-2">Water Temp (°F)</th>
                <th className="py-2">Grind Size</th>
                <th className="py-2">Extraction Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {COFFEE_EXTRACTION_PROFILES.map((c) => (
                <tr key={c.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{c.name}</td>
                  <td className="py-2 font-bold text-accent">{c.ratioDisplay.split('(')[0]}</td>
                  <td className="py-2 font-bold text-ink">{c.waterTempF}°F</td>
                  <td className="py-2 text-ink-muted">{c.grindSize.split('(')[0]}</td>
                  <td className="py-2">{Math.round(c.brewTimeSeconds / 60)} mins</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Technical Engineering Reference: Dissolution Kinetics */}
      <section className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6 font-mono text-xs text-ink-muted">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent">THERMODYNAMICS &amp; SOLUBILITY</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Dissolution Kinetics: The Chemistry of Optimal Extraction
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="space-y-2 p-4 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">01. Acids &amp; Lipids (0–30s)</div>
            <p className="text-xs leading-relaxed">
              Highly soluble polar fruit acids (citric, malic, quinic) dissolve within seconds of water contact. If the brew terminates here, the beverage tastes unpleasantly sour, astringent, and sharp with zero caramel body or finish.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">02. Sugars &amp; Melanoidins (30s–3m)</div>
            <p className="text-xs leading-relaxed">
              Medium-solubility sweet carbohydrates and roasted Maillard reaction products (melanoidins) dissolve next. This phase delivers sweetness, syrupy mouthfeel, chocolate/nut notes, and balances out early acid sharpness.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">03. Bitter Polyphenols (3m+)</div>
            <p className="text-xs leading-relaxed">
              Heavy plant cellulose, tannins, chlorogenic acid lactones, and phenylindanes dissolve slowly under continuous thermal contact. Excessive contact time or boiling water extracts these compounds, producing a dry, chalky, intensely bitter finish.
            </p>
          </div>
        </div>

        <div className="p-4 bg-paper hairline-border space-y-2">
          <div className="font-bold text-ink uppercase text-[11px] font-mono">
            SCA Golden Cup Extraction Math
          </div>
          <p className="font-sans text-xs leading-relaxed">
            Extraction Yield percentage is calculated by measuring brewed coffee weight and Total Dissolved Solids (TDS) via optical refractometer:
            <br />
            <code className="font-mono text-ink font-bold bg-paper-card px-1.5 py-0.5 mt-1 inline-block">
              Extraction Yield (%) = [Brewed Coffee Weight (g) × TDS (%)] / Dry Coffee Dose (g)
            </code>
            <br />
            Target yield: <strong>18.0% to 22.0%</strong> at 1.15% to 1.45% beverage TDS.
          </p>
        </div>
      </section>

      {/* Extraction Troubleshooting Matrix */}
      <section className="bg-paper hairline-border p-6 sm:p-8 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          COFFEE EXTRACTION DIAGNOSTIC MATRIX
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Sensory Symptom</th>
                <th className="py-2">Chemical State</th>
                <th className="py-2">Primary Mechanism</th>
                <th className="py-2">Corrective Calibration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline text-xs">
              <tr className="hover:bg-paper-card">
                <td className="py-2.5 font-bold text-ink">Sour, puckering, weak body</td>
                <td className="py-2.5 font-bold text-accent">Under-Extracted (&lt; 18%)</td>
                <td className="py-2.5 text-ink-muted">Coarse grind channeled water too quickly; only acids dissolved</td>
                <td className="py-2.5 text-ink-muted">Grind finer, increase water temp 5°F, or extend contact time</td>
              </tr>
              <tr className="hover:bg-paper-card">
                <td className="py-2.5 font-bold text-ink">Dry, throat-gripping, harsh bitter</td>
                <td className="py-2.5 font-bold text-accent">Over-Extracted (&gt; 22%)</td>
                <td className="py-2.5 text-ink-muted">Fine grind choked bed; long contact pulled bitter phenylindanes</td>
                <td className="py-2.5 text-ink-muted">Grind coarser, shorten brew time, reduce kettle temp to 200°F</td>
              </tr>
              <tr className="hover:bg-paper-card">
                <td className="py-2.5 font-bold text-ink">Sour AND bitter simultaneously</td>
                <td className="py-2.5 font-bold text-accent">Uneven Channeling</td>
                <td className="py-2.5 text-ink-muted">Fines choked one zone while water bored rapid holes through rest</td>
                <td className="py-2.5 text-ink-muted">Gentle circular pour, level dry bed, enforce full 45s bloom</td>
              </tr>
              <tr className="hover:bg-paper-card">
                <td className="py-2.5 font-bold text-ink">Flat, muddy, dull finish</td>
                <td className="py-2.5 font-bold text-accent">Water Mineral Lockout</td>
                <td className="py-2.5 text-ink-muted">Excessive bicarbonate buffer (&gt; 150ppm) neutralized fruit acids</td>
                <td className="py-2.5 text-ink-muted">Use filtered water with 50–120 ppm total mineral hardness</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* On-Page FAQs */}
      <section className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent font-mono">E-E-A-T BREWING SCIENCE</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Frequently Asked Questions: Extraction Thermodynamics
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
