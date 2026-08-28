/**
 * 프로젝트 전역 데이터 타입.
 * 원칙: 확인되지 않은 수치는 만들지 않는다. 모르는 값은 `null`로 두고 UI에서 "N/A"로 표시한다.
 * 0으로 임의 치환하지 말 것 — 0은 "측정 결과 0"이라는 뜻이어야 한다.
 */

/** 외부 조사 출처 1건. url이 null이면 링크가 아닌 평문으로 렌더링한다. */
export type Source = {
  id: string;
  title: string;
  /** 기관 또는 저자 */
  org: string;
  /** "YYYY" 또는 "YYYY-MM" */
  date: string;
  /** 확인된 URL이 없으면 null */
  url: string | null;
  /** 이 사이트에서 실제로 인용하는 핵심 주장 */
  claim: string;
};

/** AI 코딩 도구의 컨텍스트/사용량 한도 비교 1행. */
export type ModelEntry = {
  id: string;
  tool: string;
  /** 예: "200K tokens". 공식 출처로 확인하지 못했으면 null */
  contextWindow: string | null;
  limitType: "fixed-message" | "token-usage" | "unknown";
  note: string;
  /** Source.id 참조 */
  sourceId: string | null;
};

/** AI-Driven Development 생산성 지표 1건. */
export type Metric = {
  id: string;
  label: string;
  /** 아직 측정하지 않았으면 null → UI에서 "N/A" */
  value: number | null;
  unit: string;
  description: string;
};

/** 인계 문서가 반드시 담아야 하는 항목 1건. */
export type ChecklistItem = {
  id: string;
  section: string;
  requirement: string;
  why: string;
};

export type TestStatus = "PASS" | "FAIL" | "미구현" | "미검증";

/** 테스트 계약 T01~T10의 1행. */
export type TestCase = {
  id: string;
  kind: "정상" | "예외" | "회귀";
  goal: string;
  /** 인계 시점 상태 */
  atHandover: TestStatus;
  /** 최종 상태. AI B가 갱신한다. */
  final: TestStatus;
};
