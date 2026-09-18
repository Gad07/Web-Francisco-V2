import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';

import Earth3D from './components/Earth3D.jsx';
import OceanAbyss3D from './components/OceanAbyss3D.jsx';
import SceneController from './components/SceneController.jsx';
import EditorialOverlay from './components/EditorialOverlay.jsx';
import HeaderNav from './components/HeaderNav.jsx';

import About from './pages/About.jsx';
import Governance from './pages/Governance.jsx';
import StrategicLines from './pages/StrategicLines.jsx';
import Projects from './pages/Projects.jsx';
import Agenda2030 from './pages/Agenda2030.jsx';
import GlobalPresence from './pages/GlobalPresence.jsx';
import Knowledge from './pages/Knowledge.jsx';
import AnnualAssembly from './pages/AnnualAssembly.jsx';
import Contact from './pages/Contact.jsx';

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
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    soundEngineRef.current = new SoundEngine();
  }, []);

  // Loader sequence 0 → 100%
  useEffect(() => {
    if (loadStarted.current) return;
    loadStarted.current = true;
    const start = performance.now();
    const duration = 2800;

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
    setTimeout(() => {
      setLoaderVisible(false);
      setTimeout(() => {
        const zStart = performance.now();
        const zDur = 2000;
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
      }, 300);
    }, 200);
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
    <div className="relative w-full min-h-screen bg-[#f5efe3] text-[#2d2618]">
      {/* ─── FIXED CAPSULE HEADER / NAVBAR ─── */}
      <HeaderNav
        isLoaded={isLoaded || !isHomePage}
        isAudioActive={isAudioActive}
        onToggleAudio={handleToggleAudio}
      />

      {/* ─── 3D CANVAS (Visible on Home Page) ─── */}
      {isHomePage && (
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
            <Earth3D
              zoomProgress={zoomProgress}
              scrollProgress={scrollProgress}
              isLoaded={isLoaded}
            />
            <OceanAbyss3D />
          </Canvas>
        </div>
      )}

      {/* Cinematic vignette (on dark scroll mode) */}
      {isHomePage && isLoaded && !isLightMode && (
        <div className="cinematic-vignette" aria-hidden="true" />
      )}

      {/* ─── LOADER OVERLAY (Home Page) ─── */}
      <AnimatePresence>
        {isHomePage && loaderVisible && (
          <motion.div
            key="loader"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-end pb-12 sm:pb-20 pointer-events-auto select-none"
            style={{ background: 'transparent' }}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ y: 30, opacity: 0, filter: 'blur(5px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif font-light text-[#2d2618] tracking-tight"
                style={{ fontSize: 'clamp(4rem, 8vw, 6.5rem)', lineHeight: 1 }}
              >
                {Math.floor(loadingProgress)}%
              </motion.div>

              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-48 sm:w-64 h-[2px] bg-[#d8ceb6] rounded-full mt-6 overflow-hidden relative shadow-sm"
              >
                <div
                  className="absolute top-0 left-0 h-full bg-[#4a5a22] rounded-full"
                  style={{ width: `${loadingProgress}%`, transition: 'width 80ms linear' }}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: loadingProgress > 15 ? 1 : 0, y: loadingProgress > 15 ? 0 : 10 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="mt-6 text-xs sm:text-sm tracking-[0.25em] text-[#7a6e58] uppercase font-sans font-medium"
              >
                {loadingProgress < 100 ? 'Sincronizando Biosfera' : 'Entrando al ecosistema'}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── ROUTER CONTENT ─── */}
      <div className="relative z-10">
        <Routes>
          <Route
            path="/"
            element={
              <EditorialOverlay
                isLoaded={isLoaded}
                isAudioActive={isAudioActive}
                onToggleAudio={handleToggleAudio}
                scrollProgress={scrollProgress}
              />
            }
          />
          <Route path="/nosotros" element={<About />} />
          <Route path="/quienes-somos" element={<About />} />
          <Route path="/gobernanza" element={<Governance />} />
          <Route path="/lineas-estrategicas" element={<StrategicLines />} />
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/agenda-2030" element={<Agenda2030 />} />
          <Route path="/presencia-global" element={<GlobalPresence />} />
          <Route path="/conocimiento" element={<Knowledge />} />
          <Route path="/asamblea-anual" element={<AnnualAssembly />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}
