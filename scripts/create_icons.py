from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
ICON_DIR = ROOT / "icons"
SCALE = 4


def draw_icon(size: int, output: str, maskable: bool = False) -> None:
    canvas_size = size * SCALE
    image = Image.new("RGB", (canvas_size, canvas_size), "#0d4f45")
    draw = ImageDraw.Draw(image)

    def point(value: float) -> int:
        return round(value * size * SCALE / 512)

    if not maskable:
        radius = point(112)
        draw.rounded_rectangle(
            (0, 0, canvas_size - 1, canvas_size - 1),
            radius=radius,
            fill="#0d4f45",
        )

    draw.ellipse(
        (point(344), point(58), point(452), point(166)),
        fill="#d86c50",
    )
    draw.polygon(
        [
            (point(116), point(124)),
            (point(396), point(124)),
            (point(276), point(286)),
            (point(276), point(368)),
            (point(348), point(368)),
            (point(348), point(398)),
            (point(164), point(398)),
            (point(164), point(368)),
            (point(236), point(368)),
            (point(236), point(286)),
        ],
        fill="#fff9ec",
    )
    draw.polygon(
        [
            (point(151), point(154)),
            (point(361), point(154)),
            (point(328), point(199)),
            (point(184), point(199)),
        ],
        fill="#e7b55e",
    )
    draw.line(
        [(point(324), point(142)), (point(394), point(99))],
        fill="#fff9ec",
        width=point(18),
    )

    image.resize((size, size), Image.Resampling.LANCZOS).save(
        ICON_DIR / output,
        optimize=True,
    )


ICON_DIR.mkdir(exist_ok=True)
draw_icon(180, "apple-touch-icon.png")
draw_icon(192, "icon-192.png")
draw_icon(512, "icon-512.png")
draw_icon(512, "icon-maskable-512.png", maskable=True)
