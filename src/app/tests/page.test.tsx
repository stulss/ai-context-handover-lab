import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TEST_CASES } from "@/data/tests";
import TestsPage from "./page";

describe("테스트 현황 페이지", () => {
  it("T01부터 T10까지 인계 상태를 렌더링한다", () => {
    render(<TestsPage />);

    for (const testCase of TEST_CASES) {
      const title = screen.getByText(new RegExp(`^${testCase.id} ·`));
      const card = title.closest("li");
      expect(card).not.toBeNull();
      expect(within(card!).getByText(`인계 시점: ${testCase.atHandover}`)).toBeInTheDocument();
    }
  });
});
