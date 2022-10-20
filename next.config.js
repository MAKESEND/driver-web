/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const { i18n } = require('./next-i18next.config');
const { version } = require('./package.json');
const { APP_ENV, NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';

const nextConfig = {
  // reactStrictMode: true,
  i18n,
  images: {
    domains: ['flagcdn.com', 'images.unsplash.com', 'res.cloudinary.com'],
  },
  publicRuntimeConfig: {
    ENV: { APP_ENV },
    version,
  },
  serverRuntimeConfig: {
    jwt: {
      production: 'ccfe889f96a010040bc13ca2850dd58d16bebc7a',
      develop: '9569e7aa43082713eb4e81c236cbae75843c429d',
    },
    msKey: {
      production: {
        updateParcelStatus: 'micros_status_service_4rgbb_prod',
        sorting: '43655de15bea494dba0ba32c99115fff',
        updateParcelSize: '43655de15bea494dba0ba32c99115fff',
        driverMgnt: 'cxMqm5pJlfBVgO0e9I4DlBs5xgghR8TC',
      },
      development: {
        updateParcelStatus: '43655de15bea494dba0ba32c99115fff',
        sorting: '43655de15bea494dba0ba32c99115fff',
        updateParcelSize: '43655de15bea494dba0ba32c99115fff',
        driverMgnt: 'cxMqm5pJlfBVgO0e9I4DlBs5xgghR8TC',
      },
    },
  },
  async rewrites() {
    return [
      {
        source: '/version',
        destination: '/api/version',
      },
      {
        source: '/health',
        destination: '/api/health',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  ...(isProduction && {
    pwa: {
      disable: process.env.NODE_ENV !== 'production',
      dest: 'public',
      runtimeCaching,
      // prevetn pre-caching issue when deploying on Vercel
      buildExcludes: [/middleware-manifest.json$/],
      // https://github.com/shadowwalker/next-pwa/issues/295
    },
  }),
};

module.exports = isProduction
  ? withBundleAnalyzer(withPWA(nextConfig))
  : withBundleAnalyzer(nextConfig);

// config reference
// https://javascript.plainenglish.io/how-to-set-up-next-js-with-typescript-to-get-a-100-score-in-google-lighthouse-and-vercel-analytics-6f97501a91c7
