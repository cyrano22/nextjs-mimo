
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '@/components/editor/CodeEditor';
import CodePreviewSandbox from '@/components/editor/CodePreviewSandbox';
import QuizComponent from '@/components/lessons/QuizComponent';
import ExerciseComponent from '@/components/lessons/ExerciseComponent';

export default function StreamingServerComponentsLesson() {
  const [activeTab, setActiveTab] = useState('theory');
  const [isCompleted, setIsCompleted] = useState(false);
  
  const loadingUICode = `// loading.js (dans le même dossier que la page)
export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-48 h-6 bg-gray-200 rounded"></div>
        <div className="w-96 h-4 bg-gray-200 rounded"></div>
        <div className="w-64 h-4 bg-gray-200 rounded"></div>
        <div className="w-32 h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}`;

  const streamingPageCode = `// app/products/page.js
import { Suspense } from 'react';
import ProductList from './ProductList';
import RecommendedProducts from './RecommendedProducts';
import PopularCategories from './PopularCategories';

export default function ProductsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Produits</h1>
      
      {/* Liste principale de produits */}
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>}>
        <ProductList />
      </Suspense>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Produits recommandés - chargés indépendamment */}
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>}>
          <RecommendedProducts />
        </Suspense>
        
        {/* Catégories populaires - chargées indépendamment */}
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>}>
          <PopularCategories />
        </Suspense>
      </div>
    </div>
  );
}`;

  const productListComponentCode = `// app/products/ProductList.js
async function fetchProducts() {
  // Simuler un délai réseau pour les produits principaux (2 secondes)
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return [
    { id: 1, name: 'Smartphone XYZ', price: 699 },
    { id: 2, name: 'Laptop Pro', price: 1299 },
    { id: 3, name: 'Headphones', price: 199 },
    // ... autres produits
  ];
}

export default async function ProductList() {
  const products = await fetchProducts();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map(product => (
        <div key={product.id} className="border p-4 rounded-lg">
          <h3 className="font-bold">{product.name}</h3>
          <p className="text-gray-700">${product.price}</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            Ajouter au panier
          </button>
        </div>
      ))}
    </div>
  );
}`;

  const quizQuestions = [
    {
      question: "Qu'est-ce que le Streaming dans les composants serveur Next.js?",
      options: [
        "Une technique pour diffuser des vidéos",
        "Une façon d'envoyer progressivement des parties de la page HTML au navigateur",
        "Une méthode pour mettre en cache les composants",
        "Une API pour les WebSockets"
      ],
      correctAnswer: 1
    },
    {
      question: "Quel composant React est utilisé pour activer le streaming?",
      options: [
        "<Stream>",
        "<Await>",
        "<Suspense>",
        "<AsyncBoundary>"
      ],
      correctAnswer: 2
    },
    {
      question: "Quelle est la principale amélioration apportée par le streaming aux applications Next.js?",
      options: [
        "Des animations plus fluides",
        "Un meilleur TTFB (Time To First Byte)",
        "Une réduction du temps d'interaction (TTI)",
        "Une amélioration du ressenti utilisateur en chargeant différentes parties de l'interface progressivement"
      ],
      correctAnswer: 3
    }
  ];

  const exerciseInstructions = `
  Créez une page de blog qui utilise le streaming pour:
  1. Afficher les articles récents (chargés avec un délai de 2 secondes)
  2. Afficher les commentaires populaires (chargés avec un délai de 3 secondes)
  3. Utilisez des fallbacks appropriés pendant le chargement
  `;

  const exerciseTemplate = `// app/blog/page.js
import { Suspense } from 'react';

// Créez vos composants asynchrones ici

export default function BlogPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      
      {/* Implémentez le streaming des articles récents */}
      
      {/* Implémentez le streaming des commentaires populaires */}
    </div>
  );
}`;

  const exerciseValidation = (code) => {
    // Vérifications basiques du code soumis
    const hasSuspense = code.includes('Suspense') && code.includes('fallback');
    const hasAsyncComponents = code.includes('async function') && code.includes('await');
    const hasMultipleStreams = (code.match(/Suspense/g) || []).length >= 2;
    
    return hasSuspense && hasAsyncComponents && hasMultipleStreams;
  };

  const handleComplete = () => {
    setIsCompleted(true);
    // Mettre à jour la progression
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Streaming Server Components dans Next.js</h1>
        <p className="text-gray-600 mb-6">Améliorez l'expérience utilisateur en chargeant progressivement des parties de votre page.</p>
        
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
                  <h2 className="text-2xl font-semibold mb-3">Qu'est-ce que le Streaming avec les Server Components?</h2>
                  <p className="mb-3">
                    Le streaming est une technique puissante qui permet à Next.js d'envoyer progressivement des parties 
                    du HTML au navigateur à mesure qu'elles sont générées, plutôt que d'attendre que toute la page soit prête.
                  </p>
                  <p className="mb-3">
                    Cela offre plusieurs avantages majeurs:
                  </p>
                  <ul className="list-disc ml-6 mb-4 space-y-1">
                    <li>Amélioration du TTFB (Time To First Byte)</li>
                    <li>Affichage plus rapide du contenu initial</li>
                    <li>Meilleure UX en rendant l'interface utilisable par morceaux</li>
                    <li>Chargement parallèle de différentes sections de la page</li>
                    <li>Prévention du blocage de l'interface par des requêtes lentes</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Comment fonctionne le Streaming?</h2>
                  <p className="mb-3">
                    Le streaming repose sur deux éléments clés:
                  </p>
                  <ol className="list-decimal ml-6 mb-4 space-y-2">
                    <li>
                      <strong>Suspense:</strong> Un composant React qui permet de "suspendre" le rendu d'un composant 
                      pendant qu'il attend une ressource (comme des données), et d'afficher une interface de secours (fallback) pendant ce temps.
                    </li>
                    <li>
                      <strong>Composants Serveur Asynchrones:</strong> Des composants qui peuvent attendre des données
                      avant de se rendre, en utilisant async/await directement dans le composant.
                    </li>
                  </ol>
                  <p className="mb-3">
                    Lorsqu'un composant serveur asynchrone est enveloppé dans un Suspense, Next.js peut:
                  </p>
                  <ol className="list-decimal ml-6 mb-4 space-y-1">
                    <li>Envoyer immédiatement le HTML initial avec l'interface de secours</li>
                    <li>Commencer à traiter le composant asynchrone sur le serveur</li>
                    <li>Une fois les données prêtes, envoyer le HTML du composant complet</li>
                    <li>Le navigateur remplace automatiquement l'interface de secours par le contenu réel</li>
                  </ol>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Patterns de Streaming</h2>
                  <p className="mb-3">
                    Voici quelques patterns courants pour utiliser efficacement le streaming:
                  </p>
                  <ol className="list-decimal ml-6 mb-4 space-y-3">
                    <li>
                      <p><strong>Loading UI:</strong> Utilisez un fichier loading.js dans un dossier de route pour 
                      afficher automatiquement un état de chargement pendant que la page se charge.</p>
                    </li>
                    <li>
                      <p><strong>Chargement parallèle:</strong> Utilisez plusieurs Suspense pour charger différentes 
                      parties de la page en parallèle, chacune avec son propre fallback.</p>
                    </li>
                    <li>
                      <p><strong>Streaming imbriqué:</strong> Imbriquez des composants Suspense pour créer une hiérarchie 
                      de chargement, où des parties plus importantes apparaissent avant les détails.</p>
                    </li>
                    <li>
                      <p><strong>Waterfall progressif:</strong> Structurez votre page pour que les sections critiques 
                      se chargent d'abord, suivies progressivement par du contenu moins important.</p>
                    </li>
                  </ol>
                </section>
              </div>
            )}
            
            {activeTab === 'example' && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">Loading UI avec loading.js</h2>
                  <p className="mb-3">Next.js offre un moyen simple de définir une UI de chargement pour toute une page:</p>
                  <div className="mb-2">
                    <CodeEditor 
                      code={loadingUICode} 
                      language="javascript"
                      readOnly={true}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-6">
                    Ce composant sera automatiquement affiché pendant que la page se charge, puis remplacé par la page complète.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">Streaming avec Suspense</h2>
                  <p className="mb-3">Voici comment implémenter le streaming dans une page de produits:</p>
                  <div className="mb-2">
                    <CodeEditor 
                      code={streamingPageCode} 
                      language="javascript"
                      readOnly={true}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Cette page charge trois sections différentes indépendamment: la liste principale de produits,
                    les produits recommandés et les catégories populaires. Chaque section a son propre état de chargement.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">Composant Asynchrone</h2>
                  <p className="mb-3">Voici comment implémenter un composant serveur asynchrone:</p>
                  <div className="mb-2">
                    <CodeEditor 
                      code={productListComponentCode} 
                      language="javascript"
                      readOnly={true}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Ce composant attend la récupération des données avant de se rendre, mais grâce au Suspense,
                    la page reste interactive pendant ce temps.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">Démonstration Visuelle</h2>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="space-y-4">
                      <h3 className="font-medium">Voici comment le chargement progressif apparaît:</h3>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">1. État initial:</p>
                        <div className="border p-4 rounded-lg bg-white">
                          <h2 className="text-xl font-bold">Produits</h2>
                          <div className="h-96 bg-gray-100 animate-pulse rounded-lg my-4"></div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
                            <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">2. Après 2 secondes - Liste de produits chargée:</p>
                        <div className="border p-4 rounded-lg bg-white">
                          <h2 className="text-xl font-bold">Produits</h2>
                          <div className="grid grid-cols-3 gap-4 my-4">
                            <div className="border p-3 rounded-lg">
                              <h3 className="font-bold">Smartphone XYZ</h3>
                              <p>$699</p>
                              <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm">Ajouter au panier</button>
                            </div>
                            <div className="border p-3 rounded-lg">
                              <h3 className="font-bold">Laptop Pro</h3>
                              <p>$1299</p>
                              <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm">Ajouter au panier</button>
                            </div>
                            <div className="border p-3 rounded-lg">
                              <h3 className="font-bold">Headphones</h3>
                              <p>$199</p>
                              <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm">Ajouter au panier</button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
                            <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">3. État final - Tout est chargé:</p>
                        <div className="border p-4 rounded-lg bg-white">
                          <h2 className="text-xl font-bold">Produits</h2>
                          <div className="grid grid-cols-3 gap-4 my-4">
                            <div className="border p-3 rounded-lg">
                              <h3 className="font-bold">Smartphone XYZ</h3>
                              <p>$699</p>
                              <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm">Ajouter au panier</button>
                            </div>
                            <div className="border p-3 rounded-lg">
                              <h3 className="font-bold">Laptop Pro</h3>
                              <p>$1299</p>
                              <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm">Ajouter au panier</button>
                            </div>
                            <div className="border p-3 rounded-lg">
                              <h3 className="font-bold">Headphones</h3>
                              <p>$199</p>
                              <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm">Ajouter au panier</button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="border p-3 rounded-lg">
                              <h3 className="font-medium">Recommandés pour vous</h3>
                              <div className="mt-2 space-y-2">
                                <div className="flex justify-between">
                                  <span>Smart Watch</span>
                                  <span>$249</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Wireless Earbuds</span>
                                  <span>$129</span>
                                </div>
                              </div>
                            </div>
                            <div className="border p-3 rounded-lg">
                              <h3 className="font-medium">Catégories populaires</h3>
                              <div className="mt-2 flex flex-wrap gap-2">
                                <span className="bg-gray-100 px-2 py-1 rounded text-sm">Électronique</span>
                                <span className="bg-gray-100 px-2 py-1 rounded text-sm">Ordinateurs</span>
                                <span className="bg-gray-100 px-2 py-1 rounded text-sm">Audio</span>
                                <span className="bg-gray-100 px-2 py-1 rounded text-sm">Accessoires</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
              <p className="text-sm">Vous avez maîtrisé le streaming des composants serveur dans Next.js.</p>
            </div>
          </motion.div>
        )}
        
        <div className="flex justify-between">
          <button className="btn-secondary">
            Leçon précédente: Middleware et Composants Serveur
          </button>
          <button className="btn-primary">
            Module Suivant: Design Patterns React
          </button>
        </div>
      </motion.div>
    </div>
  );
}
