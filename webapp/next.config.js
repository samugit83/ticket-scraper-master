
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    },
    experimental: {
      serverActions: {
        bodySizeLimit: '100mb',
      },
    },
    env: {
      NEXTAUTH_SECRET: 'fjhdtery56rtyr39jhdo',  
      NEXTAUTH_URL: process.env.NODE_ENV === 'production' ? 'http://serverip' : 'http://localhost:3000'
    }
  };
  
  
  module.exports = nextConfig;