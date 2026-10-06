/**
 * Verificacion de integracion del scrubber: lanza Chrome real, carga la pagina,
 * entra en la Fase 2 y comprueba decodificacion WebCodecs + frame rate.
 *
 *   node verify_scrub.mjs
 */
import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = process.argv[2] || 'http://localhost:4173/?fps=1';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: [
    '--no-sandbox',
    '--enable-features=SharedArrayBuffer',
    '--use-gl=swiftshader',
    '--window-size=1920,1080',
    '--autoplay-policy=no-user-gesture-required',
  ],
  defaultViewport: { width: 1920, height: 1080, deviceScaleFactor: 1 },
});

const page = await browser.newPage();
const errors = [];
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text());
});
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

console.log('navegando a', URL);
await page.goto(URL, { waitUntil: 'networkidle2', timeout: 90000 });

const support = await page.evaluate(() => ({
  hasVideoDecoder: typeof window.VideoDecoder === 'function',
  hasEncodedVideoChunk: typeof window.EncodedVideoChunk === 'function',
  hasIntersectionObserver: typeof IntersectionObserver !== 'undefined',
  hasOffscreenCanvas: typeof OffscreenCanvas !== 'undefined',
}));
console.log('soporte del navegador:', support);

// ── Espera a que el motor termine de cargar el MP4 ──────────────────────────
const loaded = await page.waitForFunction(
  () => {
    const d = window.__videoScrubDebug;
    return d && d.state === 'ready' ? d : null;
  },
  { timeout: 90000, polling: 200 }
).then((h) => h.jsonValue());
console.log('motor listo:', loaded);

// ── Posicionarse en el medio de la Fase 2 ──────────────────────────────────
const geom = await page.evaluate(() => {
  const el = document.querySelector('#interdependencia');
  const r = el.getBoundingClientRect();
  const top = r.top + window.scrollY;
  const height = r.height;
  // Fase 2 = 25%..66% del recorrido del section
  const targetProgress = 0.45;
  const y = top + height * targetProgress - window.innerHeight * 0.5;
  window.scrollTo(0, y);
  return { top, height, y, docHeight: document.documentElement.scrollHeight };
});
console.log('geometria:', geom);
await new Promise((r) => setTimeout(r, 2500));

const mid = await page.evaluate(() => ({ ...window.__videoScrubDebug }));
console.log('estado en scroll:', mid);

// ── Barrido de scroll suave, midiendo el frame rate ────────────────────────
const sweep = await page.evaluate(async () => {
  const el = document.querySelector('#interdependencia');
  const top = el.getBoundingClientRect().top + window.scrollY;
  const from = top + el.offsetHeight * 0.26;
  const to = top + el.offsetHeight * 0.65;

  const deltas = [];
  let last = performance.now();
  let running = true;
  const tick = (now) => {
    if (!running) return;
    deltas.push(now - last);
    last = now;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  const start = performance.now();
  const durationMs = 4000;
  await new Promise((resolve) => {
    const step = () => {
      const t = (performance.now() - start) / durationMs;
      if (t >= 1) return resolve();
      window.scrollTo(0, from + (to - from) * t);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
  running = false;

  const d = deltas.slice(2);
  d.sort((a, b) => a - b);
  const pct = (p) => d[Math.floor(d.length * p)] ?? 0;
  const mean = d.reduce((a, b) => a + b, 0) / d.length;
  return {
    samples: d.length,
    fpsMean: 1000 / mean,
    p50: pct(0.5),
    p95: pct(0.95),
    p99: pct(0.99),
    worst: d[d.length - 1],
    over20ms: d.filter((x) => x > 20).length,
    debug: { ...window.__videoScrubDebug },
  };
});

console.log('\n=== BARRIDO DE SCROLL ===');
console.log('frames medidos :', sweep.samples);
console.log('FPS medio      :', sweep.fpsMean.toFixed(1));
console.log('dt p50         :', sweep.p50.toFixed(2), 'ms');
console.log('dt p95         :', sweep.p95.toFixed(2), 'ms');
console.log('dt p99         :', sweep.p99.toFixed(2), 'ms');
console.log('dt peor        :', sweep.worst.toFixed(2), 'ms');
console.log('frames >20ms   :', sweep.over20ms, '/', sweep.samples);
console.log('debug final    :', sweep.debug);

// ── Verifica que el canvas realmente tenga pixeles (no esta en negro) ───────
const painted = await page.evaluate(() => {
  const c = document.querySelector('canvas[aria-hidden]');
  if (!c) return { error: 'sin canvas' };
  const probe = document.createElement('canvas');
  probe.width = 160;
  probe.height = 90;
  const pctx = probe.getContext('2d', { willReadFrequently: true });
  pctx.drawImage(c, 0, 0, 160, 90);
  const data = pctx.getImageData(0, 0, 160, 90).data;
  let sum = 0;
  let min = 255;
  let max = 0;
  const uniq = new Set();
  for (let i = 0; i < data.length; i += 4) {
    const lum = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) | 0;
    sum += lum;
    if (lum < min) min = lum;
    if (lum > max) max = lum;
    if (i % 400 === 0) uniq.add(`${data[i]},${data[i + 1]},${data[i + 2]}`);
  }
  return {
    canvasSize: `${c.width}x${c.height}`,
    meanLuma: (sum / (data.length / 4)).toFixed(1),
    minLuma: min,
    maxLuma: max,
    distinctSamples: uniq.size,
  };
});
console.log('\n=== CANVAS PINTADO ===');
console.log(painted);

const out = process.argv[3];
if (out) {
  await page.screenshot({ path: out });
  console.log('\ncaptura ->', out);
}

console.log('\n=== ERRORES DE CONSOLA ===');
console.log(errors.length ? errors.slice(0, 12).join('\n') : 'ninguno');

await browser.close();
