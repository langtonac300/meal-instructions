import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {
  LeanAirFryerIcon,
  LeanHeatWavesIcon,
  LeanSafetyShieldIcon,
  LeanClockIcon,
  LeanForkIcon,
  LeanProbeIcon,
  LeanScaleIcon,
  LeanPlateIcon,
  LeanPanHeatIcon,
  LeanStopwatchIcon,
} from '@/components/icons/Lean5SIcons';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Zero-Fluff Kitchen Calculators & Cooking Tools Directory',
  description: 'Precision cooking utilities for busy parents: oven-to-air fryer converters, frozen cook calculators, carryover temp charts, salt math, and dinner sync schedulers.',
  alternates: {
    canonical: absoluteUrl('/tools'),
  },
};

const TOOLS = [
  {
    href: '/air-fryer-calculator',
    icon: LeanAirFryerIcon,
    title: 'Oven to Air Fryer Converter',
    badge: 'CORE CONVERTER',
    description: 'Convert conventional oven temps and cook times using the convection 25° / 20% rule.',
  },
  {
    href: '/reheat',
    icon: LeanHeatWavesIcon,
    title: 'Takeout & Leftover Revive Engine',
    badge: 'CRISP RESTORATION',
    description: 'Restore fries, pizza, wings, and tenders to fresh-out-of-the-fryer crunch without microwave mush.',
  },
  {
    href: '/frozen-cook',
    icon: LeanSafetyShieldIcon,
    title: 'Forgot to Thaw? Freezer Matrix',
    badge: 'USDA SAFETY PROTOCOL',
    description: 'Direct-from-frozen cooking times, banned appliances, and rapid cold-water submersion timelines.',
  },
  {
    href: '/dinner-sync',
    icon: LeanClockIcon,
    title: 'Two-Appliance Dinner Sync',
    badge: 'REVERSE TIMELINE',
    description: 'Coordinate multiple appliances so protein, roasted veggies, and carbs finish piping hot at the same minute.',
  },
  {
    href: '/meat-math',
    icon: LeanForkIcon,
    title: 'Feed The Crew Meat Math',
    badge: 'COSTCO & BBQ SCALER',
    description: 'Calculate raw butcher weights factoring in 25-50% shrinkage, bones, and buns for any headcount.',
  },
  {
    href: '/internal-temp',
    icon: LeanProbeIcon,
    title: 'Thermometer Pull Temp Guide',
    badge: 'THERMAL CARRYOVER',
    description: 'Exact temperatures to pull meat off the heat to account for the resting rise and prevent dry meat.',
  },
  {
    href: '/salt-math',
    icon: LeanScaleIcon,
    title: 'Equilibrium Salting & Dry Brine',
    badge: 'DENSITY CONVERSION',
    description: 'Convert salt weight to volume accurately across Diamond Crystal, Morton, table salt, and sea salt.',
  },
  {
    href: '/kid-split',
    icon: LeanPlateIcon,
    title: 'Picky Kid Meal Deconstructor',
    badge: 'ZERO DOUBLE COOKING',
    description: '60-second plating and sauce-separation blueprints to feed toddlers and adults from one pan.',
  },
  {
    href: '/troubleshoot',
    icon: LeanPanHeatIcon,
    title: 'Fix My Cook // 5-Sec Rescue',
    badge: 'EMERGENCY TRIAGE',
    description: '1-click fixes for smoking air fryers, soggy veggies, gray steak, and slipped breading.',
  },
  {
    href: '/cheat-sheet',
    icon: LeanStopwatchIcon,
    title: 'Printable Cooking Cheatsheet',
    badge: 'FRIDGE REFERENCE',
    description: 'Full time and temperature matrix for air fryers, sheet pans, skillets, and grills.',
  },
];

export default function ToolsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Zero-Fluff Kitchen Calculators & Cooking Tools Directory',
    url: absoluteUrl('/tools'),
    description: 'Interactive cooking calculators, converters, and reference charts for dads and busy cooks.',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10 font-sans">
      
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
          10 INTERACTIVE ENGINES
        </span>
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">ARCHITECTURAL UTILITIES</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Kitchen Engines & Calculators
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          No life stories, no clutter. Instant calculations for cooking temperatures, meat poundage, freezer emergencies, leftover revival, and salt density.
        </p>
      </section>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="bg-paper-card hairline-border p-6 space-y-3 hover:border-ink transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="micro-label text-accent font-mono">
                    {tool.badge}
                  </span>
                  <div className="p-1.5 bg-paper hairline-border">
                    <Icon size={24} className="text-ink-muted group-hover:text-accent transition-colors" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-ink uppercase tracking-tight font-sans group-hover:text-accent transition-colors">
                  {tool.title}
                </h2>
                <p className="text-xs sm:text-sm text-ink-muted font-sans leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="font-mono text-xs font-bold text-ink uppercase pt-2 flex items-center gap-1 group-hover:underline">
                <span>Launch Tool</span>
                <span>→</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

    </div>
  );
}
