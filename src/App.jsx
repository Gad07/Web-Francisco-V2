import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';

import Earth3D from './components/Earth3D.jsx';
import OceanAbyss3D from './components/OceanAbyss3D.jsx';
import SceneController from './components/SceneController.jsx';
import EditorialOverlay from './components/EditorialOverlay.jsx';
import HeaderNav from './components/HeaderNav.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';

import About from './pages/About.jsx';
import Governance from './pages/Governance.jsx';
import StrategicLines from './pages/StrategicLines.jsx';
import Projects from './pages/Projects.jsx';
import Agenda2030 from './pages/Agenda2030.jsx';
import GlobalPresence from './pages/GlobalPresence.jsx';
import Knowledge from './pages/Knowledge.jsx';
import AnnualAssembly from './pages/AnnualAssembly.jsx';
import Contact from './pages/Contact.jsx';
import SupportCGA from './pages/SupportCGA.jsx';
import InstitutionalAlliances from './pages/InstitutionalAlliances.jsx';
import Training from './pages/Training.jsx';
import Communication from './pages/Communication.jsx';
import Admin from './pages/Admin.jsx';
import PresidentBusinessCard from './pages/PresidentBusinessCard.jsx';
import { ArticlesProvider } from './context/ArticlesContext.jsx';
import { SiteSettingsProvider } from './context/SiteSettingsContext.jsx';
import SiteNotificationSystem from './components/SiteNotificationSystem.jsx';

export default function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [worldReady, setWorldReady] = useState(false);
  const [zoomProgress, setZoomProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  // MotionValue y no state: escribir en un MotionValue no dispara renders, y el
  // progreso lo consumen SceneController dentro de useFrame y EditorialOverlay
  // con useTransform. Con state, cada evento de scroll re-renderizaba el arbol
  // completo de three.js mas las 1200+ lineas del overlay en cada frame.
  const scrollProgress = useMotionValue(0);
  const [isLightMode, setIsLightMode] = useState(true);
  const isLightModeRef = useRef(true);
  const loadStarted = useRef(false);
  const zoomTriggeredRef = useRef(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const safePct = Number.isFinite(loadingProgress) ? Math.max(0, Math.min(100, Math.floor(loadingProgress))) : 0;

  // ─── ROBUST REAL ASSET PRELOADER (Resilient to StrictMode, Smooth 0 → 100%) ───
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    let displayProgress = 0;
    let animFrame;

    const criticalAssets = [
      // Texturas de la Tierra 3D (NASA) — PRIMERO, el mundo es lo primero que carga
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
      '/imagenes/Rama 1.svg',
      '/imagenes/Rama 2.svg',
      '/VideoFrames/frame_001.jpg',
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
    const maxDuration = 3000; // El contador tarda 3 segundos en llegar a 100%

    const update = (now) => {
      if (isCancelled) return;
      if (!Number.isFinite(displayProgress)) displayProgress = 0;

      const elapsed = now - startTime;
      const timeRatio = Math.min(1, elapsed / maxDuration);

      // El objetivo es el máximo entre los recursos reales descargados y la curva base de tiempo
      const baseline = Math.pow(timeRatio, 0.7) * 100;
      const target = Math.max(baseline, Number.isFinite(realProgress) ? realProgress : 0);

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
    if (zoomTriggeredRef.current) return;
    zoomTriggeredRef.current = true;
    // Espera 2s mostrando el mundo y 100%, luego desvanece el loader y dispara el zoom
    window.setTimeout(() => {
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
    }, 2000);
  };

  // El modo claro/oscuro solo depende de un umbral, asi que solo re-renderiza
  // en el instante de cruzar 0.35 y no en cada pixel de scroll.
  useMotionValueEvent(scrollProgress, 'change', (v) => {
    const light = v < 0.35;
    if (light !== isLightModeRef.current) {
      isLightModeRef.current = light;
      setIsLightMode(light);
    }
  });

  useEffect(() => {
    const onScroll = () => {
      const maxS = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.set(Math.max(0, Math.min(1, window.scrollY / (maxS || 1))));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [scrollProgress]);

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <SiteSettingsProvider>
      <ArticlesProvider>
        <div className="relative w-full min-h-screen bg-[#f5efe3] text-[#2d2618]">
          {/* ─── BANNER SUPERIOR & POP-UP NOTIFICATION SYSTEM ─── */}
          <SiteNotificationSystem />

          {/* ─── FIXED CAPSULE HEADER / NAVBAR (Oculto en /admin) ─── */}
          {!isAdminPage && (
            <HeaderNav
              isLoaded={isLoaded || !isHomePage}
            />
          )}

          {/* ─── 3D CANVAS (Activo durante el loader inicial, entra en reposo absoluto al terminar) ─── */}
          {isHomePage && (
            <div
              className={`fixed inset-0 z-0 transition-opacity duration-700 ${
                loaderVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              <Canvas
                frameloop={!isLoaded ? 'always' : 'never'}
                onCreated={() => setWorldReady(true)}
                gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
                camera={{ position: [0, 0, 12], fov: 45, near: 0.1, far: 200 }}
                style={{ background: !isLoaded ? '#f5efe3' : isLightMode ? '#ffffff' : '#000000' }}
              >
                <SceneController
                  scrollProgress={scrollProgress}
                  isLoaded={isLoaded}
                  zoomProgress={zoomProgress}
                />
                <Earth3D
                  zoomProgress={zoomProgress}
                  isLoaded={isLoaded}
                />
                <OceanAbyss3D isLoaded={isLoaded} />
              </Canvas>
            </div>
          )}

          {/* ─── LOADER OVERLAY (Home Page) ─── */}
          <AnimatePresence>
            {isHomePage && loaderVisible && (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: worldReady ? 1 : 0 }}
                exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                transition={{ duration: 0.5 }}
                className={`fixed inset-0 z-50 flex flex-col items-center justify-center select-none overflow-hidden ${
                  worldReady ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
                style={{ background: 'transparent' }}
              >
                <div className="relative flex flex-col items-center text-center">
                  {/* Contador serif — lo único sobre el mundo */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif font-light text-white leading-none tabular-nums drop-shadow-[0_3px_2px_rgba(0,0,0,0.55)] drop-shadow-[0_6px_20px_rgba(0,0,0,0.45)]"
                    style={{ fontSize: 'clamp(2.75rem, 6vw, 4rem)' }}
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={safePct}
                        initial={{ opacity: 0.3, y: 8, scale: 1.06 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.16 }}
                        className="inline-block"
                      >
                        {safePct}
                      </motion.span>
                    </AnimatePresence>
                    <span className="align-baseline text-[0.3em] text-[#4a5a22]/80">%</span>
                  </motion.div>
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
              <Route path="/el-consejo" element={<About />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/quienes-somos" element={<About />} />
              <Route path="/gobernanza" element={<Governance />} />
              <Route path="/gobierno-estructura" element={<Governance />} />
              <Route path="/alianzas-institucionales" element={<InstitutionalAlliances />} />
              <Route path="/informes-anuales" element={<AnnualAssembly />} />
              <Route path="/asamblea-anual" element={<AnnualAssembly />} />

              <Route path="/nuestra-accion" element={<StrategicLines />} />
              <Route path="/lineas-estrategicas" element={<StrategicLines />} />
              <Route path="/ejes-de-accion" element={<StrategicLines />} />
              <Route path="/proyectos" element={<Projects />} />
              <Route path="/programas-proyectos" element={<Projects />} />
              <Route path="/agenda-2030" element={<Agenda2030 />} />
              <Route path="/resultados-impacto" element={<Agenda2030 />} />

              <Route path="/presencia-global" element={<GlobalPresence />} />
              <Route path="/capacitacion" element={<Training />} />
              <Route path="/cga-academy" element={<Training />} />
              <Route path="/comunicacion" element={<Communication />} />
              <Route path="/comunicacion/:id" element={<Communication />} />
              <Route path="/noticias/:id" element={<Communication />} />
              <Route path="/articulo/:id" element={<Communication />} />
              <Route path="/conocimiento" element={<Communication />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/apoya" element={<SupportCGA />} />
              <Route path="/apoya-al-cga" element={<SupportCGA />} />

              {/* ─── SEMBLANZAS Y PERFILES DIRECTIVOS DEL CGA ─── */}
              <Route path="/luis-garcia" element={<PresidentBusinessCard memberId="luis-garcia" />} />
              <Route path="/francisco-solorio" element={<PresidentBusinessCard memberId="francisco-solorio" />} />
              <Route path="/presidencia" element={<PresidentBusinessCard memberId="luis-garcia" />} />
              <Route path="/secretaria-ejecutiva" element={<PresidentBusinessCard memberId="francisco-solorio" />} />
              <Route path="/semblanza-presidencia" element={<PresidentBusinessCard memberId="luis-garcia" />} />
              <Route path="/tarjeta-presidencia" element={<PresidentBusinessCard memberId="luis-garcia" />} />
              <Route path="/business-card" element={<PresidentBusinessCard memberId="luis-garcia" />} />
              <Route path="/tarjeta-digital" element={<PresidentBusinessCard memberId="luis-garcia" />} />
              <Route path="/credencial-presidencia" element={<PresidentBusinessCard memberId="luis-garcia" />} />

              {/* ─── RUTA DEL ADMINISTRADOR CMS ─── */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/articulos" element={<Admin />} />
            </Routes>
          </div>

          {/* ─── FLOATING WHATSAPP BUTTON ─── */}
          <WhatsAppButton />
        </div>
      </ArticlesProvider>
    </SiteSettingsProvider>
  );
}
