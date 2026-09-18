import cv2
import os

video_path = r"public\video\piedra video.mp4"
output_dir = r"public\piedra_frames"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print("Error opening video file")
    exit()

fps = cap.get(cv2.CAP_PROP_FPS)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
print(f"Video FPS: {fps}, Total Frames: {total_frames}")

# Determine the target frame count for a smooth scroll animation. 
# Depending on the duration, we might want to sample fewer frames to keep the payload small, 
# but the user asked for 45-60 fps. 
# Let's see the total frames first and maybe we just extract all of them or sample them.
# I'll extract a maximum of 120 frames uniformly to keep the browser memory reasonable,
# or if it's already short, just extract all of them.

target_frames = min(total_frames, 120)
step = max(1, total_frames // target_frames)

frame_idx = 0
saved_count = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    if frame_idx % step == 0 and saved_count < target_frames:
        out_path = os.path.join(output_dir, f"frame_{saved_count:03d}.jpg")
        cv2.imwrite(out_path, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 80])
        saved_count += 1
    
    frame_idx += 1

cap.release()
print(f"Extracted {saved_count} frames to {output_dir}")
