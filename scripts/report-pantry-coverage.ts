/**
 * npm run report:pantry
 *
 * How well data/pantry.ts covers the recipe corpus. Prints every ingredient
 * line that maps to no pantry item, and every meat / seafood / egg recipe
 * that ended up with nothing required (which would show it to everyone).
 * Run after adding recipes; fix by adding a pattern to data/pantry.ts.
 */
import { RECIPES } from '../data/recipes';
import { PANTRY_ITEMS } from '../data/pantry';
import { classifyRecipe, labelFor } from '../lib/pantry-match';

let lines = 0;
let matched = 0;
let ignored = 0;
const unmatched = new Map<string, number>();
const noRequired: string[] = [];
const sample: string[] = [];

for (const r of RECIPES) {
  const c = classifyRecipe(r);
  lines += r.ingredients.length;
  ignored += c.ignored.length;
  matched += r.ingredients.length - c.ignored.length - c.unmatched.length;
  for (const line of c.unmatched) unmatched.set(line, (unmatched.get(line) ?? 0) + 1);
  if (r.protein !== 'vegetarian' && c.required.length === 0 && c.anyOf.length === 0)
    noRequired.push(`${r.id} ${r.title} [${r.protein}]`);
  if (process.argv.includes('--all') || sample.length < 12) {
    sample.push(
      `${r.id} ${r.title} [${r.protein}]\n     required: ${c.required.map(labelFor).join(', ') || '—'}${c.anyOf.map((g) => `\n     any of:   ${g.map(labelFor).join(' / ')}`).join('')}\n     flex:     ${c.flex.map(labelFor).join(', ') || '—'}`,
    );
  }
}

const considered = lines - ignored;
console.log(
  `\n--- PANTRY COVERAGE (${PANTRY_ITEMS.length} pantry items, ${RECIPES.length} recipes) ---`,
);
console.log(
  `ingredient lines: ${lines}  ignored (water/equipment): ${ignored}  matched: ${matched}/${considered} (${((100 * matched) / considered).toFixed(1)}%)`,
);

console.log(`\nUnmatched lines (${unmatched.size} distinct):`);
for (const [line, n] of [...unmatched.entries()].sort((a, b) => b[1] - a[1]))
  console.log(`  ${n}\t${line}`);

console.log(`\nNon-vegetarian recipes with nothing required (${noRequired.length}):`);
for (const s of noRequired) console.log(`  ${s}`);

console.log(`\nSample split:`);
for (const s of sample) console.log(`  ${s}`);
