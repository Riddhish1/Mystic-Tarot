import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';
import AnimatedBackground from '../components/AnimatedBackground';
import TarotCard from '../components/TarotCard';
import theFool from '../assets/images/tarot/the_fool.jpg';
import theMagician from '../assets/images/tarot/the_magician.jpg';
import theEmpress from '../assets/images/tarot/the_empress.jpg';
import theEmperor from '../assets/images/tarot/the_emperor.jpg';
import ChatbotWrapper from '../chatbot/ChatbotWrapper';
import SimpleChatbot from '../chatbot/SimpleChatbot';

// Import tabs content
import DrawCards from '../tabs/DrawCards';
import PreviousReadings from '../tabs/PreviousReadings';
import AboutTarot from '../tabs/AboutTarot';
import ChatbotTab from '../tabs/ChatbotTab';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [useFallbackBot, setUseFallbackBot] = useState(false);
  
  useEffect(() => {
    // Check if authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
    
    // Trigger entrance animations
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Check if react-chatbot-kit is available
    try {
      require('react-chatbot-kit');
    } catch (error) {
      console.error('Error loading chatbot library:', error);
      setUseFallbackBot(true);
    }
  }, [isAuthenticated, navigate]);
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'draw-cards':
        return <DrawCards />;
      case 'previous-readings':
        return <PreviousReadings />;
      case 'about':
        return <AboutTarot />;
      case 'luna':
        return <ChatbotTab />;
      default:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-white">Welcome, {user?.name || 'Mystic'}</h2>
            <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">
              Your journey into the mystical world of Tarot begins here. 
              Explore the ancient wisdom and discover insights about your path.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { name: 'The Fool', image: theFool },
                { name: 'The Magician', image: theMagician },
                { name: 'The Empress', image: theEmpress },
                { name: 'The Emperor', image: theEmperor }
              ].map((card, index) => (
                <div 
                  key={card.name} 
                  className={`transition-all duration-700 delay-${index * 100} transform 
                            ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                >
                  <TarotCard 
                    name={card.name} 
                    image={card.image} 
                    isRevealed={true}
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setActiveTab('draw-cards')}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-md hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-purple-700/30 transition-all duration-300 transform hover:scale-105"
              >
                Begin a New Reading
              </button>
              <button
                onClick={() => setActiveTab('luna')}
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium rounded-md hover:from-violet-500 hover:to-fuchsia-500 shadow-lg shadow-fuchsia-700/30 transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                <span className="mr-2">Ask Luna</span>
                <span>✨</span>
              </button>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <AnimatedBackground />
      
      <Navigation activeTab={activeTab} onChangeTab={setActiveTab} />
      
      <main className="flex-grow">
        <div 
          className={`container mx-auto px-4 py-8 sm:px-6 lg:px-8 transition-all duration-500 transform 
                    ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          {renderTabContent()}
        </div>
      </main>
      
      <footer className="py-4 text-center text-sm text-indigo-300 border-t border-indigo-900/50">
        <p>© {new Date().getFullYear()} Mystic Tarot • All mystical rights reserved</p>
      </footer>
      
      {/* Floating chatbot widget - always visible */}
      {useFallbackBot ? (
        <div className="fixed bottom-4 right-4 z-50">
          <SimpleChatbot />
        </div>
      ) : (
        <ChatbotWrapper />
      )}
    </div>
  );
};

export default Dashboard;