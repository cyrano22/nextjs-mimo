"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import LearningPathProgression from "../../components/learning/LearningPathProgression"; // Ensure this path is correct
import ModuleDetail from "../../components/learning/ModuleDetail"; // Ensure this path is correct
import { getModuleLessons, getAllLessons, LESSONS } from "../../data/lessons"; // Import from the re-export file

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

export default function LearningPathPage() {
  const router = useRouter();
  const [currentModule, setCurrentModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([]); // Store IDs of completed modules

  // Get all lessons using the provided function
  const allLessons = useMemo(() => getAllLessons(), []);

  /**
   * @param {string} moduleIdToFilter
   * @returns {Array<Object>} Lessons for the given module ID
   */
  const getModuleLessons = useCallback((moduleIdToFilter) => {
    return allLessons.filter(lesson => lesson.id.startsWith(moduleIdToFilter + '-'));
  }, [allLessons]);

  // Memoize the modules data structure
  const modules = useMemo(() => {
    // Get all unique module IDs from lessons
    const uniqueModuleIds = Array.from(new Set(allLessons.map(lesson => {
      const [moduleId] = lesson.id.split('-');
      return moduleId;
    })));
    
    // Log for debugging
    console.log('Unique module IDs:', uniqueModuleIds);
    
    return uniqueModuleIds.map(moduleId => {
      const moduleLessons = getModuleLessons(moduleId);
      
      // It's good practice to ensure moduleLessons[0] exists before accessing its properties
      if (moduleLessons.length === 0) {
        console.warn(`No lessons found for module ID: ${moduleId}`);
        // Return a default structure or null, and filter out later if necessary
        return null; 
      }
      
      const totalDuration = moduleLessons.reduce((total, lesson) => total + (lesson.duration || 0), 0); // Ensure lesson.duration is a number
      const totalLessons = moduleLessons.length;
      const completedLessons = moduleLessons.filter(lesson => completedModules.includes(lesson.id)).length;
      const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
      
      return {
        id: moduleId,
        // Safely access properties from moduleLessons[0]
        title: moduleLessons[0].title ? moduleLessons[0].title.split(':')[0].trim() : `Module ${moduleId}`,
        description: moduleLessons[0].description || "No description available.",
        level: moduleLessons[0].difficulty || "N/A",
        xpReward: 150, // Example static XP reward per module
        duration: `${totalDuration} min`,
        progress: progress, // Percentage of completed lessons
        isCompleted: progress === 100, // Module is fully completed
        lessons: moduleLessons.map(lesson => ({
          id: lesson.id,
          title: lesson.title,
          type: lesson.type || "theory", // Default to "theory" if type is not specified
          duration: `${lesson.duration || 0} min`,
          xpReward: 25, // Example static XP reward per lesson
          completed: completedModules.includes(lesson.id),
          contributeToPortfolio: lesson.contributeToPortfolio !== undefined ? lesson.contributeToPortfolio : true // Default if not specified
        }))
      };
    }).filter(module => module !== null); // Filter out any null modules
  }, [allLessons, getModuleLessons, completedModules]);

  // Initialize the current module and completed modules
  useEffect(() => {
    if (modules.length > 0 && !currentModule) { // Set currentModule only if not already set
      setCurrentModule(modules[0]);
    }
    const storedCompletedModules = localStorage.getItem('completedModules');
    if (storedCompletedModules) {
      setCompletedModules(JSON.parse(storedCompletedModules));
    }
  }, [modules, currentModule]); // Added currentModule to dependencies

  // Handle lesson completion
  const handleLessonCompletion = useCallback((lessonId) => {
    setCompletedModules(prev => [...prev, lessonId]);
    localStorage.setItem('completedModules', JSON.stringify([...completedModules, lessonId]));
  }, [completedModules]);

  // Handle lesson selection
  const handleLessonSelect = useCallback((lesson) => {
    console.log("Leçon sélectionnée:", lesson);
    // Use the full lesson ID for routing
    router.push(`/lessons/module/${lesson.id}`);
  }, [router]);

  if (!modules.length) {
    return <div className="text-center p-10">Loading learning path data or no lessons available...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-gray-900">
            Parcours d&apos;apprentissage Next.js
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Suivez ce parcours structuré pour maîtriser Next.js, du niveau
            débutant au niveau expert.
          </p>
        </motion.div>

        {/* Progression */}
        {currentModule && ( // Conditionally render if currentModule is available
          <LearningPathProgression
            currentModule={currentModule}
            completedModules={completedModules}
            totalModules={modules.length}
            completedModulesCount={modules.filter(module => module.isCompleted).length}
          />
        )}

        {/* Modules */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Modules disponibles
          </h2>

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