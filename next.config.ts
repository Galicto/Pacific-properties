import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1280, 1600],
    imageSizes: [64, 96, 128, 256, 384],
    qualities: [50, 55, 60, 65, 70, 75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/properties",
        destination: "/collection",
        permanent: true,
      },
      {
        source: "/properties/:slug",
        destination: "/collection/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
