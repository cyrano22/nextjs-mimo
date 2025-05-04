/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Ignorer les erreurs de type et de lint pendant le build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Désactiver la minification SWC pour éviter les problèmes
  swcMinify: false,
  
  // Configuration des options expérimentales
  experimental: {
    optimizeCss: true,
  },
  
  // Utiliser le mode de déploiement autonome
  output: 'standalone',
}

module.exports = nextConfig