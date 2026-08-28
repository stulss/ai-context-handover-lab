import type { ChecklistItem } from "./types";

/** 좋은 인계 문서가 반드시 담아야 하는 항목. /handover 페이지의 핵심 콘텐츠. */
export const HANDOVER_CHECKLIST: ChecklistItem[] = [
  {
    id: "anchor",
    section: "기준점",
    requirement: "브랜치, 커밋 SHA, 작업 트리 상태(clean 여부)를 적는다.",
    why: "AI B가 문서와 저장소가 같은 시점인지 확인할 수 있어야 한다.",
  },
  {
    id: "commands",
    section: "재현 명령",
    requirement: "install·dev·test·lint·build 명령을 실제로 동작하는 형태로 나열한다.",
    why: "AI B가 첫 5분 안에 상태를 스스로 검증하게 만든다.",
  },
  {
    id: "verified-state",
    section: "검증 결과",
    requirement: "마지막 실행 결과를 그대로 적는다. '잘 됩니다'가 아니라 '6 passed, 2 failed'.",
    why: "모호한 요약은 AI B가 잘못된 가정을 이어받게 만든다.",
  },
  {
    id: "fact-vs-guess",
    section: "사실과 추정 분리",
    requirement: "확인한 사실, 확인하지 못한 사항, 추정 원인을 각각 구분해 표시한다.",
    why: "추정을 사실로 물려주면 AI B가 잘못된 방향으로 시간을 쓴다.",
  },
  {
    id: "next-actions",
    section: "남은 작업",
    requirement: "P0/P1/P2로 우선순위를 매기고 각 항목에 파일 경로와 완료 판정 기준을 붙인다.",
    why: "'나머지는 부탁합니다'는 인계가 아니다.",
  },
  {
    id: "decisions",
    section: "유지할 설계 결정",
    requirement: "지켜야 할 결정과 그 이유를 적는다.",
    why: "AI B가 이유를 모른 채 되돌리는 재작업을 막는다.",
  },
  {
    id: "no-transcript",
    section: "제외할 것",
    requirement: "대화 이력, 사고 과정, 시행착오 로그는 넣지 않는다.",
    why: "인계 문서는 상태 스냅샷이지 일기가 아니다. 길어질수록 읽히지 않는다.",
  },
];
