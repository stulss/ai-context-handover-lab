# AI Context Handover Lab

LLM/AI 에이전트 간 **컨텍스트 인계(Context Handover)** 를 설명하는 연구형 웹사이트이자,
그 자체가 인계 실험의 대상인 프로젝트입니다.

> 핵심 질문: 전체 대화 이력 없이, 구조화된 상태 문서와 코드 저장소만으로
> 다른 AI가 개발 작업을 성공적으로 이어갈 수 있는가?

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run test     # Vitest
npm run lint
npm run build
```

Node v24.19.0 / npm 11.17.0에서 동작을 확인했습니다.

## 기술 스택

Next.js 16 App Router · React · TypeScript(strict) · Tailwind CSS v4 · Vitest + React Testing Library

## 폴더 구조

```
src/
  app/          페이지 (App Router). 얇게 유지
    page.tsx            /
    handover/page.tsx   /handover
    not-found.tsx       404
  components/   재사용 UI. 복잡한 렌더링은 전부 여기
  data/         조사·실험 데이터 (TypeScript 리터럴). JSX에 하드코딩 금지
  test/         Vitest setup
docs/           요구사항·테스트 계획·조사 요약·인계 문서
```

## 문서 색인

| 문서 | 용도 |
|---|---|
| [작업내역_체크리스트.md](작업내역_체크리스트.md) | **모든 AI의 공용 인수인계 파일 (SSOT).** 세션 시작 시 가장 먼저 읽음 |
| [docs/HANDOVER_AI_A_TO_B.md](docs/HANDOVER_AI_A_TO_B.md) | AI A → AI B 인계 문서. 현재 상태·남은 작업·주의사항 |
| [docs/requirements.md](docs/requirements.md) | 요구사항 정본 |
| [docs/test-plan.md](docs/test-plan.md) | T01~T10 테스트 계약과 무결성 규칙 |
| [docs/research-summary.md](docs/research-summary.md) | 조사 출처와 **의도적으로 넣지 않은 것** |
| [docs/00_과제_요구사항_매핑.md](docs/00_과제_요구사항_매핑.md) | 과제 항목 1:1 매핑 |
| [docs/01_기획.md](docs/01_기획.md) | 기술 스택·구조·설계 결정 |
| [docs/evidence/AI_A_증거자료.md](docs/evidence/AI_A_증거자료.md) | AI A 작업 증거 — 파일 인벤토리·명령 출력 원문·스크린샷 |

## 프로젝트 규칙

- 출처 없는 수치를 만들지 않습니다. 확인하지 못한 값은 `null`로 두고 UI에서 `N/A`로 표시합니다.
  **`0`으로 치환하지 않습니다** — `0`은 "측정 결과가 0"이라는 뜻으로만 씁니다.
- 데이터와 UI를 분리합니다. 조사 데이터는 `src/data/*.ts`에만 둡니다.
- 테스트를 삭제·`skip`·`only`·`todo`·assertion 약화로 회피하지 않습니다.
- 코드를 고쳤으면 `작업내역_체크리스트.md`를 함께 갱신해야 작업이 끝난 것입니다.

워크스페이스 공통 규칙: [`../law.md`](../law.md)

## 현재 상태 (2026-08-28)

구현 완료: `/`, `/handover`, 404
미구현: `/models`, `/metrics`, `/experiment`, `/tests`, `/sources`
테스트: **PASS 6/10** (T01·T02·T03·T06·T07·T10), 미구현·미검증 4/10
