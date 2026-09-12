import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import RecipePanScaler from '@/components/tools/RecipePanScaler';
import { PAN_SPECS } from '@/data/tools-data';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Recipe Pan Size Converter & Baking Dish Area Scaler',
  description: 'Convert recipe ingredients and baking times across different pan sizes: 8x8 square to 9x13 rectangle, 8" round cake to 10" cast iron skillet. Exact geometric surface area multipliers.',
  alternates: {
    canonical: absoluteUrl('/recipe-scaler'),
  },
};

const FAQ_ENTRIES = [
  {
    q: 'Why can’t I just bake an 8x8 brownie recipe in a 9x13 pan without scaling?',
    a: 'An 8x8 inch square pan has a surface area of 64 square inches, whereas a standard 9x13 rectangular pan covers 117 square inches—an 83% increase in surface area. Pouring an unscaled 8x8 batter into a 9x13 dish thins the batter depth by nearly half. Heat penetrates the shallow layer in minutes, causing rapid surface moisture evaporation, overcooked dry edges, and a completely flat, hard crumb before starches can properly expand.',
  },
  {
    q: 'How does batter thickness dictate oven baking time?',
    a: 'Thermal conduction through batter conforms to the square law of heat transfer: required baking time scales proportionally to the square of batter depth ($t \\propto d^2$). Doubling batter thickness quadruples the time required for conductive heat to reach the center. Conversely, a 25% reduction in batter depth reduces core bake time by roughly 40%, necessitating temperature reductions of 25°F to prevent surface burning.',
  },
  {
    q: 'Do spices and leavening agents scale linearly when multiplying a recipe?',
    a: 'No. While structural ingredients (flour, sugar, butter, liquid) scale linearly ($1.0 \\times M$), volatile aromatics, pungent spices (black pepper, cayenne, cloves), and chemical leaveners (baking soda and baking powder) scale sub-linearly when expanding beyond 3x batches. In large volumes, leavening gases cannot easily vent, creating excessive air pockets, while spices concentrate intensely as moisture evaporates.',
  },
  {
    q: 'How do you convert round cake pans to square baking dishes?',
    a: 'Compare geometric surface areas: a round pan area equals $\\pi r^2$, while a square pan is $s^2$. An 8-inch round cake pan has an area of roughly 50.3 square inches ($3.1416 \\times 4^2$). An 8x8 inch square dish has an area of 64 square inches. To convert an 8-inch round recipe to an 8x8 square dish, multiply all ingredients by $64 / 50.3 \\approx 1.27$ (a 27% increase).',
  },
  {
    q: 'Why do dark metal pans bake faster than ceramic or glass baking dishes?',
    a: 'Dark anodized metal and raw cast iron possess high thermal emissivity and rapid conductive heat transfer. Glass (borosilicate/soda-lime) and ceramic are thermal insulators; they heat slowly but radiate steady, gentle heat. When substituting a dark metal pan for ceramic, reduce oven temperature by 25°F (14°C) to prevent the bottom and perimeter crust from burning before the center sets.',
  },
];

export default function RecipeScalerPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Tools', path: '/tools' },
    { name: 'Recipe Pan Size Converter & Baking Dish Area Scaler', path: '/recipe-scaler' },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Recipe Pan Size Converter & Area Scaler',
    url: absoluteUrl('/recipe-scaler'),
    description: 'Calculate ingredient scaling factors, surface area ratios, and baking time adjustments when swapping baking dishes.',
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
          label="PRINT PAN MATRIX"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">GEOMETRIC SURFACE AREA SCALER &amp; CONDUCTION PHYSICS</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Recipe Scaler &amp; Pan Converter
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Swapping an 8x8 pan for a 9x13 without adjusting ingredients causes dried-out thin casseroles. Calculate exact geometric multipliers, batter depth changes, and oven time shifts.
        </p>
      </section>

      {/* Interactive Tool */}
      <RecipePanScaler />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED BAKING DISH &amp; PAN SURFACE AREAS
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Pan Geometry</th>
                <th className="py-2">Dimensions</th>
                <th className="py-2">Surface Area (Sq In)</th>
                <th className="py-2">Approx Capacity</th>
                <th className="py-2">Shape</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {PAN_SPECS.map((p) => (
                <tr key={p.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{p.name}</td>
                  <td className="py-2">{p.dimensions}</td>
                  <td className="py-2 font-bold text-accent">{p.areaSqInches} sq in</td>
                  <td className="py-2">{p.standardVolumeCups} cups</td>
                  <td className="py-2 uppercase text-ink-muted">{p.shape}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engineering Reference Guide: Pan Scaling Mathematics */}
      <section className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6 font-mono text-xs text-ink-muted">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent">MATHEMATICAL CALIBRATION</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Geometric Scaling: Area Ratios &amp; Conduction Kinetics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          <div className="space-y-3 p-5 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              Surface Area Multiplier Math
            </div>
            <p className="text-xs leading-relaxed">
              Ingredient scaling is governed by the two-dimensional planar footprint of the cooking vessel. Calculate the area of both vessels to determine the exact multiplier:
            </p>
            <div className="p-3 bg-paper-card border border-hairline font-mono text-[11px] text-ink space-y-1">
              <div>Rectangle / Square: Area = Length × Width</div>
              <div>Circle / Round: Area = π × (Diameter / 2)²</div>
              <div className="text-accent font-bold pt-1">
                Scaling Factor (M) = Target Area / Source Area
              </div>
            </div>
          </div>

          <div className="space-y-3 p-5 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              Depth &amp; Thermal Penetration Law
            </div>
            <p className="text-xs leading-relaxed">
              When scaling pan sizes without scaling ingredients, batter depth ($d$) shifts inversely with area. According to Fourier’s thermal conduction equations, required heat transfer duration varies with the square of thickness:
            </p>
            <div className="p-3 bg-paper-card border border-hairline font-mono text-[11px] text-ink space-y-1">
              <div>Depth Ratio = Source Area / Target Area</div>
              <div className="text-accent font-bold pt-1">
                Adjusted Time ≈ Original Time × (Depth Ratio)^1.5
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-paper hairline-border space-y-2">
          <div className="font-bold text-ink uppercase text-[11px] font-mono">
            Vessel Material Conductivity Index
          </div>
          <p className="font-sans text-xs leading-relaxed">
            Different cookware materials transfer thermal energy at radically disparate rates: <strong>Aluminum (205 W/m·K)</strong> transfers heat 170x faster than <strong>Pyrex Borosilicate Glass (1.2 W/m·K)</strong> and 135x faster than <strong>Stoneware Ceramic (1.5 W/m·K)</strong>. When converting a metal cake pan recipe to glass or stoneware, lower oven temperature by 25°F (14°C) and anticipate an additional 5 to 10 minutes of bake time to ensure complete core starch gelatinization.
          </p>
        </div>
      </section>

      {/* On-Page FAQs */}
      <section className="bg-paper hairline-border p-6 sm:p-8 space-y-6">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent font-mono">E-E-A-T CULINARY MATHEMATICS</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Frequently Asked Questions: Pan Scaling &amp; Baking Physics
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
