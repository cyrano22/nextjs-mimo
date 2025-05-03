
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '@/components/editor/CodeEditor';
import CodePreviewSandbox from '@/components/editor/CodePreviewSandbox';
import QuizComponent from '@/components/lessons/QuizComponent';
import ExerciseComponent from '@/components/lessons/ExerciseComponent';

export default function E2ETestingLesson() {
  const [activeTab, setActiveTab] = useState('theory');
  const [isCompleted, setIsCompleted] = useState(false);
  
  const installCypressCode = `# Installation via npm
npm install cypress --save-dev

# Ou via yarn
yarn add cypress --dev

# Ajout du script dans package.json
"scripts": {
  "cypress:open": "cypress open"
}`;

  const firstTestCode = `// cypress/e2e/login.cy.js
describe('Login page', () => {
  beforeEach(() => {
    // Visiter la page de connexion avant chaque test
    cy.visit('/login');
  });
  
  it('should display login form', () => {
    // Vérifier que le formulaire contient les éléments attendus
    cy.get('form').should('exist');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });
  
  it('should show error with invalid credentials', () => {
    // Remplir le formulaire avec des identifiants incorrects
    cy.get('input[type="email"]').type('user@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    
    // Soumettre le formulaire
    cy.get('button[type="submit"]').click();
    
    // Vérifier que le message d'erreur s'affiche
    cy.get('.error-message').should('be.visible')
      .and('contain', 'Invalid email or password');
  });
  
  it('should login with valid credentials and redirect to dashboard', () => {
    // Remplir le formulaire avec des identifiants corrects
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    
    // Soumettre le formulaire
    cy.get('button[type="submit"]').click();
    
    // Vérifier que l'utilisateur est redirigé vers le tableau de bord
    cy.url().should('include', '/dashboard');
    cy.get('h1').should('contain', 'Dashboard');
  });
});`;

  const advancedCypressCode = `// cypress/e2e/todo-app.cy.js
describe('Todo Application', () => {
  beforeEach(() => {
    // Réinitialiser la base de données avec une API personnalisée
    cy.request('POST', '/api/reset-db');
    
    // Visiter l'application
    cy.visit('/');
    
    // Se connecter (avec une commande personnalisée)
    cy.login('user@example.com', 'password123');
  });
  
  it('should add a new todo item', () => {
    const newItem = 'Apprendre Cypress';
    
    // Compter les tâches existantes
    cy.get('.todo-item').then($items => {
      const initialCount = $items.length;
      
      // Ajouter une nouvelle tâche
      cy.get('.new-todo-input').type(newItem);
      cy.get('.add-todo-button').click();
      
      // Vérifier que la tâche a été ajoutée
      cy.get('.todo-item').should('have.length', initialCount + 1);
      cy.contains('.todo-item', newItem).should('exist');
    });
  });
  
  it('should mark a todo as completed', () => {
    // Trouver la première tâche non complétée
    cy.get('.todo-item:not(.completed)').first().as('todoItem');
    
    // Cliquer sur la case à cocher
    cy.get('@todoItem').find('.todo-checkbox').click();
    
    // Vérifier que la tâche est marquée comme complétée
    cy.get('@todoItem').should('have.class', 'completed');
    
    // Vérifier que l'état persiste après rechargement
    cy.reload();
    cy.contains('.todo-item.completed', 'Test Task').should('exist');
  });
  
  it('should filter todos by status', () => {
    // Ajouter quelques tâches pour le test
    cy.addTodo('Tâche active 1');
    cy.addTodo('Tâche active 2');
    cy.addTodo('Tâche à compléter');
    
    // Marquer une tâche comme complétée
    cy.contains('.todo-item', 'Tâche à compléter')
      .find('.todo-checkbox').click();
    
    // Filtrer par tâches actives
    cy.get('.filter-active').click();
    cy.get('.todo-item').should('have.length', 2);
    cy.contains('.todo-item', 'Tâche active 1').should('be.visible');
    cy.contains('.todo-item', 'Tâche à compléter').should('not.exist');
    
    // Filtrer par tâches complétées
    cy.get('.filter-completed').click();
    cy.get('.todo-item').should('have.length', 1);
    cy.contains('.todo-item', 'Tâche à compléter').should('be.visible');
  });
});

// Commandes personnalisées dans cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'POST',
    url: '/api/login',
    body: { email, password }
  }).then((resp) => {
    window.localStorage.setItem('token', resp.body.token);
  });
});

Cypress.Commands.add('addTodo', (text) => {
  cy.get('.new-todo-input').type(text);
  cy.get('.add-todo-button').click();
});`;

  const quizQuestions = [
    {
      question: "Qu'est-ce que les tests end-to-end (E2E) en développement web?",
      options: [
        "Des tests qui vérifient uniquement le fonctionnement du backend",
        "Des tests qui simulent le comportement d'un utilisateur réel du début à la fin",
        "Des tests qui vérifient uniquement l'interface utilisateur",
        "Des tests qui vérifient uniquement les points d'entrée de l'API"
      ],
      correctAnswer: 1
    },
    {
      question: "Quel est l'avantage principal de Cypress par rapport aux autres outils de tests E2E?",
      options: [
        "Il est gratuit alors que tous les autres sont payants",
        "Il fonctionne avec tous les frameworks front-end",
        "Il s'exécute dans le même processus que l'application, offrant un contrôle direct",
        "Il est le seul à pouvoir tester les applications React"
      ],
      correctAnswer: 2
    },
    {
      question: "Qu'est-ce que cy.intercept() fait dans Cypress?",
      options: [
        "Teste les performances des requêtes réseau",
        "Permet d'espionner, de stubber ou de modifier les requêtes réseau",
        "Intercepte les erreurs JavaScript de l'application",
        "Simule des connexions réseau lentes"
      ],
      correctAnswer: 1
    }
  ];

  const exerciseInstructions = `
  Créez un test E2E Cypress pour un formulaire de contact qui:
  1. Visite la page du formulaire de contact
  2. Remplit tous les champs (nom, email, message)
  3. Soumet le formulaire
  4. Vérifie qu'un message de succès s'affiche
  5. Bonus: intercepte la requête réseau et simule une réponse réussie
  `;

  const exerciseTemplate = `// Créez le test Cypress pour un formulaire de contact
describe('Contact Form', () => {
  beforeEach(() => {
    // Visitez la page de contact
    cy.visit('/contact');
    
    // Bonus: Intercepter la soumission du formulaire
    // cy.intercept('POST', '/api/contact', { /* votre réponse simulée */ });
  });
  
  it('should submit the contact form successfully', () => {
    // Implémentez le test ici
    // 1. Remplir les champs du formulaire
    
    // 2. Soumettre le formulaire
    
    // 3. Vérifier le message de succès
  });
  
  // Facultatif: testez également le cas d'erreur
  it('should show an error message when form submission fails', () => {
    // Implémentez ce test pour vérifier la gestion des erreurs
  });
});`;

  const exerciseValidation = (code) => {
    // Vérifications basiques du code soumis
    const hasVisit = code.includes('cy.visit');
    const hasFormFilling = code.includes('cy.get') && code.includes('.type(');
    const hasSubmission = code.includes('click') || code.includes('submit');
    const hasAssertion = code.includes('should(') && 
      (code.includes('success') || code.includes('thank'));
    
    return hasVisit && hasFormFilling && hasSubmission && hasAssertion;
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
        <h1 className="text-3xl font-bold mb-2">Tests End-to-End avec Cypress</h1>
        <p className="text-gray-600 mb-6">Apprenez à automatiser le test de votre application web comme un utilisateur réel le ferait.</p>
        
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
                  <h2 className="text-2xl font-semibold mb-3">Qu'est-ce que les tests End-to-End?</h2>
                  <p className="mb-3">
                    Les tests End-to-End (E2E) sont une méthodologie de test qui vérifie si le flux d'une application 
                    fonctionne comme prévu du début à la fin. L'objectif est de simuler des scénarios d'utilisation réels 
                    en testant tout le système dans son ensemble.
                  </p>
                  <p className="mb-3">
                    Contrairement aux tests unitaires qui testent des fonctions isolées ou aux tests d'intégration qui 
                    testent l'interaction entre composants, les tests E2E testent l'application complète telle qu'un 
                    utilisateur l'expérimentera.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Cypress: un outil moderne pour les tests E2E</h2>
                  <p className="mb-3">
                    Cypress est un framework de test E2E JavaScript qui:
                  </p>
                  <ul className="list-disc ml-6 mb-4 space-y-2">
                    <li>
                      <strong>S'exécute dans le navigateur:</strong> Contrairement à Selenium, Cypress fonctionne dans le 
                      même cycle d'exécution que votre application, ce qui lui donne un contrôle complet sur son 
                      comportement.
                    </li>
                    <li>
                      <strong>Attentes automatiques:</strong> Cypress attend automatiquement que les éléments soient 
                      disponibles avant d'interagir avec eux, réduisant le besoin d'attentes explicites.
                    </li>
                    <li>
                      <strong>Rechargement en temps réel:</strong> Cypress recharge automatiquement les tests lors de 
                      modifications de fichiers.
                    </li>
                    <li>
                      <strong>Débogage facile:</strong> Cypress prend des instantanés à chaque étape du test, permettant 
                      de voir exactement ce qui s'est passé à chaque moment.
                    </li>
                    <li>
                      <strong>Interception réseau:</strong> Il permet de stubber, espionner et modifier les requêtes réseau.
                    </li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Architecture de Cypress</h2>
                  <p className="mb-3">
                    Cypress utilise une architecture unique qui lui confère plusieurs avantages:
                  </p>
                  <ul className="list-disc ml-6 mb-4 space-y-2">
                    <li>
                      <strong>Pas de pilotes Selenium:</strong> Cypress ne dépend pas des pilotes WebDriver comme Selenium.
                    </li>
                    <li>
                      <strong>Exécution dans le navigateur:</strong> Les tests s'exécutent directement dans le navigateur, 
                      ce qui permet un accès direct au DOM, aux événements, etc.
                    </li>
                    <li>
                      <strong>Architecture Node.js:</strong> Le serveur Cypress s'exécute dans Node.js, permettant l'accès 
                      au système de fichiers et au réseau.
                    </li>
                    <li>
                      <strong>Communication bidirectionnelle:</strong> Le navigateur et Node.js communiquent continuellement, 
                      permettant à Cypress d'espionner et de contrôler l'application.
                    </li>
                  </ul>
                  <div className="my-4 flex justify-center">
                    <div className="w-3/4 bg-gray-50 rounded-lg p-4">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-full p-3 bg-blue-100 rounded-lg text-center">
                          <span className="font-medium">Navigateur</span>
                          <div className="mt-2 flex justify-around">
                            <div className="px-3 py-1 bg-white rounded">Application</div>
                            <div className="px-3 py-1 bg-green-100 rounded">Tests Cypress</div>
                          </div>
                        </div>
                        <div className="h-6 w-px bg-gray-400 relative">
                          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90">↑↓</div>
                        </div>
                        <div className="w-full p-3 bg-gray-200 rounded-lg text-center">
                          <span className="font-medium">Node.js</span>
                          <div className="mt-2 flex justify-around">
                            <div className="px-3 py-1 bg-white rounded">Serveur Cypress</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Types de tests avec Cypress</h2>
                  <p className="mb-3">
                    Bien que Cypress soit connu pour les tests E2E, il peut également être utilisé pour:
                  </p>
                  <ul className="list-disc ml-6 mb-4 space-y-2">
                    <li>
                      <strong>Tests d'intégration:</strong> Tester des composants individuels ou des groupes de composants.
                    </li>
                    <li>
                      <strong>Tests d'API:</strong> Vérifier les réponses API directement avec cy.request().
                    </li>
                    <li>
                      <strong>Tests de composants:</strong> Avec Cypress Component Testing, vous pouvez tester des 
                      composants React, Vue ou Angular de manière isolée.
                    </li>
                    <li>
                      <strong>Tests visuels:</strong> En intégrant des outils comme Percy, vous pouvez détecter les 
                      changements visuels.
                    </li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Bonnes pratiques avec Cypress</h2>
                  <ul className="list-disc ml-6 mb-4 space-y-2">
                    <li>
                      <strong>Ne pas tester chaque chemin:</strong> Concentrez-vous sur les flux utilisateur critiques plutôt 
                      que de tester chaque fonctionnalité.
                    </li>
                    <li>
                      <strong>Préparer les données de test:</strong> Utilisez des API ou des commandes personnalisées pour 
                      configurer l'état initial plutôt que l'interface utilisateur.
                    </li>
                    <li>
                      <strong>Minimiser les assertions:</strong> Gardez les tests axés sur un objectif spécifique.
                    </li>
                    <li>
                      <strong>Éviter les dépendances entre tests:</strong> Chaque test doit être indépendant et pouvoir 
                      s'exécuter seul.
                    </li>
                    <li>
                      <strong>Utiliser des sélecteurs stables:</strong> Préférez les attributs data-* dédiés aux tests plutôt 
                      que des classes CSS qui peuvent changer.
                    </li>
                  </ul>
                </section>
              </div>
            )}
            
            {activeTab === 'example' && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">Installation et configuration</h2>
                  <p className="mb-3">Voici comment ajouter Cypress à votre projet:</p>
                  <div className="mb-2">
                    <CodeEditor 
                      code={installCypressCode} 
                      language="bash"
                      readOnly={true}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Après l'installation, lancez Cypress avec <code>npm run cypress:open</code>. Lors de la première 
                    exécution, Cypress créera une structure de dossiers et des exemples de tests.
                  </p>
                  
                  <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h3 className="font-medium text-amber-800 mb-2">Structure de fichiers Cypress</h3>
                    <div className="text-sm font-mono text-amber-700">
                      <pre>
{`cypress/
  ├── e2e/               # Tests end-to-end
  ├── fixtures/          # Données de test
  ├── support/           # Commandes personnalisées
  │   ├── commands.js    # Définir des commandes réutilisables
  │   └── e2e.js         # Configuration globale
  └── screenshots/       # Captures d'écran des échecs de test
cypress.config.js        # Configuration de Cypress`}
                      </pre>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">Votre premier test Cypress</h2>
                  <p className="mb-3">Voici un exemple de test pour une page de connexion:</p>
                  <div className="mb-2">
                    <CodeEditor 
                      code={firstTestCode} 
                      language="javascript"
                      readOnly={true}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Ce test vérifie trois scénarios sur une page de connexion: l'affichage correct du formulaire, 
                    la gestion des identifiants incorrects, et la connexion réussie.
                  </p>
                  
                  <div className="mb-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                    <h3 className="font-medium text-indigo-800 mb-2">Concepts clés</h3>
                    <ul className="list-disc ml-6 space-y-1 text-sm">
                      <li><strong>describe</strong>: Regroupe les tests liés</li>
                      <li><strong>it</strong>: Définit un test spécifique</li>
                      <li><strong>cy.visit()</strong>: Navigue vers une URL</li>
                      <li><strong>cy.get()</strong>: Sélectionne un élément du DOM</li>
                      <li><strong>cy.type()</strong>: Simule la saisie de texte</li>
                      <li><strong>cy.click()</strong>: Simule un clic</li>
                      <li><strong>should()</strong>: Crée une assertion sur un élément</li>
                    </ul>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">Fonctionnalités avancées</h2>
                  <p className="mb-3">Voici un exemple plus avancé testant une application Todo:</p>
                  <div className="mb-2">
                    <CodeEditor 
                      code={advancedCypressCode} 
                      language="javascript"
                      readOnly={true}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Cet exemple montre des techniques plus avancées comme:
                  </p>
                  <ul className="list-disc ml-6 mb-4 space-y-1 text-sm">
                    <li>Réinitialisation de la base de données via une API</li>
                    <li>Commandes personnalisées pour des actions répétitives</li>
                    <li>Alias avec cy.as() pour référencer des éléments</li>
                    <li>Tests complexes impliquant plusieurs interactions</li>
                    <li>Vérification de l'état après rechargement de la page</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">Démonstration visuelle de Cypress</h2>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 p-3 border-b flex justify-between items-center">
                      <span className="font-medium">Interface de Cypress</span>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="border-r">
                        <div className="p-3 bg-white">
                          <div className="font-mono text-sm text-gray-800">
                            <div className="text-green-600">✓ should display login form</div>
                            <div className="text-green-600">✓ should show error with invalid credentials</div>
                            <div className="text-blue-600 font-bold">► should login with valid credentials</div>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 border-t">
                          <div className="font-mono text-xs">
                            <div>1. Visiting: /login</div>
                            <div>2. Get: input[type="email"]</div>
                            <div>3. Type: test@example.com</div>
                            <div>4. Get: input[type="password"]</div>
                            <div>5. Type: password123</div>
                            <div>6. Get: button[type="submit"]</div>
                            <div>7. Click</div>
                            <div className="text-blue-600">8. Assert: url includes /dashboard</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white">
                        <div className="p-4">
                          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                          <div className="p-3 bg-green-100 text-green-800 rounded mb-4">
                            Connexion réussie ! Bienvenue, Test User.
                          </div>
                          <div className="border rounded-lg p-3">
                            <h2 className="font-medium mb-2">Résumé</h2>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Projets actifs:</span>
                                <span>3</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tâches en attente:</span>
                                <span>7</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Messages non lus:</span>
                                <span>2</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    L'interface de Cypress montre les tests en cours d'exécution à gauche et votre application à droite.
                  </p>
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
              <p className="text-sm">Vous avez maîtrisé les tests End-to-End avec Cypress.</p>
            </div>
          </motion.div>
        )}
        
        <div className="flex justify-between">
          <button className="btn-secondary">
            Leçon précédente
          </button>
          <button className="btn-primary">
            Leçon suivante: Tests d'intégration
          </button>
        </div>
      </motion.div>
    </div>
  );
}
