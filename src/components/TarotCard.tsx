import React, { useState, useEffect } from 'react';

interface TarotCardProps {
  name: string;
  image: string;
  isRevealed?: boolean;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

const TarotCard: React.FC<TarotCardProps> = ({ 
  name, 
  image, 
  isRevealed = false, 
  onClick,
  size = 'medium'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const handleImageError = () => {
    console.error(`Failed to load image for card: ${name}`, image);
    setImageError(true);
  };

  // Responsive size mappings
  const getSizeStyles = () => {
    // Mobile sizes (under 640px)
    if (windowWidth < 640) {
      return {
        small: {
          height: '160px',
          width: '100px',
        },
        medium: {
          height: '180px',
          width: '110px',
        },
        large: {
          height: '200px',
          width: '120px',
        }
      }[size];
    }
    
    // Tablet sizes (640px - 1024px)
    if (windowWidth < 1024) {
      return {
        small: {
          height: '180px',
          width: '110px',
        },
        medium: {
          height: '220px',
          width: '130px',
        },
        large: {
          height: '240px',
          width: '140px',
        }
      }[size];
    }
    
    // Desktop sizes (1024px and up)
    return {
      small: {
        height: '200px',
        width: '120px',
      },
      medium: {
        height: '240px',
        width: '140px',
      },
      large: {
        height: '280px',
        width: '160px',
      }
    }[size];
  };
  
  return (
    <div 
      className={`relative cursor-pointer ${isHovered ? 'scale-105' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...getSizeStyles(),
        transition: 'transform 0.3s ease'
      }}
    >
      {/* Card face - shown when revealed */}
      {isRevealed && (
      <div 
          className="w-full h-full rounded-lg overflow-hidden"
        style={{
            boxShadow: '0 0 15px rgba(79, 70, 229, 0.3)'
        }}
      >
          {!imageError ? (
            <>
        <img 
          src={image} 
          alt={name}
                className="w-full h-full object-cover"
                onError={handleImageError}
        />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-1 text-center">
                <p className="text-white text-xs sm:text-sm font-medium card-title">{name}</p>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-4">
              <div className="text-center">
                <div className="text-2xl sm:text-4xl mb-2">✨</div>
                <p className="text-white text-xs sm:text-sm font-medium">{name}</p>
                <p className="text-white text-xs mt-2">Image failed to load</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Card back - shown when not revealed */}
      {!isRevealed && (
      <div 
          className="w-full h-full rounded-lg overflow-hidden"
        style={{
          background: 'linear-gradient(45deg, #1a1042 0%, #2a1b6b 50%, #1a1042 100%)',
          boxShadow: isHovered 
            ? '0 0 30px rgba(147, 51, 234, 0.5)' 
              : '0 0 15px rgba(79, 70, 229, 0.3)',
            border: '2px solid #4c1d95'
        }}
      >
          <div className="h-full w-full flex items-center justify-center">
            <div className="relative w-1/2 h-1/2 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full opacity-80"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-full flex items-center justify-center">
                <span className="text-purple-200 text-sm sm:text-xl">✨</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TarotCard;