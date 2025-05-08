import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';
import AnimatedBackground from '../components/AnimatedBackground';

const LoginPage: React.FC = () => {
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
  
  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      
      <main className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div 
          className={`transition-all duration-1000 transform 
                    ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="mb-6 sm:mb-10 text-center">
            <h1 
              className="text-3xl font-bold text-white"
              style={{ textShadow: '0 0 20px rgba(129, 140, 248, 0.5)' }}
            >
              Welcome to Mystic Tarot
            </h1>
            <p className="mt-2 text-indigo-300">
              Enter your credentials to access your mystical journey
            </p>
          </div>
          
          <LoginForm onSuccess={handleLoginSuccess} />
          
          <p 
            className={`mt-8 text-center text-sm text-indigo-300 transition-all duration-1000 delay-300 transform 
                      ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            <button
              onClick={() => navigate('/')}
              className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              ← Return to home
            </button>
          </p>
        </div>
      </main>
      
      <footer className="py-4 text-center text-sm text-indigo-300">
        <p>© {new Date().getFullYear()} Mystic Tarot • All mystical rights reserved</p>
      </footer>
    </div>
  );
};

export default LoginPage;