"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LessonsPage() {
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('/api/modules');
        if (response.ok) {
          const data = await response.json();
          setModules(data);
        } else {
          console.error('Erreur lors de la récupération des modules');
        }
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Modules d'apprentissage Next.js</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-6 w-2/3 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-4"></div>
              <div className="space-y-2 mb-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-5 h-5 bg-gray-200 rounded-full mr-2"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
              <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Modules d'apprentissage Next.js</h1>

      <motion.div 
        className="grid md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {modules.map((module) => (
          <motion.div 
            key={module.id} 
            className="card border-t-4 border-indigo-500"
            variants={itemVariants}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Module {module.id}: {module.title}</h2>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {module.level}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{module.description}</p>

            <div className="space-y-2 mb-4">
              {module.lessons.map((lesson, index) => (
                <div key={`${module.id}-${lesson.id}`} className="flex items-center">
                  <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                    <span className="text-xs font-medium text-indigo-600">{index + 1}</span>
                  </div>
                  <Link href={`/lessons/module/${module.id}/lesson/${lesson.id}`} className="text-gray-700 hover:text-indigo-600">
                    {lesson.title}
                  </Link>
                </div>
              ))}
            </div>

            <Link href={`/lessons/module/${module.id}`} className="btn-primary inline-block">
              Commencer le module
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}