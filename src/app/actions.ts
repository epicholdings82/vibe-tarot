"use server";

import { refresh } from "next/cache";
import { getSupabase } from "@/lib/supabase";
import { generateFortuneText } from "@/lib/openrouter";

export async function saveFortune(input: {
  cardName: string;
  userName: string;
  content: string;
}) {
  const { client: supabase, reason } = getSupabase();

  if (!supabase) {
    return { ok: false, error: reason };
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

export async function generateAiFortune(input: {
  cardName: string;
  orientation: "정방향" | "역방향";
  meaning: string;
  luckyItem: string;
  luckyColor: string;
  userName?: string;
}) {
  return generateFortuneText({
    ...input,
    userName: input.userName?.trim().slice(0, 40) || undefined,
  });
}
