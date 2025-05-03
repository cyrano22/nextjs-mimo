"use client";

import { GamificationProvider } from '../../components/gamification/GamificationContext';
import PointsDisplay from '../../components/gamification/PointsDisplay';
import BadgesDisplay from '../../components/gamification/BadgesDisplay';

export default function DashboardClient() {
  return (
    <GamificationProvider>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <PointsDisplay />
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-medium mb-4">Leçons recommandées</h3>
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-md p-3 hover:border-indigo-300 cursor-pointer transition-colors">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Routage dans Next.js</h4>
                  <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">Intermédiaire</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Apprenez à utiliser le système de routage basé sur les fichiers de Next.js</p>
              </div>
              
              <div className="border border-gray-200 rounded-md p-3 hover:border-indigo-300 cursor-pointer transition-colors">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Optimisation des images</h4>
                  <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">Intermédiaire</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Découvrez comment optimiser les images avec le composant Image de Next.js</p>
              </div>
              
              <div className="border border-gray-200 rounded-md p-3 hover:border-indigo-300 cursor-pointer transition-colors">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">API Routes</h4>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">Avancé</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Créez des API endpoints directement dans votre application Next.js</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <BadgesDisplay />
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-medium mb-4">Statistiques</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Leçons complétées</span>
                <span className="font-medium">5/20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Exercices réussis</span>
                <span className="font-medium">12/15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quiz réussis</span>
                <span className="font-medium">3/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Temps d'apprentissage</span>
                <span className="font-medium">4h 30m</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GamificationProvider>
  );
}
