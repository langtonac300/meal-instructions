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
        const matches = COOK_TIME_DATASHEETS.filter((d) => d.slug.includes(q) || d.food.toLowerCase().includes(q));
        resultText = JSON.stringify(matches.slice(0, 3), null, 2);
      } else if (toolName === 'get_recipe') {
        const q = (args.slug || '').toLowerCase().trim();
        const r = RECIPES.find((item) => item.slug.includes(q));
        resultText = JSON.stringify(r || { error: 'Recipe not found' }, null, 2);
      } else if (toolName === 'search_recipes') {
        resultText = JSON.stringify({ total: RECIPES.length, sample: RECIPES.slice(0, 5).map((r) => r.title) }, null, 2);
      } else {
        resultText = JSON.stringify({ status: 'success', tool: toolName, executed: true }, null, 2);
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
