
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CodeEditor from "../../components/editor/CodeEditor";
import CodePlayground from "../../components/editor/CodePlayground";
import ExerciseWithPreview from "../../components/editor/ExerciseWithPreview";

export default function ReactFundamentalsPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  // Contenu des sections
  const sections = {
    introduction: {
      title: "Introduction à React",
      content: `
        React est une bibliothèque JavaScript pour construire des interfaces utilisateur. 
        Développée par Facebook (maintenant Meta), elle est devenue l'une des bibliothèques 
        les plus populaires pour le développement front-end.
        
        React utilise une approche déclarative et basée sur les composants, ce qui rend le code 
        plus prévisible et plus facile à déboguer. Il utilise également un DOM virtuel pour 
        optimiser les performances en minimisant les manipulations directes du DOM.
        
        Next.js est un framework construit sur React qui ajoute des fonctionnalités comme 
        le rendu côté serveur, la génération de sites statiques, et bien plus encore.
        Comprendre React est donc essentiel pour maîtriser Next.js.
      `,
      code: `// Un composant React simple
import React from 'react';

function Salutation({ nom }) {
  return (
    <div>
      <h1>Bonjour, {nom}!</h1>
      <p>Bienvenue dans le monde de React.</p>
    </div>
  );
}

// Utilisation du composant
function App() {
  return (
    <div>
      <Salutation nom="Marie" />
      <Salutation nom="Jean" />
    </div>
  );
}

export default App;`,
      language: "jsx",
    },
    components: {
      title: "Composants et Props",
      content: `
        Les composants sont les blocs de construction de toute application React.
        Un composant est une fonction ou une classe qui accepte des entrées (appelées "props") 
        et retourne des éléments React décrivant ce qui doit apparaître à l'écran.
        
        Il existe deux types de composants en React :
        - Composants fonctionnels : des fonctions JavaScript qui acceptent des props et retournent du JSX
        - Composants de classe : des classes ES6 qui étendent React.Component
        
        Les props (propriétés) sont des données passées d'un composant parent à un composant enfant.
        Elles sont en lecture seule et ne doivent pas être modifiées par le composant qui les reçoit.
      `,
      code: `// Composant fonctionnel avec props
function Bouton({ texte, couleur, onClick }) {
  return (
    <button 
      onClick={onClick}
      style={{ backgroundColor: couleur, color: 'white', padding: '10px 15px' }}
    >
      {texte}
    </button>
  );
}

// Utilisation du composant avec différentes props
function App() {
  const handleClick = (message) => {
    alert(message);
  };
  
  return (
    <div>
      <Bouton 
        texte="Cliquez-moi" 
        couleur="blue" 
        onClick={() => handleClick("Bouton bleu cliqué!")} 
      />
      
      <Bouton 
        texte="Envoyer" 
        couleur="green" 
        onClick={() => handleClick("Formulaire envoyé!")} 
      />
      
      <Bouton 
        texte="Supprimer" 
        couleur="red" 
        onClick={() => handleClick("Élément supprimé!")} 
      />
    </div>
  );
}`,
      language: "jsx",
    },
    state: {
      title: "État (State) et Cycle de vie",
      content: `
        L'état (state) est un objet qui contient des données spécifiques à un composant 
        et qui peuvent changer au fil du temps. Contrairement aux props, l'état est géré 
        entièrement par le composant lui-même.
        
        Dans les composants fonctionnels, l'état est géré avec le hook useState.
        Dans les composants de classe, l'état est initialisé dans le constructeur et 
        mis à jour avec la méthode setState.
        
        Le cycle de vie d'un composant comprend plusieurs phases :
        - Montage : le composant est créé et inséré dans le DOM
        - Mise à jour : le composant est re-rendu suite à des changements de props ou d'état
        - Démontage : le composant est retiré du DOM
        
        Dans les composants fonctionnels, le hook useEffect permet de gérer ces phases.
      `,
      code: `// Gestion de l'état avec useState
import React, { useState } from 'react';

function Compteur() {
  // Déclarer une variable d'état "compteur" initialisée à 0
  const [compteur, setCompteur] = useState(0);
  
  return (
    <div>
      <p>Vous avez cliqué {compteur} fois</p>
      <button onClick={() => setCompteur(compteur + 1)}>
        Cliquez-moi
      </button>
    </div>
  );
}

// Gestion du cycle de vie avec useEffect
import React, { useState, useEffect } from 'react';

function Horloge() {
  const [date, setDate] = useState(new Date());
  
  useEffect(() => {
    // Code exécuté après le rendu (équivalent à componentDidMount et componentDidUpdate)
    const timerID = setInterval(() => {
      setDate(new Date());
    }, 1000);
    
    // Fonction de nettoyage (équivalent à componentWillUnmount)
    return () => {
      clearInterval(timerID);
    };
  }, []); // Le tableau vide signifie que cet effet s'exécute une seule fois après le montage
  
  return (
    <div>
      <h2>Il est {date.toLocaleTimeString()}.</h2>
    </div>
  );
}`,
      language: "jsx",
    },
    hooks: {
      title: "Hooks React",
      content: `
        Les Hooks sont une addition à React 16.8 qui permettent d'utiliser l'état et d'autres 
        fonctionnalités de React sans écrire de classe. Ils permettent de réutiliser la logique 
        d'état entre les composants.
        
        Les Hooks les plus couramment utilisés sont :
        
        - useState : pour ajouter un état local à un composant fonctionnel
        - useEffect : pour exécuter du code après le rendu (effets secondaires)
        - useContext : pour accéder à un contexte React
        - useReducer : pour gérer un état plus complexe avec un pattern Redux-like
        - useCallback : pour mémoriser une fonction entre les rendus
        - useMemo : pour mémoriser une valeur calculée entre les rendus
        - useRef : pour créer une référence mutable qui persiste entre les rendus
        
        Les Hooks personnalisés permettent d'extraire la logique des composants dans des fonctions 
        réutilisables.
      `,
      code: `// Exemple de plusieurs hooks
import React, { useState, useEffect, useRef } from 'react';

function FormulaireProfil() {
  // useState pour gérer les données du formulaire
  const [profil, setProfil] = useState({
    nom: '',
    email: '',
    bio: ''
  });
  
  // useRef pour accéder à un élément DOM
  const inputNomRef = useRef(null);
  
  // useEffect pour focus sur l'input au chargement
  useEffect(() => {
    inputNomRef.current.focus();
  }, []);
  
  // useEffect pour sauvegarder dans localStorage
  useEffect(() => {
    localStorage.setItem('profil', JSON.stringify(profil));
  }, [profil]); // Se déclenche uniquement quand profil change
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfil(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(\`Profil sauvegardé: \${profil.nom} (\${profil.email})\`);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nom">Nom:</label>
        <input
          id="nom"
          name="nom"
          ref={inputNomRef}
          value={profil.nom}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={profil.email}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          name="bio"
          value={profil.bio}
          onChange={handleChange}
        />
      </div>
      
      <button type="submit">Sauvegarder</button>
    </form>
  );
}

// Hook personnalisé
function useLocalStorage(key, initialValue) {
  // État pour stocker notre valeur
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  
  // Fonction pour mettre à jour l'état et localStorage
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  
  return [storedValue, setValue];
}`,
      language: "jsx",
    },
    lists: {
      title: "Listes et Clés",
      content: `
        En React, vous transformerez souvent des tableaux en listes d'éléments.
        
        Pour créer une liste d'éléments, vous pouvez utiliser la méthode map() pour 
        transformer chaque élément du tableau en un élément React.
        
        Lorsque vous créez une liste d'éléments, vous devez inclure une "clé" (key) spéciale.
        Les clés aident React à identifier quels éléments ont changé, ont été ajoutés ou supprimés.
        Les clés doivent être uniques parmi les frères (mais peuvent être réutilisées globalement).
        
        Idéalement, les clés devraient être des identifiants stables (comme des IDs de base de données),
        mais vous pouvez utiliser l'index du tableau comme clé en dernier recours.
      `,
      code: `// Rendu d'une liste avec des clés
function ListeUtilisateurs({ utilisateurs }) {
  return (
    <ul>
      {utilisateurs.map((utilisateur) => (
        <li key={utilisateur.id}>
          {utilisateur.nom} ({utilisateur.email})
        </li>
      ))}
    </ul>
  );
}

// Exemple d'utilisation
function App() {
  const utilisateurs = [
    { id: 1, nom: 'Alice Dupont', email: 'alice@example.com' },
    { id: 2, nom: 'Bob Martin', email: 'bob@example.com' },
    { id: 3, nom: 'Charlie Durand', email: 'charlie@example.com' }
  ];
  
  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ListeUtilisateurs utilisateurs={utilisateurs} />
    </div>
  );
}

// Liste avec filtrage et tri
function ListeFiltrable({ items }) {
  const [recherche, setRecherche] = useState('');
  const [tri, setTri] = useState('nom'); // 'nom' ou 'date'
  
  // Filtrer les items en fonction de la recherche
  const itemsFiltres = items.filter(item =>
    item.nom.toLowerCase().includes(recherche.toLowerCase())
  );
  
  // Trier les items
  const itemsTries = [...itemsFiltres].sort((a, b) => {
    if (tri === 'date') {
      return new Date(b.date) - new Date(a.date);
    }
    return a.nom.localeCompare(b.nom);
  });
  
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Rechercher..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
        
        <select value={tri} onChange={(e) => setTri(e.target.value)}>
          <option value="nom">Trier par nom</option>
          <option value="date">Trier par date</option>
        </select>
      </div>
      
      <ul>
        {itemsTries.map(item => (
          <li key={item.id}>
            {item.nom} - {new Date(item.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      language: "jsx",
    },
    forms: {
      title: "Formulaires et Événements",
      content: `
        En React, les formulaires fonctionnent un peu différemment du HTML standard.
        
        Dans un formulaire React, vous pouvez :
        - Utiliser des "composants contrôlés" où l'état React est la "source unique de vérité"
        - Gérer la soumission du formulaire avec onSubmit
        - Gérer les changements d'entrée avec onChange
        
        Les événements en React sont similaires aux événements du DOM, mais avec quelques différences :
        - Les événements React sont nommés en camelCase (onClick au lieu de onclick)
        - Avec JSX, vous passez une fonction comme gestionnaire d'événements, pas une chaîne de caractères
        - Vous devez appeler preventDefault() explicitement pour empêcher le comportement par défaut
        
        La gestion des formulaires est une compétence essentielle pour créer des applications interactives.
      `,
      code: `// Formulaire contrôlé simple
import React, { useState } from 'react';

function FormulaireContact() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: ''
  });
  const [soumis, setSoumis] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    // Validation simple
    if (!formData.nom || !formData.email || !formData.message) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    // Simuler l'envoi à un serveur
    console.log('Données du formulaire:', formData);
    setSoumis(true);
  };
  
  if (soumis) {
    return (
      <div>
        <h2>Merci pour votre message!</h2>
        <p>Nous vous répondrons bientôt à {formData.email}.</p>
        <button onClick={() => {
          setFormData({ nom: '', email: '', message: '' });
          setSoumis(false);
        }}>
          Envoyer un autre message
        </button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nom">Nom:</label>
        <input
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
        />
      </div>
      
      <button type="submit">Envoyer</button>
    </form>
  );
}`,
      language: "jsx",
    },
    context: {
      title: "Context API",
      content: `
        Le Context API de React permet de partager des données entre des composants sans avoir 
        à passer explicitement les props à chaque niveau.
        
        Il est particulièrement utile pour des données qui peuvent être considérées comme "globales" 
        pour un arbre de composants React, comme le thème actuel, l'utilisateur authentifié, 
        ou les préférences de langue.
        
        Le Context API se compose de trois parties principales :
        - React.createContext : crée un objet Context
        - Context.Provider : fournit la valeur du contexte aux composants enfants
        - Context.Consumer ou useContext : consomme la valeur du contexte
        
        Dans Next.js, le Context API est souvent utilisé pour gérer l'état global de l'application.
      `,
      code: `// Création et utilisation d'un contexte
import React, { createContext, useContext, useState } from 'react';

// Créer un contexte avec une valeur par défaut
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

// Hook personnalisé pour utiliser le contexte de thème
function useTheme() {
  return useContext(ThemeContext);
}

// Composant Provider qui fournit le contexte
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  const value = {
    theme,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Composant qui utilise le contexte
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
        color: theme === 'light' ? '#333333' : '#ffffff',
        padding: '10px 15px',
        border: '1px solid #cccccc',
        borderRadius: '4px'
      }}
    >
      Changer le thème ({theme})
    </button>
  );
}

// Composant qui utilise le composant avec contexte
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

// Application complète avec le Provider
function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: '20px' }}>
        <h1>Exemple de Context API</h1>
        <Toolbar />
      </div>
    </ThemeProvider>
  );
}`,
      language: "jsx",
    },
    exercise: {
      title: "Exercice Pratique",
      content: `
        Maintenant que vous avez appris les bases de React, essayez de résoudre cet exercice pratique.
        
        L'objectif est de créer un composant de compteur qui :
        1. Affiche un nombre
        2. A un bouton pour incrémenter le nombre
        3. A un bouton pour décrémenter le nombre
        4. Ne permet pas au nombre de devenir négatif
        
        Utilisez useState pour gérer l'état du compteur et créez des gestionnaires d'événements 
        pour les boutons d'incrémentation et de décrémentation.
        
        Cet exercice vous aidera à consolider votre compréhension des composants, des props, 
        de l'état et des événements en React.
      `,
      exercise: true,
      initialCode: `function Compteur() {
  // Utilisez useState pour créer une variable d'état "count" initialisée à 0
  
  // Créez une fonction pour incrémenter le compteur
  
  // Créez une fonction pour décrémenter le compteur
  // (assurez-vous que le compteur ne devient pas négatif)
  
  return (
    <div>
      {/* Affichez le compteur ici */}
      
      {/* Ajoutez un bouton pour incrémenter */}
      
      {/* Ajoutez un bouton pour décrémenter */}
    </div>
  );
}

// Exemple d'utilisation du composant
function App() {
  return (
    <div>
      <h1>Mon Compteur</h1>
      <Compteur />
    </div>
  );
}`,
      solutionCode: `function Compteur() {
  // Utilisez useState pour créer une variable d'état "count" initialisée à 0
  const [count, setCount] = useState(0);
  
  // Créez une fonction pour incrémenter le compteur
  const increment = () => {
    setCount(count + 1);
  };
  
  // Créez une fonction pour décrémenter le compteur
  // (assurez-vous que le compteur ne devient pas négatif)
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  
  return (
    <div>
      {/* Affichez le compteur ici */}
      <p>Compteur: {count}</p>
      
      {/* Ajoutez un bouton pour incrémenter */}
      <button onClick={increment}>Incrémenter</button>
      
      {/* Ajoutez un bouton pour décrémenter */}
      <button onClick={decrement}>Décrémenter</button>
    </div>
  );
}

// Exemple d'utilisation du composant
function App() {
  return (
    <div>
      <h1>Mon Compteur</h1>
      <Compteur />
    </div>
  );
}`,
      language: "jsx",
    },
    playground: {
      title: "Playground React",
      content: `
        Utilisez ce playground pour expérimenter avec React. 
        Écrivez votre code JSX dans l'éditeur et voyez le résultat en temps réel.
        
        Vous pouvez créer des composants, utiliser des hooks, et tester différentes fonctionnalités de React.
        
        N'hésitez pas à essayer les exemples des sections précédentes ou à créer vos propres exemples.
        
        C'est un excellent moyen de vous familiariser avec React avant de passer à Next.js.
      `,
      playground: true,
      initialCode: `// Écrivez votre code React ici
function Salutation({ nom }) {
  return <h1>Bonjour, {nom}!</h1>;
}

function ListeElements({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

function MonApp() {
  const [nom, setNom] = React.useState("Visiteur");
  const [items, setItems] = React.useState([
    "Apprendre React", 
    "Créer des composants", 
    "Utiliser des hooks"
  ]);
  
  const ajouterItem = () => {
    setItems([...items, "Nouvel élément " + (items.length + 1)]);
  };
  
  return (
    <div>
      <Salutation nom={nom} />
      
      <div>
        <label>
          Votre nom: 
          <input 
            value={nom} 
            onChange={(e) => setNom(e.target.value)} 
          />
        </label>
      </div>
      
      <h2>Ma liste de tâches:</h2>
      <ListeElements items={items} />
      
      <button onClick={ajouterItem}>
        Ajouter un élément
      </button>
    </div>
  );
}

// Rendu de l'application
ReactDOM.render(
  <MonApp />,
  document.getElementById('root')
);`,
      language: "jsx",
    },
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderSectionContent = () => {
    const section = sections[activeSection];

    return (
      <motion.div
        key={activeSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mt-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {section.title}
        </h2>
        <div className="prose max-w-none mb-6">
          {section.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700">
              {paragraph}
            </p>
          ))}
        </div>

        {section.playground ? (
          <CodePlayground
            initialCode={section.initialCode}
            language={section.language}
            title="Playground React"
            description="Expérimentez avec React et voyez le résultat en temps réel."
            height="500px"
          />
        ) : section.exercise ? (
          <ExerciseWithPreview
            exercise={{
              id: 1,
              title: "Créer un composant de compteur",
              description:
                "Créez un composant de compteur React qui permet d'incrémenter et de décrémenter un nombre.",
              instructions: [
                "Utilisez useState pour créer une variable d'état 'count' initialisée à 0",
                "Créez une fonction pour incrémenter le compteur",
                "Créez une fonction pour décrémenter le compteur (sans aller en dessous de 0)",
                "Affichez le compteur et ajoutez des boutons pour incrémenter et décrémenter",
              ],
              initialCode: section.initialCode,
              solutionCode: section.solutionCode,
              language: section.language,
              difficulty: "débutant",
              xpReward: 30,
            }}
          />
        ) : (
          <CodeEditor
            initialCode={section.code}
            language={section.language}
            height="350px"
            showPreview={true}
            autoPreview={true}
          />
        )}
      </motion.div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-gray-900">
            Fondamentaux React
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Maîtrisez les bases de React pour mieux comprendre Next.js.
          </p>
        </motion.div>

        {/* Navigation des sections */}
        <motion.div
          variants={itemVariants}
          className="border-b border-gray-200"
        >
          <nav className="flex space-x-8 overflow-x-auto pb-1">
            {Object.keys(sections).map((key) => (
              <button
                key={key}
                onClick={() => handleSectionChange(key)}
                className={`py-2 px-1 text-sm font-medium border-b-2 whitespace-nowrap ${
                  activeSection === key
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {sections[key].title}
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Contenu de la section active */}
        {renderSectionContent()}
      </motion.div>
    </div>
  );
}
