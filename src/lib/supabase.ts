import { createClient } from "@supabase/supabase-js";

/**
 * 서버 전용. secret key 를 쓰므로 클라이언트 컴포넌트에서 import 하지 말 것.
 * 환경변수가 없거나 값이 잘못되면 null 을 돌려준다 (throw 하지 않는다).
 */
export function getSupabase() {
  // 대시보드에서 값을 붙여넣을 때 앞뒤 공백/개행이 섞이는 경우가 많아 trim 한다.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const secretKey = process.env.SUPABASE_SECRET_KEY?.trim();

  if (!url || !secretKey) {
    console.error("[supabase] 환경변수 누락:", {
      NEXT_PUBLIC_SUPABASE_URL: Boolean(url),
      SUPABASE_SECRET_KEY: Boolean(secretKey),
    });
    return null;
  }

  try {
    return createClient(url, secretKey, {
      auth: { persistSession: false },
    });
  } catch (e) {
    console.error("[supabase] client 생성 실패:", e);
    return null;
  }
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
