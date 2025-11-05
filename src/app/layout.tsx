import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist, Poppins, Cinzel_Decorative, Noto_Serif_SC, Long_Cang } from "next/font/google";

export const metadata: Metadata = {
  title: "Smart Festival Guide | 春节知识助手 | Traditional Festival Chatbot",
  description: "Learn about Chinese traditional festivals including Spring Festival, Dragon Boat Festival, and Mid-Autumn Festival through an interactive AI assistant. Explore origins, customs, and related poetry. 了解中国传统节日，包括春节、端午节和中秋节的起源、习俗和相关诗歌。",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const notoSerifSC = Noto_Serif_SC({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-noto-serif-sc",
});

const longCang = Long_Cang({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-long-cang",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${poppins.variable} ${cinzelDecorative.variable} ${notoSerifSC.variable} ${longCang.variable}`}>
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
