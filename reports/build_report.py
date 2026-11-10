import os
from pathlib import Path

from PIL import Image
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Inches, Pt


ROOT = Path(__file__).resolve().parents[1]
REPORTS = ROOT / "reports"
ASSETS = REPORTS / "assets"
OUTPUT = REPORTS / "AI_AGENT_HANDOVER_WHITEPAPER.pptx"

BG = "090D12"
PANEL = "11171E"
PANEL2 = "151E27"
BORDER = "2B3744"
WHITE = "F5F7FA"
MUTED = "9CAABA"
DIM = "6E7D8D"
CYAN = "43C7D7"
GREEN = "48D597"
AMBER = "F4B860"
RED = "F06A73"
FONT = "맑은 고딕"


def rgb(value: str) -> RGBColor:
    return RGBColor.from_string(value)


prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
blank = prs.slide_layouts[6]


def add_text(slide, text, x, y, w, h, size=12, color=WHITE, bold=False,
             align=PP_ALIGN.LEFT, valign=MSO_ANCHOR.TOP, font=FONT,
             margin=0.03, hyperlink=None):
    box = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    frame = box.text_frame
    frame.clear()
    frame.word_wrap = True
    frame.margin_left = frame.margin_right = Inches(margin)
    frame.margin_top = frame.margin_bottom = Inches(margin)
    frame.vertical_anchor = valign
    p = frame.paragraphs[0]
    p.alignment = align
    p.space_after = Pt(0)
    p.line_spacing = 1.05
    run = p.add_run()
    run.text = text
    run.font.name = font
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = rgb(color)
    if hyperlink:
        run.hyperlink.address = hyperlink
    return box


def add_box(slide, x, y, w, h, fill=PANEL, line=BORDER, radius=True):
    kind = MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE
    shape = slide.shapes.add_shape(kind, Inches(x), Inches(y), Inches(w), Inches(h))
    shape.fill.solid()
    shape.fill.fore_color.rgb = rgb(fill)
    shape.line.color.rgb = rgb(line)
    shape.line.width = Pt(0.8)
    return shape


def add_slide():
    slide = prs.slides.add_slide(blank)
    bg = slide.background.fill
    bg.solid()
    bg.fore_color.rgb = rgb(BG)
    slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.5), Inches(7.1), Inches(12.33), Inches(0.008)).fill.solid()
    line = slide.shapes[-1]
    line.fill.fore_color.rgb = rgb(BORDER)
    line.line.fill.background()
    add_text(slide, "AI Context Handover Lab", 0.55, 7.16, 4, 0.18, 7.5, DIM)
    add_text(slide, str(len(prs.slides)), 12.1, 7.14, 0.55, 0.2, 8, DIM, align=PP_ALIGN.RIGHT)
    return slide


def add_title(slide, kicker, title, subtitle=""):
    add_text(slide, kicker, 0.65, 0.33, 5, 0.25, 9, CYAN, True)
    add_text(slide, title, 0.65, 0.68, 11.9, 0.55, 25, WHITE, True)
    if subtitle:
        add_text(slide, subtitle, 0.67, 1.28, 11.55, 0.36, 11.5, MUTED)


def add_card(slide, x, y, w, h, title, body, accent=CYAN, title_size=12, body_size=9.5):
    add_box(slide, x, y, w, h)
    stripe = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x), Inches(y), Inches(0.06), Inches(h))
    stripe.fill.solid()
    stripe.fill.fore_color.rgb = rgb(accent)
    stripe.line.fill.background()
    add_text(slide, title, x + 0.22, y + 0.17, w - 0.4, 0.3, title_size, WHITE, True)
    add_text(slide, body, x + 0.22, y + 0.52, w - 0.4, max(0.1, h - 0.6), body_size, MUTED)


def add_metric(slide, x, y, w, label, value, accent=GREEN):
    add_box(slide, x, y, w, 1.05)
    add_text(slide, label, x + 0.17, y + 0.14, w - 0.34, 0.22, 8.5, MUTED)
    add_text(slide, value, x + 0.17, y + 0.43, w - 0.34, 0.42, 21, accent, True)


def add_image_contain(slide, image_path: Path, x, y, w, h):
    add_box(slide, x, y, w, h, fill="070A0E")
    with Image.open(image_path) as im:
        iw, ih = im.size
    scale = min(w / iw, h / ih)
    pw, ph = iw * scale, ih * scale
    slide.shapes.add_picture(str(image_path), Inches(x + (w - pw) / 2), Inches(y + (h - ph) / 2), Inches(pw), Inches(ph))


def set_cell(cell, text, fill, color=WHITE, bold=False, size=9.5, align=PP_ALIGN.LEFT):
    cell.fill.solid()
    cell.fill.fore_color.rgb = rgb(fill)
    cell.margin_left = cell.margin_right = Inches(0.08)
    cell.margin_top = cell.margin_bottom = Inches(0.05)
    frame = cell.text_frame
    frame.clear()
    frame.vertical_anchor = MSO_ANCHOR.MIDDLE
    p = frame.paragraphs[0]
    p.alignment = align
    r = p.add_run()
    r.text = str(text)
    r.font.name = FONT
    r.font.size = Pt(size)
    r.font.bold = bold
    r.font.color.rgb = rgb(color)


def add_table(slide, data, x, y, w, h, widths=None, size=9.5):
    rows, cols = len(data), len(data[0])
    table = slide.shapes.add_table(rows, cols, Inches(x), Inches(y), Inches(w), Inches(h)).table
    if widths:
        for i, width in enumerate(widths):
            table.columns[i].width = Inches(width)
    for r_idx, row in enumerate(data):
        table.rows[r_idx].height = Inches(h / rows)
        for c_idx, value in enumerate(row):
            set_cell(table.cell(r_idx, c_idx), value, PANEL2 if r_idx == 0 else PANEL,
                     color=CYAN if r_idx == 0 else WHITE, bold=r_idx == 0, size=size,
                     align=PP_ALIGN.CENTER if c_idx > 0 else PP_ALIGN.LEFT)
    return table


# 1 Cover
s = add_slide()
stripe = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(0.18), Inches(7.5))
stripe.fill.solid(); stripe.fill.fore_color.rgb = rgb(CYAN); stripe.line.fill.background()
add_text(s, "대화가 끊겨도 이어지는 프로젝트", 0.85, 1.0, 8, 0.35, 15, CYAN, True)
add_text(s, "AI Context\nHandover Lab", 0.82, 1.55, 8.1, 1.55, 39, WHITE, True)
add_text(s, "대화 전문 없이 저장소와 인수인계 문서만으로\n다른 AI가 같은 검사를 이어 완성할 수 있는가", 0.85, 3.45, 8.4, 0.9, 17, MUTED)
add_box(s, 9.55, 1.15, 2.7, 4.65)
add_text(s, "실험 결과", 9.85, 1.52, 2.1, 0.28, 11, MUTED)
add_text(s, "6/10", 9.85, 2.0, 2.1, 0.55, 30, AMBER, True)
add_text(s, "인계 시점", 9.85, 2.56, 2.1, 0.24, 9, DIM)
add_text(s, "→", 9.85, 3.0, 2.1, 0.4, 24, CYAN, align=PP_ALIGN.CENTER)
add_text(s, "10/10", 9.85, 3.68, 2.1, 0.55, 30, GREEN, True)
add_text(s, "최종 완료", 9.85, 4.25, 2.1, 0.24, 9, DIM)
add_text(s, "2026.08.28", 9.85, 5.12, 2.1, 0.25, 9, MUTED)
add_text(s, "결과물 열기 ↗", 0.85, 5.78, 3.2, 0.25, 9, CYAN, hyperlink="https://ai-context-handover-lab.vercel.app/")
add_text(s, "소스 열기 ↗", 0.85, 6.15, 3.2, 0.25, 9, CYAN, hyperlink="https://github.com/stulss/ai-context-handover-lab")

# 2 Why
s = add_slide(); add_title(s, "01 · WHY", "한 AI의 기억이 아니라, 저장소와 인계 품질", "대화가 끊긴 뒤에도 같은 검사와 판단 기준이 살아남는지 확인했다.")
add_card(s, 0.7, 2.0, 3.8, 2.25, "문제", "긴 대화는 상태·결정·금지사항을 잃는다. 모델이 바뀌면 대화 전문을 그대로 넘길 수도 없다.", RED)
add_card(s, 4.77, 2.0, 3.8, 2.25, "가설", "실행 가능한 인계 문서와 테스트가 있으면 새로운 AI가 저장소를 재탐색하지 않고 이어갈 수 있다.", CYAN)
add_card(s, 8.84, 2.0, 3.8, 2.25, "관찰", "AI B는 13개 테스트 상태를 재현하고 남은 기능을 완성해 T01~T10을 모두 통과했다.", GREEN)
add_box(s, 1.05, 4.9, 11.25, 1.25, PANEL2, CYAN)
add_text(s, "“전체 대화 이력 없이, 구조화된 상태 문서와 코드 저장소만으로 다른 AI가 개발 작업을 성공적으로 이어갈 수 있는가?”", 1.35, 5.2, 10.65, 0.65, 17, WHITE, True, PP_ALIGN.CENTER, MSO_ANCHOR.MIDDLE)

# 3 Sequence
s = add_slide(); add_title(s, "02 · SEQUENCE", "A 시작 → A 인계 → B 시작 → B 완료", "대화 전문은 전달하지 않고 상태 문서와 저장소만 넘겼다.")
stages = [("1", "AI A 시작", "기반·홈·인계 페이지\n테스트 13건", AMBER), ("2", "AI A 인계", "7항목 문서\nPASS 6/10", CYAN), ("3", "AI B 시작", "기준 테스트 독립 실행\n문서와 실제 일치", CYAN), ("4", "AI B 완료", "7개 페이지\nPASS 10/10", GREEN)]
line = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(1.4), Inches(3.02), Inches(10.5), Inches(0.04)); line.fill.solid(); line.fill.fore_color.rgb = rgb(BORDER); line.line.fill.background()
for i, (num, title, body, accent) in enumerate(stages):
    x = 0.75 + i * 3.08
    circle = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(x + 1.05), Inches(2.68), Inches(0.72), Inches(0.72)); circle.fill.solid(); circle.fill.fore_color.rgb = rgb(accent); circle.line.color.rgb = rgb(BG); circle.line.width = Pt(2)
    add_text(s, num, x + 1.05, 2.87, 0.72, 0.2, 10, BG, True, PP_ALIGN.CENTER)
    add_card(s, x, 3.7, 2.8, 1.75, title, body, accent)

# 4 Tests
s = add_slide(); add_title(s, "03 · TEST CONTRACT", "같은 문제, 같은 검사 10개", "입력과 화면에서 확인 가능한 기대값을 한 표에 고정했다.")
rows = [("T01", "/", "제목·핵심 질문"), ("T02", "NAV 7개", "고유 href"), ("T03", "/handover", "7항목 + 왜"), ("T04", "/models", "표/빈 상태"), ("T05", "/metrics", "6카드 + DORA/SPACE"), ("T06", "URL null/공백", "평문 + 안내"), ("T07", "null/NaN/0", "N/A/N/A/0"), ("T08", "없는 경로", "404 + 홈 링크"), ("T09", "375px 5페이지", "본문 overflow 0"), ("T10", "검증 명령", "모두 exit 0")]
add_table(s, [("ID", "입력", "기대값"), *rows[:5]], 0.7, 1.9, 5.95, 4.55, [0.7, 1.8, 3.45], 9.2)
add_table(s, [("ID", "입력", "기대값"), *rows[5:]], 6.7, 1.9, 5.95, 4.55, [0.7, 1.8, 3.45], 9.2)

# 5 Seven handover
s = add_slide(); add_title(s, "04 · HANDOVER", "처음 보는 작업자가 실행할 수 있는 일곱 칸", "생각의 전문이 아니라 현재 상태와 다음 행동을 전달했다.")
items = [("01 · 목표", "완료해야 할 결과"), ("02 · 현재 상태", "구현/미구현 구분"), ("03 · 실행 명령", "install·test·build"), ("04 · 통과 검사", "PASS ID와 건수"), ("05 · 남은 문제", "재현·관련 파일"), ("06 · 다음 행동", "P0 순서·완료판정"), ("07 · 건드리지 말 것", "테스트·수치·링크 보호")]
for i, (title, body) in enumerate(items):
    top = i < 4; idx = i if top else i - 4
    x = (0.7 + idx * 3.06) if top else (2.23 + idx * 3.06); y = 2.0 if top else 4.25
    add_card(s, x, y, 2.8, 1.65, title, body, RED if i == 6 else CYAN)

# 6 AI A
s = add_slide(); add_title(s, "05 · AI A STOP", "계획된 중단: 작동하는 절반과 재현 가능한 다음 행동", "AI A는 홈·인계 페이지와 테스트 기반을 남기고 8번째 요청에서 멈췄다.")
for x, y, label, value, accent in [(0.7,1.95,"실제 작업시간","약 12분",AMBER),(0.7,3.2,"요청 수","8회",AMBER),(0.7,4.45,"고정 검사","6/10",AMBER),(3.25,1.95,"단위 테스트","13 PASS",GREEN),(3.25,3.2,"남은 검사","4개",RED),(3.25,4.45,"종료 스냅샷","4b9be8f",CYAN)]: add_metric(s,x,y,2.35,label,value,accent)
add_image_contain(s, ASSETS / "live-handover-desktop.png", 6.0, 1.86, 6.62, 4.75)
add_text(s, "주의: Git은 이후 생성되어 4b9be8f는 동시점 ID가 아닌 보존 스냅샷이다.", 0.72, 6.12, 5.1, 0.35, 9, RED)

# 7 AI B
s = add_slide(); add_title(s, "06 · AI B CONTINUE", "대화 없이 기준선을 재현하고 남은 기능을 완성", "첫 행동은 코드 수정이 아니라 AI A가 기록한 13 tests PASS 재실행이었다.")
add_image_contain(s, ASSETS / "live-tests-desktop.png", 0.7, 1.85, 6.65, 4.75)
done = [("재현", "AI A 기준과 실제가 일치"), ("구현", "/sources · /metrics · /models"), ("예외", "T08 not-found 자동 테스트"), ("회귀", "T09 375px Playwright"), ("완료", "/experiment · /tests"), ("보존", "기존 테스트 삭제·완화 0건")]
for i, (title, body) in enumerate(done): add_card(s, 7.68, 1.85 + i * 0.78, 4.95, 0.65, title, body, GREEN if i == 5 else CYAN, 10.5, 8.7)

# 8 Final result
s = add_slide(); add_title(s, "07 · RESULT", "6/10에서 10/10으로 — 같은 계약을 지킨 완주", "단위·E2E·lint·build·typecheck를 모두 통과하고 공개 배포했다.")
for x, label, value in [(0.75,"고정 검사","10 / 10"),(3.75,"Vitest","20 PASS"),(6.75,"Playwright","2 PASS"),(9.75,"정적 페이지","7개")]: add_metric(s,x,2.0,2.8,label,value,GREEN)
add_card(s, 0.75, 3.55, 3.85, 1.65, "정확성", "출처 없는 모델 수치를 만들지 않고 확인하지 못한 값은 그대로 표시했다.", CYAN)
add_card(s, 4.75, 3.55, 3.85, 1.65, "데이터 의미", "미측정 null과 실제 측정 0을 구분해 N/A와 0을 다르게 렌더링했다.", CYAN)
add_card(s, 8.75, 3.55, 3.85, 1.65, "반응형", "375px에서 본문 가로 넘침 0, 모델 표만 자체 컨테이너에서 스크롤한다.", CYAN)
add_box(s, 0.75, 5.65, 11.85, 0.72, PANEL2, GREEN); add_text(s, "최종 검증: test · test:e2e · lint · build · typecheck 모두 PASS", 1.05, 5.87, 11.25, 0.3, 13, GREEN, True, PP_ALIGN.CENTER)

# 9 Blind comparison
s = add_slide(); add_title(s, "08 · BLIND COMPARISON", "이름을 가리고 결과만 비교", "계측하지 못한 값은 채우지 않는다. 오류 회차는 고정 검사 중 하나라도 FAIL인 실행 회차다.")
data = [("지표","도구 A","도구 B"),("실제 작업시간","약 12분","N/A"),("요청·호출 수","8회","N/A"),("FAIL 포함 실행 회차","0회","2회"),("고정 검사 통과","6/10","10/10"),("시작 버전","증거 없음","4b9be8f"),("종료 버전","4b9be8f","439e9c3")]
add_table(s, data, 0.85, 1.85, 7.4, 4.75, [3.2,2.1,2.1], 10.5)
add_card(s, 8.65, 1.85, 3.85, 1.65, "읽을 수 있는 결론", "도구 B는 남은 기능을 완성해 통과 수를 10/10으로 높였다.", GREEN)
add_card(s, 8.65, 3.75, 3.85, 1.65, "읽을 수 없는 결론", "B의 시간·요청 수가 없어 어느 도구가 더 효율적인지는 판정할 수 없다.", RED)
add_text(s, "이름 해제: A = Claude Code · B = OpenAI Codex", 8.7, 5.82, 3.7, 0.42, 9, DIM)

# 10 Evidence and verification
s = add_slide(); add_title(s, "09 · EVIDENCE & VERIFY", "증거를 교차 확인하고 30초 안에 재현", "대화 전문은 제출하지 않고 고정 검사·집계·화면·커밋만 남긴다.")
add_image_contain(s, ASSETS / "live-home-desktop.png", 0.7, 1.85, 6.65, 4.75)
steps = [("1 · 위치","배포 URL로 이동",CYAN),("2 · 행동","Handover → Tests → Experiment",CYAN),("3 · 통과","7항목 · T01~T10 PASS · A→B",GREEN),("4 · 실패","로그인 · 404 · 누락 · FAIL · 가로 넘침",RED)]
for i,(title,body,accent) in enumerate(steps): add_card(s, 7.65, 1.85+i*1.1, 4.95, 0.88, title, body, accent, 10.5, 8.8)
add_text(s, "결과물 ↗", 7.7, 6.13, 1.2, 0.25, 9, CYAN, hyperlink="https://ai-context-handover-lab.vercel.app/")
add_text(s, "소스 ↗", 9.15, 6.13, 1.2, 0.25, 9, CYAN, hyperlink="https://github.com/stulss/ai-context-handover-lab")

# 11 Human judgment
s = add_slide(); add_title(s, "10 · HUMAN JUDGMENT", "AI와 나의 판단 3줄", "AI가 구현을 맡았지만 경계·증거·배포 판단은 사람이 통제했다.")
add_card(s, 0.85, 1.95, 11.65, 1.2, "AI에게 맡긴 일", "AI A에는 초기 구현과 인계 문서, AI B에는 남은 기능과 테스트·모바일 검증을 맡겼다.", CYAN)
add_card(s, 0.85, 3.38, 11.65, 1.2, "직접 판단한 일", "push는 Claude에게 맡기고 Vercel 배포는 직접 수행했으며 증거 작성자 표기와 한국어 경고를 요구했다.", GREEN)
add_card(s, 0.85, 4.81, 11.65, 1.2, "AI 제안을 따르지 않은 일", "자동 배포와 출처 없는 수치 보완을 허용하지 않고 미계측 값은 N/A로 남겼다.", AMBER)

# 12 Audit and conclusion
s = add_slide(); add_title(s, "11 · UPDATED CHECKLIST", "성과와 증거 공백을 함께 제출", "프로젝트 완료 뒤 추가된 사전 요건은 소급해 꾸미지 않았다.")
add_metric(s, 0.8, 1.9, 3.5, "충족", "20 / 37", GREEN); add_metric(s, 4.92, 1.9, 3.5, "부분 충족", "4 / 37", AMBER); add_metric(s, 9.04, 1.9, 3.5, "미충족·증거 없음", "13 / 37", RED)
add_card(s, 0.8, 3.45, 5.85, 1.8, "기술적 성공", "실행 순서 · 인계 7항목 · 대화 없는 재개 · 다른 서비스 · 테스트 보존 · 10/10 · 공개 URL", GREEN)
add_card(s, 6.85, 3.45, 5.65, 1.8, "실험 설계 보완", "사전 공통 상한 · AI A 시작 버전 · 새 폴더 재현 · AI B 시간/요청 · 공개 비교 익명화", RED)
add_box(s, 0.8, 5.65, 11.55, 0.72, PANEL2, CYAN)
add_text(s, "다음 선택 기준: 설계·중단 정리는 문서화가 강한 도구, 명확한 테스트를 이어 구현하는 작업은 실행·수정 루프가 빠른 도구를 먼저 선택한다.", 1.05, 5.86, 11.05, 0.34, 11.5, WHITE, True, PP_ALIGN.CENTER)

slide_limit = int(os.environ.get("REPORT_SLIDE_LIMIT", "0"))
if slide_limit:
    while len(prs.slides) > slide_limit:
        slide_id = prs.slides._sldIdLst[-1]
        prs.part.drop_rel(slide_id.rId)
        del prs.slides._sldIdLst[-1]

prs.save(OUTPUT)
print(OUTPUT)
