/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**', // Permite qualquer imagem do YouTube
      },
      // 🚀 A CREDENCIAL DA VERCEL: Liberando o armazém público
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        pathname: '/**', // Permite as imagens salvas no seu Vercel Blob
      },
    ],
  },
};

export default nextConfig;