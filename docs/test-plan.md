# 테스트 계획 — T01 ~ T10

실행: `npm run test` (Vitest). 테스트 파일 위치는 대상 코드 옆(`src/**/*.test.tsx`).

## 테스트 무결성 규칙 (절대)

- 기존 테스트를 삭제하지 않는다.
- `skip`, `only`, `todo`로 테스트를 회피하지 않는다.
- assertion을 약화해 실패를 숨기지 않는다.
- UI 또는 데이터 처리 로직을 고쳐서 통과시킨다.
- 테스트 변경이 불가피하면 이유를 `docs/HANDOVER_AI_A_TO_B.md`에 기록한다.

## 계약

| ID | 분류 | 테스트 목표 | 검증 파일 | 판정 기준 |
|---|---|---|---|---|
| T01 | 정상 | 홈 화면에서 프로젝트 제목과 핵심 설명이 렌더링된다 | `src/app/page.test.tsx` | `h1`이 "AI Context Handover Lab", 핵심 질문 문구 존재 |
| T02 | 정상 | 주요 네비게이션 링크가 올바른 페이지 경로를 가진다 | `src/components/site-nav.test.tsx` | `NAV_LINKS`의 7개 항목이 각각 올바른 `href`로 렌더링, 경로 중복 없음 |
| T03 | 정상 | Context Handover 페이지에 인계 문서 핵심 항목이 표시된다 | `src/app/handover/page.test.tsx` | `HANDOVER_CHECKLIST`의 모든 `requirement`와 "왜:" 설명이 표시 |
| T04 | 정상 | Model 페이지에 모델 비교 데이터 또는 빈 상태 UI가 표시된다 | *(미작성)* `src/app/models/page.test.tsx` | 데이터가 있으면 테이블, `MODELS`가 빈 배열이면 빈 상태 안내 문구 |
| T05 | 정상 | Metrics 페이지에 생산성 지표 카드 또는 표가 표시된다 | *(미작성)* `src/app/metrics/page.test.tsx` | `METRICS`의 모든 항목이 카드로 렌더링, DORA/SPACE 프레임워크 언급 |
| T06 | 예외 | 출처 데이터가 비어 있거나 URL이 없을 때 앱이 중단되지 않는다 | `src/components/source-link.test.tsx` | `url: null` 및 공백 문자열에서 링크 대신 평문 + 안내, throw 없음 |
| T07 | 예외 | 실험 수치가 일부 누락되어도 `N/A` 또는 적절한 안내 상태가 표시된다 | `src/components/metric-card.test.tsx` | `value: null`/`NaN` → "N/A", `value: 0` → "0"(N/A 아님) |
| T08 | 예외 | 존재하지 않는 경로 접근 시 적절한 not-found UI가 표시된다 | *(미작성)* `src/app/not-found.test.tsx` | `not-found.tsx`가 안내 문구와 홈 복귀 링크를 렌더링 |
| T09 | 회귀 | 모바일 화면에서도 메뉴·카드·표가 겹치거나 화면 밖으로 크게 넘치지 않는다 | *(미작성)* | 375px 폭에서 가로 스크롤 없음. 표는 자체 `overflow-x-auto` 컨테이너 안에서만 스크롤 |
| T10 | 회귀 | 빌드·lint·전체 테스트가 실행 가능하며 기존 테스트를 삭제·skip·약화하지 않는다 | 수동 | `npm run lint && npm run build && npm run test` 모두 exit 0, `.skip`/`.only`/`.todo` 검색 결과 0건 |

## T09 검증 방법 (도구 미설치)

Playwright를 설치하지 않았으므로 현재는 두 가지 중 하나를 택한다.

1. 브라우저 개발자 도구에서 375px 폭으로 `/`, `/handover`, `/models`, `/metrics`, `/tests` 확인 (수동)
2. Playwright를 추가하고 `documentElement.scrollWidth <= clientWidth`를 검사하는 E2E 1건 작성

AI B가 선택하고 그 이유를 기록할 것.
