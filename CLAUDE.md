# CLAUDE.md — AI Context Handover Lab

> 세션을 시작하면 이 폴더의 `작업내역_체크리스트.md`를 **가장 먼저 한 파일만** 읽는다.
> 프로젝트 헌법 및 엔지니어링 원칙: 이 저장소의 `작업내역_체크리스트.md`가 단일 진실 공급원(SSOT)이다.
> 이 프로젝트를 후속 에이전트로서 인계받는다면 `docs/HANDOVER_AI_A_TO_B.md`를 먼저 읽는다.

## 1. 세션 시작 시 읽을 순서

1. `작업내역_체크리스트.md` (SSOT — 전체 진행 상황, 아키텍처 결정 기록, 다음 작업)
2. 후속 에이전트 인계 상황이면 `docs/HANDOVER_AI_A_TO_B.md` (7대 슬롯 인계 명세서)
3. 시스템 요구사항 확인이 필요하면 `docs/requirements.md`
4. 테스트 계약 확인/수정 시 `docs/test-plan.md` (T01~T10 불변 테스트 계약)
5. 수용 기준 및 감사 보고서 확인 시 `docs/ACCEPTANCE_CRITERIA_MAPPING.md`, `docs/COMPLIANCE_AUDIT_REPORT.md`
6. 포트폴리오 관점 2분 요약 확인 시 `docs/포트폴리오_추가용_소개글.md`

## 2. 절대 통째로 읽지 말 것

| 경로 | 이유 |
|---|---|
| `node_modules/`, `.next/` | 의존성 및 빌드 산출물 (토큰 낭비) |
| `package-lock.json` | 대용량 정적 파일, 정독 불필요 |
| `reports/rendered/` | 슬라이드 이미지 바이너리 디렉터리 |

## 3. 작업 유형별로 문서 하나만 읽기

| 하려는 작업 | 읽을 문서 |
|---|---|
| 전체 진행 상황 및 SSOT 확인 | `작업내역_체크리스트.md` |
| 인계받은 작업 시작 (7개 슬롯) | `docs/HANDOVER_AI_A_TO_B.md` |
| 시스템 요구사항 정본 | `docs/requirements.md` |
| 불변 테스트 계약 및 무결성 | `docs/test-plan.md` |
| 수용 기준 1:1 매핑 확인 | `docs/ACCEPTANCE_CRITERIA_MAPPING.md` |
| 37개 엔지니어링 기준 감사 | `docs/COMPLIANCE_AUDIT_REPORT.md` |
| 1차 출처 및 조사 근거 | `docs/research-summary.md`, `src/data/sources.ts` |
| 제3자 독립 검증 결과 확인 | `evidence/AGY_VALIDATION.md` |

## 4. 이 프로젝트에서 절대 하지 말 것 (Engineering Taboos)

- **출처 없는 수치 날조 금지**: 1차 공식 문서가 없는 AI 모델 스펙(컨텍스트 창 크기, 토큰 단가, 벤치마크 점수)을 임의로 채워 넣지 않는다.
- **`null`과 `0`의 자의적 치환 금지**: 미측정 값 `null`을 `0`으로 바꾸지 않는다. `0`은 유효한 측정 결과("인계 누락 0건" 등)에만 사용하며, UI에서 미측정은 `N/A` 또는 `확인하지 못함`으로 격리한다.
- **불변 테스트 계약 훼손 금지**: 단위/E2E 테스트를 임의로 삭제하거나 `.skip`, `.only`, `.todo` 처리, assertion 완화로 합격을 위장하지 않는다.
- **정보 구조 회피 금지**: `src/components/site-nav.tsx`의 `NAV_LINKS`에서 라우트를 지워 404를 회피하지 않는다. (T02 계약 위반)
- **사용자 승인 없는 환경 조작 금지**: 사용자 승인 없이 무단 브랜치 변경이나 파괴적인 reset/init 명령을 실행하지 않는다.

## 5. 코드 수정 후 필수 완료 조건

1. 모든 검증 스크립트 실행 및 통과:
   ```bash
   npm run test        # Vitest 단위/통합 20 PASS 확인
   npm run test:e2e    # Playwright 375px 모바일 뷰포트 통과 확인
   npm run lint        # ESLint 0 errors
   npm run typecheck   # TypeScript Strict Mode 0 errors
   npm run build       # Next.js 16 SSG 빌드 성공
   ```
2. `작업내역_체크리스트.md`의 진행 상황 및 작업 로그를 갱신해야 작업이 공식적으로 완료된다.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
