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
    // Désactiver le prefetching qui peut interférer avec l'auth
    prefetchCache: false,
  },

  // Configuration pour définir quelles pages sont statiques et lesquelles sont dynamiques
  // Pages qui nécessitent une authentification devraient être dynamiques
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  
  // Utiliser le mode de compilation standard au lieu de standalone
  // output: 'standalone', // Commenté pour débogage
  
  // Configuration de webpack pour résoudre les problèmes de modules
  webpack: (config, { isServer }) => {
    // Force webpack à résoudre framer-motion correctement
    config.resolve.alias = {
      ...config.resolve.alias,
      'framer-motion': require.resolve('framer-motion'),
    };
    
    // Rendre le polyfill localStorage/window disponible côté serveur 
    if (isServer) {
      // Mock global window et localStorage côté serveur
      Object.defineProperty(global, 'window', {
        value: {
          localStorage: {
            getItem: () => null,
            setItem: () => null,
            removeItem: () => null
          },
          matchMedia: () => ({
            matches: false,
            addEventListener: () => {},
            removeEventListener: () => {}
          }),
          navigator: {
            userAgent: 'node'
          },
          document: {
            cookie: '',
            querySelector: () => null,
            querySelectorAll: () => [],
            documentElement: { 
              classList: { 
                add: () => {},
                remove: () => {}
              }
            },
            createElement: () => ({
              style: {}
            })
          }
        },
        writable: true
      });
    }
    
    return config;
  },

  // Configuration des headers HTTP pour améliorer la sécurité
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig