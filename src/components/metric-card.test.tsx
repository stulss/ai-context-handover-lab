import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Metric } from "@/data/types";
import { formatMetric, MetricCard } from "./metric-card";

const base: Metric = {
  id: "m1",
  label: "테스트 지표",
  value: 7,
  unit: "/10",
  description: "설명",
};

describe("T07 실험 수치 누락 처리", () => {
  it("측정값이 있으면 값과 단위를 표시한다", () => {
    render(<MetricCard metric={base} />);
    expect(screen.getByText("7/10")).toBeInTheDocument();
  });

  it("value가 null이면 N/A와 안내 문구를 표시한다", () => {
    render(<MetricCard metric={{ ...base, value: null }} />);
    expect(screen.getByText("N/A")).toBeInTheDocument();
    expect(screen.getByText("아직 측정하지 않음")).toBeInTheDocument();
  });

  it("측정값 0을 N/A로 바꾸지 않는다", () => {
    expect(formatMetric({ ...base, value: 0 })).toBe("0/10");
  });

  it("NaN은 N/A로 처리한다", () => {
    expect(formatMetric({ ...base, value: Number.NaN })).toBe("N/A");
  });
});
