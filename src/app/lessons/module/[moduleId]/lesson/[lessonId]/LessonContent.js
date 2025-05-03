
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import CodeEditor from '../../../../../components/editor/CodeEditor';
import CodePreviewSandbox from '../../../../../components/editor/CodePreviewSandbox';
import LessonProgress from '../../../../../components/lessons/LessonProgress';
import QuizComponent from '../../../../../components/lessons/QuizComponent';
import ExerciseComponent from '../../../../../components/lessons/ExerciseComponent';

export default function LessonContent({ lesson, moduleId, lessonId }) {
  const [activeSection, setActiveSection] = useState('theory');
  const [progress, setProgress] = useState(0);
  const [sectionCompleted, setSectionCompleted] = useState({
    theory: false,
    practice: false,
    quiz: false
  });
  
  // Mettre à jour la progression
  useEffect(() => {
    const completedCount = Object.values(sectionCompleted).filter(Boolean).length;
    setProgress(Math.round((completedCount / 3) * 100));
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
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">{lesson?.title || "Titre de la leçon"}</h1>
            <p className="text-gray-600 mt-2">{lesson?.description || "Description de la leçon"}</p>
          </div>
          
          <div className="flex space-x-2">
            <Link href={`/lessons/module/${moduleId}`} className="btn-secondary">
              Retour au module
            </Link>
          </div>
        </div>
        
        <LessonProgress progress={progress} />
        
        <div className="flex border-b mb-6 mt-6">
          <button
            onClick={() => setActiveSection('theory')}
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeSection === 'theory' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            1. Théorie
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
            onClick={() => setActiveSection('practice')}
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeSection === 'practice' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            2. Pratique
            {sectionCompleted.practice && (
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
            {activeSection === 'practice' && (
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
            3. Quiz
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
        </div>
        
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
              <div dangerouslySetInnerHTML={{ __html: lesson?.content || "<p>Contenu de la leçon...</p>" }} />
              
              {lesson?.examples && (
                <div className="my-6">
                  <h3>Exemple</h3>
                  <div className="bg-gray-50 rounded-md p-4 my-4">
                    <CodePreviewSandbox 
                      code={lesson.examples[0]?.code || "// Exemple de code"} 
                      language={lesson.examples[0]?.language || "javascript"}
                    />
                  </div>
                </div>
              )}
              
              <div className="mt-8">
                <button 
                  onClick={() => {
                    completeSection('theory');
                    setActiveSection('practice');
                  }}
                  className="btn-primary"
                >
                  Continuer vers la pratique
                </button>
              </div>
            </motion.div>
          )}
          
          {activeSection === 'practice' && (
            <motion.div
              key="practice"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="text-xl font-semibold mb-4">Exercice pratique</h2>
              <p className="text-gray-600 mb-6">Mettez en pratique ce que vous avez appris en complétant l'exercice suivant.</p>
              
              {lesson?.practice ? (
                <div className="bg-gray-50 rounded-md p-6">
                  <CodeEditor 
                    initialCode={lesson.practice.initialCode || "// Écrivez votre code ici"} 
                    solution={lesson.practice.solution || "// Solution"}
                    language={lesson.practice.language || "javascript"}
                  />
                  
                  <div className="mt-6">
                    <button 
                      onClick={() => {
                        completeSection('practice');
                        setActiveSection('quiz');
                      }}
                      className="btn-primary"
                    >
                      Vérifier et continuer
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-md">
                  Aucun exercice pratique disponible pour cette leçon.
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
              
              {lesson?.quiz ? (
                <div className="bg-gray-50 rounded-md p-6">
                  <QuizComponent quiz={lesson.quiz} onComplete={() => completeSection('quiz')} />
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-md">
                  Aucun quiz disponible pour cette leçon.
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
    </div>
  );
}
