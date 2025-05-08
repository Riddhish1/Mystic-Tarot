import React from 'react';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  // Handler for greeting messages
  handleGreeting = () => {
    const message = this.createChatBotMessage(
      "✨ Greetings, seeker. The cosmic energies welcome you. How may I assist you on your mystical journey today?"
    );
    this.addMessageToState(message);
  };

  // Handler for help requests
  handleHelp = () => {
    const message = this.createChatBotMessage(
      "I can help you with various aspects of Tarot. You can ask me about:\n\n" +
      "• **Specific Tarot cards** and their meanings\n" +
      "• Getting a **quick Tarot reading**\n" +
      "• Understanding different **Tarot spreads**\n" +
      "• Interpreting **symbols** in Tarot\n\n" +
      "_Simply ask, and I shall guide you with my mystical knowledge._"
    );
    this.addMessageToState(message);
  };

  // Handler for thank you messages
  handleThanks = () => {
    const message = this.createChatBotMessage(
      "✨ You're welcome, seeker. May the cards continue to illuminate your path. ✨"
    );
    this.addMessageToState(message);
  };

  // Handler for card drawing requests
  handleDrawCards = () => {
    // Get random cards from the state
    const getRandomCards = (botState, count) => {
      const { cards } = botState;
      const shuffled = [...cards].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    this.setState((state) => {
      const drawnCards = getRandomCards(state, 3);
      
      const message = this.createChatBotMessage(
        "✨ I've consulted the cosmic energies and drawn three cards for you:",
        { delay: 500 }
      );
      
      const message2 = this.createChatBotMessage(
        `1. **${drawnCards[0].name}**: ${drawnCards[0].meaning}\n\n` +
        `2. **${drawnCards[1].name}**: ${drawnCards[1].meaning}\n\n` +
        `3. **${drawnCards[2].name}**: ${drawnCards[2].meaning}\n\n` +
        "_Remember, these insights are but a glimpse into the cosmic tapestry. The true interpretation lies within your intuition._",
        { delay: 1000 }
      );
      
      return {
        ...state,
        messages: [...state.messages, message, message2],
      };
    });
  };

  // Handler for explaining specific cards
  explainCard = (cardName) => {
    this.setState((state) => {
      const card = state.cards.find(c => c.name === cardName);
      
      if (!card) {
        const message = this.createChatBotMessage(
          `I'm sorry, but I don't have information about that card. You can ask about major arcana cards like The Fool, The Magician, etc.`
        );
        return {
          ...state,
          messages: [...state.messages, message],
        };
      }
      
      // Detailed explanations for each card
      let detailedMeaning = "";
      switch(cardName) {
        case "The Fool":
          detailedMeaning = "The Fool represents new beginnings, taking risks, and the journey into the unknown. Upright, it suggests innocence, spontaneity, and a free spirit approaching life's adventures. Reversed, it might indicate recklessness, poor choices, or taking too many risks.";
          break;
        case "The Magician":
          detailedMeaning = "The Magician symbolizes manifestation, resourcefulness, and power. When upright, it suggests you have all the tools needed to manifest your goals. Reversed, it can indicate manipulation, poor planning, or untapped talents.";
          break;
        case "The High Priestess":
          detailedMeaning = "The High Priestess embodies intuition, the unconscious mind, and divine feminine. Upright, she encourages trusting your intuition and acknowledging deeper truths. Reversed, she suggests you're ignoring intuition or suppressing inner knowledge.";
          break;
        case "The Moon":
          detailedMeaning = "The Moon represents illusion, fear, and anxiety, but also intuition and the subconscious. Upright, it suggests hidden depths and truths that aren't immediately apparent. Reversed, it can indicate release from fear or confronting delusions.";
          break;
        default:
          detailedMeaning = card.meaning;
      }
      
      const message = this.createChatBotMessage(
        `**${card.name}**\n\n${detailedMeaning}\n\nThis card often appears when you need to be mindful of these energies in your life path.`
      );
      
      return {
        ...state,
        messages: [...state.messages, message],
      };
    });
  };

  // Handler for questions about card meanings
  handleMeaningQuestion = () => {
    const message = this.createChatBotMessage(
      "Tarot cards hold multifaceted meanings that can shift depending on their position, surrounding cards, and your intuition. If you're curious about a specific card, simply mention its name, and I'll reveal its mysteries to you."
    );
    this.addMessageToState(message);
  };

  // Handler for explaining tarot spreads
  explainSpreads = () => {
    const message = this.createChatBotMessage(
      "There are many Tarot spreads, each designed to illuminate different aspects of your journey:\n\n" +
      "• **Three-Card Spread**: Past, Present, Future - a simple yet powerful glimpse into your timeline\n" +
      "• **Celtic Cross**: A comprehensive 10-card spread for detailed insights\n" +
      "• **Relationship Spread**: Explores dynamics between you and another\n" +
      "• **Spiritual Guidance Spread**: For those seeking their spiritual path\n\n" +
      "The spread used in our readings is a classic Three-Card interpretation, revealing insights from your past, present, and possible future."
    );
    this.addMessageToState(message);
  };

  // Default handler for unrecognized inputs
  handleDefault = () => {
    const defaultResponses = [
      "✨ The cosmic energies are shifting. Perhaps try asking about a specific Tarot card or request a reading?",
      "✨ I sense you seek knowledge, but your question is veiled. Try asking about Tarot cards, readings, or spreads.",
      "✨ Your query drifts like mist through the astral plane. Could you clarify what Tarot wisdom you seek?",
      "✨ The stars whisper many secrets. What aspect of Tarot divination interests you most?",
      "✨ Your path has many possibilities. Would you like to know about a specific card, or perhaps receive a reading?"
    ];
    
    const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    const message = this.createChatBotMessage(randomResponse);
    this.addMessageToState(message);
  };
}

export default ActionProvider; 