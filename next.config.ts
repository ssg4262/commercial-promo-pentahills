import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const useCustomDomain = process.env.CUSTOM_DOMAIN === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd && !useCustomDomain ? "/commercial-promo-pentahills" : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
