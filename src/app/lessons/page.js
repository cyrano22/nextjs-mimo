"use client"

import Link from 'next/link';

export default function LessonsPage() {
  return (
    <div className="text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Modules d'apprentissage Next.js</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card border-t-4 border-indigo-500 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Module 1: Introduction à Next.js</h2>
            <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium px-2.5 py-0.5 rounded">Débutant</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Découvrez les bases de Next.js, ses avantages par rapport à React et comment configurer votre premier projet.</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">1</span>
              </div>
              <Link href="/lessons/module/1/lesson/1" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Qu'est-ce que Next.js
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">2</span>
              </div>
              <Link href="/lessons/module/1/lesson/2" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Avantages de Next.js
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">3</span>
              </div>
              <Link href="/lessons/module/1/lesson/3" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Installation et Configuration
              </Link>
            </div>
          </div>
          
          <Link href="/lessons/module/1" className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 inline-block">
            Commencer le module
          </Link>
        </div>
        
        <div className="card border-t-4 border-indigo-500 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Module 2: Fondamentaux de Next.js</h2>
            <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium px-2.5 py-0.5 rounded">Intermédiaire</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Maîtrisez le routage, les pages et la récupération de données dans Next.js.</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">1</span>
              </div>
              <Link href="/lessons/module/2/lesson/1" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Structure des Fichiers
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">2</span>
              </div>
              <Link href="/lessons/module/2/lesson/2" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Système de Routage
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">3</span>
              </div>
              <Link href="/lessons/module/2/lesson/3" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Pages et Composants
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">4</span>
              </div>
              <Link href="/lessons/module/2/lesson/4" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Data Fetching
              </Link>
            </div>
          </div>
          
          <Link href="/lessons/module/2" className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 inline-block">
            Commencer le module
          </Link>
        </div>
        
        <div className="card border-t-4 border-indigo-500 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Module 3: Fonctionnalités Avancées</h2>
            <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium px-2.5 py-0.5 rounded">Avancé</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Explorez les API Routes, les middlewares, l'optimisation des images et l'internationalisation.</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">1</span>
              </div>
              <Link href="/lessons/module/3/lesson/1" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                API Routes
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">2</span>
              </div>
              <Link href="/lessons/module/3/lesson/2" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Middleware
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">3</span>
              </div>
              <Link href="/lessons/module/3/lesson/3" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Optimisation des Images
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">4</span>
              </div>
              <Link href="/lessons/module/3/lesson/4" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Internationalisation
              </Link>
            </div>
          </div>
          
          <Link href="/lessons/module/3" className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 inline-block">
            Commencer le module
          </Link>
        </div>
        
        <div className="card border-t-4 border-indigo-500 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Module 4: Déploiement et Performance</h2>
            <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium px-2.5 py-0.5 rounded">Expert</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Apprenez à déployer et optimiser vos applications Next.js pour des performances maximales.</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">1</span>
              </div>
              <Link href="/lessons/module/4/lesson/1" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Déploiement sur Vercel
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">2</span>
              </div>
              <Link href="/lessons/module/4/lesson/2" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Déploiement sur Cloudflare
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">3</span>
              </div>
              <Link href="/lessons/module/4/lesson/3" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Optimisation des Performances
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">4</span>
              </div>
              <Link href="/lessons/module/4/lesson/4" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Analytics et Monitoring
              </Link>
            </div>
          </div>
          
          <Link href="/lessons/module/4" className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 inline-block">
            Commencer le module
          </Link>
        </div>
      </div>
    </div>
  );
}
