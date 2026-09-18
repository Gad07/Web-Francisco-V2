import cv2
import os
import glob
import numpy as np

input_dir = r"public\piedra_frames"
output_dir = r"public\piedra_frames_bg_removed"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

files = sorted(glob.glob(os.path.join(input_dir, "*.jpg")))

for file in files:
    img = cv2.imread(file)
    
    # The background is approximately [250, 250, 250]. We will create a mask 
    # to remove the background and save as WEBP for fast web loading.
    
    # Convert to grayscale to easily threshold the background
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Threshold: values > 240 become 0 (transparent), else 255 (opaque)
    _, alpha = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
    
    # Morphological operations to clean up the edges of the mask
    kernel = np.ones((3,3), np.uint8)
    alpha = cv2.morphologyEx(alpha, cv2.MORPH_CLOSE, kernel, iterations=2)
    
    # Blur the alpha channel slightly for smooth edges
    alpha = cv2.GaussianBlur(alpha, (5, 5), 0)
    
    # Merge into 4 channels (BGRA)
    b, g, r = cv2.split(img)
    bgra = cv2.merge([b, g, r, alpha])
    
    basename = os.path.basename(file).replace('.jpg', '.webp')
    out_path = os.path.join(output_dir, basename)
    
    # Save as WEBP
    cv2.imwrite(out_path, bgra, [cv2.IMWRITE_WEBP_QUALITY, 80])

print(f"Processed {len(files)} files and saved to {output_dir}")
