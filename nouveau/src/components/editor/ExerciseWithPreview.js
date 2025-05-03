"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '../editor/CodeEditor';

export default function ExerciseWithPreview({ exercise, onComplete }) {
  const [userCode, setUserCode] = useState(exercise?.initialCode || '');
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
  
  // Données simulées pour un exercice
  const exerciseData = exercise || {
    id: 1,
    title: "Créer un composant de bouton",
    description: "Créez un composant de bouton React qui accepte une prop 'text' et l'affiche.",
    instructions: [
      "Créez un composant fonctionnel appelé Button",
      "Le composant doit accepter une prop 'text'",
      "Affichez cette prop dans un élément button"
    ],
    initialCode: "function Button() {\n  // Votre code ici\n}\n\n// Exemple d'utilisation\nfunction App() {\n  return <Button text=\"Cliquez-moi\" />;\n}\n",
    solutionCode: "function Button({ text }) {\n  return <button>{text}</button>;\n}\n\n// Exemple d'utilisation\nfunction App() {\n  return <Button text=\"Cliquez-moi\" />;\n}\n",
    language: "react",
    difficulty: "débutant",
    xpReward: 30,
    contributeToPortfolio: false
  };
  
  const handleCodeChange = (newCode) => {
    setUserCode(newCode);
    // Réinitialiser les états lorsque le code change
    setIsCorrect(false);
    setFeedback(null);
  };
  
  const checkSolution = () => {
    // Logique de vérification simplifiée
    // Dans une application réelle, vous auriez une logique plus sophistiquée
    // ou une API pour vérifier la solution
    
    // Exemple simple: vérifier si le code contient certains éléments clés
    const containsButton = userCode.includes('<button');
    const containsTextProp = userCode.includes('{ text }') || userCode.includes('{text}') || userCode.includes('props.text');
    const containsReturnStatement = userCode.includes('return');
    
    if (containsButton && containsTextProp && containsReturnStatement) {
      setIsCorrect(true);
      setFeedback({
        type: 'success',
        message: 'Bravo ! Votre solution est correcte.'
      });
      
      // Notifier le parent que l'exercice est complété
      if (onComplete) {
        onComplete(exerciseData.id, exerciseData.xpReward);
      }
    } else {
      setIsCorrect(false);
      
      let feedbackMessage = "Votre solution n'est pas encore correcte. ";
      
      if (!containsButton) {
        feedbackMessage += "N'oubliez pas d'utiliser un élément button. ";
      }
      
      if (!containsTextProp) {
        feedbackMessage += "Assurez-vous d'utiliser la prop 'text'. ";
      }
      
      if (!containsReturnStatement) {
        feedbackMessage += "Votre composant doit retourner (return) quelque chose. ";
      }
      
      setFeedback({
        type: 'error',
        message: feedbackMessage
      });
    }
  };
  
  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      {/* En-tête de l'exercice */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
        <motion.h3 
          variants={itemVariants}
          className="text-xl font-semibold text-white"
        >
          {exerciseData.title}
        </motion.h3>
        <motion.div 
          variants={itemVariants}
          className="flex items-center text-purple-100 text-sm mt-1"
        >
          <span className="mr-3">Difficulté: {exerciseData.difficulty}</span>
          <span className="mr-3">•</span>
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            {exerciseData.xpReward} XP
          </span>
          
          {exerciseData.contributeToPortfolio && (
            <>
              <span className="mx-3">•</span>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Contribue au portfolio
              </span>
            </>
          )}
        </motion.div>
      </div>
      
      {/* Contenu de l'exercice */}
      <div className="p-6">
        <motion.div variants={itemVariants} className="mb-6">
          <p className="text-gray-700">{exerciseData.description}</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Instructions</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            {exerciseData.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Votre code</h4>
          <CodeEditor
            initialCode={exerciseData.initialCode}
            language={exerciseData.language}
            onCodeChange={handleCodeChange}
            height="300px"
            showPreview={true}
            autoPreview={true}
          />
        </motion.div>
        
        {feedback && (
          <motion.div 
            variants={itemVariants}
            className={`p-4 rounded-md mb-6 ${
              feedback.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {feedback.message}
          </motion.div>
        )}
        
        <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
          <button
            onClick={checkSolution}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Vérifier ma solution
          </button>
          
          <button
            onClick={toggleSolution}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            {showSolution ? 'Masquer la solution' : 'Voir la solution'}
          </button>
        </motion.div>
        
        {showSolution && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Solution</h4>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                {exerciseData.solutionCode}
              </pre>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
