import ffmpegPath from 'ffmpeg-static';
import { execSync } from 'child_process';
import fs from 'fs';

try {
  execSync(`"${ffmpegPath}" -y -i "public/video/video loop.mp4" -vframes 1 "public/test_loop_first.jpg"`, { stdio: 'inherit' });
  console.log('Extracted first frame of video loop.mp4');
} catch (e) {
  console.error(e);
}
