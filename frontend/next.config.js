/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.remanga.org', 'remanga-api.s3.eu-central-1.amazonaws.com'],
  },
  env: {
    NEXT_PUBLIC_NODE_URL: process.env.NEXT_PUBLIC_NODE_URL,
    NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
  },
};

module.exports = nextConfig;
