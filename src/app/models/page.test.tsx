import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ModelComparison } from "@/components/model-comparison";
import { MODELS } from "@/data/models";
import ModelsPage from "./page";

describe("T04 모델 비교", () => {
  it("모델 데이터가 있으면 비교 테이블을 렌더링한다", () => {
    render(<ModelsPage />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    for (const model of MODELS) {
      expect(screen.getByRole("rowheader", { name: model.tool })).toBeInTheDocument();
    }
  });

  it("모델 데이터가 비어 있으면 빈 상태를 렌더링한다", () => {
    render(<ModelComparison models={[]} />);

    expect(screen.getByText("비교할 모델 데이터가 없습니다.")).toBeInTheDocument();
  });
});
