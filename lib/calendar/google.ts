/**
 * Google Calendar API v3 — the narrow slice this site uses.
 *
 * Written against fetch rather than googleapis: three endpoints do not justify
 * a dependency the size of the whole Google client library, and every call here
 * carries a user's token, so keeping the request bodies visible is worth more
 * than the ergonomics.
 */

const API = 'https://www.googleapis.com/calendar/v3';

/** Carries the HTTP status so callers can tell "reconnect" from "broken". */
export class CalendarApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'CalendarApiError';
  }
}

async function call<T>(
  accessToken: string,
  path: string,
  init: { method: string; body?: unknown },
): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: init.method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  });

  if (!res.ok) {
    throw new CalendarApiError(
      res.status,
      `calendar ${init.method} ${path} failed: ${res.status} ${(await res.text()).slice(0, 200)}`,
    );
  }
  // DELETE answers 204 with an empty body.
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

/**
 * Creates the secondary calendar this site writes meals to.
 *
 * Under calendar.app.created this is the only calendar the token can reach —
 * the user's primary calendar is not readable or writable, by design. One per
 * user; the id is stored in meals_calendar_links and reused.
 */
export function createMealCalendar(accessToken: string, timeZone: string) {
  return call<{ id: string }>(accessToken, '/calendars', {
    method: 'POST',
    body: {
      summary: 'Meal Instructions',
      description:
        'Dinners planned at mealinstructions.com. Delete this calendar to remove them all.',
      timeZone,
    },
  });
}

/** True when the calendar still exists and this token can still reach it. */
export async function calendarExists(accessToken: string, calendarId: string): Promise<boolean> {
  try {
    await call(accessToken, `/calendars/${encodeURIComponent(calendarId)}`, { method: 'GET' });
    return true;
  } catch (err) {
    // 404 (deleted by the user) and 403 (grant narrowed) both mean "make a new
    // one". Anything else is a real fault and must not be swallowed.
    if (err instanceof CalendarApiError && (err.status === 404 || err.status === 403)) {
      return false;
    }
    throw err;
  }
}

export interface CalendarEventInput {
  summary: string;
  description: string;
  /** Local wall time, "YYYY-MM-DDTHH:MM:SS", resolved against timeZone. */
  start: string;
  end: string;
  timeZone: string;
  sourceUrl: string;
  /** Popup this many minutes before the cook starts. */
  remindMinutesBefore: number;
}

function eventBody(input: CalendarEventInput) {
  return {
    summary: input.summary,
    description: input.description,
    start: { dateTime: input.start, timeZone: input.timeZone },
    end: { dateTime: input.end, timeZone: input.timeZone },
    source: { title: 'Meal Instructions', url: input.sourceUrl },
    // An explicit reminder, because the calendar's default is usually tuned for
    // meetings. The block already starts at "go and cook"; this is the nudge to
    // get the pan out.
    reminders: {
      useDefault: false,
      overrides: [{ method: 'popup', minutes: input.remindMinutesBefore }],
    },
  };
}

export function insertEvent(accessToken: string, calendarId: string, input: CalendarEventInput) {
  return call<{ id: string }>(
    accessToken,
    `/calendars/${encodeURIComponent(calendarId)}/events`,
    { method: 'POST', body: eventBody(input) },
  );
}

export function patchEvent(
  accessToken: string,
  calendarId: string,
  eventId: string,
  input: CalendarEventInput,
) {
  return call<{ id: string }>(
    accessToken,
    `/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}`,
    { method: 'PATCH', body: eventBody(input) },
  );
}

export function deleteEvent(accessToken: string, calendarId: string, eventId: string) {
  return call<void>(
    accessToken,
    `/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}`,
    { method: 'DELETE' },
  );
}
