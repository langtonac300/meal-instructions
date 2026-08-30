import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/current-user';
import { upsertRating } from '@/lib/meals-db';
import { getRecipeBySlug } from '@/data/recipes';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'signin_required' }, { status: 401 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  const { slug, stars, review } = (body ?? {}) as {
    slug?: string;
    stars?: number;
    review?: string | null;
  };

  if (typeof slug !== 'string' || !slug) {
    return NextResponse.json({ error: 'slug_required' }, { status: 400 });
  }
  if (!Number.isInteger(stars) || (stars as number) < 1 || (stars as number) > 5) {
    return NextResponse.json({ error: 'stars_1_to_5' }, { status: 400 });
  }
  if (!getRecipeBySlug(slug)) {
    return NextResponse.json({ error: 'unknown_recipe' }, { status: 404 });
  }
  const reviewTrimmed =
    typeof review === 'string' ? (review.length > 2000 ? review.slice(0, 2000) : review) : null;

  await upsertRating(user.id, slug, stars as number, reviewTrimmed);
  return NextResponse.json({ ok: true, slug, stars, review: reviewTrimmed });
}
