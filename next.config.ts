import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  srcDir: "./src",
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
