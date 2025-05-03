
"use client";

import { useState, useEffect } from 'react';
import { GamificationProvider } from '../gamification/GamificationContext';
import PointsDisplay from '../gamification/PointsDisplay';
import BadgesDisplay from '../gamification/BadgesDisplay';
import ProgressDashboard from './ProgressDashboard';

export default function DashboardClient() {
  const [courseStatus, setCourseStatus] = useState({
    totalCourses: 0,
    completedCourses: 0,
    incompleteModules: [],
    loading: true
  });

  // Fonction pour vérifier l'état des cours
  useEffect(() => {
    const fetchCourseStatus = async () => {
      // Simulation de chargement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dans une application réelle, ces données viendraient d'une API
      // Données simulées
      setCourseStatus({
        totalCourses: 12,
        completedCourses: 8,
        incompleteModules: [
          { id: 'react-avance', title: 'React Avancé', missingLessons: ['hooks-personnalises', 'patterns-avances'] },
          { id: 'next-auth', title: 'Authentification avec Next.js', missingLessons: ['jwt-implementation'] },
          { id: 'api-routes', title: 'API Routes', missingLessons: ['middleware-api'] },
          { id: 'optimisation', title: 'Optimisation des performances', missingLessons: ['web-vitals', 'bundle-analyzer'] }
        ],
        loading: false
      });
    };
    
    fetchCourseStatus();
  }, []);

  return (
    <GamificationProvider>
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Tableau de bord de progression */}
            <ProgressDashboard />
            
            {/* Cours recommandés */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Leçons recommandées</h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-md p-4 hover:border-indigo-300 cursor-pointer transition-colors">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Routage dans Next.js</h4>
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">Intermédiaire</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Apprenez à utiliser le système de routage basé sur les fichiers de Next.js</p>
                  <div className="mt-2 flex justify-end">
                    <button className="btn-primary text-xs px-3 py-1">Continuer</button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-md p-4 hover:border-indigo-300 cursor-pointer transition-colors">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Optimisation des images</h4>
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">Intermédiaire</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Découvrez comment optimiser les images avec le composant Image de Next.js</p>
                  <div className="mt-2 flex justify-end">
                    <button className="btn-primary text-xs px-3 py-1">Commencer</button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-md p-4 hover:border-indigo-300 cursor-pointer transition-colors">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">API Routes</h4>
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">Avancé</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Créez des API endpoints directement dans votre application Next.js</p>
                  <div className="mt-2 flex justify-end">
                    <button className="btn-primary text-xs px-3 py-1">Commencer</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Points et badges */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <PointsDisplay />
              <div className="mt-4">
                <BadgesDisplay />
              </div>
            </div>
            
            {/* Statistiques */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Statistiques</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Leçons complétées</span>
                  <span className="font-medium">24/120</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Exercices réussis</span>
                  <span className="font-medium">18/36</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quiz réussis</span>
                  <span className="font-medium">12/24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Temps d'apprentissage</span>
                  <span className="font-medium">14h 30m</span>
                </div>
              </div>
            </div>
            
            {/* Vérification des cours */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">État des cours</h3>
              
              {courseStatus.loading ? (
                <div className="flex justify-center items-center p-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cours complets</span>
                    <span className="font-medium">{courseStatus.completedCourses}/{courseStatus.totalCourses}</span>
                  </div>
                  
                  {courseStatus.incompleteModules.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-red-600 mt-3 mb-2">Modules incomplets :</h4>
                      <ul className="space-y-2 text-sm">
                        {courseStatus.incompleteModules.map(module => (
                          <li key={module.id} className="border border-red-100 bg-red-50 p-3 rounded-md">
                            <div className="font-medium">{module.title}</div>
                            <div className="text-xs text-gray-600 mt-1">
                              Leçons manquantes : {module.missingLessons.map(lesson => (
                                <span key={lesson} className="inline-block bg-white px-2 py-1 rounded-full text-xs mr-1 mb-1">
                                  {lesson}
                                </span>
                              ))}
                            </div>
                            <div className="mt-2">
                              <button className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded-md transition-colors">
                                Compléter les leçons
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {courseStatus.incompleteModules.length === 0 && (
                    <div className="text-center py-4">
                      <div className="text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="mt-2 text-gray-700">Tous les cours sont complets !</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </GamificationProvider>
  );
}
