import { NextRequest, NextResponse } from 'next/server';
import { buildAuthorizeUrl, createState, calendarConfigured, COOKIE } from '@/lib/calendar/oauth';

export const dynamic = 'force-dynamic';

/**
 * Starts the incremental Google Calendar grant.
 *
 * Separate from sign-in on purpose (see lib/calendar/oauth.ts): someone who
 * only ever reads recipes is never asked for calendar access.
 *
 * `?returnTo=` is restricted to same-site paths. An open redirect here would
 * let a crafted link bounce a user to an attacker's page carrying this
 * domain's trust, immediately after a consent screen — the worst possible
 * moment to hand off.
 */
export async function GET(req: NextRequest) {
  // Redirecting to Google with an empty client_id lands the user on a Google
  // error page, which reads as this site being broken. Fail where the cause is
  // legible instead.
  if (!calendarConfigured()) {
    return NextResponse.json({ error: 'calendar_not_configured' }, { status: 503 });
  }

  const state = createState();
  const requested = req.nextUrl.searchParams.get('returnTo') ?? '/plan';
  const returnTo = requested.startsWith('/') && !requested.startsWith('//') ? requested : '/plan';

  const res = NextResponse.redirect(buildAuthorizeUrl(state));
  const secure = process.env.NODE_ENV === 'production';

  res.cookies.set(COOKIE.state, state, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: 600, // the round trip through Google should take well under 10 minutes
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
