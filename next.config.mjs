/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  async redirects() {
    return [
      {
        source: "/:path(.*).html",
        destination: "/:path",
        permanent: true,
      },

    ];
  },
};

export default nextConfig;
