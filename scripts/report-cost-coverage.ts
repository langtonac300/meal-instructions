/**
 * Lists every recipe ingredient line the cost engine cannot price, grouped by
 * why. Mirrors `report:pantry`: the point is to make gaps visible so they get
 * closed with sourced data, never to paper over them.
 *
 * Runs without live prices. Package sizes come from
 * `data/kroger-matches.generated.json`, which already carries a real `size`
 * per matched product, and every price is set to $1.00. Dollar totals are
 * therefore meaningless here — COVERAGE is the output, and it is exactly the
 * coverage the real price table will have, because a missing price is the one
 * reason this run cannot see.
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  canonicalIngredient,
  costLine,
  parsePackageSize,
  type IngredientPrice,
  type UncostableReason,
} from '../lib/ingredient-cost';

const root = process.cwd();
const read = (p: string) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));

const recipesRaw = read('data/recipes.json');
const recipes = Array.isArray(recipesRaw) ? recipesRaw : recipesRaw.recipes;
const matches = read('data/kroger-matches.generated.json').ingredients as Record<
  string,
  { size?: string; description?: string }[]
>;

// One placeholder-priced entry per canonical ingredient, from the best match.
const prices: Record<string, IngredientPrice> = {};
for (const [raw, list] of Object.entries(matches)) {
  if (!list?.length) continue;
  const key = canonicalIngredient(raw);
  if (prices[key]) continue;
  prices[key] = {
    packagePrice: 1,
    packageSize: list[0].size ?? '',
    source: 'placeholder (coverage probe only)',
    fetchedAt: 'n/a',
  };
}

const byReason = new Map<UncostableReason, Map<string, number>>();
/**
 * How many RECIPES each unpriced major ingredient blocks.
 *
 * The line counts below say what is missing; this says what it costs us. One
 * unpriced major ingredient suppresses the whole recipe's number (see
 * `costFor`), so an ingredient in two recipes matters less than a line count
 * suggests, and one in twenty matters far more. This list is the work queue.
 */
const blockers = new Map<string, Set<string>>();
let costed = 0;
let total = 0;
let recipesShowable = 0;

for (const recipe of recipes) {
  let majorMissing = 0;
  for (const ingredient of recipe.ingredients ?? []) {
    total += 1;
    const line = costLine(ingredient, prices);
    if (line.dollars !== null) {
      costed += 1;
      continue;
    }
    if (line.isMajor) {
      majorMissing += 1;
      if (!blockers.has(line.canonical)) blockers.set(line.canonical, new Set());
      blockers.get(line.canonical)!.add(recipe.slug);
    }
    const reason = line.reason as UncostableReason;
    if (!byReason.has(reason)) byReason.set(reason, new Map());
    const bucket = byReason.get(reason)!;
    bucket.set(line.canonical, (bucket.get(line.canonical) ?? 0) + 1);
  }
  if (majorMissing === 0 && (recipe.ingredients?.length ?? 0) > 0) recipesShowable += 1;
}

const pct = (n: number) => `${((n / total) * 100).toFixed(1)}%`;
console.log(`\ningredient lines: ${total}`);
console.log(`costable        : ${costed} (${pct(costed)})`);
console.log(`un-costable     : ${total - costed} (${pct(total - costed)})`);
console.log(
  `recipes able to show a cost: ${recipesShowable}/${recipes.length} ` +
    `(${((recipesShowable / recipes.length) * 100).toFixed(1)}%) — every major line priced\n`,
);

const queue = [...blockers.entries()].sort((a, b) => b[1].size - a[1].size).slice(0, 15);
console.log('--- top blockers: unpriced MAJOR ingredients, by recipes suppressed');
for (const [name, slugs] of queue) {
  console.log(`      ${String(slugs.size).padStart(3)} recipes  ${name}`);
}
console.log();

const ordered = [...byReason.entries()].sort(
  (a, b) => sum(b[1]) - sum(a[1])
);
for (const [reason, bucket] of ordered) {
  console.log(`--- ${reason}: ${sum(bucket)} lines, ${bucket.size} ingredients`);
  const top = [...bucket.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12);
  for (const [name, count] of top) console.log(`      ${String(count).padStart(4)}  ${name}`);
  if (bucket.size > 12) console.log(`      ... and ${bucket.size - 12} more`);
  console.log();
}

// Package strings the parser rejects are a separate, fixable defect.
const badSizes = new Set<string>();
for (const list of Object.values(matches)) {
  for (const m of list ?? []) {
    if (m.size && !parsePackageSize(m.size)) badSizes.add(m.size);
  }
}
if (badSizes.size) {
  console.log(`--- package size strings the parser rejects: ${badSizes.size}`);
  console.log(`      ${[...badSizes].slice(0, 15).join(' | ')}\n`);
}

function sum(m: Map<string, number>): number {
  let t = 0;
  for (const v of m.values()) t += v;
  return t;
}
