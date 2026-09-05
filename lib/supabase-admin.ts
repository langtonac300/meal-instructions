import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null = null;

/** True when both Supabase env vars are set. Mirrors the Kroger pattern
 *  (KROGER_CLIENT_ID): when unconfigured, meals features are hidden and
 *  route handlers answer 503 rather than throwing a 500 or — worse —
 *  breaking Google sign-in, which works independently of Supabase. */
export function mealsConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

// Server-only. Uses the service_role key, which bypasses RLS.
// All meals_* tables have RLS enabled with zero policies so nothing
// but this client (used from route handlers behind NextAuth) can
// touch user data.
export function supabaseAdmin(): SupabaseClient {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. See SETUP-AUTH.md.'
    );
  }
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
