export async function GET(request, { params }) {
  console.log('API Route params:', params);
  const moduleId = params.moduleId;
  const lessonId = params.lessonId;
  
  // Standardize the key format
  const moduleIdStr = String(moduleId).trim();
  const lessonIdStr = String(lessonId).trim();
  const lessonKey = `${moduleIdStr}-${lessonIdStr}`;
  console.log('Request for lesson:', lessonKey);
  
  // Get all lesson data
  const allLessons = getAllLessonsData();
  
  // Try exact match first
  let lesson = allLessons[lessonKey];
  
  // If exact match fails, try to find by individual module and lesson IDs
  if (!lesson) {
    console.log('Exact match failed, trying alternative lookups');
    // Try different combinations and formats
    let alternativeKeys = [
      `${moduleId}-${lessonId}`,          // Original
      `${parseInt(moduleId)}-${parseInt(lessonId)}`, // Parsed as integers
      `${moduleId.toString()}-${lessonId.toString()}`, // Explicit toString
    ];
    
    // Logique spéciale pour les modules Next.js (6-8)
    if (moduleId === '6' || moduleId === '7' || moduleId === '8') {
      console.log('Module Next.js détecté, ajout de clés spéciales');
      // Pour le cas où on essaie d'accéder à /api/modules/6/lessons/1, mais la clé est "6-1"
      alternativeKeys.push(`${moduleId}-1`);
      // Pour d'autres formats possibles
      alternativeKeys.push(`${moduleId}-${moduleId}`);
    }
    
    for (const key of alternativeKeys) {
      if (allLessons[key]) {
        lesson = allLessons[key];
        console.log('Found using alternative key:', key);
        break;
      }
    }
  }
  
  // Final fallback - search by individual properties
  if (!lesson) {
    console.log('Looking through all lessons as fallback');
    const keys = Object.keys(allLessons);
    console.log('Available keys:', keys);
    
    // For debugging only - check key formats
    keys.forEach(key => {
      console.log(`Key '${key}' type: ${typeof key}, value: ${key}`);
    });
  }
  
  if (!lesson) {
    return new Response(JSON.stringify({ 
      error: "Lesson not found", 
      requestedKey: lessonKey,
      availableKeys: Object.keys(getAllLessonsData())
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 404
    });
  }
  // Ajout de logs pour debugging
  console.log('Sending lesson data:', {
    title: lesson.title,
    hasExercise: !!lesson.exercise,
    hasQuiz: !!lesson.quiz,
    hasProject: !!lesson.project
  });
  
  return new Response(JSON.stringify(lesson), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Function to get all lesson data in a lookup object
function getAllLessonsData() {
  // All lesson data organized by "moduleId-lessonId" keys
  const lessonsData = {

    // Module 1: Fondamentaux Web
    "1-1": {
      title: "Introduction au développement web moderne",
      description: "Vue d'ensemble des technologies web actuelles",
      difficulty: "débutant",
      duration: 30,
      tags: ["HTML", "CSS", "JavaScript", "Web"],
      prerequisites: [],
      content: `
        <h2>Introduction au développement web moderne</h2>
        <p>Le développement web moderne repose sur trois piliers fondamentaux :</p>
        <ul>
          <li><strong>HTML</strong> - Structure du contenu</li>
          <li><strong>CSS</strong> - Présentation et style</li>
          <li><strong>JavaScript</strong> - Interactivité et logique</li>
        </ul>
        <p>Ces trois technologies travaillent ensemble pour créer des sites web dynamiques et interactifs.</p>
      `,
      example: {
        title: "Structure d'une page web simple",
        code: `<!DOCTYPE html>
<html>
<head>
  <title>Ma première page</title>
  <style>
    body { font-family: Arial, sans-serif; }
    h1 { color: #3498db; }
    .container { padding: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Bienvenue sur ma page</h1>
    <p>Cette page utilise HTML, CSS et JavaScript.</p>
    
    <button id="changeColor">Changer la couleur</button>
  </div>
  
  <script>
    document.getElementById('changeColor').addEventListener('click', function() {
      document.querySelector('h1').style.color = '#e74c3c';
    });
  </script>
</body>
</html>`,
        explanation: "Cette page simple illustre les trois technologies fondamentales : HTML pour la structure, CSS pour le style, et JavaScript pour l'interactivité (le bouton qui change la couleur du titre).",
        language: "html"
      },
      exercise: {
        title: "Identifier les technologies web",
        description: "Pour chaque élément ci-dessous, identifiez la technologie web correspondante.",
        options: [
          { id: 1, text: "Définir la structure d'une page et organiser le contenu", correct: true, answer: "HTML" },
          { id: 2, text: "Appliquer des couleurs et des styles à la page", correct: true, answer: "CSS" },
          { id: 3, text: "Créer une animation interactive quand l'utilisateur clique sur un bouton", correct: true, answer: "JavaScript" },
          { id: 4, text: "Définir la mise en page et le positionnement des éléments", correct: true, answer: "CSS" },
          { id: 5, text: "Définir des balises pour les titres et paragraphes", correct: true, answer: "HTML" },
          { id: 6, text: "Valider un formulaire avant son envoi", correct: true, answer: "JavaScript" }
        ],
        type: "matching"
      },
      quiz: {
        title: "Quiz sur les fondamentaux du web",
        questions: [
          {
            question: "Quelle technologie est responsable de la structure d'une page web ?",
            options: ["CSS", "HTML", "JavaScript", "PHP"],
            correctAnswer: "HTML"
          },
          {
            question: "Quelle technologie permet de rendre une page web interactive ?",
            options: ["HTML", "CSS", "JavaScript", "XML"],
            correctAnswer: "JavaScript"
          },
          {
            question: "Quelle est la fonction principale du CSS ?",
            options: ["Créer la structure", "Gérer la base de données", "Définir le style et l'apparence", "Manipuler le DOM"],
            correctAnswer: "Définir le style et l'apparence"
          }
        ]
      },
      project: {
        title: "Créer une page web simple",
        description: "Créez une page web simple qui présente les trois piliers du développement web moderne.",
        initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>Les piliers du web</title>
  <style>
    /* Ajoutez votre CSS ici */
  </style>
</head>
<body>
  <!-- Créez la structure HTML ici -->
  
  <script>
    // Ajoutez votre JavaScript ici
  </script>
</body>
</html>`,
        solution: `<!DOCTYPE html>
<html>
<head>
  <title>Les piliers du web</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
    .card { border: 1px solid #ddd; padding: 15px; margin: 10px; border-radius: 5px; }
    .html { background-color: #f8d7da; }
    .css { background-color: #d1ecf1; }
    .js { background-color: #fff3cd; }
    h1 { text-align: center; }
  </style>
</head>
<body>
  <h1>Les trois piliers du web moderne</h1>
  
  <div class="card html">
    <h2>HTML</h2>
    <p>Structure le contenu de la page web</p>
  </div>
  
  <div class="card css">
    <h2>CSS</h2>
    <p>Définit le style et la présentation</p>
  </div>
  
  <div class="card js">
    <h2>JavaScript</h2>
    <p>Ajoute l'interactivité</p>
    <button id="demo">Cliquez-moi</button>
  </div>
  
  <script>
    document.getElementById('demo').addEventListener('click', function() {
      alert('JavaScript en action!');
    });
  </script>
</body>
</html>`,
        language: "html"
      },
      aiSupport: {
        mentor: "CodeSage",
        features: ["Recommandations personnalisées", "Exemples interactifs"],
        tips: ["N'hésitez pas à me demander des explications sur les concepts", "Je peux vous aider à comprendre l'écosystème web"]
      }
    },
    
    // Module 2-3: JavaScript
    "2-1": {
      title: "Introduction à JavaScript",
      description: "Les bases du langage JavaScript et son rôle dans le développement web",
      difficulty: "débutant",
      duration: 40,
      tags: ["JavaScript", "Programmation", "Web"],
      prerequisites: ["1-1", "1-2"],
      content: `
        <h2>Introduction à JavaScript</h2>
        <p>JavaScript est un langage de programmation qui permet d'ajouter de l'interactivité aux pages web.</p>
        <h3>Caractéristiques principales</h3>
        <ul>
          <li>Langage interprété (pas besoin de compilation)</li>
          <li>Orienté objet avec prototypes</li>
          <li>Syntaxe inspirée de C/Java</li>
          <li>Typé dynamiquement</li>
        </ul>
      `,
      aiSupport: {
        mentor: "CodeSage",
        features: ["Exemples interactifs", "Exercices pratiques"],
        tips: ["N'hésitez pas à expérimenter avec la console JavaScript", "La pratique régulière est la clé pour maîtriser JavaScript"]
      }
    },
    
    "3-1": {
      title: "Programmation asynchrone en JavaScript",
      description: "Comprendre les promesses, async/await et les callbacks",
      difficulty: "intermédiaire",
      duration: 55,
      tags: ["JavaScript", "Asynchrone", "Promesses", "Async/Await"],
      prerequisites: ["2-1", "2-2", "2-3"],
      content: `
        <h2>Programmation asynchrone en JavaScript</h2>
        <p>JavaScript est un langage à thread unique qui utilise un modèle asynchrone pour gérer les opérations qui prennent du temps.</p>
        
        <h3>Callbacks</h3>
        <pre><code>function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "John", age: 30 };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log(data); // { name: "John", age: 30 }
});</code></pre>
        
        <h3>Promesses</h3>
        <pre><code>function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: "John", age: 30 };
      resolve(data);
      // En cas d'erreur: reject(new Error("Échec du chargement"))
    }, 1000);
  });
}

fetchData()
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });</code></pre>
      `,
      aiSupport: {
        mentor: "CodeSage",
        features: ["Visualisation du flux asynchrone", "Exemples réels"],
        tips: ["Utilisez async/await pour un code plus lisible", "Pensez toujours à gérer les erreurs avec try/catch"]
      }
    },
    
    // Module 4-5: React
    "4-1": {
      title: "Introduction à React",
      description: "Découvrir les principes fondamentaux de React et son écosystème",
      difficulty: "intermédiaire",
      duration: 45,
      tags: ["React", "JavaScript", "Frontend"],
      prerequisites: ["3-1", "3-2"],
      content: `
        <h2>Introduction à React</h2>
        <p>React est une bibliothèque JavaScript développée par Facebook pour créer des interfaces utilisateur.</p>
        
        <h3>Principes clés</h3>
        <ul>
          <li><strong>Composants</strong>: unités réutilisables de code et d'interface</li>
          <li><strong>DOM virtuel</strong>: représentation en mémoire du DOM pour des performances optimales</li>
          <li><strong>Flux de données unidirectionnel</strong>: les données descendent des parents vers les enfants</li>
          <li><strong>JSX</strong>: syntaxe permettant d'écrire du HTML dans JavaScript</li>
        </ul>
        
        <h3>Premier composant React</h3>
        <pre><code>import React from 'react';

function Welcome(props) {
  return &lt;h1&gt;Bonjour, {props.name}&lt;/h1&gt;;
}

// Utilisation
&lt;Welcome name="Sara" /&gt;</code></pre>
        
        <h3>Mise en place d'un projet</h3>
        <pre><code>// Avec Create React App
npx create-react-app mon-application
cd mon-application
npm start</code></pre>
      `,
      aiSupport: {
        mentor: "ComponentPro",
        features: ["Débogage interactif", "Suggestions de structure"],
        tips: ["Commencez par comprendre les composants fonctionnels", "Pratiquez la décomposition d'interfaces en composants"]
      }
    },
    
    "5-1": {
      title: "Hooks React avancés",
      description: "Maîtriser useReducer, useContext, useCallback et useMemo",
      difficulty: "avancé",
      duration: 60,
      tags: ["React", "Hooks", "useReducer", "useContext"],
      prerequisites: ["4-1", "4-2", "4-3"],
      content: `
        <h2>useReducer</h2>
        <p><code>useReducer</code> est une alternative à <code>useState</code> pour gérer des états plus complexes. Il est particulièrement utile lorsque la logique d'état est complexe ou lorsque l'état suivant dépend du précédent.</p>
        <pre><code>
// Définition du reducer et de l'état initial pour l'exemple
const simpleReducer = (state, action) => {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: throw new Error('Action non supportée');
  }
};
const simpleInitialState = { count: 0 };

// Exemple de composant utilisant useReducer (ceci est du code d'exemple dans la chaîne)
/*
import React, { useReducer } from 'react';

function MyCounterComponent() {
  const [state, dispatch] = useReducer(simpleReducer, simpleInitialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
*/
// Le code ci-dessus est un exemple à afficher.
// La fonction 'Counter' définie séparément dans ce fichier est un exemple distinct.
        </code></pre>

        <h3>useCallback</h3>
        <p>useCallback mémorise une fonction pour éviter qu'elle soit recréée à chaque rendu :</p>
        <pre><code>
// import { useCallback, useState } from 'react';

function SearchComponent() {
  const [query, setQuery] = useState('');
  
  const handleSearch = useCallback(() => {
    console.log('Recherche avec:', query);
  }, [query]);
  
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {/* <ExpensiveComponent onSearch={handleSearch} /> */}
    </>
  );
}
        </code></pre>
        
        <h3>useMemo</h3>
        <p>useMemo mémorise le résultat d'un calcul coûteux :</p>
        <pre><code>
// import { useMemo, useState } from 'react';

function ExpensiveCalculation({ list, filter }) {
  const filteredList = useMemo(() => {
    console.log('Filtrage de la liste...');
    return list.filter(item => item.includes(filter));
  }, [list, filter]);
  
  return (
    <ul>
      {filteredList.map(item => <li key={item}>{item}</li>)}
    </ul>
  );
}
        </code></pre>
      `,
      aiSupport: {
        mentor: "ComponentPro",
        features: ["Exemples interactifs", "Analyses de performance"],
        tips: ["Je peux vous aider à comprendre quand utiliser chaque hook", "Demandez-moi des exemples de refactorisation pour améliorer les performances"]
      }
    },
    
    // Module 6-8: Next.js
    "6-1": {
      title: "Qu'est-ce que Next.js et pourquoi l'utiliser?",
      description: "Introduction, historique et avantages de Next.js par rapport à React",
      difficulty: "intermédiaire",
      duration: 35,
      tags: ["Next.js", "SSR", "SSG", "React"],
      prerequisites: ["5-1", "5-2"],
      content: `
        <h2>Qu'est-ce que Next.js?</h2>
        <p>Next.js est un framework React qui offre des fonctionnalités comme le rendu côté serveur (SSR), la génération de sites statiques (SSG), et bien plus encore.</p>

        <h3>Historique et évolution</h3>
        <p>Next.js a été créé par Vercel (anciennement ZEIT) et est maintenu par une communauté active. Il a été conçu pour résoudre les problèmes courants du développement React, comme le SEO, le routage et le rendu côté serveur.</p>

        <h3>Pourquoi utiliser Next.js?</h3>
        <p>Next.js offre de nombreux avantages :</p>
        <ul>
          <li><strong>Rendu côté serveur (SSR)</strong> : Améliore le SEO et les performances perçues</li>
          <li><strong>Génération de sites statiques (SSG)</strong> : Permet de pré-rendre les pages lors de la compilation</li>
          <li><strong>Routage basé sur le système de fichiers</strong> : Simplifie la navigation dans l'application</li>
          <li><strong>Optimisation automatique</strong> : Images, polices, scripts</li>
          <li><strong>API Routes</strong> : Permet de créer des API dans le même projet</li>
        </ul>
      `,
      quiz: {
        title: "Quiz sur Next.js",
        questions: [
          {
            question: "Quelle entreprise est à l'origine de Next.js ?",
            options: ["Facebook", "Google", "Vercel", "Amazon"],
            correctAnswer: "Vercel"
          },
          {
            question: "Quelle fonctionnalité permet d'améliorer le SEO dans Next.js ?",
            options: ["Client-side Rendering", "Server-side Rendering", "Progressive Enhancement", "Responsive Design"],
            correctAnswer: "Server-side Rendering"
          },
          {
            question: "Comment Next.js gère-t-il le routage ?",
            options: ["Via un fichier de configuration central", "En utilisant un système basé sur les fichiers", "Par un routeur explicite", "Par des annotations dans les composants"],
            correctAnswer: "En utilisant un système basé sur les fichiers"
          }
        ]
      },
      exercise: {
        title: "Identifier les avantages de Next.js",
        description: "Sélectionnez tous les avantages qu'offre Next.js par rapport à une application React standard.",
        options: [
          { id: 1, text: "Rendu côté serveur (SSR)", correct: true },
          { id: 2, text: "Génération de sites statiques (SSG)", correct: true },
          { id: 3, text: "Routage automatisé basé sur le système de fichiers", correct: true },
          { id: 4, text: "API Routes intégrées", correct: true },
          { id: 5, text: "Gestion d'état native", correct: false },
          { id: 6, text: "Bibliothèque d'animations intégrée", correct: false }
        ],
        type: "multiple"
      },
      project: {
        title: "Créer votre première application Next.js",
        description: "Dans cet exercice, vous allez créer une application Next.js simple avec une page d'accueil et une page à propos.",
        initialCode: `// pages/index.js
export default function Home() {
  // Complétez le code ici
}`,
        solution: `// pages/index.js
export default function Home() {
  return (
    <div>
      <h1>Bienvenue sur mon site Next.js</h1>
      <p>C'est ma première application avec Next.js!</p>
    </div>
  );
}`
      },
      aiSupport: {
        mentor: "ServerSideWizard",
        features: ["Comparaison avec d'autres frameworks", "Cas d'usage illustrés"],
        tips: ["Je peux vous aider à comprendre si Next.js est adapté à votre projet", "Demandez-moi des explications détaillées sur les différents modes de rendu"]
      }
    },
    
    "7-1": {
      title: "App Router vs Pages Router",
      description: "Comprendre les deux systèmes de routage de Next.js",
      difficulty: "intermédiaire",
      duration: 30,
      tags: ["Next.js", "Routing", "App Router", "Pages Router"],
      prerequisites: ["6-1", "6-2"],
      content: `
        <h2>Les deux systèmes de routage de Next.js</h2>
        <p>Next.js propose deux systèmes de routage : le Pages Router (traditionnel) et l'App Router (plus récent, introduit dans Next.js 13).</p>

        <h3>Pages Router</h3>
        <p>Le système traditionnel basé sur le dossier <code>/pages</code> :</p>
        <ul>
          <li><code>/pages/index.js</code> → Route <code>/</code></li>
          <li><code>/pages/blog/[slug].js</code> → Routes dynamiques comme <code>/blog/article-1</code></li>
          <li>Utilise <code>getStaticProps</code>, <code>getServerSideProps</code> pour le fetching de données</li>
        </ul>

        <h3>App Router</h3>
        <p>Le nouveau système basé sur le dossier <code>/app</code> :</p>
        <ul>
          <li><code>/app/page.js</code> → Route <code>/</code></li>
          <li><code>/app/blog/[slug]/page.js</code> → Routes dynamiques</li>
          <li>Utilise les Server Components et les composants spéciaux comme <code>layout.js</code>, <code>loading.js</code></li>
          <li>Data fetching avec des fonctions asynchrones directement dans les composants</li>
        </ul>
      `,
      quiz: {
        title: "Quiz sur les systèmes de routage Next.js",
        questions: [
          {
            question: "Dans quelle version de Next.js a été introduit l'App Router ?",
            options: ["Next.js 11", "Next.js 12", "Next.js 13", "Next.js 14"],
            correctAnswer: "Next.js 13"
          },
          {
            question: "Quelle fonctionnalité est disponible dans l'App Router mais pas dans le Pages Router ?",
            options: ["Routes dynamiques", "API Routes", "Middleware", "Server Components"],
            correctAnswer: "Server Components"
          },
          {
            question: "Où définit-on les routes dans l'App Router ?",
            options: ["/pages", "/routes", "/app", "/src"],
            correctAnswer: "/app"
          }
        ]
      },
      exercise: {
        title: "Comparer les deux routeurs de Next.js",
        description: "Associez chaque fonctionnalité au routeur approprié.",
        options: [
          { id: 1, text: "Server Components", routeur: "App Router", correct: true },
          { id: 2, text: "getServerSideProps", routeur: "Pages Router", correct: true },
          { id: 3, text: "layout.js", routeur: "App Router", correct: true },
          { id: 4, text: "_app.js", routeur: "Pages Router", correct: true },
          { id: 5, text: "loading.js", routeur: "App Router", correct: true },
          { id: 6, text: "Routes API", routeur: "Les deux", correct: true }
        ],
        type: "matching"
      },
      project: {
        title: "Créer une navigation avec App Router",
        description: "Dans cet exercice, vous allez créer une structure de navigation de base utilisant l'App Router de Next.js.",
        initialCode: `// app/layout.js
export default function RootLayout({ children }) {
  // Complétez le code de navigation ici
}`,
        solution: `// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <nav>
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}`
      },
      aiSupport: {
        mentor: "ServerSideWizard",
        features: ["Comparaison interactive", "Exemples de migration"],
        tips: ["Je peux vous aider à choisir le bon routeur pour votre projet", "Demandez-moi des conseils pour migrer d'un système à l'autre"]
      }
    }
  };
  
  // Return the complete lessons data object for lookup
  return lessonsData;
}
    