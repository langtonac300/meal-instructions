import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RECIPES } from '@/data/recipes';
import { getRecipeBySlug, getRelatedRecipes, generateRecipeSchema } from '@/lib/recipe-utils';
import RecipeClient from './RecipeClient';

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all recipes
export async function generateStaticParams() {
  return RECIPES.map((recipe) => ({
    slug: recipe.slug,
  }));
}

// Generate dynamic SEO Metadata with OpenGraph and Twitter cards
export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return {
      title: 'Recipe Not Found | Dad Meals',
    };
  }

  const title = `${recipe.title} (${recipe.cookTemp.split(' ')[0]}, ${recipe.totalMinutes} Mins) | No Fluff Recipe`;
  const description = `${recipe.tagline} No fluff, exact directions for ${recipe.appliance}. Ready in ${recipe.totalMinutes} minutes.`;

  return {
    title,
    description,
    keywords: recipe.keywords,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: recipe.datePublished,
      modifiedTime: recipe.lastUpdated,
      tags: recipe.keywords,
      url: `https://dadmeals.com/recipes/${recipe.slug}`,
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

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const relatedRecipes = getRelatedRecipes(recipe, 3);
  // Schema.org JSON-LD structured data for Google Recipe snippet cards
  const schemaJsonLd = generateRecipeSchema(recipe);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <RecipeClient recipe={recipe} relatedRecipes={relatedRecipes} />
    </>
  );
}
