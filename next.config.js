/** @type {import('next').NextConfig} */
const nextConfig = {};
const withPWA = require("next-pwa")({
  dest: "public"
})

module.exports = nextConfig;
module.exports = withPWA({
    images: {
      domains: [
        "media.discordapp.net",
      ],
    },
    experimental: { esmExternals: true },
  });