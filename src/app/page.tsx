import Link from "next/link";
import { MetricCard } from "@/components/metric-card";
import { SectionHeader } from "@/components/section-header";
import { SourceLink } from "@/components/source-link";
import { METRICS } from "@/data/metrics";
import { SOURCES } from "@/data/sources";

const FLOW = [
  { step: "AI A", body: "초기 설계와 부분 구현. 예산 한도에서 의도적으로 중단한다." },
  {
    step: "Handover",
    body: "저장소 + 요구사항 + 테스트 계획 + 인계 문서만 남긴다. 대화 이력은 전달하지 않는다.",
  },
  { step: "AI B", body: "인계 문서만 읽고 상태를 독립 검증한 뒤 나머지를 완성한다." },
];

export default function HomePage() {
  return (
    <div className="space-y-14">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          AI Context Handover Lab
        </h1>
        <p className="mt-4 max-w-2xl text-white/70">
          LLM 에이전트 사이의 컨텍스트 인계(Context Handover)를 실제 개발 과제로 실험하고, 그 과정과
          결과를 기록하는 연구형 사이트입니다.
        </p>
        <blockquote className="mt-6 border-l-2 border-white/30 pl-4 text-lg text-white/90">
          전체 대화 이력 없이, 구조화된 상태 문서와 코드 저장소만으로 다른 AI가 개발 작업을
          성공적으로 이어갈 수 있는가?
        </blockquote>
      </section>

      <section>
        <SectionHeader title="AI A → Handover → AI B" lead="이 실험의 세 단계." />
        <ol className="grid gap-4 sm:grid-cols-3">
          {FLOW.map((item) => (
            <li key={item.step} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold">{item.step}</p>
              <p className="mt-2 text-sm text-white/60">{item.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm">
          <Link href="/handover" className="underline underline-offset-4">
            인계 문서가 갖춰야 할 항목 보기 →
          </Link>
        </p>
      </section>

      <section>
        <SectionHeader
          title="실험 지표"
          lead="측정 전 값은 0이 아니라 N/A로 표시합니다. 추정치를 넣지 않습니다."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {METRICS.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </ul>
      </section>

      <section>
        <SectionHeader title="근거 자료" lead="이 사이트의 주장 뒤에 있는 1차 출처." />
        <ul className="grid gap-4 sm:grid-cols-2">
          {SOURCES.slice(0, 4).map((source) => (
            <SourceLink key={source.id} source={source} />
          ))}
        </ul>
      </section>
    </div>
  );
}
