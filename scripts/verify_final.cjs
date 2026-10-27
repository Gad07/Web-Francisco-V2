const path = require('path');
const { execSync } = require('child_process');
const ffmpeg = require(path.join(process.cwd(), 'node_modules', 'ffmpeg-static'));
const targetLoop = path.join(process.cwd(), 'public', 'video', 'gemini_loop_1080p.mp4');
const outDir = path.join(process.cwd(), 'scripts', 'verify_final');
const fs = require('fs');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

[0.05, 0.5, 1.4, 2.8, 4.0].forEach(t => {
  execSync(`"${ffmpeg}" -y -ss ${t} -i "${targetLoop}" -vframes 1 "${path.join(outDir, `final_t_${t}.jpg`)}"`);
});
console.log('Extracted final verification frames.');
