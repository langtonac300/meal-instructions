import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import FoodCostCalculator from '@/components/tools/FoodCostCalculator';
import { FOOD_COST_PRESETS } from '@/data/tools-data';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Meal Prep Batch Cost & Portion Calculator — Grocery Savings Math',
  description: 'Calculate exact ingredient costs, total batch price, cost per serving, and restaurant takeout savings for weekly meal prepping and family dinners.',
  alternates: {
    canonical: absoluteUrl('/food-cost-calculator'),
  },
};

const FAQ_ENTRIES = [
  {
    q: 'What is the standard restaurant food cost percentage compared to home cooking?',
    a: 'Commercial restaurants target a food cost percentage between 28% and 35% of menu price, with remaining revenue allocated to labor (30–35%), occupancy/overhead (15–20%), and net profit (5–10%). A $18 restaurant chipotle chicken bowl contains approximately $4.20 to $5.00 in raw food cost. Cooking the identical meal in bulk at home eliminates commercial labor and markup, delivering the same meal for $2.40 to $3.10 per portion.',
  },
  {
    q: 'What is the difference between "As Purchased" (AP) and "Edible Portion" (EP) cost?',
    a: 'As Purchased (AP) cost is the price paid at the register per pound. Edible Portion (EP) cost accounts for trim loss, bones, fat rendering, and evaporation during cooking. For example, bone-in chicken thighs at $1.99/lb yield roughly 65% edible meat after bone removal and shrinkage, producing an effective EP cost of $1.99 / 0.65 = $3.06/lb. Boneless, skinless breasts at $3.49/lb have a 95% EP yield, making their actual cooked cost per pound nearly identical.',
  },
  {
    q: 'Which pantry staples deliver the lowest cost per gram of bioavailable protein?',
    a: 'Whole eggs, dry lentils, and whole roasted chickens consistently deliver the lowest cost per gram of complete protein. Large eggs at $3.00/dozen deliver 72 grams of protein at $0.041 per gram. Boneless chicken breast at $3.49/lb provides ~140 grams of protein at $0.025 per gram. In contrast, processed deli meats and pre-packaged frozen entrees often exceed $0.09 to $0.14 per gram of protein.',
  },
  {
    q: 'How much money does a family of four save by batch cooking Sunday dinners?',
    a: 'Replacing two standard weekly family restaurant dinners ($75 to $90 per takeout order for four people) with batch-prepped home meals costing $14 to $18 saves roughly $120 to $145 weekly. Over 52 weeks, this disciplined substitution retains $6,200 to $7,500 in household net capital while dramatically reducing sodium and refined seed oil consumption.',
  },
  {
    q: 'What is the yield expansion multiplier for dry rice and dry beans?',
    a: 'Dry long-grain white rice expands at a 1:3 ratio: 1 cup of dry rice (approx. 185g, cost ~$0.35) yields 3 cups of cooked fluffy rice (approx. 550g). Dry black or pinto beans expand at a 1:2.5 ratio upon soaking and boiling. A single 1 lb dry bean bag ($1.50) yields equivalent cooked volume to 4.5 cans of beans ($5.40), slashing legume costs by 72%.',
  },
];

export default function FoodCostCalculatorPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Tools', path: '/tools' },
    { name: 'Meal Prep Batch Cost & Portion Calculator', path: '/food-cost-calculator' },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Meal Prep Batch Food Cost & Portion Calculator',
    url: absoluteUrl('/food-cost-calculator'),
    description: 'Calculate unit costs, recipe batch totals, and compare home cooking savings against restaurant meals.',
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
          label="PRINT COST BREAKDOWN"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">GROCERY BUDGET &amp; UNIT COST ITEMIZATION</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Meal Prep &amp; Food Cost Calculator
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Cook restaurant-quality meals for a fraction of commercial dining prices. Itemize grocery package sizes, calculate true portion prices, edible yield factors, and quantify annual household capital retention.
        </p>
      </section>

      {/* Interactive Tool */}
      <FoodCostCalculator />

      {/* SSR Static Reference Table for Crawlers */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED BATCH COOKING COST ARCHETYPES
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Meal Archetype</th>
                <th className="py-2">Servings</th>
                <th className="py-2">Takeout Equivalent</th>
                <th className="py-2">Key Ingredients</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {FOOD_COST_PRESETS.map((p) => (
                <tr key={p.id} className="hover:bg-paper-card">
                  <td className="py-2 font-bold text-ink">{p.mealName.split('(')[0]}</td>
                  <td className="py-2 font-bold text-accent">{p.servings} portions</td>
                  <td className="py-2 font-bold text-ink">${p.restaurantEquivalentPrice.toFixed(2)}</td>
                  <td className="py-2 text-ink-muted font-sans text-xs">
                    {p.defaultItems.map((i) => i.name).join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Financial Engineering Reference Guide */}
      <section className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6 font-mono text-xs text-ink-muted">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent">ECONOMIC METRICS &amp; CULINARY ACCOUNTING</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Culinary Economics: AP vs EP Yield Math &amp; Prime Cost Breakdown
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          <div className="space-y-3 p-5 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              Edible Portion (EP) Yield Formula
            </div>
            <p className="text-xs leading-relaxed">
              Purchased raw weight never equals plate-ready cooked weight. Trimming bone, connective gristle, skin, and thermal purge water reduces net edible yield:
            </p>
            <div className="p-3 bg-paper-card border border-hairline font-mono text-[11px] text-ink space-y-1">
              <div>Yield Percentage = (Edible Weight / Purchased Weight) × 100</div>
              <div className="text-accent font-bold pt-1">
                Real EP Cost / Lb = As-Purchased Price / Yield Percentage
              </div>
            </div>
          </div>

          <div className="space-y-3 p-5 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              Commercial Restaurant Markup Architecture
            </div>
            <p className="text-xs leading-relaxed">
              When dining out, 70% to 75% of your bill pays for fixed restaurant overhead rather than food:
            </p>
            <div className="p-3 bg-paper-card border border-hairline font-mono text-[11px] text-ink space-y-1">
              <div>Food Cost (Cost of Goods Sold): 28% – 32%</div>
              <div>Kitchen &amp; Service Labor: 30% – 35%</div>
              <div>Commercial Lease, Utilities &amp; Tech: 18% – 22%</div>
              <div className="text-accent font-bold pt-1">Net Owner Operating Profit: 5% – 10%</div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-paper hairline-border space-y-2">
          <div className="font-bold text-ink uppercase text-[11px] font-mono">
            Annual Household Capital Compounding Effect
          </div>
          <p className="font-sans text-xs leading-relaxed">
            Cooking four dinners at home per week instead of purchasing fast-casual takeout for a family of four saves an average of <strong>$550 per month ($6,600 annually)</strong>. Reinvesting that monthly delta into an index fund averaging a 7% annualized compound return yields approximately <strong>$95,000 in retained net worth over 10 years</strong>.
          </p>
        </div>
      </section>

      {/* On-Page FAQs */}
      <section className="bg-paper hairline-border p-6 sm:p-8 space-y-6">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent font-mono">E-E-A-T CULINARY ACCOUNTING PROTOCOLS</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Frequently Asked Questions: Food Cost &amp; Grocery Math
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
