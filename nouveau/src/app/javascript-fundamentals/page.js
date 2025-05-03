"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

  // Contenu des sections
  const sections = {
    introduction: {
      title: "Introduction à JavaScript",
      content: `
        JavaScript est un langage de programmation de haut niveau, interprété et orienté objet. 
        C'est l'un des trois piliers du développement web moderne, aux côtés de HTML et CSS.
        
        Contrairement à ce que son nom pourrait suggérer, JavaScript n'a pas grand-chose à voir avec Java. 
        Il a été créé en 1995 par Brendan Eich alors qu'il travaillait chez Netscape.
        
        JavaScript est essentiel pour créer des sites web interactifs et est à la base de frameworks 
        comme React et Next.js. Comprendre JavaScript est donc fondamental pour maîtriser Next.js.
      `,
      code: `// Un simple exemple de JavaScript
console.log("Bonjour, monde!");

// Variables et types de données
let nombre = 42;
const texte = "JavaScript est génial";
const estVrai = true;
const liste = [1, 2, 3, 4, 5];
const objet = { 
  nom: "JavaScript", 
  année: 1995 
};

// Affichage des variables
console.log(nombre);
console.log(texte);
console.log(liste[2]); // Affiche 3
console.log(objet.nom); // Affiche "JavaScript"`,
      language: "javascript",
    },
    variables: {
      title: "Variables et Types de données",
      content: `
        En JavaScript, vous pouvez déclarer des variables de trois façons :
        
        - \`var\` : ancienne façon, évitez de l'utiliser
        - \`let\` : pour les variables qui peuvent changer
        - \`const\` : pour les constantes qui ne changent pas
        
        JavaScript possède plusieurs types de données :
        
        - Primitifs : String, Number, Boolean, null, undefined, Symbol, BigInt
        - Objets : Object, Array, Function, Date, RegExp, etc.
        
        JavaScript est un langage à typage dynamique, ce qui signifie que vous n'avez pas besoin 
        de déclarer le type d'une variable lors de sa création.
      `,
      code: `// Déclaration de variables
let age = 25;
const nom = "Alice";
let estEtudiant = true;

// Modification de variables
age = 26; // Valide
// nom = "Bob"; // Erreur: on ne peut pas réassigner une constante

// Types de données
const chaîne = "Texte";
const nombre = 42;
const décimal = 3.14;
const booléen = true;
const nul = null;
const nonDéfini = undefined;
const tableau = [1, 2, 3];
const objet = { clé: "valeur" };

// Vérification de type
console.log(typeof chaîne); // "string"
console.log(typeof nombre); // "number"
console.log(typeof booléen); // "boolean"
console.log(typeof tableau); // "object" (attention!)
console.log(Array.isArray(tableau)); // true`,
      language: "javascript",
    },
    exercise1: {
      title: "Exercice - Créer une calculatrice simple",
      content: `
        Maintenant que vous avez appris les bases de JavaScript, essayez de résoudre cet exercice pratique.
        
        L'objectif est de créer une calculatrice simple qui :
        1. Prend deux nombres en entrée
        2. Permet d'effectuer les 4 opérations de base (addition, soustraction, multiplication, division)
        3. Gère le cas de la division par zéro
        4. Retourne le résultat de l'opération
        
        Utilisez vos connaissances sur les fonctions, les conditions et les opérateurs pour compléter cet exercice.
        
        Cet exercice vous aidera à consolider votre compréhension des concepts de base de JavaScript.
      `,
      exercise: true,
      initialCode: `// Complétez les fonctions ci-dessous pour créer une calculatrice simple

// Fonction d'addition
function additionner(a, b) {
  // Votre code ici
}

// Fonction de soustraction
function soustraire(a, b) {
  // Votre code ici
}

// Fonction de multiplication
function multiplier(a, b) {
  // Votre code ici
}

// Fonction de division
function diviser(a, b) {
  // Votre code ici
  // N'oubliez pas de gérer la division par zéro
}

// Fonction calculatrice qui utilise les fonctions ci-dessus
function calculer(a, b, operation) {
  // Votre code ici
  // L'opération peut être: 'addition', 'soustraction', 'multiplication', 'division'
}

// Tests (ne pas modifier)
console.log(calculer(5, 3, 'addition')); // Devrait afficher 8
console.log(calculer(5, 3, 'soustraction')); // Devrait afficher 2
console.log(calculer(5, 3, 'multiplication')); // Devrait afficher 15
console.log(calculer(6, 3, 'division')); // Devrait afficher 2
console.log(calculer(5, 0, 'division')); // Devrait afficher "Erreur: Division par zéro"`,
      solutionCode: `// Complétez les fonctions ci-dessous pour créer une calculatrice simple

// Fonction d'addition
function additionner(a, b) {
  return a + b;
}

// Fonction de soustraction
function soustraire(a, b) {
  return a - b;
}

// Fonction de multiplication
function multiplier(a, b) {
  return a * b;
}

// Fonction de division
function diviser(a, b) {
  if (b === 0) {
    return "Erreur: Division par zéro";
  }
  return a / b;
}

// Fonction calculatrice qui utilise les fonctions ci-dessus
function calculer(a, b, operation) {
  switch (operation) {
    case 'addition':
      return additionner(a, b);
    case 'soustraction':
      return soustraire(a, b);
    case 'multiplication':
      return multiplier(a, b);
    case 'division':
      return diviser(a, b);
    default:
      return "Opération non reconnue";
  }
}

// Tests (ne pas modifier)
console.log(calculer(5, 3, 'addition')); // Devrait afficher 8
console.log(calculer(5, 3, 'soustraction')); // Devrait afficher 2
console.log(calculer(5, 3, 'multiplication')); // Devrait afficher 15
console.log(calculer(6, 3, 'division')); // Devrait afficher 2
console.log(calculer(5, 0, 'division')); // Devrait afficher "Erreur: Division par zéro"`,
      language: "javascript",
    },
    exercise2: {
      title: "Quiz - Manipulations de tableaux",
      content: `
        Maintenant, passons à un exercice plus avancé sur les manipulations de tableaux.
        
        Les méthodes de tableau comme map, filter, reduce, et sort sont essentielles en JavaScript moderne
        et sont très utilisées dans React et Next.js pour manipuler des données.
        
        Dans cet exercice, vous devrez :
        1. Filtrer un tableau pour ne garder que les nombres pairs
        2. Transformer un tableau en doublant chaque valeur
        3. Calculer la somme de tous les éléments d'un tableau
        4. Trier un tableau d'objets selon une propriété
        
        Utilisez exclusivement les méthodes de tableau (pas de boucles for/while) pour résoudre ces problèmes.
      `,
      exercise: true,
      initialCode: `// Travaillez avec les tableaux en utilisant les méthodes map, filter, reduce et sort

// 1. Filtrez le tableau pour ne garder que les nombres pairs
function filtrerPairs(nombres) {
  // Votre code ici
}

// 2. Doublez chaque valeur dans le tableau
function doublerValeurs(nombres) {
  // Votre code ici
}

// 3. Calculez la somme de tous les éléments du tableau
function calculerSomme(nombres) {
  // Votre code ici
}

// 4. Triez le tableau d'objets par âge (du plus jeune au plus âgé)
function trierParAge(personnes) {
  // Votre code ici
}

// Tests (ne pas modifier)
const nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(filtrerPairs(nombres)); // Devrait afficher [2, 4, 6, 8, 10]
console.log(doublerValeurs(nombres)); // Devrait afficher [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
console.log(calculerSomme(nombres)); // Devrait afficher 55

const personnes = [
  { nom: "Alice", age: 30 },
  { nom: "Bob", age: 25 },
  { nom: "Charlie", age: 35 },
  { nom: "David", age: 28 }
];
console.log(trierParAge(personnes)); 
// Devrait afficher le tableau trié avec Bob en premier (25 ans) et Charlie en dernier (35 ans)`,
      solutionCode: `// Travaillez avec les tableaux en utilisant les méthodes map, filter, reduce et sort

// 1. Filtrez le tableau pour ne garder que les nombres pairs
function filtrerPairs(nombres) {
  return nombres.filter(nombre => nombre % 2 === 0);
}

// 2. Doublez chaque valeur dans le tableau
function doublerValeurs(nombres) {
  return nombres.map(nombre => nombre * 2);
}

// 3. Calculez la somme de tous les éléments du tableau
function calculerSomme(nombres) {
  return nombres.reduce((somme, nombre) => somme + nombre, 0);
}

// 4. Triez le tableau d'objets par âge (du plus jeune au plus âgé)
function trierParAge(personnes) {
  return [...personnes].sort((a, b) => a.age - b.age);
}

// Tests (ne pas modifier)
const nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(filtrerPairs(nombres)); // Devrait afficher [2, 4, 6, 8, 10]
console.log(doublerValeurs(nombres)); // Devrait afficher [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
console.log(calculerSomme(nombres)); // Devrait afficher 55

const personnes = [
  { nom: "Alice", age: 30 },
  { nom: "Bob", age: 25 },
  { nom: "Charlie", age: 35 },
  { nom: "David", age: 28 }
];
console.log(trierParAge(personnes)); 
// Devrait afficher le tableau trié avec Bob en premier (25 ans) et Charlie en dernier (35 ans)`,
      language: "javascript",
    },
    functions: {
      title: "Fonctions",
      content: `
        Les fonctions sont des blocs de code réutilisables qui effectuent une tâche spécifique.
        En JavaScript, il existe plusieurs façons de définir des fonctions :
        
        - Déclaration de fonction
        - Expression de fonction
        - Fonction fléchée (ES6)
        
        Les fonctions peuvent accepter des paramètres et retourner des valeurs.
        Elles sont essentielles pour structurer votre code et éviter les répétitions.
        
        Dans React et Next.js, vous utiliserez beaucoup les fonctions fléchées, 
        notamment pour définir des composants et des gestionnaires d'événements.
      `,
      code: `// Déclaration de fonction
function saluer(nom) {
  return "Bonjour, " + nom + "!";
}

// Expression de fonction
const direAuRevoir = function(nom) {
  return "Au revoir, " + nom + "!";
};

// Fonction fléchée (ES6)
const saluerFormellement = (titre, nom) => {
  return \`Bonjour, \${titre} \${nom}.\`;
};

// Fonction fléchée avec retour implicite
const additionner = (a, b) => a + b;

// Appel de fonctions
console.log(saluer("Marie")); // "Bonjour, Marie!"
console.log(direAuRevoir("Jean")); // "Au revoir, Jean!"
console.log(saluerFormellement("Dr", "Smith")); // "Bonjour, Dr Smith."
console.log(additionner(5, 3)); // 8

// Fonctions comme paramètres (callbacks)
function exécuterFonction(fn, valeur) {
  return fn(valeur);
}

console.log(exécuterFonction((x) => x * 2, 10)); // 20`,
      language: "javascript",
    },
    objects: {
      title: "Objets et Tableaux",
      content: `
        Les objets et les tableaux sont des structures de données fondamentales en JavaScript.
        
        Les objets sont des collections de paires clé-valeur, où les clés sont des chaînes de caractères 
        et les valeurs peuvent être de n'importe quel type.
        
        Les tableaux sont des listes ordonnées de valeurs, accessibles par leur index (commençant à 0).
        
        La manipulation d'objets et de tableaux est essentielle en React et Next.js, notamment pour 
        gérer l'état de vos composants et les données de votre application.
      `,
      code: `// Objets
const personne = {
  nom: "Dupont",
  prénom: "Jean",
  âge: 30,
  adresse: {
    rue: "123 Rue Principale",
    ville: "Paris",
    codePostal: "75001"
  }
};

// Accès aux propriétés
console.log(personne.nom); // "Dupont"
console.log(personne["prénom"]); // "Jean"
console.log(personne.adresse.ville); // "Paris"

// Modification de propriétés
personne.âge = 31;
personne.adresse.ville = "Lyon";

// Ajout de propriétés
personne.email = "jean.dupont@example.com";

// Tableaux
const nombres = [1, 2, 3, 4, 5];
const fruits = ["pomme", "banane", "orange"];
const mixte = [1, "deux", { trois: 3 }, [4, 5]];

// Accès aux éléments
console.log(nombres[0]); // 1
console.log(fruits[1]); // "banane"
console.log(mixte[2].trois); // 3

// Méthodes de tableau utiles
console.log(nombres.length); // 5
console.log(fruits.join(", ")); // "pomme, banane, orange"
console.log(nombres.map(n => n * 2)); // [2, 4, 6, 8, 10]
console.log(nombres.filter(n => n > 3)); // [4, 5]
console.log(nombres.reduce((acc, n) => acc + n, 0)); // 15`,
      language: "javascript",
    },
    async: {
      title: "Asynchrone et Promesses",
      content: `
        JavaScript est un langage à thread unique, mais il peut gérer des opérations asynchrones 
        grâce aux callbacks, aux promesses et à async/await.
        
        Les promesses sont des objets qui représentent la complétion ou l'échec éventuel 
        d'une opération asynchrone. Elles permettent d'écrire du code asynchrone de manière plus lisible.
        
        async/await est une syntaxe introduite en ES2017 qui permet d'écrire du code asynchrone 
        comme s'il était synchrone, ce qui le rend plus facile à lire et à déboguer.
        
        Dans Next.js, vous utiliserez souvent async/await pour récupérer des données depuis une API 
        ou une base de données.
      `,
      code: `// Promesses
const promesse = new Promise((resolve, reject) => {
  setTimeout(() => {
    const réussite = true;
    if (réussite) {
      resolve("Opération réussie!");
    } else {
      reject("Erreur: l'opération a échoué");
    }
  }, 1000);
});

// Utilisation de .then() et .catch()
promesse
  .then(résultat => {
    console.log(résultat); // "Opération réussie!"
    return "Données transformées";
  })
  .then(nouvelleDonnée => {
    console.log(nouvelleDonnée); // "Données transformées"
  })
  .catch(erreur => {
    console.error(erreur);
  });

// async/await
async function récupérerDonnées() {
  try {
    // Simuler un appel API
    const réponse = await fetch('https://api.example.com/data');
    const données = await réponse.json();
    return données;
  } catch (erreur) {
    console.error("Erreur lors de la récupération des données:", erreur);
    throw erreur;
  }
}

// Exemple d'utilisation dans Next.js
async function chargerDonnéesUtilisateur(id) {
  try {
    const utilisateur = await récupérerDonnées(\`/api/utilisateurs/\${id}\`);
    console.log(utilisateur);
  } catch (erreur) {
    console.error("Impossible de charger l'utilisateur:", erreur);
  }
}`,
      language: "javascript",
    },
    es6: {
      title: "Fonctionnalités ES6+",
      content: `
        ECMAScript 6 (ES6), également connu sous le nom d'ECMAScript 2015, a introduit de nombreuses 
        fonctionnalités qui ont révolutionné la façon d'écrire du JavaScript.
        
        Parmi ces fonctionnalités, on trouve :
        - Les fonctions fléchées
        - La déstructuration
        - Les paramètres par défaut
        - Le spread operator
        - Les template literals
        - Les classes
        - Les modules import/export
        
        Ces fonctionnalités sont largement utilisées dans React et Next.js, et les comprendre 
        est essentiel pour écrire du code moderne et efficace.
      `,
      code: `// Déstructuration
const personne = { nom: "Dupont", prénom: "Jean", âge: 30 };
const { nom, prénom } = personne;
console.log(nom, prénom); // "Dupont Jean"

const nombres = [1, 2, 3, 4, 5];
const [premier, deuxième, ...reste] = nombres;
console.log(premier, deuxième, reste); // 1 2 [3, 4, 5]

// Paramètres par défaut
function saluer(nom = "visiteur") {
  return \`Bonjour, \${nom}!\`;
}
console.log(saluer()); // "Bonjour, visiteur!"
console.log(saluer("Marie")); // "Bonjour, Marie!"

// Spread operator
const tableau1 = [1, 2, 3];
const tableau2 = [4, 5, 6];
const combiné = [...tableau1, ...tableau2];
console.log(combiné); // [1, 2, 3, 4, 5, 6]

const objet1 = { a: 1, b: 2 };
const objet2 = { b: 3, c: 4 }; // Notez que b est présent dans les deux objets
const combinéObjet = { ...objet1, ...objet2 };
console.log(combinéObjet); // { a: 1, b: 3, c: 4 } (b de objet2 écrase b de objet1)

// Classes
class Animal {
  constructor(nom) {
    this.nom = nom;
  }
  
  parler() {
    return \`\${this.nom} fait du bruit.\`;
  }
}

class Chien extends Animal {
  constructor(nom, race) {
    super(nom);
    this.race = race;
  }
  
  parler() {
    return \`\${this.nom} aboie!\`;
  }
}

const monChien = new Chien("Rex", "Berger Allemand");
console.log(monChien.parler()); // "Rex aboie!"`,
      language: "javascript",
    },
    playground: {
      title: "Playground JavaScript",
      content: `
        Utilisez ce playground pour expérimenter avec JavaScript. 
        Écrivez votre code dans l'éditeur et voyez le résultat en temps réel.
        
        Vous pouvez utiliser console.log() pour afficher des valeurs dans la prévisualisation.
        
        N'hésitez pas à essayer les exemples des sections précédentes ou à créer vos propres exemples.
        
        C'est un excellent moyen de vous familiariser avec JavaScript avant de passer à React et Next.js.
      `,
      playground: true,
      initialCode: `// Écrivez votre code JavaScript ici
console.log("Bienvenue dans le playground JavaScript!");

// Essayez de créer des variables
const nom = "Utilisateur";
let compteur = 0;

// Créez une fonction
function incrémenter() {
  compteur++;
  return compteur;
}

// Utilisez la fonction
console.log(\`Bonjour, \${nom}!\`);
console.log("Compteur:", incrémenter());
console.log("Compteur:", incrémenter());

// Créez un tableau et utilisez des méthodes de tableau
const nombres = [1, 2, 3, 4, 5];
const doublés = nombres.map(n => n * 2);
console.log("Nombres doublés:", doublés);

// Essayez une promesse
const promesseSimple = Promise.resolve("Promesse résolue!");
promesseSimple.then(résultat => console.log(résultat));`,
      language: "javascript",
    },
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderSectionContent = () => {
    const section = sections[activeSection];

    // Utiliser le composant LearningSection pour les sections avec exercices interactifs
    if (activeSection === "variables") {
      return (
        <LearningSection
          title="Variables et Types de données"
          description="Maîtrisez les variables et types de données essentiels en JavaScript"
          theory={
            <>
              <h3 className="text-xl font-semibold mb-3">
                Les variables en JavaScript
              </h3>
              <p className="mb-3">
                En JavaScript, vous pouvez déclarer des variables de trois
                façons :
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <code className="bg-gray-100 px-1 rounded">var</code> :
                  ancienne façon, évitez de l'utiliser
                </li>
                <li>
                  <code className="bg-gray-100 px-1 rounded">let</code> : pour
                  les variables qui peuvent changer
                </li>
                <li>
                  <code className="bg-gray-100 px-1 rounded">const</code> : pour
                  les constantes qui ne changent pas
                </li>
              </ul>
              <p className="mb-3">
                JavaScript possède plusieurs types de données :
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>Primitifs</strong> : String, Number, Boolean, null,
                  undefined, Symbol, BigInt
                </li>
                <li>
                  <strong>Objets</strong> : Object, Array, Function, Date,
                  RegExp, etc.
                </li>
              </ul>
              <p>
                JavaScript est un langage à typage dynamique, ce qui signifie
                que vous n'avez pas besoin de déclarer le type d'une variable
                lors de sa création.
              </p>
            </>
          }
          example={{
            description:
              "Découvrez comment déclarer et utiliser les variables et types de données en JavaScript :",
            code: `// Déclaration de variables
let age = 25;
const nom = "Alice";
let estEtudiant = true;

// Modification de variables
age = 26; // Valide
// nom = "Bob"; // Erreur: on ne peut pas réassigner une constante

// Types de données
const chaîne = "Texte";
const nombre = 42;
const décimal = 3.14;
const booléen = true;
const nul = null;
const nonDéfini = undefined;
const tableau = [1, 2, 3];
const objet = { clé: "valeur" };

// Vérification de type
console.log(typeof chaîne); // "string"
console.log(typeof nombre); // "number"
console.log(typeof booléen); // "boolean"
console.log(typeof tableau); // "object" (attention!)
console.log(Array.isArray(tableau)); // true`,
            language: "javascript",
            readOnly: true,
          }}
          quiz={{
            title: "Quiz sur les variables et types",
            questions: [
              {
                question:
                  "Quelle déclaration de variable devriez-vous utiliser pour une valeur qui ne changera jamais ?",
                options: ["var", "let", "const", "static"],
                correctAnswer: "const",
              },
              {
                question: "Quel est le résultat de typeof [1, 2, 3] ?",
                options: ["array", "object", "list", "undefined"],
                correctAnswer: "object",
              },
              {
                question:
                  "Quelle méthode permet de vérifier si une variable est un tableau ?",
                options: [
                  "isArray()",
                  "Array.isArray()",
                  "typeof",
                  "instanceof Array",
                ],
                correctAnswer: "Array.isArray()",
              },
            ],
          }}
          practice={{
            title: "Identifier les types",
            description:
              "Identifiez le type de donnée pour chaque valeur suivante :",
            type: "multiple",
            options: [
              { id: 1, text: "42 est de type 'number'", correct: true },
              { id: 2, text: "'true' est de type 'boolean'", correct: false },
              {
                id: 3,
                text: "undefined est de type 'undefined'",
                correct: true,
              },
              { id: 4, text: "null est de type 'null'", correct: false },
              { id: 5, text: "[1, 2, 3] est de type 'array'", correct: false },
            ],
          }}
          codeExercise={{
            id: "variables-exercise",
            title: "Déclarer et manipuler des variables",
            description:
              "Complétez le code pour déclarer et manipuler différentes variables :",
            instructions: [
              "Déclarez une constante nomComplét qui combine prénom et nom",
              "Créez un tableau notes avec 3 valeurs numériques",
              "Calculez la moyenne des notes et stockez-la dans moyenneNotes",
              "Créez un objet etudiant avec les propriétés nomComplét, age et moyenneNotes",
            ],
            initialCode: `// Variables données
const prénom = "Marie";
const nom = "Dupont";
const age = 22;

// À vous de jouer !
// 1. Combinez le prénom et le nom
const nomComplet = /* votre code ici */;

// 2. Créez un tableau de notes
const notes = /* votre code ici */;

// 3. Calculez la moyenne des notes
const moyenneNotes = /* votre code ici */;

// 4. Créez un objet etudiant
const etudiant = /* votre code ici */;

// Tests - Ne pas modifier
console.log(nomComplet); // Devrait afficher "Marie Dupont"
console.log(notes.length); // Devrait afficher 3
console.log(moyenneNotes); // Devrait être la moyenne de vos notes
console.log(etudiant.nomComplet); // Devrait afficher "Marie Dupont"
console.log(etudiant.age); // Devrait afficher 22
console.log(etudiant.moyenneNotes); // Devrait être égal à moyenneNotes`,
            solutionCode: `// Variables données
const prénom = "Marie";
const nom = "Dupont";
const age = 22;

// À vous de jouer !
// 1. Combinez le prénom et le nom
const nomComplet = prénom + " " + nom;

// 2. Créez un tableau de notes
const notes = [15, 17, 14];

// 3. Calculez la moyenne des notes
const moyenneNotes = (notes[0] + notes[1] + notes[2]) / notes.length;

// 4. Créez un objet etudiant
const etudiant = {
  nomComplet: nomComplet,
  age: age,
  moyenneNotes: moyenneNotes
};

// Tests - Ne pas modifier
console.log(nomComplet); // Devrait afficher "Marie Dupont"
console.log(notes.length); // Devrait afficher 3
console.log(moyenneNotes); // Devrait être la moyenne de vos notes
console.log(etudiant.nomComplet); // Devrait afficher "Marie Dupont"
console.log(etudiant.age); // Devrait afficher 22
console.log(etudiant.moyenneNotes); // Devrait être égal à moyenneNotes`,
            language: "javascript",
            difficulty: "débutant",
            xpReward: 25,
          }}
          keyPoints={[
            "En JavaScript, utilisez let pour les variables qui changent et const pour celles qui ne changent pas",
            "JavaScript est à typage dynamique, le type d'une variable peut changer au cours de l'exécution",
            "Les types primitifs incluent string, number, boolean, null et undefined",
            "typeof retourne 'object' pour les tableaux, utilisez Array.isArray() pour identifier les tableaux",
            "Les objets permettent de regrouper des données reliées sous forme de paires clé-valeur",
          ]}
          onComplete={(section, points) =>
            console.log(`Section ${section} complétée, ${points} points gagnés`)
          }
        />
      );
    } else if (activeSection === "functions") {
      return (
        <LearningSection
          title="Fonctions"
          description="Maîtrisez les fonctions JavaScript, essentielles pour structurer votre code"
          theory={
            <>
              <h3 className="text-xl font-semibold mb-3">
                Les fonctions en JavaScript
              </h3>
              <p className="mb-3">
                Les fonctions sont des blocs de code réutilisables qui
                effectuent une tâche spécifique. En JavaScript, il existe
                plusieurs façons de définir des fonctions :
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>Déclaration de fonction</strong> :{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    function nomFonction() {}
                  </code>
                </li>
                <li>
                  <strong>Expression de fonction</strong> :{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    const nomFonction = function() {}
                  </code>
                </li>
                <li>
                  <strong>Fonction fléchée (ES6)</strong>: {" "}
                  <code className="bg-gray-100 px-1 rounded">
                    const nomFonction = () =&gt; {}
                  </code>
                </li>
              </ul>
              <p className="mb-3">
                Les fonctions peuvent accepter des paramètres (entrées) et
                retourner des valeurs (sortie). Elles sont essentielles pour
                structurer votre code et éviter les répétitions.
              </p>
              <p>
                Dans React et Next.js, vous utiliserez beaucoup les fonctions
                fléchées, notamment pour définir des composants et des
                gestionnaires d'événements.
              </p>
            </>
          }
          example={{
            description:
              "Voici comment déclarer et utiliser différents types de fonctions en JavaScript :",
            code: `// Déclaration de fonction
function saluer(nom) {
  return "Bonjour, " + nom + "!";
}

// Expression de fonction
const direAuRevoir = function(nom) {
  return "Au revoir, " + nom + "!";
};

// Fonction fléchée (ES6)
const saluerFormellement = (titre, nom) => {
  return \`Bonjour, \${titre} \${nom}.\`;
};

// Fonction fléchée avec retour implicite
const additionner = (a, b) => a + b;

// Appel de fonctions
console.log(saluer("Marie")); // "Bonjour, Marie!"
console.log(direAuRevoir("Jean")); // "Au revoir, Jean!"
console.log(saluerFormellement("Dr", "Smith")); // "Bonjour, Dr Smith."
console.log(additionner(5, 3)); // 8

// Fonctions comme paramètres (callbacks)
function exécuterFonction(fn, valeur) {
  return fn(valeur);
}

console.log(exécuterFonction((x) => x * 2, 10)); // 20`,
            language: "javascript",
            readOnly: true,
          }}
          quiz={{
            title: "Quiz sur les fonctions",
            questions: [
              {
                question:
                  "Quelle est la différence principale entre les déclarations de fonction et les expressions de fonction ?",
                options: [
                  "Il n'y a aucune différence",
                  "Les déclarations sont hissées (hoisted), les expressions non",
                  "Les expressions peuvent être anonymes, les déclarations non",
                  "Les déclarations ne peuvent pas avoir de paramètres",
                ],
                correctAnswer:
                  "Les déclarations sont hissées (hoisted), les expressions non",
              },
              {
                question:
                  "Quel type de fonction est le plus utilisé dans React pour les composants ?",
                options: [
                  "Déclaration de fonction",
                  "Expression de fonction",
                  "Fonction fléchée",
                  "Classe",
                ],
                correctAnswer: "Fonction fléchée",
              },
              {
                question:
                  "Quelle est la valeur retournée par console.log(additionner(5, 3)) avec additionner = (a, b) => a + b ?",
                options: ["undefined", "null", "8", "5 + 3"],
                correctAnswer: "8",
              },
            ],
          }}
          practice={{
            title: "Compléter les phrases sur les fonctions",
            description:
              "Identifiez les affirmations correctes concernant les fonctions JavaScript :",
            type: "multiple",
            options: [
              {
                id: 1,
                text: "Les fonctions fléchées ont leur propre 'this'",
                correct: false,
              },
              {
                id: 2,
                text: "Les fonctions peuvent être passées comme arguments à d'autres fonctions",
                correct: true,
              },
              {
                id: 3,
                text: "Une fonction sans instruction return renvoie undefined",
                correct: true,
              },
              {
                id: 4,
                text: "Les fonctions fléchées ne peuvent pas avoir de paramètres",
                correct: false,
              },
              {
                id: 5,
                text: "Les fonctions sont des objets de première classe en JavaScript",
                correct: true,
              },
            ],
          }}
          codeExercise={{
            id: "functions-exercise",
            title: "Créer et utiliser des fonctions",
            description: "Complétez le code pour créer différentes fonctions :",
            instructions: [
              "Créez une fonction multiplier qui prend deux paramètres et retourne leur produit",
              "Implémentez la fonction calculer qui prend deux nombres et une fonction opération, et retourne le résultat",
              "Créez une fonction fléchée estPair qui vérifie si un nombre est pair",
              "Complétez la fonction appliquerÀTous qui applique une fonction à chaque élément d'un tableau",
            ],
            initialCode: `// 1. Fonction de multiplication
function multiplier(/* votre code ici */) {
  // Votre code ici
}

// 2. Fonction de calcul générique
function calculer(a, b, opération) {
  // Votre code ici
}

// 3. Fonction fléchée pour vérifier si un nombre est pair
const estPair = /* votre code ici */;

// 4. Fonction qui applique une fonction à chaque élément d'un tableau
function appliquerÀTous(tableau, fn) {
  // Votre code ici
}

// Tests - Ne pas modifier
console.log(multiplier(4, 5)); // Devrait afficher 20
console.log(calculer(10, 5, (a, b) => a - b)); // Devrait afficher 5
console.log(estPair(4)); // Devrait afficher true
console.log(estPair(7)); // Devrait afficher false
console.log(appliquerÀTous([1, 2, 3], x => x * x)); // Devrait afficher [1, 4, 9]`,
            solutionCode: `// 1. Fonction de multiplication
function multiplier(a, b) {
  return a * b;
}

// 2. Fonction de calcul générique
function calculer(a, b, opération) {
  return opération(a, b);
}

// 3. Fonction fléchée pour vérifier si un nombre est pair
const estPair = nombre => nombre % 2 === 0;

// 4. Fonction qui applique une fonction à chaque élément d'un tableau
function appliquerÀTous(tableau, fn) {
  const résultat = [];
  for (let i = 0; i < tableau.length; i++) {
    résultat.push(fn(tableau[i]));
  }
  return résultat;
  
  // Alternative moderne:
  // return tableau.map(fn);
}

// Tests - Ne pas modifier
console.log(multiplier(4, 5)); // Devrait afficher 20
console.log(calculer(10, 5, (a, b) => a - b)); // Devrait afficher 5
console.log(estPair(4)); // Devrait afficher true
console.log(estPair(7)); // Devrait afficher false
console.log(appliquerÀTous([1, 2, 3], x => x * x)); // Devrait afficher [1, 4, 9]`,
            language: "javascript",
            difficulty: "intermédiaire",
            xpReward: 35,
          }}
          keyPoints={[
            "Les fonctions permettent de regrouper du code qui peut être réutilisé à plusieurs endroits",
            "Les fonctions fléchées offrent une syntaxe plus concise et n'ont pas leur propre this",
            "Les fonctions peuvent prendre des paramètres et retourner des valeurs",
            "Les fonctions sont des objets de première classe : elles peuvent être assignées à des variables, passées en arguments, et retournées",
            "Les fonctions de callback sont essentielles dans le développement JavaScript moderne, notamment avec React et Next.js",
          ]}
          onComplete={(section, points) =>
            console.log(`Section ${section} complétée, ${points} points gagnés`)
          }
        />
      );
    } else if (activeSection === "objects") {
      return (
        <LearningSection
          title="Objets et Tableaux"
          description="Maîtrisez les structures de données fondamentales en JavaScript"
          theory={
            <>
              <h3 className="text-xl font-semibold mb-3">
                Objets et Tableaux en JavaScript
              </h3>
              <p className="mb-3">
                Les objets et les tableaux sont des structures de données
                fondamentales en JavaScript :
              </p>
              <p className="mb-3">
                <strong>Objets</strong> : collections de paires clé-valeur où :
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Les clés sont des chaînes de caractères (ou symboles)</li>
                <li>Les valeurs peuvent être de n'importe quel type</li>
                <li>
                  L'accès se fait par la notation point (
                  <code>objet.propriété</code>) ou crochets (
                  <code>objet["propriété"]</code>)
                </li>
                <li>
                  Les objets sont modifiables (mutables) : vous pouvez ajouter,
                  modifier ou supprimer des propriétés
                </li>
              </ul>
              <p className="mb-3">
                <strong>Tableaux</strong> : collections ordonnées de valeurs où
                :
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>
                  Les valeurs sont accessibles par leur index numérique (à
                  partir de 0)
                </li>
                <li>L'ordre des éléments est préservé</li>
                <li>
                  Les tableaux disposent de nombreuses méthodes utiles (map,
                  filter, reduce, etc.)
                </li>
              </ul>
              <p>
                La manipulation d'objets et de tableaux est essentielle en React
                et Next.js, notamment pour gérer l'état des composants et les
                données de l'application.
              </p>
            </>
          }
          example={{
            description:
              "Voici comment créer et manipuler des objets et des tableaux en JavaScript :",
            code: `// Création d'objets
const personne = {
  nom: "Dupont",
  prénom: "Jean",
  âge: 30,
  adresse: {
    rue: "123 Rue Principale",
    ville: "Paris",
    codePostal: "75001"
  }
};

// Accès et modification des propriétés
console.log(personne.nom); // "Dupont"
console.log(personne["prénom"]); // "Jean"
console.log(personne.adresse.ville); // "Paris"

personne.âge = 31; // Modification
personne.email = "jean.dupont@example.com"; // Ajout de propriété

// Création de tableaux
const nombres = [1, 2, 3, 4, 5];
const fruits = ["pomme", "banane", "orange"];
const mixte = [1, "deux", { trois: 3 }, [4, 5]];

// Accès et modification des éléments
console.log(nombres[0]); // 1
console.log(fruits[1]); // "banane"
console.log(mixte[2].trois); // 3

// Méthodes de tableau utiles
console.log(nombres.length); // 5
console.log(fruits.join(", ")); // "pomme, banane, orange"

// forEach : itérer sur chaque élément
nombres.forEach(n => console.log(n)); // Affiche chaque nombre

// map : transformer les éléments
const doublés = nombres.map(n => n * 2);
console.log(doublés); // [2, 4, 6, 8, 10]

// filter : filtrer les éléments
const supérieursTrois = nombres.filter(n => n > 3);
console.log(supérieursTrois); // [4, 5]

// reduce : réduire à une seule valeur
const somme = nombres.reduce((total, n) => total + n, 0);
console.log(somme); // 15`,
            language: "javascript",
            readOnly: true,
          }}
          quiz={{
            title: "Quiz sur les objets et tableaux",
            questions: [
              {
                question:
                  "Comment accéder à la propriété 'ville' de l'objet d'adresse dans : const personne = { nom: 'Dupont', adresse: { ville: 'Paris' } }; ?",
                options: [
                  "personne.ville",
                  "personne.adresse.ville",
                  "personne[adresse][ville]",
                  "personne.adresse[ville]",
                ],
                correctAnswer: "personne.adresse.ville",
              },
              {
                question:
                  "Quelle méthode permet de créer un nouveau tableau en appliquant une fonction à chaque élément ?",
                options: ["forEach()", "filter()", "map()", "reduce()"],
                correctAnswer: "map()",
              },
              {
                question:
                  "Quelle est la valeur de l'expression [1, 2, 3].reduce((acc, n) => acc + n, 0) ?",
                options: ["6", "123", "3", "0123"],
                correctAnswer: "6",
              },
            ],
          }}
          practice={{
            title: "Reconnaître les opérations sur tableaux",
            description:
              "Identifiez l'opération correspondant à chaque description :",
            type: "multiple",
            options: [
              {
                id: 1,
                text: "La méthode 'filter' renvoie un nouveau tableau de même longueur que l'original",
                correct: false,
              },
              {
                id: 2,
                text: "La méthode 'map' transforme chaque élément du tableau en appliquant une fonction",
                correct: true,
              },
              {
                id: 3,
                text: "La méthode 'reduce' combine tous les éléments du tableau en une seule valeur",
                correct: true,
              },
              {
                id: 4,
                text: "La méthode 'forEach' renvoie un nouveau tableau",
                correct: false,
              },
              {
                id: 5,
                text: "La méthode 'sort' modifie le tableau original",
                correct: true,
              },
            ],
          }}
          codeExercise={{
            id: "objects-arrays-exercise",
            title: "Manipuler des objets et tableaux",
            description:
              "Complétez le code pour manipuler des objets et tableaux en JavaScript :",
            instructions: [
              "Ajoutez une méthode 'nomComplet' à l'objet étudiant qui renvoie le prénom et le nom combinés",
              "Créez une fonction qui recherche l'étudiant ayant la note moyenne la plus élevée",
              "Créez une fonction qui renvoie un tableau des noms complets de tous les étudiants",
              "Calculez la note moyenne de tous les étudiants",
            ],
            initialCode: `// Données d'étudiants
const étudiants = [
  { prénom: "Marie", nom: "Dupont", notes: [15, 17, 16] },
  { prénom: "Jean", nom: "Martin", notes: [12, 13, 15] },
  { prénom: "Sophie", nom: "Durand", notes: [18, 15, 19] }
];

// 1. Ajouter une méthode pour obtenir le nom complet
étudiants.forEach(étudiant => {
  // Votre code ici : ajoutez une méthode nomComplet
});

// 2. Trouver l'étudiant avec la moyenne la plus élevée
function trouverMeilleurÉtudiant(étudiants) {
  // Votre code ici
}

// 3. Créer un tableau de tous les noms complets
function obtenirNomsComplets(étudiants) {
  // Votre code ici
}

// 4. Calculer la moyenne de tous les étudiants
function calculerMoyenneGlobale(étudiants) {
  // Votre code ici
}

// Tests - Ne pas modifier
console.log(étudiants[0].nomComplet()); // Devrait afficher "Marie Dupont"
console.log(trouverMeilleurÉtudiant(étudiants).nomComplet()); // Devrait afficher "Sophie Durand"
console.log(obtenirNomsComplets(étudiants)); // Devrait afficher ["Marie Dupont", "Jean Martin", "Sophie Durand"]
console.log(calculerMoyenneGlobale(étudiants)); // Devrait afficher la moyenne de toutes les notes`,
            solutionCode: `// Données d'étudiants
const étudiants = [
  { prénom: "Marie", nom: "Dupont", notes: [15, 17, 16] },
  { prénom: "Jean", nom: "Martin", notes: [12, 13, 15] },
  { prénom: "Sophie", nom: "Durand", notes: [18, 15, 19] }
];

// 1. Ajouter une méthode pour obtenir le nom complet
étudiants.forEach(étudiant => {
  étudiant.nomComplet = function() {
    return this.prénom + " " + this.nom;
  };
});

// 2. Trouver l'étudiant avec la moyenne la plus élevée
function trouverMeilleurÉtudiant(étudiants) {
  // Calculer d'abord la moyenne pour chaque étudiant
  étudiants.forEach(étudiant => {
    étudiant.moyenne = étudiant.notes.reduce((sum, note) => sum + note, 0) / étudiant.notes.length;
  });
  
  // Trouver l'étudiant avec la moyenne la plus élevée
  return étudiants.reduce((meilleur, étudiant) => {
    return étudiant.moyenne > meilleur.moyenne ? étudiant : meilleur;
  }, étudiants[0]);
}

// 3. Créer un tableau de tous les noms complets
function obtenirNomsComplets(étudiants) {
  return étudiants.map(étudiant => étudiant.nomComplet());
}

// 4. Calculer la moyenne de tous les étudiants
function calculerMoyenneGlobale(étudiants) {
  // Aplatir toutes les notes en un seul tableau
  const toutesLesNotes = étudiants.flatMap(étudiant => étudiant.notes);
  
  // Calculer la moyenne
  return toutesLesNotes.reduce((sum, note) => sum + note, 0) / toutesLesNotes.length;
}

// Tests - Ne pas modifier
console.log(étudiants[0].nomComplet()); // Devrait afficher "Marie Dupont"
console.log(trouverMeilleurÉtudiant(étudiants).nomComplet()); // Devrait afficher "Sophie Durand"
console.log(obtenirNomsComplets(étudiants)); // Devrait afficher ["Marie Dupont", "Jean Martin", "Sophie Durand"]
console.log(calculerMoyenneGlobale(étudiants)); // Devrait afficher la moyenne de toutes les notes`,
            language: "javascript",
            difficulty: "intermédiaire",
            xpReward: 40,
          }}
          keyPoints={[
            "Les objets sont des collections non ordonnées de paires clé-valeur, idéales pour représenter des entités",
            "Les tableaux sont des collections ordonnées de valeurs, parfaits pour les listes d'éléments",
            "Les méthodes map(), filter() et reduce() sont essentielles pour transformer, filtrer et réduire les tableaux",
            "Les objets peuvent contenir des méthodes (fonctions) qui peuvent accéder à leurs propres propriétés via this",
            "En JavaScript moderne (React/Next.js), la manipulation immutable des objets et tableaux est recommandée pour éviter les effets secondaires",
          ]}
          onComplete={(section, points) =>
            console.log(`Section ${section} complétée, ${points} points gagnés`)
          }
        />
      );
    } else if (activeSection === "async") {
      return (
        <LearningSection
          title="Asynchrone et Promesses"
          description="Comprenez le modèle de programmation asynchrone de JavaScript"
          theory={
            <>
              <h3 className="text-xl font-semibold mb-3">
                La programmation asynchrone en JavaScript
              </h3>
              <p className="mb-3">
                JavaScript est un langage à thread unique (single-threaded),
                mais il peut gérer des opérations asynchrones grâce à différents
                mécanismes :
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>Callbacks</strong> : fonctions passées en argument et
                  exécutées ultérieurement
                </li>
                <li>
                  <strong>Promesses</strong> : objets représentant la complétion
                  ou l'échec éventuel d'une opération asynchrone
                </li>
                <li>
                  <strong>async/await</strong> : syntaxe ES2017 permettant
                  d'écrire du code asynchrone de manière synchrone
                </li>
              </ul>
              <p className="mb-3">Les promesses ont trois états :</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>
                  <strong>Pending</strong> : état initial, en attente
                </li>
                <li>
                  <strong>Fulfilled</strong> : opération réussie
                </li>
                <li>
                  <strong>Rejected</strong> : opération échouée
                </li>
              </ul>
              <p className="mb-3">
                Le tandem{" "}
                <code className="bg-gray-100 px-1 rounded">async/await</code>{" "}
                simplifie la gestion des promesses en permettant d'écrire du
                code asynchrone qui ressemble à du code synchrone.
              </p>
            </>
          }
          example={{
            description:
              "Voici comment utiliser les promesses et async/await en JavaScript :",
            code: `// Créer une promesse
const promesse = new Promise((resolve, reject) => {
  setTimeout(() => {
    const succès = true;
    if (succès) {
      resolve("Opération réussie!");
    } else {
      reject("Erreur: l'opération a échoué");
    }
  }, 1000);
});

// Utiliser une promesse avec then/catch
promesse
  .then(résultat => {
    console.log(résultat); // "Opération réussie!"
    return "Données transformées";
  })
  .then(nouvelleDonnée => {
    console.log(nouvelleDonnée); // "Données transformées"
  })
  .catch(erreur => {
    console.error(erreur);
  });

// Fonction qui retourne une promesse
function récupérerUtilisateur(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id: id, nom: "Utilisateur " + id });
      } else {
        reject("ID utilisateur invalide");
      }
    }, 1000);
  });
}

// Utilisation avec async/await
async function chargerDonnées() {
  try {
    console.log("Chargement des données...");
    const utilisateur = await récupérerUtilisateur(1);
    console.log("Utilisateur chargé:", utilisateur);
    return utilisateur;
  } catch (erreur) {
    console.error("Erreur:", erreur);
    throw erreur;
  }
}

// Appel de la fonction async
chargerDonnées()
  .then(données => console.log("Traitement terminé", données))
  .catch(erreur => console.error("Erreur finale:", erreur));

// Promise.all - exécuter plusieurs promesses en parallèle
Promise.all([
  récupérerUtilisateur(1),
  récupérerUtilisateur(2),
  récupérerUtilisateur(3)
])
  .then(utilisateurs => console.log("Tous les utilisateurs:", utilisateurs))
  .catch(erreur => console.error("Une erreur s'est produite:", erreur));`,
            language: "javascript",
            readOnly: true,
          }}
          quiz={{
            title: "Quiz sur l'asynchrone en JavaScript",
            questions: [
              {
                question:
                  "Quel est l'avantage principal d'async/await par rapport aux promesses avec then/catch ?",
                options: [
                  "C'est plus rapide",
                  "Ça permet d'exécuter du code en parallèle",
                  "Ça rend le code asynchrone plus lisible et facile à déboguer",
                  "Ça fonctionne dans les navigateurs plus anciens",
                ],
                correctAnswer:
                  "Ça rend le code asynchrone plus lisible et facile à déboguer",
              },
              {
                question:
                  "Que fait l'instruction await dans une fonction async ?",
                options: [
                  "Elle arrête complètement l'exécution du programme",
                  "Elle attend que la promesse soit résolue avant de continuer l'exécution dans la fonction",
                  "Elle lance une nouvelle promesse",
                  "Elle convertit une fonction normale en fonction asynchrone",
                ],
                correctAnswer:
                  "Elle attend que la promesse soit résolue avant de continuer l'exécution dans la fonction",
              },
              {
                question: "Que fait la méthode Promise.all() ?",
                options: [
                  "Elle exécute plusieurs promesses séquentiellement",
                  "Elle attend que toutes les promesses du tableau soient résolues ou qu'une seule échoue",
                  "Elle attend que la première promesse du tableau soit résolue",
                  "Elle crée une nouvelle promesse qui ne peut jamais échouer",
                ],
                correctAnswer:
                  "Elle attend que toutes les promesses du tableau soient résolues ou qu'une seule échoue",
              },
            ],
          }}
          practice={{
            title: "Compréhension des promesses",
            description:
              "Identifiez les affirmations correctes concernant les promesses en JavaScript :",
            type: "multiple",
            options: [
              {
                id: 1,
                text: "Une promesse peut être dans l'état 'pending', 'fulfilled' ou 'rejected'",
                correct: true,
              },
              {
                id: 2,
                text: "await ne peut être utilisé qu'à l'intérieur d'une fonction déclarée avec async",
                correct: true,
              },
              {
                id: 3,
                text: "Promise.all() rejette immédiatement si l'une des promesses est rejetée",
                correct: true,
              },
              {
                id: 4,
                text: "Une fonction async retourne toujours une promesse",
                correct: true,
              },
              {
                id: 5,
                text: "Le mot-clé await bloque l'exécution de tout le programme JavaScript",
                correct: false,
              },
            ],
          }}
          codeExercise={{
            id: "async-exercise",
            title: "Manipuler des opérations asynchrones",
            description:
              "Complétez le code pour gérer différentes opérations asynchrones :",
            instructions: [
              "Implémentez la fonction simulerRequêteAPI qui retourne une promesse",
              "Créez une fonction fetchDataSequential qui récupère les données de manière séquentielle",
              "Créez une fonction fetchDataParallel qui récupère les données en parallèle",
              "Implémentez une fonction getFirstSuccessfulRequest qui retourne le premier résultat réussi",
            ],
            initialCode: `// Simulation d'une requête API
function simulerRequêteAPI(id, délaiMs = 1000, échouer = false) {
  // Retourner une promesse qui se résout après délaiMs millisecondes
  // avec un objet {id, data: 'Données ' + id}
  // ou qui échoue si échouer est true avec le message 'Erreur: requête ' + id + ' a échoué'
  // Votre code ici
}

// Fonction qui récupère les données de façon séquentielle
async function fetchDataSequential(ids) {
  // Récupérer les données pour chaque id l'un après l'autre
  // Retourner un tableau des résultats
  // Votre code ici
}

// Fonction qui récupère les données en parallèle
async function fetchDataParallel(ids) {
  // Récupérer les données pour tous les ids en même temps
  // Retourner un tableau des résultats
  // Votre code ici
}

// Fonction qui retourne le premier résultat réussi
async function getFirstSuccessfulRequest(ids) {
  // Utiliser Promise.race pour obtenir le premier résultat
  // Votre code ici
}

// Tests - Ne pas modifier
async function tester() {
  try {
    // Test simulerRequêteAPI
    const résultat1 = await simulerRequêteAPI(1, 100);
    console.log('Test 1:', résultat1);
    
    try {
      await simulerRequêteAPI(2, 100, true);
    } catch (erreur) {
      console.log('Test 2 OK:', erreur);
    }
    
    // Test fetchDataSequential
    console.log('Début séquentiel...');
    const début1 = Date.now();
    const résultats1 = await fetchDataSequential([3, 4, 5]);
    const durée1 = Date.now() - début1;
    console.log('Résultats séquentiels:', résultats1, 'Durée:', durée1 + 'ms');
    
    // Test fetchDataParallel
    console.log('Début parallèle...');
    const début2 = Date.now();
    const résultats2 = await fetchDataParallel([6, 7, 8]);
    const durée2 = Date.now() - début2;
    console.log('Résultats parallèles:', résultats2, 'Durée:', durée2 + 'ms');
    
    // Test getFirstSuccessfulRequest
    const premier = await getFirstSuccessfulRequest([9, 10, 11]);
    console.log('Premier résultat:', premier);
  } catch (erreur) {
    console.error('Erreur de test:', erreur);
  }
}

tester();`,
            solutionCode: `// Simulation d'une requête API
function simulerRequêteAPI(id, délaiMs = 1000, échouer = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (échouer) {
        reject('Erreur: requête ' + id + ' a échoué');
      } else {
        resolve({id, data: 'Données ' + id});
      }
    }, délaiMs);
  });
}

// Fonction qui récupère les données de façon séquentielle
async function fetchDataSequential(ids) {
  const résultats = [];
  
  for (const id of ids) {
    try {
      const résultat = await simulerRequêteAPI(id, 500);
      résultats.push(résultat);
    } catch (erreur) {
      console.error(erreur);
    }
  }
  
  return résultats;
}

// Fonction qui récupère les données en parallèle
async function fetchDataParallel(ids) {
  const promesses = ids.map(id => simulerRequêteAPI(id, 500));
  
  try {
    return await Promise.all(promesses);
  } catch (erreur) {
    console.error(erreur);
    return [];
  }
}

// Fonction qui retourne le premier résultat réussi
async function getFirstSuccessfulRequest(ids) {
  const promesses = ids.map(id => simulerRequêteAPI(id, 500 + Math.random() * 1000));
  
  try {
    return await Promise.race(promesses);
  } catch (erreur) {
    console.error(erreur);
    throw erreur;
  }
}

// Tests - Ne pas modifier
async function tester() {
  try {
    // Test simulerRequêteAPI
    const résultat1 = await simulerRequêteAPI(1, 100);
    console.log('Test 1:', résultat1);
    
    try {
      await simulerRequêteAPI(2, 100, true);
    } catch (erreur) {
      console.log('Test 2 OK:', erreur);
    }
    
    // Test fetchDataSequential
    console.log('Début séquentiel...');
    const début1 = Date.now();
    const résultats1 = await fetchDataSequential([3, 4, 5]);
    const durée1 = Date.now() - début1;
    console.log('Résultats séquentiels:', résultats1, 'Durée:', durée1 + 'ms');
    
    // Test fetchDataParallel
    console.log('Début parallèle...');
    const début2 = Date.now();
    const résultats2 = await fetchDataParallel([6, 7, 8]);
    const durée2 = Date.now() - début2;
    console.log('Résultats parallèles:', résultats2, 'Durée:', durée2 + 'ms');
    
    // Test getFirstSuccessfulRequest
    const premier = await getFirstSuccessfulRequest([9, 10, 11]);
    console.log('Premier résultat:', premier);
  } catch (erreur) {
    console.error('Erreur de test:', erreur);
  }
}

tester();`,
            language: "javascript",
            difficulty: "avancé",
            xpReward: 50,
          }}
          keyPoints={[
            "Les promesses sont utilisées pour représenter une valeur qui pourrait être disponible maintenant, plus tard, ou jamais",
            "async/await est une syntaxe plus propre pour travailler avec des promesses, rendant le code asynchrone plus lisible",
            "Une fonction déclarée avec async retourne toujours une promesse",
            "Promise.all() permet d'exécuter plusieurs opérations asynchrones en parallèle et d'attendre que toutes soient terminées",
            "Promise.race() retourne la première promesse qui se résout ou échoue dans un ensemble de promesses",
          ]}
          onComplete={(section, points) =>
            console.log(`Section ${section} complétée, ${points} points gagnés`)
          }
        />
      );
    } else if (activeSection === "es6") {
      return (
        <LearningSection
          title="Fonctionnalités ES6+"
          description="Maîtrisez les fonctionnalités modernes du JavaScript qui ont révolutionné le langage"
          theory={
            <>
              <h3 className="text-xl font-semibold mb-3">Les fonctionnalités ES6+ en JavaScript</h3>
              <p className="mb-3">
                ECMAScript 6 (ES6), également connu sous le nom d'ECMAScript 2015, et les versions suivantes 
                ont introduit de nombreuses fonctionnalités qui ont considérablement amélioré JavaScript.
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Fonctions fléchées</strong> : syntaxe plus concise et comportement lexical du <code>this</code></li>
                <li><strong>Déstructuration</strong> : extraction facile de valeurs depuis les objets et tableaux</li>
                <li><strong>Paramètres par défaut</strong> : valeurs par défaut pour les paramètres de fonction</li>
                <li><strong>Opérateur spread</strong> : décomposition d'itérables en éléments individuels</li>
                <li><strong>Template literals</strong> : chaînes de caractères multilignes avec interpolation</li>
              </ul>
              <p>
                Ces fonctionnalités sont essentielles pour le développement moderne en JavaScript, 
                particulièrement dans les frameworks comme React et Next.js.
              </p>
            </>
          }
          example={{
            description: "Voici comment utiliser les principales fonctionnalités ES6+ :",
            code: `// let et const
let compteur = 0; // Variable qui peut changer
const PI = 3.14159; // Constante qui ne peut pas être réassignée

// Template literals
const nom = "Alice";
console.log(\`Bonjour, \${nom}!\`); // "Bonjour, Alice!"

// Fonctions fléchées
const additionner = (a, b) => a + b;
const multiplier = (a, b) => {
  const résultat = a * b;
  return résultat;
};

// Déstructuration d'objets
const personne = { prénom: "Jean", nom: "Dupont", âge: 30 };
const { prénom, nom: nomFamille } = personne;
console.log(prénom, nomFamille); // "Jean Dupont"

// Spread operator avec tableaux
const tableau1 = [1, 2, 3];
const tableau2 = [4, 5, 6];
const combiné = [...tableau1, ...tableau2];
console.log(combiné); // [1, 2, 3, 4, 5, 6]`,
            language: "javascript",
            readOnly: true
          }}
          quiz={{
            title: "Quiz sur les fonctionnalités ES6+",
            questions: [
              {
                question: "Quelle est la principale différence entre let et const ?",
                options: [
                  "let est limité à la portée de bloc, const non", 
                  "const ne peut pas être réassigné après initialisation, let peut l'être", 
                  "let ne peut pas être utilisé dans les boucles for, const le peut", 
                  "const est plus rapide que let"
                ],
                correctAnswer: "const ne peut pas être réassigné après initialisation, let peut l'être"
              },
              {
                question: "Comment extraire les propriétés 'x' et 'y' de l'objet point = {x: 10, y: 20, z: 30} ?",
                options: [
                  "const x = point.x; const y = point.y;", 
                  "const [x, y] = point;", 
                  "const {x, y} = point;", 
                  "const x,y = point.x,point.y;"
                ],
                correctAnswer: "const {x, y} = point;"
              }
            ]
          }}
          practice={{
            title: "Comprendre les fonctionnalités ES6+",
            description: "Identifiez les affirmations correctes concernant les fonctionnalités ES6+ :",
            type: "multiple",
            options: [
              { id: 1, text: "Les fonctions fléchées ont automatiquement leur propre this", correct: false },
              { id: 2, text: "La déstructuration permet d'extraire plusieurs valeurs d'un objet ou d'un tableau en une seule instruction", correct: true },
              { id: 3, text: "Le spread operator (...) peut être utilisé tant avec les tableaux qu'avec les objets", correct: true }
            ]
          }}
          keyPoints={[
            "Préférez const pour les variables qui ne changent pas et let pour celles qui changent",
            "Les fonctions fléchées sont plus concises et n'ont pas leur propre this - elles héritent du this de leur contexte",
            "La déstructuration simplifie l'extraction de propriétés d'objets et d'éléments de tableaux",
            "Les template literals permettent d'insérer des expressions dans les chaînes et supportent le multilignes",
            "Le spread operator (...) facilite la copie et la fusion de tableaux et d'objets de manière immutable"
          ]}
          onComplete={(section, points) => console.log(`Section ${section} complétée, ${points} points gagnés`)}
        />
      );
    }

    // Pour les autres sections, continuer à utiliser l'approche existante
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
            title="Playground JavaScript"
            description="Expérimentez avec JavaScript et voyez le résultat en temps réel."
            height="500px"
          />
        ) : section.exercise ? (
          <ExerciseWithPreview
            exercise={{
              id: activeSection === "exercise1" ? 1 : 2,
              title: section.title,
              description: section.content.trim(),
              instructions: section.content
                .split("\n")
                .filter((line) => line.trim())
                .filter((line) => /^\d+\./.test(line.trim()))
                .map((line) => line.trim()),
              initialCode: section.initialCode,
              solutionCode: section.solutionCode,
              language: section.language,
              difficulty:
                activeSection === "exercise1" ? "débutant" : "intermédiaire",
              xpReward: activeSection === "exercise1" ? 20 : 40,
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
      <div className="mb-6">
        <BackButton href="/learning-path" label="Retour au parcours" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-gray-900">
            Fondamentaux JavaScript
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Maîtrisez les bases de JavaScript pour mieux comprendre React et
            Next.js.
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
