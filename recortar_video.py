from __future__ import annotations

import argparse
from pathlib import Path

from moviepy.editor import VideoFileClip


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Recorta un video al centro y limita su duración."
    )
    parser.add_argument(
        "--input",
        default="public/san jorge girando.mp4",
        help="Ruta del video de entrada.",
    )
    parser.add_argument(
        "--output",
        default="public/san jorge girando recortado.mp4",
        help="Ruta del video de salida.",
    )
    parser.add_argument(
        "--max-duration",
        type=float,
        default=3.0,
        help="Duración máxima en segundos.",
    )
    parser.add_argument(
        "--crop-percent",
        type=float,
        default=0.7,
        help="Porcentaje del lado mínimo para el recorte cuadrado (0-1).",
    )
    parser.add_argument(
        "--size",
        type=int,
        default=0,
        help="Tamaño final cuadrado en píxeles (0 = no redimensionar).",
    )
    parser.add_argument(
        "--audio",
        action="store_true",
        help="Conservar audio en la salida (si existe).",
    )
    return parser


def main() -> None:
    args = build_parser().parse_args()

    input_path = Path(args.input)
    output_path = Path(args.output)

    if not input_path.exists():
        raise FileNotFoundError(f"No existe el archivo de entrada: {input_path}")
    if not (0 < args.crop_percent <= 1):
        raise ValueError("--crop-percent debe estar entre 0 y 1.")
    if args.max_duration <= 0:
        raise ValueError("--max-duration debe ser mayor que 0.")
    if args.size < 0:
        raise ValueError("--size no puede ser negativo.")

    output_path.parent.mkdir(parents=True, exist_ok=True)

    with VideoFileClip(str(input_path)) as clip:
        width, height = clip.size
        crop_size = int(min(width, height) * args.crop_percent)
        left = (width - crop_size) // 2
        top = (height - crop_size) // 2
        right = left + crop_size
        bottom = top + crop_size

        trimmed = clip.subclip(0, min(args.max_duration, clip.duration))
        cropped = trimmed.crop(x1=left, y1=top, x2=right, y2=bottom)

        if args.size > 0:
            cropped = cropped.resize((args.size, args.size))

        cropped.write_videofile(
            str(output_path),
            codec="libx264",
            audio=args.audio,
            fps=clip.fps,
            preset="medium",
        )

    print(f"Video recortado guardado como: {output_path}")


if __name__ == "__main__":
    main()
