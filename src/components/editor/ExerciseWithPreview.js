"use client";

import { useState, useEffect } from 'react';
import CodePreviewSandbox from './CodePreviewSandbox';

export default function ExerciseWithPreview({ 
  title, 
  description, 
  initialCode, 
  solution, 
  language = 'jsx',
  projectName = null,
  projectDescription = null
}) {
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [projectSaved, setProjectSaved] = useState(false);
  
  // Vérifier si le code est correct
  const checkCode = () => {
    // Dans une application réelle, nous aurions une vérification plus sophistiquée
    // Ici, nous faisons une comparaison simple en ignorant les espaces
    const normalizedUserCode = code.replace(/\s+/g, ' ').trim();
    const normalizedSolution = solution.replace(/\s+/g, ' ').trim();
    
    // Vérification basique - à améliorer selon les besoins spécifiques
    const correct = normalizedUserCode.includes('return') && 
                   (normalizedUserCode.includes('<h1>') || 
                    normalizedUserCode.includes('<div') || 
                    normalizedUserCode.includes('function'));
    
    setIsCorrect(correct);
    
    if (correct) {
      setResult({
        status: 'success',
        message: 'Bravo ! Votre code fonctionne correctement.'
      });
      
      // Sauvegarder le projet dans le portfolio si ce n'est pas déjà fait
      if (projectName && !projectSaved) {
        saveToPortfolio();
      }
    } else {
      setResult({
        status: 'error',
        message: 'Votre code ne produit pas le résultat attendu. Essayez encore.'
      });
    }
  };
  
  // Fonction pour sauvegarder le projet dans le portfolio
  const saveToPortfolio = () => {
    // Cette fonction sera implémentée complètement dans l'étape 014
    console.log("Projet sauvegardé pour le portfolio:", projectName);
    
    // Simuler la sauvegarde pour l'instant
    setProjectSaved(true);
    
    // Dans une implémentation réelle, nous enverrions le code au serveur
    const projectData = {
      name: projectName,
      description: projectDescription,
      code: code,
      language: language,
      createdAt: new Date().toISOString(),
      thumbnailUrl: null // Sera généré côté serveur
    };
    
    // Stocker temporairement dans localStorage pour démonstration
    try {
      const portfolioProjects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
      portfolioProjects.push(projectData);
      localStorage.setItem('portfolioProjects', JSON.stringify(portfolioProjects));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du projet:", error);
    }
  };
  
  // Réinitialiser le code
  const resetCode = () => {
    setCode(initialCode);
    setResult(null);
    setIsCorrect(false);
  };
  
  // Afficher/masquer la solution
  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };
  
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      {/* En-tête de l'exercice */}
      <div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        
        {projectName && (
          <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-200">
            <p className="text-blue-700 font-medium">
              <span className="mr-2">💼</span>
              Cet exercice contribuera à votre projet "{projectName}" dans votre portfolio.
            </p>
            {projectDescription && (
              <p className="text-sm text-blue-600 mt-1">{projectDescription}</p>
            )}
          </div>
        )}
      </div>
      
      {/* Éditeur et prévisualisation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Éditeur de code */}
        <div className="space-y-2">
          <div className="bg-gray-100 px-4 py-2 flex justify-between items-center rounded-t-md border border-gray-300">
            <span className="font-medium">Éditeur de code</span>
            <div className="flex space-x-2">
              <button 
                onClick={resetCode}
                className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded transition-colors"
              >
                Réinitialiser
              </button>
              <button 
                onClick={toggleSolution}
                className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded transition-colors"
              >
                {showSolution ? 'Cacher solution' : 'Voir solution'}
              </button>
            </div>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-80 p-4 font-mono text-sm focus:outline-none border border-gray-300 rounded-b-md"
            spellCheck="false"
          />
        </div>
        
        {/* Prévisualisation du rendu */}
        <div>
          <CodePreviewSandbox 
            code={code} 
            language={language} 
            height="320px" 
          />
        </div>
      </div>
      
      {/* Solution */}
      {showSolution && (
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <div className="bg-gray-100 px-4 py-2">
            <span className="font-medium">Solution</span>
          </div>
          <pre className="p-4 font-mono text-sm bg-gray-50 overflow-x-auto">{solution}</pre>
        </div>
      )}
      
      {/* Boutons d'action */}
      <div className="flex justify-between">
        <button
          onClick={checkCode}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Vérifier le code
        </button>
        
        {isCorrect && (
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Continuer
          </button>
        )}
      </div>
      
      {/* Message de résultat */}
      {result && (
        <div className={`p-4 rounded-md ${result.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <p className="font-medium">{result.message}</p>
          {result.status === 'success' && projectName && projectSaved && (
            <p className="mt-2 text-sm">
              <span className="font-medium">🎉 Félicitations !</span> Votre projet "{projectName}" a été ajouté à votre portfolio.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
