
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const moduleId = params.moduleId;
  
  // Données des modules (dans une application réelle, ces données viendraient d'une base de données)
  const modulesData = {
    "1": {
      title: "Introduction à Next.js",
      description: "Découvrez les bases de Next.js, ses avantages par rapport à React et comment configurer votre premier projet.",
      level: "Débutant",
      lessons: [
        { id: 1, title: "Qu'est-ce que Next.js" },
        { id: 2, title: "Avantages de Next.js" },
        { id: 3, title: "Installation et Configuration" }
      ]
    },
    "2": {
      title: "Fondamentaux de Next.js",
      description: "Maîtrisez le routage, les pages et la récupération de données dans Next.js.",
      level: "Intermédiaire",
      lessons: [
        { id: 1, title: "Structure des Fichiers" },
        { id: 2, title: "Système de Routage" },
        { id: 3, title: "Pages et Composants" },
        { id: 4, title: "Data Fetching" }
      ]
    },
    "3": {
      title: "Fonctionnalités Avancées",
      description: "Explorez les API Routes, les middlewares, l'optimisation des images et l'internationalisation.",
      level: "Avancé",
      lessons: [
        { id: 1, title: "API Routes" },
        { id: 2, title: "Middleware" },
        { id: 3, title: "Optimisation des Images" },
        { id: 4, title: "Internationalisation" }
      ]
    },
    "4": {
      title: "Déploiement et Performance",
      description: "Apprenez à déployer et optimiser vos applications Next.js pour des performances maximales.",
      level: "Expert",
      lessons: [
        { id: 1, title: "Déploiement sur Vercel" },
        { id: 2, title: "Déploiement sur Cloudflare" },
        { id: 3, title: "Optimisation des Performances" },
        { id: 4, title: "Analytics et Monitoring" }
      ]
    }
  };
  
  // Vérifier si le module existe
  if (!modulesData[moduleId]) {
    return NextResponse.json({ error: "Module non trouvé" }, { status: 404 });
  }
  
  return NextResponse.json(modulesData[moduleId]);
}
