import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ⚠️ Vercel build sẽ bỏ qua lỗi ESLint (bao gồm no-explicit-any)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ⚠️ Bỏ qua lỗi TypeScript khi build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
