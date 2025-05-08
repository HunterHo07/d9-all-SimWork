import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.pravatar.cc'], // Allow images from pravatar for demo avatars
    unoptimized: process.env.NODE_ENV === 'production', // For GitHub Pages
  },
  output: 'export', // For static site generation
  // For GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/simulex' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/simulex' : '',
};

export default nextConfig;
