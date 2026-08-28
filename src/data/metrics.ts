import type { Metric } from "./types";

/**
 * AI A → AI B 실험에서 실제로 측정할 지표.
 * value가 null인 항목은 아직 측정되지 않았다는 뜻이며 UI에서 "N/A"로 표시된다.
 * AI B는 실험이 끝난 뒤 실측값으로 채운다. 추정치를 넣지 말 것.
 */
export const METRICS: Metric[] = [
  {
    id: "handover-pass-rate",
    label: "인계 시점 테스트 통과",
    value: 6,
    unit: "/10",
    description: "AI A가 중단할 때 통과하던 테스트 수. AI B가 독립 실행으로 검증해야 한다.",
  },
  {
    id: "final-pass-rate",
    label: "최종 테스트 통과",
    value: 10,
    unit: "/10",
    description: "AI B 작업 완료 후 통과한 테스트 수.",
  },
  {
    id: "ai-a-requests",
    label: "AI A 요청 수",
    value: 8,
    unit: "회",
    description: "AI A가 소비한 대화 요청 수.",
  },
  {
    id: "ai-b-requests",
    label: "AI B 요청 수",
    value: null,
    unit: "회",
    description: "AI B가 완료까지 소비한 요청 수. 낮을수록 인계 문서가 좋았다는 신호다.",
  },
  {
    id: "time-to-first-edit",
    label: "첫 수정까지 걸린 시간",
    value: null,
    unit: "분",
    description: "AI B가 저장소를 받고 첫 코드 수정을 하기까지 걸린 시간. 인계 품질의 직접 지표.",
  },
  {
    id: "handover-gaps",
    label: "인계 누락 항목",
    value: 0,
    unit: "개",
    description: "인계 문서에 없어서 AI B가 스스로 재탐색해야 했던 사실의 수.",
  },
];
