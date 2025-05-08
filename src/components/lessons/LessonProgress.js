"use client";

import { useState, useEffect } from 'react';

export default function LessonProgress({ theme: parentTheme = 'light' }) {
  // Dans une application réelle, ces données viendraient d'une API ou d'un contexte
  const [progress, setProgress] = useState({
    theory: false,
    example: false,
    exercise: false,
    quiz: false,
    project: false
  });

  const [localTheme, setLocalTheme] = useState(parentTheme);
  
  // Synchroniser le thème avec le thème parent lorsqu'il change
  useEffect(() => {
    setLocalTheme(parentTheme);
  }, [parentTheme]);
  
  const totalSteps = Object.keys(progress).length;
  const completedSteps = Object.values(progress).filter(Boolean).length;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);
  
  // Utiliser localTheme pour tous les styles conditionnels
  const theme = localTheme;
  
  return (
    <div className="space-y-4">
      <div className={`flex justify-between text-sm mb-1 ${
        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
      }`}>
        <span>{progressPercentage}% complété</span>
        <span>{completedSteps}/{totalSteps} étapes</span>
      </div>
      
      <div className={`w-full rounded-full h-2.5 ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
      }`}>
        <div 
          className={`h-2.5 rounded-full ${
            theme === 'dark' ? 'bg-indigo-500' : 'bg-indigo-600'
          }`} 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <ul className="space-y-2 mt-4">
        <li className="flex items-center">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
            progress.theory 
              ? 'bg-indigo-600 text-white' 
              : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
          }`}>
            {progress.theory ? '✓' : '1'}
          </div>
          <span className={`${
            progress.theory 
              ? theme === 'dark' ? 'text-gray-300' : 'text-gray-800' 
              : theme === 'dark' ? 'font-medium text-white' : 'font-medium text-gray-900'
          }`}>Théorie</span>
        </li>
        <li className="flex items-center">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
            progress.example 
              ? 'bg-indigo-600 text-white' 
              : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
          }`}>
            {progress.example ? '✓' : '2'}
          </div>
          <span className={`${
            progress.example 
              ? theme === 'dark' ? 'text-gray-300' : 'text-gray-600' 
              : theme === 'dark' ? 'font-medium text-white' : 'font-medium text-gray-900'
          }`}>Exemple</span>
        </li>
        <li className="flex items-center">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
            progress.exercise 
              ? 'bg-indigo-600 text-white' 
              : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
          }`}>
            {progress.exercise ? '✓' : '3'}
          </div>
          <span className={`${
            progress.exercise 
              ? theme === 'dark' ? 'text-gray-300' : 'text-gray-600' 
              : theme === 'dark' ? 'font-medium text-white' : 'font-medium text-gray-900'
          }`}>Exercice</span>
        </li>
        <li className="flex items-center">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
            progress.quiz 
              ? 'bg-indigo-600 text-white' 
              : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
          }`}>
            {progress.quiz ? '✓' : '4'}
          </div>
          <span className={`${
            progress.quiz 
              ? theme === 'dark' ? 'text-gray-300' : 'text-gray-600' 
              : theme === 'dark' ? 'font-medium text-white' : 'font-medium text-gray-900'
          }`}>Quiz</span>
        </li>
        <li className="flex items-center">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
            progress.project 
              ? 'bg-indigo-600 text-white' 
              : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
          }`}>
            {progress.project ? '✓' : '5'}
          </div>
          <span className={`${
            progress.project 
              ? theme === 'dark' ? 'text-gray-300' : 'text-gray-600' 
              : theme === 'dark' ? 'font-medium text-white' : 'font-medium text-gray-900'
          }`}>Projet</span>
        </li>
      </ul>
    </div>
  );
}
