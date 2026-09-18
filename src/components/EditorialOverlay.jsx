import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import StoneSequence from './StoneSequence';

export default function EditorialOverlay({
  isLoaded,
  loadingProgress,
  onEnter,
  isAudioActive,
  onToggleAudio,
  scrollProgress
}) {
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);
  const branchContainerRef = useRef(null);
  const maskRef = useRef(null);
  const fgMaskRef = useRef(null);
  const interdependenciaRef = useRef(null);

  const [stoneFrame, setStoneFrame] = useState(0);

  const { scrollYProgress: interScroll } = useScroll({
    target: interdependenciaRef,
    offset: ["start start", "end end"]
  });

  // Fade out text early during scroll
  const interTextOpacity = useTransform(interScroll, [0, 0.25, 0.35], [1, 1, 0]);

  // Update stone frame based on scroll progress after text fades out
  useMotionValueEvent(interScroll, "change", (latest) => {
    if (latest <= 0.35) {
      setStoneFrame(0);
    } else {
      const progress = (latest - 0.35) / 0.65;
      setStoneFrame(Math.min(119, Math.floor(progress * 120)));
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

  let chapterName = 'TIERRA';
  if (scrollProgress >= 0.25 && scrollProgress < 0.55) chapterName = 'RAÍCES';
  else if (scrollProgress >= 0.55 && scrollProgress < 0.75) chapterName = 'PORTAL';
  else if (scrollProgress >= 0.75) chapterName = 'OCÉANO';

  // Determine theme
  const isLightMode = scrollProgress < 0.35;
  const navText = isLightMode ? 'text-slate-800 hover:text-emerald-700' : 'text-slate-300 hover:text-[#c8d898]';
  const logoText = isLightMode ? 'text-slate-900 hover:text-emerald-700' : 'text-white hover:text-[#c8d898]';
  const navBtnBg = isLightMode ? 'border-slate-300 bg-white/50 text-slate-800' : 'border-white/10 bg-white/5 text-slate-300';
  const pulseColor = isLightMode ? 'bg-emerald-600' : 'bg-emerald-400';
  // Active navigation section based on scroll
  let activeNav = 'hero';
  if (scrollProgress >= 0.28 && scrollProgress < 0.60) activeNav = 'interdependencia';
  else if (scrollProgress >= 0.60 && scrollProgress < 0.85) activeNav = 'oceano';
  else if (scrollProgress >= 0.85) activeNav = 'manifiesto';

  return (
    <>
      {/* ── NAVBAR ── */}
      <header
        id="main-nav"
        className={`fixed top-4 md:top-5 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl z-40 px-4 md:px-6 h-[52px] md:h-[58px] rounded-full flex items-center justify-between transition-all duration-700 overflow-visible ${!isLoaded ? 'opacity-0 pointer-events-none -translate-y-8' : 'opacity-100 translate-y-0'
          } bg-[#f5efe3]/80 backdrop-blur-2xl backdrop-saturate-150 ring-1 ring-[#e0d4ba]/60 shadow-[0_4px_24px_rgba(80,60,20,0.10)] text-[#3a3020]`}
      >
        {/* Logo — desborda la cápsula verticalmente */}
        <a
          href="#hero"
          className="flex items-center flex-shrink-0 transition-transform duration-300 hover:scale-[1.04]"
        >
          <img
            src="/logos/Logo Bg transparente.svg"
            alt="Consejo Global Ambiental"
            className="h-[68px] md:h-[78px] w-auto object-contain drop-shadow-none"
          />
        </a>

        {/* Centro: Links de navegación */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[12.5px] lg:text-[13px] tracking-[0.06em] font-sans font-medium">
          {[
            { id: 'hero', label: 'La Tierra' },
            { id: 'interdependencia', label: 'Raíces y Bosques' },
            { id: 'oceano', label: 'El Océano' },
            { id: 'manifiesto', label: 'Manifiesto' },
          ].map((item) => {
            const isActive = activeNav === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative pb-0.5 transition-colors duration-200 ${
                  isActive
                    ? 'text-[#3a3020] font-semibold'
                    : 'text-[#7a6e58] hover:text-[#3a3020]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-[#6b7c3a] rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Derecha: Botón Actuar */}
        <a
          href="#manifiesto"
          className="flex items-center gap-1.5 bg-[#4a5a22] hover:bg-[#3a4a18] text-[#f5efe3] text-[11px] md:text-[12px] font-semibold tracking-[0.12em] uppercase px-5 py-2 rounded-full transition-colors duration-200 group flex-shrink-0"
        >
          <span>Actuar</span>
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </a>
      </header>

      <main className={`relative z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* CAPÍTULO 1: LA TIERRA VIVA (Light Mode) */}
        <section
          id="hero"
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
          className="h-screen w-full min-h-screen relative flex items-center px-8 md:px-20 lg:px-28 pt-24 pb-12 overflow-hidden bg-[#f5efe3]"
        >

          {/* ── Rama SVG Capa Fondo (Pasa por DETRÁS de la "o" y del texto) ── */}
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
            {/* Rama 1 (Base limpia) */}
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

            {/* Rama 2 (Revelada bajo el foco del cursor) */}
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
              {/* Línea 1: "No hay afuera," */}
              <span className="block whitespace-nowrap">
                <span className="relative z-30">No hay afuera,</span>
              </span>

              {/* Línea 2: "solo un mundo" con "o" entrelazada con la rama */}
              <span className="italic font-normal text-[#5a6b2a] block whitespace-nowrap">
                <span className="relative z-30">solo un mund</span>
                {/* ── Letra "o" entrelazada: entra por encima del lado derecho (z-0) y sale por debajo del lado izquierdo (z-30) ── */}
                <span className="relative inline-block">
                  {/* Lado izquierdo de la 'o' pasa por ENCIMA de la punta de la rama (z-30) */}
                  <span
                    className="absolute inset-0 z-30 pointer-events-none select-none"
                    style={{ clipPath: 'polygon(0% 0%, 65% 0%, 42% 100%, 0% 100%)' }}
                    aria-hidden="true"
                  >
                    o
                  </span>
                  {/* Lado derecho de la 'o' pasa por DETRÁS de la rama entrante (z-0) */}
                  <span className="relative z-0">o</span>
                </span>
              </span>

              {/* Línea 3: "que sostener." */}
              <span className="italic font-normal text-[#5a6b2a] block whitespace-nowrap">
                <span className="relative z-30">que sostener.</span>
              </span>
            </h1>

            <div className="flex items-center">
              <a
                href="#interdependencia"
                className="inline-flex items-center gap-3 text-[#8a7e68] hover:text-[#5a6b2a] transition-colors group cursor-pointer"
              >
                <span className="text-xs uppercase tracking-[0.3em] font-sans font-medium">Scroll</span>
                <motion.span
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-base text-[#6b7c3a]"
                >
                  &darr;
                </motion.span>
              </a>
            </div>
          </div>
        </section>


        {/* CAPÍTULO 2: RAÍCES Y BOSQUES — fondo blanco como el hero, sección pegajosa */}
        <section
          id="interdependencia"
          ref={interdependenciaRef}
          className="h-[300vh] relative bg-[#f5efe3]"
        >
          <div className="sticky top-0 h-screen w-full flex items-center justify-center px-8 md:px-12 lg:px-20 overflow-hidden">
            
            {/* Animación de la Piedra centrada */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'min(45vw, 550px)',
                aspectRatio: '16/9',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            >
              {stoneFrame === 0 ? (
                <img
                  src="/imagenes/Piedra.png"
                  alt="Piedra"
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                  draggable={false}
                />
              ) : (
                <StoneSequence frameIndex={stoneFrame} />
              )}
            </div>

            {/* Contenido de texto dividido a los lados, se desvanece al hacer scroll */}
            <motion.div 
              style={{ opacity: interTextOpacity }}
              className="w-full max-w-[1400px] flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 pointer-events-none"
            >
              {/* Lado Izquierdo: Textos principales */}
              <div className="w-full md:w-[30%] text-left pointer-events-auto">
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2d2618] tracking-tight leading-[1.06] mb-7 font-light">
                  La trama viva<br />
                  <span className="italic text-[#5a6b2a] font-normal">de las raíces.</span>
                </h2>

                <p className="font-sans text-base sm:text-lg text-[#6b6048] font-light leading-relaxed max-w-sm">
                  En las profundidades del suelo, una inmensa red de raíces y micelio conecta cada árbol en una sinfonía silenciosa. Lo que ocurre en la copa de un roble alimenta la vida bajo la corteza terrestre.
                </p>
              </div>

              {/* Lado Derecho: Cards */}
              <div className="w-full md:w-[32%] flex flex-col gap-5 pointer-events-auto">
              <div className="p-6 rounded-2xl bg-[#ede8d8]/90 border border-[#ccc4a8] shadow-sm backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] rounded-t-2xl bg-gradient-to-r from-[#8a9a4a] to-transparent" />
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#5a6b2a] mb-3 font-sans font-semibold">El Suelo Vivo</div>
                <div className="font-serif text-2xl md:text-3xl text-[#2d2618] font-light mb-2">Metabolismo<br />Vital</div>
                <p className="text-xs text-[#7a6e58] leading-relaxed font-sans">
                  El suelo alberga más del <span className="text-[#4a5a22] font-semibold">50%</span> de todas las especies vivas de la Tierra.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#ede8d8]/90 border border-[#ccc4a8] shadow-sm backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] rounded-t-2xl bg-gradient-to-r from-[#7a9060] to-transparent" />
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#4a6a30] mb-3 font-sans font-semibold">Canopea &amp; Oxígeno</div>
                <div className="font-serif text-2xl md:text-3xl text-[#2d2618] font-light mb-2">Pulmón<br />Verde</div>
                <p className="text-xs text-[#7a6e58] leading-relaxed font-sans">
                  Cada hectárea de bosque primario purifica <span className="text-[#4a5a22] font-semibold">millones de litros</span> de agua y aire al año.
                </p>
              </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 3: EL PORTAL A LA ROCA Y LA HOJA */}
        <section id="portal" className="min-h-screen relative flex items-center justify-center px-8 text-center py-36 bg-[#f5efe3]">
          <div className="max-w-3xl z-20">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#a0a870]/30 bg-[#eae4d2] backdrop-blur-md mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6b7c3a]"></span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#5a6b2a] font-sans">Transición Orgánica</span>
            </div>

            <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl text-[#2d2618] tracking-tight leading-none mb-8 font-light">
              Entrar en la roca y la hoja.
            </h2>

            <p className="font-sans text-base sm:text-xl text-[#6b6048] font-light max-w-xl mx-auto leading-relaxed mb-10">
              La mirada desciende a través de la textura mineral de la roca y la savia vegetal, atravesando el umbral hacia el santuario más profundo del planeta: el océano.
            </p>

            <div className="text-xs text-[#7a6e58] tracking-[0.3em] uppercase font-sans animate-pulse">
              Desliza hacia la profundidad
            </div>
          </div>
        </section>

        {/* CAPÍTULO 4: EL OCÉANO AZUL */}
        <section id="oceano" className="min-h-screen relative flex items-center px-8 md:px-20 lg:px-28 py-36 bg-[#f5efe3]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#a0a870]/30 bg-[#eae4d2] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6b7c3a] animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#5a6b2a] font-sans font-medium">El Bosque y el Suelo</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#2d2618] tracking-tight leading-[1.05] mb-8 font-light">
              Lo que cuidamos en tierra respira bajo el agua.
            </h2>

            <p className="font-sans text-base sm:text-lg text-slate-200 font-light leading-relaxed mb-10">
              En la inmensidad del océano, la luz del sol baila entre los arrecifes y el fitoplancton genera el aliento de nuestro planeta. Proteger los mares es proteger la continuidad de la vida.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1 p-6 rounded-2xl border border-white/10 bg-blue-950/40 backdrop-blur-lg">
                <div className="text-xs uppercase tracking-widest text-cyan-300 mb-2 font-sans">El Pulmón del Planeta</div>
                <div className="font-serif text-3xl text-white font-light">70% del Oxígeno</div>
                <p className="text-xs text-slate-300 mt-2 font-sans font-light leading-relaxed">
                  Generado pacientemente por los microorganismos marinos en las capas superficiales.
                </p>
              </div>
              <div className="flex-1 p-6 rounded-2xl border border-white/10 bg-blue-950/40 backdrop-blur-lg">
                <div className="text-xs uppercase tracking-widest text-blue-300 mb-2 font-sans">Regulador Térmico</div>
                <div className="font-serif text-3xl text-white font-light">El Latido Azul</div>
                <p className="text-xs text-slate-300 mt-2 font-sans font-light leading-relaxed">
                  Las corrientes marinas distribuyen el calor y hacen habitable cada rincón del mundo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 5: MANIFIESTO & COMPROMISO */}
        <section id="manifiesto" className="min-h-screen relative flex items-center justify-center px-8 md:px-14 py-36">
          <div className="max-w-4xl w-full p-8 md:p-16 rounded-3xl border border-white/15 bg-gradient-to-b from-slate-900/60 via-black/80 to-black backdrop-blur-2xl relative overflow-hidden shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="text-xs uppercase tracking-[0.25em] text-[#a0b870] mb-3 font-sans">El Pacto por la Tierra</div>
              <h2 className="font-serif text-4xl sm:text-6xl text-white font-light tracking-tight mb-6">
                El planeta no es un recurso.<br />
                <span className="italic font-normal">Es nuestra relación más sagrada.</span>
              </h2>
              <p className="text-slate-300 font-sans text-sm sm:text-base font-light leading-relaxed">
                Súmate a la visión del Consejo Global Ambiental para salvaguardar los bosques, restaurar los suelos y proteger la inmensidad de los océanos.
              </p>
            </div>

            <form onSubmit={handlePledge} className="space-y-5 max-w-xl mx-auto font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-light">Nombre / Organización</label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre o institución"
                    className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-300 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-light">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    placeholder="correo@ejemplo.com"
                    className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#a0b870] transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-light">Tu Compromiso Principal</label>
                <select className="w-full px-5 py-3.5 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-[#a0b870] transition-colors text-sm">
                  <option value="forest">Protección y Reforestación de Bosques Nativos</option>
                  <option value="ocean">Conservación de Océanos y Arrecifes Marinos</option>
                  <option value="soil">Regeneración y Salud del Suelo</option>
                  <option value="education">Conciencia y Educación Ambiental</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#f5efe3] text-[#2d2618] font-medium text-xs uppercase tracking-widest hover:bg-[#d8d0b8] transition-all shadow-lg mt-4"
              >
                Firmar el Manifiesto por la Tierra &rarr;
              </button>
            </form>

            {pledgeSubmitted && (
              <div className="mt-8 p-5 rounded-2xl bg-[#3a4a18]/60 border border-[#8a9a4a]/40 text-center font-sans text-sm text-[#c8d898] font-light">
                ✓ Gracias por sumarte al Consejo Global Ambiental. Tu compromiso ha sido registrado en favor de nuestro planeta.
              </div>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-black px-8 md:px-20 py-12 text-slate-400 text-xs font-sans">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8a9a4a]"></span>
              <span className="text-white font-serif text-base tracking-wide">Consejo Global Ambiental</span>
            </div>
            <div className="flex items-center gap-8 text-xs tracking-widest uppercase">
              <a href="#hero" className="hover:text-[#c8d898] transition-colors">Inicio</a>
              <a href="#interdependencia" className="hover:text-[#c8d898] transition-colors">Tierra</a>
              <a href="#oceano" className="hover:text-[#c8d898] transition-colors">Océano</a>
              <a href="#manifiesto" className="hover:text-[#c8d898] transition-colors">Manifiesto</a>
            </div>
            <div className="text-slate-500">
              &copy; 2026 Consejo Global Ambiental. Todos los derechos reservados.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
