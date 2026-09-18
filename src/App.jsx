import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import Earth3D from './components/Earth3D.jsx';
import Branches3D from './components/Branches3D.jsx';
import ContinuousVine3D from './components/ContinuousVine3D.jsx';
import OceanAbyss3D from './components/OceanAbyss3D.jsx';
import SceneController from './components/SceneController.jsx';
import EditorialOverlay from './components/EditorialOverlay.jsx';
import { SoundEngine } from './audio.js';

export default function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [zoomProgress, setZoomProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isAudioActive, setIsAudioActive] = useState(false);
  const soundEngineRef = useRef(null);
  const loadStarted = useRef(false);

  useEffect(() => {
    soundEngineRef.current = new SoundEngine();
  }, []);

  // Loader sequence 0 → 100%
  useEffect(() => {
    if (loadStarted.current) return;
    loadStarted.current = true;
    const start = performance.now();
    const duration = 3600;

    const frame = (t) => {
      const elapsed = t - start;
      const raw = Math.min(1, elapsed / duration);
      const eased = Math.pow(raw, 0.8);
      setLoadingProgress(eased * 100);
      if (raw < 1) {
        requestAnimationFrame(frame);
      } else {
        setLoadingProgress(100);
        startCinematicZoom();
      }
    };
    requestAnimationFrame(frame);
  }, []);

  const startCinematicZoom = () => {
    // First fade out loader text, then zoom
    setTimeout(() => {
      setLoaderVisible(false);
      // Start zoom after loader fades
      setTimeout(() => {
        const zStart = performance.now();
        const zDur = 2400;
        const zFrame = (t) => {
          const p = Math.min(1, (t - zStart) / zDur);
          const eased = 1 - Math.pow(1 - p, 3);
          setZoomProgress(eased);
          if (p < 1) {
            requestAnimationFrame(zFrame);
          } else {
            setIsLoaded(true);
          }
        };
        requestAnimationFrame(zFrame);
      }, 400);
    }, 300);
  };

  const handleEnterSkip = () => {
    setLoadingProgress(100);
    setLoaderVisible(false);
    setTimeout(() => {
      const zStart = performance.now();
      const zDur = 2000;
      const zFrame = (t) => {
        const p = Math.min(1, (t - zStart) / zDur);
        setZoomProgress(1 - Math.pow(1 - p, 3));
        if (p < 1) requestAnimationFrame(zFrame);
        else setIsLoaded(true);
      };
      requestAnimationFrame(zFrame);
    }, 200);
    if (soundEngineRef.current) {
      soundEngineRef.current.init();
      setIsAudioActive(true);
    }
  };

  const handleToggleAudio = () => {
    if (soundEngineRef.current) {
      const active = soundEngineRef.current.toggle();
      setIsAudioActive(active);
    }
  };

  useEffect(() => {
    let frame;
    const onMove = (e) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setMouse({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: (e.clientY / window.innerHeight) * 2 - 1,
        });
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    let frame;
    const onScroll = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const maxS = document.documentElement.scrollHeight - window.innerHeight;
        const p = Math.max(0, Math.min(1, window.scrollY / (maxS || 1)));
        setScrollProgress(p);
        if (soundEngineRef.current && isAudioActive) {
          soundEngineRef.current.setAudioAtmosphereByScroll(p);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isAudioActive]);

  const isLightMode = scrollProgress < 0.35;

  return (
    <div className="relative w-full min-h-screen" style={{ background: !isLoaded || isLightMode ? '#ffffff' : '#000000' }}>

      {/* ─── ALWAYS-ON 3D CANVAS ─── */}
      <div className="fixed inset-0 z-0">
        <Canvas
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 12], fov: 45, near: 0.1, far: 200 }}
          style={{ background: !isLoaded || isLightMode ? '#ffffff' : '#000000' }}
        >
          <SceneController
            scrollProgress={scrollProgress}
            mouse={mouse}
            isLoaded={isLoaded}
            zoomProgress={zoomProgress}
          />
          {/* Earth is ALWAYS visible — zooms and repositions */}
          <Earth3D
            zoomProgress={zoomProgress}
            scrollProgress={scrollProgress}
            isLoaded={isLoaded}
          />
          {/* Branches replaced by Rama 1.svg/Rama 2.svg interactive overlay */}
          {/* <ContinuousVine3D scrollProgress={scrollProgress} /> */}
          <OceanAbyss3D />
        </Canvas>
      </div>

      {/* Cinematic vignette (active during dark mode / scroll) */}
      {isLoaded && !isLightMode && (
        <div className="cinematic-vignette" aria-hidden="true" />
      )}

      {/* ─── LOADER OVERLAY (Fondo blanco, solo el mundo y abajo el contador) ─── */}
      <AnimatePresence>
        {loaderVisible && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-end pb-12 sm:pb-16 pointer-events-auto select-none"
            style={{
              background: 'transparent',
            }}
          >
            {/* Center-bottom counter */}
            <div className="flex flex-col items-center text-center">
              <div
                className="font-serif font-light text-slate-900 tracking-tight"
                style={{
                  fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                  lineHeight: 1,
                }}
              >
                {Math.floor(loadingProgress)}%
              </div>
              <div className="w-36 sm:w-52 h-[2px] bg-slate-200 rounded-full mt-4 overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full"
                  style={{ width: `${loadingProgress}%`, transition: 'width 80ms linear' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── EDITORIAL CONTENT (scroll chapters) ─── */}
      <EditorialOverlay
        isLoaded={isLoaded}
        isAudioActive={isAudioActive}
        onToggleAudio={handleToggleAudio}
        scrollProgress={scrollProgress}
      />
    </div>
  );
}
