import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, Zap, ArrowRight, ShieldCheck, Thermometer, HelpCircle } from 'lucide-react';
import AirFryerCalculator from '@/components/AirFryerCalculator';
import { RECIPES } from '@/data/recipes';
import RecipeCard from '@/components/RecipeCard';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Air Fryer Conversion Calculator // Oven to Air Fryer Times & Temps',
  description:
    'Instant formula to convert conventional oven recipes into exact air fryer temperatures and times. The 25°F / 20% rule with culinary science, worked examples, and FAQs.',
  keywords: [
    'air fryer calculator',
    'oven to air fryer conversion',
    'convert oven temp to air fryer',
    'air fryer conversion chart',
    'air fryer cook times calculator',
  ],
  alternates: {
    canonical: absoluteUrl('/air-fryer-calculator'),
  },
};

export default function CalculatorPage() {
  const topAirFryerRecipes = RECIPES.filter((r) => r.appliance === 'air-fryer').slice(0, 6);

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Tools', path: '/tools' },
    { name: 'Air Fryer Conversion Calculator', path: '/air-fryer-calculator' },
  ]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the universal rule for converting oven recipes to air fryer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The standard conversion formula is the 25/20 Rule: Reduce the conventional oven temperature by 25°F (approx. 15°C) and reduce the cooking time by 20% to 25%. Check doneness 3 to 4 minutes before the calculated end time.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why do air fryers cook faster than standard conventional ovens?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Air fryers feature high-speed convection fans mounted immediately above heating elements in a compact 4 to 8-quart chamber. High airflow strips the cool boundary layer of moisture away from food surfaces, dramatically accelerating conductive heat transfer and evaporative crisping.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to preheat an air fryer when using the conversion formula?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Preheating for 2 to 3 minutes ensures the chamber is at the target temperature before food enters, preventing proteins from releasing juices into cold metal and ensuring immediate surface searing.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I bake cakes and breads in an air fryer using this calculator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, but for delicate baked goods like quick breads and cakes, reduce the temperature by 30°F to 35°F. Because heat radiates downward from the top coil, cover the top loosely with foil during the first half of baking to prevent the top crust from over-browning before the center sets.',
        },
      },
    ],
  };

  const CONVERSION_BENCHMARKS = [
    { food: 'Frozen French Fries', oven: '425°F for 20 mins', airFryer: '400°F for 14-16 mins', tip: 'Shake basket at 5m and 10m' },
    { food: 'Boneless Chicken Breasts', oven: '400°F for 25 mins', airFryer: '375°F for 14-16 mins', tip: 'Pull at 160°F internal, rest 5m' },
    { food: 'Chicken Wings (Party Wings)', oven: '425°F for 40 mins', airFryer: '380°F (15m) + 400°F (5m)', tip: 'Shake at 10m for blistered skin' },
    { food: 'Pork Chops (1-inch)', oven: '400°F for 22 mins', airFryer: '380°F for 12-14 mins', tip: 'Flip at 7m mark' },
    { food: 'Broccoli Florets', oven: '425°F for 20 mins', airFryer: '390°F for 8-10 mins', tip: 'Shake at 4m; tips crisp like chips' },
    { food: 'Salmon Fillets (Skin-On)', oven: '400°F for 15 mins', airFryer: '380°F for 8-10 mins', tip: 'Skin-down, no flip required' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 text-ink font-sans space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb */}
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-ink-muted border-b border-hairline pb-3">
        <Link
          href="/tools"
          className="flex items-center gap-1 hover:text-accent transition-colors group"
        >
          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>BACK TO ALL ENGINES</span>
        </Link>
        <span>CALCULATOR // CONVECTION CONVERTER</span>
      </div>

      {/* Page Title */}
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent">
          CONVECTION DYNAMICS ENGINE
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-ink uppercase font-sans mt-2">
          Air Fryer Conversion Calculator
        </h1>
        <p className="mt-3 text-base sm:text-lg text-ink-muted max-w-3xl leading-relaxed">
          Convert conventional oven recipes into exact air fryer times and temperatures. Based on boundary layer heat transfer physics and tested on 6-quart basket hardware.
        </p>
      </div>

      {/* Main Interactive Tool */}
      <AirFryerCalculator />

      {/* The Engineering Explanation */}
      <section className="bg-paper-card border border-hairline p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent mb-2">
            <Thermometer className="w-4 h-4" />
            <span>Thermal Physics</span>
          </div>
          <h2 className="text-2xl font-bold uppercase text-ink">
            How Convection Heat Transfer Works
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed mt-2">
            An air fryer is an ultra-compact convection oven equipped with a high-RPM fan directly above an intense electric coil. In a standard conventional oven, stagnant cool air creates an insulating thermal blanket around food. The air fryer fan strips this blanket away continuously, evaporating moisture 30% faster and crisping surface starches in half the time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
          <div className="bg-paper p-4 border border-hairline space-y-1">
            <strong className="text-ink font-mono uppercase block text-[13px]">
              RULE 1: REDUCE TEMPERATURE BY 25°F (-15°C)
            </strong>
            <p className="text-ink-muted leading-relaxed">
              Moving hot air transfers thermal energy 30% more aggressively than still air. If you maintain standard oven temperatures, high radiant heat will char exterior sugars before the interior reaches food safety thresholds.
            </p>
          </div>

          <div className="bg-paper p-4 border border-hairline space-y-1">
            <strong className="text-ink font-mono uppercase block text-[13px]">
              RULE 2: REDUCE TIME BY 20% TO 25%
            </strong>
            <p className="text-ink-muted leading-relaxed">
              A 20-minute oven dish is crisp and ready in 14 to 16 minutes in an air fryer. Always flip proteins or shake vegetable baskets at the halfway mark to counteract downward radiant coil intensity.
            </p>
          </div>
        </div>
      </section>

      {/* Verified Reference Benchmark Table */}
      <section className="bg-paper border border-hairline p-6 space-y-4 font-mono text-xs">
        <div className="flex flex-wrap items-baseline justify-between border-b border-hairline pb-2">
          <span className="font-bold text-ink uppercase text-[12px] font-sans">
            COMMON CONVERSION BENCHMARK SPECIFICATIONS
          </span>
          <span className="text-ink-muted text-[11px]">Calculated for 6-qt basket</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2.5">Food Specification</th>
                <th className="py-2.5">Conventional Oven</th>
                <th className="py-2.5 text-accent font-bold">Air Fryer Setting</th>
                <th className="py-2.5">Execution Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {CONVERSION_BENCHMARKS.map((b, idx) => (
                <tr key={idx} className="hover:bg-paper-card">
                  <td className="py-2.5 font-bold text-ink font-sans text-xs">{b.food}</td>
                  <td className="py-2.5 text-ink-muted">{b.oven}</td>
                  <td className="py-2.5 font-bold text-accent">{b.airFryer}</td>
                  <td className="py-2.5 text-ink-muted font-sans text-[11px]">{b.tip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Calculator FAQs */}
      <section className="border-t border-ink pt-8 space-y-6">
        <h2 className="text-[24px] font-extrabold uppercase tracking-tight">
          Air Fryer Conversion FAQs
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

      {/* Top Air Fryer Recipes */}
      <section className="border-t border-hairline pt-8 space-y-6">
        <div className="flex items-center justify-between border-b border-hairline pb-3">
          <h3 className="text-2xl font-bold uppercase text-ink font-sans">
            Tested Air Fryer Recipes
          </h3>
          <Link
            href="/appliances/air-fryer"
            className="font-mono text-xs text-accent font-bold uppercase hover:underline"
          >
            VIEW ALL AIR FRYER MEALS →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" data-appliance-sort>
          {topAirFryerRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
}
