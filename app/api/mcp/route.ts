import { NextRequest, NextResponse } from 'next/server';
import { toolListPayload, executeTool } from '@/lib/mcp/tools';

/**
 * Remote MCP endpoint (JSON-RPC over HTTP).
 *
 * This route used to carry its own copy of every tool definition and its own
 * handler for each one, parallel to lib/mcp/server.ts. The two drifted in both
 * directions: the metadata went stale independently, and the handlers diverged
 * in behaviour — this endpoint matched cook-time queries with a single
 * `includes()` where the stdio server did multi-field matching with a
 * word-split fallback, so the same question got a worse answer here.
 *
 * Both now dispatch into lib/mcp/tools.ts. This file is transport only:
 * JSON-RPC framing, CORS, and the protocol handshake.
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * The protocol revision this endpoint implements. Responding with a version the
 * server supports is spec-legal, and the client decides whether to proceed —
 * so this is deliberately a constant rather than an echo of whatever was asked
 * for, which would claim support the handshake has not verified.
 */
const PROTOCOL_VERSION = '2024-11-05';

const SERVER_INFO = { name: 'meal-instructions', version: '1.0.0' };

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  return NextResponse.json(
    {
      ...SERVER_INFO,
      description: 'No-fluff culinary physics, cook times, and recipe reference for AI assistants.',
      protocolVersion: PROTOCOL_VERSION,
      capabilities: { tools: { listChanged: false } },
      tools: toolListPayload(),
    },
    { headers: CORS_HEADERS }
  );
}

export async function POST(req: NextRequest) {
  let id: unknown = null;
  try {
    const body = await req.json();
    const { method, params } = body;
    id = body.id;

    if (method === 'initialize') {
      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id: id ?? 1,
          result: {
            protocolVersion: PROTOCOL_VERSION,
            capabilities: { tools: { listChanged: false } },
            serverInfo: SERVER_INFO,
          },
        },
        { headers: CORS_HEADERS }
      );
    }

    if (method === 'ping' || method === 'notifications/initialized') {
      return NextResponse.json({ jsonrpc: '2.0', id, result: {} }, { headers: CORS_HEADERS });
    }

    if (method === 'tools/list') {
      return NextResponse.json(
        { jsonrpc: '2.0', id, result: { tools: toolListPayload() } },
        { headers: CORS_HEADERS }
      );
    }

    if (method === 'tools/call') {
      try {
        const result = await executeTool(params?.name, params?.arguments ?? {});
        return NextResponse.json({ jsonrpc: '2.0', id, result }, { headers: CORS_HEADERS });
      } catch (err) {
        // A bad tool name or arguments that fail schema validation are the
        // caller's error, not a server fault — report them as such rather than
        // returning a 200 with an error string in the content, which is what
        // the old hand-rolled dispatch did.
        return NextResponse.json(
          {
            jsonrpc: '2.0',
            id,
            error: { code: -32602, message: err instanceof Error ? err.message : 'Invalid params' },
          },
          { headers: CORS_HEADERS }
        );
      }
    }

    return NextResponse.json(
      { jsonrpc: '2.0', id, error: { code: -32601, message: `Method '${method}' not found` } },
      { headers: CORS_HEADERS }
    );
  } catch (err) {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id,
        error: {
          code: -32700,
          message: 'Parse error',
          data: err instanceof Error ? err.message : undefined,
        },
      },
      { status: 400, headers: CORS_HEADERS }
    );
  }
}
