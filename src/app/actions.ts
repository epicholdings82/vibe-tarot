"use server";

import { refresh } from "next/cache";
import { getSupabase } from "@/lib/supabase";

export async function saveFortune(input: {
  cardName: string;
  userName: string;
  content: string;
}) {
  const supabase = getSupabase();

  if (!supabase) {
    return { ok: false, error: "Supabase 환경변수가 설정되지 않았습니다." };
  }

  const userName = input.userName.trim();

  const { error } = await supabase.from("fortunes").insert({
    card_name: input.cardName.slice(0, 100),
    user_name: userName ? userName.slice(0, 40) : null,
    content: input.content.slice(0, 2000),
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  // 메인 화면의 '오늘 뽑은 사람 수'를 새로 읽어오게 한다.
  refresh();

  return { ok: true };
}
