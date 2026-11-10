import type { ModelEntry } from "./types";

/**
 * 프론티어 AI 코딩 도구의 공식 컨텍스트 창 및 한도 비교 데이터.
 * 각 공식 문서(1차 출처)를 통해 확인된 수치 및 한도 정책을 반영함.
 */
export const MODELS: ModelEntry[] = [
  {
    id: "claude-code",
    tool: "Claude Code",
    contextWindow: "200,000 tokens",
    limitType: "token-usage",
    note: "Claude 3.7 Sonnet 기반 에이전트 CLI 도구. 200,000 토큰 컨텍스트 창 및 토큰 소비량 기반 한도 적용.",
    sourceId: "anthropic-claude-3-7-sonnet",
  },
  {
    id: "codex-cli",
    tool: "OpenAI Codex",
    contextWindow: "128,000 tokens",
    limitType: "token-usage",
    note: "GPT-4o 기반 코딩 CLI 도구. 128,000 토큰 컨텍스트 창 및 사용량 기반 토큰 한도 적용.",
    sourceId: "openai-gpt-4o-models",
  },
  {
    id: "gemini-cli",
    tool: "Gemini CLI",
    contextWindow: "1,048,576 tokens",
    limitType: "token-usage",
    note: "Gemini 2.0 Flash / Pro 기반 도구. 최대 1,048,576 토큰 초대형 컨텍스트 창 및 API 토큰 사용량 한도 적용.",
    sourceId: "google-gemini-2-0-models",
  },
];
