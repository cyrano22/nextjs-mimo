"use client";

import { useState } from 'react';

export default function LessonProgress() {
  // Dans une application réelle, ces données viendraient d'une API ou d'un contexte
  const [progress, setProgress] = useState({
    theory: false,
    example: false,
    exercise: false,
    quiz: false,
    project: false
  });
  
  const totalSteps = Object.keys(progress).length;
  const completedSteps = Object.values(progress).filter(Boolean).length;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>{progressPercentage}% complété</span>
        <span>{completedSteps}/{totalSteps} étapes</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <ul className="space-y-2 mt-4">
        <li className="flex items-center">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${progress.theory ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
            {progress.theory ? '✓' : '1'}
          </div>
          <span className={progress.theory ? 'text-gray-600' : 'font-medium'}>Théorie</span>
        </li>
        <li className="flex items-center">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${progress.example ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
            {progress.example ? '✓' : '2'}
          </div>
          <span className={progress.example ? 'text-gray-600' : 'font-medium'}>Exemple</span>
        </li>
        <li className="flex items-center">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${progress.exercise ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
            {progress.exercise ? '✓' : '3'}
          </div>
          <span className={progress.exercise ? 'text-gray-600' : 'font-medium'}>Exercice</span>
        </li>
        <li className="flex items-center">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${progress.quiz ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
            {progress.quiz ? '✓' : '4'}
          </div>
          <span className={progress.quiz ? 'text-gray-600' : 'font-medium'}>Quiz</span>
        </li>
        <li className="flex items-center">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${progress.project ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
            {progress.project ? '✓' : '5'}
          </div>
          <span className={progress.project ? 'text-gray-600' : 'font-medium'}>Projet</span>
        </li>
      </ul>
    </div>
  );
}
