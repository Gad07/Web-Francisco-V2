/**
 * upscale_frames_ai.cjs
 * Reescala con IA (Real-ESRGAN x4plus) la animación fuente de 720p y genera:
 *   1. 240 fotogramas 2560x1440 nítidos en public/VideoFrames
 *   2. El video loop final (a partir de 6.47s) reconstruido desde los frames HD
 *
 * Uso: node scripts/upscale_frames_ai.cjs
 * Requiere: scripts/tools/realesrgan/realesrgan-ncnn-vulkan.exe (GPU Vulkan)
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const ffmpeg = require(path.join(root, 'node_modules', 'ffmpeg-static'));
const esrgan = path.join(__dirname, 'tools', 'realesrgan', 'realesrgan-ncnn-vulkan.exe');
const source = path.join(root, 'public', 'video', 'animación final.mp4');
const framesDir = path.join(root, 'public', 'VideoFrames');
const loopOut = path.join(root, 'public', 'video', 'gemini_loop_1080p.mp4');
const work = path.join(__dirname, 'temp_ai_upscale');
const inDir = path.join(work, 'in');
const chunkIn = path.join(work, 'chunk_in');
const chunkOut = path.join(work, 'chunk_out');
const hdDir = path.join(work, 'hd');

const OUT_W = 2560;
const OUT_H = 1440;
const CHUNK = 12;
const LOOP_START_FRAME = 156; // ≈ 6.47s @ 24fps

const run = (bin, args) => execFileSync(bin, args, { stdio: ['ignore', 'ignore', 'inherit'] });
const reset = (d) => { fs.rmSync(d, { recursive: true, force: true }); fs.mkdirSync(d, { recursive: true }); };

if (!fs.existsSync(esrgan)) throw new Error(`No se encontró Real-ESRGAN en ${esrgan}`);

fs.mkdirSync(work, { recursive: true });
fs.mkdirSync(hdDir, { recursive: true });

// 1. Extraer frames nativos 720p sin pérdida (sin reescalar ni unsharp: la IA trabaja mejor con la fuente pura)
if (!fs.existsSync(inDir) || fs.readdirSync(inDir).length === 0) {
  reset(inDir);
  console.log('[1/4] Extrayendo frames nativos 720p (PNG sin pérdida)...');
  run(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', source, '-vsync', '0', path.join(inDir, 'frame_%03d.png')]);
}
const frames = fs.readdirSync(inDir).filter((f) => f.endsWith('.png')).sort();
console.log(`      ${frames.length} frames fuente.`);

// 2. Reescalado IA por lotes (reanudable: omite frames ya procesados)
console.log('[2/4] Reescalando con Real-ESRGAN x4plus en GPU...');
const pending = frames.filter((f) => !fs.existsSync(path.join(hdDir, f.replace('.png', '.jpg'))));
const t0 = Date.now();
for (let i = 0; i < pending.length; i += CHUNK) {
  const batch = pending.slice(i, i + CHUNK);
  reset(chunkIn);
  reset(chunkOut);
  batch.forEach((f) => fs.copyFileSync(path.join(inDir, f), path.join(chunkIn, f)));

  run(esrgan, ['-i', chunkIn, '-o', chunkOut, '-n', 'realesrgan-x4plus', '-f', 'png']);

  for (const f of batch) {
    run(ffmpeg, [
      '-hide_banner', '-loglevel', 'error', '-y',
      '-i', path.join(chunkOut, f),
      '-vf', `scale=${OUT_W}:${OUT_H}:flags=lanczos`,
      '-q:v', '3',
      path.join(hdDir, f.replace('.png', '.jpg')),
    ]);
  }

  const done = Math.min(i + CHUNK, pending.length);
  const secs = (Date.now() - t0) / 1000;
  const eta = Math.round((secs / done) * (pending.length - done));
  console.log(`      ${done}/${pending.length}  (${(secs / done).toFixed(1)}s/frame, ETA ${Math.floor(eta / 60)}m${eta % 60}s)`);
}
fs.rmSync(chunkIn, { recursive: true, force: true });
fs.rmSync(chunkOut, { recursive: true, force: true });

// 3. Reemplazar frames públicos
console.log('[3/4] Publicando frames HD en public/VideoFrames...');
const hdFrames = fs.readdirSync(hdDir).filter((f) => f.endsWith('.jpg')).sort();
fs.readdirSync(framesDir).filter((f) => /^frame_\d+\.jpg$/.test(f)).forEach((f) => fs.unlinkSync(path.join(framesDir, f)));
hdFrames.forEach((f) => fs.copyFileSync(path.join(hdDir, f), path.join(framesDir, f)));

// 4. Reconstruir el loop desde los frames HD (mismo tramo y crossfade que process_final_animation.cjs)
console.log('[4/4] Reconstruyendo video loop HD...');
const rawLoop = path.join(work, 'loop_raw.mp4');
const cycle = path.join(work, 'loop_cycle.mp4');
run(ffmpeg, [
  '-hide_banner', '-loglevel', 'error', '-y',
  '-framerate', '24', '-start_number', String(LOOP_START_FRAME), '-i', path.join(hdDir, 'frame_%03d.jpg'),
  '-vf', 'scale=1920:1080:flags=lanczos', '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-pix_fmt', 'yuv420p', rawLoop,
]);
run(ffmpeg, [
  '-hide_banner', '-loglevel', 'error', '-y', '-i', rawLoop,
  '-filter_complex', '[0:v]split=2[vA][vB];[vA]trim=start=0.35:end=3.53,setpts=PTS-STARTPTS[pA];[vB]trim=start=0:end=0.45,setpts=PTS-STARTPTS[pB];[pA][pB]xfade=transition=fade:duration=0.28:offset=2.85,format=yuv420p[out]',
  '-map', '[out]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-pix_fmt', 'yuv420p', cycle,
]);
const list = path.join(work, 'concat.txt');
const c = cycle.replace(/\\/g, '/');
fs.writeFileSync(list, `file '${c}'\nfile '${c}'\nfile '${c}'\n`);
run(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', '-movflags', '+faststart', loopOut]);

console.log(`✓ Listo: ${hdFrames.length} frames ${OUT_W}x${OUT_H} + loop HD.`);
console.log(`  (Temporales en ${work} — se pueden borrar)`);
