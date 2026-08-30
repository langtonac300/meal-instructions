import { NextResponse } from 'next/server';

/**
 * Standard MCP Server Card
 * https://smithery.ai/docs/build/publish#troubleshooting
 * Advertises metadata and tool definitions to Smithery and remote MCP registries.
 */
export async function GET() {
  const serverCard = {
    serverInfo: {
      name: 'meal-instructions',
      title: 'Meal Instructions Cooking Intelligence',
      version: '1.0.0',
      description: 'No-fluff culinary physics, cook times across 10 appliances, dual-mode recipes, and kitchen troubleshooting tools.',
    },
    authentication: {
      required: false,
    },
    tools: [
      {
        name: 'get_cook_time',
        description: 'Get exact cooking temperatures, time ranges, flip schedules, target internal temperatures, and hardware pro tips across 10 appliances.',
        inputSchema: {
          type: 'object',
          properties: {
            food: { type: 'string', description: 'Food item or slug (e.g. "salmon-fillet", "chicken-tenders-fresh", "pork-chops", "bone-in-thighs", "bacon", "ribeye")' },
            appliance: { type: 'string', description: 'Appliance hardware ("air-fryer" | "oven" | "instant-pot" | "skillet" | "sheet-pan" | "cast-iron" | "grill" | "dutch-oven" | "slow-cooker" | "smoker")' },
            state: { type: 'string', enum: ['fresh', 'frozen', 'refrigerated'], description: 'Food state (fresh vs frozen)' },
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
            slug: { type: 'string', description: 'The recipe slug (e.g. "crispy-air-fryer-chicken-tenders", "backyard-grilled-burgers", "slow-cooker-pot-roast")' },
            mode: { type: 'string', enum: ['quick', 'detailed'], default: 'quick', description: 'Mode ("quick" for 20-word bullets, "detailed" for full steps)' },
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
            query: { type: 'string', description: 'Search keyword matching title, ingredients, or keywords' },
            protein: { type: 'string', enum: ['chicken', 'beef', 'pork', 'seafood', 'turkey', 'vegetarian', 'dairy-eggs'] },
            appliance: { type: 'string', enum: ['air-fryer', 'oven', 'instant-pot', 'skillet', 'sheet-pan', 'cast-iron', 'grill', 'dutch-oven', 'slow-cooker', 'smoker', 'boiling'] },
            category: { type: 'string', enum: ['15-minute', 'high-protein', 'kid-approved', 'budget', 'no-thaw', 'one-pan', 'five-ingredient', 'sides', 'snacks', 'game-day', 'breakfast', 'weekend'] },
            max_total_minutes: { type: 'number', description: 'Maximum allowed total minutes budget' },
          },
        },
      },
      {
        name: 'revive_leftover',
        description: 'Optimal hardware reheating temperature, time, and anti-sogginess pro tips to restore restaurant crunch to takeout French fries, pizza, wings, burgers, etc.',
        inputSchema: {
          type: 'object',
          properties: {
            item: { type: 'string', description: 'The leftover item (e.g. "french-fries", "pizza", "fried-chicken", "chicken-wings", "cheeseburger", "steak")' },
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
            item: { type: 'string', description: 'The frozen item (e.g. "chicken-breast", "chicken-wings", "ground-beef", "salmon", "pork-chops", "steak")' },
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
            guest_count_adults: { type: 'number', description: 'Number of adults' },
            guest_count_children: { type: 'number', default: 0, description: 'Number of children' },
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
            meat: { type: 'string', description: 'Meat cut (e.g. "thick-steak", "pork-tenderloin", "chicken-breast", "salmon", "burger")' },
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
            symptom: { type: 'string', description: 'Problem symptom (e.g. "smoking", "gray-steak", "soggy", "peeling-breading", "dry-chicken")' },
            appliance: { type: 'string', description: 'Cooking hardware or category' },
          },
          required: ['symptom'],
        },
      },
    ],
    resources: [],
    prompts: [],
  };

  return NextResponse.json(serverCard, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
