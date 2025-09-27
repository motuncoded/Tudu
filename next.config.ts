import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
    turbopack: {
    // Explicitly set your project root directory
    root: process.cwd(), // or specify the exact path
  },
};

export default nextConfig;
