
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CodeEditor from "@/components/editor/CodeEditor";
import ExerciseComponent from "@/components/lessons/ExerciseComponent";
import QuizComponent from "@/components/lessons/QuizComponent";
import CodePreviewSandbox from "@/components/editor/CodePreviewSandbox";

export default function E2ETestingLesson() {
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
  
  const basicCypressTestExample = `
// cypress/e2e/home.cy.js
describe('Page d'accueil', () => {
  beforeEach(() => {
    // Visiter la page d'accueil avant chaque test
    cy.visit('http://localhost:3000')
  })

  it('Affiche le titre principal', () => {
    // Vérifier que le titre principal existe et contient le texte attendu
    cy.get('h1').should('contain', 'Apprenez Next.js')
  })

  it('Navigue vers la page des leçons', () => {
    // Cliquer sur le lien de navigation et vérifier l'URL
    cy.get('a[href="/lessons"]').click()
    cy.url().should('include', '/lessons')
    cy.get('h1').should('contain', 'Modules d'apprentissage')
  })
})`;

  const testingFormExample = `
// cypress/e2e/login.cy.js
describe('Formulaire de connexion', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  it('Affiche un message d\'erreur pour un email invalide', () => {
    // Entrer un email invalide
    cy.get('input[name="email"]').type('email_invalide')
    cy.get('input[name="password"]').type('motdepasse123')
    cy.get('form').submit()
    
    // Vérifier que le message d'erreur apparaît
    cy.get('.error-message').should('be.visible')
      .and('contain', 'Veuillez entrer un email valide')
  })

  it('Redirige vers le tableau de bord après une connexion réussie', () => {
    // Simuler une connexion réussie
    cy.get('input[name="email"]').type('utilisateur@example.com')
    cy.get('input[name="password"]').type('motdepasse123')
    cy.get('form').submit()
    
    // Vérifier la redirection
    cy.url().should('include', '/dashboard')
    cy.get('h1').should('contain', 'Tableau de bord')
  })
})`;

  const customCommandsExample = `
// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('form').submit()
  // Attendre que la redirection se termine
  cy.url().should('include', '/dashboard')
})

// Utilisation dans un test
// cypress/e2e/protected-page.cy.js
describe('Page protégée', () => {
  beforeEach(() => {
    // Utiliser la commande personnalisée pour se connecter
    cy.login('utilisateur@example.com', 'motdepasse123')
  })
  
  it('Accède à une page protégée', () => {
    cy.visit('/profile')
    cy.get('h1').should('contain', 'Profil Utilisateur')
  })
})`;

  const fixturesExample = `
// cypress/fixtures/user.json
{
  "email": "test@example.com",
  "password": "testpassword",
  "name": "Utilisateur Test"
}

// cypress/e2e/user-profile.cy.js
describe('Profil utilisateur', () => {
  beforeEach(() => {
    // Charger les données de test depuis le fixture
    cy.fixture('user').then((userData) => {
      // Stocker les données dans une variable Cypress
      cy.wrap(userData).as('user')
    })
    
    // Se connecter avec les données du fixture
    cy.get('@user').then((user) => {
      cy.login(user.email, user.password)
    })
  })
  
  it('Affiche les informations du profil', () => {
    cy.visit('/profile')
    cy.get('@user').then((user) => {
      cy.get('[data-testid="user-name"]').should('contain', user.name)
      cy.get('[data-testid="user-email"]').should('contain', user.email)
    })
  })
})`;

  const interceptExample = `
// Intercepter les requêtes API
describe('Gestion de la liste des cours', () => {
  beforeEach(() => {
    // Intercepter la requête GET à l'API des cours
    cy.intercept('GET', '/api/courses', { fixture: 'courses.json' }).as('getCourses')
    cy.login('admin@example.com', 'admin123')
    cy.visit('/admin/courses')
    // Attendre que la requête interceptée soit résolue
    cy.wait('@getCourses')
  })
  
  it('Affiche la liste des cours mockée', () => {
    // Vérifier que les données du fixture sont affichées
    cy.get('.course-card').should('have.length', 3)
    cy.get('.course-card').first().should('contain', 'Introduction à Next.js')
  })
  
  it('Simule l\'ajout d\'un nouveau cours', () => {
    // Intercepter la requête POST pour simuler l'ajout d'un cours
    cy.intercept('POST', '/api/courses', {
      statusCode: 201,
      body: {
        id: 4,
        title: 'Nouveau Cours',
        description: 'Description du nouveau cours'
      }
    }).as('addCourse')
    
    // Remplir le formulaire et soumettre
    cy.get('[data-testid="add-course-btn"]').click()
    cy.get('input[name="title"]').type('Nouveau Cours')
    cy.get('textarea[name="description"]').type('Description du nouveau cours')
    cy.get('form').submit()
    
    // Attendre que la requête interceptée soit résolue
    cy.wait('@addCourse')
    
    // Vérifier que le nouveau cours est ajouté à l'interface
    cy.get('.course-card').should('have.length', 4)
    cy.get('.course-card').last().should('contain', 'Nouveau Cours')
  })
})`;

  const exerciseInitialCode = `
// cypress/e2e/dashboard.cy.js
describe('Tests du tableau de bord', () => {
  beforeEach(() => {
    // Visitez la page du tableau de bord
    cy.visit('http://localhost:3000/dashboard')
  })

  // Écrivez un test qui vérifie que le titre "Tableau de bord" est présent
  it('Affiche le titre du tableau de bord', () => {
    // Votre code ici
  })

  // Écrivez un test qui vérifie que les statistiques des cours sont affichées
  it('Affiche les statistiques des cours', () => {
    // Votre code ici
  })

  // Écrivez un test qui vérifie la navigation vers une leçon
  it('Permet de naviguer vers une leçon', () => {
    // Votre code ici
  })
})`;

  const exerciseSolution = `
// cypress/e2e/dashboard.cy.js
describe('Tests du tableau de bord', () => {
  beforeEach(() => {
    // Visitez la page du tableau de bord
    cy.visit('http://localhost:3000/dashboard')
  })

  // Test pour vérifier que le titre "Tableau de bord" est présent
  it('Affiche le titre du tableau de bord', () => {
    cy.get('h1').should('contain', 'Tableau de bord')
  })

  // Test pour vérifier que les statistiques des cours sont affichées
  it('Affiche les statistiques des cours', () => {
    cy.get('[data-testid="course-stats"]').should('exist')
    cy.get('[data-testid="total-courses"]').should('be.visible')
    cy.get('[data-testid="completed-courses"]').should('be.visible')
  })

  // Test pour vérifier la navigation vers une leçon
  it('Permet de naviguer vers une leçon', () => {
    // Trouver et cliquer sur le premier cours disponible
    cy.get('[data-testid="course-item"]').first().click()
    
    // Vérifier que l'URL a changé et contient 'lessons'
    cy.url().should('include', '/lessons/module/')
    
    // Vérifier qu'on est bien sur une page de leçon
    cy.get('h1').should('exist')
    cy.get('[data-testid="lesson-content"]').should('exist')
  })
})`;

  const quizQuestions = [
    {
      id: 1,
      question: "Qu'est-ce que Cypress?",
      options: [
        "Un framework de tests unitaires pour React",
        "Un outil de tests d'intégration pour Node.js",
        "Un framework de tests end-to-end pour les applications web",
        "Un système d'automatisation de déploiement"
      ],
      correctAnswer: 2,
      explanation: "Cypress est un framework de tests end-to-end qui permet de tester des applications web comme le ferait un utilisateur réel, en interagissant avec l'interface utilisateur dans un navigateur."
    },
    {
      id: 2,
      question: "Quelle est la différence principale entre les tests E2E et les tests unitaires?",
      options: [
        "Les tests E2E sont plus rapides à exécuter",
        "Les tests E2E testent l'application dans son ensemble, comme un utilisateur réel",
        "Les tests E2E ne nécessitent pas de navigateur",
        "Les tests E2E sont plus simples à écrire"
      ],
      correctAnswer: 1,
      explanation: "Contrairement aux tests unitaires qui testent des fonctions ou composants isolés, les tests E2E testent l'application complète, en simulant les interactions d'un utilisateur réel à travers l'interface utilisateur."
    },
    {
      id: 3,
      question: "Comment Cypress permet-il d'interagir avec le DOM?",
      options: [
        "En utilisant des sélecteurs jQuery",
        "En manipulant directement le Virtual DOM de React",
        "En injectant du JavaScript dans la page",
        "En utilisant des outils d'accessibilité"
      ],
      correctAnswer: 0,
      explanation: "Cypress utilise des sélecteurs similaires à jQuery pour trouver et interagir avec les éléments du DOM. Par exemple, cy.get('button').click() utilise un sélecteur CSS pour trouver un bouton et simuler un clic dessus."
    },
    {
      id: 4,
      question: "À quoi servent les fixtures dans Cypress?",
      options: [
        "À définir des composants réutilisables pour les tests",
        "À stocker des données statiques pour les tests",
        "À configurer l'environnement de test",
        "À définir des hooks avant et après les tests"
      ],
      correctAnswer: 1,
      explanation: "Les fixtures dans Cypress servent à stocker des données de test statiques (comme des JSON) qui peuvent être chargées et utilisées dans les tests, ce qui permet de simuler des données sans avoir à les définir dans chaque test."
    },
    {
      id: 5,
      question: "Comment peut-on mocker une requête API dans Cypress?",
      options: [
        "En utilisant cy.mock()",
        "En créant un service mock avec un framework comme MSW",
        "En utilisant cy.intercept() pour intercepter et simuler les réponses",
        "En modifiant le code source pour contourner les appels API"
      ],
      correctAnswer: 2,
      explanation: "Cypress permet de mocker les requêtes API en utilisant cy.intercept() pour intercepter les requêtes HTTP et définir des réponses personnalisées, sans avoir à modifier le code source de l'application."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">Tests End-to-End avec Cypress</h1>
            <p className="text-gray-600 mt-2">Apprenez à mettre en place des tests end-to-end pour vos applications Next.js</p>
          </div>
          
          <div className="flex space-x-2">
            <Link href="/lessons/module/testing" className="btn-secondary">
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
              <h2>Introduction aux tests End-to-End (E2E)</h2>
              <p>
                Les tests End-to-End (E2E) simulent les interactions d'un utilisateur réel avec votre application. 
                Contrairement aux tests unitaires qui testent des fonctions isolées, les tests E2E vérifient que tous 
                les composants de votre application fonctionnent ensemble correctement.
              </p>
              <p>
                <strong>Cypress</strong> est l'un des frameworks les plus populaires pour les tests E2E. Il offre:
              </p>
              <ul>
                <li>Une exécution dans un vrai navigateur</li>
                <li>Des attentes automatiques (pas besoin de sleep/wait arbitraires)</li>
                <li>Un retour visuel en temps réel</li>
                <li>La possibilité de déboguer facilement</li>
                <li>Des outils pour mocker des APIs</li>
              </ul>
              
              <h3>Configuration de Cypress avec Next.js</h3>
              <p>
                Pour installer Cypress dans un projet Next.js:
              </p>
              <pre><code>npm install cypress --save-dev</code></pre>
              <p>
                Ajoutez un script dans votre package.json:
              </p>
              <pre><code>"cypress": "cypress open"</code></pre>
              <p>
                Lancez Cypress pour la première fois:
              </p>
              <pre><code>npm run cypress</code></pre>
              <p>
                Cypress créera automatiquement un répertoire cypress/ avec des exemples de tests.
              </p>
              
              <h3>Structure d'un test Cypress</h3>
              <p>
                Un test Cypress de base ressemble à ceci:
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md">
                <CodePreviewSandbox code={basicCypressTestExample} language="javascript" />
              </div>
              
              <p>
                Les tests Cypress utilisent des fonctions comme <code>describe</code>, <code>it</code>, <code>beforeEach</code> 
                similaires à Mocha. L'objet global <code>cy</code> fournit des méthodes pour interagir avec la page.
              </p>
              
              <h3>Tester les formulaires</h3>
              <p>
                Cypress permet de tester facilement les interactions avec les formulaires:
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md">
                <CodePreviewSandbox code={testingFormExample} language="javascript" />
              </div>
              
              <h3>Commandes personnalisées</h3>
              <p>
                Vous pouvez créer des commandes personnalisées pour réutiliser des séquences d'actions communes:
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md">
                <CodePreviewSandbox code={customCommandsExample} language="javascript" />
              </div>
              
              <h3>Fixtures et données de test</h3>
              <p>
                Les fixtures permettent de stocker des données de test statiques:
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md">
                <CodePreviewSandbox code={fixturesExample} language="javascript" />
              </div>
              
              <h3>Intercepter les requêtes réseau</h3>
              <p>
                Cypress permet d'intercepter et de mocker les requêtes réseau:
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md">
                <CodePreviewSandbox code={interceptExample} language="javascript" />
              </div>
              
              <h3>Bonnes pratiques pour les tests E2E</h3>
              <ul>
                <li><strong>Sélecteurs stables</strong>: Utilisez des attributs data-* (comme data-testid) pour sélectionner des éléments</li>
                <li><strong>Tests isolés</strong>: Chaque test doit être indépendant et pouvoir s'exécuter seul</li>
                <li><strong>État initial contrôlé</strong>: Utilisez beforeEach pour remettre l'application dans un état connu</li>
                <li><strong>Assertions claires</strong>: Vérifiez des comportements spécifiques, pas juste la présence d'éléments</li>
                <li><strong>Tests réalistes</strong>: Testez des parcours utilisateur complets</li>
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
              <h2>Exercice: Tests du tableau de bord</h2>
              <p>
                Dans cet exercice, vous allez écrire des tests E2E pour le tableau de bord de notre application.
                Vous allez vérifier que:
              </p>
              <ul>
                <li>Le titre du tableau de bord s'affiche correctement</li>
                <li>Les statistiques des cours sont visibles</li>
                <li>La navigation vers une leçon fonctionne</li>
              </ul>
              <p>
                Complétez les tests dans le fichier <code>dashboard.cy.js</code> ci-dessous:
              </p>
            </div>
            
            <ExerciseComponent
              initialCode={exerciseInitialCode}
              solutionCode={exerciseSolution}
              language="javascript"
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
                href="/lessons/module/testing"
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
