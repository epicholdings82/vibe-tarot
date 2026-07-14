"use client";

import { useState } from "react";
import { tarotCards, type TarotCard } from "@/data/tarotCards";

type Draw = {
  card: TarotCard;
  reversed: boolean;
};

function drawCard(): Draw {
  const card = tarotCards[Math.floor(Math.random() * tarotCards.length)];
  const reversed = Math.random() < 0.5;
  return { card, reversed };
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
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-amber-300/40 bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-950 p-6 text-center shadow-xl [backface-visibility:hidden]">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-amber-300/60 text-4xl">
              ✨
            </div>
            <p className="text-xl font-bold tracking-widest text-amber-200">TAROT</p>
            <p className="text-sm text-white/70">카드를 눌러 오늘의 타로를 뽑아보세요</p>
          </div>

          {/* Back (revealed tarot card) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-amber-300/40 bg-gradient-to-br from-slate-900 via-indigo-950 to-black p-6 text-center shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
            {draw && (
              <>
                <span
                  className={`text-6xl transition-transform duration-300 ${
                    draw.reversed ? "rotate-180" : ""
                  }`}
                >
                  {draw.card.symbol}
                </span>
                <p className="text-lg font-bold text-amber-200">
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
                <p className="mt-1 text-sm leading-relaxed text-white/80">
                  {draw.reversed ? draw.card.reversed : draw.card.upright}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleClick}
        className="rounded-full bg-amber-300 px-8 py-3 text-base font-semibold text-zinc-900 shadow-md transition-colors hover:bg-amber-200 active:scale-95"
      >
        {flipped ? "다시 뽑기" : "타로 카드 뽑기"}
      </button>
    </div>
  );
}
