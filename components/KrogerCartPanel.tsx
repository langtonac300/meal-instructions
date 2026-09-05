'use client';

import React, { useMemo, useState } from 'react';
import { ShoppingCart, Check, ExternalLink } from 'lucide-react';
import type { ResolvedIngredient } from '@/lib/kroger/matches';
import { track } from '@/lib/analytics';

interface Props {
  ingredients: ResolvedIngredient[];
  /** Path to return to after the Kroger login round trip. */
  returnTo: string;
}

type Status = 'idle' | 'sending' | 'added' | 'error';

/**
 * Sends matched ingredients to the shopper's own Kroger cart.
 *
 * Checked by default but individually unticked: a pot roast resolves to a
 * dozen-plus products, and nobody needs a second jar of kosher salt. One click
 * still works if the reader leaves everything ticked.
 *
 * Ingredients with no confident product match are listed as unavailable rather
 * than hidden — the reader needs to know what the cart will not contain, or
 * they will get to the store missing something.
 */
export default function KrogerCartPanel({ ingredients, returnTo }: Props) {
  const matched = useMemo(() => ingredients.filter((i) => i.products.length > 0), [ingredients]);
  const unmatched = useMemo(() => ingredients.filter((i) => i.products.length === 0), [ingredients]);

  const allUpcs = useMemo(
    () => matched.flatMap((i) => i.products.map((p) => p.upc ?? p.productId)),
    [matched],
  );

  const [selected, setSelected] = useState<Set<string>>(() => new Set(allUpcs));
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  if (!matched.length) return null;

  const toggle = (upc: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(upc)) next.delete(upc);
      else next.add(upc);
      return next;
    });
    setStatus('idle');
  };

  async function addToCart() {
    setStatus('sending');
    setMessage('');

    try {
      const res = await fetch('/api/kroger/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [...selected].map((upc) => ({ upc, quantity: 1 })) }),
      });

      if (res.status === 401) {
        // Not connected yet — hand off to Kroger, then come back to this recipe.
        window.location.href = `/api/kroger/authorize?returnTo=${encodeURIComponent(returnTo)}`;
        return;
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }

      const body = (await res.json()) as { added: number };
      track('cart_build', { items_selected: selected.size, items_added: body.added });
      setStatus('added');
      setMessage(`${body.added} item${body.added === 1 ? '' : 's'} added to your Kroger cart.`);
    } catch (e) {
      setStatus('error');
      setMessage(`Could not add to cart: ${(e as Error).message}`);
    }
  }

  return (
    <div className="mt-8 border border-ink p-5 sm:p-7 no-print">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pb-[18px] border-b border-hairline">
        <div className="min-w-0">
          <h3 className="flex items-center gap-3 text-[24px] font-extrabold tracking-[-0.01em] leading-tight text-ink">
            <ShoppingCart className="w-5 h-5 shrink-0" aria-hidden="true" />
            Send to Kroger
          </h3>
          <p className="mt-2 text-[17px] text-ink-muted">
            Untick anything you already have. One click sends the rest to your own cart.
          </p>
        </div>
        <span className="font-mono text-[15px] text-ink-muted whitespace-nowrap">
          {selected.size} of {allUpcs.length} selected
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        {matched.map((ing) =>
          ing.products.map((p) => {
            const upc = p.upc ?? p.productId;
            const checked = selected.has(upc);
            return (
              <label
                key={upc}
                className="flex items-start gap-3.5 py-3.5 border-b border-hairline cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(upc)}
                  className="mt-[3px] w-[18px] h-[18px] accent-ink cursor-pointer shrink-0"
                />
                <span className="leading-snug min-w-0">
                  <span
                    className={`block text-[18px] font-semibold transition-colors ${
                      checked ? 'text-ink' : 'text-ink-muted'
                    }`}
                  >
                    {ing.item}
                  </span>
                  <span
                    className={`block font-mono text-[14px] mt-0.5 transition-colors ${
                      checked ? 'text-ink-muted' : 'text-ink-subtle'
                    }`}
                  >
                    {p.description}
                    {p.size ? ` · ${p.size}` : ''}
                  </span>
                </span>
              </label>
            );
          }),
        )}
      </div>

      {unmatched.length > 0 && (
        <p className="mt-[18px] text-[16px] leading-[1.6] text-ink-muted">
          <span className="font-bold text-ink">Not included:</span>{' '}
          {unmatched.map((u) => u.item).join(', ')} — no confident product match, so
          you&apos;ll need to add {unmatched.length === 1 ? 'it' : 'them'} yourself.
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-5">
        <button
          type="button"
          onClick={addToCart}
          disabled={status === 'sending' || selected.size === 0}
          className="inline-flex items-center gap-2.5 px-[22px] py-3.5 bg-ink text-paper text-[17px] font-bold hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-ink transition-colors cursor-pointer"
        >
          {status === 'added' ? (
            <Check className="w-[18px] h-[18px]" aria-hidden="true" />
          ) : (
            <ShoppingCart className="w-[18px] h-[18px]" aria-hidden="true" />
          )}
          {status === 'sending'
            ? 'Adding…'
            : status === 'added'
              ? 'Added'
              : `Add ${selected.size} item${selected.size === 1 ? '' : 's'} to Kroger cart`}
        </button>

        {status === 'added' && (
          <a
            href="https://www.kroger.com/cart"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[16px] text-ink-muted hover:text-ink transition-colors"
          >
            View cart at Kroger <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        )}

        {message && (
          <span className={`text-[16px] ${status === 'error' ? 'text-accent' : 'text-ink-muted'}`}>
            {message}
          </span>
        )}
      </div>

      <p className="mt-[18px] text-[15px] leading-[1.6] text-ink-muted max-w-[72ch]">
        Adds to your own Kroger cart — you&apos;ll sign in with Kroger the first time.
        Prices and availability depend on your store. Nothing is ordered until you
        check out at Kroger.
      </p>
    </div>
  );
}
