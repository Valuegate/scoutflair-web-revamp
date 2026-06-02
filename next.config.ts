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
      { protocol: "https", hostname: "**.amazonaws.com" }, // S3 presigned URLs
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "**" }, // catch-all for any other external image URLs
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
  allowedDevOrigins: ["f9fptg-9002.csb.app"],
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
