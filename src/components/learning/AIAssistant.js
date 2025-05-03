
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function AIAssistant({ userProgress, lessonHistory }) {
  const [recommendations, setRecommendations] = useState([]);
  const [aiExplanation, setAiExplanation] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simuler l'analyse des performances de l'utilisateur
  useEffect(() => {
    if (userProgress && lessonHistory) {
      setIsAnalyzing(true);
      
      // Simule le traitement IA
      setTimeout(() => {
        // Analyse des forces et faiblesses basées sur les performances passées
        const strengths = determineStrengths(lessonHistory);
        const weaknesses = determineWeaknesses(lessonHistory);
        
        // Générer des recommandations personnalisées
        const newRecommendations = generateRecommendations(strengths, weaknesses, userProgress);
        setRecommendations(newRecommendations);
        
        // Explication personnalisée
        setAiExplanation(
          `Basé sur votre parcours, vous excellez en ${strengths.join(', ')}. ` +
          `Je vous recommande de vous concentrer sur ${weaknesses.join(', ')} pour progresser plus rapidement.`
        );
        
        setIsAnalyzing(false);
      }, 1500);
    }
  }, [userProgress, lessonHistory]);

  // Fonctions d'analyse (à implémenter avec une vraie IA)
  const determineStrengths = (history) => {
    // Analyser les sujets où l'utilisateur a eu de bonnes performances
    return ['composants React', 'styles CSS'];
  };

  const determineWeaknesses = (history) => {
    // Analyser les sujets où l'utilisateur a eu des difficultés
    return ['API Routes', 'optimisation des performances'];
  };

  const generateRecommendations = (strengths, weaknesses, progress) => {
    // Générer des recommandations basées sur l'analyse
    return [
      {
        title: 'Data Fetching Avancé',
        description: 'Maîtrisez les techniques modernes de récupération de données dans Next.js',
        priority: 'Élevée',
        path: '/lessons/module/next-advanced/lesson/data-fetching'
      },
      {
        title: 'Optimisation des Images',
        description: 'Améliorez les performances de votre site avec le composant Image',
        priority: 'Moyenne',
        path: '/lessons/module/next-intermediate/lesson/image-optimization'
      },
      {
        title: 'Projet API RESTful',
        description: 'Créez une API complète avec Next.js pour renforcer votre portfolio',
        priority: 'Élevée',
        path: '/lessons/module/projects/lesson/rest-api',
        contributeToPortfolio: true
      }
    ];
  };

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
      ) : (
        <>
          <div className="mb-4 p-4 bg-indigo-50 rounded-md">
            <p className="text-gray-700">{aiExplanation}</p>
          </div>
          
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
      )}
    </div>
  );
}
