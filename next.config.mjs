/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  async redirects() {
    return [
      {
        source: "/:path*",
        has:[
          {
            type:"host",
            value:"nirvananuts.in"
          }
        ],
        destination: "https://www.nirvananuts.in/:path*",
        permanent: true,
      },

    ];
  },
};

export default nextConfig;



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactCompiler: true,

//   async redirects() {
//     return [
//       {
//         source: "/:path(.*).html",
//         destination: "/:path",
//         permanent: true,
//       },

//     ];
//   },
// };

// export default nextConfig;
