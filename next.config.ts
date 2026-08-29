import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // For blazing fast local & static rendering
  },
};

export default nextConfig;
