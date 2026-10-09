/** @type {import('next').NextConfig} */
const nextConfig = {
  // STATIC_EXPORT=1 builds a static copy for the shareable preview; normal builds are unaffected.
  ...(process.env.STATIC_EXPORT ? { output: 'export', assetPrefix: '/__zx_prefix__' } : {}),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
