/** @type {import('next').NextConfig} */
const { env } = require('process');
const nextConfig = {
  compiler: {
    removeConsole: env.NODE_ENV === 'production' ? true : false,
},
images: {
  minimumCacheTTL: 60,
  disableStaticImages: true,
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'placehold.co',
      port: '',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'api.one4global.com',
      port: '',
      pathname: '/**',
    },
  ]
},
  reactStrictMode: false,
}

module.exports = nextConfig
