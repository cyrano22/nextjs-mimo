"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '../editor/CodeEditor';

export default function ExerciseComponent({ exercise, onComplete }) {
  const [code, setCode] = useState(exercise.initialCode || '');
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Réinitialiser le code à chaque nouvel exercice
  useEffect(() => {
    setCode(exercise.initialCode || '');
    setFeedback(null);
    setIsSubmitting(false);
    setShowSolution(false);
    setIsCorrect(false);
    setAttempts(0);
  }, [exercise]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    // Réinitialiser le feedback quand l'utilisateur modifie le code
    if (feedback) {
      setFeedback(null);
    }
  };

  const checkSolution = async () => {
    setIsSubmitting(true);
    setAttempts(attempts + 1);

    try {
      // Ici, on pourrait faire une vérification côté serveur via une API
      // Mais pour l'exemple, on fait une vérification simple côté client

      // Simuler un appel API pour vérifier le code
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Vérification basique (ceci serait idéalement fait côté serveur)
      let correct = false;
      let feedbackMsg = '';

      if (exercise.checkFunction) {
        // Si l'exercice a une fonction de vérification personnalisée
        const result = exercise.checkFunction(code);
        correct = result.correct;
        feedbackMsg = result.feedback;
      } else {
        // Sinon, on vérifie si le code contient certains éléments requis
        const lowerCode = code.toLowerCase();

        if (exercise.requiredPatterns) {
          correct = exercise.requiredPatterns.every(pattern => 
            new RegExp(pattern, 'i').test(code)
          );
        } else {
          // Vérification par défaut : le code est-il proche de la solution
          const similarityThreshold = 0.6; // 60% de similitude
          const totalChars = exercise.solutionCode.length;
          let matchingChars = 0;

          // Comparaison très basique caractère par caractère
          for (let i = 0; i < Math.min(code.length, totalChars); i++) {
            if (code[i] === exercise.solutionCode[i]) {
              matchingChars++;
            }
          }

          const similarity = matchingChars / totalChars;
          correct = similarity >= similarityThreshold;
        }

        if (correct) {
          feedbackMsg = "Bravo! Votre solution est correcte. Vous avez bien compris le concept!";
        } else if (attempts >= 2) {
          feedbackMsg = "Vous êtes sur la bonne voie, mais il y a encore quelques ajustements à faire. Vérifiez les instructions et essayez à nouveau.";
        } else {
          feedbackMsg = "Votre solution n'est pas tout à fait correcte. Relisez les instructions et essayez à nouveau.";
        }
      }

      setFeedback({
        type: correct ? 'success' : 'error',
        message: feedbackMsg
      });

      setIsCorrect(correct);

      // Notifier le parent si l'exercice est complété
      if (correct && onComplete) {
        onComplete({
          exerciseId: exercise.id,
          completed: true,
          attempts,
          code
        });
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de la solution:', error);
      setFeedback({
        type: 'error',
        message: "Une erreur s'est produite lors de la vérification. Veuillez réessayer."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetExercise = () => {
    setCode(exercise.initialCode);
    setFeedback(null);
    setShowSolution(false);
  };

  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {exercise.title}
        </h3>

        <div className="mb-4">
          <p className="text-gray-700">{exercise.description}</p>
        </div>

        {exercise.instructions && (
          <div className="mb-6 bg-blue-50 p-4 rounded-md">
            <h4 className="font-semibold text-blue-800 mb-2">Instructions:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {exercise.instructions.map((instruction, index) => (
                <li key={index} className="text-blue-700">{instruction}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-4">
          <CodeEditor
            initialCode={code}
            language={exercise.language || 'javascript'}
            onChange={handleCodeChange}
            height="300px"
            showPreview={exercise.showPreview || false}
          />
        </div>

        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 p-4 rounded-md ${
              feedback.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            <p className="font-medium">{feedback.message}</p>

            {feedback.type === 'error' && attempts >= 3 && (
              <p className="mt-2 text-sm">
                Besoin d'aide? Vous pouvez 
                <button 
                  onClick={toggleSolution} 
                  className="text-blue-600 hover:text-blue-800 underline ml-1"
                >
                  {showSolution ? "masquer la solution" : "voir la solution"}
                </button>.
              </p>
            )}
          </motion.div>
        )}

        {showSolution && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
            <div className="bg-gray-50 p-4 rounded-md overflow-auto">
              <pre className="text-sm">
                <code className="language-javascript">{exercise.solutionCode}</code>
              </pre>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={resetExercise}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 transition-colors"
          >
            Réinitialiser
          </button>

          <button
            onClick={checkSolution}
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-md text-white transition-colors ${
              isSubmitting 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : isCorrect 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Vérification...
              </span>
            ) : isCorrect ? (
              'Correct ✓'
            ) : (
              'Vérifier la solution'
            )}
          </button>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Difficulté: <span className="font-medium">{exercise.difficulty || 'Intermédiaire'}</span>
        </div>

        {exercise.xpReward && (
          <div className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
            +{exercise.xpReward} XP
          </div>
        )}
      </div>
    </div>
  );
}