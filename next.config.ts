import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  // Pin the workspace root (a stray lockfile in the parent dir confuses inference).
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
