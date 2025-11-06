"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatbotProps {
  language: "en" | "zh";
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Static responses for festival questions (fallback if API fails)
const getStaticResponse = (question: string): string => {
  const lowerQuestion = question.toLowerCase();

  if (
    lowerQuestion.includes("春节") ||
    lowerQuestion.includes("chinese new year") ||
    lowerQuestion.includes("spring festival")
  ) {
    return "🧧 春节快乐！Chinese New Year, also known as Spring Festival (春节), is the most important traditional holiday in Chinese culture. It marks the beginning of the lunar new year and is celebrated with family reunions, feasts, fireworks, and the giving of red envelopes (红包).";
  }

  if (
    lowerQuestion.includes("红包") ||
    lowerQuestion.includes("red envelope") ||
    lowerQuestion.includes("hongbao")
  ) {
    return "🧧 红包 (Hongbao) are red envelopes containing money given as gifts during Chinese New Year. The red color symbolizes good luck and is believed to ward off evil spirits. They're traditionally given by married couples and elders to children and unmarried adults.";
  }

  if (
    lowerQuestion.includes("生肖") ||
    lowerQuestion.includes("zodiac") ||
    lowerQuestion.includes("animal")
  ) {
    return "🐉 The Chinese zodiac consists of 12 animals: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, and Pig. Each year is associated with one of these animals, and 2024 is the Year of the Dragon! Dragons symbolize strength, wisdom, and good fortune.";
  }

  if (
    lowerQuestion.includes("饺子") ||
    lowerQuestion.includes("dumpling") ||
    lowerQuestion.includes("food")
  ) {
    return "🥟 Traditional Chinese New Year foods include dumplings (饺子), fish (鱼), spring rolls, nian gao (年糕 - sticky rice cake), and tangerines. Each food has symbolic meaning - dumplings represent wealth, fish represents abundance, and tangerines represent good luck!";
  }

  if (
    lowerQuestion.includes("舞龙") ||
    lowerQuestion.includes("dragon dance") ||
    lowerQuestion.includes("lion dance")
  ) {
    return "🐲 Dragon and Lion dances are traditional performances during Chinese New Year celebrations. The dragon dance involves a team of performers manipulating a long, flexible dragon figure, while lion dances feature acrobatic movements. Both are believed to bring good luck and chase away evil spirits!";
  }

  if (
    lowerQuestion.includes("烟花") ||
    lowerQuestion.includes("firework") ||
    lowerQuestion.includes("firecracker")
  ) {
    return "🎆 Fireworks and firecrackers are an essential part of Chinese New Year celebrations! The loud noises and bright lights are believed to scare away the mythical beast Nian (年兽) and evil spirits, bringing good luck for the new year.";
  }

  if (
    lowerQuestion.includes("传统") ||
    lowerQuestion.includes("tradition") ||
    lowerQuestion.includes("custom")
  ) {
    return "🏮 Chinese New Year traditions include cleaning the house before the new year, decorating with red lanterns and couplets, family reunion dinners, giving red envelopes, watching dragon dances, and setting off fireworks. The celebration lasts for 15 days, ending with the Lantern Festival!";
  }

  if (
    lowerQuestion.includes("龙舟") ||
    lowerQuestion.includes("dragon boat") ||
    lowerQuestion.includes("boat festival")
  ) {
    return "🐉 The Dragon Boat Festival (端午节) is celebrated on the 5th day of the 5th lunar month. It commemorates the death of the poet Qu Yuan. Traditional activities include dragon boat racing, eating zongzi (sticky rice dumplings), and hanging mugwort leaves for protection.";
  }

  if (
    lowerQuestion.includes("中秋") ||
    lowerQuestion.includes("mid-autumn") ||
    lowerQuestion.includes("moon festival")
  ) {
    return "🥮 The Mid-Autumn Festival (中秋节) is celebrated on the 15th day of the 8th lunar month when the moon is fullest. Families gather to admire the moon, share mooncakes, and enjoy lantern festivals. It symbolizes reunion, harmony, and prosperity.";
  }

  // Default response
  return "🎊 Welcome to the Smart Festival Guide chatbot! I can tell you about Spring Festival, Dragon Boat Festival, and Mid-Autumn Festival - including their origins, customs, and traditions. Try asking me about any traditional Chinese festival! 新年快乐 (Happy New Year)!";
};

export default function Chatbot({ language }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "🎊 新年好！Welcome to the Smart Festival Guide! I'm here to share knowledge about traditional Chinese festivals including Spring Festival, Dragon Boat Festival, and Mid-Autumn Festival. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const sendToApi = async (message: string) => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData?.error || `Request failed with status ${res.status}`,
        );
      }

      const data: { response?: string; result?: string; timestamp?: string } =
        await res.json();
      return {
        text: data.response ?? data.result ?? getStaticResponse(message),
        timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
      };
    } catch (err: any) {
      return {
        text: `⚠️ Using fallback: ${getStaticResponse(message)}`,
        timestamp: new Date(),
      };
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    const placeholderId = `loading-${Date.now() + 1}`;
    const loadingMessage: Message = {
      id: placeholderId,
      text: "",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, loadingMessage]);

    setIsSending(true);
    const result = await sendToApi(inputText);
    setMessages((prev) =>
      prev.map((m) =>
        m.id === placeholderId
          ? { ...m, text: result.text, timestamp: result.timestamp }
          : m,
      ),
    );
    setIsSending(false);

    setInputText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSendMessage();
    }
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-lg rounded-lg px-4 py-3 ${
                  message.isUser
                    ? "bg-red-700 text-white"
                    : "border-2 border-red-300 bg-red-50 text-gray-900"
                }`}
              >
                {message.isUser ? (
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {message.text}
                  </p>
                ) : message.text && message.text.trim() ? (
                  <div
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ children, href, ...props }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-700 underline hover:text-red-600"
                            {...props}
                          >
                            {children}
                          </a>
                        ),
                        // Style inline code; block code is wrapped in <pre> by Markdown
                        code: ({ children, ...props }) => (
                          <code
                            className="rounded bg-red-100 px-1 py-0.5 text-red-700"
                            {...props}
                          >
                            {children}
                          </code>
                        ),
                        // Style fenced code blocks
                        pre: ({ children, ...props }) => (
                          <pre
                            className="overflow-x-auto rounded bg-red-100 p-2 text-red-700"
                            {...props}
                          >
                            {children}
                          </pre>
                        ),
                        ul: ({ children, ...props }) => (
                          <ul
                            className="list-disc pl-5 marker:text-red-700"
                            {...props}
                          >
                            {children}
                          </ul>
                        ),
                        ol: ({ children, ...props }) => (
                          <ol
                            className="list-decimal pl-5 marker:text-red-700"
                            {...props}
                          >
                            {children}
                          </ol>
                        ),
                        h1: ({ children, ...props }) => (
                          <h1
                            className="mb-2 text-lg font-bold text-red-800"
                            {...props}
                          >
                            {children}
                          </h1>
                        ),
                        h2: ({ children, ...props }) => (
                          <h2
                            className="mb-2 text-base font-semibold text-red-800"
                            {...props}
                          >
                            {children}
                          </h2>
                        ),
                        h3: ({ children, ...props }) => (
                          <h3
                            className="mb-1 text-sm font-semibold text-red-800"
                            {...props}
                          >
                            {children}
                          </h3>
                        ),
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    <div className="flex items-center gap-2 text-red-700">
                      <span
                        className="inline-block h-2 w-2 animate-bounce rounded-full bg-red-700"
                        style={{ animationDelay: "0s" }}
                      />
                      <span
                        className="inline-block h-2 w-2 animate-bounce rounded-full bg-red-700"
                        style={{ animationDelay: "0.15s" }}
                      />
                      <span
                        className="inline-block h-2 w-2 animate-bounce rounded-full bg-red-700"
                        style={{ animationDelay: "0.3s" }}
                      />
                      <span className="text-xs">
                        {language === "en" ? "Thinking…" : "正在思考…"}
                      </span>
                    </div>
                  </div>
                )}
                <p
                  className={`mt-2 text-xs ${
                    message.isUser ? "text-white" : "text-red-700"
                  }`}
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t-2 border-red-300 bg-white px-6 py-5 shadow-md">
        <div className="mx-auto max-w-3xl space-y-4">
          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-2">
            {(language === "en"
              ? [
                  "Red envelope traditions",
                  "Dragon dances",
                  "Family reunions",
                  "Traditional foods",
                  "Lucky symbols",
                ]
              : ["红包传统", "舞龉传统", "家族团聚", "传统罥餾", "吉祥符号"]
            ).map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInputText(suggestion)}
                className="rounded-full border-2 border-red-400 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 transition-all hover:bg-red-100 hover:shadow-md"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Message input */}
          <div className="flex gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                language === "en"
                  ? "Ask about Chinese New Year..."
                  : "问于春节的问题..."
              }
              className="flex-1 rounded-lg border-2 border-red-400 bg-white px-4 py-3 text-sm text-gray-900 placeholder-red-600 transition-all focus:border-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none"
              style={{ fontFamily: "var(--font-poppins)" }}
            />
            <button
              onClick={() => void handleSendMessage()}
              disabled={!inputText.trim() || isSending}
              className="rounded-lg bg-red-700 px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-red-600 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-400"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {isSending
                ? language === "en"
                  ? "Sending..."
                  : "发送中..."
                : language === "en"
                  ? "Send"
                  : "发送"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
