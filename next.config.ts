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
      {
        source: "/entrar",
        has: [{ type: "host", value: "eduverso-web-production.up.railway.app" }],
        destination: "https://eduversoai.com.br/entrar",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
