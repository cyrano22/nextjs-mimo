
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LessonsPage() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchModules() {
      try {
        const res = await fetch('/api/modules');
        if (!res.ok) throw new Error('Failed to fetch modules');
        
        const data = await res.json();
        // Assurer que tous les modules ont lessons comme tableau
        const normalizedData = data.map(module => {
          // Si lessons est un nombre, transformer en tableau
          if (typeof module.lessons === 'number' || !Array.isArray(module.lessons)) {
            const lessonCount = typeof module.lessons === 'number' ? module.lessons : 0;
            // Créer un tableau de leçons factices si nécessaire
            const lessonArray = [];
            if (module.content && Array.isArray(module.content)) {
              // Convertir le contenu en leçons
              return {
                ...module,
                lessons: module.content
              };
            } else {
              // Générer des leçons génériques
              for (let i = 0; i < lessonCount; i++) {
                lessonArray.push({
                  id: `${module.id}-${i+1}`,
                  title: `Leçon ${i+1}`,
                  type: "theory",
                  duration: "20 min"
                });
              }
              return {
                ...module,
                lessons: lessonArray
              };
            }
          }
          return module;
        });
        setModules(normalizedData);
      } catch (error) {
        console.error("Error fetching modules:", error);
        // Données de secours en cas d'échec de l'API
        setModules([
          {
            id: "1",
            title: "Introduction à Next.js",
            description: "Découvrez les bases de Next.js, ses avantages par rapport à React et comment configurer votre premier projet.",
            level: "Débutant",
            image: "/images/modules/nextjs-intro.jpg",
            progressPercent: 0,
            lessons: [
              { id: "1-1", title: "Qu'est-ce que Next.js", type: "theory", duration: "15 min" },
              { id: "1-2", title: "Avantages de Next.js", type: "theory", duration: "10 min" },
              { id: "1-3", title: "Installation et Configuration", type: "exercise", duration: "20 min" }
            ]
          },
          {
            id: "2",
            title: "Fondamentaux de Next.js",
            description: "Maîtrisez le routage, les pages et la récupération de données dans Next.js.",
            level: "Intermédiaire",
            image: "/images/modules/nextjs-fundamentals.jpg",
            progressPercent: 0,
            lessons: [
              { id: "2-1", title: "Structure des Fichiers", type: "theory", duration: "15 min" },
              { id: "2-2", title: "Système de Routage", type: "theory", duration: "20 min" },
              { id: "2-3", title: "Pages et Composants", type: "exercise", duration: "25 min" },
              { id: "2-4", title: "Data Fetching", type: "project", duration: "30 min" }
            ]
          },
          {
            id: "3",
            title: "JavaScript Fondamentaux",
            description: "Maîtrisez les bases de JavaScript, le langage essentiel pour le développement web moderne.",
            level: "Débutant",
            image: "/images/modules/javascript-basics.jpg",
            progressPercent: 0,
            lessons: [
              { id: "3-1", title: "Variables et Types", type: "theory", duration: "20 min" },
              { id: "3-2", title: "Fonctions", type: "theory", duration: "25 min" },
              { id: "3-3", title: "Objets et tableaux", type: "exercise", duration: "30 min" },
              { id: "3-4", title: "Événements et DOM", type: "exercise", duration: "30 min" }
            ]
          },
          {
            id: "4",
            title: "React Fondamentaux",
            description: "Apprenez React, la bibliothèque qui révolutionne la création d'interfaces utilisateur.",
            level: "Intermédiaire",
            image: "/images/modules/react-basics.jpg",
            progressPercent: 0,
            lessons: [
              { id: "4-1", title: "Components et Props", type: "theory", duration: "20 min" },
              { id: "4-2", title: "State et Cycle de vie", type: "theory", duration: "25 min" },
              { id: "4-3", title: "Gestion des événements", type: "exercise", duration: "25 min" },
              { id: "4-4", title: "Listes et clés", type: "exercise", duration: "20 min" }
            ]
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchModules();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Parcours d'apprentissage</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((module) => (
            <div key={module.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">{module.title}</h2>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">{module.level}</span>
              </div>
              <p className="text-gray-600 mb-4">{module.description}</p>
              
              <div className="space-y-2 mb-4">
                {module.lessons && module.lessons.map((lesson, index) => (
                  <div key={`${module.id}-${lesson.id}`} className="flex items-center">
                    <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-xs font-medium text-indigo-600">{index + 1}</span>
                    </div>
                    <Link href={`/lessons/module/${module.id}/lesson/${lesson.id}`} className="text-gray-700 hover:text-indigo-600">
                      {lesson.title}
                    </Link>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  <span>{module.lessons ? module.lessons.length : 0} leçons</span> • <span>{module.duration || "Variable"}</span>
                </div>
                <Link href={`/lessons/module/${module.id}`} className="text-indigo-600 font-medium hover:text-indigo-800">
                  Voir le module →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
