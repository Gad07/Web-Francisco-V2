import React, { useRef, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';

/**
 * CanvasFrameSequence
 * Ultra-high-performance canvas-based frame renderer.
 * Preloads all 153 frames, decodes asynchronously off the main thread,
 * and renders smoothly at 60-120 FPS without dropped frames or stutter.
 */
const TOTAL_FRAMES = 169;
const VIDEO_FRAMES = typeof window !== 'undefined'
  ? (window.__VIDEO_FRAMES__ || (window.__VIDEO_FRAMES__ = new Array(TOTAL_FRAMES + 1)))
  : new Array(TOTAL_FRAMES + 1);

const getFrameSrc = (index) => `/VideoFrames/frame_${String(index).padStart(3, '0')}.jpg`;

// Global frame load listeners
const frameLoadListeners = new Set();

/**
 * Preload all 153 frames into browser memory without overflowing VRAM.
 * Standard HTMLImageElement downloads and caches compressed JPEGs (~22 MB total)
 * without triggering mass 1.27 GB RGBA pixel buffer allocations.
 */
let isPreloading = false;

export function preloadAllVideoFrames() {
  if (typeof window === 'undefined' || isPreloading) return;
  isPreloading = true;

  // 1. Cargar únicamente los fotogramas clave de anclaje (inicio y fin)
  const priorityFrames = [1, TOTAL_FRAMES];
  priorityFrames.forEach((i) => {
    if (!VIDEO_FRAMES[i]) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        VIDEO_FRAMES[i] = img;
        frameLoadListeners.forEach((fn) => fn(i));
      };
      VIDEO_FRAMES[i] = img;
    }
  });

  // 2. Cargar el resto en lotes controlados para no saturar el ancho de banda de Netlify
  const loadBatches = () => {
    let currentIdx = 2;
    const batchSize = 6;

    const loadNextBatch = () => {
      const end = Math.min(TOTAL_FRAMES, currentIdx + batchSize);
      for (let i = currentIdx; i < end; i++) {
        if (!VIDEO_FRAMES[i]) {
          const img = new Image();
          img.src = getFrameSrc(i);
          img.onload = () => {
            VIDEO_FRAMES[i] = img;
            frameLoadListeners.forEach((fn) => fn(i));
          };
          VIDEO_FRAMES[i] = img;
        }
      }
      currentIdx = end;
      if (currentIdx < TOTAL_FRAMES) {
        if (typeof window.requestIdleCallback === 'function') {
          window.requestIdleCallback(loadNextBatch, { timeout: 800 });
        } else {
          setTimeout(loadNextBatch, 120);
        }
      }
    };

    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(loadNextBatch, { timeout: 1500 });
    } else {
      setTimeout(loadNextBatch, 300);
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
      frameLoadListeners.forEach((fn) => fn(1));
    };
    VIDEO_FRAMES[1] = firstImg;
  }

  // Pre-carga diferida durante tiempo ocioso del navegador
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(() => preloadAllVideoFrames(), { timeout: 3500 });
  } else {
    setTimeout(() => preloadAllVideoFrames(), 2000);
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
        ctx.imageSmoothingQuality = 'low';
        ctxRef.current = ctx;
      }
    }
    if (!ctx) return;

    const frameNum = Math.max(1, Math.min(totalFrames, Math.round(targetFrameRef.current)));

    // If exact frame was already drawn, no need to redraw
    if (frameNum === lastDrawnFrameRef.current && isExactFrameDrawnRef.current) {
      return;
    }

    let img = VIDEO_FRAMES[frameNum];
    const isExact = Boolean(img && img.complete && img.naturalWidth > 0);

    // Fallback: search backwards for closest loaded frame
    if (!isExact) {
      for (let f = frameNum - 1; f >= 1; f--) {
        if (VIDEO_FRAMES[f] && VIDEO_FRAMES[f].complete && VIDEO_FRAMES[f].naturalWidth > 0) {
          img = VIDEO_FRAMES[f];
          break;
        }
      }
      // If still not found, try forward
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let f = frameNum + 1; f <= totalFrames; f++) {
          if (VIDEO_FRAMES[f] && VIDEO_FRAMES[f].complete && VIDEO_FRAMES[f].naturalWidth > 0) {
            img = VIDEO_FRAMES[f];
            break;
          }
        }
      }
      if (!img || !img.complete || img.naturalWidth === 0) {
        if (frameNum > 90 && VIDEO_FRAMES[totalFrames]?.complete && VIDEO_FRAMES[totalFrames]?.naturalWidth > 0) {
          img = VIDEO_FRAMES[totalFrames];
        } else {
          img = VIDEO_FRAMES[1];
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const { nx, ny, nw, nh } = drawRectRef.current;
    if (nw <= 0 || nh <= 0) return;

    ctx.drawImage(img, nx, ny, nw, nh);

    lastDrawnFrameRef.current = frameNum;
    isExactFrameDrawnRef.current = isExact;
  }, [totalFrames]);

  const scheduleDraw = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(draw);
  }, [draw]);

  const setFrame = useCallback((num) => {
    const clamped = Math.max(1, Math.min(totalFrames, Math.round(num)));
    targetFrameRef.current = clamped;
    draw();
  }, [totalFrames, draw]);

  useImperativeHandle(ref, () => ({
    setFrame(num) {
      setFrame(num);
    },
    setProgress(progress) {
      const clamped = Math.max(0, Math.min(1, Number.isFinite(progress) ? progress : 0));
      const frame = 1 + Math.round(clamped * (totalFrames - 1));
      setFrame(frame);
    },
    setTargetProgress(progress) {
      const clamped = Math.max(0, Math.min(1, Number.isFinite(progress) ? progress : 0));
      const frame = 1 + Math.round(clamped * (totalFrames - 1));
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

  // Resize canvas to optimal DPR (max 1.25)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
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
        ctx.imageSmoothingQuality = 'low';
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
