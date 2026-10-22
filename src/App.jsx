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

  const worldReadyRef = useRef(false);
  const planetReadyRef = useRef(false);

  // ─── REAL ASSET PRELOADER BASADO EN RECURSOS REALES (EL PLANETA ES LO PRIMERO) ───
  useEffect(() => {
    if (!isHomePage) {
      setLoaderVisible(false);
      setIsLoaded(true);
      setLoadingProgress(100);
      return;
    }

    let isCancelled = false;
    let animFrame;
    let displayProgress = 0;

    // Recursos críticos estrictamente necesarios para renderizar el inicio visual:
    // 4 texturas locales de la Tierra 3D + primer fotograma del canvas + logotipo oficial
    const criticalAssets = [
      '/textures/planets/earth_atmos_2048.jpg',
      '/textures/planets/earth_normal_2048.jpg',
      '/textures/planets/earth_specular_2048.jpg',
      '/textures/planets/earth_clouds_1024.png',
      '/VideoFrames/frame_001.jpg',
      '/logos/Logo%20ES.svg'
    ];

    let loadedAssets = 0;
    const totalAssets = criticalAssets.length;
    let fontsReady = false;

    if (document.fonts) {
      document.fonts.ready.then(() => {
        fontsReady = true;
      }).catch(() => {
        fontsReady = true;
      });
    } else {
      fontsReady = true;
    }

    const onAssetDone = () => {
      if (isCancelled) return;
      loadedAssets++;
    };

    // Precargar recursos en paralelo. Si ya están en caché del navegador se marcan al instante
    criticalAssets.forEach((src) => {
      const img = new Image();
      if (img.complete) {
        loadedAssets++;
      } else {
        img.onload = onAssetDone;
        img.onerror = onAssetDone;
      }
      img.src = src;
    });

    const startTime = performance.now();
    let lastTime = performance.now();
    // Tiempo de seguridad máximo para garantizar que el usuario nunca quede bloqueado
    const maxSafetyTimeout = 2800;

    const update = (now) => {
      if (isCancelled) return;

      const delta = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const elapsed = now - startTime;
      const assetRatio = Math.min(1, loadedAssets / totalAssets);
      const isPlanetReady = planetReadyRef.current;
      const fontRatio = fontsReady ? 1 : 0;

      // REGLA CRÍTICA: Lo primero que debe de cargar y estar visible es el planeta detrás del loader.
      let target;
      if (!isPlanetReady && elapsed < 2200) {
        // Fase 1: Mientras el planeta 3D termina de montar, avanza con suavidad hasta ~20%
        target = Math.min(20, Math.max(8, assetRatio * 20));
      } else {
        // Fase 2: Planeta listo y girando en el fondo. El contador avanza de forma continua y cadenciada
        target = 20 + (assetRatio * 70) + (fontRatio * 10);
      }

      if ((isPlanetReady && loadedAssets >= totalAssets) || elapsed >= maxSafetyTimeout) {
        target = 100;
      }

      // Ritmo de suma cadenciado, pausado y perfectamente legible:
      // Limitamos la velocidad para que los números suban de 1 en 1 de forma visible y fluida
      const distance = target - displayProgress;
      if (distance > 0) {
        let stepSpeed;
        if (displayProgress < 25) {
          stepSpeed = 32; // Inicio controlado y elegante (~32% por segundo)
        } else if (displayProgress < 85) {
          stepSpeed = 46; // Ritmo medio continuo y fluido (~46% por segundo)
        } else {
          // Desaceleración suave al aproximarse a 100 para crear anticipación
          stepSpeed = Math.max(22, Math.min(36, distance * 2.0));
        }

        displayProgress = Math.min(target, displayProgress + (stepSpeed * delta));
      }

      if (displayProgress >= 99.6 || (target === 100 && displayProgress >= 99.0)) {
        setLoadingProgress(100);
        // Pausa adecuada (320ms) para que el ojo humano aprecie con calma el 100%
        window.setTimeout(() => {
          if (!isCancelled) triggerFastZoom();
        }, 320);
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
  }, [isHomePage]);

  const triggerFastZoom = () => {
    if (zoomTriggeredRef.current) return;
    zoomTriggeredRef.current = true;

    // Desvanecer el loader inmediatamente (sin esperas artificiales)
    setLoaderVisible(false);

    const zStart = performance.now();
    const zDur = 650;
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
                onCreated={() => {
                  worldReadyRef.current = true;
                  setWorldReady(true);
                }}
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
                  onReady={() => {
                    planetReadyRef.current = true;
                  }}
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
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-50 flex flex-col items-center justify-center select-none overflow-hidden pointer-events-auto"
                style={{ background: 'transparent' }}
              >
                <div className="relative flex flex-col items-center text-center">
                  {/* Contador serif con suma suave, nítida y perfectamente legible */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center select-none"
                  >
                    <div
                      className="font-serif font-light text-white leading-none tabular-nums flex items-baseline justify-center drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                      style={{ fontSize: 'clamp(3.2rem, 6.5vw, 4.5rem)' }}
                    >
                      <span className="inline-block tabular-nums font-serif tracking-tight text-white">
                        {safePct}
                      </span>
                      <span className="text-[0.36em] text-white font-sans font-semibold ml-1.5 align-baseline drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        %
                      </span>
                    </div>

                    {/* Sutil barra de progreso minimalista para acompañar visualmente la suma */}
                    <div className="w-24 sm:w-28 h-[2px] bg-white/20 rounded-full overflow-hidden mt-3 backdrop-blur-sm">
                      <div
                        className="h-full bg-white transition-[width] duration-100 ease-out rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                        style={{ width: `${safePct}%` }}
                      />
                    </div>
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
