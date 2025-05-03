
"use client";

import { useState, useRef, useEffect } from 'react';

export default function AIAssistant() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const endOfMessagesRef = useRef(null);
  const textareaRef = useRef(null);

  // Scroll automatique vers le bas de la conversation
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  // Ajuster automatiquement la hauteur du textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    // Ajouter la question de l'utilisateur à la conversation
    const userMessage = { role: 'user', content: query };
    setConversation(prev => [...prev, userMessage]);
    
    // Réinitialiser l'input et montrer l'indicateur de chargement
    setQuery('');
    setIsLoading(true);
    
    try {
      // Appel à l'API d'IA (simulé ici, dans une vraie application ce serait un appel à une API réelle)
      const response = await getAIResponse(query);
      
      // Ajouter la réponse de l'IA à la conversation
      const assistantMessage = { role: 'assistant', content: response };
      setConversation(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Erreur lors de la communication avec l'IA:", error);
      
      // Ajouter un message d'erreur à la conversation
      const errorMessage = { 
        role: 'assistant', 
        content: "Désolé, j'ai rencontré une erreur lors du traitement de votre demande. Veuillez réessayer." 
      };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAIResponse = async (userQuery) => {
    // Dans une application réelle, cette fonction ferait un appel à une API 
    // comme OpenAI, Hugging Face, ou votre propre modèle
    
    // Simulation de l'appel API avec un délai
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Tenter d'appeler l'API AI Assistant
      const response = await fetch('/api/ai-assistant/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userQuery }),
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la communication avec l'API');
      }
      
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Erreur API:", error);
      
      // Réponses de secours en cas d'échec de l'API
      const fallbackResponses = {
        'code': "Voici comment vous pourriez structurer ce code:\n```javascript\nfunction example() {\n  // Votre logique ici\n  return result;\n}\n```\nN'hésitez pas à me demander des clarifications!",
        'error': "Cette erreur est généralement causée par un problème de syntaxe. Vérifiez les accolades et les parenthèses manquantes dans votre code.",
        'nextjs': "Dans Next.js, vous pouvez récupérer des données de plusieurs façons:\n- getStaticProps pour la génération statique\n- getServerSideProps pour le rendu côté serveur\n- useEffect avec fetch pour le chargement côté client",
        'react': "En React, les composants peuvent être fonctionnels ou basés sur des classes. Les hooks comme useState et useEffect sont utilisés pour gérer l'état et les effets dans les composants fonctionnels.",
        'api': "Pour créer une API dans Next.js, vous pouvez créer des fichiers dans le dossier pages/api/. Chaque fichier devient automatiquement un endpoint API.",
        'css': "Pour styler vos composants Next.js, vous pouvez utiliser CSS Modules, Styled Components, Tailwind CSS, ou CSS-in-JS.",
        'deployment': "Next.js peut être déployé sur diverses plateformes comme Vercel, Netlify, ou hébergé sur votre propre serveur."
      };
      
      // Déterminer quelle réponse de secours utiliser en fonction des mots-clés dans la requête
      const queryLower = userQuery.toLowerCase();
      for (const [keyword, response] of Object.entries(fallbackResponses)) {
        if (queryLower.includes(keyword)) {
          return response;
        }
      }
      
      // Réponse par défaut si aucun mot-clé ne correspond
      return "Je suis l'assistant d'apprentissage Next.js. Je peux vous aider avec des questions sur Next.js, React, JavaScript et le développement web en général. N'hésitez pas à me poser une question spécifique.";
    }
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const clearConversation = () => {
    setConversation([]);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out ${
      isExpanded ? 'w-96 h-[500px]' : 'w-16 h-16'
    }`}>
      {/* Bouton d'IA flottant (visible quand minimisé) */}
      {!isExpanded && (
        <button
          onClick={toggleExpansion}
          className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors"
          aria-label="Ouvrir l'assistant IA"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
            />
          </svg>
        </button>
      )}

      {/* Interface complète (visible quand développé) */}
      {isExpanded && (
        <div className="bg-white rounded-lg shadow-xl flex flex-col h-full overflow-hidden border border-gray-200">
          {/* En-tête */}
          <div className="bg-indigo-600 px-4 py-3 text-white flex justify-between items-center">
            <div className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
              <h3 className="font-medium">Assistant Next.js</h3>
            </div>
            
            <div className="flex">
              <button
                onClick={clearConversation}
                className="text-indigo-100 hover:text-white mr-3"
                aria-label="Effacer la conversation"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                  />
                </svg>
              </button>
              
              <button
                onClick={toggleExpansion}
                className="text-indigo-100 hover:text-white"
                aria-label="Fermer l'assistant IA"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Corps de la conversation */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {conversation.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 p-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-300 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <p className="mb-2 font-medium">Assistant d'apprentissage Next.js</p>
                <p className="text-sm">
                  Posez-moi des questions sur Next.js, React, ou vos problèmes de code. Je suis là pour vous aider dans votre parcours d'apprentissage!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {conversation.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-lg p-3 ${
                        message.role === 'user' 
                          ? 'bg-indigo-600 text-white rounded-br-none'
                          : 'bg-white border border-gray-200 rounded-bl-none'
                      }`}
                    >
                      <p className={`text-sm whitespace-pre-wrap ${
                        message.role === 'user' ? 'text-white' : 'text-gray-800'
                      }`}>
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-3 max-w-[85%]">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={endOfMessagesRef} />
              </div>
            )}
          </div>

          {/* Zone de saisie */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={query}
                onChange={handleInputChange}
                placeholder="Posez votre question..."
                className="w-full border rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none overflow-auto"
                rows="1"
                style={{ maxHeight: '150px' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <button
                type="submit"
                disabled={!query.trim() || isLoading}
                className={`absolute right-2 bottom-2 rounded-full p-1 ${
                  !query.trim() || isLoading
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-indigo-600 hover:text-indigo-800'
                }`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                  />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">
              Appuyez sur Entrée pour envoyer, Maj+Entrée pour un saut de ligne
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
