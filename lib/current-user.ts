import { auth } from '@/auth';
import { getUserByEmail, type MealsUser } from './meals-db';
import { mealsConfigured } from './supabase-admin';

// Returns the meals_users row for the currently signed-in visitor,
// or null if nobody's signed in. Never throws for missing session.
// Also null when Supabase is unconfigured, so every /api/meals/* route
// degrades to "signed out" instead of surfacing a 500.
export async function currentUser(): Promise<MealsUser | null> {
  if (!mealsConfigured()) return null;
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return null;
  return getUserByEmail(email);
}
