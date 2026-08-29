import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { getRecipesByCategory } from '@/data/recipes';
import { absoluteUrl } from '@/lib/site';

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
    return { title: 'Category Not Found | Dad Meals' };
  }

  const count = getRecipesByCategory(category).length;
  const title = `${catMeta.name} (${count} No-Fluff Dad Recipes)`;
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const catMeta = CATEGORIES.find((c) => c.slug === category);

  if (!catMeta) {
    notFound();
  }

  const recipes = getRecipesByCategory(category);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Recipes</span>
        </Link>
        <span className="uppercase text-ink-muted">
          CATEGORY ARCHIVE // {catMeta.slug}
        </span>
      </div>

      {/* Category Hero */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-4">
        <div className="flex items-center gap-3 font-mono text-xs text-accent font-bold uppercase">
          <span>{catMeta.heroTag}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          {catMeta.name}
        </h1>

        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans leading-relaxed">
          {catMeta.fullDescription}
        </p>

        <div className="hairline-t pt-4 flex items-center gap-6 font-mono text-xs text-ink-muted">
          <span>{recipes.length} CURATED RECIPES</span>
          <span>•</span>
          <span>AVERAGE COOK TIME: 12 MINS</span>
        </div>
      </section>

      {/* Recipe Index Table */}
      <section className="bg-paper-card hairline-border overflow-x-auto">
        <table className="w-full text-left font-mono text-xs divide-y divide-hairline">
          <thead className="bg-paper uppercase text-[10px] tracking-wider text-ink-subtle">
            <tr>
              <th className="py-3 px-4 w-16">ID</th>
              <th className="py-3 px-4">Recipe Title & Execution</th>
              <th className="py-3 px-4 w-32 hidden md:table-cell">Appliance</th>
              <th className="py-3 px-4 w-28 hidden sm:table-cell">Total Time</th>
              <th className="py-3 px-4 w-28 hidden lg:table-cell">Protein</th>
              <th className="py-3 px-4 w-24 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {recipes.map((recipe) => (
              <tr
                key={recipe.id}
                className="hover:bg-paper-subtle/50 transition-colors group cursor-pointer"
              >
                <td className="py-3.5 px-4 font-bold text-ink-subtle">
                  #{recipe.id}
                </td>
                <td className="py-3.5 px-4">
                  <Link
                    href={`/recipes/${recipe.slug}`}
                    className="block group-hover:text-accent transition-colors"
                  >
                    <div className="font-bold text-sm text-ink font-sans">
                      {recipe.title}
                    </div>
                    <div className="text-xs text-ink-muted font-sans line-clamp-1 mt-0.5">
                      {recipe.tagline}
                    </div>
                  </Link>
                </td>
                <td className="py-3.5 px-4 hidden md:table-cell uppercase text-ink-muted">
                  <span className="px-2 py-0.5 bg-paper hairline-border inline-block">
                    {recipe.appliance}
                  </span>
                </td>
                <td className="py-3.5 px-4 hidden sm:table-cell font-bold text-ink">
                  {recipe.totalMinutes} MINS
                </td>
                <td className="py-3.5 px-4 hidden lg:table-cell uppercase text-ink-muted">
                  {recipe.protein}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/recipes/${recipe.slug}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-paper hairline-border group-hover:bg-ink group-hover:text-paper uppercase transition-colors"
                  >
                    <span>COOK</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
