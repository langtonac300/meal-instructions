/**
 * Kitchen profile — the one-time setup that personalises every page.
 *
 * Stored locally first so the 1,577 datasheet pages personalise for anonymous
 * search visitors, who are most of the traffic. When someone signs in, the same
 * shape is mirrored to `meals_profiles` in Supabase so it follows them across
 * devices. Local is the read path; the server is the backup.
 *
 * Personalisation itself is CSS only — see the profile init script in
 * app/layout.tsx and the [data-appliance] rules in globals.css. HR-6 requires
 * every appliance's content to stay in the server-rendered HTML, because the
 * LLM crawlers this site is built for do not execute JavaScript. Nothing here
 * may ever remove content from the DOM.
 */

import type { Appliance } from './types';

export const PROFILE_KEY = 'mi_profile_v1';

export type SpiceLevel = 'mild' | 'medium' | 'hot';

/** Things worth excluding that map to real recipe/datasheet content. */
export const AVOIDABLE = [
  'pork',
  'shellfish',
  'nuts',
  'dairy',
  'gluten',
  'beef',
] as const;
export type Avoidable = (typeof AVOIDABLE)[number];

export interface KitchenProfile {
  appliances: Appliance[];
  adults: number;
  kids: number;
  kidAges: number[];
  avoid: Avoidable[];
  spice: SpiceLevel;
  /** Weeknight time budget in minutes; null means "no limit". */
  maxWeeknightMinutes: number | null;
  updatedAt: string;
}

export const EMPTY_PROFILE: KitchenProfile = {
  appliances: [],
  adults: 2,
  kids: 0,
  kidAges: [],
  avoid: [],
  spice: 'medium',
  maxWeeknightMinutes: null,
  updatedAt: '',
};

/** A profile counts as set once someone has told us what they cook on. */
export function isConfigured(p: KitchenProfile | null): p is KitchenProfile {
  return !!p && p.appliances.length > 0;
}

/**
 * Coerce anything — a localStorage blob, a Supabase row — into a valid profile.
 * Never throws: a corrupt profile should degrade to "not set up", never break a
 * page that would otherwise render fine.
 */
export function normalise(raw: unknown): KitchenProfile | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const arr = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x) => typeof x === 'string') : []);
  const num = (v: unknown, fallback: number): number =>
    typeof v === 'number' && Number.isFinite(v) ? v : fallback;

  const appliances = arr(r.appliances) as Appliance[];
  const spice = r.spice === 'mild' || r.spice === 'hot' ? r.spice : 'medium';

  return {
    appliances,
    adults: Math.max(1, Math.min(12, num(r.adults, 2))),
    kids: Math.max(0, Math.min(10, num(r.kids, 0))),
    kidAges: Array.isArray(r.kidAges) ? r.kidAges.filter((n): n is number => typeof n === 'number') : [],
    avoid: arr(r.avoid).filter((a): a is Avoidable => (AVOIDABLE as readonly string[]).includes(a)),
    spice,
    maxWeeknightMinutes:
      typeof r.maxWeeknightMinutes === 'number' ? r.maxWeeknightMinutes : null,
    updatedAt: typeof r.updatedAt === 'string' ? r.updatedAt : '',
  };
}

export function readProfile(): KitchenProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? normalise(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

export function writeProfile(profile: KitchenProfile): void {
  if (typeof window === 'undefined') return;
  const next = { ...profile, updatedAt: new Date().toISOString() };
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
  } catch {
    // private mode or quota — the in-page stamp below still applies for this visit
  }
  stamp(next);
}

export function clearProfile(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(PROFILE_KEY);
  } catch {
    // ignore
  }
  const el = document.documentElement;
  for (const attr of ['data-appliances', 'data-kids', 'data-adults', 'data-avoid', 'data-kitchen']) {
    el.removeAttribute(attr);
  }
}

/**
 * Write the profile onto <html> so the CSS layer can act on it. Mirrors what
 * the blocking head script does on a cold load — this is the path for changes
 * made after hydration, so the page updates without a reload.
 */
export function stamp(profile: KitchenProfile): void {
  if (typeof document === 'undefined') return;
  const el = document.documentElement;
  el.setAttribute('data-appliances', profile.appliances.join(' '));
  el.setAttribute('data-adults', String(profile.adults));
  el.setAttribute('data-kids', String(profile.kids));
  if (profile.avoid.length > 0) el.setAttribute('data-avoid', profile.avoid.join(' '));
  else el.removeAttribute('data-avoid');
}

/** Servings to default a recipe to, given the household. Kids count as half. */
export function householdServings(profile: KitchenProfile | null): number | null {
  if (!profile) return null;
  const raw = profile.adults + profile.kids * 0.5;
  // Snap to the portion steps the recipe pages actually offer.
  return [2, 4, 6, 8].reduce((best, n) => (Math.abs(n - raw) < Math.abs(best - raw) ? n : best), 4);
}
