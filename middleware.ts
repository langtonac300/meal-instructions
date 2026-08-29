import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set(
    'Link',
    '<https://www.mealinstructions.com/llms.txt>; rel="llms-txt", <https://www.mealinstructions.com/.well-known/mcp/server-card.json>; rel="mcp-server-card"'
  );

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
};
