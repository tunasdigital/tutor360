/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**', // Permite qualquer imagem dentro deste domínio
      },
    ],
  },
};

export default nextConfig;