"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CodeEditor from "../../components/editor/CodeEditor";
import CodePlayground from "../../components/editor/CodePlayground";
import ExerciseWithPreview from "../../components/editor/ExerciseWithPreview";
import BackButton from "../../components/ui/BackButton";
import LearningSection from "../../components/learning/LearningSection";

export default function JavaScriptFundamentalsPage() {
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

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mb-6">
        <BackButton href="/learning-path" />
      </div>

      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Les Fondamentaux JavaScript</h1>
        <p className="text-gray-600">
          Apprenez les bases de JavaScript, le langage de programmation essentiel pour le développement web
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Barre latérale de navigation */}
        <div className="lg:col-span-1">
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-lg shadow-md p-4 sticky top-24"
          >
            <h3 className="text-lg font-medium mb-4">Sections du cours</h3>
            <nav className="space-y-2">
              <SectionLink
                id="introduction"
                active={activeSection === "introduction"}
                onClick={() => setActiveSection("introduction")}
                title="Introduction à JavaScript"
              />
              <SectionLink
                id="variables"
                active={activeSection === "variables"}
                onClick={() => setActiveSection("variables")}
                title="Variables et Types"
              />
              <SectionLink
                id="functions"
                active={activeSection === "functions"}
                onClick={() => setActiveSection("functions")}
                title="Fonctions"
              />
              <SectionLink
                id="control-flow"
                active={activeSection === "control-flow"}
                onClick={() => setActiveSection("control-flow")}
                title="Structures de contrôle"
              />
              <SectionLink
                id="arrays"
                active={activeSection === "arrays"}
                onClick={() => setActiveSection("arrays")}
                title="Tableaux et Méthodes"
              />
              <SectionLink
                id="objects"
                active={activeSection === "objects"}
                onClick={() => setActiveSection("objects")}
                title="Objets"
              />
            </nav>
          </motion.div>
        </div>

        {/* Contenu principal */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-3 bg-white rounded-lg shadow-md p-6"
        >
          {activeSection === "introduction" && (
            <IntroductionSection />
          )}

          {activeSection === "variables" && (
            <VariablesSection />
          )}

          {activeSection === "functions" && (
            <FunctionsSection />
          )}

          {activeSection === "control-flow" && (
            <ControlFlowSection />
          )}

          {activeSection === "arrays" && (
            <ArraysSection />
          )}

          {activeSection === "objects" && (
            <ObjectsSection />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

// Composant pour les liens de section
function SectionLink({ id, active, onClick, title }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
        active
          ? "bg-indigo-100 text-indigo-800 font-medium"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {title}
    </button>
  );
}

// Sections de contenu
function IntroductionSection() {
  return (
    <LearningSection title="Introduction à JavaScript">
      <p className="mb-4">
        JavaScript est un langage de programmation qui permet d'ajouter de l'interactivité aux sites web. Créé initialement pour le navigateur, il est maintenant utilisé partout : serveurs, applications mobiles, objets connectés, etc.
      </p>

      <h3 className="text-xl font-medium mt-6 mb-3">Votre premier code JavaScript</h3>
      <p className="mb-4">
        Commençons par le fameux "Hello World". En JavaScript, nous pouvons afficher du texte dans la console avec la fonction <code>console.log()</code>.
      </p>

      <CodePlayground
        initialCode={`// Mon premier programme JavaScript
console.log("Hello, World!");

// Vous pouvez aussi utiliser des variables
let message = "Bienvenue dans le monde de JavaScript";
console.log(message);`}
        height="200px"
      />

      <h3 className="text-xl font-medium mt-6 mb-3">Où JavaScript s'exécute-t-il ?</h3>
      <p className="mb-4">
        JavaScript peut s'exécuter dans différents environnements :
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Dans le navigateur (côté client)</li>
        <li>Sur un serveur avec Node.js (côté serveur)</li>
        <li>Dans des applications mobiles hybrides</li>
        <li>Dans des environnements IoT (Internet des objets)</li>
      </ul>

      <p className="mb-4">
        Aujourd'hui, nous allons nous concentrer sur JavaScript dans le navigateur, qui est le contexte le plus courant pour les débutants.
      </p>

      <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
        <h4 className="font-medium mb-2">À retenir</h4>
        <p>
          JavaScript est un langage interprété, typé dynamiquement et est l'un des trois piliers du développement web, avec HTML (structure) et CSS (présentation).
        </p>
      </div>
    </LearningSection>
  );
}

function VariablesSection() {
  return (
    <LearningSection title="Variables et Types">
      <p className="mb-4">
        En JavaScript, les variables sont des conteneurs pour stocker des données. Il existe trois façons de déclarer des variables :
      </p>

      <CodeEditor
        initialCode={`// Utilisation de 'var' (ancienne méthode, moins recommandée)
var oldWay = "Je suis une variable déclarée avec var";

// Utilisation de 'let' (recommandée pour les variables qui changent)
let price = 19.99;
price = 15.99; // On peut changer sa valeur

// Utilisation de 'const' (pour les constantes qui ne changent pas)
const PI = 3.14159;
// PI = 3.14; // Ceci provoquerait une erreur, car on ne peut pas réassigner une constante`}
        height="220px"
        readOnly={true}
      />

      <h3 className="text-xl font-medium mt-6 mb-3">Les types de données en JavaScript</h3>
      <p className="mb-4">
        JavaScript possède plusieurs types de données fondamentaux :
      </p>

      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><code>String</code> - Chaînes de caractères : <code>"Hello"</code>, <code>'World'</code></li>
        <li><code>Number</code> - Nombres : <code>42</code>, <code>3.14159</code></li>
        <li><code>Boolean</code> - Valeurs booléennes : <code>true</code>, <code>false</code></li>
        <li><code>null</code> - Valeur spéciale qui signifie "rien" ou "vide"</li>
        <li><code>undefined</code> - Valeur attribuée aux variables qui n'ont pas été initialisées</li>
        <li><code>Object</code> - Collections de données : <code>{"{\" name: \\\"John\\\", age: 30 \"}"}</code></li>
        <li><code>Array</code> - Listes ordonnées : <code>[1, 2, 3, 4]</code></li>
      </ul>

      <CodePlayground
        initialCode={`// Explorez les différents types en JavaScript
let name = "Alice";
let age = 25;
let isStudent = true;
let hobbies = ["lecture", "voyage", "photographie"];
let person = {
  firstName: "Alice",
  lastName: "Smith",
  country: "France"
};

// Vérifier le type d'une variable avec typeof
console.log("Type de name:", typeof name);
console.log("Type de age:", typeof age);
console.log("Type de isStudent:", typeof isStudent);
console.log("Type de hobbies:", typeof hobbies); // Notez que les tableaux sont considérés comme des objets
console.log("Type de person:", typeof person);

// Afficher le contenu des variables
console.log("hobbies:", hobbies);
console.log("person:", person);`}
        height="320px"
      />

      <ExerciseWithPreview
        instructions="Créez trois variables : une chaîne, un nombre et un booléen. Puis affichez leur type avec typeof."
        initialCode={`// Créez vos variables ici
// let maChaine = ?
// let monNombre = ?
// let monBooleen = ?

// Utilisez console.log() et typeof pour afficher leur type`}
        expectedOutput={`Type de maChaine: string
Type de monNombre: number
Type de monBooleen: boolean`}
        height="200px"
      />
    </LearningSection>
  );
}

function FunctionsSection() {
  return (
    <LearningSection title="Fonctions">
      <p className="mb-4">
        Les fonctions sont des blocs de code réutilisables qui effectuent une tâche spécifique. Elles permettent de structurer votre code et d'éviter les répétitions.
      </p>

      <h3 className="text-xl font-medium mt-6 mb-3">Déclaration de fonction</h3>
      <CodeEditor
        initialCode={`// Déclaration classique
function sayHello(name) {
  return "Bonjour, " + name + "!";
}

// Appel de la fonction
console.log(sayHello("Marie"));

// Fonction avec valeur par défaut
function greet(name = "visiteur") {
  return "Salut, " + name + "!";
}

console.log(greet()); // Utilise la valeur par défaut
console.log(greet("Pierre")); // Utilise l'argument fourni`}
        height="220px"
        readOnly={true}
      />

      <h3 className="text-xl font-medium mt-6 mb-3">Expressions de fonction</h3>
      <CodeEditor
        initialCode={`// Expression de fonction (fonction anonyme)
const add = function(a, b) {
  return a + b;
};

// Fonction fléchée (plus concise, introduite dans ES6)
const multiply = (a, b) => a * b;

console.log(add(5, 3)); // 8
console.log(multiply(4, 2)); // 8

// Fonction fléchée avec plusieurs instructions
const calculateArea = (width, height) => {
  const area = width * height;
  return area;
};

console.log(calculateArea(5, 3)); // 15`}
        height="280px"
        readOnly={true}
      />

      <h3 className="text-xl font-medium mt-6 mb-3">Portée des variables</h3>
      <p className="mb-4">
        La portée d'une variable détermine où cette variable est accessible dans votre code.
      </p>

      <CodePlayground
        initialCode={`// Variables globales et locales
let globalVar = "Je suis globale";

function testScope() {
  let localVar = "Je suis locale à la fonction";
  console.log(globalVar); // Accessible
  console.log(localVar); // Accessible
}

testScope();
console.log(globalVar); // Accessible
// console.log(localVar); // Erreur: localVar n'est pas accessible ici

// Blocs et portée
if (true) {
  var varVariable = "Déclarée avec var";
  let letVariable = "Déclarée avec let";
  const constVariable = "Déclarée avec const";
}

console.log(varVariable); // Accessible (var n'a pas de portée de bloc)
// console.log(letVariable); // Erreur (let a une portée de bloc)
// console.log(constVariable); // Erreur (const a une portée de bloc)`}
        height="320px"
      />

      <ExerciseWithPreview
        instructions="Créez une fonction fléchée qui prend un nombre et renvoie son carré. Ensuite, utilisez cette fonction pour calculer le carré de 5."
        initialCode={`// Créez votre fonction fléchée ici
// const carre = ?

// Appelez votre fonction avec l'argument 5
// console.log(?);`}
        expectedOutput={`25`}
        height="150px"
      />
    </LearningSection>
  );
}

function ControlFlowSection() {
  return (
    <LearningSection title="Structures de contrôle">
      <p className="mb-4">
        Les structures de contrôle permettent de diriger le flux d'exécution de votre programme en fonction de certaines conditions.
      </p>

      <h3 className="text-xl font-medium mt-6 mb-3">Conditions : if, else if, else</h3>
      <CodeEditor
        initialCode={`let age = 18;

if (age < 13) {
  console.log("Enfant");
} else if (age < 18) {
  console.log("Adolescent");
} else {
  console.log("Adulte");
}

// Version condensée avec l'opérateur ternaire
let message = age >= 18 ? "Majeur" : "Mineur";
console.log(message);`}
        height="200px"
        readOnly={true}
      />

      <h3 className="text-xl font-medium mt-6 mb-3">Switch</h3>
      <CodeEditor
        initialCode={`let day = 3;
let dayName;

switch (day) {
  case 1:
    dayName = "Lundi";
    break;
  case 2:
    dayName = "Mardi";
    break;
  case 3:
    dayName = "Mercredi";
    break;
  case 4:
    dayName = "Jeudi";
    break;
  case 5:
    dayName = "Vendredi";
    break;
  case 6:
    dayName = "Samedi";
    break;
  case 7:
    dayName = "Dimanche";
    break;
  default:
    dayName = "Jour invalide";
}

console.log("Aujourd'hui nous sommes " + dayName);`}
        height="280px"
        readOnly={true}
      />

      <h3 className="text-xl font-medium mt-6 mb-3">Boucles</h3>
      <CodePlayground
        initialCode={`// Boucle for
for (let i = 0; i < 5; i++) {
  console.log("Itération " + i);
}

// Boucle while
let count = 0;
while (count < 3) {
  console.log("Compteur : " + count);
  count++;
}

// Boucle do-while (s'exécute au moins une fois)
let num = 0;
do {
  console.log("Nombre : " + num);
  num++;
} while (num < 2);

// for...of pour parcourir les éléments d'un tableau
const fruits = ["pomme", "banane", "orange"];
for (const fruit of fruits) {
  console.log("J'aime les " + fruit + "s");
}

// for...in pour parcourir les propriétés d'un objet
const person = { name: "Thomas", age: 30, job: "développeur" };
for (const key in person) {
  console.log(key + ": " + person[key]);
}`}
        height="360px"
      />

      <ExerciseWithPreview
        instructions="Écrivez une boucle for qui affiche tous les nombres pairs de 0 à 10."
        initialCode={`// Écrivez votre boucle for ici

`}
        expectedOutput={`0
2
4
6
8
10`}
        height="150px"
      />
    </LearningSection>
  );
}

function ArraysSection() {
  return (
    <LearningSection title="Tableaux et Méthodes">
      <p className="mb-4">
        Les tableaux (arrays) sont des collections ordonnées de données. Ils peuvent contenir des éléments de n'importe quel type.
      </p>

      <h3 className="text-xl font-medium mt-6 mb-3">Création et accès aux tableaux</h3>
      <CodeEditor
        initialCode={`// Créer un tableau
let fruits = ["pomme", "banane", "orange", "kiwi"];

// Accéder aux éléments (les indices commencent à 0)
console.log(fruits[0]); // pomme
console.log(fruits[2]); // orange

// Modifier un élément
fruits[1] = "fraise";
console.log(fruits); // ["pomme", "fraise", "orange", "kiwi"]

// Connaître la longueur du tableau
console.log(fruits.length); // 4`}
        height="220px"
        readOnly={true}
      />

      <h3 className="text-xl font-medium mt-6 mb-3">Méthodes de tableau courantes</h3>
      <CodePlayground
        initialCode={`let nombres = [1, 2, 3, 4, 5];

// Ajouter des éléments
nombres.push(6); // Ajoute à la fin
console.log(nombres); // [1, 2, 3, 4, 5, 6]

nombres.unshift(0); // Ajoute au début
console.log(nombres); // [0, 1, 2, 3, 4, 5, 6]

// Supprimer des éléments
nombres.pop(); // Supprime le dernier élément
console.log(nombres); // [0, 1, 2, 3, 4, 5]

nombres.shift(); // Supprime le premier élément
console.log(nombres); // [1, 2, 3, 4, 5]

// Trouver un élément
console.log(nombres.indexOf(3)); // 2 (indice de l'élément 3)
console.log(nombres.includes(6)); // false (6 n'est pas dans le tableau)

// Découper un tableau
let sousTableau = nombres.slice(1, 4);
console.log(sousTableau); // [2, 3, 4]

// Joindre des tableaux
let plusNombres = [6, 7, 8];
let tousNombres = nombres.concat(plusNombres);
console.log(tousNombres); // [1, 2, 3, 4, 5, 6, 7, 8]

// Transformer en chaîne
console.log(nombres.join(" - ")); // "1 - 2 - 3 - 4 - 5"`}
        height="360px"
      />

      <h3 className="text-xl font-medium mt-6 mb-3">Méthodes de manipulation avancées</h3>
      <CodePlayground
        initialCode={`let numbers = [1, 2, 3, 4, 5];

// map - crée un nouveau tableau en appliquant une fonction à chaque élément
let doubles = numbers.map(number => number * 2);
console.log(doubles); // [2, 4, 6, 8, 10]

// filter - crée un nouveau tableau avec les éléments qui passent un test
let evenNumbers = numbers.filter(number => number % 2 === 0);
console.log(evenNumbers); // [2, 4]

// reduce - réduit le tableau à une seule valeur
let sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum); // 15 (1+2+3+4+5)

// forEach - exécute une fonction pour chaque élément
numbers.forEach(number => console.log("Nombre:", number));

// sort - trie les éléments
let fruits = ["banane", "pomme", "orange", "kiwi"];
fruits.sort();
console.log(fruits); // ["banane", "kiwi", "orange", "pomme"] (ordre alphabétique)

// Trier des nombres (par défaut, sort() convertit en chaînes)
let nums = [10, 5, 8, 1, 7];
nums.sort((a, b) => a - b); // Tri croissant
console.log(nums); // [1, 5, 7, 8, 10]`}
        height="360px"
      />

      <ExerciseWithPreview
        instructions="Créez un tableau de nombres de 1 à 5. Utilisez la méthode map pour créer un nouveau tableau où chaque nombre est multiplié par lui-même (son carré)."
        initialCode={`// Créez votre tableau
// let nombres = ?

// Utilisez map pour créer un tableau des carrés
// let carres = ?

// Affichez le résultat
// console.log(carres);`}
        expectedOutput={`[1, 4, 9, 16, 25]`}
        height="170px"
      />
    </LearningSection>
  );
}

function ObjectsSection() {
  return (
    <LearningSection title="Objets">
      <p className="mb-4">
        Les objets sont des collections de paires clé-valeur qui permettent de stocker et d'organiser des données connexes.
      </p>

      <h3 className="text-xl font-medium mt-6 mb-3">Création et accès aux objets</h3>
      <CodeEditor
        initialCode={`// Créer un objet
let personne = {
  nom: "Dupont",
  prenom: "Jean",
  age: 32,
  ville: "Paris",
  estEtudiant: false
};

// Accéder aux propriétés
console.log(personne.prenom); // Jean
console.log(personne["age"]); // 32

// Modifier une propriété
personne.ville = "Lyon";
console.log(personne.ville); // Lyon

// Ajouter une nouvelle propriété
personne.email = "jean.dupont@exemple.com";
console.log(personne);`}
        height="220px"
        readOnly={true}
      />

      <h3 className="text-xl font-medium mt-6 mb-3">Méthodes d'objet</h3>
      <CodePlayground
        initialCode={`// Objet avec méthodes
let utilisateur = {
  nom: "Martin",
  prenom: "Sophie",
  age: 28,
  salutation: function() {
    return "Bonjour, je m'appelle " + this.prenom + " " + this.nom;
  },
  vieillir: function() {
    this.age += 1;
    return this.prenom + " a maintenant " + this.age + " ans";
  }
};

// Appeler une méthode
console.log(utilisateur.salutation());
console.log(utilisateur.vieillir());

// Syntaxe plus concise pour les méthodes (ES6)
let calculateur = {
  a: 5,
  b: 10,
  addition() {
    return this.a + this.b;
  },
  multiplication() {
    return this.a * this.b;
  }
};

console.log(calculateur.addition()); // 15
console.log(calculateur.multiplication()); // 50`}
        height="320px"
      />

      <h3 className="text-xl font-medium mt-6 mb-3">Manipulation d'objets</h3>
      <CodePlayground
        initialCode={`// Création d'objets
let voiture = {
  marque: "Peugeot",
  modele: "308",
  annee: 2020
};

// Object.keys - obtenir toutes les clés
console.log(Object.keys(voiture)); // ["marque", "modele", "annee"]

// Object.values - obtenir toutes les valeurs
console.log(Object.values(voiture)); // ["Peugeot", "308", 2020]

// Object.entries - obtenir toutes les paires clé-valeur
console.log(Object.entries(voiture)); // [["marque", "Peugeot"], ["modele", "308"], ["annee", 2020]]

// Vérifier si une propriété existe
console.log("modele" in voiture); // true
console.log(voiture.hasOwnProperty("couleur")); // false

// Copie et fusion d'objets
let infosSupplementaires = {
  couleur: "gris",
  kilometrage: 15000
};

// Object.assign - fusionner des objets
let voitureComplete = Object.assign({}, voiture, infosSupplementaires);
console.log(voitureComplete);

// Opérateur de propagation (spread) - méthode moderne
let autreFusion = { ...voiture, ...infosSupplementaires };
console.log(autreFusion);`}
        height="340px"
      />

      <ExerciseWithPreview
        instructions="Créez un objet pour un livre avec les propriétés titre, auteur et année. Ajoutez une méthode qui renvoie une description du livre."
        initialCode={`// Créez votre objet livre
// let livre = {
//   // Propriétés
//   // ...
//   // Méthode description
//   // ...
// };

// Appelez la méthode description et affichez le résultat
// console.log(livre.description());`}
        expectedOutput={`Le livre [TITRE] a été écrit par [AUTEUR] en [ANNÉE].`}
        height="200px"
      />
    </LearningSection>
  );
}