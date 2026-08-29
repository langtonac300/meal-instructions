import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, Zap, ArrowRight } from 'lucide-react';
import AirFryerCalculator from '@/components/AirFryerCalculator';
import { RECIPES } from '@/data/recipes';
import RecipeCard from '@/components/RecipeCard';

export const metadata: Metadata = {
  title: 'Air Fryer Conversion Calculator // Oven to Air Fryer Times & Temps',
  description:
    'Instant formula to convert conventional oven recipes into exact air fryer temperatures and times. The 25°F / 20% rule with no fluff.',
  keywords: [
    'air fryer calculator',
    'oven to air fryer conversion',
    'convert oven temp to air fryer',
    'air fryer conversion chart',
    'air fryer cook times calculator',
  ],
  alternates: {
    canonical: 'https://dadmeals.com/air-fryer-calculator',
  },
};

export default function CalculatorPage() {
  const topAirFryerRecipes = RECIPES.filter((r) => r.appliance === 'air-fryer').slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-ink-muted border-b border-hairline pb-3 mb-8">
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-accent transition-colors group"
        >
          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>BACK TO ALL MEALS</span>
        </Link>
        <span>TOOL // CONVERSION CALCULATOR</span>
      </div>

      {/* Main Interactive Tool */}
      <AirFryerCalculator />

      {/* The Engineering Explanation */}
      <section className="mt-12 bg-paper-100 border border-hairline rounded-lg p-6 sm:p-8 font-mono text-xs">
        <h3 className="font-serif text-xl font-bold uppercase text-ink mb-3 font-sans">
          HOW CONVECTION HEAT CONVERSION WORKS
        </h3>
        <p className="font-sans text-sm text-ink-muted leading-relaxed mb-4">
          An air fryer is not actually a fryer; it is an ultra-compact convection oven with a high-velocity
          fan positioned right above the heating element. Because air circulates constantly in a tiny 4-to-8
          quart chamber, moisture evaporates immediately and surface fats fry instantly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 font-sans text-xs">
          <div className="bg-paper-50 p-4 rounded border border-hairline">
            <strong className="text-ink font-mono uppercase block mb-1">
              RULE 1: REDUCE TEMP BY 25°F (-15°C)
            </strong>
            <span className="text-ink-muted">
              Because moving hot air transfers heat 30% more aggressively, high temperatures will burn
              the exterior before the core finishes cooking.
            </span>
          </div>

          <div className="bg-paper-50 p-4 rounded border border-hairline">
            <strong className="text-ink font-mono uppercase block mb-1">
              RULE 2: REDUCE TIME BY 20% TO 25%
            </strong>
            <span className="text-ink-muted">
              A 20-minute oven dish will be crispy and done in 15 to 16 minutes. Always shake the basket
              halfway through for uniform airflow.
            </span>
          </div>
        </div>
      </section>

      {/* Top Air Fryer Recipes */}
      <section className="mt-12">
        <div className="flex items-center justify-between border-b border-hairline pb-3 mb-6">
          <h3 className="font-serif text-2xl font-bold uppercase text-ink">
            FEATURED AIR FRYER RECIPES
          </h3>
          <Link
            href="/categories/air-fryer"
            className="font-mono text-xs text-accent font-bold uppercase hover:underline"
          >
            VIEW ALL AIR FRYER MEALS →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {topAirFryerRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
}
