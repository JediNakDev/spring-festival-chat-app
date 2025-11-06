import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

// DashScope-compatible OpenAI client
const client = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
});

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json" },
        { status: 415 },
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 },
      );
    }
    const { message } = body as { message?: string };

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 },
      );
    }

    if (!process.env.DASHSCOPE_API_KEY) {
      return NextResponse.json(
        { error: "Missing DASHSCOPE_API_KEY in environment" },
        { status: 500 },
      );
    }

    const completion = await client.chat.completions.create({
      model: "qwen-plus",
      messages: [
        {
          role: "system",
          content:
            "You are a friendly, knowledgeable Chinese New Year (Spring Festival) information assistant. Provide accurate cultural context, traditions, greetings, foods, zodiac, and customs. Respond in Chinese if the user's message is in Chinese; otherwise respond in English. Keep answers concise and helpful.",
        },
        { role: "user", content: String(message) },
      ],
    });

    const content = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({
      response: content,
      result: content,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: error?.message ?? "Internal server error" },
      { status: 500 },
    );
  }
}

// Handle GET requests (optional, for testing)
export async function GET() {
  return NextResponse.json({
    message: "Chinese New Year Chatbot API is running!",
    endpoints: {
      POST: "/api/chat - Send a message to get a response",
    },
  });
}
