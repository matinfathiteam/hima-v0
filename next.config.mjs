/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "http://87.248.155.147:1337",
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
