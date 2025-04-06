// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     output: 'standalone',
    
//     images: {
//       unoptimized: false,
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: '**',
//         }
//       ],
//     },
    
//     // Let Next.js handle CSS modules by default
//     // Do NOT add custom CSS loaders here
    
//     webpack: (config, { isServer }) => {
//       // Font files
//       config.module.rules.push({
//         test: /\.(woff|woff2|eot|ttf|otf)$/i,
//         type: 'asset/resource',
//         generator: {
//           filename: 'static/fonts/[name][ext]'
//         }
//       });
      
//       // Image files
//       config.module.rules.push({
//         test: /\.(png|jpg|jpeg|gif|svg)$/i,
//         type: 'asset/resource',
//         generator: {
//           filename: 'static/images/[name][ext]'
//         }
//       });
  
//       return config;
//     },
    
//     rewrites: async () => {
//       return [
//         {
//           source: '/fonts/:path*',
//           destination: '/static/fonts/:path*',
//         },
//         {
//           source: '/asset/:path*',
//           destination: '/public/asset/:path*',
//         }
//       ];
//     },
  
//     sassOptions: {
//       includePaths: ['./src'],
//     },
//   }
  
//   module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  }
  
  module.exports = nextConfig