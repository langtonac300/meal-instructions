import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/current-user';
import { isSaved, getRating } from '@/lib/meals-db';

export const runtime = 'nodejs';

// Returns { signedIn, saved, rating } for one recipe so the MealActions
// component can render its initial state after mount without a page reload.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'slug_required' }, { status: 400 });

  const user = await currentUser();
  if (!user) return NextResponse.json({ signedIn: false, saved: false, rating: null });

  const [saved, rating] = await Promise.all([isSaved(user.id, slug), getRating(user.id, slug)]);
  return NextResponse.json({ signedIn: true, saved, rating });
}
