import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Thermometer, Wrench, ShieldCheck, Zap, Flame, Wind, Clock } from 'lucide-react';
import { absoluteUrl, SITE_NAME } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Test Kitchen Hardware Lab & Equipment Disclosures // Meal Instructions',
  description:
    'Physical equipment, thermometry instruments, thermocouple calibration, and test facility specifications used to verify all 1,225 cook-time datasheets and 228 recipes.',
  alternates: { canonical: absoluteUrl('/test-kitchen') },
};

const HARDWARE_INVENTORY = [
  {
    category: 'Thermometry & Calibration',
    items: [
      {
        name: 'ThermoWorks Thermapen ONE',
        type: 'Primary Instant-Read Thermocouple',
        spec: 'Type K thermocouple, ±0.5°F (±0.3°C) accuracy, 0.5-second reading time, NIST-traceable calibration certificate.',
        role: 'Geometric core internal temperature verification across all proteins and breads.',
      },
      {
        name: 'ThermoWorks Smoke 2-Channel',
        type: 'Continuous Chamber & Meat Probe',
        spec: 'Dual commercial-grade Pro-Series probes with ambient grate clip, -58°F to 572°F range, wireless RF transmitter.',
        role: 'Real-time air temp logging inside smokers, closed ovens, and covered Dutch ovens.',
      },
      {
        name: 'FLIR C5 Compact Thermal Camera',
        type: 'Radiant Heat Flux & Surface Imaging',
        spec: '160x120 infrared resolution, MSX thermal image enhancement, -4°F to 752°F temperature measurement.',
        role: 'Verifying cast iron heat distribution, cold-spot boundary layers, and air fryer grate thermal gradients.',
      },
    ],
  },
  {
    category: 'Convective & High-Velocity Airflow',
    items: [
      {
        name: 'Breville Smart Oven Air Fryer Pro (BOV900BSS)',
        type: 'Countertop Convection / Air Fryer',
        spec: '1800W Element IQ system with 6 quartz elements, 2-speed convection fan (up to 2,200 RPM), 1.0 cu ft capacity.',
        role: 'Benchmark for countertop convective roasting, dehydrating, and air-fryer conversion formulas.',
      },
      {
        name: 'Ninja Foodi 6-in-1 DualZone (DZ201)',
        type: 'Dual-Basket Countertop Air Fryer',
        spec: '1690W, two independent 4-quart non-stick baskets with dual cyclonic convection fans.',
        role: 'Verifying single-layer vs overcrowded basket cook times and independent double-cooking dynamics.',
      },
    ],
  },
  {
    category: 'Conductive & Radiant Cookware',
    items: [
      {
        name: 'Lodge 12-Inch Cast Iron Skillet (L10SK3)',
        type: 'Heavy-Gauge Conductive Skillet',
        spec: 'Pre-seasoned cast iron, 7.9 lbs total mass, 0.2-inch wall thickness, volumetric thermal inertia 7,200 kg/m³.',
        role: 'Primary reference for hard high-heat searing, reverse sear finishes, burger smash searing, and pan roasting.',
      },
      {
        name: 'Le Creuset 5.5-Qt Round Dutch Oven',
        type: 'Enameled Cast Iron Dutch Oven',
        spec: 'Vitreous enamel over cast iron, heavy tight-fitting lid with phenolic knob rated to 500°F, 11.4 lbs.',
        role: 'No-knead artisan sourdough steam baking, slow collagen braising, and closed-system evaporation testing.',
      },
      {
        name: 'All-Clad D3 Tri-Ply Stainless 10-Inch',
        type: 'Clad Stainless Steel Fry Pan',
        spec: 'Tri-ply bonded construction (18/10 stainless interior, aluminum core, magnetic stainless exterior).',
        role: 'Pan deglazing, fond evaluation, pan sauce emulsion kinetics, and delicate white fish searing.',
      },
    ],
  },
  {
    category: 'Combustion, Pressure & Immersion',
    items: [
      {
        name: 'Weber Original Kettle Premium 22-Inch',
        type: 'Charcoal Radiant & Convection Cooker',
        spec: 'Porcelain-enameled bowl and lid, 363 sq in cooking grate, Slow ‘N Sear charcoal basket insert.',
        role: 'Charcoal chimney burn rates, Snake method 12-hour low-and-slow tests, and 2-zone indirect grilling.',
      },
      {
        name: 'Instant Pot Duo 7-in-1 6-Quart',
        type: 'Electric Multi-Cooker',
        spec: '1000W heating element, 11.6 psi (80 kPa) high-pressure steam mode, 15.2 psi safety release threshold.',
        role: 'High-pressure collagen gelatinization, bean hydration kinetics, and zero-evaporation rice/pasta ratios.',
      },
      {
        name: 'Anova Precision Cooker 3.0',
        type: 'Sous-Vide Immersion Circulator',
        spec: '1100W PTC heating element, 8 L/min flow rate, ±0.1°F (±0.05°C) water bath accuracy.',
        role: 'Douglas Baldwin pasteurization table validation and core thermal conductivity testing.',
      },
    ],
  },
];

export default function TestKitchenPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'About', path: '/about' },
    { name: 'Test Kitchen Lab', path: '/test-kitchen' },
  ]);

  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: 'Meal Instructions Test Kitchen Facility',
    description: 'Residential culinary laboratory equipped with NIST-calibrated thermometry and consumer hardware for recipe validation.',
    url: absoluteUrl('/test-kitchen'),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-16 space-y-12 text-ink font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />

      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle">
        <Link
          href="/about"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to About</span>
        </Link>
        <span className="uppercase text-ink-muted">DOCUMENT // FACILITY &amp; HARDWARE DISCLOSURES</span>
      </div>

      {/* Header */}
      <header className="space-y-4 border-b border-ink pb-8">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent">
          PHYSICAL TESTING ENVIRONMENT
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-ink uppercase font-sans">
          The Test Kitchen Hardware Lab
        </h1>
        <p className="text-base sm:text-xl text-ink-muted leading-relaxed max-w-[55ch]">
          Transparent equipment disclosures. The exact physical instruments, residential appliances, and calibrated probes used to author and verify our database.
        </p>
      </header>

      {/* Calibration Statement */}
      <section className="p-6 bg-paper-card border border-hairline space-y-4 font-mono text-xs">
        <div className="text-ink font-bold uppercase border-b border-hairline pb-2 flex items-center justify-between">
          <span>MEASUREMENT INTEGRITY POLICY</span>
          <span className="text-accent">NIST TRACEABLE</span>
        </div>
        <p className="text-ink-muted font-sans text-sm leading-relaxed">
          Culinary instructions are only as good as the instruments that measure them. If a thermometer drifts by 5°F, chicken breast transforms from tender to chalky, and medium-rare ribeye becomes medium-well. We mandate annual physical calibration against ASTM E563 ice-point baths (32.0°F / 0.0°C) and boiling point atmospheric pressure corrections for every digital sensor in our facility.
        </p>
      </section>

      {/* Hardware Categories */}
      <section className="space-y-10">
        {HARDWARE_INVENTORY.map((cat, idx) => (
          <div key={idx} className="space-y-4">
            <div className="border-b border-hairline pb-2">
              <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
                {cat.category}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {cat.items.map((item, i) => (
                <div key={i} className="p-5 bg-paper-card border border-hairline space-y-2 font-mono text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-hairline/60 pb-2">
                    <span className="font-bold text-sm text-ink font-sans">{item.name}</span>
                    <span className="text-accent text-[11px] uppercase">{item.type}</span>
                  </div>
                  <div className="text-ink-muted font-sans text-xs pt-1">
                    <strong>Hardware Specifications:</strong> {item.spec}
                  </div>
                  <div className="text-ink-subtle font-sans text-xs">
                    <strong>Laboratory Application:</strong> {item.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Environmental Operating Parameters */}
      <section className="space-y-4">
        <div className="border-b border-hairline pb-2">
          <h2 className="text-xl font-bold uppercase tracking-tight text-ink font-sans">
            Baseline Ambient Operating Conditions
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-4 bg-paper-card border border-hairline space-y-1">
            <div className="text-ink-subtle uppercase text-[10px]">Ambient Room Temp</div>
            <div className="text-lg font-bold text-ink">68°F – 72°F</div>
            <div className="text-[11px] text-ink-muted font-sans">(20°C – 22°C) standard HVAC</div>
          </div>

          <div className="p-4 bg-paper-card border border-hairline space-y-1">
            <div className="text-ink-subtle uppercase text-[10px]">Refrigeration Baselines</div>
            <div className="text-lg font-bold text-ink">34°F – 37°F</div>
            <div className="text-[11px] text-ink-muted font-sans">(1.1°C – 2.8°C) verified shelf probe</div>
          </div>

          <div className="p-4 bg-paper-card border border-hairline space-y-1">
            <div className="text-ink-subtle uppercase text-[10px]">Line Voltage Rating</div>
            <div className="text-lg font-bold text-ink">120V AC / 60Hz</div>
            <div className="text-[11px] text-ink-muted font-sans">Standard North American 15A/20A circuits</div>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <footer className="pt-6 border-t border-hairline flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-ink-muted">
        <div>Meal Instructions Test Kitchen Lab Disclosures</div>
        <div className="flex gap-4">
          <Link href="/editorial-standards" className="hover:text-ink transition-colors uppercase">Editorial Standards</Link>
          <Link href="/about" className="hover:text-ink transition-colors uppercase">About</Link>
          <Link href="/contact" className="hover:text-ink transition-colors uppercase">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
