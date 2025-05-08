"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import CodeEditor from '@/components/editor/CodeEditor';
import CodePreviewSandbox from '@/components/editor/CodePreviewSandbox';
import LessonProgress from '@/components/lessons/LessonProgress';
import QuizComponent from '@/components/lessons/QuizComponent';
import ExerciseComponent from '@/components/lessons/ExerciseComponent';

// Types
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
  example?: Example; // Rendu optionnel
  examples?: Example[];
  exercise?: Exercise; // Rendu optionnel
  quiz?: Quiz; // Rendu optionnel
  project?: Project; // Rendu optionnel
  practice?: {
    initialCode: string;
    solution: string;
    language?: string;
  };
  duration?: number;
  difficulty?: 'débutant' | 'intermédiaire' | 'avancé';
  prerequisites?: string[];
  tags?: string[];
}

interface LessonContentProps {
  lesson: LessonData;
  moduleId: string;
  lessonId: string;
}

export default function LessonContent({ lesson, moduleId, lessonId }: LessonContentProps) {
  // États pour le suivi de l'onglet actif et de la progression
  const [activeSection, setActiveSection] = useState('theory');
  const [progress, setProgress] = useState(0);
  const [sectionCompleted, setSectionCompleted] = useState({
    theory: false,
    example: false,
    exercise: false,
    quiz: false,
    project: false
  });
  
  // État pour stocker les leçons disponibles
  const [availableKeys, setAvailableKeys] = useState<string[]>([]);
  const [isNextLessonAvailable, setIsNextLessonAvailable] = useState(false);
  const [isPrevLessonAvailable, setIsPrevLessonAvailable] = useState(false);
  
  // Mettre à jour la progression
  useEffect(() => {
    const completedCount = Object.values(sectionCompleted).filter(Boolean).length;
    // Modification : calculer selon le nombre total de sections (5)
    setProgress(Math.round((completedCount / 5) * 100));
  }, [sectionCompleted]);
  
  // Vérifier si les leçons précédentes et suivantes existent
  useEffect(() => {
    // Cette logique est basée sur les erreurs concernant les leçons disponibles
    // Ces informations sont disponibles dans les erreurs de l'API
    const fetchAvailableLessons = async () => {
      try {
        const response = await fetch(`/api/modules/${moduleId}/lessons/${parseInt(lessonId) + 1}`);
        const data = await response.json();
        
        if (!response.ok && data.availableKeys) {
          setAvailableKeys(data.availableKeys);
          
          // Vérifiez si la leçon suivante est disponible
          setIsNextLessonAvailable(data.availableKeys.includes(`${moduleId}-${parseInt(lessonId) + 1}`));
          
          // Vérifiez si la leçon précédente existe et est disponible
          setIsPrevLessonAvailable(parseInt(lessonId) > 1 && data.availableKeys.includes(`${moduleId}-${parseInt(lessonId) - 1}`));
        } else {
          // Si aucune erreur, alors la leçon suivante existe
          setIsNextLessonAvailable(true);
          setIsPrevLessonAvailable(parseInt(lessonId) > 1);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification des leçons disponibles:", error);
        // Par défaut, utiliser la logique de base
        setIsNextLessonAvailable(false);
        setIsPrevLessonAvailable(parseInt(lessonId) > 1);
      }
    };
    
    fetchAvailableLessons();
  }, [moduleId, lessonId]);
  
  // Simuler la complétion d'une section
  const completeSection = (section: string) => {
    setSectionCompleted(prev => ({
      ...prev,
      [section]: true
    }));
  };
  
  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };
  
  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lesson-container bg-primary-light dark:bg-primary-dark rounded-card shadow-card overflow-hidden border border-light-border dark:border-medium-border"
      >
        <div className="flex border-b mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveSection('theory')}
            className={`px-6 py-4 font-medium text-sm transition-colors relative ${
              activeSection === 'theory' ? 'text-indigo-800 font-semibold' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full flex items-center justify-center mr-2 text-white text-xs font-bold shadow-sm">
                1
              </div>
              <span>Théorie</span>
            </div>
            
            {sectionCompleted.theory && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 rounded-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.span>
            )}
            {activeSection === 'theory' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-700"
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveSection('example')}
            className={`px-6 py-4 font-medium text-sm transition-colors relative ${
              activeSection === 'example' ? 'text-indigo-700 font-semibold' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full flex items-center justify-center mr-2 text-white text-xs font-bold shadow-sm">
                2
              </div>
              <span>Exemple</span>
            </div>
            
            {sectionCompleted.example && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 rounded-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.span>
            )}
            {activeSection === 'example' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-700"
              />
            )}
          </button>

          <button
            onClick={() => setActiveSection('exercise')}
            className={`px-6 py-4 font-medium text-sm transition-colors relative ${
              activeSection === 'exercise' ? 'text-indigo-700 font-semibold' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full flex items-center justify-center mr-2 text-white text-xs font-bold shadow-sm">
                3
              </div>
              <span>Exercice</span>
            </div>
            
            {sectionCompleted.exercise && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 rounded-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.span>
            )}
            {activeSection === 'exercise' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-700"
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveSection('quiz')}
            className={`px-6 py-4 font-medium text-sm transition-colors relative ${
              activeSection === 'quiz' ? 'text-indigo-700 font-semibold' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full flex items-center justify-center mr-2 text-white text-xs font-bold shadow-sm">
                4
              </div>
              <span>Quiz</span>
            </div>
            
            {sectionCompleted.quiz && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 rounded-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.span>
            )}
            {activeSection === 'quiz' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-700"
              />
            )}
          </button>

          <button
            onClick={() => setActiveSection('project')}
            className={`px-6 py-4 font-medium text-sm transition-colors relative ${
              activeSection === 'project' ? 'text-indigo-700 font-semibold' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full flex items-center justify-center mr-2 text-white text-xs font-bold shadow-sm">
                5
              </div>
              <span>Projet</span>
            </div>
            
            {sectionCompleted.project && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 rounded-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.span>
            )}
            {activeSection === 'project' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-700"
              />
            )}
          </button>
        </div>
      </motion.div>
      
      <div className="p-6">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 font-medium">Progression de la leçon</span>
            <span className="text-sm text-gray-600">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2">
            <AnimatePresence mode="wait">
              {activeSection === 'theory' && (
                <motion.div
                  key="theory"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="prose prose-indigo max-w-none"
                >
                  <div 
                    className="rounded-lg p-6 bg-white shadow-sm border border-gray-100"
                    dangerouslySetInnerHTML={{ __html: lesson?.content || "<p>Contenu de la leçon...</p>" }} 
                  />
                  
                  {(lesson?.examples || lesson?.example) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-6 rounded-lg p-6 bg-white shadow-sm border border-gray-100"
                    >
                      <h3 className="text-xl font-semibold mb-4">{
                        lesson.examples?.[0]?.title || lesson.example?.title || "Exemple"
                      }</h3>
                      <div className="bg-gray-50 rounded-md p-4 my-4 overflow-hidden">
                        <CodePreviewSandbox 
                          code={lesson.examples?.[0]?.code || lesson.example?.code || "// Exemple de code"} 
                          language={lesson.examples?.[0]?.language || lesson.example?.language || "javascript"}
                        />
                      </div>
                      <p className="text-gray-700 mt-4">{
                        lesson.examples?.[0]?.explanation || lesson.example?.explanation || ""
                      }</p>
                    </motion.div>
                  )}
                  
                  <div className="mt-8 flex justify-end">
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        completeSection('theory');
                        // Modification : rediriger vers 'example' au lieu de 'practice'
                        setActiveSection('example');
                      }}
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all transform shadow-md"
                    >
                      Continuer vers l'exemple
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              )}
              
              {activeSection === 'example' && (
                <motion.div
                  key="example"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="prose prose-indigo max-w-none"
                >
                  <div className="rounded-lg p-6 bg-white shadow-sm border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">
                      <span className="bg-indigo-100 text-indigo-700 w-8 h-8 inline-flex items-center justify-center rounded-full mr-2 text-sm font-bold">2</span>
                      Exemple
                    </h2>
                    
                    {(lesson?.examples || lesson?.example) ? (
                      <>
                        <h3 className="text-lg font-medium mb-2">{
                          lesson.examples?.[0]?.title || lesson.example?.title || "Exemple de code"
                        }</h3>
                        <div className="bg-gray-50 rounded-md p-4 my-4 overflow-hidden">
                          <CodePreviewSandbox 
                            code={lesson.examples?.[0]?.code || lesson.example?.code || "// Exemple de code"} 
                            language={lesson.examples?.[0]?.language || lesson.example?.language || "javascript"}
                          />
                        </div>
                        <p className="text-gray-700 mt-4">{
                          lesson.examples?.[0]?.explanation || lesson.example?.explanation || ""
                        }</p>
                      </>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-md">
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <div>
                            <div className="font-medium text-yellow-800">Aucun exemple disponible</div>
                            <p className="text-yellow-700">Cette leçon ne contient pas d'exemple pour le moment.</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between mt-8">
                      <motion.button 
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveSection('theory')}
                        className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Revenir à la théorie
                      </motion.button>
                      
                      <motion.button 
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          completeSection('example');
                          setActiveSection('exercise');
                        }}
                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md"
                      >
                        Continuer vers l'exercice
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeSection === 'exercise' && (
                <motion.div
                  key="exercise"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="rounded-lg bg-white shadow-sm border border-gray-100 p-6"
                >
                  <h2 className="text-xl font-semibold mb-4">
                    <span className="bg-indigo-100 text-indigo-700 w-8 h-8 inline-flex items-center justify-center rounded-full mr-2 text-sm font-bold">3</span>
                    Exercice pratique
                  </h2>
                  <p className="text-gray-600 mb-6">Mettez en pratique ce que vous avez appris en complétant l'exercice suivant.</p>
                  
                  {(lesson?.exercise) ? (
                    <>
                      {lesson.exercise && (lesson.exercise.type === "multiple" || lesson.exercise.type === "matching") && (
                        <div className="mb-8">
                          <div className="font-medium mb-2">{lesson.exercise.title}</div>
                          <p className="text-gray-600 mb-4">{lesson.exercise.description}</p>
                          <ExerciseComponent exercise={lesson.exercise} />
                        </div>
                      )}
                      
                      <div className="flex justify-between mt-8">
                        <motion.button 
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setActiveSection('example')}
                          className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Revenir à l'exemple
                        </motion.button>
                        
                        <motion.button 
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            completeSection('exercise');
                            setActiveSection('quiz');
                          }}
                          className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md"
                        >
                          Continuer vers le quiz
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.button>
                      </div>
                    </>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-yellow-50 border border-yellow-100 p-4 rounded-md"
                    >
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                          <div className="font-medium text-yellow-800">Aucun exercice pratique disponible</div>
                          <p className="text-yellow-700">Cette leçon ne contient pas d'exercice pratique pour le moment.</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between">
                        <motion.button 
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setActiveSection('example')}
                          className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Revenir à l'exemple
                        </motion.button>
                        
                        <motion.button 
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            completeSection('exercise');
                            setActiveSection('quiz');
                          }}
                          className="px-4 py-2 rounded-lg bg-yellow-200 text-yellow-800 font-medium transition-all"
                        >
                          Passer au quiz
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
              
              {activeSection === 'quiz' && (
                <motion.div
                  key="quiz"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="rounded-lg bg-white shadow-sm border border-gray-100 p-6"
                >
                  <h2 className="text-xl font-semibold mb-4">
                    <span className="bg-indigo-100 text-indigo-700 w-8 h-8 inline-flex items-center justify-center rounded-full mr-2 text-sm font-bold">4</span>
                    Quiz de validation
                  </h2>
                  <p className="text-gray-600 mb-6">Vérifiez votre compréhension en répondant aux questions suivantes.</p>
                  
                  {lesson?.quiz ? (
                    <div className="bg-gray-50 rounded-md p-6">
                      <QuizComponent quiz={lesson.quiz} />
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-md">
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                          <div className="font-medium text-yellow-800">Aucun quiz disponible</div>
                          <p className="text-yellow-700">Cette leçon ne contient pas de quiz pour le moment.</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between">
                        <motion.button 
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setActiveSection('exercise')}
                          className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Revenir à l'exercice
                        </motion.button>
                        
                        <motion.button 
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            completeSection('quiz');
                            setActiveSection('project');
                          }}
                          className="px-4 py-2 rounded-lg bg-yellow-200 text-yellow-800 font-medium transition-all"
                        >
                          Passer au projet
                        </motion.button>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-8">
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveSection('exercise')}
                      className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Revenir à l'exercice
                    </motion.button>
                    
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        completeSection('quiz');
                        setActiveSection('project');
                      }}
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md"
                    >
                      Continuer vers le projet
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              )}
              
              {activeSection === 'project' && (
                <motion.div
                  key="project"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="rounded-lg bg-white shadow-sm border border-gray-100 p-6"
                >
                  <h2 className="text-xl font-semibold mb-4">
                    <span className="bg-indigo-100 text-indigo-700 w-8 h-8 inline-flex items-center justify-center rounded-full mr-2 text-sm font-bold">5</span>
                    Projet final
                  </h2>
                  <p className="text-gray-600 mb-6">Appliquez vos connaissances en réalisant ce projet.</p>
                  
                  {lesson?.project ? (
                    <>
                      <h3 className="text-lg font-medium mb-2">{lesson.project.title}</h3>
                      <p className="text-gray-600 mb-4">{lesson.project.description}</p>
                      <div className="bg-gray-50 rounded-md p-6">
                        <CodeEditor 
                          initialCode={lesson.project.initialCode} 
                          language={lesson.project.language || "javascript"}
                          onCodeChange={() => {}}
                          onCodeRun={() => {}}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-md">
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                          <div className="font-medium text-yellow-800">Aucun projet disponible</div>
                          <p className="text-yellow-700">Cette leçon ne contient pas de projet pour le moment.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-8">
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveSection('quiz')}
                      className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Revenir au quiz
                    </motion.button>
                    
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        completeSection('project');
                      }}
                      className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-all shadow-md"
                    >
                      Terminer la leçon
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.button>
                  </div>
                  
                  {sectionCompleted.project && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-8 p-6 bg-green-50 border border-green-100 rounded-md"
                    >
                      <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-2xl font-bold text-green-800 mb-2">🎉 Félicitations !</h3>
                        <p className="mb-6 text-green-700">Vous avez terminé cette leçon avec succès.</p>
                        
                        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                          {isNextLessonAvailable ? (
                            <Link 
                              href={`/lessons/module/${moduleId}/lesson/${parseInt(lessonId) + 1}`} 
                              className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
                            >
                              Passer à la leçon suivante
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </Link>
                          ) : (
                            <div className="px-6 py-3 rounded-lg bg-gray-100 text-gray-500 font-medium">
                              Aucune leçon suivante disponible
                            </div>
                          )}
                          <Link 
                            href={`/lessons/module/${moduleId}`} 
                            className="px-6 py-3 rounded-lg border border-indigo-300 text-indigo-700 hover:bg-indigo-50 transition-all"
                          >
                            Revenir au module
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 sticky top-6">
              <div className="p-6">
                <h3 className="font-medium text-lg mb-4">Navigation</h3>
                
                <div className="space-y-3">
                  <button 
                    onClick={() => setActiveSection('theory')}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                      activeSection === 'theory' 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      activeSection === 'theory' 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <span className="text-xs font-bold">1</span>
                    </div>
                    <span>Théorie</span>
                    {sectionCompleted.theory && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                  
                  <button 
                    onClick={() => setActiveSection('example')}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                      activeSection === 'example' 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      activeSection === 'example' 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <span className="text-xs font-bold">2</span>
                    </div>
                    <span>Exemple</span>
                    {sectionCompleted.example && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                  
                  <button 
                    onClick={() => setActiveSection('exercise')}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                      activeSection === 'exercise' 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      activeSection === 'exercise' 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <span className="text-xs font-bold">3</span>
                    </div>
                    <span>Exercice</span>
                    {sectionCompleted.exercise && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                  
                  <button 
                    onClick={() => setActiveSection('quiz')}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                      activeSection === 'quiz' 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      activeSection === 'quiz' 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <span className="text-xs font-bold">4</span>
                    </div>
                    <span>Quiz</span>
                    {sectionCompleted.quiz && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                  
                  <button 
                    onClick={() => setActiveSection('project')}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                      activeSection === 'project' 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      activeSection === 'project' 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <span className="text-xs font-bold">5</span>
                    </div>
                    <span>Projet</span>
                    {sectionCompleted.project && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                </div>
                
                <div className="mt-8 border-t border-gray-100 pt-6">
                  <h3 className="font-medium mb-4">Navigation des leçons</h3>
                  <div className="flex flex-col space-y-3">
                    {isPrevLessonAvailable ? (
                      <Link 
                        href={`/lessons/module/${moduleId}/lesson/${parseInt(lessonId) - 1}`} 
                        className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Leçon précédente
                      </Link>
                    ) : (
                      <span className="flex items-center text-gray-400 cursor-not-allowed">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Leçon précédente
                      </span>
                    )}
                    
                    {isNextLessonAvailable ? (
                      <Link 
                        href={`/lessons/module/${moduleId}/lesson/${parseInt(lessonId) + 1}`} 
                        className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        Leçon suivante
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ) : (
                      <div className="space-y-1">
                        <span className="flex items-center text-gray-400 cursor-not-allowed">
                          Leçon suivante
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                        <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded-md border border-amber-100">
                          <p>Il n'y a pas d'autres leçons disponibles dans ce module pour le moment.</p>
                          {availableKeys.length > 0 && (
                            <p className="mt-1">Modules disponibles: {availableKeys.map(key => key.split('-')[0]).filter((v, i, a) => a.indexOf(v) === i).join(', ')}</p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <Link 
                      href={`/lessons/module/${moduleId}`} 
                      className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors mt-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      Retour au module
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}