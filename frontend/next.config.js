/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["images.unsplash.com", "127.0.0.1", "upload.wikimedia.org"],
  },
};

module.exports = nextConfig;
