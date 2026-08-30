import { supabaseAdmin } from './supabase-admin';

export interface MealsUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
}

export interface SavedMealRow {
  recipe_slug: string;
  created_at: string;
}

export interface RatingRow {
  recipe_slug: string;
  stars: number;
  review: string | null;
  updated_at: string;
}

export interface EditSuggestionRow {
  id: string;
  recipe_slug: string;
  body: string;
  status: 'open' | 'reviewed' | 'accepted' | 'rejected';
  created_at: string;
}

// Called from the NextAuth signIn callback. Idempotent by email.
export async function upsertMealsUser(input: {
  email: string;
  name: string | null;
  image: string | null;
  googleSub: string;
}): Promise<MealsUser> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from('meals_users')
    .upsert(
      {
        email: input.email,
        name: input.name,
        image: input.image,
        google_sub: input.googleSub,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'email' }
    )
    .select('id, email, name, image')
    .single();
  if (error) throw error;
  return data as MealsUser;
}

export async function getUserByEmail(email: string): Promise<MealsUser | null> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from('meals_users')
    .select('id, email, name, image')
    .eq('email', email)
    .maybeSingle();
  if (error) throw error;
  return (data as MealsUser | null) ?? null;
}

export async function setSaved(userId: string, recipeSlug: string, saved: boolean) {
  const db = supabaseAdmin();
  if (saved) {
    const { error } = await db
      .from('meals_saved')
      .upsert({ user_id: userId, recipe_slug: recipeSlug }, { onConflict: 'user_id,recipe_slug' });
    if (error) throw error;
  } else {
    const { error } = await db
      .from('meals_saved')
      .delete()
      .eq('user_id', userId)
      .eq('recipe_slug', recipeSlug);
    if (error) throw error;
  }
}

export async function listSaved(userId: string): Promise<SavedMealRow[]> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from('meals_saved')
    .select('recipe_slug, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as SavedMealRow[]) ?? [];
}

export async function upsertRating(
  userId: string,
  recipeSlug: string,
  stars: number,
  review: string | null
) {
  if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
    throw new Error('stars must be an integer 1..5');
  }
  const db = supabaseAdmin();
  const { error } = await db.from('meals_ratings').upsert(
    {
      user_id: userId,
      recipe_slug: recipeSlug,
      stars,
      review,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,recipe_slug' }
  );
  if (error) throw error;
}

export async function getRating(userId: string, recipeSlug: string): Promise<RatingRow | null> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from('meals_ratings')
    .select('recipe_slug, stars, review, updated_at')
    .eq('user_id', userId)
    .eq('recipe_slug', recipeSlug)
    .maybeSingle();
  if (error) throw error;
  return (data as RatingRow | null) ?? null;
}

export async function listRatingsForUser(userId: string): Promise<RatingRow[]> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from('meals_ratings')
    .select('recipe_slug, stars, review, updated_at')
    .eq('user_id', userId);
  if (error) throw error;
  return (data as RatingRow[]) ?? [];
}

export async function isSaved(userId: string, recipeSlug: string): Promise<boolean> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from('meals_saved')
    .select('recipe_slug')
    .eq('user_id', userId)
    .eq('recipe_slug', recipeSlug)
    .maybeSingle();
  if (error) throw error;
  return !!data;
}

export async function createEditSuggestion(
  userId: string,
  recipeSlug: string,
  body: string
): Promise<EditSuggestionRow> {
  const trimmed = body.trim();
  if (trimmed.length === 0) throw new Error('suggestion body is empty');
  if (trimmed.length > 4000) throw new Error('suggestion body too long');
  const db = supabaseAdmin();
  const { data, error } = await db
    .from('meals_edit_suggestions')
    .insert({ user_id: userId, recipe_slug: recipeSlug, body: trimmed })
    .select('id, recipe_slug, body, status, created_at')
    .single();
  if (error) throw error;
  return data as EditSuggestionRow;
}

export async function listSuggestionsForUser(userId: string): Promise<EditSuggestionRow[]> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from('meals_edit_suggestions')
    .select('id, recipe_slug, body, status, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as EditSuggestionRow[]) ?? [];
}
