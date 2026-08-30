import { auth } from '@/auth';
import { getUserByEmail, type MealsUser } from './meals-db';

// Returns the meals_users row for the currently signed-in visitor,
// or null if nobody's signed in. Never throws for missing session.
export async function currentUser(): Promise<MealsUser | null> {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return null;
  return getUserByEmail(email);
}
