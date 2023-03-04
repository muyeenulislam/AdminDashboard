/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    BASE_URI: process.env.BASE_URL,
    FILE_BASE_URI: process.env.FILES_BASE_URI,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
  },
  crossOrigin: "anonymous",
};

module.exports = nextConfig;
