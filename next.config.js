/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["maps.googleapis.com"],
  },
};

module.exports = nextConfig;
