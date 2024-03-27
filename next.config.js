/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipfs.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID: process.env.WEB3_AUTH_CLIENT_ID,
    NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
    NEXT_PUBLIC_PRIVATE_KEY: process.env.PRIVATE_KEY,
    NEXT_PUBLIC_PINATA_API_KEY: process.env.PINATA_API_KEY,
    NEXT_PUBLIC_PINATA_SECRET: process.env.PINATA_SECRET,
    NEXT_PUBLIC_PINATA_JWT: process.env.PINATA_JWT,
    NEXT_PUBLIC_PINATA_GATEWAY_URL: process.env.PINATA_GATEWAY_URL,
  },
};

module.exports = nextConfig;
