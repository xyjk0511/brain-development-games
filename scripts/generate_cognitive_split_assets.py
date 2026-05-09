from __future__ import annotations

import json
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "training-assets" / "image2-split"
SIZE = 256

PALETTE = [
    ("red", "#ff4963", "#d81e3a", "#ff93a4"),
    ("orange", "#ff9d25", "#e06d00", "#ffd075"),
    ("blue", "#3496ff", "#1268c7", "#94d0ff"),
    ("green", "#78d84e", "#329f30", "#c4f58a"),
    ("purple", "#a36cff", "#6840cf", "#d3b8ff"),
    ("cyan", "#35c9d4", "#008b9d", "#a6f3f5"),
    ("yellow", "#ffd43d", "#e3a300", "#fff19d"),
    ("pink", "#ff74b8", "#d83c86", "#ffc1df"),
]


def rgba(hex_color: str, alpha: int = 255) -> tuple[int, int, int, int]:
    value = hex_color.lstrip("#")
    return (int(value[0:2], 16), int(value[2:4], 16), int(value[4:6], 16), alpha)


def save_image(path: Path, img: Image.Image) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path)


def new_canvas() -> Image.Image:
    return Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))


def draw_shadow(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], alpha: int = 34) -> None:
    draw.ellipse(box, fill=(40, 55, 80, alpha))


def glossy_layer(img: Image.Image, clip: Image.Image) -> None:
    gloss = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    d = ImageDraw.Draw(gloss)
    d.arc((62, 46, 174, 156), start=198, end=306, fill=(255, 255, 255, 150), width=12)
    d.ellipse((74, 88, 90, 104), fill=(255, 255, 255, 175))
    d.polygon([(80, 72), (128, 38), (177, 94), (132, 83)], fill=(255, 255, 255, 35))
    d.polygon([(66, 142), (112, 88), (162, 154), (112, 192)], fill=(255, 255, 255, 24))
    gloss.putalpha(Image.composite(gloss.getchannel("A"), Image.new("L", (SIZE, SIZE), 0), clip))
    img.alpha_composite(gloss)


def draw_gem(shape: str, color_index: int) -> Image.Image:
    _, main, dark, light = PALETTE[color_index - 1]
    img = new_canvas()
    d = ImageDraw.Draw(img)
    draw_shadow(d, (68, 214, 188, 238), 28)
    clip = Image.new("L", (SIZE, SIZE), 0)
    cd = ImageDraw.Draw(clip)
    if shape == "circle":
        box = (48, 42, 208, 202)
        cd.ellipse(box, fill=255)
        d.ellipse(box, fill=rgba(main), outline=rgba(dark), width=9)
        d.ellipse((73, 67, 183, 177), outline=(255, 255, 255, 80), width=6)
    elif shape == "square":
        box = (54, 50, 202, 198)
        cd.rounded_rectangle(box, radius=27, fill=255)
        d.rounded_rectangle(box, radius=27, fill=rgba(main), outline=rgba(dark), width=9)
        d.rounded_rectangle((82, 78, 174, 170), radius=17, outline=(255, 255, 255, 76), width=6)
    else:
        pts = [(128, 34), (212, 202), (44, 202)]
        cd.polygon(pts, fill=255)
        d.polygon(pts, fill=rgba(main), outline=rgba(dark))
        d.line([pts[0], pts[1], pts[2], pts[0]], fill=rgba(dark), width=9, joint="curve")
        d.line([(128, 74), (178, 178), (78, 178), (128, 74)], fill=(255, 255, 255, 80), width=6, joint="curve")

    # Subtle hand-painted facets on top of the simple geometric target.
    overlay = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.polygon([(74, 66), (126, 46), (190, 108), (132, 92)], fill=rgba(light, 88))
    od.polygon([(64, 140), (112, 86), (170, 158), (116, 206)], fill=rgba(dark, 40))
    overlay.putalpha(Image.composite(overlay.getchannel("A"), Image.new("L", (SIZE, SIZE), 0), clip))
    img.alpha_composite(overlay)
    glossy_layer(img, clip)
    return img


def draw_badge(index: int) -> Image.Image:
    _, main, dark, light = PALETTE[index % len(PALETTE)]
    img = new_canvas()
    d = ImageDraw.Draw(img)
    draw_shadow(d, (82, 214, 174, 234), 30)
    variant = index % 4
    if variant == 0:
        pts = star_points(128, 122, 76, 34, 5)
        d.polygon(pts, fill=rgba(main), outline=(255, 255, 255, 255))
        d.line(pts + [pts[0]], fill=rgba(dark), width=5, joint="curve")
    elif variant == 1:
        d.ellipse((55, 48, 201, 194), fill=rgba(main), outline=rgba(dark), width=6)
        d.ellipse((80, 73, 176, 169), outline=(255, 255, 255, 86), width=6)
    elif variant == 2:
        d.rounded_rectangle((58, 50, 198, 190), radius=25, fill=rgba(main), outline=rgba(dark), width=6)
        d.rounded_rectangle((84, 76, 172, 164), radius=15, outline=(255, 255, 255, 86), width=6)
    else:
        pts = [(128, 40), (206, 118), (128, 208), (50, 118)]
        d.polygon(pts, fill=rgba(main), outline=rgba(dark))
        d.line(pts + [pts[0]], fill=rgba(dark), width=6, joint="curve")
    d.arc((76, 54, 180, 154), 200, 310, fill=(255, 255, 255, 155), width=10)
    d.ellipse((84, 88, 100, 104), fill=(255, 255, 255, 165))
    d.polygon([(86, 68), (132, 46), (178, 96), (126, 84)], fill=rgba(light, 64))
    return img


def star_points(cx: int, cy: int, outer: int, inner: int, count: int) -> list[tuple[float, float]]:
    pts = []
    for i in range(count * 2):
        r = outer if i % 2 == 0 else inner
        a = -math.pi / 2 + i * math.pi / count
        pts.append((cx + math.cos(a) * r, cy + math.sin(a) * r))
    return pts


def draw_mole(helmet: bool = False, cracked: bool = False) -> Image.Image:
    img = new_canvas()
    d = ImageDraw.Draw(img)
    draw_shadow(d, (70, 216, 186, 236), 30)
    d.rounded_rectangle((58, 62, 198, 218), radius=66, fill=(139, 96, 71, 255), outline=(91, 61, 49, 255), width=8)
    if helmet:
        d.pieslice((50, 34, 206, 132), 180, 360, fill=(70, 152, 255, 255), outline=(18, 104, 199, 255), width=7)
        if cracked:
            d.line([(116, 50), (138, 82), (119, 101), (146, 142)], fill=(255, 255, 255, 230), width=8, joint="curve")
    d.ellipse((88, 113, 104, 129), fill=(29, 37, 53, 255))
    d.ellipse((152, 113, 168, 129), fill=(29, 37, 53, 255))
    d.arc((108, 132, 148, 162), 20, 160, fill=(59, 42, 37, 255), width=6)
    d.ellipse((76, 142, 94, 160), fill=(255, 152, 152, 140))
    d.ellipse((162, 142, 180, 160), fill=(255, 152, 152, 140))
    d.line([(54, 164), (32, 146), (30, 124)], fill=(91, 61, 49, 255), width=8)
    d.line([(202, 164), (224, 146), (226, 124)], fill=(91, 61, 49, 255), width=8)
    return img


def draw_bomb() -> Image.Image:
    img = new_canvas()
    d = ImageDraw.Draw(img)
    draw_shadow(d, (74, 218, 182, 236), 34)
    d.ellipse((60, 76, 176, 192), fill=(49, 56, 74, 255))
    d.ellipse((84, 98, 130, 144), fill=(255, 255, 255, 42))
    d.line([(154, 78), (174, 45), (206, 58)], fill=(64, 54, 41, 255), width=11)
    d.polygon([(202, 31), (216, 7), (219, 42), (248, 34), (224, 58), (248, 78), (214, 73), (201, 104), (194, 70), (162, 66)], fill=(255, 178, 44, 255), outline=(230, 109, 20, 255))
    return img


def draw_cat() -> Image.Image:
    img = new_canvas()
    d = ImageDraw.Draw(img)
    draw_shadow(d, (70, 218, 186, 236), 28)
    d.polygon([(72, 84), (88, 34), (120, 78)], fill=(245, 169, 91, 255), outline=(204, 120, 48, 255))
    d.polygon([(184, 84), (168, 34), (136, 78)], fill=(245, 169, 91, 255), outline=(204, 120, 48, 255))
    d.rounded_rectangle((52, 72, 204, 212), radius=62, fill=(245, 169, 91, 255), outline=(204, 120, 48, 255), width=7)
    d.ellipse((88, 118, 104, 134), fill=(38, 48, 71, 255))
    d.ellipse((152, 118, 168, 134), fill=(38, 48, 71, 255))
    d.arc((110, 145, 146, 170), 20, 160, fill=(86, 52, 35, 255), width=5)
    d.line([(72, 148), (34, 142), (70, 160), (34, 166)], fill=(138, 86, 52, 255), width=5)
    d.line([(184, 148), (222, 142), (186, 160), (222, 166)], fill=(138, 86, 52, 255), width=5)
    return img


def draw_rabbit() -> Image.Image:
    img = new_canvas()
    d = ImageDraw.Draw(img)
    draw_shadow(d, (70, 218, 186, 236), 26)
    d.ellipse((80, 14, 118, 122), fill=(244, 247, 255, 255), outline=(185, 198, 216, 255), width=6)
    d.ellipse((138, 14, 176, 122), fill=(244, 247, 255, 255), outline=(185, 198, 216, 255), width=6)
    d.line([(99, 32), (100, 108)], fill=(255, 178, 203, 255), width=8)
    d.line([(157, 32), (156, 108)], fill=(255, 178, 203, 255), width=8)
    d.rounded_rectangle((50, 84, 206, 218), radius=64, fill=(255, 255, 255, 255), outline=(185, 198, 216, 255), width=7)
    d.ellipse((88, 130, 104, 146), fill=(36, 48, 71, 255))
    d.ellipse((152, 130, 168, 146), fill=(36, 48, 71, 255))
    d.arc((110, 156, 146, 178), 20, 160, fill=(217, 107, 142, 255), width=5)
    return img


def draw_panda() -> Image.Image:
    img = new_canvas()
    d = ImageDraw.Draw(img)
    draw_shadow(d, (70, 218, 186, 236), 28)
    d.ellipse((52, 52, 108, 108), fill=(39, 49, 66, 255))
    d.ellipse((148, 52, 204, 108), fill=(39, 49, 66, 255))
    d.ellipse((48, 72, 208, 224), fill=(255, 253, 244, 255), outline=(39, 49, 66, 255), width=7)
    d.ellipse((76, 122, 118, 170), fill=(39, 49, 66, 255))
    d.ellipse((138, 122, 180, 170), fill=(39, 49, 66, 255))
    d.ellipse((92, 132, 104, 144), fill=(255, 255, 255, 255))
    d.ellipse((152, 132, 164, 144), fill=(255, 255, 255, 255))
    d.arc((110, 170, 146, 192), 20, 160, fill=(39, 49, 66, 255), width=5)
    return img


def build_assets() -> dict[str, object]:
    manifest: dict[str, object] = {
        "kind": "individual-transparent-png-assets",
        "method": "procedural raster generation from per-asset vector drawing commands; not browser screenshots and not cropped page captures",
        "canvas": {"width": SIZE, "height": SIZE, "format": "png", "background": "transparent"},
        "stroop": {},
        "flash": [],
        "eye": {},
    }

    for shape in ("circle", "square", "triangle"):
        manifest["stroop"][shape] = []
        for idx in range(1, 9):
            path = OUT / "stroop" / f"{shape}_{idx:02}.png"
            save_image(path, draw_gem(shape, idx))
            manifest["stroop"][shape].append(f"/training-assets/image2-split/stroop/{shape}_{idx:02}.png")

    for idx in range(1, 17):
        path = OUT / "flash" / f"badge_{idx:02}.png"
        save_image(path, draw_badge(idx - 1))
        manifest["flash"].append(f"/training-assets/image2-split/flash/badge_{idx:02}.png")

    eye_assets = {
        "mole_normal_idle": draw_mole(),
        "mole_helmet_idle": draw_mole(helmet=True),
        "mole_helmet_cracked": draw_mole(helmet=True, cracked=True),
        "bomb_fuse": draw_bomb(),
        "cat_guard_idle": draw_cat(),
        "rabbit_decoy_idle": draw_rabbit(),
        "panda_decoy_idle": draw_panda(),
    }
    for name, img in eye_assets.items():
        path = OUT / "eye" / f"{name}.png"
        save_image(path, img)
        manifest["eye"][name] = f"/training-assets/image2-split/eye/{name}.png"

    manifest_path = OUT / "image2_split_manifest.json"
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    return manifest


if __name__ == "__main__":
    built = build_assets()
    total = sum(len(v) for v in built["stroop"].values()) + len(built["flash"]) + len(built["eye"])
    print(f"generated {total} individual transparent PNG assets under {OUT}")
