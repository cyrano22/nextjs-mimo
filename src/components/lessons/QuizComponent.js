"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function QuizComponent({ quiz, onComplete }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizData, setQuizData] = useState(quiz);

  // Réinitialiser l'état quand le quiz change
  useEffect(() => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowExplanation(false);
    
    // Vérifier si le quiz a une structure avec des "questions" ou une seule question
    if (quiz && quiz.questions) {
      // Format multi-questions
      setQuizData(quiz.questions[0]); // Prendre la première question par défaut
    } else {
      // Format question unique
      setQuizData(quiz);
    }
  }, [quiz]);

  const handleAnswerSelect = (index) => {
    if (!isSubmitted) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setIsSubmitted(true);
    const correct = selectedAnswer === quizData.correctAnswer;
    setIsCorrect(correct);

    // Afficher automatiquement l'explication après la soumission
    setShowExplanation(true);

    // Appeler le callback si fourni
    if (onComplete) {
      onComplete({
        quizId: quizData.id,
        correct,
        selectedAnswer
      });
    }
  };

  const handleNextQuestion = () => {
    if (quizData.nextQuestion) {
      // Gérer la navigation vers la question suivante
      setSelectedAnswer(null);
      setIsSubmitted(false);
      setIsCorrect(false);
      setShowExplanation(false);

      // Simuler le changement de question (dans un cas réel, cela viendrait probablement d'un parent)
      setQuizData(quizData.nextQuestion);
    }
  };

  const variantButton = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
    correct: { 
      backgroundColor: "#34D399",
      color: "#FFFFFF",
      boxShadow: "0 0 0 2px #34D399" 
    },
    incorrect: { 
      backgroundColor: "#F87171",
      color: "#FFFFFF",
      boxShadow: "0 0 0 2px #F87171" 
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-6">
        {quizData?.title && (
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {quizData.title}
          </h3>
        )}
        {quizData?.question && (
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {quizData.question}
          </h3>
        )}

        <div className="space-y-3 mb-6">
          {quizData?.options?.map((option, index) => (
            <motion.button
              key={index}
              variants={variantButton}
              initial={false}
              whileHover={!isSubmitted ? "hover" : {}}
              whileTap={!isSubmitted ? "tap" : {}}
              animate={
                isSubmitted 
                  ? (typeof quizData.correctAnswer === 'number' && index === quizData.correctAnswer) || 
                    (typeof quizData.correctAnswer === 'string' && option === quizData.correctAnswer)
                    ? "correct" 
                    : selectedAnswer === index 
                      ? "incorrect" 
                      : {} 
                  : {}
              }
              onClick={() => handleAnswerSelect(index)}
              className={`w-full py-3 px-4 text-left rounded-md transition-all ${
                !isSubmitted 
                  ? selectedAnswer === index
                    ? "bg-indigo-100 border-2 border-indigo-500"
                    : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                  : index === quizData.correctAnswer
                    ? "bg-green-100 border-2 border-green-500"
                    : selectedAnswer === index
                      ? "bg-red-100 border-2 border-red-500"
                      : "bg-gray-50 border-2 border-transparent opacity-70"
              }`}
              disabled={isSubmitted}
            >
              <div className="flex items-center">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                  !isSubmitted 
                    ? selectedAnswer === index
                      ? "border-indigo-500 bg-indigo-500 text-white"
                      : "border-gray-400"
                    : index === quizData.correctAnswer
                      ? "border-green-500 bg-green-500 text-white"
                      : selectedAnswer === index
                        ? "border-red-500 bg-red-500 text-white"
                        : "border-gray-400"
                }`}>
                  <span className="text-xs font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                </div>
                <span className="font-medium">{option}</span>

                {isSubmitted && (
                  <>
                    {index === quizData.correctAnswer && (
                      <svg className="ml-auto h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}

                    {selectedAnswer === index && index !== quizData.correctAnswer && (
                      <svg className="ml-auto h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {isSubmitted && showExplanation && quizData.explanation && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className={`mb-4 p-4 rounded-md ${
              isCorrect ? 'bg-green-50' : 'bg-blue-50'
            }`}
          >
            <h4 className={`font-semibold mb-2 ${
              isCorrect ? 'text-green-800' : 'text-blue-800'
            }`}>
              {isCorrect ? '✓ Correct!' : 'Explication:'}
            </h4>
            <p className={isCorrect ? 'text-green-700' : 'text-blue-700'}>
              {quizData.explanation}
            </p>
          </motion.div>
        )}

        <div className="flex justify-between">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className={`px-6 py-2 rounded-md text-white transition-colors ${
                selectedAnswer === null 
                  ? 'bg-indigo-300 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              Valider
            </button>
          ) : (
            <div className="flex w-full justify-between">
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 transition-colors"
              >
                {showExplanation ? "Masquer l'explication" : "Voir l'explication"}
              </button>

              {quizData.nextQuestion && (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white transition-colors"
                >
                  Question suivante
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {quizData.difficulty && (
        <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Difficulté: <span className="font-medium">{quizData.difficulty}</span>
          </div>

          {quizData.points && (
            <div className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              +{quizData.points} XP
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}