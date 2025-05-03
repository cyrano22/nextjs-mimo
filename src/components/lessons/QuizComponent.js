"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuizComponent({ quiz }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  
  const handleAnswerSelect = (answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answer
    });
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculer le score
      let correctAnswers = 0;
      quiz.questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.correctAnswer) {
          correctAnswers++;
        }
      });
      
      setScore(correctAnswers);
      setShowResults(true);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };
  
  if (showResults) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <motion.h3 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-medium text-lg"
        >
          Résultats du quiz
        </motion.h3>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="p-6 bg-white rounded-lg shadow-md border border-gray-200"
        >
          <div className="flex justify-center mb-4">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="#e2e8f0" 
                  strokeWidth="8"
                />
                <motion.circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke={score === quiz.questions.length ? "#10b981" : "#8b5cf6"} 
                  strokeWidth="8"
                  strokeDasharray="282.7"
                  strokeDashoffset={282.7 * (1 - score / quiz.questions.length)}
                  initial={{ strokeDashoffset: 282.7 }}
                  animate={{ strokeDashoffset: 282.7 * (1 - score / quiz.questions.length) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-3xl font-bold"
                >
                  {score}/{quiz.questions.length}
                </motion.span>
              </div>
            </div>
          </div>
          
          <p className="text-lg text-center">
            Vous avez obtenu <span className="font-bold text-indigo-600">{score}/{quiz.questions.length}</span> réponses correctes
          </p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`p-4 mt-4 rounded-md ${
              score === quiz.questions.length 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
            }`}
          >
            {score === quiz.questions.length ? (
              <>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Félicitations ! Vous avez répondu correctement à toutes les questions.</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Continuez à apprendre ! Vous pouvez réessayer le quiz pour améliorer votre score.</span>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetQuiz}
          className="btn-primary mt-4 mx-auto block"
        >
          Réessayer le quiz
        </motion.button>
      </motion.div>
    );
  }
  
  const question = quiz.questions[currentQuestion];
  
  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <motion.h3 
            className="font-medium text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {question.question}
          </motion.h3>
          
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.01, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(option)}
                className={`p-3 border rounded-md cursor-pointer transition-colors ${
                  selectedAnswers[currentQuestion] === option 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-300 hover:border-indigo-300'
                }`}
              >
                {option}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      
      <motion.div 
        className="flex justify-between items-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">
          Question {currentQuestion + 1} sur {quiz.questions.length}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextQuestion}
          disabled={selectedAnswers[currentQuestion] === undefined}
          className={`btn-primary ${
            selectedAnswers[currentQuestion] === undefined 
              ? 'opacity-50 cursor-not-allowed' 
              : ''
          }`}
        >
          {currentQuestion < quiz.questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
        </motion.button>
      </motion.div>
    </div>
  );
}
