"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import LessonContent from './LessonContent';

export default function LessonPage() {
  const params = useParams();
  const { moduleId, lessonId } = params;
  const [lesson, setLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données de la leçon depuis une API
    setTimeout(() => {
      // Données fictives pour la démonstration
      setLesson({
        id: parseInt(lessonId),
        title: `Leçon ${lessonId} : Introduction à Next.js`,
        description: "Découvrez les bases de Next.js et comment il améliore React.",
        content: `
          <h2>Qu'est-ce que Next.js?</h2>
          <p>Next.js est un framework React qui offre une architecture basée sur les fichiers pour créer des applications Web modernes.</p>
          <p>Il fournit de nombreuses fonctionnalités intégrées comme:</p>
          <ul>
            <li>Rendu côté serveur (SSR)</li>
            <li>Génération de sites statiques (SSG)</li>
            <li>Routage basé sur le système de fichiers</li>
            <li>Optimisation automatique des images</li>
            <li>Support TypeScript natif</li>
          </ul>
          <h3>Pourquoi utiliser Next.js?</h3>
          <p>Next.js résout de nombreux problèmes courants dans le développement d'applications React, comme:</p>
          <ul>
            <li>Configuration complexe (webpack, babel, etc.)</li>
            <li>Optimisation pour les moteurs de recherche</li>
            <li>Performance des chargements initiaux</li>
            <li>Gestion du routage</li>
          </ul>
        `,
        examples: [
          {
            code: `// pages/index.js
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Ma première app Next.js</title>
        <meta name="description" content="Créé avec Next.js" />
      </Head>

      <main>
        <h1>Bienvenue dans Next.js!</h1>
        <p>Découvrez comment Next.js facilite le développement React.</p>
      </main>
    </div>
  )
}`,
            language: "jsx"
          }
        ],
        practice: {
          initialCode: `// Créez un composant Next.js qui affiche un titre et un paragraphe
export default function MaPage() {
  // Écrivez votre code ici
}`,
          solution: `export default function MaPage() {
  return (
    <div>
      <h1>Mon premier composant Next.js</h1>
      <p>Ceci est un paragraphe dans mon composant.</p>
    </div>
  )
}`,
          language: "jsx"
        },
        quiz: {
          questions: [
            {
              question: "Quelle fonctionnalité Next.js permet de générer des pages HTML statiques au moment de la compilation?",
              options: [
                "Server-Side Rendering (SSR)",
                "Static Site Generation (SSG)",
                "Client-Side Rendering (CSR)",
                "Incremental Static Regeneration (ISR)"
              ],
              correctAnswer: "Static Site Generation (SSG)"
            },
            {
              question: "Comment crée-t-on une nouvelle route dans Next.js?",
              options: [
                "En ajoutant un nouveau fichier dans le dossier 'routes'",
                "En configurant le fichier de routage principal",
                "En créant un nouveau fichier ou dossier dans le répertoire 'pages' ou 'app'",
                "En utilisant la fonction createRoute()"
              ],
              correctAnswer: "En créant un nouveau fichier ou dossier dans le répertoire 'pages' ou 'app'"
            },
            {
              question: "Quel hook Next.js permet de naviguer entre les pages?",
              options: [
                "useHistory()",
                "useNavigation()",
                "useRouter()",
                "useLink()"
              ],
              correctAnswer: "useRouter()"
            }
          ]
        }
      });
      setIsLoading(false);
    }, 1000);
  }, [lessonId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>

          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>

          <div className="h-64 bg-gray-200 rounded mb-8"></div>

          <div className="h-10 bg-gray-200 rounded w-40"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <LessonContent lesson={lesson} moduleId={moduleId} lessonId={lessonId} />
    </div>
  );
}