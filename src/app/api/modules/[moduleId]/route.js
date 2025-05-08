export async function GET(request, { params }) {
  const moduleId = params.moduleId;
  
  // Simuler une récupération de données depuis une base de données
  const modulesData = [
    {
      id: "1",
      title: "Introduction à Next.js",
      description: "Découvrez les bases de Next.js, ses avantages par rapport à React et comment configurer votre premier projet.",
      level: "Débutant",
      image: "/images/modules/nextjs-intro.jpg",
      progressPercent: 0,
      lessons: [
        { 
          id: "1-1", 
          title: "Qu'est-ce que Next.js", 
          type: "theory", 
          duration: "15 min", 
          xpReward: 10, 
          completed: false,
          content: {
            theory: "Next.js est un framework React qui permet de créer des applications web performantes avec rendu côté serveur et génération de sites statiques.",
            example: "```jsx\n// Exemple de page Next.js simple\nfunction HomePage() {\n  return <div>Bienvenue sur Next.js!</div>\n}\n\nexport default HomePage;\n```",
            quiz: [
              {
                question: "Next.js est basé sur quelle bibliothèque?",
                options: ["Vue.js", "Angular", "React", "Svelte"],
                answer: 2
              }
            ]
          }
        },
        { 
          id: "1-2", 
          title: "Avantages de Next.js", 
          type: "theory", 
          duration: "10 min", 
          xpReward: 10, 
          completed: false,
          content: {
            theory: "Next.js offre le rendu côté serveur, la génération de sites statiques, le découpage de code automatique, et une expérience de développement optimisée.",
            example: "```jsx\n// SSR - Rendu côté serveur\nexport async function getServerSideProps() {\n  // Fetch data from external API\n  const res = await fetch('https://api.example.com/data')\n  const data = await res.json()\n\n  // Pass data to the page via props\n  return { props: { data } }\n}\n```",
            quiz: [
              {
                question: "Quel est l'avantage principal du rendu côté serveur?",
                options: ["Plus rapide à développer", "Meilleur SEO", "Moins de code", "Support de TypeScript"],
                answer: 1
              }
            ]
          }
        },
        { 
          id: "1-3", 
          title: "Installation et Configuration", 
          type: "exercise", 
          duration: "20 min", 
          xpReward: 15, 
          completed: false,
          content: {
            theory: "Pour installer Next.js, vous avez besoin de Node.js et npm. La commande de base est: npx create-next-app@latest",
            exercise: "Créez un nouveau projet Next.js et explorez sa structure de fichiers. Exécutez-le localement avec 'npm run dev'.",
            solution: "```bash\nnpx create-next-app@latest mon-projet\ncd mon-projet\nnpm run dev\n```"
          }
        }
      ]
    },
    {
      id: "2",
      title: "Fondamentaux de Next.js",
      description: "Maîtrisez le routage, les pages et la récupération de données dans Next.js.",
      level: "Intermédiaire",
      image: "/images/modules/nextjs-fundamentals.jpg",
      progressPercent: 0,
      lessons: [
        { 
          id: "2-1", 
          title: "Structure des Fichiers", 
          type: "theory", 
          duration: "15 min", 
          xpReward: 10, 
          completed: false,
          content: {
            theory: "Next.js utilise une structure de fichiers basée sur les conventions où chaque fichier dans le dossier pages devient une route.",
            example: "```\n/pages\n  index.js        → /\n  about.js        → /about\n  /blog\n    index.js      → /blog\n    [slug].js     → /blog/:slug\n```",
            quiz: [
              {
                question: "Comment créer une route dynamique dans Next.js?",
                options: ["Utiliser des crochets []", "Préfixer avec $", "Suffixer avec .dynamic", "Utiliser une fonction spéciale"],
                answer: 0
              }
            ]
          }
        },
        { 
          id: "2-2", 
          title: "Système de Routage", 
          type: "theory", 
          duration: "20 min", 
          xpReward: 15, 
          completed: false,
          content: {
            theory: "Next.js fournit un système de routage basé sur le système de fichiers. Il prend en charge les routes statiques, dynamiques et optionnelles.",
            example: "```jsx\nimport Link from 'next/link'\n\nfunction NavBar() {\n  return (\n    <nav>\n      <Link href=\"/\">Accueil</Link>\n      <Link href=\"/blog\">Blog</Link>\n      <Link href=\"/about\">À propos</Link>\n    </nav>\n  )\n}\n```",
            quiz: [
              {
                question: "Quel composant est utilisé pour la navigation côté client dans Next.js?",
                options: ["Router", "NavLink", "Link", "Navigate"],
                answer: 2
              }
            ]
          }
        },
        { 
          id: "2-3", 
          title: "Pages et Composants", 
          type: "exercise", 
          duration: "25 min", 
          xpReward: 20, 
          completed: false,
          content: {
            theory: "Dans Next.js, vous pouvez créer des composants réutilisables et les importer dans vos pages pour une meilleure organisation du code.",
            exercise: "Créez une page d'accueil avec un en-tête, un pied de page et une section principale. Extrayez chaque partie dans son propre composant.",
            solution: "```jsx\n// components/Header.js\nexport default function Header() {\n  return <header>En-tête de l'application</header>\n}\n\n// components/Footer.js\nexport default function Footer() {\n  return <footer>Pied de page © 2023</footer>\n}\n\n// pages/index.js\nimport Header from '../components/Header'\nimport Footer from '../components/Footer'\n\nexport default function Home() {\n  return (\n    <div>\n      <Header />\n      <main>Contenu principal</main>\n      <Footer />\n    </div>\n  )\n}\n```"
          }
        },
        { 
          id: "2-4", 
          title: "Data Fetching", 
          type: "project", 
          duration: "30 min", 
          xpReward: 25, 
          completed: false,
          content: {
            theory: "Next.js fournit plusieurs méthodes pour récupérer des données: getStaticProps, getStaticPaths et getServerSideProps.",
            exercise: "Créez une page qui affiche une liste d'articles de blog récupérés à partir d'une API. Utilisez getStaticProps pour récupérer les données au moment de la construction.",
            solution: "```jsx\n// pages/blog.js\nexport async function getStaticProps() {\n  const res = await fetch('https://jsonplaceholder.typicode.com/posts')\n  const posts = await res.json()\n\n  return {\n    props: {\n      posts,\n    },\n  }\n}\n\nexport default function Blog({ posts }) {\n  return (\n    <div>\n      <h1>Blog</h1>\n      <ul>\n        {posts.map((post) => (\n          <li key={post.id}>{post.title}</li>\n        ))}\n      </ul>\n    </div>\n  )\n}\n```"
          }
        }
      ]
    },
    {
      id: "3",
      title: "Fonctionnalités Avancées",
      description: "Explorez les API Routes, les middlewares, l'optimisation des images et l'internationalisation.",
      level: "Avancé",
      image: "/images/modules/nextjs-advanced.jpg",
      progressPercent: 0,
      lessons: [
        { id: "3-1", title: "API Routes", type: "theory", duration: 20, xpReward: 15, completed: false },
        { id: "3-2", title: "Middleware", type: "theory", duration: 25, xpReward: 20, completed: false },
        { id: "3-3", title: "Optimisation des Images", type: "exercise", duration: 30, xpReward: 25, completed: false },
        { id: "3-4", title: "Internationalisation", type: "project", duration: 40, xpReward: 30, completed: false }
      ]
    },
    {
      id: "4",
      title: "Déploiement et Performance",
      description: "Apprenez à déployer et optimiser vos applications Next.js pour des performances maximales.",
      level: "Expert",
      image: "/images/modules/nextjs-deployment.jpg",
      progressPercent: 0,
      lessons: [
        { id: "4-1", title: "Déploiement sur Vercel", type: "theory", duration: 25, xpReward: 20, completed: false },
        { id: "4-2", title: "Déploiement sur Cloudflare", type: "theory", duration: 25, xpReward: 20, completed: false },
        { id: "4-3", title: "Optimisation des Performances", type: "exercise", duration: 35, xpReward: 30, completed: false },
        { id: "4-4", title: "Analytics et Monitoring", type: "project", duration: 30, xpReward: 25, completed: false }
      ]
    }
  ];

  const module = modulesData.find(m => m.id === moduleId);
  
  if (!module) {
    return new Response(JSON.stringify({ error: "Module not found" }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify(module), {
    headers: { 'Content-Type': 'application/json' }
  });
}
