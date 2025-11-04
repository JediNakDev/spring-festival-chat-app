"use client";

import { useState } from "react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
  isError?: boolean;
}

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
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    // Add user message
    setMessages(prev => [...prev, userMessage]);
    
    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "🤔 Thinking...",
      isUser: false,
      timestamp: new Date(),
      isLoading: true,
    };
    
    setMessages(prev => [...prev, loadingMessage]);
    setIsLoading(true);
    
    const currentInput = inputText;
    setInputText("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Remove loading message and add actual response
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => !msg.isLoading);
        return [
          ...withoutLoading,
          {
            id: (Date.now() + 2).toString(),
            text: data.response,
            isUser: false,
            timestamp: new Date(data.timestamp),
          },
        ];
      });
    } catch (error) {
      console.error("Error calling chat API:", error);
      
      // Remove loading message and add error message
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => !msg.isLoading);
        return [
          ...withoutLoading,
          {
            id: (Date.now() + 2).toString(),
            text: "🚫 Sorry, I encountered an error while processing your message. Please try again!",
            isUser: false,
            timestamp: new Date(),
            isError: true,
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
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
                    : message.isError
                    ? "bg-red-600 text-yellow-100 mr-auto border border-red-400"
                    : message.isLoading
                    ? "bg-red-700/50 text-yellow-100 mr-auto border border-yellow-400/30 animate-pulse"
                    : "bg-red-700/90 text-yellow-100 mr-auto border border-yellow-400/30"
                }`}
              >
                <p className="text-sm leading-relaxed">
                  {message.isLoading ? (
                    <span className="flex items-center space-x-2">
                      <span>🤔 Thinking</span>
                      <span className="flex space-x-1">
                        <span className="w-1 h-1 bg-yellow-300 rounded-full animate-bounce"></span>
                        <span className="w-1 h-1 bg-yellow-300 rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></span>
                        <span className="w-1 h-1 bg-yellow-300 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></span>
                      </span>
                    </span>
                  ) : (
                    message.text
                  )}
                </p>
                {!message.isLoading && (
                  <p className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                )}
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
              className="flex-1 px-4 py-3 rounded-full bg-yellow-100 text-red-900 placeholder-red-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all disabled:opacity-50"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-600 disabled:opacity-50 text-red-900 font-semibold rounded-full transition-all glow-animation focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              {isLoading ? "..." : "发送"}
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
                disabled={isLoading}
                className="px-3 py-1 text-xs bg-yellow-200 hover:bg-yellow-300 text-red-800 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
