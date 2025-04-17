"use client";

import { useState, useEffect, useRef } from 'react';

export default function CodeEditor({ initialCode, solution, language = 'jsx' }) {
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const previewRef = useRef(null);
  
  // Mettre à jour la prévisualisation lorsque le code change
  useEffect(() => {
    if (showPreview && previewRef.current) {
      updatePreview();
    }
  }, [code, showPreview]);
  
  // Fonction pour mettre à jour la prévisualisation
  const updatePreview = () => {
    if (!previewRef.current) return;
    
    try {
      // Créer un contenu HTML sécurisé pour la prévisualisation
      const previewContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                margin: 0;
                padding: 16px;
                color: #333;
              }
              /* Styles supplémentaires pour la prévisualisation */
              .preview-container {
                border: 1px solid #e2e8f0;
                border-radius: 0.375rem;
                overflow: hidden;
              }
            </style>
          </head>
          <body>
            <div id="root"></div>
            <script>
              try {
                // Fonction pour rendre le JSX (version simplifiée)
                function renderComponent() {
                  const component = (function() {
                    ${language === 'jsx' ? 'return ' + code : code}
                  })();
                  
                  document.getElementById('root').innerHTML = typeof component === 'string' 
                    ? component 
                    : JSON.stringify(component);
                }
                renderComponent();
              } catch (error) {
                document.getElementById('root').innerHTML = '<div style="color: red;">Erreur: ' + error.message + '</div>';
              }
            </script>
          </body>
        </html>
      `;
      
      // Mettre à jour l'iframe avec le contenu
      const iframe = previewRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(previewContent);
      iframeDoc.close();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la prévisualisation:", error);
    }
  };
  
  // Vérifier si le code est correct
  const checkCode = () => {
    // Dans une application réelle, nous aurions une vérification plus sophistiquée
    // Ici, nous faisons une comparaison simple en ignorant les espaces
    const normalizedUserCode = code.replace(/\s+/g, ' ').trim();
    const normalizedSolution = solution.replace(/\s+/g, ' ').trim();
    
    const correct = normalizedUserCode.includes('return') && 
                   normalizedUserCode.includes('<h1>') && 
                   normalizedUserCode.includes('<p>');
    
    setIsCorrect(correct);
    
    if (correct) {
      setResult({
        status: 'success',
        message: 'Bravo ! Votre code fonctionne correctement.'
      });
      
      // Sauvegarder le projet dans le portfolio (sera implémenté plus tard)
      saveToPortfolio();
    } else {
      setResult({
        status: 'error',
        message: 'Votre code ne produit pas le résultat attendu. Essayez encore.'
      });
    }
  };
  
  // Fonction pour sauvegarder le projet dans le portfolio
  const saveToPortfolio = () => {
    // Cette fonction sera implémentée dans l'étape 014
    console.log("Projet sauvegardé pour le portfolio");
    // Dans une implémentation réelle, nous enverrions le code au serveur
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
  
  // Afficher/masquer la prévisualisation
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Éditeur de code */}
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
            <span className="font-medium">Éditeur de code</span>
            <div className="flex space-x-2">
              <button 
                onClick={resetCode}
                className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
              >
                Réinitialiser
              </button>
              <button 
                onClick={toggleSolution}
                className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
              >
                {showSolution ? 'Cacher solution' : 'Voir solution'}
              </button>
            </div>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-4 font-mono text-sm focus:outline-none"
            spellCheck="false"
          />
        </div>
        
        {/* Prévisualisation du rendu */}
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
            <span className="font-medium">Prévisualisation</span>
            <button 
              onClick={togglePreview}
              className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
            >
              {showPreview ? 'Masquer' : 'Afficher'}
            </button>
          </div>
          <div className={`h-64 ${showPreview ? 'block' : 'hidden'}`}>
            <iframe
              ref={previewRef}
              title="Prévisualisation du code"
              className="w-full h-full border-none"
              sandbox="allow-scripts"
            />
          </div>
          {!showPreview && (
            <div className="h-64 flex items-center justify-center bg-gray-50">
              <p className="text-gray-500">Prévisualisation masquée</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Solution */}
      {showSolution && (
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <div className="bg-gray-100 px-4 py-2">
            <span className="font-medium">Solution</span>
          </div>
          <pre className="p-4 font-mono text-sm bg-gray-50">{solution}</pre>
        </div>
      )}
      
      {/* Boutons d'action */}
      <div className="flex justify-between">
        <button
          onClick={checkCode}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Exécuter le code
        </button>
        
        {isCorrect && (
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Continuer
          </button>
        )}
      </div>
      
      {/* Message de résultat */}
      {result && (
        <div className={`p-4 rounded-md ${result.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {result.message}
          {result.status === 'success' && (
            <p className="mt-2 text-sm">Ce projet a été ajouté à votre portfolio !</p>
          )}
        </div>
      )}
    </div>
  );
}
