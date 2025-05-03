import Link from 'next/link';
import CodeEditor from '../../../../../../components/editor/CodeEditor';
import LessonProgress from '../../../../../../components/lessons/LessonProgress';
import QuizComponent from '../../../../../../components/lessons/QuizComponent';
import ExerciseComponent from '../../../../../../components/lessons/ExerciseComponent';

export default function LessonPage({ params }) {
  const { moduleId, lessonId } = params;
  
  // Données de la leçon (dans une application réelle, ces données viendraient d'une base de données)
  const lessonData = {
    "1-1": {
      title: "Qu'est-ce que Next.js",
      content: `
        <h2>Introduction à Next.js</h2>
        <p>Next.js est un framework React qui permet de créer des applications web complètes avec des fonctionnalités avancées comme le rendu côté serveur, la génération de sites statiques, et bien plus encore.</p>
        
        <p>Créé par Vercel, Next.js simplifie le développement d'applications React en fournissant une structure et des outils qui résolvent de nombreux problèmes courants.</p>
        
        <h3>Historique de Next.js</h3>
        <p>Next.js a été lancé en 2016 par Vercel (anciennement ZEIT) pour résoudre les défis du rendu côté serveur avec React. Depuis, il est devenu l'un des frameworks les plus populaires pour le développement d'applications React.</p>
        
        <h3>Next.js dans l'écosystème React</h3>
        <p>Alors que React est une bibliothèque pour construire des interfaces utilisateur, Next.js est un framework complet qui s'appuie sur React et ajoute des fonctionnalités supplémentaires pour faciliter le développement d'applications web complètes.</p>
      `,
      example: {
        title: "Comparaison entre React et Next.js",
        code: `// Application React basique
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <h1>Hello, World!</h1>;
}

ReactDOM.render(<App />, document.getElementById('root'));

// Application Next.js basique
// pages/index.js
export default function Home() {
  return <h1>Hello, World!</h1>;
}`,
        explanation: "Dans React, vous devez configurer manuellement le rendu dans le DOM. Next.js simplifie cela avec son système de routage basé sur les fichiers, où chaque fichier dans le dossier 'pages' devient automatiquement une route."
      },
      exercise: {
        title: "Identifier les avantages de Next.js",
        description: "Parmi les options suivantes, sélectionnez les avantages qu'offre Next.js par rapport à React seul.",
        options: [
          { id: 1, text: "Rendu côté serveur (SSR)", correct: true },
          { id: 2, text: "Génération de sites statiques (SSG)", correct: true },
          { id: 3, text: "Routage basé sur les fichiers", correct: true },
          { id: 4, text: "Optimisation des images", correct: true },
          { id: 5, text: "Gestion d'état intégrée", correct: false },
          { id: 6, text: "Animations intégrées", correct: false }
        ],
        type: "multiple"
      },
      quiz: {
        title: "Quiz sur Next.js",
        questions: [
          {
            question: "Qui a créé Next.js ?",
            options: ["Facebook", "Google", "Vercel", "Amazon"],
            correctAnswer: "Vercel"
          },
          {
            question: "Quelle année a été lancé Next.js ?",
            options: ["2014", "2016", "2018", "2020"],
            correctAnswer: "2016"
          },
          {
            question: "Next.js est basé sur quelle bibliothèque ?",
            options: ["Angular", "Vue", "React", "Svelte"],
            correctAnswer: "React"
          }
        ]
      },
      project: {
        title: "Créer une page simple avec Next.js",
        description: "Dans cet exercice, vous allez créer une page d'accueil simple avec Next.js qui affiche un titre et un paragraphe.",
        initialCode: `// pages/index.js
export default function Home() {
  // Complétez le code ici
}`,
        solution: `// pages/index.js
export default function Home() {
  return (
    <div>
      <h1>Ma première page Next.js</h1>
      <p>Bienvenue dans mon application Next.js !</p>
    </div>
  );
}`
      }
    },
    // Autres leçons seraient définies ici
  };
  
  const lessonKey = `${moduleId}-${lessonId}`;
  const lesson = lessonData[lessonKey];
  
  if (!lesson) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Leçon non trouvée</h1>
        <p className="mb-6">La leçon que vous recherchez n'existe pas.</p>
        <Link href={`/lessons/module/${moduleId}`} className="btn-primary">
          Retour au module
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <Link href="/lessons" className="text-indigo-600 hover:text-indigo-800 mr-2">
            Modules
          </Link>
          <span className="text-gray-500">/</span>
          <Link href={`/lessons/module/${moduleId}`} className="text-indigo-600 hover:text-indigo-800 mx-2">
            Module {moduleId}
          </Link>
          <span className="text-gray-500">/</span>
          <span className="ml-2 text-gray-700">Leçon {lessonId}</span>
        </div>
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Contenu théorique */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Théorie</h2>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content }}></div>
          </div>
          
          {/* Exemple de code */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">{lesson.example.title}</h2>
            <div className="mb-4 bg-gray-50 rounded-md p-4 font-mono text-sm">
              <pre>{lesson.example.code}</pre>
            </div>
            <p className="text-gray-700">{lesson.example.explanation}</p>
          </div>
          
          {/* Exercice interactif */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Exercice pratique</h2>
            <ExerciseComponent exercise={lesson.exercise} />
          </div>
          
          {/* Quiz de validation */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Quiz</h2>
            <QuizComponent quiz={lesson.quiz} />
          </div>
          
          {/* Projet pratique */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">{lesson.project.title}</h2>
            <p className="mb-4 text-gray-700">{lesson.project.description}</p>
            <CodeEditor 
              initialCode={lesson.project.initialCode} 
              solution={lesson.project.solution} 
            />
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Progression de la leçon */}
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Votre progression</h2>
            <LessonProgress />
            
            <div className="mt-6 space-y-4">
              <h3 className="font-medium">Navigation</h3>
              <div className="flex justify-between">
                {parseInt(lessonId) > 1 ? (
                  <Link href={`/lessons/module/${moduleId}/lesson/${parseInt(lessonId) - 1}`} className="text-indigo-600 hover:text-indigo-800">
                    ← Leçon précédente
                  </Link>
                ) : (
                  <span className="text-gray-400">← Leçon précédente</span>
                )}
                
                <Link href={`/lessons/module/${moduleId}/lesson/${parseInt(lessonId) + 1}`} className="text-indigo-600 hover:text-indigo-800">
                  Leçon suivante →
                </Link>
              </div>
              
              <div className="pt-4 border-t border-gray-200 mt-4">
                <Link href={`/lessons/module/${moduleId}`} className="text-indigo-600 hover:text-indigo-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Retour au module
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
