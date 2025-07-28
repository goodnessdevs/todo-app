import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  srcDir: "./src",
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    GITHUB_ID: "Ov23liLf1w7IOLDG2qGa",
    GITHUB_SECRET: "93b08f5f3fd90e087df1e5792f353da98e49d704",
  },

  images: {
    domains: ["avatars.githubusercontent.com"]
  }
};

export default nextConfig;