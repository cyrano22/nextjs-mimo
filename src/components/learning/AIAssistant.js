"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState([
    {
      role: 'assistant',
      content: "Bonjour ! Je suis votre assistant d'apprentissage IA. Comment puis-je vous aider aujourd'hui avec Next.js ou React ?"
    }
  ]);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!query.trim()) return;

    // Ajouter la question de l'utilisateur à la conversation
    const userMessage = { role: 'user', content: query };
    setConversation([...conversation, userMessage]);
    setIsLoading(true);
    setQuery('');

    try {
      // Appeler l'API pour obtenir la réponse de l'IA
      const response = await fetch('/api/ai-assistant/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          history: conversation.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la communication avec l'API");
      }

      const data = await response.json();

      // Ajouter la réponse de l'IA à la conversation
      const assistantMessage = { role: 'assistant', content: data.response };
      setConversation([...conversation, userMessage, assistantMessage]);
    } catch (error) {
      console.error('Erreur:', error);
      // Ajouter un message d'erreur à la conversation
      const errorMessage = {
        role: 'assistant',
        content: "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer."
      };
      setConversation([...conversation, userMessage, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <>
      {/* Bouton flottant pour ouvrir l'assistant */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center z-50"
        onClick={toggleAssistant}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        aria-label="Ouvrir l'assistant IA"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
          />
        </svg>
      </motion.button>

      {/* Fenêtre de l'assistant */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-50 overflow-hidden flex flex-col"
            style={{ maxHeight: 'calc(100vh - 150px)' }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* En-tête */}
            <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-medium">Assistant d'apprentissage IA</h3>
              <button
                onClick={toggleAssistant}
                className="text-white hover:text-indigo-200 transition-colors"
                aria-label="Fermer l'assistant"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Corps de la conversation */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {conversation.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="text-left mb-4">
                  <div className="inline-block rounded-lg px-4 py-2 bg-white text-gray-800 border border-gray-200">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: '0.4s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Zone de saisie */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex">
                <textarea
                  className="flex-1 min-h-[40px] max-h-32 border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Posez votre question..."
                  value={query}
                  onChange={handleQueryChange}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  disabled={isLoading}
                  style={{ overflow: 'auto' }}
                ></textarea>
                <button
                  className={`px-4 rounded-r-md ${
                    isLoading || !query.trim()
                      ? 'bg-indigo-300 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } text-white transition-colors`}
                  onClick={handleSubmit}
                  disabled={isLoading || !query.trim()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Astuce : appuyez sur Entrée pour envoyer.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}