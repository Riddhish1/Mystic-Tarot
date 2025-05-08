import React, { useState } from 'react';
import { Chatbot } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import '../chatbot/chatbot.css';
import config from '../chatbot/BotConfig.jsx';
import MessageParser from '../chatbot/MessageParser.jsx';
import ActionProvider from '../chatbot/ActionProvider.jsx';

const ChatbotTab = () => {
  const [activeExample, setActiveExample] = useState(null);
  
  const examples = [
    { id: 1, question: "Tell me about The Moon card", description: "Learn about specific cards" },
    { id: 2, question: "What do the Major Arcana represent?", description: "Understand Tarot concepts" },
    { id: 3, question: "Draw three cards for me", description: "Get a quick reading" },
    { id: 4, question: "Explain tarot spreads", description: "Learn about reading methods" }
  ];
  
  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 md:px-8 py-6 min-h-screen">
      <div className="text-center mb-8">
        <div className="mb-4 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-xl opacity-70"></div>
            <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-purple-700/30 flex items-center justify-center">
              <span className="text-white text-4xl">✨</span>
            </div>
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 header-text bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-indigo-300">LUNA</h2>
        <p className="text-xl md:text-2xl text-indigo-200 mb-6">Your Mystical Tarot Assistant</p>
      </div>
      
      <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl shadow-xl p-4 md:p-8 max-w-3xl mx-auto border border-indigo-500/20">
        <div className="mb-8 text-center">
          <p className="text-indigo-200 mb-6 text-lg px-4">
            Luna can help you understand Tarot cards, guide you through readings, 
            and provide mystical insights on your journey.
          </p>
          
          <div className="text-indigo-300 text-sm mb-6 bg-indigo-900/50 p-5 rounded-lg max-w-xl mx-auto">
            <p className="mb-3 font-semibold text-base text-indigo-100">Try asking Luna:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {examples.map(example => (
                <div 
                  key={example.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-300 text-left
                              ${activeExample === example.id 
                                ? 'bg-gradient-to-r from-purple-700/70 to-indigo-700/70 text-white shadow-md' 
                                : 'bg-indigo-800/40 hover:bg-indigo-800/60'}`}
                  onClick={() => setActiveExample(example.id)}
                >
                  <p className="font-medium">{example.question}</p>
                  <p className="text-xs mt-1 opacity-80">{example.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="chatbot-container mb-6 rounded-lg overflow-hidden backdrop-blur-sm" style={{ height: '500px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            placeholderText={activeExample ? examples.find(e => e.id === activeExample)?.question : "Ask Luna about Tarot..."}
            runInitialMessagesWithClientTimeout
          />
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-indigo-300 text-sm">
            <span className="text-purple-400">⋆｡°✩</span> Luna is a mystical assistant powered by ancient wisdom (and a bit of code magic) <span className="text-purple-400">✩°｡⋆</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotTab; 