
"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import dynamique pour éviter les erreurs SSR avec l'éditeur de code
const CodeEditor = dynamic(() => import('../editor/CodeEditor'), { ssr: false });

export default function ExerciseComponent({ exercise, onComplete }) {
  const [code, setCode] = useState(exercise.initialCode || '');
  const [output, setOutput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    // Réinitialiser l'état lorsque l'exercice change
    setCode(exercise.initialCode || '');
    setOutput('');
    setIsCorrect(false);
    setShowSolution(false);
    setShowHint(false);
    setAttemptCount(0);
    setFeedback(null);
  }, [exercise]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    // Réinitialiser les états de feedback lorsque le code change
    if (isCorrect) setIsCorrect(false);
    if (feedback) setFeedback(null);
  };

  const checkSolution = async () => {
    setIsChecking(true);
    setAttemptCount(attemptCount + 1);

    try {
      // Simulation de la vérification du code (remplacer par une vraie API)
      const isValid = await validateCode(code, exercise);
      
      // Mettre à jour l'état en fonction du résultat
      setIsCorrect(isValid);
      
      if (isValid) {
        setFeedback({
          type: 'success',
          message: 'Félicitations! Votre solution est correcte.'
        });
        
        // Notifier le parent que l'exercice est terminé
        if (onComplete) {
          onComplete({
            exerciseId: exercise.id,
            success: true,
            attemptsCount: attemptCount + 1,
            code
          });
        }
      } else {
        // Générer un feedback spécifique
        const feedbackMsg = generateFeedback(code, exercise);
        setFeedback({
          type: 'error',
          message: feedbackMsg
        });
      }
    } catch (error) {
      setFeedback({
        type: 'error',
        message: 'Une erreur est survenue lors de la vérification de votre code.'
      });
      console.error('Error checking solution:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const validateCode = async (userCode, exercise) => {
    // Dans une implémentation réelle, cela serait une requête à une API
    // qui exécuterait le code et vérifierait le résultat
    
    // Pour cet exemple, on fait une simple validation basée sur les mots-clés attendus
    if (exercise.validationCriteria) {
      for (const criteria of exercise.validationCriteria) {
        if (criteria.type === 'contains' && !userCode.includes(criteria.value)) {
          return false;
        }
        if (criteria.type === 'regex' && !new RegExp(criteria.value).test(userCode)) {
          return false;
        }
      }
      return true;
    }
    
    // Si pas de critères spécifiques, comparer avec la solution (simpliste)
    // Dans un cas réel, on exécuterait le code et comparerait les résultats
    const normalizedUserCode = userCode.replace(/\s+/g, ' ').trim();
    const normalizedSolution = exercise.solution.replace(/\s+/g, ' ').trim();
    
    // Considérer comme correct si le code de l'utilisateur contient les éléments clés de la solution
    const solutionKeyParts = normalizedSolution.split(/[{};()=]/g)
      .map(part => part.trim())
      .filter(part => part.length > 3);
    
    return solutionKeyParts.every(part => normalizedUserCode.includes(part));
  };

  const generateFeedback = (userCode, exercise) => {
    // Logique simple pour générer un feedback en fonction du code
    if (exercise.validationCriteria) {
      for (const criteria of exercise.validationCriteria) {
        if (criteria.type === 'contains' && !userCode.includes(criteria.value)) {
          return `Votre code devrait inclure "${criteria.value}".`;
        }
        if (criteria.type === 'regex' && !new RegExp(criteria.value).test(userCode)) {
          return criteria.feedback || 'Votre code ne respecte pas tous les critères demandés.';
        }
      }
    }

    // Feedback générique si aucun critère spécifique ne correspond
    if (userCode.length < exercise.solution.length * 0.5) {
      return "Votre solution semble incomplète. Continuez à coder!";
    } else if (userCode.length > exercise.solution.length * 1.5) {
      return "Votre solution pourrait être simplifiée.";
    } else {
      return "Votre solution est proche, mais il y a encore quelques problèmes à résoudre.";
    }
  };

  const runCode = () => {
    try {
      // Cette fonction est une simulation simplifiée de l'exécution du code
      // Dans une implémentation réelle, cela pourrait être envoyé à un backend
      // qui exécuterait le code dans un environnement sandbox
      
      // Pour cette démo, on affiche simplement le code comme "output"
      setOutput(`// Code reçu:\n${code}\n\n// Dans un environnement réel, ce code serait exécuté et les résultats affichés ici.`);
    } catch (error) {
      setOutput(`Erreur d'exécution: ${error.message}`);
    }
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const toggleSolution = () => {
    setShowSolution(!showSolution);
    if (!showSolution && !isCorrect) {
      // Pénaliser l'utilisateur pour avoir regardé la solution
      if (onComplete) {
        onComplete({
          exerciseId: exercise.id,
          success: false,
          usedSolution: true,
          attemptsCount: attemptCount
        });
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 bg-indigo-50 border-b border-indigo-100">
        <h2 className="text-xl font-semibold mb-2">{exercise.title || 'Exercice de Code'}</h2>
        <p className="text-gray-600">{exercise.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-md font-medium mb-2">Instructions:</h3>
            <div className="text-sm text-gray-700 prose">{exercise.instructions}</div>
          </div>

          {exercise.hints && exercise.hints.length > 0 && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <button 
                onClick={toggleHint} 
                className="text-md font-medium flex items-center text-yellow-700 w-full justify-between"
              >
                <span>Indice{exercise.hints.length > 1 ? 's' : ''}</span>
                <svg 
                  className={`h-5 w-5 transform transition-transform ${showHint ? 'rotate-180' : ''}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {showHint && (
                <div className="mt-2 text-sm text-yellow-800 space-y-2">
                  {exercise.hints.map((hint, index) => (
                    <div key={index} className="p-2 bg-yellow-100 rounded">
                      <span className="font-medium">Indice {index + 1}:</span> {hint}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {feedback && (
            <div className={`p-4 rounded-lg ${
              feedback.type === 'success' ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
            }`}>
              <div className="flex items-start">
                <div className={`flex-shrink-0 ${
                  feedback.type === 'success' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {feedback.type === 'success' ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <h3 className={`text-sm font-medium ${
                    feedback.type === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {feedback.type === 'success' ? 'Succès !' : 'Oups !'}
                  </h3>
                  <div className="mt-1 text-sm">
                    <p className={feedback.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                      {feedback.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <h3 className="text-md font-medium mb-2">Résultat d'exécution:</h3>
            <pre className="bg-white text-sm p-3 rounded border border-gray-200 overflow-auto max-h-40">
              {output || '// Appuyez sur "Exécuter" pour voir le résultat de votre code'}
            </pre>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex-grow">
            <CodeEditor
              value={code}
              onChange={handleCodeChange}
              language={exercise.language || 'javascript'}
              showLineNumbers={true}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: 'on'
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={runCode}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex-1"
            >
              Exécuter
            </button>

            <button
              onClick={checkSolution}
              disabled={isChecking}
              className={`px-4 py-2 rounded-md transition-colors flex-1 ${
                isChecking
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isChecking ? 'Vérification...' : 'Vérifier solution'}
            </button>
          </div>

          {!isCorrect && (
            <button
              onClick={toggleSolution}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              {showSolution ? 'Cacher la solution' : 'Voir la solution'}
            </button>
          )}

          {showSolution && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-md font-medium mb-2">Solution:</h3>
              <pre className="bg-white text-sm p-3 rounded border border-gray-200 overflow-auto max-h-60">
                {exercise.solution}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
