import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import ToolsDirectory from '@/components/tools/ToolsDirectory';
import { ALL_TOOLS } from '@/data/tools-directory';

import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: `Zero-Fluff Kitchen Calculators & Cooking Tools Directory (${ALL_TOOLS.length} Engines)`,
  description: 'Precision cooking utilities for busy cooks and dads: oven-to-air fryer converters, oil smoke points, reverse sear timers, baker percentages, turkey thaw math, and dinner sync timelines.',
  alternates: {
    canonical: absoluteUrl('/tools'),
  },
};

export default function ToolsPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Tools', path: '/tools' }]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Zero-Fluff Kitchen Calculators & Cooking Engines Directory',
    url: absoluteUrl('/tools'),
    description: `${ALL_TOOLS.length} interactive cooking calculators, converters, and parametric reference charts for busy cooks.`,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      
      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <span className="font-mono text-xs text-accent font-bold uppercase">
          {ALL_TOOLS.length} INTERACTIVE ENGINES
        </span>
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">ARCHITECTURAL UTILITIES</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Kitchen Engines &amp; Calculators
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          No life stories, no clutter. Instant calculations for cooking temperatures, meat poundage, freezer emergencies, dough hydration, smoke points, and dinner sync timelines.
        </p>
      </section>

      {/* Interactive Directory with Search & Filtering */}
      <ToolsDirectory />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          DIRECTORY OF {ALL_TOOLS.length} PRECISION KITCHEN ENGINES
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Tool Name</th>
                <th className="py-2">Route</th>
                <th className="py-2">Category</th>
                <th className="py-2">Engineering Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {ALL_TOOLS.map((t) => (
                <tr key={t.href} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{t.title}</td>
                  <td className="py-2 font-mono text-accent">
                    <Link href={t.href} className="hover:underline">{t.href}</Link>
                  </td>
                  <td className="py-2 uppercase text-[10px] text-ink-muted">{t.category}</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Standards & Calculation Methodology */}
      <section className="space-y-8 font-sans">
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-4">
          <div className="micro-label text-accent">MATHEMATICAL RIGOR &amp; REVERSIBILITY</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Kitchen Tool Architecture: Zero-Fluff Precision Math
          </h2>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              Unlike generic recipe blogs that offer rough estimates and conversational anecdotes, the utilities in this directory are deterministic calculation engines. Each formula is built upon measured thermodynamic constants, USDA Food Safety and Inspection Service (FSIS) microbial destruction kinetics, and commercial kitchen production standards.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs pt-1">
              <div className="p-4 bg-paper border border-hairline space-y-1">
                <div className="font-bold text-accent">THERMODYNAMIC FORMULAS:</div>
                <p className="font-sans text-xs text-ink-muted leading-relaxed">
                  Convection velocity adjustments (-25°F / -20% duration), latent heat of fusion multipliers (1.5× for frozen goods), and Newton's law of cooling for thermal carryover rest intervals.
                </p>
              </div>
              <div className="p-4 bg-paper border border-hairline space-y-1">
                <div className="font-bold text-accent">BAKER'S PERCENTAGES:</div>
                <p className="font-sans text-xs text-ink-muted leading-relaxed">
                  Standard flour-weight normalization (flour = 100.0%) for true dough hydration, salt concentration, and levain activity without volumetric cup inaccuracies.
                </p>
              </div>
              <div className="p-4 bg-paper border border-hairline space-y-1">
                <div className="font-bold text-accent">PATHOGEN LETHALITY CURVES:</div>
                <p className="font-sans text-xs text-ink-muted leading-relaxed">
                  Time-temperature log-reduction integrations replacing crude single-temp thresholds with USDA 7-log10 Salmonella and 6.5-log10 E. coli pasteurization charts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Frequently Asked Questions */}
        <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
          <div className="micro-label text-accent">ENGINEERING DIRECTORY Q&amp;A</div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            Frequently Asked Questions: Kitchen Calculators
          </h2>
          <div className="space-y-4 divide-y divide-hairline text-sm text-ink-muted">
            <div className="pt-4 first:pt-0 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Why are all measurements calculated by weight instead of volume?
              </div>
              <p className="text-xs leading-relaxed">
                Volumetric measuring cups vary wildly based on packing density. A single cup of all-purpose flour can weigh anywhere from 115 grams (sifted) to 160 grams (packed)—a 39% variance that guarantees dry baked goods. Gram-weight scales provide absolute consistency regardless of ingredient humidity, grain size, or settling.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                How do these calculators handle different oven calibrations?
              </div>
              <p className="text-xs leading-relaxed">
                Consumer home ovens regularly drift by ±25°F from their digital readouts due to bimetallic thermostat cycling. Our calculators provide baseline thermal targets based on true ambient temperature; we recommend verifying your oven chamber temperature with an analog dial or digital thermocouple thermometer.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <div className="font-mono text-xs font-bold text-ink uppercase">
                Can these tools run completely offline in the kitchen?
              </div>
              <p className="text-xs leading-relaxed">
                Yes. The calculators are architected as zero-dependency client-side engines. Once the page is loaded on your mobile phone or tablet, calculations execute locally in milliseconds without network roundtrips or server latency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
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
                name: 'Why are all measurements calculated by weight instead of volume?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Volumetric cups vary by up to 39% based on packing density. Weight in grams provides absolute reproducibility across flour, salt, and liquids.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do these calculators handle different oven calibrations?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Calculations assume true internal temperature. Because home ovens drift by ±25°F, using an independent thermocouple or analog thermometer is recommended.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can these tools run completely offline in the kitchen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. All interactive calculation engines run locally in your browser without requiring continuous network connectivity.',
                },
              },
            ],
          }),
        }}
      />

    </div>
  );
}

