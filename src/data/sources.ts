import type { Source } from "./types";

/**
 * 조사 기준일: 2026-08-28.
 * 여기에는 AI A가 존재를 확신하는 1차 출처만 넣는다.
 * 수치(컨텍스트 창 크기, 가격, 사용량 한도)는 의도적으로 넣지 않았다 —
 * 자주 바뀌고 재확인 없이 인용하면 거짓이 되기 때문이다. AI B는 원문을 열어 확인한 뒤 추가할 것.
 */
export const SOURCES: Source[] = [
  {
    id: "space-2021",
    title: "The SPACE of Developer Productivity",
    org: "Forsgren, Storey, Maddila, Zimmermann, Houck, Butler (ACM Queue)",
    date: "2021",
    url: "https://queue.acm.org/detail.cfm?id=3454124",
    claim:
      "개발자 생산성은 단일 지표로 환원되지 않으며 만족도·성과·활동·협업·효율의 5개 차원으로 나누어 측정해야 한다.",
  },
  {
    id: "dora",
    title: "DORA — DevOps Research and Assessment",
    org: "Google Cloud / DORA",
    date: "2024",
    url: "https://dora.dev/",
    claim:
      "배포 빈도, 변경 리드 타임, 변경 실패율, 서비스 복구 시간의 4개 지표로 소프트웨어 전달 성과를 측정한다.",
  },
  {
    id: "copilot-cacm",
    title: "Measuring GitHub Copilot's Impact on Productivity",
    org: "Communications of the ACM",
    date: "2024",
    url: "https://cacm.acm.org/research/measuring-github-copilots-impact-on-productivity/",
    claim:
      "AI 코딩 도구의 효과는 완료 시간과 수용률(acceptance rate) 같은 사용 지표와 개발자 자기보고를 함께 봐야 해석 가능하다.",
  },
  {
    id: "lost-in-the-middle",
    title: "Lost in the Middle: How Language Models Use Long Contexts",
    org: "Liu et al. (TACL)",
    date: "2024",
    url: "https://arxiv.org/abs/2307.03172",
    claim:
      "긴 컨텍스트의 중간에 놓인 정보는 앞뒤에 놓인 정보보다 활용률이 낮다. 컨텍스트를 늘리는 것만으로 인계 품질이 보장되지 않는 근거.",
  },
  {
    id: "anthropic-context-windows",
    title: "Context windows — Claude Docs",
    org: "Anthropic",
    date: "2026",
    url: "https://docs.claude.com/en/docs/build-with-claude/context-windows",
    claim: "컨텍스트 창은 모델별로 다르며 대화가 길어지면 오래된 내용이 유실될 수 있다.",
  },
  {
    id: "anthropic-claude-3-7-sonnet",
    title: "Claude 3.7 Sonnet Model Card & Specifications",
    org: "Anthropic",
    date: "2025-02",
    url: "https://docs.anthropic.com/en/docs/about-claude/models",
    claim: "Claude 3.7 Sonnet은 200,000 토큰(200K) 컨텍스트 창을 제공하며 하이브리드 추론 및 토큰 소비량 기반 한도를 적용한다.",
  },
  {
    id: "openai-gpt-4o-models",
    title: "OpenAI GPT-4o Model Overview & Context Limits",
    org: "OpenAI",
    date: "2024-05",
    url: "https://platform.openai.com/docs/models/gpt-4o",
    claim: "GPT-4o 모델은 128,000 토큰(128K) 컨텍스트 창을 지원하며 입출력 토큰 사용량에 따라 한도가 산정된다.",
  },
  {
    id: "google-gemini-2-0-models",
    title: "Gemini 2.0 Models & Context Window Documentation",
    org: "Google AI Studio",
    date: "2025-02",
    url: "https://ai.google.dev/gemini-api/docs/models/gemini",
    claim: "Gemini 2.0 Flash 및 Pro 모델은 최대 1,048,576 토큰의 컨텍스트 창을 제공하며 API 토큰 사용량에 따라 한도를 관리한다.",
  },
];

/** 조사 기준일. /sources 페이지에 표시한다. */
export const RESEARCH_DATE = "2026-08-28";
