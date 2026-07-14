"use client";

import { useState } from "react";
import { tarotCards, luckyItems, luckyColors, type TarotCard } from "@/data/tarotCards";

type Draw = {
  card: TarotCard;
  reversed: boolean;
  luckyItem: string;
  luckyColor: string;
};

function drawCard(): Draw {
  const card = tarotCards[Math.floor(Math.random() * tarotCards.length)];
  const reversed = Math.random() < 0.5;
  const luckyItem = luckyItems[Math.floor(Math.random() * luckyItems.length)];
  const luckyColor = luckyColors[Math.floor(Math.random() * luckyColors.length)];
  return { card, reversed, luckyItem, luckyColor };
}

export default function FortuneCard() {
  const [flipped, setFlipped] = useState(false);
  const [draw, setDraw] = useState<Draw | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;

    if (!flipped) {
      setDraw(drawCard());
      setIsAnimating(true);
      setFlipped(true);
      window.setTimeout(() => setIsAnimating(false), 700);
    } else {
      setIsAnimating(true);
      setFlipped(false);
      window.setTimeout(() => setIsAnimating(false), 700);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="[perspective:1200px]">
        <div
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick();
            }
          }}
          className={`relative h-96 w-64 cursor-pointer transition-transform duration-700 [transform-style:preserve-3d] sm:h-[28rem] sm:w-72 ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* Front (card back design) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border-4 border-transparent bg-[linear-gradient(#1e1b4b,#1e1b4b),linear-gradient(135deg,#ef4444,#f97316,#eab308,#22c55e,#3b82f6,#4338ca,#8b5cf6)] bg-origin-border p-6 text-center shadow-xl [background-clip:padding-box,border-box] [backface-visibility:hidden]">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/60 text-4xl">
              🌈
            </div>
            <p className="bg-[linear-gradient(90deg,#ef4444,#f97316,#eab308,#22c55e,#3b82f6,#4338ca,#8b5cf6)] bg-clip-text text-xl font-bold tracking-widest text-transparent">
              TAROT
            </p>
            <p className="text-sm text-white/70">카드를 눌러 오늘의 타로를 뽑아보세요</p>
          </div>

          {/* Back (revealed tarot card) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-y-auto rounded-2xl border-4 border-transparent bg-[linear-gradient(#1e1b4b,#1e1b4b),linear-gradient(135deg,#ef4444,#f97316,#eab308,#22c55e,#3b82f6,#4338ca,#8b5cf6)] bg-origin-border p-5 text-center shadow-xl [background-clip:padding-box,border-box] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            {draw && (
              <>
                <span
                  className={`text-5xl transition-transform duration-300 ${
                    draw.reversed ? "rotate-180" : ""
                  }`}
                >
                  {draw.card.symbol}
                </span>
                <p className="bg-[linear-gradient(90deg,#ef4444,#f97316,#eab308,#22c55e,#3b82f6,#4338ca,#8b5cf6)] bg-clip-text text-lg font-bold text-transparent">
                  {draw.card.nameKo}
                </p>
                <p className="text-xs uppercase tracking-wide text-white/50">
                  {draw.card.name}
                </p>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    draw.reversed
                      ? "bg-rose-500/20 text-rose-300"
                      : "bg-emerald-500/20 text-emerald-300"
                  }`}
                >
                  {draw.reversed ? "역방향" : "정방향"}
                </span>
                <p className="text-sm leading-relaxed text-white/80">
                  {draw.reversed ? draw.card.reversed : draw.card.upright}
                </p>
                <div className="mt-1 flex flex-col items-center gap-1 rounded-xl bg-white/10 px-3 py-2 text-xs text-white">
                  <span>🍀 행운의 아이템: {draw.luckyItem}</span>
                  <span>🎨 행운의 색: {draw.luckyColor}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleClick}
        className="rounded-full bg-[linear-gradient(90deg,#ef4444,#f97316,#eab308,#22c55e,#3b82f6,#4338ca,#8b5cf6)] px-8 py-3 text-base font-semibold text-white shadow-md transition-transform hover:scale-105 active:scale-95"
      >
        {flipped ? "다시 뽑기" : "타로 카드 뽑기"}
      </button>
    </div>
  );
}
