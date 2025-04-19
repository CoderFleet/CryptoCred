import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NFT_STORAGE_KEY: process.env.NFT_STORAGE_KEY
  }
};

export default nextConfig;
