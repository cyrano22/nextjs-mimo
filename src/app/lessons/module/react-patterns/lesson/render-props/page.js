
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '@/components/editor/CodeEditor';
import CodePreviewSandbox from '@/components/editor/CodePreviewSandbox';
import QuizComponent from '@/components/lessons/QuizComponent';
import ExerciseComponent from '@/components/lessons/ExerciseComponent';

export default function RenderPropsLesson() {
  const [activeTab, setActiveTab] = useState('theory');
  const [isCompleted, setIsCompleted] = useState(false);
  
  const basicRenderPropCode = `// Exemple de base: Toggle avec Render Prop
import React, { useState } from 'react';

function Toggle({ render }) {
  const [isOn, setIsOn] = useState(false);
  
  const toggle = () => setIsOn(prev => !prev);
  
  // On passe l'état et les méthodes à la fonction render
  return render({ isOn, toggle });
}

// Utilisation
function App() {
  return (
    <Toggle 
      render={({ isOn, toggle }) => (
        <div>
          <button onClick={toggle}>
            {isOn ? 'ON' : 'OFF'}
          </button>
          <p>État actuel: {isOn ? 'Activé' : 'Désactivé'}</p>
        </div>
      )}
    />
  );
}`;

  const childrenAsRenderPropCode = `// Children comme Render Prop
import React, { useState } from 'react';

function Toggle({ children }) {
  const [isOn, setIsOn] = useState(false);
  
  const toggle = () => setIsOn(prev => !prev);
  
  // On passe l'état et les méthodes à la fonction children
  return children({ isOn, toggle });
}

// Utilisation
function App() {
  return (
    <Toggle>
      {({ isOn, toggle }) => (
        <div>
          <button onClick={toggle}>
            {isOn ? 'ON' : 'OFF'}
          </button>
          <p>État actuel: {isOn ? 'Activé' : 'Désactivé'}</p>
        </div>
      )}
    </Toggle>
  );
}`;

  const mouseTrackerCode = `// Exemple pratique: MouseTracker
import React, { useState, useEffect } from 'react';

function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    function handleMouseMove(event) {
      setPosition({
        x: event.clientX,
        y: event.clientY
      });
    }
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return render(position);
}

// Utilisation
function App() {
  return (
    <div style={{ height: '100vh' }}>
      <h1>Suivez la souris!</h1>
      
      <MouseTracker
        render={({ x, y }) => (
          <div>
            <p>Position actuelle: ({x}, {y})</p>
            <div 
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: 'red',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </div>
        )}
      />
    </div>
  );
}`;

  const quizQuestions = [
    {
      question: "Qu'est-ce qu'une Render Prop en React?",
      options: [
        "Une prop qui est utilisée pour le CSS",
        "Une technique pour partager du code entre composants React via une prop qui est une fonction",
        "Une manière d'optimiser le rendu des composants",
        "Un pattern qui remplace les Hooks"
      ],
      correctAnswer: 1
    },
    {
      question: "Lequel de ces exemples illustre correctement le pattern Render Props?",
      options: [
        "<Component data={formData} />",
        "<Component renderHeader={() => <Header />} />",
        "<Component>{(data) => <DisplayData info={data} />}</Component>",
        "Les réponses B et C sont correctes"
      ],
      correctAnswer: 3
    },
    {
      question: "Quelle est la principale différence entre les HOCs (Higher-Order Components) et les Render Props?",
      options: [
        "Les HOCs modifient le composant source, les Render Props permettent la composition sans modification",
        "Les Render Props peuvent uniquement être utilisées avec des classes",
        "Les HOCs sont plus performants que les Render Props",
        "Il n'y a pas de différence significative"
      ],
      correctAnswer: 0
    }
  ];

  const exerciseInstructions = `
  Créez un composant DataFetcher utilisant le pattern Render Props qui:
  1. Accepte une URL comme prop
  2. Gère le chargement des données et les erreurs potentielles
  3. Expose l'état de chargement, les données et les erreurs via sa render prop
  4. Peut être utilisé pour afficher différentes UI selon l'état des données
  `;

  const exerciseTemplate = `// Implémentez votre composant DataFetcher ici
import React, { useState, useEffect } from 'react';

function DataFetcher({ url, render }) {
  // Implémentez les états pour data, loading, et error
  
  // Implémentez useEffect pour charger les données depuis l'URL
  
  // Retournez le résultat de la fonction render avec les données appropriées
}

// Exemple d'utilisation pour tester
export function DataFetcherExample() {
  return (
    <div>
      <h2>Exemple de DataFetcher</h2>
      
      <DataFetcher
        url="https://jsonplaceholder.typicode.com/users/1"
        render={({ data, loading, error }) => {
          // Retournez différentes UI en fonction de l'état
          if (loading) return <p>Chargement...</p>;
          if (error) return <p>Erreur: {error.message}</p>;
          if (data) {
            return (
              <div>
                <h3>{data.name}</h3>
                <p>Email: {data.email}</p>
                <p>Téléphone: {data.phone}</p>
              </div>
            );
          }
          return null;
        }}
      />
    </div>
  );
}`;

  const exerciseValidation = (code) => {
    // Vérifications basiques du code soumis
    const hasStates = code.includes('useState') && 
      (code.includes('setLoading') || code.includes('setData') || code.includes('setError'));
    const hasFetchLogic = code.includes('fetch') && code.includes('useEffect');
    const handlesStates = code.includes('loading') && code.includes('error') && code.includes('data');
    const usesRenderProp = code.includes('return render(') || code.includes('return render({');
    
    return hasStates && hasFetchLogic && handlesStates && usesRenderProp;
  };

  const handleComplete = () => {
    setIsCompleted(true);
    // Mettre à jour la progression
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Render Props en React</h1>
        <p className="text-gray-600 mb-6">Maîtrisez le pattern Render Props pour créer des composants plus flexibles et réutilisables.</p>
        
        <div className="mb-6">
          <div className="flex border-b">
            <button 
              className={`py-2 px-4 font-medium ${activeTab === 'theory' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('theory')}
            >
              Théorie
            </button>
            <button 
              className={`py-2 px-4 font-medium ${activeTab === 'example' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('example')}
            >
              Exemple
            </button>
            <button 
              className={`py-2 px-4 font-medium ${activeTab === 'exercise' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('exercise')}
            >
              Exercice
            </button>
            <button 
              className={`py-2 px-4 font-medium ${activeTab === 'quiz' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('quiz')}
            >
              Quiz
            </button>
          </div>
          
          <div className="py-4">
            {activeTab === 'theory' && (
              <div className="space-y-4">
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Qu'est-ce que le pattern Render Props?</h2>
                  <p className="mb-3">
                    Le pattern Render Props est une technique de composition en React où un composant 
                    reçoit une fonction comme propriété, qu'il appelle ensuite pour déterminer ce qu'il doit rendre.
                  </p>
                  <p className="mb-3">
                    En termes simples, au lieu de coder en dur ce qu'un composant doit afficher, 
                    vous lui passez une fonction qui lui indique quoi rendre.
                  </p>
                  <p className="mb-3">
                    La fonction "render prop" reçoit généralement des données ou des méthodes du composant, 
                    ce qui permet de partager de la logique entre composants tout en gardant un contrôle total sur le rendu.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Pourquoi utiliser les Render Props?</h2>
                  <p className="mb-3">Ce pattern offre plusieurs avantages significatifs:</p>
                  <ul className="list-disc ml-6 mb-4 space-y-2">
                    <li>
                      <strong>Réutilisation de code:</strong> Permet de partager la logique entre différents composants 
                      sans duplication.
                    </li>
                    <li>
                      <strong>Séparation des préoccupations:</strong> Sépare la logique de l'interface utilisateur.
                    </li>
                    <li>
                      <strong>Flexibilité:</strong> Permet au composant parent de contrôler exactement ce qui est rendu.
                    </li>
                    <li>
                      <strong>Composition dynamique:</strong> Facilite la composition de composants de manière dynamique.
                    </li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Structure typique</h2>
                  <p className="mb-3">
                    Un composant utilisant ce pattern suit généralement cette structure:
                  </p>
                  <ol className="list-decimal ml-6 mb-4 space-y-2">
                    <li>
                      <strong>Composant conteneur:</strong> Gère l'état, la logique et les effets secondaires
                    </li>
                    <li>
                      <strong>Prop de rendu:</strong> Fonction qui reçoit des données et des méthodes du conteneur
                    </li>
                    <li>
                      <strong>Rendu dynamique:</strong> Le conteneur appelle cette fonction pour déterminer son rendu
                    </li>
                  </ol>
                  <p className="mb-3">
                    Les render props peuvent être définies de différentes manières:
                  </p>
                  <ul className="list-disc ml-6 mb-4 space-y-1">
                    <li>Une prop nommée <code>render</code>: <code>&lt;DataProvider render={data => &lt;h1&gt;{data.title}&lt;/h1&gt;} /&gt;</code></li>
                    <li>La prop <code>children</code>: <code>&lt;DataProvider&gt;{data => &lt;h1&gt;{data.title}&lt;/h1&gt;}&lt;/DataProvider&gt;</code></li>
                    <li>N'importe quelle prop personnalisée: <code>&lt;DataProvider content={data => &lt;h1&gt;{data.title}&lt;/h1&gt;} /&gt;</code></li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Comparaison avec d'autres patterns</h2>
                  <p className="mb-4 font-medium">Render Props vs Higher-Order Components (HOCs):</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <h4 className="font-medium text-indigo-800 mb-2">Render Props</h4>
                      <ul className="list-disc ml-4 text-sm">
                        <li>Plus explicite et plus facile à comprendre</li>
                        <li>Évite le problème de "props collision"</li>
                        <li>Plus facile à typer avec TypeScript</li>
                        <li>Permet une composition plus flexible à l'utilisation</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <h4 className="font-medium text-purple-800 mb-2">HOCs</h4>
                      <ul className="list-disc ml-4 text-sm">
                        <li>Peut être plus concis dans certains cas</li>
                        <li>Crée un nouveau composant au lieu d'utiliser une fonction</li>
                        <li>Risque de collision de props et de wrapper hell</li>
                        <li>Composition déterminée au moment de la définition</li>
                      </ul>
                    </div>
                  </div>
                  
                  <p className="mb-4 font-medium">Render Props vs Hooks:</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <h4 className="font-medium text-indigo-800 mb-2">Render Props</h4>
                      <ul className="list-disc ml-4 text-sm">
                        <li>Fonctionne avec les composants classes et fonctionnels</li>
                        <li>Plus explicite dans le JSX</li>
                        <li>Peut être plus clair pour le partage de logique complexe</li>
                        <li>Permet de contrôler le cycle de vie du composant conteneur</li>
                      </ul>
                    </div>
                    <div className="bg-teal-50 p-3 rounded-lg">
                      <h4 className="font-medium text-teal-800 mb-2">Hooks</h4>
                      <ul className="list-disc ml-4 text-sm">
                        <li>Généralement plus concis</li>
                        <li>Plus facile à composer plusieurs logiques</li>
                        <li>Évite la hiérarchie profonde de composants</li>
                        <li>Approche plus moderne et recommandée en React actuel</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            )}
            
            {activeTab === 'example' && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">Exemple de base: Toggle</h2>
                  <p className="mb-3">Voici un exemple simple d'un composant Toggle utilisant une render prop:</p>
                  <div className="mb-2">
                    <CodeEditor 
                      code={basicRenderPropCode} 
                      language="javascript"
                      readOnly={true}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Ce composant Toggle encapsule la logique d'état (on/off) et expose cet état ainsi qu'une 
                    méthode pour le modifier via sa render prop.
                  </p>
                  
                  <h3 className="text-lg font-medium mb-2">Résultat:</h3>
                  <CodePreviewSandbox
                    htmlContent={`<div class="px-4 py-3">
  <button class="px-4 py-2 bg-indigo-600 text-white rounded-md">OFF</button>
  <p class="mt-2">État actuel: Désactivé</p>
</div>`}
                    javascriptContent={`
document.querySelector('button').addEventListener('click', function() {
  const isOn = this.textContent === 'ON';
  this.textContent = isOn ? 'OFF' : 'ON';
  document.querySelector('p').textContent = 'État actuel: ' + (isOn ? 'Désactivé' : 'Activé');
});
`}
                  />
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">Children comme Render Prop</h2>
                  <p className="mb-3">Vous pouvez également utiliser la prop children comme une fonction render:</p>
                  <div className="mb-2">
                    <CodeEditor 
                      code={childrenAsRenderPropCode} 
                      language="javascript"
                      readOnly={true}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Cette approche offre une syntaxe plus propre et plus naturelle, plus proche des éléments HTML standard.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">Exemple pratique: MouseTracker</h2>
                  <p className="mb-3">Voici un exemple plus utile - un composant qui suit la position de la souris:</p>
                  <div className="mb-2">
                    <CodeEditor 
                      code={mouseTrackerCode} 
                      language="javascript"
                      readOnly={true}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Ce composant MouseTracker gère toute la logique pour suivre la position de la souris et expose 
                    ces coordonnées via sa render prop.
                  </p>
                  
                  <h3 className="text-lg font-medium mb-2">Démonstration:</h3>
                  <div className="border rounded-lg p-4 h-64 relative">
                    <h4 className="text-center mb-4">Suivez la souris!</h4>
                    <div className="text-center text-sm text-gray-600" id="mousePosition">
                      Position: (0, 0)
                    </div>
                    <div 
                      id="cursor" 
                      className="absolute w-5 h-5 bg-red-500 rounded-full hidden transform -translate-x-1/2 -translate-y-1/2"
                    ></div>
                  </div>
                  <script dangerouslySetInnerHTML={{ __html: `
                    document.addEventListener('DOMContentLoaded', function() {
                      const container = document.querySelector('.border');
                      const cursor = document.getElementById('cursor');
                      const position = document.getElementById('mousePosition');
                      
                      if (!container || !cursor || !position) return;
                      
                      container.addEventListener('mousemove', function(e) {
                        const rect = container.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        
                        cursor.style.left = x + 'px';
                        cursor.style.top = y + 'px';
                        cursor.style.display = 'block';
                        
                        position.textContent = 'Position: (' + Math.round(x) + ', ' + Math.round(y) + ')';
                      });
                      
                      container.addEventListener('mouseleave', function() {
                        cursor.style.display = 'none';
                      });
                    });
                  ` }}></script>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">Meilleures pratiques</h2>
                  <ul className="list-disc ml-6 mb-4 space-y-2">
                    <li>
                      <strong>Nommage clair:</strong> Utilisez des noms descriptifs pour vos props ou utilisez
                      la prop children pour plus de clarté.
                    </li>
                    <li>
                      <strong>Évitez la complexité excessive:</strong> Si votre render prop devient trop complexe, 
                      envisagez de la décomposer.
                    </li>
                    <li>
                      <strong>Memoization:</strong> Pour les fonctions render passées à des composants qui se 
                      rendent fréquemment, envisagez d'utiliser React.useCallback pour éviter des rendus inutiles.
                    </li>
                    <li>
                      <strong>TypeScript:</strong> Utilisez des interfaces précises pour typer les paramètres
                      de votre fonction render.
                    </li>
                    <li>
                      <strong>Nesting:</strong> Évitez de trop imbriquer les render props, car cela peut 
                      rapidement devenir difficile à lire (similaire au "callback hell").
                    </li>
                  </ul>
                </section>
              </div>
            )}
            
            {activeTab === 'exercise' && (
              <div>
                <ExerciseComponent
                  instructions={exerciseInstructions}
                  codeTemplate={exerciseTemplate}
                  validateFn={exerciseValidation}
                  onComplete={() => setActiveTab('quiz')}
                />
              </div>
            )}
            
            {activeTab === 'quiz' && (
              <div>
                <QuizComponent 
                  questions={quizQuestions}
                  onComplete={handleComplete}
                />
              </div>
            )}
          </div>
        </div>
        
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center text-green-800 mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium">Leçon terminée !</p>
              <p className="text-sm">Vous avez maîtrisé le pattern Render Props en React.</p>
            </div>
          </motion.div>
        )}
        
        <div className="flex justify-between">
          <button className="btn-secondary">
            Leçon précédente: Compound Components
          </button>
          <button className="btn-primary">
            Module Suivant: Tests automatisés
          </button>
        </div>
      </motion.div>
    </div>
  );
}
