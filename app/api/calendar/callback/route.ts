import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForTokens, COOKIE } from '@/lib/calendar/oauth';

export const dynamic = 'force-dynamic';

/**
 * Google redirects here after the calendar consent screen.
 *
 * The registered redirect URI on the OAuth client must byte-match the one sent
 * to /authorize and to the token exchange, or Google answers
 * redirect_uri_mismatch. It is the same OAuth client sign-in uses; this path is
 * registered alongside the NextAuth callback, not instead of it.
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');

  const cookieState = req.cookies.get(COOKIE.state)?.value;
  const returnTo = req.cookies.get(COOKIE.returnTo)?.value ?? '/plan';

  const fail = (reason: string) =>
    NextResponse.redirect(new URL(`${returnTo}?calendar=${reason}`, url.origin));

  // access_denied is the user clicking Cancel — an ordinary outcome, not a fault.
  if (error) return fail(error === 'access_denied' ? 'denied' : 'error');
  if (!code || !state) return fail('invalid');
  // Without this check any page could forge a callback and plant tokens.
  if (!cookieState || cookieState !== state) return fail('state_mismatch');

  let tokens;
  try {
    tokens = await exchangeCodeForTokens(code);
  } catch (err) {
    console.error('[calendar] token exchange failed', err);
    return fail('exchange_failed');
  }

  const res = NextResponse.redirect(new URL(`${returnTo}?calendar=connected`, url.origin));
  const secure = process.env.NODE_ENV === 'production';

  // Tokens stay server-side: /api/calendar/sync reads these cookies and calls
  // Google itself. Page JavaScript never sees them.
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
      maxAge: 60 * 60 * 24 * 180,
    });
  }

  // Single-use: the state cookie must not survive to authorise a second callback.
  res.cookies.delete(COOKIE.state);
  res.cookies.delete(COOKIE.returnTo);

  return res;
}
