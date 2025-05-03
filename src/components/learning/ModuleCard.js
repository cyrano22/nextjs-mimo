"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ModuleCard({ module, completed = false, current = false }) {
  // Les couleurs des modules selon le niveau
  const levelColors = {
    'Débutant': 'bg-green-100 text-green-800 border-green-300',
    'Intermédiaire': 'bg-blue-100 text-blue-800 border-blue-300',
    'Avancé': 'bg-purple-100 text-purple-800 border-purple-300',
    'Expert': 'bg-red-100 text-red-800 border-red-300'
  };

  // Animations pour les cartes
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`rounded-lg overflow-hidden shadow-md transform transition-all duration-300 ${
        current ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
      } ${
        completed ? 'bg-white' : 'bg-white'
      }`}
    >
      <div className="relative">
        {/* Image/Bannière du module */}
        <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600 overflow-hidden">
          {module.image ? (
            <img 
              src={module.image} 
              alt={module.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center p-6">
              <h3 className="text-2xl font-bold text-white text-center">{module.title}</h3>
            </div>
          )}

          {/* Badge de niveau */}
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              levelColors[module.level] || 'bg-gray-100 text-gray-800 border-gray-300'
            }`}>
              {module.level}
            </span>
          </div>

          {/* Statut de complétion */}
          {completed && (
            <div className="absolute top-3 left-3 bg-green-500 text-white rounded-full p-1">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{module.title}</h3>
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{module.description}</p>

          <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
            <div className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1 text-indigo-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                />
              </svg>
              {module.lessons} leçon{module.lessons > 1 ? 's' : ''}
            </div>

            <div className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1 text-indigo-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              {module.duration || '1-2 heures'}
            </div>
          </div>

          {/* Barre de progression */}
          {module.progressPercent !== undefined && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ width: `${module.progressPercent}%` }}
              />
            </div>
          )}

          <Link 
            href={`/lessons/module/${module.id}`} 
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 w-full"
          >
            {completed ? 'Revoir' : current ? 'Continuer' : 'Commencer'}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}