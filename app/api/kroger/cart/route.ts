import { NextRequest, NextResponse } from 'next/server';
import { addToCart, refreshAccessToken, COOKIE, type CartItem } from '@/lib/kroger/oauth';

export const dynamic = 'force-dynamic';

const MAX_ITEMS = 60;

/**
 * Adds items to the signed-in shopper's Kroger cart.
 *
 * The access token is read from an httpOnly cookie and used server-side, so it
 * is never exposed to page JavaScript. A 401 here means "not connected yet" —
 * the client should send the shopper through /api/kroger/authorize.
 */
export async function POST(req: NextRequest) {
  let body: { items?: Array<{ upc?: string; quantity?: number }> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  // Validate rather than forward: this payload comes from the browser, and the
  // request downstream carries the shopper's own credentials.
  const items: CartItem[] = (body.items ?? [])
    .filter((i): i is { upc: string; quantity?: number } => typeof i.upc === 'string' && /^\d{6,20}$/.test(i.upc))
    .slice(0, MAX_ITEMS)
    .map((i) => ({
      upc: i.upc,
      quantity: Math.min(Math.max(Math.trunc(i.quantity ?? 1), 1), 12),
    }));

  if (!items.length) {
    return NextResponse.json({ error: 'no_valid_items' }, { status: 400 });
  }

  const accessToken = req.cookies.get(COOKIE.accessToken)?.value;
  const refreshToken = req.cookies.get(COOKIE.refreshToken)?.value;

  if (!accessToken && !refreshToken) {
    return NextResponse.json({ error: 'not_connected' }, { status: 401 });
  }

  if (accessToken) {
    try {
      await addToCart(accessToken, items);
      return NextResponse.json({ added: items.length });
    } catch {
      // Fall through to a refresh attempt — the access token lasts 30 minutes
      // and a shopper can easily sit on a recipe page longer than that.
    }
  }

  if (!refreshToken) {
    return NextResponse.json({ error: 'not_connected' }, { status: 401 });
  }

  try {
    const tokens = await refreshAccessToken(refreshToken);
    await addToCart(tokens.accessToken, items);

    const res = NextResponse.json({ added: items.length });
    res.cookies.set(COOKIE.accessToken, tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: tokens.expiresIn,
    });
    return res;
  } catch {
    return NextResponse.json({ error: 'not_connected' }, { status: 401 });
  }
}
