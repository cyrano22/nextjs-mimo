
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function QuizComponent({ quiz, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [allAnswers, setAllAnswers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Initialiser le temps restant uniquement si le quiz a un temps limité
  useEffect(() => {
    if (quiz.timeLimit) {
      setTimeRemaining(quiz.timeLimit);
    }
  }, [quiz]);

  // Timer pour le compte à rebours du quiz
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0 || showResult || quizCompleted) {
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!quizCompleted) {
            handleQuizComplete();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, showResult, quizCompleted]);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    // Sauvegarder la réponse actuelle
    const currentQuizQuestion = quiz.questions[currentQuestion];
    const isAnswerCorrect = selectedOption === currentQuizQuestion.correctAnswer 
      || (Array.isArray(currentQuizQuestion.correctAnswer) && currentQuizQuestion.correctAnswer.includes(selectedOption));
    
    if (isAnswerCorrect) {
      setScore(score + 1);
    }

    setAllAnswers([...allAnswers, {
      question: currentQuizQuestion.question,
      selectedOption,
      correctOption: currentQuizQuestion.correctAnswer,
      isCorrect: isAnswerCorrect
    }]);

    // Réinitialiser l'état
    setSelectedOption(null);
    setIsCorrect(false);
    setShowResult(false);

    // Passer à la question suivante ou terminer le quiz
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;

    const currentQuizQuestion = quiz.questions[currentQuestion];
    const correct = selectedOption === currentQuizQuestion.correctAnswer 
      || (Array.isArray(currentQuizQuestion.correctAnswer) && currentQuizQuestion.correctAnswer.includes(selectedOption));
    
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleQuizComplete = () => {
    setQuizCompleted(true);
    if (onComplete) {
      onComplete({
        score,
        totalQuestions: quiz.questions.length,
        answers: allAnswers,
        timeSpent: quiz.timeLimit ? quiz.timeLimit - timeRemaining : null
      });
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Si le quiz est terminé, afficher le résumé
  if (quizCompleted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Résultat du Quiz</h2>
        
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-indigo-100 mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 text-indigo-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold">
            Vous avez obtenu {score} sur {quiz.questions.length}
          </h3>
          <p className="text-gray-600 mt-1">
            {score === quiz.questions.length 
              ? 'Parfait ! Vous avez répondu correctement à toutes les questions.'
              : score >= quiz.questions.length / 2 
                ? 'Bon travail ! Vous avez réussi le quiz.'
                : 'Continuez à pratiquer pour vous améliorer.'}
          </p>
          {timeRemaining !== null && (
            <p className="text-gray-500 mt-2">
              Temps utilisé: {formatTime(quiz.timeLimit - timeRemaining)}
            </p>
          )}
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium">Détails des réponses:</h3>
          {allAnswers.map((answer, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg ${
                answer.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}
            >
              <p className="font-medium">{index + 1}. {answer.question}</p>
              <div className="mt-2 flex items-start">
                <div className={`mt-1 flex-shrink-0 ${
                  answer.isCorrect ? 'text-green-500' : 'text-red-500'
                }`}>
                  {answer.isCorrect ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">
                    Votre réponse: {
                      quiz.questions[index].options[answer.selectedOption]
                    }
                  </p>
                  {!answer.isCorrect && (
                    <p className="text-sm text-gray-600 mt-1">
                      Réponse correcte: {
                        Array.isArray(answer.correctOption)
                          ? answer.correctOption.map(opt => quiz.questions[index].options[opt]).join(', ')
                          : quiz.questions[index].options[answer.correctOption]
                      }
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  // Afficher le quiz en cours
  const currentQuizQuestion = quiz.questions[currentQuestion];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{quiz.title || 'Quiz'}</h2>
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-500 mr-4">
            Question {currentQuestion + 1}/{quiz.questions.length}
          </span>
          {timeRemaining !== null && (
            <div className="flex items-center text-sm font-medium">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-600 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <span className={`${timeRemaining < 30 ? 'text-red-600' : 'text-gray-700'}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">{currentQuizQuestion.question}</h3>

        <div className="space-y-3">
          {currentQuizQuestion.options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                  selectedOption === index
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
                } ${
                  showResult 
                    ? index === currentQuizQuestion.correctAnswer 
                      ? 'border-green-500 bg-green-50'
                      : selectedOption === index 
                        ? 'border-red-500 bg-red-50'
                        : ''
                    : ''
                }`}
                onClick={() => !showResult && handleOptionSelect(index)}
                disabled={showResult}
              >
                <div className="flex items-start">
                  <div className={`flex-shrink-0 h-5 w-5 mt-0.5 rounded-full border ${
                    selectedOption === index
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-gray-300'
                  } ${
                    showResult 
                      ? index === currentQuizQuestion.correctAnswer
                        ? 'border-green-500 bg-green-500'
                        : selectedOption === index
                          ? 'border-red-500 bg-red-500'
                          : ''
                      : ''
                  }`}>
                    {(selectedOption === index || (showResult && index === currentQuizQuestion.correctAnswer)) && (
                      <svg className="text-white h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="font-medium text-gray-700 cursor-pointer">
                      {option}
                    </label>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {showResult && (
        <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex">
            <div className={`flex-shrink-0 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {isCorrect ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? 'Correct !' : 'Incorrect !'}
              </p>
              <p className="text-sm mt-1">
                {isCorrect
                  ? currentQuizQuestion.explanation || 'Bonne réponse !'
                  : currentQuizQuestion.explanation || `La bonne réponse est: ${currentQuizQuestion.options[currentQuizQuestion.correctAnswer]}`
                }
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <div>
          {currentQuestion > 0 && !showResult && (
            <button
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              className="px-4 py-2 text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
            >
              Question précédente
            </button>
          )}
        </div>
        
        <div>
          {!showResult ? (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedOption === null
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              Vérifier réponse
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              {currentQuestion < quiz.questions.length - 1 ? 'Question suivante' : 'Terminer le quiz'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
