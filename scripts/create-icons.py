#!/usr/bin/env python3
"""
Generate proper PNG icons for Chrome extension
Creates simple but valid icon images in the required sizes
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Icon sizes needed for Chrome extension
SIZES = [16, 32, 48, 128]
ICONS_DIR = 'src/icons'

# Color scheme
BG_COLOR = '#6366f1'  # Primary purple/blue
ACCENT_COLOR = '#fbbf24'  # Gold/yellow
WHITE = '#ffffff'
DARK = '#1f2937'

def create_icon(size):
    """Create an icon of the specified size"""
    # Create image with background
    img = Image.new('RGBA', (size, size), BG_COLOR)
    draw = ImageDraw.Draw(img)

    # Scale factors based on size
    scale = size / 128

    # Draw keyboard base (white rectangle)
    key_width = int(88 * scale)
    key_height = int(48 * scale)
    key_x = int(20 * scale)
    key_y = int(50 * scale)

    # Draw white keyboard base with rounded corners
    draw.rounded_rectangle(
        [(key_x, key_y), (key_x + key_width, key_y + key_height)],
        radius=int(4 * scale),
        fill=WHITE
    )

    # Draw black keys
    black_key_width = int(8 * scale)
    black_key_height = int(28 * scale)

    black_key_positions = [
        int(35 * scale),
        int(50 * scale),
        int(73 * scale),
        int(88 * scale)
    ]

    for x_pos in black_key_positions:
        draw.rectangle(
            [(x_pos, key_y), (x_pos + black_key_width, key_y + black_key_height)],
            fill=DARK
        )

    # Draw music note (circle + stem)
    if size >= 32:
        note_radius = int(6 * scale)
        note_x = int(95 * scale)
        note_y = int(35 * scale)

        # Note head
        draw.ellipse(
            [(note_x - note_radius, note_y - note_radius),
             (note_x + note_radius, note_y + note_radius)],
            fill=ACCENT_COLOR
        )

        # Note stem
        stem_width = int(3 * scale)
        stem_height = int(15 * scale)
        draw.rectangle(
            [(note_x + note_radius - stem_width//2, note_y - stem_height),
             (note_x + note_radius + stem_width//2, note_y)],
            fill=ACCENT_COLOR
        )

    # Draw code brackets {} for larger icons
    if size >= 48:
        try:
            font_size = int(20 * scale)
            # Try to use a monospace font, fallback to default
            try:
                font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", font_size)
            except:
                font = ImageFont.load_default()

            text = "{}"
            text_x = int(64 * scale)
            text_y = int(25 * scale)

            # Draw text with bounding box to center it
            bbox = draw.textbbox((text_x, text_y), text, font=font)
            text_width = bbox[2] - bbox[0]
            draw.text((text_x - text_width//2, text_y), text, fill=ACCENT_COLOR, font=font)
        except:
            # If text drawing fails, just continue without it
            pass

    return img

def main():
    print("Generating Chrome extension icons...")
    print(f"Output directory: {ICONS_DIR}")

    # Create icons directory if it doesn't exist
    os.makedirs(ICONS_DIR, exist_ok=True)

    # Generate icons for each size
    for size in SIZES:
        output_path = os.path.join(ICONS_DIR, f'icon{size}.png')
        print(f"Creating {size}x{size} icon...")

        icon = create_icon(size)
        icon.save(output_path, 'PNG')

        # Verify the file
        file_size = os.path.getsize(output_path)
        print(f"  ✓ Saved to {output_path} ({file_size} bytes)")

    print("\n✓ All icons generated successfully!")
    print("\nGenerated icons:")
    for size in SIZES:
        print(f"  - icon{size}.png")

if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(f"Error: {e}")
        print("\nIf PIL/Pillow is not installed, run:")
        print("  pip install Pillow")
        exit(1)
