from pathlib import Path

import numpy as np
from PIL import Image

import sys

CLIENT_ROOT = Path(r"E:\ComfyUI-aki-v3\ComfyUI\custom_nodes\comfyui_ominiapi_nano_banana2")
sys.path.insert(0, str(CLIENT_ROOT))
from client import OminiGeminiClient  # noqa: E402


REF_DIR = Path(r"C:\Users\DY-01\Desktop\新建文件夹 (4)")
OUT_DIR = Path(r"C:\Users\DY-01\Desktop\zp集素材\04_视觉补充\01_AI_IP\05_商业应用\refresh_01..03")
OUT_DIR.mkdir(parents=True, exist_ok=True)


def load_reference(path: Path) -> np.ndarray:
    with Image.open(path) as image:
        rgb = image.convert("RGB")
        return np.asarray(rgb, dtype=np.float32) / 255.0


STYLE = """
Use both attached reference boards as the Snow Hanhan identity and art-direction reference. Keep the exact character consistent: a cute rounded white fluffy snow creature, long upright rabbit-like ears with pink inner ears, pink face and rosy circular cheeks, glossy black eyes, tiny pink nose, blue claws, and the blue/pink snowboard motif. Create an original editorial IP case-study board inspired by the supplied long-page visual-system logic: modular sections, strong horizontal dividers, a restrained black/white/ice-blue palette with pink accents, large color fields, numbered cards, generous margins, and a clear reading rhythm. Do not copy any exact composition, logo, wording, or artwork from the other reference. Preserve premium 3D character-design quality, soft snow atmosphere, cool studio light, crisp grid alignment, realistic materials, and clean typography. This must look like a designed portfolio page, not a random illustration.
Avoid unrelated characters, anatomy changes, extra limbs, dark or muddy colors, heavy gradients, clutter, watermarks, and long paragraphs. Do not render Chinese text. Use no text or only a few short, correctly spelled English labels in a clean sans-serif (for example: SNOW HANHAN, IP SYSTEM, CHARACTER, MOTION, LOOK 01, LOOK 02, 2024); use blank label bars for any other copy. Keep the character and every application inside the canvas.
Character lock is critical: the ears must be two long, straight, upright rabbit-like ears with rounded rectangular tips and pink inner panels, each roughly one-third of the body height. Never use short round ears, triangular cat ears, bear ears, or a hood in place of the ears. Keep the pink oval face, rosy circular cheeks, glossy black eyes, blue claws, and fluffy white body faithful to the reference.
"""

PROMPTS = [
    STYLE
    + """
Create a new 3:4 portrait cover and project-introduction board for the Snow Hanhan IP. Use a striking hero composition: the 3D character standing on a reflective ice plane against a pale blue-white mountain atmosphere, with a bold black-and-ice-blue title block and an offset pink accent bar. Under the hero, create a concise project-information area using abstract lines, small numeric metadata, a compact palette row, and a tiny material/shape study; no long copy. Include one inset showing the character silhouette and one inset showing the snowboard motif. The visual hierarchy should feel like the opening page of a refined IP visual system case study: confident, spacious, slightly editorial, and easy to join to two following pages. Use only short English labels such as SNOW HANHAN, IP SYSTEM, 2024, FORM, and COLOR.
""",
    STYLE
    + """
Create a new 3:4 character-system board titled CHARACTER / MOTION. Present Snow Hanhan in a disciplined visual-development layout: a large front, side, and back turn-around row with consistent proportions, a second grid of six clear facial expressions, and a bottom strip of five action poses including skiing, holding poles, waving, exploring with a small telescope, and resting beside a snowball. Use pale frosted cards, fine blue construction lines, small numbered markers, and one pink highlight line to connect the system. Keep the 3D fluffy material and exact face identity from the references while making the poses readable and production-ready. The arrangement should feel like a professional character bible page with modular sections and enough negative space to pair with the cover and application page. Use only short English labels and numerals; no Chinese or paragraphs.
""",
    STYLE
    + """
Create a new 3:4 application board titled LOOKS / APPLICATION. Build the upper half as six numbered Snow Hanhan outfit variants in a clean 2x3 grid: 01 core snow suit, 02 blue ski uniform, 03 pink scarf look, 04 explorer jacket with telescope, 05 cozy knit winter look, 06 simple rest-day silhouette. Keep the character proportions and face identical across all variants; change only clothing, accessories, and small color accents. Build the lower half as practical outputs for the chosen looks: one winter campaign poster, one snowboard graphic, one knit cap and scarf, one enamel pin card, and one small retail gift box. Use bold ice-blue/black/white blocks with pink accents, tiny numbered labels, and blank text bars. Make it feel like a coherent brand-extension system, original but structurally compatible with a long portfolio page, with no Chinese or long copy.
""",
]

NAMES = [
    "AI_IP_SnowHanhan_Cover_Project_System_Refresh_v2.jpg",
    "AI_IP_SnowHanhan_Character_Motion_System_Refresh_v2.jpg",
    "AI_IP_SnowHanhan_Numbered_Looks_Applications_Refresh_v2.jpg",
]


def main() -> None:
    references = [load_reference(REF_DIR / "1.jpg"), load_reference(REF_DIR / "2.jpg")]
    client = OminiGeminiClient(model="gemini-3-pro-image", timeout=600)
    for prompt, filename in zip(PROMPTS, NAMES):
        destination = OUT_DIR / filename
        if destination.exists():
            print(f"SKIP existing {destination}")
            continue
        print(f"GENERATE {filename}", flush=True)
        result = client.generate(
            prompt,
            reference_images=references,
            aspect_ratio="3:4",
            image_size="2K",
        )
        image = result.images[0]
        image.save(destination, format="JPEG", quality=95, subsampling=0)
        print(f"SAVED {destination} {image.size}", flush=True)


if __name__ == "__main__":
    main()
