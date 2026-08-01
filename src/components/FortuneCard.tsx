"use client";

import { useState } from "react";
import { tarotCards, luckyItems, luckyColors, type TarotCard } from "@/data/tarotCards";
import { saveFortune, generateAiFortune } from "@/app/actions";

type Draw = {
  card: TarotCard;
  reversed: boolean;
  luckyItem: string;
  luckyColor: string;
};

type SaveStatus = "idle" | "saving" | "saved" | "error";
type AiStatus = "idle" | "loading" | "done" | "error";

function formatContent(draw: Draw): string {
  const orientation = draw.reversed ? "역방향" : "정방향";
  const meaning = draw.reversed ? draw.card.reversed : draw.card.upright;
  return [
    `${draw.card.nameKo}(${orientation}) — ${meaning}`,
    `행운의 아이템: ${draw.luckyItem}`,
    `행운의 색: ${draw.luckyColor}`,
  ].join("\n");
}

function pickRandom<T>(items: T[] | undefined | null, fallback: T): T {
  if (!items || items.length === 0) return fallback;
  return items[Math.floor(Math.random() * items.length)];
}

function drawCard(): Draw | null {
  const card = pickRandom<TarotCard | null>(tarotCards, null);
  if (!card) return null;

  const reversed = Math.random() < 0.5;
  const luckyItem = pickRandom(luckyItems, "행운의 기운");
  const luckyColor = pickRandom(luckyColors, "무지개색");
  return { card, reversed, luckyItem, luckyColor };
}

export default function FortuneCard() {
  const [flipped, setFlipped] = useState(false);
  const [draw, setDraw] = useState<Draw | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [userName, setUserName] = useState("");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveError, setSaveError] = useState("");
  const [aiStatus, setAiStatus] = useState<AiStatus>("idle");
  const [aiText, setAiText] = useState("");
  const [aiError, setAiError] = useState("");

  const persist = async (next: Draw) => {
    setSaveStatus("saving");
    setSaveError("");
    try {
      const result = await saveFortune({
        cardName: `${next.card.nameKo} / ${next.card.name}`,
        userName,
        content: formatContent(next),
      });
      if (result.ok) {
        setSaveStatus("saved");
      } else {
        setSaveStatus("error");
        setSaveError(result.error ?? "저장에 실패했습니다.");
      }
    } catch {
      setSaveStatus("error");
      setSaveError("저장 중 오류가 발생했습니다.");
    }
  };

  const handleAiFortune = async () => {
    if (!draw || aiStatus === "loading") return;
    setAiStatus("loading");
    setAiError("");
    try {
      const result = await generateAiFortune({
        cardName: `${draw.card.nameKo} (${draw.card.name})`,
        orientation: draw.reversed ? "역방향" : "정방향",
        meaning: draw.reversed ? draw.card.reversed : draw.card.upright,
        luckyItem: draw.luckyItem,
        luckyColor: draw.luckyColor,
        userName,
      });
      if (result.ok) {
        setAiText(result.text);
        setAiStatus("done");
      } else {
        setAiStatus("error");
        setAiError(result.error);
      }
    } catch {
      setAiStatus("error");
      setAiError("AI 운세 생성 중 오류가 발생했습니다.");
    }
  };

  const handleClick = () => {
    if (isAnimating) return;

    if (!flipped) {
      const next = drawCard();
      if (!next) return;
      setDraw(next);
      setAiStatus("idle");
      setAiText("");
      setAiError("");
      setIsAnimating(true);
      setFlipped(true);
      window.setTimeout(() => setIsAnimating(false), 700);
      void persist(next);
    } else {
      setIsAnimating(true);
      setFlipped(false);
      window.setTimeout(() => setIsAnimating(false), 700);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        maxLength={40}
        placeholder="이름 (선택)"
        aria-label="이름"
        className="w-56 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-center text-sm text-white placeholder:text-white/40 focus:border-amber-300/60 focus:outline-none"
      />

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
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-y-auto rounded-2xl border-2 border-amber-300/40 bg-gradient-to-br from-slate-900 via-indigo-950 to-black p-5 text-center shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
            {draw && (
              <>
                <span
                  className={`text-5xl transition-transform duration-300 ${
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
                <p className="text-sm leading-relaxed text-white/80">
                  {draw.reversed ? draw.card.reversed : draw.card.upright}
                </p>
                <div className="mt-1 flex flex-col items-center gap-1 rounded-xl bg-white/10 px-3 py-2 text-xs text-amber-100">
                  <span>🍀 행운의 아이템: {draw.luckyItem}</span>
                  <span>🎨 행운의 색: {draw.luckyColor}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleClick}
          className="rounded-full bg-amber-300 px-8 py-3 text-base font-semibold text-zinc-900 shadow-md transition-colors hover:bg-amber-200 active:scale-95"
        >
          {flipped ? "다시 뽑기" : "타로 카드 뽑기"}
        </button>

        {flipped && draw && (
          <button
            onClick={handleAiFortune}
            disabled={aiStatus === "loading"}
            className="rounded-full border border-amber-300/60 bg-white/10 px-8 py-3 text-base font-semibold text-amber-200 shadow-md transition-colors hover:bg-white/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {aiStatus === "loading" ? "AI가 운세를 쓰는 중…" : "✨ AI 운세 새로 만들기"}
          </button>
        )}
      </div>

      {aiStatus === "done" && (
        <div className="max-w-md rounded-xl border border-amber-300/30 bg-white/10 px-4 py-3 text-sm leading-relaxed text-amber-50">
          {aiText}
        </div>
      )}
      {aiStatus === "error" && (
        <p className="max-w-md text-center text-xs text-rose-300">AI 운세 생성 실패: {aiError}</p>
      )}

      <p className="min-h-5 text-xs text-white/50" aria-live="polite">
        {saveStatus === "saving" && "저장 중…"}
        {saveStatus === "saved" && "운세를 저장했어요"}
        {saveStatus === "error" && `저장 실패: ${saveError}`}
      </p>
    </div>
  );
}
