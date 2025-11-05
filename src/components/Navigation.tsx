"use client";

import React from "react";

interface NavigationProps {
  currentPage: "home" | "chatbot" | "lantern";
  onNavigate: (page: "home" | "chatbot" | "lantern") => void;
  language: "en" | "zh";
  onLanguageChange: (language: "en" | "zh") => void;
}

export default function Navigation({ currentPage, onNavigate, language, onLanguageChange }: NavigationProps) {

  const translations = {
    en: {
      title: "Chinese New Year",
      home: "Home",
      chatbot: "Assistant",
      lantern: "Wish Lantern",
    },
    zh: {
      title: "春节",
      home: "首页",
      chatbot: "助手",
      lantern: "许愿灯笼",
    },
  };

  const t = translations[language];

  return (
    <header className="bg-red-700 px-8 py-5 shadow-md sticky top-0 z-40">
      <div className="px-6 py-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo/Title */}
          <div 
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => onNavigate("home")}
          >
            <div className="text-5xl">🏮</div>
            <div className="border-l-4 border-yellow-400 pl-3">
              <h1 className="text-2xl font-bold text-white tracking-wider" style={{fontFamily: language === 'en' ? 'var(--font-cinzel)' : 'var(--font-long-cang)'}}>
                {t.title}
              </h1>
              <p className="text-xs text-yellow-100 font-light tracking-widest" style={{fontFamily: 'var(--font-poppins)'}}>CHINESE NEW YEAR</p>
            </div>
          </div>
          
          {/* Navigation and Language Toggle */}
          <div className="flex items-center gap-4">
            <nav className="flex gap-4">
              <button
                onClick={() => onNavigate("home")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 tracking-wider text-sm ${
                  currentPage === "home"
                    ? "bg-yellow-400 text-red-700 shadow-lg"
                    : "text-white border-2 border-white hover:bg-red-600"
                }`}
                style={{fontFamily: 'var(--font-poppins)'}}
              >
                {t.home}
              </button>
              <button
                onClick={() => onNavigate("lantern")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-sm flex items-center gap-1.5 ${
                  currentPage === "lantern"
                    ? "bg-yellow-400 text-red-700 shadow-lg"
                    : "text-white border-2 border-white hover:bg-red-600"
                }`}
                style={{fontFamily: 'var(--font-poppins)'}}
              >
                <span>🏮</span> {t.lantern}
              </button>
              <button
                onClick={() => onNavigate("chatbot")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 tracking-wider text-sm flex items-center gap-1.5 ${
                  currentPage === "chatbot"
                    ? "bg-yellow-400 text-red-700 shadow-lg"
                    : "text-white border-2 border-white hover:bg-red-600"
                }`}
                style={{fontFamily: 'var(--font-poppins)'}}
              >
                <span>💬</span> {t.chatbot}
              </button>
            </nav>

            {/* Language Toggle */}
            <div className="border-l-2 border-yellow-400 pl-4 flex gap-1.5">
              <button
                onClick={() => onLanguageChange("en")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                  language === "en"
                    ? "bg-yellow-400 text-red-700 shadow-lg"
                    : "text-white border-2 border-white hover:bg-red-600"
                }`}
                style={{fontFamily: 'var(--font-poppins)'}}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange("zh")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                  language === "zh"
                    ? "bg-yellow-400 text-red-700 shadow-lg"
                    : "text-white border-2 border-white hover:bg-red-600"
                }`}
                style={{fontFamily: 'var(--font-poppins)'}}
              >
                中
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
