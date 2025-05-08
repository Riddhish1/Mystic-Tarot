import { createChatBotMessage } from 'react-chatbot-kit';
import React from 'react';
import TarotBotAvatar from './TarotBotAvatar.jsx';

const config = {
  initialMessages: [
    createChatBotMessage("I am Luna, your mystical Tarot assistant. How may I guide you on your journey today?", {
      delay: 500,
    }),
  ],
  botName: "Luna",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#8b5cf6",
    },
    chatButton: {
      backgroundColor: "#6d28d9",
    },
  },
  customComponents: {
    botAvatar: (props) => <TarotBotAvatar {...props} />,
  },
  state: {
    cards: [
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
    ],
  },
  widgets: [
    {
      widgetName: "cardOfTheDay",
      widgetFunc: (props) => <CardOfTheDay {...props} />,
      mapStateToProps: ["cards"],
    },
  ],
};

// Card of the Day Widget
const CardOfTheDay = (props) => {
  const { cards } = props;
  const randomCard = cards[Math.floor(Math.random() * cards.length)];
  
  return (
    <div className="p-4 bg-indigo-800/50 rounded-lg shadow-md my-2 border border-purple-500/30 backdrop-blur-sm">
      <h3 className="text-lg font-bold text-white mb-2">🔮 Card of the Day</h3>
      <div className="text-indigo-100 font-medium">{randomCard.name}</div>
      <p className="text-indigo-200 text-sm mt-1">{randomCard.meaning}</p>
      <div className="mt-3 text-xs text-indigo-300 italic">Let this card guide your journey today</div>
    </div>
  );
};

export default config; 