import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Zap, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { RECIPES } from '@/data/recipes';
import RecipeCard from '@/components/RecipeCard';

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);

  if (!cat) {
    return {
      title: 'Category Not Found | Dad Meals',
    };
  }

  const title = `${cat.name} // No Fluff Dad Recipes | Dad Meals`;
  const description = `${cat.fullDescription} 100% directions, zero life stories. Fast, family-approved meals.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://dadmeals.com/categories/${cat.slug}`,
    },
    alternates: {
      canonical: `https://dadmeals.com/categories/${cat.slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);

  if (!cat) {
    notFound();
  }

  const recipes = RECIPES.filter((r) => (r.categories as string[]).includes(category));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-ink-muted border-b border-hairline pb-3 mb-8">
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-accent transition-colors group"
        >
          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>BACK TO ALL MEALS</span>
        </Link>
        <span>CATEGORY INDEX</span>
      </div>

      {/* Hero Category Header */}
      <div className="border-b border-hairline pb-8 mb-10">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-paper-200 border border-hairline text-ink font-mono text-[10px] uppercase tracking-widest mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>{cat.heroTag}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-black text-ink uppercase tracking-tight">
          {cat.name}
        </h1>

        <p className="text-base sm:text-lg text-ink-muted font-sans max-w-3xl mt-3 leading-relaxed">
          {cat.fullDescription}
        </p>

        <div className="mt-4 font-mono text-xs text-accent font-bold">
          {recipes.length} BATTLE-TESTED RECIPES IN THIS HUB
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {/* Other Categories Strip */}
      <div className="mt-16 pt-8 border-t border-hairline">
        <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-ink-muted mb-4">
          EXPLORE OTHER RECIPE HUBS:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.filter((c) => c.slug !== category).map((otherCat) => (
            <Link
              key={otherCat.slug}
              href={`/categories/${otherCat.slug}`}
              className="p-3 bg-paper-100 hover:bg-paper-200 rounded border border-hairline text-ink transition-colors flex items-center justify-between group"
            >
              <span className="font-mono text-xs font-semibold group-hover:text-accent truncate">
                {otherCat.name}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-accent shrink-0 ml-1" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
