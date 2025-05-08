import React from 'react';

const AboutTarot: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">About Tarot</h2>
        <p className="text-indigo-200">Discover the ancient wisdom and symbolism of tarot</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-indigo-900/30 backdrop-blur-sm rounded-xl shadow-lg border border-indigo-800/50">
          <h3 className="text-xl font-semibold text-white mb-3">History of Tarot</h3>
          <p className="text-indigo-200">
            Tarot cards originated in the mid-15th century in Europe, initially as playing cards before evolving into tools for divination in the 18th century. The traditional deck consists of 78 cards, divided into the Major Arcana (22 cards) and Minor Arcana (56 cards).
          </p>
          <p className="text-indigo-200 mt-3">
            Throughout history, tarot has been embraced by various mystical and spiritual traditions, evolving from simple card games to powerful tools for self-reflection and spiritual guidance.
          </p>
        </div>
        
        <div className="p-6 bg-indigo-900/30 backdrop-blur-sm rounded-xl shadow-lg border border-indigo-800/50">
          <h3 className="text-xl font-semibold text-white mb-3">The Major Arcana</h3>
          <p className="text-indigo-200">
            The Major Arcana cards represent significant life events and spiritual lessons. Each card depicts archetypal images and symbols that reflect universal human experiences and the journey of personal growth.
          </p>
          <p className="text-indigo-200 mt-3">
            From The Fool (representing new beginnings) to The World (symbolizing completion and fulfillment), these 22 cards tell the story of the soul's journey through life's most transformative experiences.
          </p>
        </div>
        
        <div className="p-6 bg-indigo-900/30 backdrop-blur-sm rounded-xl shadow-lg border border-indigo-800/50">
          <h3 className="text-xl font-semibold text-white mb-3">The Minor Arcana</h3>
          <p className="text-indigo-200">
            The Minor Arcana consists of 56 cards divided into four suits: Wands (representing creativity and passion), Cups (emotions and relationships), Swords (intellect and conflict), and Pentacles (material matters and security).
          </p>
          <p className="text-indigo-200 mt-3">
            These cards reflect the everyday challenges and triumphs we experience, providing practical guidance for navigating life's more mundane aspects while still offering profound wisdom.
          </p>
        </div>
        
        <div className="p-6 bg-indigo-900/30 backdrop-blur-sm rounded-xl shadow-lg border border-indigo-800/50">
          <h3 className="text-xl font-semibold text-white mb-3">Reading Approaches</h3>
          <p className="text-indigo-200">
            There are numerous approaches to reading tarot, from structured spreads like the Celtic Cross to simple three-card past-present-future layouts. The interpretation combines traditional card meanings with intuitive insights.
          </p>
          <p className="text-indigo-200 mt-3">
            Remember that tarot is a tool for self-reflection and guidance, not predicting fixed futures. The cards offer perspectives and possibilities, empowering you to make conscious choices on your path.
          </p>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-indigo-900/30 backdrop-blur-sm rounded-xl shadow-lg border border-indigo-800/50">
        <h3 className="text-xl font-semibold text-white mb-3">Tarot Ethics</h3>
        <p className="text-indigo-200">
          When working with tarot, consider these ethical principles:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-2 text-indigo-200">
          <li>Approach readings with respect and an open mind</li>
          <li>Remember that tarot offers guidance, not absolute predictions</li>
          <li>Honor the autonomy and free will of yourself and others</li>
          <li>Use tarot as a tool for personal growth and empowerment</li>
          <li>Maintain appropriate boundaries when reading for others</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutTarot;