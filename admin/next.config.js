/* eslint-disable @typescript-eslint/no-var-requires */
const { i18n } = require('./next-i18next.config');

const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
  'client',
]);

module.exports = withTM({
  swcMinify: false,
  trailingSlash: true,
  i18n,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // env: {
  //   HOST_API_KEY: 'https://minimal-assets-api.vercel.app',
  //   // FIREBASE AUTH
  //   FIREBASE_API_KEY: '',
  //   FIREBASE_AUTH_DOMAIN: '',
  //   FIREBASE_PROJECT_ID: '',
  //   FIREBASE_STORAGE_BUCKET: '',
  //   FIREBASE_MESSAGING_SENDER_ID: '',
  //   FIREBASE_APPID: '',
  //   FIREBASE_MEASUREMENT_ID: '',
  //   // AWS COGNITO AUTH
  //   AWS_COGNITO_USER_POOL_ID: '',
  //   AWS_COGNITO_CLIENT_ID: '',
  //   // AUTH0 AUTH
  //   AUTH0_CLIENT_ID: '',
  //   AUTH0_DOMAIN: '',
  //   //
  //   MAPBOX: '',
  // },
  // images: {
  //   domains: [
  //     'mer.sgp1.digitaloceanspaces.com',
  //     'mercy-test-bucket.s3-ap-northeast-1.amazonaws.com',
  //   ],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
});
