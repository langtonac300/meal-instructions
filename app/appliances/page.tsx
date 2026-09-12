import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Flame, Zap, ShieldCheck, Thermometer, Wind, Timer } from 'lucide-react';
import { APPLIANCES } from '@/data/appliances';
import { COOK_TIME_DATASHEETS } from '@/data/cook-times';
import { RECIPES } from '@/data/recipes';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import { LeanIcon } from '@/components/icons/Lean5SIcons';

export const metadata: Metadata = {
  title: 'Master Kitchen Appliance Guide // Convection, Radiant & Thermal Mass Reference',
  description:
    'Comprehensive technical operating guide and comparison matrix for all 11 cooking appliances: air fryer, standard oven, Instant Pot, cast iron, skillet, sheet pan, grill, smoker, Dutch oven, slow cooker, and boiling.',
  alternates: {
    canonical: absoluteUrl('/appliances'),
  },
  openGraph: {
    title: 'Master Kitchen Appliance Guide // Convection, Radiant & Thermal Mass Reference',
    description:
      'Thermal dynamics, preheating protocols, and equipment selection matrix for busy cooks and home chefs.',
    url: absoluteUrl('/appliances'),
  },
};

const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-ink-subtle';

export default function AppliancesIndexPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Appliances', path: '/appliances' }]);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Master Kitchen Appliance Guide & Thermodynamic Matrix',
    description:
      'Comprehensive technical directory and comparative heat transfer guide for home kitchen appliances.',
    url: absoluteUrl('/appliances'),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: APPLIANCES.length,
      itemListElement: APPLIANCES.map((app, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${app.name} Guide & Recipes`,
        url: absoluteUrl(`/appliances/${app.slug}`),
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I choose between an Air Fryer and a Standard Oven?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Choose an air fryer for small-batch foods (1-4 servings) requiring maximum exterior crispiness in 20-40% less time. High-velocity convection strips surface moisture instantly. Choose an oven when cooking high-volume meals, baking large casseroles, or using multiple sheet pans simultaneously.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does Cast Iron sear steaks and burgers better than Non-Stick Skillets?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Thermal mass. A 5-pound cast iron skillet stores significant thermal energy. When a cold steak hits the pan, the surface temperature drops minimally, driving immediate Maillard browning. Lightweight non-stick pans suffer severe temperature drops, causing meat to steam in its own moisture.',
        },
      },
      {
        '@type': 'Question',
        name: 'When is High Pressure (Instant Pot) better than Slow Cooking?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'High pressure raises the boiling point of water to 239°F (115°C) at 10-12 PSI. This accelerates collagen breakdown in tough chuck roasts, pork shoulders, and dry beans in 60-75 minutes rather than 8 hours, while keeping moisture trapped in a sealed vessel.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I really need to preheat an Air Fryer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For proteins requiring an immediate crisp sear (such as bacon, pork chops, steaks, or breaded chicken tenders), preheating for 3-5 minutes prevents surface grease absorption and ensures the exterior begins frying immediately.',
        },
      },
    ],
  };

  const THERMAL_MODES = [
    {
      category: 'High-Velocity Convection',
      appliances: ['air-fryer'],
      physics: 'Continuous high-speed fan strips the cold moisture barrier from food surfaces, delivering rapid dehydration and crisp frying with minimal added fat.',
      bestFor: 'Wings, fries, tenders, roasted vegetables, salmon fillets.',
    },
    {
      category: 'Thermal Mass & Direct Contact',
      appliances: ['cast-iron', 'skillet'],
      physics: 'Direct conductive heat transfer from dense pan metal. Stores extreme thermal energy to instantly trigger the Maillard reaction without temperature drops.',
      bestFor: 'Smash burgers, ribeye steaks, blackened fish, quick ground taco meat.',
    },
    {
      category: 'Radiant & Ambient Roasting',
      appliances: ['oven', 'sheet-pan'],
      physics: 'Uniform radiant heat transfer across large chambers. Allows wide ingredient spacing on rimmed baking sheets for simultaneous multi-portion cooking.',
      bestFor: 'Whole chickens, family sheet pan fajitas, baked potatoes, casseroles.',
    },
    {
      category: 'High-Pressure Steam Saturation',
      appliances: ['instant-pot', 'boiling'],
      physics: 'Trapped pressurized water vapor reaching 239°F (115°C) or turbulent 212°F boiling water. Rapidly breaks down connective collagen and gelatinizes starches.',
      bestFor: 'Pot roast, pulled pork, dried beans, al dente pasta, soft-boiled eggs.',
    },
    {
      category: 'Low & Slow Radiant / Indirect Smoke',
      appliances: ['slow-cooker', 'smoker', 'dutch-oven', 'grill'],
      physics: 'Prolonged low-temperature thermal diffusion (200°F–275°F) allowing muscle fibers to tenderize while rendered intramuscular fat lubricates the meat.',
      bestFor: 'Brisket, pulled pork shoulder, 3-2-1 ribs, beef bourguignon.',
    },
  ];

  return (
    <div className="max-w-[1100px] mx-auto px-5 sm:px-10 pt-12 pb-20 text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb */}
      <div className="flex items-center justify-between font-mono text-[12px] uppercase tracking-[0.08em] text-ink-muted mb-6">
        <Link href="/" className="inline-flex items-center gap-1.5 hover:text-ink transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Home</span>
        </Link>
        <span>HARDWARE MATRIX // 11 APPLIANCES</span>
      </div>

      {/* Header */}
      <header className="border-b border-ink pb-8">
        <div className={EYEBROW}>HARDWARE SELECTION & THERMAL DYNAMICS</div>
        <h1 className="mt-2 font-sans text-[36px] sm:text-[50px] font-black tracking-[-0.02em] leading-[1.05] uppercase">
          Kitchen Appliance Guides
        </h1>
        <p className="mt-4 text-[19px] sm:text-[21px] leading-[1.5] text-ink-muted max-w-[65ch]">
          Every appliance transfers thermal energy differently. Understand convective airflow, conductive contact, and pressure saturation so you choose the exact right tool for dinner every night.
        </p>
      </header>

      {/* Heat Transfer Physics Matrix */}
      <section className="mt-12 bg-paper-card border border-hairline p-6 sm:p-8 font-sans">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent mb-2">
          <Thermometer className="w-4 h-4" />
          <span>Culinary Physics</span>
        </div>
        <h2 className="text-[22px] sm:text-[26px] font-extrabold tracking-[-0.01em] uppercase text-ink">
          The 5 Heat Transfer Mechanisms Explained
        </h2>
        <p className="mt-2 text-[15px] text-ink-muted leading-[1.6]">
          Cooking is thermodynamics. Choosing between an air fryer, cast iron skillet, or Instant Pot is not a matter of convenience; it changes how moisture evaporates, how fats render, and whether meat browns or steams.
        </p>

        <div className="mt-6 space-y-4">
          {THERMAL_MODES.map((mode, i) => (
            <div key={i} className="p-4 bg-paper border border-hairline font-mono text-xs">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-hairline pb-2 mb-2">
                <span className="font-bold text-ink uppercase text-[13px] font-sans">{mode.category}</span>
                <span className="text-accent uppercase font-bold">
                  {mode.appliances.join(' · ').replace(/-/g, ' ')}
                </span>
              </div>
              <p className="font-sans text-xs text-ink leading-relaxed mb-2">{mode.physics}</p>
              <div className="text-[11px] text-ink-muted">
                <strong className="text-ink">OPTIMAL USE:</strong> {mode.bestFor}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Appliance Directory Grid */}
      <section className="mt-14 space-y-6">
        <div className="flex items-baseline justify-between border-b border-ink pb-3">
          <h2 className="text-[24px] font-black tracking-[-0.01em] uppercase">
            All 11 Kitchen Appliances
          </h2>
          <span className="font-mono text-xs text-ink-muted uppercase">
            Exact Temps & Tested Datasheets
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {APPLIANCES.map((app) => {
            const recipeCount = RECIPES.filter((r) => r.appliance === app.slug).length;
            const sheetCount = COOK_TIME_DATASHEETS.filter((d) => d.appliance === app.slug).length;

            return (
              <div
                key={app.slug}
                className="bg-paper border border-hairline hover:border-ink transition-colors flex flex-col justify-between group p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="p-2.5 bg-paper-card border border-hairline">
                      <LeanIcon name={app.slug} size={26} className="text-accent" />
                    </div>
                    <span className="font-mono text-[11px] text-ink-subtle uppercase">
                      {recipeCount} meals · {sheetCount} sheets
                    </span>
                  </div>

                  <h3 className="text-[22px] font-bold tracking-tight text-ink uppercase leading-tight group-hover:text-accent transition-colors">
                    <Link href={`/appliances/${app.slug}`}>{app.name}</Link>
                  </h3>
                  <p className="mt-2 text-[14px] text-ink-muted leading-[1.5]">
                    {app.shortDescription}
                  </p>

                  <div className="mt-4 pt-3 border-t border-hairline font-mono text-[11px] text-ink-muted">
                    <span>TEMP RANGE: </span>
                    <strong className="text-ink">{app.tempRange}</strong>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between font-mono text-xs">
                  <Link
                    href={`/appliances/${app.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-ink hover:text-accent uppercase transition-colors"
                  >
                    <span>Guide & Recipes</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/charts/${app.slug}`}
                    className="text-accent hover:underline uppercase font-bold"
                  >
                    View Chart →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-20 border-t border-ink pt-12 space-y-6">
        <h2 className="text-[26px] font-extrabold uppercase tracking-tight">
          Appliance Engineering FAQs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqSchema.mainEntity.map((faq, i) => (
            <div key={i} className="border-b border-hairline pb-6">
              <h3 className="font-bold text-[18px] text-ink mb-2">
                {faq.name}
              </h3>
              <p className="text-[15px] leading-[1.6] text-ink-muted">
                {faq.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
