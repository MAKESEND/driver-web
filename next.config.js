/** @type {import('next').NextConfig} */
// const withPWA = require('next-pwa');
// eslint-disable-next-line
const { i18n } = require('./next-i18next.config');
// eslint-disable-next-line
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { APP_ENV } = process.env;

const nextConfig = {
  // reactStrictMode: true,
  i18n,
  images: {
    domains: ['flagcdn.com', 'images.unsplash.com'],
  },
  publicRuntimeConfig: {
    ENV: {
      production: APP_ENV === 'production',
      staging: APP_ENV === 'staging',
      development: APP_ENV === 'development',
      local: APP_ENV === 'local',
      APP_ENV,
    },
  },
  // pwa: {
  //   disable: process.env.NODE_ENV !== 'production',
  // },
};

// module.exports = withBundleAnalyzer(withPWA(nextConfig));
module.exports = withBundleAnalyzer(nextConfig);
