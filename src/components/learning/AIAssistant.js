
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function AIAssistant({ userProgress, lessonHistory }) {
  const [recommendations, setRecommendations] = useState([]);
  const [aiExplanation, setAiExplanation] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  // Analyse réelle des performances de l'utilisateur
  useEffect(() => {
    if (userProgress && lessonHistory) {
      setIsAnalyzing(true);
      setError(null);
      
      // Appel API réel pour l'analyse
      fetch('/api/ai-assistant/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userProgress,
          lessonHistory
        }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de l\'analyse IA');
        }
        return response.json();
      })
      .then(data => {
        setRecommendations(data.recommendations || []);
        setAiExplanation(data.explanation || '');
      })
      .catch(err => {
        console.error('Erreur IA Assistant:', err);
        setError(err.message);
      })
      .finally(() => {
        setIsAnalyzing(false);
      });
    }
  }, [userProgress, lessonHistory]);

  return (
    <div className="bg-white border rounded-lg shadow-md p-6 my-4">
      <div className="flex items-center mb-4">
        <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800">Assistant d'Apprentissage IA</h2>
      </div>
      
      {isAnalyzing ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          <span className="ml-3 text-gray-600">Analyse de votre parcours...</span>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          <p>Impossible de générer des recommandations: {error}</p>
        </div>
      ) : (
        <>
          {aiExplanation && (
            <div className="mb-4 p-4 bg-indigo-50 rounded-md">
              <p className="text-gray-700">{aiExplanation}</p>
            </div>
          )}
          
          {recommendations.length > 0 ? (
            <>
              <h3 className="font-semibold text-gray-700 mb-2">Recommandations personnalisées</h3>
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start border-l-4 border-indigo-500 pl-3 py-2">
                    <div className="flex-1">
                      <h4 className="font-medium">
                        {rec.title}
                        {rec.contributeToPortfolio && (
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Portfolio</span>
                        )}
                      </h4>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                      <div className="mt-1 flex items-center">
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          rec.priority === 'Élevée' ? 'bg-red-100 text-red-800' : 
                          rec.priority === 'Moyenne' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'
                        )}>
                          Priorité: {rec.priority}
                        </span>
                      </div>
                    </div>
                    <a 
                      href={rec.path}
                      className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors"
                    >
                      Commencer
                    </a>
                  </div>
                ))}
              </div>
            </>
          ) : !isAnalyzing && !error ? (
            <p className="text-gray-600">Continuez à suivre des leçons pour obtenir des recommandations personnalisées.</p>
          ) : null}
        </>
      )}
    </div>
  );
}
