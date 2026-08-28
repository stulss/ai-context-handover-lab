import { SectionHeader } from "@/components/section-header";
import { SourceLink } from "@/components/source-link";
import { RESEARCH_DATE, SOURCES } from "@/data/sources";

export default function SourcesPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">출처</h1>
        <p className="mt-4 max-w-2xl text-white/70">
          연구 자료와 공식 문서를 확인한 기준일은 {RESEARCH_DATE}입니다.
        </p>
      </section>

      <section>
        <SectionHeader
          title="연구 자료와 공식 문서"
          lead="사이트에서 인용한 주장과 원문 링크를 함께 제공합니다."
        />
        <ul className="grid gap-4 md:grid-cols-2">
          {SOURCES.map((source) => (
            <SourceLink key={source.id} source={source} />
          ))}
        </ul>
      </section>
    </div>
  );
}
