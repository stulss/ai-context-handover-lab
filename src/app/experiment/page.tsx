import { SectionHeader } from "@/components/section-header";
import { EXPERIMENT_STAGES } from "@/data/experiment";

export default function ExperimentPage() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">실험 기록</h1>
        <p className="mt-4 max-w-2xl text-white/70">
          대화 이력을 전달하지 않고 구조화된 문서와 작업 트리만으로 개발을 이어간 과정을 기록합니다.
          확인되지 않은 시간과 요청 수는 N/A로 남깁니다.
        </p>
      </section>

      <section>
        <SectionHeader title="AI A → Handover → AI B" lead="인계 전후의 역할과 테스트 상태 변화입니다." />
        <ol className="grid gap-4 md:grid-cols-3">
          {EXPERIMENT_STAGES.map((stage) => (
            <li key={stage.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
              <h2 className="font-semibold">{stage.title}</h2>
              <p className="mt-1 text-xs text-white/50">{stage.actor}</p>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div><dt className="text-white/50">시간</dt><dd>{stage.duration}</dd></div>
                <div><dt className="text-white/50">요청 수</dt><dd>{stage.requests}</dd></div>
                <div className="col-span-2"><dt className="text-white/50">테스트</dt><dd>{stage.testStatus}</dd></div>
              </dl>
              <p className="mt-4 text-sm text-white/60">{stage.description}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
