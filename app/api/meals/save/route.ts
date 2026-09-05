import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/current-user';
import { mealsConfigured } from '@/lib/supabase-admin';
import { setSaved } from '@/lib/meals-db';
import { getRecipeBySlug } from '@/data/recipes';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!mealsConfigured()) {
    return NextResponse.json({ error: 'meals_not_configured' }, { status: 503 });
  }
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'signin_required' }, { status: 401 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  const { slug, saved } = (body ?? {}) as { slug?: string; saved?: boolean };

  if (typeof slug !== 'string' || !slug) {
    return NextResponse.json({ error: 'slug_required' }, { status: 400 });
  }
  if (typeof saved !== 'boolean') {
    return NextResponse.json({ error: 'saved_boolean_required' }, { status: 400 });
  }
  if (!getRecipeBySlug(slug)) {
    return NextResponse.json({ error: 'unknown_recipe' }, { status: 404 });
  }

  await setSaved(user.id, slug, saved);
  return NextResponse.json({ ok: true, slug, saved });
}
