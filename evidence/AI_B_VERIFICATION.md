# AI B 검증 증거

검증일: 2026-08-28 KST
작업자: **AI B — OpenAI Codex (Primary Implementer)**
작업 디렉터리: `./ai-context-handover-lab` (저장소 루트)

> 이 문서와 `evidence/ai-b-*.png`는 AI B가 구현·검증 과정에서 생성한 증거다.
> `docs/evidence/`에 있는 AI A 증거는 AI B가 수정하거나 삭제하지 않았다.

## 인계 기준

- 명령: `npm run test`
- 결과: Test Files 5 passed (5), Tests 13 passed (13)
- 판정: `docs/HANDOVER_AI_A_TO_B.md`의 13 passed / PASS 6·10과 차이 없음

## `/sources`

- 구현: 조사 기준일과 `SOURCES` 5건을 `SourceLink`로 렌더링
- `npm run test`: 5 files / 13 tests PASS
- `npm run lint`: exit 0
- `npm run build`: 성공, 정적 라우트 `/sources` 생성 확인

## `/metrics` + T05

- 구현: `METRICS` 6건, DORA·SPACE·Copilot usage metrics와 출처 렌더링
- `npm run test`: 6 files / 15 tests PASS
- `npm run lint`: exit 0
- `npm run build`: 성공, 정적 라우트 `/metrics` 생성 확인

## `/models` + T04

- 작업자: AI B
- 구현: 모델 비교 테이블과 빈 상태 UI
- 데이터 원칙: 확인하지 못한 컨텍스트 창·가격·한도 수치는 `null`, 화면에는 “확인하지 못함”으로 표시
- 수정 증거: 모델 행 머리글에 `scope="row"`를 적용해 접근성 역할 검증 통과

## Not-found + T08

- 작업자: AI B
- 검증: 안내 문구와 홈 복귀 링크 `href="/"`

## 모바일 반응형 + T09

- 작업자 및 캡처 생성자: **AI B — OpenAI Codex**
- 생성 명령: `npm run test:e2e`
- 캡처 환경: Playwright Chromium, 375×812 CSS 픽셀, 전체 페이지 캡처
- 판정: 문서 전체 `scrollWidth <= clientWidth`; 모델 표는 `overflow-x-auto` 컨테이너 안에서만 스크롤

| 증거 파일 | 화면 | 생성자 | SHA-256 |
|---|---|---|---|
| `ai-b-t09-home-375px.png` | `/` | AI B | `5444FEE993AFCCEB678691AC30BC06D2826EBA7448026EBC94DF2D44DF01F8EC` |
| `ai-b-t09-handover-375px.png` | `/handover` | AI B | `785BB46AB35E8C7FFB5F36C1BBA1EA34C97AC21ED177CC605F5B8D2BC87ACC88` |
| `ai-b-t09-models-375px.png` | `/models` | AI B | `E47F7721FF6D924F5563C98D0960C054744AFD9CB8F0285F99102E00DBFBE7A2` |
| `ai-b-t09-metrics-375px.png` | `/metrics` | AI B | `7BCD58835B66496DE4ABC6BC45F716401D7BA441E2E01949B984E9625912EB27` |
| `ai-b-t09-tests-375px.png` | `/tests` | AI B | `8093A8D66E42F106421912F3CD6ECF0A4B44B6C6BD351C97012E83BDBBF79A96` |

파일명이 `t09-`로 시작하는 이전 캡처 5장도 AI B가 생성했다. 작성자 표기를 파일명에 명확히 남기기 위해 최종 증거는 `ai-b-t09-` 접두사를 사용한다.

## `/experiment` · `/tests`

- 작업자: AI B
- 구현: AI A → Handover → AI B 타임라인과 T01~T10 인계/최종 상태 비교
- 확인된 값만 기록: 인계 PASS 6/10, 최종 PASS 10/10, AI A 요청 8회, 인계 누락 0건
- 미계측 값: AI B 요청 수와 첫 수정 시간은 `null`/N/A 유지

## 최종 검증

- `npm run test`: 10 files / 20 tests PASS
- `npm run test:e2e`: 2 tests PASS
- `npm run lint`: PASS
- `npm run build`: PASS
- `npm run typecheck`: PASS
- `.skip`·`.only`·`.todo`: 0건

## 주의 및 경고

- **해결됨:** Playwright가 `127.0.0.1`, 개발 서버가 `localhost`를 사용해 Next.js 교차 출처 경고가 발생했다. 둘 다 `localhost`로 통일했다.
- **주의:** AI B 요청 수와 첫 수정 시간은 신뢰할 수 있는 계측값이 없어 N/A다. 추정값을 넣지 않는다.
- **주의:** 배포는 수행하지 않았다.
- **주의:** Git 저장소가 아니며 사용자 승인 없이 `git init`을 실행하지 않았다.
- **npm 경고:** Playwright 설치 중 `unrs-resolver` 후처리 스크립트가 승인 목록에 없다는 경고가 있었다. 임의 승인하지 않았으며 test/lint/build/typecheck는 모두 통과했다.
- **출력 색상 경고:** 최종 Playwright 실행에서 `NO_COLOR`가 `FORCE_COLOR` 때문에 무시된다는 Node 경고가 출력됐다. 터미널 색상 표시 설정에 관한 안내이며 테스트 결과나 애플리케이션 동작에는 영향이 없다.
