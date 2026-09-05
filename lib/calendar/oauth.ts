/**
 * Google Calendar authorization_code flow — incremental, separate from sign-in.
 *
 * Sign-in (auth.ts) requests identity only: openid email profile. Asking every
 * visitor for calendar access at the sign-in prompt to serve the minority who
 * plan meals costs sign-ins and weakens the scope justification at review. So
 * the calendar grant is requested here, on its own, the first time someone
 * actually pushes a plan.
 *
 * Same OAuth client as sign-in (AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET) — there is
 * no second app. The redirect URI below must be registered on that client in
 * the Google Cloud console alongside the NextAuth one.
 *
 * Scope is calendar.app.created: this site may create a calendar and manage the
 * calendars it created, and can reach nothing else on the account. A user who
 * wants the meals gone deletes that one calendar.
 */

import { randomBytes } from 'node:crypto';
import { abs } from '@/lib/site';

const AUTHORIZE_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';

/** Create and manage only calendars this app created. Sensitive, not restricted. */
export const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar.app.created';

/** Cookie names. All httpOnly — none may be readable from page JavaScript. */
export const COOKIE = {
  state: 'gcal_oauth_state',
  accessToken: 'gcal_access_token',
  refreshToken: 'gcal_refresh_token',
  returnTo: 'gcal_return_to',
} as const;

export function calendarConfigured(): boolean {
  return Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
}

/**
 * HR-10: no hardcoded domain. The override exists because the registered URI
 * must byte-match, and a preview deployment's URL will not match production's.
 */
export function getRedirectUri(): string {
  return process.env.GOOGLE_CALENDAR_REDIRECT_URI ?? abs('/api/calendar/callback');
}

/** Opaque, single-use CSRF token tying the callback to the request that began it. */
export function createState(): string {
  return randomBytes(32).toString('hex');
}

export function buildAuthorizeUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.AUTH_GOOGLE_ID ?? '',
    redirect_uri: getRedirectUri(),
    response_type: 'code',
    scope: CALENDAR_SCOPE,
    state,
    // Without offline access Google returns an access token only, and the plan
    // could never be re-synced after it expires an hour later.
    access_type: 'offline',
    // Google withholds the refresh token on re-consent unless it is forced.
    // Someone who reconnects after clearing cookies would otherwise get an
    // access token with no way to renew it.
    prompt: 'consent',
    // Keeps the identity scopes already granted at sign-in attached to the
    // resulting token rather than replacing them.
    include_granted_scopes: 'true',
  });
  return `${AUTHORIZE_URL}?${params}`;
}

export interface CalendarTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

async function tokenRequest(extra: Record<string, string>): Promise<CalendarTokens> {
  const id = process.env.AUTH_GOOGLE_ID;
  const secret = process.env.AUTH_GOOGLE_SECRET;
  if (!id || !secret) throw new Error('AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET are not set');

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: id, client_secret: secret, ...extra }).toString(),
  });

  if (!res.ok) {
    // The body carries the reason (invalid_grant, redirect_uri_mismatch) and no
    // user data. Truncated so a stray HTML error page cannot flood the log.
    throw new Error(
      `Google token exchange failed: ${res.status} ${(await res.text()).slice(0, 200)}`,
    );
  }

  const json = (await res.json()) as {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  };
  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token,
    expiresIn: json.expires_in,
  };
}

export function exchangeCodeForTokens(code: string): Promise<CalendarTokens> {
  return tokenRequest({
    grant_type: 'authorization_code',
    code,
    redirect_uri: getRedirectUri(),
  });
}

export function refreshAccessToken(refreshToken: string): Promise<CalendarTokens> {
  return tokenRequest({ grant_type: 'refresh_token', refresh_token: refreshToken });
}
