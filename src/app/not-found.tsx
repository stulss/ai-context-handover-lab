import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-10">
      <h1 className="text-2xl font-semibold">페이지를 찾을 수 없습니다</h1>
      <p className="mt-3 text-white/60">요청하신 경로는 이 사이트에 없습니다.</p>
      <p className="mt-6 text-sm">
        <Link href="/" className="underline underline-offset-4">
          개요로 돌아가기
        </Link>
      </p>
    </div>
  );
}
