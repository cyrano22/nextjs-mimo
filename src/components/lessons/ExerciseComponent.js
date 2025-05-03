"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExerciseComponent({ exercise }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  
  const handleOptionToggle = (optionId) => {
    if (!isSubmitted) {
      if (exercise.type === "single") {
        // Pour les exercices à choix unique
        setSelectedOptions([optionId]);
      } else {
        // Pour les exercices à choix multiples
        if (selectedOptions.includes(optionId)) {
          setSelectedOptions(selectedOptions.filter(id => id !== optionId));
        } else {
          setSelectedOptions([...selectedOptions, optionId]);
        }
      }
    }
  };
  
  const handleSubmit = () => {
    if (selectedOptions.length === 0) return;
    
    // Vérifier les réponses
    const correctOptions = exercise.options.filter(option => option.correct).map(option => option.id);
    const isCorrect = selectedOptions.length === correctOptions.length && 
                     selectedOptions.every(id => correctOptions.includes(id));
    
    setFeedback({
      isCorrect,
      message: isCorrect 
        ? "Bravo ! Vous avez correctement identifié les bonnes réponses." 
        : "Ce n'est pas tout à fait ça. Essayez de revoir la théorie et réessayez."
    });
    
    setIsSubmitted(true);
  };
  
  const resetExercise = () => {
    setSelectedOptions([]);
    setIsSubmitted(false);
    setFeedback(null);
  };
  
  return (
    <div className="space-y-4">
      <motion.h3 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-medium text-lg"
      >
        {exercise.title}
      </motion.h3>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-gray-700"
      >
        {exercise.description}
      </motion.p>
      
      <div className="space-y-2 mt-4">
        {exercise.options.map((option, index) => (
          <motion.div 
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleOptionToggle(option.id)}
            className={`p-3 border rounded-md cursor-pointer transition-colors ${
              selectedOptions.includes(option.id) 
                ? 'border-indigo-500 bg-indigo-50' 
                : 'border-gray-300 hover:border-indigo-300'
            } ${
              isSubmitted && option.correct 
                ? 'border-green-500 bg-green-50' 
                : isSubmitted && selectedOptions.includes(option.id) && !option.correct 
                  ? 'border-red-500 bg-red-50' 
                  : ''
            }`}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-md border mr-3 flex items-center justify-center ${
                selectedOptions.includes(option.id) 
                  ? 'bg-indigo-600 border-indigo-600 text-white' 
                  : 'border-gray-300'
              }`}>
                {selectedOptions.includes(option.id) && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span>{option.text}</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-4 rounded-md ${feedback.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
          >
            {feedback.message}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex justify-between mt-4">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOptions.length === 0}
            className={`btn-primary ${selectedOptions.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Vérifier
          </button>
        ) : (
          <button
            onClick={resetExercise}
            className="btn-secondary"
          >
            Réessayer
          </button>
        )}
        
        {feedback && feedback.isCorrect && (
          <button className="btn-primary">
            Continuer
          </button>
        )}
      </div>
    </div>
  );
}
