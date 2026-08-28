import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "./not-found";

describe("T08 not-found UI", () => {
  it("안내 문구와 홈 복귀 링크를 렌더링한다", () => {
    render(<NotFound />);

    expect(screen.getByRole("heading", { name: "페이지를 찾을 수 없습니다" })).toBeInTheDocument();
    expect(screen.getByText("요청하신 경로는 이 사이트에 없습니다.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "개요로 돌아가기" })).toHaveAttribute("href", "/");
  });
});
