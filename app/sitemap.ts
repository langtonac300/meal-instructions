import { MetadataRoute } from 'next';
import { RECIPES } from '@/data/recipes';
import { CATEGORIES } from '@/data/categories';
import { APPLIANCES } from '@/data/appliances';
import { COOK_TIME_DATASHEETS } from '@/data/cook-times';
import { getSiteUrl, absoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: absoluteUrl('/cheat-sheet'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/tools'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: absoluteUrl('/air-fryer-calculator'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/reheat'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/frozen-cook'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/dinner-sync'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/meat-math'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/internal-temp'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/salt-math'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/kid-split'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/troubleshoot'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/about'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: absoluteUrl('/llms.txt'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/llms-full.txt'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Category hubs
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: absoluteUrl(`/categories/${cat.slug}`),
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.85,
  }));

  // Appliance hubs
  const appliancePages: MetadataRoute.Sitemap = APPLIANCES.map((app) => ({
    url: absoluteUrl(`/appliances/${app.slug}`),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Parametric Charts
  const chartPages: MetadataRoute.Sitemap = APPLIANCES.map((app) => ({
    url: absoluteUrl(`/charts/${app.slug}`),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Parametric Cook-Time Datasheets (The SEO / LLM volume driver)
  const datasheetPages: MetadataRoute.Sitemap = COOK_TIME_DATASHEETS.map((sheet) => ({
    url: absoluteUrl(`/how-long/${sheet.appliance}/${sheet.foodSlug}`),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.95,
  }));

  // Quality-gated Recipe detail pages
  const recipePages: MetadataRoute.Sitemap = RECIPES.map((recipe) => ({
    url: absoluteUrl(`/recipes/${recipe.slug}`),
    lastModified: new Date(recipe.lastUpdated),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...appliancePages,
    ...chartPages,
    ...datasheetPages,
    ...recipePages,
  ];
}
