type OpenRouterResult = { ok: true; text: string } | { ok: false; error: string };

type FortuneContext = {
  cardName: string;
  orientation: "정방향" | "역방향";
  meaning: string;
  luckyItem: string;
  luckyColor: string;
  userName?: string;
};

/**
 * 서버 전용. API 키를 쓰므로 클라이언트 컴포넌트에서 import 하지 말 것.
 * 실패해도 throw 하지 않고, 원인을 담은 error 를 함께 돌려준다.
 */
export async function generateFortuneText(input: FortuneContext): Promise<OpenRouterResult> {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();

  if (!apiKey) {
    const reason = "환경변수가 비어 있습니다: OPENROUTER_API_KEY";
    console.error("[openrouter]", reason);
    return { ok: false, error: reason };
  }

  // 키는 HTTP 헤더로 전송되므로 ASCII 여야 한다.
  if (!/^[\x20-\x7e]+$/.test(apiKey)) {
    const reason = "OPENROUTER_API_KEY 에 ASCII 가 아닌 문자가 있습니다. 값이 실제 키 전체인지 확인하세요.";
    console.error("[openrouter]", reason);
    return { ok: false, error: reason };
  }

  const model = process.env.OPENROUTER_MODEL?.trim() || "openai/gpt-4o-mini";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

  const namePart = input.userName ? `상담자의 이름은 "${input.userName}"입니다. ` : "";
  const prompt = [
    `오늘 뽑은 타로 카드는 "${input.cardName}"(${input.orientation})입니다.`,
    `카드의 기본 의미: ${input.meaning}`,
    `행운의 아이템은 "${input.luckyItem}", 행운의 색은 "${input.luckyColor}"입니다.`,
    namePart,
    "위 정보를 바탕으로, 오늘 하루를 위한 개인화된 타로 운세를 한국어로 3~4문장으로 새로 작성해 주세요.",
    "따뜻하고 구체적인 조언을 담되, 과장되지 않게 써주세요.",
  ].join(" ");

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": siteUrl,
        // HTTP 헤더 값은 ASCII(ByteString)여야 하므로 한글을 직접 넣으면 fetch 가
        // "Cannot convert argument to a ByteString" 에러를 던진다.
        "X-Title": "Today's Tarot Fortune",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: "당신은 따뜻하고 통찰력 있는 타로 상담사입니다. 항상 한국어로 답합니다.",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 400,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      const reason = `OpenRouter 요청 실패 (${res.status}): ${body.slice(0, 300)}`;
      console.error("[openrouter]", reason);
      return { ok: false, error: reason };
    }

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content?.trim();

    if (!text) {
      const reason = "OpenRouter 응답에 내용이 없습니다.";
      console.error("[openrouter]", reason, data);
      return { ok: false, error: reason };
    }

    return { ok: true, text };
  } catch (e) {
    const reason = `OpenRouter 호출 중 오류: ${e instanceof Error ? e.message : String(e)}`;
    console.error("[openrouter]", reason);
    return { ok: false, error: reason };
  }
}
