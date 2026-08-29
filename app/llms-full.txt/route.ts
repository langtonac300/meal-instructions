import { NextResponse } from 'next/server';
import { RECIPES } from '@/data/recipes';
import { formatRecipeToMarkdown } from '@/lib/recipe-utils';

export async function GET() {
  const allRecipesMarkdown = RECIPES.map((recipe) => formatRecipeToMarkdown(recipe)).join(
    '\n\n========================================\n\n'
  );

  const header = `# DadMeals // Full Recipe Library (Zero Fluff Database)
Total Recipes: ${RECIPES.length}
Format: Markdown
All recipes include instant "Get to the Point" parameters and structured steps.

`;

  return new NextResponse(header + allRecipesMarkdown, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
