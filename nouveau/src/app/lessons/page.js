
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LessonsPage() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const moduleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 }
    }
  };

  useEffect(() => {
    async function fetchModules() {
      try {
        const res = await fetch('/api/modules');
        if (!res.ok) throw new Error('Failed to fetch modules');
        
        const data = await res.json();
        setModules(data);
      } catch (error) {
        console.error("Error fetching modules:", error);
        // Fallback data in case API fails
        setModules([
          {
            id: "1",
            title: "Introduction à Next.js",
            description: "Découvrez les bases de Next.js, ses avantages par rapport à React et comment configurer votre premier projet.",
            level: "Débutant",
            image: "/images/modules/nextjs-intro.jpg",
            progressPercent: 0,
            lessons: 3,
            duration: "2 heures"
          },
          {
            id: "2",
            title: "Fondamentaux de Next.js",
            description: "Maîtrisez le routage, les pages et la récupération de données dans Next.js.",
            level: "Intermédiaire",
            image: "/images/modules/nextjs-fundamentals.jpg",
            progressPercent: 0,
            lessons: 4,
            duration: "3 heures"
          },
          {
            id: "3",
            title: "Fonctionnalités Avancées",
            description: "Explorez les API Routes, les middlewares, l'optimisation des images et l'internationalisation.",
            level: "Avancé",
            image: "/images/modules/nextjs-advanced.jpg",
            progressPercent: 0,
            lessons: 5,
            duration: "4 heures"
          },
          {
            id: "4",
            title: "Déploiement et Performance",
            description: "Apprenez à déployer et optimiser vos applications Next.js pour des performances maximales.",
            level: "Expert",
            image: "/images/modules/nextjs-deployment.jpg",
            progressPercent: 0,
            lessons: 4,
            duration: "3 heures"
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchModules();
  }, []);

  const filteredModules = activeFilter === 'all' 
    ? modules 
    : modules.filter(module => module.level.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Parcours d'apprentissage Next.js
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Maîtrisez le développement web moderne avec notre curriculum structuré, 
          allant des concepts fondamentaux aux techniques avancées.
        </p>
      </div>

      {/* Filters */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center p-1 bg-gray-100 rounded-lg">
          {['all', 'débutant', 'intermédiaire', 'avancé', 'expert'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeFilter === filter
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Modules Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredModules.map((module) => (
            <motion.div
              key={module.id}
              variants={moduleVariants}
              whileHover="hover"
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-all h-full flex flex-col"
            >
              {/* Module Image/Header */}
              <div className="h-48 relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600">
                {module.image ? (
                  <img 
                    src={module.image} 
                    alt={module.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <h3 className="text-2xl font-bold text-white text-center">{module.title}</h3>
                  </div>
                )}
                
                {/* Level Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full 
                    ${module.level === 'Débutant' ? 'bg-green-100 text-green-800' : 
                      module.level === 'Intermédiaire' ? 'bg-blue-100 text-blue-800' : 
                      module.level === 'Avancé' ? 'bg-purple-100 text-purple-800' : 
                      'bg-red-100 text-red-800'}`}
                  >
                    {module.level}
                  </span>
                </div>
              </div>
              
              {/* Module Content */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{module.description}</p>
                
                {/* Module Info */}
                <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-1 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {module.lessons} leçon{module.lessons > 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-1 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {module.duration}
                  </div>
                </div>
                
                {/* Progress Bar */}
                {module.progressPercent !== undefined && (
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
                    <div 
                      className="bg-indigo-600 h-1.5 rounded-full" 
                      style={{ width: `${module.progressPercent}%` }}
                    />
                  </div>
                )}
                
                {/* Action Button */}
                <Link 
                  href={`/lessons/module/${module.id}`}
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Voir le module
                  <svg className="ml-2 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {/* Empty State */}
      {!loading && filteredModules.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun module trouvé</h3>
          <p className="mt-1 text-sm text-gray-500">
            Aucun module ne correspond à votre filtre actuel.
          </p>
          <button 
            onClick={() => setActiveFilter('all')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Voir tous les modules
          </button>
        </div>
      )}
    </div>
  );
}
