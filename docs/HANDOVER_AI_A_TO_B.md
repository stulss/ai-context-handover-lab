# AI A → AI B Handover

- 프로젝트: AI Context Handover Lab
- 인계 일시: 2026-08-28 14:25 KST
- 작성자: AI A
- 사용 모델: Claude Sonnet 5 (Claude Code)
- 중단 사유: 요청 수 한도(8회) 도달 + 중단 조건 충족(홈 + `/handover` 구현, 일부 테스트 통과)
- 기준 브랜치: **Git 저장소 아님** (`git init` 되지 않음)
- 기준 커밋: 없음
- 작업 디렉터리 상태: 버전 관리 없음. 파일 시스템 상태가 유일한 기준
- 배포 URL: N/A (배포하지 않음)

> 사실 우선순위:
> 1. 실제 저장소 상태와 명령 실행 결과
> 2. 이 handover 문서
> 3. 미확인 추정 또는 계획
>
> 이 문서와 실제 상태가 다르면 AI B는 저장소와 실제 테스트 실행 결과를 기준으로 작업한다.

---

## 1. 프로젝트 목표

`docs/requirements.md`가 정본이다. 요약:

- AI 간 Context Handover와 AI-Driven Development 생산성 측정을 설명하는 연구형 웹사이트.
- 이 사이트 자체를 AI A → 인계 문서 → AI B로 개발해 그 과정을 사이트에 기록한다.
- Next.js + TypeScript + Tailwind CSS 기반, build/lint/test가 모두 실행 가능한 상태를 유지한다.

완료 조건: `docs/test-plan.md`의 T01~T10 충족, 기존 테스트 무결성 유지, lint/build/test 성공,
주요 페이지 반응형 동작, 출처가 클릭 가능한 링크로 렌더링.

범위 밖: 사용자 인증 / 데이터베이스 / 실제 AI API 호출 / 다국어.

---

## 2. AI B 시작 순서

```bash
cd ai-context-handover-lab
npm install          # node_modules는 이미 설치되어 있음. 없으면 실행
npm run test         # 먼저 이 문서의 테스트 상태를 독립 검증할 것
npm run lint
npm run build
npm run dev          # http://localhost:3000
```

필요 환경 (AI A가 실제로 확인한 값):

```text
Node.js: v24.19.0
npm: 11.17.0
패키지 매니저: npm (package-lock.json 있음)
Next.js: 16.3.3 (Turbopack)
환경 변수: 없음
포트: http://localhost:3000
Git: 저장소 아님. 초기화는 사용자 승인 필요
```

---

## 3. 현재 구현 상태

### 완료한 기능

- Next.js 16 + TypeScript strict + Tailwind v4 + Vitest 프로젝트 구성 (설치·빌드·테스트 모두 동작 확인)
- 공통 레이아웃과 7개 경로 네비게이션 (`SiteNav`, `NAV_LINKS`)
- 홈 페이지 `/`: 제목, 핵심 질문, AI A → Handover → AI B 흐름 3단 카드, 지표 카드 6개, 출처 카드 4개
- `/handover` 페이지: 개념 설명 + 인계 문서 필수 요소 7항목
- not-found UI (`src/app/not-found.tsx`) — 빌드 결과에 `/_not-found` 생성됨. **테스트는 아직 없음**
- 데이터/UI 분리: `src/data/{types,sources,metrics,handover-checklist}.ts`
- 재사용 컴포넌트 5종
- 테스트 5파일 13건

### 생성한 주요 파일

| 파일 | 상태 | 변경 내용 |
|---|---|---|
| `package.json` | 생성 | dev/build/start/lint/typecheck/test 스크립트 |
| `tsconfig.json` | 생성 | strict, `@/*` → `./src/*`. **빌드가 `.next/dev/types` 항목을 자동 추가함** |
| `vitest.config.ts` | 생성 | jsdom, globals, `src/**/*.test.{ts,tsx}`, `@` alias |
| `src/data/types.ts` | 생성 | Source / ModelEntry / Metric / ChecklistItem / TestCase 타입 |
| `src/data/sources.ts` | 생성 | 1차 출처 5건 + `RESEARCH_DATE` |
| `src/data/metrics.ts` | 생성 | 실험 지표 6건. **전부 `value: null`** (미측정) |
| `src/data/handover-checklist.ts` | 생성 | 인계 문서 필수 항목 7건 |
| `src/components/site-nav.tsx` | 생성 | `NAV_LINKS` 7개 + 헤더/네비 |
| `src/components/metric-card.tsx` | 생성 | `formatMetric()` — null/NaN → "N/A", 0은 그대로 |
| `src/components/source-link.tsx` | 생성 | url 없으면 링크 대신 평문 + "링크 확인하지 못함" |
| `src/components/handover-checklist.tsx` | 생성 | 빈 배열이면 빈 상태 문구 |
| `src/components/section-header.tsx` | 생성 | 섹션 제목 + 설명 |
| `src/app/layout.tsx` / `page.tsx` / `not-found.tsx` | 생성 | 레이아웃 / 홈 / 404 |
| `src/app/handover/page.tsx` | 생성 | Context Handover 페이지 |
| `src/app/page.test.tsx` 외 4개 | 생성 | T01·T02·T03·T06·T07 |

### 현재 구현된 페이지

| 경로 | 상태 | 확인 방법 |
|---|---|---|
| `/` | 완료 | `npm run test` T01 통과, 빌드 산출물에 정적 페이지 존재 |
| `/handover` | 완료 | T03 통과, 빌드 산출물에 존재 |
| `/models` | **미구현** | 파일 없음. 네비 링크는 있으므로 클릭 시 404 |
| `/metrics` | **미구현** | 파일 없음. 네비 링크 클릭 시 404 |
| `/experiment` | **미구현** | 파일 없음 |
| `/tests` | **미구현** | 파일 없음 |
| `/sources` | **미구현** | 파일 없음. 데이터(`src/data/sources.ts`)는 준비됨 |

---

## 4. 마지막 검증 결과

마지막 검증 시각: 2026-08-28 14:21~14:23 KST

| 항목 | 실행 명령 | 결과 | 핵심 출력 |
|---|---|---|---|
| Install | `npm install` | PASS | exit 0 |
| Unit test | `npm run test` | PASS | `Test Files 5 passed (5) / Tests 13 passed (13)` |
| Lint | `npm run lint` | PASS | 출력 없음(exit 0) |
| Build | `npm run build` | PASS | `Compiled successfully`, 정적 라우트 `/`, `/_not-found`, `/handover` |
| E2E | — | 미실행 | Playwright 미설치 |

### 테스트 상태

| Test ID | 목표 | 상태 | 근거 |
|---|---|---|---|
| T01 | 홈 제목·설명 | PASS | `src/app/page.test.tsx` 2건 통과 |
| T02 | 네비 링크 경로 | PASS | `src/components/site-nav.test.tsx` 2건 통과 |
| T03 | Handover 핵심 항목 | PASS | `src/app/handover/page.test.tsx` 2건 통과 |
| T04 | Models 데이터/빈 상태 | 미구현 | 페이지·데이터·테스트 모두 없음 |
| T05 | Metrics 지표 표시 | 미구현 | `/metrics` 페이지 없음. 데이터는 `src/data/metrics.ts`에 있음 |
| T06 | 출처 누락 예외 | PASS | `src/components/source-link.test.tsx` 3건 통과 |
| T07 | 실험 수치 누락 예외 | PASS | `src/components/metric-card.test.tsx` 4건 통과 (**컴포넌트 수준만. 페이지 수준 미검증**) |
| T08 | Not-found UI | **미검증** | `src/app/not-found.tsx`는 구현되어 빌드에 포함됨. 테스트 미작성 |
| T09 | 모바일 반응형 | **미검증** | Tailwind 반응형 클래스는 적용했으나 실제 뷰포트에서 확인하지 못함 |
| T10 | build/lint/test 무결성 | PASS | 세 명령 모두 exit 0. `.skip`/`.only`/`.todo` 사용 0건 |

```text
PASS: 6 / 10   (T01 T02 T03 T06 T07 T10)
FAIL: 0 / 10
미구현 또는 미검증: 4 / 10   (T04 T05 미구현, T08 T09 미검증)
```

---

## 5. 남은 작업

### P0: 최종 완료에 필수

1. **`/models` 페이지와 T04 구현**
   - 현재 상태: 페이지·데이터·테스트 전부 없음. `ModelEntry` 타입만 `src/data/types.ts`에 정의되어 있음
   - 관련 파일: `src/data/models.ts`(신규), `src/app/models/page.tsx`(신규), `src/app/models/page.test.tsx`(신규)
   - 확인 방법: `npm run test`, `npm run dev` 후 `/models`
   - 완료 판정: 데이터가 있으면 비교 테이블, `MODELS`가 빈 배열이면 빈 상태 안내가 렌더링되는 테스트 2건 통과
   - **주의**: 컨텍스트 창 크기·가격·사용량 한도 수치를 추정으로 채우지 말 것. 공식 문서에서 확인하지 못한 값은 `contextWindow: null`, `sourceId: null`로 두고 UI에서 "확인하지 못함"으로 표시. 근거는 `docs/research-summary.md`의 "의도적으로 넣지 않은 것" 절 참조

2. **`/metrics` 페이지와 T05 구현**
   - 현재 상태: 데이터(`src/data/metrics.ts` 6건, 전부 `value: null`)와 `MetricCard`는 있음. 페이지만 없음
   - 관련 파일: `src/app/metrics/page.tsx`(신규), `src/app/metrics/page.test.tsx`(신규)
   - 완료 판정: `METRICS` 전 항목이 카드로 렌더링되고 DORA·SPACE 프레임워크 소개가 표시. 출처는 `SourceLink`로
   - 주의: `MetricCard`를 재사용할 것. 카드 JSX를 복제하지 말 것

3. **T08 not-found 테스트 작성**
   - 현재 상태: `src/app/not-found.tsx` 구현 완료, 테스트만 없음
   - 관련 파일: `src/app/not-found.test.tsx`(신규)
   - 완료 판정: 안내 문구와 홈 복귀 링크(`href="/"`) 렌더링 검증

4. **T09 모바일 반응형 검증**
   - 현재 상태: 반응형 클래스는 적용했으나 실제로 확인하지 못했다 (**추정이 아니라 미확인 사실**)
   - 확인 방법: `docs/test-plan.md`의 "T09 검증 방법" 절에 두 가지 선택지가 있음. 택일하고 이유를 기록
   - 주의: `/models`의 비교 테이블이 가장 위험함. 표는 `overflow-x-auto` 컨테이너 안에 넣을 것. 페이지 본문이 가로 스크롤되면 안 됨

### P1: 보고서 완성도

1. `/sources` 페이지 — 데이터는 이미 있음. `SourceLink` + `RESEARCH_DATE` 표시만 하면 됨. **가장 빨리 끝나는 항목**
2. `/experiment` 페이지 — AI A/AI B 타임라인. 실측값은 사람이 별도 보관하는 실험 로그에서 받아야 함
3. `/tests` 페이지 — `TestCase` 타입은 이미 정의됨. `src/data/tests.ts`를 만들고 T01~T10의 `atHandover`를 이 문서 4장 표 그대로 채울 것
4. `src/data/metrics.ts`의 `value: null`을 실측값으로 교체 (실험 종료 후)

### P2: 시간 여유가 있을 때

1. law.md가 요구하는 나머지 표준 문서: `docs/05_배포.md`, `docs/검증안내서.md`, `docs/트러블슈팅.md`, `docs/AI_3줄.md`, `docs/포트폴리오_추가용_소개글.md`
2. Vercel 배포
3. Playwright E2E 도입

---

## 6. 알려진 문제와 재현 방법

### 문제 1. 네비게이션 링크 5개가 404로 연결된다

- 우선순위: P0
- 증상: 헤더의 "모델 한도 / 생산성 지표 / 실험 기록 / 테스트 현황 / 출처"를 클릭하면 not-found 페이지가 나온다
- 재현: `npm run dev` → `http://localhost:3000` → 헤더에서 "출처" 클릭
- 실제 결과: not-found UI
- 기대 결과: 각 페이지 렌더링
- 관련 파일: `src/components/site-nav.tsx:5-13`
- 원인: **확인된 사실** — 해당 `app/*/page.tsx` 파일이 아직 없음. AI A가 의도적으로 남긴 미구현
- 주의: 링크를 지워서 "고치지" 말 것. T02가 7개 경로를 요구한다. 페이지를 만들어야 한다

### 문제 2. `tsconfig.json`이 빌드 중 자동 수정된다

- 우선순위: P2
- 증상: `npm run build` 실행 시 Next.js가 `include`에 `.next/dev/types/**/*.ts`를 추가한다
- 실제 결과: 빌드 로그에 "We detected TypeScript in your project and reconfigured your tsconfig.json"
- 원인: **확인된 사실** — Next.js의 정상 동작. AI A가 그대로 두었다
- 주의: 되돌리지 말 것. 되돌려도 다음 빌드에서 다시 추가된다

### 문제 3. Git 저장소가 아니다

- 우선순위: P1
- 증상: `git status`가 실패한다
- 원인: 사용자가 `git init`을 요청하지 않았고, law.md 8장 4항이 "사용자 요청 없이 저장소를 초기화하지 않는다"고 규정
- 주의: AI B도 사용자 승인 없이 `git init` 하지 말 것. `.gitignore`는 미리 만들어 두었다

### 아직 확인하지 못한 사항 (추정 금지 구역)

- 모바일 실제 렌더링 (T09)
- Vercel 배포 동작
- `npm run typecheck`(`tsc --noEmit`) 단독 실행 — 스크립트는 있으나 실행하지 않았다. 빌드 중 TypeScript 단계는 통과했다

---

## 7. 유지해야 할 설계 결정

| 결정 | 이유 | AI B 주의사항 |
|---|---|---|
| 조사·실험 데이터를 `src/data/*.ts`에 분리 | 출처 관리와 테스트 용이성 | 페이지 JSX에 출처 텍스트를 하드코딩하지 말 것 |
| 미측정/미확인 값은 `null` → UI에서 "N/A" | 예외 상황에서 화면이 죽지 않게, 그리고 "모름"과 "0"을 구분하기 위해 | **필수 숫자를 0으로 임의 치환하지 말 것.** `metric-card.test.tsx`가 이를 검사한다 |
| `MetricCard` 재사용 | 대시보드 UI 일관성 | 중복 카드 JSX를 만들지 말 것 |
| 외부 출처는 `SourceLink` 컴포넌트로만 | 링크·접근성 일관성, url 없을 때 안전한 fallback | `<a>`를 직접 쓰지 말 것 |
| `NAV_LINKS`가 정보 구조의 SSOT | 네비와 T02 테스트가 같은 배열을 본다 | 경로를 바꾸면 두 곳이 함께 따라간다. 배열만 고칠 것 |
| 확인 못 한 수치는 아예 넣지 않음 | 출처 없는 수치는 그 시점부터 거짓 | `/models` 만들 때 가장 지키기 어려운 결정. `docs/research-summary.md` 참조 |
| Playwright 미설치 | 아직 필요 없었고, 불필요한 의존성을 늘리지 않는다는 원칙 | T09를 위해 추가할지 여부는 AI B가 판단하고 이유를 기록 |

---

## 8. 인계 품질을 위한 주의사항

- 이 문서 4장의 테스트 결과는 **2026-08-28 14:21~14:23 실제 실행 결과**다. T08·T09만 미실행이며 그렇게 표시했다.
- AI B는 가장 먼저 `npm run test`를 실행해 이 문서의 상태를 독립 검증할 것.
- 테스트가 실패해도 삭제·skip·only·todo 처리하지 않는다.
- 이 문서에 없는 상태를 발견하면 코드 수정 전에 차이를 짧게 기록할 것.
- AI A의 대화 이력은 제공되지 않는다. 필요한 사실은 저장소, `docs/requirements.md`, `docs/test-plan.md`, `docs/research-summary.md`, 이 문서에서 확인한다.
- 워크스페이스 헌법 `../law.md`(저장소 상위 폴더의 로컬 문서)가 이 프로젝트에도 적용된다. 특히 6장(테스트 무력화 금지), 7-1장(코드 수정 시 문서 동시 갱신), 8장(Git 승인 범위).

---

## 9. AI B의 첫 번째 작업 제안

1. `npm run test` 실행 → 13 passed가 나오는지 확인 (이 문서의 상태 검증)
2. 실패·미구현 항목을 T04, T05, T08, T09로 정리
3. `src/data/metrics.ts`와 `src/components/metric-card.tsx`를 먼저 읽어 데이터→UI 패턴을 파악
4. `/sources` 페이지부터 구현 (데이터가 이미 있어 가장 빠르고, 패턴 확인용으로 좋다)
5. `/metrics`(T05) → `/models`(T04) → `not-found.test.tsx`(T08) → 반응형 검증(T09) 순서로 진행
6. 각 단계마다 `npm run test && npm run lint && npm run build`
7. 전부 통과하면 `/experiment`, `/tests` 페이지와 실험 결과 데이터를 채운다
8. `작업내역_체크리스트.md`에 작업 로그를 남긴다 (law.md 7-1장 의무)

---

## 10. AI A 작업 요약

- AI A 작업 시간: 약 12분 (2026-08-28 14:13~14:25 KST)
- AI A 요청 수: 8회
- 마지막으로 수행한 작업: `npm run test` / `lint` / `build` 3종 검증 후 문서 작성
- 의도적으로 남긴 작업: `/models`, `/metrics`, `/experiment`, `/tests`, `/sources` 5개 페이지와 T04·T05·T08·T09
- handover 문서가 없었다면 AI B가 재탐색해야 했을 핵심 정보: **미측정 값을 0이 아닌 `null`→"N/A"로 표현하기로 한 결정**과 **확인하지 못한 모델 수치를 의도적으로 비워 둔 이유** — 둘 다 코드만 봐서는 "빠뜨린 것"으로 오해하고 임의의 숫자로 채우기 쉽다
