
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function ModulePage({
  params,
}: {
  params: { moduleId: string };
}) {
  const [module, setModule] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchModule() {
      try {
        setIsLoading(true);
        setError(null);
        
        const res = await fetch(`/api/modules/${params.moduleId}`);
        
        if (!res.ok) {
          throw new Error(`Erreur: ${res.status}`);
        }
        
        const data = await res.json();
        setModule(data);
      } catch (err: any) {
        console.error("Erreur lors du chargement du module:", err);
        setError(err.message || "Une erreur est survenue lors du chargement du module");
      } finally {
        setIsLoading(false);
      }
    }

    fetchModule();
  }, [params.moduleId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !module) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          {error || "Module non trouvé"}
        </h1>
        <p className="mb-6">Le module que vous recherchez n'est pas disponible.</p>
        <Link href="/lessons" className="px-4 py-2 bg-indigo-600 text-white rounded-md">
          Retour aux modules
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <Link href="/lessons" className="text-indigo-600 hover:text-indigo-800 mr-2">
            Modules
          </Link>
          <span className="text-gray-500">/</span>
          <span className="ml-2 text-gray-700">Module {params.moduleId}</span>
        </div>
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold">{module.title}</h1>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {module.level}
          </span>
        </div>
        <p className="text-gray-600 mt-2">{module.description}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Progression du module</h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '0%' }}></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>0% complété</span>
          <span>0/{module.lessons.length} leçons</span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Leçons du module</h2>
        <div className="space-y-4">
          {module.lessons.map((lesson: any, index: number) => (
            <div key={lesson.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-sm font-medium text-indigo-600">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{lesson.title}</h3>
                  <div className="flex items-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs text-gray-500">~15 min</span>
                  </div>
                </div>
                <Link href={`/lessons/module/${params.moduleId}/lesson/${lesson.id}`} className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm">
                  Commencer
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
