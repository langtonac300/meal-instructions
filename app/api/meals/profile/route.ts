import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/current-user';
import { getProfile, upsertProfile } from '@/lib/meals-db';
import { normalise, type KitchenProfile, type Avoidable } from '@/lib/profile';
import type { Appliance } from '@/lib/types';

// Signed-out visitors keep their profile in localStorage only. These routes
// return 204 rather than 401 for them: no profile on the server is a normal
// state, not an error, and the client already has what it needs.

export async function GET() {
  const user = await currentUser();
  if (!user) return new NextResponse(null, { status: 204 });

  try {
    const row = await getProfile(user.id);
    if (!row) return new NextResponse(null, { status: 204 });
    return NextResponse.json({
      appliances: row.appliances as Appliance[],
      adults: row.adults,
      kids: row.kids,
      kidAges: row.kid_ages,
      // The column is text[]; normalise() is the only place that decides what
      // counts as a valid avoid, so run the row back through it below.
      avoid: row.avoid as Avoidable[],
      spice: row.spice,
      maxWeeknightMinutes: row.max_weeknight_minutes,
      updatedAt: row.updated_at,
    } satisfies KitchenProfile);
  } catch {
    // Supabase unreachable or table missing — the local profile still works.
    return new NextResponse(null, { status: 204 });
  }
}

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) return new NextResponse(null, { status: 204 });

  const body = await request.json().catch(() => null);
  const profile = normalise(body);
  if (!profile) {
    return NextResponse.json({ error: 'Invalid profile' }, { status: 400 });
  }

  try {
    await upsertProfile(user.id, {
      appliances: profile.appliances,
      adults: profile.adults,
      kids: profile.kids,
      kid_ages: profile.kidAges,
      avoid: profile.avoid,
      spice: profile.spice,
      max_weeknight_minutes: profile.maxWeeknightMinutes,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Could not save profile' }, { status: 500 });
  }
}
