import React, { useState, useRef, useEffect } from 'react';
import './chatbot.css';

const SimpleChatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'I am Luna, your mystical Tarot assistant. How may I guide you on your journey today?' }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Create instances of the action provider
  const actionProvider = {
    createChatBotMessage: (text) => ({ sender: 'bot', text }),
    setState: (callback) => {
      const updater = (prevState) => {
        const newState = callback(prevState);
        if (newState.messages) {
          setMessages(newState.messages);
        }
        return newState;
      };
      updater({ messages });
    },
    
    // Copy all methods from ActionProvider
    addMessageToState: (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    },
    
    handleGreeting: () => {
      const message = { 
        sender: 'bot', 
        text: "Greetings, seeker. The cosmic energies welcome you. How may I assist you on your mystical journey today?" 
      };
      setMessages(prevMessages => [...prevMessages, message]);
    },
    
    handleHelp: () => {
      const message = { 
        sender: 'bot', 
        text: "I can help you with various aspects of Tarot. You can ask me about:\n\n" +
        "• Specific Tarot cards and their meanings\n" +
        "• Getting a quick Tarot reading\n" +
        "• Understanding different Tarot spreads\n" +
        "• Interpreting symbols in Tarot\n\n" +
        "Simply ask, and I shall guide you with my mystical knowledge." 
      };
      setMessages(prevMessages => [...prevMessages, message]);
    },
    
    handleThanks: () => {
      const message = { 
        sender: 'bot', 
        text: "You're welcome, seeker. May the cards continue to illuminate your path. ✨" 
      };
      setMessages(prevMessages => [...prevMessages, message]);
    },
    
    handleDrawCards: () => {
      const cards = [
        { name: "The Fool", meaning: "New beginnings, innocence, spontaneity, free spirit" },
        { name: "The Magician", meaning: "Manifestation, resourcefulness, power, inspired action" },
        { name: "The High Priestess", meaning: "Intuition, unconscious, inner voice, divine feminine" },
        { name: "The Empress", meaning: "Femininity, beauty, nature, nurturing, abundance" },
        { name: "The Emperor", meaning: "Authority, structure, control, fatherhood, stability" },
        { name: "The Hierophant", meaning: "Tradition, conformity, morality, ethics, education" },
        { name: "The Lovers", meaning: "Love, harmony, relationships, values alignment, choices" },
        { name: "The Chariot", meaning: "Control, willpower, success, action, determination" },
        { name: "Strength", meaning: "Courage, persuasion, influence, compassion, inner strength" },
        { name: "The Hermit", meaning: "Soul-searching, introspection, being alone, inner guidance" },
        { name: "Wheel of Fortune", meaning: "Good luck, karma, life cycles, destiny, a turning point" },
        { name: "Justice", meaning: "Justice, fairness, truth, cause and effect, law" },
        { name: "The Hanged Man", meaning: "Surrender, letting go, new perspectives, enlightenment" },
        { name: "Death", meaning: "Endings, change, transformation, transition" },
        { name: "Temperance", meaning: "Balance, moderation, patience, finding meaning" },
        { name: "The Devil", meaning: "Shadow self, attachment, addiction, restriction, sexuality" },
        { name: "The Tower", meaning: "Sudden change, upheaval, chaos, revelation, awakening" },
        { name: "The Star", meaning: "Hope, faith, purpose, renewal, spirituality" },
        { name: "The Moon", meaning: "Illusion, fear, anxiety, subconscious, intuition" },
        { name: "The Sun", meaning: "Positivity, fun, warmth, success, vitality" },
        { name: "Judgement", meaning: "Rebirth, inner calling, absolution" },
        { name: "The World", meaning: "Completion, integration, accomplishment, travel" },
      ];
      
      // Get 3 random cards
      const shuffled = [...cards].sort(() => 0.5 - Math.random());
      const drawnCards = shuffled.slice(0, 3);
      
      const message1 = { 
        sender: 'bot', 
        text: "I've consulted the cosmic energies and drawn three cards for you:"
      };
      
      const message2 = { 
        sender: 'bot', 
        text: `1. **${drawnCards[0].name}**: ${drawnCards[0].meaning}\n\n` +
        `2. **${drawnCards[1].name}**: ${drawnCards[1].meaning}\n\n` +
        `3. **${drawnCards[2].name}**: ${drawnCards[2].meaning}\n\n` +
        "Remember, these insights are but a glimpse into the cosmic tapestry. The true interpretation lies within your intuition."
      };
      
      setMessages(prevMessages => [...prevMessages, message1, message2]);
    },
    
    handleDefault: () => {
      const defaultResponses = [
        "The cosmic energies are shifting. Perhaps try asking about a specific Tarot card or request a reading?",
        "I sense you seek knowledge, but your question is veiled. Try asking about Tarot cards, readings, or spreads.",
        "Your query drifts like mist through the astral plane. Could you clarify what Tarot wisdom you seek?",
        "The stars whisper many secrets. What aspect of Tarot divination interests you most?",
        "Your path has many possibilities. Would you like to know about a specific card, or perhaps receive a reading?"
      ];
      
      const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
      const message = { sender: 'bot', text: randomResponse };
      setMessages(prevMessages => [...prevMessages, message]);
    }
  };
  
  // MessageParser equivalent
  const parseMessage = (text) => {
    const lowerCase = text.toLowerCase();
    
    if (lowerCase.includes('hello') || lowerCase.includes('hi') || lowerCase.includes('hey')) {
      actionProvider.handleGreeting();
      return;
    }
    
    if (lowerCase.includes('draw') || lowerCase.includes('reading') || lowerCase.includes('cards')) {
      actionProvider.handleDrawCards();
      return;
    }
    
    if (lowerCase.includes('help') || lowerCase.includes('guide') || lowerCase.includes('assistance')) {
      actionProvider.handleHelp();
      return;
    }
    
    if (lowerCase.includes('thank')) {
      actionProvider.handleThanks();
      return;
    }
    
    actionProvider.handleDefault();
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { sender: 'user', text: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Parse and respond
    setTimeout(() => parseMessage(input), 500);
    
    // Clear input
    setInput('');
  };
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const toggleChatbot = () => {
    setIsAnimating(true);
    setIsOpen(prev => !prev);
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };
  
  return (
    <div className="luna-container font-sans">
      {isOpen ? (
        <div 
          className={`simple-chatbot shadow-xl rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${isAnimating ? 'scale-95 opacity-90' : 'scale-100 opacity-100'}`}
          style={{ borderTop: '3px solid rgb(139, 92, 246)' }}
        >
          <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white p-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo-500/40 flex items-center justify-center mr-2">
                <span className="text-white text-sm">✨</span>
              </div>
              <h3 className="font-medium text-md">Luna • Mystical Assistant</h3>
            </div>
            <button 
              onClick={toggleChatbot}
              className="text-white p-1 hover:bg-purple-600/50 rounded-full transition-colors"
              aria-label="Close chatbot"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="messages-container">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender} ${message.sender === 'bot' ? 'animate-fadeIn' : ''}`}>
                {message.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Luna about Tarot..."
              className="message-input"
            />
            <button type="submit" className="send-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={toggleChatbot}
          className={`bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 flex items-center ${isAnimating ? 'scale-90' : 'scale-100'}`}
          aria-label="Open Luna chatbot"
        >
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-400"></span>
            </span>
          </div>
          <span className="ml-2 font-medium">Luna</span>
          <span className="ml-1">✨</span>
        </button>
      )}
    </div>
  );
};

export default SimpleChatbot; 