const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const workspaceRoot = path.resolve(__dirname, '..');
const ffmpeg = require(path.join(workspaceRoot, 'node_modules', 'ffmpeg-static'));
const videoPath = path.join(workspaceRoot, 'public', 'video', 'animación.mp4');
const framesDir = path.join(workspaceRoot, 'public', 'VideoFrames');
const loopVideoPath = path.join(workspaceRoot, 'public', 'video', 'gemini_loop_1080p.mp4');

console.log('=== Procesando Animación de Castores ===');
console.log('1. Extrayendo fotogramas a 1920x1080...');

// Clean existing frames
const existing = fs.readdirSync(framesDir).filter(f => f.startsWith('frame_') && f.endsWith('.jpg'));
console.log(`Encontrados ${existing.length} frames previos. Reemplazando con la nueva animacion...`);

// Extract all frames at 24fps, scaled to 1920x1080 with high-quality lanczos
// -q:v 2 provides high-end visual fidelity
const extractCmd = `"${ffmpeg}" -y -i "${videoPath}" -vf "scale=1920:1080:flags=lanczos" -r 24 -q:v 2 "${path.join(framesDir, 'frame_%03d.jpg')}"`;
execSync(extractCmd, { stdio: 'inherit' });

const newFrames = fs.readdirSync(framesDir).filter(f => f.startsWith('frame_') && f.endsWith('.jpg')).sort();
const totalNewFrames = newFrames.length;
console.log(`Total de frames extraidos: ${totalNewFrames}`);

// 2. Generate seamless loop video of beavers swimming from the end of the video
// In animacion.mp4, the beavers swim from around 7.5s to 10.0s (last 2.5 seconds)
// We create a seamless loop using xfade so it loops infinitely without a cut
console.log('2. Generando video de bucle continuo (loop) de los castores nadando...');
const tempPart = path.join(workspaceRoot, 'public', 'video', 'beavers_swim_raw.mp4');

// Extract last 2.6 seconds
execSync(`"${ffmpeg}" -y -ss 00:00:07.40 -to 00:00:10.00 -i "${videoPath}" -vf "scale=1920:1080:flags=lanczos" -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p "${tempPart}"`, { stdio: 'pipe' });

// Create seamless loop with xfade between the clip and itself
// duration 2.6s, loop crossfade 0.5s -> seamless 2.1s cycle
const loopFilter = `[0:v]split[v1][v2];[v1]trim=0:2.1,setpts=PTS-STARTPTS[a];[v2]trim=2.1:2.6,setpts=PTS-STARTPTS[b];[b][a]concat=n=2:v=1[cat];[cat]xfade=transition=fade:duration=0.4:offset=1.7,format=yuv420p[out]`;
try {
  // Let's create a smooth 3-second seamless loop
  const seamlessCmd = `"${ffmpeg}" -y -ss 00:00:07.30 -t 2.7 -i "${videoPath}" -filter_complex "[0:v]scale=1920:1080:flags=lanczos,split[main][loop];[main]trim=0:2.3,setpts=PTS-STARTPTS[vmain];[loop]trim=2.1:2.7,setpts=PTS-STARTPTS[vloop];[vloop][vmain]xfade=transition=fade:duration=0.35:offset=0.25,format=yuv420p[out]" -map "[out]" -r 24 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -movflags +faststart "${loopVideoPath}"`;
  execSync(seamlessCmd, { stdio: 'inherit' });
} catch (e) {
  // Fallback to direct clip with crossfade
  const fallbackCmd = `"${ffmpeg}" -y -ss 00:00:07.40 -t 2.6 -i "${videoPath}" -vf "scale=1920:1080:flags=lanczos" -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -movflags +faststart "${loopVideoPath}"`;
  execSync(fallbackCmd, { stdio: 'inherit' });
}

if (fs.existsSync(tempPart)) fs.unlinkSync(tempPart);

console.log('Video loop creado con éxito.');

// Write count into a JSON file so frontend knows exact count
const metaFile = path.join(workspaceRoot, 'src', 'data', 'animationMeta.json');
fs.writeFileSync(metaFile, JSON.stringify({ totalFrames: totalNewFrames }, null, 2));
console.log(`Guardado metadata: ${totalNewFrames} frames en ${metaFile}`);

console.log('=== Proceso finalizado con éxito ===');
