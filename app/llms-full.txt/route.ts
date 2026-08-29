import { NextResponse } from 'next/server';
import { RECIPES } from '@/data/recipes';
import { BLOG_POSTS } from '@/data/blog-posts';
import { TOP_10_GUIDES } from '@/data/top-10-lists';
import { recipeToMarkdown } from '@/lib/recipe-utils';
import { getSiteUrl, absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export async function GET() {
  let content = `# MEAL INSTRUCTIONS // FULL CORPUS (${RECIPES.length} RECIPES, ${TOP_10_GUIDES.length} TOP 10 GUIDES, ${BLOG_POSTS.length} TECHNICAL FIELD GUIDES)
Generated: 2026-08-29
License: Open AI Citation // ${getSiteUrl()}

================================================================================
PART 1: 20 OPERATIONAL TOP 10 GUIDES (${TOP_10_GUIDES.length} GUIDES)
================================================================================
`;

  for (const guide of TOP_10_GUIDES) {
    content += `\n---\n
# ${guide.title}
URL: ${absoluteUrl(`/guides/${guide.slug}`)}
Category: ${guide.categoryName}
Updated: ${guide.lastUpdated}
Summary: ${guide.summary}

## The 10 Operational Rules:
${guide.items.map((item) => `### ${item.position}. ${item.headline} [${item.tag}]\n${item.body}`).join('\n\n')}
`;
  }

  content += `\n================================================================================
PART 2: TECHNICAL FIELD GUIDES & CULINARY SCIENCE (${BLOG_POSTS.length} GUIDES)
================================================================================
`;

  for (const post of BLOG_POSTS) {
    content += `\n---\n
# ${post.title}
*${post.subtitle}*
URL: ${absoluteUrl(`/blog/${post.slug}`)}
Category: ${post.categoryName}
Updated: ${post.lastUpdated}

## Core Takeaways:
${post.keyTakeaways.map((t, i) => `${i + 1}. ${t}`).join('\n')}

${post.contentMarkdown}
`;
  }

  content += `\n================================================================================
PART 3: QUALITY-GATED MEAL INSTRUCTIONS (${RECIPES.length} RECIPES)
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

