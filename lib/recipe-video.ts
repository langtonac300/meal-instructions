/**
 * Curated recipe videos.
 *
 * One clip per recipe, chosen by hand and then *verified against the YouTube
 * Data API* — every field below except `why` is copied verbatim from the API
 * response by scripts/fetch-video-metadata.mjs. Nothing here is typed in from
 * memory or derived from a formula (HR-2): a duration or an upload date that
 * nobody fetched is a number with no basis.
 *
 * The pipeline mirrors the recipe one (HR-11):
 *   data/video-picks.json    curated input  — slug + youtubeId + why
 *   ↓ npm run videos:fetch   calls the API
 *   data/recipe-videos.json  generated, committed, never hand-edited
 *
 * `npm run videos:check` re-verifies the picks without an API key and is the
 * gate to run before committing a new batch.
 */

import videosJson from '@/data/recipe-videos.json';

export interface RecipeVideo {
  /** Recipe this clip belongs to. */
  slug: string;
  /** 11-character YouTube id. */
  youtubeId: string;
  /** Video title, verbatim from the API. */
  title: string;
  /** Channel name and URL, verbatim from the API. */
  channel: string;
  channelUrl: string;
  /** ISO 8601 date, from the API's publishedAt. */
  uploadDate: string;
  /** ISO 8601 duration ("PT4M13S"), verbatim from the API. */
  duration: string;
  /** Best thumbnail the API reported as available, with its real dimensions. */
  thumbnailUrl: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  /**
   * Why this clip is on this recipe, in the curator's words. Doubles as the
   * VideoObject description, so it must be a real sentence and unique per
   * recipe (HR-4) — checked by scripts/check-videos.mjs.
   */
  why: string;
  /** When the metadata above was last fetched. */
  verifiedAt: string;
}

export const RECIPE_VIDEOS: RecipeVideo[] = videosJson as RecipeVideo[];

const BY_SLUG = new Map(RECIPE_VIDEOS.map((v) => [v.slug, v]));

export function getRecipeVideo(slug: string): RecipeVideo | undefined {
  return BY_SLUG.get(slug);
}

/** "PT1H4M13S" → "1:04:13", "PT4M13S" → "4:13". Null when the string is not a duration. */
export function durationLabel(iso: string): string | null {
  const m = /^P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso);
  if (!m) return null;
  const days = Number(m[1] ?? 0);
  const hours = Number(m[2] ?? 0) + days * 24;
  const minutes = Number(m[3] ?? 0);
  const seconds = Number(m[4] ?? 0);
  const pad = (n: number) => String(n).padStart(2, '0');
  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(seconds)}`
    : `${minutes}:${pad(seconds)}`;
}

/**
 * The VideoObject that goes inside the Recipe schema.
 *
 * Google requires name, description, thumbnailUrl, uploadDate, and one of
 * contentUrl / embedUrl for a video to be eligible. A record missing any of
 * them is skipped rather than emitted half-built — incomplete markup is worse
 * than none, because it fails validation on a page that would otherwise pass.
 */
export function videoSchema(video: RecipeVideo): Record<string, unknown> | null {
  if (!video.title || !video.why || !video.thumbnailUrl || !video.uploadDate) return null;
  return {
    '@type': 'VideoObject',
    name: video.title,
    description: video.why,
    thumbnailUrl: [video.thumbnailUrl],
    uploadDate: video.uploadDate,
    duration: video.duration,
    embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
    publisher: {
      '@type': 'Organization',
      name: video.channel,
      url: video.channelUrl,
    },
  };
}
