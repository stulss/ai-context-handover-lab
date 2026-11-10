# 시스템 수용 기준(Acceptance Criteria) 1:1 추적 매핑

> 변경된 컴플라이언스 및 세부 수용 기준의 정밀 감사 매핑은 [`COMPLIANCE_AUDIT_REPORT.md`](./COMPLIANCE_AUDIT_REPORT.md)를 정본으로 사용한다.

- 기준: 시스템 초기 개발 요구사양서 원문 및 단계별 엔지니어링 마일스톤
- 상태 표기: ✅ 충족 / 🔶 부분 충족 / ⬜ 미착수

## A. 필수 항목 — 1차 엔지니어링 단계 (AI A 담당 범위)

| # | 요구사양 항목 | 상태 | 근거 (파일 / 실행 결과) |
|---|---|---|---|
| 1 | 저장소 아키텍처 및 작업 환경 분석 | ✅ | 초기 저장소 상태 점검 및 프로젝트 구조 신규 셋업 |
| 2 | 의존성 및 기존 공통 설정 패턴 분석 | ✅ | 워크스페이스 표준 package.json 및 빌드/테스트 설정 패턴 재사용 |
| 3 | 프로젝트 빌드 및 런타임 검증 | ✅ | `npm run build` 성공 (`Compiled successfully`) |
| 4 | 공통 레이아웃 및 시스템 네비게이션 구현 | ✅ | `src/app/layout.tsx`, `src/components/site-nav.tsx` |
| 5 | 랜딩 대시보드 `/` 구현 | ✅ | `src/app/page.tsx` — T01 PASS |
| 6 | 연구·실험 데이터 도메인 TypeScript 모델 설계 | ✅ | `src/data/types.ts`, `sources.ts`, `metrics.ts`, `handover-checklist.ts` |
| 7 | 재사용 가능한 UI 컴포넌트 라이브러리 | ✅ | `SiteNav`, `SectionHeader`, `MetricCard`, `SourceLink`, `HandoverChecklist` (5종) |
| 8 | `/handover` 인계 사양 페이지 구현 | ✅ | `src/app/handover/page.tsx` — T03 PASS |
| 9 | TDD 테스트 러너 세팅 및 기본 회귀 테스트 구축 | ✅ | `vitest.config.ts` + 5개 파일 13건 테스트. T01·T02·T03·T06·T07 PASS |
| 10 | 시스템 상태 및 백로그 SSOT 기록 | ✅ | `작업내역_체크리스트.md`, `docs/HANDOVER_AI_A_TO_B.md` |
| 11 | 리소스 제약(8회 호출 상한) 도달 시 격리 중단 | ✅ | 사전 정의된 예산 제약 도달 후 신규 기능 추가 안전 중단 |
| 12 | 인계 직전 구조화된 인수인계 명세서 작성 | ✅ | `docs/HANDOVER_AI_A_TO_B.md` 10개 핵심 섹션 규격 준수 |

## B. 필수 항목 — 최종 수용 조건 (2차 엔지니어링 단계, AI B 담당)

| ID | 테스트 목표 | 인계 시점 상태 | 담당 |
|---|---|---|---|
| T01 | 홈 제목·핵심 설명 렌더링 | ✅ PASS | AI A |
| T02 | 네비게이션 링크 경로 정합성 | ✅ PASS | AI A |
| T03 | Handover 핵심 7개 프로토콜 항목 표시 | ✅ PASS | AI A |
| T04 | Models 데이터 렌더링 및 빈 상태 처리 | ✅ PASS | **AI B** |
| T05 | Metrics 지표 및 표준 프레임워크 표시 | ✅ PASS | **AI B** |
| T06 | 출처 누락 및 결측치 예외 처리 | ✅ PASS | AI A |
| T07 | 실험 수치 결측치 예외 처리 | ✅ PASS (컴포넌트 수준) | AI A / 페이지 통합은 AI B |
| T08 | Not-found 404 폴백 UI | ✅ PASS | **AI B** |
| T09 | 모바일 뷰포트(375px) 반응형 레이아웃 회귀 검증 | ✅ PASS | **AI B** / agy 독립 검증 |
| T10 | build/lint/test/typecheck 전체 무결성 | ✅ PASS | 전 단계 지속 유지 |

## C. 기술 아키텍처 및 엔지니어링 원칙 준수 검증

| 원칙 | 상태 | 근거 |
|---|---|---|
| 엄격한 타입 안정성 (`any` 금지) | ✅ | `src/` 전체 `any` 사용 0건, TypeScript strict 무결성 통과 |
| 관심사의 분리 (데이터와 UI 계층 분리) | ✅ | 조사·실험 데이터는 `src/data/*.ts` 도메인 계층에 완전 격리 |
| 하드코딩 금지 | ✅ | 프리젠테이션 계층은 `SOURCES`/`METRICS`/`HANDOVER_CHECKLIST` SSOT 임포트 |
| 슬림 페이지, 컴포넌트 기반 합성 | ✅ | 모든 페이지 컴포넌트 100줄 미만 경량화 유지 |
| 반응형 레이아웃 보장 | ✅ | Playwright 375×812 E2E 테스트 2건 PASS, 모바일 캡처 전수 검증 |
| 웹 접근성(a11y) 구조화 | 🔶 | `h1`/`h2` 계층 구조, `nav aria-label`, 테이블 `th scope="row"`, 외령 링크 안전 속성 적용 |
| 제로 런타임 오버헤드 (최소 의존성) | ✅ | Next/React/TS/Tailwind/Vitest 외 불필요한 런타임 라이브러리 0건 |
| 테스트 신뢰성 보장 (테스트 회피 금지) | ✅ | `.skip`/`.only`/`.todo` 등 테스트 무력화 0건 유지 |

## D. 데이터 신뢰성 및 출처 관리 원칙 검증

| 원칙 | 상태 | 근거 |
|---|---|---|
| 미검증 데이터 임의 생성(환각) 금지 | ✅ | 모델 컨텍스트 윈도우, 과금 체계 등 미공식 수치는 임의 기재하지 않고 결측 처리 (`docs/research-summary.md`) |
| 엄격한 출처 스키마 (제목/발행처/일자/URL/핵심주장) | ✅ | `Source` 타입 인터페이스를 통해 5개 필수 메타데이터 강제 |
| 외부 링크 상호작용성 및 안전성 | ✅ | `SourceLink` 컴포넌트 — 보안 속성 및 클릭 가능 링크 (T06 PASS) |
| 결측치와 실제 0값의 명확한 분리 | ✅ | `null`/`NaN` → "N/A" / "확인하지 못함", 실제 측정값 `0`은 `"0"`으로 엄격 구분 |

## E. 엔지니어링 산출물 및 품질 자체 점검 (Self-Verification / Deliverables)

| 항목 | 상태 | 비고 |
|---|---|---|
| [`05_배포.md`](./05_배포.md) | ✅ | Vercel 프로덕션 및 GitHub 공개 저장소 배포 검증 기록 |
| [`검증안내서.md`](./검증안내서.md) | ✅ | 4단계 핵심 엔지니어링 검증 절차서 |
| [`트러블슈팅.md`](./트러블슈팅.md) | ✅ | PPTX PowerPoint 렌더링 호환성 이슈 분석 및 해결 아카이브 |
| [`AI_3줄.md`](./AI_3줄.md) | ✅ | AI 위임 영역 / 엔지니어링 의사결정 / AI 제안 반려 및 통제 기준 |
| [`포트폴리오_추가용_소개글.md`](./포트폴리오_추가용_소개글.md) | ✅ | 핵심 연구 배경, 멀티에이전트 인계 가설, TDD 무결성, 정량/정성 성과 수록 Executive Summary 완성 |
| Vercel 프로덕션 배포 | ✅ | https://ai-context-handover-lab.vercel.app/ (HTTP 200) |
| 엔지니어링 기술 백서 (PPTX / PDF) | ✅ | [`AI_AGENT_HANDOVER_WHITEPAPER.pptx`](../reports/AI_AGENT_HANDOVER_WHITEPAPER.pptx), [`AI_AGENT_HANDOVER_WHITEPAPER.pdf`](../reports/AI_AGENT_HANDOVER_WHITEPAPER.pdf) 12슬라이드 정밀 검증 완료 |
