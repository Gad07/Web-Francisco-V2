import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/index.jsx';

export function PageHero({
  titleWhite,
  titleGreen,
  description,
  bgImage
}) {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center pt-20 pb-16 px-6 overflow-hidden bg-[#f5efe3] border-b border-[#e0d4ba] select-none">
      
      {/* ─── 1. LIANA BOTÁNICA SUPERIOR IZQUIERDA (Cuelga desde la esquina) ─── */}
      <motion.div
        initial={{ opacity: 0, x: -70, y: -50 }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-[6%] -left-[6%] sm:-top-[8%] sm:-left-[4%] w-[min(65vw,720px)] pointer-events-none z-0"
      >
        <motion.img
          animate={{
            y: [0, -10, 0],
            rotate: [-12, -9, -12],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          src="/imagenes/Liana.png"
          alt={t({ es: 'Liana Botánica Superior', en: 'Upper Botanical Vine' })}
          className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(45,38,24,0.18)]"
          draggable={false}
        />
      </motion.div>

      {/* ─── 2. LIANA BOTÁNICA INFERIOR DERECHA (Asciende desde la esquina) ─── */}
      <motion.div
        initial={{ opacity: 0, x: 80, y: 60 }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-[8%] -right-[6%] sm:-bottom-[10%] sm:-right-[4%] w-[min(70vw,820px)] pointer-events-none z-0"
      >
        <motion.img
          animate={{
            y: [0, 10, 0],
            rotate: [178, 181, 178],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          src="/imagenes/Liana.png"
          alt={t({ es: 'Liana Botánica Inferior', en: 'Lower Botanical Vine' })}
          style={{ transform: 'scaleX(-1) rotate(180deg)' }}
          className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(45,38,24,0.18)]"
          draggable={false}
        />
      </motion.div>

      {/* Imagen de fondo sutil si se especifica */}
      {bgImage && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={bgImage}
            alt={t({ es: 'Atmósfera del Hero', en: 'Hero Atmosphere' })}
            className="w-full h-full object-cover opacity-10 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f5efe3]/90 via-[#f5efe3]/75 to-[#f5efe3]" />
        </div>
      )}

      {/* Resplandor radial atmosférico */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(90,107,42,0.06)_0,transparent_75%)] pointer-events-none z-0" />

      {/* ─── CONTENIDO EDITORIAL CENTRAL ─── */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 flex flex-col items-center">
        
        {/* Título Principal de Gran Escala */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-[84px] xl:text-[94px] leading-[1.04] mb-6 sm:mb-8 tracking-tight text-[#2d2618] font-light text-balance"
        >
          {t(titleWhite)}{' '}
          <span className="italic text-[#4a5a22] font-normal block sm:inline">
            {t(titleGreen)}
          </span>
        </motion.h1>

        {/* Descripción Editorial */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2 }}
            className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-[#5c523e] font-sans font-light leading-relaxed mb-8 sm:mb-12 text-balance"
          >
            {t(description)}
          </motion.p>
        )}

        {/* Indicador de Desplazamiento Estilo Portada */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="text-[10px] uppercase tracking-[0.3em] font-sans font-medium text-[#8a7e68]">
            {t('hero.exploreChapter')}
          </div>
          <div className="relative w-[1.5px] h-10 bg-[#d8ceb6]/80 rounded-full overflow-hidden">
            <motion.div
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-[#4a5a22] to-[#4a5a22] shadow-[0_0_6px_#4a5a22]"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
