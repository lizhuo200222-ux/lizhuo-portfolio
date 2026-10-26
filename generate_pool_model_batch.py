from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path

import numpy as np
from PIL import Image


COMFY_CUSTOM_NODES = Path(r"E:\ComfyUI-aki-v3\ComfyUI\custom_nodes")
sys.path.insert(0, str(COMFY_CUSTOM_NODES))

from comfyui_ominiapi_nano_banana2.client import OminiGeminiClient  # noqa: E402


CONTENT = {
    11: {
        "title": "清凉聚场 一池开玩",
        "subtitle": "蓝白大空间 盛下全家好时光",
        "layout": "上方居中偏左的双行错层标题。第一行浅蓝，第二行白色，深蓝厚描边；两行大小不同并轻微相向倾斜。副标题放在下方短蓝色斜带。黄色弧线从标题两侧穿出，但不能压字。",
    },
    12: {
        "title": "放学就来玩水",
        "subtitle": "家门口的清爽童年主场",
        "layout": "左上角阶梯式排版。主标题拆成“放学就来”和“玩水”两层，第一层向右上扬、第二层向左错位，不能居中。浅蓝与白色双主色，黄色短下划线。副标题放在右侧较短的蓝色胶囊条，和主标题不在同一中轴。",
    },
    13: {
        "title": "欢乐满池 清爽加倍",
        "subtitle": "亲子同游 把热浪变成笑浪",
        "layout": "右上角不对称排版。主标题两行右对齐，第一行深蓝粗黑体，第二行橙黄色手写粗体，白色外描边；标题整体向左下形成斜切轮廓。副标题使用一条细长浅蓝笔刷带，紧贴第二行下方。",
    },
    14: {
        "title": "城市之上 畅快一夏",
        "subtitle": "露台也有全家共享的玩水空间",
        "layout": "左侧窄栏式构图，但不要矩形卡片。主标题沿左上区域形成两段竖向错列，四字一组，白色毛笔粗字配亮黄色关键词；副标题横向落在标题右下方的窄蓝色笔刷带中。整体留出右侧城市景观。",
    },
    15: {
        "title": "今日份清凉 已到位",
        "subtitle": "随时入水 解锁家庭度假感",
        "layout": "顶部横向杂志标题构图。主标题第一段从左上进入，第二段在右上落下，形成宽而不高的 Z 字动线；使用白色手写粗体与浅蓝色块字混排，不使用底板。副标题是一条很短的黄色圆角细条，放在右上标题末端下方。",
    },
    16: {
        "title": "在家开启 水上假期",
        "subtitle": "不用远行 也能尽享夏日松弛",
        "layout": "左上角竖向双列标题。把“在家开启”和“水上假期”做成两列上下错开的粗笔刷字，不要横向居中；第一列白色深蓝描边，第二列亮黄色深蓝描边。副标题横向放在左侧下方的浅蓝窄带，形成明确的横竖对比。",
    },
    17: {
        "title": "阳光正好 一起下水",
        "subtitle": "宽敞池体 轻松承载多人欢乐",
        "layout": "右上角扇形展开构图。主标题两行从右侧向左展开，第一行浅蓝描边字较小，第二行白色粗字更大；用一条黄色弧形下划线托住第二行。副标题放在弧线下方短蓝色笔刷条，右对齐。",
    },
    18: {
        "title": "快乐靠岸 清凉登场",
        "subtitle": "一家围坐 把日常过成度假",
        "layout": "左上角自由手写构图。主标题用两种笔触：第一行白色毛笔字向右上倾斜，第二行浅蓝粗体向右下倾斜，形成交叉节奏；只加少量水滴，不要太阳。副标题放在两行之间偏右的一条黄色细胶囊中。",
    },
    19: {
        "title": "一碰水花 就笑开了",
        "subtitle": "清爽蓝白池 留住亲子高光时刻",
        "layout": "上方拱形排版。主标题沿轻微向上的弧线分成两段，左段深蓝、右段橙黄，均有白色粗描边；两段不能上下叠成常规两行。副标题在弧线中央下方使用浅蓝短飘带，保持画面中轴但不要遮挡人物。",
    },
    20: {
        "title": "让热浪 停在池外",
        "subtitle": "一池清凉 给全家自在玩水",
        "layout": "右上到左中的对角线构图。主标题前半段位于右上、后半段向左下错落，白色与亮黄色大字交替，深蓝厚描边；整体形成明显下降斜线。副标题独立放在左上较低位置的一条蓝色细带，不能和主标题平行。",
    },
}


COMMON_PROMPT = """以这张上传的云蓝平底充气泳池照片为唯一底图。先识别泳池、人物、脸部、水面和安全留白，再完成中文电商主图排版。

必须保持原照片中的泳池、人物、草坪或露台、建筑、光线、透视、产品结构与蓝白配色不变。不要更换场景，不要增删人物，不要改变泳池形状、层数、比例或水面。文字只能使用画面上方或侧上方留白，不能压住泳池、人物、脸和水面。

只添加一个主标题和一个副标题，文字必须逐字准确、清晰无乱码。不要添加价格、功能卖点、Logo、平台标志、第三行文字或其他小字。不要使用大面积半透明卡片、海报框、整块遮罩或廉价模板。字体和装饰要像高质量 GPT 思考生图的夏日电商主图：主标题成为画面主图形，蓝白为主、黄色或橙色少量跳色，粗描边、手写或笔刷感、层级清晰，水花/太阳/弧线装饰只能少量使用且不能压字。

本张唯一排版方案：{layout}

主标题必须精确写成：“{title}”
副标题必须精确写成：“{subtitle}”

输出一张独立 1:1 高清 PNG。只编辑文字与少量平面装饰，不重绘原照片内容。"""


def parse_numbers(value: str) -> list[int]:
    if value.lower() == "all":
        return list(range(11, 21))
    numbers = [int(item.strip()) for item in value.split(",") if item.strip()]
    invalid = [number for number in numbers if number not in CONTENT]
    if invalid:
        raise ValueError(f"Only 11-20 are supported: {invalid}")
    return numbers


def generate_one(
    client: OminiGeminiClient,
    number: int,
    source_dir: Path,
    output_dir: Path,
    overwrite: bool,
) -> Path:
    source = source_dir / f"{number}.png"
    target = output_dir / f"{number}.png"
    if not source.is_file():
        raise FileNotFoundError(source)
    if target.exists() and not overwrite:
        raise FileExistsError(f"Refusing to overwrite: {target}")

    spec = CONTENT[number]
    prompt = COMMON_PROMPT.format(**spec)
    with Image.open(source) as image:
        reference = np.asarray(image.convert("RGB"), dtype=np.float32) / 255.0

    print(f"START {number}", flush=True)
    result = client.generate(
        prompt,
        reference_image=reference,
        aspect_ratio="1:1",
        image_size="1K",
    )
    if len(result.images) != 1:
        raise RuntimeError(f"Expected one image for {number}, got {len(result.images)}")

    output_dir.mkdir(parents=True, exist_ok=True)
    result.images[0].save(target, format="PNG")
    print(f"DONE {number} {target}", flush=True)
    return target


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-dir", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path, required=True)
    parser.add_argument("--numbers", default="all")
    parser.add_argument("--model", default="gemini-3-pro-image")
    parser.add_argument("--overwrite", action="store_true")
    args = parser.parse_args()

    api_key = os.environ.get("OMINIAPI_API_KEY", "").strip()
    if not api_key:
        raise RuntimeError("OMINIAPI_API_KEY is missing")
    client = OminiGeminiClient(api_key=api_key, model=args.model, timeout=300)

    for number in parse_numbers(args.numbers):
        generate_one(client, number, args.source_dir, args.output_dir, args.overwrite)


if __name__ == "__main__":
    main()
