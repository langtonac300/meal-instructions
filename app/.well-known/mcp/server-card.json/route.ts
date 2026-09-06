import { NextResponse } from 'next/server';
import { toolListPayload, MCP_STATS } from '@/lib/mcp/tools';

/**
 * Standard MCP Server Card.
 * https://smithery.ai/docs/build/publish#troubleshooting
 *
 * Advertises this server to Smithery and remote MCP registries. The tool list
 * and the counts are derived from lib/mcp/tools.ts — the same definitions the
 * stdio server and the HTTP endpoint serve — so the card cannot advertise a
 * tool that does not exist, omit one that does, or report a corpus size that
 * has moved on. A hand-written version of this file claimed "10 appliances"
 * after boiling became the eleventh and "70 curated recipes" at 228.
 */
export async function GET() {
  const serverCard = {
    serverInfo: {
      name: 'meal-instructions',
      title: 'Meal Instructions Cooking Intelligence',
      version: '1.0.0',
      description: `${MCP_STATS.datasheets} verified cook-time datasheets across ${MCP_STATS.appliances} appliances — every temperature and time carries a cited source. Plus dual-mode recipes, portion math, and kitchen troubleshooting.`,
    },
    authentication: { required: false },
    tools: toolListPayload(),
    remote: {
      transport: 'http',
      endpoint: 'https://www.mealinstructions.com/api/mcp',
    },
  };

  return NextResponse.json(serverCard, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
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
