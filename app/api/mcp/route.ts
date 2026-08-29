import { NextRequest, NextResponse } from 'next/server';
import { createDadMealsMcpServer } from '@/lib/mcp/server';

// Initialize a singleton instance for direct API invocation
const mcpServer = createDadMealsMcpServer();

/**
 * GET /api/mcp
 * Returns MCP Server metadata, capabilities, and list of supported tools with schemas.
 */
export async function GET() {
  return NextResponse.json({
    name: 'dad-meals',
    version: '1.0.0',
    description: 'No-fluff culinary physics, cook times, and recipe reference for dads and AI assistants.',
    protocolVersion: '2024-11-05',
    capabilities: {
      tools: {
        listChanged: false,
      },
    },
    tools: [
      {
        name: 'get_cook_time',
        description: 'Get exact cooking temperatures, time ranges, flip schedules, target internal temperatures, and hardware pro tips across 8 appliances.',
        parameters: {
          food: 'string (e.g. "salmon-fillet", "chicken-tenders-fresh", "pork-chops", "bone-in-thighs", "bacon", "ribeye")',
          appliance: 'optional string ("air-fryer" | "skillet" | "sheet-pan" | "cast-iron" | "grill" | "dutch-oven" | "slow-cooker" | "smoker")',
          state: 'optional string ("fresh" | "frozen" | "refrigerated")',
        },
      },
      {
        name: 'get_recipe',
        description: 'Retrieve a complete curated recipe from the Dad Meals catalog by slug in "quick" or "detailed" mode with portion scaling.',
        parameters: {
          slug: 'string (e.g. "crispy-air-fryer-chicken-tenders", "backyard-grilled-burgers", "slow-cooker-pot-roast")',
          mode: 'optional string ("quick" | "detailed")',
          servings: 'optional number (auto-scales ingredient quantities)',
        },
      },
      {
        name: 'search_recipes',
        description: 'Search the catalog of 70 curated recipes by keyword, protein, appliance, category, or time budget.',
        parameters: {
          query: 'optional string',
          protein: 'optional string ("chicken" | "beef" | "pork" | "seafood" | "turkey" | "vegetarian" | "dairy-eggs")',
          appliance: 'optional string',
          category: 'optional string',
          max_total_minutes: 'optional number',
        },
      },
      {
        name: 'revive_leftover',
        description: 'Optimal temperature, time, and anti-sogginess pro tips to restore restaurant crunch to takeout French fries, pizza, wings, burgers, etc.',
        parameters: {
          item: 'string (e.g. "french-fries", "pizza", "fried-chicken", "chicken-wings", "cheeseburger", "steak")',
          appliance: 'optional string ("air-fryer" | "skillet")',
        },
      },
      {
        name: 'emergency_frozen_cook',
        description: 'Check if rock-hard frozen meat can be cooked straight from freezer without defrosting + exact appliance parameters.',
        parameters: {
          item: 'string (e.g. "chicken-breast", "chicken-wings", "ground-beef", "salmon", "pork-chops", "steak")',
        },
      },
      {
        name: 'calculate_meat_math',
        description: 'Calculate raw meat purchasing weights (lbs) for parties based on guest count, cut, bone-in ratios, and shrinkage.',
        parameters: {
          guest_count_adults: 'number',
          guest_count_children: 'optional number',
          meat_type: 'string ("burgers" | "pulled-pork" | "chicken-wings" | "taco-meat" | "smoked-brisket" | "hot-dogs-brats")',
          eater_profile: 'optional string ("light" | "normal" | "big_eaters")',
          has_hearty_sides: 'optional boolean',
        },
      },
      {
        name: 'calculate_pull_temp',
        description: 'Calculate exact thermometer pull temperature accounting for thickness and thermal carryover cooking rise.',
        parameters: {
          meat: 'string (e.g. "thick-steak", "pork-tenderloin", "chicken-breast", "salmon", "burger")',
          target_doneness: 'optional string ("rare" | "medium_rare" | "medium" | "medium_well" | "well")',
        },
      },
      {
        name: 'troubleshoot_cooking',
        description: 'Instant 1-click diagnoses and fixes for common kitchen failures (smoking air fryers, gray steak, soggy veggies, peeling breading).',
        parameters: {
          symptom: 'string (e.g. "smoking", "gray-steak", "soggy", "peeling-breading", "dry-chicken")',
          appliance: 'optional string',
        },
      },
    ],
  });
}
