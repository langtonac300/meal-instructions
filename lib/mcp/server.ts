import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { COOK_TIME_DATASHEETS } from '@/data/cook-times';
import recipesData from '@/data/recipes.json';
import type { Recipe, CookTimeDatasheet } from '@/lib/types';
import { APPLIANCES } from '@/data/appliances';
import { absoluteUrl } from '@/lib/site';

/**
 * The appliances these tools can actually answer for, derived from the datasheet
 * corpus rather than typed out.
 *
 * A hand-maintained list went stale: `boiling` was added to the corpus and works
 * end to end, but three of the five places that enumerate appliances never
 * mentioned it. A model reading the schema would therefore never ask for it — a
 * whole appliance was live and undiscoverable. Deriving the list means what we
 * document is exactly what we can serve, and appliance twelve documents itself.
 */
const SERVABLE_APPLIANCES: string[] = [
  ...new Set(COOK_TIME_DATASHEETS.map((d) => d.appliance)),
].sort();
const APPLIANCE_UNION = SERVABLE_APPLIANCES.map((a) => `"${a}"`).join(' | ');
const APPLIANCE_CSV = SERVABLE_APPLIANCES.join(', ');

/**
 * Every appliance the catalogue knows about, for tools that search *recipes*
 * rather than datasheets — a recipe can exist for an appliance that has no
 * cook-time datasheet yet, so this list is deliberately broader than
 * SERVABLE_APPLIANCES above. Sourced from data/appliances.ts, which matches the
 * Appliance union in lib/types.ts (HR-12: type unions are the contract).
 */
const ALL_APPLIANCES = APPLIANCES.map((a) => a.slug) as [string, ...string[]];
const RECIPE_COUNT = (recipesData as Recipe[]).length;
import {
  REHEAT_ITEMS,
  FROZEN_ITEMS,
  MEAT_MATH_PROFILES,
  INTERNAL_TEMP_SPECS,
  TROUBLESHOOT_ISSUES,
} from '@/data/tools-data';

const RECIPES = recipesData as Recipe[];

/**
 * Factory function creating a fully configured Meal Instructions MCP Server instance.
 */
export function createDadMealsMcpServer() {
  const server = new McpServer({
    name: 'meal-instructions',
    version: '1.0.0',
    description: 'No-fluff culinary physics, cook times, and recipe reference for AI assistants.',
  });

  // ─────────────────────────────────────────────────────────────
  // 1. TOOL: get_cook_time
  // ─────────────────────────────────────────────────────────────
  server.tool(
    'get_cook_time',
    'Get exact cooking temperatures, time ranges, flip schedules, target internal temperatures, and hardware pro tips for meat, seafood, and vegetables across oven, air fryer, Instant Pot, skillet, grill, smoker, slow cooker, Dutch oven, cast iron, and sheet pan.',
    {
      food: z.string().describe('Food item or slug (e.g. "salmon-fillet", "chicken-tenders-fresh", "pork-chops", "bone-in-thighs", "bacon", "broccoli", "ribeye", "burgers")'),
      appliance: z.string().optional().describe(`Appliance: ${APPLIANCE_UNION}`),
      state: z.enum(['fresh', 'frozen', 'refrigerated', 'dry']).optional().describe('Food state (fresh vs frozen)'),
    },
    async ({ food, appliance, state }) => {
      const q = food.toLowerCase().trim();
      const matches = COOK_TIME_DATASHEETS.filter((d) => {
        const matchesSlug = d.slug.includes(q) || q.includes(d.slug) || (d.foodSlug && (d.foodSlug.includes(q) || q.includes(d.foodSlug)));
        const matchesFood = d.food.toLowerCase().includes(q) || q.includes(d.food.toLowerCase());
        const matchesApp = !appliance || d.appliance === appliance.toLowerCase().trim();
        const matchesState = !state || d.state === state;
        return (matchesSlug || matchesFood) && matchesApp && matchesState;
      });

      if (matches.length === 0) {
        const broadMatches = COOK_TIME_DATASHEETS.filter((d) =>
          d.food.toLowerCase().includes(q) ||
          d.slug.toLowerCase().includes(q) ||
          (d.foodSlug && d.foodSlug.includes(q)) ||
          q.split(/[\s-]+/).some((word) => word.length > 2 && (d.food.toLowerCase().includes(word) || d.slug.includes(word)))
        );

        if (broadMatches.length > 0) {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    status: 'partial_matches_found',
                    requestedFood: food,
                    requestedAppliance: appliance,
                    matchesCount: broadMatches.length,
                    results: broadMatches.slice(0, 4).map((d) => formatCookTimeDatasheet(d)),
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  status: 'not_found',
                  message: `No exact cook-time datasheet found for "${food}". Available appliances: ${APPLIANCE_CSV}.`,
                  sampleSuggestions: [
                    'air-fryer: chicken-tenders-fresh, chicken-wings-fresh, salmon-fillet, pork-chops-bone-in, bacon, frozen-french-fries',
                    'oven: chicken-breast-boneless, salmon-fillet, baked-potato, bacon-sheet-pan, pork-chops-bone-in',
                    'instant-pot: white-rice, chicken-breast-fresh, hard-boiled-eggs, pot-roast, pulled-pork',
                    'grill: backyard-burgers, ribeye-steak-reverse-sear, chicken-breasts, corn-on-the-cob',
                    'cast-iron: ribeye-steak-basted, smash-burgers, blackened-cod, filet-mignon',
                    'smoker: texas-brisket, chicken-wings-crispy, pork-ribs-3-2-1, turkey-breast',
                    'slow-cooker: pot-roast, pulled-pork-shoulder, salsa-chicken, beef-and-broccoli',
                  ],
                },
                null,
                2
              ),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                status: 'success',
                matchesCount: matches.length,
                results: matches.map((d) => formatCookTimeDatasheet(d)),
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─────────────────────────────────────────────────────────────
  // 2. TOOL: get_recipe
  // ─────────────────────────────────────────────────────────────
  server.tool(
    'get_recipe',
    'Retrieve a complete curated recipe from the Meal Instructions catalog by slug. Supports "quick" mode (20-word punchy telegram execution) or "detailed" mode (full step-by-step guidance), with automatic portion/ingredient scaling.',
    {
      slug: z.string().describe('The recipe slug (e.g. "crispy-air-fryer-chicken-tenders", "backyard-grilled-burgers", "slow-cooker-pot-roast", "cast-iron-butter-basted-ribeye")'),
      mode: z.enum(['quick', 'detailed']).optional().default('quick').describe('Reading mode: "quick" for rapid execution bullets, "detailed" for full step-by-step'),
      servings: z.number().optional().describe('Desired serving count to automatically scale ingredients (default matches recipe standard servings)'),
    },
    async ({ slug, mode = 'quick', servings }) => {
      const q = slug.toLowerCase().trim();
      const recipe = RECIPES.find((r) => r.slug === q || r.slug.includes(q) || r.id === q);

      if (!recipe) {
        const suggestions = RECIPES.filter(
          (r) => r.title.toLowerCase().includes(q) || r.slug.includes(q)
        ).map((r) => ({ id: r.id, slug: r.slug, title: r.title, appliance: r.appliance }));

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  status: 'recipe_not_found',
                  searched: slug,
                  suggestions: suggestions.slice(0, 5),
                },
                null,
                2
              ),
            },
          ],
        };
      }

      const targetServings = servings || recipe.defaultServings;
      const scaleMultiplier = targetServings / recipe.defaultServings;

      const scaledIngredients = recipe.ingredients.map((ing) => {
        if (ing.qtyNumeric && scaleMultiplier !== 1) {
          const scaledVal = ing.qtyNumeric * scaleMultiplier;
          const formatted = scaledVal % 1 === 0 ? String(scaledVal) : scaledVal.toFixed(1).replace(/\.0$/, '');
          return {
            ...ing,
            qty: formatted,
            qtyNumeric: scaledVal,
          };
        }
        return ing;
      });

      const responsePayload = {
        id: recipe.id,
        slug: recipe.slug,
        title: recipe.title,
        tagline: recipe.tagline,
        appliance: recipe.appliance,
        protein: recipe.protein,
        categories: recipe.categories,
        timing: {
          prepMinutes: recipe.prepMinutes,
          cookMinutes: recipe.cookMinutes,
          totalMinutes: recipe.totalMinutes,
          restMinutes: recipe.restMinutes,
        },
        servings: targetServings,
        scaledFrom: scaleMultiplier !== 1 ? `${recipe.defaultServings} servings` : undefined,
        cookTemp: recipe.cookTemp,
        safeInternalTempF: recipe.safeInternalTempF,
        equipmentNeeded: recipe.equipmentNeeded,
        ingredients: scaledIngredients,
        instructions:
          mode === 'quick'
            ? {
                mode: 'quick',
                temp: recipe.quickVersion.temp,
                totalTime: recipe.quickVersion.totalTime,
                bullets: recipe.quickVersion.bullets,
              }
            : {
                mode: 'detailed',
                steps: recipe.detailedSteps,
              },
        dadProTip: recipe.dadProTip,
        kidAdjustment: recipe.kidAdjustment,
        reheatInstructions: recipe.reheatInstructions,
        nutrition: recipe.nutrition,
        basis: recipe.basis,
      };

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(responsePayload, null, 2),
          },
        ],
      };
    }
  );

  // ─────────────────────────────────────────────────────────────
  // 3. TOOL: search_recipes
  // ─────────────────────────────────────────────────────────────
  server.tool(
    'search_recipes',
    `Search the catalog of ${RECIPE_COUNT} curated recipes by keyword, protein, appliance, category, or maximum cooking time budget.`,
    {
      query: z.string().optional().describe('Search keyword matching title, tagline, ingredients, or keywords (e.g. "tacos", "steak", "pasta", "cauliflower")'),
      protein: z.enum(['chicken', 'beef', 'pork', 'seafood', 'turkey', 'vegetarian', 'dairy-eggs', 'lamb', 'duck', 'game']).optional().describe('Protein category'),
      appliance: z.enum(ALL_APPLIANCES).optional().describe('Cooking appliance hardware'),
      category: z.enum(['15-minute', 'high-protein', 'kid-approved', 'budget', 'no-thaw', 'one-pan', 'five-ingredient', 'sides', 'snacks', 'game-day', 'breakfast', 'weekend']).optional().describe('Intent / constraint category'),
      max_total_minutes: z.number().optional().describe('Maximum allowed prep + cook time in minutes (e.g. 15 for lightning meals, 30 for standard weeknight)'),
    },
    async ({ query, protein, appliance, category, max_total_minutes }) => {
      const q = query ? query.toLowerCase().trim() : '';

      const matches = RECIPES.filter((r) => {
        if (protein && r.protein !== protein) return false;
        if (appliance && r.appliance !== appliance) return false;
        if (category && !(r.categories as string[]).includes(category)) return false;
        if (max_total_minutes && r.totalMinutes > max_total_minutes) return false;

        if (q) {
          const matchTitle = r.title.toLowerCase().includes(q);
          const matchTagline = r.tagline.toLowerCase().includes(q);
          const matchKeywords = (r.keywords || []).some((k) => k.toLowerCase().includes(q));
          const matchIngredients = r.ingredients.some((ing) => ing.item.toLowerCase().includes(q));
          if (!matchTitle && !matchTagline && !matchKeywords && !matchIngredients) return false;
        }

        return true;
      });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                totalMatches: matches.length,
                recipes: matches.map((r) => ({
                  id: r.id,
                  slug: r.slug,
                  title: r.title,
                  appliance: r.appliance,
                  protein: r.protein,
                  categories: r.categories,
                  totalMinutes: r.totalMinutes,
                  cookTemp: r.cookTemp,
                  servings: r.defaultServings,
                  tagline: r.tagline,
                })),
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─────────────────────────────────────────────────────────────
  // 4. TOOL: revive_leftover
  // ─────────────────────────────────────────────────────────────
  server.tool(
    'revive_leftover',
    'Look up optimal hardware reheating temperature, time, and anti-sogginess pro tips to restore restaurant crunch to takeout French fries, pizza, fried chicken, wings, burgers, steak, and pastries.',
    {
      item: z.string().describe('The leftover food item (e.g. "french-fries", "pizza", "fried-chicken", "chicken-wings", "cheeseburger", "steak", "croissant", "mac-and-cheese", "egg-rolls")'),
      appliance: z.enum(['air-fryer', 'skillet']).optional().default('air-fryer').describe('Reheat appliance (air-fryer or skillet)'),
    },
    async ({ item, appliance = 'air-fryer' }) => {
      const q = item.toLowerCase().trim();
      const match = REHEAT_ITEMS.find((it) =>
        it.id.includes(q) ||
        it.name.toLowerCase().includes(q) ||
        q.includes(it.id) ||
        q.split(/[\s-]+/).some((word) => word.length > 2 && it.name.toLowerCase().includes(word))
      );

      if (!match) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  status: 'item_not_found',
                  searched: item,
                  availableItems: REHEAT_ITEMS.map((it) => it.id),
                  generalRule: 'For unlisted fried food: Air fry at 375°F for 3–5 minutes with NO extra oil. Never microwave breaded items.',
                },
                null,
                2
              ),
            },
          ],
        };
      }

      const instructions = {
        item: match.name,
        category: match.category,
        primaryMethod: appliance === 'skillet' && match.skilletMinutes ? 'Skillet' : 'Air Fryer',
        airFryer: {
          tempF: match.airFryerTemp,
          timeMinutes: match.airFryerMinutes,
          shakeAtMinute: match.shakeAtMinute,
        },
        skillet: match.skilletMinutes
          ? {
              timeMinutes: match.skilletMinutes,
              heatLevel: match.skilletTemp,
            }
          : undefined,
        antiSoggyTip: match.antiSoggyTip,
        microwaveWarning: match.microwaveWarning,
        testedWith: match.testedWith,
      };

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(instructions, null, 2),
          },
        ],
      };
    }
  );

  // ─────────────────────────────────────────────────────────────
  // 5. TOOL: emergency_frozen_cook
  // ─────────────────────────────────────────────────────────────
  server.tool(
    'emergency_frozen_cook',
    'Check if rock-hard frozen meat, poultry, or fish can be safely cooked straight from the freezer without defrosting, and get exact appliance parameters and USDA safety rules.',
    {
      item: z.string().describe('The frozen food item (e.g. "chicken-breast", "chicken-wings", "ground-beef", "salmon", "pork-chops", "steak")'),
    },
    async ({ item }) => {
      const q = item.toLowerCase().trim();
      const match = FROZEN_ITEMS.find((it) =>
        it.id.includes(q) ||
        it.name.toLowerCase().includes(q) ||
        q.includes(it.id) ||
        q.split(/[\s-]+/).some((w) => w.length > 2 && it.name.toLowerCase().includes(w))
      );

      if (!match) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  status: 'item_not_found',
                  searched: item,
                  supportedItems: FROZEN_ITEMS.map((f) => f.id),
                  usdaGeneralRule: 'Whole cuts of meat and poultry can be cooked from frozen in convection air fryers or ovens (add ~50% cook time). NEVER cook frozen meat in a slow cooker due to slow bacterial danger zone transition.',
                },
                null,
                2
              ),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                name: match.name,
                cutType: match.cutType,
                canCookFromFrozen: match.canCookFromFrozen,
                safeAppliances: match.safeAppliances,
                bannedAppliances: match.bannedAppliances,
                timingComparison: {
                  freshCookMinutes: match.freshCookMinutes,
                  frozenCookMinutes: match.frozenCookMinutes,
                  additionalMinutesNeeded: match.frozenCookMinutes - match.freshCookMinutes,
                },
                temperatureAdjustment: match.tempAdjust,
                targetInternalTempF: match.internalTargetTemp,
                coldWaterEmergencyThawMinutes: `${match.waterBathThawMinutes} mins per pound (sealed bag in cold water)`,
                usdaSafetyRationale: match.usdaRationale,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─────────────────────────────────────────────────────────────
  // 6. TOOL: calculate_meat_math
  // ─────────────────────────────────────────────────────────────
  server.tool(
    'calculate_meat_math',
    'Calculate exact raw meat purchasing requirements (in lbs or racks) for group catering and family parties based on crowd count, meat cut, bone-in ratios, and shrinkage losses.',
    {
      guest_count_adults: z.number().describe('Number of adults'),
      guest_count_children: z.number().optional().default(0).describe('Number of children'),
      meat_type: z.enum(['burgers', 'pulled-pork', 'chicken-wings', 'taco-meat', 'smoked-brisket', 'hot-dogs-brats']).describe('Meat cut profile'),
      eater_profile: z.enum(['light', 'normal', 'big_eaters']).optional().default('normal').describe('Appetite scale (light = 0.8x, normal = 1.0x, big eaters/game day = 1.3x)'),
      has_hearty_sides: z.boolean().optional().default(false).describe('Whether 3+ heavy sides (mac & cheese, potato salad, beans) are served (reduces meat needed by 15%)'),
    },
    async ({ guest_count_adults, guest_count_children = 0, meat_type, eater_profile = 'normal', has_hearty_sides = false }) => {
      const profile = MEAT_MATH_PROFILES.find((p) => p.id === meat_type);

      if (!profile) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ status: 'invalid_meat_type', supported: MEAT_MATH_PROFILES.map((p) => p.id) }, null, 2),
            },
          ],
        };
      }

      const multiplier = eater_profile === 'light' ? 0.8 : eater_profile === 'big_eaters' ? 1.3 : 1.0;
      const sideFactor = has_hearty_sides ? 0.85 : 1.0;

      const rawOzAdults = guest_count_adults * profile.rawOzPerAdult * multiplier * sideFactor;
      const rawOzKids = guest_count_children * profile.rawOzPerChild * multiplier * sideFactor;
      const totalRawOz = rawOzAdults + rawOzKids;
      const totalRawLbs = Math.ceil((totalRawOz / 16) * 10) / 10;
      const cookedYieldLbs = Math.round(totalRawLbs * (1 - profile.shrinkagePercent / 100) * 10) / 10;

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                meatType: profile.name,
                guests: {
                  adults: guest_count_adults,
                  children: guest_count_children,
                  total: guest_count_adults + guest_count_children,
                },
                appetiteMultiplier: `${multiplier}x (${eater_profile})`,
                recommendedRawPurchaseLbs: `${totalRawLbs} lbs raw meat`,
                estimatedCookedYieldLbs: `${cookedYieldLbs} lbs cooked meat`,
                shrinkageLoss: `${profile.shrinkagePercent}% (cooking moisture, fat render, and bones)`,
                servingUnit: profile.servingUnitName,
                sidesRecommendations: profile.sideRecommendations,
                buyingProTip: profile.costcoPackTip,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─────────────────────────────────────────────────────────────
  // 7. TOOL: calculate_pull_temp
  // ─────────────────────────────────────────────────────────────
  server.tool(
    'calculate_pull_temp',
    'Calculate exact thermometer pull temperature accounting for thickness and thermal carryover cooking rise so meats rest to the exact desired doneness without overcooking.',
    {
      meat: z.string().describe('Meat cut (e.g. "thick-steak", "pork-tenderloin", "chicken-breast", "salmon", "burger")'),
      target_doneness: z.enum(['rare', 'medium_rare', 'medium', 'medium_well', 'well']).optional().default('medium_rare').describe('Target doneness preference'),
    },
    async ({ meat, target_doneness = 'medium_rare' }) => {
      const q = meat.toLowerCase().trim();
      const spec = INTERNAL_TEMP_SPECS.find(
        (s) => s.id.includes(q) || s.name.toLowerCase().includes(q) || q.includes(s.id)
      );

      if (!spec) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  status: 'spec_not_found',
                  searched: meat,
                  availableSpecs: INTERNAL_TEMP_SPECS.map((s) => s.id),
                  standardPullRules: {
                    steaks: 'Pull 5°F–7°F below target (e.g. pull at 128°F for 135°F medium-rare).',
                    poultry: 'USDA safe minimum is 165°F (pull whole breasts at 160°F with 5-min foil rest).',
                    pork: 'USDA safe minimum is 145°F with a 3-minute rest (pull at 140°F).',
                    groundMeat: 'Always cook to 160°F internal for food safety.',
                  },
                },
                null,
                2
              ),
            },
          ],
        };
      }

      const donenessMap: Record<string, string> = {
        rare: 'Rare',
        medium_rare: 'Medium-Rare',
        medium: 'Medium',
        medium_well: 'Medium-Well',
        well: 'Well-Done',
      };

      const searchLabel = donenessMap[target_doneness] || 'Medium-Rare';
      const level =
        spec.donenessLevels.find((l) => l.label.toLowerCase().includes(searchLabel.toLowerCase())) ||
        spec.donenessLevels[0];

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                meatCut: spec.name,
                thicknessStandard: spec.thickness,
                selectedDoneness: level.label,
                pullTempF: `${level.pullTemp}°F (REMOVE FROM HEAT HERE)`,
                finalTargetTempF: `${level.finalTargetTemp}°F (AFTER RESTING)`,
                expectedCarryoverRiseF: `+${level.carryoverRise}°F thermal rise during rest`,
                restMinutes: `${level.restMinutes} minutes on cutting board (do not slice immediately)`,
                visualCue: level.colorVisual,
                usdaSafeMinimumF: `${spec.usdaSafeMin}°F`,
                foodScienceRationale: spec.scienceNote,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─────────────────────────────────────────────────────────────
  // 8. TOOL: troubleshoot_cooking
  // ─────────────────────────────────────────────────────────────
  server.tool(
    'troubleshoot_cooking',
    'Instant 1-click diagnoses and fixes for common kitchen failures (smoking air fryers, gray unseared steak, soggy veggies, peeling breading, rubbery chicken).',
    {
      symptom: z.string().describe('The problem symptom (e.g. "smoking", "gray-steak", "soggy", "breading", "dry", "burned-sauce")'),
      appliance: z.string().optional().describe('Cooking hardware or category (e.g. "air-fryer", "pan-sear", "meat")'),
    },
    async ({ symptom, appliance }) => {
      const q = symptom.toLowerCase().trim();
      const app = appliance ? appliance.toLowerCase().trim() : '';

      const match = TROUBLESHOOT_ISSUES.find((issue) => {
        const symptomWords = issue.symptom.toLowerCase().split(/[\s-]+/);
        const searchWords = q.split(/[\s-]+/);

        const matchesSymptom =
          issue.id.includes(q) ||
          q.includes(issue.id) ||
          issue.symptom.toLowerCase().includes(q) ||
          q.includes(issue.symptom.toLowerCase()) ||
          searchWords.some((sw) => {
            if (sw.length < 3) return false;
            const stem = sw.slice(0, 4);
            return (
              issue.id.includes(stem) ||
              issue.symptom.toLowerCase().includes(stem) ||
              symptomWords.some((w) => w.startsWith(stem) || stem.startsWith(w.slice(0, 4)))
            );
          });

        const matchesApp = !app || issue.category.toLowerCase().includes(app) || app.includes(issue.category);
        return matchesSymptom && matchesApp;
      });

      if (!match) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  status: 'issue_not_found',
                  searched: { symptom, appliance },
                  commonIssues: TROUBLESHOOT_ISSUES.map((iss) => ({
                    id: iss.id,
                    category: iss.category,
                    symptom: iss.symptom,
                  })),
                },
                null,
                2
              ),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                id: match.id,
                category: match.category,
                symptom: match.symptom,
                rootCause: match.rootCause,
                instantFiveSecFix: match.instantFiveSecFix,
                futurePrevention: match.futurePrevention,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  return server;
}

function formatCookTimeDatasheet(d: CookTimeDatasheet) {
  return {
    id: d.id,
    slug: d.slug,
    food: d.food,
    foodSlug: d.foodSlug,
    appliance: d.appliance,
    cutOrPrep: d.cutOrPrep,
    state: d.state,
    temperature: {
      fahrenheit: `${d.tempF}°F`,
      celsius: `${d.tempC}°C`,
      display: d.tempFormatted,
    },
    timeMinutes: {
      min: d.timeMinMinutes,
      max: d.timeMaxMinutes,
      display: d.timeFormatted,
    },
    flipAtMinutes: d.flipAtMinutes,
    targetInternalTemp: d.internalTempTargetFormatted,
    restMinutes: `${d.restMinutes} mins`,
    donenessCue: d.donenessCue,
    oilSprayRequired: d.oilSprayRequired,
    proTip: d.proTip,
    hardwareTestingBasis: d.verificationBasis,
    canonicalUrl: absoluteUrl(`/how-long/${d.appliance}/${d.foodSlug}`),
    ...(d.pressureMinutes != null && { pressureMinutes: d.pressureMinutes }),
    ...(d.releaseMethod && { releaseMethod: d.releaseMethod }),
  };
}

export const createMealInstructionsMcpServer = createDadMealsMcpServer;

