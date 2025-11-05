"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import HomePage from "@/components/HomePage";
import Chatbot from "@/components/Chatbot";
import WishLantern from "@/components/WishLantern";

export default function Page() {
  const [currentPage, setCurrentPage] = useState<"home" | "chatbot" | "lantern">("home");
  const [language, setLanguage] = useState<"en" | "zh">("en");

  return (
    <div className="flex h-screen flex-col bg-white">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} language={language} onLanguageChange={setLanguage} />
      
      <div className="flex-1 overflow-y-auto bg-white">
        {currentPage === "home" ? (
          <HomePage language={language} />
        ) : currentPage === "lantern" ? (
          <WishLantern language={language} />
        ) : (
          <Chatbot language={language} />
        )}
      </div>
    </div>
  );
}
