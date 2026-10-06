import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useTransform, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import FooterNav from './FooterNav.jsx';
import CanvasFrameSequence from './CanvasFrameSequence.jsx';
import FpsMeter from './FpsMeter.jsx';
import Reveal, { RevealItem } from './Reveal.jsx';
import franciscoSolorioImg from '../imports/Perfiles/FranciscoSolorio.png';
import { useI18n } from '../i18n/index.jsx';

const EASE_SPRING = { type: 'spring', stiffness: 340, damping: 30 };

export default function EditorialOverlay({
  isLoaded,
  scrollProgress
}) {
  const { t } = useI18n();
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
      videoSrc: '/video/video loop.mp4',
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

  // ✅ NUEVO: MotionValues creados manualmente, actualizados en el rAF loop
  // de la sección `interdependencia`. Sin `useScroll` de Framer Motion.
  const interScrollMV = useMotionValue(0);
  const scrubTargetRef = useRef(0);
  const phaseRef = useRef(0);
  const framePosRef = useRef(0);
  const TOTAL_VIDEO_FRAMES = 153;

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
  const PHASE_3_START = 0.70;
  const HYSTERESIS = 0.025;

  // Opacidades basadas en interScrollMV
  const stoneTextOpacity = useTransform(interScrollMV, [0, 0.02, 0.10], [1, 1, 0]);
  const reefTextOpacity = useTransform(interScrollMV, [0, 0.64, 0.70, 0.95, 1], [0, 0, 1, 1, 0]);

  const [showFrames, setShowFrames] = useState(false);
  const [showLoopVideo, setShowLoopVideo] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
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
    if (next === 0) {
      setShowFrames(false);
      setShowLoopVideo(false);
    } else if (next === 1) {
      setShowFrames(true);
      setShowLoopVideo(false);
    } else {
      setShowFrames(false);
      setShowLoopVideo(true);
    }
  };

  // ✅ NUEVO: rAF loop que lee el progreso de la sección directamente
  // del DOM y actualiza interScrollMV + scrubTargetRef + fase.
  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = requestAnimationFrame(update);

      const el = interdependenciaRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollableHeight = rect.height - vh;
      if (scrollableHeight <= 0) return;

      const scrolled = Math.max(0, -rect.top);
      const raw = scrolled / scrollableHeight;
      const progress = Math.max(0, Math.min(1, isFinite(raw) ? raw : 0));

      // Actualizar el MotionValue (alimenta useTransform para las opacidades)
      interScrollMV.set(progress);

      // Actualizar scrubTargetRef directamente (sin pasar por useMotionValueEvent)
      if (progress <= PHASE_2_START) {
        scrubTargetRef.current = 0;
      } else if (progress < PHASE_3_START) {
        const t = (progress - PHASE_2_START) / (PHASE_3_START - PHASE_2_START);
        scrubTargetRef.current = Math.max(0, Math.min(1, isFinite(t) ? t : 0));
      } else {
        scrubTargetRef.current = 1;
      }

      // Suavizado del playhead y cómputo de frame entero (1..153)
      const dr = 0.20;
      framePosRef.current += (scrubTargetRef.current - framePosRef.current) * dr;
      if (progress <= PHASE_2_START) framePosRef.current = 0;
      else if (progress >= PHASE_3_START) framePosRef.current = 1;

      let frame = 1 + Math.round(framePosRef.current * (TOTAL_VIDEO_FRAMES - 1));
      frame = Math.max(1, Math.min(TOTAL_VIDEO_FRAMES, frame));
      setCurrentFrame((prev) => (prev === frame ? prev : frame));

      if (window.__videoScrubDebug) {
        window.__videoScrubDebug.playhead = scrubTargetRef.current;
        window.__videoScrubDebug.frame = frame;
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
        // Control del video del arrecife (solo al transicionar de fase)
        if (videoLoopRef.current) {
          if (next === 2) {
            const p = videoLoopRef.current.play();
            if (p && typeof p.catch === 'function') p.catch(() => { });
          } else {
            videoLoopRef.current.pause();
          }
        }
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
        className="min-h-[100dvh] h-[100dvh] w-full relative flex flex-col justify-between px-5 sm:px-10 md:px-16 lg:px-20 pt-20 sm:pt-28 pb-6 sm:pb-8 md:pb-10 overflow-hidden bg-[#f5efe3]"
      >
        {/* Atmósfera ambiental — orbes difuminados que respiran */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="orb orb-moss orb-drift w-[50vw] sm:w-[42vw] h-[50vw] sm:h-[42vw] max-w-[620px] max-h-[620px] -top-[14%] -right-[10%]" />
          <div className="orb orb-ocean orb-drift-slow w-[40vw] sm:w-[34vw] h-[40vw] sm:h-[34vw] max-w-[520px] max-h-[520px] bottom-[-18%] left-[-8%]" />
          <div className="orb orb-bone orb-drift w-[30vw] sm:w-[26vw] h-[30vw] sm:h-[26vw] max-w-[400px] max-h-[400px] top-[32%] left-[26%] opacity-70" />
        </div>

        {/* Fade inferior sutil (detrás de la rama para no empañarla ni cortarla) */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-16 sm:h-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to top, #f5efe3 0%, rgba(245,239,227,0.4) 50%, transparent 100%)' }} />

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
          {/* Capa Base: Imagen activa actual */}
          <img
            src={activeBaseLayer === 1 ? '/imagenes/Rama 1.svg' : '/imagenes/Rama 2.svg'}
            alt={activeBaseLayer === 1 ? t({ es: 'Rama con Follaje', en: 'Canopy Branch with Foliage' }) : t({ es: 'Rama sin Follaje (Estructura Leñosa)', en: 'Bare Wood Branch Structure' })}
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
              src={activeBaseLayer === 1 ? '/imagenes/Rama 2.svg' : '/imagenes/Rama 1.svg'}
              alt={activeBaseLayer === 1 ? t({ es: 'Rama sin Follaje (Estructura Leñosa)', en: 'Bare Wood Branch Structure' }) : t({ es: 'Rama con Follaje', en: 'Canopy Branch with Foliage' })}
              className="hero-branch-img"
              draggable={false}
            />
          </div>
        </motion.div>

        {/* Fila Principal: Columna Izquierda con el Titular Centrado Verticalmente */}
        <div className="relative z-30 w-full max-w-[1440px] mx-auto flex flex-col items-start justify-center my-auto select-none">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-left tracking-[-0.025em] leading-[0.93] max-w-2xl lg:max-w-[50%]"
          >
            <span className="block font-light text-[#2d2618] text-[clamp(2.75rem,7.8vw,6.2rem)] leading-[0.95]">
              {t('hero.line1')}
            </span>
            <span className="block font-serif italic font-normal text-[#4a5a22] text-[clamp(2.5rem,7.2vw,5.8rem)] leading-[0.98] mt-1.5 sm:mt-2.5">
              {t('hero.line2')}
            </span>
          </motion.h1>
        </div>

        {/* Capa Dinámica: Letras Blancas activas ÚNICAMENTE donde se tocan con la silueta de Rama 2 cuando esta está en primer plano */}
        {activeBaseLayer === 2 && (
          <div
            aria-hidden="true"
            className="hero-mask-layer absolute inset-0 z-35 pointer-events-none flex flex-col justify-between px-5 sm:px-10 md:px-16 lg:px-20 pt-20 sm:pt-28 pb-6 sm:pb-8 md:pb-10 overflow-hidden"
          >
            <div className="w-full max-w-[1440px] mx-auto opacity-0" />
            <div className="relative w-full max-w-[1440px] mx-auto flex flex-col items-start justify-center my-auto select-none">
              <div className="font-serif text-left tracking-[-0.025em] leading-[0.93] max-w-2xl lg:max-w-[50%]">
                <span className="block font-light text-white text-[clamp(2.75rem,7.8vw,6.2rem)] leading-[0.95] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  {t('hero.line1')}
                </span>
                <span className="block font-serif italic font-normal text-white text-[clamp(2.5rem,7.2vw,5.8rem)] leading-[0.98] mt-1.5 sm:mt-2.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  {t('hero.line2')}
                </span>
              </div>
            </div>
            <div className="relative w-full max-w-[1440px] mx-auto flex items-center justify-start pb-2 opacity-0 select-none">
              <div className="inline-flex items-center gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8" />
                <span className="text-[10px] sm:text-xs">Scroll</span>
              </div>
            </div>
          </div>
        )}

        {/* Fila Inferior: Solo Scroll down pill a la izquierda (Sin línea divisoria ni 20-26) */}
        <div className="relative z-30 w-full max-w-[1440px] mx-auto flex items-center justify-start pb-1 sm:pb-2 select-none">
          <Reveal y={15} delay={0.4}>
            <a
              href="#interdependencia"
              className="inline-flex items-center gap-2.5 sm:gap-3 group cursor-pointer text-[#4a3f2d] hover:text-[#140f08] transition-colors duration-300"
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
      </section>

      {/* CAPÍTULO 2 */}
      <section
        id="interdependencia"
        ref={interdependenciaRef}
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
            <img
              src="/VideoFrames/frame_001.jpg"
              alt={t({ es: 'Piedra Ecosistémica', en: 'Ecosystem Rock' })}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                opacity: showFrames ? 0 : 1,
                visibility: showFrames ? 'hidden' : 'visible',
              }}
            />

            <CanvasFrameSequence
              currentFrame={currentFrame}
              totalFrames={TOTAL_VIDEO_FRAMES}
              showFrames={showFrames && !showLoopVideo}
              showLoopVideo={false}
            />

            <video
              ref={videoLoopRef}
              src="/video/video loop.mp4"
              loop
              muted
              playsInline
              preload="auto"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                opacity: showLoopVideo ? 1 : 0,
                visibility: showLoopVideo ? 'visible' : 'hidden',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            />
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
            className={`w-full max-w-[1400px] flex flex-col md:flex-row items-stretch justify-between gap-4 sm:gap-8 absolute inset-x-0 mx-auto z-20 pointer-events-none px-4 sm:px-8 md:px-12 ${reefVisible ? '' : 'invisible'}`}
          >
            {/* Tarjeta 1: Nuestra misión con el océano — Estilo Cálido de Vidrio Líquido */}
            <div
              className="relative w-full md:w-[48%] lg:w-[45%] text-left pointer-events-auto p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl overflow-hidden"
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

              <motion.div style={{ opacity: reefTextOpacity }} className="relative z-10">
                <h2 className="relative font-serif text-2xl sm:text-4xl md:text-5xl text-[#2d2618] tracking-tight leading-[1.06] mb-3 sm:mb-5 font-light">
                  {t({ es: 'Lo que cuidamos en tierra respira bajo el agua.', en: 'What we protect on land breathes underwater.' })}
                </h2>

                <p className="relative font-sans text-xs sm:text-base text-[#6b6048] font-light leading-relaxed">
                  {t({
                    es: 'En la inmensidad del océano, la luz del sol baila entre los arrecifes y el fitoplancton genera el aliento de nuestro planeta. Proteger los bosques y frenar la escorrentía es proteger la continuidad de los corales y la vida marina.',
                    en: 'In the ocean’s depth, sunlight dances through coral reefs and phytoplankton generates the planet’s breath. Safeguarding forests and curbing runoff sustains corals and marine life.',
                  })}
                </p>
              </motion.div>
            </div>

            {/* Tarjeta 2: Restauración territorial y marina — Estilo Cálido de Vidrio Líquido */}
            <div
              className="relative w-full md:w-[46%] lg:w-[43%] text-left pointer-events-auto p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl overflow-hidden"
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

              <motion.div style={{ opacity: reefTextOpacity }} className="relative z-10">
                <h3 className="relative font-serif text-2xl sm:text-4xl text-[#2d2618] font-light leading-[1.08] mb-3 sm:mb-5">
                  {t({ es: 'Restauración territorial y marina.', en: 'Territorial and marine restoration.' })}
                </h3>

                <p className="relative font-sans text-xs sm:text-base text-[#6b6048] font-light leading-relaxed">
                  {t({
                    es: 'Protegemos las cuencas altas que nutren a los arrecifes costeros mediante monitoreo continuo y gobernanza compartida con comunidades locales para preservar los santuarios marinos.',
                    en: 'We protect the upper watersheds that feed coastal reefs through continuous monitoring and shared governance with local communities to preserve marine sanctuaries.',
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
          <AnimatePresence mode="wait">
            <motion.img
              key={activeTabWess}
              src={
                activeTabWess === 0
                  ? "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1800&h=1400&fit=crop&auto=format"
                  : activeTabWess === 1
                    ? "https://images.unsplash.com/photo-1511497584788-87676104235f?w=1800&h=1400&fit=crop&auto=format"
                    : activeTabWess === 2
                      ? "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1800&h=1400&fit=crop&auto=format"
                      : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&h=1400&fit=crop&auto=format"
              }
              alt={t({ es: 'Proyecto Insignia Gobernanza Ambiental', en: 'Flagship Environmental Governance Project' })}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Overlay suave en Mobile/Tablet que permite apreciar la fotografía manteniendo la legibilidad */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#f5efe3]/80 via-[#f5efe3]/55 to-[#f5efe3]/90 lg:hidden" />
          {/* Overlay en Desktop */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, #f5efe3 0%, rgba(245,239,227,0.94) 30%, rgba(245,239,227,0.5) 60%, transparent 90%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #f5efe3 0%, transparent 10%, transparent 90%, #f5efe3 100%)' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl flex flex-col justify-center">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2d2618] font-light leading-[1.08] mb-6 tracking-tight">
              {t({ es: 'Gobernanza Ambiental para el Hambre Cero', en: 'Environmental Governance for Zero Hunger' })}
            </h2>

            <p className="text-[#6b6048] font-sans text-base sm:text-lg leading-relaxed mb-8 font-light max-w-2xl">
              {t({
                es: 'Iniciativa galardonada en la Cumbre Mundial de Sostenibilidad 2026 por fusionar la restauración biocultural, la soberanía alimentaria y la protección satelital comunitaria en un solo modelo territorial.',
                en: 'Award-winning initiative at the 2026 World Sustainability Summit for bringing biocultural restoration, food sovereignty and community satellite protection together into a single territorial model.',
              })}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
              {[
                { id: 0, label: { es: 'Semillas Nativas', en: 'Native Seeds' } },
                { id: 1, label: { es: 'Monitoreo Satelital', en: 'Satellite Monitoring' } },
                { id: 2, label: { es: 'Gobernanza Ejidal', en: 'Communal Governance' } },
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
                    <h4 className="font-serif text-2xl text-[#2d2618] font-light mb-2">{t({ es: 'Bancos Comunitarios de Germoplasma', en: 'Community Germplasm Banks' })}</h4>
                    <p className="text-[#6b6048] text-sm sm:text-base leading-relaxed font-light">
                      {t({
                        es: 'Preservamos más de 1,500 variedades de semillas nativas de maíz, frijol y hortalizas criollas adaptadas al cambio climático, asegurando la autonomía alimentaria de 14 pueblos originarios.',
                        en: 'We preserve more than 1,500 varieties of native maize, bean and heirloom vegetable seeds adapted to climate change, ensuring food autonomy for 14 indigenous peoples.',
                      })}
                    </p>
                  </motion.div>
                )}
                {activeTabWess === 1 && (
                  <motion.div key="tab1" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                    <h4 className="font-serif text-2xl text-[#2d2618] font-light mb-2">{t({ es: 'Monitoreo Satelital y Alertas Tempranas', en: 'Satellite Monitoring and Early Warnings' })}</h4>
                    <p className="text-[#6b6048] text-sm sm:text-base leading-relaxed font-light">
                      {t({
                        es: 'Detección en tiempo real vinculada a brigadas territoriales que detienen la tala clandestina y quemas descontroladas antes de que penetren las zonas núcleo protegidas.',
                        en: 'Real-time detection linked to territorial brigades that halt illegal logging and uncontrolled fires before they reach protected core zones.',
                      })}
                    </p>
                  </motion.div>
                )}
                {activeTabWess === 2 && (
                  <motion.div key="tab2" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                    <h4 className="font-serif text-2xl text-[#2d2618] font-light mb-2">{t({ es: 'Cohesión Territorial y Asambleas Comunitarias', en: 'Territorial Cohesion and Community Assemblies' })}</h4>
                    <p className="text-[#6b6048] text-sm sm:text-base leading-relaxed font-light">
                      {t({
                        es: 'Mecanismos de consulta previa e informada que reconocen legalmente a los ejidatarios y comuneros como guardianes soberanos de los corredores ecológicos.',
                        en: 'Prior and informed consultation mechanisms that legally recognise communal landholders as sovereign guardians of ecological corridors.',
                      })}
                    </p>
                  </motion.div>
                )}
                {activeTabWess === 3 && (
                  <motion.div key="tab3" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                    <h4 className="font-serif text-2xl text-[#2d2618] font-light mb-2">{t({ es: 'Reconocimiento Global WESS 2026', en: 'WESS 2026 Global Recognition' })}</h4>
                    <p className="text-[#6b6048] text-sm sm:text-base leading-relaxed font-light">
                      {t({
                        es: 'Distinción internacional otorgada en Ginebra como una de las 10 mejores iniciativas globales que articulan simultáneamente soberanía alimentaria y mitigación climática.',
                        en: 'International distinction awarded in Geneva as one of the 10 best global initiatives simultaneously advancing food sovereignty and climate mitigation.',
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
                <div className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#7a6e58] font-sans font-semibold">
                  <span className="h-px w-10 bg-[#4a5a22]/40" />
                  {t({ es: 'Seis frentes de actuación', en: 'Six areas of action' })}
                </div>
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
            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#2d2618] font-light tracking-tight">{t({ es: 'Cada bioma cuenta', en: 'Every biome has a story' })}</h2>
              </div>
              <div className="max-w-md">
                <p className="text-sm leading-relaxed text-[#6b6048] font-light">
                  {t({
                    es: 'Intervención estratégica en los biomas más amenazados del planeta mediante ciencia aplicada, gobernanza territorial y monitoreo continuo.',
                    en: 'Strategic intervention in the most threatened biomes on the planet through applied science, territorial governance and continuous monitoring.',
                  })}
                </p>
              </div>
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
                      <div className="text-[11px] uppercase tracking-[0.25em] text-[#d8ceb6] font-semibold mb-2">{t(eco.tag)}</div>
                      <h3 className={`font-serif text-[#f5efe3] font-light mb-3 leading-tight ${idx === 0 ? 'text-4xl sm:text-5xl' : 'text-2xl'
                        }`}>
                        {idx === 0 ? ecoTitle.split(' ')[0] : ''}
                        <span>{idx === 0 ? ' ' + ecoTitle.split(' ').slice(1).join(' ') : ecoTitle}</span>
                      </h3>
                      <p className={`text-xs text-slate-300 font-light leading-relaxed mb-6 ${idx === 0 ? 'max-w-md line-clamp-3' : 'hidden sm:line-clamp-1'
                        }`}>{t(eco.alert)}</p>
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
              <div className="rounded-3xl bg-[#eae4d2]/50 border border-[#d8ceb6]/80 hover:bg-[#f5efe3]/40 hover:backdrop-blur-xl hover:backdrop-saturate-150 hover:border-[#d8ceb6]/60 hover:shadow-[0_8px_30px_rgba(45,38,24,0.06)] hover:-translate-y-1.5 transition-all duration-300 grid grid-cols-1 sm:grid-cols-12 overflow-hidden group cursor-pointer">
                <div className="sm:col-span-5 h-64 sm:h-full min-h-[260px] relative overflow-hidden bg-[#e0d6be]">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&auto=format" alt="Mtro. Luis García González" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="sm:col-span-7 p-8 sm:p-9 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light leading-snug group-hover:text-[#3a4a18] transition-colors mb-1">Mtro. Luis García González</h3>
                    <p className="text-xs text-[#5a6b2a] font-semibold tracking-wide mb-5">{t({ es: 'Consejero Presidente y Fundador', en: 'President and Founding Councillor' })}</p>
                    <p className="text-xs sm:text-[13px] text-[#6b6048] font-light leading-relaxed mb-6 font-sans">{t({ es: 'Con amplia experiencia en diplomacia multilateral y gobernanza ambiental de alto nivel. Ha impulsado acuerdos vinculantes con organismos internacionales y consolidado marcos de resiliencia ecosistémica.', en: 'With extensive experience in multilateral diplomacy and high-level environmental governance. He has driven binding agreements with international bodies and consolidated ecosystem resilience frameworks.' })}</p>
                  </div>
                  <Link to="/gobernanza" className="pt-4 border-t border-[#d8ceb6]/60 flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-[#4a5a22] group-hover:text-[#2d2618] transition-colors">
                    <div>{t({ es: 'Conocer trayectoria institucional', en: 'View institutional track record' })}</div>
                    <div className="transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</div>
                  </Link>
                </div>
              </div>
            </RevealItem>

            <RevealItem index={1} className="h-full">
              <div className="rounded-3xl bg-[#eae4d2]/50 border border-[#d8ceb6]/80 hover:bg-[#f5efe3]/40 hover:backdrop-blur-xl hover:backdrop-saturate-150 hover:border-[#d8ceb6]/60 hover:shadow-[0_8px_30px_rgba(45,38,24,0.06)] hover:-translate-y-1.5 transition-all duration-300 grid grid-cols-1 sm:grid-cols-12 overflow-hidden group cursor-pointer">
                <div className="sm:col-span-5 h-64 sm:h-full min-h-[260px] relative overflow-hidden bg-[#e0d6be]">
                  <img src={franciscoSolorioImg} alt="Mtro. Francisco Solorio" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="sm:col-span-7 p-8 sm:p-9 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light leading-snug group-hover:text-[#3a4a18] transition-colors mb-1">Mtro. Francisco Solorio</h3>
                    <p className="text-xs text-[#5a6b2a] font-semibold tracking-wide mb-5">{t({ es: 'Secretario Ejecutivo y Fundador', en: 'Executive Secretary and Founder' })}</p>
                    <p className="text-xs sm:text-[13px] text-[#6b6048] font-light leading-relaxed mb-6 font-sans">{t({ es: 'Especialista en gestión técnica, cooperación territorial y alianzas público-privadas. Encabeza el despliegue operativo en campo, la vinculación con ejidos y comunidades, y la implementación de los proyectos galardonados.', en: 'Specialist in technical management, territorial cooperation and public-private partnerships. He leads field operations, relations with communal landholdings and communities, and the implementation of award-winning projects.' })}</p>
                  </div>
                  <Link to="/gobernanza" className="pt-4 border-t border-[#d8ceb6]/60 flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-[#4a5a22] group-hover:text-[#2d2618] transition-colors">
                    <div>{t({ es: 'Conocer coordinación operativa', en: 'View operational coordination' })}</div>
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
            <div className="mb-14 md:mb-20">
              <h2 className="font-serif text-3xl sm:text-5xl text-[#2d2618] font-light tracking-tight">{t({ es: 'Cifras que transforman el territorio', en: 'Figures that transform the territory' })}</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Fotografía orgánica — forma de blob */}
            <Reveal y={24} className="relative">
              <div className="relative mx-auto w-full max-w-[620px]">
                <div className="orb orb-bone orb-drift w-[74%] h-[74%] -top-[9%] -right-[9%] opacity-80" aria-hidden />
                <div
                  className="relative overflow-hidden shadow-[0_40px_90px_-45px_rgba(45,38,24,0.55)]"
                  style={{ borderRadius: '60% 42% 16% 14% / 48% 44% 14% 18%', minHeight: '470px' }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=85&fit=crop&auto=format"
                    alt={t({ es: 'Trabajo de campo de conservación territorial', en: 'Territorial conservation fieldwork' })}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(45,38,24,0.82) 0%, rgba(45,38,24,0.22) 42%, transparent 70%)' }} />
                  <div className="absolute inset-x-0 bottom-0 px-[10%] md:px-[11%] pb-[17%]">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="h-px w-9 bg-[#f5efe3]/90" />
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#f5efe3] font-sans font-semibold">{t({ es: 'En campo · Cuenca del Lerma', en: 'In the field · Lerma Basin' })}</span>
                    </div>
                    <p className="font-serif text-xl md:text-2xl lg:text-[26px] text-[#f5efe3] font-light leading-snug max-w-md" style={{ textShadow: '0 1px 14px rgba(45,38,24,0.45)' }}>
                      {t({ es: '«El territorio se mide con recorridos, semillas y manos que siembran.»', en: '“A territory is measured in walks, in seeds and in hands that sow.”' })}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Cifras orgánicas */}
            <div className="max-w-xl">
              <Reveal delay={0.06}>
                <p className="text-sm text-[#6b6048] font-light leading-loose font-sans">
                  {t({ es: 'La huella del Consejo, medida en terreno.', en: 'The Council’s footprint, measured on the ground.' })}
                </p>
              </Reveal>

              <div className="mt-9 space-y-8">
                {[
                  { num: '16,890+', label: { es: 'Personas beneficiarias', en: 'Beneficiaries' } },
                  { num: '1,500+', label: { es: 'Semillas nativas conservadas', en: 'Native seeds conserved' } },
                  { num: '44', label: { es: 'Recorridos territoriales', en: 'Territorial field visits' } },
                  { num: '31k+', label: { es: 'Alcance en divulgación', en: 'Outreach reach' } },
                ].map((s, idx) => (
                  <RevealItem key={idx} index={idx} step={0.07}>
                    <Link to="/proyectos" className="group flex items-baseline gap-5 active:scale-[0.99] transition-transform duration-200">
                      <span className="font-serif text-[2.6rem] sm:text-6xl text-[#3a4a18] font-light leading-none tracking-tight tabular">{s.num}</span>
                      <span className="h-1 w-1 rounded-full bg-[#4a5a22]/45 self-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[#4a5a22]" />
                      <span className="font-sans text-sm sm:text-base font-medium text-[#2d2618] leading-snug transition-colors duration-300 group-hover:text-[#3a4a18]">{t(s.label)}</span>
                    </Link>
                  </RevealItem>
                ))}
              </div>

              <Reveal delay={0.18}>
                <div className="mt-12 flex flex-wrap items-center gap-6">
                  <Link to="/proyectos" className="group inline-flex items-center gap-2.5 rounded-full bg-[#4a5a22] py-2.5 pl-6 pr-2 text-[11px] uppercase tracking-[0.16em] font-semibold text-[#f5efe3] transition-all duration-300 hover:bg-[#3a4a18] active:scale-[0.97] shadow-[0_8px_24px_-8px_rgba(51,66,21,0.55)]">
                    <span>{t({ es: 'Ver resultados', en: 'View results' })}</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f5efe3]/12 ring-1 ring-[#f5efe3]/20 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
                  </Link>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#8a7e68] font-sans font-semibold">ODS 2 · 11 · 13 · 15</span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CAPÍTULO 8: MANIFIESTO */}
      <section id="manifiesto" className="py-24 sm:py-32 px-6 sm:px-12 md:px-20 relative bg-[#f5efe3] border-t border-[#e0d4ba]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="text-[11px] uppercase tracking-[0.28em] font-semibold text-[#5a6b2a]">{t({ es: 'Manifiesto Institucional', en: 'Institutional Manifesto' })}</div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] text-[#2d2618] font-light leading-[1.18]">
                  {t({ es: 'El planeta no es un recurso.', en: 'The planet is not a resource.' })}<br />
                  <span className="italic text-[#4a5a22] font-normal">{t({ es: 'Es nuestra relación más sagrada.', en: 'It is our most sacred relationship.' })}</span>
                </h2>
              </div>
              <p className="text-sm sm:text-[15px] text-[#5c523e] font-light leading-relaxed font-sans">
                {t({ es: 'Súmate a la red de personas, especialistas e instituciones que impulsan la gobernanza ambiental.', en: 'Join the network of people, specialists and institutions driving environmental governance.' })}
              </p>
              <ul className="space-y-3.5 font-sans">
                {[
                  { es: 'Reportes técnicos trimestrales', en: 'Quarterly technical reports' },
                  { es: 'Guías de acción territorial', en: 'Territorial action guides' },
                  { es: 'Red internacional de especialistas', en: 'International network of specialists' },
                ].map((benefit) => (
                  <li key={t(benefit)} className="flex items-center gap-3 text-[13px] text-[#5c523e] font-light">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#4a5a22]/30 text-[#4a5a22] flex-shrink-0">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    </span>
                    {t(benefit)}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-[#d8ceb6]/60 flex items-center gap-4">
                <div className="w-8 h-[1px] bg-[#4a5a22]/40" />
                <div className="text-xs uppercase tracking-[0.2em] text-[#7a6e58] font-sans font-medium">Consejo Global Ambiental &bull; 2026</div>
              </div>
            </div>

            <div className="lg:col-span-7 w-full">
              <Reveal y={28} delay={0.1}>
                <div className="rounded-[2rem] bg-[#f5efe3] border border-[#d8ceb6]/80 shadow-[0_30px_80px_-42px_rgba(45,38,24,0.4)] overflow-hidden">
                  <div aria-hidden className="h-[3px] bg-gradient-to-r from-[#4a5a22] via-[#5a6b2a] to-transparent" />
                  <div className="p-8 sm:p-11">
                    <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3 pb-6 border-b border-[#d8ceb6]/70">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#5a6b2a] mb-1.5">{t({ es: 'Acta de Adhesión', en: 'Statement of Accession' })}</div>
                        <h3 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light leading-tight">{t({ es: 'Firmemos el Manifiesto por la Tierra', en: 'Let us sign the Manifesto for the Earth' })}</h3>
                      </div>
                      <span className="font-serif italic text-sm text-[#8a7e68] hidden sm:block">{t({ es: 'Adhesión N.º 01', en: 'Accession No. 01' })}</span>
                    </div>

                    <form onSubmit={handlePledge} className="space-y-9 font-sans">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-9">
                        <div className="group border-b border-[#d8ceb6]/90 pb-3 transition-colors duration-300 focus-within:border-[#4a5a22]/30">
                          <label className="block mb-2 text-[10px] uppercase tracking-[0.22em] text-[#8a7e68] font-semibold transition-colors duration-300 group-focus-within:text-[#4a5a22]">{t({ es: 'Nombre o Institución', en: 'Name or Institution' })}</label>
                          <input
                            type="text"
                            required
                            value={pledgeName}
                            onChange={(e) => setPledgeName(e.target.value)}
                            placeholder={t({ es: 'Tu nombre', en: 'Your name' })}
                            className="peer w-full bg-transparent border-none outline-none font-serif text-lg sm:text-xl font-light text-[#2d2618] placeholder-[#b3a688] py-1 transition-all duration-300 placeholder:font-sans placeholder:text-sm"
                          />
                          <span className="pointer-events-none absolute left-0 -bottom-px h-[1.5px] w-full origin-left scale-x-0 bg-[#4a5a22] transition-transform duration-500 ease-out group-focus-within:scale-x-100" />
                        </div>
                        <div className="group relative border-b border-[#d8ceb6]/90 pb-3 transition-colors duration-300 focus-within:border-[#4a5a22]/30">
                          <label className="block mb-2 text-[10px] uppercase tracking-[0.22em] text-[#8a7e68] font-semibold transition-colors duration-300 group-focus-within:text-[#4a5a22]">{t({ es: 'Correo Electrónico', en: 'Email Address' })}</label>
                          <input
                            type="email"
                            required
                            placeholder="email@example.com"
                            className="w-full bg-transparent border-none outline-none font-serif text-lg sm:text-xl font-light text-[#2d2618] placeholder-[#b3a688] placeholder:font-sans placeholder:text-sm py-1"
                          />
                          <span className="pointer-events-none absolute left-0 -bottom-px h-[1.5px] w-full origin-left scale-x-0 bg-[#4a5a22] transition-transform duration-500 ease-out group-focus-within:scale-x-100" />
                        </div>
                      </div>

                      <div className="group relative border-b border-[#d8ceb6]/90 pb-3 transition-colors duration-300 focus-within:border-[#4a5a22]/30">
                        <label className="block mb-2 text-[10px] uppercase tracking-[0.22em] text-[#8a7e68] font-semibold transition-colors duration-300 group-focus-within:text-[#4a5a22]">{t({ es: 'Tu Compromiso Principal', en: 'Your Main Commitment' })}</label>
                        <select className="w-full cursor-pointer appearance-none bg-transparent border-none outline-none font-serif text-lg sm:text-xl font-light text-[#2d2618] pr-8 py-1" defaultValue="forest">
                          <option value="forest">{t({ es: 'Protección y Reforestación de Bosques Nativos', en: 'Protection and Reforestation of Native Forests' })}</option>
                          <option value="ocean">{t({ es: 'Conservación de Océanos y Arrecifes Marinos', en: 'Conservation of Oceans and Marine Reefs' })}</option>
                          <option value="soil">{t({ es: 'Regeneración y Salud del Suelo de Conservación', en: 'Regeneration and Health of Conservation Land' })}</option>
                          <option value="education">{t({ es: 'Conciencia, Investigación y Educación Ambiental', en: 'Awareness, Research and Environmental Education' })}</option>
                        </select>
                        <span className="pointer-events-none absolute left-0 -bottom-px h-[1.5px] w-full origin-left scale-x-0 bg-[#4a5a22] transition-transform duration-500 ease-out group-focus-within:scale-x-100" />
                        <svg className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a6e58]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="group relative w-full overflow-hidden rounded-full bg-[#4a5a22] py-3 sm:py-3.5 pl-8 pr-3 flex items-center justify-between gap-4 text-[#f5efe3] font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] shadow-[0_14px_36px_-14px_rgba(51,66,21,0.55)] transition-all duration-300 hover:bg-[#3a4a18] active:scale-[0.98] cursor-pointer"
                        >
                          <span className="pl-1 text-left">{t({ es: 'Firmar el Manifiesto por la Tierra', en: 'Sign the Manifesto for the Earth' })}</span>
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5efe3]/14 ring-1 ring-[#f5efe3]/25 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-px">
                            <span className="text-base leading-none">&rarr;</span>
                          </span>
                        </button>
                      </div>
                    </form>

                    <AnimatePresence>
                      {pledgeSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="mt-6 rounded-2xl border border-[#4a5a22]/25 bg-[#4a5a22]/10 py-6 px-6 text-center font-sans"
                        >
                          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#4a5a22] text-[#f5efe3] shadow-[0_8px_20px_-8px_rgba(51,66,21,0.6)]">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <h4 className="font-serif text-xl text-[#2d2618] mb-1 font-light">{t({ es: 'Compromiso registrado', en: 'Commitment registered' })}</h4>
                          <p className="text-xs text-[#4a5a22] font-medium">{t({ es: 'Gracias', en: 'Thank you' })}{pledgeName ? `, ${pledgeName}` : ''}. {t({ es: 'Tu adhesión institucional ha sido registrada.', en: 'Your institutional accession has been recorded.' })}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <FooterNav />
    </main>
  );
}