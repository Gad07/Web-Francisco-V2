import React, { useRef, useEffect, useState } from 'react';
import { Mp4Scrubber, PlayheadSmoother } from '../lib/mp4Scrubber.js';

const canUseWebCodecs = Mp4Scrubber.isSupported();

/**
 * VideoScrub — scrub de video pixel-accurate sobre WebCodecs.
 *
 * Pipeline reconstruido de cero, simple y determinista:
 *   scroll target (0..1) → spring críticamente amortiguado → playhead
 *   → frame ENTERO (Math.round) → draw EXACTO.
 *
 * Regla de oro: NUNCA se mezclan dos frames distintos (sin globalAlpha, sin
 * interpolación). Eso elimina el ghosting/doble exposición que parpadeaba
 * al frenar el scroll. Mientras el frame exacto no está decodificado, se
 * conserva el último frame dibujado (sin saltos a frames lejanos).
 */
function VideoScrub({
  src,
  progressRef,
  active = true,
  smoothingHz = 12,
  poster = null,
  onLoadStateChange,
  className = '',
  style = {},
  debug = false,
}) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const scrubberRef = useRef(null);
  const smootherRef = useRef(null);
  const rafRef = useRef(null);
  const activeRef = useRef(active);

  const lastSeekIndexRef = useRef(-1);
  const lastDrawnIndexRef = useRef(-1);

  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const [dbgState, setDbgState] = useState({
    src: '',
    state: 'init',
    frames: 0,
    cached: 0,
    drawn: -1,
    frame: 0,
    playhead: 0,
    error: '',
    canvasW: 0,
    canvasH: 0,
    loadResolved: null,
  });

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const log = (...args) => {
    if (debug) console.log('[VideoScrub]', ...args);
  };

  const normalizeSrc = (raw) => {
    let s = String(raw || '').trim();
    if (!s) return s;
    if (/^https?:\/\//.test(s)) return s;
    s = s.replace(/^\.?\/?public\//, '/');
    if (!s.startsWith('/')) s = '/' + s;
    return s;
  };

  // ─────────────────────────────────────────────────────────────────
  // 1) CARGA DEL MOTOR
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!canUseWebCodecs) {
      log('WebCodecs no soportado');
      setDbgState((s) => ({ ...s, state: 'no-webcodecs', src: String(src) }));
      return;
    }

    let cancelled = false;

    const start = () => {
      if (cancelled || scrubberRef.current) return;
      const finalSrc = normalizeSrc(src);
      log('start() → fetch', finalSrc);
      setDbgState((s) => ({ ...s, src: finalSrc, state: 'loading' }));

      const scrubber = new Mp4Scrubber(finalSrc, { debug });
      scrubberRef.current = scrubber;

      scrubber.load()
        .then((ok) => {
          if (cancelled) return;
          log('load() resolvió:', {
            ok,
            state: scrubber.state,
            frames: scrubber.frameCount,
            keyframes: scrubber.syncIndices.length,
          });
          setDbgState((s) => ({
            ...s,
            state: scrubber.state,
            frames: scrubber.frameCount,
            loadResolved: ok,
            error: scrubber.error?.message || '',
          }));
          setLoaded(ok);
          onLoadStateChange?.(ok ? 'ready' : 'error');
        })
        .catch((e) => {
          log('load() rejected:', e);
          setDbgState((s) => ({ ...s, state: 'error', error: String(e?.message || e) }));
          if (cancelled) return;
          setFailed(true);
          onLoadStateChange?.('error');
        });
    };

    start();

    return () => {
      cancelled = true;
      if (scrubberRef.current) {
        try { scrubberRef.current.dispose(); } catch (_) {}
        scrubberRef.current = null;
      }
      onLoadStateChange?.('idle');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // ─────────────────────────────────────────────────────────────────
  // 2) LOOP DE RENDER (núcleo)
  //    - Lee progressRef (0..1) que ya viene suavizado por scroll
  //    - Redondea SIEMPRE a frame entero → nunca hay doble exposición
  //    - Solo dibuja cuando el frame exacto está en caché; si no, conserva
  //      el frame anterior (sin flicker, sin saltos a frames lejanos)
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!canUseWebCodecs) return;

    const canvas = canvasRef.current;
    if (!canvas) {
      log('loop: canvasRef.current es null');
      return;
    }
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) {
      log('loop: no hay contexto 2d');
      return;
    }

    if (!smootherRef.current) smootherRef.current = new PlayheadSmoother(smoothingHz);
    else smootherRef.current.omega = 2 * Math.PI * smoothingHz;

    let last = performance.now();
    let dbgCounter = 0;

    const tick = (now) => {
      rafRef.current = requestAnimationFrame(tick);

      const dt = (now - last) / 1000;
      last = now;

      const scrubber = scrubberRef.current;
      if (!scrubber || scrubber.state !== 'ready' || scrubber.frameCount === 0) return;
      if (!(canvas.width > 0 && canvas.height > 0)) return;

      if (++dbgCounter % 15 === 0) {
        setDbgState((s) => ({
          ...s,
          state: scrubber.state,
          frames: scrubber.frameCount,
          cached: scrubber.cache ? scrubber.cache.size : 0,
          canvasW: canvas.width,
          canvasH: canvas.height,
          error: scrubber.error?.message || s.error || '',
        }));
      }

      // Saneo del target contra NaN / undefined
      let rawTarget = progressRef?.current ?? 0;
      if (typeof rawTarget !== 'number' || !isFinite(rawTarget)) rawTarget = 0;
      const target = Math.max(0, Math.min(1, rawTarget));

      // Spring críticamente amortiguado: suaviza el scroll sin rebote
      const playhead = Math.max(0, Math.min(1, smootherRef.current.step(target, dt)));

      // Frame entero SIEMPRE (nunca fracción → nunca mezclar dos frames)
      const frameCount = scrubber.frameCount;
      const targetIdx = Math.min(frameCount - 1, Math.round(playhead * (frameCount - 1)));

      if (window.__videoScrubDebug) {
        const dbg = window.__videoScrubDebug;
        dbg.state = scrubber.state;
        dbg.frames = frameCount;
        dbg.cached = scrubber.cache ? scrubber.cache.size : 0;
        dbg.playhead = playhead;
        dbg.frame = targetIdx;
        dbg.drawn = lastDrawnIndexRef.current;
        dbg.active = activeRef.current;
        dbg.canvasW = canvas.width;
        dbg.canvasH = canvas.height;
      }

      // Evitar re-seeks redundantes
      if (targetIdx !== lastSeekIndexRef.current) {
        lastSeekIndexRef.current = targetIdx;
        scrubber.seek(targetIdx);
      }

      // Ya dibujado este frame → en reposo esto devuelve sin coste
      if (targetIdx === lastDrawnIndexRef.current) return;

      // El frame exacto aún no llegó → mantener el frame anterior (nada parpadea)
      if (!scrubber.hasFrame(targetIdx)) return;

      const drawn = scrubber.draw(ctx, targetIdx, canvas.width, canvas.height);
      if (drawn >= 0) {
        lastDrawnIndexRef.current = drawn;
        if (++dbgCounter % 15 === 0) {
          setDbgState((s) => ({
            ...s,
            playhead,
            frame: targetIdx,
            drawn,
          }));
        }
      } else if (scrubber.state === 'error') {
        setFailed(true);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [smoothingHz]);

  // ─────────────────────────────────────────────────────────────────
  // 3) RESET AL RE-ENTRAR EN LA FASE DE SCRUB
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!active) return;
    let t = progressRef?.current ?? 0;
    if (typeof t !== 'number' || !isFinite(t)) t = 0;
    smootherRef.current?.reset(Math.max(0, Math.min(1, t)));
    lastSeekIndexRef.current = -1;
    lastDrawnIndexRef.current = -1;
  }, [active, progressRef]);

  // ─────────────────────────────────────────────────────────────────
  // 4) RESIZE
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const newW = Math.round(window.innerWidth * dpr);
      const newH = Math.round(window.innerHeight * dpr);
      if (canvas.width !== newW || canvas.height !== newH) {
        canvas.width = newW;
        canvas.height = newH;
        if (scrubberRef.current) {
          scrubberRef.current._drawParams = null;
          scrubberRef.current.setOutputSize(newW, newH);
        }
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    return () => window.removeEventListener('resize', resize);
  }, []);

  // ─────────────────────────────────────────────────────────────────
  // 5) FALLBACK SIN WEBCODECS
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (canUseWebCodecs) return;
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;

    const apply = () => {
      if (!video.duration || !Number.isFinite(video.duration)) return;
      let raw = progressRef?.current ?? 0;
      if (typeof raw !== 'number' || !isFinite(raw)) raw = 0;
      const target = Math.max(0, Math.min(1, raw)) * video.duration;
      if (Math.abs(video.currentTime - target) > 0.02) video.currentTime = target;
    };

    const onMeta = () => {
      if (cancelled) return;
      setLoaded(true);
      apply();
    };

    video.addEventListener('loadedmetadata', onMeta);
    const interval = setInterval(apply, 1000 / 30);
    apply();

    return () => {
      cancelled = true;
      clearInterval(interval);
      video.removeEventListener('loadedmetadata', onMeta);
    };
  }, [progressRef]);

  const finalSrc = normalizeSrc(src);

  return (
    <>
      <div
        ref={hostRef}
        className={className}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          pointerEvents: 'none',
          ...style,
        }}
      >
        {poster && (
          <img
            src={poster}
            alt=""
            aria-hidden
            decoding="async"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: loaded ? 0 : 1,
              transition: 'opacity 400ms ease-out',
              zIndex: 1,
            }}
          />
        )}

        {canUseWebCodecs && (
          <canvas
            ref={canvasRef}
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              display: 'block',
              opacity: failed ? 0 : 1,
              zIndex: 2,
              contain: 'strict',
            }}
          />
        )}

        {!canUseWebCodecs && (
          <video
            ref={videoRef}
            src={finalSrc}
            muted
            playsInline
            preload="auto"
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 2,
            }}
          />
        )}
      </div>

      {debug && (
        <div
          style={{
            position: 'fixed',
            top: 12,
            right: 12,
            zIndex: 99999,
            background: 'rgba(0,0,0,0.85)',
            color: '#0f0',
            fontFamily: 'monospace',
            fontSize: 11,
            lineHeight: 1.5,
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #0f0',
            pointerEvents: 'none',
            maxWidth: 320,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          }}
        >
          {`[VideoScrub DEBUG]
state:  ${dbgState.state}
load:   ${dbgState.loadResolved === null ? 'pending' : dbgState.loadResolved ? 'OK' : 'FAIL'}
frames: ${dbgState.frames}
cached: ${dbgState.cached}
drawn:  ${dbgState.drawn}
frame:  ${dbgState.frame}
playh:  ${dbgState.playhead.toFixed(3)}
canvas: ${dbgState.canvasW}x${dbgState.canvasH}
src:    ${dbgState.src}
error:  ${dbgState.error || '—'}`}
        </div>
      )}
    </>
  );
}

export default VideoScrub;