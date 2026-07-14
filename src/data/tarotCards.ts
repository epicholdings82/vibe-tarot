export type TarotCard = {
  name: string;
  nameKo: string;
  symbol: string;
  upright: string;
  reversed: string;
};

export const tarotCards: TarotCard[] = [
  { name: "The Fool", nameKo: "바보", symbol: "🃏", upright: "새로운 시작과 자유로운 도전이 기다리고 있어요. 두려움 없이 첫걸음을 내디뎌 보세요.", reversed: "무모한 선택이 발목을 잡을 수 있어요. 성급한 결정은 잠시 미뤄두세요." },
  { name: "The Magician", nameKo: "마법사", symbol: "🎩", upright: "가진 능력을 최대로 발휘할 때입니다. 원하는 것을 현실로 만들 힘이 있어요.", reversed: "능력을 과신하거나 잔재주를 부리면 신뢰를 잃을 수 있어요." },
  { name: "The High Priestess", nameKo: "여사제", symbol: "🌙", upright: "직관이 예리해지는 날. 겉으로 드러나지 않은 진실에 귀 기울여 보세요.", reversed: "감정을 숨기거나 오해가 쌓이기 쉬우니 솔직한 대화가 필요해요." },
  { name: "The Empress", nameKo: "여황제", symbol: "🌸", upright: "풍요와 안정이 함께하는 하루. 주변을 돌보는 마음이 좋은 결실을 맺어요.", reversed: "과잉보호나 나태함을 조심하세요. 균형이 필요한 시점입니다." },
  { name: "The Emperor", nameKo: "황제", symbol: "👑", upright: "확고한 리더십과 책임감이 빛을 발합니다. 계획대로 밀어붙여도 좋아요.", reversed: "고집이 지나치면 주변과 마찰이 생길 수 있어요. 유연함이 필요해요." },
  { name: "The Hierophant", nameKo: "교황", symbol: "⛪", upright: "전통적인 방식과 조언이 도움이 됩니다. 배움과 협력의 기운이 강해요.", reversed: "관습에 얽매이기보다 자신만의 방식을 찾아야 할 때입니다." },
  { name: "The Lovers", nameKo: "연인", symbol: "💞", upright: "마음이 통하는 인연과 조화로운 관계가 기대됩니다. 선택의 순간엔 마음을 따르세요.", reversed: "관계에서 갈등이나 갈림길이 생길 수 있어요. 신중한 소통이 필요해요." },
  { name: "The Chariot", nameKo: "전차", symbol: "🏇", upright: "강한 추진력으로 목표를 향해 거침없이 나아갈 수 있는 날입니다.", reversed: "방향을 잃고 조급해질 수 있으니 속도를 조절하세요." },
  { name: "Strength", nameKo: "힘", symbol: "🦁", upright: "부드러운 인내와 용기로 어려움을 이겨낼 수 있어요. 스스로를 믿으세요.", reversed: "자신감이 흔들리고 조급함이 앞설 수 있으니 마음을 다스리세요." },
  { name: "The Hermit", nameKo: "은둔자", symbol: "🕯️", upright: "혼자만의 시간이 답을 줍니다. 내면을 들여다보기 좋은 하루예요.", reversed: "고립감이나 외로움을 느끼기 쉬우니 주변에 마음을 열어보세요." },
  { name: "Wheel of Fortune", nameKo: "운명의 수레바퀴", symbol: "🎡", upright: "상황이 좋은 방향으로 전환되는 시기입니다. 흐름에 몸을 맡겨보세요.", reversed: "예상치 못한 변수가 생길 수 있어요. 유연하게 대처하세요." },
  { name: "Justice", nameKo: "정의", symbol: "⚖️", upright: "공정한 결과와 균형이 따르는 날. 원칙대로 행동하면 좋은 결과가 있어요.", reversed: "불공평하다고 느끼는 일이 생길 수 있어요. 감정보다 사실을 보세요." },
  { name: "The Hanged Man", nameKo: "매달린 사람", symbol: "🙃", upright: "잠시 멈추고 관점을 바꿔보면 새로운 답이 보입니다. 기다림도 전략이에요.", reversed: "정체된 상황에 답답함을 느낄 수 있어요. 무리한 강행은 피하세요." },
  { name: "Death", nameKo: "죽음", symbol: "🦋", upright: "낡은 것을 정리하고 새로운 국면으로 넘어가기 좋은 때입니다. 변화가 곧 기회예요.", reversed: "변화를 거부하고 미련을 두면 제자리걸음이 될 수 있어요." },
  { name: "Temperance", nameKo: "절제", symbol: "🧘", upright: "균형과 조화가 하루를 편안하게 만들어줍니다. 서두르지 않아도 괜찮아요.", reversed: "과유불급, 무엇이든 지나치면 탈이 날 수 있으니 절제가 필요해요." },
  { name: "The Devil", nameKo: "악마", symbol: "😈", upright: "유혹이나 집착에 흔들리기 쉬운 날이에요. 무엇에 매여 있는지 돌아보세요.", reversed: "얽매였던 것에서 벗어나 자유로워질 좋은 기회가 찾아옵니다." },
  { name: "The Tower", nameKo: "탑", symbol: "⚡", upright: "갑작스러운 변화나 놀라운 소식이 있을 수 있어요. 당황하지 말고 받아들이세요.", reversed: "위기를 가까스로 피해가는 날. 그래도 방심은 금물이에요." },
  { name: "The Star", nameKo: "별", symbol: "⭐", upright: "희망과 영감이 가득한 하루. 바라던 일에 좋은 기운이 따릅니다.", reversed: "기대가 꺾여 실망할 수 있지만, 희망의 끈은 놓지 마세요." },
  { name: "The Moon", nameKo: "달", symbol: "🌕", upright: "불확실함 속에서도 직관을 믿고 나아가면 길이 보입니다.", reversed: "오해나 착각이 생기기 쉬우니 성급한 판단은 피하세요." },
  { name: "The Sun", nameKo: "태양", symbol: "☀️", upright: "밝고 긍정적인 에너지가 넘치는 최고의 날입니다. 자신 있게 행동하세요.", reversed: "잠시 흐릿한 기분이 들 수 있지만 곧 밝은 기운을 되찾을 거예요." },
  { name: "Judgement", nameKo: "심판", symbol: "📯", upright: "그동안의 노력을 인정받고 새로운 국면을 맞이하게 됩니다.", reversed: "스스로를 너무 몰아붙이지 마세요. 자책보다 성찰이 필요해요." },
  { name: "The World", nameKo: "세계", symbol: "🌍", upright: "하나의 일이 완성되고 만족스러운 결실을 맺는 날입니다. 성취감을 만끽하세요.", reversed: "마무리가 더디게 느껴질 수 있어요. 조금만 더 인내심을 가지세요." },
];
