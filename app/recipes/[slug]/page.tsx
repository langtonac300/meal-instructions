import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RECIPES, getRecipeBySlug } from '@/data/recipes';
import { generateRecipeSchema } from '@/lib/recipe-utils';
import { absoluteUrl } from '@/lib/site';
import RecipeClientView from './RecipeClientView';

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return RECIPES.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return {
      title: 'Recipe Not Found | Dad Meals',
    };
  }

  const title = `${recipe.title} (${recipe.cookTemp}, ${recipe.totalMinutes} Mins)`;
  const description = `${recipe.tagline} No fluff, exact directions for ${recipe.appliance}. Ready in ${recipe.totalMinutes} minutes.`;

  return {
    title,
    description,
    keywords: recipe.keywords,
    alternates: {
      canonical: absoluteUrl(`/recipes/${recipe.slug}`),
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: recipe.datePublished,
      modifiedTime: recipe.lastUpdated,
      tags: recipe.keywords,
      url: absoluteUrl(`/recipes/${recipe.slug}`),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const schemaJsonLd = generateRecipeSchema(recipe);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <RecipeClientView recipe={recipe} />
    </>
  );
}
