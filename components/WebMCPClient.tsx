'use client';

import { useEffect } from 'react';

/**
 * WebMCP Client Integration
 * Exposes Meal Instructions MCP Tools to Google Chrome's WebMCP Origin Trial,
 * enabling on-device and browser-based AI agents to execute culinary tools natively.
 */
export default function WebMCPClient() {
  useEffect(() => {
    // 1. Expose global discovery object for browser extensions & AI agents
    if (typeof window !== 'undefined') {
      (window as unknown as { __MEAL_INSTRUCTIONS_MCP__: unknown }).__MEAL_INSTRUCTIONS_MCP__ = {
        name: 'Meal Instructions WebMCP',
        version: '1.0.0',
        endpoint: '/api/mcp',
        manifest: '/.well-known/mcp/server-card.json',
        tools: [
          'get_cook_time',
          'get_recipe',
          'search_recipes',
          'revive_leftover',
          'emergency_frozen_cook',
          'calculate_meat_math',
          'calculate_pull_temp',
          'troubleshoot_cooking',
        ],
        execute: async (toolName: string, args: Record<string, unknown>) => {
          const res = await fetch('/api/mcp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              id: Date.now(),
              method: 'tools/call',
              params: {
                name: toolName,
                arguments: args,
              },
            }),
          });
          const json = await res.json();
          return json.result;
        },
      };

      // 2. Register with Chrome's native WebMCP API if available in this browser
      interface WindowWithModelContext extends Window {
        modelContext?: {
          registerTool?: (tool: unknown) => void;
          provideTools?: (tools: unknown[]) => void;
        };
      }
      interface NavigatorWithModelContext extends Navigator {
        modelContext?: {
          registerTool?: (tool: unknown) => void;
          provideTools?: (tools: unknown[]) => void;
        };
      }

      const win = window as WindowWithModelContext;
      const nav = navigator as NavigatorWithModelContext;
      const mc = nav.modelContext || win.modelContext;

      if (mc) {
        try {
          const tools = [
            {
              name: 'get_cook_time',
              description: 'Retrieve verified cook time, temperature, and internal target for any food × appliance pair.',
              parameters: {
                type: 'object',
                properties: {
                  food: { type: 'string', description: 'Food item slug or name (e.g. chicken-tenders, ribeye, salmon)' },
                  appliance: { type: 'string', description: 'Appliance slug (air-fryer, skillet, sheet-pan, grill, smoker, etc.)' },
                  state: { type: 'string', enum: ['fresh', 'frozen'], description: 'Food initial state' },
                },
                required: ['food', 'appliance'],
              },
              execute: async (params: Record<string, unknown>) => {
                const res = await fetch('/api/mcp', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 'webmcp-call',
                    method: 'tools/call',
                    params: { name: 'get_cook_time', arguments: params },
                  }),
                });
                return await res.json();
              },
            },
            {
              name: 'calculate_pull_temp',
              description: 'Calculate exact thermometer pull temperature and resting rise to avoid overcooked dry meat.',
              parameters: {
                type: 'object',
                properties: {
                  meatCategory: { type: 'string', description: 'thick-steak, whole-chicken, chicken-breast, pork-chop, etc.' },
                  targetDoneness: { type: 'string', enum: ['rare', 'medium_rare', 'medium', 'medium_well', 'well_done'] },
                },
                required: ['meatCategory', 'targetDoneness'],
              },
              execute: async (params: Record<string, unknown>) => {
                const res = await fetch('/api/mcp', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 'webmcp-call',
                    method: 'tools/call',
                    params: { name: 'calculate_pull_temp', arguments: params },
                  }),
                });
                return await res.json();
              },
            },
            {
              name: 'calculate_meat_math',
              description: 'Calculate raw butcher meat weight to purchase for any headcount factoring in 25-50% shrinkage and bones.',
              parameters: {
                type: 'object',
                properties: {
                  adults: { type: 'number', description: 'Number of adults eating' },
                  kids: { type: 'number', description: 'Number of kids eating' },
                  dishType: { type: 'string', description: 'pulled-pork, brisket, burgers, bone-in-chicken, steak, ribs' },
                },
                required: ['adults', 'dishType'],
              },
              execute: async (params: Record<string, unknown>) => {
                const res = await fetch('/api/mcp', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 'webmcp-call',
                    method: 'tools/call',
                    params: { name: 'calculate_meat_math', arguments: params },
                  }),
                });
                return await res.json();
              },
            },
            {
              name: 'revive_leftover',
              description: 'Get exact air fryer time and temperature to restore soggy takeout fries, pizza, or wings to crunch.',
              parameters: {
                type: 'object',
                properties: {
                  item: { type: 'string', description: 'french-fries, pizza-slice, chicken-wings, fried-chicken, etc.' },
                },
                required: ['item'],
              },
              execute: async (params: Record<string, unknown>) => {
                const res = await fetch('/api/mcp', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 'webmcp-call',
                    method: 'tools/call',
                    params: { name: 'revive_leftover', arguments: params },
                  }),
                });
                return await res.json();
              },
            },
          ];

          if (typeof mc.provideTools === 'function') {
            mc.provideTools(tools);
          } else if (typeof mc.registerTool === 'function') {
            for (const t of tools) {
              mc.registerTool(t);
            }
          }
        } catch {
          // Silent fallback if browser's experimental WebMCP API has slight variations
        }
      }
    }
  }, []);

  return null;
}
