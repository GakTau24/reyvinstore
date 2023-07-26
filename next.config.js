/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = {
  ...nextConfig,
  ...withPWA,
  experimental: { esmExternals: true },
};
