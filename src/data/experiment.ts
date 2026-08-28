export const EXPERIMENT_STAGES = [
  {
    id: "ai-a",
    title: "AI A — 초기 구현",
    actor: "Claude Sonnet 5",
    duration: "약 12분",
    requests: "8회",
    testStatus: "PASS 6/10",
    description: "프로젝트 기반, 홈, Context Handover 페이지와 13개 단위 테스트를 만들었습니다.",
  },
  {
    id: "handover",
    title: "Handover — 상태 전달",
    actor: "구조화된 문서와 작업 트리",
    duration: "N/A",
    requests: "N/A",
    testStatus: "13 tests PASS 기록",
    description: "대화 이력 없이 요구사항, 테스트 계획, 완료·미완료 상태와 금지사항을 전달했습니다.",
  },
  {
    id: "ai-b",
    title: "AI B — 이어서 완성",
    actor: "OpenAI Codex",
    duration: "N/A",
    requests: "N/A",
    testStatus: "PASS 10/10",
    description: "인계 상태를 독립 검증하고 남은 페이지, 테스트, 모바일 회귀 검증을 수행했습니다.",
  },
] as const;
