/**
 * npm run videos:check
 *
 * The gate for a batch of curated recipe videos. Needs no API key.
 *
 * A model asked to "find a video" will happily produce an id-shaped string for
 * a video that does not exist, so every id here is checked against YouTube's
 * oEmbed endpoint: 200 means the video is real, public, and embeddable; 404
 * means it does not exist or is private; 401/403 means embedding is turned off
 * and the player would render as an error inside our page.
 *
 * Also checks the things the API cannot: that each slug is a real recipe, that
 * no recipe is picked twice, and that every `why` note is a unique sentence
 * (HR-4 — it becomes the VideoObject description).
 *
 * Exit 0 means the picks are safe to fetch metadata for.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PICKS = path.join(ROOT, 'data/video-picks.json');
const GENERATED = path.join(ROOT, 'data/recipe-videos.json');

const ID_RE = /^[A-Za-z0-9_-]{11}$/;
const MIN_WHY = 25;
const MAX_WHY = 300;
/** oEmbed is a courtesy endpoint, not a bulk API. Keep the parallelism polite. */
const CONCURRENCY = 4;

const errors = [];
const warnings = [];

const recipes = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/recipes.json'), 'utf-8'));
const slugs = new Set(recipes.map((r) => r.slug));

if (!fs.existsSync(PICKS)) {
  console.error(`❌ Missing ${path.relative(ROOT, PICKS)}`);
  process.exit(1);
}
const picksFile = JSON.parse(fs.readFileSync(PICKS, 'utf-8'));
const picks = Array.isArray(picksFile) ? picksFile : picksFile.picks;

if (!Array.isArray(picks)) {
  console.error('❌ video-picks.json must be {"picks": [...]} or a bare array.');
  process.exit(1);
}

console.log(`\n--- CHECKING ${picks.length} VIDEO PICKS (npm run videos:check) ---\n`);

if (picks.length === 0) {
  console.log('No picks yet. Nothing to check — the site renders without videos.\n');
  process.exit(0);
}

// ─── 1. Shape, before spending a request on anything ─────────────────────────

const seenSlugs = new Map();
const seenIds = new Map();
const seenWhy = new Map();

for (const [i, pick] of picks.entries()) {
  const where = `picks[${i}]${pick?.slug ? ` (${pick.slug})` : ''}`;

  if (!pick || typeof pick !== 'object') {
    errors.push(`${where}: not an object.`);
    continue;
  }
  const { slug, youtubeId, why } = pick;

  if (typeof slug !== 'string' || !slugs.has(slug)) {
    errors.push(`${where}: "${slug}" is not a recipe slug in data/recipes.json.`);
  } else if (seenSlugs.has(slug)) {
    errors.push(`${where}: ${slug} already picked at picks[${seenSlugs.get(slug)}]. One clip per recipe.`);
  } else {
    seenSlugs.set(slug, i);
  }

  if (typeof youtubeId !== 'string' || !ID_RE.test(youtubeId)) {
    errors.push(`${where}: "${youtubeId}" is not an 11-character YouTube id.`);
  } else if (seenIds.has(youtubeId)) {
    warnings.push(`${where}: same video as picks[${seenIds.get(youtubeId)}]. Fine if deliberate.`);
  } else {
    seenIds.set(youtubeId, i);
  }

  if (typeof why !== 'string' || why.trim().length < MIN_WHY) {
    errors.push(`${where}: "why" must be at least ${MIN_WHY} characters saying what the clip shows.`);
  } else if (why.length > MAX_WHY) {
    errors.push(`${where}: "why" is ${why.length} characters; keep it under ${MAX_WHY}.`);
  } else {
    const key = why.trim().toLowerCase();
    if (seenWhy.has(key)) {
      errors.push(`${where}: "why" duplicates picks[${seenWhy.get(key)}] — it becomes the schema description, so it must be unique (HR-4).`);
    } else {
      seenWhy.set(key, i);
    }
  }
}

if (errors.length > 0) {
  console.error('❌ VIDEO PICKS FAILED (shape):\n');
  for (const e of errors) console.error(`  • ${e}`);
  console.error('\nFix these before checking the ids against YouTube.\n');
  process.exit(1);
}

// ─── 2. Does each video actually exist, and may we embed it? ─────────────────

const OEMBED = 'https://www.youtube.com/oembed';

async function probe(pick) {
  const url = `${OEMBED}?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${pick.youtubeId}`)}&format=json`;
  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (res.status === 200) {
      const body = await res.json();
      return { ok: true, pick, title: body.title, channel: body.author_name };
    }
    // YouTube answers 404 for a well-formed id with no video behind it and 400
    // for one it will not even look up. Both mean the same thing to a curator.
    if (res.status === 404 || res.status === 400) {
      return { ok: false, pick, reason: 'no such video — invented, deleted, or private' };
    }
    if (res.status === 401 || res.status === 403) {
      return { ok: false, pick, reason: 'embedding is disabled by the uploader' };
    }
    return { ok: false, pick, reason: `unexpected HTTP ${res.status}` };
  } catch (err) {
    return { ok: false, pick, reason: `request failed (${err.message})`, network: true };
  }
}

const results = [];
for (let i = 0; i < picks.length; i += CONCURRENCY) {
  results.push(...(await Promise.all(picks.slice(i, i + CONCURRENCY).map(probe))));
  process.stdout.write(`\r  probed ${Math.min(i + CONCURRENCY, picks.length)}/${picks.length}`);
}
process.stdout.write('\n\n');

const networkFailures = results.filter((r) => r.network);
if (networkFailures.length === results.length && results.length > 0) {
  console.error('❌ Every request failed — this looks like no network access, not bad picks.');
  console.error('   Behind a proxy, try: NODE_USE_ENV_PROXY=1 npm run videos:check\n');
  process.exit(1);
}

for (const r of results) {
  if (!r.ok) errors.push(`${r.pick.slug} → ${r.pick.youtubeId}: ${r.reason}.`);
}

// ─── 3. Is the generated file in step with the picks? ────────────────────────

if (fs.existsSync(GENERATED)) {
  const generated = JSON.parse(fs.readFileSync(GENERATED, 'utf-8'));
  const byId = new Map(generated.map((v) => [v.slug, v.youtubeId]));
  const stale = picks.filter((p) => byId.get(p.slug) !== p.youtubeId);
  const orphans = generated.filter((v) => !seenSlugs.has(v.slug));
  if (stale.length > 0) {
    warnings.push(`${stale.length} pick(s) have no fetched metadata yet — run: npm run videos:fetch`);
  }
  if (orphans.length > 0) {
    warnings.push(`${orphans.length} generated record(s) are no longer picked — re-run videos:fetch to drop them.`);
  }
}

// ─── Report ──────────────────────────────────────────────────────────────────

for (const w of warnings) console.log(`⚠️  ${w}`);
if (warnings.length > 0) console.log('');

if (errors.length > 0) {
  console.error('❌ VIDEO PICKS FAILED:\n');
  for (const e of errors) console.error(`  • ${e}`);
  console.error('\nAn id that does not resolve was almost certainly invented. Replace it with one');
  console.error('taken from a real search result, do not guess a correction.\n');
  process.exit(1);
}

console.log(`✅ VIDEO PICKS PASSED: ${picks.length} clip(s) exist, are public, and are embeddable.`);
for (const r of results) {
  console.log(`   ${r.pick.slug}\n     ${r.title} — ${r.channel}`);
}
console.log('');
