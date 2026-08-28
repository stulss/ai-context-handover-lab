import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { METRICS } from "@/data/metrics";
import MetricsPage from "./page";

describe("T05 생산성 지표", () => {
  it("모든 실험 지표를 렌더링한다", () => {
    render(<MetricsPage />);

    for (const metric of METRICS) {
      expect(screen.getByText(metric.label)).toBeInTheDocument();
    }
  });

  it("DORA와 SPACE 프레임워크를 소개한다", () => {
    render(<MetricsPage />);

    expect(screen.getByRole("heading", { name: "DORA" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "SPACE" })).toBeInTheDocument();
  });
});
