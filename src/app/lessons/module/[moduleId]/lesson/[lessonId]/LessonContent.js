"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import CodeEditor from '@/components/editor/CodeEditor';
import CodePreviewSandbox from '@/components/editor/CodePreviewSandbox';
import LessonProgress from '@/components/lessons/LessonProgress';
import QuizComponent from '@/components/lessons/QuizComponent';
import ExerciseComponent from '@/components/lessons/ExerciseComponent';

export default function LessonContent({ lesson, moduleId, lessonId }) {
  const [activeSection, setActiveSection] = useState('theory');
  const [progress, setProgress] = useState(0);
  const [sectionCompleted, setSectionCompleted] = useState({
    theory: false,
    example: false,
    exercise: false,
    quiz: false,
    project: false
  });
  
  // Corriger des valeurs hasExample, hasExercise, hasQuiz et hasProject manquantes
  const normalizedLesson = useMemo(() => {
    if (!lesson) return null;
    
    return {
      ...lesson,
      // Définir ces propriétés si elles n'existent pas déjà
      hasExample: lesson.hasExample !== undefined ? lesson.hasExample : !!lesson.example,
      hasExercise: lesson.hasExercise !== undefined ? lesson.hasExercise : !!lesson.exercise, 
      hasQuiz: lesson.hasQuiz !== undefined ? lesson.hasQuiz : !!lesson.quiz,
      hasProject: lesson.hasProject !== undefined ? lesson.hasProject : !!lesson.project
    };
  }, [lesson]);
  
  // Mettre à jour la progression
  useEffect(() => {
    const completedCount = Object.values(sectionCompleted).filter(Boolean).length;
    setProgress(Math.round((completedCount / 5) * 100));
  }, [sectionCompleted]);
  
  // Simuler la complétion d'une section
  const completeSection = (section) => {
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
  
  // Si la leçon n'est pas disponible, ne rien afficher
  if (!normalizedLesson) return null;
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">{normalizedLesson?.title || "Titre de la leçon"}</h1>
            <p className="text-gray-600 mt-2">{normalizedLesson?.description || "Description de la leçon"}</p>
          </div>
          
          <div className="flex space-x-2">
            <Link href={`/lessons/module/${moduleId}`} className="btn-secondary">
              Retour au module
            </Link>
          </div>
        </div>
        
        <LessonProgress progress={progress} />
        
        <div className="flex border-b mb-6 mt-6 overflow-x-auto">
          <button
            onClick={() => setActiveSection('theory')}
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeSection === 'theory' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center">
              <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2 text-indigo-600 text-xs font-bold">
                1
              </div>
              <span>Théorie</span>
            </div>
            {sectionCompleted.theory && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.span>
            )}
            {activeSection === 'theory' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveSection('example')}
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeSection === 'example' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center">
              <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2 text-indigo-600 text-xs font-bold">
                2
              </div>
              <span>Exemple</span>
            </div>
            {sectionCompleted.example && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.span>
            )}
            {activeSection === 'example' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveSection('exercise')}
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeSection === 'exercise' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center">
              <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2 text-indigo-600 text-xs font-bold">
                3
              </div>
              <span>Exercice</span>
            </div>
            {sectionCompleted.exercise && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.span>
            )}
            {activeSection === 'exercise' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveSection('quiz')}
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeSection === 'quiz' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center">
              <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2 text-indigo-600 text-xs font-bold">
                4
              </div>
              <span>Quiz</span>
            </div>
            {sectionCompleted.quiz && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.span>
            )}
            {activeSection === 'quiz' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveSection('project')}
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeSection === 'project' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center">
              <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2 text-indigo-600 text-xs font-bold">
                5
              </div>
              <span>Projet</span>
            </div>
            {sectionCompleted.project && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.span>
            )}
            {activeSection === 'project' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
              />
            )}
          </button>
        </div>
        
        {/* Colonne latérale de navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeSection === 'theory' && (
                <motion.div
                  key="theory"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="prose max-w-none"
                >
                  <div dangerouslySetInnerHTML={{ __html: normalizedLesson?.content || "<p>Contenu de la leçon...</p>" }} />
                  
                  <div className="mt-8">
                    <button 
                      onClick={() => {
                        completeSection('theory');
                        setActiveSection('example');
                      }}
                      className="btn-primary"
                    >
                      Continuer vers l'exemple
                    </button>
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
                >
                  <h2 className="text-xl font-semibold mb-4">Exemple</h2>
                  
                  {normalizedLesson?.hasExample ? (
                    <div className="bg-gray-50 rounded-md p-6">
                      <h3 className="text-lg font-medium mb-3">{normalizedLesson.example.title || "Exemple de code"}</h3>
                      <div className="bg-gray-100 rounded-md p-4 mb-4 font-mono text-sm overflow-x-auto">
                        <pre>{normalizedLesson.example.code || "// Exemple de code"}</pre>
                      </div>
                      <p className="text-gray-700">{normalizedLesson.example.explanation || "Explication de l'exemple"}</p>
                      
                      <div className="mt-6 flex justify-between">
                        <button 
                          onClick={() => setActiveSection('theory')}
                          className="btn-secondary"
                        >
                          Retour à la théorie
                        </button>
                        <button 
                          onClick={() => {
                            completeSection('example');
                            setActiveSection('exercise');
                          }}
                          className="btn-primary"
                        >
                          Continuer vers l'exercice
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-md">
                      <p>Aucun exemple disponible pour cette leçon.</p>
                      <div className="mt-4">
                        <button 
                          onClick={() => {
                            completeSection('example');
                            setActiveSection('exercise');
                          }}
                          className="btn-primary"
                        >
                          Continuer vers l'exercice
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
              
              {activeSection === 'exercise' && (
                <motion.div
                  key="exercise"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2 className="text-xl font-semibold mb-4">Exercice pratique</h2>
                  <p className="text-gray-600 mb-6">Mettez en pratique ce que vous avez appris en complétant l'exercice suivant.</p>
                  
                  {normalizedLesson?.hasExercise ? (
                    <div className="bg-gray-50 rounded-md p-6">
                      <ExerciseComponent 
                        exercise={normalizedLesson.exercise} 
                        onComplete={() => completeSection('exercise')}
                      />
                      
                      <div className="mt-6 flex justify-between">
                        <button 
                          onClick={() => setActiveSection('example')}
                          className="btn-secondary"
                        >
                          Retour à l'exemple
                        </button>
                        <button 
                          onClick={() => {
                            completeSection('exercise');
                            setActiveSection('quiz');
                          }}
                          className="btn-primary"
                        >
                          Continuer vers le quiz
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-md">
                      <p>Aucun exercice pratique disponible pour cette leçon.</p>
                      <div className="mt-4 flex justify-between">
                        <button 
                          onClick={() => setActiveSection('example')}
                          className="btn-secondary"
                        >
                          Retour à l'exemple
                        </button>
                        <button 
                          onClick={() => {
                            completeSection('exercise');
                            setActiveSection('quiz');
                          }}
                          className="btn-primary"
                        >
                          Continuer vers le quiz
                        </button>
                      </div>
                    </div>
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
                >
                  <h2 className="text-xl font-semibold mb-4">Quiz de validation</h2>
                  <p className="text-gray-600 mb-6">Vérifiez votre compréhension en répondant aux questions suivantes.</p>
                  
                  {normalizedLesson?.hasQuiz ? (
                    <div className="bg-gray-50 rounded-md p-6">
                      <QuizComponent quiz={normalizedLesson.quiz} onComplete={() => completeSection('quiz')} />
                      
                      <div className="mt-6 flex justify-between">
                        <button 
                          onClick={() => setActiveSection('exercise')}
                          className="btn-secondary"
                        >
                          Retour à l'exercice
                        </button>
                        <button 
                          onClick={() => {
                            completeSection('quiz');
                            setActiveSection('project');
                          }}
                          className="btn-primary"
                        >
                          Continuer vers le projet
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-md">
                      <p>Aucun quiz disponible pour cette leçon.</p>
                      <div className="mt-4 flex justify-between">
                        <button 
                          onClick={() => setActiveSection('exercise')}
                          className="btn-secondary"
                        >
                          Retour à l'exercice
                        </button>
                        <button 
                          onClick={() => {
                            completeSection('quiz');
                            setActiveSection('project');
                          }}
                          className="btn-primary"
                        >
                          Continuer vers le projet
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
              
              {activeSection === 'project' && (
                <motion.div
                  key="project"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2 className="text-xl font-semibold mb-4">{normalizedLesson?.project?.title || "Projet final"}</h2>
                  <p className="text-gray-600 mb-6">{normalizedLesson?.project?.description || "Appliquez tout ce que vous avez appris dans un projet pratique."}</p>
                  
                  {normalizedLesson?.hasProject ? (
                    <div className="bg-gray-50 rounded-md p-6">
                      <CodeEditor 
                        initialCode={normalizedLesson.project.initialCode || "// Écrivez votre code ici"} 
                        solution={normalizedLesson.project.solution || "// Solution"}
                        language={normalizedLesson.project.language || "javascript"}
                        onCodeRun={() => completeSection('project')}
                      />
                      
                      <div className="mt-6 flex justify-between">
                        <button 
                          onClick={() => setActiveSection('quiz')}
                          className="btn-secondary"
                        >
                          Retour au quiz
                        </button>
                        
                        {sectionCompleted.project ? (
                          <Link 
                            href={`/lessons/module/${moduleId}/lesson/${parseInt(lessonId) + 1}`} 
                            className="btn-success"
                          >
                            Leçon suivante
                          </Link>
                        ) : (
                          <button 
                            onClick={() => completeSection('project')}
                            className="btn-success"
                          >
                            Terminer la leçon
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-md">
                      <p>Aucun projet disponible pour cette leçon.</p>
                      <div className="mt-4 flex justify-between">
                        <button 
                          onClick={() => setActiveSection('quiz')}
                          className="btn-secondary"
                        >
                          Retour au quiz
                        </button>
                        <button 
                          onClick={() => completeSection('project')}
                          className="btn-success"
                        >
                          Terminer la leçon
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {progress === 100 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-8 p-6 bg-green-50 border border-green-100 rounded-md text-center"
                    >
                      <h3 className="text-xl font-bold text-green-700">🎉 Félicitations !</h3>
                      <p className="mb-4">Vous avez terminé cette leçon avec succès.</p>
                      
                      <div className="flex justify-center space-x-4">
                        <Link href={`/lessons/module/${moduleId}/lesson/${parseInt(lessonId) + 1}`} className="btn-primary">
                          Leçon suivante
                        </Link>
                        <Link href="/dashboard" className="btn-secondary">
                          Retour au tableau de bord
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Sidebar de navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold text-gray-700 mb-3">Navigation</h3>
              
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveSection('theory')}
                  className={`flex items-center w-full p-2 text-left rounded ${
                    activeSection === 'theory'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-xs font-medium ${
                    activeSection === 'theory'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    1
                  </div>
                  <span>Théorie</span>
                  {sectionCompleted.theory && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                
                <button
                  onClick={() => setActiveSection('example')}
                  className={`flex items-center w-full p-2 text-left rounded ${
                    activeSection === 'example'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-xs font-medium ${
                    activeSection === 'example'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    2
                  </div>
                  <span>Exemple</span>
                  {sectionCompleted.example && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                
                <button
                  onClick={() => setActiveSection('exercise')}
                  className={`flex items-center w-full p-2 text-left rounded ${
                    activeSection === 'exercise'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-xs font-medium ${
                    activeSection === 'exercise'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    3
                  </div>
                  <span>Exercice</span>
                  {sectionCompleted.exercise && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                
                <button
                  onClick={() => setActiveSection('quiz')}
                  className={`flex items-center w-full p-2 text-left rounded ${
                    activeSection === 'quiz'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-xs font-medium ${
                    activeSection === 'quiz'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    4
                  </div>
                  <span>Quiz</span>
                  {sectionCompleted.quiz && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                
                <button
                  onClick={() => setActiveSection('project')}
                  className={`flex items-center w-full p-2 text-left rounded ${
                    activeSection === 'project'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-xs font-medium ${
                    activeSection === 'project'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    5
                  </div>
                  <span>Projet</span>
                  {sectionCompleted.project && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </nav>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Progression</h4>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1 text-right">{progress}% complété</p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex flex-col space-y-2">
                  {parseInt(lessonId) > 1 ? (
                    <Link 
                      href={`/lessons/module/${moduleId}/lesson/${parseInt(lessonId) - 1}`} 
                      className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Leçon précédente
                    </Link>
                  ) : (
                    <span className="text-gray-400 flex items-center cursor-not-allowed">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Leçon précédente
                    </span>
                  )}
                  
                  <Link 
                    href={`/lessons/module/${moduleId}/lesson/${parseInt(lessonId) + 1}`} 
                    className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
                  >
                    Leçon suivante
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  
                  <Link 
                    href={`/lessons/module/${moduleId}`} 
                    className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
  );
}