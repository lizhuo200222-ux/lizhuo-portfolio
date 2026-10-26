from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "output" / "pdf" / "李卓_视觉设计师_润色版_2026-08.pdf"
PHOTO = ROOT / "tmp" / "extracted" / "X9.png"

PAGE_W, PAGE_H = A4
NAVY = colors.HexColor("#172638")
INK = colors.HexColor("#1F2933")
MUTED = colors.HexColor("#687581")
LINE = colors.HexColor("#D8DEE3")
PALE = colors.HexColor("#F4F7F8")
TEAL = colors.HexColor("#4DAA9B")
GOLD = colors.HexColor("#D19A4A")
BLUE = colors.HexColor("#426A8C")


def register_fonts():
    font_dir = Path("C:/Windows/Fonts")
    pdfmetrics.registerFont(TTFont("ResumeSans", str(font_dir / "Deng.ttf")))
    pdfmetrics.registerFont(TTFont("ResumeSans-Bold", str(font_dir / "Dengb.ttf")))
    pdfmetrics.registerFontFamily(
        "ResumeSans", normal="ResumeSans", bold="ResumeSans-Bold"
    )


def style(name, size, leading=None, color=INK, bold=False, space_after=0):
    return ParagraphStyle(
        name=name,
        fontName="ResumeSans-Bold" if bold else "ResumeSans",
        fontSize=size,
        leading=leading or size * 1.45,
        textColor=color,
        alignment=TA_LEFT,
        spaceAfter=space_after,
        allowWidows=0,
        allowOrphans=0,
    )


STYLES = {
    "body": style("body", 9.2, 13.8),
    "body_small": style("body_small", 8.4, 12.2, MUTED),
    "body_white": style("body_white", 8.8, 13.2, colors.white),
    "section": style("section", 14.4, 17, INK, True),
    "label": style("label", 7.6, 10, MUTED, True),
    "entry_title": style("entry_title", 10.5, 13, INK, True),
    "entry_meta": style("entry_meta", 8.4, 11, MUTED),
    "card_title": style("card_title", 11.2, 14, INK, True),
    "card_body": style("card_body", 8.8, 13.2),
    "card_body_muted": style("card_body_muted", 8.5, 12.6, MUTED),
    "skill": style("skill", 8.4, 12.6),
    "footer": style("footer", 7.4, 9, MUTED),
}


def draw_paragraph(c, text, x, y_top, width, style_name="body"):
    p = Paragraph(text, STYLES[style_name])
    _, h = p.wrap(width, PAGE_H)
    p.drawOn(c, x, y_top - h)
    return y_top - h


def draw_section(c, title, x, y, width):
    c.setFillColor(TEAL)
    c.roundRect(x, y - 2, 5, 17, 2.5, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("ResumeSans-Bold", 14.4)
    c.drawString(x + 12, y, title)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.7)
    c.line(x + 12 + pdfmetrics.stringWidth(title, "ResumeSans-Bold", 14.4) + 10, y + 4, x + width, y + 4)
    return y - 25


def draw_bullet(c, text, x, y_top, width, color=TEAL, style_name="body"):
    c.setFillColor(color)
    c.circle(x + 2.5, y_top - 6.2, 2.2, fill=1, stroke=0)
    return draw_paragraph(c, text, x + 11, y_top, width - 11, style_name) - 4


def draw_entry(c, company, role, date, bullets, x, y, width, date_color=MUTED):
    c.setFillColor(INK)
    c.setFont("ResumeSans-Bold", 10.5)
    c.drawString(x, y, company)
    c.setFillColor(BLUE)
    c.setFont("ResumeSans-Bold", 9.2)
    c.drawString(x, y - 16, role)
    c.setFillColor(date_color)
    c.setFont("ResumeSans", 8.4)
    c.drawRightString(x + width, y - 1, date)
    y -= 34
    for bullet in bullets:
        y = draw_bullet(c, bullet, x, y, width, TEAL)
    return y - 10


def draw_metric(c, value, label, x, y, width, accent):
    c.setFillColor(PALE)
    c.roundRect(x, y - 54, width, 54, 5, fill=1, stroke=0)
    c.setFillColor(accent)
    c.setFont("ResumeSans-Bold", 18)
    c.drawString(x + 10, y - 24, value)
    c.setFillColor(MUTED)
    c.setFont("ResumeSans", 7.7)
    c.drawString(x + 10, y - 41, label)


def draw_tag(c, text, x, y, max_width, fill_color=colors.white, text_color=INK):
    font = "ResumeSans"
    size = 8.1
    tw = pdfmetrics.stringWidth(text, font, size)
    w = min(max(tw + 14, 42), max_width)
    c.setFillColor(fill_color)
    c.roundRect(x, y - 17, w, 17, 4, fill=1, stroke=0)
    c.setFillColor(text_color)
    c.setFont(font, size)
    c.drawCentredString(x + w / 2, y - 12.2, text)
    return w


def draw_sidebar(c, x, y, width):
    c.setFillColor(colors.HexColor("#EAF1F2"))
    c.roundRect(x, y - 570, width, 570, 7, fill=1, stroke=0)
    y -= 23
    c.setFillColor(INK)
    c.setFont("ResumeSans-Bold", 11.2)
    c.drawString(x + 16, y, "能力标签")
    y -= 19
    groups = [
        ("AI / 视觉", "C4D  ·  Redshift  ·  OC  ·  AI 生图  ·  AI 生视频"),
        ("设计与视频", "Photoshop  ·  Illustrator  ·  Premiere  ·  After Effects"),
        ("数据 / 自动化", "影刀 RPA  ·  1688  ·  亚马逊  ·  拼多多  ·  九数云"),
        ("网页 / 工具方向", "前端页面协作  ·  React/Vite 持续实践  ·  AI 工作流原型"),
    ]
    for label, text in groups:
        c.setFillColor(TEAL)
        c.setFont("ResumeSans-Bold", 8.2)
        c.drawString(x + 16, y, label)
        y -= 13
        y = draw_paragraph(c, text, x + 16, y, width - 32, "body_small") - 9

    c.setStrokeColor(colors.HexColor("#C9D9DB"))
    c.line(x + 16, y + 2, x + width - 16, y + 2)
    y -= 22
    c.setFillColor(INK)
    c.setFont("ResumeSans-Bold", 11.2)
    c.drawString(x + 16, y, "教育与荣誉")
    y -= 20
    y = draw_paragraph(c, "<b>长春光华学院</b><br/>本科 · 影视摄影与制作<br/>2021.09-2025.06", x + 16, y, width - 32, "body")
    y -= 11
    y = draw_paragraph(c, "全国数字媒体竞赛国家级二等奖；中国好创意大赛国家级三等奖等专业赛事奖项。", x + 16, y, width - 32, "body_small")
    y -= 18
    c.setStrokeColor(colors.HexColor("#C9D9DB"))
    c.line(x + 16, y + 2, x + width - 16, y + 2)
    y -= 22
    c.setFillColor(INK)
    c.setFont("ResumeSans-Bold", 11.2)
    c.drawString(x + 16, y, "求职方向")
    y -= 18
    for text in [
        "AI 电商视觉 / 视觉设计师",
        "AI 内容生产与视觉工作流",
        "网页与 AI 工具产品（发展方向）",
    ]:
        y = draw_bullet(c, text, x + 16, y, width - 32, GOLD, "body_small")
    y -= 4
    c.setFillColor(MUTED)
    c.setFont("ResumeSans", 8.1)
    c.drawString(x + 16, y, "期望城市：义乌市")
    c.drawString(x + 16, y - 14, "期望薪资：9-14K")


def draw_header(c, page_num=1):
    if page_num == 1:
        c.setFillColor(NAVY)
        c.rect(0, PAGE_H - 154, PAGE_W, 154, fill=1, stroke=0)
        c.setFillColor(TEAL)
        c.rect(40, PAGE_H - 154, 66, 4, fill=1, stroke=0)
        c.setFillColor(colors.white)
        c.setFont("ResumeSans-Bold", 27)
        c.drawString(40, PAGE_H - 54, "李卓")
        c.setFont("ResumeSans-Bold", 11.2)
        c.setFillColor(colors.HexColor("#BDE6DE"))
        c.drawString(40, PAGE_H - 78, "AI 电商视觉 / 视觉设计师")
        c.setFillColor(colors.HexColor("#D6E0E7"))
        c.setFont("ResumeSans", 8.7)
        c.drawString(40, PAGE_H - 99, "批量生图 · 3D 视觉 · 生图网站 · 电商数据自动化")
        c.setFont("ResumeSans", 8.3)
        c.drawString(40, PAGE_H - 126, "义乌市  |  13555558884  |  3453026257@qq.com")
        c.drawString(40, PAGE_H - 141, "2年+相关经验  |  2026.09 可到岗  |  期望薪资 9-14K")
        if PHOTO.exists():
            c.drawImage(str(PHOTO), PAGE_W - 118, PAGE_H - 120, width=78, height=78, preserveAspectRatio=True, mask="auto")
            c.setStrokeColor(colors.HexColor("#D6E0E7"))
            c.setLineWidth(1)
            c.rect(PAGE_W - 118, PAGE_H - 120, 78, 78, fill=0, stroke=1)
    else:
        c.setFillColor(NAVY)
        c.rect(0, PAGE_H - 58, PAGE_W, 58, fill=1, stroke=0)
        c.setFillColor(colors.white)
        c.setFont("ResumeSans-Bold", 13)
        c.drawString(40, PAGE_H - 35, "李卓")
        c.setFillColor(colors.HexColor("#BDE6DE"))
        c.setFont("ResumeSans", 8.8)
        c.drawString(95, PAGE_H - 35, "AI 电商视觉 / 视觉设计师")
        c.setFillColor(colors.HexColor("#D6E0E7"))
        c.setFont("ResumeSans", 8.2)
        c.drawRightString(PAGE_W - 40, PAGE_H - 35, "精选项目与个人方向")


def draw_project_card(c, title, role, date, bullets, x, y_top, width, fill_color, accent):
    height = 142
    c.setFillColor(fill_color)
    c.roundRect(x, y_top - height, width, height, 7, fill=1, stroke=0)
    c.setFillColor(accent)
    c.roundRect(x + 14, y_top - 25, 5, 16, 2.5, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("ResumeSans-Bold", 11.2)
    c.drawString(x + 29, y_top - 20, title)
    c.setFillColor(MUTED)
    c.setFont("ResumeSans", 8.3)
    c.drawRightString(x + width - 15, y_top - 20, date)
    c.setFillColor(accent)
    c.setFont("ResumeSans-Bold", 8.4)
    c.drawString(x + 29, y_top - 39, role)
    y = y_top - 55
    for bullet in bullets:
        y = draw_bullet(c, bullet, x + 17, y, width - 32, accent, "card_body")


def draw_personal_card(c, x, y_top, width, title, label, text, accent):
    height = 122
    c.setFillColor(colors.white)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.8)
    c.roundRect(x, y_top - height, width, height, 7, fill=1, stroke=1)
    c.setFillColor(accent)
    c.rect(x, y_top - height, 5, height, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("ResumeSans-Bold", 10.6)
    c.drawString(x + 17, y_top - 23, title)
    c.setFillColor(accent)
    c.setFont("ResumeSans-Bold", 8.1)
    c.drawString(x + 17, y_top - 41, label)
    draw_paragraph(c, text, x + 17, y_top - 52, width - 32, "card_body_muted")


def build():
    register_fonts()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=A4)
    c.setTitle("李卓 - 视觉设计师与AI电商视觉")
    c.setAuthor("李卓")

    # Page 1: positioning, summary and verified professional experience.
    draw_header(c, 1)
    left_x, left_w = 40, 354
    side_x, side_w = 416, 139
    y = PAGE_H - 181
    y = draw_section(c, "个人简介", left_x, y, left_w)
    summary = (
        "影视摄影与制作本科，具备 C4D/Redshift 建模渲染与电商视觉基础，曾完成产品建模、材质灯光、场景渲染、主图与详情页设计。"
        "近阶段将 AI 批量生图、生视频与电商数据自动化结合，能够把参考图/提示词、批量生成、筛选复核、数据整理和交付检查串成可复用流程；参与过生图网站与公司官网前端制作，后续聚焦网页与 AI 工具产品实现。"
    )
    y = draw_paragraph(c, summary, left_x, y, left_w, "body") - 13
    metric_w = (left_w - 18) / 3
    draw_metric(c, "60%", "物料周期缩短", left_x, y, metric_w, TEAL)
    draw_metric(c, "7", "1688 自动化机器人", left_x + metric_w + 9, y, metric_w, BLUE)
    draw_metric(c, "30+", "月均商业短视频", left_x + (metric_w + 9) * 2, y, metric_w, GOLD)
    y -= 78
    y = draw_section(c, "工作经历", left_x, y, left_w)
    y = draw_entry(
        c,
        "浙江树外科技有限公司",
        "视觉设计师 / AI视觉与数据自动化",
        "2025.06-2026.08（预计月底离职）",
        [
            "负责电商批量生图与素材生产：整理参考图、提示词变量、场景/角度/光线组合和人工复核流程，批量产出主图、详情页与场景图，并统一尺寸、命名和交付规范。",
            "参与搭建生图网站/工作台：梳理素材上传、提示词与参数设置、批量任务、进度查看、部分失败重试、历史记录和批量下载等流程，参与页面结构与前端实现，持续迭代中。",
            "使用 OC 完成产品白底与场景渲染，结合 AI 生图、生视频工具优化商品视觉内容，单张物料制作周期缩短约 60%。",
            "从 0 搭建 7 个 1688 自动化数据机器人，覆盖推广、竞品、销售等核心维度，形成定时采集、清洗、汇总流程，采集效率提升 95%+。",
            "拓展亚马逊、拼多多竞品分析流程，将整理后的数据传输至九数云并制作可视化看板，支持运营判断与策略复盘。",
        ],
        left_x,
        y,
        left_w,
    )
    y = draw_entry(
        c,
        "义乌市临祥纺织品有限公司",
        "3D 设计师（在校实习）",
        "2023.06-2024.04",
        [
            "使用 C4D 完成产品建模，配合 Redshift 进行灯光、材质和场景搭建，输出白底图、细节特写与场景意境图。",
            "参与 Logo、商品主图与详情页设计，提炼产品卖点并统一视觉层级与色彩表达，支持店铺视觉升级。",
            "完成品牌视频剪辑、调色、特效合成与音频处理，维护建模素材、渲染预设和设计模板资源库。",
        ],
        left_x,
        y,
        left_w,
    )
    draw_sidebar(c, side_x, PAGE_H - 181, side_w)
    c.setFillColor(MUTED)
    c.setFont("ResumeSans", 7.4)
    c.drawRightString(PAGE_W - 40, 22, "李卓  |  2026.08 版本  |  1 / 2")
    c.showPage()

    # Page 2: selected projects and future web/product direction.
    draw_header(c, 2)
    x, width = 40, PAGE_W - 80
    y = PAGE_H - 90
    y = draw_section(c, "精选项目", x, y, width)
    draw_project_card(
        c,
        "AI 驱动的商业视觉与生图网站工作流",
        "工作项目  |  视觉与 AI 设计  |  3D 渲染 + 批量生图",
        "2026.04-2026.08",
        [
            "融合 OC 产品渲染与 AI 生图工具，搭建主图、详情页与场景图的批量生成、筛选和复核流程，按商品卖点快速形成可交付方案。",
            "梳理生图网站的上传、参数、任务进度、失败重试、历史与下载状态，参与页面构建与前端调试。",
            "建立 AI 生视频标准化制作流程，持续产出商业短视频，缩短素材制作链路并降低重复制作成本。",
        ],
        x,
        y,
        width,
        colors.HexColor("#F7F1E7"),
        GOLD,
    )
    y -= 160
    draw_project_card(
        c,
        "电商全平台数据自动化抓取与分析体系",
        "工作项目  |  数据流程设计与实现  |  1688 / 亚马逊 / 拼多多",
        "2025.11-2026.04",
        [
            "围绕多平台电商数据人工采集效率低、整合困难的问题，设计“采集 - 清洗 - 汇总 - 分析”工作流，并拆分为 7 个 1688 自动化机器人。",
            "建立字段整理、异常检查和重复执行控制，保证多平台数据格式统一、结果可回溯。",
            "将竞品、推广与销售数据沉淀为标准化分析结果和九数云看板，支持运营复盘与策略调整。",
        ],
        x,
        y,
        width,
        colors.HexColor("#EEF5F4"),
        TEAL,
    )
    y -= 160
    y = draw_section(c, "个人项目与发展方向", x, y, width)
    card_w = (width - 14) / 2
    draw_personal_card(
        c,
        x,
        y,
        card_w,
        "AI 电商视觉工作流",
        "个人实践 · 持续迭代",
        "围绕参考图、提示词变量、批量生成、候选筛选、统一命名与尺寸、人工复核等环节，持续沉淀可复用的商品视觉生产流程。",
        TEAL,
    )
    draw_personal_card(
        c,
        x + card_w + 14,
        y,
        card_w,
        "批量生图工作台 / 生图网站",
        "原型 / 持续搭建",
        "将素材上传、参数设置、批次生成、进度查看、部分失败重试、历史记录与批量下载组织为可操作界面，继续深入网页与 AI 工具产品实现。",
        BLUE,
    )
    y -= 145
    y = draw_section(c, "技能工具", x, y, width)
    col_w = (width - 24) / 3
    skill_cols = [
        ("商业视觉", "C4D 建模 · Redshift / OC 渲染\n产品白底图 · 场景图 · 详情页\nLogo 与品牌视觉协作"),
        ("AI 内容生产", "AI 生图 · AI 生视频\n主图 / 详情页替换优化\nPhotoshop · Illustrator · Premiere · After Effects"),
        ("自动化与网页", "影刀 RPA · 数据清洗与分析\n1688 / 亚马逊 / 拼多多\n前端页面协作 · React/Vite 持续实践"),
    ]
    for i, (title, body) in enumerate(skill_cols):
        bx = x + i * (col_w + 12)
        c.setFillColor(PALE)
        c.roundRect(bx, y - 89, col_w, 89, 6, fill=1, stroke=0)
        c.setFillColor(TEAL if i == 0 else BLUE if i == 1 else GOLD)
        c.setFont("ResumeSans-Bold", 9.4)
        c.drawString(bx + 12, y - 19, title)
        draw_paragraph(c, body.replace("\n", "<br/>"), bx + 12, y - 31, col_w - 24, "body_small")
    y -= 112
    c.setFillColor(MUTED)
    c.setFont("ResumeSans", 7.4)
    c.drawString(x, 22, "李卓  |  AI 电商视觉 / 视觉设计师  |  义乌市  |  2026.09 可到岗")
    c.drawRightString(PAGE_W - 40, 22, "2 / 2")
    c.save()


if __name__ == "__main__":
    build()
    print(OUTPUT)
