import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: 'foreverbalivillas.com' },
      { protocol: 'https', hostname: '*.mybluehost.me' },
      { protocol: 'https', hostname: 'api.foreverbalivillas.com' },
    ],
  },
};

export default nextConfig;
