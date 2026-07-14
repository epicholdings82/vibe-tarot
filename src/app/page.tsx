import FortuneCard from "@/components/FortuneCard";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-[linear-gradient(135deg,#ef4444,#f97316,#eab308,#22c55e,#3b82f6,#4338ca,#8b5cf6)] px-6 py-16">
      <div className="text-center">
        <h1 className="bg-[linear-gradient(90deg,#ef4444,#f97316,#eab308,#22c55e,#3b82f6,#4338ca,#8b5cf6)] bg-clip-text text-3xl font-extrabold text-transparent drop-shadow-sm sm:text-4xl">
          🌈 오늘의 타로 운세
        </h1>
        <p className="mt-2 text-sm font-medium text-white/90 drop-shadow">
          카드를 클릭하면 오늘의 타로 카드와 그 의미를 알려드려요
        </p>
      </div>
      <FortuneCard />
    </div>
  );
}
