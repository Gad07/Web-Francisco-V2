import ffmpegPath from 'ffmpeg-static';
import { execSync } from 'child_process';
import path from 'path';

const videoPath = path.resolve('public/video/video.mp4');
const outputPattern = path.resolve('public/VideoFrames/frame_%03d.jpg');

console.log('Extracting 4K Lanczos upscaled frames using ffmpeg:', ffmpegPath);
// Upscale to 4K (3840 width), 24 fps, Lanczos algorithm, q=1 maximum quality JPEGs
const command = `"${ffmpegPath}" -y -ss 2 -i "${videoPath}" -vf "fps=24,scale=3840:-1:flags=lanczos" -q:v 1 "${outputPattern}"`;
console.log('Running command:', command);

try {
  execSync(command, { stdio: 'inherit' });
  console.log('4K Frame extraction complete!');
} catch (err) {
  console.error('Error extracting 4K frames:', err);
}
