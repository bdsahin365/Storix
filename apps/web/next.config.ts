import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`,
      },
      {
        source: '/shops/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/shops/:path*`,
      },
      {
        source: '/users/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/:path*`,
      }
    ];
  },
};

export default nextConfig;
