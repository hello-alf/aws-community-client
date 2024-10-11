/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AWS_IOT_ENDPOINT: process.env.AWS_IOT_ENDPOINT,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    DEVICE_ID: process.env.DEVICE_ID,
  },
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false, tls: false };

    return config;
  },
};

export default nextConfig;
