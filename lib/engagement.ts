/**
 * Engagement scoring — what a *good* visit actually looks like on this site.
 *
 * GA4's built-in "engaged session" is >10s OR 2 pageviews OR a conversion. On a
 * cooking reference that is a bounce that happened to scroll; it cannot tell a
 * cook from a skimmer. This module scores the behaviour that does distinguish
 * them, and reports when a session crosses a tier so `quality_session` can be
 * fired and marked as a Key Event in GA4. Once it is a Key Event, GA4's existing
 * attribution models, channel reports and audiences all start operating on
 * engagement rather than on purchases this site does not have.
 *
 * Session-scoped by definition, so nothing here touches localStorage.
 * sessionStorage is used only when consent allows; otherwise the score lives in
 * memory and survives client-side navigation but not a hard reload.
 */

export type EngagementTier = 'engaged' | 'highly_engaged' | 'power_user';

export interface TierCrossing {
  tier: EngagementTier;
  score: number;
  signals: number;
  trigger: string;
}

/** One-shot milestones awarded by <EngagementTracker />, not by a user action. */
export type Milestone = 'dwell_60s' | 'dwell_180s' | 'scroll_75' | 'recipe_view_repeat';

/**
 * Points per signal. This table is the whole model — tune it here and nothing
 * else needs to change. Weights are ordered by how strongly the behaviour
 * implies someone is genuinely using a recipe rather than passing through.
 */
const WEIGHTS: Record<string, number> = {
  profile_complete: 60, // told us their kitchen — the strongest intent-to-return signal there is
  cook_complete: 50, // ran a timer to zero — cooked it start to finish
  cook_start: 40, // standing in the kitchen with the page open
  cart_build: 40, // bought the ingredients
  meal_save: 35,
  meal_rate: 35,
  recipe_print: 30, // offline intent, unusually strong for this audience
  recipe_share: 30,
  mode_switch_detailed: 25, // chose the long read — a direct read on the site's thesis
  tool_used: 20,
  dwell_180s: 20,
  portion_scale: 15, // planning a real meal for a real number of people
  search_select: 15,
  recipe_view_repeat: 15,
  dwell_60s: 10,
  scroll_75: 10,
  timer_extend: 10,
  site_search: 5,
};

const TIERS: { tier: EngagementTier; at: number }[] = [
  { tier: 'engaged', at: 25 },
  { tier: 'highly_engaged', at: 60 },
  { tier: 'power_user', at: 120 },
];

const STORAGE_KEY = 'mi_engagement_v1';

interface State {
  score: number;
  signals: number;
  tiers: EngagementTier[];
  counted: string[];
}

const fresh = (): State => ({ score: 0, signals: 0, tiers: [], counted: [] });

function consentGranted(): boolean {
  try {
    return localStorage.getItem('mi_consent_v1') === 'granted';
  } catch {
    return false;
  }
}

// Authoritative once initialised; sessionStorage only rehydrates it on the
// first access after a page load, so granting consent mid-session never
// clobbers a score already accumulated in memory.
let state: State | null = null;

function get(): State {
  if (state) return state;
  state = fresh();
  if (consentGranted()) {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) state = { ...state, ...(JSON.parse(raw) as Partial<State>) };
    } catch {
      // corrupt or unavailable — carry on with a fresh score
    }
  }
  return state;
}

function persist(next: State): void {
  state = next;
  if (!consentGranted()) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // quota or private mode — in-memory is still correct
  }
}

function award(reason: string, points: number, once: boolean): TierCrossing | null {
  const s = get();
  if (once) {
    if (s.counted.includes(reason)) return null;
    s.counted.push(reason);
  }

  s.score += points;
  s.signals += 1;

  // A single large award can jump two tiers at once. Record them all as
  // reached, but only report the highest so GA4 gets one event, not three.
  const crossed = TIERS.filter((t) => s.score >= t.at && !s.tiers.includes(t.tier));
  let crossing: TierCrossing | null = null;
  if (crossed.length > 0) {
    const top = crossed[crossed.length - 1];
    for (const t of crossed) s.tiers.push(t.tier);
    crossing = { tier: top.tier, score: s.score, signals: s.signals, trigger: reason };
  }

  persist(s);
  return crossing;
}

/**
 * Score a product event. Returns a crossing when this signal pushed the session
 * into a new tier, otherwise null.
 */
export function recordSignal(
  event: string,
  params: Record<string, unknown> = {}
): TierCrossing | null {
  let key = event;

  // Switching *to* detailed is the engagement signal. Switching back to quick
  // is a preference, not depth, and scoring it would make the metric meaningless.
  if (event === 'mode_switch') {
    if (params.mode !== 'detailed') return null;
    key = 'mode_switch_detailed';
  }

  // A search that returned nothing is a content gap, not an engaged read.
  if (event === 'site_search' && params.results_count === 0) return null;

  const points = WEIGHTS[key];
  return points ? award(key, points, false) : null;
}

/** Score a one-shot milestone (dwell, scroll depth, repeat recipe view). */
export function recordMilestone(milestone: Milestone): TierCrossing | null {
  const points = WEIGHTS[milestone];
  return points ? award(milestone, points, true) : null;
}

/** Current session score — exported for debugging in the console. */
export function engagementScore(): { score: number; signals: number; tiers: EngagementTier[] } {
  const s = get();
  return { score: s.score, signals: s.signals, tiers: [...s.tiers] };
}
