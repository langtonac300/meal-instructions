import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import { TOP_20_SLUGS, packCatalog, packFromParam, packPageCount } from '@/lib/print-pack';
import PrintButton from '@/components/PrintButton';
import PrintPackStyles from '@/components/print/PrintPackStyles';
import PrintPackShell from '@/components/print/PrintPackShell';
import PrintPackDocument from '@/components/print/PrintPackDocument';
import PackBuilder from '@/components/print/PackBuilder';

// Every selection is a different document but the same page, so search engines
// are pointed at the clean URL and told not to index the variants (HR-9 spirit).
export const metadata: Metadata = {
  title: 'Your Printable Recipe Pack',
  description:
    'A printable PDF pack of the Meal Instructions recipes you picked — one fridge card per page, cover index included. No signup.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: absoluteUrl('/print-pack'),
  },
};

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CustomPrintPackPage({ searchParams }: Props) {
  const params = await searchParams;
  const recipes = packFromParam(params.r);
  if (recipes.length === 0) redirect('/print-pack');

  const slugs = recipes.map((recipe) => recipe.slug);
  const catalog = packCatalog();
  const pageCount = packPageCount(recipes.length);
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Print Pack', path: '/print-pack' },
    { name: 'Your pack', path: '/print-pack/custom' },
  ]);

  return (
    <div className="pp-root max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8">
      <PrintPackStyles />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle no-print">
        <Link
          href="/print-pack"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to the Top 20</span>
        </Link>
        <span className="font-mono text-xs text-accent font-bold uppercase">
          PRINT PACK // {recipes.length} SPECIMEN{recipes.length === 1 ? '' : 'S'}
        </span>
      </div>

      {/* Hero */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-4 no-print">
        <div className="micro-label text-accent">YOUR SELECTION // PRINTABLE PDF // NO SIGNUP</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          Your Recipe Pack
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          {recipes.length === 1
            ? 'One recipe on one sheet — no cover, just the card.'
            : `${recipes.length} recipes, one page each, plus a cover index.`}{' '}
          Print it, save it as a PDF, or share this link — it rebuilds the same pack. Change the
          selection below and rebuild.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <PrintButton
            label="PRINT / SAVE AS PDF"
            source="print_pack_hero"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-paper font-mono text-xs uppercase tracking-wider hover:bg-accent transition-colors cursor-pointer"
          />
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-subtle">
            {pageCount} page{pageCount === 1 ? '' : 's'} // Letter or A4
          </span>
        </div>
      </section>

      <PackBuilder catalog={catalog} initial={slugs} top20={TOP_20_SLUGS} />

      <PrintPackShell recipeCount={recipes.length}>
        <PrintPackDocument recipes={recipes} variant="custom" />
      </PrintPackShell>
    </div>
  );
}
