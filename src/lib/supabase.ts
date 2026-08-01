import { createClient } from "@supabase/supabase-js";

/**
 * 서버 전용. secret key 를 쓰므로 클라이언트 컴포넌트에서 import 하지 말 것.
 * 환경변수가 없으면 null 을 돌려준다.
 */
export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) return null;

  return createClient(url, secretKey, {
    auth: { persistSession: false },
  });
}

/** 한국 시간 기준 오늘 날짜(YYYY-MM-DD). fortunes.drawn_on 기본값과 같은 기준. */
export function todayInSeoul() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
