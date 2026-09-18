import ffmpegPath from 'ffmpeg-static';
import { execSync } from 'child_process';

const outPiedra = execSync(`"${ffmpegPath}" -i "public/imagenes/Piedra.png" 2>&1`, { encoding: 'utf8' });
console.log('Piedra.png:');
console.log(outPiedra.split('\n').filter(l => l.includes('Stream #0')).join('\n'));

const outF1 = execSync(`"${ffmpegPath}" -i "public/VideoFrames/frame_001.jpg" 2>&1`, { encoding: 'utf8' });
console.log('frame_001.jpg:');
console.log(outF1.split('\n').filter(l => l.includes('Stream #0')).join('\n'));
