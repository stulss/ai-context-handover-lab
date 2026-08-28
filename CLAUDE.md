# CLAUDE.md — AI Context Handover Lab

> 세션을 시작하면 이 폴더의 `작업내역_체크리스트.md`를 **가장 먼저 한 파일만** 읽는다.
> 워크스페이스 전체 규칙은 `C:\Users\stuls\Desktop\Agent\law.md`에 있다. 충돌하면 law.md가 우선한다.
> 이 프로젝트를 AI B로서 이어받는다면 `docs/HANDOVER_AI_A_TO_B.md`를 먼저 읽는다.

## 1. 세션 시작 시 읽을 순서

1. `작업내역_체크리스트.md` (SSOT — 진행 상황·결정 기록·다음 작업)
2. AI B 인계 상황이면 `docs/HANDOVER_AI_A_TO_B.md`
3. 요구사항 확인이 필요하면 `docs/requirements.md`
4. 테스트를 고칠 때는 `docs/test-plan.md`

## 2. 절대 통째로 읽지 말 것

| 경로 | 이유 |
|---|---|
| `node_modules/`, `.next/` | 의존성·빌드 산출물 |
| `package-lock.json` | 대용량, 읽을 필요 없음 |

## 3. 작업 유형별로 문서 하나만 읽기

| 하려는 작업 | 읽을 문서 |
|---|---|
| 진행 상황·다음 할 일 | `작업내역_체크리스트.md` |
| 인계받은 작업 시작 | `docs/HANDOVER_AI_A_TO_B.md` |
| 요구사항 전체 | `docs/requirements.md` |
| 테스트 계약 | `docs/test-plan.md` |
| 출처·조사 근거 | `docs/research-summary.md`, `src/data/sources.ts` |

## 4. 이 프로젝트에서 절대 하지 말 것

- 출처 없는 수치(컨텍스트 창 크기, 가격, 사용량 한도)를 채워 넣기
- 미측정 값 `null`을 `0`으로 바꾸기
- 테스트를 삭제·`skip`·`only`·`todo` 처리하거나 assertion 약화하기
- `src/components/site-nav.tsx`의 `NAV_LINKS`에서 링크를 지워 404를 "해결"하기 (T02 위반)
- 사용자 승인 없이 `git init` 하기

## 5. 코드 수정 후

`작업내역_체크리스트.md`의 진행 상황·작업 로그를 갱신해야 작업이 끝난 것이다.
완료 시 law.md 10장 보고 템플릿(Role/Task/Changed/Created/Tests/Result/Problems/Next Agent/Git)으로 보고한다.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
