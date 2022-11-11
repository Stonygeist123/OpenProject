/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  serverComponentsExternalPackages: ["@prisma/client"],
  webpack: (conf, options) => {
    if (options.isServer) conf.externals.push("encoding");
    return conf;
  },
};

module.exports = nextConfig;
