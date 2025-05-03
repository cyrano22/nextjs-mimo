"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Données utilisateur simulées - à remplacer par des données réelles
  const userProgress = {
    level: 5,
    xp: 350,
    xpToNextLevel: 500,
  };

  // Gestionnaire d'événement pour le défilement
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Parcours', href: '/learning-path' },
    { name: 'Leçons', href: '/lessons' },
    { name: 'Tableau de bord', href: '/dashboard' },
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
              <Link
                href="/profile"
                className={`flex items-center ${scrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-200'}`}
              >
                <span className="mr-2">Mon profil</span>
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                  <span className="text-sm">U</span>
                </div>
              </Link>
            </div>

            {/* Bouton menu - Mobile */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  scrolled ? 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100' : 'text-white hover:text-white hover:bg-indigo-700'
                }`}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
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
              <div className={`py-3 border-t ${scrolled ? 'border-gray-200' : 'border-indigo-800'}`}>
                <div className={`flex items-center px-3 ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 mr-3">
                    <span className="text-sm">U</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Niveau {userProgress.level}</div>
                    <div className="text-xs">
                      {userProgress.xp}/{userProgress.xpToNextLevel} XP
                    </div>
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
        </div>
      </nav>
      </>
  );
}