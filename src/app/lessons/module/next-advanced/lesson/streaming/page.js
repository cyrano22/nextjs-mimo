
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '@/components/editor/CodeEditor';
import CodePreviewSandbox from '@/components/editor/CodePreviewSandbox';
import QuizComponent from '@/components/lessons/QuizComponent';
import ExerciseComponent from '@/components/lessons/ExerciseComponent';
import Link from 'next/link';

export default function StreamingServerComponentsLesson() {
  const [activeTab, setActiveTab] = useState('theory');
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const basicStreamingCode = `// app/page.js
import { Suspense } from 'react';
import UserProfile from './UserProfile';
import RecentPosts from './RecentPosts';
import PopularProducts from './PopularProducts';

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Bienvenue sur notre plateforme</h1>
      
      {/* L'en-tête et le titre s'affichent immédiatement */}
      
      {/* Le profil utilisateur se charge indépendamment */}
      <Suspense fallback={<ProfileSkeleton />}>
        <UserProfile />
      </Suspense>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Les posts récents se chargent indépendamment */}
        <Suspense fallback={<PostsSkeleton />}>
          <RecentPosts />
        </Suspense>
        
        {/* Les produits populaires se chargent indépendamment */}
        <Suspense fallback={<ProductsSkeleton />}>
          <PopularProducts />
        </Suspense>
      </div>
    </div>
  );
}

// Composants squelettes pour l'affichage pendant le chargement
function ProfileSkeleton() {
  return <div className="h-20 bg-gray-200 animate-pulse rounded-md"></div>;
}

function PostsSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 animate-pulse rounded-md"></div>
      <div className="h-4 bg-gray-200 animate-pulse rounded-md w-5/6"></div>
      <div className="h-4 bg-gray-200 animate-pulse rounded-md"></div>
    </div>
  );
}

function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="h-24 bg-gray-200 animate-pulse rounded-md"></div>
      <div className="h-24 bg-gray-200 animate-pulse rounded-md"></div>
      <div className="h-24 bg-gray-200 animate-pulse rounded-md"></div>
      <div className="h-24 bg-gray-200 animate-pulse rounded-md"></div>
    </div>
  );
}`;

  const serverComponentCode = `// app/RecentPosts.js
// Composant Serveur (sans "use client")
import { getRecentPosts } from '@/lib/database';

export default async function RecentPosts() {
  // Simuler une requête lente à la base de données
  const posts = await getRecentPosts();
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Publications récentes</h2>
      
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="border-b pb-4">
            <h3 className="font-medium">{post.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{post.excerpt}</p>
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <span>{post.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Fonction simulée pour récupérer les données 
// (Dans une application réelle, cela viendrait d'une base de données)
export async function getRecentPosts() {
  // Simuler un délai réseau
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return [
    {
      id: 1,
      title: "Introduction à Server Components",
      excerpt: "Découvrez comment les Server Components révolutionnent le développement React...",
      author: "Sarah Chen",
      date: "2 jours"
    },
    {
      id: 2,
      title: "Optimiser le streaming avec Suspense",
      excerpt: "Apprenez à améliorer l'expérience utilisateur avec le streaming...",
      author: "Thomas Dubois",
      date: "4 jours"
    },
    {
      id: 3,
      title: "Performance Next.js: Bonnes pratiques",
      excerpt: "Un guide complet pour optimiser votre application Next.js...",
      author: "Maria Rodriguez",
      date: "1 semaine"
    }
  ];
}`;

  const parallelDataFetchingCode = `// app/dashboard/page.js
import { Suspense } from 'react';
import UserStats from './UserStats';
import RecentActivity from './RecentActivity';
import Notifications from './Notifications';
import { getUser } from '@/lib/auth';

export default async function DashboardPage() {
  const user = await getUser();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Bonjour, {user.name}</h1>
      <p className="text-gray-600 mb-8">Voici un résumé de votre activité</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ces trois composants chargent leurs données en parallèle */}
        <Suspense fallback={<CardSkeleton />}>
          <UserStats userId={user.id} />
        </Suspense>
        
        <Suspense fallback={<CardSkeleton />}>
          <RecentActivity userId={user.id} />
        </Suspense>
        
        <Suspense fallback={<CardSkeleton />}>
          <Notifications userId={user.id} />
        </Suspense>
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-64">
      <div className="h-5 bg-gray-200 rounded-md animate-pulse mb-4 w-1/3"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded-md animate-pulse w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded-md animate-pulse w-4/6"></div>
      </div>
    </div>
  );
}`;

  const exerciseInitialCode = `// Créez une page de blog avec streaming
// 1. La page doit afficher un en-tête immédiatement
// 2. Les articles de blog doivent être chargés avec Suspense
// 3. La barre latérale (catégories) doit être chargée avec Suspense
// 4. Chaque composant doit avoir un fallback visuel pendant le chargement

// app/blog/page.js
import { Suspense } from 'react';

// À implémenter: BlogPosts, Categories, et squelettes

export default function BlogPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Notre Blog</h1>
      
      {/* Implémentez le layout et les composants Suspense ici */}
      
    </div>
  );
}`;
  
  const exerciseSolution = `// app/blog/page.js
import { Suspense } from 'react';

// Ces composants seraient normalement dans des fichiers séparés
async function BlogPosts() {
  // Simuler une requête lente
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const posts = [
    { id: 1, title: "Comprendre les Server Components", category: "React", date: "12 Mai 2023" },
    { id: 2, title: "Streaming dans Next.js", category: "Next.js", date: "5 Juin 2023" },
    { id: 3, title: "Optimisation des performances", category: "Performance", date: "20 Juin 2023" },
    { id: 4, title: "Déploiement sur Vercel", category: "DevOps", date: "12 Juillet 2023" },
  ];
  
  return (
    <div className="space-y-6">
      {posts.map(post => (
        <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{post.category}</span>
            <span>{post.date}</span>
          </div>
          <p className="mt-4 text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Phasellus ac magna non augue porttitor scelerisque ac id diam...
          </p>
          <button className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium">
            Lire la suite →
          </button>
        </div>
      ))}
    </div>
  );
}

async function Categories() {
  // Simuler une requête lente
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const categories = [
    { id: 1, name: "React", count: 12 },
    { id: 2, name: "Next.js", count: 8 },
    { id: 3, name: "JavaScript", count: 15 },
    { id: 4, name: "Performance", count: 6 },
    { id: 5, name: "DevOps", count: 4 },
    { id: 6, name: "UI/UX", count: 9 }
  ];
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Catégories</h2>
      <ul className="space-y-2">
        {categories.map(category => (
          <li key={category.id} className="flex justify-between items-center">
            <span className="text-indigo-600 hover:text-indigo-800 cursor-pointer">
              {category.name}
            </span>
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              {category.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PostsSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-6 bg-gray-200 rounded-md animate-pulse w-3/4 mb-2"></div>
          <div className="flex justify-between mb-4">
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-20"></div>
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-24"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-4/5"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded-md animate-pulse w-32 mt-4"></div>
        </div>
      ))}
    </div>
  );
}

function CategoriesSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="h-6 bg-gray-200 rounded-md animate-pulse w-1/3 mb-4"></div>
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-20"></div>
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-8"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Notre Blog</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Les articles de blog se chargent indépendamment */}
          <Suspense fallback={<PostsSkeleton />}>
            <BlogPosts />
          </Suspense>
        </div>
        
        <div className="lg:col-span-1">
          {/* La sidebar se charge indépendamment */}
          <Suspense fallback={<CategoriesSkeleton />}>
            <Categories />
          </Suspense>
        </div>
      </div>
    </div>
  );
}`;

  const quizQuestions = [
    {
      question: "Quel est l'avantage principal du streaming avec les Server Components?",
      options: [
        "Il réduit la consommation de mémoire du serveur",
        "Il permet d'afficher les parties statiques de la page immédiatement, pendant que le contenu dynamique est encore en chargement",
        "Il empêche les navigateurs de mettre en cache les réponses du serveur",
        "Il simplifie le code côté client en déplaçant toute la logique côté serveur"
      ],
      correctAnswer: "Il permet d'afficher les parties statiques de la page immédiatement, pendant que le contenu dynamique est encore en chargement"
    },
    {
      question: "Quel composant React est utilisé pour activer le streaming dans Next.js?",
      options: [
        "<Stream>",
        "<Lazy>",
        "<Suspense>",
        "<Await>"
      ],
      correctAnswer: "<Suspense>"
    },
    {
      question: "Comment le streaming améliore-t-il les métriques de performance web?",
      options: [
        "Il réduit uniquement le Time to First Byte (TTFB)",
        "Il réduit uniquement le First Contentful Paint (FCP)",
        "Il augmente le Web Vitals Score sans impact sur les métriques individuelles",
        "Il améliore le Time to First Byte (TTFB), le First Contentful Paint (FCP) et l'interactivité perçue"
      ],
      correctAnswer: "Il améliore le Time to First Byte (TTFB), le First Contentful Paint (FCP) et l'interactivité perçue"
    },
    {
      question: "Que se passe-t-il lorsqu'un composant entouré de Suspense est en cours de chargement?",
      options: [
        "La page entière attend que le composant soit chargé",
        "Le composant fallback spécifié est affiché pendant le chargement",
        "Une erreur est générée que vous devez capturer avec ErrorBoundary",
        "Le composant est simplement masqué jusqu'à ce qu'il soit prêt"
      ],
      correctAnswer: "Le composant fallback spécifié est affiché pendant le chargement"
    },
    {
      question: "Quelle est la différence entre le modèle de streaming et le modèle traditionnel SSR?",
      options: [
        "Le SSR génère toute la page côté serveur et l'envoie en une seule fois, tandis que le streaming envoie des morceaux de HTML progressivement",
        "Le SSR est plus rapide que le streaming dans tous les cas de figure",
        "Le streaming fonctionne uniquement avec des composants client, tandis que le SSR fonctionne uniquement avec des composants serveur",
        "Il n'y a aucune différence technique, seulement une différence de terminologie"
      ],
      correctAnswer: "Le SSR génère toute la page côté serveur et l'envoie en une seule fois, tandis que le streaming envoie des morceaux de HTML progressivement"
    }
  ];

  // Mettre à jour la progression en fonction des onglets visités
  useEffect(() => {
    const visitedTabs = localStorage.getItem('visitedTabs-streaming') 
      ? JSON.parse(localStorage.getItem('visitedTabs-streaming')) 
      : [];
    
    if (!visitedTabs.includes(activeTab)) {
      visitedTabs.push(activeTab);
      localStorage.setItem('visitedTabs-streaming', JSON.stringify(visitedTabs));
    }
    
    const progressValue = Math.round((visitedTabs.length / 4) * 100);
    setProgress(progressValue);
    
    if (progressValue >= 100) {
      setIsCompleted(true);
      // Enregistrer la complétion de la leçon dans le système
      localStorage.setItem('lesson-streaming-completed', 'true');
    }
  }, [activeTab]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <Link href="/lessons" className="text-indigo-600 hover:text-indigo-800 mr-2">
            Modules
          </Link>
          <span className="text-gray-500">/</span>
          <Link href="/lessons/module/next-advanced" className="text-indigo-600 hover:text-indigo-800 mx-2">
            Next.js Avancé
          </Link>
          <span className="text-gray-500">/</span>
          <span className="ml-2 text-gray-700">Streaming Server Components</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Streaming Server Components</h1>
        <p className="text-gray-600">Apprenez à améliorer la performance perçue de vos applications Next.js grâce au streaming progressif avec les composants serveur.</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Progression de la leçon</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {isCompleted ? 'Complété' : 'En cours'}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="border-b">
          <div className="flex overflow-x-auto">
            <button 
              className={`px-4 py-3 font-medium ${activeTab === 'theory' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`} 
              onClick={() => setActiveTab('theory')}
            >
              Théorie
            </button>
            <button 
              className={`px-4 py-3 font-medium ${activeTab === 'examples' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`} 
              onClick={() => setActiveTab('examples')}
            >
              Exemples
            </button>
            <button 
              className={`px-4 py-3 font-medium ${activeTab === 'exercise' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`} 
              onClick={() => setActiveTab('exercise')}
            >
              Exercice
            </button>
            <button 
              className={`px-4 py-3 font-medium ${activeTab === 'quiz' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`} 
              onClick={() => setActiveTab('quiz')}
            >
              Quiz
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'theory' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">Streaming Server Components</h2>
              
              <div className="p-4 border-l-4 border-green-500 bg-green-50 mb-6">
                <p className="text-green-700 font-medium">
                  Le streaming avec les Server Components dans Next.js représente une révolution dans la façon dont les applications
                  React sont rendues et livrées aux utilisateurs, offrant un équilibre parfait entre performance et expérience utilisateur.
                </p>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">Qu'est-ce que le streaming?</h3>
              <p className="mb-4">
                Le streaming est une technique qui permet d'envoyer des morceaux de HTML depuis le serveur vers le client progressivement,
                au lieu d'attendre que toute la page soit rendue avant de l'envoyer. Cela permet aux utilisateurs de voir et d'interagir
                avec certaines parties de la page, même si d'autres parties sont encore en cours de chargement.
              </p>
              
              <div className="relative overflow-hidden bg-indigo-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold mb-3 text-indigo-700">Rendu traditionnel vs. Streaming</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h5 className="font-medium">Rendu traditionnel (SSR)</h5>
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                      <li>Le serveur commence à traiter la requête</li>
                      <li>Toutes les données sont récupérées</li>
                      <li>Le serveur génère l'HTML complet</li>
                      <li><strong>Attente complète</strong> avant d'envoyer quoi que ce soit</li>
                      <li>L'HTML entier est envoyé au client</li>
                      <li>La page s'affiche</li>
                    </ol>
                    <div className="mt-2 p-2 bg-red-50 text-red-700 text-xs rounded">
                      ⚠️ Le temps d'attente perçu est élevé car rien ne s'affiche avant la fin du processus.
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h5 className="font-medium">Streaming</h5>
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                      <li>Le serveur commence à traiter la requête</li>
                      <li>L'<strong>en-tête et la structure de base</strong> sont envoyés immédiatement</li>
                      <li>Le client commence à afficher la structure de base</li>
                      <li>Le serveur continue à récupérer des données et à générer du HTML</li>
                      <li>Des <strong>morceaux de HTML</strong> sont envoyés progressivement</li>
                      <li>Le client met à jour la page au fur et à mesure</li>
                    </ol>
                    <div className="mt-2 p-2 bg-green-50 text-green-700 text-xs rounded">
                      ✅ L'expérience utilisateur est améliorée car la page commence à s'afficher très rapidement.
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">React Suspense: La clé du streaming</h3>
              <p className="mb-4">
                React Suspense est le mécanisme qui permet le streaming. Suspense permet de "suspendre" le rendu d'un composant
                pendant qu'il attend une ressource (comme des données), tout en affichant un fallback à sa place.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <pre className="text-sm text-gray-800 overflow-x-auto">
{`import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Ma page</h1>
      
      {/* Ce contenu est affiché immédiatement */}
      
      <Suspense fallback={<LoadingSpinner />}>
        {/* Ce composant peut prendre du temps à charger */}
        <SlowDataComponent />
      </Suspense>
    </div>
  );
}`}
                </pre>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">Avantages du streaming</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-indigo-700 mb-2">Métriques de performance améliorées</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>TTFB (Time to First Byte)</strong>: Réduit considérablement</li>
                    <li><strong>FCP (First Contentful Paint)</strong>: Plus rapide, car les premiers éléments s'affichent immédiatement</li>
                    <li><strong>LCP (Largest Contentful Paint)</strong>: Amélioré grâce au chargement progressif</li>
                    <li><strong>TTI (Time to Interactive)</strong>: L'utilisateur peut interagir avec certaines parties pendant que d'autres chargent</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-indigo-700 mb-2">Expérience utilisateur améliorée</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Feedback visuel immédiat pour l'utilisateur</li>
                    <li>Perception de rapidité même si certaines données prennent du temps à charger</li>
                    <li>Réduction de la frustration liée aux pages vides pendant le chargement</li>
                    <li>Interface progressive et réactive qui s'enrichit au fur et à mesure</li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">Chargement parallèle des données</h3>
              <p className="mb-4">
                Un autre avantage puissant du streaming est la possibilité de charger des données en parallèle. Chaque Suspense 
                peut charger ses propres données indépendamment des autres, ce qui permet d'optimiser le temps de chargement global.
              </p>
              
              <div className="bg-amber-50 p-4 rounded-md mb-6">
                <h4 className="font-semibold text-amber-700 mb-2">Waterfall vs. Parallel Data Fetching</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium mb-1">Waterfall (cascade) - à éviter</h5>
                    <pre className="text-xs bg-white p-2 rounded text-gray-800 overflow-x-auto">
{`async function Page() {
  const user = await getUser()  // 300ms
  const posts = await getPosts() // 500ms
  const ads = await getAds()    // 400ms
  
  // Temps total: 1200ms
}`}
                    </pre>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-1">Parallel (parallèle) - recommandé</h5>
                    <pre className="text-xs bg-white p-2 rounded text-gray-800 overflow-x-auto">
{`function Page() {
  return (
    <>
      <Suspense fallback={<UserSkeleton />}>
        <User /> {/* 300ms */}
      </Suspense>
      <Suspense fallback={<PostsSkeleton />}>
        <Posts /> {/* 500ms */}
      </Suspense>
      <Suspense fallback={<AdsSkeleton />}>
        <Ads /> {/* 400ms */}
      </Suspense>
      
      {/* Temps total: ~500ms */}
    </>
  )
}`}
                    </pre>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">Conception de Fallbacks</h3>
              <p className="mb-4">
                Les fallbacks (ou "squelettes") affichés pendant le chargement sont essentiels pour une bonne expérience utilisateur.
                Ils devraient ressembler à la structure finale du contenu pour réduire les changements visuels brusques.
              </p>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-2">Bonnes pratiques pour les Fallbacks</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong>Utilisez des animations subtiles</strong>
                    <p className="text-xs text-gray-600 mt-1">Les effets "pulse" ou "shimmer" indiquent que le contenu est en cours de chargement.</p>
                  </li>
                  <li>
                    <strong>Respectez la structure</strong>
                    <p className="text-xs text-gray-600 mt-1">Le squelette devrait avoir la même structure que le contenu final pour éviter les sauts de layout.</p>
                  </li>
                  <li>
                    <strong>Utilisez des teintes neutres</strong>
                    <p className="text-xs text-gray-600 mt-1">Des gris clairs sont moins distrayants et donnent une impression de contenu "en attente".</p>
                  </li>
                </ul>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">Points à retenir</h3>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-lg mb-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>
                      <strong>Le streaming n'est pas une alternative au SSR</strong> - c'est une amélioration du SSR qui permet
                      d'afficher du contenu progressivement.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>
                      <strong>Avec Suspense, les requêtes sont effectuées en parallèle</strong>, ce qui améliore le temps
                      de chargement global de la page.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>
                      <strong>Les fallbacks bien conçus</strong> sont essentiels pour créer une expérience de chargement fluide
                      et agréable pour l'utilisateur.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>
                      <strong>Le streaming fonctionne particulièrement bien</strong> dans les applications dont certaines parties
                      dépendent de données lentes à récupérer.
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'examples' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">Exemples de code</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Exemple 1: Page d'accueil avec Streaming</h3>
                <p className="mb-4">
                  Voici un exemple de page d'accueil qui utilise le streaming pour charger différentes sections indépendamment.
                </p>
                
                <div className="mb-4">
                  <CodePreviewSandbox code={basicStreamingCode} language="javascript" />
                </div>
                
                <div className="bg-amber-50 p-4 rounded-md mb-6">
                  <h4 className="font-semibold text-amber-700 mb-2">Comment ça fonctionne?</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-amber-800">
                    <li>La structure principale de la page (titre et conteneur) s'affiche immédiatement</li>
                    <li>Chaque section de contenu (profil, posts, produits) est enveloppée dans un <code>Suspense</code></li>
                    <li>Pendant le chargement, les squelettes correspondants s'affichent</li>
                    <li>Quand les données sont disponibles, les composants réels remplacent les squelettes</li>
                    <li>Chaque section se charge indépendamment, permettant à l'utilisateur de voir le contenu au fur et à mesure</li>
                  </ul>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Exemple 2: Composant Serveur avec récupération de données</h3>
                <p className="mb-4">
                  Cet exemple montre un composant serveur qui récupère des données et peut être utilisé avec Suspense.
                </p>
                
                <div className="mb-4">
                  <CodePreviewSandbox code={serverComponentCode} language="javascript" />
                </div>
                
                <div className="bg-amber-50 p-4 rounded-md mb-6">
                  <h4 className="font-semibold text-amber-700 mb-2">Points clés:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-amber-800">
                    <li>Ce composant est un composant serveur (pas de directive "use client")</li>
                    <li>Il est asynchrone et peut attendre des données</li>
                    <li>La fonction <code>await getRecentPosts()</code> simule une requête lente à une base de données</li>
                    <li>Lorsqu'il est utilisé avec Suspense, le fallback sera affiché pendant que les données sont récupérées</li>
                    <li>Une fois les données disponibles, le composant remplacera automatiquement le fallback</li>
                  </ul>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Exemple 3: Chargement parallèle des données</h3>
                <p className="mb-4">
                  Cet exemple illustre comment utiliser Suspense pour charger différentes sections de données en parallèle.
                </p>
                
                <div className="mb-4">
                  <CodePreviewSandbox code={parallelDataFetchingCode} language="javascript" />
                </div>
                
                <div className="bg-amber-50 p-4 rounded-md mb-6">
                  <h4 className="font-semibold text-amber-700 mb-2">Avantages:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-amber-800">
                    <li>Les trois composants récupèrent leurs données en parallèle, plutôt qu'en série</li>
                    <li>Si une section est lente à charger, les autres sections peuvent toujours apparaître</li>
                    <li>L'utilisateur peut commencer à interagir avec les sections chargées sans attendre les autres</li>
                    <li>Le temps de chargement total est proche du temps de la requête la plus lente, plutôt que la somme de toutes les requêtes</li>
                    <li>Chaque section a son propre squelette, offrant une expérience de chargement progressive</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'exercise' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">Exercice pratique</h2>
              
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50 mb-6">
                <p className="text-blue-700">
                  <span className="font-bold">Objectif:</span> Créer une page de blog qui utilise le streaming pour charger 
                  progressivement son contenu, offrant une expérience utilisateur optimale.
                </p>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">Instructions:</h3>
              <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li>Créez une page de blog avec un en-tête qui s'affiche immédiatement</li>
                <li>Ajoutez une section principale pour les articles de blog qui se charge avec Suspense</li>
                <li>Ajoutez une barre latérale pour les catégories qui se charge également avec Suspense</li>
                <li>Créez des composants squelettes appropriés pour chaque section</li>
                <li>Assurez-vous que le chargement des données se fait en parallèle</li>
              </ol>
              
              <ExerciseComponent
                instructions={
                  <div className="space-y-4">
                    <p>Complétez le code de la page blog suivante:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Créez une mise en page avec une section principale (articles) et une barre latérale (catégories)</li>
                      <li>Entourez chaque section de <code>Suspense</code> avec des fallbacks appropriés</li>
                      <li>Assurez-vous que les composants simulant des requêtes lentes soient asynchrones</li>
                      <li>Le code doit être bien structuré, optimisé pour le chargement parallèle</li>
                    </ul>
                  </div>
                }
                initialCode={exerciseInitialCode}
                solution={exerciseSolution}
                language="javascript"
                onComplete={() => {
                  const visitedTabs = JSON.parse(localStorage.getItem('visitedTabs-streaming') || '[]');
                  if (!visitedTabs.includes('exercise')) {
                    visitedTabs.push('exercise');
                    localStorage.setItem('visitedTabs-streaming', JSON.stringify(visitedTabs));
                    setProgress(Math.round((visitedTabs.length / 4) * 100));
                  }
                }}
              />
            </motion.div>
          )}
          
          {activeTab === 'quiz' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">Quiz</h2>
              
              <p className="mb-6">
                Testez vos connaissances sur le streaming avec les Server Components en répondant aux questions suivantes:
              </p>
              
              <QuizComponent 
                questions={quizQuestions}
                onComplete={() => {
                  const visitedTabs = JSON.parse(localStorage.getItem('visitedTabs-streaming') || '[]');
                  if (!visitedTabs.includes('quiz')) {
                    visitedTabs.push('quiz');
                    localStorage.setItem('visitedTabs-streaming', JSON.stringify(visitedTabs));
                    setProgress(Math.round((visitedTabs.length / 4) * 100));
                  }
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between">
        <Link href="/lessons/module/next-advanced/lesson/middleware" className="btn-secondary">
          Leçon précédente: Middleware et Composants Serveur
        </Link>
        
        <Link href="/lessons/module/next-advanced" className="btn-primary">
          Retour au module
        </Link>
      </div>
    </div>
  );
}
