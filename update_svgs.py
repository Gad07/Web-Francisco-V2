import base64
import io
import shutil
import os
from PIL import Image

# Backup originals if not already backed up
if not os.path.exists('public/imagenes/Rama 1.svg.bak'):
    shutil.copyfile('public/imagenes/Rama 1.svg', 'public/imagenes/Rama 1.svg.bak')
if not os.path.exists('public/imagenes/Rama 2.svg.bak'):
    shutil.copyfile('public/imagenes/Rama 2.svg', 'public/imagenes/Rama 2.svg.bak')

r1 = Image.open('scratch_rama1_cleaned_v4.png')
r2 = Image.open('scratch_rama2_cleaned_v4.png')

b1 = io.BytesIO()
r1.save(b1, format='PNG', optimize=True)
b1_str = base64.b64encode(b1.getvalue()).decode('utf-8')

b2 = io.BytesIO()
r2.save(b2, format='PNG', optimize=True)
b2_str = base64.b64encode(b2.getvalue()).decode('utf-8')

svg1_content = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1536" height="857.25" viewBox="0 0 1536 857.25" preserveAspectRatio="xMidYMid meet" version="1.0">\n  <image x="0" y="0" width="1536" height="857.25" xlink:href="data:image/png;base64,' + b1_str + '" />\n</svg>'

svg2_content = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1536" height="857.25" viewBox="0 0 1536 857.25" preserveAspectRatio="xMidYMid meet" version="1.0">\n  <image x="0" y="0" width="1536" height="857.25" xlink:href="data:image/png;base64,' + b2_str + '" />\n</svg>'

with open('public/imagenes/Rama 1.svg', 'w', encoding='utf-8') as f:
    f.write(svg1_content)

with open('public/imagenes/Rama 2.svg', 'w', encoding='utf-8') as f:
    f.write(svg2_content)

print('Successfully updated Rama 1.svg and Rama 2.svg!')
