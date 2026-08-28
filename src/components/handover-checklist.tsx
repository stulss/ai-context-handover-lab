import type { ChecklistItem } from "@/data/types";

export function HandoverChecklist({ items }: { items: ChecklistItem[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-white/50">등록된 인계 항목이 없습니다.</p>;
  }
  return (
    <ol className="space-y-3">
      {items.map((item) => (
        <li key={item.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-wide text-white/50">{item.section}</p>
          <p className="mt-1 font-medium">{item.requirement}</p>
          <p className="mt-2 text-sm text-white/60">왜: {item.why}</p>
        </li>
      ))}
    </ol>
  );
}
