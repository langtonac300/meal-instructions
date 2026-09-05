import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/current-user';
import { mealsConfigured } from '@/lib/supabase-admin';
import { deleteUserData } from '@/lib/meals-db';

export const runtime = 'nodejs';

// Deletes the signed-in user's account: saved meals, ratings, edit
// suggestions, kitchen profile, and the user row itself. The caller signs
// the session out afterwards; the local kitchen profile is cleared client-side.
export async function POST() {
  if (!mealsConfigured()) {
    return NextResponse.json({ error: 'meals_not_configured' }, { status: 503 });
  }
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  await deleteUserData(user.id);
  return NextResponse.json({ deleted: true });
}
