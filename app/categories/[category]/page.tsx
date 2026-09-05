import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Printer } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { getRecipesByCategory } from '@/data/recipes';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import { PACK_MAX, packHref } from '@/lib/print-pack-format';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const catMeta = CATEGORIES.find((c) => c.slug === category);

  if (!catMeta) {
    return { title: 'Category Not Found | Meal Instructions' };
  }

  const count = getRecipesByCategory(category).length;
  const title = `${catMeta.name} (${count} No-Fluff Recipes)`;
  const description = `${catMeta.fullDescription} 100% fluff-free execution. Exact temperatures and times.`;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/categories/${category}`),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/categories/${category}`),
    },
  };
}

/** 'air-fryer' → 'Air fryer' */
const applianceLabel = (slug: string) => {
  const words = slug.replace(/-/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
};

const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-ink-subtle';

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const catMeta = CATEGORIES.find((c) => c.slug === category);

  if (!catMeta) {
    notFound();
  }

  const recipes = getRecipesByCategory(category);

  // Every number is derived from the recipes in this category (HR-2).
  const minutes = recipes.map((r) => r.totalMinutes);
  const averageMinutes = minutes.length
    ? Math.round(minutes.reduce((a, b) => a + b, 0) / minutes.length)
    : null;
  const fastestMinutes = minutes.length ? Math.min(...minutes) : null;

  // The printable pack caps at PACK_MAX; past that, the first PACK_MAX in
  // index order go in and the copy says so (packFromParam truncates silently).
  const packSlugs = recipes.slice(0, PACK_MAX).map((r) => r.slug);
  const packIsCapped = recipes.length > PACK_MAX;

  const specCells = [
    { label: 'Recipes', value: `${recipes.length}` },
    ...(averageMinutes !== null ? [{ label: 'Average time', value: `${averageMinutes} min` }] : []),
    ...(fastestMinutes !== null ? [{ label: 'Fastest', value: `${fastestMinutes} min` }] : []),
  ];

  // Collection JSON-LD Schema
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: catMeta.name,
    description: catMeta.fullDescription,
    numberOfItems: recipes.length,
    itemListElement: recipes.map((recipe, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: recipe.title,
      url: absoluteUrl(`/recipes/${recipe.slug}`),
    })),
  };

  const breadcrumbs = generateBreadcrumbSchema([
    { name: catMeta.name, path: `/categories/${category}` },
  ]);

  return (
    <div className="max-w-[1000px] mx-auto px-5 sm:px-10 pb-16 text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Breadcrumb */}
      <div className="pt-6 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-muted">
        <Link href="/categories" className="inline-flex items-center gap-1.5 hover:text-ink transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>All categories</span>
        </Link>
      </div>

      {/* Header */}
      <header className="pt-7">
        <h1 className="font-sans text-[34px] sm:text-[46px] font-black tracking-[-0.02em] leading-[1.05] uppercase">
          {catMeta.name}
        </h1>
        <p className="mt-[18px] text-[19px] sm:text-[21px] leading-[1.5] text-ink-muted max-w-[60ch]">
          {catMeta.fullDescription}
        </p>
      </header>

      {/* Spec row — derived at render time, never a literal */}
      <dl className="mt-8 grid grid-cols-1 sm:grid-cols-3 border-t border-b border-ink">
        {specCells.map((cell, i) => (
          <div
            key={cell.label}
            className={`py-5 sm:px-5 first:pl-0 last:pr-0 border-hairline ${
              i < specCells.length - 1 ? 'border-b sm:border-b-0 sm:border-r' : ''
            }`}
          >
            <dt className={EYEBROW}>{cell.label}</dt>
            <dd className="mt-2 font-mono text-[28px] sm:text-[36px] font-black tracking-[-0.02em] leading-none">
              {cell.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Recipe list */}
      <section className="mt-10" aria-labelledby="recipes-heading">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
          <h2 id="recipes-heading" className="text-[24px] font-extrabold tracking-[-0.01em] uppercase">
            All {recipes.length} recipes
          </h2>
          <span className="text-[15px] text-ink-muted">Sorted by index number</span>
        </div>
        <ul className="border-t border-ink">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="border-b border-hairline">
              <Link
                href={`/recipes/${recipe.slug}`}
                className="flex items-baseline gap-4 sm:gap-6 py-5 -mx-3 px-3 hover:bg-paper-50 transition-colors group"
              >
                <span className="font-mono text-[15px] text-ink-subtle w-[3.5em] shrink-0">
                  {recipe.id}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[19px] sm:text-[22px] font-bold tracking-[-0.01em] leading-tight group-hover:text-accent transition-colors">
                    {recipe.title}
                  </span>
                  <span className="block mt-1 text-[17px] leading-[1.5] text-ink-muted">
                    {recipe.tagline}
                  </span>
                </span>
                <span className="hidden md:inline font-mono text-[15px] text-ink-muted w-[7em] text-right shrink-0">
                  {applianceLabel(recipe.appliance)}
                </span>
                <span className="font-mono text-[17px] font-bold w-[4.5em] text-right shrink-0">
                  {recipe.totalMinutes} min
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Print this category */}
      {recipes.length > 0 && (
        <aside className="mt-10 border border-ink p-5 sm:p-7 flex flex-wrap items-center justify-between gap-6">
          <div className="min-w-0">
            <h3 className="text-[22px] font-bold tracking-[-0.01em]">Print this category</h3>
            <p className="mt-1.5 text-[17px] text-ink-muted">
              {packIsCapped
                ? `The first ${PACK_MAX} of ${recipes.length} as PDF fridge cards, one recipe per page. No signup.`
                : `All ${recipes.length} as PDF fridge cards, one recipe per page. No signup.`}
            </p>
          </div>
          <Link
            href={packHref(packSlugs)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-[13px] bg-ink text-paper text-[16px] font-semibold hover:bg-accent transition-colors"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            Print / save as PDF
          </Link>
        </aside>
      )}
    </div>
  );
}
