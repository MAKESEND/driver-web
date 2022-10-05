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
    ENV: { APP_ENV },
  },
  serverRuntimeConfig: {
    msKey: {
      production: {
        updateParcelStatus: 'micros_status_service_4rgbb_prod',
        sorting: '43655de15bea494dba0ba32c99115fff',
        updateParcelSize: '43655de15bea494dba0ba32c99115fff',
      },
      development: {
        updateParcelStatus: '43655de15bea494dba0ba32c99115fff',
        sorting: '43655de15bea494dba0ba32c99115fff',
        updateParcelSize: '43655de15bea494dba0ba32c99115fff',
      },
    },
  },
  // pwa: {
  //   disable: process.env.NODE_ENV !== 'production',
  // },
};

// module.exports = withBundleAnalyzer(withPWA(nextConfig));
module.exports = withBundleAnalyzer(nextConfig);
