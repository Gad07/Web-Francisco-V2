import re
from PIL import Image
import io, base64

with open('public/logos/Logo Bg transparente.svg', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

images = re.findall(r'data:image/png;base64,([A-Za-z0-9+/=]+)', text)
img_mask = Image.open(io.BytesIO(base64.b64decode(images[0]))).convert('L')

w, h = img_mask.size
pixels = img_mask.load()
min_x, min_y, max_x, max_y = w, h, 0, 0
for y in range(0, h, 4):
    for x in range(0, w, 4):
        val = pixels[x, y]
        if val > 10:  # visible area in mask
            if x < min_x: min_x = x
            if x > max_x: max_x = x
            if y < min_y: min_y = y
            if y > max_y: max_y = y

print('Visible artwork bbox in 6400x6400:', min_x, min_y, max_x, max_y)
scale = 0.233906
vx = min_x * scale + 2.97
vy = min_y * scale + 2.97
vw = (max_x - min_x) * scale
vh = (max_y - min_y) * scale

print(f'Tight viewBox: {vx:.2f} {vy:.2f} {vw:.2f} {vh:.2f}')

new_svg = re.sub(r'viewBox="[^"]+"', f'viewBox="{vx:.2f} {vy:.2f} {vw:.2f} {vh:.2f}"', text, count=1)
with open('public/logos/Logo Bg transparente.svg', 'w', encoding='utf-8') as f_out:
    f_out.write(new_svg)
print('Updated Logo Bg transparente.svg successfully!')
