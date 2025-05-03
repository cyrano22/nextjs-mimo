"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Header component
const Header = () => (
  <header className="bg-gray-800 text-white p-4">
    <h1>My Website</h1>
  </header>
);

// Footer component
const Footer = () => (
  <footer className="bg-gray-800 text-white p-4 text-center fixed bottom-0 w-full">
    <p>&copy; 2023 My Website</p>
  </footer>
);


export default function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userProgress, setUserProgress] = useState({
    level: 3,
    xp: 1250,
    xpToNextLevel: 2000,
    streak: 5,
    lastActive: new Date().toISOString()
  });

  const pathname = usePathname();

  // Effet pour détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simuler le chargement des données utilisateur
  useEffect(() => {
    // Dans une application réelle, ces données viendraient d'une API
    const loadUserData = () => {
      // Simulation de données utilisateur
      setTimeout(() => {
        setUserProgress({
          level: 3,
          xp: 1250,
          xpToNextLevel: 2000,
          streak: 5,
          lastActive: new Date().toISOString()
        });
      }, 500);
    };

    loadUserData();
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Parcours', href: '/learning-path' },
    { name: 'JavaScript', href: '/javascript-fundamentals' },
    { name: 'React', href: '/react-fundamentals' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Admin', href: '/admin' }
  ];

  return (
    <>
      <Header />
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white shadow-md py-2' 
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 py-4'
        }`}
        style={{ top: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo et nom */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  scrolled ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
                }`}>
                  <span className="text-xl font-bold">N</span>
                </div>
                <span className={`ml-2 text-xl font-bold ${
                  scrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  NextMimo
                </span>
              </Link>
            </div>

            {/* Navigation - Desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    pathname === link.href
                      ? scrolled
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-indigo-700 text-white'
                      : scrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white hover:bg-indigo-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Profil utilisateur - Desktop */}
            <div className="hidden md:flex items-center">
              <div className={`mr-4 text-right ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                <div className="text-sm font-medium">Niveau {userProgress.level}</div>
                <div className="text-xs">
                  {userProgress.xp}/{userProgress.xpToNextLevel} XP
                </div>
              </div>

              {/* Barre de progression XP */}
              <div className="hidden lg:block w-32 h-2 bg-gray-200 rounded-full overflow-hidden mr-4">
                <div 
                  className="h-full bg-green-500"
                  style={{ width: `${(userProgress.xp / userProgress.xpToNextLevel) * 100}%` }}
                ></div>
              </div>

              {/* Streak */}
              <div className={`mr-4 flex items-center ${scrolled ? 'text-orange-500' : 'text-orange-300'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-sm font-medium">{userProgress.streak} jours</span>
              </div>

              {/* Avatar */}
              <div className="relative">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center">
                    <span className={`font-medium ${scrolled ? 'text-indigo-700' : 'text-indigo-800'}`}>
                      U
                    </span>
                  </div>
                </button>

                {/* Menu déroulant */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Mon profil
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Paramètres
                    </Link>
                    <div className="border-t border-gray-100"></div>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Bouton menu - Mobile */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-indigo-700'
                }`}
              >
                <svg 
                  className={`h-6 w-6 ${isOpen ? 'hidden' : 'block'}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg 
                  className={`h-6 w-6 ${isOpen ? 'block' : 'hidden'}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className={`px-2 pt-2 pb-3 space-y-1 ${scrolled ? 'bg-white' : 'bg-indigo-700'}`}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? scrolled
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-indigo-800 text-white'
                    : scrolled
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-white hover:bg-indigo-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Profil utilisateur - Mobile */}
            <div className={`mt-4 pt-4 border-t ${scrolled ? 'border-gray-200' : 'border-indigo-800'}`}>
              <div className="flex items-center px-3">
                <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center">
                  <span className="text-indigo-800 font-medium">U</span>
                </div>
                <div className={`ml-3 ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                  <div className="text-sm font-medium">Utilisateur</div>
                  <div className="text-xs">Niveau {userProgress.level} • {userProgress.xp} XP</div>
                </div>
              </div>

              <div className="mt-3 px-3 space-y-1">
                <Link 
                  href="/profile" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-indigo-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Mon profil
                </Link>
                <Link 
                  href="/settings" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-indigo-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Paramètres
                </Link>
                <button 
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-indigo-800'
                  }`}
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="mt-16"> {/* Added main tag and margin top */}
        {/* Your page content goes here */}
      </main>
      <Footer />
    </>
  );
}