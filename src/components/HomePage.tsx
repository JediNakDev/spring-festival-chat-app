"use client";

import { useState, useEffect } from "react";

interface HomePageProps {
  language: "en" | "zh";
}

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const translations = {
  en: {
    countdownTitle: "Countdown to Spring Festival 2025",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    traditions: "Spring Festival Traditions",
    traditions2: "Traditional Chinese Festivals",
    heritage: "Cultural Heritage",
    quote: "The spring breeze spreads across ten thousand miles, bringing reunion and harmony to all under heaven.",
    redEnvelopes: "Red Envelopes",
    redEnvelopesDesc: "Red envelopes symbolizing good luck and prosperity, believed to ward off evil spirits and bless the new year.",
    traditionalFoods: "Festival Foods",
    traditionalFoodsDesc: "Traditional foods - each carries symbolic meaning representing wealth, abundance, and good fortune.",
    dragonDances: "Dragon Dances",
    dragonDancesDesc: "Dragon dances believed to bring good luck and chase away evil, celebrating renewal and strength.",
    lanterns: "Red Lanterns",
    lanternsDesc: "Red lanterns and couplets decorate homes, welcoming the new year with festive atmosphere.",
    fireworks: "Fireworks",
    fireworksDesc: "Fireworks and firecrackers scare away Nian beast, bringing prosperity and good fortune.",
    familyReunions: "Family Reunions",
    familyReunionsDesc: "Family reunions - the most important aspect, strengthening bonds and honoring ancestors.",
    springFestival: "Spring Festival",
    springFestivalDate: "1st lunar month",
    springFestivalDesc: "The most important festival celebrating lunar new year with family reunions and ancient customs.",
    dragonBoat: "Dragon Boat Festival",
    dragonBoatDate: "5th lunar month",
    dragonBoatDesc: "Commemorates poet Qu Yuan with dragon boat races, zongzi dumplings, and traditional activities.",
    midAutumn: "Mid-Autumn Festival",
    midAutumnDate: "8th lunar month",
    midAutumnDesc: "Celebrates family reunion and harvest with mooncakes, lanterns, and moon gazing traditions.",
    culturalHeritageText: "Chinese traditional festivals are deeply rooted in thousands of years of history, philosophy, and cultural heritage. They reflect the connection between humans and nature, the importance of family bonds, and respect for ancestors.",
  },
  zh: {
    countdownTitle: "新春倒计 | 2025春节",
    days: "天",
    hours: "时",
    minutes: "分",
    seconds: "秒",
    traditions: "春节传统",
    traditions2: "中华传统节日",
    heritage: "文化传承",
    quote: "春风拂万里，团圆满天下",
    redEnvelopes: "红包",
    redEnvelopesDesc: "红包象征吉祥如意，祈福来年平安喜乐。",
    traditionalFoods: "年货美食",
    traditionalFoodsDesc: "传统美食每样都寓意美好，代表财富、丰收和幸运。",
    dragonDances: "舞龙",
    dragonDancesDesc: "舞龙表演寓意驱邪祈福，庆祝新的开始和力量。",
    lanterns: "红灯笼",
    lanternsDesc: "红灯笼和春联装点家园，欢迎新一年的到来。",
    fireworks: "烟花爆竹",
    fireworksDesc: "爆竹声声送去祝福，驱赶年兽，迎接新春福气。",
    familyReunions: "团圆",
    familyReunionsDesc: "家族团聚是春节最重要的事，增强亲情纽带。",
    springFestival: "春节",
    springFestivalDate: "正月",
    springFestivalDesc: "春节是中国最重要的传统节日，象征团圆和新生。",
    dragonBoat: "端午节",
    dragonBoatDate: "五月",
    dragonBoatDesc: "端午节纪念诗人屈原，包含划龙舟和吃粽子等活动。",
    midAutumn: "中秋节",
    midAutumnDate: "八月",
    midAutumnDesc: "中秋节庆祝团圆和丰收，食月饼、赏月亮。",
    culturalHeritageText: "中华传统节日融汇了数千年的历史、哲学和文化遗产。它们反映了人与自然的联系、家族的重要性和对祖先的尊重。",
  },
};

export default function HomePage({ language }: HomePageProps) {
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const calculateCountdown = () => {
      const targetDate = new Date(2026, 1, 17, 0, 0, 0, 0).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const t = translations[language];

  return (
    <main className="min-h-screen relative overflow-hidden" style={{
      background: '#ffffff'
    }}>
      {/* Hero Section */}
      <section
  className="relative z-10 px-6 py-14 shadow-md overflow-hidden"
  style={{
    background: `
      linear-gradient(180deg, rgba(255, 248, 240, 0.45) 0%, rgba(254, 243, 199, 0.40) 40%, rgba(255, 235, 180, 0.35) 100%),
      url('/12459192_job516-namcha-09.jpg'),
      linear-gradient(135deg, #fef9e7 0%, #fef3c7 25%, #fff8dc 50%, #fef9e7 75%, #fef3c7 100%)
    `,
    backgroundSize: 'cover, cover, cover',
    backgroundPosition: 'center, center, center',
    backgroundAttachment: 'fixed',
  }}
>
  <div className="relative mx-auto max-w-5xl text-center">
    {/* Main Title */}
    <div className="mb-14">
      <h2
        className="text-[10rem] font-bold text-amber-900 mb-6"
        style={{
          letterSpacing: '0.3em',
          fontFamily: 'var(--font-cinzel)',
          textShadow: '2px 2px 4px rgba(0,0,0,0.15)',
        }}
      >
        春
      </h2>
      <p
        className="text-5xl font-bold text-red-800 mb-4"
        style={{ fontFamily: 'var(--font-cinzel)' }}
      >
        Chinese New Year
      </p>
      <p
        className="text-2xl text-amber-900 max-w-3xl mx-auto font-medium"
        style={{ fontFamily: 'var(--font-noto-serif-sc)' }}
      >
        The most important traditional festival celebrating family, fortune, and renewal.
      </p>
    </div>

    {/* Countdown Timer */}
    <div className="bg-white/90 rounded-2xl shadow-lg p-10 border-4 border-red-400 backdrop-blur-sm">
      <h3
        className="text-3xl font-bold text-red-700 mb-8"
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        {t.countdownTitle}
      </h3>
      <div className="grid grid-cols-4 gap-4">
        {isClient &&
          [
            { label: t.days, value: countdown.days },
            { label: t.hours, value: countdown.hours },
            { label: t.minutes, value: countdown.minutes },
            { label: t.seconds, value: countdown.seconds },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="bg-gradient-to-b from-red-600 to-red-700 text-white rounded-lg p-5 mb-3 shadow-md border-2 border-yellow-400">
                <div className="text-4xl font-bold font-mono">
                  {String(item.value).padStart(2, '0')}
                </div>
              </div>
              <p
                className="text-base font-bold text-red-700"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                {item.label}
              </p>
            </div>
          ))}
      </div>
    </div>
  </div>
</section>


      {/* Festival Information Grid */}
      <section className="relative z-10 px-6 py-16 bg-white">
        <div className="mx-auto max-w-5xl">
          <h3 className="text-center text-4xl font-bold text-red-700 mb-12" style={{fontFamily: 'var(--font-poppins)'}}>
            {t.traditions}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "🧧",
                title: t.redEnvelopes,
                description: t.redEnvelopesDesc,
              },
              {
                icon: "🥟",
                title: t.traditionalFoods,
                description: t.traditionalFoodsDesc,
              },
              {
                icon: "🐉",
                title: t.dragonDances,
                description: t.dragonDancesDesc,
              },
              {
                icon: "🏮",
                title: t.lanterns,
                description: t.lanternsDesc,
              },
              {
                icon: "🎆",
                title: t.fireworks,
                description: t.fireworksDesc,
              },
              {
                icon: "👨‍👩‍👧‍👦",
                title: t.familyReunions,
                description: t.familyReunionsDesc,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-lg border-3 border-red-300 bg-white p-6 shadow-md hover:shadow-lg transition-all"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h4 className="font-bold text-xl text-red-700 mb-3" style={{fontFamily: 'var(--font-poppins)'}}>{item.title}</h4>
                <p className="text-base text-gray-800 leading-relaxed" style={{fontFamily: 'var(--font-poppins)'}}>{item.description}</p>
              </div>
            ))}
          </div>

          {/* Cultural Heritage Section */}
          <div className="rounded-lg border-4 border-red-600 bg-yellow-50 p-10 shadow-md">
            <h3 className="text-3xl font-bold text-red-700 mb-6 text-center" style={{fontFamily: 'var(--font-poppins)'}}>
              {t.heritage}
            </h3>
            <div className="space-y-5 text-gray-800" style={{fontFamily: 'var(--font-poppins)'}}>
              <p className="text-center italic text-xl leading-relaxed font-semibold text-red-700">
                {`"${t.quote}"`}
              </p>
              <p className="text-base leading-relaxed text-gray-900">
                {t.culturalHeritageText}
              </p>
              <p className="text-base leading-relaxed text-gray-900">
                Chinese New Year represents a fresh start, a time to honor family and celebrate traditions that span thousands of years. Every element—from red decorations to family gatherings—carries deep symbolic meaning rooted in ancient wisdom.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
