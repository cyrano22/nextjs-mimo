
import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">NextJS Mimo Clone</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Apprenez Next.js de manière interactive et créez des applications web modernes.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://github.com" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Liens rapides</h3>
            <ul className="space-y-2">
              <li><a href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Tableau de bord</a></li>
              <li><a href="/learning-path" className="text-gray-300 hover:text-white transition-colors">Parcours d'apprentissage</a></li>
              <li><a href="/portfolio" className="text-gray-300 hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="/lessons" className="text-gray-300 hover:text-white transition-colors">Leçons</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Ressources</h3>
            <ul className="space-y-2">
              <li><a href="/javascript-fundamentals" className="text-gray-300 hover:text-white transition-colors">JavaScript fondamentaux</a></li>
              <li><a href="https://nextjs.org/docs" className="text-gray-300 hover:text-white transition-colors">Documentation Next.js</a></li>
              <li><a href="https://tailwindcss.com/docs" className="text-gray-300 hover:text-white transition-colors">Documentation Tailwind CSS</a></li>
              <li><a href="https://reactjs.org/docs" className="text-gray-300 hover:text-white transition-colors">Documentation React</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Légal</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">À propos</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Confidentialité</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-white transition-colors">Conditions d'utilisation</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>© {currentYear} NextJS Mimo Clone. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
