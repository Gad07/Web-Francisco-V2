import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import FooterNav from './FooterNav.jsx';
import franciscoSolorioImg from '../imports/Perfiles/FranciscoSolorio.png';

export default function EditorialOverlay({
  isLoaded,
  scrollProgress
}) {
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);
  const [pledgeName, setPledgeName] = useState('');
  const [activeTabWess, setActiveTabWess] = useState(0);
  const [selectedBiome, setSelectedBiome] = useState(null);

  const biomesData = [
    {
      id: "selva",
      title: "Bosques Amazónicos",
      tag: "Selva Tropical",
      mediaType: "image",
      src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&q=85&fit=crop&auto=format",
      cardImg: "https://images.unsplash.com/photo-1626657171364-4af23203469b?w=700&h=900&fit=crop&auto=format",
      subtitle: "El gran regulador bioclimático y reservorio genético del planeta",
      alert: "El 17% de la cuenca amazónica ha sido deforestada; el punto de no retorno ecológico se sitúa entre el 20% y 25%.",
      desc: "El bioma amazónico alberga el 10% de todas las especies conocidas en la Tierra y bombea ríos voladores de vapor de agua que alimentan el ciclo hidrológico de todo el continente. El Consejo Global Ambiental interviene mediante el establecimiento de 47 corredores bioculturales continuos, monitoreo satelital en tiempo real y gobernanza compartida con pueblos originarios para blindar el territorio frente a la tala y la minería ilícita.",
      actionsTitle: "Estrategia Territorial Activa",
      actions: [
        "Despliegue de patrullas comunitarias equipadas con telemetría satelital y drones de largo alcance.",
        "Reforestación con más de 120 especies nativas para restablecer la canopea en zonas degradadas.",
        "Consolidación de bancos de germoplasma y parcelas agroforestales regenerativas."
      ],
      metrics: [
        { val: "1.2M ha", label: "Bajo monitoreo satelital activo" },
        { val: "47", label: "Corredores bioculturales blindados" },
        { val: "120k+", label: "Especies protegidas en territorio" },
      ],
      ods: "ODS 15 (Vida Terrestre) y ODS 13 (Acción por el Clima)",
    },
    {
      id: "arrecifes",
      title: "Arrecifes de Coral",
      tag: "Océano Tropical",
      mediaType: "video",
      videoSrc: "/video/video loop.mp4",
      src: "https://images.unsplash.com/photo-1623880132570-ab1b4297c8c2?w=1920&q=85&fit=crop&auto=format",
      cardImg: "https://images.unsplash.com/photo-1623880132570-ab1b4297c8c2?w=700&h=900&fit=crop&auto=format",
      subtitle: "El latido azul que oxigena y defiende las costas de la biosfera",
      alert: "El 50% de los arrecifes coralinos globales han colapsado en cinco décadas por estrés térmico y acidificación oceánica.",
      desc: "A pesar de ocupar menos del 0.2% de la superficie marina, los arrecifes sustentan más de una cuarta parte de toda la vida en los océanos y absorben hasta el 97% de la energía del oleaje durante huracanes. El Consejo Global Ambiental opera programas de microfragmentación asistida, viveros submarinos y restauración de barreras arrecifales en 200 hectáreas marinas prioritarias.",
      actionsTitle: "Estrategia de Restauración Marina",
      actions: [
        "Viveros de microfragmentación con cepas de corales resilientes a fluctuaciones térmicas.",
        "Regulación de escorrentías terrestres y cuencas altas para asegurar aguas cristalinas y libres de agroquímicos.",
        "Monitoreo bioacústico y batimétrico para evaluar el retorno de cardúmenes y cadenas tróficas."
      ],
      metrics: [
        { val: "200 ha", label: "Arrecifes en restauración asistida" },
        { val: "70%", label: "Oxígeno biosférico generado en el mar" },
        { val: "97%", label: "Atenuación de energía de oleaje costero" },
      ],
      ods: "ODS 14 (Vida Submarina) y ODS 17 (Alianzas Estratégicas)",
    },
    {
      id: "glaciares",
      title: "Glaciares Polares",
      tag: "Ártico y Antártida",
      mediaType: "image",
      src: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=1920&q=85&fit=crop&auto=format",
      cardImg: "https://images.unsplash.com/photo-1758794093166-271d03ffd941?w=700&h=900&fit=crop&auto=format",
      subtitle: "Los gigantes de hielo que regulan el albedo y el equilibrio térmico planetario",
      alert: "Los polos se calientan cuatro veces más rápido que la media mundial, alterando la corriente en chorro y la circulación oceánica.",
      desc: "Los campos de hielo y masas glaciares actúan como el gran escudo térmico de la Tierra, reflejando el 85% de la radiación solar incidente. El retroceso glacial amenaza el abastecimiento de agua dulce de millones de personas y desestabiliza patrones climáticos globales. El Consejo mantiene telemetría satelital en 3,200 glaciares e impulsa tratados vinculantes de moratoria extractiva polar.",
      actionsTitle: "Estrategia de Alerta e Incidencia Polar",
      actions: [
        "Monitoreo glaciológico de 3,200 frentes glaciares mediante radar de apertura sintética e interferometría.",
        "Promoción diplomática de santuarios polares y proscripción estricta de minería en fondos marinos árticos.",
        "Modelos predictivos de aumento del nivel del mar transferidos a gobiernos locales y comunidades costeras."
      ],
      metrics: [
        { val: "3,200", label: "Glaciares bajo telemetría científica" },
        { val: "4x", label: "Velocidad de calentamiento polar" },
        { val: "100%", label: "Compromiso con la moratoria polar" },
      ],
      ods: "ODS 13 (Acción por el Clima) y ODS 16 (Paz y Justicia Institucional)",
    },
  ];

  const branchContainerRef = useRef(null);
  const maskRef = useRef(null);
  const fgMaskRef = useRef(null);
  const interdependenciaRef = useRef(null);
  const videoLoopRef = useRef(null);

  // Progreso de scroll para la experiencia cinematográfica de la Piedra y el Arrecife
  const { scrollYProgress: interScroll } = useScroll({
    target: interdependenciaRef,
    offset: ["start start", "end end"]
  });

  // Opacidad sincronizada:
  // 1. Texto de la Piedra: visible en Fase 1 (0 -> 0.22) y se desvanece
  const stoneTextOpacity = useTransform(interScroll, [0, 0.20, 0.26], [1, 1, 0]);

  // 2. Texto del Arrecife: aparece en Fase 3 cuando inicia el video loop (0.64 -> 0.70)
  const reefTextOpacity = useTransform(interScroll, [0, 0.64, 0.70, 0.95, 1], [0, 0, 1, 1, 0]);

  const [stoneZoom, setStoneZoom] = useState(1);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [showFrames, setShowFrames] = useState(false);
  const [showLoopVideo, setShowLoopVideo] = useState(false);
  const TOTAL_VIDEO_FRAMES = 153;

  const getFrameSrc = (index) => `/VideoFrames/frame_${String(index).padStart(3, '0')}.jpg`;

  // Precargar inmediatamente los 153 fotogramas en caché del navegador
  useEffect(() => {
    for (let i = 1; i <= TOTAL_VIDEO_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
    }
  }, []);

  // Lógica de Scroll Cinemático:
  // Fase 1 (0% - 25%): Zoom a la Piedra PNG con Información del Suelo y Raíces
  // Fase 2 (25% - 66%): Recorrido continuo por los 153 fotogramas 4K
  // Fase 3 (66% - 100%): Video Loop del Arrecife con Información Marina y Misión
  useMotionValueEvent(interScroll, "change", (latest) => {
    if (latest <= 0.25) {
      const t = latest / 0.25;
      setStoneZoom(1 + t * 1.8);
      setShowFrames(false);
      setShowLoopVideo(false);
      if (videoLoopRef.current && !videoLoopRef.current.paused) {
        videoLoopRef.current.pause();
      }
    } else if (latest < 0.66) {
      setStoneZoom(2.8);
      setShowFrames(true);
      setShowLoopVideo(false);
      const progress = (latest - 0.25) / 0.41;
      const exactFrame = Math.min(TOTAL_VIDEO_FRAMES - 1, Math.max(0, progress * (TOTAL_VIDEO_FRAMES - 1)));
      const cur = Math.min(TOTAL_VIDEO_FRAMES, Math.floor(exactFrame) + 1);
      setCurrentFrame(cur);
      if (videoLoopRef.current && !videoLoopRef.current.paused) {
        videoLoopRef.current.pause();
      }
    } else {
      setStoneZoom(2.8);
      setShowFrames(true);
      setCurrentFrame(TOTAL_VIDEO_FRAMES);
      setShowLoopVideo(true);
      if (videoLoopRef.current && videoLoopRef.current.paused) {
        videoLoopRef.current.play().catch(() => { });
      }
    }
  });

  const handleHeroMouseMove = (e) => {
    if (!branchContainerRef.current) return;
    const rect = branchContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const inBounds = x >= -60 && x <= rect.width + 60 && y >= -60 && y <= rect.height + 60;
    const maskVal = `radial-gradient(circle 180px at ${x}px ${y}px, black 30%, transparent 100%)`;

    if (maskRef.current) {
      if (inBounds) {
        maskRef.current.style.maskImage = maskVal;
        maskRef.current.style.webkitMaskImage = maskVal;
        maskRef.current.style.opacity = '1';
      } else {
        maskRef.current.style.opacity = '0';
      }
    }

    if (fgMaskRef.current) {
      if (inBounds) {
        fgMaskRef.current.style.maskImage = maskVal;
        fgMaskRef.current.style.webkitMaskImage = maskVal;
        fgMaskRef.current.style.opacity = '1';
      } else {
        fgMaskRef.current.style.opacity = '0';
      }
    }
  };

  const handleHeroMouseLeave = () => {
    if (maskRef.current) maskRef.current.style.opacity = '0';
    if (fgMaskRef.current) fgMaskRef.current.style.opacity = '0';
  };

  const handlePledge = (e) => {
    e.preventDefault();
    setPledgeSubmitted(true);
  };

  return (
    <main className={`relative z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'} overflow-x-clip`}>

      {/* =================================================================
          CAPÍTULO 1: LA TIERRA VIVA (Hero Original V2 con Rama y Máscara)
          ================================================================= */}
      <section
        id="hero"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="h-screen w-full min-h-screen relative flex items-center px-8 md:px-20 lg:px-28 pt-24 pb-12 overflow-visible bg-[#f5efe3]"
      >
        {/* Rama SVG Capa Fondo */}
        <motion.div
          ref={branchContainerRef}
          initial={{ opacity: 0, x: 80 }}
          animate={{
            opacity: scrollProgress > 0.18 ? 0 : 1,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            right: 'calc(0% + 5px)',
            bottom: '-10%',
            width: 'min(96vw, 1480px)',
            aspectRatio: '1536 / 857.25',
            pointerEvents: 'none',
            zIndex: 15,
            transition: 'opacity 0.4s ease',
          }}
        >
          <img
            src="/imagenes/Rama 1.svg"
            alt="Rama Exterior"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'right center',
              mixBlendMode: 'multiply',
              userSelect: 'none',
              pointerEvents: 'none',
              display: 'block',
            }}
            draggable={false}
          />

          <div
            ref={maskRef}
            style={{
              position: 'absolute',
              top: '0.7%',
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              opacity: 0,
              transition: 'opacity 0.2s ease',
              maskImage: 'radial-gradient(circle 140px at -999px -999px, black 25%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(circle 140px at -999px -999px, black 25%, transparent 100%)',
            }}
          >
            <img
              src="/imagenes/Rama 2.svg"
              alt="Rama Interior"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'right center',
                mixBlendMode: 'multiply',
                userSelect: 'none',
                display: 'block',
                pointerEvents: 'none',
              }}
              draggable={false}
            />
          </div>
        </motion.div>

        <div className="max-w-6xl relative select-none">

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] xl:text-[7.2rem] tracking-tight text-[#2d2618] leading-[1.02] mb-12 font-light">
            <div className="block whitespace-nowrap">
              No hay afuera,
            </div>

            <div className="italic font-normal text-[#5a6b2a] block whitespace-nowrap">
              solo un mund
              <div className="relative inline-block">
                <div
                  className="absolute inset-0 z-30 pointer-events-none select-none"
                  style={{ clipPath: 'polygon(0% 0%, 65% 0%, 42% 100%, 0% 100%)' }}
                  aria-hidden="true"
                >
                  o
                </div>
                <div className="relative z-0">o</div>
              </div>
            </div>

            <div className="italic font-normal text-[#5a6b2a] block whitespace-nowrap">
              que sostener.
            </div>
          </h1>

          <div className="flex items-center gap-10 mt-8">
            <a
              href="#interdependencia"
              className="inline-flex items-center gap-4 group cursor-pointer"
            >
              <div className="text-xs uppercase tracking-[0.3em] font-sans font-medium text-[#8a7e68] group-hover:text-[#4a5a22] transition-colors leading-none pt-0.5">
                Comenzar Exploración
              </div>
              <div className="relative w-[1.5px] h-10 bg-[#d8ceb6]/60 rounded-full overflow-hidden">
                <motion.div
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-[#4a5a22] to-[#4a5a22] shadow-[0_0_6px_#4a5a22]"
                />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* =================================================================
          CAPÍTULO 2: ANIMACIÓN COMPLETA (Piedra -> 153 Frames -> Arrecife)
          ================================================================= */}
      <section
        id="interdependencia"
        ref={interdependenciaRef}
        className="h-[420vh] relative bg-[#f5efe3]"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-visible">

          {/* Capa Visual Fotorealista: Piedra PNG + 153 Fotogramas 4K + Video Arrecife */}
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
            {/* 1. Piedra.png fotorealista con Zoom en Fase 1 */}
            <img
              src="/imagenes/Piedra.png"
              alt="Piedra Ecosistémica"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                transform: `scale(${stoneZoom})`,
                opacity: showFrames ? 0 : 1,
                transition: showFrames ? 'opacity 0.25s ease-out' : 'none',
                filter: 'drop-shadow(0 25px 60px rgba(0,0,0,0.75))'
              }}
            />

            {/* 2. Secuencia de 153 Fotogramas en Fase 2 */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                opacity: showFrames && !showLoopVideo ? 1 : 0,
                transition: 'opacity 0.2s ease-out',
                pointerEvents: 'none',
              }}
            >
              <img
                src={getFrameSrc(currentFrame)}
                alt={`Fotograma ${currentFrame}`}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  imageRendering: 'high-quality',
                }}
              />
            </div>

            {/* 3. Video del Arrecife permanente en DOM con precarga */}
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
                transition: 'opacity 0.45s ease-out',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            />
          </div>

          {/* =============================================================
              INFO EN LA PIEDRA (Fase 1: Suelo y Raíces)
              ============================================================= */}
          <motion.div
            style={{ opacity: stoneTextOpacity }}
            className="w-full max-w-[1400px] flex flex-col md:flex-row items-center justify-between gap-8 relative z-20 pointer-events-none px-8 md:px-12"
          >
            <div className="w-full md:w-[38%] text-left pointer-events-auto p-8 rounded-3xl bg-[#f5efe3]/92 backdrop-blur-xl border border-[#d8ceb6] shadow-xl">
              <div className="text-[11px] uppercase tracking-[0.25em] text-[#5a6b2a] font-serif font-bold mb-4">
                El Suelo y las Raíces
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2d2618] tracking-tight leading-[1.06] mb-5 font-light">
                La trama viva de las raíces.
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#6b6048] font-light leading-relaxed">
                En las profundidades del suelo, una inmensa red de raíces y micelio conecta cada árbol en una sinfonía silenciosa. Lo que ocurre en la copa de un roble alimenta la vida bajo la corteza terrestre.
              </p>
            </div>

            <div className="w-full md:w-[36%] flex flex-col gap-4 text-left pointer-events-auto">
              <div className="p-6 rounded-2xl bg-[#f5efe3]/92 backdrop-blur-xl border border-[#d8ceb6] shadow-xl">
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#5a6b2a] mb-2 font-serif font-bold">El Suelo Vivo</div>
                <h3 className="font-serif text-2xl text-[#2d2618] font-light mb-2">Metabolismo Vital</h3>
                <p className="text-xs text-[#6b6048] leading-relaxed font-sans font-light">
                  El suelo alberga más del 50% de todas las especies vivas de la Tierra y sustenta el ciclo biológico del planeta.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#f5efe3]/92 backdrop-blur-xl border border-[#d8ceb6] shadow-xl">
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#4a5a22] mb-2 font-serif font-bold">Canopea y Oxígeno</div>
                <h3 className="font-serif text-2xl text-[#2d2618] font-light mb-2">Pulmón Verde</h3>
                <p className="text-xs text-[#6b6048] leading-relaxed font-sans font-light">
                  Cada hectárea de bosque primario purifica millones de litros de agua y aire al año, estabilizando el clima continental.
                </p>
              </div>
            </div>
          </motion.div>

          {/* =============================================================
              INFO EN EL VIDEO DEL ARRECIFE (Fase 3: Océano y Corales)
              ============================================================= */}
          <motion.div
            style={{ opacity: reefTextOpacity }}
            className="w-full max-w-[1400px] flex flex-col md:flex-row items-center justify-between gap-8 absolute inset-x-0 mx-auto z-20 pointer-events-none px-8 md:px-12"
          >
            <div className="w-full md:w-[42%] text-left pointer-events-auto p-8 sm:p-10 rounded-3xl bg-[#f5efe3]/92 backdrop-blur-2xl border border-[#d8ceb6] shadow-xl">
              <div className="text-[11px] uppercase tracking-[0.25em] text-[#3a608c] font-serif font-bold mb-4">
                El Océano Azul y los Arrecifes
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#2d2618] tracking-tight leading-[1.06] mb-5 font-light">
                Lo que cuidamos en tierra respira bajo el agua.
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#6b6048] font-light leading-relaxed mb-6">
                En la inmensidad del océano, la luz del sol baila entre los arrecifes y el fitoplancton genera el aliento de nuestro planeta. Proteger los bosques y frenar la escorrentía es proteger la continuidad de los corales y la vida marina.
              </p>
              <div className="p-4 rounded-xl bg-[#eae4d2] border border-[#d8ceb6]">
                <div className="font-serif text-2xl text-[#18529d] font-bold">70% del Oxígeno</div>
                <p className="text-xs text-[#6b6048] font-sans mt-1">Generado pacientemente por los microorganismos marinos en las capas superficiales.</p>
              </div>
            </div>

            <div className="w-full md:w-[40%] text-left pointer-events-auto p-8 sm:p-10 rounded-3xl bg-[#f5efe3]/92 backdrop-blur-2xl border border-[#d8ceb6] shadow-xl">
              <div className="text-[11px] uppercase tracking-[0.25em] text-[#4a5a22] font-serif font-bold mb-4">
                Misión Territorial y Marina
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light leading-snug mb-4">
                Restaurar lo que <em>juntos</em> hemos transformado.
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#6b6048] font-light leading-relaxed mb-6">
                Con monitoreo satelital en tiempo real y gobernanza comunitaria en 14 territorios piloto, protegemos las cuencas altas que nutren a los arrecifes costeros.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-[#eae4d2] border border-[#d8ceb6]">
                  <div className="font-serif text-3xl text-[#4a5a22] font-bold">18M+</div>
                  <p className="text-[11px] text-[#6b6048] font-sans">Árboles nativos plantados</p>
                </div>
                <div className="p-4 rounded-xl bg-[#eae4d2] border border-[#d8ceb6]">
                  <div className="font-serif text-3xl text-[#18529d] font-bold">200 ha</div>
                  <p className="text-[11px] text-[#6b6048] font-sans">Arrecifes en conservación</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =================================================================
          CAPÍTULO 3: PROYECTO EMBLEMÁTICO WESS 2026 (Exposición Editorial Inmersiva)
          ================================================================= */}
      <section id="proyectos" className="pt-36 pb-28 md:pt-44 md:pb-36 px-6 sm:px-12 md:px-20 relative bg-[#f5efe3] border-t border-[#e0d4ba] scroll-mt-28 overflow-hidden min-h-[620px] lg:min-h-[720px] flex items-center">
        
        {/* ─── Imagen Inmersiva de Fondo Derecho (Cubre toda la sección sin bordes) ─── */}
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
              alt="Proyecto Insignia Gobernanza Ambiental"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Degradado progresivo de izquierda a derecha y bordes para fundirse completamente */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, #f5efe3 0%, rgba(245,239,227,0.92) 12%, rgba(245,239,227,0.45) 45%, transparent 85%)'
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, #f5efe3 0%, transparent 15%, transparent 85%, #f5efe3 100%)'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl flex flex-col justify-center">
            
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2d2618] font-light leading-[1.08] mb-6 tracking-tight">
              Gobernanza Ambiental para el Hambre Cero
            </h2>

            <p className="text-[#6b6048] font-sans text-base sm:text-lg leading-relaxed mb-8 font-light max-w-2xl">
              Iniciativa galardonada en la Cumbre Mundial de Sostenibilidad 2026 por fusionar la restauración biocultural, la soberanía alimentaria y la protección satelital comunitaria en un solo modelo territorial.
            </p>

            {/* Selector de Pilares */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
              {[
                { id: 0, label: 'Semillas Nativas' },
                { id: 1, label: 'Monitoreo Satelital' },
                { id: 2, label: 'Gobernanza Ejidal' },
                { id: 3, label: 'Galardón WESS' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabWess(tab.id)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-sans font-semibold transition-all text-center ${
                    activeTabWess === tab.id
                      ? 'bg-[#4a5a22] text-[#f5efe3] shadow-sm'
                      : 'bg-[#eae4d2]/80 text-[#6b6048] hover:bg-[#eae4d2] hover:text-[#2d2618]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Detalle Dinámico del Pilar Seleccionado */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#eae4d2]/75 backdrop-blur-md border border-[#d8ceb6]/80 mb-8 min-h-[135px] flex flex-col justify-center shadow-sm">
              <AnimatePresence mode="wait">
                {activeTabWess === 0 && (
                  <motion.div
                    key="tab0"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-serif text-2xl text-[#2d2618] font-light mb-2">Bancos Comunitarios de Germoplasma</h4>
                    <p className="text-[#6b6048] text-sm sm:text-base leading-relaxed font-light">
                      Preservamos más de 1,500 variedades de semillas nativas de maíz, frijol y hortalizas criollas adaptadas al cambio climático, asegurando la autonomía alimentaria de 14 pueblos originarios.
                    </p>
                  </motion.div>
                )}
                {activeTabWess === 1 && (
                  <motion.div
                    key="tab1"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-serif text-2xl text-[#2d2618] font-light mb-2">Monitoreo Satelital y Alertas Tempranas</h4>
                    <p className="text-[#6b6048] text-sm sm:text-base leading-relaxed font-light">
                      Detección en tiempo real vinculada a brigadas territoriales que detienen la tala clandestina y quemas descontroladas antes de que penetren las zonas núcleo protegidas.
                    </p>
                  </motion.div>
                )}
                {activeTabWess === 2 && (
                  <motion.div
                    key="tab2"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-serif text-2xl text-[#2d2618] font-light mb-2">Cohesión Territorial y Asambleas Comunitarias</h4>
                    <p className="text-[#6b6048] text-sm sm:text-base leading-relaxed font-light">
                      Mecanismos de consulta previa e informada que reconocen legalmente a los ejidatarios y comuneros como guardianes soberanos de los corredores ecológicos.
                    </p>
                  </motion.div>
                )}
                {activeTabWess === 3 && (
                  <motion.div
                    key="tab3"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-serif text-2xl text-[#2d2618] font-light mb-2">Reconocimiento Global WESS 2026</h4>
                    <p className="text-[#6b6048] text-sm sm:text-base leading-relaxed font-light">
                      Distinción internacional otorgada en Ginebra como una de las 10 mejores iniciativas globales que articulan simultáneamente soberanía alimentaria y mitigación climática.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Acciones y Enlaces más sutiles */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/proyectos"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#4a5a22] hover:bg-[#3a4a18] text-[#f5efe3] rounded-full font-medium text-[11px] tracking-wider uppercase transition-all shadow-sm hover:shadow"
              >
                Conocer el proyecto completo &rarr;
              </Link>
              <Link
                to="/agenda-2030"
                className="inline-flex items-center px-4 py-2.5 rounded-full text-[11px] uppercase tracking-wider text-[#6b6048] hover:text-[#2d2618] hover:bg-[#eae4d2]/80 transition-colors font-medium border border-[#d8ceb6]/80"
              >
                Metas Agenda 2030
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =================================================================
          CAPÍTULO 4: LÍNEAS ESTRATÉGICAS DE ACCIÓN
          ================================================================= */}
      <section className="py-28 px-8 md:px-20 relative bg-[#f5efe3] border-t border-[#e0d4ba]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#5a6b2a] font-bold mb-3">
                Pilares de Actuación
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#2d2618] font-light">
                Líneas Estratégicas Institucionales
              </h2>
            </div>
            <Link
              to="/lineas-estrategicas"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#4a5a22] hover:text-[#2d2618] transition-colors group"
            >
              <div>Ver todas las líneas de acción</div>
              <div className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                tag: "Gobernanza",
                ods: "ODS 16 y 17",
                title: "Gobernanza Ambiental y Política Pública",
                desc: "Agendas estratégicas, dictámenes técnicos vinculantes, análisis regulatorio e incidencia pública ante los tres órdenes de gobierno.",
              },
              {
                num: "02",
                tag: "Resiliencia",
                ods: "ODS 13",
                title: "Cambio Climático y Transición Justa",
                desc: "Mitigación, adaptación territorial, soluciones basadas en la naturaleza y gestión integral de riesgos ante eventos climáticos extremos.",
              },
              {
                num: "03",
                tag: "Biodiversidad",
                ods: "ODS 15",
                title: "Conservación y Restauración Ecosistémica",
                desc: "Reforestación con especies nativas, conectividad biológica, monitoreo de especies clave y restauración de cuencas hidrológicas.",
              },
              {
                num: "04",
                tag: "Territorio",
                ods: "ODS 11",
                title: "Ordenamiento Territorial y Cohesión Social",
                desc: "Defensa del suelo de conservación, prevención de ilícitos ambientales y empoderamiento de núcleos agrarios y asambleas ejidales.",
              },
              {
                num: "05",
                tag: "Metas Globales",
                ods: "Agenda 2030",
                title: "Cumplimiento y Auditoría de ODS",
                desc: "Integración transversal de los Objetivos de Desarrollo Sostenible, matrices de indicadores verificables y rendición de cuentas pública.",
              },
              {
                num: "06",
                tag: "Alimentación",
                ods: "ODS 2 y Una Salud",
                title: "Sistemas Agroalimentarios y Soberanía",
                desc: "Prácticas sustentables, protección de semillas nativas, bioinsumos, bienestar animal y circuitos cortos de comercialización justa.",
              },
            ].map((pillar) => (
              <div
                key={pillar.num}
                className="p-8 rounded-3xl bg-[#eae4d2]/50 border border-[#d8ceb6]/80 hover:bg-[#f5efe3]/40 hover:backdrop-blur-xl hover:backdrop-saturate-150 hover:border-[#d8ceb6]/60 hover:shadow-[0_4px_24px_rgba(45,38,24,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#7a6e58] group-hover:text-[#4a5a22] transition-colors">
                      {pillar.tag}
                    </div>
                    <div className="font-serif text-3xl font-light text-[#b0a48e] group-hover:text-[#4a5a22] transition-colors leading-none">
                      {pillar.num}
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl text-[#2d2618] font-light mb-3.5 leading-snug group-hover:text-[#3a4a18] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-[#6b6048] font-light leading-relaxed mb-6 font-sans">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#d8ceb6]/60 flex items-center justify-between">
                  <div className="text-[11px] font-sans text-[#8a7e68] font-medium">
                    {pillar.ods}
                  </div>
                  <Link
                    to="/lineas-estrategicas"
                    className="text-xs uppercase tracking-wider font-semibold text-[#4a5a22] group-hover:translate-x-1 transition-transform flex items-center gap-1"
                  >
                    <div>Detalles</div>
                    <div>&rarr;</div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          CAPÍTULO 5: ECOSISTEMAS EN CRISIS (Biomas Críticos Inmersivos)
          ================================================================= */}
      <section id="ecosistemas" className="py-28 px-8 md:px-20 relative bg-[#f5efe3] border-t border-[#d8ceb6]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="text-xs tracking-[0.25em] uppercase mb-3 text-[#5a6b2a] font-bold">
                Ecosistemas en Crisis
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#2d2618] font-light">
                Cada bioma cuenta
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-sm leading-relaxed text-[#6b6048] font-light">
                Intervención estratégica en los biomas más amenazados del planeta mediante ciencia aplicada, gobernanza territorial y monitoreo continuo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {biomesData.map((eco, idx) => (
              <div
                key={eco.id}
                onClick={() => setSelectedBiome(idx)}
                className="group relative rounded-3xl overflow-hidden h-[500px] border border-[#d8ceb6] shadow-sm cursor-pointer hover:shadow-2xl hover:border-[#4a5a22]/60 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-end p-8"
              >
                <img
                  src={eco.cardImg}
                  alt={eco.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Refined gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300 group-hover:via-black/50" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-[11px] uppercase tracking-[0.25em] text-[#d8ceb6] font-semibold mb-2">
                    {eco.tag}
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#f5efe3] font-light mb-3 leading-tight">
                    {eco.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed mb-6 line-clamp-3">
                    {eco.alert}
                  </p>

                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#f5efe3] group-hover:text-[#cde48e] transition-colors">
                    <span>Explorar Inmersión</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODAL INMERSIVO A PANTALLA COMPLETA AL DAR CLIC */}
        <AnimatePresence>
          {selectedBiome !== null && (
            <motion.div
              id="biome-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[9999] flex flex-col justify-between overflow-y-auto bg-black text-slate-100"
            >
              {/* Fondo Inmersivo: Video en bucle o Fotografía de alta resolución */}
              {biomesData[selectedBiome].mediaType === 'video' ? (
                <video
                  src={biomesData[selectedBiome].videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="fixed inset-0 w-full h-full object-cover pointer-events-none"
                />
              ) : (
                <img
                  src={biomesData[selectedBiome].src}
                  alt={biomesData[selectedBiome].title}
                  className="fixed inset-0 w-full h-full object-cover pointer-events-none"
                />
              )}

              {/* Capa de contraste y gradiente cinemático profundo */}
              <div className="fixed inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 pointer-events-none" />

              {/* Controles Flotantes Transparentes (Sin barra de fondo) */}
              <div className="relative z-20 w-full px-8 md:px-16 py-7 flex items-center justify-between pointer-events-auto">
                <div className="text-xs uppercase tracking-[0.25em] text-[#d8ceb6] font-semibold drop-shadow-sm">
                  {biomesData[selectedBiome].tag}
                </div>

                {/* Selector entre los 3 biomas */}
                <div className="hidden sm:flex items-center gap-1.5 bg-black/30 p-1.5 rounded-full border border-white/15 backdrop-blur-md">
                  {biomesData.map((b, i) => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBiome(i)}
                      className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all duration-300 ${
                        selectedBiome === i
                          ? 'bg-white/25 text-white font-medium border border-white/30 shadow-sm'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {b.title}
                    </button>
                  ))}
                </div>

                {/* Botón Cerrar Minimalista Flotante */}
                <button
                  onClick={() => setSelectedBiome(null)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-black/65 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 shadow-md"
                >
                  <div>Cerrar</div>
                  <div className="text-sm font-light leading-none">&times;</div>
                </button>
              </div>

              {/* Contenido Editorial Minimalista y Despejado */}
              <div className="relative z-20 max-w-6xl mx-auto w-full px-8 md:px-16 py-12 md:py-20 flex-1 flex flex-col justify-end">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">

                  {/* Columna Izquierda: Gran Título Editorial y Narrativa */}
                  <div className="lg:col-span-7 space-y-6">
                    <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-light tracking-tight leading-[1.05]">
                      {biomesData[selectedBiome].title}
                    </h2>

                    <p className="font-serif text-xl sm:text-2xl text-[#d8ceb6] font-light italic leading-snug">
                      &ldquo;{biomesData[selectedBiome].subtitle}&rdquo;
                    </p>

                    <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-xl font-sans">
                      {biomesData[selectedBiome].desc}
                    </p>

                    <div className="pt-2 flex items-center gap-4">
                      <Link
                        to="/proyectos"
                        onClick={() => setSelectedBiome(null)}
                        className="inline-flex items-center gap-2 py-3 px-7 rounded-full bg-[#f5efe3] hover:bg-white text-[#2d2618] font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl group"
                      >
                        <div>Ver Proyectos Territoriales</div>
                        <div className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</div>
                      </Link>
                    </div>
                  </div>

                  {/* Columna Derecha: Métricas Limpias de Alto Impacto */}
                  <div className="lg:col-span-5 space-y-8 lg:border-l lg:border-white/15 lg:pl-10">
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
                      {biomesData[selectedBiome].metrics.map((m, mIdx) => (
                        <div key={mIdx}>
                          <div className="font-serif text-4xl sm:text-5xl text-[#f5efe3] font-light mb-1">
                            {m.val}
                          </div>
                          <div className="text-xs text-slate-400 font-sans font-light tracking-wide">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/10 text-xs text-slate-400 font-light">
                      <span className="text-[#d8ceb6] font-medium">Alineación ODS:</span> {biomesData[selectedBiome].ods}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* =================================================================
          CAPÍTULO 6: GOBERNANZA & LIDERAZGO INSTITUCIONAL
          ================================================================= */}
      <section id="liderazgo" className="py-28 px-8 md:px-20 relative bg-[#f5efe3] border-t border-[#d8ceb6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl text-[#2d2618] font-light mb-4">
              Liderazgo del Consejo Global Ambiental
            </h2>
            <p className="text-sm text-[#6b6048] font-light max-w-xl mx-auto leading-relaxed font-sans">
              Órgano colegiado de alta dirección que articula la diplomacia internacional, la investigación científica y la ejecución territorial.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Presidente */}
            <div className="rounded-3xl bg-[#eae4d2]/50 border border-[#d8ceb6]/80 hover:bg-[#f5efe3]/40 hover:backdrop-blur-xl hover:backdrop-saturate-150 hover:border-[#d8ceb6]/60 hover:shadow-[0_8px_30px_rgba(45,38,24,0.06)] hover:-translate-y-1.5 transition-all duration-300 grid grid-cols-1 sm:grid-cols-12 overflow-hidden group cursor-pointer">
              {/* Columna Izquierda: Imagen */}
              <div className="sm:col-span-5 h-64 sm:h-full min-h-[260px] relative overflow-hidden bg-[#e0d6be]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&auto=format"
                  alt="Mtro. Luis García González"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Columna Derecha: Información */}
              <div className="sm:col-span-7 p-8 sm:p-9 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light leading-snug group-hover:text-[#3a4a18] transition-colors mb-1">
                    Mtro. Luis García González
                  </h3>
                  <p className="text-xs text-[#5a6b2a] font-semibold tracking-wide mb-5">
                    Consejero Presidente y Fundador
                  </p>
                  <p className="text-xs sm:text-[13px] text-[#6b6048] font-light leading-relaxed mb-6 font-sans">
                    Con amplia experiencia en diplomacia multilateral y gobernanza ambiental de alto nivel. Ha impulsado acuerdos vinculantes con organismos internacionales y consolidado marcos de resiliencia ecosistémica.
                  </p>
                </div>

                <Link
                  to="/gobernanza"
                  className="pt-4 border-t border-[#d8ceb6]/60 flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-[#4a5a22] group-hover:text-[#2d2618] transition-colors"
                >
                  <div>Conocer trayectoria institucional</div>
                  <div className="transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</div>
                </Link>
              </div>
            </div>

            {/* Secretario Ejecutivo */}
            <div className="rounded-3xl bg-[#eae4d2]/50 border border-[#d8ceb6]/80 hover:bg-[#f5efe3]/40 hover:backdrop-blur-xl hover:backdrop-saturate-150 hover:border-[#d8ceb6]/60 hover:shadow-[0_8px_30px_rgba(45,38,24,0.06)] hover:-translate-y-1.5 transition-all duration-300 grid grid-cols-1 sm:grid-cols-12 overflow-hidden group cursor-pointer">
              {/* Columna Izquierda: Imagen */}
              <div className="sm:col-span-5 h-64 sm:h-full min-h-[260px] relative overflow-hidden bg-[#e0d6be]">
                <img
                  src={franciscoSolorioImg}
                  alt="Mtro. Francisco Solorio"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Columna Derecha: Información */}
              <div className="sm:col-span-7 p-8 sm:p-9 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light leading-snug group-hover:text-[#3a4a18] transition-colors mb-1">
                    Mtro. Francisco Solorio
                  </h3>
                  <p className="text-xs text-[#5a6b2a] font-semibold tracking-wide mb-5">
                    Secretario Ejecutivo y Fundador
                  </p>
                  <p className="text-xs sm:text-[13px] text-[#6b6048] font-light leading-relaxed mb-6 font-sans">
                    Especialista en gestión técnica, cooperación territorial y alianzas público-privadas. Encabeza el despliegue operativo en campo, la vinculación con ejidos y comunidades, y la implementación de los proyectos galardonados.
                  </p>
                </div>

                <Link
                  to="/gobernanza"
                  className="pt-4 border-t border-[#d8ceb6]/60 flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-[#4a5a22] group-hover:text-[#2d2618] transition-colors"
                >
                  <div>Conocer coordinación operativa</div>
                  <div className="transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          CAPÍTULO 7: IMPACTO TERRITORIAL MEDIBLE (Cifras Reales V1)
          ================================================================= */}
      <section id="oceano" className="py-28 px-8 md:px-20 relative bg-[#f5efe3] border-t border-[#e0d4ba]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#5a6b2a] font-bold mb-3">
                Métricas & Resultados
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#2d2618] font-light">
                Cifras que transforman el territorio
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-sm text-[#6b6048] font-light leading-relaxed font-sans">
                Reflejo directo de nuestro compromiso con la gobernanza ambiental, la cooperación institucional y la acción directa en campo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {[
              { num: "01", val: "16,890+", label: "Personas beneficiarias", sub: "Comunidades y ejidos capacitados en territorio" },
              { num: "02", val: "1,500+", label: "Semillas nativas conservadas", sub: "Bancos comunitarios de germoplasma activo" },
              { num: "03", val: "44", label: "Recorridos territoriales", sub: "Inspección técnica y dictamen en campo" },
              { num: "04", val: "31k+", label: "Alcance en divulgación", sub: "Incidencia socioambiental activa en medios" },
            ].map((s, idx) => (
              <div
                key={idx}
                className="group relative p-8 sm:p-9 rounded-3xl bg-[#eae4d2]/50 border border-[#d8ceb6]/80 hover:bg-[#f5efe3]/40 hover:backdrop-blur-xl hover:backdrop-saturate-150 hover:border-[#d8ceb6]/60 hover:shadow-[0_8px_30px_rgba(45,38,24,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Specular Edge Highlight on Hover */}
                <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#7a6e58] group-hover:text-[#4a5a22] transition-colors mb-6">
                    Métrica {s.num}
                  </div>
                  <div className="font-serif text-4xl sm:text-5xl text-[#3a4a18] font-light tracking-tight mb-4 group-hover:scale-105 transition-transform duration-300 origin-left">
                    {s.val}
                  </div>
                  <h3 className="text-sm sm:text-[15px] text-[#2d2618] font-semibold mb-2 leading-snug font-sans">
                    {s.label}
                  </h3>
                  <p className="text-xs text-[#7a6e58] font-light font-sans leading-relaxed">
                    {s.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          CAPÍTULO 8: MANIFIESTO INTERACTIVO POR LA TIERRA (2 Columnas)
          ================================================================= */}
      <section id="manifiesto" className="py-24 sm:py-32 px-6 sm:px-12 md:px-20 relative bg-[#f5efe3] border-t border-[#e0d4ba]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Columna Izquierda: Manifiesto Editorial y Declaración */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="text-[11px] uppercase tracking-[0.28em] font-semibold text-[#5a6b2a]">
                  Manifiesto Institucional
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] text-[#2d2618] font-light leading-[1.18]">
                  El planeta no es un recurso.<br />
                  <span className="italic text-[#4a5a22] font-normal">Es nuestra relación más sagrada.</span>
                </h2>
              </div>

              <p className="text-sm sm:text-[15px] text-[#5c523e] font-light leading-relaxed font-sans">
                Súmate a la red de personas, especialistas e instituciones que impulsan la gobernanza ambiental. Recibe reportes técnicos, guías de acción territorial e iniciativas conjuntas.
              </p>

              <div className="pt-6 border-t border-[#d8ceb6]/60 flex items-center gap-4">
                <div className="w-8 h-[1px] bg-[#4a5a22]/40" />
                <div className="text-xs uppercase tracking-[0.2em] text-[#7a6e58] font-sans font-medium">
                  Consejo Global Ambiental &bull; 2026
                </div>
              </div>
            </div>

            {/* Columna Derecha: Acta de Adhesión en Card Editorial Liquid Glass */}
            <div className="lg:col-span-7 w-full">
              <div className="p-8 sm:p-10 rounded-2xl bg-[#eae4d2]/60 backdrop-blur-xl border border-[#d8ceb6] shadow-[0_10px_35px_rgba(45,38,24,0.06)]">
                
                <div className="mb-7 pb-5 border-b border-[#d8ceb6]/60 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#5a6b2a] mb-1">
                      Acta de Adhesión
                    </div>
                    <h3 className="font-serif text-2xl text-[#2d2618] font-light">
                      Firma del Manifiesto
                    </h3>
                  </div>
                  <div className="text-xs text-[#7a6e58] font-light font-sans hidden sm:block">
                    Pacto Territorial
                  </div>
                </div>

                <form onSubmit={handlePledge} className="space-y-5 font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#5c523e] mb-2 font-semibold">
                        Nombre o Institución
                      </label>
                      <input
                        type="text"
                        required
                        value={pledgeName}
                        onChange={(e) => setPledgeName(e.target.value)}
                        placeholder="Tu nombre o institución"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/90 border border-[#cfc4ab] text-[#2d2618] placeholder-[#9e9077] focus:outline-none focus:border-[#4a5a22] focus:bg-white focus:ring-1 focus:ring-[#4a5a22] transition-all text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#5c523e] mb-2 font-semibold">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="correo@ejemplo.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/90 border border-[#cfc4ab] text-[#2d2618] placeholder-[#9e9077] focus:outline-none focus:border-[#4a5a22] focus:bg-white focus:ring-1 focus:ring-[#4a5a22] transition-all text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#5c523e] mb-2 font-semibold">
                      Tu Compromiso Principal
                    </label>
                    <div className="relative">
                      <select className="w-full appearance-none px-4 py-3.5 pr-10 rounded-xl bg-white/90 border border-[#cfc4ab] text-[#2d2618] focus:outline-none focus:border-[#4a5a22] focus:bg-white focus:ring-1 focus:ring-[#4a5a22] transition-all text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] cursor-pointer">
                        <option value="forest">Protección y Reforestación de Bosques Nativos</option>
                        <option value="ocean">Conservación de Océanos y Arrecifes Marinos</option>
                        <option value="soil">Regeneración y Salud del Suelo de Conservación</option>
                        <option value="education">Conciencia, Investigación y Educación Ambiental</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#7a6e58]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl bg-[#334215] hover:bg-[#24300d] text-[#f5efe3] font-semibold text-xs uppercase tracking-[0.22em] transition-all duration-300 shadow-[0_4px_16px_rgba(51,66,21,0.25)] hover:shadow-[0_6px_24px_rgba(51,66,21,0.35)] hover:-translate-y-0.5 flex items-center justify-center gap-3 group cursor-pointer mt-3"
                  >
                    <span>Firmar el Manifiesto por la Tierra</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-sans text-base leading-none">&rarr;</span>
                  </button>
                </form>

                {pledgeSubmitted && (
                  <div className="mt-6 p-5 rounded-xl bg-[#4a5a22]/15 border border-[#4a5a22]/30 text-center font-sans animate-fade-in">
                    <h4 className="font-serif text-lg text-[#2d2618] mb-1 font-light">Compromiso Registrado Oficialmente</h4>
                    <p className="text-xs text-[#4a5a22] font-medium">
                      Gracias {pledgeName ? pledgeName : ''}. Tu adhesión institucional ha sido registrada.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer General */}
      <FooterNav />
    </main>
  );
}
