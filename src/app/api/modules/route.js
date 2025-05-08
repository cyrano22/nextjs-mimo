export async function GET() {
  // Définition des assistants IA qui accompagneront l'étudiant
  const aiAssistants = {
    javaScriptMentor: {
      id: "js-mentor",
      name: "CodeSage",
      role: "JavaScript Expert",
      avatar: "/images/assistants/codesage.jpg",
      description: "Expert en JavaScript moderne, spécialiste des concepts avancés et des patterns de programmation.",
      specialties: ["JavaScript", "ES6+", "Asynchronous Programming", "Functional Programming"],
      model: "GPT-4 Turbo"
    },
    reactMentor: {
      id: "react-mentor",
      name: "ComponentPro",
      role: "React Specialist",
      avatar: "/images/assistants/componentpro.jpg",
      description: "Spécialiste de l'écosystème React, expert en architecture de composants et optimisation.",
      specialties: ["React", "Hooks", "State Management", "Component Design"],
      model: "GPT-4 Turbo"
    },
    nextjsMentor: {
      id: "nextjs-mentor",
      name: "ServerSideWizard",
      role: "Next.js Expert",
      avatar: "/images/assistants/serversidewizard.jpg",
      description: "Maître du framework Next.js, spécialiste du rendu côté serveur et des applications React optimisées.",
      specialties: ["Next.js", "SSR", "Static Generation", "API Routes"],
      model: "GPT-4 Turbo"
    },
    careerCoach: {
      id: "career-coach",
      name: "DevPathfinder",
      role: "Career Development Coach",
      avatar: "/images/assistants/devpathfinder.jpg",
      description: "Coach de développement de carrière, aide à la transition professionnelle et à la préparation des entretiens.",
      specialties: ["Career Planning", "Portfolio Review", "Interview Prep", "Job Search Strategy"],
      model: "GPT-4 Turbo"
    },
    hugFaceAssistant: {
      id: "huggingface-assistant",
      name: "CodeHugger",
      role: "IA Coach développeur",
      avatar: "/images/assistants/codeHugger.jpg",
      description: "Assistant IA basé sur les modèles Hugging Face, spécialisé dans l'analyse de code, la génération et le débogage.",
      specialties: ["Code Generation", "Code Analysis", "Debugging", "LLM Integration"],
      model: "Hugging Face LLAMA-3"
    }
  };
  
  // Données des modules (dans une application réelle, ces données viendraient d'une base de données)
  const modulesData = [
    {
      id: "1",
      title: "Préparation au développement web moderne",
      description: "Les bases essentielles pour comprendre l'écosystème du développement web avant de plonger dans Next.js",
      level: "Débutant",
      image: "/images/modules/web-fundamentals.jpg",
      progressPercent: 0,
      duration: "6 heures",
      category: "foundations",
      prerequisites: [],
      outcomes: ["Comprendre les bases du web", "Maîtriser les fondamentaux HTML/CSS", "Connaître le fonctionnement des navigateurs"],
      lessons: [
        { id: "1-1", title: "Fondamentaux du Web", type: "theory", duration: "20 min", xpReward: 10, completed: false, description: "Comprendre comment fonctionne Internet et le Web" },
        { id: "1-2", title: "HTML5 pour débutants", type: "theory", duration: "30 min", xpReward: 15, completed: false, description: "Les bases du langage de balisage qui structure toutes les pages web" },
        { id: "1-3", title: "CSS Essentiel", type: "exercise", duration: "40 min", xpReward: 20, completed: false, description: "Apprendre à styliser vos pages web avec CSS" },
        { id: "1-4", title: "Responsive Design", type: "theory", duration: "25 min", xpReward: 15, completed: false, description: "Créer des sites qui s'adaptent à tous les écrans" },
        { id: "1-5", title: "Outils de développement web", type: "exercise", duration: "30 min", xpReward: 15, completed: false, description: "Découvrir les outils essentiels pour le développement web moderne" },
        { id: "1-6", title: "Projet : Page web responsive", type: "project", duration: "90 min", xpReward: 40, completed: false, description: "Créer votre première page web responsive avec HTML et CSS" }
      ]
    },
    {
      id: "2",
      title: "JavaScript Fondamental",
      description: "Maîtrisez JavaScript, le langage de programmation essentiel pour tout développeur web et prérequis pour Next.js",
      level: "Débutant",
      image: "/images/modules/javascript-basics.jpg",
      progressPercent: 0,
      duration: "12 heures",
      category: "foundations",
      prerequisites: ["1"],
      outcomes: ["Maîtriser la syntaxe JavaScript", "Comprendre les concepts de programmation", "Manipuler le DOM", "Créer des applications interactives"],
      aiSupport: {
        primaryMentor: "js-mentor",
        supportMentor: "huggingface-assistant",
        features: [
          "Code reviews personnalisés par CodeSage",
          "Explications interactives des concepts complexes",
          "Débogage assisté par IA",
          "Suggestions d'amélioration de code par CodeHugger"
        ]
      },
      lessons: [
        { 
          id: "2-1", 
          title: "Introduction à JavaScript", 
          type: "theory", 
          duration: "30 min", 
          xpReward: 15, 
          completed: false, 
          description: "Découvrir l'histoire et le rôle de JavaScript dans le développement web moderne",
          content: {
            videoUrl: "/videos/js-intro.mp4",
            interactiveDemo: true,
            aiSupport: "Explications personnalisées des concepts par CodeSage"
          }
        },
        { 
          id: "2-2", 
          title: "Configuration de l'environnement de développement", 
          type: "exercise", 
          duration: "25 min", 
          xpReward: 15, 
          completed: false, 
          description: "Mettre en place les outils essentiels pour développer en JavaScript",
          content: {
            tools: ["VS Code", "Node.js", "npm", "Chrome DevTools"],
            aiSupport: "CodeHugger vous guide dans la configuration de votre environnement"
          }
        },
        { 
          id: "2-3", 
          title: "Variables, Types et Opérateurs", 
          type: "theory", 
          duration: "40 min", 
          xpReward: 20, 
          completed: false, 
          description: "Comprendre les différents types de données et opérations en JavaScript",
          content: {
            quiz: true,
            practiceExercises: 5,
            aiSupport: "CodeSage explique les subtilités des types en JavaScript"
          }
        },
        { 
          id: "2-4", 
          title: "Structures de contrôle approfondies", 
          type: "exercise", 
          duration: "45 min", 
          xpReward: 25, 
          completed: false, 
          description: "Maîtriser les conditions, boucles et structures de contrôle avancées",
          content: {
            challenges: 8,
            aiSupport: "Feedback personnalisé sur vos solutions par CodeSage"
          }
        },
        { 
          id: "2-5", 
          title: "Fonctions en profondeur", 
          type: "theory", 
          duration: "50 min", 
          xpReward: 25, 
          completed: false, 
          description: "Comprendre les différents types de fonctions, la portée et les closures",
          content: {
            examples: 12,
            visualizer: true,
            aiSupport: "CodeSage explique les closures avec des visualisations interactives"
          }
        },
        { 
          id: "2-6", 
          title: "Objets et Prototypes", 
          type: "exercise", 
          duration: "55 min", 
          xpReward: 30, 
          completed: false, 
          description: "Explorer les objets JavaScript, l'héritage et le système de prototypes",
          content: {
            practiceExercises: 7,
            aiSupport: "CodeHugger analyse votre code et suggère des améliorations"
          }
        },
        { 
          id: "2-7", 
          title: "Tableaux et Méthodes", 
          type: "exercise", 
          duration: "45 min", 
          xpReward: 25, 
          completed: false, 
          description: "Maîtriser les opérations sur les tableaux et les méthodes de transformation",
          content: {
            challenges: 10,
            aiSupport: "Démonstrations personnalisées des méthodes de tableau par CodeSage"
          }
        },
        { 
          id: "2-8", 
          title: "Manipulation avancée du DOM", 
          type: "exercise", 
          duration: "60 min", 
          xpReward: 35, 
          completed: false, 
          description: "Créer des interfaces dynamiques en manipulant la structure HTML",
          content: {
            interactiveDemos: 5,
            projectStarter: true,
            aiSupport: "CodeHugger vous aide à déboguer les interactions DOM complexes"
          }
        },
        { 
          id: "2-9", 
          title: "Gestion des événements", 
          type: "theory", 
          duration: "40 min", 
          xpReward: 20, 
          completed: false, 
          description: "Apprendre à réagir aux interactions utilisateur avec les événements JavaScript",
          content: {
            demos: 6,
            exercises: 4,
            aiSupport: "CodeSage explique la propagation d'événements et les bonnes pratiques"
          }
        },
        { 
          id: "2-10", 
          title: "Asynchrone, Promesses et Async/Await", 
          type: "theory", 
          duration: "60 min", 
          xpReward: 35, 
          completed: false, 
          description: "Comprendre en profondeur la programmation asynchrone en JavaScript",
          content: {
            visualFlowcharts: true,
            examples: 8,
            aiSupport: "Explications détaillées du flux asynchrone par CodeSage"
          }
        },
        { 
          id: "2-11", 
          title: "Requêtes API et Fetch avancé", 
          type: "exercise", 
          duration: "50 min", 
          xpReward: 30, 
          completed: false, 
          description: "Maîtriser les appels API, la gestion des réponses et les erreurs",
          content: {
            apiPlayground: true,
            challenges: 6,
            aiSupport: "CodeHugger vous aide à analyser les réponses API et à gérer les cas d'erreur"
          }
        },
        { 
          id: "2-12", 
          title: "Stockage local et gestion de données", 
          type: "exercise", 
          duration: "45 min", 
          xpReward: 25, 
          completed: false, 
          description: "Utiliser localStorage, sessionStorage et les cookies pour stocker des données",
          content: {
            exercises: 5,
            aiSupport: "CodeSage explique les différences entre les méthodes de stockage"
          }
        },
        { 
          id: "2-13", 
          title: "Débogage et outils de développement", 
          type: "theory", 
          duration: "35 min", 
          xpReward: 20, 
          completed: false, 
          description: "Apprendre à trouver et corriger les erreurs efficacement",
          content: {
            interactiveDemo: true,
            aiSupport: "CodeHugger vous aide à diagnostiquer et résoudre les problèmes"
          }
        },
        { 
          id: "2-14", 
          title: "Projet : Application Todo List avancée", 
          type: "project", 
          duration: "120 min", 
          xpReward: 70, 
          completed: false, 
          description: "Créer une application de gestion de tâches complète avec persistance de données",
          content: {
            starter: true,
            stages: 5,
            codeReviews: true,
            aiSupport: "CodeSage et CodeHugger vous guident tout au long du développement avec des code reviews"
          }
        }
      ]
    },
    {
      id: "3",
      title: "JavaScript Moderne (ES6+)",
      description: "Les fonctionnalités avancées de JavaScript moderne essentielles pour React et Next.js",
      level: "Intermédiaire",
      image: "/images/modules/es6-javascript.jpg",
      progressPercent: 0,
      duration: "5 heures",
      category: "foundations",
      prerequisites: ["2"],
      outcomes: ["Maîtriser les fonctionnalités ES6+", "Comprendre les modules", "Utiliser les fonctions avancées"],
      lessons: [
        { id: "3-1", title: "Nouvelles syntaxes ES6", type: "theory", duration: "30 min", xpReward: 15, completed: false, description: "Arrow functions, template literals, destructuring" },
        { id: "3-2", title: "Modules ES6", type: "theory", duration: "25 min", xpReward: 15, completed: false, description: "Import/export et organisation du code" },
        { id: "3-3", title: "Classes et prototypes", type: "exercise", duration: "40 min", xpReward: 20, completed: false, description: "POO en JavaScript" },
        { id: "3-4", title: "Promesses avancées et async/await", type: "exercise", duration: "45 min", xpReward: 25, completed: false, description: "Gestion avancée de l'asynchrone" },
        { id: "3-5", title: "Structures de données modernes", type: "theory", duration: "30 min", xpReward: 15, completed: false, description: "Map, Set, et autres collections" },
        { id: "3-6", title: "Projet : Application météo", type: "project", duration: "90 min", xpReward: 50, completed: false, description: "Créer une application météo utilisant une API externe et les fonctionnalités ES6+" }
      ]
    },
    {
      id: "4",
      title: "React Fondamental",
      description: "Maîtrisez React, la bibliothèque qui forme la base de Next.js pour construire des interfaces utilisateur modernes",
      level: "Intermédiaire",
      image: "/images/modules/react-basics.jpg",
      progressPercent: 0,
      duration: "14 heures",
      category: "react",
      prerequisites: ["3"],
      outcomes: ["Comprendre les concepts fondamentaux de React", "Maîtriser les composants et hooks", "Construire des applications React complètes", "Développer une pensée orientée composant"],
      aiSupport: {
        primaryMentor: "react-mentor",
        supportMentor: "huggingface-assistant",
        features: [
          "Accompagnement personnalisé par ComponentPro",
          "Analyse de code et recommandations par CodeHugger",
          "Démonstrations interactives des concepts React",
          "Aide au débogage et à l'optimisation"
        ]
      },
      lessons: [
        { 
          id: "4-1", 
          title: "Introduction à React et son écosystème", 
          type: "theory", 
          duration: "40 min", 
          xpReward: 20, 
          completed: false, 
          description: "Histoire, philosophie et positionnement de React dans l'écosystème moderne",
          content: {
            videoUrl: "/videos/react-intro.mp4",
            timeline: true,
            comparison: ["Angular", "Vue", "Vanilla JS"],
            aiSupport: "ComponentPro présente l'évolution de React et son impact sur le développement web"
          }
        },
        { 
          id: "4-2", 
          title: "Configuration d'un environnement React moderne", 
          type: "exercise", 
          duration: "35 min", 
          xpReward: 20, 
          completed: false, 
          description: "Mettre en place un environnement de développement React avec les meilleurs outils",
          content: {
            tools: ["Create React App", "Vite", "React DevTools", "ESLint", "Prettier"],
            stepByStep: true,
            aiSupport: "CodeHugger vous guide dans chaque étape de configuration et résout les problèmes techniques"
          }
        },
        { 
          id: "4-3", 
          title: "JSX en profondeur", 
          type: "theory", 
          duration: "45 min", 
          xpReward: 25, 
          completed: false, 
          description: "Maîtriser la syntaxe JSX et comprendre sa transformation en JavaScript",
          content: {
            interactiveExamples: 8,
            babelVisualization: true,
            exercises: 5,
            aiSupport: "ComponentPro explique les subtilités de JSX et aide à comprendre le processus de transpilation"
          }
        },
        { 
          id: "4-4", 
          title: "Composants fonctionnels vs classes", 
          type: "theory", 
          duration: "40 min", 
          xpReward: 20, 
          completed: false, 
          description: "Comprendre les différents types de composants et quand utiliser chacun",
          content: {
            comparison: true,
            migrationGuide: true,
            exercises: 4,
            aiSupport: "ComponentPro explique les avantages des composants fonctionnels et la migration depuis les classes"
          }
        },
        { 
          id: "4-5", 
          title: "Props et communication entre composants", 
          type: "exercise", 
          duration: "50 min", 
          xpReward: 30, 
          completed: false, 
          description: "Passer et valider des données entre composants parents et enfants",
          content: {
            challenges: 6,
            propTypesDemo: true,
            dataFlow: true,
            aiSupport: "CodeHugger analyse votre utilisation des props et suggère des améliorations"
          }
        },
        { 
          id: "4-6", 
          title: "État local avec useState", 
          type: "exercise", 
          duration: "55 min", 
          xpReward: 30, 
          completed: false, 
          description: "Gérer l'état des composants et les re-rendus efficacement",
          content: {
            interactiveDemo: true,
            challenges: 8,
            stateVisualizer: true,
            aiSupport: "ComponentPro explique les pièges courants de la gestion d'état et propose des solutions"
          }
        },
        { 
          id: "4-7", 
          title: "Effets et cycle de vie avec useEffect", 
          type: "theory", 
          duration: "60 min", 
          xpReward: 35, 
          completed: false, 
          description: "Comprendre les effets secondaires et le cycle de vie des composants",
          content: {
            examples: 10,
            lifecycleComparison: true,
            exercises: 6,
            aiSupport: "ComponentPro explique les différents cas d'utilisation de useEffect et aide à éviter les boucles infinies"
          }
        },
        { 
          id: "4-8", 
          title: "Rendu conditionnel et listes optimisées", 
          type: "exercise", 
          duration: "45 min", 
          xpReward: 25, 
          completed: false, 
          description: "Afficher du contenu de manière conditionnelle et rendre des listes efficacement",
          content: {
            patterns: ["&&", "? :", "switch", "map", "filter"],
            keyExplanation: true,
            performanceAnalysis: true,
            aiSupport: "CodeHugger analyse vos rendus conditionnels et suggère des optimisations"
          }
        },
        { 
          id: "4-9", 
          title: "Gestion avancée des événements React", 
          type: "exercise", 
          duration: "40 min", 
          xpReward: 25, 
          completed: false, 
          description: "Maîtriser la gestion des événements et les interactions utilisateur complexes",
          content: {
            syntheticEvents: true,
            eventDelegation: true,
            challenges: 5,
            aiSupport: "ComponentPro explique les différences entre les événements natifs et synthétiques"
          }
        },
        { 
          id: "4-10", 
          title: "Formulaires et inputs contrôlés", 
          type: "exercise", 
          duration: "55 min", 
          xpReward: 30, 
          completed: false, 
          description: "Implémenter des formulaires robustes et accessibles en React",
          content: {
            patterns: ["controlled", "uncontrolled", "validation"],
            exercises: 7,
            accessibilityChecks: true,
            aiSupport: "CodeHugger analyse l'accessibilité de vos formulaires et suggère des améliorations"
          }
        },
        { 
          id: "4-11", 
          title: "Hooks personnalisés : création et utilisation", 
          type: "theory", 
          duration: "50 min", 
          xpReward: 30, 
          completed: false, 
          description: "Créer vos propres hooks pour réutiliser la logique entre composants",
          content: {
            commonPatterns: ["useFetch", "useLocalStorage", "useForm", "useMediaQuery"],
            exercises: 5,
            aiSupport: "ComponentPro analyse vos hooks personnalisés et propose des améliorations"
          }
        },
        { 
          id: "4-12", 
          title: "Context API : partage d'état entre composants", 
          type: "exercise", 
          duration: "60 min", 
          xpReward: 35, 
          completed: false, 
          description: "Utiliser le Context API pour éviter le prop drilling et partager l'état",
          content: {
            visualization: true,
            challenges: 6,
            comparisons: ["Redux", "Props"],
            aiSupport: "ComponentPro explique quand utiliser Context vs d'autres solutions de gestion d'état"
          }
        },
        { 
          id: "4-13", 
          title: "Optimisation des performances React", 
          type: "theory", 
          duration: "45 min", 
          xpReward: 25, 
          completed: false, 
          description: "Techniques pour améliorer les performances de vos applications React",
          content: {
            memoization: ["React.memo", "useMemo", "useCallback"],
            profiling: true,
            exercises: 4,
            aiSupport: "CodeHugger analyse les performances de votre code et propose des optimisations"
          }
        },
        { 
          id: "4-14", 
          title: "Structuration d'un projet React", 
          type: "theory", 
          duration: "40 min", 
          xpReward: 20, 
          completed: false, 
          description: "Meilleures pratiques pour organiser et structurer un projet React scalable",
          content: {
            architectures: ["Feature-based", "Atomic Design", "Container/Presentational"],
            examples: 5,
            aiSupport: "ComponentPro explique les avantages et inconvénients de chaque architecture"
          }
        },
        { 
          id: "4-15", 
          title: "Routing avec React Router", 
          type: "exercise", 
          duration: "55 min", 
          xpReward: 30, 
          completed: false, 
          description: "Implémenter la navigation et les routes dans une application React",
          content: {
            features: ["Routes", "Params", "Nesting", "Guards", "Lazy loading"],
            challenges: 7,
            aiSupport: "CodeHugger vous aide à déboguer les problèmes de routage et optimiser la structure"
          }
        },
        { 
          id: "4-16", 
          title: "Projet : Application de gestion de contacts", 
          type: "project", 
          duration: "150 min", 
          xpReward: 80, 
          completed: false, 
          description: "Créer une application React complète mettant en pratique tous les concepts appris",
          content: {
            features: ["CRUD", "Routing", "Form validation", "Context", "Custom hooks", "Performance optimization"],
            stages: 8,
            codeReviews: true,
            aiSupport: "ComponentPro et CodeHugger vous accompagnent tout au long du développement avec des code reviews et des conseils personnalisés"
          }
        }
      ]
    },
    {
      id: "5",
      title: "React Avancé",
      description: "Techniques avancées de React nécessaires pour maîtriser Next.js",
      level: "Intermédiaire",
      image: "/images/modules/react-advanced.jpg",
      progressPercent: 0,
      duration: "10 heures",
      category: "react",
      prerequisites: ["4"],
      outcomes: ["Maîtriser les hooks avancés", "Implémenter des patterns de gestion d'état complexes", "Optimiser les performances des applications React", "Construire des composants réutilisables"],
      aiSupport: {
        primaryMentor: "react-mentor",
        supportMentor: "huggingface-assistant",
        features: [
          "Sessions de code review personnalisées par ComponentPro",
          "Analyse des performances et recommandations d'optimisation par CodeHugger",
          "Assistance avancée pour la résolution de problèmes complexes",
          "Suggestions de patterns et d'architectures basées sur votre code"
        ]
      },
      lessons: [
        { 
          id: "5-1", 
          title: "Hooks avancés : useReducer, useCallback, useMemo", 
          type: "theory", 
          duration: "50 min", 
          xpReward: 30, 
          completed: false, 
          description: "Maîtriser les hooks avancés pour des cas d'utilisation complexes",
          content: {
            interactiveDemos: true,
            comparisons: true,
            exercises: 7,
            aiSupport: "ComponentPro propose des exemples personnalisés adaptés à votre niveau de compréhension"
          }
        },
        { 
          id: "5-2", 
          title: "Débogage avancé et DevTools React", 
          type: "exercise", 
          duration: "45 min", 
          xpReward: 25, 
          completed: false, 
          description: "Utiliser efficacement les outils de développement pour résoudre des problèmes complexes",
          content: {
            tools: ["React DevTools", "Profiler", "Bugfixes challenges"],
            scenarios: 5,
            aiSupport: "CodeHugger analyse les traces d'erreur et propose des solutions"
          }
        },
        { 
          id: "5-3", 
          title: "Gestion avancée de l'état : Context API et Reducers", 
          type: "exercise", 
          duration: "60 min", 
          xpReward: 35, 
          completed: false, 
          description: "Implémenter un système de gestion d'état complet avec Context et useReducer",
          content: {
            architectureDemo: true,
            challenges: 6,
            aiSupport: "ComponentPro vous guide dans la conception d'une architecture d'état robuste"
          }
        },
        { 
          id: "5-4", 
          title: "Performance et optimisation des rendus", 
          type: "theory", 
          duration: "55 min", 
          xpReward: 30, 
          completed: false, 
          description: "Techniques avancées pour éviter les rendus inutiles et optimiser les performances",
          content: {
            profiling: true,
            benchmarks: true,
            optimizationTechniques: ["Memoization", "Lazy loading", "Virtualization"],
            aiSupport: "CodeHugger analyse vos composants et identifie les goulets d'étranglement"
          }
        },
        { 
          id: "5-5", 
          title: "Refs avancés et manipulation imperative", 
          type: "exercise", 
          duration: "45 min", 
          xpReward: 25, 
          completed: false, 
          description: "Utiliser les refs pour accéder au DOM et aux instances de composants",
          content: {
            useCases: ["Animation", "Focus management", "Third-party libraries"],
            exercises: 5,
            aiSupport: "ComponentPro explique quand utiliser l'approche impérative vs déclarative"
          }
        },
        { 
          id: "5-6", 
          title: "Fragments, Portails et composants d'ordre supérieur", 
          type: "theory", 
          duration: "50 min", 
          xpReward: 30, 
          completed: false, 
          description: "Techniques avancées de composition et de rendu en React",
          content: {
            demos: true,
            patterns: ["HOC", "Render props", "Compound components"],
            aiSupport: "ComponentPro vous aide à choisir le pattern adapté à votre cas d'usage"
          }
        },
        { 
          id: "5-7", 
          title: "Hooks personnalisés avancés", 
          type: "exercise", 
          duration: "60 min", 
          xpReward: 35, 
          completed: false, 
          description: "Créer des hooks complexes et réutilisables pour des fonctionnalités avancées",
          content: {
            examples: ["useIntersectionObserver", "useDebounce", "useDrag", "useWebSocket"],
            challenges: 4,
            aiSupport: "CodeHugger analyse vos hooks personnalisés et suggère des améliorations"
          }
        },
        { 
          id: "5-8", 
          title: "Tests avancés avec React Testing Library", 
          type: "exercise", 
          duration: "55 min", 
          xpReward: 30, 
          completed: false, 
          description: "Implémenter des tests robustes pour vos composants et hooks",
          content: {
            testingStrategies: ["Component tests", "Hook tests", "Integration tests"],
            challenges: 5,
            aiSupport: "ComponentPro vous aide à écrire des tests complets et fiables"
          }
        },
        { 
          id: "5-9", 
          title: "Sécurité et bonnes pratiques en React", 
          type: "theory", 
          duration: "40 min", 
          xpReward: 20, 
          completed: false, 
          description: "Éviter les failles de sécurité et suivre les meilleures pratiques de développement",
          content: {
            securityIssues: ["XSS", "CSRF", "Injection"],
            bestPractices: true,
            aiSupport: "ComponentPro analyse votre code pour identifier les risques potentiels"
          }
        },
        { 
          id: "5-10", 
          title: "Suspense et modes concurrents", 
          type: "theory", 
          duration: "45 min", 
          xpReward: 25, 
          completed: false, 
          description: "Explorer les fonctionnalités expérimentales et futures de React",
          content: {
            demos: true,
            futureFeatures: true,
            aiSupport: "ComponentPro explique l'impact de ces fonctionnalités sur le développement futur"
          }
        },
        { 
          id: "5-11", 
          title: "Animation et transitions en React", 
          type: "exercise", 
          duration: "50 min", 
          xpReward: 30, 
          completed: false, 
          description: "Implémenter des animations fluides et des transitions en React",
          content: {
            libraries: ["React Spring", "Framer Motion", "CSS Transitions"],
            examples: 6,
            aiSupport: "CodeHugger vous aide à déboguer les animations complexes"
          }
        },
        { 
          id: "5-12", 
          title: "Projet : Application de tableau de bord avancé", 
          type: "project", 
          duration: "120 min", 
          xpReward: 70, 
          completed: false, 
          description: "Créer un tableau de bord complexe mettant en pratique les techniques avancées",
          content: {
            features: ["Data visualization", "Complex state", "Performance optimization", "Custom hooks", "Tests"],
            stages: 6,
            aiSupport: "ComponentPro et CodeHugger vous accompagnent tout au long du développement avec des code reviews et des suggestions d'amélioration"
          }
        }
      ]
    },
    {
      id: "6",
      title: "Introduction à Next.js",
      description: "Découvrez les bases de Next.js et comment il améliore le développement React",
      level: "Intermédiaire",
      image: "/images/modules/nextjs-intro.jpg",
      progressPercent: 0,
      duration: "5 heures",
      category: "nextjs",
      prerequisites: ["5"],
      outcomes: ["Comprendre ce qu'est Next.js", "Configurer un projet Next.js", "Créer des pages simples", "Intégrer React et Next.js"],
      aiSupport: {
        primaryMentor: "nextjs-mentor",
        supportMentor: "huggingface-assistant",
        features: [
          "Accompagnement personnalisé par ServerSideWizard",
          "Guide d'installation et de configuration par CodeHugger",
          "Explications comparées entre React et Next.js",
          "Exemples interactifs adaptés à votre niveau"
        ]
      },
      lessons: [
        { 
          id: "6-1", 
          title: "Qu'est-ce que Next.js et pourquoi l'utiliser?", 
          type: "theory", 
          duration: "35 min", 
          xpReward: 20, 
          completed: false, 
          description: "Introduction, historique et avantages de Next.js par rapport à React",
          content: {
            videoUrl: "/videos/nextjs-intro.mp4",
            comparison: ["React", "Gatsby", "Next.js"],
            usesCases: ["E-commerce", "Blog", "Applications d'entreprise"],
            aiSupport: "ServerSideWizard explique les avantages du SSR et quand utiliser Next.js"
          }
        },
        { 
          id: "6-2", 
          title: "Configuration de l'environnement Next.js", 
          type: "exercise", 
          duration: "40 min", 
          xpReward: 25, 
          completed: false, 
          description: "Installer et configurer un projet Next.js avec les meilleures pratiques",
          content: {
            setupOptions: ["create-next-app", "Manual setup", "Templates"],
            troubleshooting: true,
            aiSupport: "CodeHugger vous aide à résoudre les problèmes d'installation et de configuration"
          }
        },
        { 
          id: "6-3", 
          title: "Structure et architecture d'un projet Next.js", 
          type: "theory", 
          duration: "35 min", 
          xpReward: 20, 
          completed: false, 
          description: "Comprendre l'organisation des fichiers et la structure recommandée",
          content: {
            fileExplorer: true,
            conventions: true,
            bestPractices: true,
            aiSupport: "ServerSideWizard explique la logique derrière l'organisation des fichiers dans Next.js"
          }
        },
        { 
          id: "6-4", 
          title: "Pages et routage basé sur les fichiers", 
          type: "exercise", 
          duration: "45 min", 
          xpReward: 25, 
          completed: false, 
          description: "Créer des pages et comprendre le système de routage intuitif de Next.js",
          content: {
            interactiveDemo: true,
            exercises: 5,
            aiSupport: "ServerSideWizard vous aide à comprendre la différence entre le routage Next.js et React Router"
          }
        },
        { 
          id: "6-5", 
          title: "Navigation et liens entre pages", 
          type: "exercise", 
          duration: "40 min", 
          xpReward: 25, 
          completed: false, 
          description: "Utiliser le composant Link et implémenter une navigation fluide",
          content: {
            examples: ["Navigation basique", "Navigation programmatique", "Pré-chargement"],
            exercises: 4,
            aiSupport: "CodeHugger analyse votre implémentation de navigation et suggère des améliorations"
          }
        },
        { 
          id: "6-6", 
          title: "Styles et CSS dans Next.js", 
          type: "theory", 
          duration: "40 min", 
          xpReward: 20, 
          completed: false, 
          description: "Explorer les différentes méthodes de stylisation dans Next.js",
          content: {
            approaches: ["CSS Modules", "Styled-jsx", "Global CSS", "CSS-in-JS", "Tailwind CSS"],
            comparison: true,
            aiSupport: "ServerSideWizard explique les avantages de chaque approche et quand les utiliser"
          }
        },
        { 
          id: "6-7", 
          title: "Assets statiques et optimisation des images", 
          type: "exercise", 
          duration: "35 min", 
          xpReward: 20, 
          completed: false, 
          description: "Gérer les fichiers statiques et utiliser le composant Image optimisé",
          content: {
            demos: true,
            exercises: 3,
            aiSupport: "CodeHugger vous montre comment optimiser les performances avec le composant Image"
          }
        },
        { 
          id: "6-8", 
          title: "Projet : Site vitrine personnel avec Next.js", 
          type: "project", 
          duration: "90 min", 
          xpReward: 50, 
          completed: false, 
          description: "Créer un site portfolio avec plusieurs pages, navigation et styles",
          content: {
            features: ["Pages multiples", "Navigation", "Optimisation d'images", "Styles"],
            stages: 5,
            aiSupport: "ServerSideWizard et CodeHugger vous guident tout au long du développement avec des suggestions personnalisées"
          }
        }
      ]
    },
    {
      id: "7",
      title: "Fondamentaux de Next.js",
      description: "Maîtrisez les concepts clés de Next.js pour construire des applications web modernes",
      level: "Intermédiaire",
      image: "/images/modules/nextjs-fundamentals.jpg",
      progressPercent: 0,
      duration: "8 heures",
      category: "nextjs",
      prerequisites: ["6"],
      outcomes: ["Maîtriser le système de routage", "Comprendre le rendu côté serveur", "Implémenter la récupération de données"],
      lessons: [
        { id: "7-1", title: "App Router vs Pages Router", type: "theory", duration: "30 min", xpReward: 15, completed: false, description: "Comprendre les deux systèmes de routage de Next.js" },
        { id: "7-2", title: "Routage dynamique", type: "exercise", duration: "40 min", xpReward: 25, completed: false, description: "Créer des routes dynamiques avec paramètres" },
        { id: "7-3", title: "Composants Layout", type: "theory", duration: "30 min", xpReward: 15, completed: false, description: "Créer des layouts réutilisables" },
        { id: "7-4", title: "Server Components vs Client Components", type: "theory", duration: "45 min", xpReward: 25, completed: false, description: "Comprendre la différence et savoir quand utiliser chacun" },
        { id: "7-5", title: "Data Fetching dans Next.js", type: "exercise", duration: "50 min", xpReward: 30, completed: false, description: "getStaticProps, getServerSideProps, et SWR" },
        { id: "7-6", title: "API Routes", type: "exercise", duration: "40 min", xpReward: 25, completed: false, description: "Créer des API endpoints dans Next.js" },
        { id: "7-7", title: "Optimisation des images", type: "theory", duration: "25 min", xpReward: 15, completed: false, description: "Utiliser le composant Image de Next.js" },
        { id: "7-8", title: "Gestion des métadonnées", type: "exercise", duration: "30 min", xpReward: 20, completed: false, description: "SEO et balises meta avec Next.js" },
        { id: "7-9", title: "Projet : Blog avec Next.js", type: "project", duration: "100 min", xpReward: 60, completed: false, description: "Créer un blog complet avec pages statiques et dynamiques" }
      ]
    },
    {
      id: "8",
      title: "Next.js Avancé",
      description: "Techniques avancées pour tirer le meilleur parti de Next.js dans des applications professionnelles",
      level: "Avancé",
      image: "/images/modules/nextjs-advanced.jpg",
      progressPercent: 0,
      duration: "9 heures",
      category: "nextjs",
      prerequisites: ["7"],
      outcomes: ["Maîtriser les fonctionnalités avancées", "Optimiser les performances", "Déployer des applications Next.js"],
      lessons: [
        { id: "8-1", title: "Middleware dans Next.js", type: "theory", duration: "35 min", xpReward: 20, completed: false, description: "Créer et utiliser des middlewares" },
        { id: "8-2", title: "Authentification avec Next.js", type: "exercise", duration: "60 min", xpReward: 35, completed: false, description: "Implémenter l'authentification avec NextAuth.js" },
        { id: "8-3", title: "Internationalisation (i18n)", type: "exercise", duration: "45 min", xpReward: 25, completed: false, description: "Créer des applications multilingues" },
        { id: "8-4", title: "Next.js avec bases de données", type: "exercise", duration: "55 min", xpReward: 30, completed: false, description: "Intégrer Prisma, MongoDB ou autres" },
        { id: "8-5", title: "Testing dans Next.js", type: "theory", duration: "40 min", xpReward: 25, completed: false, description: "Tests unitaires et d'intégration" },
        { id: "8-6", title: "Performance et optimisation", type: "theory", duration: "45 min", xpReward: 25, completed: false, description: "Techniques pour améliorer les performances" },
        { id: "8-7", title: "Déploiement sur Vercel", type: "exercise", duration: "30 min", xpReward: 20, completed: false, description: "Déployer une application Next.js sur Vercel" },
        { id: "8-8", title: "Déploiement sur d'autres plateformes", type: "theory", duration: "35 min", xpReward: 20, completed: false, description: "Options de déploiement alternatives" },
        { id: "8-9", title: "Projet : E-commerce avec Next.js", type: "project", duration: "120 min", xpReward: 70, completed: false, description: "Créer une boutique en ligne complète" }
      ]
    },
    {
      id: "9",
      title: "Next.js et Typescript",
      description: "Ajoutez le typage statique à vos applications Next.js pour une meilleure fiabilité et maintenabilité",
      level: "Intermédiaire",
      image: "/images/modules/typescript-nextjs.jpg",
      progressPercent: 0,
      duration: "6 heures",
      category: "specialization",
      prerequisites: ["7"],
      outcomes: ["Maîtriser TypeScript avec Next.js", "Typer correctement les composants et les API", "Configurer un projet Next.js avec TypeScript"],
      lessons: [
        { id: "9-1", title: "Introduction à TypeScript", type: "theory", duration: "35 min", xpReward: 20, completed: false, description: "Comprendre les bases de TypeScript" },
        { id: "9-2", title: "Configuration de Next.js avec TypeScript", type: "exercise", duration: "25 min", xpReward: 15, completed: false, description: "Configurer un projet Next.js avec TypeScript" },
        { id: "9-3", title: "Types pour les composants React", type: "exercise", duration: "40 min", xpReward: 25, completed: false, description: "Typer correctement vos composants React" },
        { id: "9-4", title: "Types pour les pages et les API routes", type: "exercise", duration: "45 min", xpReward: 25, completed: false, description: "Typer les pages et les API routes de Next.js" },
        { id: "9-5", title: "GetStaticProps et GetServerSideProps typés", type: "theory", duration: "40 min", xpReward: 25, completed: false, description: "Typer correctement les fonctions de récupération de données" },
        { id: "9-6", title: "Utility Types avancés", type: "theory", duration: "35 min", xpReward: 20, completed: false, description: "Utiliser les utility types pour des cas complexes" },
        { id: "9-7", title: "Projet : Migration d'un projet Next.js vers TypeScript", type: "project", duration: "80 min", xpReward: 45, completed: false, description: "Convertir une application Next.js existante en TypeScript" }
      ]
    },
    {
      id: "10",
      title: "State Management avec Next.js",
      description: "Techniques avancées de gestion d'état dans les applications Next.js",
      level: "Avancé",
      image: "/images/modules/state-management.jpg",
      progressPercent: 0,
      duration: "7 heures",
      category: "specialization",
      prerequisites: ["5", "8"],
      outcomes: ["Maîtriser différentes solutions de gestion d'état", "Implémenter Redux avec Next.js", "Utiliser des solutions modernes comme Zustand ou Jotai"],
      lessons: [
        { id: "10-1", title: "Introduction à la gestion d'état", type: "theory", duration: "30 min", xpReward: 15, completed: false, description: "Comprendre les défis de la gestion d'état" },
        { id: "10-2", title: "Context API pour des cas simples", type: "exercise", duration: "40 min", xpReward: 25, completed: false, description: "Utiliser Context API avec React/Next.js" },
        { id: "10-3", title: "Introduction à Redux", type: "theory", duration: "45 min", xpReward: 25, completed: false, description: "Comprendre les concepts fondamentaux de Redux" },
        { id: "10-4", title: "Redux avec Next.js", type: "exercise", duration: "60 min", xpReward: 35, completed: false, description: "Intégrer Redux dans une application Next.js" },
        { id: "10-5", title: "RTK Query et les API", type: "exercise", duration: "50 min", xpReward: 30, completed: false, description: "Gérer les appels API avec RTK Query" },
        { id: "10-6", title: "Zustand et alternatives modernes", type: "theory", duration: "35 min", xpReward: 20, completed: false, description: "Découvrir des solutions de gestion d'état plus légères" },
        { id: "10-7", title: "Projet : Dashboard avec gestion d'état avancée", type: "project", duration: "90 min", xpReward: 50, completed: false, description: "Créer un dashboard avec gestion d'état complexe" }
      ]
    },
    {
      id: "11",
      title: "Styling avancé dans Next.js",
      description: "Maîtrisez les différentes approches de styling dans Next.js pour créer des interfaces attrayantes",
      level: "Intermédiaire",
      image: "/images/modules/nextjs-styling.jpg",
      progressPercent: 0,
      duration: "6 heures",
      category: "specialization",
      prerequisites: ["7"],
      outcomes: ["Maîtriser Tailwind CSS avec Next.js", "Utiliser CSS Modules et Styled Components", "Implémenter des animations et transitions"],
      lessons: [
        { id: "11-1", title: "CSS Modules dans Next.js", type: "exercise", duration: "35 min", xpReward: 20, completed: false, description: "Utiliser les CSS Modules pour un styling scopé" },
        { id: "11-2", title: "Styled Components et Emotion", type: "exercise", duration: "40 min", xpReward: 25, completed: false, description: "CSS-in-JS avec Next.js" },
        { id: "11-3", title: "Tailwind CSS avec Next.js", type: "exercise", duration: "45 min", xpReward: 25, completed: false, description: "Configuration et utilisation de Tailwind CSS" },
        { id: "11-4", title: "Thèmes et mode sombre", type: "exercise", duration: "40 min", xpReward: 25, completed: false, description: "Implémenter un système de thème avec mode sombre" },
        { id: "11-5", title: "Animations et transitions", type: "theory", duration: "35 min", xpReward: 20, completed: false, description: "Créer des animations fluides avec CSS et Framer Motion" },
        { id: "11-6", title: "Responsive Design avancé", type: "exercise", duration: "40 min", xpReward: 25, completed: false, description: "Techniques avancées de responsive design" },
        { id: "11-7", title: "Projet : Interface utilisateur sophistiquée", type: "project", duration: "80 min", xpReward: 45, completed: false, description: "Créer une interface utilisateur moderne avec animations" }
      ]
    },
    {
      id: "12",
      title: "Testing dans Next.js",
      description: "Apprenez à tester efficacement vos applications Next.js pour garantir leur qualité",
      level: "Avancé",
      image: "/images/modules/nextjs-testing.jpg",
      progressPercent: 0,
      duration: "7 heures",
      category: "specialization",
      prerequisites: ["8"],
      outcomes: ["Mettre en place des tests unitaires", "Implémenter des tests d'intégration", "Configurer des tests end-to-end"],
      lessons: [
        { id: "12-1", title: "Introduction au testing", type: "theory", duration: "30 min", xpReward: 15, completed: false, description: "Comprendre les différents types de tests" },
        { id: "12-2", title: "Tests unitaires avec Jest", type: "exercise", duration: "45 min", xpReward: 25, completed: false, description: "Configurer et écrire des tests unitaires" },
        { id: "12-3", title: "Tests de composants avec React Testing Library", type: "exercise", duration: "50 min", xpReward: 30, completed: false, description: "Tester vos composants React" },
        { id: "12-4", title: "Tests d'intégration dans Next.js", type: "theory", duration: "40 min", xpReward: 25, completed: false, description: "Tester l'interaction entre composants" },
        { id: "12-5", title: "Tests des API Routes", type: "exercise", duration: "45 min", xpReward: 25, completed: false, description: "Tester vos API routes Next.js" },
        { id: "12-6", title: "Tests end-to-end avec Cypress", type: "exercise", duration: "60 min", xpReward: 35, completed: false, description: "Configurer et écrire des tests end-to-end" },
        { id: "12-7", title: "Intégration continue (CI)", type: "theory", duration: "35 min", xpReward: 20, completed: false, description: "Configurer GitHub Actions pour les tests automatisés" },
        { id: "12-8", title: "Projet : Application testée de bout en bout", type: "project", duration: "90 min", xpReward: 50, completed: false, description: "Créer une application avec une couverture de test complète" }
      ]
    },
    {
      id: "13",
      title: "Next.js et CMS Headless",
      description: "Intégrez Next.js avec des CMS Headless pour des sites web dynamiques et faciles à gérer",
      level: "Intermédiaire",
      image: "/images/modules/nextjs-cms.jpg",
      progressPercent: 0,
      duration: "6 heures",
      category: "specialization",
      prerequisites: ["7"],
      outcomes: ["Comprendre l'architecture Headless CMS", "Intégrer Strapi ou Contentful avec Next.js", "Créer un blog ou un site e-commerce avec CMS"],
      lessons: [
        { id: "13-1", title: "Introduction aux CMS Headless", type: "theory", duration: "30 min", xpReward: 15, completed: false, description: "Comprendre le concept et les avantages" },
        { id: "13-2", title: "Contentful avec Next.js", type: "exercise", duration: "50 min", xpReward: 30, completed: false, description: "Intégrer Contentful dans votre application" },
        { id: "13-3", title: "Strapi avec Next.js", type: "exercise", duration: "50 min", xpReward: 30, completed: false, description: "Configurer et utiliser Strapi comme backend" },
        { id: "13-4", title: "Génération statique avec CMS", type: "theory", duration: "35 min", xpReward: 20, completed: false, description: "Optimiser la génération de pages avec ISR" },
        { id: "13-5", title: "Gestion de contenu multilingue", type: "exercise", duration: "45 min", xpReward: 25, completed: false, description: "Créer un site multilingue avec CMS" },
        { id: "13-6", title: "Projet : Blog avec CMS Headless", type: "project", duration: "80 min", xpReward: 45, completed: false, description: "Créer un blog complet alimenté par un CMS Headless" }
      ]
    },
    {
      id: "14",
      title: "Performance et SEO dans Next.js",
      description: "Optimisez vos applications Next.js pour les performances et le référencement",
      level: "Avancé",
      image: "/images/modules/nextjs-performance.jpg",
      progressPercent: 0,
      duration: "7 heures",
      category: "specialization",
      prerequisites: ["8"],
      outcomes: ["Optimiser les performances de Core Web Vitals", "Améliorer le SEO", "Implémenter des techniques avancées d'optimisation"],
      lessons: [
        { id: "14-1", title: "Web Vitals et mesures de performance", type: "theory", duration: "35 min", xpReward: 20, completed: false, description: "Comprendre les métriques clés de performance" },
        { id: "14-2", title: "Optimisation des images", type: "exercise", duration: "40 min", xpReward: 25, completed: false, description: "Techniques avancées d'optimisation d'images" },
        { id: "14-3", title: "SEO technique avec Next.js", type: "exercise", duration: "45 min", xpReward: 25, completed: false, description: "Métadonnées, sitemaps et robots.txt" },
        { id: "14-4", title: "Lazy loading et code splitting", type: "theory", duration: "35 min", xpReward: 20, completed: false, description: "Optimiser le chargement du JavaScript" },
        { id: "14-5", title: "Next.js Analytics et monitoring", type: "exercise", duration: "40 min", xpReward: 25, completed: false, description: "Suivre les performances de votre application" },
        { id: "14-6", title: "Optimisation pour les moteurs de recherche", type: "theory", duration: "35 min", xpReward: 20, completed: false, description: "Stratégies avancées de SEO" },
        { id: "14-7", title: "Structured Data et Schema.org", type: "exercise", duration: "40 min", xpReward: 25, completed: false, description: "Améliorer la visibilité dans les résultats de recherche" },
        { id: "14-8", title: "Projet : Optimisation d'un site existant", type: "project", duration: "90 min", xpReward: 50, completed: false, description: "Améliorer les performances et le SEO d'un site Next.js" }
      ]
    },
    {
      id: "15",
      title: "Déploiement et DevOps pour Next.js",
      description: "Maîtrisez le déploiement et les pratiques DevOps pour vos applications Next.js",
      level: "Avancé",
      image: "/images/modules/nextjs-devops.jpg",
      progressPercent: 0,
      duration: "8 heures",
      category: "career",
      prerequisites: ["8"],
      outcomes: ["Maîtriser les déploiements sur différentes plateformes", "Configurer des pipelines CI/CD", "Gérer les environnements de production"],
      lessons: [
        { id: "15-1", title: "Déploiement sur Vercel (avancé)", type: "exercise", duration: "40 min", xpReward: 25, completed: false, description: "Fonctionnalités avancées de déploiement Vercel" },
        { id: "15-2", title: "Déploiement sur AWS", type: "exercise", duration: "50 min", xpReward: 30, completed: false, description: "Déployer Next.js sur Amazon Web Services" },
        { id: "15-3", title: "Containerisation avec Docker", type: "exercise", duration: "45 min", xpReward: 25, completed: false, description: "Créer des conteneurs pour vos applications Next.js" },
        { id: "15-4", title: "CI/CD avec GitHub Actions", type: "exercise", duration: "50 min", xpReward: 30, completed: false, description: "Automatiser les déploiements" },
        { id: "15-5", title: "Gestion des environnements", type: "theory", duration: "35 min", xpReward: 20, completed: false, description: "Dev, staging et production" },
        { id: "15-6", title: "Monitoring et logging", type: "theory", duration: "40 min", xpReward: 25, completed: false, description: "Surveiller vos applications en production" },
        { id: "15-7", title: "Sécurité dans Next.js", type: "theory", duration: "45 min", xpReward: 25, completed: false, description: "Meilleures pratiques de sécurité" },
        { id: "15-8", title: "Projet : Pipeline de déploiement complet", type: "project", duration: "100 min", xpReward: 60, completed: false, description: "Mettre en place un flux de déploiement automatisé" }
      ]
    },
    {
      id: "16",
      title: "Projet professionnel avec Next.js",
      description: "Appliquez toutes vos compétences pour créer un projet complet de niveau professionnel",
      level: "Avancé",
      image: "/images/modules/nextjs-project.jpg",
      progressPercent: 0,
      duration: "15 heures",
      category: "career",
      prerequisites: ["8", "10", "12", "14", "15"],
      outcomes: ["Concevoir et développer une application complète", "Appliquer les meilleures pratiques", "Créer un portfolio professionnel"],
      lessons: [
        { id: "16-1", title: "Conception et planification", type: "theory", duration: "60 min", xpReward: 35, completed: false, description: "Définir les exigences et l'architecture" },
        { id: "16-2", title: "Mise en place de l'infrastructure", type: "exercise", duration: "90 min", xpReward: 50, completed: false, description: "Configurer le projet avec toutes les dépendances" },
        { id: "16-3", title: "Développement des fonctionnalités principales", type: "exercise", duration: "180 min", xpReward: 100, completed: false, description: "Construire les fonctionnalités clés" },
        { id: "16-4", title: "Intégration d'API et backend", type: "exercise", duration: "120 min", xpReward: 70, completed: false, description: "Connecter l'application à des services externes" },
        { id: "16-5", title: "UI/UX et design responsive", type: "exercise", duration: "90 min", xpReward: 50, completed: false, description: "Créer une interface utilisateur attrayante" },
        { id: "16-6", title: "Tests et assurance qualité", type: "exercise", duration: "100 min", xpReward: 60, completed: false, description: "Mettre en place une suite de tests complète" },
        { id: "16-7", title: "Optimisation des performances", type: "exercise", duration: "80 min", xpReward: 45, completed: false, description: "Optimiser l'application pour la vitesse" },
        { id: "16-8", title: "Déploiement en production", type: "exercise", duration: "60 min", xpReward: 35, completed: false, description: "Déployer l'application en production" },
        { id: "16-9", title: "Présentation et documentation", type: "project", duration: "120 min", xpReward: 70, completed: false, description: "Préparer une présentation professionnelle du projet" }
      ]
    }
  ];

  // Inclure les assistants IA dans la réponse
  const responseData = {
    modules: modulesData,
    aiAssistants: aiAssistants
  };

  return new Response(JSON.stringify(responseData), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}