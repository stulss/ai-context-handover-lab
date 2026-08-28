import type { ModelEntry } from "./types";

/**
 * 공식 출처에서 현재 수치를 확인하지 못했으므로 컨텍스트 창과 한도 유형을 비워 둔다.
 * 수치와 정책은 출처를 확보한 뒤에만 갱신한다.
 */
export const MODELS: ModelEntry[] = [
  {
    id: "claude-code",
    tool: "Claude Code",
    contextWindow: null,
    limitType: "unknown",
    note: "현재 적용되는 모델별 수치와 사용량 정책을 공식 출처로 확인하지 못함",
    sourceId: null,
  },
  {
    id: "codex-cli",
    tool: "OpenAI Codex",
    contextWindow: null,
    limitType: "unknown",
    note: "현재 적용되는 모델별 수치와 사용량 정책을 공식 출처로 확인하지 못함",
    sourceId: null,
  },
  {
    id: "gemini-cli",
    tool: "Gemini CLI",
    contextWindow: null,
    limitType: "unknown",
    note: "현재 적용되는 모델별 수치와 사용량 정책을 공식 출처로 확인하지 못함",
    sourceId: null,
  },
];
