import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
};

export default nextConfig;
