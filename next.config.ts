import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "ui-avatars.com" },
      {
        protocol: "https",
        hostname: "mediumslateblue-salamander-253615.hostingersite.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    // @ts-ignore - Next.js suggests this but types might not be updated yet
    allowedDevOrigins: ["f9fptg-9002.csb.app"],
  } as any, // Casting here resolves the TS2353 error
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
