import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { TOOL_DEFINITIONS } from './tools';

/**
 * Factory creating a configured Meal Instructions MCP server.
 *
 * The tools themselves live in ./tools.ts, which is the single definition
 * shared with the HTTP endpoint and the server card. This file only binds them
 * to the SDK's stdio transport, so a tool added there appears here for free and
 * the two transports cannot drift apart again.
 */
export function createDadMealsMcpServer() {
  const server = new McpServer({
    name: 'meal-instructions',
    version: '1.0.0',
    description: 'No-fluff culinary physics, cook times, and recipe reference for AI assistants.',
  });

  for (const tool of TOOL_DEFINITIONS) {
    server.tool(tool.name, tool.description, tool.schema, tool.handler);
  }

  return server;
}

export const createMealInstructionsMcpServer = createDadMealsMcpServer;
