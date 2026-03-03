/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // 1. MANTIDO: Suas capas vindas do YouTube
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**', 
      },
      // 2. MANTIDO (A CREDENCIAL DA VERCEL): O motor de upload que configuramos
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        pathname: '/**', 
      },
      // 3. ADICIONADO: Para curar o erro da página 07 (Fotos da migração)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;