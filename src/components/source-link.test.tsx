import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Source } from "@/data/types";
import { SourceLink } from "./source-link";

const base: Source = {
  id: "s1",
  title: "테스트 출처",
  org: "테스트 기관",
  date: "2026",
  url: "https://example.com/paper",
  claim: "핵심 주장",
};

describe("T06 출처 데이터 예외 처리", () => {
  it("url이 있으면 클릭 가능한 링크로 렌더링한다", () => {
    render(<SourceLink source={base} />);
    expect(screen.getByRole("link", { name: "테스트 출처" })).toHaveAttribute(
      "href",
      "https://example.com/paper"
    );
  });

  it("url이 null이어도 렌더링이 중단되지 않고 평문으로 표시한다", () => {
    render(<SourceLink source={{ ...base, url: null }} />);
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("테스트 출처")).toBeInTheDocument();
    expect(screen.getByText(/링크 확인하지 못함/)).toBeInTheDocument();
  });

  it("url이 공백 문자열이어도 링크로 만들지 않는다", () => {
    render(<SourceLink source={{ ...base, url: "   " }} />);
    expect(screen.queryByRole("link")).toBeNull();
  });
});
