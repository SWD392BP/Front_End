/** @type {import('next').NextConfig} */
<<<<<<< HEAD

const nextConfig = {
=======
// const nextConfig = {
//     async headers() {
//         return [
//           {
//             source: '/(.*)', // Match all pages
//             headers: [
//               {
//                 key: 'Access-Control-Allow-Origin',
//                 value: "http://localhost:3000",
//               },
//             ],
//           },
//         ]
//     },
// };

const nextConfig = {
  // ... your other configs ...
  headers: [
      {
        key: 'Access-Control-Allow-Origin',
        value: "http://localhost:3000",
      },
  ],
>>>>>>> 39a5a2697f0778cfae4c409e5510362bbf309617
}


export default nextConfig;
