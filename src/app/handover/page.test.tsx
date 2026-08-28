import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HANDOVER_CHECKLIST } from "@/data/handover-checklist";
import HandoverPage from "./page";

describe("T03 Context Handover 페이지", () => {
  it("인계 문서 필수 항목을 모두 표시한다", () => {
    render(<HandoverPage />);
    for (const item of HANDOVER_CHECKLIST) {
      expect(screen.getByText(item.requirement)).toBeInTheDocument();
    }
  });

  it("각 항목의 이유를 함께 표시한다", () => {
    render(<HandoverPage />);
    expect(screen.getAllByText(/^왜: /)).toHaveLength(HANDOVER_CHECKLIST.length);
  });
});
