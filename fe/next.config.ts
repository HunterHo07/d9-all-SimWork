import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.pravatar.cc'], // Allow images from pravatar for demo avatars
    unoptimized: true, // Always use unoptimized images for compatibility with export
  },
  output: 'export', // Enable static site generation for GitHub Pages
  // For GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/d9-all-SeimalEx' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/d9-all-SeimalEx' : '',
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
