
import { NextResponse } from 'next/server';

// Cette fonction simulerait une vraie connexion à une API d'IA
// Dans une implémentation réelle, elle appellerait une API comme OpenAI/HuggingFace
async function analyzeUserProgress(userProgress, lessonHistory) {
  // Calculer les forces et faiblesses basées sur l'historique des leçons
  const completedLessons = lessonHistory.filter(lesson => lesson.completed);
  const failedQuizzes = lessonHistory.filter(lesson => 
    lesson.quizAttempts && lesson.quizAttempts.some(attempt => !attempt.passed)
  );
  
  // Analyser les sujets où l'utilisateur est fort
  const strengthsMap = {};
  completedLessons.forEach(lesson => {
    if (lesson.tags) {
      lesson.tags.forEach(tag => {
        strengthsMap[tag] = (strengthsMap[tag] || 0) + 1;
      });
    }
  });
  
  // Analyser les domaines où l'utilisateur a des difficultés
  const weaknessesMap = {};
  failedQuizzes.forEach(lesson => {
    if (lesson.tags) {
      lesson.tags.forEach(tag => {
        weaknessesMap[tag] = (weaknessesMap[tag] || 0) + 1;
      });
    }
  });
  
  // Convertir en tableaux et trier
  const strengths = Object.entries(strengthsMap)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag)
    .slice(0, 3);
    
  const weaknesses = Object.entries(weaknessesMap)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag)
    .slice(0, 3);
  
  // Utiliser une vraie base de données de leçons
  // Ici nous filtrons les leçons qui correspondent aux besoins de l'utilisateur
  const allLessons = await fetchLessonsFromDatabase();
  
  // Filtrer les leçons en fonction des forces et faiblesses
  let recommendations = [];
  
  // Ajouter des recommandations basées sur les faiblesses
  if (weaknesses.length > 0) {
    const weaknessLessons = allLessons.filter(lesson => 
      lesson.tags && weaknesses.some(weakness => lesson.tags.includes(weakness))
    );
    
    // Prendre les 2 premières leçons liées aux faiblesses
    recommendations = recommendations.concat(
      weaknessLessons
        .slice(0, 2)
        .map(lesson => ({
          ...lesson,
          priority: 'Élevée'
        }))
    );
  }
  
  // Ajouter une recommandation basée sur le niveau actuel pour progresser
  const currentLevel = userProgress.level || 'Débutant';
  const nextLevelLessons = allLessons.filter(lesson => 
    lesson.level === getNextLevel(currentLevel) && 
    !lessonHistory.some(l => l.id === lesson.id)
  );
  
  if (nextLevelLessons.length > 0) {
    recommendations.push({
      ...nextLevelLessons[0],
      priority: 'Moyenne'
    });
  }
  
  // Ajouter une leçon contribuant au portfolio si l'utilisateur n'en a pas encore fait
  const portfolioLessons = allLessons.filter(lesson => 
    lesson.contributeToPortfolio && 
    !lessonHistory.some(l => l.id === lesson.id)
  );
  
  if (portfolioLessons.length > 0) {
    recommendations.push({
      ...portfolioLessons[0],
      priority: 'Élevée'
    });
  }
  
  // Limiter à 3 recommandations et s'assurer qu'elles sont uniques
  recommendations = recommendations
    .filter((rec, index, self) => 
      index === self.findIndex(r => r.id === rec.id)
    )
    .slice(0, 3);
  
  // Générer une explication personnalisée
  let explanation = '';
  if (strengths.length > 0) {
    explanation += `Basé sur votre parcours, vous excellez en ${strengths.join(', ')}. `;
  } else {
    explanation += 'Vous débutez votre parcours d\'apprentissage. ';
  }
  
  if (weaknesses.length > 0) {
    explanation += `Je vous recommande de vous concentrer sur ${weaknesses.join(', ')} pour progresser plus rapidement.`;
  } else {
    explanation += 'Continuez sur votre lancée !';
  }
  
  return {
    strengths,
    weaknesses,
    recommendations,
    explanation
  };
}

// Fonction pour récupérer le niveau suivant
function getNextLevel(currentLevel) {
  const levels = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];
  const currentIndex = levels.indexOf(currentLevel);
  return levels[Math.min(currentIndex + 1, levels.length - 1)];
}

// Fonction simulant une récupération depuis la base de données
// Dans un cas réel, ce serait une requête à une vraie base de données
async function fetchLessonsFromDatabase() {
  // Simulation d'une attente comme lors d'une vraie requête DB
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return [
    {
      id: 'data-fetching',
      title: 'Data Fetching Avancé',
      description: 'Maîtrisez les techniques modernes de récupération de données dans Next.js',
      priority: 'Élevée',
      path: '/lessons/module/next-advanced/lesson/data-fetching',
      tags: ['API', 'DataFetching', 'Performance'],
      level: 'Intermédiaire'
    },
    {
      id: 'image-optimization',
      title: 'Optimisation des Images',
      description: 'Améliorez les performances de votre site avec le composant Image',
      priority: 'Moyenne',
      path: '/lessons/module/next-intermediate/lesson/image-optimization',
      tags: ['Images', 'Performance', 'Optimisation'],
      level: 'Intermédiaire'
    },
    {
      id: 'rest-api',
      title: 'Projet API RESTful',
      description: 'Créez une API complète avec Next.js pour renforcer votre portfolio',
      priority: 'Élevée',
      path: '/lessons/module/projects/lesson/rest-api',
      tags: ['API', 'Backend', 'REST'],
      contributeToPortfolio: true,
      level: 'Avancé'
    },
    {
      id: 'middleware',
      title: 'Middleware Next.js',
      description: 'Contrôlez le comportement de vos routes avec les middlewares',
      priority: 'Moyenne',
      path: '/lessons/module/next-advanced/lesson/middleware',
      tags: ['Middleware', 'Routes', 'ServerSide'],
      level: 'Avancé'
    },
    {
      id: 'streaming',
      title: 'Streaming des composants serveur',
      description: 'Améliorez l\'expérience utilisateur avec le streaming',
      priority: 'Élevée',
      path: '/lessons/module/next-advanced/lesson/streaming',
      tags: ['ServerComponents', 'Streaming', 'Performance'],
      level: 'Avancé'
    },
    {
      id: 'react-patterns',
      title: 'Patterns React Avancés',
      description: 'Maîtrisez les patterns de conception avancés en React',
      priority: 'Moyenne',
      path: '/lessons/module/react-patterns/lesson/compound',
      tags: ['React', 'Patterns', 'ComponentDesign'],
      level: 'Avancé'
    },
    {
      id: 'e2e-testing',
      title: 'Tests End-to-End',
      description: 'Apprenez à écrire des tests E2E pour votre application Next.js',
      priority: 'Moyenne',
      path: '/lessons/module/testing/lesson/e2e',
      tags: ['Testing', 'E2E', 'QualityAssurance'],
      level: 'Avancé'
    },
    {
      id: 'portfolio-project',
      title: 'Créez votre Portfolio Professionnel',
      description: 'Développez un portfolio qui impressionnera les recruteurs',
      priority: 'Élevée',
      path: '/lessons/module/projects/lesson/portfolio',
      tags: ['Portfolio', 'PersonalBranding', 'FrontEnd'],
      contributeToPortfolio: true,
      level: 'Intermédiaire'
    }
  ];
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { userProgress, lessonHistory } = body;
    
    if (!userProgress || !lessonHistory) {
      return NextResponse.json(
        { error: 'Les données de progression utilisateur sont requises' }, 
        { status: 400 }
      );
    }
    
    // Analyser les données utilisateur pour générer des recommandations
    const analysis = await analyzeUserProgress(userProgress, lessonHistory);
    
    return NextResponse.json({
      recommendations: analysis.recommendations,
      explanation: analysis.explanation,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses
    });
  } catch (error) {
    console.error('Erreur dans l\'API d\'analyse utilisateur:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'analyse des données utilisateur' }, 
      { status: 500 }
    );
  }
}
