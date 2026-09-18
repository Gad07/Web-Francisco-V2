import ffmpegPath from 'ffmpeg-static';
import { execSync } from 'child_process';
import path from 'path';

try {
  const infoVideo = execSync(`"${ffmpegPath}" -i "public/video/video.mp4" 2>&1`, { encoding: 'utf8' });
  console.log('--- VIDEO.MP4 ---');
  console.log(infoVideo.split('\n').filter(l => l.includes('Duration') || l.includes('Stream #0')).join('\n'));
} catch (e) {
  console.log('VIDEO.MP4 info:', e.stdout || e.stderr || e.message);
}

try {
  const infoLoop = execSync(`"${ffmpegPath}" -i "public/video/video loop.mp4" 2>&1`, { encoding: 'utf8' });
  console.log('--- VIDEO LOOP.MP4 ---');
  console.log(infoLoop.split('\n').filter(l => l.includes('Duration') || l.includes('Stream #0')).join('\n'));
} catch (e) {
  console.log('VIDEO LOOP.MP4 info:', e.stdout || e.stderr || e.message);
}
