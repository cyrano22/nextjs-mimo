"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodePreviewSandbox from './CodePreviewSandbox';

export default function CodeEditor({ 
  initialCode = '', 
  language = 'javascript',
  height = '400px',
  onCodeChange,
  onCodeRun,
  readOnly = false,
  showPreview = true,
  autoPreview = true
}) {
  const [code, setCode] = useState(initialCode);
  const [previewCode, setPreviewCode] = useState(initialCode);
  const [previewVisible, setPreviewVisible] = useState(showPreview);
  const [splitView, setSplitView] = useState(true);
  const [theme, setTheme] = useState('light');
  
  // Mettre à jour le code de prévisualisation automatiquement ou lors de l'exécution manuelle
  useEffect(() => {
    if (autoPreview) {
      const timer = setTimeout(() => {
        setPreviewCode(code);
      }, 1000); // Délai pour éviter trop de rendus pendant la frappe
      
      return () => clearTimeout(timer);
    }
  }, [code, autoPreview]);
  
  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (onCodeChange) onCodeChange(newCode);
  };
  
  const handleRunCode = () => {
    setPreviewCode(code);
    if (onCodeRun) onCodeRun(code);
  };
  
  const handleReset = () => {
    setCode(initialCode);
    setPreviewCode(initialCode);
    if (onCodeChange) onCodeChange(initialCode);
  };
  
  const togglePreview = () => {
    setPreviewVisible(!previewVisible);
  };
  
  const toggleSplitView = () => {
    setSplitView(!splitView);
  };
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <div className="w-full rounded-lg border border-gray-200 overflow-hidden">
      {/* Barre d'outils */}
      <div className="flex items-center justify-between bg-gray-100 px-4 py-2 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">
            {language.charAt(0).toUpperCase() + language.slice(1)}
          </span>
          
          {!readOnly && (
            <>
              <button
                onClick={handleRunCode}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
              >
                Exécuter
              </button>
              
              <button
                onClick={handleReset}
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
              >
                Réinitialiser
              </button>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePreview}
            className={`p-1 rounded ${previewVisible ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}
            title={previewVisible ? "Masquer la prévisualisation" : "Afficher la prévisualisation"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          {previewVisible && (
            <button
              onClick={toggleSplitView}
              className={`p-1 rounded ${splitView ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}
              title={splitView ? "Vue plein écran" : "Vue partagée"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm3 0v12h10V4H6z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          
          <button
            onClick={toggleTheme}
            className={`p-1 rounded ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'}`}
            title={theme === 'light' ? "Thème sombre" : "Thème clair"}
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Contenu de l'éditeur */}
      <div className={`flex ${splitView && previewVisible ? 'flex-col md:flex-row' : 'flex-col'}`}>
        {/* Zone d'édition de code */}
        <div className={`${splitView && previewVisible ? 'md:w-1/2' : 'w-full'} ${!previewVisible || !splitView ? 'block' : ''}`}>
          <div className="relative" style={{ height }}>
            <div className="absolute inset-0 flex">
              {/* Numéros de ligne */}
              <div className={`w-10 text-right pr-2 pt-2 select-none font-mono text-xs ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                {code.split('\n').map((_, i) => (
                  <div key={i} className="leading-5">
                    {i + 1}
                  </div>
                ))}
              </div>
              
              {/* Éditeur de code */}
              <textarea
                value={code}
                onChange={handleCodeChange}
                className={`flex-1 p-2 pt-2 font-mono text-sm resize-none focus:outline-none leading-5 ${
                  theme === 'dark' 
                    ? 'bg-gray-900 text-gray-100' 
                    : 'bg-white text-gray-800'
                }`}
                style={{ 
                  height: '100%',
                  tabSize: 2,
                  whiteSpace: 'pre',
                  overflowWrap: 'normal',
                  overflowX: 'auto'
                }}
                readOnly={readOnly}
                spellCheck="false"
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                data-gramm="false"
              />
            </div>
          </div>
        </div>
        
        {/* Zone de prévisualisation */}
        {previewVisible && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${splitView ? 'md:w-1/2 md:border-l' : 'w-full'} border-t md:border-t-0 border-gray-200`}
            style={{ height: splitView ? height : 'auto' }}
          >
            <div className="p-4 h-full">
              <CodePreviewSandbox 
                code={previewCode} 
                language={language} 
                height={splitView ? "100%" : "300px"} 
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
