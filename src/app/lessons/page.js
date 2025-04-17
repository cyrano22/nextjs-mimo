import Link from 'next/link';

export default function LessonsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Modules d'apprentissage Next.js</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card border-t-4 border-indigo-500">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">Module 1: Introduction à Next.js</h2>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">Débutant</span>
          </div>
          <p className="text-gray-600 mb-4">Découvrez les bases de Next.js, ses avantages par rapport à React et comment configurer votre premier projet.</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600">1</span>
              </div>
              <Link href="/lessons/module/1/lesson/1" className="text-gray-700 hover:text-indigo-600">
                Qu'est-ce que Next.js
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600">2</span>
              </div>
              <Link href="/lessons/module/1/lesson/2" className="text-gray-700 hover:text-indigo-600">
                Avantages de Next.js
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600">3</span>
              </div>
              <Link href="/lessons/module/1/lesson/3" className="text-gray-700 hover:text-indigo-600">
                Installation et Configuration
              </Link>
            </div>
          </div>
          
          <Link href="/lessons/module/1" className="btn-primary inline-block">
            Commencer le module
          </Link>
        </div>
        
        <div className="card border-t-4 border-indigo-500">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">Module 2: Fondamentaux de Next.js</h2>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">Intermédiaire</span>
          </div>
          <p className="text-gray-600 mb-4">Maîtrisez le routage, les pages et la récupération de données dans Next.js.</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600">1</span>
              </div>
              <Link href="/lessons/module/2/lesson/1" className="text-gray-700 hover:text-indigo-600">
                Structure des Fichiers
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600">2</span>
              </div>
              <Link href="/lessons/module/2/lesson/2" className="text-gray-700 hover:text-indigo-600">
                Système de Routage
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600">3</span>
              </div>
              <Link href="/lessons/module/2/lesson/3" className="text-gray-700 hover:text-indigo-600">
                Pages et Composants
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600">4</span>
              </div>
              <Link href="/lessons/module/2/lesson/4" className="text-gray-700 hover:text-indigo-600">
                Data Fetching
              </Link>
            </div>
          </div>
          
          <Link href="/lessons/module/2" className="btn-primary inline-block">
            Commencer le module
          </Link>
        </div>
        
        <div className="card border-t-4 border-indigo-500">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">Module 3: Fonctionnalités Avancées</h2>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">Avancé</span>
          </div>
          <p className="text-gray-600 mb-4">Explorez les API Routes, les middlewares, l'optimisation des images et l'internationalisation.</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600">1</span>
              </div>
              <Link href="/lessons/module/3/lesson/1" className="text-gray-700 hover:text-indigo-600">
                API Routes
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600">2</span>
              </div>
              <Link href="/lessons/module/3/lesson/2" className="text-gray-700 hover:text-indigo-600">
                Middleware
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600">3</span>
              </div>
              <Link href="/lessons/module/3/lesson/3" className="text-gray-700 hover:text-indigo-600">
                Optimisation des Images
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600">4</span>
              </div>
              <Link href="/lessons/module/3/lesson/4" className="text-gray-700 hover:text-indigo-600">
                Internationalisation
              </Link>
            </div>
          </div>
          
          <Link href="/lessons/module/3" className="btn-primary inline-block">
            Commencer le module
          </Link>
        </div>
        
        <div className="card border-t-4 border-indigo-500">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">Module 4: Déploiement et Performance</h2>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">Expert</span>
          </div>
          <p className="text-gray-600 mb-4">Apprenez à déployer et optimiser vos applications Next.js pour des performances maximales.</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600">1</span>
              </div>
              <Link href="/lessons/module/4/lesson/1" className="text-gray-700 hover:text-indigo-600">
                Déploiement sur Vercel
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600">2</span>
              </div>
              <Link href="/lessons/module/4/lesson/2" className="text-gray-700 hover:text-indigo-600">
                Déploiement sur Cloudflare
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600">3</span>
              </div>
              <Link href="/lessons/module/4/lesson/3" className="text-gray-700 hover:text-indigo-600">
                Optimisation des Performances
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-indigo-600">4</span>
              </div>
              <Link href="/lessons/module/4/lesson/4" className="text-gray-700 hover:text-indigo-600">
                Analytics et Monitoring
              </Link>
            </div>
          </div>
          
          <Link href="/lessons/module/4" className="btn-primary inline-block">
            Commencer le module
          </Link>
        </div>
      </div>
    </div>
  );
}
