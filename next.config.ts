import type { NextConfig } from 'next';
const isVercel = process.env.VERCEL === '1';
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  ...(isVercel ? { output: 'export' } : {}),
  /* config options here */
};

export default nextConfig;
