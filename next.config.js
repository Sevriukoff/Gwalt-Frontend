/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5135/api/:path*', // URL вашего backend сервера
      },
    ];
  },
  reactStrictMode: false,
  images: {
    domains: ['storage.yandexcloud.net'],
  },
};
