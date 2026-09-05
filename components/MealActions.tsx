'use client';

// Save / rate / suggest-edit block for a single recipe.
// Renders below the ingredients on the recipe page.
// State is loaded from /api/meals/state after mount so the SSR HTML shell
// stays cache-friendly and identical for every visitor.

import { useEffect, useState, useTransition } from 'react';
import { Bookmark, BookmarkCheck, Star, Pencil, LogIn } from 'lucide-react';
import { track } from '@/lib/analytics';

interface RatingState {
  stars: number;
  review: string | null;
}

interface StateResponse {
  signedIn: boolean;
  saved: boolean;
  rating: RatingState | null;
}

interface Props {
  recipeSlug: string;
  recipeTitle: string;
}

export default function MealActions({ recipeSlug, recipeTitle }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [saved, setSaved] = useState(false);
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState('');
  const [hoverStar, setHoverStar] = useState(0);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [suggestBody, setSuggestBody] = useState('');
  const [suggestSent, setSuggestSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/meals/state?slug=${encodeURIComponent(recipeSlug)}`)
      .then((r) => r.json())
      .then((data: StateResponse) => {
        if (cancelled) return;
        setSignedIn(!!data.signedIn);
        setSaved(!!data.saved);
        if (data.rating) {
          setStars(data.rating.stars);
          setReview(data.rating.review ?? '');
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
    return () => {
      cancelled = true;
    };
  }, [recipeSlug]);

  const signInHref = `/account/sign-in?callbackUrl=${encodeURIComponent(
    typeof window === 'undefined' ? '' : window.location.pathname
  )}`;

  const toggleSaved = () => {
    if (!signedIn) return;
    const next = !saved;
    track('meal_save', { recipe: recipeSlug, saved: next });
    setSaved(next);
    startTransition(async () => {
      const res = await fetch('/api/meals/save', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ slug: recipeSlug, saved: next }),
      });
      if (!res.ok) {
        setSaved(!next);
        setError('Could not save. Try again.');
      } else {
        setError(null);
      }
    });
  };

  const submitRating = (nextStars: number) => {
    if (!signedIn) return;
    setStars(nextStars);
    // Stars only. The review body is user free text and never leaves the page.
    track('meal_rate', { recipe: recipeSlug, stars: nextStars });
    startTransition(async () => {
      const res = await fetch('/api/meals/rate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ slug: recipeSlug, stars: nextStars, review: review || null }),
      });
      if (!res.ok) setError('Could not save rating.');
      else setError(null);
    });
  };

  const submitReview = () => {
    if (!signedIn || stars < 1) return;
    startTransition(async () => {
      const res = await fetch('/api/meals/rate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ slug: recipeSlug, stars, review: review || null }),
      });
      if (!res.ok) setError('Could not save review.');
      else setError(null);
    });
  };

  const submitSuggestion = () => {
    if (!signedIn || !suggestBody.trim()) return;
    startTransition(async () => {
      const res = await fetch('/api/meals/suggest-edit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ slug: recipeSlug, body: suggestBody }),
      });
      if (!res.ok) {
        setError('Could not send suggestion.');
        return;
      }
      setError(null);
      setSuggestSent(true);
      setSuggestBody('');
      setTimeout(() => setSuggestSent(false), 4000);
    });
  };

  // Static shell until we know who the visitor is — prevents flashing
  // "sign in" for signed-in users.
  const shell = 'bg-paper-50 border border-hairline p-5 sm:p-7 no-print';

  if (!loaded) {
    return (
      <section className={shell}>
        <div className="text-[15px] text-ink-subtle">Loading…</div>
      </section>
    );
  }

  if (!signedIn) {
    return (
      <section className={`${shell} flex flex-wrap items-center justify-between gap-6`}>
        <div className="min-w-0">
          <h3 className="text-[22px] font-bold tracking-[-0.01em] text-ink">Save &amp; rate</h3>
          <p className="mt-2 text-[17px] leading-[1.55] text-ink-muted max-w-[58ch]">
            Sign in with Google to save this recipe, rate it after you cook, and suggest edits to
            the instructions. We only store your email, name, and Google avatar — no Gmail access.
          </p>
        </div>
        <a
          href={signInHref}
          className="inline-flex items-center gap-2 px-5 py-[13px] bg-ink text-paper text-[16px] font-semibold hover:bg-accent transition-colors shrink-0"
        >
          <LogIn className="w-4 h-4" aria-hidden="true" />
          Sign in with Google
        </a>
      </section>
    );
  }

  return (
    <section className={`${shell} space-y-5`}>
      <h3 className="text-[22px] font-bold tracking-[-0.01em] text-ink">Your notes on this meal</h3>

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="button"
          onClick={toggleSaved}
          disabled={pending}
          className={`inline-flex items-center gap-2 px-4 py-2.5 border border-ink text-[16px] font-semibold transition-colors cursor-pointer ${
            saved ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-ink hover:text-paper'
          }`}
        >
          {saved ? (
            <BookmarkCheck className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Bookmark className="w-4 h-4" aria-hidden="true" />
          )}
          {saved ? 'Saved' : 'Save this meal'}
        </button>
        {saved && (
          <a href="/account" className="text-[16px] text-ink-muted hover:text-ink transition-colors">
            View saved meals →
          </a>
        )}

        <div
          className="flex items-center gap-1"
          onMouseLeave={() => setHoverStar(0)}
          role="radiogroup"
          aria-label="Rate this recipe"
        >
          {[1, 2, 3, 4, 5].map((n) => {
            const filled = (hoverStar || stars) >= n;
            return (
              <button
                key={n}
                type="button"
                onMouseEnter={() => setHoverStar(n)}
                onClick={() => submitRating(n)}
                disabled={pending}
                aria-label={`${n} star${n > 1 ? 's' : ''}`}
                aria-checked={stars === n}
                role="radio"
                className="p-0.5 cursor-pointer"
              >
                <Star
                  className={`w-6 h-6 transition-colors ${
                    filled ? 'fill-ink text-ink' : 'text-ink-subtle'
                  }`}
                />
              </button>
            );
          })}
          {stars > 0 && (
            <span className="ml-2 text-[15px] text-ink-muted">You rated {stars}/5</span>
          )}
        </div>
      </div>

      {stars > 0 && (
        <div className="space-y-2">
          <label htmlFor={`review-${recipeSlug}`} className="block text-[15px] text-ink-muted">
            Review (optional)
          </label>
          <textarea
            id={`review-${recipeSlug}`}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            onBlur={submitReview}
            rows={2}
            maxLength={2000}
            placeholder="How did it turn out? What would you do differently?"
            className="w-full p-3 border border-hairline focus:border-ink focus:outline-none bg-paper text-[16px] text-ink resize-y"
          />
        </div>
      )}

      <div className="border-t border-hairline pt-5">
        <button
          type="button"
          onClick={() => setSuggestOpen((v) => !v)}
          className="inline-flex items-center gap-2 text-[16px] text-ink hover:text-accent transition-colors cursor-pointer"
        >
          <Pencil className="w-4 h-4" aria-hidden="true" />
          {suggestOpen ? 'Close suggestion' : 'Something wrong? Suggest an edit'}
        </button>

        {suggestOpen && (
          <div className="mt-3 space-y-2">
            <textarea
              value={suggestBody}
              onChange={(e) => setSuggestBody(e.target.value)}
              rows={4}
              maxLength={4000}
              placeholder="What should change? (e.g. 'Step 3 should say 400°F, not 375°F' or 'The salt amount is way too high for 2 lb of chicken.')"
              className="w-full p-3 border border-hairline focus:border-ink focus:outline-none bg-paper text-[16px] text-ink resize-y"
            />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[13px] text-ink-subtle">{suggestBody.length}/4000</span>
              <button
                type="button"
                onClick={submitSuggestion}
                disabled={pending || !suggestBody.trim()}
                className="px-4 py-2.5 bg-ink text-paper text-[16px] font-semibold disabled:opacity-40 hover:bg-accent transition-colors cursor-pointer"
              >
                Send suggestion
              </button>
            </div>
            {suggestSent && <div className="text-[15px] text-ink-muted">Thanks — logged.</div>}
          </div>
        )}
      </div>

      {error && <div className="text-[15px] text-accent">{error}</div>}
    </section>
  );
}
