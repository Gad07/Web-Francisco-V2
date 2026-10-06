/**
 * Analiza el video "ezremove": samplea pixeles para determinar si el fondo
 * fue eliminado (negro, blanco, alfa) y cuanto contraste tiene el sujeto.
 */
import { execFileSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

const video = process.argv[2] || 'public/video/kling_20260918_VIDEO_Horizontal_5941_0-ezremove.mp4';

const grab = (filter, w, h) => {
  const buf = execFileSync(ffmpegPath, [
    '-v', 'error', '-i', video, '-vf', filter,
    '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-',
  ], { maxBuffer: 1 << 28 });
  return { buf, w, h };
};

const avg = (r) => {
  let R = 0, G = 0, B = 0;
  const n = r.w * r.h;
  for (let i = 0; i < n; i++) {
    R += r.buf[i * 3];
    G += r.buf[i * 3 + 1];
    B += r.buf[i * 3 + 2];
  }
  return [R / n, G / n, B / n].map((x) => Math.round(x));
};

const frames = [0, 24, 60, 96, 119];

for (const n of frames) {
  const sel = `select='eq(n\\,${n})'`;
  const full = grab(`${sel},scale=64:36`, 64, 36);
  const tl = grab(`${sel},crop=16:16:0:0,scale=1:1`, 1, 1);
  const tr = grab(`${sel},crop=16:16:1904:0,scale=1:1`, 1, 1);
  const bl = grab(`${sel},crop=16:16:0:1064,scale=1:1`, 1, 1);
  const br = grab(`${sel},crop=16:16:1904:1064,scale=1:1`, 1, 1);
  const ctr = grab(`${sel},crop=400:300:760:400,scale=1:1`, 1, 1);

  // histograma de luma para ver si hay fondo uniforme
  const lumas = [];
  for (let i = 0; i < full.w * full.h; i++) {
    lumas.push(full.buf[i * 3] * 0.299 + full.buf[i * 3 + 1] * 0.587 + full.buf[i * 3 + 2] * 0.114);
  }
  lumas.sort((a, b) => a - b);
  const p = (q) => Math.round(lumas[Math.floor(lumas.length * q)]);

  console.log(
    `frame ${String(n).padStart(3)} | full ${JSON.stringify(avg(full))}` +
    ` | TL ${JSON.stringify(avg(tl))} TR ${JSON.stringify(avg(tr))}` +
    ` | BL ${JSON.stringify(avg(bl))} BR ${JSON.stringify(avg(br))}` +
    ` | centro ${JSON.stringify(avg(ctr))}` +
    ` | luma p5 ${p(0.05)} p50 ${p(0.5)} p95 ${p(0.95)}`
  );
}

// deteccion de pixeles casi-negros (fondo eliminado sobre negro)
const dark = grab(`select='eq(n\\,60)',scale=160:90`, 160, 90);
let nearBlack = 0, nearWhite = 0;
for (let i = 0; i < dark.w * dark.h; i++) {
  const r = dark.buf[i * 3], g = dark.buf[i * 3 + 1], b = dark.buf[i * 3 + 2];
  if (r < 12 && g < 12 && b < 12) nearBlack++;
  if (r > 243 && g > 243 && b > 243) nearWhite++;
}
const total = dark.w * dark.h;
console.log(`\npixeles casi negros: ${((nearBlack / total) * 100).toFixed(1)}%`);
console.log(`pixeles casi blancos: ${((nearWhite / total) * 100).toFixed(1)}%`);
