import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RECIPES, getRecipeBySlug } from '@/data/recipes';
import { COOK_TIME_DATASHEETS } from '@/data/cook-times';
import { generateRecipeSchema } from '@/lib/recipe-utils';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import { resolveRecipeImage, resolveRecipeImageAbsolute } from '@/lib/recipe-image';
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
      title: 'Recipe Not Found | Meal Instructions',
    };
  }

  const title = `${recipe.title} — ${recipe.cookTemp}, ${recipe.totalMinutes} min`;
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

  const resolvedImage = resolveRecipeImage(recipe.image);
  const resolvedImageAbs = resolveRecipeImageAbsolute(recipe.image);
  const schemaJsonLd = generateRecipeSchema(recipe, { imageUrl: resolvedImageAbs });
  const breadcrumbs = generateBreadcrumbSchema([
    { name: recipe.title, path: `/recipes/${recipe.slug}` },
  ]);
  const relatedDatasheets = COOK_TIME_DATASHEETS.filter(
    (d) => d.relatedRecipeSlug === recipe.slug
  );
  if (relatedDatasheets.length > 0) {
    schemaJsonLd.isBasedOn = relatedDatasheets.map((d) => ({
      '@type': 'WebPage',
      name: `${d.food} — Verified Cook-Time Datasheet`,
      url: absoluteUrl(`/how-long/${d.appliance}/${d.foodSlug}`),
    }));
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <RecipeClientView
        recipe={recipe}
        relatedDatasheets={relatedDatasheets}
        resolvedImage={resolvedImage}
      />
    </>
  );
}
