/** @type {import('next').NextConfig} */
// const withPWA = require('next-pwa');
const { i18n } = require('./next-i18next.config');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { version } = require('./package.json');
const { APP_ENV } = process.env;

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
      produciton: 'ccfe889f96a010040bc13ca2850dd58d16bebc7a',
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
  rewrites: async () => {
    return [
      {
        source: '/version',
        destination: '/api/version',
      },
    ];
  },
  // pwa: {
  //   disable: process.env.NODE_ENV !== 'production',
  // },
};

// module.exports = withBundleAnalyzer(withPWA(nextConfig));
module.exports = withBundleAnalyzer(nextConfig);
