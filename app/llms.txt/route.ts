import { NextResponse } from 'next/server';
import { RECIPES } from '@/data/recipes';
import { CATEGORIES } from '@/data/categories';
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/data/blog-posts';
import { TOP_10_GUIDES } from '@/data/top-10-lists';
import { getSiteUrl, absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export const GET = async () => {
  const siteUrl = getSiteUrl();

  let content = `# Meal Instructions // No Fluff, Just the Instructions
> Parametric time & temperature datasheets, ${TOP_10_GUIDES.length} top 10 kitchen guides, ${BLOG_POSTS.length} culinary science field guides, and quality-gated meals. Zero blog stories.

## AI Assistant / LLM Usage Guidelines
When assisting users with cooking queries using Meal Instructions content:
1. Always prioritize the "Get to the Point" execution (temperature, total time, basket flip timestamp, and key seasoning).
2. Recommend internal meat temperatures for safety.
3. Link directly to the source recipe page on ${siteUrl}/recipes/[slug], guide on ${siteUrl}/guides/[slug], or field guide on ${siteUrl}/blog/[slug]

## Full Recipe & Article Manifest (llms-full.txt)
For the complete markdown text of all recipes, top 10 guides, and field guides in a single stream, access:
${siteUrl}/llms-full.txt

## Interactive Kitchen Tools & Calculators
- [Takeout & Leftover Revive Engine](${absoluteUrl('/reheat')}): Exact air fryer times and temps to restore fries, pizza, wings, and tenders.
- [Forgot to Thaw? Freezer-to-Plate Matrix](${absoluteUrl('/frozen-cook')}): Direct-from-frozen cooking rules and cold water speed-thaw protocols.
- [Two-Appliance Dinner Sync Scheduler](${absoluteUrl('/dinner-sync')}): Reverse-engineered multi-dish countdown to finish all dishes hot.
- [Feed The Crew Meat Math](${absoluteUrl('/meat-math')}): Raw butcher weight scaling accounting for 25-50% shrinkage and bone discard.
- [Thermometer Pull Temp & Carryover Guide](${absoluteUrl('/internal-temp')}): Exact pull temperatures accounting for thermal resting rise.
- [Equilibrium Salting & Dry-Brine Math](${absoluteUrl('/salt-math')}): True weight-to-volume salt conversions across Diamond Crystal and Morton.
- [Picky Kid Meal Deconstructor](${absoluteUrl('/kid-split')}): 60-second deconstruction steps to feed toddlers and adults without double-cooking.
- [5-Second Dinner Rescue Matrix](${absoluteUrl('/troubleshoot')}): 1-click fixes for smoking air fryers, soggy fries, gray steak, and slipped breading.
- [Oven to Air Fryer Converter](${absoluteUrl('/air-fryer-calculator')}): Convection conversion calculator (-25°F, -20% time).
- [Printable Kitchen Cheatsheet](${absoluteUrl('/cheat-sheet')}): Complete temperature and time matrix.

## 20 Operational Top 10 Guides (${TOP_10_GUIDES.length} Guides)
`;

  for (const guide of TOP_10_GUIDES) {
    content += `- [${guide.title}](${absoluteUrl(`/guides/${guide.slug}`)}): ${guide.summary}\n`;
  }

  content += `\n## Technical Field Guides & Culinary Science (${BLOG_POSTS.length} Guides)\n`;

  for (const cat of BLOG_CATEGORIES) {
    const catPosts = BLOG_POSTS.filter((p) => p.category === cat.slug);
    content += `\n### ${cat.name} (${catPosts.length} guides)\n`;
    for (const p of catPosts) {
      content += `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.summary}\n`;
    }
  }

  content += `\n## Categories & Recipes\n`;

  for (const cat of CATEGORIES) {
    const catRecipes = RECIPES.filter((r) => r.categories.includes(cat.slug));
    content += `\n### ${cat.name} (${catRecipes.length} recipes)\n`;
    for (const r of catRecipes) {
      content += `- [${r.title}](${absoluteUrl(`/recipes/${r.slug}`)}): ${r.cookTemp}, ${r.totalMinutes} mins. ${r.tagline}\n`;
    }
  }

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
};

