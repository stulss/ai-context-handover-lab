import { MetricCard } from "@/components/metric-card";
import { SectionHeader } from "@/components/section-header";
import { SourceLink } from "@/components/source-link";
import { METRICS } from "@/data/metrics";
import { PRODUCTIVITY_FRAMEWORKS } from "@/data/productivity-frameworks";
import { SOURCES } from "@/data/sources";

export default function MetricsPage() {
  const frameworkSources = PRODUCTIVITY_FRAMEWORKS.map((framework) => ({
    framework,
    source: SOURCES.find((source) => source.id === framework.sourceId),
  }));

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">생산성 지표</h1>
        <p className="mt-4 max-w-2xl text-white/70">
          인계 전후의 변화는 단일 숫자가 아니라 속도, 품질, 협업을 함께 봐야 합니다. 미측정 값은
          0이 아닌 N/A로 표시합니다.
        </p>
      </section>

      <section>
        <SectionHeader title="실험 측정값" lead="현재 실험에서 직접 측정하는 여섯 가지 지표입니다." />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {METRICS.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </ul>
      </section>

      <section>
        <SectionHeader title="생산성 프레임워크" lead="측정값을 해석할 때 참고하는 세 가지 관점입니다." />
        <div className="grid gap-4 md:grid-cols-3">
          {frameworkSources.map(({ framework, source }) => (
            <article key={framework.name} className="rounded-lg border border-white/10 p-4">
              <h3 className="font-semibold">{framework.name}</h3>
              <p className="mt-2 text-sm text-white/60">{framework.description}</p>
              {source ? (
                <ul className="mt-4">
                  <SourceLink source={source} />
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
