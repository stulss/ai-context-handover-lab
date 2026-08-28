# AI A 작업 증거자료

- 작성일: 2026-08-28
- 대상: AI A (Claude Sonnet 5, Claude Code) 세션에서 수행한 전 작업
- 목적: 인계 문서에 적은 주장이 실제 실행 결과에 근거함을 증명

> **시점 구분이 중요합니다.**
> AI A 인계 시점은 **2026-08-28 14:29 KST**입니다.
> 그 이후(14:33~) AI B(OpenAI Codex)가 `/sources`를 추가했습니다.
> 이 문서의 §1~§4는 **AI A 시점**, §6은 **증거 수집 시점(14:35)의 현재 상태**입니다.

---

## 1. 파일 인벤토리 (타임스탬프가 작성자를 구분함)

`find . -type f -not -path "./node_modules/*" -not -path "./.next/*" -not -name "package-lock.json"` 실행 결과 (2026-08-28 14:34 수집)

### AI A가 생성한 파일 — 14:16 ~ 14:29

| 수정시각 | 크기(B) | 경로 | 구분 |
|---|---:|---|---|
| 14:16 | 76 | `./.gitignore` | 설정 |
| 14:16 | 301 | `./eslint.config.mjs` | 설정 |
| 14:16 | 104 | `./next.config.ts` | 설정 |
| 14:16 | 869 | `./package.json` | 설정 |
| 14:16 | 94 | `./postcss.config.mjs` | 설정 |
| 14:16 | 369 | `./vitest.config.ts` | 설정 |
| 14:16 | 43 | `./src/test/setup.ts` | 테스트 setup |
| 14:17 | 1765 | `./src/data/types.ts` | 데이터 |
| 14:18 | 1984 | `./src/data/handover-checklist.ts` | 데이터 |
| 14:18 | 1573 | `./src/data/metrics.ts` | 데이터 |
| 14:18 | 2427 | `./src/data/sources.ts` | 데이터 |
| 14:19 | 107 | `./src/app/globals.css` | 스타일 |
| 14:19 | 833 | `./src/app/layout.tsx` | 페이지 |
| 14:19 | 685 | `./src/components/handover-checklist.tsx` | 컴포넌트 |
| 14:19 | 956 | `./src/components/metric-card.tsx` | 컴포넌트 |
| 14:19 | 296 | `./src/components/section-header.tsx` | 컴포넌트 |
| 14:19 | 1270 | `./src/components/site-nav.tsx` | 컴포넌트 |
| 14:19 | 919 | `./src/components/source-link.tsx` | 컴포넌트 |
| 14:20 | 2914 | `./src/app/page.tsx` | 페이지 |
| 14:20 | 1297 | `./src/app/handover/page.tsx` | 페이지 |
| 14:20 | 470 | `./src/app/not-found.tsx` | 페이지 |
| 14:20 | 554 | `./src/app/page.test.tsx` | 테스트 T01 |
| 14:20 | 710 | `./src/components/site-nav.test.tsx` | 테스트 T02 |
| 14:20 | 663 | `./src/app/handover/page.test.tsx` | 테스트 T03 |
| 14:20 | 1250 | `./src/components/source-link.test.tsx` | 테스트 T06 |
| 14:20 | 1084 | `./src/components/metric-card.test.tsx` | 테스트 T07 |
| 14:21 | 704 | `./tsconfig.json` | 설정 (14:16 생성 → 14:21 next build가 자동 수정) |
| 14:21 | 295 | `./next-env.d.ts` | Next.js 자동 생성 |
| 14:23 | 3515 | `./docs/requirements.md` | 문서 |
| 14:23 | 3235 | `./docs/test-plan.md` | 문서 |
| 14:23 | 2160 | `./docs/research-summary.md` | 문서 |
| 14:28 | 15122 | `./docs/HANDOVER_AI_A_TO_B.md` | **인계 문서** |
| 14:28 | 2795 | `./README.md` | 문서 |
| 14:28 | 1961 | `./CLAUDE.md` | 문서 |
| 14:29 | 4580 | `./docs/00_과제_요구사항_매핑.md` | 문서 |
| 14:29 | 4382 | `./docs/01_기획.md` | 문서 |

**AI A 산출물 합계: 36개 파일** (설정 8 · 데이터 4 · 컴포넌트 5 · 페이지 4 · 테스트 5 · 문서 8 · 자동생성 2)

### AI B가 이후 추가/수정한 파일 — 14:33

| 수정시각 | 크기(B) | 경로 |
|---|---:|---|
| 14:33 | 927 | `./src/app/sources/page.tsx` |
| 14:33 | 4702 | `./작업내역_체크리스트.md` (AI A가 14:28 생성 → AI B가 로그 추가) |

---

## 2. 검증 명령 실행 결과 (AI A 시점, 2026-08-28 14:21~14:23)

### 2-1. `npm run test`

```
> ai-context-handover-lab@0.1.0 test
> vitest run

 RUN  v4.1.11 ./ai-context-handover-lab

 Test Files  5 passed (5)
      Tests  13 passed (13)
   Start at  14:21:04
   Duration  3.33s (transform 460ms, setup 1.87s, import 942ms, tests 976ms, environment 8.92s)
```

### 2-2. `npm run lint`

```
> ai-context-handover-lab@0.1.0 lint
> eslint .
```
출력 없음 = 위반 0건, exit 0.

### 2-3. `npm run build`

```
▲ Next.js 16.3.3 (Turbopack)
✓ Running next.config.ts took 2.8s

  Creating an optimized production build ...
✓ Compiled successfully in 3.3s
  Running TypeScript ...

  We detected TypeScript in your project and reconfigured your tsconfig.json file for you.
  The following suggested values were added to your tsconfig.json:
  	- include was updated to add '.next/dev/types/**/*.ts'

  Finished TypeScript in 2.6s ...
  Collecting page data using 5 workers ...
✓ Generating static pages using 5 workers (4/4) in 793ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
└ ○ /handover

○  (Static)  prerendered as static content
```

이 출력이 §1의 "AI A 시점에 `/models`, `/metrics`, `/experiment`, `/tests`, `/sources`가 없었다"는 주장의 근거입니다.
빌드 산출물에 `/`, `/_not-found`, `/handover` 3개 라우트만 존재합니다.

### 2-4. 환경

```
node -v   → v24.19.0
npm -v    → 11.17.0
npm install → exit 0
```

---

## 3. 테스트 무결성 증거 (T10)

```
$ grep -rn "\.skip\|\.only\|\.todo" src/
(0건 - 테스트 무력화 없음)

$ grep -rn ": any\|<any>\|as any" src/
(0건)
```

기존 테스트를 삭제·skip·only·todo 처리하거나 assertion을 약화한 사실이 없음을 증명합니다.
`any` 타입도 0건으로 요구사항 §3(기술 원칙)을 충족합니다.

---

## 4. AI A 시점 테스트 상태표 (13건의 내역)

| 파일 | 테스트 건수 | 대상 ID |
|---|---:|---|
| `src/app/page.test.tsx` | 2 | T01 |
| `src/components/site-nav.test.tsx` | 2 | T02 |
| `src/app/handover/page.test.tsx` | 2 | T03 |
| `src/components/source-link.test.tsx` | 3 | T06 |
| `src/components/metric-card.test.tsx` | 4 | T07 |
| **합계** | **13** | |

`Tests 13 passed (13)`과 정확히 일치합니다.

계약 기준 판정: **PASS 6/10** (T01·T02·T03·T06·T07 + 수동 검증 T10), FAIL 0/10, 미구현·미검증 4/10 (T04·T05 미구현, T08·T09 미검증)

---

## 5. 화면 스크린샷

실행: `npm run dev` → `http://localhost:3000` (2026-08-28 14:34~14:35 촬영)

| 파일 | 경로 | 확인 내용 |
|---|---|---|
| `01_홈페이지_desktop.jpg` | `/` | h1 "AI Context Handover Lab", 핵심 질문 인용, AI A→Handover→AI B 3단 카드, **지표 카드 6개가 전부 "N/A / 아직 측정하지 않음"으로 표시**(T07 실동작), 출처 카드가 밑줄 링크로 렌더링(T06 실동작), 상단 네비 7개 |
| `02_handover페이지_desktop.jpg` | `/handover` | 개념 설명 문단, "좋은 인계 문서의 필수 요소" 7개 항목이 각각 섹션 라벨·요구사항·"왜:" 이유와 함께 표시(T03 실동작) |
| `03_notfound_404.jpg` | `/does-not-exist` | "페이지를 찾을 수 없습니다" + "개요로 돌아가기" 링크(T08 UI 실동작 — 단, 자동 테스트는 여전히 미작성) |

스크린샷이 특히 증명하는 것: **`METRICS` 6건이 화면에서 `0`이 아니라 `N/A`로 나온다**는 점.
이것이 AI A의 핵심 설계 결정("모름"과 "0"을 구분)이 코드에서 실제로 동작함을 보여줍니다.

### 남기지 못한 스크린샷

- **모바일 375px 뷰 (T09)**: `resize_window`로 창을 375×800으로 줄였으나 캡처는 1568×778 데스크톱 레이아웃으로 나왔습니다. 브라우저 자동화 도구의 캡처 크기가 고정된 것으로 보입니다. **T09는 여전히 미검증이며, 인계 문서에 적은 그대로입니다.** AI B가 검증해야 합니다.

---

## 6. 증거 수집 시점의 현재 상태 (2026-08-28 14:35, AI B 작업 반영 후)

```
> vitest run
 Test Files  6 passed (6)
      Tests  15 passed (15)
   Start at  14:35:29
```

AI A 인계 시점 **5 files / 13 tests** → 현재 **6 files / 15 tests**.
차이 1파일·2건은 AI B가 `/sources` 구현과 함께 추가한 것입니다.
이 숫자 차이 자체가 인계 이후 작업이 실제로 이어졌다는 증거입니다.

---

## 7. 이 문서의 한계 (정직한 기록)

- §2의 명령 출력은 AI A 세션에서 실제로 실행되어 화면에 표시된 원문을 옮긴 것입니다. 자동 로그 파일로 저장하지는 않았습니다.
- §1의 타임스탬프는 파일 시스템 mtime이며, 작성자를 직접 기록하지는 않습니다. 14:16~14:29 = AI A, 14:33~ = AI B라는 구분은 세션 진행 순서에 근거한 것입니다.
- Git 저장소가 아니므로 커밋 이력 형태의 증거는 없습니다 (law.md 8장 4항에 따라 `git init`을 하지 않았습니다).
- T09(모바일 반응형)는 **끝까지 검증하지 못했습니다.** 이 문서 어디에서도 통과했다고 주장하지 않습니다.
