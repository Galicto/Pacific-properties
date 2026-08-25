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
      {
        source: "/collection/villa-sereno",
        destination: "/collection",
        permanent: true,
      },
      {
        source: "/collection/casa-da-mare",
        destination: "/collection",
        permanent: true,
      },
      {
        source: "/collection/coastal-estate",
        destination: "/collection",
        permanent: true,
      },
      {
        source: "/collection/elevated-residence",
        destination: "/collection",
        permanent: true,
      },
      {
        source: "/collection/verdant-plot",
        destination: "/collection",
        permanent: true,
      },
      {
        source: "/collection/casa-altura",
        destination: "/collection",
        permanent: true,
      },
      {
        source: "/collection/palms-atelier",
        destination: "/collection",
        permanent: true,
      },
      {
        source: "/collection/vantage-residences",
        destination: "/collection",
        permanent: true,
      },
      {
        source: "/journal/assagao-after-the-noise",
        destination: "/journal/what-to-look-for-in-a-north-goa-villa",
        permanent: true,
      },
      {
        source: "/journal/buying-land-in-goa",
        destination: "/journal/a-considered-guide-to-buying-property-in-goa",
        permanent: true,
      },
      {
        source: "/journal/the-quiet-calculus-of-a-second-home",
        destination: "/journal/understanding-goa-property-investment",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
