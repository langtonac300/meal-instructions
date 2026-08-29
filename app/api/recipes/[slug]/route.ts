import { NextRequest, NextResponse } from 'next/server';
import { getRecipeBySlug, formatRecipeToMarkdown } from '@/lib/recipe-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
  }

  // Check if caller wants markdown
  const acceptHeader = request.headers.get('accept') || '';
  const searchParams = request.nextUrl.searchParams;
  const format = searchParams.get('format');

  if (format === 'markdown' || format === 'md' || acceptHeader.includes('text/markdown')) {
    return new NextResponse(formatRecipeToMarkdown(recipe), {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
      },
    });
  }

  return NextResponse.json(recipe, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
