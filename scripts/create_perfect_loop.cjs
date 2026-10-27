const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');
const ffmpeg = require(path.join(process.cwd(), 'node_modules', 'ffmpeg-static'));

const videoPath = path.join(process.cwd(), 'public', 'video', 'animación.mp4');
const targetLoopPath = path.join(process.cwd(), 'public', 'video', 'gemini_loop_1080p.mp4');
const distLoopPath = path.join(process.cwd(), 'dist', 'video', 'gemini_loop_1080p.mp4');
const tempDir = path.join(process.cwd(), 'scripts', 'temp_loop');

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

console.log('=== Generando Master Loop Perfeccionado ===');
console.log('1. Cortando con precisión quirúrgica desde el río limpio (sin residuos de túnel)...');

// 8.35s to 10.00s is 100% clean river (tunnel completely exited)
// Duration = 1.65s
// Splitting:
// Part A: from 0.25 to 1.65 (duration = 1.40s)
// Part B: from 0.00 to 0.35 (duration = 0.35s)
// xfade transition=fade: duration=0.20s, offset=1.20s
// Resulting single seamless cycle = 1.40s, exactly closed at 8.60s timestamp!
const singleCycle = path.join(tempDir, 'single_cycle.mp4');
const cycleCmd = `"${ffmpeg}" -y -ss 00:00:08.35 -to 00:00:10.00 -i "${videoPath}" -filter_complex "[0:v]scale=1920:1080:flags=lanczos,unsharp=3:3:0.5:3:3:0.0,split=2[vA][vB];[vA]trim=start=0.25:end=1.65,setpts=PTS-STARTPTS[pA];[vB]trim=start=0:end=0.35,setpts=PTS-STARTPTS[pB];[pA][pB]xfade=transition=fade:duration=0.2:offset=1.2,format=yuv420p[out]" -map "[out]" -c:v libx264 -preset slow -crf 12 -pix_fmt yuv420p -movflags +faststart "${singleCycle}"`;
execSync(cycleCmd, { stdio: 'inherit' });
console.log('Ciclo único generado con éxito.');

// 2. Concatenar 3 ciclos idénticos para una reproducción prolongada de 4.2 segundos
// Esto reduce la frecuencia de bucle del reproductor del navegador a solo una vez cada 4.2 segundos
// y garantiza cero saltos en cualquier momento.
const concatList = path.join(tempDir, 'concat.txt');
fs.writeFileSync(concatList, `file '${singleCycle.replace(/\\/g, '/')}'\nfile '${singleCycle.replace(/\\/g, '/')}'\nfile '${singleCycle.replace(/\\/g, '/')}'\n`);

const concatCmd = `"${ffmpeg}" -y -f concat -safe 0 -i "${concatList}" -c copy -movflags +faststart "${targetLoopPath}"`;
execSync(concatCmd, { stdio: 'inherit' });
console.log(`Video master guardado en: ${targetLoopPath}`);

// Copiar a dist
if (fs.existsSync(path.dirname(distLoopPath))) {
  fs.copyFileSync(targetLoopPath, distLoopPath);
  console.log(`Copiado a dist: ${distLoopPath}`);
}

console.log('=== Master loop finalizado con éxito ===');
