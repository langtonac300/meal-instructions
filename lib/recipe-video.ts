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

import type { MetadataRoute } from 'next';
import videosJson from '@/data/recipe-videos.json';

/** One entry in the `videos` array Next.js accepts on a sitemap URL. */
type Videos = NonNullable<MetadataRoute.Sitemap[number]['videos']>[number];

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

/** "PT1H4M13S" → 3853. Null when the string is not a duration. */
export function durationSeconds(iso: string): number | null {
  const m = /^P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso);
  if (!m) return null;
  const days = Number(m[1] ?? 0);
  const hours = Number(m[2] ?? 0);
  const minutes = Number(m[3] ?? 0);
  const seconds = Number(m[4] ?? 0);
  return ((days * 24 + hours) * 60 + minutes) * 60 + seconds;
}

/**
 * One `<video:video>` entry for the sitemap, for the recipe page the clip sits on.
 *
 * This is the discovery half of the work the VideoObject does on the page: the
 * markup makes a page *eligible* for the video badge, the sitemap is how Google
 * finds out the video is there at all. Both read the same record, so a clip
 * added to data/recipe-videos.json shows up in both without a code change.
 *
 * Same shape of skip rule as videoSchema(): Google requires title, description,
 * thumbnail_loc, and one of content_loc / player_loc, and a record missing any
 * of them is skipped rather than emitted half-built. One deliberate difference —
 * uploadDate is required for a VideoObject but publication_date is optional in a
 * video sitemap, so a record without one still earns an entry here.
 *
 * Field choices worth knowing:
 * - `player_loc`, not `content_loc`. content_loc must point at a raw media file
 *   we serve; these clips are on YouTube, so the embed URL is the honest answer.
 * - `duration` is omitted, not guessed, when the ISO string does not parse or
 *   falls outside the 1–28800s Google accepts (HR-2).
 * - `family_friendly` is omitted deliberately. Nobody rated these clips, and
 *   omitting is what Google already assumes — asserting it would be a number
 *   with no basis.
 */
export function videoSitemapEntry(video: RecipeVideo): Videos | null {
  if (!video.title || !video.why || !video.thumbnailUrl || !video.youtubeId) return null;

  const secs = durationSeconds(video.duration);

  return {
    title: video.title,
    description: video.why,
    thumbnail_loc: video.thumbnailUrl,
    player_loc: `https://www.youtube.com/embed/${video.youtubeId}`,
    ...(secs !== null && secs >= 1 && secs <= 28800 ? { duration: secs } : {}),
    ...(video.uploadDate ? { publication_date: video.uploadDate } : {}),
    ...(video.channel
      ? { uploader: { content: video.channel, ...(video.channelUrl ? { info: video.channelUrl } : {}) } }
      : {}),
  };
}
