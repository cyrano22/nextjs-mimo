
export async function GET() {
  // Données des modules (dans une application réelle, ces données viendraient d'une base de données)
  const modulesData = [
    {
      id: "1",
      title: "Introduction à Next.js",
      description: "Découvrez les bases de Next.js, ses avantages par rapport à React et comment configurer votre premier projet.",
      level: "Débutant",
      image: "/images/modules/nextjs-intro.jpg",
      progressPercent: 0,
      lessons: 3,
      duration: "2 heures",
      content: [
        { id: "1-1", title: "Qu'est-ce que Next.js", type: "theory", duration: "15 min", xpReward: 10, completed: false },
        { id: "1-2", title: "Avantages de Next.js", type: "theory", duration: "10 min", xpReward: 10, completed: false },
        { id: "1-3", title: "Installation et Configuration", type: "exercise", duration: "20 min", xpReward: 15, completed: false }
      ]
    },
    {
      id: "2",
      title: "Fondamentaux de Next.js",
      description: "Maîtrisez le routage, les pages et la récupération de données dans Next.js.",
      level: "Intermédiaire",
      image: "/images/modules/nextjs-fundamentals.jpg",
      progressPercent: 0,
      lessons: 4,
      duration: "3 heures",
      content: [
        { id: "2-1", title: "Structure des Fichiers", type: "theory", duration: "15 min", xpReward: 10, completed: false },
        { id: "2-2", title: "Système de Routage", type: "theory", duration: "20 min", xpReward: 15, completed: false },
        { id: "2-3", title: "Pages et Composants", type: "exercise", duration: "25 min", xpReward: 20, completed: false },
        { id: "2-4", title: "Data Fetching", type: "project", duration: "30 min", xpReward: 25, completed: false }
      ]
    },
    {
      id: "3",
      title: "JavaScript Fondamentaux",
      description: "Maîtrisez les bases de JavaScript, le langage essentiel pour le développement web moderne.",
      level: "Débutant",
      image: "/images/modules/javascript-basics.jpg",
      progressPercent: 0,
      lessons: 5,
      duration: "4 heures",
      content: [
        { id: "3-1", title: "Variables et Types", type: "theory", duration: "20 min", xpReward: 10, completed: false },
        { id: "3-2", title: "Fonctions", type: "theory", duration: "25 min", xpReward: 15, completed: false },
        { id: "3-3", title: "Objets et tableaux", type: "exercise", duration: "30 min", xpReward: 20, completed: false },
        { id: "3-4", title: "Événements et DOM", type: "exercise", duration: "30 min", xpReward: 20, completed: false },
        { id: "3-5", title: "Projet final", type: "project", duration: "45 min", xpReward: 25, completed: false }
      ]
    },
    {
      id: "4",
      title: "React Fondamentaux",
      description: "Apprenez React, la bibliothèque qui révolutionne la création d'interfaces utilisateur.",
      level: "Intermédiaire",
      image: "/images/modules/react-basics.jpg",
      progressPercent: 0,
      lessons: 4,
      duration: "3 heures",
      content: [
        { id: "4-1", title: "Components et Props", type: "theory", duration: "20 min", xpReward: 10, completed: false },
        { id: "4-2", title: "State et Cycle de vie", type: "theory", duration: "25 min", xpReward: 15, completed: false },
        { id: "4-3", title: "Gestion des événements", type: "exercise", duration: "25 min", xpReward: 20, completed: false },
        { id: "4-4", title: "Listes et clés", type: "exercise", duration: "20 min", xpReward: 15, completed: false }
      ]
    }
  ];

  return new Response(JSON.stringify(modulesData), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
