import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { auth } from '@/auth';
import {
  getUserByEmail,
  listSaved,
  listRatingsForUser,
  listSuggestionsForUser,
} from '@/lib/meals-db';
import { getRecipeBySlug } from '@/data/recipes';
import { mealsConfigured } from '@/lib/supabase-admin';

export const metadata: Metadata = {
  title: 'Your account',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  if (!mealsConfigured()) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-8 py-16 space-y-3 text-center">
        <div className="font-mono text-[11px] uppercase tracking-wider text-ink-subtle">Account</div>
        <h1 className="text-2xl font-bold text-ink">Saved meals aren&apos;t enabled yet</h1>
        <p className="text-sm text-ink-muted">
          Sign-in works, but saving, rating, and edit suggestions need the meals database
          connected. See SETUP-AUTH.md.
        </p>
        <Link href="/" className="inline-block font-mono text-[11px] uppercase tracking-wider text-ink hover:opacity-70">
          Back to recipes
        </Link>
      </div>
    );
  }
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/account/sign-in?callbackUrl=/account');
  }
  const user = await getUserByEmail(session.user.email);
  if (!user) {
    // Sign-in callback should have upserted them; if we're here the DB is out of sync.
    redirect('/account/sign-in?callbackUrl=/account');
  }

  const [saved, ratings, suggestions] = await Promise.all([
    listSaved(user.id),
    listRatingsForUser(user.id),
    listSuggestionsForUser(user.id),
  ]);

  const ratingBySlug = new Map(ratings.map((r) => [r.recipe_slug, r]));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      <header className="space-y-2">
        <div className="font-mono text-[11px] uppercase tracking-wider text-ink-subtle">
          Account
        </div>
        <h1 className="text-3xl font-bold text-ink">{user.name ?? user.email}</h1>
        <div className="text-sm text-ink-muted">{user.email}</div>
      </header>

      <section>
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-ink-subtle mb-3">
          Saved meals ({saved.length})
        </h2>
        {saved.length === 0 ? (
          <p className="text-sm text-ink-muted">
            Nothing saved yet. Hit <em>Save this meal</em> on any recipe.
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {saved.map((row) => {
              const recipe = getRecipeBySlug(row.recipe_slug);
              const rating = ratingBySlug.get(row.recipe_slug);
              return (
                <li key={row.recipe_slug} className="hairline-border bg-paper-card p-4">
                  <Link
                    href={`/recipes/${row.recipe_slug}`}
                    className="block font-bold text-ink hover:opacity-70"
                  >
                    {recipe?.title ?? row.recipe_slug}
                  </Link>
                  {recipe && (
                    <div className="font-mono text-[10px] uppercase tracking-wider text-ink-subtle mt-1">
                      {recipe.appliance.replace('-', ' ')} · {recipe.totalMinutes}m
                    </div>
                  )}
                  {rating && (
                    <div className="mt-2 text-xs text-ink">
                      Your rating: {rating.stars}/5
                      {rating.review ? <span className="text-ink-muted"> — “{rating.review}”</span> : null}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-ink-subtle mb-3">
          Your ratings ({ratings.length})
        </h2>
        {ratings.length === 0 ? (
          <p className="text-sm text-ink-muted">No ratings yet.</p>
        ) : (
          <ul className="space-y-2">
            {ratings.map((r) => {
              const recipe = getRecipeBySlug(r.recipe_slug);
              return (
                <li key={r.recipe_slug} className="flex items-baseline gap-3 text-sm">
                  <span className="font-mono text-[11px] text-ink-subtle w-10">{r.stars}/5</span>
                  <Link href={`/recipes/${r.recipe_slug}`} className="text-ink hover:opacity-70">
                    {recipe?.title ?? r.recipe_slug}
                  </Link>
                  {r.review && <span className="text-ink-muted">— “{r.review}”</span>}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-ink-subtle mb-3">
          Your edit suggestions ({suggestions.length})
        </h2>
        {suggestions.length === 0 ? (
          <p className="text-sm text-ink-muted">
            Spot something wrong in a recipe? Use <em>Suggest an edit</em> on any recipe page.
          </p>
        ) : (
          <ul className="space-y-3">
            {suggestions.map((s) => {
              const recipe = getRecipeBySlug(s.recipe_slug);
              return (
                <li key={s.id} className="hairline-border bg-paper-card p-3">
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      href={`/recipes/${s.recipe_slug}`}
                      className="font-bold text-sm text-ink hover:opacity-70"
                    >
                      {recipe?.title ?? s.recipe_slug}
                    </Link>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ink-subtle">
                      {s.status}
                    </span>
                  </div>
                  <p className="text-sm text-ink mt-2 whitespace-pre-wrap">{s.body}</p>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
