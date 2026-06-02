import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 60, 75, 90, 100],
  },
};

export default nextConfig;
