/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  env: {
    apiKey: '39fde29e053c47325f9911354e4ca533',
    language: 'it-IT',
    posterBaseUrl: 'http://image.tmdb.org/t/p/original'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
    ],
  }
};

export default nextConfig;
