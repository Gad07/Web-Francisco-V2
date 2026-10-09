import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, ArrowRight, ShieldCheck, Bell } from 'lucide-react';

export default function PopUpRenderer({ popup, onClose, isPreview = false, isInline = false }) {
  if (!popup || (!popup.enabled && !isPreview && !isInline)) return null;

  const design = popup.designType || 'split-modal';
  const corner = popup.cornerPosition || 'bottom-right';
  const showCta = popup.hasCtaButton !== false && Boolean(popup.ctaText) && Boolean(popup.ctaLink);

  // Helper para verificar si un color hexadecimal es oscuro
  const isDarkBg = (hex) => {
    if (!hex) return false;
    const clean = hex.replace('#', '');
    if (clean.length === 3) {
      const r = parseInt(clean[0] + clean[0], 16);
      const g = parseInt(clean[1] + clean[1], 16);
      const b = parseInt(clean[2] + clean[2], 16);
      return (r * 299 + g * 587 + b * 114) / 1000 < 140;
    }
    if (clean.length === 6) {
      const r = parseInt(clean.substring(0, 2), 16);
      const g = parseInt(clean.substring(2, 4), 16);
      const b = parseInt(clean.substring(4, 6), 16);
      return (r * 299 + g * 587 + b * 114) / 1000 < 140;
    }
    return false;
  };

  // ─────────────────────────────────────────────────────────────
  // DISEÑO 4: FLOATING CORNER (TOAST / TARJETA FLOTANTE DE ESQUINA)
  // ─────────────────────────────────────────────────────────────
  if (design === 'floating-corner') {
    return (
      <div
        className={
          isInline
            ? `relative w-full flex ${
                corner === 'bottom-left' ? 'justify-start' : 'justify-end'
              } p-4 bg-[#ebe5d3] rounded-2xl border border-[#d8ceb6] min-h-[260px] items-end`
            : `fixed z-50 p-4 sm:p-6 pointer-events-none ${
                corner === 'bottom-left' ? 'bottom-0 left-0' : 'bottom-0 right-0'
              }`
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto relative w-full max-w-sm rounded-2xl bg-[#eae4d2]/95 border border-[#d8ceb6] shadow-2xl backdrop-blur-md p-4 space-y-3"
        >
          {/* Botón Cerrar (X) */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/70 hover:bg-white border border-[#d8ceb6] flex items-center justify-center text-[#2d2618] transition-colors"
            title="Cerrar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-start gap-3">
            {popup.image ? (
              <img
                src={popup.image}
                alt=""
                className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#d8ceb6] shadow-xs"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-[#4a5a22] text-[#f5efe3] flex items-center justify-center shrink-0 shadow-xs">
                <Bell className="w-6 h-6 stroke-[1.5]" />
              </div>
            )}

            <div className="space-y-0.5 pr-5">
              {popup.highlightBadge && (
                <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-[#4a5a22]">
                  {popup.highlightBadge}
                </span>
              )}
              <h4 className="font-serif text-sm font-semibold text-[#2d2618] leading-tight line-clamp-2">
                {popup.title}
              </h4>
            </div>
          </div>

          <p className="text-[11px] text-[#5a503a] font-light leading-relaxed line-clamp-2">
            {popup.message}
          </p>

          <div className="pt-1">
            {showCta ? (
              <Link
                to={popup.ctaLink}
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] font-bold text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>{popup.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <button
                onClick={onClose}
                className="w-full py-2 px-4 rounded-xl bg-white hover:bg-[#f5efe3] text-xs font-semibold text-[#2d2618] border border-[#d8ceb6] transition-colors text-center"
              >
                Entendido
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // CONTENEDOR MODAL CON FONDO OSCURECIDO (Diseños 1, 2 y 3)
  // ─────────────────────────────────────────────────────────────
  return (
    <div
      className={
        isInline
          ? 'relative w-full flex items-center justify-center p-4 sm:p-6 bg-[#2d2618]/15 rounded-2xl border border-[#d8ceb6] overflow-hidden min-h-[420px]'
          : 'fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto'
      }
    >
      {/* ─────────────────────────────────────────────────────────────
          DISEÑO 1: CLASSIC HERO (IMAGEN SUPERIOR CON GRADIENTE)
         ───────────────────────────────────────────────────────────── */}
      {design === 'classic-hero' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg rounded-3xl bg-[#f5efe3] text-[#2d2618] border border-[#d8ceb6] shadow-2xl overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#eae4d2]/80 hover:bg-[#d8ceb6] border border-[#d8ceb6] flex items-center justify-center text-[#2d2618] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {popup.image && (
            <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-[#eae4d2]">
              <img src={popup.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#f5efe3] via-transparent to-transparent" />
            </div>
          )}

          <div className="p-6 sm:p-8 space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl text-[#2d2618] font-medium leading-snug">
              {popup.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#5a503a] font-light leading-relaxed">
              {popup.message}
            </p>

            <div className="pt-3">
              {showCta ? (
                <Link
                  to={popup.ctaLink}
                  onClick={onClose}
                  className="w-full py-3 px-5 rounded-xl bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] font-bold text-xs uppercase tracking-wider transition-all shadow-md text-center flex items-center justify-center gap-2"
                >
                  <span>{popup.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <button
                  onClick={onClose}
                  className="w-full py-3 px-5 rounded-xl bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] font-bold text-xs uppercase tracking-wider text-center transition-colors shadow-md"
                >
                  Entendido / Cerrar Aviso
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          DISEÑO 2: SPLIT MODAL (DOS COLUMNAS: VISUAL IZQ + CONTENIDO DER)
         ───────────────────────────────────────────────────────────── */}
      {design === 'split-modal' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl sm:max-w-3xl rounded-3xl bg-[#f5efe3] text-[#2d2618] border border-[#d8ceb6] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#eae4d2]/80 hover:bg-[#d8ceb6] border border-[#d8ceb6] flex items-center justify-center text-[#2d2618] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Columna Izquierda: Imagen limpia sin sobreimpresiones */}
          <div className="md:col-span-5 relative h-48 md:h-full min-h-[220px] bg-[#eae4d2] overflow-hidden">
            <img
              src={popup.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&fit=crop'}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Columna Derecha: Contenido Editorial */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-serif text-xl sm:text-2xl text-[#2d2618] font-medium leading-snug">
                {popup.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#5a503a] font-light leading-relaxed">
                {popup.message}
              </p>
            </div>

            <div className="pt-4">
              {showCta ? (
                <Link
                  to={popup.ctaLink}
                  onClick={onClose}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] font-bold text-xs uppercase tracking-wider transition-all shadow-md text-center flex items-center justify-center gap-2"
                >
                  <span>{popup.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <button
                  onClick={onClose}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] font-bold text-xs uppercase tracking-wider text-center transition-colors shadow-md"
                >
                  Cerrar Aviso
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          DISEÑO 3: PERSONALIZADO / MINIMALISTA (COLOR SÓLIDO / DEGRADADO / IMAGEN / ELEMENTO PNG)
         ───────────────────────────────────────────────────────────── */}
      {design === 'botanical-solid' && (() => {
        const bgType = popup.bgType || (popup.bgImage ? 'image' : popup.pngElement ? 'element' : 'solid');
        const customBg = popup.bgColor || '#eae4d2';
        const secBg = popup.gradientSecondaryColor || '#f5efe3';
        const hasGrad = popup.hasGradient === true;
        const gradDir = popup.gradientDirection || 'to-b';

        let bgStyle = {};
        if (bgType === 'solid') {
          if (hasGrad) {
            if (gradDir === 'to-b') {
              bgStyle = { background: `linear-gradient(to bottom, ${customBg}, ${secBg})` };
            } else if (gradDir === 'to-r') {
              bgStyle = { background: `linear-gradient(to right, ${customBg}, ${secBg})` };
            } else if (gradDir === 'to-br') {
              bgStyle = { background: `linear-gradient(135deg, ${customBg}, ${secBg})` };
            } else if (gradDir === 'radial') {
              bgStyle = { background: `radial-gradient(circle, ${customBg}, ${secBg})` };
            }
          } else {
            bgStyle = { backgroundColor: customBg };
          }
        } else {
          bgStyle = { backgroundColor: '#eae4d2' };
        }

        const isDark = (isDarkBg(customBg) || (hasGrad && isDarkBg(secBg))) && bgType === 'solid';
        const textColor = isDark ? 'text-[#f5efe3]' : 'text-[#2d2618]';
        const subTextColor = isDark ? 'text-[#f5efe3]/80' : 'text-[#5a503a]';

        // Posicionamiento de Elemento PNG / Ilustración
        const getElementPositionClass = () => {
          const pos = popup.elementPosition || 'bottom-right';
          if (pos === 'bottom-right') return 'bottom-0 right-0 -mb-6 -mr-6';
          if (pos === 'bottom-left') return 'bottom-0 left-0 -mb-6 -ml-6';
          if (pos === 'top-right') return 'top-0 right-0 -mt-6 -mr-6';
          if (pos === 'top-left') return 'top-0 left-0 -mt-6 -ml-6';
          if (pos === 'center') return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
          return 'bottom-0 right-0 -mb-6 -mr-6';
        };

        // Tamaño de Elemento PNG
        const getElementSizeClass = () => {
          const sz = popup.elementSize || 'md';
          if (sz === 'sm') return 'w-36 h-36';
          if (sz === 'md') return 'w-52 h-52';
          if (sz === 'lg') return 'w-72 h-72';
          if (sz === 'xl') return 'w-96 h-96';
          return 'w-52 h-52';
        };

        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={bgStyle}
            className={`relative w-full max-w-lg rounded-3xl ${textColor} border border-[#d8ceb6] shadow-2xl p-7 sm:p-10 space-y-5 overflow-hidden`}
          >
            {/* 1. IMAGEN DE FONDO TOTAL */}
            {bgType === 'image' && (popup.bgImage || popup.image) && (
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <img
                  src={popup.bgImage || popup.image}
                  alt=""
                  style={{
                    opacity: (popup.bgOpacity !== undefined ? popup.bgOpacity : 80) / 100,
                    filter:
                      popup.bgFilter === 'grayscale'
                        ? 'grayscale(100%)'
                        : popup.bgFilter === 'blur'
                        ? 'blur(4px)'
                        : 'none',
                  }}
                  className="w-full h-full object-cover"
                />
                {/* Capa de contraste */}
                {popup.bgOverlay === 'dark' && (
                  <div className="absolute inset-0 bg-black/50" />
                )}
                {popup.bgOverlay === 'light' && (
                  <div className="absolute inset-0 bg-[#f5efe3]/60 backdrop-blur-[1px]" />
                )}
              </div>
            )}

            {/* 2. ELEMENTO SIN FONDO (PNG / SVG / ILUSTRACIÓN) */}
            {bgType === 'element' && (popup.pngElement || popup.image) && (
              <div
                aria-hidden
                style={{
                  opacity: (popup.elementOpacity !== undefined ? popup.elementOpacity : 30) / 100,
                  filter: popup.elementFilter === 'grayscale' ? 'grayscale(100%)' : 'none',
                }}
                className={`absolute pointer-events-none select-none z-0 ${getElementPositionClass()} ${getElementSizeClass()}`}
              >
                <img
                  src={popup.pngElement || popup.image || '/imagenes/Rama 2.svg'}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            {/* BOTÓN CERRAR (X) */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/70 hover:bg-white border border-[#d8ceb6] flex items-center justify-center text-[#2d2618] transition-colors shadow-xs"
            >
              <X className="w-4 h-4" />
            </button>

            {/* CONTENIDO EDITORIAL */}
            <div className="space-y-2 relative z-10">
              <h3 className="font-serif text-2xl font-normal leading-snug">
                {popup.title}
              </h3>
              <p className={`text-xs sm:text-sm ${subTextColor} font-light leading-relaxed`}>
                {popup.message}
              </p>
            </div>

            <div className="pt-2 relative z-10">
              {showCta ? (
                <Link
                  to={popup.ctaLink}
                  onClick={onClose}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] font-bold text-xs uppercase tracking-widest transition-all shadow-md text-center flex items-center justify-center gap-2"
                >
                  <span>{popup.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <button
                  onClick={onClose}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] font-bold text-xs uppercase tracking-widest text-center transition-all shadow-md"
                >
                  Cerrar Aviso
                </button>
              )}
            </div>
          </motion.div>
        );
      })()}
    </div>
  );
}
