import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/registration',
  assetPrefix: '/registration',
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/registration',
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.cloud.google.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'fonts.gstatic.com',
      },
    ],
  },
};

export default nextConfig;