import React, { useState } from 'react';

// Mock previous readings data
const mockReadings = [
  { 
    id: 1, 
    date: '2025-04-12', 
    question: 'Career Guidance',
    cards: ['The Empress', 'The Hierophant', 'The Sun'],
    summary: 'A period of growth and abundance is coming. Trust in structure and authority figures to guide you, leading to success and joy.'
  },
  { 
    id: 2, 
    date: '2025-04-05', 
    question: 'Relationship Advice',
    cards: ['The Lovers', 'The Hanged Man', 'The Star'],
    summary: 'Your relationship requires patience and a new perspective. Have hope, as positive renewal awaits.'
  },
  { 
    id: 3, 
    date: '2025-03-29', 
    question: 'Life Direction',
    cards: ['The Fool', 'Death', 'The Wheel of Fortune'],
    summary: 'Take a leap of faith into a new beginning. Let go of the past, as fate is bringing positive change your way.'
  }
];

const PreviousReadings: React.FC = () => {
  const [expandedReading, setExpandedReading] = useState<number | null>(null);
  
  const toggleExpand = (id: number) => {
    setExpandedReading(expandedReading === id ? null : id);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Your Previous Readings</h2>
        <p className="text-indigo-200">Revisit insights from your past tarot journeys</p>
      </div>
      
      {mockReadings.length === 0 ? (
        <div className="text-center p-10 bg-indigo-900/30 backdrop-blur-sm rounded-xl shadow-lg border border-indigo-800/50">
          <p className="text-lg text-indigo-100">
            You haven't had any readings yet. Start your first reading to begin your journey.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {mockReadings.map((reading) => (
            <div 
              key={reading.id}
              className="p-6 bg-indigo-900/30 backdrop-blur-sm rounded-xl shadow-lg border border-indigo-800/50 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-white">{reading.question}</h3>
                  <p className="text-indigo-300 text-sm">
                    {new Date(reading.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <button
                  onClick={() => toggleExpand(reading.id)}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  {expandedReading === reading.id ? 'Collapse' : 'Expand'}
                </button>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {reading.cards.map((card, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-800/50 text-indigo-200"
                  >
                    {card}
                  </span>
                ))}
              </div>
              
              {expandedReading === reading.id && (
                <div className="mt-4 pt-4 border-t border-indigo-800/50 animate-fadeIn">
                  <h4 className="text-lg font-medium text-white mb-2">Reading Summary</h4>
                  <p className="text-indigo-200">{reading.summary}</p>
                  
                  <div className="mt-4 pt-4 border-t border-indigo-800/50">
                    <h4 className="text-lg font-medium text-white mb-2">Card Interpretation</h4>
                    <div className="space-y-3">
                      {reading.cards.map((card, index) => (
                        <div key={index}>
                          <h5 className="font-medium text-indigo-100">{card}</h5>
                          <p className="text-indigo-300 text-sm">
                            {index === 0 
                              ? 'Represents your past: The foundation and influences leading to your current situation.'
                              : index === 1 
                                ? 'Represents your present: Current energies and challenges you\'re facing right now.' :
                                'Represents your future: Potential outcomes based on your current trajectory.'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousReadings;