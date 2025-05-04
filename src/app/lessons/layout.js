"use client"

import Link from 'next/link';

export default function LessonsLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-4 border-b border-gray-200">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-indigo-600">NextJS Mimo</span>
          </Link>
        </div>
        <nav className="p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Modules</p>
          <ul className="space-y-1">
            <li>
              <Link href="/lessons/module/1" className="block px-4 py-2 rounded-md hover:bg-indigo-50 hover:text-indigo-600">
                Introduction à Next.js
              </Link>
            </li>
            <li>
              <Link href="/lessons/module/2" className="block px-4 py-2 rounded-md hover:bg-indigo-50 hover:text-indigo-600">
                Fondamentaux de Next.js
              </Link>
            </li>
            <li>
              <Link href="/lessons/module/3" className="block px-4 py-2 rounded-md hover:bg-indigo-50 hover:text-indigo-600">
                Fonctionnalités Avancées
              </Link>
            </li>
            <li>
              <Link href="/lessons/module/4" className="block px-4 py-2 rounded-md hover:bg-indigo-50 hover:text-indigo-600">
                Déploiement et Performance
              </Link>
            </li>
          </ul>
          
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-2">Navigation</p>
          <ul className="space-y-1">
            <li>
              <Link href="/dashboard" className="block px-4 py-2 rounded-md hover:bg-indigo-50 hover:text-indigo-600">
                Tableau de bord
              </Link>
            </li>
            <li>
              <Link href="/profile" className="block px-4 py-2 rounded-md hover:bg-indigo-50 hover:text-indigo-600">
                Mon profil
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-sm font-medium">Utilisateur</span>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
