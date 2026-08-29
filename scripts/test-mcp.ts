import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { createDadMealsMcpServer } from '@/lib/mcp/server';

console.log('\n--- TESTING DAD MEALS MCP SERVER (npm run test:mcp) ---');

async function runTests() {
  const server = createDadMealsMcpServer();
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

  await server.connect(serverTransport);

  const client = new Client(
    { name: 'test-client', version: '1.0.0' },
    { capabilities: {} }
  );

  await client.connect(clientTransport);
  console.log('✅ Client connected to Dad Meals MCP Server via in-memory transport.');

  // 1. Test tools/list
  const toolsResponse = await client.listTools();
  const toolNames = toolsResponse.tools.map((t) => t.name);
  console.log(`\nDiscovered ${toolNames.length} MCP Tools:`, toolNames.join(', '));

  const expectedTools = [
    'get_cook_time',
    'get_recipe',
    'search_recipes',
    'revive_leftover',
    'emergency_frozen_cook',
    'calculate_meat_math',
    'calculate_pull_temp',
    'troubleshoot_cooking',
  ];

  for (const exp of expectedTools) {
    if (!toolNames.includes(exp)) {
      throw new Error(`Missing expected MCP tool: ${exp}`);
    }
  }
  console.log('✅ All 8 expected MCP tools registered with valid schemas.');

  // 2. Test get_cook_time
  console.log('\nTesting tool: get_cook_time...');
  const cookTimeRes = await client.callTool({
    name: 'get_cook_time',
    arguments: { food: 'chicken-tenders-fresh', appliance: 'air-fryer' },
  });
  const cookTimeData = JSON.parse((cookTimeRes.content[0] as any).text);
  if (cookTimeData.status !== 'success' || cookTimeData.matchesCount === 0) {
    throw new Error('get_cook_time failed to return valid datasheet');
  }
  console.log(`✅ get_cook_time returned ${cookTimeData.matchesCount} datasheet(s) for chicken-tenders-fresh (${cookTimeData.results[0].temperature.fahrenheit}, ${cookTimeData.results[0].timeMinutes.display})`);

  // 3. Test get_recipe with portion scaling
  console.log('\nTesting tool: get_recipe (scaled to 6 servings)...');
  const recipeRes = await client.callTool({
    name: 'get_recipe',
    arguments: { slug: 'crispy-air-fryer-chicken-tenders', mode: 'quick', servings: 6 },
  });
  const recipeData = JSON.parse((recipeRes.content[0] as any).text);
  if (!recipeData.title || recipeData.servings !== 6) {
    throw new Error('get_recipe failed to return or scale recipe');
  }
  console.log(`✅ get_recipe returned "${recipeData.title}" scaled to 6 servings (${recipeData.instructions.bullets.length} quick bullets)`);

  // 4. Test search_recipes
  console.log('\nTesting tool: search_recipes (beef, ≤20 mins)...');
  const searchRes = await client.callTool({
    name: 'search_recipes',
    arguments: { protein: 'beef', max_total_minutes: 20 },
  });
  const searchData = JSON.parse((searchRes.content[0] as any).text);
  if (!searchData.recipes || searchData.recipes.length === 0) {
    throw new Error('search_recipes returned 0 matches for fast beef recipes');
  }
  console.log(`✅ search_recipes found ${searchData.totalMatches} fast beef recipe(s): ${searchData.recipes.map((r: any) => r.title).join(', ')}`);

  // 5. Test revive_leftover
  console.log('\nTesting tool: revive_leftover (french-fries)...');
  const reviveRes = await client.callTool({
    name: 'revive_leftover',
    arguments: { item: 'french-fries', appliance: 'air-fryer' },
  });
  const reviveData = JSON.parse((reviveRes.content[0] as any).text);
  if (!reviveData.airFryer || reviveData.airFryer.tempF !== 380) {
    throw new Error('revive_leftover failed to return 380°F for french fries');
  }
  console.log(`✅ revive_leftover returned: ${reviveData.airFryer.tempF}°F for ${reviveData.airFryer.timeMinutes} mins (${reviveData.antiSoggyTip})`);

  // 6. Test emergency_frozen_cook
  console.log('\nTesting tool: emergency_frozen_cook (chicken-breast)...');
  const frozenRes = await client.callTool({
    name: 'emergency_frozen_cook',
    arguments: { item: 'chicken-breast' },
  });
  const frozenData = JSON.parse((frozenRes.content[0] as any).text);
  if (frozenData.canCookFromFrozen !== true) {
    throw new Error('emergency_frozen_cook failed for chicken-breast');
  }
  console.log(`✅ emergency_frozen_cook verified: canCook=${frozenData.canCookFromFrozen}, frozenMinutes=${frozenData.timingComparison.frozenCookMinutes}m, target=${frozenData.targetInternalTempF}°F`);

  // 7. Test calculate_meat_math
  console.log('\nTesting tool: calculate_meat_math (10 adults, 4 kids, burgers)...');
  const meatMathRes = await client.callTool({
    name: 'calculate_meat_math',
    arguments: { guest_count_adults: 10, guest_count_children: 4, meat_type: 'burgers', eater_profile: 'normal' },
  });
  const meatMathData = JSON.parse((meatMathRes.content[0] as any).text);
  if (!meatMathData.recommendedRawPurchaseLbs) {
    throw new Error('calculate_meat_math failed to return purchase weight');
  }
  console.log(`✅ calculate_meat_math returned: ${meatMathData.recommendedRawPurchaseLbs} (yielding ${meatMathData.estimatedCookedYieldLbs})`);

  // 8. Test calculate_pull_temp
  console.log('\nTesting tool: calculate_pull_temp (thick-steak, medium_rare)...');
  const pullTempRes = await client.callTool({
    name: 'calculate_pull_temp',
    arguments: { meat: 'thick-steak', target_doneness: 'medium_rare' },
  });
  const pullTempData = JSON.parse((pullTempRes.content[0] as any).text);
  if (!pullTempData.pullTempF.includes('128°F')) {
    throw new Error('calculate_pull_temp failed to return 128°F pull temp for medium-rare');
  }
  console.log(`✅ calculate_pull_temp returned: Pull at ${pullTempData.pullTempF}, rests to ${pullTempData.finalTargetTempF} (${pullTempData.expectedCarryoverRiseF})`);

  // 9. Test troubleshoot_cooking
  console.log('\nTesting tool: troubleshoot_cooking (smoking, air-fryer)...');
  const troubleRes = await client.callTool({
    name: 'troubleshoot_cooking',
    arguments: { symptom: 'smoking', appliance: 'air-fryer' },
  });
  const troubleData = JSON.parse((troubleRes.content[0] as any).text);
  if (!troubleData.instantFiveSecFix) {
    throw new Error('troubleshoot_cooking failed to return instantFiveSecFix');
  }
  console.log(`✅ troubleshoot_cooking returned fix for "${troubleData.id}": ${troubleData.instantFiveSecFix}`);

  console.log('\n🎉 ALL 8 MCP TOOLS VERIFIED SUCCESSFULLY!\n');
}

runTests().catch((err) => {
  console.error('\n❌ MCP Server Test Failed:', err);
  process.exit(1);
});
