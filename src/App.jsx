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

export default function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [zoomProgress, setZoomProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const loadStarted = useRef(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // ─── ROBUST REAL ASSET PRELOADER (Resilient to StrictMode, Smooth 0 → 100%) ───
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    let displayProgress = 0;
    let animFrame;

    const criticalAssets = [
      '/imagenes/Rama 1.svg',
      '/imagenes/Rama 2.svg',
      '/imagenes/Piedra.png',
      // Texturas de la Tierra 3D (NASA)
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
      // Primeros 15 fotogramas clave
      ...Array.from({ length: 15 }, (_, i) => `/VideoFrames/frame_${String(i + 1).padStart(3, '0')}.jpg`),
    ];

    const totalAssets = criticalAssets.length;
    let realProgress = 0;

    const onAssetDone = () => {
      if (isCancelled) return;
      loadedCount++;
      realProgress = Math.min(100, (loadedCount / totalAssets) * 100);
    };

    // Precarga real de activos en paralelo
    criticalAssets.forEach((src) => {
      const img = new Image();
      img.onload = onAssetDone;
      img.onerror = onAssetDone;
      img.src = src;
    });

    const startTime = performance.now();
    const maxDuration = 1800; // Máximo 1.8 segundos

    const update = (now) => {
      if (isCancelled) return;

      const elapsed = now - startTime;
      const timeRatio = Math.min(1, elapsed / maxDuration);
      
      // El objetivo es el máximo entre los recursos reales descargados y la curva base de tiempo
      const baseline = Math.pow(timeRatio, 0.7) * 100;
      const target = Math.max(baseline, realProgress);

      const step = Math.max(1.4, (target - displayProgress) * 0.18);
      displayProgress = Math.min(target, displayProgress + step);

      if (displayProgress >= 99.5 || elapsed >= maxDuration) {
        setLoadingProgress(100);
        triggerFastZoom();
        return;
      }

      setLoadingProgress(Math.floor(displayProgress));
      animFrame = requestAnimationFrame(update);
    };

    animFrame = requestAnimationFrame(update);

    return () => {
      isCancelled = true;
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, []);

  const triggerFastZoom = () => {
    setLoaderVisible(false);
    const zStart = performance.now();
    const zDur = 800;
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
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isLightMode = scrollProgress < 0.35;

  return (
    <div className="relative w-full min-h-screen bg-[#f5efe3] text-[#2d2618]">
      {/* ─── FIXED CAPSULE HEADER / NAVBAR ─── */}
      <HeaderNav
        isLoaded={isLoaded || !isHomePage}
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

      {/* ─── LOADER OVERLAY (Home Page) ─── */}
      <AnimatePresence>
        {isHomePage && loaderVisible && (
          <motion.div
            key="loader"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(6px)', transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-end pb-12 sm:pb-20 pointer-events-auto select-none"
            style={{ background: 'transparent' }}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif font-light text-[#2d2618] tracking-tight"
                style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', lineHeight: 1 }}
              >
                {Math.floor(loadingProgress)}%
              </motion.div>

              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-48 sm:w-60 h-[2px] bg-[#d8ceb6]/60 rounded-full mt-5 overflow-hidden relative shadow-sm"
              >
                <div
                  className="absolute top-0 left-0 h-full bg-[#4a5a22] rounded-full"
                  style={{ width: `${loadingProgress}%`, transition: 'width 60ms linear' }}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-5 text-[11px] sm:text-xs tracking-[0.25em] text-[#7a6e58] uppercase font-sans font-medium"
              >
                {loadingProgress < 100 ? 'Cargando recursos visuales' : 'Ecosistema listo'}
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
