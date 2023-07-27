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

const cors = {
  origin: process.env.NEXT_PUBLIC_BASE_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = {
  ...nextConfig,
  ...withPWA,
  ...cors,
  experimental: { esmExternals: true },
};
