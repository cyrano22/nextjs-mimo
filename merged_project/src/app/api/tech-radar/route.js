
import { NextResponse } from 'next/server';

// Cette fonction récupérerait normalement des données depuis une base de données
// ou une API externe pour maintenir le radar technologique à jour
async function fetchTechRadarData() {
  // Simuler une latence comme lors d'un appel API réel
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    {
      name: "Nouveautés Next.js",
      description: "Dernières fonctionnalités de Next.js",
      items: [
        { 
          name: "Next.js 14.3", 
          status: "adopted", 
          description: "Dernière version stable avec performance améliorée",
          releaseDate: "2023-04-05",
          learnMoreUrl: "/lessons/module/next-advanced/lesson/next14-features"
        },
        { 
          name: "Server Actions", 
          status: "assess", 
          description: "Mutations de données côté serveur avec une syntaxe déclarative",
          releaseDate: "2023-03-10",
          learnMoreUrl: "/lessons/module/next-advanced/lesson/server-actions"
        },
        { 
          name: "Turbopack", 
          status: "trial", 
          description: "Successeur de Webpack avec compilation 10x plus rapide",
          releaseDate: "2022-10-25",
          learnMoreUrl: "/lessons/module/next-advanced/lesson/turbopack"
        }
      ]
    },
    {
      name: "Frameworks UI",
      description: "Bibliothèques UI modernes pour Next.js",
      items: [
        { 
          name: "Shadcn UI", 
          status: "adopted", 
          description: "Composants réutilisables sans dépendance externe",
          releaseDate: "2022-12-15",
          learnMoreUrl: "/lessons/module/ui-frameworks/lesson/shadcn"
        },
        { 
          name: "Tailwind CSS", 
          status: "adopted", 
          description: "Framework CSS utilitaire hautement personnalisable",
          releaseDate: "2019-11-01",
          learnMoreUrl: "/lessons/module/ui-frameworks/lesson/tailwind"
        },
        { 
          name: "Radix UI", 
          status: "trial", 
          description: "Composants UI sans style avec excellente accessibilité",
          releaseDate: "2021-06-10",
          learnMoreUrl: "/lessons/module/ui-frameworks/lesson/radix"
        }
      ]
    },
    {
      name: "Outils de développement",
      description: "Outils pour améliorer le développement Next.js",
      items: [
        { 
          name: "Next.js DevTools", 
          status: "assess", 
          description: "Outils officiels de débogage pour Next.js",
          releaseDate: "2023-01-20",
          learnMoreUrl: "/lessons/module/tools/lesson/nextjs-devtools"
        },
        { 
          name: "TypeScript", 
          status: "adopted", 
          description: "Typage statique pour JavaScript, intégré à Next.js",
          releaseDate: "2018-05-04",
          learnMoreUrl: "/lessons/module/typescript/lesson/intro"
        },
        { 
          name: "Prettier", 
          status: "adopted", 
          description: "Formateur de code opinioné pour codebase cohérente",
          releaseDate: "2017-01-10",
          learnMoreUrl: "/lessons/module/tools/lesson/prettier"
        }
      ]
    }
  ];
}

export async function GET() {
  try {
    const techRadarData = await fetchTechRadarData();
    return NextResponse.json(techRadarData);
  } catch (error) {
    console.error('Erreur dans l\'API du radar technologique:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données du radar technologique' }, 
      { status: 500 }
    );
  }
}
