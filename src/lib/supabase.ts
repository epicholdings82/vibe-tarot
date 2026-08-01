import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type SupabaseInit =
  | { client: SupabaseClient; reason: null }
  | { client: null; reason: string };

/**
 * 서버 전용. secret key 를 쓰므로 클라이언트 컴포넌트에서 import 하지 말 것.
 * 실패하면 throw 하지 않고, 원인을 담은 reason 을 함께 돌려준다.
 */
export function getSupabase(): SupabaseInit {
  // 대시보드에서 값을 붙여넣을 때 앞뒤 공백/개행이 섞이는 경우가 많아 trim 한다.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const secretKey = process.env.SUPABASE_SECRET_KEY?.trim();

  const missing = [
    !url && "NEXT_PUBLIC_SUPABASE_URL",
    !secretKey && "SUPABASE_SECRET_KEY",
  ].filter(Boolean);

  if (!url || !secretKey) {
    const reason = `환경변수가 비어 있습니다: ${missing.join(", ")}`;
    console.error("[supabase]", reason);
    return { client: null, reason };
  }

  try {
    return {
      client: createClient(url, secretKey, { auth: { persistSession: false } }),
      reason: null,
    };
  } catch (e) {
    // 값은 있지만 URL 형식이 아닌 경우 (예: https:// 누락)
    const reason = `NEXT_PUBLIC_SUPABASE_URL 값이 잘못되었습니다: ${
      e instanceof Error ? e.message : String(e)
    }`;
    console.error("[supabase]", reason);
    return { client: null, reason };
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
