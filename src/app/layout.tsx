import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Context Handover Lab",
  description:
    "전체 대화 이력 없이 구조화된 상태 문서와 코드 저장소만으로 다른 AI가 개발 작업을 이어갈 수 있는가?",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="min-h-screen antialiased">
        <SiteNav />
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 pb-10 text-xs text-white/40">
          연구용 실험 사이트 · 조사 기준일과 출처는 /sources 참고
        </footer>
      </body>
    </html>
  );
}
