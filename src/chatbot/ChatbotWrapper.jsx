import React, { useState, useEffect } from 'react';
import { Chatbot } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './chatbot.css';
import config from './BotConfig.jsx';
import MessageParser from './MessageParser.jsx';
import ActionProvider from './ActionProvider.jsx';

const ChatbotWrapper = () => {
  const [showBot, setShowBot] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleBot = () => {
    setIsAnimating(true);
    setShowBot(prev => !prev);
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  // Reset position to fixed bottom right
  useEffect(() => {
    // Add clean-up logic if needed
    return () => {
      // Clean-up
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {showBot && (
        <div 
          className={`chatbot-container mb-4 shadow-xl rounded-lg overflow-hidden bg-gray-900/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${isAnimating ? 'scale-95 opacity-90' : 'scale-100 opacity-100'}`} 
          style={{ width: '350px', maxHeight: '500px', borderTop: '3px solid rgb(139, 92, 246)' }}
        >
          <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white p-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo-500/40 flex items-center justify-center mr-2">
                <span className="text-white text-sm">✨</span>
              </div>
              <h3 className="font-medium text-md header-text">Luna • Mystical Assistant</h3>
            </div>
            <button 
              onClick={toggleBot}
              className="text-white p-1 hover:bg-purple-600/50 rounded-full transition-colors"
              aria-label="Close chatbot"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="chatbot-content">
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
              placeholderText="Ask me about Tarot..."
              disableScrollToBottom={false}
              runInitialMessagesWithClientTimeout
            />
          </div>
        </div>
      )}
      
      {!showBot && (
        <button
          onClick={toggleBot}
          className={`bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 flex items-center ${isAnimating ? 'scale-90' : 'scale-100'}`}
          aria-label="Open Luna chatbot"
        >
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-400"></span>
            </span>
          </div>
          <span className="ml-2 font-medium">Luna</span>
          <span className="ml-1">✨</span>
        </button>
      )}
    </div>
  );
};

export default ChatbotWrapper; 