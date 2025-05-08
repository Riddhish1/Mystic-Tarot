import React from 'react';
import tarotLogo from '../assets/images/tarot-logo.svg';

interface TarotLogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
  className?: string;
}

const TarotLogo: React.FC<TarotLogoProps> = ({ 
  size = 'md', 
  withText = true,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={tarotLogo} 
        alt="Tarot Logo" 
        className={`${sizeClasses[size]} transition-all duration-300 hover:rotate-12`} 
      />
      {withText && (
        <h2 className="ml-2 text-white font-bold header-text" style={{ 
          fontSize: size === 'sm' ? '1rem' : size === 'md' ? '1.25rem' : '1.5rem'
        }}>
          TAROT
        </h2>
      )}
    </div>
  );
};

export default TarotLogo; 