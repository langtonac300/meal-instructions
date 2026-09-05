import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/current-user';
import { mealsConfigured } from '@/lib/supabase-admin';
import { listSaved } from '@/lib/meals-db';

export const runtime = 'nodejs';

// The signed-in visitor's saved recipe slugs, newest first — what the print
// pack builder needs for its "Saved meals" preset. Signed out is a normal
// state here, not an error, so it answers 200 with signedIn: false.
export async function GET() {
  if (!mealsConfigured()) {
    return NextResponse.json({ error: 'meals_not_configured' }, { status: 503 });
  }
  const user = await currentUser();
  if (!user) return NextResponse.json({ signedIn: false, slugs: [] });

  const rows = await listSaved(user.id);
  return NextResponse.json({ signedIn: true, slugs: rows.map((row) => row.recipe_slug) });
}
