"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CodeEditor from "@/components/editor/CodeEditor";
import ExerciseComponent from "@/components/lessons/ExerciseComponent";
import QuizComponent from "@/components/lessons/QuizComponent";
import CodePreviewSandbox from "@/components/editor/CodePreviewSandbox";

export default function RenderPropsLesson() {
  const [activeSection, setActiveSection] = useState("theory");
  const [progress, setProgress] = useState(0);
  const [sectionCompleted, setSectionCompleted] = useState({
    theory: false,
    practice: false,
    quiz: false
  });

  // Mettre à jour la progression
  useEffect(() => {
    const completedCount = Object.values(sectionCompleted).filter(Boolean).length;
    setProgress(Math.round((completedCount / 3) * 100));
  }, [sectionCompleted]);

  // Simuler la complétion d'une section
  const completeSection = (section) => {
    setSectionCompleted(prev => ({
      ...prev,
      [section]: true
    }));
  };

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  const renderPropExample = `// Composant qui encapsule la logique de suivi de la souris
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Utilise la prop "render" pour déterminer quoi afficher
  return render(position);
}

// Utilisation du composant
function App() {
  return (
    <div>
      <h1>Déplacez votre souris sur l'écran!</h1>
      <MouseTracker
        render={position => (
          <p>
            La position actuelle de la souris est ({position.x}, {position.y})
          </p>
        )}
      />
    </div>
  );
}`;

  const propsChildrenExample = `// Version avec children au lieu de render prop
function MouseTracker({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Utilise children comme fonction
  return children(position);
}

// Utilisation du composant
function App() {
  return (
    <div>
      <h1>Déplacez votre souris sur l'écran!</h1>
      <MouseTracker>
        {position => (
          <p>
            La position actuelle de la souris est ({position.x}, {position.y})
          </p>
        )}
      </MouseTracker>
    </div>
  );
}`;

  const toggleExample = `// Composant Toggle avec Render Prop
function Toggle({ render }) {
  const [on, setOn] = useState(false);

  const toggle = () => setOn(prev => !prev);

  return render({ on, toggle });
}

// Utilisation
function App() {
  return (
    <Toggle
      render={({ on, toggle }) => (
        <div>
          <button onClick={toggle}>
            {on ? 'ON' : 'OFF'}
          </button>
          <p>État actuel: {on ? 'Activé' : 'Désactivé'}</p>
        </div>
      )}
    />
  );
}`;

  const exerciseInitialCode = `// Créez un composant de liste qui utilise une render prop
// pour personnaliser l'affichage de chaque élément

function ListWithRenderProp({ items, renderItem }) {
  // Complétez ce composant

}

// Exemple d'utilisation
function App() {
  const users = [
    { id: 1, name: 'Alice', role: 'Developer' },
    { id: 2, name: 'Bob', role: 'Designer' },
    { id: 3, name: 'Charlie', role: 'Manager' }
  ];

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      {/* Utilisez votre composant ici */}
    </div>
  );
}`;

  const exerciseSolution = `function ListWithRenderProp({ items, renderItem }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const users = [
    { id: 1, name: 'Alice', role: 'Developer' },
    { id: 2, name: 'Bob', role: 'Designer' },
    { id: 3, name: 'Charlie', role: 'Manager' }
  ];

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <ListWithRenderProp
        items={users}
        renderItem={user => (
          <div>
            <strong>{user.name}</strong> - {user.role}
          </div>
        )}
      />
    </div>
  );
}`;

  const quizQuestions = [
    {
      id: 1,
      question: "Qu'est-ce qu'une Render Prop dans React?",
      options: [
        "Une prop spéciale qui transforme l'apparence d'un composant",
        "Une prop dont la valeur est une fonction qui retourne un élément React",
        "Une prop qui permet de contrôler le cycle de vie d'un composant",
        "Une méthode de rendu alternative aux components fonctionnels"
      ],
      correctAnswer: 1,
      explanation: "Une Render Prop est une technique qui consiste à utiliser une prop dont la valeur est une fonction qui retourne un élément React, permettant de partager du code entre composants."
    },
    {
      id: 2,
      question: "Quel est l'avantage principal des Render Props par rapport aux HOC (Higher-Order Components)?",
      options: [
        "Elles sont plus performantes",
        "Elles évitent le problème de collision de noms de props",
        "Elles sont plus faciles à déboguer",
        "Toutes les réponses précédentes"
      ],
      correctAnswer: 1,
      explanation: "Un avantage majeur des Render Props est qu'elles évitent le problème de collision de noms de props qui peut survenir avec les HOC lorsque plusieurs composants d'ordre supérieur sont utilisés ensemble."
    },
    {
      id: 3,
      question: "Comment peut-on implémenter une Render Prop en utilisant 'children'?",
      options: [
        "En passant un composant comme enfant direct",
        "En utilisant props.children comme une fonction et en lui passant des données",
        "En créant un composant qui retourne props.children",
        "Ce n'est pas possible car children ne peut pas être une fonction"
      ],
      correctAnswer: 1,
      explanation: "On peut implémenter une Render Prop en utilisant children comme une fonction: au lieu de <Component render={data => <div>{data}</div>}>, on écrit <Component>{data => <div>{data}</div>}</Component>."
    },
    {
      id: 4,
      question: "Quelle affirmation est correcte concernant les Render Props?",
      options: [
        "Elles sont obsolètes depuis l'introduction des Hooks",
        "Elles sont utiles uniquement pour les composants basés sur les classes",
        "Elles permettent de réutiliser la logique de state et de comportement entre composants",
        "Elles ne peuvent pas être combinées avec d'autres patterns comme les HOC"
      ],
      correctAnswer: 2,
      explanation: "Les Render Props permettent de réutiliser la logique de state et de comportement entre composants. Bien que les Hooks offrent une alternative, les Render Props restent un pattern valide et utile dans certains contextes."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">Render Props</h1>
            <p className="text-gray-600 mt-2">Apprendre à utiliser le pattern Render Props pour partager du code entre composants React</p>
          </div>

          <div className="flex space-x-2">
            <Link href="/lessons/module/react-patterns" className="btn-secondary">
              Retour au module
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">Progression: {progress}%</span>
            {progress === 100 && (
              <span className="text-sm text-green-600 font-medium">Module complété! 🎉</span>
            )}
          </div>
        </div>

        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveSection("theory")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeSection === "theory" 
                ? "bg-indigo-600 text-white" 
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Théorie
          </button>
          <button
            onClick={() => setActiveSection("practice")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeSection === "practice" 
                ? "bg-indigo-600 text-white" 
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Pratique
          </button>
          <button
            onClick={() => setActiveSection("quiz")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeSection === "quiz" 
                ? "bg-indigo-600 text-white" 
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Quiz
          </button>
        </div>

        {activeSection === "theory" && (
          <motion.div
            key="theory"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="prose max-w-none">
              <h2>Qu'est-ce que le pattern Render Props?</h2>
              <p>
                Le pattern <strong>Render Props</strong> est une technique en React qui consiste à passer une fonction comme propriété (prop) à un composant. Cette fonction retourne un élément React et détermine ce que le composant va rendre.
              </p>
              <p>
                Ce pattern permet de <strong>partager la logique entre composants</strong> de manière plus flexible que l'héritage ou la composition simple. Il encapsule le comportement que vous souhaitez partager, puis le rend disponible à d'autres composants en leur donnant la possibilité de décider comment ce comportement sera affiché.
              </p>

              <h3>Exemple de base: Suivi de la position de la souris</h3>
              <p>
                Imaginons que nous voulons créer un composant qui suit la position de la souris. Avec le pattern Render Props, nous pouvons encapsuler cette logique et la rendre réutilisable:
              </p>

              <div className="bg-gray-100 p-4 rounded-md">
                <CodePreviewSandbox code={renderPropExample} language="jsx" />
              </div>

              <h3>Pourquoi utiliser des Render Props?</h3>
              <ul>
                <li><strong>Séparation des préoccupations</strong>: La logique et l'affichage sont séparés.</li>
                <li><strong>Réutilisation du code</strong>: La même logique peut être utilisée avec différentes interfaces utilisateur.</li>
                <li><strong>Personnalisation</strong>: Le composant parent a un contrôle total sur ce qui est rendu.</li>
                <li><strong>Évite la collision de props</strong>: Contrairement aux HOC (Higher-Order Components), les Render Props évitent les problèmes de collision de noms de props.</li>
              </ul>

              <h3>Utilisation de children comme Render Prop</h3>
              <p>
                Au lieu d'utiliser une prop nommée explicitement <code>render</code>, on peut également utiliser la prop spéciale <code>children</code> comme fonction:
              </p>

              <div className="bg-gray-100 p-4 rounded-md">
                <CodePreviewSandbox code={propsChildrenExample} language="jsx" />
              </div>

              <p>
                Cette approche permet une syntaxe JSX plus propre et plus lisible.
              </p>

              <h3>Exemple pratique: Un composant Toggle</h3>
              <p>
                Voici un exemple de composant Toggle qui utilise le pattern Render Props pour gérer l'état et exposer des fonctions:
              </p>

              <div className="bg-gray-100 p-4 rounded-md">
                <CodePreviewSandbox code={toggleExample} language="jsx" />
              </div>

              <h3>Render Props vs Hooks</h3>
              <p>
                Avec l'introduction des Hooks dans React, certains cas d'usage des Render Props peuvent être remplacés par des custom hooks. Cependant, les Render Props restent utiles dans des scénarios où:
              </p>
              <ul>
                <li>Vous avez besoin de personnaliser le rendu basé sur une logique complexe</li>
                <li>Vous travaillez avec des bibliothèques qui utilisent ce pattern</li>
                <li>Vous avez besoin d'une séparation claire entre la logique et le rendu</li>
              </ul>
            </div>

            <div className="flex justify-between mt-8">
              <button 
                className="btn-secondary"
                onClick={() => setActiveSection("practice")}
              >
                Passer à la pratique
              </button>
              <button
                className="btn-primary"
                onClick={() => completeSection("theory")}
              >
                Marquer comme terminé
              </button>
            </div>
          </motion.div>
        )}

        {activeSection === "practice" && (
          <motion.div
            key="practice"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="prose max-w-none mb-6">
              <h2>Exercice: Créer un composant de liste avec Render Props</h2>
              <p>
                Dans cet exercice, vous allez créer un composant <code>ListWithRenderProp</code> qui accepte un tableau d'éléments et une render prop pour personnaliser l'affichage de chaque élément.
              </p>
              <p>
                <strong>Objectifs:</strong>
              </p>
              <ul>
                <li>Créer un composant qui prend un tableau d'items et une fonction <code>renderItem</code></li>
                <li>Le composant doit générer une liste où chaque élément est rendu par la fonction <code>renderItem</code></li>
                <li>Utiliser le composant pour afficher une liste d'utilisateurs</li>
              </ul>
            </div>

            <ExerciseComponent
              initialCode={exerciseInitialCode}
              solutionCode={exerciseSolution}
              language="jsx"
              onComplete={() => completeSection("practice")}
            />

            <div className="flex justify-between mt-8">
              <button 
                className="btn-secondary"
                onClick={() => setActiveSection("theory")}
              >
                Revenir à la théorie
              </button>
              <button 
                className="btn-secondary"
                onClick={() => setActiveSection("quiz")}
              >
                Passer au quiz
              </button>
            </div>
          </motion.div>
        )}

        {activeSection === "quiz" && (
          <motion.div
            key="quiz"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <QuizComponent
              questions={quizQuestions}
              onComplete={() => completeSection("quiz")}
            />

            <div className="flex justify-between mt-8">
              <button 
                className="btn-secondary"
                onClick={() => setActiveSection("practice")}
              >
                Revenir à la pratique
              </button>
              <Link
                href="/lessons/module/react-patterns"
                className="btn-primary"
              >
                Terminer la leçon
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}