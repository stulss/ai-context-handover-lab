import { SectionHeader } from "@/components/section-header";
import { TEST_CASES } from "@/data/tests";

export default function TestsPage() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">테스트 현황</h1>
        <p className="mt-4 max-w-2xl text-white/70">
          인계 시점과 AI B 완료 시점의 T01~T10 상태를 비교합니다.
        </p>
      </section>

      <section>
        <SectionHeader title="테스트 계약" lead="기존 테스트를 삭제하거나 약화하지 않고 최종 상태를 검증했습니다." />
        <ul className="grid gap-3 sm:grid-cols-2">
          {TEST_CASES.map((testCase) => (
            <li key={testCase.id} className="rounded-lg border border-white/10 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{testCase.id} · {testCase.goal}</p>
                  <p className="mt-1 text-xs text-white/50">{testCase.kind}</p>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs text-emerald-300">
                  {testCase.final}
                </span>
              </div>
              <p className="mt-4 text-sm text-white/60">인계 시점: {testCase.atHandover}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
