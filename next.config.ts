import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "@wagmi/core/tempo": path.join(__dirname, "lib/web3/tempo-stub.ts"),
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@wagmi/core/tempo": path.join(__dirname, "lib/web3/tempo-stub.ts"),
    };
    return config;
  },
};

export default nextConfig;
