#!/usr/bin/env node

/**
 * Dad Meals Model Context Protocol (MCP) CLI Server
 * Connects standard I/O transport for Claude Desktop, Cursor, Raycast, and terminal AI agents.
 */

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createDadMealsMcpServer } from '../lib/mcp/server.ts';

async function main() {
  const server = createDadMealsMcpServer();
  const transport = new StdioServerTransport();

  await server.connect(transport);
  console.error('Dad Meals MCP Server running on stdio.');
}

main().catch((error) => {
  console.error('Fatal error running Dad Meals MCP server:', error);
  process.exit(1);
});
