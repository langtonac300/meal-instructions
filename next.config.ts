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
        destination: '/categories',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
