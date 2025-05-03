
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '@/components/editor/CodeEditor';
import CodePreviewSandbox from '@/components/editor/CodePreviewSandbox';
import QuizComponent from '@/components/lessons/QuizComponent';
import ExerciseComponent from '@/components/lessons/ExerciseComponent';

export default function MiddlewareLesson() {
  const [activeTab, setActiveTab] = useState('theory');
  const [isCompleted, setIsCompleted] = useState(false);
  
  const middlewareCode = `// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Exemple: vérification d'authentification
  const isAuthenticated = request.cookies.has('authToken');
  
  // Rediriger vers la page de connexion si non authentifié
  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Ajouter des en-têtes personnalisés à toutes les réponses
  const response = NextResponse.next();
  response.headers.set('x-middleware-cache', 'no-cache');
  return response;
}

// Configurer les chemins sur lesquels le middleware doit s'exécuter
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
}`;

  const serverComponentCode = `// app/users/[id]/page.js
async function getUser(id) {
  const res = await fetch(\`https://api.example.com/users/\${id}\`, { 
    cache: 'no-store' 
  });
  return res.json();
}

export default async function UserPage({ params }) {
  // Les composants serveur peuvent être asynchrones
  const user = await getUser(params.id);
  
  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <div className="user-stats">
        {/* Importation d'un composant client */}
        <ClientComponent userData={user} />
      </div>
    </div>
  );
}`;

  const quizQuestions = [
    {
      question: "Quel est le but principal d'un middleware dans Next.js ?",
      options: [
        "Gérer l'état global de l'application",
        "Intercepter et modifier les requêtes et réponses HTTP",
        "Optimiser les images automatiquement",
        "Remplacer les composants serveur"
      ],
      correctAnswer: 1
    },
    {
      question: "Quelle est la différence principale entre les composants client et serveur dans Next.js ?",
      options: [
        "Les composants client sont plus rapides",
        "Les composants serveur peuvent être asynchrones et accéder directement aux ressources serveur",
        "Les composants client peuvent utiliser des hooks React",
        "Il n'y a pas de différence significative"
      ],
      correctAnswer: 1
    },
    {
      question: "Comment définit-on un matcher pour un middleware Next.js ?",
      options: [
        "En utilisant la propriété 'matcher' dans la configuration du middleware",
        "En utilisant la fonction next.config.js",
        "Via l'objet 'config' exporté avec le middleware",
        "Dans le fichier package.json"
      ],
      correctAnswer: 2
    }
  ];

  const exerciseInstructions = `
  Créez un middleware qui:
  1. Vérifie si l'utilisateur est autorisé à accéder aux pages admin
  2. Ajoute un en-tête personnalisé 'x-page-type' avec la valeur 'admin' pour toutes les pages admin
  3. Configure le middleware pour s'exécuter uniquement sur les chemins '/admin/*'
  `;

  const exerciseTemplate = `// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Ajoutez votre code ici
  
}

// Configurez les chemins
export const config = {
  // Ajoutez votre configuration ici
}`;

  const exerciseValidation = (code) => {
    // Vérifications simples du code soumis
    const hasNextResponse = code.includes('NextResponse');
    const hasAdminPathCheck = code.includes('/admin');
    const hasHeaderSetting = code.includes('headers.set') && code.includes('x-page-type');
    const hasMatcherConfig = code.includes('matcher') && code.includes('/admin');
    
    return hasNextResponse && hasAdminPathCheck && hasHeaderSetting && hasMatcherConfig;
  };

  const handleComplete = () => {
    setIsCompleted(true);
    // Ici, vous pourriez ajouter un appel API pour mettre à jour la progression
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Middleware et Composants Serveur dans Next.js</h1>
        <p className="text-gray-600 mb-6">Découvrez comment intercepter les requêtes avec Middleware et exploiter la puissance des composants serveur.</p>
        
        <div className="mb-6">
          <div className="flex border-b">
            <button 
              className={`py-2 px-4 font-medium ${activeTab === 'theory' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('theory')}
            >
              Théorie
            </button>
            <button 
              className={`py-2 px-4 font-medium ${activeTab === 'example' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('example')}
            >
              Exemple
            </button>
            <button 
              className={`py-2 px-4 font-medium ${activeTab === 'exercise' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('exercise')}
            >
              Exercice
            </button>
            <button 
              className={`py-2 px-4 font-medium ${activeTab === 'quiz' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('quiz')}
            >
              Quiz
            </button>
          </div>
          
          <div className="py-4">
            {activeTab === 'theory' && (
              <div className="space-y-4">
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Qu'est-ce que le Middleware dans Next.js?</h2>
                  <p className="mb-3">
                    Le middleware dans Next.js est un puissant mécanisme qui vous permet d'exécuter du code avant qu'une requête ne soit complétée. 
                    Il s'exécute avant le rendu de la page et offre un contrôle précis sur les requêtes et les réponses.
                  </p>
                  <p className="mb-3">
                    Les cas d'utilisation courants du middleware incluent:
                  </p>
                  <ul className="list-disc ml-6 mb-4 space-y-1">
                    <li>Authentification et autorisation</li>
                    <li>Redirection conditionnelle</li>
                    <li>A/B testing</li>
                    <li>Ajout ou modification d'en-têtes</li>
                    <li>Géo-localisation et personnalisation basée sur la localisation</li>
                    <li>Rewriting et redirections d'URL</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Composants Serveur dans Next.js</h2>
                  <p className="mb-3">
                    Les composants serveur sont une fonctionnalité révolutionnaire de React et Next.js qui permet de rendre des composants directement sur le serveur.
                    Ils offrent plusieurs avantages majeurs:
                  </p>
                  <ul className="list-disc ml-6 mb-4 space-y-1">
                    <li>Accès direct aux ressources serveur (base de données, système de fichiers)</li>
                    <li>Réduction du JavaScript côté client</li>
                    <li>Meilleurs temps de chargement initial</li>
                    <li>Meilleure SEO</li>
                    <li>Sécurité renforcée (les variables d'environnement sensibles restent sur le serveur)</li>
                  </ul>
                  <p className="mb-3">
                    Les composants serveur peuvent être asynchrones, ce qui permet d'attendre naturellement les données avant le rendu, 
                    éliminant ainsi le besoin de gérer des états de chargement complexes.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Interactions Client-Serveur</h2>
                  <p className="mb-3">
                    Dans Next.js, vous pouvez combiner les composants serveur et client de manière flexible:
                  </p>
                  <ul className="list-disc ml-6 mb-4 space-y-1">
                    <li>Les composants serveur peuvent importer et utiliser des composants client</li>
                    <li>Les composants client sont rendus sur le client avec interactivité complète</li>
                    <li>Utilisez la directive "use client" au début du fichier pour marquer un composant comme client</li>
                    <li>Les données peuvent être passées des composants serveur aux composants client comme props</li>
                  </ul>
                  <p className="mb-3">
                    Cette architecture hybride offre le meilleur des deux mondes: performances du serveur et interactivité du client.
                  </p>
                </section>
              </div>
            )}
            
            {activeTab === 'example' && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">Exemple de Middleware Next.js</h2>
                  <p className="mb-3">Voici un exemple de middleware qui gère l'authentification et ajoute des en-têtes personnalisés:</p>
                  <div className="mb-2">
                    <CodeEditor 
                      code={middlewareCode} 
                      language="javascript"
                      readOnly={true}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-6">
                    Ce middleware vérifie si l'utilisateur est authentifié avant d'accéder aux routes sécurisées 
                    et ajoute des en-têtes personnalisés à toutes les réponses.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">Exemple de Composant Serveur</h2>
                  <p className="mb-3">Voici un exemple de composant serveur qui récupère des données utilisateur:</p>
                  <div className="mb-2">
                    <CodeEditor 
                      code={serverComponentCode} 
                      language="javascript"
                      readOnly={true}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Ce composant serveur récupère des données utilisateur directement depuis le serveur,
                    sans avoir besoin de les charger côté client, et inclut un composant client pour l'interactivité.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">Aperçu Interactif</h2>
                  <p className="mb-3">Exemple de fonctionnement d'un composant serveur avec client:</p>
                  <CodePreviewSandbox
                    htmlContent={`<div class="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
  <div class="border-b pb-4 mb-4">
    <h2 class="text-2xl font-bold">John Doe</h2>
    <p class="text-gray-600">Email: john.doe@example.com</p>
  </div>
  <div class="user-stats p-4 bg-gray-50 rounded-lg">
    <h3 class="font-medium mb-2">Statistiques Utilisateur</h3>
    <div class="flex justify-between">
      <div>
        <p class="text-sm text-gray-500">Publications</p>
        <p class="text-lg font-bold">24</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">Followers</p>
        <p class="text-lg font-bold">481</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">Suivis</p>
        <p class="text-lg font-bold">132</p>
      </div>
    </div>
    <button class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md w-full hover:bg-indigo-700 transition-colors">
      Suivre
    </button>
  </div>
</div>`}
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Dans cet exemple, le profil de base est rendu par un composant serveur, tandis que le bouton "Suivre" 
                    et les interactions sont gérés par un composant client.
                  </p>
                </section>
              </div>
            )}
            
            {activeTab === 'exercise' && (
              <div>
                <ExerciseComponent
                  instructions={exerciseInstructions}
                  codeTemplate={exerciseTemplate}
                  validateFn={exerciseValidation}
                  onComplete={() => setActiveTab('quiz')}
                />
              </div>
            )}
            
            {activeTab === 'quiz' && (
              <div>
                <QuizComponent 
                  questions={quizQuestions}
                  onComplete={handleComplete}
                />
              </div>
            )}
          </div>
        </div>
        
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center text-green-800 mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium">Leçon terminée !</p>
              <p className="text-sm">Vous avez maîtrisé les middlewares et composants serveur dans Next.js.</p>
            </div>
          </motion.div>
        )}
        
        <div className="flex justify-between">
          <button className="btn-secondary">
            Leçon précédente
          </button>
          <button className="btn-primary">
            Leçon suivante: Streaming Server Components
          </button>
        </div>
      </motion.div>
    </div>
  );
}
