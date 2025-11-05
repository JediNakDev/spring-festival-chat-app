"use client";
import { useState } from "react";

export default function WishLantern({ language }: { language: "en" | "zh" }) {
  const [wish, setWish] = useState("");
  const [color, setColor] = useState("#dc2626");
  const [pattern, setPattern] = useState<"solid" | "stripes" | "dots">("solid");
  const [lanterns, setLanterns] = useState<
    { id: number; wish: string; color: string; pattern: string; offset: number }[]
  >([
    { id: 1, wish: "Peace", color: "#dc2626", pattern: "solid", offset: -15 },
    { id: 2, wish: "Happiness", color: "#f59e0b", pattern: "stripes", offset: 0 },
    { id: 3, wish: "Fortune", color: "#ec4899", pattern: "dots", offset: 15 },
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

  const t = {
    title: language === "en" ? "Wish Lantern" : "许愿灯笼",
    subtitle:
      language === "en"
        ? "Design your lantern and send your wish into the sky"
        : "设计你的灯笼并让祝愿飞向天空",
    wishPlaceholder:
      language === "en"
        ? "Write your wish for the New Year..."
        : "写下你对新年的祝福...",
    submitted:
      language === "en"
        ? "Your lantern has been released into the sky!"
        : "你的灯笼已飞向天空！",
  };

  const handleSubmit = () => {
    if (!wish.trim()) return;
    const newLantern = {
      id: Date.now(),
      wish,
      color,
      pattern,
      offset: Math.random() * 40 - 20,
    };
    setLanterns([...lanterns, newLantern]);
    setShowSuccess(true);
    setWish("");
    setTimeout(() => setShowSuccess(false), 2500);
  };

  const getPatternStyle = (color: string, pattern: string) => {
    if (pattern === "stripes")
      return {
        backgroundImage: `repeating-linear-gradient(90deg, ${color}, ${color} 10px, rgba(255,255,255,0.4) 10px, rgba(255,255,255,0.4) 20px)`,
      };
    if (pattern === "dots")
      return {
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 25%, transparent 25%)`,
        backgroundSize: "20px 20px",
        backgroundColor: color,
      };
    return { backgroundColor: color };
  };

  return (
    <div className="h-screen flex font-[Poppins] bg-gradient-to-br from-blue-400 via-purple-300 via-pink-300 to-orange-200 overflow-hidden relative">
      {/* Floating sparkles and decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Glowing orbs */}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-yellow-300 opacity-60 blur-sm animate-pulse"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${4 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          ></div>
        ))}
        
        {/* Decorative cloud brushstrokes - traditional Chinese style */}
        <div className="absolute top-12 left-8 text-6xl opacity-20 transform -rotate-45">☁️</div>
        <div className="absolute top-1/3 right-12 text-5xl opacity-15 transform rotate-12">☁️</div>
        <div className="absolute bottom-1/4 left-1/4 text-4xl opacity-20 transform -rotate-20">☁️</div>
        
        {/* Traditional Chinese mountain silhouette instead of stick */}
        <svg className="absolute bottom-0 left-0 right-0 w-full h-32 opacity-20" viewBox="0 0 200 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor: '#7f1d1d', stopOpacity: 0.6}} />
              <stop offset="100%" style={{stopColor: '#450a0a', stopOpacity: 0.8}} />
            </linearGradient>
          </defs>
          <polygon points="0,50 30,20 60,40 100,10 140,35 170,15 200,50 200,100 0,100" fill="url(#mountainGrad)" />
          <polygon points="0,60 40,30 80,50 120,25 160,45 200,65 200,100 0,100" fill="#7f1d1d" opacity="0.4" />
        </svg>
        
        {/* Traditional pattern borders */}
        <div className="absolute bottom-32 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent opacity-40"></div>
      </div>

      {/* LEFT SIDE - Sky with pagoda silhouette */}
      <div className="w-1/2 relative flex flex-col items-center justify-center overflow-hidden text-white shadow-inner">
        {/* Lanterns floating */}
        <div className="absolute inset-0 overflow-hidden">
          {lanterns.map((l, idx) => {
            const isNew = idx === lanterns.length - 1 && wish === "";
            return (
              <div
                key={l.id}
                className="absolute"
                style={{
                  left: `calc(45% + ${l.offset * 2}%)`,
                  top: isNew ? "65%" : "20%",
                  animation: isNew ? `floatUp ${8 + Math.random() * 3}s ease-in-out forwards` : "none",
                  animationDelay: `${idx * 0.4}s`,
                }}
              >
                <style>{`
                  @keyframes floatUp {
                    0% { transform: translateY(0) scale(1); opacity: 1; }
                    50% { transform: translateY(-40vh) scale(1.15); opacity: 1; }
                    100% { transform: translateY(-60vh) scale(1); opacity: 1; }
                  }
                `}</style>
                <div className="flex flex-col items-center">
                  {/* Lantern ring */}
                  <div className="w-10 h-2 bg-yellow-600 rounded-full mb-1 shadow-md" />

                  {/* Traditional round silk lantern */}
                  <div
                    className="relative w-20 h-24 flex flex-col items-center justify-center border-4 border-yellow-800 rounded-full shadow-[0_0_25px_rgba(255,200,0,0.4)]"
                    style={{
                      ...getPatternStyle(l.color, l.pattern),
                      boxShadow:
                        "inset 0 5px 15px rgba(255,255,255,0.4), 0 6px 20px rgba(0,0,0,0.4)",
                    }}
                  >
                    {/* Inner glow */}
                    <div className="absolute inset-2 bg-gradient-to-b from-yellow-200/30 to-transparent rounded-full blur-md animate-pulse"></div>
                    {/* Vertical decorative lines */}
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute h-full w-0.5 bg-yellow-900/40"
                        style={{ left: `${25 * (i + 1) / 5}%` }}
                      ></div>
                    ))}
                    {/* Wish text */}
                    <p
                      className="text-center text-yellow-50 bg-red-900/60 px-2 py-1 rounded-md z-10 font-semibold shadow-md"
                      style={{
                        fontSize: l.wish.length > 50 ? '0.4rem' : l.wish.length > 30 ? '0.5rem' : '0.6rem',
                      }}
                    >
                      {l.wish}
                    </p>
                    {/* Ornate top and bottom frames */}
                    <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-yellow-800 via-yellow-600 to-yellow-800 rounded-t-full"></div>
                    <div className="absolute bottom-0 w-full h-2 bg-gradient-to-r from-yellow-800 via-yellow-600 to-yellow-800 rounded-b-full"></div>
                  </div>

                  {/* Tassel */}
                  <div className="w-0.5 h-6 bg-yellow-500 mt-1"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="h-4 w-[2px] bg-gradient-to-b from-yellow-400 to-transparent"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Title and subtitle */}
        <div className="relative z-10 text-center">
          <h1
            className="text-5xl font-bold mb-4 drop-shadow-lg text-yellow-200"
            style={{
              fontFamily: "Cinzel Decorative",
              letterSpacing: "0.05em",
            }}
          >
            {t.title}
          </h1>
          <p
            className="text-lg text-yellow-100 opacity-90 max-w-md mx-auto leading-relaxed"
            style={{
              fontFamily:
                language === "zh" ? "Long Cang, sans-serif" : "Poppins",
            }}
          >
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Design panel */}
      <div className="w-1/2 bg-gradient-to-b from-red-100 via-orange-50 to-yellow-100 flex flex-col justify-center p-10 shadow-inner border-l-4 border-yellow-500">
        <h2
          className="text-3xl font-bold text-red-900 mb-6 text-center drop-shadow"
          style={{ fontFamily: "Cinzel Decorative" }}
        >
          {language === "en" ? "Customize Your Lantern" : "自定义你的灯笼"}
        </h2>

        {/* Lantern preview */}
        <div className="flex justify-center mb-8">
          <div className="relative flex flex-col items-center">
            <div className="w-16 h-3 bg-yellow-500 rounded-full mb-2" />
            <div
              className="w-40 h-52 rounded-full border-4 border-yellow-600 flex items-center justify-center shadow-lg"
              style={getPatternStyle(color, pattern)}
            >
              <p className="text-sm text-center text-yellow-50 bg-red-800/50 px-3 py-2 rounded-lg">
                {wish || (language === "en" ? "Your wish..." : "你的祝愿...")}
              </p>
            </div>
            <div className="w-0.5 h-8 bg-yellow-500 mt-2"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-red-700 mb-2">
              {language === "en" ? "Lantern Color" : "灯笼颜色"}
            </label>
            <div className="flex gap-2 justify-center flex-wrap">
              {["#dc2626", "#f59e0b", "#ec4899", "#8b5cf6", "#10b981"].map(
                (c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-10 h-10 rounded-full border-4 ${
                      color === c
                        ? "border-yellow-400 ring-2 ring-yellow-300"
                        : "border-gray-300"
                    } transition-transform hover:scale-110`}
                    style={{ backgroundColor: c }}
                  />
                )
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-red-700 mb-2">
              {language === "en" ? "Lantern Pattern" : "灯笼图案"}
            </label>
            <div className="flex gap-3 justify-center">
              {(["solid", "stripes", "dots"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPattern(p)}
                  className={`px-4 py-2 rounded-lg border text-sm font-semibold ${
                    pattern === p
                      ? "bg-red-100 border-red-600 text-red-700 shadow-md"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {language === "en"
                    ? p.charAt(0).toUpperCase() + p.slice(1)
                    : p === "solid"
                    ? "纯色"
                    : p === "stripes"
                    ? "条纹"
                    : "圆点"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Wish input */}
        <div className="mt-6">
          <textarea
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            placeholder={t.wishPlaceholder}
            maxLength={120}
            className="w-full h-20 p-3 rounded-xl border-2 border-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none text-gray-800 placeholder-gray-500 text-sm resize-none shadow-inner"
          />
          <p className="text-xs text-gray-500 mt-1 text-right">
            {wish.length}/120
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!wish.trim()}
          className="mt-5 w-full py-3 rounded-lg bg-gradient-to-r from-red-600 via-red-500 to-orange-400 text-white font-semibold text-sm hover:scale-[1.02] transition-transform shadow-lg disabled:bg-gray-400"
        >
          💫 {language === "en" ? "Light My Lantern" : "点亮我的灯笼"}
        </button>

        {showSuccess && (
          <div className="text-center mt-3 text-green-700 font-semibold bg-green-100 border border-green-400 py-2 rounded-lg animate-fadeIn">
            ✨ {t.submitted}
          </div>
        )}
      </div>
    </div>
  );
}
