import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // This allows your mobile device or other network devices 
    // to see live updates (HMR) without being blocked.
    allowedDevOrigins: ['192.168.1.99'],
  },
  // You can add other standard config options here
  reactStrictMode: true,
};

export default nextConfig;