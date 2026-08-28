# 조사 요약

조사 기준일: **2026-08-28**
코드상 단일 진실 공급원: `src/data/sources.ts`

## 확인된 1차 출처

| ID | 제목 | 기관/저자 | 연도 | 이 사이트에서 쓰는 주장 |
|---|---|---|---|---|
| `space-2021` | The SPACE of Developer Productivity | ACM Queue (Forsgren 외) | 2021 | 생산성은 단일 지표로 환원되지 않는다. 5개 차원으로 측정 |
| `dora` | DORA — DevOps Research and Assessment | Google Cloud / DORA | 2024 | 배포 빈도·리드 타임·변경 실패율·복구 시간의 4지표 |
| `copilot-cacm` | Measuring GitHub Copilot's Impact on Productivity | CACM | 2024 | 사용 지표와 자기보고를 함께 봐야 해석 가능 |
| `lost-in-the-middle` | Lost in the Middle | Liu 외, TACL | 2024 | 긴 컨텍스트 중간 정보의 활용률이 낮다 |
| `anthropic-context-windows` | Context windows — Claude Docs | Anthropic | 2026 | 컨텍스트 창은 모델별로 다르고 긴 대화는 유실될 수 있다 |

## 의도적으로 넣지 않은 것 (중요)

AI A는 **모델별 컨텍스트 창 크기, 가격, 사용량 한도 수치를 하나도 넣지 않았다.**
이유: 이 값들은 자주 바뀌고, 재확인 없이 인용하면 그 시점부터 거짓 정보가 되기 때문이다.
따라서 `src/data/models.ts`는 아직 존재하지 않으며, `/models` 페이지도 없다.

AI B가 `/models`를 만들 때는 반드시 공식 문서 원문을 열어 값을 확인하고, 확인하지 못한 값은
`contextWindow: null`로 두어 UI에서 "확인하지 못함"으로 표시할 것. **추정치를 채우지 말 것.**

## 아직 조사하지 못한 것

- "고정 메시지 한도" vs "토큰/계산량 기반 한도"를 명시적으로 설명하는 1차 출처를 찾지 못했다.
  현재는 개념 설명만 가능하며, 특정 제품의 한도 방식을 단정하려면 각 제품 공식 문서를 확인해야 한다.
- AI 에이전트 간 인계(handover)를 직접 다룬 학술 논문은 확인하지 못했다.
  `lost-in-the-middle`은 인접 근거일 뿐 인계 자체의 근거가 아니다. 이 구분을 사이트에서 흐리지 말 것.
