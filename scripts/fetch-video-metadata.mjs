/**
 * npm run videos:fetch          (needs YOUTUBE_API_KEY)
 *
 * Turns data/video-picks.json into data/recipe-videos.json by asking the
 * YouTube Data API what each video actually is.
 *
 * Every field written here except `why` is copied verbatim from the API. That
 * is the point: a title, a channel, an upload date, or a runtime that came out
 * of a model rather than the API is a fabricated number (HR-2), and upload
 * date and duration go straight into VideoObject markup where a wrong value is
 * a structured-data error.
 *
 * Cost: videos.list is 1 quota unit per call and takes up to 50 ids, so the
 * whole catalogue is a handful of units against the default 10,000/day.
 * Confirm your own project's quota in the Cloud Console — defaults change.
 *
 * Get a key: Cloud Console → APIs & Services → enable "YouTube Data API v3" →
 * Credentials → API key. It is a server-side key; keep it out of the client
 * bundle (this script is the only thing that reads it).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PICKS = path.join(ROOT, 'data/video-picks.json');
const OUT = path.join(ROOT, 'data/recipe-videos.json');
const BATCH = 50;

const key = process.env.YOUTUBE_API_KEY;
if (!key) {
  console.error('\n❌ YOUTUBE_API_KEY is not set.\n');
  console.error('   Enable "YouTube Data API v3" in the Cloud Console, make an API key, then:');
  console.error('     YOUTUBE_API_KEY=… npm run videos:fetch\n');
  console.error('   To check the picks without a key, run: npm run videos:check\n');
  process.exit(1);
}

const picksFile = JSON.parse(fs.readFileSync(PICKS, 'utf-8'));
const picks = Array.isArray(picksFile) ? picksFile : picksFile.picks;
const recipes = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/recipes.json'), 'utf-8'));
const slugs = new Set(recipes.map((r) => r.slug));

console.log(`\n--- FETCHING METADATA FOR ${picks.length} VIDEO(S) ---\n`);

if (picks.length === 0) {
  fs.writeFileSync(OUT, '[]\n');
  console.log('No picks. Wrote an empty data/recipe-videos.json.\n');
  process.exit(0);
}

const byId = new Map();
for (const pick of picks) {
  if (!slugs.has(pick.slug)) {
    console.error(`❌ "${pick.slug}" is not a recipe slug. Run npm run videos:check first.`);
    process.exit(1);
  }
  byId.set(pick.youtubeId, pick);
}

/** maxres is not generated for every upload, so take the largest the API reports. */
function bestThumbnail(thumbnails = {}) {
  for (const size of ['maxres', 'standard', 'high', 'medium', 'default']) {
    const t = thumbnails[size];
    if (t?.url) return { url: t.url, width: t.width ?? 0, height: t.height ?? 0 };
  }
  return null;
}

const ids = [...byId.keys()];
const records = [];
const problems = [];
let calls = 0;

for (let i = 0; i < ids.length; i += BATCH) {
  const batch = ids.slice(i, i + BATCH);
  const url = new URL('https://www.googleapis.com/youtube/v3/videos');
  url.searchParams.set('part', 'snippet,contentDetails,status');
  url.searchParams.set('id', batch.join(','));
  url.searchParams.set('key', key);

  const res = await fetch(url);
  calls += 1;
  if (!res.ok) {
    const body = await res.text();
    console.error(`\n❌ API returned HTTP ${res.status}.\n${body.slice(0, 600)}\n`);
    process.exit(1);
  }
  const body = await res.json();
  const returned = new Set();

  for (const item of body.items ?? []) {
    returned.add(item.id);
    const pick = byId.get(item.id);
    const thumb = bestThumbnail(item.snippet?.thumbnails);

    // A video we cannot embed would render as an error box inside the recipe.
    if (item.status?.embeddable === false) {
      problems.push(`${pick.slug} → ${item.id}: embedding disabled by the uploader.`);
      continue;
    }
    if (item.status?.privacyStatus !== 'public') {
      problems.push(`${pick.slug} → ${item.id}: not public (${item.status?.privacyStatus}).`);
      continue;
    }
    if (!thumb) {
      problems.push(`${pick.slug} → ${item.id}: no thumbnail returned.`);
      continue;
    }
    const blocked = item.contentDetails?.regionRestriction?.blocked;
    if (blocked?.includes('US')) {
      problems.push(`${pick.slug} → ${item.id}: blocked in the US.`);
      continue;
    }

    records.push({
      slug: pick.slug,
      youtubeId: item.id,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      channelUrl: `https://www.youtube.com/channel/${item.snippet.channelId}`,
      uploadDate: item.snippet.publishedAt,
      duration: item.contentDetails.duration,
      thumbnailUrl: thumb.url,
      thumbnailWidth: thumb.width,
      thumbnailHeight: thumb.height,
      why: pick.why.trim(),
      verifiedAt: new Date().toISOString(),
    });
  }

  // The API silently omits ids it cannot resolve rather than erroring on them.
  for (const id of batch) {
    if (!returned.has(id)) problems.push(`${byId.get(id).slug} → ${id}: not found (deleted, private, or invented).`);
  }
}

records.sort((a, b) => a.slug.localeCompare(b.slug));
fs.writeFileSync(OUT, `${JSON.stringify(records, null, 2)}\n`);

console.log(`Wrote ${records.length} verified video(s) to data/recipe-videos.json in ${calls} API call(s).`);
for (const r of records) console.log(`  ${r.slug} — ${r.title} (${r.channel})`);

if (problems.length > 0) {
  console.error(`\n⚠️  ${problems.length} pick(s) were dropped:\n`);
  for (const p of problems) console.error(`  • ${p}`);
  console.error('\nRemove or replace them in data/video-picks.json.\n');
  process.exit(1);
}
console.log('');
