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
    <div className="mt-6 bg-paper-card hairline-border p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3 border-b border-hairline pb-3 mb-3">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink font-bold">
          <ShoppingCart className="w-3.5 h-3.5" />
          Send to Kroger
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
          {selected.size} of {allUpcs.length} selected
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mb-4">
        {matched.map((ing) =>
          ing.products.map((p) => {
            const upc = p.upc ?? p.productId;
            const checked = selected.has(upc);
            return (
              <label
                key={upc}
                className="flex items-start gap-2.5 text-xs cursor-pointer group py-1"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(upc)}
                  className="mt-0.5 accent-ink cursor-pointer"
                />
                <span className="leading-snug">
                  <span className="text-ink font-bold">{ing.item}</span>
                  <span className="block text-ink-muted text-[11px] font-mono">
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
        <p className="text-[11px] font-mono text-ink-muted border-t border-hairline pt-3 mb-3 leading-relaxed">
          <span className="font-bold uppercase text-ink">Not included:</span>{' '}
          {unmatched.map((u) => u.item).join(', ')} — no confident product match, so
          you&apos;ll need to add {unmatched.length === 1 ? 'it' : 'them'} yourself.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={addToCart}
          disabled={status === 'sending' || selected.size === 0}
          className="flex items-center gap-2 px-4 py-2 bg-ink text-paper font-mono text-[11px] uppercase tracking-wider font-bold hover:bg-ink/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {status === 'added' ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
          {status === 'sending' ? 'Adding…' : status === 'added' ? 'Added' : 'Add to Kroger cart'}
        </button>

        {status === 'added' && (
          <a
            href="https://www.kroger.com/cart"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-ink underline hover:no-underline"
          >
            View cart <ExternalLink className="w-3 h-3" />
          </a>
        )}

        {message && (
          <span
            className={`font-mono text-[11px] ${status === 'error' ? 'text-accent' : 'text-ink-muted'}`}
          >
            {message}
          </span>
        )}
      </div>

      <p className="mt-3 text-[10px] font-mono text-ink-subtle leading-relaxed">
        Adds to your own Kroger cart — you&apos;ll sign in with Kroger the first time.
        Prices and availability depend on your store. Nothing is ordered until you
        check out at Kroger.
      </p>
    </div>
  );
}
