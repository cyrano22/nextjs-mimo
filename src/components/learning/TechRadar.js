
import { useState, useEffect } from 'react';

export default function TechRadar() {
  const [techCategories, setTechCategories] = useState([
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
  ]);

  // Statuts possibles: adopted (vert), trial (jaune), assess (orange), hold (rouge)
  const getStatusColor = (status) => {
    switch(status) {
      case 'adopted': return 'bg-green-100 text-green-800 border-green-200';
      case 'trial': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'assess': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'hold': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'adopted': return 'Adopté';
      case 'trial': return 'En test';
      case 'assess': return 'À évaluer';
      case 'hold': return 'En attente';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border p-6 my-6">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Radar Technologique</h2>
          <p className="text-gray-600">Restez à jour avec les dernières technologies Next.js et l'écosystème React</p>
        </div>
      </div>
      
      <div className="space-y-8">
        {techCategories.map((category, catIndex) => (
          <div key={catIndex} className="border-b pb-6 last:border-b-0 last:pb-0">
            <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
            <p className="text-gray-600 mb-4">{category.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="border rounded-lg overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold">{item.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(item.status)}`}>
                        {getStatusLabel(item.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                    <div className="mt-3 text-xs text-gray-500">
                      Date de sortie: {new Date(item.releaseDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-2 border-t">
                    <a 
                      href={item.learnMoreUrl} 
                      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Apprendre &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
