"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LessonContent from './LessonContent';
import CodeEditor from '@/components/editor/CodeEditor';
import LessonProgress from '@/components/lessons/LessonProgress';
import QuizComponent from '@/components/lessons/QuizComponent';
import ExerciseComponent from '@/components/lessons/ExerciseComponent';

// Types pour TypeScript
interface Example {
  title: string;
  code: string;
  explanation: string;
  language?: string;
}

interface Exercise {
  title: string;
  description: string;
  options?: { id: number; text: string; correct: boolean }[];
  type?: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

interface Project {
  title: string;
  description: string;
  initialCode: string;
  solution: string;
  language?: string;
}

interface LessonData {
  title: string;
  description?: string;
  content: string;
  example?: Example;
  exercise?: Exercise;
  quiz?: Quiz;
  project?: Project;
  duration?: number;
  difficulty?: 'débutant' | 'intermédiaire' | 'avancé';
  prerequisites?: string[];
  tags?: string[];
}

interface Params {
  moduleId: string;
  lessonId: string;
}

export default function LessonPage({ params }: { params: Params }) {
  const { moduleId, lessonId } = params;
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [completionTime, setCompletionTime] = useState<number>(0);
  const [lessonTitles, setLessonTitles] = useState<{[key: string]: string}>({});

  // Commencer à chronométrer le temps passé sur la leçon
  useEffect(() => {
    const interval = setInterval(() => {
      setCompletionTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Effet pour charger les données de la leçon depuis l'API
  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        // Log pour débogage
        console.log(`Chargement de la leçon - moduleId: ${moduleId}, lessonId: ${lessonId}`);
        
        // Appel à l'API pour récupérer les données de la leçon
        const response = await fetch(`/api/modules/${moduleId}/lessons/${lessonId}`);
        const data = await response.json();

        if (response.ok) {
          console.log(`Leçon chargée avec succès: ${data.title}`);
          setLesson(data);
          
          // Si la leçon a des prérequis qui sont des identifiants de leçons (1-1, 1-2, etc.)
          // récupérer les titres de ces leçons pour un meilleur affichage
          if (data.prerequisites && data.prerequisites.some(prereq => /^\d+-\d+$/.test(prereq))) {
            fetchLessonTitles();
          }
        } else {
          console.error(`Erreur API: ${data.error || 'Leçon non trouvée'}`);
          console.log(`Détails: ${JSON.stringify(data, null, 2)}`);
          setError(data.error || 'Leçon non trouvée');
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement de la leçon:', err);
        setError('Erreur lors du chargement de la leçon');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [moduleId, lessonId]);

  // Fonction pour récupérer les titres des leçons prérequises
  const fetchLessonTitles = async () => {
    try {
      // Récupérer la liste des modules (pour avoir tous les titres de leçons)
      console.log("Tentative de récupération des titres de leçons pour les prérequis");
      const response = await fetch('/api/modules');
      const data = await response.json();
      
      // Afficher la structure exacte de la réponse pour débogage
      console.log("Structure de la réponse API:", JSON.stringify(data).substring(0, 500) + "...");
      
      // Déterminer si la structure a 'modules' ou si les modules sont directement dans data
      const modules = data.modules || data;
      
      if (response.ok && Array.isArray(modules)) {
        console.log("Données des modules récupérées avec succès:", modules.length, "modules");
        
        // Construire un dictionnaire d'identifiants de leçons -> titres
        const titles: {[key: string]: string} = {};
        
        // Parcourir tous les modules
        for (const module of modules) {
          if (module.lessons && Array.isArray(module.lessons)) {
            console.log(`Module ${module.id} contient ${module.lessons.length} leçons`);
            // Pour chaque leçon, ajouter son titre au dictionnaire
            module.lessons.forEach((lesson: any) => {
              if (lesson.id && lesson.title) {
                titles[lesson.id] = lesson.title;
                console.log(`Ajout du titre pour la leçon ${lesson.id}: "${lesson.title}"`);
              }
            });
          }
        }
        
        console.log("Dictionnaire des titres de leçons créé:", titles);
        setLessonTitles(titles);
      } else {
        console.error("Réponse API incorrecte pour /api/modules:", data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des titres de leçons:', error);
    }
  };

  // Fonction pour formater un prérequis (convertir un ID en titre si possible)
  const formatPrerequisite = (prereq: string) => {
    console.log(`Formatage du prérequis: "${prereq}"`, { 
      "Est au format module-leçon": /^\d+-\d+$/.test(prereq),
      "Titre disponible": lessonTitles[prereq] ? "Oui" : "Non" 
    });
    
    // Vérifier si le prérequis est au format "module-leçon" (ex: 1-1)
    if (/^\d+-\d+$/.test(prereq) && lessonTitles[prereq]) {
      return `${lessonTitles[prereq]} (${prereq})`;
    }
    
    return prereq;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center mb-2">
          <Link href="/lessons" className="text-indigo-600 hover:text-indigo-800 mr-2 transition-colors">
            Modules
          </Link>
          <span className="text-gray-500">/</span>
          <Link href={`/lessons/module/${moduleId}`} className="text-indigo-600 hover:text-indigo-800 mx-2 transition-colors">
            Module {moduleId}
          </Link>
          <span className="text-gray-500">/</span>
          <span className="ml-2 text-gray-700">Leçon {lessonId}</span>
        </div>
        
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-gray-200 rounded-lg h-64"></div>
              <div className="bg-gray-200 rounded-lg h-40"></div>
            </div>
            <div className="bg-gray-200 rounded-lg h-64"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-red-600 mb-4">Leçon non trouvée</h1>
            <p className="mb-6">La leçon que vous recherchez n'existe pas.</p>
            <Link 
              href={`/lessons/module/${moduleId}`} 
              className="inline-block px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              Retour au module
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // Si nous avons une leçon, on utilise le composant LessonContent
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <Link href="/lessons" className="text-indigo-600 hover:text-indigo-800 mr-2 transition-colors">
            Modules
          </Link>
          <span className="text-gray-500">/</span>
          <Link href={`/lessons/module/${moduleId}`} className="text-indigo-600 hover:text-indigo-800 mx-2 transition-colors">
            Module {moduleId}
          </Link>
          <span className="text-gray-500">/</span>
          <span className="ml-2 text-gray-700">Leçon {lessonId}</span>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-between items-center"
        >
          <div>
            <div className="flex items-center mb-1">
              <h1 className="text-3xl font-bold mr-3">{lesson.title}</h1>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                lesson.difficulty === 'débutant' ? 'bg-green-100 text-green-800' :
                lesson.difficulty === 'intermédiaire' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {lesson.difficulty}
              </span>
            </div>
            {lesson.description && (
              <p className="text-gray-600">{lesson.description}</p>
            )}
          </div>
          
          <div className="flex items-center">
            <div className="mr-6 flex items-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{lesson.duration || 15} minutes</span>
            </div>
            
            <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Temps écoulé: {formatTime(completionTime)}</span>
            </div>
          </div>
        </motion.div>
        
        {lesson.tags && lesson.tags.length > 0 && (
          <div className="flex flex-wrap mt-3">
            {lesson.tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium mr-2 mb-2">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {lesson.prerequisites && lesson.prerequisites.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-4 bg-blue-50 text-blue-700 p-3 rounded-md"
          >
            <div className="font-medium mb-1">Prérequis :</div>
            <ul className="list-disc list-inside">
              {lesson.prerequisites.map((prereq, index) => {
                console.log(`Affichage du prérequis ${index}:`, prereq);
                const formattedPrereq = formatPrerequisite(prereq);
                console.log(`Prérequis formaté:`, formattedPrereq);
                return (
                  <li key={index}>{formattedPrereq}</li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </div>
      
      <LessonContent 
        lesson={lesson} 
        moduleId={moduleId} 
        lessonId={lessonId} 
      />
    </div>
  );
}