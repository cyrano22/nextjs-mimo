"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LearningPathProgression from '../../components/learning/LearningPathProgression';
import ModuleDetail from '../../components/learning/ModuleDetail';

export default function LearningPathPage() {
  const [currentModule, setCurrentModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);
  
  // Simuler le chargement des données utilisateur
  useEffect(() => {
    // Données simulées
    setCurrentModule({
      id: 3,
      title: "Routing avec Next.js",
      level: 1
    });
    
    setCompletedModules([
      { id: 1, title: "Introduction à Next.js" },
      { id: 2, title: "Composants et Props" }
    ]);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
  
  // Données simulées pour les modules
  const modules = [
    {
      id: 1,
      title: "Introduction à Next.js",
      description: "Découvrez les bases de Next.js et comment créer votre première application.",
      level: "Débutant",
      xpReward: 150,
      duration: "2 heures",
      lessons: [
        {
          id: 1,
          title: "Qu'est-ce que Next.js ?",
          type: "theory",
          duration: "10 min",
          xpReward: 20,
          completed: true
        },
        {
          id: 2,
          title: "Installation et configuration",
          type: "exercise",
          duration: "15 min",
          xpReward: 30,
          completed: true
        },
        {
          id: 3,
          title: "Création de pages",
          type: "exercise",
          duration: "20 min",
          xpReward: 40,
          completed: true,
          contributeToPortfolio: true
        },
        {
          id: 4,
          title: "Routing avec Next.js",
          type: "theory",
          duration: "15 min",
          xpReward: 25,
          completed: true
        },
        {
          id: 5,
          title: "Projet : Page d'accueil",
          type: "project",
          duration: "30 min",
          xpReward: 60,
          completed: true,
          contributeToPortfolio: true
        }
      ]
    },
    {
      id: 2,
      title: "Composants et Props",
      description: "Apprenez à créer des composants réutilisables et à gérer les props en Next.js.",
      level: "Débutant",
      xpReward: 180,
      duration: "2.5 heures",
      lessons: [
        {
          id: 6,
          title: "Composants React",
          type: "theory",
          duration: "15 min",
          xpReward: 25,
          completed: true
        },
        {
          id: 7,
          title: "Props et State",
          type: "exercise",
          duration: "20 min",
          xpReward: 35,
          completed: true
        },
        {
          id: 8,
          title: "Composants fonctionnels vs classes",
          type: "theory",
          duration: "15 min",
          xpReward: 25,
          completed: true
        },
        {
          id: 9,
          title: "Hooks de base",
          type: "exercise",
          duration: "25 min",
          xpReward: 45,
          completed: true
        },
        {
          id: 10,
          title: "Projet : Galerie d'images",
          type: "project",
          duration: "35 min",
          xpReward: 70,
          completed: true,
          contributeToPortfolio: true
        }
      ]
    },
    {
      id: 3,
      title: "Routing avec Next.js",
      description: "Maîtrisez le système de routing de Next.js pour créer des applications multi-pages.",
      level: "Débutant",
      xpReward: 200,
      duration: "3 heures",
      lessons: [
        {
          id: 11,
          title: "Pages et routes",
          type: "theory",
          duration: "15 min",
          xpReward: 25,
          completed: true
        },
        {
          id: 12,
          title: "Routes dynamiques",
          type: "exercise",
          duration: "25 min",
          xpReward: 45,
          completed: false
        },
        {
          id: 13,
          title: "Navigation entre pages",
          type: "exercise",
          duration: "20 min",
          xpReward: 35,
          completed: false
        },
        {
          id: 14,
          title: "Layouts et templates",
          type: "theory",
          duration: "15 min",
          xpReward: 25,
          completed: false
        },
        {
          id: 15,
          title: "Projet : Blog multi-pages",
          type: "project",
          duration: "45 min",
          xpReward: 90,
          completed: false,
          contributeToPortfolio: true
        }
      ]
    }
  ];
  
  const handleLessonSelect = (lesson) => {
    console.log("Leçon sélectionnée:", lesson);
    // Naviguer vers la page de la leçon
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-gray-900">Parcours d'apprentissage Next.js</h1>
          <p className="mt-2 text-lg text-gray-600">
            Suivez ce parcours structuré pour maîtriser Next.js, du niveau débutant au niveau expert.
          </p>
        </motion.div>
        
        {/* Progression */}
        <LearningPathProgression 
          currentModule={currentModule} 
          completedModules={completedModules} 
        />
        
        {/* Modules */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Modules disponibles</h2>
          
          <div className="space-y-6">
            {modules.map((module) => (
              <ModuleDetail 
                key={module.id} 
                module={module} 
                onLessonSelect={handleLessonSelect} 
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
