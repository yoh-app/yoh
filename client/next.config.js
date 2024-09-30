const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const { i18n } = require("./next-i18next.config");
const withTM = require("next-transpile-modules")(["admin"]); // pass the modules you would like to see transpiled

module.exports = withTM({
  i18n,
  // pwa: {
  //   disable: process.env.NODE_ENV === 'development',
  //   dest: 'public',
  //   runtimeCaching,
  // },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/grocery",
  //       permanent: false,
  //     },
  //   ];
  // },

  images: {
    domains: [
      // "googleusercontent.com",
      // "graph.facebook.com",
      // "res.cloudinary.com",
      // "s3.amazonaws.com",
      // "18.141.64.26",
      // "via.placeholder.com",
      // "pickbazarlaravel.s3.ap-southeast-1.amazonaws.com",
      // "picsum.photos",
      // "localhost",
      // "lh3.googleusercontent.com",
      "mer.sgp1.digitaloceanspaces.com",
      "mercy-test-bucket.s3-ap-northeast-1.amazonaws.com",
      "awkns.s3-ap-northeast-1.amazonaws.com",
    ],
  },

  webpack(config, options) {
    // config.module.rules.push({
    //   test: /\.graphql$/,
    //   exclude: /node_modules/,
    //   use: [options.defaultLoaders.babel, { loader: "graphql-let/loader" }],
    // });

    // config.module.rules.push({
    //   test: /\.graphqls$/,
    //   exclude: /node_modules/,
    //   use: ["graphql-let/schema/loader"],
    // });

    // config.module.rules.push({
    //   test: /\.ya?ml$/,
    //   type: "json",
    //   use: "yaml-loader",
    // });

    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
});
