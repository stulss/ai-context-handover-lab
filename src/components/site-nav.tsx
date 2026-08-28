import Link from "next/link";

/** 사이트 정보 구조의 단일 진실 공급원. 네비게이션과 T02 테스트가 이 배열을 공유한다. */
export const NAV_LINKS = [
  { href: "/", label: "개요" },
  { href: "/handover", label: "Context Handover" },
  { href: "/models", label: "모델 한도" },
  { href: "/metrics", label: "생산성 지표" },
  { href: "/experiment", label: "실험 기록" },
  { href: "/tests", label: "테스트 현황" },
  { href: "/sources", label: "출처" },
] as const;

export function SiteNav() {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          AI Context Handover Lab
        </Link>
        <nav aria-label="주요 메뉴">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/70">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
