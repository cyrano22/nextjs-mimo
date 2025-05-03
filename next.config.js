
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  images: {
    domains: [],
  },
  // Augmenter la limite de temps pour le chargement des chunks
  experimental: {
    serverComponentsExternalPackages: [],
    timeoutChunkLoading: 60000, // 60 secondes au lieu de la valeur par défaut
  },
}

module.exports = nextConfig
