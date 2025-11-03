"use client";

import { useState } from "react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Static responses for Chinese New Year questions
const getStaticResponse = (question: string): string => {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes("春节") || lowerQuestion.includes("chinese new year") || lowerQuestion.includes("spring festival")) {
    return "🧧 春节快乐！Chinese New Year, also known as Spring Festival (春节), is the most important traditional holiday in Chinese culture. It marks the beginning of the lunar new year and is celebrated with family reunions, feasts, fireworks, and the giving of red envelopes (红包).";
  }
  
  if (lowerQuestion.includes("红包") || lowerQuestion.includes("red envelope") || lowerQuestion.includes("hongbao")) {
    return "🧧 红包 (Hongbao) are red envelopes containing money given as gifts during Chinese New Year. The red color symbolizes good luck and is believed to ward off evil spirits. They're traditionally given by married couples and elders to children and unmarried adults.";
  }
  
  if (lowerQuestion.includes("生肖") || lowerQuestion.includes("zodiac") || lowerQuestion.includes("animal")) {
    return "🐉 The Chinese zodiac consists of 12 animals: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, and Pig. Each year is associated with one of these animals, and 2024 is the Year of the Dragon! Dragons symbolize strength, wisdom, and good fortune.";
  }
  
  if (lowerQuestion.includes("饺子") || lowerQuestion.includes("dumpling") || lowerQuestion.includes("food")) {
    return "🥟 Traditional Chinese New Year foods include dumplings (饺子), fish (鱼), spring rolls, nian gao (年糕 - sticky rice cake), and tangerines. Each food has symbolic meaning - dumplings represent wealth, fish represents abundance, and tangerines represent good luck!";
  }
  
  if (lowerQuestion.includes("舞龙") || lowerQuestion.includes("dragon dance") || lowerQuestion.includes("lion dance")) {
    return "🐲 Dragon and Lion dances are traditional performances during Chinese New Year celebrations. The dragon dance involves a team of performers manipulating a long, flexible dragon figure, while lion dances feature acrobatic movements. Both are believed to bring good luck and chase away evil spirits!";
  }
  
  if (lowerQuestion.includes("烟花") || lowerQuestion.includes("firework") || lowerQuestion.includes("firecracker")) {
    return "🎆 Fireworks and firecrackers are an essential part of Chinese New Year celebrations! The loud noises and bright lights are believed to scare away the mythical beast Nian (年兽) and evil spirits, bringing good luck for the new year.";
  }
  
  if (lowerQuestion.includes("传统") || lowerQuestion.includes("tradition") || lowerQuestion.includes("custom")) {
    return "🏮 Chinese New Year traditions include cleaning the house before the new year, decorating with red lanterns and couplets, family reunion dinners, giving red envelopes, watching dragon dances, and setting off fireworks. The celebration lasts for 15 days, ending with the Lantern Festival!";
  }
  
  // Default response
  return "🎊 Welcome to the Chinese New Year chatbot! I can tell you about Spring Festival traditions, customs, food, zodiac animals, red envelopes, dragon dances, and much more. Try asking me about any aspect of Chinese New Year celebrations! 新年快乐 (Happy New Year)!";
};

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "🎊 新年好！Welcome to the Chinese Spring Festival chatbot! I'm here to share knowledge about Chinese New Year traditions, customs, and celebrations. What would you like to know about the Spring Festival?",
      isUser: false,
      timestamp: new Date("2024-01-01T00:00:00"),
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Add bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getStaticResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-yellow-600">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl float-animation">🏮</div>
        <div className="absolute top-20 right-20 text-4xl float-animation" style={{animationDelay: "1s"}}>🧧</div>
        <div className="absolute bottom-20 left-20 text-5xl float-animation" style={{animationDelay: "2s"}}>🐉</div>
        <div className="absolute bottom-10 right-10 text-4xl float-animation" style={{animationDelay: "0.5s"}}>🎆</div>
      </div>

      <div className="relative z-10 flex flex-col h-screen max-w-4xl mx-auto">
        {/* Header */}
        <header className="bg-red-800/90 backdrop-blur-sm border-b-2 border-yellow-400 p-4">
          <div className="flex items-center justify-center space-x-4">
            <span className="text-4xl">🏮</span>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-yellow-300">春节知识助手</h1>
              <p className="text-yellow-200 text-sm">Chinese New Year Chatbot</p>
            </div>
            <span className="text-4xl">🧧</span>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.isUser
                    ? "bg-yellow-500 text-red-900 ml-auto"
                    : "bg-red-700/90 text-yellow-100 mr-auto border border-yellow-400/30"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className="text-xs mt-2 opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-red-800/90 backdrop-blur-sm border-t-2 border-yellow-400 p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about Chinese New Year traditions... 问我关于春节的传统..."
              className="flex-1 px-4 py-3 rounded-full bg-yellow-100 text-red-900 placeholder-red-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-600 disabled:opacity-50 text-red-900 font-semibold rounded-full transition-all glow-animation focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              发送
            </button>
          </div>
          
          {/* Quick suggestion buttons */}
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {[
              "What is Chinese New Year?",
              "Tell me about red envelopes",
              "Chinese zodiac animals",
              "Traditional foods",
              "Dragon dance"
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInputText(suggestion)}
                className="px-3 py-1 text-xs bg-yellow-200 hover:bg-yellow-300 text-red-800 rounded-full transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
