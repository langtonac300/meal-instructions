import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/categories/air-fryer',
        destination: '/appliances/air-fryer',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
