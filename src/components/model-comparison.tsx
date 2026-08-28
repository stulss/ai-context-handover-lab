import type { ModelEntry } from "@/data/types";

const LIMIT_LABELS: Record<ModelEntry["limitType"], string> = {
  "fixed-message": "고정 메시지 한도",
  "token-usage": "토큰/계산량 기반 한도",
  unknown: "확인하지 못함",
};

export function ModelComparison({ models }: { models: ModelEntry[] }) {
  if (models.length === 0) {
    return <p className="rounded-lg border border-white/10 p-6 text-white/60">비교할 모델 데이터가 없습니다.</p>;
  }

  return (
    <div
      data-testid="model-table-scroll"
      className="max-w-full overflow-x-auto rounded-lg border border-white/10"
    >
      <table className="min-w-[720px] border-collapse text-left text-sm">
        <thead className="bg-white/[0.05] text-white/70">
          <tr>
            <th className="p-4 font-medium">도구</th>
            <th className="p-4 font-medium">컨텍스트 창</th>
            <th className="p-4 font-medium">한도 유형</th>
            <th className="p-4 font-medium">근거와 메모</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <tr key={model.id} className="border-t border-white/10 align-top">
              <th scope="row" className="p-4 font-medium">{model.tool}</th>
              <td className="p-4">{model.contextWindow ?? "확인하지 못함"}</td>
              <td className="p-4">{LIMIT_LABELS[model.limitType]}</td>
              <td className="p-4 text-white/60">
                {model.note}
                {model.sourceId ? null : <span className="mt-1 block text-xs">출처 링크 확인하지 못함</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
