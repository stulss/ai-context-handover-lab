import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NAV_LINKS, SiteNav } from "./site-nav";

describe("T02 네비게이션", () => {
  it("정보 구조의 7개 경로를 모두 올바른 href로 렌더링한다", () => {
    render(<SiteNav />);
    expect(screen.getByRole("navigation", { name: "주요 메뉴" })).toBeInTheDocument();
    for (const link of NAV_LINKS) {
      expect(screen.getByRole("link", { name: link.label })).toHaveAttribute("href", link.href);
    }
  });

  it("경로가 중복되지 않는다", () => {
    const hrefs = NAV_LINKS.map((link) => link.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});
