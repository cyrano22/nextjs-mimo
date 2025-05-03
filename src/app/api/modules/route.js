
import { NextResponse } from 'next/server';

export async function GET() {
  // Données des modules (dans une application réelle, ces données viendraient d'une base de données)
  const modulesData = [
    {
      id: "1",
      title: "Introduction à Next.js",
      description: "Découvrez les bases de Next.js, ses avantages par rapport à React et comment configurer votre premier projet.",
      level: "Débutant",
      image: "/nextjs-intro.jpg",
      lessons: [
        { id: "1", title: "Qu'est-ce que Next.js", type: "theory", duration: "15 min", xpReward: 10, completed: false },
        { id: "2", title: "Avantages de Next.js", type: "theory", duration: "10 min", xpReward: 10, completed: false },
        { id: "3", title: "Installation et Configuration", type: "exercise", duration: "20 min", xpReward: 15, completed: false }
      ]
    },
    {
      id: "2",
      title: "Fondamentaux de Next.js",
      description: "Maîtrisez le routage, les pages et la récupération de données dans Next.js.",
      level: "Intermédiaire",
      image: "/nextjs-fundamentals.jpg",
      lessons: [
        { id: "1", title: "Structure des Fichiers", type: "theory", duration: "15 min", xpReward: 10, completed: false },
        { id: "2", title: "Système de Routage", type: "theory", duration: "20 min", xpReward: 15, completed: false },
        { id: "3", title: "Pages et Composants", type: "exercise", duration: "25 min", xpReward: 20, completed: false },
        { id: "4", title: "Data Fetching", type: "project", duration: "30 min", xpReward: 25, completed: false }
      ]
    },
    {
      id: "3",
      title: "Fonctionnalités Avancées",
      description: "Explorez les API Routes, les middlewares, l'optimisation des images et l'internationalisation.",
      level: "Avancé",
      image: "/nextjs-advanced.jpg",
      lessons: [
        { id: "1", title: "API Routes", type: "theory", duration: "20 min", xpReward: 15, completed: false },
        { id: "2", title: "Middleware", type: "exercise", duration: "25 min", xpReward: 20, completed: false },
        { id: "3", title: "Optimisation des Images", type: "project", duration: "30 min", xpReward: 25, completed: false },
        { id: "4", title: "Internationalisation", type: "quiz", duration: "20 min", xpReward: 15, completed: false }
      ]
    },
    {
      id: "4",
      title: "Déploiement et Performance",
      description: "Apprenez à déployer et optimiser vos applications Next.js pour des performances maximales.",
      level: "Expert",
      image: "/nextjs-deployment.jpg",
      lessons: [
        { id: "1", title: "Déploiement sur Vercel", type: "theory", duration: "20 min", xpReward: 15, completed: false },
        { id: "2", title: "Déploiement sur Cloudflare", type: "exercise", duration: "25 min", xpReward: 20, completed: false },
        { id: "3", title: "Optimisation des Performances", type: "project", duration: "35 min", xpReward: 30, completed: false },
        { id: "4", title: "Analytics et Monitoring", type: "quiz", duration: "20 min", xpReward: 15, completed: false }
      ]
    }
  ];
  
  return NextResponse.json(modulesData);
}
