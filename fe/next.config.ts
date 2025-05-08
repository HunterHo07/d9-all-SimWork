import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.pravatar.cc'], // Allow images from pravatar for demo avatars
    unoptimized: true, // Always use unoptimized images for compatibility with export
  },
  // Removed output: 'export' to use server-side rendering instead of static generation
  // For GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/simulex' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/simulex' : '',
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
