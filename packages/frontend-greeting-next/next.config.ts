import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  reactStrictMode: true,
  transpilePackages: [
    "@mysten/dapp-kit",
    "@mysten/sui.js",
    "@mysten/wallet-standard",
    "@suiware/kit",
    "@radix-ui/themes",
    "@radix-ui/react-select",
    "@radix-ui/react-toggle",
  ],
  turbopack: {
    resolveExtensions: [
      ".mdx",
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".mjs",
      ".json",
    ],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), "encoding"];
    return config;
  },
};

export default nextConfig;
