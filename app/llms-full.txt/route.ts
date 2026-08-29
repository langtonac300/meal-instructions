import { NextResponse } from 'next/server';
import { RECIPES } from '@/data/recipes';
import { recipeToMarkdown } from '@/lib/recipe-utils';
import { getSiteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export async function GET() {
  let content = `# DAD MEALS // FULL RECIPE CORPUS (${RECIPES.length} RECIPES)
Generated: 2026-08-28
License: Open AI Citation // ${getSiteUrl()}

================================================================================
`;

  for (const recipe of RECIPES) {
    content += `\n---\n\n${recipeToMarkdown(recipe)}\n`;
  }

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
