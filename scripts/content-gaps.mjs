#!/usr/bin/env node
/**
 * Content gap analysis — the work-order generator for the daily content routine.
 *
 * This script finds WHERE content is missing. It never invents the content
 * itself: no cook time, temperature or nutrition value is ever derived here
 * (HR-2), and it does not emit protein x appliance recipe combinations (HR-1).
 * It reports coverage holes and ranks them; a human or an authoring agent then
 * writes each entry against a real, citable source.
 *
 *   node scripts/content-gaps.mjs           # human-readable report
 *   node scripts/content-gaps.mjs --json    # machine-readable work order
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf-8');

const RECIPE_CEILING = 228; // HR-5 (approved)

// ── parse the type unions (single source of truth, never copied) ────────────
const typesSrc = read('lib/types.ts');
const parseUnion = (name) => {
  const m = typesSrc.match(new RegExp(`export type ${name}\\s*=([^;]+);`));
  if (!m) throw new Error(`could not parse union ${name}`);
  return [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]);
};
const APPLIANCES = parseUnion('Appliance');
const CATEGORIES = parseUnion('Category');

// ── parse cook-time datasheets, per object (never one greedy regex) ─────────
const cookTimesSrc = read('data/cook-times.ts');
const datasheetBlocks = [];
{
  const re = /\n  \{\n/g;
  let m;
  while ((m = re.exec(cookTimesSrc)) !== null) {
    const close = cookTimesSrc.indexOf('\n  },', m.index);
    if (close !== -1) datasheetBlocks.push(cookTimesSrc.slice(m.index, close + 5));
  }
}
const str = (b, k) => (b.match(new RegExp(`\\n    ${k}: '((?:[^'\\\\]|\\\\.)*)'`)) || [])[1];

const datasheets = [];
for (const b of datasheetBlocks) {
  const slug = str(b, 'slug');
  if (!slug) continue;
  datasheets.push({
    slug,
    food: str(b, 'food'),
    foodSlug: str(b, 'foodSlug'),
    appliance: str(b, 'appliance'),
    relatedRecipeSlug: str(b, 'relatedRecipeSlug'),
  });
}

// ── recipes ────────────────────────────────────────────────────────────────
const recipes = JSON.parse(read('data/recipes.json'));
const recipeSlugs = new Set(recipes.map((r) => r.slug));

// ── 1. appliance depth ─────────────────────────────────────────────────────
const byAppliance = Object.fromEntries(APPLIANCES.map((a) => [a, 0]));
for (const d of datasheets) if (d.appliance in byAppliance) byAppliance[d.appliance]++;
// Depth target = 75th percentile, not the median. The median is dragged down by
// the very appliances we are trying to flag (7 of 11 sit at 0-6 while oven has
// 34), so it would report a deficit of 7 while dutch-oven has no datasheets at
// all. p75 answers "how deep is a well-covered appliance here?" instead.
// Override with --target=N.
const counts = Object.values(byAppliance).slice().sort((a, b) => a - b);
const percentile = (p) => counts[Math.min(counts.length - 1, Math.floor((counts.length - 1) * p))];
const targetArg = process.argv.find((a) => a.startsWith('--target='));
const depthTarget = targetArg ? parseInt(targetArg.split('=')[1], 10) : percentile(0.75);
const thinAppliances = Object.entries(byAppliance)
  .filter(([, n]) => n < depthTarget)
  .sort((a, b) => a[1] - b[1])
  .map(([appliance, count]) => ({ appliance, count, depthTarget, deficit: depthTarget - count }));

// ── 2. cross-appliance coverage ────────────────────────────────────────────
// Foods documented on only one appliance. The comparison surface ("chicken
// breast: air fryer vs oven vs grill") is the highest-value datasheet gap, but
// only for pairs a person would actually cook — HR-3 is judged by the author,
// not asserted here.
const foodAppliances = new Map();
for (const d of datasheets) {
  if (!d.foodSlug) continue;
  if (!foodAppliances.has(d.foodSlug)) foodAppliances.set(d.foodSlug, { food: d.food, appliances: new Set() });
  foodAppliances.get(d.foodSlug).appliances.add(d.appliance);
}
const singleApplianceFoods = [...foodAppliances.entries()]
  .filter(([, v]) => v.appliances.size === 1)
  .map(([foodSlug, v]) => ({ foodSlug, food: v.food, documentedOn: [...v.appliances] }));

// ── 3. internal-link gaps (bidirectional) ──────────────────────────────────
const unlinkedDatasheets = datasheets
  .filter((d) => !d.relatedRecipeSlug)
  .map((d) => ({ slug: d.slug, food: d.food, appliance: d.appliance }));

// A datasheet pointing at a recipe that does not exist is a live 404 risk.
const brokenDatasheetLinks = datasheets
  .filter((d) => d.relatedRecipeSlug && !recipeSlugs.has(d.relatedRecipeSlug))
  .map((d) => ({ slug: d.slug, points_at: d.relatedRecipeSlug }));

// ── 4. recipe headroom + unbuilt queue (HR-5) ──────────────────────────────
const recipeHeadroom = Math.max(0, RECIPE_CEILING - recipes.length);
let unbuiltQueue = [];
try {
  const queueSrc = read('content/recipe-queue.mjs');
  const titles = [...queueSrc.matchAll(/title\s*:\s*'((?:[^'\\]|\\.)*)'/g)].map((m) => m[1].replace(/\\'/g, "'"));
  const slugify = (t) =>
    t.toLowerCase().replace(/['’"()]/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  unbuiltQueue = titles.filter((t) => !recipeSlugs.has(slugify(t)));
} catch {
  /* queue file is optional */
}

// ── 5. category depth (thin hubs read as low-quality) ──────────────────────
const byCategory = Object.fromEntries(CATEGORIES.map((c) => [c, 0]));
for (const r of recipes) for (const c of r.categories || []) if (c in byCategory) byCategory[c]++;
const thinCategories = Object.entries(byCategory)
  .filter(([, n]) => n < 3)
  .map(([category, count]) => ({ category, count }));

// ── assemble the work order, highest value first ───────────────────────────
const report = {
  generatedFrom: { recipes: recipes.length, datasheets: datasheets.length, ceiling: RECIPE_CEILING },
  applianceDepth: byAppliance,
  priorities: [
    {
      rank: 1,
      lane: 'datasheet-depth',
      why: 'AGENTS.md §1: /how-long/* is the SEO engine. Thin appliances are the cheapest verifiable wins.',
      items: thinAppliances,
    },
    {
      rank: 2,
      lane: 'cross-appliance',
      why: 'Comparison intent ("X in an air fryer vs oven") is high-volume and currently near-unserved.',
      note: 'Author must confirm each pair is physically sensible (HR-3) before writing it.',
      count: singleApplianceFoods.length,
      items: singleApplianceFoods.slice(0, 40),
    },
    {
      rank: 3,
      lane: 'internal-links',
      why: 'Bidirectional recipe <-> datasheet links; no new prose required, pure link equity.',
      count: unlinkedDatasheets.length,
      items: unlinkedDatasheets.slice(0, 40),
    },
    {
      rank: 4,
      lane: 'recipes',
      why: `HR-5 ceiling ${RECIPE_CEILING}; ${recipeHeadroom} slot(s) left. Individually authored only (HR-1).`,
      headroom: recipeHeadroom,
      thinCategories,
      unbuiltQueueCount: unbuiltQueue.length,
      items: recipeHeadroom > 0 ? unbuiltQueue.slice(0, 20) : [],
    },
  ],
  integrity: { brokenDatasheetLinks },
};

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

// ── human-readable ─────────────────────────────────────────────────────────
const bar = (n, max) => '█'.repeat(Math.round((n / Math.max(max, 1)) * 24)).padEnd(24, '·');
const maxDepth = Math.max(...Object.values(byAppliance));

console.log(`\n  CONTENT GAP REPORT`);
console.log(`  ${recipes.length} recipes (ceiling ${RECIPE_CEILING}) · ${datasheets.length} datasheets\n`);

console.log(`  DATASHEET DEPTH BY APPLIANCE  (target ${depthTarget} = p75)`);
for (const [a, n] of Object.entries(byAppliance).sort((x, y) => y[1] - x[1])) {
  const flag = n < depthTarget ? `  ← thin, write ${depthTarget - n}` : '';
  console.log(`    ${a.padEnd(13)} ${String(n).padStart(3)}  ${bar(n, maxDepth)}${flag}`);
}

console.log(`\n  PRIORITY WORK`);
console.log(`    1. Deepen thin appliances     ${thinAppliances.reduce((s, x) => s + x.deficit, 0)} datasheets to reach depth target ${depthTarget}`);
console.log(`    2. Cross-appliance coverage   ${singleApplianceFoods.length} foods documented on only one appliance`);
console.log(`    3. Close internal links       ${unlinkedDatasheets.length} datasheets with no linked recipe`);
console.log(`    4. Recipes                    ${recipeHeadroom} slot(s) below the HR-5 ceiling, ${unbuiltQueue.length} queued but unbuilt`);

if (thinCategories.length) {
  console.log(`\n  THIN CATEGORY HUBS (<3 recipes)`);
  for (const c of thinCategories) console.log(`    ${c.category.padEnd(16)} ${c.count}`);
}

if (brokenDatasheetLinks.length) {
  console.log(`\n  ⚠ BROKEN LINKS — datasheet points at a recipe that does not exist`);
  for (const b of brokenDatasheetLinks) console.log(`    ${b.slug} → ${b.points_at}`);
}

console.log(`\n  Top thin-appliance targets:`);
for (const t of thinAppliances.slice(0, 5)) {
  console.log(`    ${t.appliance.padEnd(13)} has ${t.count}, target ${t.depthTarget} → write ${t.deficit}`);
}
console.log('');
