import { NextRequest, NextResponse } from 'next/server';
import { getRecipeBySlug, recipeToMarkdown } from '@/lib/recipe-utils';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format');

  if (format === 'md' || format === 'markdown') {
    return new NextResponse(recipeToMarkdown(recipe), {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
      },
    });
  }

  return NextResponse.json(recipe);
}
