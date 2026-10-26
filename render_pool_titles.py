from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


FONT_DIR = Path(r"C:\Windows\Fonts")
FONTS = {
    "yahei": FONT_DIR / "msyh.ttc",
    "yahei_bold": FONT_DIR / "msyhbd.ttc",
    "deng": FONT_DIR / "Deng.ttf",
    "deng_bold": FONT_DIR / "Dengb.ttf",
    "hei": FONT_DIR / "simhei.ttf",
    "kai": FONT_DIR / "simkai.ttf",
}

COPY = {
    11: ("清凉聚场\n一池开玩", "蓝白大空间 盛下全家好时光"),
    12: ("放学就来\n玩水", "家门口的清爽童年主场"),
    13: ("欢乐满池\n清爽加倍", "亲子同游 把热浪变成笑浪"),
    14: ("城市之上\n畅快一夏", "露台也有全家共享的玩水空间"),
    15: ("今日份清凉\n已到位", "随时入水 解锁家庭度假感"),
    16: ("在家开启\n水上假期", "不用远行 也能尽享夏日松弛"),
    17: ("阳光正好\n一起下水", "宽敞池体 轻松承载多人欢乐"),
    18: ("快乐靠岸\n清凉登场", "一家围坐 把日常过成度假"),
    19: ("一碰水花\n就笑开了", "清爽蓝白池 留住亲子高光时刻"),
    20: ("让热浪\n停在池外", "一池清凉 给全家自在玩水"),
}


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONTS[name]), size)


def fit_font(
    draw: ImageDraw.ImageDraw,
    text: str,
    font_name: str,
    max_size: int,
    min_size: int,
    max_width: int,
    max_height: int,
    spacing: int = 4,
    stroke_width: int = 0,
) -> ImageFont.FreeTypeFont:
    for size in range(max_size, min_size - 1, -2):
        candidate = font(font_name, size)
        box = draw.multiline_textbbox(
            (0, 0), text, font=candidate, spacing=spacing, stroke_width=stroke_width
        )
        if box[2] - box[0] <= max_width and box[3] - box[1] <= max_height:
            return candidate
    return font(font_name, min_size)


def rounded_rect(
    overlay: Image.Image,
    box: tuple[int, int, int, int],
    radius: int,
    fill: tuple[int, int, int, int],
    outline: tuple[int, int, int, int] | None = None,
    width: int = 1,
) -> None:
    ImageDraw.Draw(overlay).rounded_rectangle(
        box, radius=radius, fill=fill, outline=outline, width=width
    )


def shadow_text(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    text_font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int] | str,
    *,
    anchor: str | None = None,
    align: str = "left",
    spacing: int = 4,
    stroke_width: int = 0,
    stroke_fill: tuple[int, int, int, int] | str | None = None,
    shadow_offset: tuple[int, int] = (5, 6),
    shadow_fill: tuple[int, int, int, int] = (0, 35, 70, 115),
) -> None:
    sx, sy = xy[0] + shadow_offset[0], xy[1] + shadow_offset[1]
    draw.multiline_text(
        (sx, sy),
        text,
        font=text_font,
        fill=shadow_fill,
        anchor=anchor,
        align=align,
        spacing=spacing,
        stroke_width=stroke_width,
        stroke_fill=shadow_fill,
    )
    draw.multiline_text(
        xy,
        text,
        font=text_font,
        fill=fill,
        anchor=anchor,
        align=align,
        spacing=spacing,
        stroke_width=stroke_width,
        stroke_fill=stroke_fill,
    )


def composite(base: Image.Image, overlay: Image.Image) -> Image.Image:
    return Image.alpha_composite(base, overlay)


def sticker_line(
    text: str,
    font_name: str,
    size: int,
    fill: tuple[int, int, int, int],
    outer: tuple[int, int, int, int],
    *,
    middle: tuple[int, int, int, int] | None = None,
    angle: float = 0,
) -> Image.Image:
    text_font = font(font_name, size)
    probe = Image.new("RGBA", (1, 1), (0, 0, 0, 0))
    probe_draw = ImageDraw.Draw(probe)
    box = probe_draw.textbbox((0, 0), text, font=text_font, stroke_width=12)
    width = box[2] - box[0] + 52
    height = box[3] - box[1] + 48
    layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    origin = (26 - box[0], 22 - box[1])
    d.text(
        (origin[0] + 6, origin[1] + 8),
        text,
        font=text_font,
        fill=outer,
        stroke_width=12,
        stroke_fill=outer,
    )
    d.text(
        origin,
        text,
        font=text_font,
        fill=fill,
        stroke_width=5 if middle else 2,
        stroke_fill=middle or outer,
    )
    if angle:
        layer = layer.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
    return layer


def paste_sticker(overlay: Image.Image, layer: Image.Image, xy: tuple[int, int]) -> None:
    overlay.alpha_composite(layer, dest=xy)


def draw_sun(d: ImageDraw.ImageDraw, center: tuple[int, int], radius: int) -> None:
    cx, cy = center
    yellow = (255, 211, 43, 255)
    d.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), outline=yellow, width=7)
    for dx, dy in ((0, -1), (1, 0), (0, 1), (-1, 0), (1, 1), (-1, 1), (1, -1), (-1, -1)):
        scale = 1.45 if dx == 0 or dy == 0 else 1.25
        start = (cx + int(dx * radius * scale), cy + int(dy * radius * scale))
        end = (cx + int(dx * radius * (scale + 0.52)), cy + int(dy * radius * (scale + 0.52)))
        d.line((start, end), fill=yellow, width=7)


def draw_droplets(d: ImageDraw.ImageDraw, origin: tuple[int, int], flip: bool = False) -> None:
    x, y = origin
    direction = -1 if flip else 1
    blue = (104, 218, 248, 255)
    d.arc((x, y, x + 78 * direction, y + 48), 195 if not flip else 345, 344 if not flip else 165, fill=blue, width=8)
    d.ellipse((x + 86 * direction - 8, y + 10, x + 86 * direction + 8, y + 26), fill=blue)


def draw_11(base: Image.Image, title: str, subtitle: str) -> Image.Image:
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    first, second = title.splitlines()
    line_1 = sticker_line(
        first,
        "yahei_bold",
        94,
        (97, 196, 251, 255),
        (0, 72, 141, 255),
        middle=(255, 255, 255, 255),
        angle=2.5,
    )
    line_2 = sticker_line(
        second,
        "yahei_bold",
        103,
        (255, 255, 255, 255),
        (0, 67, 130, 255),
        angle=-1.5,
    )
    paste_sticker(overlay, line_1, (38, 34))
    paste_sticker(overlay, line_2, (85, 130))
    d.arc((78, 213, 575, 305), 190, 352, fill=(255, 215, 46, 255), width=8)
    d.polygon([(73, 271), (569, 247), (590, 300), (92, 319)], fill=(0, 142, 216, 235))
    sub_font = fit_font(d, subtitle, "yahei_bold", 34, 25, 448, 42)
    d.text((328, 283), subtitle, font=sub_font, fill=(255, 255, 255), anchor="mm")
    draw_droplets(d, (30, 194))
    return composite(base, overlay)


def draw_12(base: Image.Image, title: str, subtitle: str) -> Image.Image:
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    first, second = title.splitlines()
    line_1 = sticker_line(
        first,
        "hei",
        92,
        (84, 185, 245, 255),
        (0, 68, 129, 255),
        middle=(255, 255, 255, 255),
        angle=2,
    )
    line_2 = sticker_line(
        second,
        "yahei_bold",
        117,
        (255, 255, 255, 255),
        (0, 63, 119, 255),
        angle=-3,
    )
    paste_sticker(overlay, line_1, (78, 28))
    paste_sticker(overlay, line_2, (274, 124))
    d.arc((176, 187, 724, 286), 188, 350, fill=(255, 218, 42, 255), width=9)
    d.rounded_rectangle((158, 251, 704, 310), radius=28, fill=(0, 133, 209, 238))
    sub_font = fit_font(d, subtitle, "yahei_bold", 35, 25, 492, 42)
    d.text((431, 281), subtitle, font=sub_font, fill="white", anchor="mm")
    draw_sun(d, (719, 72), 26)
    draw_droplets(d, (45, 160))
    return composite(base, overlay)


def draw_13(base: Image.Image, title: str, subtitle: str) -> Image.Image:
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    first, second = title.splitlines()
    line_1 = sticker_line(
        first,
        "yahei_bold",
        91,
        (24, 126, 205, 255),
        (0, 61, 120, 255),
        middle=(255, 255, 255, 255),
        angle=2,
    )
    line_2 = sticker_line(
        second,
        "yahei_bold",
        99,
        (255, 157, 29, 255),
        (142, 70, 0, 255),
        middle=(255, 255, 255, 255),
        angle=-2.5,
    )
    paste_sticker(overlay, line_1, (36, 28))
    paste_sticker(overlay, line_2, (112, 126))
    d.polygon([(55, 267), (584, 241), (606, 296), (74, 319)], fill=(75, 173, 232, 242))
    sub_font = fit_font(d, subtitle, "yahei_bold", 34, 25, 480, 42)
    d.text((330, 281), subtitle, font=sub_font, fill="white", anchor="mm")
    draw_sun(d, (642, 77), 25)
    draw_droplets(d, (595, 189))
    return composite(base, overlay)


def draw_14(base: Image.Image, title: str, subtitle: str) -> Image.Image:
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    first, second = title.splitlines()
    line_1 = sticker_line(
        first,
        "kai",
        105,
        (255, 255, 255, 255),
        (0, 63, 113, 255),
        angle=-2,
    )
    line_2 = sticker_line(
        second,
        "kai",
        102,
        (255, 218, 42, 255),
        (0, 67, 120, 255),
        angle=2,
    )
    paste_sticker(overlay, line_1, (452, 25))
    paste_sticker(overlay, line_2, (516, 130))
    d.polygon([(433, 271), (934, 239), (951, 289), (453, 319)], fill=(0, 141, 217, 242))
    sub_font = fit_font(d, subtitle, "yahei_bold", 31, 23, 450, 42)
    d.text((690, 280), subtitle, font=sub_font, fill="white", anchor="mm")
    draw_sun(d, (899, 66), 25)
    return composite(base, overlay)


def draw_15(base: Image.Image, title: str, subtitle: str) -> Image.Image:
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    first, second = title.splitlines()
    line_1 = sticker_line(
        first,
        "kai",
        88,
        (255, 255, 255, 255),
        (0, 62, 111, 255),
        angle=2.5,
    )
    line_2 = sticker_line(
        second,
        "yahei_bold",
        94,
        (112, 210, 250, 255),
        (0, 65, 119, 255),
        middle=(255, 255, 255, 255),
        angle=-2,
    )
    paste_sticker(overlay, line_1, (40, 34))
    paste_sticker(overlay, line_2, (100, 129))
    d.rounded_rectangle((75, 254, 566, 309), radius=27, fill=(255, 229, 107, 240))
    sub_font = fit_font(d, subtitle, "yahei_bold", 33, 24, 442, 40)
    d.text((321, 282), subtitle, font=sub_font, fill=(0, 72, 121), anchor="mm")
    draw_droplets(d, (557, 171))
    return composite(base, overlay)


def draw_16(base: Image.Image, title: str, subtitle: str) -> Image.Image:
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    first, second = title.splitlines()
    line_1 = sticker_line(
        first,
        "yahei_bold",
        88,
        (255, 255, 255, 255),
        (0, 73, 133, 255),
        angle=-2,
    )
    line_2 = sticker_line(
        second,
        "yahei_bold",
        99,
        (255, 214, 39, 255),
        (0, 69, 126, 255),
        middle=(255, 255, 255, 255),
        angle=1.5,
    )
    paste_sticker(overlay, line_1, (36, 28))
    paste_sticker(overlay, line_2, (90, 126))
    d.arc((58, 205, 618, 292), 190, 351, fill=(90, 214, 245, 255), width=8)
    d.polygon([(66, 260), (602, 245), (615, 301), (78, 316)], fill=(0, 126, 199, 242))
    sub_font = fit_font(d, subtitle, "yahei_bold", 33, 24, 490, 40)
    d.text((340, 282), subtitle, font=sub_font, fill="white", anchor="mm")
    draw_sun(d, (651, 68), 24)
    return composite(base, overlay)


def draw_17(base: Image.Image, title: str, subtitle: str) -> Image.Image:
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    first, second = title.splitlines()
    line_1 = sticker_line(
        first,
        "yahei_bold",
        90,
        (67, 171, 239, 255),
        (0, 67, 128, 255),
        middle=(255, 255, 255, 255),
        angle=2,
    )
    line_2 = sticker_line(
        second,
        "hei",
        102,
        (255, 255, 255, 255),
        (0, 62, 119, 255),
        angle=-2.5,
    )
    paste_sticker(overlay, line_1, (42, 30))
    paste_sticker(overlay, line_2, (104, 128))
    d.rounded_rectangle((72, 255, 589, 311), radius=28, fill=(0, 137, 211, 239))
    sub_font = fit_font(d, subtitle, "yahei_bold", 33, 24, 468, 40)
    d.text((330, 283), subtitle, font=sub_font, fill="white", anchor="mm")
    draw_droplets(d, (575, 178))
    return composite(base, overlay)


def draw_18(base: Image.Image, title: str, subtitle: str) -> Image.Image:
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    first, second = title.splitlines()
    line_1 = sticker_line(
        first,
        "kai",
        100,
        (255, 255, 255, 255),
        (0, 58, 108, 255),
        angle=-1.5,
    )
    line_2 = sticker_line(
        second,
        "yahei_bold",
        96,
        (255, 218, 47, 255),
        (0, 63, 118, 255),
        middle=(255, 255, 255, 255),
        angle=2,
    )
    paste_sticker(overlay, line_1, (430, 30))
    paste_sticker(overlay, line_2, (487, 132))
    d.polygon([(399, 267), (935, 242), (954, 296), (418, 319)], fill=(0, 135, 207, 240))
    sub_font = fit_font(d, subtitle, "yahei_bold", 33, 24, 487, 40)
    d.text((678, 281), subtitle, font=sub_font, fill="white", anchor="mm")
    draw_sun(d, (918, 73), 24)
    return composite(base, overlay)


def draw_19(base: Image.Image, title: str, subtitle: str) -> Image.Image:
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    first, second = title.splitlines()
    line_1 = sticker_line(
        first,
        "yahei_bold",
        90,
        (38, 139, 218, 255),
        (0, 62, 118, 255),
        middle=(255, 255, 255, 255),
        angle=2.5,
    )
    line_2 = sticker_line(
        second,
        "yahei_bold",
        98,
        (255, 161, 32, 255),
        (137, 65, 0, 255),
        middle=(255, 255, 255, 255),
        angle=-2,
    )
    paste_sticker(overlay, line_1, (36, 28))
    paste_sticker(overlay, line_2, (98, 128))
    d.rounded_rectangle((63, 257, 603, 313), radius=28, fill=(0, 137, 210, 240))
    sub_font = fit_font(d, subtitle, "yahei_bold", 32, 23, 492, 40)
    d.text((333, 285), subtitle, font=sub_font, fill="white", anchor="mm")
    draw_droplets(d, (590, 180))
    return composite(base, overlay)


def draw_20(base: Image.Image, title: str, subtitle: str) -> Image.Image:
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    first, second = title.splitlines()
    line_1 = sticker_line(
        first,
        "kai",
        102,
        (255, 255, 255, 255),
        (0, 60, 113, 255),
        angle=-2,
    )
    line_2 = sticker_line(
        second,
        "yahei_bold",
        101,
        (255, 215, 43, 255),
        (0, 67, 125, 255),
        middle=(255, 255, 255, 255),
        angle=2,
    )
    paste_sticker(overlay, line_1, (140, 30))
    paste_sticker(overlay, line_2, (350, 130))
    d.arc((166, 204, 837, 294), 189, 351, fill=(89, 220, 247, 255), width=9)
    d.polygon([(183, 260), (842, 242), (854, 299), (193, 315)], fill=(0, 128, 202, 239))
    sub_font = fit_font(d, subtitle, "yahei_bold", 34, 25, 610, 42)
    d.text((520, 283), subtitle, font=sub_font, fill="white", anchor="mm")
    draw_sun(d, (858, 72), 25)
    return composite(base, overlay)


DRAWERS = {
    11: draw_11,
    12: draw_12,
    13: draw_13,
    14: draw_14,
    15: draw_15,
    16: draw_16,
    17: draw_17,
    18: draw_18,
    19: draw_19,
    20: draw_20,
}


def normalize_image(source: Path) -> Image.Image:
    image = Image.open(source).convert("RGBA")
    if image.width != image.height:
        side = min(image.width, image.height)
        left = (image.width - side) // 2
        top = (image.height - side) // 2
        image = image.crop((left, top, left + side, top + side))
    if image.size != (1024, 1024):
        image = image.resize((1024, 1024), Image.Resampling.LANCZOS)
    return image


def render(number: int, source_dir: Path, output_dir: Path, overwrite: bool) -> Path:
    source = source_dir / f"{number}.png"
    target = output_dir / f"{number}.png"
    if not source.is_file():
        raise FileNotFoundError(source)
    if target.exists() and not overwrite:
        raise FileExistsError(f"Refusing to overwrite existing output: {target}")

    base = normalize_image(source)
    title, subtitle = COPY[number]
    result = DRAWERS[number](base, title, subtitle).convert("RGB")
    output_dir.mkdir(parents=True, exist_ok=True)
    result.save(target, format="PNG", optimize=True, compress_level=7)
    return target


def parse_numbers(value: str) -> list[int]:
    if value.lower() == "all":
        return list(range(11, 21))
    numbers = [int(item.strip()) for item in value.split(",") if item.strip()]
    invalid = [number for number in numbers if number not in COPY]
    if invalid:
        raise argparse.ArgumentTypeError(f"Only image numbers 11-20 are supported: {invalid}")
    return numbers


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-dir", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path, required=True)
    parser.add_argument("--numbers", default="all")
    parser.add_argument("--overwrite", action="store_true")
    args = parser.parse_args()

    for number in parse_numbers(args.numbers):
        print(render(number, args.source_dir, args.output_dir, args.overwrite))


if __name__ == "__main__":
    main()
