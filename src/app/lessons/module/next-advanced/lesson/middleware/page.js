
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '@/components/editor/CodeEditor';
import CodePreviewSandbox from '@/components/editor/CodePreviewSandbox';
import QuizComponent from '@/components/lessons/QuizComponent';
import ExerciseComponent from '@/components/lessons/ExerciseComponent';
import Link from 'next/link';

export default function MiddlewareLesson() {
  const [activeTab, setActiveTab] = useState('theory');
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const middlewareCode = `// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Vérifie si l'utilisateur est authentifié
  const isAuthenticated = request.cookies.has('authToken');
  
  // Redirige vers la page de connexion si non authentifié
  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Ajoute un en-tête personnalisé
  const response = NextResponse.next();
  response.headers.set('x-middleware-cache', 'no-cache');
  
  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
}`;

  const serverComponentCode = `// app/dashboard/page.js
// Un composant serveur (ne comporte pas l'instruction "use client")
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import DashboardContent from '@/components/dashboard/DashboardContent';

export default async function DashboardPage() {
  // Cette fonction s'exécute côté serveur
  const session = await getServerSession();
  
  if (!session) {
    // Redirection côté serveur
    redirect("/login");
  }
  
  // Récupération des données utilisateur depuis une base de données
  const userData = await fetchUserData(session.user.id);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
      {/* Transmission des données au composant client */}
      <DashboardContent initialData={userData} />
    </div>
  );
}

async function fetchUserData(userId) {
  // Cette fonction serait normalement connectée à votre base de données
  return { name: "Utilisateur Test", projects: 5, completedLessons: 12 };
}`;

  const streamingCode = `// app/catalog/page.js
import { Suspense } from 'react';
import ProductList from './ProductList';
import RecommendedProducts from './RecommendedProducts';
import Loading from './loading';

export default function CatalogPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Catalogue de produits</h1>
      
      {/* La page s'affiche immédiatement pendant que ProductList charge */}
      <Suspense fallback={<Loading type="productList" />}>
        <ProductList />
      </Suspense>
      
      {/* Les recommandations se chargent en parallèle */}
      <Suspense fallback={<Loading type="recommendations" />}>
        <RecommendedProducts />
      </Suspense>
    </div>
  );
}`;

  const exerciseInitialCode = `// Créez un middleware qui:
// 1. Vérifie si la requête vient d'un appareil mobile (user-agent)
// 2. Redirige les appareils mobiles vers une version mobile (/mobile/...)
// 3. Ajoute un en-tête personnalisé 'x-device-type'

// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Votre code ici
  
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}`;
  
  const exerciseSolution = `// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Récupère le user-agent
  const userAgent = request.headers.get('user-agent') || '';
  
  // Vérifie si c'est un appareil mobile
  const isMobile = /android|iphone|ipad|ipod/i.test(userAgent);
  
  // Crée la réponse
  const response = NextResponse.next();
  
  // Ajoute l'en-tête personnalisé
  response.headers.set('x-device-type', isMobile ? 'mobile' : 'desktop');
  
  // Redirige les appareils mobiles si la route n'est pas déjà mobile
  if (isMobile && !request.nextUrl.pathname.startsWith('/mobile')) {
    return NextResponse.redirect(
      new URL(\`/mobile\${request.nextUrl.pathname}\`, request.url)
    );
  }
  
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}`;

  const quizQuestions = [
    {
      question: "Où doit être placé le fichier middleware.js dans une application Next.js?",
      options: [
        "Dans le dossier /app",
        "Dans le dossier /src",
        "À la racine du projet, au même niveau que package.json",
        "Dans le dossier /public"
      ],
      correctAnswer: "À la racine du projet, au même niveau que package.json"
    },
    {
      question: "Quelle est la principale différence entre un composant client et un composant serveur dans Next.js?",
      options: [
        "Les composants serveur utilisent 'use server' tandis que les composants client utilisent 'use client'",
        "Les composants serveur n'ont pas besoin de la directive 'use client' en haut du fichier",
        "Les composants serveur ne peuvent pas utiliser d'hooks React",
        "Les composants client sont toujours plus rapides que les composants serveur"
      ],
      correctAnswer: "Les composants serveur n'ont pas besoin de la directive 'use client' en haut du fichier"
    },
    {
      question: "Quelle fonction permet de récupérer les cookies dans un middleware Next.js?",
      options: [
        "request.getCookies()",
        "request.cookies.get()",
        "request.cookies.has()",
        "request.headers.cookie"
      ],
      correctAnswer: "request.cookies.has()"
    },
    {
      question: "Comment configurer les routes auxquelles un middleware s'applique?",
      options: [
        "En utilisant middleware.config.js",
        "En exportant un objet config avec une propriété matcher",
        "En spécifiant les routes dans next.config.js",
        "En utilisant la fonction setMatcher()"
      ],
      correctAnswer: "En exportant un objet config avec une propriété matcher"
    },
    {
      question: "Quel est l'avantage principal du streaming avec les Suspense dans Next.js?",
      options: [
        "Il réduit la charge sur le serveur",
        "Il permet d'afficher progressivement le contenu de la page pendant que des parties sont encore en chargement",
        "Il améliore le SEO en rendant toute la page côté serveur",
        "Il est plus facile à mettre en œuvre que le SSR traditionnel"
      ],
      correctAnswer: "Il permet d'afficher progressivement le contenu de la page pendant que des parties sont encore en chargement"
    }
  ];

  // Mettre à jour la progression en fonction des onglets visités
  useEffect(() => {
    const visitedTabs = localStorage.getItem('visitedTabs-middleware') 
      ? JSON.parse(localStorage.getItem('visitedTabs-middleware')) 
      : [];
    
    if (!visitedTabs.includes(activeTab)) {
      visitedTabs.push(activeTab);
      localStorage.setItem('visitedTabs-middleware', JSON.stringify(visitedTabs));
    }
    
    const progressValue = Math.round((visitedTabs.length / 4) * 100);
    setProgress(progressValue);
    
    if (progressValue >= 100) {
      setIsCompleted(true);
      // Enregistrer la complétion de la leçon dans le système
      localStorage.setItem('lesson-middleware-completed', 'true');
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
          <span className="ml-2 text-gray-700">Middleware et Composants Serveur</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Middleware et Composants Serveur</h1>
        <p className="text-gray-600">Découvrez comment utiliser les middleware et les composants serveur pour améliorer vos applications Next.js.</p>
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
              <h2 className="text-2xl font-bold mb-4">Middleware dans Next.js</h2>
              
              <div className="p-4 border-l-4 border-indigo-500 bg-indigo-50 mb-6">
                <p className="text-indigo-700 font-medium">
                  Les middleware dans Next.js vous permettent d'exécuter du code avant qu'une requête ne soit complétée, 
                  vous donnant un contrôle puissant sur les réponses de votre application.
                </p>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">Qu'est-ce qu'un Middleware?</h3>
              <p className="mb-4">
                Un middleware dans Next.js est une fonction qui s'exécute avant que la requête n'atteigne la page ou l'API route correspondante.
                Il peut être utilisé pour:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Rediriger les utilisateurs en fonction de certaines conditions</li>
                <li>Authentifier les utilisateurs avant d'accéder à des routes protégées</li>
                <li>Modifier les en-têtes des requêtes et des réponses</li>
                <li>Réécritures d'URL</li>
                <li>A/B testing</li>
                <li>Géolocalisation</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3">Comment créer un Middleware</h3>
              <p className="mb-4">
                Pour créer un middleware, il vous suffit de créer un fichier <code>middleware.js</code> ou <code>middleware.ts</code> à la racine de votre projet. 
                Ce fichier doit exporter une fonction nommée <code>middleware</code>.
              </p>

              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <pre className="text-sm text-gray-800 overflow-x-auto">
{`// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Code du middleware
  return NextResponse.next()
}`}
                </pre>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">Configuration des routes</h3>
              <p className="mb-4">
                Pour spécifier les routes auxquelles le middleware doit s'appliquer, vous pouvez exporter un objet de configuration:
              </p>
              
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <pre className="text-sm text-gray-800 overflow-x-auto">
{`export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*'],
}`}
                </pre>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Composants Serveur</h2>
              
              <div className="p-4 border-l-4 border-green-500 bg-green-50 mb-6">
                <p className="text-green-700 font-medium">
                  Les composants serveur représentent un changement fondamental dans le développement React, permettant
                  d'exécuter des composants directement sur le serveur, avec une performance et une sécurité améliorées.
                </p>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">Qu'est-ce qu'un Composant Serveur?</h3>
              <p className="mb-4">
                Les composants serveur sont des composants React qui s'exécutent exclusivement sur le serveur. Ils permettent:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>D'accéder directement à des ressources comme les bases de données</li>
                <li>De garder les informations sensibles côté serveur</li>
                <li>De réduire le JavaScript envoyé au client</li>
                <li>D'améliorer les performances de chargement initial</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3">Composants Serveur vs Composants Client</h3>
              <p className="mb-4">
                Par défaut, dans Next.js 13+ avec le dossier App, tous les composants sont des composants serveur.
                Pour définir un composant client, vous devez ajouter la directive <code>"use client"</code> en haut du fichier.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-md">
                  <h4 className="font-semibold text-green-700 mb-2">Composant Serveur</h4>
                  <pre className="text-sm text-gray-800 overflow-x-auto">
{`// app/page.js
// Pas de directive "use client"

export default async function Page() {
  // Accès direct à la base de données
  const data = await fetchFromDatabase()
  
  return <main>{data.title}</main>
}`}
                  </pre>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md">
                  <h4 className="font-semibold text-blue-700 mb-2">Composant Client</h4>
                  <pre className="text-sm text-gray-800 overflow-x-auto">
{`// components/Counter.js
"use client"

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}`}
                  </pre>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Streaming et Suspense</h2>
              <p className="mb-4">
                Next.js offre un support pour le streaming, permettant d'afficher progressivement le contenu d'une page
                à mesure qu'il est généré par le serveur, plutôt que d'attendre que toute la page soit prête.
              </p>
              
              <p className="mb-4">
                Cette approche utilise React Suspense pour "suspendre" certaines parties de votre UI pendant que d'autres
                sont déjà affichées, améliorant considérablement les métriques de performance comme le TTFB (Time To First Byte).
              </p>
              
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <pre className="text-sm text-gray-800 overflow-x-auto">
{`// app/products/page.js
import { Suspense } from 'react'
import ProductList from './ProductList'
import RecommendedProducts from './RecommendedProducts'

export default function ProductsPage() {
  return (
    <div>
      <h1>Produits</h1>
      
      {/* La page s'affiche immédiatement tandis que ProductList charge */}
      <Suspense fallback={<p>Chargement des produits...</p>}>
        <ProductList />
      </Suspense>
      
      {/* Les recommandations se chargent indépendamment */}
      <Suspense fallback={<p>Chargement des recommandations...</p>}>
        <RecommendedProducts />
      </Suspense>
    </div>
  )
}`}
                </pre>
              </div>
              
              <div className="p-4 border-l-4 border-amber-500 bg-amber-50 mb-6">
                <p className="text-amber-700 font-medium">
                  <span className="font-bold">Astuce:</span> En combinant les composants serveur et le streaming, vous pouvez créer
                  des applications qui semblent instantanées pour l'utilisateur, en affichant l'interface immédiatement
                  pendant que les données se chargent progressivement.
                </p>
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
                <h3 className="text-xl font-semibold mb-3">Exemple 1: Middleware d'authentification</h3>
                <p className="mb-4">
                  Voici un exemple de middleware qui vérifie si l'utilisateur est authentifié avant d'accéder
                  aux pages du tableau de bord et du profil.
                </p>
                
                <div className="mb-4">
                  <CodePreviewSandbox code={middlewareCode} language="javascript" />
                </div>
                
                <div className="bg-amber-50 p-4 rounded-md mb-6">
                  <h4 className="font-semibold text-amber-700 mb-2">Comment ça fonctionne?</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-amber-800">
                    <li>Le middleware vérifie si le cookie 'authToken' existe dans la requête</li>
                    <li>Si l'utilisateur n'est pas authentifié et tente d'accéder au tableau de bord, il est redirigé</li>
                    <li>Un en-tête personnalisé est ajouté à toutes les réponses</li>
                    <li>La configuration <code>matcher</code> limite l'application du middleware aux routes spécifiées</li>
                  </ul>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Exemple 2: Composant Serveur avec authentification</h3>
                <p className="mb-4">
                  Cet exemple montre comment créer un composant serveur qui vérifie l'authentification et
                  récupère des données directement depuis une base de données.
                </p>
                
                <div className="mb-4">
                  <CodePreviewSandbox code={serverComponentCode} language="javascript" />
                </div>
                
                <div className="bg-amber-50 p-4 rounded-md mb-6">
                  <h4 className="font-semibold text-amber-700 mb-2">Points clés:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-amber-800">
                    <li>Ce composant est un composant serveur par défaut (pas de "use client")</li>
                    <li>Il peut être asynchrone et attendre des données</li>
                    <li>L'authentification est vérifiée côté serveur</li>
                    <li>Les données sensibles ne sont jamais exposées au client</li>
                    <li>Seul le HTML résultant est envoyé au navigateur</li>
                  </ul>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Exemple 3: Streaming avec Suspense</h3>
                <p className="mb-4">
                  Cet exemple illustre comment utiliser le streaming et Suspense pour charger différentes
                  parties d'une page indépendamment.
                </p>
                
                <div className="mb-4">
                  <CodePreviewSandbox code={streamingCode} language="javascript" />
                </div>
                
                <div className="bg-amber-50 p-4 rounded-md mb-6">
                  <h4 className="font-semibold text-amber-700 mb-2">Avantages:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-amber-800">
                    <li>La page s'affiche immédiatement, même si certaines parties prennent du temps à charger</li>
                    <li>Chaque composant entouré de Suspense peut charger indépendamment</li>
                    <li>Améliore les métriques FCP (First Contentful Paint) et TTI (Time To Interactive)</li>
                    <li>Les fallbacks apparaissent uniquement pour les sections en chargement</li>
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
                  <span className="font-bold">Objectif:</span> Créer un middleware qui détecte si l'utilisateur utilise 
                  un appareil mobile, et le redirige vers une version mobile du site.
                </p>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">Instructions:</h3>
              <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li>Créez un middleware qui détecte les appareils mobiles en fonction du user-agent</li>
                <li>Si l'utilisateur est sur mobile, redirigez-le vers une version mobile du site (/mobile/...)</li>
                <li>Ajoutez un en-tête personnalisé 'x-device-type' avec la valeur 'mobile' ou 'desktop'</li>
                <li>Appliquez le middleware à toutes les routes, à l'exception des ressources statiques</li>
              </ol>
              
              <ExerciseComponent
                instructions={
                  <div className="space-y-4">
                    <p>Complétez le code du middleware suivant:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Utilisez <code>request.headers.get('user-agent')</code> pour obtenir le user-agent</li>
                      <li>Détectez les appareils mobiles avec une expression régulière</li>
                      <li>Ajoutez l'en-tête personnalisé avec <code>response.headers.set()</code></li>
                      <li>Redirigez avec <code>NextResponse.redirect()</code> si nécessaire</li>
                    </ul>
                  </div>
                }
                initialCode={exerciseInitialCode}
                solution={exerciseSolution}
                language="javascript"
                onComplete={() => {
                  const visitedTabs = JSON.parse(localStorage.getItem('visitedTabs-middleware') || '[]');
                  if (!visitedTabs.includes('exercise')) {
                    visitedTabs.push('exercise');
                    localStorage.setItem('visitedTabs-middleware', JSON.stringify(visitedTabs));
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
                Testez vos connaissances sur les middleware et les composants serveur en répondant aux questions suivantes:
              </p>
              
              <QuizComponent 
                questions={quizQuestions}
                onComplete={() => {
                  const visitedTabs = JSON.parse(localStorage.getItem('visitedTabs-middleware') || '[]');
                  if (!visitedTabs.includes('quiz')) {
                    visitedTabs.push('quiz');
                    localStorage.setItem('visitedTabs-middleware', JSON.stringify(visitedTabs));
                    setProgress(Math.round((visitedTabs.length / 4) * 100));
                  }
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between">
        <Link href="/lessons/module/next-advanced" className="btn-secondary">
          Retour au module
        </Link>
        
        <Link href="/lessons/module/next-advanced/lesson/streaming" className="btn-primary">
          Leçon suivante: Streaming Server Components
        </Link>
      </div>
    </div>
  );
}
