# Auth + saved-meals setup

One-time setup to make Gmail login and per-user meals work in dev and prod.

## 1. Environment variables

Copy `.env.example` to `.env.local` and fill in the four blanks:

- `AUTH_SECRET` — `openssl rand -base64 32`
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` — from Google Cloud Console (see §2)
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase dashboard → **red-flag-agency** → Project Settings → API → *service_role* secret

`SUPABASE_URL` is already pinned to the red-flag-agency project.

## 2. Google OAuth client (5 min)

1. https://console.cloud.google.com/apis/credentials
2. **Configure consent screen** if you haven't. External + your Gmail as a test user is fine while
   the app is unverified. Only ask for `openid`, `email`, `profile`.
3. **Create Credentials → OAuth client ID → Web application**.
4. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://www.mealinstructions.com/api/auth/callback/google` (prod)
   - any preview domain you want to test (add each Vercel preview URL individually)
5. Copy the client ID + secret into `.env.local` and into your Vercel project's env vars.

## 3. Verify it works

```bash
npm run dev
# open http://localhost:3000
# → click Sign in (top-right) → Google → back to the site
# → open any recipe → Save this meal, tap 5 stars, hit "Suggest an edit"
# → visit /account to see it all
```

## 4. Data model

Everything lives in the shared `red-flag-agency` Supabase project, prefixed `meals_`:

| Table | Purpose |
|---|---|
| `meals_users` | one row per Gmail sign-in (email, name, avatar, google_sub) |
| `meals_saved` | (user_id, recipe_slug) — what a user saved |
| `meals_ratings` | (user_id, recipe_slug, stars 1-5, review) |
| `meals_edit_suggestions` | text notes on what's wrong with a recipe, with a status column (open / reviewed / accepted / rejected) |

RLS is enabled on all four with zero policies — only the service-role key (used by
`app/api/meals/*` route handlers behind NextAuth) can read or write.

## 5. Reading suggestions

Until there's an admin UI, review incoming edit suggestions in Supabase's Table Editor:

```sql
select s.created_at, u.email, s.recipe_slug, s.body, s.status
  from meals_edit_suggestions s
  join meals_users u on u.id = s.user_id
 where s.status = 'open'
 order by s.created_at desc;
```
