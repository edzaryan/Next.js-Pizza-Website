import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.dodostatic.net",
      },
      {
        protocol: "https",
        hostname: "cdn.dodostatic.net",
      },
      {
        protocol: "https",
        hostname: "cdn.inappstory.ru",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      }
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
