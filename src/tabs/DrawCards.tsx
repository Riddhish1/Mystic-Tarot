import React, { useState, useEffect } from 'react';
import TarotCard from '../components/TarotCard';
import '../utils/animations.css';

// Import all tarot card images
import theFool from '../assets/images/tarot/the_fool.jpg';
import theMagician from '../assets/images/tarot/the_magician.jpg';
import theHighPriestess from '../assets/images/tarot/the_high_priestess.jpg';
import theEmpress from '../assets/images/tarot/the_empress.jpg';
import theEmperor from '../assets/images/tarot/the_emperor.jpg';
import theHierophant from '../assets/images/tarot/the_hierophant.jpg';
import strength from '../assets/images/tarot/strength.jpg';
import theHermit from '../assets/images/tarot/the_hermit.jpg';
import wheelOfFortune from '../assets/images/tarot/wheel_of_fortune.jpg';
import justice from '../assets/images/tarot/justice.jpg';
import theHangedMan from '../assets/images/tarot/the_hanged_man.jpg';
import death from '../assets/images/tarot/death.jpg';
import temperance from '../assets/images/tarot/temperance.jpg';
import theDevil from '../assets/images/tarot/the_devil.jpg';
import theTower from '../assets/images/tarot/the_tower.jpg';
import theStar from '../assets/images/tarot/the_star.jpg';
import theMoon from '../assets/images/tarot/the_moon.jpg';
import theSun from '../assets/images/tarot/the_sun.jpg';
import judgement from '../assets/images/tarot/judgement.jpg';
import theWorld from '../assets/images/tarot/the_world.jpg';
import THELOVERS from '../assets/images/tarot/THELOVERS.jpg';
import THECARRIOT from '../assets/images/tarot/THECARRIOT.jpg';

// Tarot card data with high-quality mystical images
const tarotDeck = [
  { id: 1, name: 'The Fool', image: theFool, meaning: 'New beginnings, innocence, spontaneity, free spirit' },
  { id: 2, name: 'The Magician', image: theMagician, meaning: 'Manifestation, resourcefulness, power, inspired action' },
  { id: 3, name: 'The High Priestess', image: theHighPriestess, meaning: 'Intuition, unconscious, inner voice, divine feminine' },
  { id: 4, name: 'The Empress', image: theEmpress, meaning: 'Femininity, beauty, nature, nurturing, abundance' },
  { id: 5, name: 'The Emperor', image: theEmperor, meaning: 'Authority, structure, control, fatherhood, stability' },
  { id: 6, name: 'The Hierophant', image: theHierophant, meaning: 'Tradition, conformity, morality, ethics, education' },
  { id: 7, name: 'The Lovers', image: THELOVERS, meaning: 'Love, harmony, relationships, values alignment, choices' },
  { id: 8, name: 'The Chariot', image: THECARRIOT, meaning: 'Control, willpower, success, action, determination' },
  { id: 9, name: 'Strength', image: strength, meaning: 'Courage, persuasion, influence, compassion, inner strength' },
  { id: 10, name: 'The Hermit', image: theHermit, meaning: 'Soul-searching, introspection, being alone, inner guidance' },
  { id: 11, name: 'Wheel of Fortune', image: wheelOfFortune, meaning: 'Good luck, karma, life cycles, destiny, a turning point' },
  { id: 12, name: 'Justice', image: justice, meaning: 'Justice, fairness, truth, cause and effect, law' },
  { id: 13, name: 'The Hanged Man', image: theHangedMan, meaning: 'Surrender, letting go, new perspectives, enlightenment' },
  { id: 14, name: 'Death', image: death, meaning: 'Endings, change, transformation, transition' },
  { id: 15, name: 'Temperance', image: temperance, meaning: 'Balance, moderation, patience, finding meaning' },
  { id: 16, name: 'The Devil', image: theDevil, meaning: 'Shadow self, attachment, addiction, restriction, sexuality' },
  { id: 17, name: 'The Tower', image: theTower, meaning: 'Sudden change, upheaval, chaos, revelation, awakening' },
  { id: 18, name: 'The Star', image: theStar, meaning: 'Hope, faith, purpose, renewal, spirituality' },
  { id: 19, name: 'The Moon', image: theMoon, meaning: 'Illusion, fear, anxiety, subconscious, intuition' },
  { id: 20, name: 'The Sun', image: theSun, meaning: 'Positivity, fun, warmth, success, vitality' },
  { id: 21, name: 'Judgement', image: judgement, meaning: 'Rebirth, inner calling, absolution' },
  { id: 22, name: 'The World', image: theWorld, meaning: 'Completion, integration, accomplishment, travel' },
];

const DrawCards: React.FC = () => {
  const [shuffledDeck, setShuffledDeck] = useState<typeof tarotDeck>([]);
  const [selectedCards, setSelectedCards] = useState<typeof tarotDeck>([]);
  const [drawStage, setDrawStage] = useState<'initial' | 'shuffling' | 'selecting' | 'revealing'>('initial');
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
  const [cardsToSelect, setCardsToSelect] = useState(3);
  const [isShuffling, setIsShuffling] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLandscape, setIsLandscape] = useState(false);
  
  // Handle orientations
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsLandscape(window.innerHeight < window.innerWidth && window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    console.log("Tarot deck size:", tarotDeck.length);
    console.log("Sample image paths:", {
      theFool,
      theMagician,
      THELOVERS,
      THECARRIOT
    });
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Helper function to calculate fan angle based on screen size
  const getFanDegrees = (index: number) => {
    if (windowWidth < 480) {
      // Very small screens - narrow fan
      return -40 + (index * 4);
    } else if (windowWidth < 768) {
      // Mobile - narrower fan
      return -50 + (index * 5);
    } else if (windowWidth < 1024) {
      // Tablet - medium fan
      return -60 + (index * 6);
    } else {
      // Desktop - wide fan
      return -70 + (index * 7);
    }
  };
  
  const shuffleDeck = () => {
    setIsShuffling(true);
    setDrawStage('shuffling');
    
    // Create shuffling animation with multiple steps
    const shuffleSteps = 5; // Increase steps for longer animation
    let currentStep = 0;
    
    const performShuffle = () => {
      // Make a copy of the tarot deck and shuffle it
      const newDeck = [...tarotDeck];
      
      // Fisher-Yates shuffle algorithm
      for (let i = newDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
      }
      
      console.log("Shuffled deck length:", newDeck.length);
      setShuffledDeck(newDeck);
      
      currentStep++;
      if (currentStep < shuffleSteps) {
        setTimeout(performShuffle, 400);
      } else {
        setTimeout(() => {
          setIsShuffling(false);
          setDrawStage('selecting');
        }, 600);
      }
    };
    
    performShuffle();
  };
  
  const selectCard = (card: (typeof tarotDeck)[0]) => {
    if (selectedCards.length < cardsToSelect && drawStage === 'selecting') {
      setSelectedCards(prev => [...prev, card]);
      
      if (selectedCards.length === cardsToSelect - 1) {
        setTimeout(() => {
          setDrawStage('revealing');
          // Automatically reveal all cards
          setRevealedIndices([0, 1, 2]);
        }, 800);
      }
    }
  };
  
  const revealCard = (index: number) => {
    if (drawStage === 'revealing' && !revealedIndices.includes(index)) {
      setRevealedIndices(prev => [...prev, index]);
    }
  };
  
  const resetReading = () => {
    setShuffledDeck([]);
    setSelectedCards([]);
    setDrawStage('initial');
    setRevealedIndices([]);
  };
  
  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 md:px-8 min-h-screen pb-20" style={{ 
      background: '#2b1055',
      borderRadius: '12px',
    }}>
      {/* Landscape mode notice */}
      {isLandscape && (
        <div className="tarot-landscape-notice">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12" y2="18" />
          </svg>
          <p>For the best tarot experience, please rotate your device to portrait mode</p>
          <button
            onClick={() => setIsLandscape(false)}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-full text-sm"
          >
            Continue in Landscape
          </button>
        </div>
      )}
      
      <div className="text-center mb-4 sm:mb-8 pt-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 header-text">TAROT</h2>
        <p className="text-lg md:text-xl text-indigo-200 mb-4 md:mb-6">Thinking about your question</p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center mb-6">
          <div className="text-2xl sm:text-3xl md:text-5xl text-white font-light header-text mb-2 sm:mb-0">Select</div>
          <div className="mx-2 sm:mx-4 border-2 border-amber-400 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center my-2 sm:my-0">
            <span className="text-2xl md:text-4xl text-white">{cardsToSelect}</span>
          </div>
          <div className="text-2xl sm:text-3xl md:text-5xl text-white font-light header-text">cards</div>
        </div>
      </div>
      
      {drawStage === 'initial' && (
        <div className="text-center p-6 md:p-10 backdrop-blur-sm rounded-xl">
          <button
            onClick={shuffleDeck}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg sm:text-xl font-medium rounded-full hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-purple-700/30 transition-all duration-300 transform hover:scale-105"
          >
            SHUFFLE
          </button>
        </div>
      )}
      
      {drawStage === 'shuffling' && (
        <div className="relative flex items-center justify-center h-[220px] sm:h-[300px] md:h-[400px] mb-6 sm:mb-10">
          <div className="absolute w-full h-full flex items-center justify-center">
            {Array.from({ length: windowWidth < 480 ? 15 : 21 }).map((_, index) => (
              <div 
                key={index}
                className="absolute animate-card-shuffle"
                style={{
                  animation: `card-shuffle 0.8s ease-in-out ${index * 0.05}s infinite alternate`,
                  transform: `rotate(${getFanDegrees(index)}deg) translateY(5px)`,
                  transformOrigin: 'bottom center',
                  zIndex: index
                }}
              >
                <div className="w-[80px] h-[120px] sm:w-[100px] sm:h-[150px] md:w-[140px] md:h-[210px] rounded-lg border-2 border-purple-500 bg-indigo-900 shadow-lg">
                  <div className="w-full h-full flex items-center justify-center bg-[#2a1b6b] rounded-lg bg-opacity-90">
                    <div className="text-purple-200 text-xl opacity-60">✨</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {drawStage === 'selecting' && (
        <div>
          <p className="text-center text-indigo-200 mb-4">
            Select {cardsToSelect} cards for your reading ({selectedCards.length}/{cardsToSelect} selected)
          </p>
           
          {shuffledDeck.length === 0 ? (
            <div className="text-center p-6 backdrop-blur-sm rounded-xl shadow-lg">
              <p className="text-indigo-200">No cards to display. Please try shuffling again.</p>
              <button
                onClick={shuffleDeck}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-md shadow-lg"
              >
                Shuffle Again
              </button>
            </div>
          ) : (
            <div className="relative p-4 sm:p-8 backdrop-blur-sm rounded-xl shadow-lg">
              {/* Card fan display like the image shown */}
              <div className="relative flex items-center justify-center h-[220px] sm:h-[300px] md:h-[400px] mb-6 sm:mb-10">
                <div className="absolute w-full h-full flex items-center justify-center">
                  {shuffledDeck.slice(0, windowWidth < 480 ? 15 : 21).map((card, index) => (
              <div 
                key={card.id} 
                      className="absolute cursor-pointer hover:translate-y-[-15px] transition-transform duration-300"
                      style={{
                        transform: `rotate(${getFanDegrees(index)}deg)`,
                        transformOrigin: 'bottom center',
                        zIndex: index,
                        transition: 'transform 0.3s ease, z-index 0.3s ease'
                      }}
                onClick={() => selectCard(card)}
              >
                <TarotCard 
                  name={card.name} 
                  image={card.image} 
                  isRevealed={false} 
                        size="small" 
                />
              </div>
            ))}
          </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {(drawStage === 'revealing' || selectedCards.length > 0) && (
        <div className="mt-6 sm:mt-10">
          <h2 className="text-xl sm:text-2xl font-normal text-white mb-6 sm:mb-8 text-center header-text">Your Reading</h2>
          
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:gap-x-10 max-w-4xl mx-auto">
            {selectedCards.map((card, index) => (
              <div 
                key={card.id} 
                className="flex flex-col items-center mb-8 md:mb-0"
              >
                {index === 0 && revealedIndices.includes(0) && (
                  <div className="text-center mb-3 sm:mb-4 px-2">
                    <div className="text-white text-base sm:text-lg mb-1 time-position">Past</div>
                    <div className="text-white font-medium text-lg sm:text-xl card-title">{card.name}</div>
                    <div className="text-gray-300 text-xs sm:text-sm mt-2 sm:mt-3 card-meaning">
                      {card.meaning}
                    </div>
                    <div className="text-gray-400 text-xs mt-3 sm:mt-4 w-full max-w-[250px] mx-auto">
                      What brought you to this moment. The foundation of your journey.
                    </div>
                  </div>
                )}
                
                {index === 1 && revealedIndices.includes(1) && (
                  <div className="text-center mb-3 sm:mb-4 px-2">
                    <div className="text-white text-base sm:text-lg mb-1 time-position">Present</div>
                    <div className="text-white font-medium text-lg sm:text-xl card-title">{card.name}</div>
                    <div className="text-gray-300 text-xs sm:text-sm mt-2 sm:mt-3 card-meaning">
                      {card.meaning}
                    </div>
                    <div className="text-gray-400 text-xs mt-3 sm:mt-4 w-full max-w-[250px] mx-auto">
                      Your current situation and the energies surrounding you now.
                    </div>
                  </div>
                )}
                
                {index === 2 && revealedIndices.includes(2) && (
                  <div className="text-center mb-3 sm:mb-4 px-2">
                    <div className="text-white text-base sm:text-lg mb-1 time-position">Future</div>
                    <div className="text-white font-medium text-lg sm:text-xl card-title">{card.name}</div>
                    <div className="text-gray-300 text-xs sm:text-sm mt-2 sm:mt-3 card-meaning">
                      {card.meaning}
                    </div>
                    <div className="text-gray-400 text-xs mt-3 sm:mt-4 w-full max-w-[250px] mx-auto">
                      Potential outcomes based on your current path.
                    </div>
                  </div>
                )}
                
                <div 
                  className="border-4 border-black rounded-lg shadow-xl hover:shadow-purple-600/30 transition-all duration-300 mx-auto"
                  onClick={() => revealCard(index)}
              >
                <TarotCard 
                  name={card.name} 
                  image={card.image} 
                  isRevealed={revealedIndices.includes(index)} 
                    size="large"
                />
                </div>
              </div>
            ))}
          </div>
          
          {revealedIndices.length === cardsToSelect && (
            <div className="mt-8 sm:mt-12 text-center">
              <button
                onClick={resetReading}
                className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-purple-700/30 transition-all duration-300 transform hover:scale-105 header-text"
              >
                Start New Reading
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DrawCards;