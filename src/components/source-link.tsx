import type { Source } from "@/data/types";

/** url이 없거나 빈 문자열이면 링크 대신 평문 + 안내를 렌더링한다 (T06). */
export function SourceLink({ source }: { source: Source }) {
  const href = source.url?.trim();
  return (
    <li className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <p className="font-medium">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-4 hover:text-white"
          >
            {source.title}
          </a>
        ) : (
          <span>{source.title}</span>
        )}
      </p>
      <p className="mt-1 text-xs text-white/50">
        {source.org} · {source.date}
        {href ? null : " · 링크 확인하지 못함"}
      </p>
      <p className="mt-2 text-sm text-white/70">{source.claim}</p>
    </li>
  );
}
