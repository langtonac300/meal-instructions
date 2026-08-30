#!/usr/bin/env node
/**
 * Pre-flight schema validator for content/recipes/*.ts
 *
 * Catches the same class of errors `next build` catches via tsc, but reports
 * ALL of them in one sub-second pass instead of failing on the first one after
 * a 40-second compile. Run this before `npm run build` in the daily routine so
 * a bad batch never reaches Vercel.
 *
 * Unions are parsed out of lib/types.ts at runtime — there is no second copy of
 * the contract to drift out of sync (HR-12).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const typesPath = path.join(root, 'lib/types.ts');
const recipesJsonPath = path.join(root, 'data/recipes.json');

const typesSrc = fs.readFileSync(typesPath, 'utf-8');

/** Parse `export type X = | 'a' | 'b';` out of lib/types.ts — single source of truth. */
function parseUnion(name) {
  const m = typesSrc.match(new RegExp(`export type ${name}\\s*=([^;]+);`));
  if (!m) throw new Error(`Could not parse union ${name} from lib/types.ts`);
  return new Set([...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]));
}

/** Parse an inline literal union on an interface field, e.g. `difficulty: 'A' | 'B';` */
function parseInlineUnion(iface, field) {
  const block = typesSrc.match(new RegExp(`export interface ${iface} \\{[\\s\\S]*?\\n\\}`));
  if (!block) throw new Error(`Could not find interface ${iface}`);
  const line = block[0].match(new RegExp(`\\n\\s*${field}\\??:\\s*([^;]+);`));
  if (!line) throw new Error(`Could not find field ${field} on ${iface}`);
  return new Set([...line[1].matchAll(/'([^']+)'/g)].map((x) => x[1]));
}

const APPLIANCES = parseUnion('Appliance');
const CATEGORIES = parseUnion('Category');
const PROTEINS = parseUnion('ProteinType');
const DIFFICULTY = parseInlineUnion('Recipe', 'difficulty');

// Required scalar fields on Recipe (non-optional in the interface).
const REQUIRED = [
  'id', 'slug', 'title', 'tagline', 'appliance', 'categories', 'protein',
  'prepMinutes', 'cookMinutes', 'totalMinutes', 'defaultServings', 'basis',
  'cookTemp', 'cookTempF', 'cookTempC', 'equipmentNeeded',
  'quickVersion', 'detailedSteps', 'ingredients',
  'dadProTip', 'sideSuggestions', 'reheatInstructions',
  'kidRating', 'difficulty', 'keywords', 'datePublished', 'lastUpdated',
];

const errors = [];
const err = (slug, msg) => errors.push(`${slug}: ${msg}`);

const recipes = JSON.parse(fs.readFileSync(recipesJsonPath, 'utf-8'));

for (const r of recipes) {
  const slug = r.slug || r.id || '<unknown>';

  for (const f of REQUIRED) {
    if (r[f] === undefined || r[f] === null) err(slug, `missing required field \`${f}\``);
  }

  // `null` is not assignable to `number | undefined` — tsc rejects it, so do we.
  for (const [k, v] of Object.entries(r)) {
    if (v === null) err(slug, `field \`${k}\` is null — omit the field instead (HR-2)`);
  }

  if (r.appliance && !APPLIANCES.has(r.appliance))
    err(slug, `appliance "${r.appliance}" not in Appliance union (HR-12)`);

  if (r.protein && !PROTEINS.has(r.protein))
    err(slug, `protein "${r.protein}" not in ProteinType union (HR-12)`);

  if (r.difficulty && !DIFFICULTY.has(r.difficulty))
    err(slug, `difficulty "${r.difficulty}" not in [${[...DIFFICULTY].join(' | ')}]`);

  for (const c of r.categories || []) {
    if (!CATEGORIES.has(c)) err(slug, `category "${c}" not in Category union (HR-12)`);
    if (APPLIANCES.has(c)) err(slug, `category "${c}" collides with an Appliance (HR-13)`);
  }

  // HR-2: every cook time needs a sourced basis.
  if (typeof r.basis === 'string' && r.basis.trim() === '')
    err(slug, 'empty `basis` — every cook time needs a verification basis (HR-2)');

  if (r.nutrition && !r.nutrition.source)
    err(slug, 'nutrition object present without a `source` field (HR-2)');

  if (typeof r.kidRating === 'number' && (r.kidRating < 1 || r.kidRating > 5))
    err(slug, `kidRating ${r.kidRating} out of range 1–5`);

  // Shape checks that would otherwise surface only at render time.
  for (const [i, ing] of (r.ingredients || []).entries()) {
    if (ing.qty === undefined) err(slug, `ingredients[${i}] missing \`qty\` (HR-14)`);
  }
}

// HR-5: recipe ceiling (raised 150 → 200 with Alex's sign-off).
const CEILING = 200;
if (recipes.length > CEILING)
  errors.push(`HR-5: ${recipes.length} recipes exceeds the ceiling of ${CEILING} — needs Alex's sign-off`);

if (errors.length) {
  console.error(`\n❌ validate:recipes FAILED — ${errors.length} error(s) across ${recipes.length} recipes:\n`);
  for (const e of errors) console.error(`  • ${e}`);
  console.error('');
  process.exit(1);
}

console.log(`✅ validate:recipes — ${recipes.length} recipes conform to the lib/types.ts contract (ceiling ${CEILING}).`);
