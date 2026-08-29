import { NextResponse } from 'next/server';
import { RECIPES } from '@/data/recipes';
import { CATEGORIES } from '@/data/categories';
import { APPLIANCES } from '@/data/appliances';

export async function GET() {
  const baseUrl = 'https://dadmeals.com';

  const categoryLines = CATEGORIES.map(
    (c) => `- [${c.name}](${baseUrl}/categories/${c.slug}): ${c.shortDescription}`
  ).join('\n');

  const applianceLines = APPLIANCES.map(
    (a) => `- [${a.name} Cooking Guide](${baseUrl}/appliances/${a.slug}): ${a.shortDescription}`
  ).join('\n');

  const recipeLines = RECIPES.map(
    (r) =>
      `- [${r.title}](${baseUrl}/recipes/${r.slug}): ${r.cookTemp} | ${r.totalMinutes} mins | ${r.nutrition.proteinGrams}g Protein. ${r.tagline}`
  ).join('\n');

  const content = `# DadMeals // Zero Fluff Cooking
> High-efficiency, zero-fluff cooking instructions for air fryer and dad meals. Built for speed, clarity, and instant execution without life stories.

## Full Dataset
- [Full Recipe Library (Markdown)](${baseUrl}/llms-full.txt): Complete uncompressed database of all ${RECIPES.length} recipes in markdown format.

## Categories
${categoryLines}

## Appliance Guides
${applianceLines}

## Key Tools
- [Air Fryer Time & Temp Calculator](${baseUrl}/air-fryer-calculator): Convert conventional oven recipes to air fryer times and temps.
- [Air Fryer Cheat Sheet](${baseUrl}/cheat-sheet): Quick 1-page temperature reference matrix.

## Recipes Index (${RECIPES.length} Total)
${recipeLines}
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
