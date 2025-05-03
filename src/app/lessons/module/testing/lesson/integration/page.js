
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CodeEditor from "@/components/editor/CodeEditor";
import ExerciseComponent from "@/components/lessons/ExerciseComponent";
import QuizComponent from "@/components/lessons/QuizComponent";
import CodePreviewSandbox from "@/components/editor/CodePreviewSandbox";

export default function IntegrationTestingLesson() {
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
  
  const rtlBasicExample = `
import { render, screen } from '@testing-library/react';
import UserProfile from '../components/UserProfile';

test('affiche le nom d\'utilisateur', () => {
  // Rendre le composant avec des props
  render(<UserProfile username="JohnDoe" />);
  
  // Vérifier que le nom d'utilisateur est affiché
  const usernameElement = screen.getByText(/JohnDoe/i);
  expect(usernameElement).toBeInTheDocument();
});
`;

  const rtlInteractionExample = `
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../components/Counter';

test('incrémente le compteur lorsque le bouton est cliqué', () => {
  // Rendre le composant
  render(<Counter initialCount={0} />);
  
  // Vérifier que le compteur affiche 0 initialement
  expect(screen.getByText('Compteur: 0')).toBeInTheDocument();
  
  // Trouver le bouton et simuler un clic
  const incrementButton = screen.getByText('Incrémenter');
  fireEvent.click(incrementButton);
  
  // Vérifier que le compteur a été incrémenté
  expect(screen.getByText('Compteur: 1')).toBeInTheDocument();
});
`;

  const userEventsExample = `
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../components/LoginForm';

test('soumet le formulaire avec les identifiants corrects', async () => {
  // Configurer userEvent
  const user = userEvent.setup();
  
  // Mock de la fonction onSubmit
  const handleSubmit = jest.fn();
  
  // Rendre le composant
  render(<LoginForm onSubmit={handleSubmit} />);
  
  // Remplir le formulaire
  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/mot de passe/i), 'password123');
  
  // Soumettre le formulaire
  await user.click(screen.getByRole('button', { name: /connexion/i }));
  
  // Vérifier que la fonction onSubmit a été appelée avec les bonnes valeurs
  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123'
  });
});
`;

  const asyncExample = `
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserList from '../components/UserList';

// Mock de l'API fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      users: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ]
    })
  })
);

test('charge et affiche la liste des utilisateurs', async () => {
  // Rendre le composant
  render(<UserList />);
  
  // Vérifier que l'indicateur de chargement est affiché
  expect(screen.getByText(/chargement/i)).toBeInTheDocument();
  
  // Attendre que les données soient chargées
  await waitFor(() => {
    expect(screen.queryByText(/chargement/i)).not.toBeInTheDocument();
  });
  
  // Vérifier que les utilisateurs sont affichés
  expect(screen.getByText('Alice')).toBeInTheDocument();
  expect(screen.getByText('Bob')).toBeInTheDocument();
});
`;

  const mockingExample = `
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import ProfilePage from '../app/profile/page';

// Mock du hook useRouter de Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

test('affiche le bouton de déconnexion et redirige correctement', async () => {
  // Configurer le mock de useRouter
  const pushMock = jest.fn();
  useRouter.mockReturnValue({
    push: pushMock
  });
  
  // Rendre le composant
  render(<ProfilePage />);
  
  // Simuler un clic sur le bouton de déconnexion
  const logoutButton = screen.getByRole('button', { name: /déconnexion/i });
  await userEvent.click(logoutButton);
  
  // Vérifier que la redirection a été appelée
  expect(pushMock).toHaveBeenCalledWith('/login');
});
`;

  const contextExample = `
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserProvider } from '../contexts/UserContext';
import ProfileSettings from '../components/ProfileSettings';

test('met à jour les préférences utilisateur dans le contexte', async () => {
  // Créer un contexte initial pour le test
  const initialUser = {
    name: 'Jane Doe',
    preferences: {
      theme: 'light',
      notifications: true
    }
  };
  
  // Mock de la fonction de mise à jour
  const updatePreferencesMock = jest.fn();
  
  // Rendre le composant avec le provider
  render(
    <UserProvider
      initialUser={initialUser}
      overrides={{ updatePreferences: updatePreferencesMock }}
    >
      <ProfileSettings />
    </UserProvider>
  );
  
  // Changer le thème
  const themeSelect = screen.getByLabelText(/thème/i);
  await userEvent.selectOptions(themeSelect, 'dark');
  
  // Désactiver les notifications
  const notificationsToggle = screen.getByRole('checkbox', { name: /notifications/i });
  await userEvent.click(notificationsToggle);
  
  // Soumettre le formulaire
  const saveButton = screen.getByRole('button', { name: /enregistrer/i });
  await userEvent.click(saveButton);
  
  // Vérifier que la fonction de mise à jour a été appelée avec les bonnes valeurs
  expect(updatePreferencesMock).toHaveBeenCalledWith({
    theme: 'dark',
    notifications: false
  });
});
`;

  const exerciseInitialCode = `
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CourseCard from '../components/CourseCard';

// Complétez les tests pour le composant CourseCard
// Le composant affiche:
// - Un titre (h3)
// - Une description
// - Un tag de niveau (débutant, intermédiaire, avancé)
// - Un bouton "Commencer" qui appelle onStart quand cliqué
// - Un indicateur de progression

describe('CourseCard', () => {
  const mockCourse = {
    id: '1',
    title: 'Introduction à Next.js',
    description: 'Apprenez les bases de Next.js',
    level: 'débutant',
    progress: 30
  };
  
  test('affiche les informations du cours correctement', () => {
    // Écrivez le test ici
  });
  
  test('appelle onStart avec l\'id du cours quand le bouton est cliqué', async () => {
    // Écrivez le test ici
  });
  
  test('affiche correctement la progression du cours', () => {
    // Écrivez le test ici
  });
});
`;

  const exerciseSolution = `
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CourseCard from '../components/CourseCard';

describe('CourseCard', () => {
  const mockCourse = {
    id: '1',
    title: 'Introduction à Next.js',
    description: 'Apprenez les bases de Next.js',
    level: 'débutant',
    progress: 30
  };
  
  test('affiche les informations du cours correctement', () => {
    render(<CourseCard course={mockCourse} onStart={() => {}} />);
    
    // Vérifier que le titre est affiché
    expect(screen.getByRole('heading', { name: mockCourse.title })).toBeInTheDocument();
    
    // Vérifier que la description est affichée
    expect(screen.getByText(mockCourse.description)).toBeInTheDocument();
    
    // Vérifier que le niveau est affiché
    expect(screen.getByText(mockCourse.level, { exact: false })).toBeInTheDocument();
  });
  
  test('appelle onStart avec l\\'id du cours quand le bouton est cliqué', async () => {
    const user = userEvent.setup();
    const onStartMock = jest.fn();
    
    render(<CourseCard course={mockCourse} onStart={onStartMock} />);
    
    // Trouver le bouton et cliquer dessus
    const startButton = screen.getByRole('button', { name: /commencer/i });
    await user.click(startButton);
    
    // Vérifier que onStart a été appelé avec l'id du cours
    expect(onStartMock).toHaveBeenCalledWith(mockCourse.id);
  });
  
  test('affiche correctement la progression du cours', () => {
    render(<CourseCard course={mockCourse} onStart={() => {}} />);
    
    // Vérifier que l'indicateur de progression est affiché
    const progressElement = screen.getByText(/30%/i);
    expect(progressElement).toBeInTheDocument();
    
    // Vérifier que la barre de progression a la bonne largeur
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '30');
  });
});
`;

  const quizQuestions = [
    {
      id: 1,
      question: "Quelle est la principale différence entre les tests unitaires et les tests d'intégration?",
      options: [
        "Les tests unitaires sont plus rapides à exécuter",
        "Les tests d'intégration vérifient l'interaction entre plusieurs composants ou systèmes",
        "Les tests unitaires ne peuvent pas utiliser Jest",
        "Les tests d'intégration ne nécessitent pas de mocks"
      ],
      correctAnswer: 1,
      explanation: "Les tests d'intégration vérifient comment plusieurs composants ou systèmes interagissent ensemble, tandis que les tests unitaires se concentrent sur des unités isolées de code."
    },
    {
      id: 2,
      question: "Que permet de faire React Testing Library?",
      options: [
        "Simuler un serveur backend",
        "Tester les composants React de manière similaire à comme un utilisateur les utiliserait",
        "Générer automatiquement des tests à partir du code source",
        "Compiler du code JSX en JavaScript"
      ],
      correctAnswer: 1,
      explanation: "React Testing Library est conçue pour tester les composants React d'une manière qui reflète comment les utilisateurs interagiraient avec eux, en se concentrant sur les nœuds DOM plutôt que sur les détails d'implémentation."
    },
    {
      id: 3,
      question: "Quelle fonction utilise-t-on pour trouver un élément par son texte avec React Testing Library?",
      options: [
        "findByText()",
        "queryByText()",
        "getByText()",
        "selectByText()"
      ],
      correctAnswer: 2,
      explanation: "getByText() est utilisé pour trouver un élément par son contenu textuel. Cette fonction génère une erreur si l'élément n'est pas trouvé, contrairement à queryByText() qui retourne null."
    },
    {
      id: 4,
      question: "Quelle est la différence principale entre fireEvent et userEvent?",
      options: [
        "userEvent est plus récent et sera obsolète dans les futures versions",
        "fireEvent simule uniquement les événements de souris, userEvent simule tous les types d'événements",
        "userEvent simule les interactions utilisateur de manière plus réaliste",
        "Il n'y a pas de différence significative"
      ],
      correctAnswer: 2,
      explanation: "userEvent simule les interactions utilisateur de manière plus réaliste en déclenchant tous les événements qui seraient normalement générés lors d'une interaction utilisateur réelle, alors que fireEvent déclenche uniquement l'événement spécifié."
    },
    {
      id: 5,
      question: "Comment tester un composant qui effectue une requête API asynchrone?",
      options: [
        "En utilisant async/await avec waitFor()",
        "Ce n'est pas possible, il faut désactiver les appels API pendant les tests",
        "En utilisant uniquement setTimeout()",
        "En testant uniquement le rendu initial, pas les données chargées"
      ],
      correctAnswer: 0,
      explanation: "Pour tester un composant qui effectue une requête API asynchrone, on utilise généralement async/await avec waitFor() pour attendre que les éléments attendus apparaissent dans le DOM après le chargement des données."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">Tests d'intégration</h1>
            <p className="text-gray-600 mt-2">Apprenez à tester l'interaction entre vos composants React et Next.js</p>
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
              <h2>Les tests d'intégration dans les applications React et Next.js</h2>
              <p>
                Les tests d'intégration vérifient que plusieurs parties de votre application fonctionnent correctement ensemble.
                Contrairement aux tests unitaires qui isolent des fonctions ou composants, les tests d'intégration examinent
                les interactions entre composants, hooks, contextes, ou entre le frontend et le backend.
              </p>
              
              <h3>React Testing Library (RTL)</h3>
              <p>
                React Testing Library est l'outil recommandé pour les tests d'intégration dans les applications React et Next.js.
                RTL encourage à tester votre application comme un utilisateur l'utiliserait, plutôt que de se concentrer sur les
                détails d'implémentation.
              </p>
              <p>
                Principes clés de RTL:
              </p>
              <ul>
                <li>Tester le comportement, pas l'implémentation</li>
                <li>Trouver des éléments comme un utilisateur le ferait (par texte, rôle, etc.)</li>
                <li>Éviter de tester les props et l'état interne des composants</li>
              </ul>
              
              <h3>Configuration pour Next.js</h3>
              <p>
                Pour tester des applications Next.js, il faut généralement:
              </p>
              <ul>
                <li>Installer les dépendances: <code>@testing-library/react</code>, <code>@testing-library/jest-dom</code>, <code>@testing-library/user-event</code></li>
                <li>Configurer Jest pour comprendre les modules Next.js</li>
                <li>Mettre en place des mocks pour <code>next/router</code>, <code>next/navigation</code>, etc.</li>
              </ul>
              
              <h3>Tests de base avec RTL</h3>
              <p>
                Voici un exemple simple de test pour un composant:
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md">
                <CodePreviewSandbox code={rtlBasicExample} language="javascript" />
              </div>
              
              <h3>Tester les interactions utilisateur</h3>
              <p>
                RTL permet de simuler des interactions utilisateur comme les clics:
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md">
                <CodePreviewSandbox code={rtlInteractionExample} language="javascript" />
              </div>
              
              <h3>userEvent vs fireEvent</h3>
              <p>
                <code>userEvent</code> est plus proche du comportement réel des utilisateurs que <code>fireEvent</code>:
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md">
                <CodePreviewSandbox code={userEventsExample} language="javascript" />
              </div>
              
              <h3>Tester des comportements asynchrones</h3>
              <p>
                Pour les composants qui chargent des données ou ont des effets asynchrones:
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md">
                <CodePreviewSandbox code={asyncExample} language="javascript" />
              </div>
              
              <h3>Mocker des dépendances externes</h3>
              <p>
                Pour tester efficacement, on doit souvent mocker des dépendances:
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md">
                <CodePreviewSandbox code={mockingExample} language="javascript" />
              </div>
              
              <h3>Tester avec des contextes</h3>
              <p>
                Pour les composants utilisant React Context:
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md">
                <CodePreviewSandbox code={contextExample} language="javascript" />
              </div>
              
              <h3>Bonnes pratiques</h3>
              <ul>
                <li><strong>Accessibilité d'abord</strong>: Utilisez des sélecteurs basés sur les rôles et l'accessibilité (<code>getByRole</code>, <code>getByLabelText</code>)</li>
                <li><strong>Tests résilients</strong>: Évitez de tester des détails d'implémentation qui pourraient changer</li>
                <li><strong>Tests lisibles</strong>: Utilisez des fonctions d'aide et des utilitaires pour clarifier l'intention des tests</li>
                <li><strong>Isolation</strong>: Chaque test doit être indépendant et nettoyer après lui-même</li>
                <li><strong>Couverture ciblée</strong>: Concentrez-vous sur les parcours utilisateur critiques plutôt que sur une couverture de 100%</li>
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
              <h2>Exercice: Tester un composant CourseCard</h2>
              <p>
                Dans cet exercice, vous allez écrire des tests d'intégration pour un composant <code>CourseCard</code> qui affiche les informations d'un cours et permet à l'utilisateur de commencer le cours.
              </p>
              <p>
                Le composant <code>CourseCard</code> affiche:
              </p>
              <ul>
                <li>Un titre (h3)</li>
                <li>Une description</li>
                <li>Un tag de niveau (débutant, intermédiaire, avancé)</li>
                <li>Un bouton "Commencer" qui appelle la fonction <code>onStart</code> avec l'ID du cours</li>
                <li>Un indicateur de progression</li>
              </ul>
              <p>
                Complétez les tests pour vérifier que:
              </p>
              <ol>
                <li>Le composant affiche correctement les informations du cours</li>
                <li>La fonction <code>onStart</code> est appelée avec l'ID du cours quand le bouton est cliqué</li>
                <li>L'indicateur de progression affiche correctement le pourcentage de progression</li>
              </ol>
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
