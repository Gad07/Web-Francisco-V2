import React, { useRef, useEffect } from 'react';

/**
 * CanvasFrameSequence
 * Ultra-high-performance canvas-based frame renderer.
 * Eliminates DOM layout recalculations, avoids DOM memory leaks, and delivers
 * buttery-smooth 60 FPS playback during scroll.
 */
export default function CanvasFrameSequence({
  currentFrame = 1,
  totalFrames = 153,
  showFrames = false,
  showLoopVideo = false,
}) {
  const canvasRef = useRef(null);
  const imagesRef = useRef(new Map());
  const rafRef = useRef(null);
  const isMountedRef = useRef(true);

  const getFrameSrc = (index) => `/VideoFrames/frame_${String(index).padStart(3, '0')}.jpg`;

  // Progressive preloader: priority 1 (frames 1-35), priority 2 (frames 36-153)
  useEffect(() => {
    isMountedRef.current = true;
    const cache = imagesRef.current;

    // Load initial critical batch
    const initialBatch = Math.min(35, totalFrames);
    for (let i = 1; i <= initialBatch; i++) {
      if (!cache.has(i)) {
        const img = new Image();
        img.src = getFrameSrc(i);
        img.onload = () => {
          if (isMountedRef.current) cache.set(i, img);
        };
      }
    }

    // Progressively load remaining frames during idle time
    let nextIndex = initialBatch + 1;
    let idleTimer = null;

    const loadNextBatch = () => {
      if (!isMountedRef.current || nextIndex > totalFrames) return;
      const end = Math.min(nextIndex + 10, totalFrames);
      for (let i = nextIndex; i <= end; i++) {
        if (!cache.has(i)) {
          const img = new Image();
          img.src = getFrameSrc(i);
          img.onload = () => {
            if (isMountedRef.current) cache.set(i, img);
          };
        }
      }
      nextIndex = end + 1;
      if (nextIndex <= totalFrames) {
        if ('requestIdleCallback' in window) {
          idleTimer = window.requestIdleCallback(loadNextBatch, { timeout: 120 });
        } else {
          idleTimer = setTimeout(loadNextBatch, 60);
        }
      }
    };

    const timer = setTimeout(loadNextBatch, 300);

    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
      if (idleTimer) {
        if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleTimer);
        else clearTimeout(idleTimer);
      }
    };
  }, [totalFrames]);

  // Draw current frame to canvas using requestAnimationFrame
  useEffect(() => {
    if (!showFrames) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const render = () => {
      const img = imagesRef.current.get(currentFrame);
      if (img && img.complete && img.naturalWidth > 0) {
        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        // Cover aspect ratio
        const scale = Math.max(cw / iw, ch / ih);
        const nw = iw * scale;
        const nh = ih * scale;
        const nx = (cw - nw) / 2;
        const ny = (ch - nh) / 2;

        ctx.drawImage(img, nx, ny, nw, nh);
      } else {
        // Fallback: trigger image load if not yet in cache
        if (!imagesRef.current.has(currentFrame)) {
          const fallbackImg = new Image();
          fallbackImg.src = getFrameSrc(currentFrame);
          fallbackImg.onload = () => {
            if (isMountedRef.current) {
              imagesRef.current.set(currentFrame, fallbackImg);
              render();
            }
          };
        }
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [currentFrame, showFrames]);

  // Handle high-DPI canvas resizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      // Redraw immediately after resize
      const img = imagesRef.current.get(currentFrame);
      if (img && img.complete) {
        const ctx = canvas.getContext('2d', { alpha: false });
        if (ctx) {
          const cw = canvas.width;
          const ch = canvas.height;
          const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
          const nw = img.naturalWidth * scale;
          const nh = img.naturalHeight * scale;
          ctx.drawImage(img, (cw - nw) / 2, (ch - nh) / 2, nw, nh);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentFrame]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* 4K Canvas Sequence */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: showFrames ? 1 : 0,
          transition: 'opacity 0.25s ease-out',
          willChange: 'transform',
        }}
      />

      {/* Video Loop al llegar al fotograma 153 */}
      {showLoopVideo && (
        <video
          src="/video/video loop.mp4"
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
            transition: 'opacity 0.5s ease',
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
}
