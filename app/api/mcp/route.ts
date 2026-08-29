import { NextRequest, NextResponse } from 'next/server';
import { COOK_TIME_DATASHEETS } from '@/data/cook-times';
import recipesData from '@/data/recipes.json';
import type { Recipe } from '@/lib/types';
import {
  REHEAT_ITEMS,
  FROZEN_ITEMS,
  MEAT_MATH_PROFILES,
  INTERNAL_TEMP_SPECS,
  TROUBLESHOOT_ISSUES,
} from '@/data/tools-data';

const RECIPES = recipesData as Recipe[];

const TOOLS_METADATA = [
  {
    name: 'get_cook_time',
    description: 'Get exact cooking temperatures, time ranges, flip schedules, target internal temperatures, and hardware pro tips across 8 appliances.',
    inputSchema: {
      type: 'object',
      properties: {
        food: { type: 'string', description: 'Food item or slug (e.g. "salmon-fillet", "chicken-tenders-fresh", "pork-chops", "bone-in-thighs", "bacon", "ribeye")' },
        appliance: { type: 'string', description: 'Appliance hardware ("air-fryer" | "skillet" | "sheet-pan" | "cast-iron" | "grill" | "dutch-oven" | "slow-cooker" | "smoker")' },
        state: { type: 'string', enum: ['fresh', 'frozen', 'refrigerated'] },
      },
      required: ['food'],
    },
  },
  {
    name: 'get_recipe',
    description: 'Retrieve a complete curated recipe from the Meal Instructions catalog by slug in "quick" or "detailed" mode with portion scaling.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: { type: 'string', description: 'The recipe slug (e.g. "crispy-air-fryer-chicken-tenders", "backyard-grilled-burgers")' },
        mode: { type: 'string', enum: ['quick', 'detailed'], default: 'quick' },
        servings: { type: 'number', description: 'Desired serving count to automatically scale ingredients' },
      },
      required: ['slug'],
    },
  },
  {
    name: 'search_recipes',
    description: 'Search the catalog of 70 curated recipes by keyword, protein, appliance, category, or time budget.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        protein: { type: 'string', enum: ['chicken', 'beef', 'pork', 'seafood', 'turkey', 'vegetarian', 'dairy-eggs'] },
        appliance: { type: 'string', enum: ['air-fryer', 'skillet', 'sheet-pan', 'cast-iron', 'grill', 'dutch-oven', 'slow-cooker', 'smoker'] },
        category: { type: 'string', enum: ['15-minute', 'high-protein', 'kid-approved', 'budget', 'no-thaw', 'one-pan', 'five-ingredient', 'sides', 'snacks', 'game-day', 'breakfast', 'weekend'] },
        max_total_minutes: { type: 'number' },
      },
    },
  },
  {
    name: 'revive_leftover',
    description: 'Optimal hardware reheating temperature, time, and anti-sogginess pro tips to restore restaurant crunch to takeout French fries, pizza, wings, burgers, etc.',
    inputSchema: {
      type: 'object',
      properties: {
        item: { type: 'string', description: 'The leftover item (e.g. "french-fries", "pizza", "fried-chicken", "chicken-wings")' },
        appliance: { type: 'string', enum: ['air-fryer', 'skillet'], default: 'air-fryer' },
      },
      required: ['item'],
    },
  },
  {
    name: 'emergency_frozen_cook',
    description: 'Check if rock-hard frozen meat can be cooked straight from freezer without defrosting + exact appliance parameters.',
    inputSchema: {
      type: 'object',
      properties: {
        item: { type: 'string', description: 'The frozen item (e.g. "chicken-breast", "ground-beef", "salmon")' },
      },
      required: ['item'],
    },
  },
  {
    name: 'calculate_meat_math',
    description: 'Calculate raw meat purchasing weights (lbs) for parties based on guest count, cut, bone-in ratios, and shrinkage.',
    inputSchema: {
      type: 'object',
      properties: {
        guest_count_adults: { type: 'number' },
        guest_count_children: { type: 'number', default: 0 },
        meat_type: { type: 'string', enum: ['burgers', 'pulled-pork', 'chicken-wings', 'taco-meat', 'smoked-brisket', 'hot-dogs-brats'] },
        eater_profile: { type: 'string', enum: ['light', 'normal', 'big_eaters'], default: 'normal' },
        has_hearty_sides: { type: 'boolean', default: false },
      },
      required: ['guest_count_adults', 'meat_type'],
    },
  },
  {
    name: 'calculate_pull_temp',
    description: 'Calculate exact thermometer pull temperature accounting for thickness and thermal carryover cooking rise.',
    inputSchema: {
      type: 'object',
      properties: {
        meat: { type: 'string' },
        target_doneness: { type: 'string', enum: ['rare', 'medium_rare', 'medium', 'medium_well', 'well'], default: 'medium_rare' },
      },
      required: ['meat'],
    },
  },
  {
    name: 'troubleshoot_cooking',
    description: 'Instant 1-click diagnoses and fixes for common kitchen failures (smoking air fryers, gray steak, soggy veggies, peeling breading).',
    inputSchema: {
      type: 'object',
      properties: {
        symptom: { type: 'string' },
        appliance: { type: 'string' },
      },
      required: ['symptom'],
    },
  },
];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  return NextResponse.json(
    {
      name: 'meal-instructions',
      version: '1.0.0',
      description: 'No-fluff culinary physics, cook times, and recipe reference for AI assistants.',
      protocolVersion: '2024-11-05',
      capabilities: {
        tools: { listChanged: false },
      },
      tools: TOOLS_METADATA,
    },
    { headers: CORS_HEADERS }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, method, params } = body;

    // 1. Initialize Handshake
    if (method === 'initialize') {
      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id: id ?? 1,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: {
              tools: { listChanged: false },
            },
            serverInfo: {
              name: 'meal-instructions',
              version: '1.0.0',
            },
          },
        },
        { headers: CORS_HEADERS }
      );
    }

    // 2. Ping / Notifications
    if (method === 'ping' || method === 'notifications/initialized') {
      return NextResponse.json({ jsonrpc: '2.0', id, result: {} }, { headers: CORS_HEADERS });
    }

    // 3. List Tools
    if (method === 'tools/list') {
      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            tools: TOOLS_METADATA,
          },
        },
        { headers: CORS_HEADERS }
      );
    }

    // 4. Call Tool
    if (method === 'tools/call') {
      const toolName = params?.name;
      const args = params?.arguments || {};

      let resultText = '';

      if (toolName === 'get_cook_time') {
        const q = (args.food || '').toLowerCase().trim();
        const appFilter = (args.appliance || '').toLowerCase().trim();
        const stateFilter = (args.state || '').toLowerCase().trim();
        let matches = COOK_TIME_DATASHEETS.filter((d) => d.slug.includes(q) || d.food.toLowerCase().includes(q));
        if (appFilter) matches = matches.filter((d) => d.appliance === appFilter);
        if (stateFilter) matches = matches.filter((d) => d.state === stateFilter);
        resultText = matches.length > 0
          ? JSON.stringify(matches.slice(0, 5).map((d) => ({
              food: d.food, appliance: d.appliance, state: d.state,
              temp: d.tempFormatted, time: d.timeFormatted,
              flipAt: d.flipAtMinutes > 0 ? `${d.flipAtMinutes} min` : 'No flip',
              internalTarget: d.internalTempTargetFormatted,
              donenessCue: d.donenessCue, proTip: d.proTip,
              rest: `${d.restMinutes} min`, oilSpray: d.oilSprayRequired,
              url: `https://www.mealinstructions.com/how-long/${d.appliance}/${d.foodSlug}`,
              source: d.verificationBasis,
            })), null, 2)
          : JSON.stringify({ error: 'No matching cook-time datasheet found', query: q, hint: 'Try a food name like "chicken-tenders", "salmon", or "pork-chops"' }, null, 2);

      } else if (toolName === 'get_recipe') {
        const q = (args.slug || '').toLowerCase().trim();
        const r = RECIPES.find((item) => item.slug === q || item.slug.includes(q));
        resultText = r
          ? JSON.stringify({ ...r, url: `https://www.mealinstructions.com/recipes/${r.slug}` }, null, 2)
          : JSON.stringify({ error: 'Recipe not found', query: q, hint: 'Try a slug like "crispy-air-fryer-chicken-tenders" or "backyard-grilled-burgers"' }, null, 2);

      } else if (toolName === 'search_recipes') {
        let results = [...RECIPES];
        const q = (args.query || '').toLowerCase().trim();
        if (q) results = results.filter((r) =>
          r.title.toLowerCase().includes(q) ||
          r.slug.includes(q) ||
          (r.keywords && r.keywords.some((k: string) => k.toLowerCase().includes(q)))
        );
        if (args.appliance) results = results.filter((r) => r.appliance === args.appliance);
        if (args.category) results = results.filter((r) => r.categories.includes(args.category));
        if (args.max_total_minutes) results = results.filter((r) => r.totalMinutes <= args.max_total_minutes);
        resultText = JSON.stringify({
          total: results.length,
          recipes: results.slice(0, 10).map((r) => ({
            title: r.title, slug: r.slug, appliance: r.appliance,
            totalMinutes: r.totalMinutes, cookTemp: r.cookTemp, tagline: r.tagline,
            url: `https://www.mealinstructions.com/recipes/${r.slug}`,
          })),
        }, null, 2);

      } else if (toolName === 'revive_leftover') {
        const q = (args.item || '').toLowerCase().trim();
        const match = REHEAT_ITEMS.find((r) => r.id === q || r.id.includes(q) || r.name.toLowerCase().includes(q));
        resultText = match
          ? JSON.stringify({
              item: match.name, airFryerTemp: `${match.airFryerTemp}°F`,
              airFryerMinutes: match.airFryerMinutes,
              shakeAt: match.shakeAtMinute ? `${match.shakeAtMinute} min` : 'No shake',
              skilletOption: match.skilletMinutes ? `${match.skilletTemp}, ${match.skilletMinutes} min` : null,
              antiSoggyTip: match.antiSoggyTip,
              microwaveWarning: match.microwaveWarning,
              testedWith: match.testedWith,
              url: 'https://www.mealinstructions.com/reheat',
            }, null, 2)
          : JSON.stringify({ error: 'Item not found', query: q, available: REHEAT_ITEMS.map((r) => r.id) }, null, 2);

      } else if (toolName === 'emergency_frozen_cook') {
        const q = (args.item || '').toLowerCase().trim();
        const match = FROZEN_ITEMS.find((f) => f.id === q || f.id.includes(q) || f.name.toLowerCase().includes(q));
        resultText = match
          ? JSON.stringify({
              item: match.name, canCookFromFrozen: match.canCookFromFrozen,
              safeAppliances: match.safeAppliances, bannedAppliances: match.bannedAppliances,
              frozenCookMinutes: match.frozenCookMinutes, freshCookMinutes: match.freshCookMinutes,
              tempAdjust: match.tempAdjust, internalTarget: `${match.internalTargetTemp}°F`,
              coldWaterThaw: `${match.waterBathThawMinutes} min per lb`,
              usdaRationale: match.usdaRationale,
              url: 'https://www.mealinstructions.com/frozen-cook',
            }, null, 2)
          : JSON.stringify({ error: 'Item not found', query: q, available: FROZEN_ITEMS.map((f) => f.id) }, null, 2);

      } else if (toolName === 'calculate_meat_math') {
        const adults = Number(args.guest_count_adults) || 0;
        const kids = Number(args.guest_count_children) || 0;
        const profile = MEAT_MATH_PROFILES.find((p) => p.id === args.meat_type);
        if (!profile) {
          resultText = JSON.stringify({ error: 'Unknown meat type', available: MEAT_MATH_PROFILES.map((p) => p.id) }, null, 2);
        } else {
          const eaterMult = args.eater_profile === 'big_eaters' ? 1.3 : args.eater_profile === 'light' ? 0.75 : 1;
          const sideMult = args.has_hearty_sides ? 0.8 : 1;
          const rawOzNeeded = (adults * profile.rawOzPerAdult + kids * profile.rawOzPerChild) * eaterMult * sideMult;
          const rawLbs = Math.ceil(rawOzNeeded / 16 * 10) / 10;
          const cookedLbs = Math.ceil(rawLbs * (1 - profile.shrinkagePercent / 100) * 10) / 10;
          resultText = JSON.stringify({
            meatType: profile.name, guests: { adults, kids },
            rawPurchaseWeight: `${rawLbs} lbs`, estimatedCookedWeight: `${cookedLbs} lbs`,
            shrinkage: `${profile.shrinkagePercent}%`, boneIn: profile.isBoneIn,
            servingUnit: profile.servingUnitName,
            sideRecommendations: profile.sideRecommendations,
            costcoTip: profile.costcoPackTip,
            url: 'https://www.mealinstructions.com/meat-math',
          }, null, 2);
        }

      } else if (toolName === 'calculate_pull_temp') {
        const q = (args.meat || '').toLowerCase().trim();
        const doneness = (args.target_doneness || 'medium_rare').replace('-', '_');
        const spec = INTERNAL_TEMP_SPECS.find((s) => s.id === q || s.id.includes(q) || s.name.toLowerCase().includes(q));
        if (!spec) {
          resultText = JSON.stringify({ error: 'Meat cut not found', query: q, available: INTERNAL_TEMP_SPECS.map((s) => s.id) }, null, 2);
        } else {
          const level = spec.donenessLevels.find((d) => d.label.toLowerCase().replace(/[- ]/g, '_') === doneness) || spec.donenessLevels[0];
          resultText = JSON.stringify({
            meat: spec.name, thickness: spec.thickness, doneness: level.label,
            pullTemp: `${level.pullTemp}°F`, finalTarget: `${level.finalTargetTemp}°F`,
            carryoverRise: `${level.carryoverRise}°F`, restMinutes: level.restMinutes,
            colorVisual: level.colorVisual,
            usdaSafeMinimum: `${spec.usdaSafeMin}°F`, scienceNote: spec.scienceNote,
            url: 'https://www.mealinstructions.com/internal-temp',
          }, null, 2);
        }

      } else if (toolName === 'troubleshoot_cooking') {
        const q = (args.symptom || '').toLowerCase().trim();
        const matches = TROUBLESHOOT_ISSUES.filter((t) =>
          t.id.includes(q) || t.symptom.toLowerCase().includes(q) || t.rootCause.toLowerCase().includes(q)
        );
        resultText = matches.length > 0
          ? JSON.stringify(matches.slice(0, 3).map((t) => ({
              symptom: t.symptom, category: t.category,
              rootCause: t.rootCause, instantFix: t.instantFiveSecFix,
              futurePrevention: t.futurePrevention,
              url: 'https://www.mealinstructions.com/troubleshoot',
            })), null, 2)
          : JSON.stringify({ error: 'No matching issue found', query: q, hint: 'Try "smoking", "soggy", "gray-steak", or "dry-chicken"' }, null, 2);

      } else {
        resultText = JSON.stringify({ error: `Unknown tool: ${toolName}` }, null, 2);
      }

      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: resultText }],
          },
        },
        { headers: CORS_HEADERS }
      );
    }

    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: `Method '${method}' not found` },
      },
      { headers: CORS_HEADERS }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        error: { code: -32700, message: 'Parse error', data: err?.message },
      },
      { status: 400, headers: CORS_HEADERS }
    );
  }
}
