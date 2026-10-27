const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const workspaceRoot = path.resolve(__dirname, '..');
const ffmpeg = require(path.join(workspaceRoot, 'node_modules', 'ffmpeg-static'));

const videoPath = path.join(workspaceRoot, 'public', 'video', 'animación final.mp4');
const framesDir = path.join(workspaceRoot, 'public', 'VideoFrames');
const distFramesDir = path.join(workspaceRoot, 'dist', 'VideoFrames');
const loopVideoPath = path.join(workspaceRoot, 'public', 'video', 'gemini_loop_1080p.mp4');
const distLoopVideoPath = path.join(workspaceRoot, 'dist', 'video', 'gemini_loop_1080p.mp4');
const tempDir = path.join(workspaceRoot, 'scripts', 'temp_master_loop');

console.log('====================================================');
console.log('   PROCESAMIENTO MASTER: ANIMACIÓN FINAL Y LOOP     ');
console.log('====================================================');

if (!fs.existsSync(videoPath)) {
  console.error(`ERROR: No se encontró el video fuente en: ${videoPath}`);
  process.exit(1);
}

if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir, { recursive: true });
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

// ----------------------------------------------------
// PASO 1: Extracción de fotogramas de alta densidad
// ----------------------------------------------------
console.log('\n[1/3] Extrayendo todos los fotogramas en 1920x1080 Lanczos de alta fidelidad...');

// Limpiar fotogramas existentes
const prevFrames = fs.readdirSync(framesDir).filter(f => f.startsWith('frame_') && f.endsWith('.jpg'));
console.log(`Eliminando ${prevFrames.length} fotogramas anteriores para reemplazo limpio...`);
for (const f of prevFrames) {
  fs.unlinkSync(path.join(framesDir, f));
}

// Extraer a 24 fps nativos, escalado a 1920x1080 con lanczos de alta definición y máscara de enfoque sutil unsharp (-q:v 1)
const extractCmd = `"${ffmpeg}" -y -i "${videoPath}" -vf "scale=1920:1080:flags=lanczos,unsharp=5:5:0.8:5:5:0.0" -r 24 -q:v 1 "${path.join(framesDir, 'frame_%03d.jpg')}"`;
execSync(extractCmd, { stdio: 'inherit' });

const extractedFrames = fs.readdirSync(framesDir).filter(f => f.startsWith('frame_') && f.endsWith('.jpg')).sort();
const totalFrames = extractedFrames.length;
console.log(`✓ Fotogramas extraídos con éxito: ${totalFrames} frames en calidad ultra HD.`);

// ----------------------------------------------------
// PASO 2: Generar Master Loop a partir de 00:00:06.47
// ----------------------------------------------------
console.log('\n[2/3] Generando bucle perfecto (seamless loop) a partir del segundo 6:47 con máxima nitidez...');

// Cortar desde 00:00:06.47 hasta 00:00:10.00 con unsharp y CRF 12
const rawCut = path.join(tempDir, 'river_raw_647.mp4');
const cutCmd = `"${ffmpeg}" -y -ss 00:00:06.47 -to 00:00:10.00 -i "${videoPath}" -vf "scale=1920:1080:flags=lanczos,unsharp=5:5:0.7:5:5:0.0" -c:v libx264 -preset slow -crf 12 -pix_fmt yuv420p "${rawCut}"`;
execSync(cutCmd, { stdio: 'inherit' });

// Crear ciclo seamless con transición suave xfade entre final e inicio
const singleSeamlessCycle = path.join(tempDir, 'single_seamless_cycle.mp4');
const loopCmd = `"${ffmpeg}" -y -i "${rawCut}" -filter_complex "[0:v]split=2[vA][vB];[vA]trim=start=0.35:end=3.53,setpts=PTS-STARTPTS[pA];[vB]trim=start=0:end=0.45,setpts=PTS-STARTPTS[pB];[pA][pB]xfade=transition=fade:duration=0.28:offset=2.85,format=yuv420p[out]" -map "[out]" -c:v libx264 -preset slow -crf 12 -pix_fmt yuv420p "${singleSeamlessCycle}"`;
execSync(loopCmd, { stdio: 'inherit' });

// Concatenar 3 ciclos para formar una reproducción prolongada y estable (~9.4s)
// Esto evita recalcular el buffer en el navegador y produce un loop continuo sin saltos
const concatList = path.join(tempDir, 'concat_list.txt');
const normalizedSingleCycle = singleSeamlessCycle.replace(/\\/g, '/');
fs.writeFileSync(concatList, `file '${normalizedSingleCycle}'\nfile '${normalizedSingleCycle}'\nfile '${normalizedSingleCycle}'\n`);

const concatCmd = `"${ffmpeg}" -y -f concat -safe 0 -i "${concatList}" -c copy -movflags +faststart "${loopVideoPath}"`;
execSync(concatCmd, { stdio: 'inherit' });
console.log(`✓ Video loop master guardado en: ${loopVideoPath}`);

// Copiar a dist/video si existe
if (fs.existsSync(path.dirname(distLoopVideoPath))) {
  fs.copyFileSync(loopVideoPath, distLoopVideoPath);
  console.log(`✓ Video loop copiado a dist: ${distLoopVideoPath}`);
}

// ----------------------------------------------------
// PASO 3: Sincronizar metadatos y dist
// ----------------------------------------------------
console.log('\n[3/3] Actualizando metadata y sincronizando con dist...');

// Guardar en src/data/animationMeta.json
const metaPath = path.join(workspaceRoot, 'src', 'data', 'animationMeta.json');
fs.writeFileSync(metaPath, JSON.stringify({ totalFrames }, null, 2));
console.log(`✓ Archivo de metadatos actualizado con ${totalFrames} frames en: ${metaPath}`);

// Sincronizar fotogramas a dist/VideoFrames si existe dist
if (fs.existsSync(distFramesDir)) {
  console.log('Sincronizando fotogramas a dist/VideoFrames...');
  // Limpiar dist frames viejos
  const distExisting = fs.readdirSync(distFramesDir).filter(f => f.startsWith('frame_') && f.endsWith('.jpg'));
  for (const f of distExisting) {
    fs.unlinkSync(path.join(distFramesDir, f));
  }
  for (const f of extractedFrames) {
    fs.copyFileSync(path.join(framesDir, f), path.join(distFramesDir, f));
  }
  console.log(`✓ ${extractedFrames.length} fotogramas copiados a dist/VideoFrames.`);
}

console.log('\n====================================================');
console.log('   ¡PROCESAMIENTO FINALIZADO CON ÉXITO ABSOLUTO!    ');
console.log('====================================================\n');
