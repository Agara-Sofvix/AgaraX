import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:5000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
