"use client";

import { useState } from 'react';
import CodeEditor from '../../components/editor/CodeEditor';

export default function JavaScriptFundamentalsPage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [activeSubsection, setActiveSubsection] = useState('what-is-js');
  
  const sections = {
    introduction: {
      title: "Introduction à JavaScript",
      subsections: {
        'what-is-js': {
          title: "Qu'est-ce que JavaScript?",
          content: `
JavaScript est un langage de programmation de haut niveau, interprété et orienté objet. C'est l'un des trois piliers du développement web moderne, aux côtés de HTML et CSS.

Contrairement à ce que son nom pourrait suggérer, JavaScript n'a pas grand-chose à voir avec Java. Il a été créé en 1995 par Brendan Eich chez Netscape et était initialement appelé LiveScript avant d'être renommé pour des raisons marketing.

JavaScript permet d'ajouter de l'interactivité aux pages web. Il peut être utilisé pour:
- Modifier dynamiquement le contenu d'une page
- Valider les formulaires avant leur envoi
- Créer des animations et effets visuels
- Développer des applications web complètes
- Communiquer avec des serveurs (AJAX)

Aujourd'hui, JavaScript est également utilisé en dehors du navigateur grâce à des environnements comme Node.js, permettant de développer des applications côté serveur, des applications mobiles (avec React Native), et même des applications de bureau (avec Electron).
          `,
          example: `// Afficher un message dans la console
console.log("Bonjour, monde!");

// Modifier le contenu d'un élément HTML
document.getElementById("demo").innerHTML = "Bonjour, JavaScript!";

// Réagir à un événement
document.getElementById("bouton").addEventListener("click", function() {
  alert("Vous avez cliqué sur le bouton!");
});`,
          exercise: {
            instructions: "Écrivez un code JavaScript qui affiche une alerte avec le message 'Bienvenue dans le monde de JavaScript!' lorsque la page est chargée.",
            initialCode: "// Écrivez votre code ici",
            solution: `window.onload = function() {
  alert("Bienvenue dans le monde de JavaScript!");
};

// Ou plus simplement:
// alert("Bienvenue dans le monde de JavaScript!");`,
            hints: ["Utilisez la fonction alert()", "Vous pouvez utiliser l'événement window.onload ou simplement appeler alert() directement"]
          }
        },
        'variables-types': {
          title: "Variables et Types de données",
          content: `
En JavaScript, les variables sont des conteneurs pour stocker des valeurs. Pour déclarer une variable, on utilise les mots-clés \`var\`, \`let\` ou \`const\`.

**Déclaration de variables:**
- \`var\`: Ancienne façon de déclarer des variables (portée de fonction)
- \`let\`: Introduit en ES6, permet de déclarer des variables dont la valeur peut changer (portée de bloc)
- \`const\`: Introduit en ES6, permet de déclarer des constantes dont la valeur ne peut pas être réassignée (portée de bloc)

**Types de données primitifs:**
- \`String\`: Chaînes de caractères (texte)
- \`Number\`: Nombres (entiers et décimaux)
- \`Boolean\`: Valeurs logiques (true/false)
- \`undefined\`: Variable déclarée mais sans valeur assignée
- \`null\`: Valeur nulle intentionnelle
- \`Symbol\`: Valeur unique et immuable (ES6)
- \`BigInt\`: Grands entiers (ES2020)

**Types de données complexes:**
- \`Object\`: Collection de propriétés
- \`Array\`: Collection ordonnée d'éléments
- \`Function\`: Bloc de code réutilisable
- \`Date\`: Représentation de dates et heures
- \`RegExp\`: Expressions régulières

JavaScript est un langage à typage dynamique, ce qui signifie que vous n'avez pas besoin de spécifier le type d'une variable lors de sa déclaration, et que le type peut changer au cours de l'exécution du programme.
          `,
          example: `// Déclaration de variables
let nom = "Alice";
const age = 30;
var estEtudiant = false;

// Types de données
let chaine = "Texte";           // String
let nombre = 42;                // Number
let decimal = 3.14;             // Number
let booleen = true;             // Boolean
let nonDefini;                  // undefined
let nul = null;                 // null
let symbole = Symbol("id");     // Symbol
let grandNombre = 9007199254740991n; // BigInt

// Objets et tableaux
let personne = {                // Object
  nom: "Bob",
  age: 25,
  ville: "Paris"
};

let couleurs = ["rouge", "vert", "bleu"]; // Array

// Vérifier le type d'une variable
console.log(typeof nom);        // "string"
console.log(typeof age);        // "number"
console.log(typeof personne);   // "object"
console.log(typeof couleurs);   // "object" (les tableaux sont des objets en JavaScript)`,
          exercise: {
            instructions: "Créez des variables pour stocker les informations suivantes: votre nom (chaîne), votre âge (nombre), si vous aimez JavaScript (booléen) et un tableau de vos hobbies. Puis affichez ces informations dans la console.",
            initialCode: "// Déclarez vos variables ici\n\n// Affichez les informations dans la console",
            solution: `// Déclarez vos variables ici
const nom = "Votre Nom";
let age = 25;
const aimeJavaScript = true;
const hobbies = ["programmation", "lecture", "sport"];

// Affichez les informations dans la console
console.log("Nom:", nom);
console.log("Âge:", age);
console.log("Aime JavaScript:", aimeJavaScript);
console.log("Hobbies:", hobbies);`,
            hints: ["Utilisez const pour les valeurs qui ne changeront pas", "Utilisez les crochets [] pour créer un tableau", "Utilisez console.log() pour afficher les valeurs"]
          }
        },
        'operators': {
          title: "Opérateurs",
          content: `
Les opérateurs permettent d'effectuer des opérations sur des variables et des valeurs.

**Opérateurs arithmétiques:**
- \`+\`: Addition (aussi utilisé pour la concaténation de chaînes)
- \`-\`: Soustraction
- \`*\`: Multiplication
- \`/\`: Division
- \`%\`: Modulo (reste de la division)
- \`**\`: Exponentiation (ES2016)
- \`++\`: Incrémentation
- \`--\`: Décrémentation

**Opérateurs d'affectation:**
- \`=\`: Affectation simple
- \`+=\`, \`-=\`, \`*=\`, \`/=\`: Affectation après opération

**Opérateurs de comparaison:**
- \`==\`: Égalité (valeur)
- \`===\`: Égalité stricte (valeur et type)
- \`!=\`: Inégalité (valeur)
- \`!==\`: Inégalité stricte (valeur et type)
- \`>\`, \`<\`, \`>=\`, \`<=\`: Supérieur, inférieur, supérieur ou égal, inférieur ou égal

**Opérateurs logiques:**
- \`&&\`: ET logique
- \`||\`: OU logique
- \`!\`: NON logique

**Opérateurs de chaîne:**
- \`+\`: Concaténation
- \`+=\`: Concaténation et affectation

**Opérateur ternaire:**
- \`condition ? valeurSiVrai : valeurSiFaux\`

**Opérateurs de type:**
- \`typeof\`: Retourne le type d'une variable
- \`instanceof\`: Vérifie si un objet est une instance d'une classe
          `,
          example: `// Opérateurs arithmétiques
let a = 10;
let b = 3;
console.log(a + b);  // 13
console.log(a - b);  // 7
console.log(a * b);  // 30
console.log(a / b);  // 3.3333...
console.log(a % b);  // 1 (reste de 10 divisé par 3)
console.log(a ** b); // 1000 (10 à la puissance 3)

// Incrémentation et décrémentation
let c = 5;
c++;                // c est maintenant 6
let d = 5;
d--;                // d est maintenant 4

// Opérateurs d'affectation
let e = 10;
e += 5;             // équivalent à e = e + 5, e est maintenant 15
e -= 3;             // e est maintenant 12
e *= 2;             // e est maintenant 24
e /= 4;             // e est maintenant 6

// Opérateurs de comparaison
console.log(5 == "5");   // true (égalité de valeur)
console.log(5 === "5");  // false (inégalité de type)
console.log(5 != "5");   // false
console.log(5 !== "5");  // true
console.log(10 > 5);     // true
console.log(10 < 5);     // false
console.log(10 >= 10);   // true
console.log(5 <= 10);    // true

// Opérateurs logiques
console.log(true && true);   // true
console.log(true && false);  // false
console.log(true || false);  // true
console.log(false || false); // false
console.log(!true);          // false
console.log(!false);         // true

// Opérateur ternaire
let age = 20;
let statut = (age >= 18) ? "adulte" : "mineur";
console.log(statut);  // "adulte"

// Concaténation de chaînes
let prenom = "Jean";
let nom = "Dupont";
let nomComplet = prenom + " " + nom;  // "Jean Dupont"`,
          exercise: {
            instructions: "Écrivez un programme qui calcule l'IMC (Indice de Masse Corporelle) à partir du poids (en kg) et de la taille (en m). La formule est: IMC = poids / (taille * taille). Utilisez les variables fournies et affichez le résultat dans la console.",
            initialCode: "// Variables données\nconst poids = 70; // en kg\nconst taille = 1.75; // en m\n\n// Calculez l'IMC et affichez le résultat\n",
            solution: `// Variables données
const poids = 70; // en kg
const taille = 1.75; // en m

// Calculez l'IMC et affichez le résultat
const imc = poids / (taille * taille);
console.log("IMC:", imc.toFixed(2));

// Bonus: interprétation de l'IMC avec opérateur ternaire
const interpretation = 
  imc < 18.5 ? "Insuffisance pondérale" :
  imc < 25 ? "Poids normal" :
  imc < 30 ? "Surpoids" :
  "Obésité";
  
console.log("Interprétation:", interpretation);`,
            hints: ["Utilisez l'opérateur de division / pour calculer l'IMC", "La formule est IMC = poids / (taille * taille)", "Vous pouvez utiliser la méthode toFixed() pour arrondir le résultat à 2 décimales"]
          }
        }
      }
    },
    control: {
      title: "Structures de contrôle",
      subsections: {
        'conditionals': {
          title: "Conditions (if, else, switch)",
          content: `
Les structures conditionnelles permettent d'exécuter différents blocs de code en fonction de conditions spécifiques.

**if, else if, else:**
La structure \`if\` exécute un bloc de code si une condition est vraie. Elle peut être suivie de \`else if\` pour tester d'autres conditions, et de \`else\` pour exécuter un code par défaut si aucune condition n'est vraie.

\`\`\`javascript
if (condition1) {
  // Code exécuté si condition1 est vraie
} else if (condition2) {
  // Code exécuté si condition1 est fausse et condition2 est vraie
} else {
  // Code exécuté si toutes les conditions sont fausses
}
\`\`\`

**switch:**
La structure \`switch\` permet de tester une variable contre plusieurs valeurs possibles.

\`\`\`javascript
switch (expression) {
  case valeur1:
    // Code exécuté si expression === valeur1
    break;
  case valeur2:
    // Code exécuté si expression === valeur2
    break;
  default:
    // Code exécuté si aucun cas ne correspond
}
\`\`\`

Le \`break\` est important pour sortir du switch après l'exécution d'un cas. Sans lui, l'exécution continue aux cas suivants.

**Opérateur ternaire:**
Une forme concise pour les conditions simples:

\`\`\`javascript
condition ? expressionSiVrai : expressionSiFaux
\`\`\`

**Évaluation des conditions:**
JavaScript considère ces valeurs comme fausses (\`false\`):
- \`false\`
- \`0\`
- \`""\` (chaîne vide)
- \`null\`
- \`undefined\`
- \`NaN\`

Toutes les autres valeurs sont considérées comme vraies (\`true\`).
          `,
          example: `// if, else if, else
let heure = 14;

if (heure < 12) {
  console.log("Bonjour");
} else if (heure < 18) {
  console.log("Bon après-midi");
} else {
  console.log("Bonsoir");
}

// switch
let jour = "Mardi";

switch (jour) {
  case "Lundi":
    console.log("C'est le début de la semaine");
    break;
  case "Mardi":
  case "Mercredi":
  case "Jeudi":
    console.log("C'est le milieu de la semaine");
    break;
  case "Vendredi":
    console.log("C'est bientôt le week-end");
    break;
  case "Samedi":
  case "Dimanche":
    console.log("C'est le week-end");
    break;
  default:
    console.log("Jour non reconnu");
}

// Opérateur ternaire
let age = 20;
let message = age >= 18 ? "Vous êtes majeur" : "Vous êtes mineur";
console.log(message);

// Valeurs évaluées comme false
if (0) {
  console.log("Ce message ne s'affichera pas");
}

if ("") {
  console.log("Ce message ne s'affichera pas");
}

// Valeurs évaluées comme true
if (1) {
  console.log("Ce message s'affichera");
}

if ("texte") {
  console.log("Ce message s'affichera");
}

if ([]) {
  console.log("Un tableau vide est évalué comme true");
}`,
          exercise: {
            instructions: "Écrivez un programme qui détermine si une année est bissextile. Une année est bissextile si elle est divisible par 4, sauf si elle est divisible par 100 mais pas par 400. Utilisez la variable année fournie et affichez un message approprié.",
            initialCode: "// Variable donnée\nconst annee = 2024;\n\n// Déterminez si l'année est bissextile\n",
            solution: `// Variable donnée
const annee = 2024;

// Déterminez si l'année est bissextile
if ((annee % 4 === 0 && annee % 100 !== 0) || annee % 400 === 0) {
  console.log(annee + " est une année bissextile");
} else {
  console.log(annee + " n'est pas une année bissextile");
}

// Version alternative avec opérateur ternaire
const estBissextile = ((annee % 4 === 0 && annee % 100 !== 0) || annee % 400 === 0);
console.log(annee + (estBissextile ? " est" : " n'est pas") + " une année bissextile");`,
            hints: ["Une année est bissextile si elle est divisible par 4", "Mais pas si elle est divisible par 100, sauf si elle est aussi divisible par 400", "Utilisez l'opérateur modulo % pour vérifier si un nombre est divisible par un autre"]
          }
        },
        'loops': {
          title: "Boucles (for, while, do-while)",
          content: `
Les boucles permettent d'exécuter un bloc de code plusieurs fois.

**Boucle for:**
La boucle \`for\` est utilisée lorsque vous savez à l'avance combien de fois vous voulez exécuter un bloc de code.

\`\`\`javascript
for (initialisation; condition; incrémentation) {
  // Code à exécuter à chaque itération
}
\`\`\`

**Boucle for...of:**
Introduite en ES6, la boucle \`for...of\` permet d'itérer sur les éléments d'objets itérables (tableaux, chaînes, etc.).

\`\`\`javascript
for (let element of iterable) {
  // Code utilisant element
}
\`\`\`

**Boucle for...in:**
La boucle \`for...in\` permet d'itérer sur les propriétés énumérables d'un objet.

\`\`\`javascript
for (let propriete in objet) {
  // Code utilisant objet[propriete]
}
\`\`\`

**Boucle while:**
La boucle \`while\` exécute un bloc de code tant qu'une condition est vraie.

\`\`\`javascript
while (condition) {
  // Code à exécuter tant que la condition est vraie
}
\`\`\`

**Boucle do...while:**
Similaire à \`while\`, mais le bloc de code est exécuté au moins une fois, même si la condition est fausse.

\`\`\`javascript
do {
  // Code exécuté au moins une fois
} while (condition);
\`\`\`

**Contrôle des boucles:**
- \`break\`: Sort complètement de la boucle
- \`continue\`: Passe à l'itération suivante de la boucle
          `,
          example: `// Boucle for
for (let i = 0; i < 5; i++) {
  console.log("Itération " + i);
}

// Boucle for avec un tableau
let fruits = ["pomme", "banane", "orange", "fraise"];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// Boucle for...of
for (let fruit of fruits) {
  console.log(fruit);
}

// Boucle for...in avec un objet
let personne = {
  nom: "Dupont",
  prenom: "Jean",
  age: 30
};

for (let propriete in personne) {
  console.log(propriete + ": " + personne[propriete]);
}

// Boucle while
let compteur = 0;
while (compteur < 5) {
  console.log("Compteur: " + compteur);
  compteur++;
}

// Boucle do...while
let i = 0;
do {
  console.log("Valeur de i: " + i);
  i++;
} while (i < 5);

// break
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break; // Sort de la boucle quand i vaut 5
  }
  console.log(i);
}

// continue
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    continue; // Passe à l'itération suivante si i est pair
  }
  console.log(i); // Affiche uniquement les nombres impairs
}`,
          exercise: {
            instructions: "Écrivez un programme qui affiche la table de multiplication d'un nombre donné (de 1 à 10). Utilisez une boucle for et affichez chaque multiplication dans la console.",
            initialCode: "// Variable donnée\nconst nombre = 7;\n\n// Affichez la table de multiplication\n",
            solution: `// Variable donnée
const nombre = 7;

// Affichez la table de multiplication
console.log("Table de multiplication de " + nombre + ":");

for (let i = 1; i <= 10; i++) {
  const resultat = nombre * i;
  console.log(nombre + " × " + i + " = " + resultat);
}

// Version alternative avec template literals (ES6)
// for (let i = 1; i <= 10; i++) {
//   console.log(\`\${nombre} × \${i} = \${nombre * i}\`);
// }`,
            hints: ["Utilisez une boucle for qui va de 1 à 10", "À chaque itération, multipliez le nombre donné par le compteur de boucle", "Affichez le résultat avec console.log()"]
          }
        },
        'functions': {
          title: "Fonctions",
          content: `
Les fonctions sont des blocs de code réutilisables qui effectuent une tâche spécifique. Elles sont fondamentales en JavaScript et peuvent être définies de plusieurs façons.

**Déclaration de fonction:**
\`\`\`javascript
function nomDeLaFonction(parametre1, parametre2) {
  // Corps de la fonction
  return resultat; // Optionnel
}
\`\`\`

**Expression de fonction:**
\`\`\`javascript
const nomDeLaFonction = function(parametre1, parametre2) {
  // Corps de la fonction
  return resultat; // Optionnel
};
\`\`\`

**Fonctions fléchées (ES6):**
\`\`\`javascript
const nomDeLaFonction = (parametre1, parametre2) => {
  // Corps de la fonction
  return resultat;
};

// Version courte pour les fonctions simples
const double = x => x * 2;
\`\`\`

**Paramètres et arguments:**
- Les paramètres sont les variables listées dans la définition de la fonction
- Les arguments sont les valeurs passées à la fonction lors de son appel
- Les paramètres par défaut (ES6) permettent de spécifier des valeurs par défaut

**Portée des variables:**
- Les variables déclarées à l'intérieur d'une fonction sont locales à cette fonction
- Les fonctions peuvent accéder aux variables définies dans leur portée extérieure

**Fonctions comme valeurs:**
En JavaScript, les fonctions sont des objets de première classe, ce qui signifie qu'elles peuvent être:
- Assignées à des variables
- Passées comme arguments à d'autres fonctions
- Retournées par d'autres fonctions

**Fonctions récursives:**
Une fonction qui s'appelle elle-même.

**Fonctions immédiatement invoquées (IIFE):**
\`\`\`javascript
(function() {
  // Code exécuté immédiatement
})();
\`\`\`
          `,
          example: `// Déclaration de fonction
function saluer(nom) {
  return "Bonjour, " + nom + "!";
}

console.log(saluer("Alice")); // "Bonjour, Alice!"

// Expression de fonction
const direAuRevoir = function(nom) {
  return "Au revoir, " + nom + "!";
};

console.log(direAuRevoir("Bob")); // "Au revoir, Bob!"

// Fonction fléchée
const multiplier = (a, b) => a * b;

console.log(multiplier(4, 5)); // 20

// Paramètres par défaut
function accueillir(nom = "visiteur") {
  return "Bienvenue, " + nom + "!";
}

console.log(accueillir()); // "Bienvenue, visiteur!"
console.log(accueillir("Jean")); // "Bienvenue, Jean!"

// Portée des variables
let globale = "Je suis globale";

function testPortee() {
  let locale = "Je suis locale";
  console.log(globale); // Accessible
  console.log(locale); // Accessible
}

testPortee();
// console.log(locale); // Erreur: locale n'est pas définie

// Fonctions comme valeurs
function operation(a, b, fonctionMath) {
  return fonctionMath(a, b);
}

const addition = (a, b) => a + b;
const soustraction = (a, b) => a - b;

console.log(operation(10, 5, addition)); // 15
console.log(operation(10, 5, soustraction)); // 5

// Fonction récursive
function factorielle(n) {
  if (n <= 1) return 1;
  return n * factorielle(n - 1);
}

console.log(factorielle(5)); // 120 (5 * 4 * 3 * 2 * 1)

// IIFE (Immediately Invoked Function Expression)
(function() {
  let message = "Cette variable est locale à l'IIFE";
  console.log(message);
})();

// Closure (fermeture)
function creerCompteur() {
  let compteur = 0;
  return function() {
    return ++compteur;
  };
}

const incrementer = creerCompteur();
console.log(incrementer()); // 1
console.log(incrementer()); // 2
console.log(incrementer()); // 3`,
          exercise: {
            instructions: "Écrivez une fonction appelée `calculerMoyenne` qui prend un tableau de nombres en paramètre et retourne la moyenne de ces nombres. Testez votre fonction avec le tableau fourni.",
            initialCode: "// Écrivez la fonction calculerMoyenne ici\n\n// Tableau de test\nconst notes = [15, 12, 18, 9, 14];\n\n// Appelez votre fonction et affichez le résultat\n",
            solution: `// Écrivez la fonction calculerMoyenne ici
function calculerMoyenne(tableau) {
  if (tableau.length === 0) return 0;
  
  let somme = 0;
  for (let i = 0; i < tableau.length; i++) {
    somme += tableau[i];
  }
  
  return somme / tableau.length;
}

// Version alternative avec reduce (plus avancée)
// const calculerMoyenne = (tableau) => {
//   if (tableau.length === 0) return 0;
//   return tableau.reduce((somme, valeur) => somme + valeur, 0) / tableau.length;
// };

// Tableau de test
const notes = [15, 12, 18, 9, 14];

// Appelez votre fonction et affichez le résultat
const moyenne = calculerMoyenne(notes);
console.log("La moyenne est:", moyenne);`,
            hints: ["Vous devez d'abord calculer la somme de tous les nombres du tableau", "Ensuite, divisez cette somme par le nombre d'éléments dans le tableau", "N'oubliez pas de gérer le cas où le tableau est vide"]
          }
        }
      }
    },
    arrays: {
      title: "Tableaux et objets",
      subsections: {
        'arrays': {
          title: "Tableaux",
          content: `
Les tableaux (arrays) sont des structures de données qui permettent de stocker plusieurs valeurs dans une seule variable. En JavaScript, les tableaux peuvent contenir des éléments de différents types.

**Création de tableaux:**
\`\`\`javascript
// Littéral de tableau
let tableau = [1, 2, 3, 4, 5];

// Constructeur Array
let tableau2 = new Array(1, 2, 3, 4, 5);

// Tableau vide
let tableau3 = [];
\`\`\`

**Accès aux éléments:**
Les éléments d'un tableau sont indexés à partir de 0.
\`\`\`javascript
let premier = tableau[0]; // Premier élément
let dernier = tableau[tableau.length - 1]; // Dernier élément
\`\`\`

**Propriétés et méthodes courantes:**
- \`length\`: Nombre d'éléments dans le tableau
- \`push()\`: Ajoute un ou plusieurs éléments à la fin du tableau
- \`pop()\`: Supprime le dernier élément et le retourne
- \`unshift()\`: Ajoute un ou plusieurs éléments au début du tableau
- \`shift()\`: Supprime le premier élément et le retourne
- \`splice()\`: Modifie le contenu d'un tableau en supprimant/remplaçant des éléments
- \`slice()\`: Retourne une copie d'une portion du tableau
- \`concat()\`: Fusionne deux ou plusieurs tableaux
- \`join()\`: Joint tous les éléments d'un tableau en une chaîne
- \`indexOf()\`: Retourne l'index de la première occurrence d'un élément
- \`includes()\`: Détermine si un tableau contient un élément spécifique
- \`sort()\`: Trie les éléments d'un tableau
- \`reverse()\`: Inverse l'ordre des éléments d'un tableau
- \`map()\`: Crée un nouveau tableau avec les résultats d'une fonction appliquée à chaque élément
- \`filter()\`: Crée un nouveau tableau avec tous les éléments qui passent un test
- \`reduce()\`: Réduit le tableau à une seule valeur en appliquant une fonction
- \`forEach()\`: Exécute une fonction sur chaque élément du tableau

**Tableaux multidimensionnels:**
Les tableaux peuvent contenir d'autres tableaux, créant ainsi des tableaux multidimensionnels.
\`\`\`javascript
let matrice = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
\`\`\`

**Déstructuration de tableaux (ES6):**
\`\`\`javascript
let [a, b, c] = [1, 2, 3];
// a = 1, b = 2, c = 3
\`\`\`

**Opérateur de décomposition (spread) (ES6):**
\`\`\`javascript
let tableau1 = [1, 2, 3];
let tableau2 = [...tableau1, 4, 5]; // [1, 2, 3, 4, 5]
\`\`\`
          `,
          example: `// Création et accès
let fruits = ["pomme", "banane", "orange"];
console.log(fruits[0]); // "pomme"
console.log(fruits.length); // 3

// Modification
fruits[1] = "fraise";
console.log(fruits); // ["pomme", "fraise", "orange"]

// Ajout et suppression
fruits.push("kiwi");
console.log(fruits); // ["pomme", "fraise", "orange", "kiwi"]

let dernierFruit = fruits.pop();
console.log(dernierFruit); // "kiwi"
console.log(fruits); // ["pomme", "fraise", "orange"]

fruits.unshift("ananas");
console.log(fruits); // ["ananas", "pomme", "fraise", "orange"]

let premierFruit = fruits.shift();
console.log(premierFruit); // "ananas"
console.log(fruits); // ["pomme", "fraise", "orange"]

// splice
fruits.splice(1, 1, "mangue", "pêche");
console.log(fruits); // ["pomme", "mangue", "pêche", "orange"]

// slice
let agrumes = fruits.slice(2);
console.log(agrumes); // ["pêche", "orange"]

// concat
let legumes = ["carotte", "poivron"];
let aliments = fruits.concat(legumes);
console.log(aliments); // ["pomme", "mangue", "pêche", "orange", "carotte", "poivron"]

// join
let chaine = fruits.join(", ");
console.log(chaine); // "pomme, mangue, pêche, orange"

// indexOf et includes
console.log(fruits.indexOf("mangue")); // 1
console.log(fruits.includes("banane")); // false

// sort et reverse
let nombres = [3, 1, 4, 1, 5];
nombres.sort();
console.log(nombres); // [1, 1, 3, 4, 5]
nombres.reverse();
console.log(nombres); // [5, 4, 3, 1, 1]

// Méthodes fonctionnelles
let notes = [12, 15, 8, 17, 10];

// map
let notesDoublees = notes.map(note => note * 2);
console.log(notesDoublees); // [24, 30, 16, 34, 20]

// filter
let notesSuperieures = notes.filter(note => note >= 10);
console.log(notesSuperieures); // [12, 15, 17, 10]

// reduce
let somme = notes.reduce((total, note) => total + note, 0);
console.log(somme); // 62
let moyenne = somme / notes.length;
console.log(moyenne); // 12.4

// forEach
notes.forEach((note, index) => {
  console.log(\`Note \${index + 1}: \${note}/20\`);
});

// Tableau multidimensionnel
let echiquier = [
  ["T", "C", "F", "D", "R", "F", "C", "T"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["t", "c", "f", "d", "r", "f", "c", "t"]
];

console.log(echiquier[0][3]); // "D" (Dame blanche)

// Déstructuration
let [x, y, ...reste] = [10, 20, 30, 40, 50];
console.log(x); // 10
console.log(y); // 20
console.log(reste); // [30, 40, 50]

// Opérateur spread
let tableau1 = [1, 2, 3];
let tableau2 = [4, 5, 6];
let combinaison = [...tableau1, ...tableau2];
console.log(combinaison); // [1, 2, 3, 4, 5, 6]`,
          exercise: {
            instructions: "Écrivez une fonction appelée `filtrerEtTransformer` qui prend un tableau de nombres, filtre les nombres pairs, puis retourne un nouveau tableau où chaque nombre pair est multiplié par 2. Testez votre fonction avec le tableau fourni.",
            initialCode: "// Écrivez la fonction filtrerEtTransformer ici\n\n// Tableau de test\nconst nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\n// Appelez votre fonction et affichez le résultat\n",
            solution: `// Écrivez la fonction filtrerEtTransformer ici
function filtrerEtTransformer(tableau) {
  // Méthode 1: avec deux étapes distinctes
  const nombresPairs = tableau.filter(nombre => nombre % 2 === 0);
  const nombresTransformes = nombresPairs.map(nombre => nombre * 2);
  return nombresTransformes;
  
  // Méthode 2: chaînage de méthodes
  // return tableau.filter(nombre => nombre % 2 === 0).map(nombre => nombre * 2);
}

// Tableau de test
const nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Appelez votre fonction et affichez le résultat
const resultat = filtrerEtTransformer(nombres);
console.log(resultat); // [4, 8, 12, 16, 20]`,
            hints: ["Utilisez la méthode filter() pour garder uniquement les nombres pairs", "Un nombre est pair si nombre % 2 === 0", "Utilisez la méthode map() pour multiplier chaque nombre par 2", "Vous pouvez chaîner les méthodes filter() et map()"]
          }
        },
        'objects': {
          title: "Objets",
          content: `
Les objets sont des collections de paires clé-valeur qui permettent de stocker et d'organiser des données complexes. Ils sont l'un des types de données les plus importants en JavaScript.

**Création d'objets:**
\`\`\`javascript
// Littéral d'objet
let personne = {
  nom: "Dupont",
  prenom: "Jean",
  age: 30,
  adresse: {
    rue: "123 Rue Principale",
    ville: "Paris"
  }
};

// Constructeur Object
let personne2 = new Object();
personne2.nom = "Martin";
personne2.prenom = "Sophie";
personne2.age = 25;
\`\`\`

**Accès aux propriétés:**
\`\`\`javascript
// Notation par point
let nom = personne.nom;

// Notation par crochets
let prenom = personne["prenom"];

// Propriétés imbriquées
let ville = personne.adresse.ville;
\`\`\`

**Modification et ajout de propriétés:**
\`\`\`javascript
personne.age = 31; // Modification
personne.email = "jean.dupont@example.com"; // Ajout
\`\`\`

**Suppression de propriétés:**
\`\`\`javascript
delete personne.email;
\`\`\`

**Méthodes d'objet:**
Les objets peuvent contenir des fonctions, appelées méthodes.
\`\`\`javascript
let personne = {
  nom: "Dupont",
  prenom: "Jean",
  saluer: function() {
    return "Bonjour, je m'appelle " + this.prenom + " " + this.nom;
  }
};
\`\`\`

**Le mot-clé this:**
Dans une méthode d'objet, \`this\` fait référence à l'objet qui appelle la méthode.

**Vérification de propriétés:**
\`\`\`javascript
// Vérifier si une propriété existe
console.log("nom" in personne); // true
console.log(personne.hasOwnProperty("nom")); // true
\`\`\`

**Parcourir un objet:**
\`\`\`javascript
// for...in
for (let propriete in personne) {
  console.log(propriete + ": " + personne[propriete]);
}

// Object.keys(), Object.values(), Object.entries() (ES2017)
console.log(Object.keys(personne)); // ["nom", "prenom", "age", ...]
console.log(Object.values(personne)); // ["Dupont", "Jean", 30, ...]
console.log(Object.entries(personne)); // [["nom", "Dupont"], ["prenom", "Jean"], ...]
\`\`\`

**Copie d'objets:**
\`\`\`javascript
// Copie superficielle
let copie = Object.assign({}, personne);

// Copie avec l'opérateur spread (ES6)
let copie2 = {...personne};
\`\`\`

**Déstructuration d'objets (ES6):**
\`\`\`javascript
let {nom, prenom} = personne;
// nom = "Dupont", prenom = "Jean"
\`\`\`

**Objets et JSON:**
JSON (JavaScript Object Notation) est un format de données basé sur la syntaxe des objets JavaScript.
\`\`\`javascript
// Conversion d'un objet en chaîne JSON
let chaineJSON = JSON.stringify(personne);

// Conversion d'une chaîne JSON en objet
let objetDepuisJSON = JSON.parse(chaineJSON);
\`\`\`
          `,
          example: `// Création d'objets
let etudiant = {
  nom: "Dubois",
  prenom: "Marie",
  age: 22,
  notes: [15, 12, 18, 10],
  adresse: {
    rue: "45 Avenue des Fleurs",
    ville: "Lyon",
    codePostal: "69000"
  },
  estDiplome: false,
  calculerMoyenne: function() {
    let somme = 0;
    for (let i = 0; i < this.notes.length; i++) {
      somme += this.notes[i];
    }
    return somme / this.notes.length;
  }
};

// Accès aux propriétés
console.log(etudiant.nom); // "Dubois"
console.log(etudiant["prenom"]); // "Marie"
console.log(etudiant.adresse.ville); // "Lyon"
console.log(etudiant.notes[2]); // 18

// Appel d'une méthode
console.log(etudiant.calculerMoyenne()); // 13.75

// Modification et ajout de propriétés
etudiant.age = 23;
etudiant.email = "marie.dubois@example.com";
etudiant.telephone = "0612345678";

// Suppression d'une propriété
delete etudiant.telephone;

// Vérification de propriétés
console.log("email" in etudiant); // true
console.log(etudiant.hasOwnProperty("telephone")); // false

// Parcourir un objet
for (let prop in etudiant) {
  if (typeof etudiant[prop] !== "function") {
    console.log(prop + ": " + etudiant[prop]);
  }
}

// Object.keys(), Object.values(), Object.entries()
console.log(Object.keys(etudiant));
console.log(Object.values(etudiant));
console.log(Object.entries(etudiant));

// Copie d'objets
let etudiant2 = Object.assign({}, etudiant);
etudiant2.nom = "Martin"; // Ne modifie pas l'original

let etudiant3 = {...etudiant};
etudiant3.prenom = "Thomas"; // Ne modifie pas l'original

// Déstructuration
let {nom, prenom, age} = etudiant;
console.log(nom); // "Dubois"
console.log(prenom); // "Marie"
console.log(age); // 23

// Déstructuration avec renommage
let {nom: nomFamille, prenom: prenomEtudiant} = etudiant;
console.log(nomFamille); // "Dubois"
console.log(prenomEtudiant); // "Marie"

// JSON
let etudiantJSON = JSON.stringify(etudiant);
console.log(etudiantJSON); // Chaîne JSON (sans les méthodes)

let etudiantParse = JSON.parse(etudiantJSON);
console.log(etudiantParse); // Objet (sans les méthodes)`,
          exercise: {
            instructions: "Créez un objet `bibliotheque` qui contient un tableau de livres. Chaque livre doit avoir un titre, un auteur, un nombre de pages et un statut de lecture (lu ou non lu). Ajoutez une méthode `afficherLivres` qui liste tous les livres, et une méthode `changerStatut` qui change le statut de lecture d'un livre spécifique. Testez ces méthodes.",
            initialCode: "// Créez l'objet bibliotheque ici\n\n// Testez les méthodes\n",
            solution: `// Créez l'objet bibliotheque ici
const bibliotheque = {
  livres: [
    { titre: "Le Petit Prince", auteur: "Antoine de Saint-Exupéry", pages: 96, lu: true },
    { titre: "1984", auteur: "George Orwell", pages: 328, lu: false },
    { titre: "Harry Potter à l'école des sorciers", auteur: "J.K. Rowling", pages: 309, lu: true }
  ],
  
  afficherLivres: function() {
    console.log("Liste des livres dans la bibliothèque:");
    for (let i = 0; i < this.livres.length; i++) {
      const livre = this.livres[i];
      const statut = livre.lu ? "Lu" : "Non lu";
      console.log(\`\${i+1}. "\${livre.titre}" par \${livre.auteur}, \${livre.pages} pages - \${statut}\`);
    }
  },
  
  changerStatut: function(index) {
    if (index >= 0 && index < this.livres.length) {
      this.livres[index].lu = !this.livres[index].lu;
      console.log(\`Statut du livre "\${this.livres[index].titre}" changé en: \${this.livres[index].lu ? "Lu" : "Non lu"}\`);
    } else {
      console.log("Index de livre invalide");
    }
  }
};

// Testez les méthodes
bibliotheque.afficherLivres();
bibliotheque.changerStatut(1); // Change le statut de "1984"
bibliotheque.afficherLivres(); // Vérifiez que le statut a changé`,
            hints: ["Créez un objet avec une propriété 'livres' qui est un tableau d'objets", "Chaque livre doit avoir les propriétés: titre, auteur, pages et lu", "La méthode afficherLivres doit parcourir le tableau de livres et afficher leurs informations", "La méthode changerStatut doit inverser la valeur de la propriété 'lu' du livre à l'index spécifié"]
          }
        }
      }
    },
    advanced: {
      title: "Concepts avancés",
      subsections: {
        'async': {
          title: "Asynchrone (Promises, async/await)",
          content: `
JavaScript est un langage à thread unique, mais il peut gérer des opérations asynchrones grâce à plusieurs mécanismes.

**Callbacks:**
Historiquement, JavaScript utilisait des fonctions de rappel (callbacks) pour gérer l'asynchrone.
\`\`\`javascript
function fetchData(callback) {
  setTimeout(() => {
    callback("Données récupérées");
  }, 1000);
}

fetchData(function(data) {
  console.log(data);
});
\`\`\`

**Problème du "Callback Hell":**
L'utilisation excessive de callbacks peut mener à du code difficile à lire et à maintenir.
\`\`\`javascript
fetchData(function(data) {
  processData(data, function(processedData) {
    saveData(processedData, function(result) {
      displayData(result, function() {
        // Et ainsi de suite...
      });
    });
  });
});
\`\`\`

**Promises (ES6):**
Les promesses sont un moyen plus élégant de gérer l'asynchrone.
\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  // Opération asynchrone
  if (/* opération réussie */) {
    resolve(resultat);
  } else {
    reject(erreur);
  }
});

promise
  .then(resultat => {
    // Traitement du résultat
  })
  .catch(erreur => {
    // Gestion de l'erreur
  })
  .finally(() => {
    // Exécuté dans tous les cas
  });
\`\`\`

**Chaînage de promesses:**
\`\`\`javascript
fetchData()
  .then(data => processData(data))
  .then(processedData => saveData(processedData))
  .then(result => displayData(result))
  .catch(error => handleError(error));
\`\`\`

**Promise.all, Promise.race, Promise.allSettled:**
\`\`\`javascript
// Attendre que toutes les promesses soient résolues
Promise.all([promise1, promise2, promise3])
  .then(results => {
    // results est un tableau contenant les résultats des promesses
  });

// Attendre la première promesse résolue ou rejetée
Promise.race([promise1, promise2, promise3])
  .then(result => {
    // result est le résultat de la première promesse résolue
  });

// Attendre que toutes les promesses soient réglées (ES2020)
Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    // results contient le statut et la valeur/raison de chaque promesse
  });
\`\`\`

**async/await (ES2017):**
Une syntaxe plus intuitive basée sur les promesses.
\`\`\`javascript
async function fetchAndProcessData() {
  try {
    const data = await fetchData();
    const processedData = await processData(data);
    const result = await saveData(processedData);
    return result;
  } catch (error) {
    handleError(error);
  }
}
\`\`\`

**Avantages de async/await:**
- Code plus lisible et plus proche du style synchrone
- Meilleure gestion des erreurs avec try/catch
- Facilite le débogage

**Fonctions asynchrones:**
- \`setTimeout()\`: Exécute une fonction après un délai spécifié
- \`setInterval()\`: Exécute une fonction à intervalles réguliers
- \`fetch()\`: API moderne pour effectuer des requêtes HTTP
- \`XMLHttpRequest\`: Ancienne méthode pour effectuer des requêtes HTTP
          `,
          example: `// Callbacks
function simulerRequete(donnees, callback) {
  console.log("Envoi de la requête avec:", donnees);
  setTimeout(() => {
    const resultat = { statut: "succès", donnees: "Résultat de " + donnees };
    callback(null, resultat);
  }, 1000);
}

simulerRequete("données initiales", (erreur, resultat) => {
  if (erreur) {
    console.error("Erreur:", erreur);
  } else {
    console.log("Résultat:", resultat);
  }
});

// Promises
function simulerRequetePromise(donnees) {
  return new Promise((resolve, reject) => {
    console.log("Envoi de la requête avec:", donnees);
    setTimeout(() => {
      const succes = true; // Simuler une réussite ou un échec
      if (succes) {
        resolve({ statut: "succès", donnees: "Résultat de " + donnees });
      } else {
        reject(new Error("Échec de la requête"));
      }
    }, 1000);
  });
}

simulerRequetePromise("données via promesse")
  .then(resultat => {
    console.log("Résultat:", resultat);
    return simulerRequetePromise(resultat.donnees); // Chaînage
  })
  .then(resultatFinal => {
    console.log("Résultat final:", resultatFinal);
  })
  .catch(erreur => {
    console.error("Erreur:", erreur);
  })
  .finally(() => {
    console.log("Opération terminée");
  });

// Promise.all
const promesse1 = simulerRequetePromise("données 1");
const promesse2 = simulerRequetePromise("données 2");
const promesse3 = simulerRequetePromise("données 3");

Promise.all([promesse1, promesse2, promesse3])
  .then(resultats => {
    console.log("Tous les résultats:", resultats);
  })
  .catch(erreur => {
    console.error("Une des promesses a échoué:", erreur);
  });

// async/await
async function executerRequetes() {
  try {
    console.log("Début des requêtes");
    
    const resultat1 = await simulerRequetePromise("première donnée");
    console.log("Premier résultat:", resultat1);
    
    const resultat2 = await simulerRequetePromise(resultat1.donnees);
    console.log("Deuxième résultat:", resultat2);
    
    return "Toutes les requêtes ont réussi";
  } catch (erreur) {
    console.error("Erreur lors des requêtes:", erreur);
    return "Échec des requêtes";
  }
}

// Appel de la fonction async
executerRequetes().then(message => {
  console.log("Message final:", message);
});

// fetch API (dans un navigateur)
// fetch('https://api.example.com/data')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Erreur réseau');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log('Données reçues:', data);
//   })
//   .catch(error => {
//     console.error('Erreur:', error);
//   });

// fetch avec async/await
// async function fetchData() {
//   try {
//     const response = await fetch('https://api.example.com/data');
//     if (!response.ok) {
//       throw new Error('Erreur réseau');
//     }
//     const data = await response.json();
//     console.log('Données reçues:', data);
//   } catch (error) {
//     console.error('Erreur:', error);
//   }
// }
// 
// fetchData();`,
          exercise: {
            instructions: "Créez une fonction `simulerAPI` qui retourne une promesse. Cette promesse doit se résoudre après un délai aléatoire entre 1 et 3 secondes avec un message de succès, ou être rejetée avec une probabilité de 20% avec un message d'erreur. Ensuite, utilisez async/await pour appeler cette fonction trois fois de suite, en affichant chaque résultat.",
            initialCode: "// Créez la fonction simulerAPI ici\n\n// Utilisez async/await pour appeler la fonction trois fois\n",
            solution: `// Créez la fonction simulerAPI ici
function simulerAPI() {
  return new Promise((resolve, reject) => {
    // Délai aléatoire entre 1000 et 3000 ms
    const delai = Math.floor(Math.random() * 2000) + 1000;
    
    // 20% de chance d'échec
    const echec = Math.random() < 0.2;
    
    setTimeout(() => {
      if (echec) {
        reject(new Error("La requête API a échoué"));
      } else {
        resolve("Données reçues avec succès après " + (delai/1000) + " secondes");
      }
    }, delai);
  });
}

// Utilisez async/await pour appeler la fonction trois fois
async function executerRequetesAPI() {
  try {
    console.log("Début des requêtes API");
    
    console.log("Requête API 1 en cours...");
    const resultat1 = await simulerAPI();
    console.log("Résultat 1:", resultat1);
    
    console.log("Requête API 2 en cours...");
    const resultat2 = await simulerAPI();
    console.log("Résultat 2:", resultat2);
    
    console.log("Requête API 3 en cours...");
    const resultat3 = await simulerAPI();
    console.log("Résultat 3:", resultat3);
    
    console.log("Toutes les requêtes ont réussi!");
  } catch (erreur) {
    console.error("Une erreur est survenue:", erreur.message);
  } finally {
    console.log("Fin des requêtes API");
  }
}

// Exécuter la fonction
executerRequetesAPI();`,
            hints: ["Utilisez Math.random() pour générer un délai aléatoire et déterminer si la requête échoue", "Dans la fonction simulerAPI, utilisez setTimeout() pour simuler le délai", "Utilisez try/catch dans votre fonction async pour gérer les erreurs potentielles", "N'oubliez pas d'attendre (await) chaque appel à simulerAPI() avant de passer au suivant"]
          }
        },
        'dom': {
          title: "Manipulation du DOM",
          content: `
Le DOM (Document Object Model) est une interface de programmation qui représente une page web comme une structure d'arbre, où chaque nœud est un objet représentant une partie du document.

**Sélection d'éléments:**
\`\`\`javascript
// Par ID
const element = document.getElementById('monId');

// Par classe
const elements = document.getElementsByClassName('maClasse');

// Par balise
const paragraphes = document.getElementsByTagName('p');

// Sélecteurs CSS (plus modernes)
const element = document.querySelector('.maClasse'); // Premier élément correspondant
const elements = document.querySelectorAll('div.maClasse'); // Tous les éléments correspondants
\`\`\`

**Modification du contenu:**
\`\`\`javascript
// Texte
element.textContent = 'Nouveau texte';

// HTML
element.innerHTML = '<strong>Texte en gras</strong>';

// Attributs
element.setAttribute('href', 'https://example.com');
element.getAttribute('href');
element.removeAttribute('disabled');

// Classes
element.classList.add('active');
element.classList.remove('hidden');
element.classList.toggle('selected');
element.classList.contains('active');

// Styles
element.style.color = 'red';
element.style.fontSize = '16px';
element.style.display = 'none';
\`\`\`

**Création et manipulation d'éléments:**
\`\`\`javascript
// Créer un élément
const newElement = document.createElement('div');
newElement.textContent = 'Nouvel élément';

// Ajouter un élément
parent.appendChild(newElement);
parent.insertBefore(newElement, referenceElement);

// Supprimer un élément
parent.removeChild(element);
element.remove(); // Méthode plus récente

// Cloner un élément
const clone = element.cloneNode(true); // true pour cloner aussi les descendants
\`\`\`

**Navigation dans le DOM:**
\`\`\`javascript
// Parents et enfants
const parent = element.parentNode;
const children = element.children;
const firstChild = element.firstElementChild;
const lastChild = element.lastElementChild;

// Frères et sœurs
const next = element.nextElementSibling;
const previous = element.previousElementSibling;
\`\`\`

**Événements:**
\`\`\`javascript
// Ajouter un écouteur d'événement
element.addEventListener('click', function(event) {
  console.log('Élément cliqué!');
});

// Supprimer un écouteur d'événement
element.removeEventListener('click', handlerFunction);

// Empêcher le comportement par défaut
element.addEventListener('click', function(event) {
  event.preventDefault();
});

// Arrêter la propagation
element.addEventListener('click', function(event) {
  event.stopPropagation();
});
\`\`\`

**Types d'événements courants:**
- \`click\`: Clic de souris
- \`dblclick\`: Double-clic
- \`mouseenter\`, \`mouseleave\`: Entrée/sortie de la souris
- \`mouseover\`, \`mouseout\`: Survol/sortie de la souris
- \`keydown\`, \`keyup\`, \`keypress\`: Événements clavier
- \`submit\`: Soumission de formulaire
- \`change\`, \`input\`: Modification de champ de formulaire
- \`load\`: Chargement de la page
- \`resize\`: Redimensionnement de la fenêtre
- \`scroll\`: Défilement

**Délégation d'événements:**
Technique qui consiste à attacher un écouteur d'événement à un parent pour gérer les événements de ses enfants.
\`\`\`javascript
document.getElementById('liste').addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    console.log('Élément de liste cliqué:', event.target.textContent);
  }
});
\`\`\`
          `,
          example: `// Sélection d'éléments
const titre = document.getElementById('titre');
const paragraphes = document.querySelectorAll('p');
const boutons = document.getElementsByClassName('bouton');
const premiereImage = document.querySelector('img');

// Modification du contenu
titre.textContent = 'Nouveau titre';
paragraphes[0].innerHTML = 'Ce paragraphe contient du <strong>texte en gras</strong>.';

// Attributs
premiereImage.setAttribute('src', 'nouvelle-image.jpg');
premiereImage.setAttribute('alt', 'Description de l\'image');
const lienHref = document.querySelector('a').getAttribute('href');

// Classes
titre.classList.add('grand');
titre.classList.remove('petit');
titre.classList.toggle('visible'); // Ajoute si absent, supprime si présent
const estActif = titre.classList.contains('actif');

// Styles
titre.style.color = 'blue';
titre.style.fontSize = '24px';
titre.style.marginBottom = '20px';

// Création et manipulation d'éléments
const nouveauParagraphe = document.createElement('p');
nouveauParagraphe.textContent = 'Ce paragraphe a été créé dynamiquement.';

const conteneur = document.getElementById('conteneur');
conteneur.appendChild(nouveauParagraphe);

const reference = document.getElementById('reference');
conteneur.insertBefore(nouveauParagraphe, reference);

// Supprimer un élément
const elementASupprimer = document.getElementById('obsolete');
elementASupprimer.parentNode.removeChild(elementASupprimer);
// Ou plus simplement:
// elementASupprimer.remove();

// Cloner un élément
const original = document.getElementById('original');
const clone = original.cloneNode(true);
clone.id = 'clone';
conteneur.appendChild(clone);

// Navigation dans le DOM
const parent = nouveauParagraphe.parentNode;
const enfants = conteneur.children;
const premierEnfant = conteneur.firstElementChild;
const dernierEnfant = conteneur.lastElementChild;
const suivant = reference.nextElementSibling;
const precedent = reference.previousElementSibling;

// Événements
const bouton = document.getElementById('monBouton');

bouton.addEventListener('click', function(event) {
  console.log('Bouton cliqué!');
  alert('Vous avez cliqué sur le bouton!');
});

// Événement avec fonction nommée
function survolBouton(event) {
  bouton.style.backgroundColor = 'lightblue';
}

function finSurvolBouton(event) {
  bouton.style.backgroundColor = '';
}

bouton.addEventListener('mouseenter', survolBouton);
bouton.addEventListener('mouseleave', finSurvolBouton);

// Supprimer un écouteur d'événement
bouton.removeEventListener('mouseenter', survolBouton);

// Empêcher le comportement par défaut
document.getElementById('monLien').addEventListener('click', function(event) {
  event.preventDefault();
  console.log('Clic sur le lien, mais la navigation a été empêchée');
});

// Arrêter la propagation
document.getElementById('enfant').addEventListener('click', function(event) {
  event.stopPropagation();
  console.log('Clic sur l\'enfant');
});

document.getElementById('parent').addEventListener('click', function() {
  console.log('Clic sur le parent (ne sera pas déclenché si on clique sur l\'enfant)');
});

// Délégation d'événements
document.getElementById('liste').addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    console.log('Élément de liste cliqué:', event.target.textContent);
    event.target.classList.toggle('selected');
  }
});`,
          exercise: {
            instructions: "Créez une fonction `creerListeTaches` qui prend un tableau de tâches et un ID d'élément conteneur. La fonction doit créer une liste de tâches dans le conteneur spécifié, où chaque tâche est un élément de liste avec une case à cocher. Lorsqu'une case est cochée, le texte de la tâche doit être barré. Ajoutez également un bouton pour supprimer une tâche.",
            initialCode: "// Fonction creerListeTaches\nfunction creerListeTaches(taches, conteneurId) {\n  // Votre code ici\n}\n\n// Exemple d'utilisation\nconst mesTaches = [\n  'Apprendre JavaScript',\n  'Créer un projet',\n  'Faire les courses'\n];\n\n// Supposons qu'il existe un élément avec l'ID 'conteneurTaches' dans le HTML\ncreerListeTaches(mesTaches, 'conteneurTaches');",
            solution: `// Fonction creerListeTaches
function creerListeTaches(taches, conteneurId) {
  // Récupérer le conteneur
  const conteneur = document.getElementById(conteneurId);
  if (!conteneur) {
    console.error("Conteneur non trouvé:", conteneurId);
    return;
  }
  
  // Créer une liste non ordonnée
  const liste = document.createElement('ul');
  liste.className = 'liste-taches';
  
  // Ajouter chaque tâche à la liste
  taches.forEach((tache, index) => {
    // Créer l'élément de liste
    const elementListe = document.createElement('li');
    elementListe.className = 'tache-item';
    
    // Créer la case à cocher
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'tache-' + index;
    
    // Créer le label pour la tâche
    const label = document.createElement('label');
    label.htmlFor = 'tache-' + index;
    label.textContent = tache;
    
    // Créer le bouton de suppression
    const boutonSupprimer = document.createElement('button');
    boutonSupprimer.textContent = 'Supprimer';
    boutonSupprimer.className = 'bouton-supprimer';
    
    // Ajouter les éléments à l'élément de liste
    elementListe.appendChild(checkbox);
    elementListe.appendChild(label);
    elementListe.appendChild(boutonSupprimer);
    
    // Ajouter l'élément de liste à la liste
    liste.appendChild(elementListe);
    
    // Ajouter un écouteur d'événement pour la case à cocher
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        label.style.textDecoration = 'line-through';
        label.style.color = 'gray';
      } else {
        label.style.textDecoration = 'none';
        label.style.color = '';
      }
    });
    
    // Ajouter un écouteur d'événement pour le bouton de suppression
    boutonSupprimer.addEventListener('click', function() {
      elementListe.remove();
    });
  });
  
  // Ajouter la liste au conteneur
  conteneur.appendChild(liste);
}

// Exemple d'utilisation
const mesTaches = [
  'Apprendre JavaScript',
  'Créer un projet',
  'Faire les courses'
];

// Supposons qu'il existe un élément avec l'ID 'conteneurTaches' dans le HTML
creerListeTaches(mesTaches, 'conteneurTaches');`,
            hints: ["Utilisez document.createElement() pour créer les éléments nécessaires", "Utilisez appendChild() pour ajouter les éléments au DOM", "Ajoutez des écouteurs d'événements avec addEventListener() pour gérer les interactions", "Pour barrer le texte, utilisez la propriété CSS textDecoration", "Pour supprimer un élément, utilisez la méthode remove()"]
          }
        }
      }
    }
  };
  
  const renderContent = () => {
    const section = sections[activeSection];
    const subsection = section.subsections[activeSubsection];
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">{subsection.title}</h2>
        
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: subsection.content.replace(/\n/g, '<br>') }} />
        </div>
        
        {subsection.example && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Exemple</h3>
            <CodeEditor 
              initialCode={subsection.example}
              language="javascript"
              readOnly={true}
              showLineNumbers={true}
              height="300px"
            />
          </div>
        )}
        
        {subsection.exercise && (
          <div className="mt-8 bg-indigo-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-indigo-900 mb-3">Exercice pratique</h3>
            <p className="text-indigo-800 mb-4">{subsection.exercise.instructions}</p>
            
            <CodeEditor 
              initialCode={subsection.exercise.initialCode}
              language="javascript"
              readOnly={false}
              showLineNumbers={true}
              height="200px"
              solution={subsection.exercise.solution}
              hints={subsection.exercise.hints}
            />
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Fondamentaux JavaScript</h1>
          <p className="mt-1 text-sm text-gray-600">Une référence complète pour maîtriser les bases de JavaScript</p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar de navigation */}
          <div className="md:w-64 flex-shrink-0">
            <nav className="space-y-6 sticky top-8">
              {Object.entries(sections).map(([sectionKey, section]) => (
                <div key={sectionKey} className="space-y-2">
                  <h3 
                    className={`font-medium text-sm uppercase tracking-wider ${
                      activeSection === sectionKey ? 'text-indigo-600' : 'text-gray-500'
                    }`}
                  >
                    {section.title}
                  </h3>
                  
                  <ul className="space-y-1">
                    {Object.entries(section.subsections).map(([subsectionKey, subsection]) => (
                      <li key={subsectionKey}>
                        <button
                          onClick={() => {
                            setActiveSection(sectionKey);
                            setActiveSubsection(subsectionKey);
                          }}
                          className={`block w-full text-left px-3 py-2 text-sm rounded-md ${
                            activeSection === sectionKey && activeSubsection === subsectionKey
                              ? 'bg-indigo-100 text-indigo-700 font-medium'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {subsection.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
          
          {/* Contenu principal */}
          <div className="flex-1 bg-white shadow rounded-lg p-6">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
