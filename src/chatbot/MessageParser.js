import React from 'react';

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCase = message.toLowerCase();

    // Handle different user queries with appropriate responses
    if (lowerCase.includes('hello') || lowerCase.includes('hi') || lowerCase.includes('hey')) {
      this.actionProvider.handleGreeting();
      return;
    }

    if (lowerCase.includes('draw') || lowerCase.includes('reading') || lowerCase.includes('cards')) {
      this.actionProvider.handleDrawCards();
      return;
    }

    if (lowerCase.includes('help') || lowerCase.includes('guide') || lowerCase.includes('assistance')) {
      this.actionProvider.handleHelp();
      return;
    }

    // Handle questions about specific tarot cards
    if (lowerCase.includes('fool')) {
      this.actionProvider.explainCard('The Fool');
      return;
    }

    if (lowerCase.includes('magician')) {
      this.actionProvider.explainCard('The Magician');
      return;
    }

    if (lowerCase.includes('priestess') || lowerCase.includes('high priestess')) {
      this.actionProvider.explainCard('The High Priestess');
      return;
    }

    if (lowerCase.includes('empress')) {
      this.actionProvider.explainCard('The Empress');
      return;
    }

    if (lowerCase.includes('emperor')) {
      this.actionProvider.explainCard('The Emperor');
      return;
    }

    if (lowerCase.includes('hierophant')) {
      this.actionProvider.explainCard('The Hierophant');
      return;
    }

    if (lowerCase.includes('lovers')) {
      this.actionProvider.explainCard('The Lovers');
      return;
    }

    if (lowerCase.includes('chariot')) {
      this.actionProvider.explainCard('The Chariot');
      return;
    }

    if (lowerCase.includes('strength')) {
      this.actionProvider.explainCard('Strength');
      return;
    }

    if (lowerCase.includes('hermit')) {
      this.actionProvider.explainCard('The Hermit');
      return;
    }

    if (lowerCase.includes('wheel') || lowerCase.includes('fortune')) {
      this.actionProvider.explainCard('Wheel of Fortune');
      return;
    }

    if (lowerCase.includes('justice')) {
      this.actionProvider.explainCard('Justice');
      return;
    }

    if (lowerCase.includes('hanged') || lowerCase.includes('hanged man')) {
      this.actionProvider.explainCard('The Hanged Man');
      return;
    }

    if (lowerCase.includes('death')) {
      this.actionProvider.explainCard('Death');
      return;
    }

    if (lowerCase.includes('temperance')) {
      this.actionProvider.explainCard('Temperance');
      return;
    }

    if (lowerCase.includes('devil')) {
      this.actionProvider.explainCard('The Devil');
      return;
    }

    if (lowerCase.includes('tower')) {
      this.actionProvider.explainCard('The Tower');
      return;
    }

    if (lowerCase.includes('star')) {
      this.actionProvider.explainCard('The Star');
      return;
    }

    if (lowerCase.includes('moon')) {
      this.actionProvider.explainCard('The Moon');
      return;
    }

    if (lowerCase.includes('sun')) {
      this.actionProvider.explainCard('The Sun');
      return;
    }

    if (lowerCase.includes('judgement')) {
      this.actionProvider.explainCard('Judgement');
      return;
    }

    if (lowerCase.includes('world')) {
      this.actionProvider.explainCard('The World');
      return;
    }

    if (lowerCase.includes('thank')) {
      this.actionProvider.handleThanks();
      return;
    }

    if (lowerCase.includes('meaning') || lowerCase.includes('interpret')) {
      this.actionProvider.handleMeaningQuestion();
      return;
    }

    if (lowerCase.includes('spread') || lowerCase.includes('layout')) {
      this.actionProvider.explainSpreads();
      return;
    }
    
    // Default response for unrecognized queries
    this.actionProvider.handleDefault();
  }
}

export default MessageParser; 