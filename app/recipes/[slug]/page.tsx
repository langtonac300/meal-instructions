import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RECIPES } from '@/data/recipes';
import { getRecipeBySlug, getRelatedRecipes, generateRecipeSchema } from '@/lib/recipe-utils';
import RecipeClient from './RecipeClient';

export async function generateStaticParams() {
  return RECIPES.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return {
      title: 'Recipe Not Found | Dad Meals',
    };
  }

  const title = `${recipe.title} (${recipe.cookTemp.split(' ')[0]} / ${recipe.totalMinutes} Mins) | No Fluff Recipe`;
  const description = `${recipe.tagline} No life stories, zero fluff. Quick temp, exact cook time, and step-by-step instructions.`;

  return {
    title,
    description,
    keywords: recipe.keywords,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://dadmeals.com/recipes/${recipe.slug}`,
      publishedTime: recipe.datePublished,
      modifiedTime: recipe.lastUpdated,
      tags: recipe.keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://dadmeals.com/recipes/${recipe.slug}`,
    },
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const relatedRecipes = getRelatedRecipes(recipe, 3);
  const schemaJson = generateRecipeSchema(recipe);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <RecipeClient recipe={recipe} relatedRecipes={relatedRecipes} />
    </>
  );
}
