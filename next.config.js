/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for Vercel
  output: 'standalone',

  // Suppress hydration warnings from AdminLTE scripts
  reactStrictMode: true,

  // Configure allowed image domains if needed
  images: {
    domains: [],
  },
}

module.exports = nextConfig
