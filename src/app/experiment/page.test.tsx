import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EXPERIMENT_STAGES } from "@/data/experiment";
import ExperimentPage from "./page";

describe("실험 기록 페이지", () => {
  it("모든 실험 단계를 렌더링한다", () => {
    render(<ExperimentPage />);

    for (const stage of EXPERIMENT_STAGES) {
      expect(screen.getByRole("heading", { name: stage.title })).toBeInTheDocument();
    }
  });
});
