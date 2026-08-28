import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("T01 홈 화면", () => {
  it("프로젝트 제목을 h1으로 렌더링한다", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "AI Context Handover Lab" })
    ).toBeInTheDocument();
  });

  it("핵심 질문을 렌더링한다", () => {
    render(<HomePage />);
    expect(screen.getByText(/전체 대화 이력 없이/)).toBeInTheDocument();
  });
});
