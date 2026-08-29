import { Metadata } from 'next';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import { RECIPES } from '@/data/recipes';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  description:
    'Parametric cook-time database and 70 quality-gated weeknight recipes. Exact temperatures, verified air fryer datasheets, zero blog stories. No fluff, just the instructions.',
  alternates: {
    canonical: absoluteUrl('/'),
  },
};

export default function HomePage() {
  const breadcrumbs = generateBreadcrumbSchema([]);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Meal Instructions — No-Fluff Cooking Reference',
    description:
      'Parametric cook-time database and quality-gated weeknight meals with exact temperatures and zero blog stories.',
    url: absoluteUrl('/'),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: RECIPES.length,
      itemListElement: RECIPES.map((recipe, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: recipe.title,
        url: absoluteUrl(`/recipes/${recipe.slug}`),
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <HomePageClient />
    </>
  );
}
