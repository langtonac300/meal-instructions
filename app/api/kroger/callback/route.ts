import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForTokens, COOKIE } from '@/lib/kroger/oauth';

export const dynamic = 'force-dynamic';

/**
 * Kroger redirects the shopper here after they approve cart access.
 *
 * Registered redirect URI: https://www.mealinstructions.com/api/kroger/callback
 * That string must match byte-for-byte in the portal, the /authorize redirect,
 * and the token exchange — Kroger rejects the exchange otherwise.
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');

  const cookieState = req.cookies.get(COOKIE.state)?.value;
  const returnTo = req.cookies.get(COOKIE.returnTo)?.value ?? '/';

  const fail = (reason: string) =>
    NextResponse.redirect(new URL(`${returnTo}?kroger=${reason}`, url.origin));

  if (error) return fail('denied');
  if (!code || !state) return fail('invalid');

  // Constant-ish comparison is overkill for an opaque 256-bit value, but the
  // check itself is essential: without it any page could forge a callback.
  if (!cookieState || cookieState !== state) return fail('state_mismatch');

  let tokens;
  try {
    tokens = await exchangeCodeForTokens(code);
  } catch {
    return fail('exchange_failed');
  }

  const res = NextResponse.redirect(new URL(`${returnTo}?kroger=connected`, url.origin));
  const secure = process.env.NODE_ENV === 'production';

  // The shopper's token never reaches client JS — the cart call is made
  // server-side in /api/kroger/cart, which reads these cookies.
  res.cookies.set(COOKIE.accessToken, tokens.accessToken, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: tokens.expiresIn,
  });
  if (tokens.refreshToken) {
    res.cookies.set(COOKIE.refreshToken, tokens.refreshToken, {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  // Single-use: the state cookie must not survive to authorise a second callback.
  res.cookies.delete(COOKIE.state);
  res.cookies.delete(COOKIE.returnTo);

  return res;
}
