"use client";

import { useState } from 'react';

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
      <div className="space-y-4">
        <h3 className="font-medium text-lg text-primary-light dark:text-primary-dark">Résultats du quiz</h3>
        <p className="text-lg text-secondary-light dark:text-secondary-dark">
          Vous avez obtenu <span className="font-bold text-indigo-600">{score}/{quiz.questions.length}</span> réponses correctes
        </p>
        
        {score === quiz.questions.length ? (
          <div className="p-4 bg-green-100 text-green-800 rounded-md">
            Félicitations ! Vous avez répondu correctement à toutes les questions.
          </div>
        ) : (
          <div className="p-4 bg-yellow-100 text-yellow-800 rounded-md">
            Continuez à apprendre ! Vous pouvez réessayer le quiz pour améliorer votre score.
          </div>
        )}
        
        <button
          onClick={resetQuiz}
          className="btn-primary mt-4"
        >
          Réessayer le quiz
        </button>
      </div>
    );
  }
  
  const question = quiz.questions[currentQuestion];
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg text-primary-light dark:text-primary-dark">{question.question}</h3>
      
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <div 
            key={index}
            onClick={() => handleAnswerSelect(option)}
            className={`p-3 border rounded-md cursor-pointer transition-colors text-secondary-light dark:text-secondary-dark ${
              selectedAnswers[currentQuestion] === option 
                ? 'border-indigo-500 bg-indigo-50' 
                : 'border-gray-300 hover:border-indigo-300'
            }`}
          >
            {option}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Question {currentQuestion + 1} sur {quiz.questions.length}
        </div>
        
        <button
          onClick={handleNextQuestion}
          disabled={selectedAnswers[currentQuestion] === undefined}
          className={`btn-primary ${
            selectedAnswers[currentQuestion] === undefined 
              ? 'opacity-50 cursor-not-allowed' 
              : ''
          }`}
        >
          {currentQuestion < quiz.questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
        </button>
      </div>
    </div>
  );
}
