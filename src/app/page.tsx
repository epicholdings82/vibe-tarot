import FortuneCard from "@/components/FortuneCard";
import { getSupabase, todayInSeoul } from "@/lib/supabase";

// 매 요청마다 오늘의 카운트를 다시 읽는다.
export const dynamic = "force-dynamic";

// 카운트는 장식용이므로, 어떤 이유로 실패하든 페이지 전체를 죽이지 않고
// null 을 돌려 pill 만 숨긴다. 원인은 서버 로그로 남긴다.
async function getTodayCount(): Promise<number | null> {
  try {
    const supabase = getSupabase();
    if (!supabase) return null;

    const { count, error } = await supabase
      .from("fortunes")
      .select("*", { count: "exact", head: true })
      .eq("drawn_on", todayInSeoul());

    if (error) {
      console.error("[fortunes] 카운트 조회 실패:", error.message);
      return null;
    }
    return count ?? 0;
  } catch (e) {
    console.error("[fortunes] 카운트 조회 중 예외:", e);
    return null;
  }
}

export default async function Home() {
  const todayCount = await getTodayCount();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-gradient-to-b from-indigo-950 via-slate-900 to-black px-6 py-16">
      {todayCount !== null && (
        <p className="rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1.5 text-sm text-amber-100">
          오늘 <span className="font-bold">{todayCount.toLocaleString("ko-KR")}</span>명이 운세를 뽑았어요
        </p>
      )}

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
