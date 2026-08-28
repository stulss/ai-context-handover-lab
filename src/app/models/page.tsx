import { ModelComparison } from "@/components/model-comparison";
import { SectionHeader } from "@/components/section-header";
import { MODELS } from "@/data/models";

export default function ModelsPage() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">모델 한도 비교</h1>
        <p className="mt-4 max-w-2xl text-white/70">
          컨텍스트 창과 사용량 한도는 서로 다른 제약입니다. 현재 수치는 공식 출처로 확인된 경우에만
          표시하며, 확인하지 못한 값은 임의로 채우지 않습니다.
        </p>
      </section>

      <section>
        <SectionHeader
          title="AI 코딩 도구"
          lead="고정 메시지 한도와 토큰·계산량 기반 한도는 소진 방식이 다르므로 같은 숫자로 직접 비교할 수 없습니다."
        />
        <ModelComparison models={MODELS} />
      </section>
    </div>
  );
}
