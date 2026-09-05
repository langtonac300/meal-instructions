/**
 * Product analytics — semantic dataLayer events.
 *
 * Contract: this module only *pushes* events. GTM decides what happens to them.
 * No measurement IDs and no tag configuration live here, which is what lets you
 * retag in the container without shipping a deploy.
 *
 * Never pass PII. No emails, no names, no free text a user typed that could
 * carry personal data — Google terminates properties over it. Search queries are
 * the one deliberate exception, and go through `searchTerm()` first.
 *
 * Every push is wrapped: instrumentation living inside a click handler must
 * never be able to take the interaction down with it.
 */

import { recordSignal, type TierCrossing } from './engagement';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export type AnalyticsEvent =
  | 'mode_switch'
  | 'portion_scale'
  | 'cook_start'
  | 'cook_pause'
  | 'cook_complete'
  | 'timer_extend'
  | 'site_search'
  | 'search_select'
  | 'tool_used'
  | 'recipe_share'
  | 'recipe_print'
  | 'meal_save'
  | 'meal_rate'
  | 'cart_build'
  // Emitted by the engagement scorer, not by a component. Mark this one as a
  // Key Event in GA4 — it is the closest thing this site has to a conversion.
  | 'quality_session';

type ParamValue = string | number | boolean | null | undefined;

/**
 * Push a semantic event onto dataLayer for GTM to pick up.
 *
 * GA4 allows 25 parameters per event, so keep `params` small and high-signal
 * rather than shovelling component state into it.
 */
function pushEvent(event: AnalyticsEvent, params: Record<string, ParamValue>): void {
  if (typeof window === 'undefined') return;
  try {
    window.dataLayer = window.dataLayer || [];
    const clean: Record<string, ParamValue> = {};
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') clean[key] = value;
    }
    window.dataLayer.push({ event, ...clean });

    // GTM's data model persists keys across pushes, so without this reset the
    // next event inherits this one's parameters — a portion_scale arriving with
    // a stale engagement_tier from an earlier mode_switch, and so on. Setting
    // each key back to undefined makes the Data Layer Variable resolve empty,
    // and GA4 omits the parameter rather than recording a lie. The reset push
    // carries no `event` key, so it fires no tags.
    const reset: Record<string, undefined> = {};
    for (const key of Object.keys(clean)) reset[key] = undefined;
    if (Object.keys(reset).length > 0) window.dataLayer.push(reset);
  } catch {
    // Analytics is never worth breaking a page for.
  }
}

/**
 * Fire `quality_session` when a session crosses an engagement tier.
 *
 * Goes through pushEvent rather than track() on purpose: routing it back
 * through the scorer would let the event score itself.
 */
export function emitCrossing(crossing: TierCrossing | null): void {
  if (!crossing) return;
  pushEvent('quality_session', {
    engagement_tier: crossing.tier,
    engagement_score: crossing.score,
    engagement_signals: crossing.signals,
    triggered_by: crossing.trigger,
  });
}

export function track(
  event: AnalyticsEvent,
  params: Record<string, ParamValue> = {}
): void {
  pushEvent(event, params);
  emitCrossing(recordSignal(event, params));
}

/**
 * Normalise a user-typed query before it leaves the browser: trimmed, folded to
 * lower case so GA4 doesn't split one term across a dozen rows, and capped so a
 * pasted paragraph can't smuggle personal data into the property.
 */
export function searchTerm(raw: string): string {
  return raw.trim().toLowerCase().slice(0, 100);
}
