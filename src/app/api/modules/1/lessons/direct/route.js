import { NextResponse } from 'next/server';

export async function GET(request) {
  // Données de la leçon 1-2, copiées du fichier de définition de leçon
  const lesson = {
    title: "Avantages de Next.js",
    content: `
      <h2>Pourquoi choisir Next.js ?</h2>
      <p>Next.js offre de nombreux avantages par rapport à une application React standard. Voici les principaux :</p>
      
      <h3>1. Rendu hybride</h3>
      <p>Next.js permet de choisir entre le rendu côté serveur (SSR), la génération de sites statiques (SSG), ou le rendu côté client selon les besoins de chaque page.</p>
      
      <h3>2. Optimisation des performances</h3>
      <p>Next.js intègre automatiquement des optimisations de performance comme le code splitting, le prefetching, et l'optimisation des images.</p>
      
      <h3>3. Excellent Developer Experience</h3>
      <p>Le rechargement à chaud (Hot Module Replacement), la compilation rapide et les messages d'erreur clairs améliorent considérablement l'expérience du développeur.</p>
      
      <h3>4. SEO amélioré</h3>
      <p>Grâce au rendu côté serveur, les moteurs de recherche peuvent facilement indexer votre contenu, ce qui améliore le référencement.</p>
    `,
    example: {
      title: "Exemple de code Next.js vs React standard",
      code: `// Avec React standard (client-side)
import { useEffect, useState } from 'react';

function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <p>Chargement...</p>;
  return <div>{data.title}</div>;
}

// Avec Next.js (getServerSideProps)
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data } };
}

function HomePage({ data }) {
  return <div>{data.title}</div>;
}`,
      explanation: "Dans l'exemple ci-dessus, la version Next.js charge les données côté serveur avant que la page ne soit envoyée au client, ce qui élimine l'état de chargement et améliore le SEO."
    },
    exercise: {
      title: "Identifier les avantages de Next.js",
      description: "Parmi les affirmations suivantes, identifiez celles qui sont correctes concernant Next.js.",
      type: "multiple",
      options: [
        { id: 1, text: "Next.js ne permet que le rendu côté serveur", correct: false },
        { id: 2, text: "Next.js est plus difficile à configurer que React", correct: false },
        { id: 3, text: "Le routage basé sur les fichiers simplifie la structure du projet", correct: true },
        { id: 4, text: "L'optimisation des images est intégrée à Next.js", correct: true },
        { id: 5, text: "Next.js n'est pas compatible avec les API RESTful", correct: false }
      ]
    },
    quiz: {
      title: "Quiz sur les avantages de Next.js",
      questions: [
        {
          question: "Quel type de rendu Next.js permet-il ?",
          options: ["Uniquement SSR", "Uniquement CSR", "Uniquement SSG", "SSR, SSG et CSR"],
          correctAnswer: "SSR, SSG et CSR"
        },
        {
          question: "Quelle fonctionnalité Next.js facilite le routage ?",
          options: ["Routes manuelles", "Système de fichiers", "Configuration externe", "Middleware uniquement"],
          correctAnswer: "Système de fichiers"
        },
        {
          question: "Comment Next.js améliore-t-il les performances ?",
          options: ["En ignorant le SEO", "En limitant les fonctionnalités React", "Par le code splitting automatique", "En désactivant JavaScript"],
          correctAnswer: "Par le code splitting automatique"
        }
      ]
    },
    project: {
      title: "Comparer React et Next.js",
      description: "Complétez le code pour afficher un tableau comparatif entre React standard et Next.js.",
      initialCode: `export default function Comparison() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Comparaison React vs Next.js</h2>
      
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Fonctionnalité</th>
            <th className="border p-2 text-left">React</th>
            <th className="border p-2 text-left">Next.js</th>
          </tr>
        </thead>
        <tbody>
          {/* Ajoutez au moins 5 lignes de comparaison */}
        </tbody>
      </table>
    </div>
  );
}`,
      solution: `export default function Comparison() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Comparaison React vs Next.js</h2>
      
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Fonctionnalité</th>
            <th className="border p-2 text-left">React</th>
            <th className="border p-2 text-left">Next.js</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">Rendu</td>
            <td className="border p-2">Client-side par défaut</td>
            <td className="border p-2">SSR, SSG et CSR</td>
          </tr>
          <tr>
            <td className="border p-2">Routage</td>
            <td className="border p-2">Nécessite React Router</td>
            <td className="border p-2">Basé sur le système de fichiers</td>
          </tr>
          <tr>
            <td className="border p-2">Configuration</td>
            <td className="border p-2">Nécessite Webpack, Babel, etc.</td>
            <td className="border p-2">Configuration zéro pour démarrer</td>
          </tr>
          <tr>
            <td className="border p-2">Optimisation d'images</td>
            <td className="border p-2">Manuelle</td>
            <td className="border p-2">Intégrée avec le composant Image</td>
          </tr>
          <tr>
            <td className="border p-2">SEO</td>
            <td className="border p-2">Difficile sans bibliothèques tierces</td>
            <td className="border p-2">Amélioré grâce au SSR</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}`
    }
  };

  // Ajouter un message de diagnostic pour tracer l'accès à ce point API
  console.log('API Route directe pour la leçon 1-2 accédée avec succès');

  return NextResponse.json(lesson);
}