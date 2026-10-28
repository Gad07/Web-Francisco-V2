import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useTransform, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, X, Waves, Compass } from 'lucide-react';
import FooterNav from './FooterNav.jsx';
import CanvasFrameSequence from './CanvasFrameSequence.jsx';
import FpsMeter from './FpsMeter.jsx';
import Reveal, { RevealItem } from './Reveal.jsx';
import luisGarciaImg from '../imports/Perfiles/LuisGarcia.png';
import franciscoSolorioImg from '../imports/Perfiles/FranciscoSolorio.png';
import { useI18n } from '../i18n/index.jsx';
import { useSiteSettings } from '../context/SiteSettingsContext.jsx';

const EASE_SPRING = { type: 'spring', stiffness: 340, damping: 30 };



export default function EditorialOverlay({
  isLoaded,
  scrollProgress
}) {
  const { t, lang } = useI18n();
  const { siteSettings } = useSiteSettings();
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);
  const [pledgeName, setPledgeName] = useState('');
  const [activeTabWess, setActiveTabWess] = useState(0);
  const [selectedBiome, setSelectedBiome] = useState(null);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('cga:modal', { detail: { open: selectedBiome !== null } }));
  }, [selectedBiome]);

  const biomesData = [
    {
      id: 'selva',
      title: { es: 'Bosques Amazónicos', en: 'Amazon Forests' },
      tag: { es: 'Selva Tropical', en: 'Tropical Rainforest' },
      mediaType: 'image',
      src: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&q=85&fit=crop&auto=format',
      cardImg: 'https://images.unsplash.com/photo-1626657171364-4af23203469b?w=700&h=900&fit=crop&auto=format',
      subtitle: {
        es: 'El gran regulador bioclimático y reservorio genético del planeta',
        en: "The great bioclimatic regulator and genetic reservoir of the planet",
      },
      alert: {
        es: 'El 17% de la cuenca amazónica ha sido deforestada; el punto de no retorno ecológico se sitúa entre el 20% y 25%.',
        en: '17% of the Amazon basin has been deforested; the ecological point of no return lies between 20% and 25%.',
      },
      desc: {
        es: 'El bioma amazónico alberga el 10% de todas las especies conocidas en la Tierra y bombea ríos voladores de vapor de agua que alimentan el ciclo hidrológico de todo el continente. El Consejo Global Ambiental interviene mediante el establecimiento de 47 corredores bioculturales continuos, monitoreo satelital en tiempo real y gobernanza compartida con pueblos originarios para blindar el territorio frente a la tala y la minería ilícita.',
        en: 'The Amazon biome hosts 10% of all known species on Earth and pumps flying rivers of water vapour that feed the hydrological cycle of the entire continent. The Global Environmental Council intervenes by establishing 47 continuous biocultural corridors, real-time satellite monitoring and governance shared with indigenous peoples to shield the territory from logging and illegal mining.',
      },
      actionsTitle: { es: 'Estrategia Territorial Activa', en: 'Active Territorial Strategy' },
      actions: [
        {
          es: 'Despliegue de patrullas comunitarias equipadas con telemetría satelital y drones de largo alcance.',
          en: 'Deployment of community patrols equipped with satellite telemetry and long-range drones.',
        },
        {
          es: 'Reforestación con más de 120 especies nativas para restablecer la canopea en zonas degradadas.',
          en: 'Reforestation with more than 120 native species to re-establish the canopy in degraded areas.',
        },
        {
          es: 'Consolidación de bancos de germoplasma y parcelas agroforestales regenerativas.',
          en: 'Strengthening of germplasm banks and regenerative agroforestry plots.',
        },
      ],
      metrics: [
        {
          val: '1.2M ha',
          label: { es: 'Bajo monitoreo satelital activo', en: 'Under active satellite monitoring' },
        },
        {
          val: '47',
          label: { es: 'Corredores bioculturales blindados', en: 'Protected biocultural corridors' },
        },
        {
          val: '120k+',
          label: { es: 'Especies protegidas en territorio', en: 'Species protected on the territory' },
        },
      ],
      ods: { es: 'ODS 15 (Vida Terrestre) y ODS 13 (Acción por el Clima)', en: 'SDG 15 (Life on Land) and SDG 13 (Climate Action)' },
    },
    {
      id: 'arrecifes',
      title: { es: 'Arrecifes de Coral', en: 'Coral Reefs' },
      tag: { es: 'Océano Tropical', en: 'Tropical Ocean' },
      mediaType: 'video',
      videoSrc: '/video/gemini_generated_video_7df380fb.mp4',
      src: 'https://images.unsplash.com/photo-1623880132570-ab1b4297c8c2?w=1920&q=85&fit=crop&auto=format',
      cardImg: 'https://images.unsplash.com/photo-1623880132570-ab1b4297c8c2?w=700&h=900&fit=crop&auto=format',
      subtitle: {
        es: 'El latido azul que oxigena y defiende las costas de la biosfera',
        en: "The blue heartbeat that oxygenates and defends the coasts of the biosphere",
      },
      alert: {
        es: 'El 50% de los arrecifes coralinos globales han colapsado en cinco décadas por estrés térmico y acidificación oceánica.',
        en: '50% of the world’s coral reefs have collapsed in five decades due to thermal stress and ocean acidification.',
      },
      desc: {
        es: 'A pesar de ocupar menos del 0.2% de la superficie marina, los arrecifes sustentan más de una cuarta parte de toda la vida en los océanos y absorben hasta el 97% de la energía del oleaje durante huracanes. El Consejo Global Ambiental opera programas de microfragmentación asistida, viveros submarinos y restauración de barreras arrecifales en 200 hectáreas marinas prioritarias.',
        en: 'Despite covering less than 0.2% of the ocean surface, reefs sustain more than a quarter of all life in the oceans and absorb up to 97% of wave energy during hurricanes. The Global Environmental Council runs assisted microfragmentation programmes, underwater nurseries and reef-barrier restoration across 200 priority marine hectares.',
      },
      actionsTitle: { es: 'Estrategia de Restauración Marina', en: 'Marine Restoration Strategy' },
      actions: [
        {
          es: 'Viveros de microfragmentación con cepas de corales resilientes a fluctuaciones térmicas.',
          en: 'Microfragmentation nurseries with coral strains resilient to thermal fluctuations.',
        },
        {
          es: 'Regulación de escorrentías terrestres y cuencas altas para asegurar aguas cristalinas y libres de agroquímicos.',
          en: 'Regulation of land runoff and upper watersheds to ensure clear water free of agrochemicals.',
        },
        {
          es: 'Monitoreo bioacústico y batimétrico para evaluar el retorno de cardúmenes y cadenas tróficas.',
          en: 'Bioacoustic and bathymetric monitoring to assess the return of schools and food chains.',
        },
      ],
      metrics: [
        {
          val: '200 ha',
          label: { es: 'Arrecifes en restauración asistida', en: 'Reefs under assisted restoration' },
        },
        {
          val: '70%',
          label: { es: 'Oxígeno biosférico generado en el mar', en: 'Biospheric oxygen generated at sea' },
        },
        {
          val: '97%',
          label: { es: 'Atenuación de energía de oleaje costero', en: 'Coastal wave energy attenuation' },
        },
      ],
      ods: { es: 'ODS 14 (Vida Submarina) y ODS 17 (Alianzas Estratégicas)', en: 'SDG 14 (Life Below Water) and SDG 17 (Partnerships for the Goals)' },
    },
    {
      id: 'glaciares',
      title: { es: 'Glaciares Polares', en: 'Polar Glaciers' },
      tag: { es: 'Ártico y Antártida', en: 'Arctic and Antarctic' },
      mediaType: 'image',
      src: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=1920&q=85&fit=crop&auto=format',
      cardImg: 'https://images.unsplash.com/photo-1758794093166-271d03ffd941?w=700&h=900&fit=crop&auto=format',
      subtitle: {
        es: 'Los gigantes de hielo que regulan el albedo y el equilibrio térmico planetario',
        en: 'The ice giants that regulate albedo and the planetary thermal balance',
      },
      alert: {
        es: 'Los polos se calientan cuatro veces más rápido que la media mundial, alterando la corriente en chorro y la circulación oceánica.',
        en: 'The poles are warming four times faster than the global average, altering the jet stream and ocean circulation.',
      },
      desc: {
        es: 'Los campos de hielo y masas glaciares actúan como el gran escudo térmico de la Tierra, reflejando el 85% de la radiación solar incidente. El retroceso glacial amenaza el abastecimiento de agua dulce de millones de personas y desestabiliza patrones climáticos globales. El Consejo mantiene telemetría satelital en 3,200 glaciares e impulsa tratados vinculantes de moratoria extractiva polar.',
        en: 'Ice fields and glaciers act as the great thermal shield of the Earth, reflecting 85% of incident solar radiation. Glacial retreat threatens the freshwater supply of millions of people and destabilises global climate patterns. The Council maintains satellite telemetry on 3,200 glaciers and promotes binding treaties for a polar extraction moratorium.',
      },
      actionsTitle: { es: 'Estrategia de Alerta e Incidencia Polar', en: 'Polar Alert and Advocacy Strategy' },
      actions: [
        {
          es: 'Monitoreo glaciológico de 3,200 frentes glaciares mediante radar de apertura sintética e interferometría.',
          en: 'Glaciological monitoring of 3,200 glacier fronts using synthetic aperture radar and interferometry.',
        },
        {
          es: 'Promoción diplomática de santuarios polares y proscripción estricta de minería en fondos marinos árticos.',
          en: 'Diplomatic promotion of polar sanctuaries and a strict ban on mining in Arctic seabeds.',
        },
        {
          es: 'Modelos predictivos de aumento del nivel del mar transferidos a gobiernos locales y comunidades costeras.',
          en: 'Sea level rise predictive models transferred to local governments and coastal communities.',
        },
      ],
      metrics: [
        {
          val: '3,200',
          label: { es: 'Glaciares bajo telemetría científica', en: 'Glaciers under scientific telemetry' },
        },
        {
          val: '4x',
          label: { es: 'Velocidad de calentamiento polar', en: 'Polar warming rate' },
        },
        {
          val: '100%',
          label: { es: 'Compromiso con la moratoria polar', en: 'Commitment to the polar moratorium' },
        },
      ],
      ods: { es: 'ODS 13 (Acción por el Clima) y ODS 16 (Paz y Justicia Institucional)', en: 'SDG 13 (Climate Action) and SDG 16 (Peace, Justice and Strong Institutions)' },
    },
  ];

  const branchContainerRef = useRef(null);
  const maskRef = useRef(null);
  const interdependenciaRef = useRef(null);
  const videoLoopRef = useRef(null);
  const canvasFrameRef = useRef(null);

  // MotionValues creados manualmente, actualizados en el rAF loop
  // de la sección `interdependencia`. Sin `useScroll` de Framer Motion.
  const interScrollMV = useMotionValue(0);
  const scrubTargetRef = useRef(0);
  const phaseRef = useRef(0);
  const framePosRef = useRef(0);
  const TOTAL_VIDEO_FRAMES = 240;

  // MotionValue para el hero branch (sigue usando scrollProgress externo)
  const fallbackMV = useMotionValue(scrollProgress ?? 0);
  const scrollMV = useMemo(
    () =>
      scrollProgress && typeof scrollProgress.get === 'function'
        ? scrollProgress
        : fallbackMV,
    [scrollProgress, fallbackMV]
  );

  // Parallax sutil: la rama se eleva ligeramente al comenzar el scroll (sensación de profundidad)
  const heroBranchY = useTransform(scrollMV, [0, 0.1], [0, -40]);
  const heroBranchScale = useTransform(scrollMV, [0, 0.12], [1, 1.04]);

  // Fases
  const PHASE_2_START = 0.02;
  const PHASE_3_START = 0.60;
  const HYSTERESIS = 0.015;

  // Opacidades basadas en interScrollMV
  const stoneTextOpacity = useTransform(interScrollMV, [0, 0.02, 0.10], [1, 1, 0]);
  const stoneImgOpacity = useTransform(interScrollMV, [0, 0.05, 0.15], [1, 1, 0]);
  const reefTextOpacity = useTransform(interScrollMV, [0, 0.58, 0.64, 0.95, 1], [0, 0, 1, 1, 0]);

  const [showLoopVideo, setShowLoopVideo] = useState(false);
  const [reefVisible, setReefVisible] = useState(false);
  const [stoneVisible, setStoneVisible] = useState(false);

  useMotionValueEvent(reefTextOpacity, 'change', (v) => {
    setReefVisible(v > 0.03);
  });

  useMotionValueEvent(stoneTextOpacity, 'change', (v) => {
    setStoneVisible(v > 0.03);
  });

  const setPhase = (next) => {
    if (phaseRef.current === next) return;
    phaseRef.current = next;
    if (next === 2) {
      setShowLoopVideo(true);
    } else {
      setShowLoopVideo(false);
    }
  };

  // Control de reproducción del loop al activar la fase 2
  useEffect(() => {
    const video = videoLoopRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    if (showLoopVideo) {
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    } else {
      video.pause();
    }
  }, [showLoopVideo]);

  // ✅ rAF loop de alta precisión que actualiza scrubTarget y notifica
  // directamente a CanvasFrameSequence sin disparar re-renders de React.
  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = requestAnimationFrame(update);

      const el = interdependenciaRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Optimización offscreen: si la sección no está en el viewport, omitir cómputos
      if (rect.bottom < -100 || rect.top > vh + 100) return;

      const scrollableHeight = rect.height - vh;
      if (scrollableHeight <= 0) return;

      const scrolled = Math.max(0, -rect.top);
      const raw = scrolled / scrollableHeight;
      const progress = Math.max(0, Math.min(1, isFinite(raw) ? raw : 0));

      // Actualizar el MotionValue (alimenta useTransform para las opacidades)
      interScrollMV.set(progress);

      // Actualizar scrubTargetRef directamente
      if (progress <= PHASE_2_START) {
        scrubTargetRef.current = 0;
      } else if (progress < PHASE_3_START) {
        const t = (progress - PHASE_2_START) / (PHASE_3_START - PHASE_2_START);
        scrubTargetRef.current = Math.max(0, Math.min(1, isFinite(t) ? t : 0));
      } else {
        scrubTargetRef.current = 1;
      }

      // Suavizado del playhead con lerp (0.20) adaptado a ratón y trackpad con inercia cinemática pura
      const dr = 0.20;
      const diff = scrubTargetRef.current - framePosRef.current;
      if (Math.abs(diff) < 0.0004) {
        framePosRef.current = scrubTargetRef.current;
      } else {
        framePosRef.current += diff * dr;
      }

      if (progress <= PHASE_2_START) framePosRef.current = 0;
      else if (progress >= PHASE_3_START) framePosRef.current = 1;

      // Cálculo continuo en punto flotante para interpolación óptica sub-frame a 60-144 FPS
      const rawFrame = 1 + framePosRef.current * (TOTAL_VIDEO_FRAMES - 1);
      const frame = Math.max(1, Math.min(TOTAL_VIDEO_FRAMES, rawFrame));

      // Notificar directamente al CanvasFrameSequence de forma imperativa (CERO re-renders de React, 60-144fps fluido)
      if (canvasFrameRef.current) {
        canvasFrameRef.current.setFrame(frame);
      }

      if (window.__videoScrubDebug) {
        window.__videoScrubDebug.playhead = scrubTargetRef.current;
        window.__videoScrubDebug.state = 'frames';
        window.__videoScrubDebug.frames = TOTAL_VIDEO_FRAMES;
      }

      // Calcular fase candidata y aplicar histéresis
      const cur = phaseRef.current;
      let candidate;
      if (progress <= PHASE_2_START) candidate = 0;
      else if (progress < PHASE_3_START) candidate = 1;
      else candidate = 2;

      let next = candidate;
      if (cur === 0 && candidate === 1) {
        if (progress < PHASE_2_START + HYSTERESIS) next = 0;
      } else if (cur === 1 && candidate === 0) {
        if (progress > PHASE_2_START - HYSTERESIS) next = 1;
      } else if (cur === 1 && candidate === 2) {
        if (progress < PHASE_3_START + HYSTERESIS) next = 1;
      } else if (cur === 2 && candidate === 1) {
        if (progress > PHASE_3_START - HYSTERESIS) next = 2;
      }

      if (cur !== next) {
        setPhase(next);
        if (videoLoopRef.current) {
          if (next === 2) {
            videoLoopRef.current.currentTime = 0;
            videoLoopRef.current.muted = true;
            const p = videoLoopRef.current.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
          } else {
            videoLoopRef.current.pause();
          }
        }
      } else if (next === 2 && videoLoopRef.current && videoLoopRef.current.paused) {
        videoLoopRef.current.muted = true;
        const p = videoLoopRef.current.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      }
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [debugFps] = useState(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('fps') === '1';
  });

  useEffect(() => {
    if (!debugFps) return;
    window.__videoScrubDebug = {};
    return () => {
      delete window.__videoScrubDebug;
    };
  }, [debugFps]);

  // Spotlight borders: seguimiento del cursor en tarjetas .spotlight
  useEffect(() => {
    const onMove = (e) => {
      const el = e.target.closest?.('.spotlight');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--sx', `${e.clientX - r.left}px`);
      el.style.setProperty('--sy', `${e.clientY - r.top}px`);
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  const [activeBaseLayer, setActiveBaseLayer] = useState(1);
  const isExpandingRef = useRef(false);

  const handleHeroMouseMove = (e) => {
    if (isExpandingRef.current) return;
    if (!branchContainerRef.current) return;
    const rect = branchContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const inBounds = x >= -80 && x <= rect.width + 80 && y >= -80 && y <= rect.height + 80;

    if (maskRef.current) {
      if (inBounds) {
        const maskVal = `radial-gradient(circle 220px at ${x}px ${y}px, black 30%, transparent 100%)`;
        maskRef.current.style.maskImage = maskVal;
        maskRef.current.style.webkitMaskImage = maskVal;
        maskRef.current.style.opacity = '1';
      } else {
        maskRef.current.style.opacity = '0';
      }
    }
  };

  const handleHeroMouseLeave = () => {
    if (isExpandingRef.current) return;
    if (maskRef.current) {
      maskRef.current.style.opacity = '0';
    }
  };

  const handleBranchDoubleClick = (e) => {
    if (isExpandingRef.current || !branchContainerRef.current) return;
    const rect = branchContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    isExpandingRef.current = true;

    let startTime = null;
    const duration = 900; // ms

    const animateExpansion = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Smooth cubic easeInOut for luxurious cinematic expansion
      const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      const currentRadius = 220 + ease * 3400;

      if (maskRef.current) {
        const maskVal = `radial-gradient(circle ${currentRadius}px at ${x}px ${y}px, black 75%, transparent 100%)`;
        maskRef.current.style.maskImage = maskVal;
        maskRef.current.style.webkitMaskImage = maskVal;
        maskRef.current.style.opacity = '1';
      }

      if (progress < 1) {
        requestAnimationFrame(animateExpansion);
      } else {
        // Full coverage reached: solidify top layer first
        if (maskRef.current) {
          maskRef.current.style.maskImage = 'none';
          maskRef.current.style.webkitMaskImage = 'none';
          maskRef.current.style.opacity = '1';
        }

        // Swap base layer underneath while top layer is 100% solid
        setActiveBaseLayer((prev) => (prev === 1 ? 2 : 1));

        // Two RAFs guarantee React has updated the DOM before releasing mask
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (maskRef.current) {
              maskRef.current.style.opacity = '0';
              maskRef.current.style.maskImage = `radial-gradient(circle 220px at ${x}px ${y}px, black 30%, transparent 100%)`;
              maskRef.current.style.webkitMaskImage = `radial-gradient(circle 220px at ${x}px ${y}px, black 30%, transparent 100%)`;
            }
            isExpandingRef.current = false;
          });
        });
      }
    };

    requestAnimationFrame(animateExpansion);
  };

  const handlePledge = (e) => {
    e.preventDefault();
    setPledgeSubmitted(true);
  };

  return (
    <main className={`relative z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'} overflow-x-clip`}>

      {/* CAPÍTULO 1 — HERO */}
      <section
        id="hero"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        onDoubleClick={handleBranchDoubleClick}
        className="h-[100dvh] min-h-[640px] w-full relative flex items-center pt-24 sm:pt-28 md:pt-32 pb-16 px-5 sm:px-10 md:px-16 lg:px-20 overflow-hidden bg-[#f5efe3]"
      >
        {/* Atmósfera ambiental — orbes difuminados que respiran */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="orb orb-moss orb-drift w-[50vw] sm:w-[42vw] h-[50vw] sm:h-[42vw] max-w-[620px] max-h-[620px] -top-[14%] -right-[10%]" />
          <div className="orb orb-ocean orb-drift-slow w-[40vw] sm:w-[34vw] h-[40vw] sm:h-[34vw] max-w-[520px] max-h-[520px] bottom-[-18%] left-[-8%]" />
          <div className="orb orb-bone orb-drift w-[30vw] sm:w-[26vw] h-[30vw] sm:h-[26vw] max-w-[400px] max-h-[400px] top-[32%] left-[26%] opacity-70" />
        </div>

        {/* Rama fotográfica — interactiva con doble clic y hover reveal (Cubre 100% la altura de la pantalla) */}
        <motion.div
          ref={branchContainerRef}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          onDoubleClick={handleBranchDoubleClick}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            height: '100%',
            width: '100%',
            pointerEvents: 'auto',
            cursor: 'pointer',
            zIndex: 15,
            y: heroBranchY,
            scale: heroBranchScale,
          }}
        >
          {/* Capa Base: Rama 1 (sin fauna) o Rama 2 (con fauna y flora) */}
          <img
            src={activeBaseLayer === 1 ? '/imagenes/Rama 1.png' : '/imagenes/Rama 2.png'}
            alt={activeBaseLayer === 1 ? t({ es: 'Rama Base', en: 'Base Branch' }) : t({ es: 'Rama con Especies y Follaje', en: 'Branch with Species & Foliage' })}
            className="hero-branch-img"
            draggable={false}
          />

          {/* Capa Revelable en Hover: Imagen alternativa que se revela bajo el cursor o se expande en doble clic */}
          <div
            ref={maskRef}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              opacity: 0,
              transition: 'opacity 0.25s ease',
              maskImage: 'radial-gradient(circle 220px at -999px -999px, black 30%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(circle 220px at -999px -999px, black 30%, transparent 100%)',
            }}
          >
            <img
              src={activeBaseLayer === 1 ? '/imagenes/Rama 2.png' : '/imagenes/Rama 1.png'}
              alt={activeBaseLayer === 1 ? t({ es: 'Rama con Especies y Follaje', en: 'Branch with Species & Foliage' }) : t({ es: 'Rama Base', en: 'Base Branch' })}
              className="hero-branch-img"
              draggable={false}
            />
          </div>

        </motion.div>

        {/* Fila Principal: Columna Izquierda con el Titular Centrado Verticalmente */}
        <div className="relative z-30 w-full max-w-[1440px] mx-auto flex flex-col items-start justify-center select-none pt-2 sm:pt-4">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-left tracking-[-0.02em] max-w-2xl lg:max-w-[660px]"
          >
            <span className="block font-light text-[#2d2618] text-[clamp(2.35rem,5vw,4.35rem)] leading-[1.04]">
              {t('hero.line1')}
            </span>
            <span className="block font-serif italic font-normal text-[#4a5a22] text-[clamp(2.25rem,4.7vw,4.15rem)] leading-[1.06] mt-2 sm:mt-3">
              {t('hero.line2')}
            </span>
          </motion.h1>
        </div>

        {/* Capa Dinámica: Letras Blancas activas ÚNICAMENTE donde se tocan con la silueta de Rama 2 cuando esta está en primer plano */}
        {activeBaseLayer === 2 && (
          <div
            aria-hidden="true"
            className="hero-mask-layer absolute inset-0 z-35 pointer-events-none flex items-center pt-24 sm:pt-28 md:pt-32 pb-16 px-5 sm:px-10 md:px-16 lg:px-20 overflow-hidden"
          >
            <div className="relative w-full max-w-[1440px] mx-auto flex flex-col items-start justify-center select-none pt-2 sm:pt-4">
              <div className="font-serif text-left tracking-[-0.02em] max-w-2xl lg:max-w-[660px]">
                <span className="block font-light text-white text-[clamp(2.35rem,5vw,4.35rem)] leading-[1.04] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  {t('hero.line1')}
                </span>
                <span className="block font-serif italic font-normal text-white text-[clamp(2.25rem,4.7vw,4.15rem)] leading-[1.06] mt-2 sm:mt-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  {t('hero.line2')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Fila Inferior: Solo Scroll down pill flotante en la base sin empujar el flujo */}
        <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-5 sm:left-10 md:left-16 lg:left-20 right-5 sm:right-10 md:right-16 lg:right-20 z-30 pointer-events-none select-none">
          <div className="w-full max-w-[1440px] mx-auto">
            <Reveal y={15} delay={0.4}>
              <a
                href="#interdependencia"
                className="inline-flex items-center gap-2.5 sm:gap-3 group cursor-pointer pointer-events-auto text-[#4a3f2d] hover:text-[#140f08] transition-colors duration-300"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#2d2618]/25 text-[#2d2618] flex items-center justify-center text-[10px] sm:text-xs font-sans group-hover:border-[#2d2618] transition-colors">
                  ↓
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] font-sans font-medium">
                  {t({ es: 'Scroll para explorar', en: 'Scroll down for more' })}
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── CINTA DE ANUNCIOS INSTITUCIONAL (3 ESTILOS + COLOR/DEGRADADO + BOTÓN OPCIONAL) ─── */}
      <AnimatePresence>
        {siteSettings?.banner?.enabled && !bannerDismissed && (() => {
          const b = siteSettings.banner;
          const bannerStyle = b.bannerStyle || 'static';
          const showCta = b.showCta !== false && Boolean(b.ctaLink);

          // Background styling
          let bgStyle = {};
          if (b.gradientEnabled) {
            const dirMap = {
              'to-r': 'to right',
              'to-b': 'to bottom',
              'to-br': 'to bottom right',
              'radial': 'radial',
            };
            const from = b.gradientFrom || '#4a5a22';
            const to = b.gradientTo || '#2d3813';
            bgStyle = {
              background: b.gradientDirection === 'radial'
                ? `radial-gradient(circle at center, ${from}, ${to})`
                : `linear-gradient(${dirMap[b.gradientDirection] || 'to right'}, ${from}, ${to})`,
              color: b.textColor || '#f5efe3',
              borderColor: `${to}60`,
            };
          } else if (b.theme === 'custom') {
            bgStyle = {
              backgroundColor: b.bgColor || '#4a5a22',
              color: b.textColor || '#f5efe3',
              borderColor: `${b.bgColor || '#4a5a22'}60`,
            };
          } else if (b.theme === 'terracotta') {
            bgStyle = { backgroundColor: '#8c4a2f', color: '#f5efe3', borderColor: '#6d3924' };
          } else if (b.theme === 'beige') {
            bgStyle = { backgroundColor: '#eae4d2', color: '#2d2618', borderColor: '#d8ceb6' };
          } else {
            // default moss
            bgStyle = { backgroundColor: '#4a5a22', color: '#f5efe3', borderColor: '#384519' };
          }

          const texts = b.marqueeTexts && b.marqueeTexts.length > 0
            ? b.marqueeTexts
            : [b.message || 'Consejo Global Ambiental · Plataforma Institucional'];

          const images = b.marqueeImages && b.marqueeImages.length > 0
            ? b.marqueeImages
            : [];

          const marqueeDuration = `${b.marqueeSpeed || 28}s`;

          const fixedHeight = b.imageHeight || 76;

          return (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                ...bgStyle,
                ...(bannerStyle === 'image-marquee' ? { height: `${fixedHeight}px` } : {}),
              }}
              className={`w-full relative z-20 overflow-hidden border-y transition-colors text-xs ${bannerStyle === 'image-marquee' ? 'py-0 px-0' : 'py-3 px-4 sm:px-8 md:px-12'
                }`}
            >
              {/* ESTILO 1: ESTÁTICO / EDITORIAL */}
              {bannerStyle === 'static' && (
                <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start text-center sm:text-left">
                    <span className="font-medium text-xs sm:text-sm leading-relaxed">
                      {typeof b.message === 'object' ? (b.message[lang] || b.message.es || '') : b.message}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    {showCta && (
                      <Link
                        to={b.ctaLink}
                        className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider underline hover:opacity-80 transition-opacity whitespace-nowrap"
                      >
                        <span>
                          {typeof b.ctaText === 'object'
                            ? (b.ctaText[lang] || b.ctaText.es || '')
                            : (b.ctaText || t({ es: 'Ver más', en: 'Learn more' }))}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => setBannerDismissed(true)}
                      className="p-1 rounded-lg hover:bg-black/10 transition-colors"
                      title={t({ es: 'Ocultar aviso', en: 'Dismiss announcement' })}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* ESTILO 2: CARRUSEL DE TEXTO CONTINUO (MARQUEE) */}
              {bannerStyle === 'text-marquee' && (
                <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
                  <div className="flex-1 overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
                    <div
                      className="cga-marquee-track flex items-center gap-8 py-0.5"
                      style={{ '--marquee-duration': marqueeDuration }}
                    >
                      {[...texts, ...texts, ...texts, ...texts].map((txt, idx) => (
                        <div key={idx} className="flex items-center gap-6 shrink-0 whitespace-nowrap">
                          <span className="font-medium text-xs sm:text-sm tracking-wide">
                            {typeof txt === 'object' ? (txt[lang] || txt.es || '') : txt}
                          </span>
                          <span className="opacity-40 text-xs">◆</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 pl-2">
                    {showCta && (
                      <Link
                        to={b.ctaLink}
                        className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider underline hover:opacity-80 transition-opacity whitespace-nowrap"
                      >
                        <span>{b.ctaText || 'Ver más'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => setBannerDismissed(true)}
                      className="p-1 rounded-lg hover:bg-black/10 transition-colors"
                      title={t({ es: 'Ocultar aviso', en: 'Dismiss announcement' })}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* ESTILO 3: CARRUSEL DE IMÁGENES (SIN TEXTO, ALTO FIJO Y ENLACES INDIVIDUALES) */}
              {bannerStyle === 'image-marquee' && (
                <div className="w-full h-full flex items-center justify-between relative select-none">
                  <div className="w-full h-full overflow-hidden relative">
                    <div
                      className="cga-marquee-track h-full flex items-center gap-0"
                      style={{ '--marquee-duration': marqueeDuration }}
                    >
                      {[...images, ...images, ...images, ...images].map((img, idx) => {
                        const hasLink = Boolean(img.link && img.link.trim());
                        const isExternal = hasLink && (img.link.startsWith('http://') || img.link.startsWith('https://'));

                        const content = (
                          <div className="h-full relative overflow-hidden group/img shrink-0" style={{ height: `${fixedHeight}px` }}>
                            <img
                              src={img.url}
                              alt="Banner visual"
                              className="h-full w-auto min-w-[140px] sm:min-w-[190px] md:min-w-[240px] object-cover transition-all duration-500 group-hover/img:scale-105 group-hover/img:brightness-110 select-none block"
                              style={{ height: `${fixedHeight}px`, objectPosition: img.position || 'center' }}
                            />
                            <div className="absolute inset-y-0 right-0 w-[1px] bg-white/20 pointer-events-none" />
                            {hasLink && (
                              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <span className="p-1.5 rounded-full bg-white/30 backdrop-blur-xs text-white shadow-sm">
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                              </div>
                            )}
                          </div>
                        );

                        if (hasLink) {
                          if (isExternal) {
                            return (
                              <a
                                key={idx}
                                href={img.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-full shrink-0 relative block cursor-pointer"
                                title={`Abrir enlace: ${img.link}`}
                              >
                                {content}
                              </a>
                            );
                          }
                          return (
                            <Link
                              key={idx}
                              to={img.link}
                              className="h-full shrink-0 relative block cursor-pointer"
                              title={`Ir a: ${img.link}`}
                            >
                              {content}
                            </Link>
                          );
                        }

                        return (
                          <div key={idx} className="h-full shrink-0 relative">
                            {content}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Botón discreto de cerrar en esquina */}
                  <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20">
                    <button
                      type="button"
                      onClick={() => setBannerDismissed(true)}
                      className="p-1.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md transition-colors text-white/90 hover:text-white border border-white/20 shadow-md cursor-pointer"
                      title={t({ es: 'Ocultar aviso', en: 'Dismiss announcement' })}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* CAPÍTULO 2 */}
      <section
        id="interdependencia"
        ref={interdependenciaRef}
        style={{ height: '420vh' }}
        className="h-[420vh] relative bg-[#f5efe3]"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-visible">
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 5,
            }}
          >
            <motion.img
              src="/VideoFrames/frame_001.jpg"
              alt={t({ es: 'Piedra Ecosistémica', en: 'Ecosystem Rock' })}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                zIndex: 4,
                opacity: stoneImgOpacity,
              }}
            />

            <CanvasFrameSequence
              ref={canvasFrameRef}
              totalFrames={TOTAL_VIDEO_FRAMES}
              showFrames={true}
              showLoopVideo={false}
            />

            <video
              ref={(el) => {
                videoLoopRef.current = el;
                if (el) {
                  el.muted = true;
                  el.defaultMuted = true;
                  el.playsInline = true;
                }
              }}
              src="/video/gemini_loop_1080p.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onCanPlay={(e) => {
                e.currentTarget.muted = true;
                if (phaseRef.current === 2) {
                  e.currentTarget.play().catch(() => {});
                }
              }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                opacity: showLoopVideo ? 1 : 0,
                visibility: showLoopVideo ? 'visible' : 'hidden',
                transition: 'opacity 0.4s ease',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              <source src="/video/gemini_loop_1080p.mp4" type="video/mp4" />
            </video>
          </div>

          <div
            className={`w-full max-w-[1400px] flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-8 relative z-20 pointer-events-none px-4 sm:px-8 md:px-12 ${stoneVisible ? '' : 'invisible'}`}
          >
            <div
              className="relative w-full md:w-[38%] text-left pointer-events-auto p-5 sm:p-8 rounded-2xl sm:rounded-3xl overflow-hidden"
              style={{
                background:
                  'radial-gradient(130% 130% at 15% 0%, rgba(255,255,255,0.40), rgba(255,255,255,0) 46%), linear-gradient(155deg, rgba(246,240,224,0.58) 0%, rgba(246,240,224,0.20) 50%, rgba(246,240,224,0.42) 100%)',
                backdropFilter: 'blur(22px) saturate(1.4)',
                WebkitBackdropFilter: 'blur(22px) saturate(1.4)',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.5), inset 1px 0 0 rgba(255,255,255,0.12), inset -1px 0 0 rgba(90,70,40,0.12), inset 0 -16px 32px -20px rgba(100,90,45,0.30), 0 30px 80px -30px rgba(45,38,24,0.45)',
              }}
            >
              {/* Brillos especulares del liquid glass */}
              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute -top-1/4 left-[-10%] h-[75%] w-[46%] rotate-[18deg] bg-gradient-to-r from-white/50 via-white/12 to-transparent blur-[2px]" />
                <div className="absolute right-[-8%] bottom-[-20%] h-[70%] w-[34%] rotate-[18deg] bg-gradient-to-l from-white/10 via-white/4 to-transparent" />
              </div>
              <motion.div style={{ opacity: stoneTextOpacity }}>
                <h2 className="relative font-serif text-2xl sm:text-4xl md:text-5xl text-[#2d2618] tracking-tight leading-[1.06] mb-3 sm:mb-5 font-light">
                  {t({ es: 'La trama viva de las raíces.', en: 'The living web of roots.' })}
                </h2>
                <p className="relative font-sans text-xs sm:text-base text-[#6b6048] font-light leading-relaxed">
                  {t({
                    es: 'En las profundidades del suelo, una inmensa red de raíces y micelio conecta cada árbol en una sinfonía silenciosa. Lo que ocurre en la copa de un roble alimenta la vida bajo la corteza terrestre.',
                    en: 'Deep in the soil, an immense network of roots and mycelium links every tree in a silent symphony. What happens in the crown of an oak feeds the life beneath the earth’s crust.',
                  })}
                </p>
              </motion.div>
            </div>

            <div className="w-full md:w-[36%] flex flex-col gap-3 sm:gap-4 text-left pointer-events-auto">
              <div
                className="relative p-4 sm:p-6 rounded-xl sm:rounded-2xl overflow-hidden"
                style={{
                  background:
                    'radial-gradient(120% 120% at 15% 0%, rgba(255,255,255,0.36), rgba(255,255,255,0) 46%), linear-gradient(155deg, rgba(246,240,224,0.52) 0%, rgba(246,240,224,0.18) 50%, rgba(246,240,224,0.40) 100%)',
                  backdropFilter: 'blur(20px) saturate(1.4)',
                  WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -14px 28px -18px rgba(100,90,45,0.30), 0 22px 60px -22px rgba(45,38,24,0.40)',
                }}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute -top-1/4 left-[-10%] h-[75%] w-[46%] rotate-[18deg] bg-gradient-to-r from-white/45 via-white/10 to-transparent blur-[2px]" />
                </div>
                <motion.div style={{ opacity: stoneTextOpacity }}>
                  <h3 className="relative font-serif text-xl sm:text-2xl text-[#2d2618] font-light mb-1.5">{t({ es: 'Metabolismo Vital', en: 'Vital Metabolism' })}</h3>
                  <p className="relative text-xs text-[#6b6048] leading-relaxed font-sans font-light">
                    {t({
                      es: 'El suelo alberga más del 50% de todas las especies vivas de la Tierra y sustenta el ciclo biológico del planeta.',
                      en: 'Soil hosts more than 50% of all living species on Earth and sustains the planet’s biological cycle.',
                    })}
                  </p>
                </motion.div>
              </div>
              <div
                className="relative p-4 sm:p-6 rounded-xl sm:rounded-2xl overflow-hidden"
                style={{
                  background:
                    'radial-gradient(120% 120% at 15% 0%, rgba(255,255,255,0.36), rgba(255,255,255,0) 46%), linear-gradient(155deg, rgba(246,240,224,0.52) 0%, rgba(246,240,224,0.18) 50%, rgba(246,240,224,0.40) 100%)',
                  backdropFilter: 'blur(20px) saturate(1.4)',
                  WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -14px 28px -18px rgba(100,90,45,0.30), 0 22px 60px -22px rgba(45,38,24,0.40)',
                }}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute -top-1/4 left-[-10%] h-[75%] w-[46%] rotate-[18deg] bg-gradient-to-r from-white/45 via-white/10 to-transparent blur-[2px]" />
                </div>
                <motion.div style={{ opacity: stoneTextOpacity }}>
                  <h3 className="relative font-serif text-xl sm:text-2xl text-[#2d2618] font-light mb-1.5">{t({ es: 'Pulmón Verde', en: 'Green Lung' })}</h3>
                  <p className="relative text-xs text-[#6b6048] leading-relaxed font-sans font-light">
                    {t({
                      es: 'Cada hectárea de bosque primario purifica millones de litros de agua y aire al año, estabilizando el clima continental.',
                      en: 'Every hectare of primary forest purifies millions of litres of water and air each year, stabilising the continental climate.',
                    })}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          <div
            className={`w-full max-w-[1380px] flex flex-col md:flex-row items-stretch justify-between gap-6 sm:gap-8 absolute inset-x-0 mx-auto z-20 pointer-events-none px-4 sm:px-8 md:px-12 ${reefVisible ? '' : 'invisible'}`}
          >
            {/* Tarjeta 1: Nuestra misión con el océano — Glassmorphism Líquido Puro */}
            <div
              className="relative w-full md:w-[48%] text-left pointer-events-auto p-7 sm:p-9 md:p-11 rounded-[2rem] overflow-hidden flex flex-col justify-center"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255, 255, 255, 0.68) 0%, rgba(255, 255, 255, 0.42) 50%, rgba(255, 255, 255, 0.58) 100%)',
                backdropFilter: 'blur(28px) saturate(1.7)',
                WebkitBackdropFilter: 'blur(28px) saturate(1.7)',
                border: '1px solid rgba(255, 255, 255, 0.60)',
                boxShadow:
                  '0 25px 60px -15px rgba(0, 20, 50, 0.25), 0 8px 24px -6px rgba(0, 20, 50, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.85), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.25)',
              }}
            >
              {/* Reflejo de luz ambiental superior del cristal (sin rayas diagonales que tapen el texto) */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-white/40 via-white/10 to-transparent rounded-t-[2rem]"
              />

              <motion.div style={{ opacity: reefTextOpacity }} className="relative z-10">
                <h2 className="relative font-serif text-2xl sm:text-3xl md:text-4xl text-[#0d1f2d] tracking-tight leading-[1.12] mb-4 sm:mb-5 font-light">
                  {t({
                    es: 'Proteger los bosques es cuidar el ciclo del agua.',
                    en: 'Protecting forests safeguards the water cycle.',
                  })}
                </h2>

                <p className="relative font-sans text-xs sm:text-sm md:text-base text-[#1e2e38] font-light leading-relaxed">
                  {t({
                    es: 'Los bosques favorecen la infiltración del agua de lluvia, contribuyen a la recarga de acuíferos y regulan los flujos hacia ríos y humedales. Conservarlos permite reducir la erosión, proteger la calidad del agua y mantener el equilibrio hidrológico de nuestros territorios.',
                    en: 'Forests promote rainwater infiltration, contribute to aquifer recharge, and regulate flows toward rivers and wetlands. Conserving them reduces erosion, protects water quality, and maintains the hydrological balance of our territories.',
                  })}
                </p>
              </motion.div>
            </div>

            {/* Tarjeta 2: Restauración territorial y marina — Glassmorphism Líquido Puro */}
            <div
              className="relative w-full md:w-[48%] text-left pointer-events-auto p-7 sm:p-9 md:p-11 rounded-[2rem] overflow-hidden flex flex-col justify-center"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255, 255, 255, 0.68) 0%, rgba(255, 255, 255, 0.42) 50%, rgba(255, 255, 255, 0.58) 100%)',
                backdropFilter: 'blur(28px) saturate(1.7)',
                WebkitBackdropFilter: 'blur(28px) saturate(1.7)',
                border: '1px solid rgba(255, 255, 255, 0.60)',
                boxShadow:
                  '0 25px 60px -15px rgba(0, 20, 50, 0.25), 0 8px 24px -6px rgba(0, 20, 50, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.85), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.25)',
              }}
            >
              {/* Reflejo de luz ambiental superior del cristal (sin rayas diagonales que tapen el texto) */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-white/40 via-white/10 to-transparent rounded-t-[2rem]"
              />

              <motion.div style={{ opacity: reefTextOpacity }} className="relative z-10">
                <h3 className="relative font-serif text-2xl sm:text-3xl md:text-4xl text-[#0d1f2d] font-light leading-[1.12] tracking-tight mb-4 sm:mb-5">
                  {t({
                    es: 'Restauración ecológica y soluciones basadas en la naturaleza.',
                    en: 'Ecological restoration and nature-based solutions.',
                  })}
                </h3>

                <p className="relative font-sans text-xs sm:text-sm md:text-base text-[#1e2e38] font-light leading-relaxed">
                  {t({
                    es: 'En el Consejo Global Ambiental promovemos la restauración de cuencas, ríos y humedales mediante soluciones basadas en la naturaleza que contribuyen a mejorar la calidad del agua, regular los escurrimientos y recuperar la biodiversidad, fortaleciendo la seguridad hídrica y la resiliencia de las comunidades.',
                    en: 'At the Global Environmental Council, we champion the restoration of watersheds, rivers, and wetlands through nature-based solutions that enhance water quality, regulate runoff, and restore biodiversity, strengthening water security and community resilience.',
                  })}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {debugFps && <FpsMeter active={showFrames} />}
      </section>

      {/* CAPÍTULO 3: PROYECTO WESS 2026 */}
      <section id="proyectos" className="pt-36 pb-28 md:pt-44 md:pb-36 px-6 sm:px-12 md:px-20 relative bg-[#f5efe3] border-t border-[#e0d4ba] scroll-mt-28 overflow-hidden min-h-[620px] lg:min-h-[720px] flex items-center">
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[54%] xl:w-[58%] h-full pointer-events-none z-0 overflow-hidden">
          {[
            {
              id: 0,
              webp: '/images/wess/milpa-chinampera.webp',
              fallback: '/images/wess/milpa-chinampera.jpg',
              alt: { es: 'Semillas Nativas - Conservación de la Agrobiodiversidad', en: 'Native Seeds - Agrobiodiversity Conservation' },
            },
            {
              id: 1,
              webp: '/images/wess/educacion-para-la-sostenibilidad.webp',
              fallback: '/images/wess/educacion-para-la-sostenibilidad.jpg',
              alt: { es: 'Educación Ambiental - Educación para la Sostenibilidad', en: 'Environmental Education - Education for Sustainability' },
            },
            {
              id: 2,
              webp: '/images/wess/identidad-comunidad-territorio.webp',
              fallback: '/images/wess/identidad-comunidad-territorio.jpg',
              alt: { es: 'Apropiación Territorial - Identidad, Comunidad y Territorio', en: 'Territorial Stewardship - Identity, Community and Territory' },
            },
            {
              id: 3,
              webp: '/images/wess/reconocimiento-internacional-wess-2026.webp',
              fallback: '/images/wess/reconocimiento-internacional-wess-2026.jpg',
              alt: { es: 'Galardón WESS - Reconocimiento Internacional WESS 2026', en: 'WESS Award - International Recognition WESS 2026' },
            },
          ].map((tabImg) => {
            const isActive = activeTabWess === tabImg.id;
            return (
              <picture key={tabImg.id}>
                <source srcSet={tabImg.webp} type="image/webp" />
                <img
                  src={tabImg.fallback}
                  alt={t(tabImg.alt)}
                  loading="eager"
                  decoding="async"
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-in-out ${
                    isActive
                      ? 'opacity-100 scale-100 z-10'
                      : 'opacity-0 scale-105 pointer-events-none z-0'
                  }`}
                />
              </picture>
            );
          })}

          {/* Overlay suave en Mobile/Tablet que permite apreciar la fotografía manteniendo la legibilidad */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#f5efe3]/80 via-[#f5efe3]/55 to-[#f5efe3]/90 lg:hidden z-20" />
          {/* Overlay en Desktop */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-20" style={{ background: 'linear-gradient(to right, #f5efe3 0%, rgba(245,239,227,0.94) 30%, rgba(245,239,227,0.5) 60%, transparent 90%)' }} />
          <div className="absolute inset-0 pointer-events-none z-20" style={{ background: 'linear-gradient(to bottom, #f5efe3 0%, transparent 10%, transparent 90%, #f5efe3 100%)' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl flex flex-col justify-center">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2d2618] font-light leading-[1.08] mb-6 tracking-tight">
              {t({ es: 'Gobernanza Ambiental para el Hambre Cero', en: 'Environmental Governance for Zero Hunger' })}
            </h2>

            <p className="text-[#6b6048] font-sans text-base sm:text-lg leading-relaxed mb-8 font-light max-w-2xl">
              {t({
                es: 'Iniciativa galardonada durante el Women´s Energy and Sustainability Summit 2026 (WESS 2026) por integrar la conservación de semillas nativas, la educación ambiental y la participación comunitaria para fortalecer la soberanía alimentaria, preservar el patrimonio biocultural y promover la sostenibilidad de los territorios chinamperos.',
                en: 'Initiative awarded during the Women’s Energy and Sustainability Summit 2026 (WESS 2026) for integrating native seed conservation, environmental education, and community participation to strengthen food sovereignty, preserve biocultural heritage, and promote the sustainability of chinampa territories.',
              })}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
              {[
                { id: 0, label: { es: 'Semillas Nativas', en: 'Native Seeds' } },
                { id: 1, label: { es: 'Educación Ambiental', en: 'Environmental Education' } },
                { id: 2, label: { es: 'Apropiación Territorial', en: 'Territorial Stewardship' } },
                { id: 3, label: { es: 'Galardón WESS', en: 'WESS Award' } },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabWess(tab.id)}
                  className={`relative py-2.5 px-3 rounded-xl text-xs font-sans font-semibold transition-colors duration-300 text-center active:scale-[0.97] ${activeTabWess === tab.id
                    ? 'text-[#f5efe3]'
                    : 'text-[#6b6048] hover:text-[#2d2618] bg-[#eae4d2] hover:bg-[#d8ceb6]'
                    }`}
                >
                  {activeTabWess === tab.id && (
                    <motion.span
                      layoutId="wess-tab-active"
                      transition={EASE_SPRING}
                      className="absolute inset-0 rounded-xl bg-[#4a5a22] shadow-[0_6px_20px_-6px_rgba(74,90,34,0.5)]"
                    />
                  )}
                  <span className="relative z-10">{t(tab.label)}</span>
                </button>
              ))}
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-[#eae4d2]/95 sm:bg-[#eae4d2]/85 backdrop-blur-md border border-[#d8ceb6] mb-8 min-h-[135px] flex flex-col justify-center shadow-sm">
              <AnimatePresence mode="wait">
                {activeTabWess === 0 && (
                  <motion.div key="tab0" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                    <h4 className="font-serif text-2xl text-[#2d2618] font-light mb-2">
                      {t({ es: 'Conservación de la Agrobiodiversidad', en: 'Agrobiodiversity Conservation' })}
                    </h4>
                    <p className="text-[#6b6048] text-sm sm:text-base leading-relaxed font-light">
                      {t({
                        es: 'Promovimos el uso y la conservación de semillas nativas como maíz chinampero, chile chicuarote, calabaza pipiana, chilacayote y frijol ayocote, fortaleciendo los saberes ancestrales, la biodiversidad agrícola y la soberanía alimentaria de las comunidades.',
                        en: 'We promoted the use and preservation of native seeds such as chinampero maize, chicuarote chili, pipiana squash, chilacayote, and ayocote bean, strengthening ancestral wisdom, agricultural biodiversity, and the food sovereignty of communities.',
                      })}
                    </p>
                  </motion.div>
                )}
                {activeTabWess === 1 && (
                  <motion.div key="tab1" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                    <h4 className="font-serif text-2xl text-[#2d2618] font-light mb-2">
                      {t({ es: 'Educación para la Sostenibilidad', en: 'Education for Sustainability' })}
                    </h4>
                    <p className="text-[#6b6048] text-sm sm:text-base leading-relaxed font-light">
                      {t({
                        es: 'Beneficiamos a 454 personas a través de 10 cursos y talleres, fortaleciendo sus conocimientos sobre biodiversidad, agricultura sostenible y conservación ambiental, y promoviendo capacidades comunitarias para el cuidado y aprovechamiento responsable de los agroecosistemas.',
                        en: 'We benefited 454 people across 10 courses and workshops, strengthening their knowledge of biodiversity, sustainable agriculture, and environmental conservation, while promoting community capacities for the responsible care and stewardship of agroecosystems.',
                      })}
                    </p>
                  </motion.div>
                )}
                {activeTabWess === 2 && (
                  <motion.div key="tab2" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                    <h4 className="font-serif text-2xl text-[#2d2618] font-light mb-2">
                      {t({ es: 'Identidad, Comunidad y Territorio', en: 'Identity, Community and Territory' })}
                    </h4>
                    <p className="text-[#6b6048] text-sm sm:text-base leading-relaxed font-light">
                      {t({
                        es: 'Desarrollamos 29 actividades de apropiación territorial para fortalecer la identidad comunitaria, recuperar saberes ancestrales y promover la participación colectiva en la conservación del patrimonio biocultural y los agroecosistemas chinamperos.',
                        en: 'We conducted 29 territorial stewardship activities to strengthen community identity, recover ancestral knowledge, and promote collective participation in the conservation of biocultural heritage and chinampa agroecosystems.',
                      })}
                    </p>
                  </motion.div>
                )}
                {activeTabWess === 3 && (
                  <motion.div key="tab3" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                    <h4 className="font-serif text-2xl text-[#2d2618] font-light mb-2">
                      {t({ es: 'Reconocimiento Internacional WESS 2026', en: 'International Recognition WESS 2026' })}
                    </h4>
                    <p className="text-[#6b6048] text-sm sm:text-base leading-relaxed font-light">
                      {t({
                        es: 'El proyecto “Territorios que Alimentan” recibió el reconocimiento “Soluciones que Transforman el Planeta” durante WESS 2026, destacando su contribución a la seguridad alimentaria, la restauración productiva y la gobernanza ambiental comunitaria.',
                        en: 'The "Territories that Nourish" project received the "Solutions that Transform the Planet" recognition during WESS 2026, highlighting its contribution to food security, productive restoration, and community environmental governance.',
                      })}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link to="/proyectos" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#4a5a22] hover:bg-[#3a4a18] text-[#f5efe3] rounded-full font-medium text-[11px] tracking-wider uppercase transition-all shadow-sm hover:shadow">
                {t({ es: 'Conocer el proyecto completo', en: 'Explore the full project' })} &rarr;
              </Link>
              <Link to="/agenda-2030" className="inline-flex items-center px-4 py-2.5 rounded-full text-[11px] uppercase tracking-wider text-[#2d2618] bg-[#eae4d2] hover:bg-[#d8ceb6] transition-colors font-medium border border-[#d8ceb6] shadow-sm">
                {t({ es: 'Metas Agenda 2030', en: 'Agenda 2030 Goals' })}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CAPÍTULO 4: LÍNEAS ESTRATÉGICAS */}
      <section className="relative py-28 px-8 md:px-20 bg-[#f5efe3] border-t border-[#e0d4ba] overflow-hidden">
        <div className="orb orb-moss orb-drift-slow w-[38vw] h-[38vw] max-w-[560px] max-h-[560px] -top-[18%] right-[-6%] opacity-60" aria-hidden />
        <div className="max-w-7xl mx-auto relative">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#2d2618] font-light tracking-tight">
                  {t({ es: 'Líneas Estratégicas Institucionales', en: 'Institutional Strategic Lines' })}
                </h2>
              </div>
              <Link to="/lineas-estrategicas" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#4a5a22] hover:text-[#2d2618] transition-colors group">
                <div>{t({ es: 'Ver todas las líneas de acción', en: 'See all lines of action' })}</div>
                <div className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</div>
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {[
              {
                num: '01',
                tag: { es: 'Gobernanza', en: 'Governance' },
                ods: { es: 'ODS 16 y 17', en: 'SDG 16 & 17' },
                title: { es: 'Gobernanza Ambiental y Política Pública', en: 'Environmental Governance and Public Policy' },
                desc: {
                  es: 'Agendas estratégicas, dictámenes técnicos vinculantes, análisis regulatorio e incidencia pública ante los tres órdenes de gobierno.',
                  en: 'Strategic agendas, binding technical opinions, regulatory analysis and public advocacy before all three levels of government.',
                },
              },
              {
                num: '02',
                tag: { es: 'Resiliencia', en: 'Resilience' },
                ods: { es: 'ODS 13', en: 'SDG 13' },
                title: { es: 'Cambio Climático y Transición Justa', en: 'Climate Change and Just Transition' },
                desc: {
                  es: 'Mitigación, adaptación territorial, soluciones basadas en la naturaleza y gestión integral de riesgos ante eventos climáticos extremos.',
                  en: 'Mitigation, territorial adaptation, nature-based solutions and comprehensive risk management in the face of extreme weather events.',
                },
              },
              {
                num: '03',
                tag: { es: 'Biodiversidad', en: 'Biodiversity' },
                ods: { es: 'ODS 15', en: 'SDG 15' },
                title: { es: 'Conservación y Restauración Ecosistémica', en: 'Conservation and Ecosystem Restoration' },
                desc: {
                  es: 'Reforestación con especies nativas, conectividad biológica, monitoreo de especies clave y restauración de cuencas hidrológicas.',
                  en: 'Reforestation with native species, biological connectivity, monitoring of keystone species and restoration of hydrological basins.',
                },
              },
              {
                num: '04',
                tag: { es: 'Territorio', en: 'Territory' },
                ods: { es: 'ODS 11', en: 'SDG 11' },
                title: { es: 'Ordenamiento Territorial y Cohesión Social', en: 'Territorial Planning and Social Cohesion' },
                desc: {
                  es: 'Defensa del suelo de conservación, prevención de ilícitos ambientales y empoderamiento de núcleos agrarios y asambleas ejidales.',
                  en: 'Defence of conservation land, prevention of environmental crime and empowerment of farming communities and communal assemblies.',
                },
              },
              {
                num: '05',
                tag: { es: 'Metas Globales', en: 'Global Goals' },
                ods: { es: 'Agenda 2030', en: 'Agenda 2030' },
                title: { es: 'Cumplimiento y Auditoría de ODS', en: 'SDG Compliance and Audit' },
                desc: {
                  es: 'Integración transversal de los Objetivos de Desarrollo Sostenible, matrices de indicadores verificables y rendición de cuentas pública.',
                  en: 'Cross-cutting integration of the Sustainable Development Goals, verifiable indicator matrices and public accountability.',
                },
              },
              {
                num: '06',
                tag: { es: 'Alimentación', en: 'Food Systems' },
                ods: { es: 'ODS 2 y Una Salud', en: 'SDG 2 & One Health' },
                title: { es: 'Sistemas Agroalimentarios y Soberanía', en: 'Agri-Food Systems and Sovereignty' },
                desc: {
                  es: 'Prácticas sustentables, protección de semillas nativas, bioinsumos, bienestar animal y circuitos cortos de comercialización justa.',
                  en: 'Sustainable practices, protection of native seeds, bio-inputs, animal welfare and short fair-trade supply chains.',
                },
              },
            ].map((pillar, idx) => (
              <RevealItem key={pillar.num} index={idx}>
                <div className="spotlight group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-[#eae4d2]/50 border border-[#d8ceb6]/80 p-8 hover:-translate-y-1.5 hover:bg-[#f5efe3]/60 hover:shadow-[0_16px_44px_-20px_rgba(45,38,24,0.22)] cursor-pointer transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#7a6e58] group-hover:text-[#4a5a22] transition-colors">{t(pillar.tag)}</div>
                      <div className="font-serif text-3xl font-light text-[#b0a48e] group-hover:text-[#4a5a22] transition-colors leading-none tabular">{pillar.num}</div>
                    </div>
                    <h3 className="font-serif text-2xl text-[#2d2618] font-light mb-3.5 leading-snug group-hover:text-[#3a4a18] transition-colors">{t(pillar.title)}</h3>
                    <p className="text-xs text-[#6b6048] font-light leading-relaxed mb-6 font-sans">{t(pillar.desc)}</p>
                  </div>
                  <div className="pt-4 border-t border-[#d8ceb6]/60 flex items-center justify-between">
                    <div className="text-[11px] font-sans text-[#8a7e68] font-medium">{t(pillar.ods)}</div>
                    <Link to="/lineas-estrategicas" className="text-xs uppercase tracking-wider font-semibold text-[#4a5a22] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <div>{t({ es: 'Detalles', en: 'Details' })}</div>
                      <div>&rarr;</div>
                    </Link>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* CAPÍTULO 5: ECOSISTEMAS */}
      <section id="ecosistemas" className="relative py-28 px-8 md:px-20 overflow-hidden bg-[#f5efe3] border-t border-[#d8ceb6]">
        <div className="orb orb-ocean orb-drift w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] -top-[16%] -left-[10%] opacity-50" aria-hidden />
        <div className="max-w-7xl mx-auto relative">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2d2618] font-light tracking-tight">
                {t({ es: 'Cada bioma cuenta', en: 'Every biome has a story' })}
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#6b6048] font-light max-w-2xl mx-auto font-sans">
                {t({
                  es: 'Intervención estratégica en los biomas más amenazados del planeta mediante ciencia aplicada, gobernanza territorial y monitoreo continuo.',
                  en: 'Strategic intervention in the most threatened biomes on the planet through applied science, territorial governance and continuous monitoring.',
                })}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-5 lg:gap-6">
            {biomesData.map((eco, idx) => {
              const ecoTitle = t(eco.title);
              return (
                <RevealItem
                  key={eco.id}
                  index={idx}
                  className={idx === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
                >
                  <div
                    onClick={() => setSelectedBiome(idx)}
                    className={`group relative overflow-hidden rounded-[2rem] border border-[#d8ceb6]/80 shadow-sm cursor-pointer hover:shadow-[0_28px_70px_-28px_rgba(20,28,16,0.55)] hover:border-[#4a5a22]/60 hover:-translate-y-1.5 active:scale-[0.995] transition-all duration-500 flex flex-col justify-end p-8 ${idx === 0 ? 'h-[520px] lg:h-full min-h-[520px]' : 'h-[250px]'
                      }`}
                  >
                    <img src={eco.cardImg} alt={ecoTitle} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5 transition-opacity duration-500 group-hover:via-black/45" />

                    <div className="relative z-10">
                      <h3 className={`font-serif text-[#f5efe3] font-light mb-4 sm:mb-5 leading-tight ${idx === 0 ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-3xl'
                        }`}>
                        {ecoTitle}
                      </h3>
                      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#f5efe3] group-hover:text-[#cde48e] transition-colors">
                        <span>{t({ es: 'Explorar Inmersión', en: 'Explore Immersion' })}</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
                      </div>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {selectedBiome !== null && (
            <motion.div id="biome-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="fixed inset-0 z-[9999] flex flex-col justify-between overflow-y-auto bg-black text-slate-100">
              {biomesData[selectedBiome].mediaType === 'video' ? (
                <video src={biomesData[selectedBiome].videoSrc} autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover pointer-events-none" />
              ) : (
                <img src={biomesData[selectedBiome].src} alt={t(biomesData[selectedBiome].title)} className="fixed inset-0 w-full h-full object-cover pointer-events-none" />
              )}

              <div className="fixed inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 pointer-events-none" />

              <div className="relative z-20 w-full px-4 sm:px-8 md:px-16 py-4 sm:py-7 flex items-center justify-between pointer-events-auto">
                <div className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#d8ceb6] font-semibold drop-shadow-sm">{t(biomesData[selectedBiome].tag)}</div>

                <div className="hidden md:flex items-center gap-1.5 bg-black/30 p-1.5 rounded-full border border-white/15 backdrop-blur-md">
                  {biomesData.map((b, i) => (
                    <button key={b.id} onClick={() => setSelectedBiome(i)} className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all duration-300 cursor-pointer ${selectedBiome === i ? 'bg-white/25 text-white font-medium border border-white/30 shadow-sm' : 'text-slate-300 hover:text-white'}`}>
                      {t(b.title)}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedBiome(null)}
                  className="group inline-flex items-center gap-2 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 bg-black/50 hover:bg-[#f5efe3] text-[#f5efe3] hover:text-[#2d2618] backdrop-blur-xl border border-white/25 hover:border-[#f5efe3] text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.96] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] cursor-pointer"
                  aria-label={t({ es: 'Cerrar inmersión', en: 'Close immersion' })}
                >
                  <span>{t({ es: 'Cerrar', en: 'Close' })}</span>
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white/15 group-hover:bg-[#2d2618]/10 transition-colors">
                    <svg className="w-2.5 h-2.5 transition-transform duration-300 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                </button>
              </div>

              <div className="relative z-20 max-w-6xl mx-auto w-full px-4 sm:px-8 md:px-16 py-8 md:py-20 flex-1 flex flex-col justify-end">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
                  <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                    <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-tight leading-[1.05]">{t(biomesData[selectedBiome].title)}</h2>
                    <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#d8ceb6] font-light italic leading-snug">&ldquo;{t(biomesData[selectedBiome].subtitle)}&rdquo;</p>
                    <p className="text-xs sm:text-base text-slate-300 font-light leading-relaxed max-w-xl font-sans">{t(biomesData[selectedBiome].desc)}</p>
                    <div className="pt-2 flex items-center gap-4">
                      <Link to="/proyectos" onClick={() => setSelectedBiome(null)} className="inline-flex items-center gap-2 py-2.5 sm:py-3 px-5 sm:px-7 rounded-full bg-[#f5efe3] hover:bg-white text-[#2d2618] font-semibold text-[11px] sm:text-xs uppercase tracking-widest transition-all duration-300 shadow-xl group">
                        <div>{t({ es: 'Ver Proyectos Territoriales', en: 'View Territorial Projects' })}</div>
                        <div className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</div>
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-6 sm:space-y-8 lg:border-l lg:border-white/15 lg:pl-10">
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-6">
                      {biomesData[selectedBiome].metrics.map((m, mIdx) => (
                        <div key={mIdx}>
                          <div className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f5efe3] font-light mb-0.5">{m.val}</div>
                          <div className="text-[11px] sm:text-xs text-slate-400 font-sans font-light tracking-wide">{t(m.label)}</div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-white/10 text-xs text-slate-400 font-light">
                      <span className="text-[#d8ceb6] font-medium">{t({ es: 'Alineación ODS:', en: 'SDG alignment:' })}</span> {t(biomesData[selectedBiome].ods)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* CAPÍTULO 6: LIDERAZGO */}
      <section id="liderazgo" className="relative py-28 px-8 md:px-20 overflow-hidden bg-[#f5efe3] border-t border-[#d8ceb6]">
        <div className="orb orb-bone orb-drift-slow w-[30vw] h-[30vw] max-w-[460px] max-h-[460px] -bottom-[12%] left-[30%] opacity-60" aria-hidden />
        <div className="max-w-7xl mx-auto relative">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-3xl sm:text-5xl text-[#2d2618] font-light mb-4">{t({ es: 'Liderazgo del Consejo Global Ambiental', en: 'Leadership of the Global Environmental Council' })}</h2>
              <p className="text-sm text-[#6b6048] font-light max-w-xl mx-auto leading-relaxed font-sans">{t({ es: 'Órgano colegiado de alta dirección que articula la diplomacia internacional, la investigación científica y la ejecución territorial.', en: 'A senior collegiate body that articulates international diplomacy, scientific research and territorial execution.' })}</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RevealItem index={0} className="h-full">
              <div className="rounded-3xl bg-[#eae4d2]/50 border border-[#d8ceb6]/80 hover:bg-[#f5efe3]/40 hover:backdrop-blur-xl hover:backdrop-saturate-150 hover:border-[#d8ceb6]/60 hover:shadow-[0_8px_30px_rgba(45,38,24,0.06)] hover:-translate-y-1.5 transition-all duration-300 grid grid-cols-1 sm:grid-cols-12 items-stretch h-full overflow-hidden group cursor-pointer">
                <div className="sm:col-span-5 relative w-full h-72 sm:h-auto min-h-[280px] sm:min-h-full sm:self-stretch overflow-hidden bg-[#e0d6be] flex">
                  <img src={luisGarciaImg} alt="Mtro. Luis García González" className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="sm:col-span-7 p-8 sm:p-9 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light leading-snug group-hover:text-[#3a4a18] transition-colors mb-1">Mtro. Luis García González</h3>
                    <p className="text-xs text-[#5a6b2a] font-semibold tracking-wide mb-5">{t({ es: 'Consejero Presidente y Fundador', en: 'President and Founding Councillor' })}</p>
                    <p className="text-xs sm:text-[13px] text-[#6b6048] font-light leading-relaxed mb-6 font-sans">{t({ es: 'Con amplia experiencia en diplomacia multilateral y gobernanza ambiental de alto nivel. Ha impulsado acuerdos vinculantes con organismos internacionales y consolidado marcos de resiliencia ecosistémica.', en: 'With extensive experience in multilateral diplomacy and high-level environmental governance. He has driven binding agreements with international bodies and consolidated ecosystem resilience frameworks.' })}</p>
                  </div>
                  <Link to="/luis-garcia" className="pt-4 border-t border-[#d8ceb6]/60 flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-[#4a5a22] group-hover:text-[#2d2618] transition-colors">
                    <div>{t({ es: 'Conocer semblanza y despacho', en: 'View profile & presidency office' })}</div>
                    <div className="transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</div>
                  </Link>
                </div>
              </div>
            </RevealItem>

            <RevealItem index={1} className="h-full">
              <div className="rounded-3xl bg-[#eae4d2]/50 border border-[#d8ceb6]/80 hover:bg-[#f5efe3]/40 hover:backdrop-blur-xl hover:backdrop-saturate-150 hover:border-[#d8ceb6]/60 hover:shadow-[0_8px_30px_rgba(45,38,24,0.06)] hover:-translate-y-1.5 transition-all duration-300 grid grid-cols-1 sm:grid-cols-12 items-stretch h-full overflow-hidden group cursor-pointer">
                <div className="sm:col-span-5 relative w-full h-72 sm:h-auto min-h-[280px] sm:min-h-full sm:self-stretch overflow-hidden bg-[#e0d6be] flex">
                  <img src={franciscoSolorioImg} alt="Mtro. Francisco Solorio" className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="sm:col-span-7 p-8 sm:p-9 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light leading-snug group-hover:text-[#3a4a18] transition-colors mb-1">Mtro. Francisco Solorio</h3>
                    <p className="text-xs text-[#5a6b2a] font-semibold tracking-wide mb-5">{t({ es: 'Secretario Ejecutivo y Fundador', en: 'Executive Secretary and Founder' })}</p>
                    <p className="text-xs sm:text-[13px] text-[#6b6048] font-light leading-relaxed mb-6 font-sans">{t({ es: 'Especialista en gestión técnica, cooperación territorial y alianzas público-privadas. Encabeza el despliegue operativo en campo, la vinculación con ejidos y comunidades, y la implementación de los proyectos galardonados.', en: 'Specialist in technical management, territorial cooperation and public-private partnerships. He leads field operations, relations with communal landholdings and communities, and the implementation of award-winning projects.' })}</p>
                  </div>
                  <Link to="/francisco-solorio" className="pt-4 border-t border-[#d8ceb6]/60 flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-[#4a5a22] group-hover:text-[#2d2618] transition-colors">
                    <div>{t({ es: 'Conocer semblanza y secretaría', en: 'View profile & executive secretariat' })}</div>
                    <div className="transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</div>
                  </Link>
                </div>
              </div>
            </RevealItem>
          </div>
        </div>
      </section>

      {/* CAPÍTULO 7: IMPACTO — Crónica orgánica */}
      <section id="impacto" className="relative py-28 md:py-36 px-8 md:px-20 overflow-hidden bg-[#f5efe3] border-t border-[#e0d4ba]">
        <div className="orb orb-moss orb-drift w-[44vw] h-[44vw] max-w-[680px] max-h-[680px] -top-[8%] -right-[10%] opacity-40" aria-hidden />
        <div className="orb orb-ocean orb-drift-slow w-[26vw] h-[26vw] max-w-[400px] max-h-[400px] bottom-[-14%] left-[-6%] opacity-25" aria-hidden />
        <div className="max-w-7xl mx-auto w-full relative">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4a5a22] font-normal tracking-tight">
                {t({ es: 'Cifras que transforman el territorio', en: 'Figures that transform the territory' })}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#6b6048] font-light leading-relaxed font-sans max-w-2xl mx-auto">
                {t({
                  es: 'Resultados medibles y presencia activa en campo que respaldan nuestra labor con las comunidades y la regeneración de ecosistemas prioritarios.',
                  en: 'Measurable results and active field presence supporting our work with communities and the regeneration of priority ecosystems.'
                })}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Fotografía orgánica — forma de blob */}
            <Reveal y={24} className="relative">
              <div className="relative mx-auto w-full max-w-[620px]">
                <div className="orb orb-bone orb-drift w-[74%] h-[74%] -top-[9%] -right-[9%] opacity-80" aria-hidden />
                <div
                  className="relative w-full h-[500px] sm:h-[540px] md:h-[580px] overflow-hidden shadow-[0_40px_90px_-45px_rgba(45,38,24,0.55)]"
                  style={{ borderRadius: '60% 42% 16% 14% / 48% 44% 14% 18%' }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=85&fit=crop&auto=format"
                    alt={t({ es: 'Trabajo de campo de conservación territorial', en: 'Territorial conservation fieldwork' })}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                  />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(20,16,10,0.75) 0%, rgba(20,16,10,0.25) 35%, transparent 65%)' }} />
                  <div className="absolute inset-x-0 bottom-0 px-[10%] md:px-[11%] pb-[17%] pointer-events-none">
                    <p className="font-serif text-xl md:text-2xl lg:text-[26px] text-[#f5efe3] font-light leading-snug max-w-md" style={{ textShadow: '0 1px 14px rgba(45,38,24,0.45)' }}>
                      {t({ es: '«El territorio se mide con recorridos, semillas y manos que siembran.»', en: '“A territory is measured in walks, in seeds and in hands that sow.”' })}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Cifras orgánicas sin tarjetas */}
            <div className="max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 sm:gap-y-12">
                {[
                  {
                    num: '16,890+',
                    label: { es: 'Personas beneficiarias', en: 'Beneficiaries' },
                    desc: { es: 'Familias campesinas y comunidades vinculadas a proyectos activos.', en: 'Rural families and communities engaged in active projects.' },
                  },
                  {
                    num: '1,500+',
                    label: { es: 'Semillas nativas', en: 'Native seeds' },
                    desc: { es: 'Variedades criollas conservadas en bancos comunitarios.', en: 'Heirloom varieties preserved in community seed banks.' },
                  },
                  {
                    num: '44',
                    label: { es: 'Recorridos en campo', en: 'Field expeditions' },
                    desc: { es: 'Inspecciones técnicas directas en cuencas prioritarias.', en: 'Direct technical inspections across key hydrological basins.' },
                  },
                  {
                    num: '31k+',
                    label: { es: 'Alcance territorial', en: 'Outreach reach' },
                    desc: { es: 'Impacto en jornadas de divulgación y educación ambiental.', en: 'People reached via outreach and environmental education.' },
                  },
                ].map((s, idx) => (
                  <RevealItem key={idx} index={idx} step={0.06}>
                    <Link
                      to="/proyectos"
                      className="group block active:scale-[0.99] transition-transform"
                    >
                      <div className="font-serif text-4xl sm:text-5xl lg:text-[50px] text-[#2d2618] font-light leading-none tracking-tight tabular group-hover:text-[#4a5a22] transition-colors">
                        {s.num}
                      </div>
                      <div className="h-0.5 w-8 bg-[#4a5a22]/35 my-3 transition-all duration-300 group-hover:w-12 group-hover:bg-[#4a5a22]" />
                      <h3 className="font-sans text-sm sm:text-base font-semibold text-[#2d2618] leading-snug">
                        {t(s.label)}
                      </h3>
                      <p className="font-sans text-xs text-[#7a6e58] font-light leading-relaxed mt-1.5">
                        {t(s.desc)}
                      </p>
                    </Link>
                  </RevealItem>
                ))}
              </div>

              <Reveal delay={0.2}>
                <div className="mt-12 pt-2">
                  <Link
                    to="/proyectos"
                    className="group inline-flex items-center gap-3 rounded-full bg-[#4a5a22] py-3 pl-7 pr-2.5 text-xs uppercase tracking-[0.16em] font-semibold text-[#f5efe3] transition-all duration-300 hover:bg-[#384519] active:scale-[0.98] shadow-[0_12px_28px_-10px_rgba(51,66,21,0.5)] cursor-pointer"
                  >
                    <span>{t({ es: 'Ver proyectos y resultados', en: 'View projects & results' })}</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5efe3]/12 ring-1 ring-[#f5efe3]/20 transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CAPÍTULO 8: MANIFIESTO */}
      <section id="manifiesto" className="py-24 sm:py-32 md:py-36 px-6 sm:px-12 md:px-20 relative bg-[#f5efe3] border-t border-[#e0d4ba] overflow-hidden">
        <div className="orb orb-moss orb-drift w-[42vw] h-[42vw] max-w-[560px] max-h-[560px] -top-[14%] -right-[10%] opacity-30" aria-hidden />
        <div className="orb orb-bone orb-drift-slow w-[32vw] h-[32vw] max-w-[440px] max-h-[440px] bottom-[-16%] -left-[8%] opacity-35" aria-hidden />

        <div className="max-w-3xl mx-auto w-full relative z-10">
          {/* TÍTULO Y PEQUEÑA DESCRIPCIÓN */}
          <Reveal>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-[54px] text-[#2d2618] font-light tracking-tight leading-[1.08]">
                {t({ es: 'Firmemos el Manifiesto ', en: 'Let us sign the Manifesto ' })}
                <span className="italic font-normal text-[#4a5a22]">
                  {t({ es: 'por la Tierra.', en: 'for the Earth.' })}
                </span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#5a4f3b] font-light leading-relaxed font-sans max-w-xl mx-auto">
                {t({
                  es: 'Súmate a la red de personas, especialistas e instituciones que impulsan la gobernanza y protección de nuestra biosfera.',
                  en: 'Join the network of people, specialists and institutions driving the governance and protection of our biosphere.'
                })}
              </p>
            </div>
          </Reveal>

          {/* FORMULARIO EDITORIAL INTEGRADO */}
          <Reveal y={24} delay={0.08}>
            <form onSubmit={handlePledge} className="max-w-2xl mx-auto space-y-10 sm:space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-9">
                <div className="group border-b border-[#cfc3a9] hover:border-[#b8a98b] pb-3 transition-colors duration-300 focus-within:border-[#4a5a22]">
                  <label className="block text-[11px] uppercase tracking-[0.22em] font-sans font-semibold text-[#5a6b2a] group-focus-within:text-[#384519] transition-colors mb-2">
                    {t({ es: 'Nombre o Institución', en: 'Name or Institution' })}
                  </label>
                  <input
                    type="text"
                    required
                    value={pledgeName}
                    onChange={(e) => setPledgeName(e.target.value)}
                    placeholder={t({ es: 'Tu nombre completo o entidad', en: 'Your full name or organization' })}
                    className="w-full bg-transparent font-serif text-lg sm:text-xl text-[#221c12] placeholder-[#a6997f]/65 outline-none"
                  />
                </div>

                <div className="group border-b border-[#cfc3a9] hover:border-[#b8a98b] pb-3 transition-colors duration-300 focus-within:border-[#4a5a22]">
                  <label className="block text-[11px] uppercase tracking-[0.22em] font-sans font-semibold text-[#5a6b2a] group-focus-within:text-[#384519] transition-colors mb-2">
                    {t({ es: 'Correo Electrónico', en: 'Email Address' })}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contacto@organizacion.org"
                    className="w-full bg-transparent font-serif text-lg sm:text-xl text-[#221c12] placeholder-[#a6997f]/65 outline-none"
                  />
                </div>
              </div>

              <div className="group border-b border-[#cfc3a9] hover:border-[#b8a98b] pb-3 transition-colors duration-300 focus-within:border-[#4a5a22] relative">
                <label className="block text-[11px] uppercase tracking-[0.22em] font-sans font-semibold text-[#5a6b2a] group-focus-within:text-[#384519] transition-colors mb-2">
                  {t({ es: 'Tu Compromiso Principal', en: 'Your Main Commitment' })}
                </label>
                <select
                  className="w-full cursor-pointer appearance-none bg-transparent font-serif text-base sm:text-lg text-[#221c12] pr-10 outline-none"
                  defaultValue="forest"
                >
                  <option value="forest" className="bg-[#f5efe3] text-[#2d2618]">{t({ es: 'Protección y Reforestación de Bosques Nativos', en: 'Protection and Reforestation of Native Forests' })}</option>
                  <option value="ocean" className="bg-[#f5efe3] text-[#2d2618]">{t({ es: 'Conservación de Océanos y Arrecifes Marinos', en: 'Conservation of Oceans and Marine Reefs' })}</option>
                  <option value="soil" className="bg-[#f5efe3] text-[#2d2618]">{t({ es: 'Regeneración y Salud del Suelo de Conservación', en: 'Regeneration and Health of Conservation Land' })}</option>
                  <option value="education" className="bg-[#f5efe3] text-[#2d2618]">{t({ es: 'Conciencia, Investigación y Educación Ambiental', en: 'Awareness, Research and Environmental Education' })}</option>
                </select>
                <div className="pointer-events-none absolute right-0 bottom-4 text-[#4a5a22]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="pt-4 text-center">
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-4 rounded-full bg-gradient-to-r from-[#44531f] via-[#4d5f24] to-[#3a471a] hover:from-[#364218] hover:via-[#42521e] hover:to-[#2d3813] border border-[#6b7e36]/30 py-4 px-10 text-[#fbf9f4] font-sans text-xs uppercase tracking-[0.2em] font-semibold shadow-[0_16px_38px_-12px_rgba(55,70,22,0.5)] hover:shadow-[0_20px_45px_-12px_rgba(55,70,22,0.65)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
                >
                  <span>{t({ es: 'Firmar el Manifiesto por la Tierra', en: 'Sign the Manifesto for the Earth' })}</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30 transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </button>
                <p className="mt-4 text-center text-xs text-[#7a6e58] font-sans font-light">
                  {t({
                    es: 'Tu adhesión respalda las metas de restauración y gobernanza territorial 2026.',
                    en: 'Your accession supports the 2026 territorial restoration and governance goals.'
                  })}
                </p>
              </div>
            </form>

            <AnimatePresence>
              {pledgeSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-10 py-6 px-6 text-center font-sans max-w-xl mx-auto"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#4a5a22] text-[#f5efe3] shadow-[0_8px_20px_-6px_rgba(51,66,21,0.6)]">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-serif text-2xl text-[#2d2618] mb-1 font-light">
                    {t({ es: 'Compromiso registrado', en: 'Commitment registered' })}
                  </h4>
                  <p className="text-sm text-[#4a5a22] font-medium">
                    {t({ es: 'Gracias', en: 'Thank you' })}{pledgeName ? `, ${pledgeName}` : ''}. {t({ es: 'Tu adhesión institucional ha sido formalizada.', en: 'Your institutional accession has been formalized.' })}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </section>

      <FooterNav />
    </main>
  );
}