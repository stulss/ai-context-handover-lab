import type { Metric } from "@/data/types";

/** 미측정 값은 0이 아니라 "N/A"로 표시한다. 0은 "측정 결과가 0"이라는 뜻으로만 쓴다. */
export function formatMetric(metric: Metric): string {
  if (metric.value === null || Number.isNaN(metric.value)) return "N/A";
  return `${metric.value}${metric.unit}`;
}

export function MetricCard({ metric }: { metric: Metric }) {
  const measured = metric.value !== null && !Number.isNaN(metric.value);
  return (
    <li className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-wide text-white/50">{metric.label}</p>
      <p className={`mt-1 text-2xl font-semibold ${measured ? "" : "text-white/40"}`}>
        {formatMetric(metric)}
      </p>
      {!measured ? <p className="text-xs text-white/40">아직 측정하지 않음</p> : null}
      <p className="mt-2 text-sm text-white/60">{metric.description}</p>
    </li>
  );
}
