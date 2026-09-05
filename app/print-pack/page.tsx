import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowDown } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import { RECIPES } from '@/data/recipes';
import { PACK_MAX, TOP_20_SLUGS, packCatalog, topTwenty } from '@/lib/print-pack';
import PrintButton from '@/components/PrintButton';
import PrintPackStyles from '@/components/print/PrintPackStyles';
import PrintPackShell from '@/components/print/PrintPackShell';
import PrintPackDocument from '@/components/print/PrintPackDocument';
import PackBuilder from '@/components/print/PackBuilder';

export const metadata: Metadata = {
  title: 'Printable Recipe Pack — Top 20 Dinners',
  description:
    'Printable PDF, no signup: 20 recipes, one page each. Cook temp, total time, flip mark, pull temp, ingredient checklist and directions on a single fridge card — or build your own pack from all 228 recipes.',
  alternates: {
    canonical: absoluteUrl('/print-pack'),
  },
};

export default function PrintPackPage() {
  const recipes = topTwenty();
  const catalog = packCatalog();
  const pageCount = recipes.length + 1;

  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Print Pack', path: '/print-pack' }]);
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Printable Recipe Pack — Top 20 Dinners',
    description:
      'The twenty most-printed Meal Instructions dinners as a printable pack: one recipe per page with cook temp, time, flip mark, internal pull temp, ingredients and directions.',
    url: absoluteUrl('/print-pack'),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: recipes.length,
      itemListElement: recipes.map((recipe, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: recipe.title,
        url: absoluteUrl(`/recipes/${recipe.slug}`),
      })),
    },
  };

  return (
    <div className="pp-root max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8">
      <PrintPackStyles />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
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
          PRINT PACK // {recipes.length} SPECIMENS
        </span>
      </div>

      {/* Hero */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-4 no-print">
        <div className="micro-label text-accent">PRINTABLE PDF // NO SIGNUP // ONE PAGE PER RECIPE</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Printable Recipe Pack
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          The twenty most-printed dinners as fridge cards: cook temp, total time, flip mark,
          internal pull temp, ingredient checklist and the four get-to-the-point directions — one
          recipe per page, testing basis on every one. Print the whole pack, or tick your own from
          all {RECIPES.length} recipes below.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <PrintButton
            label="PRINT / SAVE AS PDF"
            source="print_pack_hero"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-paper font-mono text-xs uppercase tracking-wider hover:bg-accent transition-colors cursor-pointer"
          />
          <a
            href="#builder"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-paper hairline-border font-mono text-xs uppercase tracking-wider text-ink hover:border-ink transition-colors"
          >
            Build your own
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-subtle">
            {pageCount} pages // Letter or A4 // up to {PACK_MAX} recipes per pack
          </span>
        </div>
      </section>

      <PackBuilder catalog={catalog} initial={TOP_20_SLUGS} top20={TOP_20_SLUGS} />

      <PrintPackShell pageCount={pageCount}>
        <PrintPackDocument recipes={recipes} variant="top20" />
      </PrintPackShell>
    </div>
  );
}
