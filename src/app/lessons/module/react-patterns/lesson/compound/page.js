
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '@/components/editor/CodeEditor';
import CodePreviewSandbox from '@/components/editor/CodePreviewSandbox';
import QuizComponent from '@/components/lessons/QuizComponent';
import ExerciseComponent from '@/components/lessons/ExerciseComponent';

export default function CompoundComponentsLesson() {
  const [activeTab, setActiveTab] = useState('theory');
  const [isCompleted, setIsCompleted] = useState(false);
  
  const basicCompoundCode = `// Exemple de composants composés simples
import React, { createContext, useContext, useState } from 'react';

// Créer un contexte pour partager l'état
const TabContext = createContext();

// Composant principal
function Tabs({ children, defaultIndex = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultIndex);
  
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabContext.Provider>
  );
}

// Sous-composant pour les onglets
Tabs.List = function TabList({ children }) {
  return (
    <div className="tab-list">{children}</div>
  );
};

// Sous-composant pour un onglet individuel
Tabs.Tab = function Tab({ children, index }) {
  const { activeTab, setActiveTab } = useContext(TabContext);
  
  return (
    <button
      className={\`tab \${activeTab === index ? 'active' : ''}\`}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
};

// Sous-composant pour le contenu d'un onglet
Tabs.Panel = function TabPanel({ children, index }) {
  const { activeTab } = useContext(TabContext);
  
  if (activeTab !== index) return null;
  
  return (
    <div className="tab-panel">{children}</div>
  );
};

// Utilisation
function App() {
  return (
    <Tabs>
      <Tabs.List>
        <Tabs.Tab index={0}>Onglet 1</Tabs.Tab>
        <Tabs.Tab index={1}>Onglet 2</Tabs.Tab>
        <Tabs.Tab index={2}>Onglet 3</Tabs.Tab>
      </Tabs.List>
      
      <Tabs.Panel index={0}>Contenu de l'onglet 1</Tabs.Panel>
      <Tabs.Panel index={1}>Contenu de l'onglet 2</Tabs.Panel>
      <Tabs.Panel index={2}>Contenu de l'onglet 3</Tabs.Panel>
    </Tabs>
  );
}`;

  const advancedCompoundCode = `// Exemple avancé: Menu déroulant avec compound components
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

// Créer un contexte pour partager l'état et les méthodes
const DropdownContext = createContext();

// Composant principal
function Dropdown({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Fermer le dropdown si on clique à l'extérieur
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="dropdown" ref={dropdownRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

// Sous-composant pour le bouton qui ouvre le dropdown
Dropdown.Button = function DropdownButton({ children }) {
  const { isOpen, setIsOpen } = useContext(DropdownContext);
  
  return (
    <button
      className={\`dropdown-button \${isOpen ? 'active' : ''}\`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {children}
    </button>
  );
};

// Sous-composant pour le contenu du dropdown
Dropdown.Content = function DropdownContent({ children }) {
  const { isOpen } = useContext(DropdownContext);
  
  if (!isOpen) return null;
  
  return (
    <div className="dropdown-content">
      {children}
    </div>
  );
};

// Sous-composant pour un élément du dropdown
Dropdown.Item = function DropdownItem({ children, onClick }) {
  const { setIsOpen } = useContext(DropdownContext);
  
  const handleClick = () => {
    onClick && onClick();
    setIsOpen(false);
  };
  
  return (
    <div className="dropdown-item" onClick={handleClick}>
      {children}
    </div>
  );
};

// Utilisation
function App() {
  return (
    <Dropdown>
      <Dropdown.Button>
        Options <span>▼</span>
      </Dropdown.Button>
      
      <Dropdown.Content>
        <Dropdown.Item onClick={() => console.log('Edit')}>Éditer</Dropdown.Item>
        <Dropdown.Item onClick={() => console.log('View')}>Voir</Dropdown.Item>
        <Dropdown.Item onClick={() => console.log('Delete')}>Supprimer</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}`;

  const quizQuestions = [
    {
      question: "Quel est le principal avantage des Compound Components ?",
      options: [
        "Ils rendent le code plus compact",
        "Ils offrent une API plus flexible et intuitive",
        "Ils sont plus performants que les composants standards",
        "Ils sont nécessaires pour React 18+"
      ],
      correctAnswer: 1
    },
    {
      question: "Comment les Compound Components partagent-ils généralement leur état interne ?",
      options: [
        "Via les props uniquement",
        "Via Redux",
        "Via React Context",
        "Via des variables globales"
      ],
      correctAnswer: 2
    },
    {
      question: "Laquelle de ces affirmations sur les Compound Components est correcte ?",
      options: [
        "Ils doivent toujours être des classes",
        "Ils imposent une structure rigide aux développeurs",
        "Ils permettent d'éviter le prop drilling",
        "Ils ne peuvent pas utiliser de hooks React"
      ],
      correctAnswer: 2
    }
  ];

  const exerciseInstructions = `
  Créez un composant Accordion en utilisant le pattern Compound Components avec:
  1. Un composant principal Accordion
  2. Un sous-composant Accordion.Item
  3. Un sous-composant Accordion.Header
  4. Un sous-composant Accordion.Panel
  
  L'accordéon doit permettre d'ouvrir un ou plusieurs panneaux à la fois, selon une prop allowMultiple.
  `;

  const exerciseTemplate = `// Créez vos composants composés ici
import React, { createContext, useContext, useState } from 'react';

// Créez le contexte
const AccordionContext = createContext();

// Composant principal
function Accordion({ children, allowMultiple = false }) {
  // Implémentez votre logique ici
  
  return (
    // Complétez le provider et la structure
  );
}

// Sous-composants
Accordion.Item = function AccordionItem({ children, index }) {
  // Implémentez ce sous-composant
};

Accordion.Header = function AccordionHeader({ children, index }) {
  // Implémentez ce sous-composant
};

Accordion.Panel = function AccordionPanel({ children, index }) {
  // Implémentez ce sous-composant
};

// Exemple d'utilisation pour tester
export function AccordionExample() {
  return (
    <Accordion allowMultiple={true}>
      <Accordion.Item index={0}>
        <Accordion.Header index={0}>Section 1</Accordion.Header>
        <Accordion.Panel index={0}>Contenu de la section 1</Accordion.Panel>
      </Accordion.Item>
      
      <Accordion.Item index={1}>
        <Accordion.Header index={1}>Section 2</Accordion.Header>
        <Accordion.Panel index={1}>Contenu de la section 2</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}`;

  const exerciseValidation = (code) => {
    // Vérifications basiques du code soumis
    const hasContext = code.includes('createContext') && code.includes('useContext');
    const hasProvider = code.includes('Provider value=');
    const hasSubcomponents = 
      code.includes('Accordion.Item') && 
      code.includes('Accordion.Header') && 
      code.includes('Accordion.Panel');
    const hasToggleLogic = code.includes('onClick') && 
      (code.includes('setOpen') || code.includes('setActiveIndices'));
    
    return hasContext && hasProvider && hasSubcomponents && hasToggleLogic;
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
        <h1 className="text-3xl font-bold mb-2">Compound Components en React</h1>
        <p className="text-gray-600 mb-6">Créez des composants plus flexibles et intuitifs grâce au pattern de composition.</p>
        
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
                  <h2 className="text-2xl font-semibold mb-3">Qu'est-ce que le pattern Compound Components?</h2>
                  <p className="mb-3">
                    Le pattern Compound Components (Composants Composés) est un pattern avancé de React qui permet de 
                    créer des composants avec une API plus expressive et intuitive, où plusieurs composants travaillent 
                    ensemble pour créer une fonctionnalité cohérente.
                  </p>
                  <p className="mb-3">
                    Dans ce pattern:
                  </p>
                  <ul className="list-disc ml-6 mb-4 space-y-1">
                    <li>Un composant parent expose plusieurs sous-composants (généralement comme des propriétés statiques)</li>
                    <li>Ces sous-composants sont conçus pour être utilisés ensemble</li>
                    <li>L'état et la logique sont partagés entre ces composants, généralement via React Context</li>
                    <li>L'utilisateur du composant peut arranger librement ces sous-composants selon ses besoins</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Avantages des Compound Components</h2>
                  <p className="mb-3">Ce pattern offre plusieurs avantages significatifs:</p>
                  <ul className="list-disc ml-6 mb-4 space-y-2">
                    <li>
                      <strong>API plus intuitive:</strong> L'utilisation ressemble à du HTML standard, favorisant la 
                      compréhension immédiate.
                    </li>
                    <li>
                      <strong>Flexibilité:</strong> Les utilisateurs peuvent organiser et personnaliser les 
                      sous-composants selon leurs besoins sans avoir à modifier le composant d'origine.
                    </li>
                    <li>
                      <strong>Encapsulation d'état:</strong> La logique complexe et l'état sont cachés à l'intérieur 
                      du composant parent, simplifiant l'API externe.
                    </li>
                    <li>
                      <strong>Évite le "prop drilling":</strong> Les données n'ont pas besoin d'être passées à travers 
                      de multiples niveaux de composants.
                    </li>
                    <li>
                      <strong>Séparation des responsabilités:</strong> Chaque sous-composant a une responsabilité claire 
                      et unique.
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
                      <strong>Composant parent:</strong> Gère l'état partagé et l'expose via Context
                    </li>
                    <li>
                      <strong>Sous-composants:</strong> Attachés au composant parent comme propriétés statiques
                    </li>
                    <li>
                      <strong>Context:</strong> Partage l'état et les méthodes entre tous les sous-composants
                    </li>
                  </ol>
                  <p className="mb-3">
                    Cette approche crée une API qui peut être utilisée de manière déclarative et 
                    intuitive, comme l'exemple suivant:
                  </p>
                  <div className="bg-gray-50 p-3 rounded-md text-sm">
                    <pre>
{`<Menu>
  <Menu.Button>Options ▼</Menu.Button>
  <Menu.List>
    <Menu.Item>Option 1</Menu.Item>
    <Menu.Item>Option 2</Menu.Item>
    <Menu.Item>Option 3</Menu.Item>
  </Menu.List>
</Menu>`}
                    </pre>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Quand utiliser ce pattern?</h2>
                  <p className="mb-3">
                    Les Compound Components sont particulièrement utiles pour:
                  </p>
                  <ul className="list-disc ml-6 mb-4 space-y-1">
                    <li>Les composants d'interface utilisateur complexes avec plusieurs parties interactives liées</li>
                    <li>Les composants qui nécessitent une grande flexibilité d'arrangement</li>
                    <li>Les composants où l'état partagé et la coordination entre éléments sont importants</li>
                    <li>La création de bibliothèques de composants réutilisables</li>
                  </ul>
                  <p className="mb-3">
                    Exemples courants: Tabs, Accordions, Dropdown Menus, Form Controls, etc.
                  </p>
                </section>
              </div>
            )}
            
            {activeTab === 'example' && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">Exemple de base: Système d'onglets</h2>
                  <p className="mb-3">Voici un exemple simple d'implémentation d'un système d'onglets avec des Compound Components:</p>
                  <div className="mb-2">
                    <CodeEditor 
                      code={basicCompoundCode} 
                      language="javascript"
                      readOnly={true}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Ce composant Tabs utilise Context pour partager l'état actif entre ses sous-composants,
                    permettant une coordination sans prop drilling.
                  </p>
                  
                  <h3 className="text-lg font-medium mb-2">Résultat:</h3>
                  <CodePreviewSandbox
                    htmlContent={`<div class="px-4 py-3">
  <div class="tabs">
    <div class="tab-list">
      <button class="tab active">Onglet 1</button>
      <button class="tab">Onglet 2</button>
      <button class="tab">Onglet 3</button>
    </div>
    <div class="tab-panel">
      <div class="mt-4 p-4 border rounded-md">
        <h3 class="font-medium">Contenu de l'onglet 1</h3>
        <p class="mt-2 text-gray-600">Ceci est le contenu du premier onglet. Il apparaît lorsque l'onglet 1 est actif.</p>
      </div>
    </div>
  </div>
</div>`}
                    cssContent={`
.tab-list {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
}
.tab {
  padding: 8px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
}
.tab.active {
  font-weight: 600;
  color: #4f46e5;
  border-bottom: 2px solid #4f46e5;
}
.tab-panel {
  padding-top: 12px;
}
`}
                  />
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">Exemple avancé: Menu déroulant</h2>
                  <p className="mb-3">Voici un exemple plus avancé avec un menu déroulant:</p>
                  <div className="mb-2">
                    <CodeEditor 
                      code={advancedCompoundCode} 
                      language="javascript"
                      readOnly={true}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Cet exemple ajoute des fonctionnalités plus avancées comme la fermeture du dropdown 
                    quand on clique en dehors, et le passage de callbacks aux items.
                  </p>
                  
                  <h3 className="text-lg font-medium mb-2">Résultat:</h3>
                  <CodePreviewSandbox
                    htmlContent={`<div class="px-4 py-3">
  <div class="dropdown">
    <button class="dropdown-button">
      Options <span>▼</span>
    </button>
    <div class="dropdown-content">
      <div class="dropdown-item">Éditer</div>
      <div class="dropdown-item">Voir</div>
      <div class="dropdown-item">Supprimer</div>
    </div>
  </div>
</div>`}
                    cssContent={`
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-button {
  padding: 8px 16px;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}
.dropdown-button.active {
  background-color: #e5e7eb;
}
.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 150px;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 4px;
}
.dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
}
.dropdown-item:hover {
  background-color: #f3f4f6;
}
`}
                  />
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">Meilleures pratiques</h2>
                  <ul className="list-disc ml-6 mb-4 space-y-2">
                    <li>
                      <strong>Nommage clair:</strong> Utilisez des noms descriptifs pour les sous-composants 
                      qui indiquent clairement leur fonction.
                    </li>
                    <li>
                      <strong>API cohérente:</strong> Maintenez une interface cohérente entre les sous-composants similaires.
                    </li>
                    <li>
                      <strong>Composition flexible:</strong> Concevez vos composants pour permettre différentes combinaisons et ordres.
                    </li>
                    <li>
                      <strong>Types ou PropTypes:</strong> Définissez clairement les props attendues pour faciliter l'utilisation.
                    </li>
                    <li>
                      <strong>Documentation:</strong> Documentez comment les composants sont censés être utilisés ensemble.
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
              <p className="text-sm">Vous avez maîtrisé le pattern Compound Components en React.</p>
            </div>
          </motion.div>
        )}
        
        <div className="flex justify-between">
          <button className="btn-secondary">
            Leçon précédente
          </button>
          <button className="btn-primary">
            Leçon suivante: Render Props
          </button>
        </div>
      </motion.div>
    </div>
  );
}
