import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 180,
  async redirects() {
    return [
      {
        source: '/categories/air-fryer',
        destination: '/appliances/air-fryer',
        permanent: true,
      },
      {
        source: '/merch',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/recipes',
        destination: '/',
        permanent: true,
      },
    ];
  },
  // Advertise llms.txt and MCP server-card via static response headers.
  // Previously in middleware.ts, but Next.js middleware forces every matched
  // route into SSR — which broke SSG for /recipes/* and every /how-long/*
  // datasheet page, silently killing static output and breaking audit:seo
  // (which walks .next/server/app/**.html to verify SSR HTML content).
  // Moving to next.config.ts headers() keeps the advertising intact while
  // letting recipes and datasheets pre-render statically like they should.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value:
              '<https://www.mealinstructions.com/llms.txt>; rel="llms-txt", <https://www.mealinstructions.com/.well-known/mcp/server-card.json>; rel="mcp-server-card"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
