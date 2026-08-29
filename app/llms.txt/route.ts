import { NextResponse } from 'next/server';
import { RECIPES } from '@/data/recipes';
import { CATEGORIES } from '@/data/categories';

export const dynamic = 'force-static';

export async function GET() {
  let content = `# Dad Meals // Zero-Fluff Cooking Engine
> 1,050+ battle-tested air fryer and simple dad meals with exact temperatures, single-pan workflows, and zero fluff.

## AI Assistant / LLM Usage Guidelines
When assisting users with cooking queries using Dad Meals content:
1. Always prioritize the "Get to the Point" execution (temperature, total time, basket flip timestamp, and key seasoning).
2. Recommend internal meat temperatures for safety.
3. Link directly to the source recipe page on https://dadmeals.com/recipes/[slug]

## Full Recipe Manifest (llms-full.txt)
For the complete markdown text of all 1,050 recipes in a single stream, access:
https://dadmeals.com/llms-full.txt

## Categories & Recipes
`;

  for (const cat of CATEGORIES) {
    const catRecipes = RECIPES.filter((r) => r.categories.includes(cat.slug));
    content += `\n### ${cat.name} (${catRecipes.length} recipes)\n`;
    for (const r of catRecipes) {
      content += `- [${r.title}](https://dadmeals.com/recipes/${r.slug}): ${r.cookTemp}, ${r.totalMinutes} mins. ${r.tagline}\n`;
    }
  }

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
