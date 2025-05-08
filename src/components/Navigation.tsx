import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, LogOut, Home, BookOpen, History, Sparkles, MessageCircle } from 'lucide-react';
import TarotLogo from './TarotLogo';

interface NavigationProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onChangeTab }) => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'draw-cards', label: 'Draw Cards', icon: <Sparkles size={20} /> },
    { id: 'previous-readings', label: 'Previous Readings', icon: <History size={20} /> },
    { id: 'about', label: 'About Tarot', icon: <BookOpen size={20} /> },
    { id: 'luna', label: 'Luna', icon: <MessageCircle size={20} /> },
  ];
  
  return (
    <nav className={`${isDarkMode ? 'bg-gradient-to-r from-indigo-900 to-purple-900' : 'bg-gradient-to-r from-indigo-100 to-purple-100'} shadow-lg transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <TarotLogo size={isDarkMode ? "md" : "sm"} withText={true} />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onChangeTab(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-2
                          ${activeTab === item.id 
                              ? isDarkMode 
                                ? 'bg-indigo-800 text-white' 
                                : 'bg-indigo-200 text-indigo-900'
                              : isDarkMode
                                ? 'text-indigo-200 hover:bg-indigo-800/50 hover:text-white'
                                : 'text-indigo-700 hover:bg-indigo-200/50 hover:text-indigo-900'}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode 
                  ? 'hover:bg-indigo-800/50 text-indigo-200 hover:text-white' 
                  : 'hover:bg-indigo-200/50 text-indigo-700 hover:text-indigo-900'
              }`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className={`border-l h-8 mx-2 ${isDarkMode ? 'border-indigo-700' : 'border-indigo-300'}`}></div>
            
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${isDarkMode ? 'text-indigo-200' : 'text-indigo-700'}`}>
                Welcome, {user?.name || 'Mystic'}
              </span>
              <button
                onClick={logout}
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode 
                    ? 'text-indigo-200 hover:text-white hover:bg-indigo-800/50' 
                    : 'text-indigo-700 hover:text-indigo-900 hover:bg-indigo-200/50'
                }`}
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${
                isDarkMode 
                  ? 'text-indigo-200 hover:text-white hover:bg-indigo-800/50' 
                  : 'text-indigo-700 hover:text-indigo-900 hover:bg-indigo-200/50'
              }`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden ${isDarkMode ? 'bg-indigo-900/95' : 'bg-indigo-100/95'} backdrop-blur-sm`}>
          <div className={`px-5 py-3 border-b ${isDarkMode ? 'border-indigo-800' : 'border-indigo-200'}`}>
            <TarotLogo size="sm" withText={true} />
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onChangeTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-3 py-2 rounded-md text-base font-medium transition-all duration-300
                          ${activeTab === item.id 
                              ? isDarkMode 
                                ? 'bg-indigo-800 text-white' 
                                : 'bg-indigo-200 text-indigo-900'
                              : isDarkMode
                                ? 'text-indigo-200 hover:bg-indigo-800/50 hover:text-white'
                                : 'text-indigo-700 hover:bg-indigo-200/50 hover:text-indigo-900'}`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
          
          <div className={`pt-4 pb-3 border-t ${isDarkMode ? 'border-indigo-800' : 'border-indigo-200'}`}>
            <div className="flex items-center justify-between px-5">
              <div className="flex items-center">
                <div className="ml-3">
                  <div className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-indigo-900'}`}>
                    {user?.name || 'Mystic'}
                  </div>
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
                    {user?.email}
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode 
                      ? 'text-indigo-200 hover:text-white hover:bg-indigo-800' 
                      : 'text-indigo-700 hover:text-indigo-900 hover:bg-indigo-200'
                  }`}
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                  onClick={logout}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode 
                      ? 'text-indigo-200 hover:text-white hover:bg-indigo-800' 
                      : 'text-indigo-700 hover:text-indigo-900 hover:bg-indigo-200'
                  }`}
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;