import React, { useRef, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';

/**
 * CanvasFrameSequence
 * Ultra-high-performance canvas-based frame renderer.
 * Preloads all 153 frames, decodes asynchronously off the main thread,
 * and renders smoothly at 60-120 FPS without dropped frames or stutter.
 */
const TOTAL_FRAMES = 240;
const VIDEO_FRAMES = typeof window !== 'undefined'
  ? (window.__VIDEO_FRAMES__ || (window.__VIDEO_FRAMES__ = new Array(TOTAL_FRAMES + 1)))
  : new Array(TOTAL_FRAMES + 1);

const getFrameSrc = (index) => `/VideoFrames/frame_${String(index).padStart(3, '0')}.jpg`;

// Global frame load listeners
const frameLoadListeners = new Set();

/**
 * Preload all frames into browser memory without overflowing VRAM.
 * Decodes frames asynchronously off the main thread to eliminate any scroll jank.
 */
let isPreloading = false;

export function preloadAllVideoFrames() {
  if (typeof window === 'undefined' || isPreloading) return;
  isPreloading = true;

  // 1. Cargar fotogramas ancla prioritarios (inicio, transiciones clave y fin)
  const priorityFrames = [1, 75, 120, 180, TOTAL_FRAMES];
  priorityFrames.forEach((i) => {
    if (!VIDEO_FRAMES[i]) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        VIDEO_FRAMES[i] = img;
        if (img.decode) img.decode().catch(() => {});
        frameLoadListeners.forEach((fn) => fn(i));
      };
      VIDEO_FRAMES[i] = img;
    }
  });

  // 2. Cargar en lotes optimizados con decodificación asíncrona fuera del hilo principal
  const loadBatches = () => {
    let currentIdx = 2;
    const batchSize = 16;

    const loadNextBatch = () => {
      const end = Math.min(TOTAL_FRAMES, currentIdx + batchSize);
      for (let i = currentIdx; i < end; i++) {
        if (!VIDEO_FRAMES[i]) {
          const img = new Image();
          img.src = getFrameSrc(i);
          img.onload = () => {
            VIDEO_FRAMES[i] = img;
            if (img.decode) img.decode().catch(() => {});
            frameLoadListeners.forEach((fn) => fn(i));
          };
          VIDEO_FRAMES[i] = img;
        }
      }
      currentIdx = end;
      if (currentIdx < TOTAL_FRAMES) {
        if (typeof window.requestIdleCallback === 'function') {
          window.requestIdleCallback(loadNextBatch, { timeout: 400 });
        } else {
          setTimeout(loadNextBatch, 60);
        }
      }
    };

    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(loadNextBatch, { timeout: 600 });
    } else {
      setTimeout(loadNextBatch, 100);
    }
  };

  if (document.readyState === 'complete') {
    loadBatches();
  } else {
    window.addEventListener('load', loadBatches, { once: true });
  }
}

// Carga inmediata del fotograma 1 para render inicial instantáneo sin bloquear la red
if (typeof window !== 'undefined') {
  if (!VIDEO_FRAMES[1]) {
    const firstImg = new Image();
    firstImg.src = getFrameSrc(1);
    firstImg.onload = () => {
      VIDEO_FRAMES[1] = firstImg;
      if (firstImg.decode) firstImg.decode().catch(() => {});
      frameLoadListeners.forEach((fn) => fn(1));
    };
    VIDEO_FRAMES[1] = firstImg;
  }

  // Pre-carga inmediata durante tiempo ocioso del navegador
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(() => preloadAllVideoFrames(), { timeout: 2000 });
  } else {
    setTimeout(() => preloadAllVideoFrames(), 800);
  }
}

const CanvasFrameSequence = forwardRef(function CanvasFrameSequence(
  {
    currentFrame = 1,
    totalFrames = TOTAL_FRAMES,
    showFrames = true,
    showLoopVideo = false,
  },
  ref
) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const targetFrameRef = useRef(1);
  const lastDrawnFrameRef = useRef(-1);
  const isExactFrameDrawnRef = useRef(false);
  const drawRectRef = useRef({ nx: 0, ny: 0, nw: 1920, nh: 1080 });
  const rafRef = useRef(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx = ctxRef.current;
    if (!ctx) {
      ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'medium';
        ctxRef.current = ctx;
      }
    }
    if (!ctx) return;

    const raw = Math.max(1, Math.min(totalFrames, targetFrameRef.current));
    const targetIdx = Math.round(raw);

    // Helper para obtener fotograma disponible con máxima nitidez
    const getLoadedFrame = (num) => {
      let img = VIDEO_FRAMES[num];
      if (img && img.complete && img.naturalWidth > 0) return img;
      for (let f = num - 1; f >= 1; f--) {
        if (VIDEO_FRAMES[f] && VIDEO_FRAMES[f].complete && VIDEO_FRAMES[f].naturalWidth > 0) return VIDEO_FRAMES[f];
      }
      for (let f = num + 1; f <= totalFrames; f++) {
        if (VIDEO_FRAMES[f] && VIDEO_FRAMES[f].complete && VIDEO_FRAMES[f].naturalWidth > 0) return VIDEO_FRAMES[f];
      }
      return VIDEO_FRAMES[1];
    };

    const imgTarget = getLoadedFrame(targetIdx);
    if (!imgTarget || !imgTarget.complete || imgTarget.naturalWidth === 0) return;

    const { nx, ny, nw, nh } = drawRectRef.current;
    if (nw <= 0 || nh <= 0) return;

    // Dibujado directo de alta definición sin ghosting ni difuminados artificiales
    ctx.drawImage(imgTarget, nx, ny, nw, nh);

    lastDrawnFrameRef.current = targetIdx;
    isExactFrameDrawnRef.current = true;
  }, [totalFrames]);

  const scheduleDraw = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(draw);
  }, [draw]);

  const setFrame = useCallback((num) => {
    const clamped = Math.max(1, Math.min(totalFrames, num));
    targetFrameRef.current = clamped;
    draw();
  }, [totalFrames, draw]);

  useImperativeHandle(ref, () => ({
    setFrame(num) {
      setFrame(num);
    },
    setProgress(progress) {
      const clamped = Math.max(0, Math.min(1, Number.isFinite(progress) ? progress : 0));
      const frame = 1 + clamped * (totalFrames - 1);
      setFrame(frame);
    },
    setTargetProgress(progress) {
      const clamped = Math.max(0, Math.min(1, Number.isFinite(progress) ? progress : 0));
      const frame = 1 + clamped * (totalFrames - 1);
      setFrame(frame);
    },
    redraw() {
      lastDrawnFrameRef.current = -1;
      isExactFrameDrawnRef.current = false;
      draw();
    },
  }), [totalFrames, setFrame, draw]);

  // Support prop-based currentFrame (for compatibility with original callers)
  useEffect(() => {
    if (typeof currentFrame === 'number') {
      setFrame(currentFrame);
    }
  }, [currentFrame, setFrame]);

  // Redraw when pending frames finish loading
  useEffect(() => {
    const listener = (loadedIndex) => {
      if (Math.round(targetFrameRef.current) === loadedIndex && !isExactFrameDrawnRef.current) {
        scheduleDraw();
      }
    };
    frameLoadListeners.add(listener);
    return () => {
      frameLoadListeners.delete(listener);
    };
  }, [scheduleDraw]);

  // Resize canvas to optimal DPR (native up to 2.0 for Retina/4K/1080p full crispness)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
      const w = Math.round(window.innerWidth * dpr);
      const h = Math.round(window.innerHeight * dpr);

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      const iw = 1920;
      const ih = 1080;
      const scale = Math.max(w / iw, h / ih);
      const nw = Math.ceil(iw * scale);
      const nh = Math.ceil(ih * scale);
      const nx = Math.round((w - nw) / 2);
      const ny = Math.round((h - nh) / 2);
      drawRectRef.current = { nx, ny, nw, nh };

      const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctxRef.current = ctx;
      }

      lastDrawnFrameRef.current = -1;
      isExactFrameDrawnRef.current = false;
      draw();
    };

    updateSize();
    window.addEventListener('resize', updateSize, { passive: true });

    return () => {
      window.removeEventListener('resize', updateSize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  useEffect(() => {
    if (showFrames) {
      scheduleDraw();
    }
  }, [showFrames, scheduleDraw]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 6,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: showFrames ? 1 : 0,
          transform: 'translateZ(0)',
          willChange: 'transform',
          imageRendering: '-webkit-optimize-contrast',
        }}
      />

      {showLoopVideo && (
        <video
          src="/video/gemini_loop_1080p.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 1,
            transition: 'opacity 0.4s ease',
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
});

export default React.memo(CanvasFrameSequence);
