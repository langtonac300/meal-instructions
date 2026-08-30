import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/current-user';
import { createEditSuggestion } from '@/lib/meals-db';
import { getRecipeBySlug } from '@/data/recipes';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'signin_required' }, { status: 401 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  const { slug, body: text } = (body ?? {}) as { slug?: string; body?: string };

  if (typeof slug !== 'string' || !slug) {
    return NextResponse.json({ error: 'slug_required' }, { status: 400 });
  }
  if (typeof text !== 'string' || !text.trim()) {
    return NextResponse.json({ error: 'body_required' }, { status: 400 });
  }
  if (text.length > 4000) {
    return NextResponse.json({ error: 'body_too_long' }, { status: 400 });
  }
  if (!getRecipeBySlug(slug)) {
    return NextResponse.json({ error: 'unknown_recipe' }, { status: 404 });
  }

  const created = await createEditSuggestion(user.id, slug, text);
  return NextResponse.json({ ok: true, suggestion: created });
}
