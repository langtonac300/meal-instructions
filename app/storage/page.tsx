import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FOOD_STORAGE_DATASHEETS } from '@/data/food-storage';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import type { FoodStorageCategory } from '@/lib/types';

const CATEGORY_LABELS: Record<FoodStorageCategory, string> = {
  'poultry': 'Poultry',
  'beef': 'Beef',
  'pork': 'Pork & Deli',
  'seafood': 'Seafood',
  'grains-pasta': 'Grains & Pasta',
  'dairy-eggs': 'Dairy & Eggs',
  'prepared-foods': 'Prepared Foods',
  'produce': 'Produce',
};

const CATEGORY_ORDER: FoodStorageCategory[] = [
  'poultry', 'beef', 'pork', 'seafood',
  'grains-pasta', 'dairy-eggs', 'prepared-foods', 'produce',
];

export const metadata: Metadata = {
  title: 'How Long Does Food Last? — Fridge & Freezer Storage Guide',
  description:
    `${FOOD_STORAGE_DATASHEETS.length} verified food storage datasheets. How long cooked chicken, ground beef, rice, eggs, and more last in the fridge and freezer. USDA-based shelf life data.`,
  alternates: {
    canonical: absoluteUrl('/storage'),
  },
};

export default function StorageHubPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Food Storage', path: '/storage' }]);

  const categoriesWithData = CATEGORY_ORDER.filter(
    (cat) => FOOD_STORAGE_DATASHEETS.some((d) => d.foodCategory === cat)
  );

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'How Long Does Food Last? — Fridge & Freezer Storage Guide',
    description: `${FOOD_STORAGE_DATASHEETS.length} verified food storage datasheets across ${categoriesWithData.length} categories.`,
    url: absoluteUrl('/storage'),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: FOOD_STORAGE_DATASHEETS.length,
      itemListElement: FOOD_STORAGE_DATASHEETS.map((sheet, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `How Long Does ${sheet.food} Last?`,
        url: absoluteUrl(`/storage/${sheet.slug}`),
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the USDA bacterial Danger Zone for food storage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The USDA defines the Danger Zone as 40°F to 140°F (4°C to 60°C). Within this window, pathogenic bacteria (Salmonella, Staphylococcus aureus, E. coli) can double every 20 minutes. Perishable cooked or raw foods must never sit at room temperature for more than 2 hours (or 1 hour if ambient heat exceeds 90°F).',
        },
      },
      {
        '@type': 'Question',
        name: 'What temperature should a home refrigerator be set at?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Set home refrigerators between 34°F and 38°F (1°C to 3°C). While 40°F is the regulatory ceiling, maintaining 35°F to 37°F significantly suppresses psychrotrophic bacteria like Listeria monocytogenes without freezing delicate produce.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does freezing meat destroy bacteria or just pause growth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Freezing at 0°F (-18°C) halts microbial replication and enzymatic breakdown, effectively pressing pause on spoilage. However, freezing does NOT kill bacteria; microbes enter dormancy and resume rapid exponential growth once the meat thaws into the Danger Zone.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is leaving cooked rice at room temperature dangerous?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Raw rice frequently harbors Bacillus cereus bacterial spores that survive the boiling process. If cooked rice cools slowly at room temperature, these spores germinate and produce heat-stable cereulide enterotoxins that are not destroyed by subsequent microwave or skillet reheating.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is freezer-burned meat safe to eat?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Freezer burn is sublimation moisture loss and lipid oxidation caused by dry air contact. While it creates leathery, discolored dry patches and stale flavors, it poses zero microbiological or food safety hazard. Trim away burned edges before or after cooking.',
        },
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
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
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <span className="font-mono text-xs text-accent font-bold uppercase">
          INDEX // {FOOD_STORAGE_DATASHEETS.length} STORAGE GUIDES
        </span>
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">FOOD SAFETY DATABASE</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          How Long Does Food Last?
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans leading-relaxed">
          {FOOD_STORAGE_DATASHEETS.length} verified fridge & freezer storage guides.
          Exact shelf life windows, spoilage signs, and best storage methods. All data sourced from USDA food safety guidelines.
        </p>
      </section>

      {/* Category Sections */}
      <div className="space-y-8">
        {categoriesWithData.map((cat) => {
          const datasheets = FOOD_STORAGE_DATASHEETS.filter((d) => d.foodCategory === cat);
          return (
            <section key={cat} className="bg-paper-card hairline-border p-6 space-y-4">
              <div className="flex justify-between items-center hairline-b pb-3">
                <div>
                  <h2 className="text-lg font-bold uppercase tracking-tight text-ink font-sans">
                    {CATEGORY_LABELS[cat]}
                  </h2>
                  <p className="text-[11px] text-ink-muted font-mono">
                    {datasheets.length} GUIDES
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
                {datasheets.map((item) => {
                  const fridgeTime = item.storageTimeframes.find((t) => t.location === 'fridge');
                  const freezerTime = item.storageTimeframes.find((t) => t.location === 'freezer');
                  return (
                    <Link
                      key={item.id}
                      href={`/storage/${item.slug}`}
                      className="bg-paper p-3.5 hairline-border space-y-2 hover:border-ink transition-colors block group"
                    >
                      <div className="font-bold text-ink text-sm font-sans group-hover:text-accent transition-colors">
                        {item.food}
                      </div>
                      <div className="text-[11px] text-ink-muted font-mono uppercase">
                        {item.state}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-ink-muted text-xs pt-1 border-t border-hairline/60">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase text-ink-subtle">Fridge</span>
                          <span className="font-bold text-ink">{fridgeTime?.formatted ?? '—'}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase text-ink-subtle">Freezer</span>
                          <span className="font-bold text-ink">{freezerTime?.formatted ?? '—'}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Frequently Asked Questions */}
      <section className="bg-paper hairline-border p-6 sm:p-8 space-y-6">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent font-mono">USDA FSIS SAFETY BENCHMARKS</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Frequently Asked Questions: Food Storage &amp; Shelf Life
          </h2>
        </div>

        <div className="space-y-6">
          {faqSchema.mainEntity.map((faq, i) => (
            <div key={i} className="space-y-2">
              <h3 className="text-sm font-bold uppercase text-ink font-sans flex items-baseline gap-2">
                <span className="text-accent font-mono text-xs">0{i + 1}.</span>
                {faq.name}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed font-sans pl-5">
                {faq.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-links */}
      <section className="bg-paper-card hairline-border p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-tight text-ink font-mono">
          Related References
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <Link
            href="/how-long"
            className="p-4 bg-paper hairline-border hover:border-ink transition-colors flex items-center justify-between group"
          >
            <span className="font-bold text-ink group-hover:text-accent transition-colors">Cook Time Datasheets</span>
            <ArrowRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-accent" />
          </Link>
          <Link
            href="/internal-temp"
            className="p-4 bg-paper hairline-border hover:border-ink transition-colors flex items-center justify-between group"
          >
            <span className="font-bold text-ink group-hover:text-accent transition-colors">Internal Temp Guide</span>
            <ArrowRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-accent" />
          </Link>
          <Link
            href="/cheat-sheet"
            className="p-4 bg-paper hairline-border hover:border-ink transition-colors flex items-center justify-between group"
          >
            <span className="font-bold text-ink group-hover:text-accent transition-colors">Printable Cheatsheet</span>
            <ArrowRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-accent" />
          </Link>
        </div>
      </section>
    </div>
  );
}
