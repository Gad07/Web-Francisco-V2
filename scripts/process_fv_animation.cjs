const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const workspaceRoot = path.resolve(__dirname, '..');
const ffmpeg = require(path.join(workspaceRoot, 'node_modules', 'ffmpeg-static'));

const videoPath = path.join(workspaceRoot, 'public', 'video', 'Animación fv.mp4');
const framesDir = path.join(workspaceRoot, 'public', 'VideoFrames');
const distFramesDir = path.join(workspaceRoot, 'dist', 'VideoFrames');
const loopVideoPath = path.join(workspaceRoot, 'public', 'video', 'gemini_loop_1080p.mp4');
const distLoopVideoPath = path.join(workspaceRoot, 'dist', 'video', 'gemini_loop_1080p.mp4');
const tempDir = path.join(workspaceRoot, 'scripts', 'temp_fv_process');

console.log('====================================================');
console.log(' PROCESAMIENTO DE NUEVA ANIMACIÓN HD: Animación fv  ');
console.log('====================================================');

if (!fs.existsSync(videoPath)) {
  console.error(`ERROR: No se encontró el video en: ${videoPath}`);
  process.exit(1);
}

if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir, { recursive: true });
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

// 1. Extraer 240 fotogramas HD nítidos (1920x1080)
console.log('\n[1/4] Extrayendo 240 fotogramas en 1920x1080 (Lanczos + Unsharp + q:v 1)...');

// Limpiar fotogramas existentes
const prevFrames = fs.readdirSync(framesDir).filter(f => f.startsWith('frame_') && f.endsWith('.jpg'));
console.log(`Eliminando ${prevFrames.length} fotogramas anteriores para reemplazo limpio...`);
for (const f of prevFrames) {
  fs.unlinkSync(path.join(framesDir, f));
}

// Extraer a 24 fps para dar exactamente 240 fotogramas en los ~9.93s de video
const extractCmd = `"${ffmpeg}" -y -i "${videoPath}" -vf "scale=1920:1080:flags=lanczos,unsharp=3:3:0.4:3:3:0.0" -r 24 -q:v 1 "${path.join(framesDir, 'frame_%03d.jpg')}"`;
execSync(extractCmd, { stdio: 'inherit' });

const extractedFrames = fs.readdirSync(framesDir).filter(f => f.startsWith('frame_') && f.endsWith('.jpg')).sort();
const totalFrames = extractedFrames.length;
console.log(`✓ Fotogramas extraídos con éxito: ${totalFrames} frames.`);

// 2. Generar Seamless Loop HD desde el río (segundo 6.80 a 9.93)
console.log('\n[2/4] Generando bucle continuo perfecto (seamless loop) de los castores nadando...');
const rawCut = path.join(tempDir, 'river_raw.mp4');
const cutCmd = `"${ffmpeg}" -y -ss 00:00:06.80 -to 00:00:09.93 -i "${videoPath}" -vf "scale=1920:1080:flags=lanczos,unsharp=3:3:0.4:3:3:0.0" -c:v libx264 -preset slow -crf 14 -pix_fmt yuv420p "${rawCut}"`;
execSync(cutCmd, { stdio: 'inherit' });

// Crear ciclo seamless mediante xfade
const singleSeamlessCycle = path.join(tempDir, 'single_cycle.mp4');
// rawCut dura aprox 3.13s
// Part A: 0.35s to 3.13s
// Part B: 0.00s to 0.45s
// xfade at offset 2.45s, duration 0.30s
const loopCmd = `"${ffmpeg}" -y -i "${rawCut}" -filter_complex "[0:v]split=2[vA][vB];[vA]trim=start=0.35:end=3.13,setpts=PTS-STARTPTS[pA];[vB]trim=start=0:end=0.45,setpts=PTS-STARTPTS[pB];[pA][pB]xfade=transition=fade:duration=0.30:offset=2.45,format=yuv420p[out]" -map "[out]" -c:v libx264 -preset slow -crf 14 -pix_fmt yuv420p "${singleSeamlessCycle}"`;
execSync(loopCmd, { stdio: 'inherit' });

// Concatenar 3 ciclos para formar un video continuo de ~8.2 segundos sin cortes perceptibles
const concatList = path.join(tempDir, 'concat_list.txt');
const normalizedSingleCycle = singleSeamlessCycle.replace(/\\/g, '/');
fs.writeFileSync(concatList, `file '${normalizedSingleCycle}'\nfile '${normalizedSingleCycle}'\nfile '${normalizedSingleCycle}'\n`);

const concatCmd = `"${ffmpeg}" -y -f concat -safe 0 -i "${concatList}" -c copy -movflags +faststart "${loopVideoPath}"`;
execSync(concatCmd, { stdio: 'inherit' });
console.log(`✓ Video loop HD guardado en: ${loopVideoPath}`);

// 3. Actualizar metadatos
console.log('\n[3/4] Actualizando src/data/animationMeta.json...');
const metaPath = path.join(workspaceRoot, 'src', 'data', 'animationMeta.json');
fs.writeFileSync(metaPath, JSON.stringify({ totalFrames }, null, 2));
console.log(`✓ Metadatos actualizados con ${totalFrames} frames.`);

// 4. Sincronizar con dist si existe
console.log('\n[4/4] Sincronizando con dist...');
if (fs.existsSync(distFramesDir)) {
  const distExisting = fs.readdirSync(distFramesDir).filter(f => f.startsWith('frame_') && f.endsWith('.jpg'));
  for (const f of distExisting) {
    fs.unlinkSync(path.join(distFramesDir, f));
  }
  for (const f of extractedFrames) {
    fs.copyFileSync(path.join(framesDir, f), path.join(distFramesDir, f));
  }
  console.log(`✓ ${extractedFrames.length} frames sincronizados a dist/VideoFrames.`);
}
if (fs.existsSync(path.dirname(distLoopVideoPath))) {
  fs.copyFileSync(loopVideoPath, distLoopVideoPath);
  console.log(`✓ Video loop sincronizado a dist/video/gemini_loop_1080p.mp4.`);
}

// Limpiar temporales
fs.rmSync(tempDir, { recursive: true, force: true });

console.log('\n====================================================');
console.log('   ¡PROCESAMIENTO DE Animación fv FINALIZADO!       ');
console.log('====================================================\n');
