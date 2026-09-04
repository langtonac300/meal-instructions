import { NextRequest, NextResponse } from 'next/server';
import { buildAuthorizeUrl, createState, COOKIE } from '@/lib/kroger/oauth';

export const dynamic = 'force-dynamic';

/**
 * Starts the Kroger authorization_code flow.
 *
 * `?returnTo=` lets the shopper land back on the recipe they were reading.
 * It is restricted to same-site paths — an open redirect here would let a
 * crafted link bounce a user off to an attacker's page carrying the trust of
 * this domain.
 */
export async function GET(req: NextRequest) {
  // Without a client_id the redirect still "works" — it sends the shopper to
  // Kroger with client_id= and they land on an error page, which reads as the
  // site being broken. Fail here instead, where the cause is legible.
  if (!process.env.KROGER_CLIENT_ID) {
    return NextResponse.json(
      { error: 'kroger_not_configured' },
      { status: 503 },
    );
  }

  const state = createState();
  const requested = req.nextUrl.searchParams.get('returnTo') ?? '/';
  const returnTo = requested.startsWith('/') && !requested.startsWith('//') ? requested : '/';

  const res = NextResponse.redirect(buildAuthorizeUrl(state));

  const secure = process.env.NODE_ENV === 'production';
  res.cookies.set(COOKIE.state, state, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: 600, // the round trip through Kroger should take well under 10 minutes
  });
  res.cookies.set(COOKIE.returnTo, returnTo, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  });

  return res;
}
