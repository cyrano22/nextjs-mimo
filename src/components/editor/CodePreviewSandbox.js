"use client";

import { useState, useEffect } from 'react';

export default function CodePreviewSandbox({ code, language = 'jsx', height = '300px' }) {
  const [iframeKey, setIframeKey] = useState(Date.now());
  const [error, setError] = useState(null);

  // Mettre à jour automatiquement la prévisualisation quand le code change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setIframeKey(Date.now());
    }, 800); // Délai pour éviter trop de rafraîchissements
    
    return () => clearTimeout(debounceTimer);
  }, [code]);
  
  // Fonction pour rafraîchir manuellement la prévisualisation
  const refreshPreview = () => {
    setIframeKey(Date.now());
  };

  // Contenu HTML pour l'iframe
  const getIframeContent = () => {
    let htmlContent = '';
    
    try {
      if (language === 'html') {
        // Pour le HTML pur
        htmlContent = code;
      } else if (language === 'jsx') {
        // Pour le JSX/React, on l'enveloppe dans une structure HTML
        htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
              <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
              <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                  margin: 0;
                  padding: 16px;
                  color: #333;
                }
              </style>
            </head>
            <body>
              <div id="root"></div>
              <script type="text/babel">
                try {
                  ${code}
                  
                  // Rendu du composant React
                  const rootElement = document.getElementById('root');
                  ReactDOM.render(React.createElement(App), rootElement);
                } catch (error) {
                  document.getElementById('root').innerHTML = '<div style="color: red; border: 1px solid red; padding: 8px; border-radius: 4px;">Erreur: ' + error.message + '</div>';
                  console.error(error);
                }
              </script>
            </body>
          </html>
        `;
      } else if (language === 'css') {
        // Pour le CSS, on crée une page avec des éléments de démonstration
        htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                ${code}
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Exemple de titre</h1>
                <p>Ceci est un paragraphe pour tester votre CSS.</p>
                <button>Bouton d'exemple</button>
                <div class="box">Boîte de démonstration</div>
              </div>
            </body>
          </html>
        `;
      } else if (language === 'javascript') {
        // Pour le JavaScript pur
        htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                  margin: 0;
                  padding: 16px;
                  color: #333;
                }
                #output {
                  border: 1px solid #e2e8f0;
                  border-radius: 4px;
                  padding: 12px;
                  margin-top: 16px;
                  min-height: 100px;
                  background-color: #f8f9fa;
                }
                .error {
                  color: red;
                  border: 1px solid red;
                  padding: 8px;
                  border-radius: 4px;
                }
              </style>
            </head>
            <body>
              <h3>Sortie JavaScript:</h3>
              <div id="output"></div>
              <script>
                // Rediriger console.log vers notre div de sortie
                const output = document.getElementById('output');
                const originalConsoleLog = console.log;
                const originalConsoleError = console.error;
                
                console.log = function(...args) {
                  originalConsoleLog.apply(console, args);
                  const message = args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg
                  ).join(' ');
                  const logElement = document.createElement('div');
                  logElement.textContent = message;
                  output.appendChild(logElement);
                };
                
                console.error = function(...args) {
                  originalConsoleError.apply(console, args);
                  const message = args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg
                  ).join(' ');
                  const errorElement = document.createElement('div');
                  errorElement.className = 'error';
                  errorElement.textContent = 'Erreur: ' + message;
                  output.appendChild(errorElement);
                };
                
                try {
                  ${code}
                } catch (error) {
                  console.error(error.message);
                }
              </script>
            </body>
          </html>
        `;
      }
      
      return htmlContent;
    } catch (err) {
      setError(err.message);
      return `
        <!DOCTYPE html>
        <html>
          <body>
            <div style="color: red; border: 1px solid red; padding: 8px; border-radius: 4px;">
              Erreur: ${err.message}
            </div>
          </body>
        </html>
      `;
    }
  };

  return (
    <div className="code-preview-sandbox">
      <div className="bg-gray-100 px-4 py-2 flex justify-between items-center rounded-t-md border border-gray-300">
        <span className="font-medium">Prévisualisation</span>
        <div className="flex items-center space-x-2">
          <div className="text-xs text-gray-500">
            Auto-refresh {code ? 'activé' : 'désactivé'}
          </div>
          <button 
            onClick={refreshPreview}
            className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Rafraîchir
          </button>
        </div>
      </div>
      
      <div className="border border-gray-300 border-t-0 rounded-b-md overflow-hidden relative" style={{ height }}>
        {/* Indicateur de chargement */}
        <div 
          className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center transition-opacity duration-200"
          style={{ opacity: iframeKey === Date.now() ? 1 : 0, pointerEvents: iframeKey === Date.now() ? 'auto' : 'none' }}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </div>
        
        <iframe
          key={iframeKey}
          srcDoc={getIframeContent()}
          title="Prévisualisation du code"
          className="w-full h-full border-none"
          sandbox="allow-scripts"
        />
      </div>
      
      {error && (
        <div className="mt-2 p-3 bg-red-100 text-red-800 rounded-md animate-pulse">
          {error}
        </div>
      )}
    </div>
  );
}
