import FortuneCard from "@/components/FortuneCard";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-gradient-to-b from-indigo-950 via-slate-900 to-black px-6 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">🔮 오늘의 타로 운세</h1>
        <p className="mt-2 text-sm text-white/60">
          카드를 클릭하면 오늘의 타로 카드와 그 의미를 알려드려요
        </p>
      </div>
      <FortuneCard />
    </div>
  );
}
