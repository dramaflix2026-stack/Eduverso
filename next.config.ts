import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.eduversoai.com.br" }],
        destination: "https://eduversoai.com.br/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
