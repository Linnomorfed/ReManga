/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'api.remanga.org',
      'remanga-api.s3.eu-central-1.amazonaws.com',
      'remanga-chapters-api.s3.eu-central-1.amazonaws.com',
    ],
  },
  env: {
    NEXT_PUBLIC_NODE_URL: process.env.NEXT_PUBLIC_NODE_URL,
    NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
    NEXT_PUBLIC_NEWEST_MIN_COUNT: process.env.NEXT_PUBLIC_NEWEST_MIN_COUNT,
    NEXT_PUBLIC_NEWEST_MAX_COUNT: process.env.NEXT_PUBLIC_NEWEST_MAX_COUNT,
    NEXT_PUBLIC_TODAY_POPULAR_MIN_COUNT:
      process.env.NEXT_PUBLIC_TODAY_POPULAR_MIN_COUNT,
    NEXT_PUBLIC_TODAY_POPULAR_MAX_COUNT:
      process.env.NEXT_PUBLIC_TODAY_POPULAR_MAX_COUNT,
  },
};

module.exports = nextConfig;
