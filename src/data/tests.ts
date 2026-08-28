import type { TestCase } from "./types";

export const TEST_CASES: TestCase[] = [
  { id: "T01", kind: "정상", goal: "홈 제목과 핵심 설명", atHandover: "PASS", final: "PASS" },
  { id: "T02", kind: "정상", goal: "7개 네비게이션 링크 경로", atHandover: "PASS", final: "PASS" },
  { id: "T03", kind: "정상", goal: "인계 문서 핵심 항목", atHandover: "PASS", final: "PASS" },
  { id: "T04", kind: "정상", goal: "모델 비교와 빈 상태", atHandover: "미구현", final: "PASS" },
  { id: "T05", kind: "정상", goal: "생산성 지표와 프레임워크", atHandover: "미구현", final: "PASS" },
  { id: "T06", kind: "예외", goal: "출처 URL 누락 처리", atHandover: "PASS", final: "PASS" },
  { id: "T07", kind: "예외", goal: "미측정 수치 처리", atHandover: "PASS", final: "PASS" },
  { id: "T08", kind: "예외", goal: "Not-found UI", atHandover: "미검증", final: "PASS" },
  { id: "T09", kind: "회귀", goal: "375px 모바일 반응형", atHandover: "미검증", final: "PASS" },
  { id: "T10", kind: "회귀", goal: "빌드·lint·테스트 무결성", atHandover: "PASS", final: "PASS" },
];
