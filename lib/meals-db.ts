import { supabaseAdmin } from './supabase-admin';

export interface MealsUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  /** First sign-in. Set by the column default, never rewritten by the upsert. */
  created_at: string;
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
    .select('id, email, name, image, created_at')
    .single();
  if (error) throw error;
  return data as MealsUser;
}

export async function getUserByEmail(email: string): Promise<MealsUser | null> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from('meals_users')
    .select('id, email, name, image, created_at')
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
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });
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

export interface ProfileRow {
  appliances: string[];
  adults: number;
  kids: number;
  kid_ages: number[];
  avoid: string[];
  spice: 'mild' | 'medium' | 'hot';
  max_weeknight_minutes: number | null;
  updated_at: string;
}

export async function getProfile(userId: string): Promise<ProfileRow | null> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from('meals_profiles')
    .select('appliances, adults, kids, kid_ages, avoid, spice, max_weeknight_minutes, updated_at')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return (data as ProfileRow | null) ?? null;
}

export async function upsertProfile(
  userId: string,
  profile: Omit<ProfileRow, 'updated_at'>
): Promise<void> {
  const db = supabaseAdmin();
  const { error } = await db.from('meals_profiles').upsert(
    { user_id: userId, ...profile, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' }
  );
  if (error) throw error;
}

/**
 * Removes every row that belongs to a user, then the user. Order matters only
 * for foreign keys; the user row goes last. Called from /api/meals/delete
 * after the session is verified — the sign-in page promises this exists.
 */
export async function deleteUserData(userId: string): Promise<void> {
  const db = supabaseAdmin();
  // meals_plan_items has no user_id — it cascades from meals_plans.
  for (const table of [
    'meals_saved',
    'meals_ratings',
    'meals_edit_suggestions',
    'meals_profiles',
    'meals_plans',
    'meals_calendar_links',
  ]) {
    const { error } = await db.from(table).delete().eq('user_id', userId);
    if (error) throw error;
  }
  const { error } = await db.from('meals_users').delete().eq('id', userId);
  if (error) throw error;
}

// ─── Meal plans ───────────────────────────────────────────────────────────
//
// One live plan per user. "Plan my next X dinners" is a thing you have, not a
// thing you collect: a second plan would only ever compete with the first for
// the same nights on the same calendar.

export interface PlanItemRow {
  recipe_slug: string;
  cook_date: string;
  dinner_time: string | null;
  google_event_id: string | null;
}

export interface PlanRow {
  id: string;
  dinner_time: string;
  time_zone: string;
  updated_at: string;
  items: PlanItemRow[];
}

const PLAN_ITEM_COLUMNS = 'recipe_slug, cook_date, dinner_time, google_event_id';

export async function getLatestPlan(userId: string): Promise<PlanRow | null> {
  const db = supabaseAdmin();
  const { data: plan, error } = await db
    .from('meals_plans')
    .select('id, dinner_time, time_zone, updated_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  if (!plan) return null;

  const { data: items, error: itemsError } = await db
    .from('meals_plan_items')
    .select(PLAN_ITEM_COLUMNS)
    .eq('plan_id', (plan as { id: string }).id)
    .order('cook_date', { ascending: true });
  if (itemsError) throw itemsError;

  return { ...(plan as Omit<PlanRow, 'items'>), items: (items as PlanItemRow[]) ?? [] };
}

export interface SavePlanInput {
  dinnerTime: string;
  timeZone: string;
  items: Array<{ recipeSlug: string; cookDate: string; dinnerTime: string | null }>;
}

export interface SavePlanResult {
  plan: PlanRow;
  /**
   * Events for nights the user dropped. Already gone from the database; the
   * caller deletes them from Google, because a plan row is not what the user
   * sees — the calendar entry is, and a stale one is worse than none.
   */
  orphanedEventIds: string[];
}

/**
 * Replaces the user's plan wholesale.
 *
 * Google event ids are carried across by date, not by recipe: swapping
 * Wednesday's meal should patch Wednesday's existing event, not delete it and
 * insert a second one the user has to notice and clean up.
 */
export async function savePlan(userId: string, input: SavePlanInput): Promise<SavePlanResult> {
  const db = supabaseAdmin();
  const now = new Date().toISOString();

  const existing = await getLatestPlan(userId);

  let planId: string;
  if (existing) {
    planId = existing.id;
    const { error } = await db
      .from('meals_plans')
      .update({ dinner_time: input.dinnerTime, time_zone: input.timeZone, updated_at: now })
      .eq('id', planId);
    if (error) throw error;
  } else {
    const { data, error } = await db
      .from('meals_plans')
      .insert({
        user_id: userId,
        dinner_time: input.dinnerTime,
        time_zone: input.timeZone,
        updated_at: now,
      })
      .select('id')
      .single();
    if (error) throw error;
    planId = (data as { id: string }).id;
  }

  const eventIdByDate = new Map<string, string>();
  for (const item of existing?.items ?? []) {
    if (item.google_event_id) eventIdByDate.set(item.cook_date, item.google_event_id);
  }

  const keptDates = new Set(input.items.map((i) => i.cookDate));
  const orphanedEventIds = [...eventIdByDate.entries()]
    .filter(([date]) => !keptDates.has(date))
    .map(([, eventId]) => eventId);

  // Replace rather than diff: the item set is at most MAX_PLAN_ITEMS rows, and
  // a delete-then-insert cannot drift out of sync with the input the way an
  // incremental reconciliation can.
  const { error: deleteError } = await db.from('meals_plan_items').delete().eq('plan_id', planId);
  if (deleteError) throw deleteError;

  if (input.items.length > 0) {
    const { error: insertError } = await db.from('meals_plan_items').insert(
      input.items.map((item) => ({
        plan_id: planId,
        recipe_slug: item.recipeSlug,
        cook_date: item.cookDate,
        dinner_time: item.dinnerTime,
        google_event_id: eventIdByDate.get(item.cookDate) ?? null,
      })),
    );
    if (insertError) throw insertError;
  }

  const plan = await getLatestPlan(userId);
  if (!plan) throw new Error('plan vanished immediately after write');
  return { plan, orphanedEventIds };
}

/** Records the event a night was written to, so a re-sync patches it in place. */
export async function setPlanItemEventId(
  planId: string,
  cookDate: string,
  eventId: string | null,
): Promise<void> {
  const db = supabaseAdmin();
  const { error } = await db
    .from('meals_plan_items')
    .update({ google_event_id: eventId })
    .eq('plan_id', planId)
    .eq('cook_date', cookDate);
  if (error) throw error;
}

export async function getCalendarId(userId: string): Promise<string | null> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from('meals_calendar_links')
    .select('google_calendar_id')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return (data as { google_calendar_id: string } | null)?.google_calendar_id ?? null;
}

export async function setCalendarId(userId: string, calendarId: string): Promise<void> {
  const db = supabaseAdmin();
  const { error } = await db
    .from('meals_calendar_links')
    .upsert({ user_id: userId, google_calendar_id: calendarId }, { onConflict: 'user_id' });
  if (error) throw error;
}

/**
 * Forgets the app-created calendar and every event id pointing into it. Called
 * when Google says the calendar is gone: the ids are now meaningless, and
 * patching against them would 404 every night forever.
 */
export async function clearCalendarLink(userId: string): Promise<void> {
  const db = supabaseAdmin();
  const { error } = await db.from('meals_calendar_links').delete().eq('user_id', userId);
  if (error) throw error;

  const plan = await getLatestPlan(userId);
  if (!plan) return;
  const { error: itemsError } = await db
    .from('meals_plan_items')
    .update({ google_event_id: null })
    .eq('plan_id', plan.id);
  if (itemsError) throw itemsError;
}
