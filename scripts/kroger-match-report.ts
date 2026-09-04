/**
 * Measures ingredient → Kroger product match quality.
 *
 * Reports the normalized+scored pipeline against the naive baseline
 * (raw ingredient string, filter.limit=1, take whatever comes back) so the
 * value of the matching layer is a number rather than an assertion.
 *
 *   npx tsx --env-file=.env.local scripts/kroger-match-report.ts [recipeCount]
 */

import { matchIngredient, searchProducts, findLocations } from '../lib/kroger/client';
import { readFileSync } from 'node:fs';

const raw = JSON.parse(readFileSync(new URL('../data/recipes.json', import.meta.url), 'utf8'));
const RECIPES = Array.isArray(raw) ? raw : raw.recipes;

const SAMPLE = Number(process.argv[2] ?? 5);
const ZIP = process.env.KROGER_TEST_ZIP ?? '45202';

function bar(label: string) {
  console.log(`\n${'─'.repeat(72)}\n${label}\n${'─'.repeat(72)}`);
}

async function main() {
  const locations = await findLocations(ZIP, 1);
  if (!locations.length) throw new Error(`No Kroger location near ${ZIP}`);
  const { locationId, name } = locations[0];
  console.log(`Store: ${name} (${locationId})   sample: ${SAMPLE} recipes`);

  // Deterministic sample — every nth recipe, so reruns are comparable.
  const step = Math.max(1, Math.floor(RECIPES.length / SAMPLE));
  const sample = Array.from({ length: SAMPLE }, (_, i) => RECIPES[i * step]).filter(Boolean);

  let pipelineMatched = 0;
  let pipelineTotal = 0;
  let naiveMatched = 0;
  let naiveTotal = 0;

  for (const recipe of sample) {
    bar(recipe.title);

    for (const ing of recipe.ingredients) {
      // One throttled lookup must not abort a run over hundreds of ingredients.
      let naive: Awaited<ReturnType<typeof searchProducts>> = [];
      let result: Awaited<ReturnType<typeof matchIngredient>>;
      try {
        naive = await searchProducts(ing.item, locationId, 1);
        result = await matchIngredient(ing.item, locationId);
      } catch (e) {
        console.log(`  ! ${ing.item}  → request failed: ${(e as Error).message.slice(0, 90)}`);
        continue;
      }

      naiveTotal++;
      if (naive.length) naiveMatched++;
      pipelineTotal++;
      if (result.matches.length) pipelineMatched++;

      const naiveDesc = naive[0]?.description ?? '—';
      if (result.matches.length) {
        for (const m of result.matches) {
          const relaxed = m.matchedQuery !== ing.item.toLowerCase() ? `  (via "${m.matchedQuery}")` : '';
          console.log(`  ✓ ${ing.item}`);
          console.log(`      → ${m.description}  [${m.categories?.[0] ?? '?'}] score=${m.score}${relaxed}`);
          if (naiveDesc !== m.description) console.log(`      naive would pick: ${naiveDesc}`);
        }
      } else {
        console.log(`  · ${ing.item}  → abstained (${result.unmatched.join(', ')})`);
        if (naive.length) console.log(`      naive would pick: ${naiveDesc}`);
      }
    }
  }

  bar('SUMMARY');
  const pct = (n: number, d: number) => (d ? ((n / d) * 100).toFixed(0) : '0');
  console.log(`  naive (top hit, no normalization): returned something for ${naiveMatched}/${naiveTotal} (${pct(naiveMatched, naiveTotal)}%)`);
  console.log(`  pipeline (normalized + scored)   : confident match for ${pipelineMatched}/${pipelineTotal} (${pct(pipelineMatched, pipelineTotal)}%)`);
  console.log(`\n  Coverage is not the goal — correctness is. The pipeline abstains where`);
  console.log(`  naive guesses, so a lower number here can be the better outcome.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
