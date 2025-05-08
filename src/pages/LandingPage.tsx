import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AnimatedBackground from '../components/AnimatedBackground';
import TarotLogo from '../components/TarotLogo';
import '../utils/animations.css';

// Import a few tarot card images for the preview
import theSun from '../assets/images/tarot/the_sun.jpg';
import theMoon from '../assets/images/tarot/the_moon.jpg';
import theStar from '../assets/images/tarot/the_star.jpg';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Check if already authenticated
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    
    // Trigger entrance animations
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#2b1055]">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#2b1055]/90 to-transparent z-10"></div>
      
      <header className="relative z-20 pt-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <TarotLogo />
          <nav>
            <button 
              onClick={() => navigate('/login')}
              className="text-indigo-200 hover:text-white hover:underline transition-colors"
            >
              Sign In
            </button>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        {/* Left Side: Text Content */}
        <div 
          className={`max-w-lg w-full text-center md:text-left mb-12 md:mb-0 md:mr-8 transition-all duration-1000 transform 
                    ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <h1 
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl mb-4 header-text"
            style={{ textShadow: '0 0 20px rgba(129, 140, 248, 0.5)' }}
          >
            Unveil Your Destiny
          </h1>
          
          <p 
            className="mt-3 text-base text-indigo-200 sm:mt-5 sm:text-xl mb-8 max-w-2xl"
            style={{ textShadow: '0 0 10px rgba(129, 140, 248, 0.3)' }}
          >
            Discover insights into your past, present, and future through the ancient wisdom of tarot.
            Our mystical cards reveal the paths that lie ahead in your journey.
          </p>
          
          <div 
            className={`mt-6 transition-all duration-1000 delay-300 transform 
                      ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 md:text-lg shadow-lg shadow-purple-700/30 transition-all duration-300 transform hover:scale-105"
            >
              Begin Your Reading
            </button>
          </div>
          
          <div 
            className={`mt-6 flex flex-wrap justify-center md:justify-start space-x-0 space-y-2 sm:space-x-4 sm:space-y-0 transition-all duration-1000 delay-600 transform 
                      ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2 text-indigo-200">Personalized readings</span>
            </div>
            
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2 text-indigo-200">Mystical interpretations</span>
            </div>
          </div>
        </div>
        
        {/* Right Side: Cards Preview */}
        <div 
          className={`relative w-full max-w-sm h-[360px] transition-all duration-1000 delay-500 transform 
                    ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
        >
          {/* Animated cards */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 animate-float" style={{ animationDelay: '0.1s' }}>
            <div className="w-[160px] h-[240px] rounded-lg overflow-hidden border-4 border-black shadow-2xl transform -rotate-12">
              <img src={theSun} alt="The Sun" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-1 text-center">
                <p className="text-white text-sm card-title">THE SUN</p>
              </div>
            </div>
          </div>
          
          <div className="absolute top-10 left-1/2 -translate-x-1/2 -ml-20 z-0 animate-float" style={{ animationDelay: '0.5s' }}>
            <div className="w-[160px] h-[240px] rounded-lg overflow-hidden border-4 border-black shadow-2xl transform -rotate-6">
              <img src={theStar} alt="The Star" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-1 text-center">
                <p className="text-white text-sm card-title">THE STAR</p>
              </div>
            </div>
          </div>
          
          {/* Cosmic dust/particles effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-purple-400 animate-ping"></div>
            <div className="absolute top-3/4 left-2/3 w-2 h-2 rounded-full bg-indigo-400 animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-purple-400 animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </main>
      
      {/* Features Section */}
      <section className="py-12 px-4 sm:px-6 bg-indigo-900/30 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12 header-text">Experience the Mystical Journey</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`bg-indigo-800/20 p-6 rounded-xl backdrop-blur-sm transition-all duration-1000 delay-300 transform 
                          ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Past</h3>
              <p className="text-indigo-200">Uncover the events and influences from your past that have shaped your current reality.</p>
            </div>
            
            <div className={`bg-indigo-800/20 p-6 rounded-xl backdrop-blur-sm transition-all duration-1000 delay-400 transform 
                          ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Present</h3>
              <p className="text-indigo-200">Gain clarity on your current situation and the energies surrounding you now.</p>
            </div>
            
            <div className={`bg-indigo-800/20 p-6 rounded-xl backdrop-blur-sm transition-all duration-1000 delay-500 transform 
                          ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Future</h3>
              <p className="text-indigo-200">Glimpse potential outcomes and opportunities that await you on your journey ahead.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className={`py-16 px-4 sm:px-6 text-center relative z-10 transition-all duration-1000 delay-700 transform 
                        ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 header-text">Ready to discover what the cards reveal?</h2>
          <p className="text-indigo-200 mb-8">Begin your mystical journey and unlock the ancient wisdom of tarot cards.</p>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 md:text-lg shadow-lg shadow-purple-700/30 transition-all duration-300 transform hover:scale-105"
          >
            Start Your Reading
          </button>
        </div>
      </section>
      
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#2b1055]/90 to-transparent z-10"></div>
      <footer className="py-6 px-4 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <TarotLogo size="sm" />
            <p className="text-indigo-300 text-sm ml-2">© {new Date().getFullYear()} Mystic Tarot • All mystical rights reserved</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-indigo-300 hover:text-white transition-colors text-sm">Privacy</a>
            <a href="#" className="text-indigo-300 hover:text-white transition-colors text-sm">Terms</a>
            <a href="#" className="text-indigo-300 hover:text-white transition-colors text-sm">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;