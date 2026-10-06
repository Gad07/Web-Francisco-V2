import { useEffect, useRef } from 'react';

/**
 * FpsMeter
 *
 * Medidor de FPS de desarrollo. Se monta solo con `?fps=1` en la URL.
 * Reporta el frame rate real del loop de render, la distribucion de deltas y el
 * estado del scrubber, para poder verificar empiricamente las 80 FPS.
 */
export default function FpsMeter({ active }) {
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const el = document.createElement('div');
    el.style.cssText = [
      'position:fixed',
      'left:12px',
      'bottom:12px',
      'z-index:9999',
      'font:11px/1.55 ui-monospace,SFMono-Regular,Menlo,monospace',
      'color:#e8f5c8',
      'background:rgba(12,16,10,.84)',
      'border:1px solid rgba(150,200,90,.35)',
      'border-radius:8px',
      'padding:8px 10px',
      'pointer-events:none',
      'white-space:pre',
      'min-width:210px',
      'backdrop-filter:blur(6px)',
    ].join(';');
    document.body.appendChild(el);

    let frames = 0;
    let lastReport = performance.now();
    let lastFrame = performance.now();
    let minDelta = Infinity;
    let maxDelta = 0;
    const deltas = [];

    const tick = (now) => {
      rafRef.current = requestAnimationFrame(tick);
      frames += 1;

      const delta = now - lastFrame;
      lastFrame = now;
      if (delta > 0.01 && delta < 1000) {
        deltas.push(delta);
        if (deltas.length > 240) deltas.shift();
        if (delta < minDelta) minDelta = delta;
        if (delta > maxDelta) maxDelta = delta;
      }

      const elapsed = now - lastReport;
      if (elapsed < 500) return;

      const fps = (frames * 1000) / elapsed;
      const sorted = [...deltas].sort((a, b) => a - b);
      const p50 = sorted[Math.floor(sorted.length * 0.5)] ?? 0;
      const p95 = sorted[Math.floor(sorted.length * 0.95)] ?? 0;
      const over16 = sorted.filter((d) => d > 16.9).length;
      const d = window.__videoScrubDebug ?? {};

      el.textContent = [
        `FPS        ${fps.toFixed(1)}  ${fps >= 78 ? 'OK' : fps >= 58 ? 'bajo' : 'CRITICO'}`,
        `dt p50     ${p50.toFixed(2)}ms   p95 ${p95.toFixed(2)}ms`,
        `dt rango   ${minDelta.toFixed(1)} - ${maxDelta.toFixed(1)}ms`,
        `>16.9ms    ${over16}/${sorted.length} frames`,
        `budget80   ${(1000 / 80).toFixed(2)}ms/frame`,
        `---`,
        `playhead   ${(d.playhead ?? 0).toFixed(4)}`,
        `frame      ${d.frame ?? '-'}`,
        `decoded    ${d.cached ?? '-'} en cache`,
        `decodeQ    ${d.queue ?? '-'}`,
        `samples    ${d.frames ?? '-'}  keyf ${d.keyframes ?? '-'}`,
        `estado     ${d.state ?? '-'}`,
        `dpr        ${(d.dpr ?? 0).toFixed(2)}`,
      ].join('\n');

      frames = 0;
      lastReport = now;
      minDelta = Infinity;
      maxDelta = 0;
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      el.remove();
    };
  }, [active]);

  return null;
}
