/** @type {import('next').NextConfig} */
// const withPWA = require('next-pwa');
// eslint-disable-next-line
const { i18n } = require('./next-i18next.config');
// eslint-disable-next-line
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // reactStrictMode: true,
  i18n,
  images: {
    domains: ['flagcdn.com', 'images.unsplash.com'],
  },
  publicRuntimeConfig: {
    production: process.env.APP_ENV === 'production',
    staging: process.env.APP_ENV === 'staging',
    local: process.env.APP_ENV === 'local',
    MAPBOX_GL_ACCESS_TOKEN: process.env.MAPBOX_GL_ACCESS_TOKEN,
  },
  // pwa: {
  //   disable: process.env.NODE_ENV !== 'production',
  // },
};

// module.exports = withBundleAnalyzer(withPWA(nextConfig));
module.exports = withBundleAnalyzer(nextConfig);
