
import { useState } from 'react';

export default function CodeAnalyzer({ code, language }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeCode = async () => {
    setLoading(true);
    
    // Simuler une analyse IA du code
    setTimeout(() => {
      // Cette fonction simule une analyse de code
      // Dans une implémentation réelle, on utiliserait une API d'IA
      const simulatedAnalysis = performCodeAnalysis(code, language);
      setAnalysis(simulatedAnalysis);
      setLoading(false);
    }, 1500);
  };

  const performCodeAnalysis = (code, language) => {
    // Simulation d'analyse de code basique
    // Dans une vraie implémentation, ce serait une API d'IA
    
    const results = {
      score: 0,
      suggestions: [],
      bestPractices: [],
      performance: []
    };
    
    // Exemple de règles simplifiées
    if (language === 'javascript' || language === 'jsx') {
      // Vérifier les fonctions fléchées vs. fonctions traditionnelles
      if (code.includes('function(') && !code.includes('=>')) {
        results.suggestions.push({
          type: 'style',
          message: 'Considérez utiliser des fonctions fléchées pour plus de concision',
          example: 'const add = (a, b) => a + b;'
        });
      }
      
      // Vérifier les console.log laissés dans le code
      if (code.includes('console.log')) {
        results.suggestions.push({
          type: 'debug',
          message: 'Pensez à supprimer les console.log avant la mise en production',
          example: '// Supprimez ou commentez: console.log(...)'
        });
      }
      
      // Vérifier l'utilisation de let/const vs var
      if (code.includes('var ')) {
        results.suggestions.push({
          type: 'modern',
          message: 'Préférez const et let à var pour une meilleure gestion de la portée',
          example: 'const x = 1; // pour les valeurs immuables\nlet y = 2; // pour les variables'
        });
      }
    }
    
    if (language === 'jsx' || code.includes('import React')) {
      // Vérifier les imports inutilisés
      if (code.includes('import React from \'react\';') && !code.includes('React.')) {
        results.suggestions.push({
          type: 'optimization',
          message: "L'import de React n'est pas nécessaire si vous n'utilisez pas directement React.*",
          example: "// Supprimez si inutilisé:\n// import React from 'react';"
        });
      }
      
      // Vérifier les tableaux sans key dans les boucles
      if ((code.includes('.map(') || code.includes('.forEach(')) && !code.includes('key=')) {
        results.suggestions.push({
          type: 'bestpractice',
          message: 'Ajoutez un attribut "key" unique lors de la génération de listes avec map()',
          example: '{items.map((item) => <div key={item.id}>{item.name}</div>)}'
        });
      }
    }
    
    // Calcul du score
    const maxScore = 100;
    const penalty = 10 * results.suggestions.length;
    results.score = Math.max(0, maxScore - penalty);
    
    // Suggestions de meilleures pratiques
    results.bestPractices = [
      'Utilisez des noms de variables descriptifs',
      'Découpez les fonctions complexes en fonctions plus petites',
      'Commentez votre code pour expliquer le "pourquoi", pas le "comment"'
    ];
    
    return results;
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4 my-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Analyseur de Code</h2>
        <button 
          onClick={analyzeCode}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Analyse en cours...' : 'Analyser mon code'}
        </button>
      </div>
      
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          <span className="ml-3 text-gray-600">Analyse en cours...</span>
        </div>
      )}
      
      {analysis && !loading && (
        <div className="mt-4">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-2xl font-bold text-indigo-600">{analysis.score}</span>
            </div>
            <div className="ml-4">
              <h3 className="font-semibold">Score de qualité</h3>
              <p className="text-sm text-gray-600">
                {analysis.score >= 90 ? 'Excellent code!' : 
                 analysis.score >= 70 ? 'Bon code avec quelques améliorations possibles' : 
                 'Des améliorations sont recommandées'}
              </p>
            </div>
          </div>
          
          {analysis.suggestions.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Suggestions d'amélioration</h3>
              <div className="space-y-2">
                {analysis.suggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 bg-amber-50 rounded-md border border-amber-200">
                    <div className="flex items-start">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 mt-1.5 ${
                        suggestion.type === 'optimization' ? 'bg-red-500' :
                        suggestion.type === 'bestpractice' ? 'bg-indigo-500' :
                        suggestion.type === 'debug' ? 'bg-orange-500' :
                        'bg-blue-500'
                      }`}></span>
                      <div>
                        <p className="text-sm font-medium">{suggestion.message}</p>
                        {suggestion.example && (
                          <pre className="mt-1 text-xs p-2 bg-gray-100 rounded">{suggestion.example}</pre>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h3 className="font-semibold mb-2">Bonnes pratiques à suivre</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {analysis.bestPractices.map((practice, index) => (
                <li key={index}>{practice}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
