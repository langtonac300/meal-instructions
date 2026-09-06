import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import type { Metadata } from 'next';
import { CalendarPlus, Printer, Star } from 'lucide-react';
import { auth, signOut } from '@/auth';
import {
  getUserByEmail,
  listSaved,
  listRatingsForUser,
  listSuggestionsForUser,
  getProfile,
  getLatestPlan,
  type EditSuggestionRow,
} from '@/lib/meals-db';
import { getRecipeBySlug } from '@/data/recipes';
import { APPLIANCES } from '@/data/appliances';
import { mealsConfigured } from '@/lib/supabase-admin';
import { resolveRecipeImage } from '@/lib/recipe-image';
import { PACK_MAX, packHref } from '@/lib/print-pack-format';
import { COOKIE } from '@/lib/kroger/oauth';
import DeleteAccountButton from '@/components/DeleteAccountButton';

export const metadata: Metadata = {
  title: 'Your account',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{ saved?: string; activity?: string }>;
}

const SAVED_PREVIEW = 6;
const ACTIVITY_PREVIEW = 20;

const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-ink-subtle';
const SECTION_H2 = 'text-[28px] font-extrabold tracking-[-0.01em] uppercase leading-tight';
const RAIL_H3 = 'text-[20px] font-bold tracking-[-0.01em] leading-tight';

/** "29 Aug 2026" — fixed locale so the string is the same on every render. */
const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const monthYear = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

const titleOf = (slug: string) => getRecipeBySlug(slug)?.title ?? slug;

const STATUS_PILL: Record<EditSuggestionRow['status'], string> = {
  accepted: 'bg-ink text-paper',
  reviewed: 'bg-paper-200 text-ink border border-hairline',
  open: 'bg-paper-50 text-ink-muted border border-hairline',
  rejected: 'bg-paper-50 text-ink-muted border border-hairline',
};

function Stars({ stars }: { stars: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${stars} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`w-[15px] h-[15px] ${n <= stars ? 'fill-ink text-ink' : 'text-ink-subtle'}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

interface ActivityItem {
  key: string;
  at: string;
  node: React.ReactNode;
}

export default async function AccountPage({ searchParams }: Props) {
  if (!mealsConfigured()) {
    return (
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 py-16 text-ink">
        <h1 className="font-sans text-[34px] sm:text-[46px] font-black tracking-[-0.02em] leading-[1.05] uppercase">
          Saved meals aren&apos;t enabled yet
        </h1>
        <p className="mt-[18px] text-[19px] leading-[1.5] text-ink-muted max-w-[52ch]">
          Sign-in works, but saving, rating, and edit suggestions need the meals database
          connected. See SETUP-AUTH.md.
        </p>
        <Link href="/categories" className="inline-block mt-6 text-[16px] font-semibold hover:text-accent transition-colors">
          Browse recipes →
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

  // The kitchen profile is the one read that can fail independently of the
  // others (its table is newer and separately granted). A failure there must
  // degrade to "not set up", not take the whole dashboard down.
  const [saved, ratings, suggestions, profile, params] = await Promise.all([
    listSaved(user.id),
    listRatingsForUser(user.id),
    listSuggestionsForUser(user.id),
    getProfile(user.id).catch((err: unknown) => {
      console.error('[account] getProfile failed', err);
      return null;
    }),
    searchParams,
  ]);

  // Same posture as the profile read: the planner is newer than this page, and
  // a failure there must not take the dashboard down with it.
  const plan = await getLatestPlan(user.id).catch((err: unknown) => {
    console.error('[account] getLatestPlan failed', err);
    return null;
  });
  const plannedNights = plan?.items.length ?? 0;
  const nextNight = plan?.items.find((i) => i.cook_date >= new Date().toISOString().slice(0, 10));
  const nextRecipe = nextNight ? getRecipeBySlug(nextNight.recipe_slug) : undefined;

  const ratingBySlug = new Map(ratings.map((r) => [r.recipe_slug, r]));
  const reviews = ratings.filter((r) => r.review && r.review.trim().length > 0);
  const averageStars =
    ratings.length > 0
      ? (ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length).toFixed(1)
      : null;

  // Kroger connection state is the shopper's own token cookie, set by
  // /api/kroger/callback. No optimistic "Connected".
  const jar = await cookies();
  const krogerEnabled = Boolean(process.env.KROGER_CLIENT_ID);
  const krogerConnected = Boolean(jar.get(COOKIE.accessToken) || jar.get(COOKIE.refreshToken));

  async function disconnectKroger() {
    'use server';
    const store = await cookies();
    store.delete(COOKIE.accessToken);
    store.delete(COOKIE.refreshToken);
    revalidatePath('/account');
  }

  async function signOutAction() {
    'use server';
    await signOut({ redirectTo: '/' });
  }

  // ── Activity: derived from the four tables, newest first. Nothing stored. ──
  const activity: ActivityItem[] = [
    ...saved.map((row) => ({
      key: `saved-${row.recipe_slug}`,
      at: row.created_at,
      node: (
        <>
          Saved{' '}
          <Link href={`/recipes/${row.recipe_slug}`} className="font-semibold hover:text-accent transition-colors">
            {titleOf(row.recipe_slug)}
          </Link>
        </>
      ),
    })),
    ...ratings.map((r) => ({
      key: `rated-${r.recipe_slug}`,
      at: r.updated_at,
      node: (
        <>
          Rated{' '}
          <Link href={`/recipes/${r.recipe_slug}`} className="font-semibold hover:text-accent transition-colors">
            {titleOf(r.recipe_slug)}
          </Link>{' '}
          <span className="font-mono text-ink-muted">{r.stars}/5</span>
          {r.review ? ' and left a review' : ''}
        </>
      ),
    })),
    ...suggestions.map((s) => ({
      key: `suggested-${s.id}`,
      at: s.created_at,
      node: (
        <>
          Suggested an edit to{' '}
          <Link href={`/recipes/${s.recipe_slug}`} className="font-semibold hover:text-accent transition-colors">
            {titleOf(s.recipe_slug)}
          </Link>{' '}
          <span
            className={`font-mono text-[13px] uppercase tracking-[0.08em] font-bold ${
              s.status === 'accepted' ? 'text-accent' : 'text-ink-muted'
            }`}
          >
            {s.status}
          </span>
        </>
      ),
    })),
    ...(profile && profile.appliances.length > 0
      ? [
          {
            key: 'profile',
            at: profile.updated_at,
            node: (
              <>
                Set up your kitchen —{' '}
                <span className="font-mono text-ink-muted">{profile.appliances.length}</span>{' '}
                appliances, <span className="font-mono text-ink-muted">{profile.adults}</span> adults,{' '}
                <span className="font-mono text-ink-muted">{profile.kids}</span> kids
              </>
            ),
          },
        ]
      : []),
  ].sort((a, b) => (a.at < b.at ? 1 : a.at > b.at ? -1 : 0));

  const showAllSaved = params.saved === 'all';
  const showAllActivity = params.activity === 'all';
  const savedShown = showAllSaved ? saved : saved.slice(0, SAVED_PREVIEW);
  const activityShown = showAllActivity ? activity : activity.slice(0, ACTIVITY_PREVIEW);

  const suggestionCounts = {
    accepted: suggestions.filter((s) => s.status === 'accepted').length,
    reviewed: suggestions.filter((s) => s.status === 'reviewed').length,
    open: suggestions.filter((s) => s.status === 'open').length,
  };

  const stats = [
    { label: 'Saved meals', value: `${saved.length}` },
    { label: 'Rated', value: `${ratings.length}` },
    ...(averageStars !== null ? [{ label: 'Average you give', value: averageStars }] : []),
    { label: 'Edits suggested', value: `${suggestions.length}` },
  ];
  const statCols = stats.length === 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-3';

  const packSlugs = saved.slice(0, PACK_MAX).map((s) => s.recipe_slug);
  const kitchenConfigured = Boolean(profile && profile.appliances.length > 0);

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-10 text-ink">
      {/* ── Header ── */}
      <header className="pt-12 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="flex items-end gap-5 min-w-0">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt=""
              width={72}
              height={72}
              className="w-[72px] h-[72px] rounded-full shrink-0 bg-paper-300"
            />
          ) : (
            <span className="w-[72px] h-[72px] rounded-full shrink-0 bg-paper-300" aria-hidden="true" />
          )}
          <div className="min-w-0">
            <h1 className="font-sans text-[32px] sm:text-[42px] font-black tracking-[-0.02em] leading-[1.05] uppercase break-words">
              {user.name ?? user.email}
            </h1>
            <p className="mt-2 text-[16px] text-ink-muted">
              {user.email} · signed in with Google · member since {monthYear(user.created_at)}
            </p>
          </div>
        </div>
        <form action={signOutAction}>
          <button type="submit" className="text-[16px] text-ink-muted hover:text-ink transition-colors cursor-pointer">
            Sign out
          </button>
        </form>
      </header>

      {/* ── Stat strip ── */}
      <dl className={`mt-8 grid grid-cols-2 ${statCols} border-t border-b border-ink`}>
        {stats.map((cell, i) => {
          const last = i === stats.length - 1;
          return (
            <div
              key={cell.label}
              className={`py-5 px-5 border-hairline ${i === 0 ? 'pl-0' : ''} ${last ? 'sm:pr-0' : 'sm:border-r'} ${
                i % 2 === 0 && !last ? 'border-r' : ''
              } ${i % 2 === 1 ? 'sm:pl-5' : ''} ${i >= 2 ? 'border-t sm:border-t-0' : ''}`}
            >
              <dt className={EYEBROW}>{cell.label}</dt>
              <dd className="mt-2 font-mono text-[28px] sm:text-[36px] font-black tracking-[-0.02em] leading-none">
                {cell.value}
              </dd>
            </div>
          );
        })}
      </dl>

      {/* ── Body grid: rail first on phones, second on desktop ── */}
      <div className="pt-12 pb-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-14 items-start">
        <div className="order-2 lg:order-1 space-y-14 min-w-0">
          {/* Saved meals */}
          <section aria-labelledby="saved-heading">
            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
              <h2 id="saved-heading" className={SECTION_H2}>
                Saved meals
              </h2>
              {saved.length > 0 && (
                <Link
                  href={packHref(packSlugs)}
                  className="inline-flex items-center gap-2 text-[16px] font-semibold hover:text-accent transition-colors"
                >
                  <Printer className="w-4 h-4" aria-hidden="true" />
                  Print {packSlugs.length === saved.length ? `all ${saved.length}` : `${packSlugs.length} of ${saved.length}`} as a pack
                </Link>
              )}
            </div>
            {saved.length === 0 ? (
              <p className="text-[18px] text-ink-muted border-t border-ink pt-5">
                Nothing saved yet. Hit <em>Save this meal</em> on any recipe.
              </p>
            ) : (
              <>
                <ul className="border-t border-ink">
                  {savedShown.map((row) => {
                    const recipe = getRecipeBySlug(row.recipe_slug);
                    const rating = ratingBySlug.get(row.recipe_slug);
                    return (
                      <li
                        key={row.recipe_slug}
                        className="flex items-center gap-4 sm:gap-5 py-[18px] border-b border-hairline"
                      >
                        <Link
                          href={`/recipes/${row.recipe_slug}`}
                          className="relative w-16 h-11 sm:w-[88px] sm:h-[60px] shrink-0 bg-paper-200 overflow-hidden"
                          aria-hidden="true"
                          tabIndex={-1}
                        >
                          {recipe && (
                            <Image
                              src={resolveRecipeImage(recipe.image)}
                              alt=""
                              fill
                              sizes="88px"
                              className="object-cover"
                            />
                          )}
                        </Link>
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/recipes/${row.recipe_slug}`}
                            className="block text-[20px] font-bold leading-tight hover:text-accent transition-colors"
                          >
                            {recipe?.title ?? row.recipe_slug}
                          </Link>
                          {recipe && (
                            <p className="mt-1 font-mono text-[14px] text-ink-muted">
                              {recipe.appliance.replace(/-/g, ' ')} · {recipe.totalMinutes} min ·{' '}
                              {recipe.cookTemp}
                            </p>
                          )}
                          <div className="mt-1.5 sm:hidden">
                            {rating ? (
                              <Stars stars={rating.stars} />
                            ) : (
                              <span className="font-mono text-[14px] text-ink-subtle">Not rated</span>
                            )}
                          </div>
                        </div>
                        <div className="hidden sm:block shrink-0">
                          {rating ? (
                            <Stars stars={rating.stars} />
                          ) : (
                            <span className="font-mono text-[14px] text-ink-subtle">Not rated</span>
                          )}
                        </div>
                        <span className="font-mono text-[14px] text-ink-muted w-[6em] text-right shrink-0">
                          {shortDate(row.created_at)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                {!showAllSaved && saved.length > SAVED_PREVIEW && (
                  <Link
                    href="/account?saved=all#saved-heading"
                    className="inline-block mt-4 text-[16px] font-semibold hover:text-accent transition-colors"
                  >
                    See all {saved.length} saved meals →
                  </Link>
                )}
              </>
            )}
          </section>

          {/* Activity */}
          <section aria-labelledby="activity-heading">
            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
              <h2 id="activity-heading" className={SECTION_H2}>
                Activity
              </h2>
              <span className="text-[15px] text-ink-muted">Saves, ratings and suggestions, newest first</span>
            </div>
            {activity.length === 0 ? (
              <p className="text-[18px] text-ink-muted border-t border-ink pt-5">
                Nothing yet. Save, rate, or suggest an edit on any recipe and it shows up here.
              </p>
            ) : (
              <>
                <ul className="border-t border-ink">
                  {activityShown.map((item) => (
                    <li key={item.key} className="flex items-baseline gap-6 py-3.5 border-b border-hairline">
                      <span className="font-mono text-[14px] text-ink-subtle w-[5.5em] shrink-0">
                        {shortDate(item.at)}
                      </span>
                      <span className="text-[17px] min-w-0">{item.node}</span>
                    </li>
                  ))}
                </ul>
                {!showAllActivity && activity.length > ACTIVITY_PREVIEW && (
                  <Link
                    href="/account?activity=all#activity-heading"
                    className="inline-block mt-4 text-[16px] font-semibold hover:text-accent transition-colors"
                  >
                    See more →
                  </Link>
                )}
              </>
            )}
          </section>

          {/* Your reviews */}
          {reviews.length > 0 && (
            <section aria-labelledby="reviews-heading">
              <h2 id="reviews-heading" className={`${SECTION_H2} mb-4`}>
                Your reviews
              </h2>
              <ul className="border-t border-ink">
                {reviews.map((r) => (
                  <li key={r.recipe_slug} className="py-5 border-b border-hairline">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <Link
                        href={`/recipes/${r.recipe_slug}`}
                        className="text-[19px] font-bold leading-tight hover:text-accent transition-colors"
                      >
                        {titleOf(r.recipe_slug)}
                      </Link>
                      <span className="font-mono text-[15px] text-ink-muted">
                        {r.stars}/5 · {shortDate(r.updated_at)}
                      </span>
                    </div>
                    <p className="mt-2 text-[18px] leading-[1.6] text-ink-muted whitespace-pre-wrap">{r.review}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Your edit suggestions */}
          <section aria-labelledby="suggestions-heading">
            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
              <h2 id="suggestions-heading" className={SECTION_H2}>
                Your edit suggestions
              </h2>
              {suggestions.length > 0 && (
                <span className="text-[15px] text-ink-muted">
                  {suggestionCounts.accepted} accepted · {suggestionCounts.reviewed} reviewed ·{' '}
                  {suggestionCounts.open} open
                </span>
              )}
            </div>
            {suggestions.length === 0 ? (
              <p className="text-[18px] text-ink-muted border-t border-ink pt-5">
                Spot something wrong in a recipe? Use <em>Suggest an edit</em> on any recipe page.
              </p>
            ) : (
              <ul className="border-t border-ink">
                {suggestions.map((s) => (
                  <li key={s.id} className="py-5 border-b border-hairline">
                    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                      <Link
                        href={`/recipes/${s.recipe_slug}`}
                        className="text-[19px] font-bold leading-tight hover:text-accent transition-colors"
                      >
                        {titleOf(s.recipe_slug)}
                      </Link>
                      <span
                        className={`font-mono text-[12px] uppercase tracking-[0.1em] font-bold px-2.5 py-1 ${STATUS_PILL[s.status]}`}
                      >
                        {s.status}
                      </span>
                    </div>
                    <p className="mt-2 text-[18px] leading-[1.6] text-ink-muted whitespace-pre-wrap">{s.body}</p>
                    <p className="mt-2 font-mono text-[14px] text-ink-subtle">{shortDate(s.created_at)}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* ── Right rail ── */}
        <aside className="order-1 lg:order-2 space-y-6">
          {/* Your kitchen — read server-side from meals_profiles, so it is in the SSR HTML */}
          <div className="border border-ink p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[22px] font-extrabold tracking-[-0.01em] uppercase leading-tight">Your kitchen</h3>
              {kitchenConfigured && profile && (
                <span className="font-mono text-[13px] text-ink-subtle">{shortDate(profile.updated_at)}</span>
              )}
            </div>
            {kitchenConfigured && profile ? (
              <>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {profile.appliances.map((slug) => (
                    <li key={slug} className="px-3 py-[7px] bg-paper-50 border border-hairline text-[15px]">
                      {APPLIANCES.find((a) => a.slug === slug)?.name ?? slug}
                    </li>
                  ))}
                </ul>
                <dl className="mt-4 border-t border-hairline">
                  {[
                    {
                      label: 'Feeding',
                      value: `${profile.adults} adult${profile.adults === 1 ? '' : 's'}, ${profile.kids} kid${profile.kids === 1 ? '' : 's'}`,
                    },
                    { label: 'Avoiding', value: profile.avoid.length > 0 ? profile.avoid.join(', ') : 'Nothing' },
                    { label: 'Spice', value: profile.spice },
                    {
                      label: 'Weeknight limit',
                      value: profile.max_weeknight_minutes ? `${profile.max_weeknight_minutes} min` : 'No limit',
                    },
                  ].map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-4 py-2.5 border-b border-hairline text-[16px]">
                      <dt className="text-ink-muted">{row.label}</dt>
                      <dd className="font-semibold text-right capitalize">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-[15px] leading-[1.55] text-ink-muted">
                  Every cook-time chart and category puts your equipment first. Nothing is hidden — the
                  rest just sorts below.
                </p>
                <Link
                  href="/account/setup"
                  className="inline-block mt-4 px-[18px] py-[11px] bg-ink text-paper text-[15px] font-bold hover:bg-accent transition-colors"
                >
                  Edit kitchen
                </Link>
              </>
            ) : (
              <>
                <p className="mt-3 text-[17px] leading-[1.55] text-ink-muted">
                  You have not set up your kitchen yet. Tell us what you own and every cook-time chart and
                  recipe sorts to your equipment.
                </p>
                <Link
                  href="/account/setup"
                  className="inline-block mt-4 px-[18px] py-[11px] bg-ink text-paper text-[15px] font-bold hover:bg-accent transition-colors"
                >
                  Set up my kitchen
                </Link>
              </>
            )}
          </div>

          {/* Week planner */}
          <div className="bg-paper-50 border border-hairline p-6">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className={RAIL_H3}>Week planner</h3>
              <span className="font-mono text-[13px] uppercase tracking-[0.08em] font-bold text-ink-subtle">
                {plannedNights === 0 ? 'Empty' : `${plannedNights} night${plannedNights === 1 ? '' : 's'}`}
              </span>
            </div>
            <p className="mt-2 text-[16px] leading-[1.55] text-ink-muted">
              {nextNight && nextRecipe ? (
                <>
                  Next up: <strong className="font-semibold text-ink">{nextRecipe.title}</strong> on{' '}
                  {new Date(`${nextNight.cook_date}T12:00:00`).toLocaleDateString(undefined, {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                  })}
                  .
                </>
              ) : (
                <>
                  Pick the next few nights and push them to Google Calendar, each one carrying the
                  ingredients, the temperature, and the steps.
                </>
              )}
            </p>
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 mt-3 text-[16px] font-semibold hover:text-accent transition-colors"
            >
              <CalendarPlus className="w-4 h-4" aria-hidden="true" />
              {plannedNights === 0 ? 'Plan the week →' : 'Open the plan →'}
            </Link>
          </div>

          {/* Print packs */}
          <div className="bg-paper-50 border border-hairline p-6">
            <h3 className={RAIL_H3}>Print packs</h3>
            <p className="mt-2 text-[16px] leading-[1.55] text-ink-muted">
              Your {saved.length} saved meal{saved.length === 1 ? '' : 's'}{' '}
              {saved.length === 1 ? 'is' : 'are'} a one-click preset in the pack builder. One recipe
              per page, letter or A4.
            </p>
            <Link
              href="/print-pack#builder"
              className="inline-block mt-3 text-[16px] font-semibold hover:text-accent transition-colors"
            >
              Build a pack →
            </Link>
          </div>

          {/* Kroger — only when the integration is configured; state is the token cookie */}
          {krogerEnabled && (
            <div className="bg-paper-50 border border-hairline p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className={RAIL_H3}>Kroger</h3>
                <span
                  className={`font-mono text-[13px] uppercase tracking-[0.08em] font-bold ${
                    krogerConnected ? 'text-ink' : 'text-ink-subtle'
                  }`}
                >
                  {krogerConnected ? 'Connected' : 'Not connected'}
                </span>
              </div>
              <p className="mt-2 text-[16px] leading-[1.55] text-ink-muted">
                Ingredients go to your own Kroger cart from any recipe. Nothing is ordered until you
                check out at Kroger.
              </p>
              {krogerConnected ? (
                <form action={disconnectKroger} className="mt-3">
                  <button
                    type="submit"
                    className="text-[16px] font-semibold hover:text-accent transition-colors cursor-pointer"
                  >
                    Disconnect
                  </button>
                </form>
              ) : (
                <a
                  href="/api/kroger/authorize?returnTo=/account"
                  className="inline-block mt-3 text-[16px] font-semibold hover:text-accent transition-colors"
                >
                  Connect Kroger →
                </a>
              )}
            </div>
          )}

          {/* Your data */}
          <div className="bg-paper-50 border border-hairline p-6">
            <h3 className={RAIL_H3}>Your data</h3>
            <p className="mt-2 text-[16px] leading-[1.55] text-ink-muted">
              We store your email, name, and Google avatar — no Gmail access. Your kitchen profile also
              lives on this device.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="text-[16px] font-semibold hover:text-accent transition-colors cursor-pointer"
                >
                  Sign out
                </button>
              </form>
              <DeleteAccountButton />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
