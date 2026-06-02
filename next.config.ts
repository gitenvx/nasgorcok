import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,
  images: {
    qualities: [60, 75, 90],
  },
};

export default nextConfig;
