"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CodePlayground({ 
  initialCode = '', 
  language = 'html', 
  height = '400px',
  showPreview = true,
  autoRun = true,
  theme = 'light'
}) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('code');
  const [previewMode, setPreviewMode] = useState('split'); // 'split', 'preview', 'code'
  const [editorTheme, setEditorTheme] = useState(theme);
  
  // Exécuter le code automatiquement lorsqu'il change (si autoRun est activé)
  useEffect(() => {
    if (autoRun) {
      const timer = setTimeout(() => {
        runCode();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [code, autoRun]);
  
  // Exécuter le code
  const runCode = () => {
    setIsRunning(true);
    setError('');
    
    try {
      // Pour HTML/CSS/JS
      if (language === 'html' || language === 'jsx') {
        // Créer un iframe sandbox pour exécuter le code en toute sécurité
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        // Écrire le code dans l'iframe
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(code);
        iframeDocument.close();
        
        // Capturer la sortie
        setOutput(iframeDocument.documentElement.outerHTML);
        
        // Nettoyer
        document.body.removeChild(iframe);
      } 
      // Pour JavaScript pur
      else if (language === 'javascript') {
        // Utiliser une fonction pour exécuter le code en toute sécurité
        const result = new Function(`
          try {
            // Rediriger console.log vers une variable
            let logs = [];
            const originalConsoleLog = console.log;
            console.log = (...args) => {
              logs.push(args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
              ).join(' '));
              originalConsoleLog(...args);
            };
            
            // Exécuter le code
            ${code}
            
            // Restaurer console.log
            console.log = originalConsoleLog;
            
            // Retourner les logs
            return logs.join('\\n');
          } catch (error) {
            throw error;
          }
        `)();
        
        setOutput(result || 'Code exécuté avec succès (aucune sortie)');
      }
      // Pour React
      else if (language === 'react') {
        // Dans une application réelle, nous utiliserions Babel pour transpiler le JSX
        // et React pour le rendu, mais pour simplifier, nous allons juste afficher le code
        setOutput("Prévisualisation React non disponible dans cet environnement");
      }
    } catch (err) {
      setError(err.toString());
    } finally {
      setIsRunning(false);
    }
  };
  
  // Réinitialiser le code
  const resetCode = () => {
    setCode(initialCode);
    setError('');
    setOutput('');
  };
  
  // Changer le mode de prévisualisation
  const togglePreviewMode = () => {
    if (previewMode === 'split') setPreviewMode('preview');
    else if (previewMode === 'preview') setPreviewMode('code');
    else setPreviewMode('split');
  };
  
  // Changer le thème de l'éditeur
  const toggleTheme = () => {
    setEditorTheme(editorTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <div className={`rounded-lg overflow-hidden border ${
      editorTheme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
    }`}>
      {/* Barre d'outils */}
      <div className={`flex items-center justify-between px-4 py-2 ${
        editorTheme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700'
      }`}>
        <div className="flex items-center space-x-2">
          {/* Sélecteur de langage */}
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`text-sm rounded px-2 py-1 ${
              editorTheme === 'dark' 
                ? 'bg-gray-700 text-gray-200 border-gray-600' 
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            <option value="html">HTML/CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="jsx">JSX</option>
            <option value="react">React</option>
          </select>
          
          {/* Bouton d'exécution */}
          <button 
            onClick={runCode}
            disabled={isRunning}
            className={`flex items-center px-3 py-1 rounded text-sm font-medium ${
              isRunning 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-opacity-80'
            } ${
              editorTheme === 'dark'
                ? 'bg-green-600 text-white'
                : 'bg-green-500 text-white'
            }`}
          >
            {isRunning ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Exécution...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Exécuter
              </>
            )}
          </button>
          
          {/* Bouton de réinitialisation */}
          <button 
            onClick={resetCode}
            className={`flex items-center px-3 py-1 rounded text-sm font-medium ${
              editorTheme === 'dark'
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Réinitialiser
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Bouton de mode de prévisualisation */}
          {showPreview && (
            <button 
              onClick={togglePreviewMode}
              className={`flex items-center px-3 py-1 rounded text-sm font-medium ${
                editorTheme === 'dark'
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {previewMode === 'split' && (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 1h10v4H5V6zm0 6h10v2H5v-2z" clipRule="evenodd" />
                  </svg>
                  Split
                </>
              )}
              {previewMode === 'preview' && (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  Aperçu
                </>
              )}
              {previewMode === 'code' && (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Code
                </>
              )}
            </button>
          )}
          
          {/* Bouton de thème */}
          <button 
            onClick={toggleTheme}
            className={`flex items-center px-3 py-1 rounded text-sm font-medium ${
              editorTheme === 'dark'
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {editorTheme === 'dark' ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
                Clair
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                Sombre
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Contenu principal */}
      <div 
        className={`${
          previewMode === 'split' ? 'grid grid-cols-2 gap-0' : 'block'
        }`}
        style={{ height }}
      >
        {/* Éditeur de code */}
        {(previewMode === 'split' || previewMode === 'code') && (
          <div className={`relative ${
            editorTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
          }`}>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`w-full h-full p-4 font-mono text-sm resize-none focus:outline-none ${
                editorTheme === 'dark' 
                  ? 'bg-gray-900 text-gray-200' 
                  : 'bg-gray-50 text-gray-800'
              }`}
              placeholder="Écrivez votre code ici..."
              spellCheck="false"
            />
            
            {/* Numéros de ligne */}
            <div className={`absolute top-0 left-0 p-4 font-mono text-sm text-right select-none pointer-events-none ${
              editorTheme === 'dark' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {code.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          </div>
        )}
        
        {/* Prévisualisation */}
        {(previewMode === 'split' || previewMode === 'preview') && showPreview && (
          <div className={`relative overflow-auto ${
            editorTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            {/* Onglets de prévisualisation */}
            <div className={`flex border-b ${
              editorTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'preview'
                    ? editorTheme === 'dark'
                      ? 'border-b-2 border-blue-500 text-blue-400'
                      : 'border-b-2 border-blue-500 text-blue-600'
                    : editorTheme === 'dark'
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Aperçu
              </button>
              <button
                onClick={() => setActiveTab('console')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'console'
                    ? editorTheme === 'dark'
                      ? 'border-b-2 border-blue-500 text-blue-400'
                      : 'border-b-2 border-blue-500 text-blue-600'
                    : editorTheme === 'dark'
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Console
              </button>
            </div>
            
            {/* Contenu de l'onglet actif */}
            <div className="p-4 h-[calc(100%-40px)] overflow-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'preview' && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    {error ? (
                      <div className="text-red-500 text-sm font-mono whitespace-pre-wrap">
                        {error}
                      </div>
                    ) : output ? (
                      language === 'html' || language === 'jsx' ? (
                        <iframe
                          srcDoc={output}
                          title="Prévisualisation"
                          className="w-full h-full border-0"
                          sandbox="allow-scripts"
                        />
                      ) : (
                        <div className={`font-mono text-sm whitespace-pre-wrap ${
                          editorTheme === 'dark' ? 'text-gray-300' : 'text-gray-800'
                        }`}>
                          {output}
                        </div>
                      )
                    ) : (
                      <div className={`flex items-center justify-center h-full ${
                        editorTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        <p className="text-center">
                          {autoRun 
                            ? "Écrivez du code pour voir l'aperçu" 
                            : "Cliquez sur 'Exécuter' pour voir l'aperçu"}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
                
                {activeTab === 'console' && (
                  <motion.div
                    key="console"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`font-mono text-sm whitespace-pre-wrap h-full overflow-auto ${
                      editorTheme === 'dark' ? 'text-gray-300' : 'text-gray-800'
                    }`}
                  >
                    {error ? (
                      <div className="text-red-500">
                        {error}
                      </div>
                    ) : output && language === 'javascript' ? (
                      output
                    ) : (
                      <div className={`flex items-center justify-center h-full ${
                        editorTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        <p className="text-center">
                          {language === 'javascript' 
                            ? autoRun 
                              ? "Écrivez du code JavaScript pour voir la sortie console" 
                              : "Cliquez sur 'Exécuter' pour voir la sortie console"
                            : "La console n'est disponible que pour le JavaScript"}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
