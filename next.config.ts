import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Pin the workspace root (a stray lockfile in the parent dir confuses inference).
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
