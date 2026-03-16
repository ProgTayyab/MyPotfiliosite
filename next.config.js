/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    formats: ['image/webp'],
  },
  compress: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
