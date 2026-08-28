import { HandoverChecklist } from "@/components/handover-checklist";
import { SectionHeader } from "@/components/section-header";
import { HANDOVER_CHECKLIST } from "@/data/handover-checklist";

export default function HandoverPage() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Context Handover</h1>
        <p className="mt-4 max-w-2xl text-white/70">
          컨텍스트 인계란 한 에이전트가 가진 작업 상태를, 대화 이력 없이 다음 에이전트가 재구성할 수
          있는 형태로 옮기는 일입니다. 대화 이력은 길고, 대부분 재현에 필요 없으며, 모델이 바뀌면
          그대로 전달할 수도 없습니다. 그래서 인계는 &ldquo;무엇을 생각했는가&rdquo;가 아니라
          &ldquo;무엇을 확인했고 다음에 무엇을 해야 하는가&rdquo;를 남기는 작업입니다.
        </p>
      </section>

      <section>
        <SectionHeader
          title="좋은 인계 문서의 필수 요소"
          lead="아래 항목이 빠지면 다음 에이전트는 저장소를 처음부터 다시 탐색해야 합니다."
        />
        <HandoverChecklist items={HANDOVER_CHECKLIST} />
      </section>
    </div>
  );
}
