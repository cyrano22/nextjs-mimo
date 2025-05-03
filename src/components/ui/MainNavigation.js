"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MainNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-900 shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className={`font-bold text-xl ${isScrolled ? 'text-indigo-600' : 'text-white'}`}>
                NextMimo
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <Link 
              href="/dashboard" 
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-200'
              }`}
            >
              Tableau de bord
            </Link>
            <Link 
              href="/lessons" 
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-200'
              }`}
            >
              Leçons
            </Link>
            <Link 
              href="/exercises" 
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-200'
              }`}
            >
              Exercices
            </Link>
            <Link 
              href="/portfolio" 
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-200'
              }`}
            >
              Portfolio
            </Link>
            <Link 
              href="/javascript-fundamentals" 
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-200'
              }`}
            >
              JavaScript
            </Link>
            <Link 
              href="/react-fundamentals" 
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-200'
              }`}
            >
              React
            </Link>
            <Link 
              href="/javascript-fundamentals" 
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-200'
              }`}
            >
              JavaScript
            </Link>
          </nav>

          {/* Login button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login" 
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-200'
              }`}
            >
              Connexion
            </Link>
            <Link 
              href="/login?signup=true" 
              className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isScrolled 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                  : 'bg-white text-indigo-600 hover:bg-gray-100'
              }`}
            >
              Inscription
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-200'
              }`}
              aria-expanded="false"
            >
              <span className="sr-only">Ouvrir le menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className={`pt-2 pb-3 space-y-1 ${isScrolled ? 'bg-white dark:bg-gray-900' : 'bg-indigo-600'}`}>
          <Link 
            href="/dashboard" 
            className={`block px-4 py-2 text-base font-medium ${
              isScrolled ? 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100' : 'text-white hover:bg-indigo-700'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Tableau de bord
          </Link>
          <Link 
            href="/lessons" 
            className={`block px-4 py-2 text-base font-medium ${
              isScrolled ? 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100' : 'text-white hover:bg-indigo-700'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Leçons
          </Link>
          <Link 
            href="/exercises" 
            className={`block px-4 py-2 text-base font-medium ${
              isScrolled ? 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100' : 'text-white hover:bg-indigo-700'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Exercices
          </Link>
          <Link 
            href="/portfolio" 
            className={`block px-4 py-2 text-base font-medium ${
              isScrolled ? 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100' : 'text-white hover:bg-indigo-700'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Portfolio
          </Link>
          <Link 
            href="/javascript-fundamentals" 
            className={`block px-4 py-2 text-base font-medium ${
              isScrolled ? 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100' : 'text-white hover:bg-indigo-700'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            JavaScript
          </Link>
          <Link 
            href="/react-fundamentals" 
            className={`block px-4 py-2 text-base font-medium ${
              isScrolled ? 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100' : 'text-white hover:bg-indigo-700'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            React
          </Link>
          <div className="mt-4 px-4 py-2 flex flex-col space-y-2">
            <Link 
              href="/login" 
              className={`text-center px-4 py-2 text-base font-medium ${
                isScrolled ? 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100' : 'text-white hover:bg-indigo-700'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Connexion
            </Link>
            <Link 
              href="/login?signup=true" 
              className={`text-center px-4 py-2 rounded-md text-base font-medium ${
                isScrolled 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                  : 'bg-white text-indigo-600 hover:bg-gray-100'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inscription
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}