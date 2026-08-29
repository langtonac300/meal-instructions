import { MetadataRoute } from 'next';
import { RECIPES } from '@/data/recipes';
import { CATEGORIES } from '@/data/categories';
import { APPLIANCES } from '@/data/appliances';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dadmeals.com';

  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cheat-sheet`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/llms-full.txt`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.85,
  }));

  // Appliance pages
  const appliancePages: MetadataRoute.Sitemap = APPLIANCES.map((app) => ({
    url: `${baseUrl}/appliances/${app.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // All 1,050 Recipe detail pages
  const recipePages: MetadataRoute.Sitemap = RECIPES.map((recipe) => ({
    url: `${baseUrl}/recipes/${recipe.slug}`,
    lastModified: new Date(recipe.lastUpdated),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticPages, ...categoryPages, ...appliancePages, ...recipePages];
}
