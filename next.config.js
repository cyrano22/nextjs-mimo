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
    // Désactivation de optimizeCss qui peut causer des problèmes
    optimizeCss: false,
    // Améliorer la compatibilité des modules vendeurs
    esmExternals: 'loose',
  },
  
  // Utiliser le mode de compilation standard au lieu de standalone
  // output: 'standalone', // Commenté pour débogage
  
  // Configuration de webpack pour résoudre les problèmes de modules
  webpack: (config, { isServer }) => {
    // Force webpack à résoudre framer-motion correctement
    config.resolve.alias = {
      ...config.resolve.alias,
      'framer-motion': require.resolve('framer-motion'),
    };
    
    return config;
  },
}

module.exports = nextConfig