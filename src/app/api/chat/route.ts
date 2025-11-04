import { NextRequest, NextResponse } from "next/server";

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
  
  if (lowerQuestion.includes("年兽") || lowerQuestion.includes("nian") || lowerQuestion.includes("monster") || lowerQuestion.includes("legend")) {
    return "🐲 According to legend, Nian (年兽) was a fierce monster that would come out every New Year's Eve to devour people and livestock. The villagers discovered that Nian was afraid of the color red, loud noises, and bright lights. This is why we use red decorations, set off fireworks, and light lanterns during Chinese New Year!";
  }
  
  if (lowerQuestion.includes("灯笼") || lowerQuestion.includes("lantern") || lowerQuestion.includes("light")) {
    return "🏮 Red lanterns are iconic symbols of Chinese New Year! They represent good fortune, happiness, and prosperity. During the Spring Festival, streets and homes are decorated with beautiful red lanterns. The Lantern Festival on the 15th day marks the end of New Year celebrations.";
  }
  
  // Default response
  return "🎊 Welcome to the Chinese New Year chatbot! I can tell you about Spring Festival traditions, customs, food, zodiac animals, red envelopes, dragon dances, and much more. Try asking me about any aspect of Chinese New Year celebrations! 新年快乐 (Happy New Year)!";
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    // Simulate a small delay to make it feel more realistic
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    const response = getStaticResponse(message);

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle GET requests (optional, for testing)
export async function GET() {
  return NextResponse.json({
    message: "Chinese New Year Chatbot API is running!",
    endpoints: {
      POST: "/api/chat - Send a message to get a response"
    }
  });
}