import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { useI18n } from '../i18n/index.jsx';
import { useSiteSettings } from '../context/SiteSettingsContext.jsx';
import { DEFAULT_GOVERNANCE_MEMBERS } from '../data/governanceData.js';
import { formatDriveUrl } from '../utils/imageUtils.js';

export default function Governance() {
  const { t } = useI18n();
  const { governanceMembers = [] } = useSiteSettings();

  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeShareId, setActiveShareId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lista de miembros activa (sincronizada desde Admin o data oficial)
  const sourceMembers = governanceMembers && governanceMembers.length > 0
    ? governanceMembers
    : DEFAULT_GOVERNANCE_MEMBERS;

  // Lista de miembros completa mostrada directamente en el carrusel
  const filteredMembers = sourceMembers;

  // Cálculo de tarjetas visibles según viewport
  const visibleCards = windowWidth >= 1024 ? 3 : windowWidth >= 640 ? 2 : 1;
  const maxIndex = Math.max(0, filteredMembers.length - visibleCards);

  const handlePrevSlide = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const selectedMember = sourceMembers.find((m) => m.id === selectedMemberId);

  const handleNextMember = () => {
    const list = filteredMembers.length > 0 ? filteredMembers : sourceMembers;
    const currentIdx = list.findIndex((m) => m.id === selectedMemberId);
    const nextIdx = (currentIdx + 1) % list.length;
    setSelectedMemberId(list[nextIdx].id);
    const newIdx = Math.min(maxIndex, Math.max(0, nextIdx - Math.floor(visibleCards / 2)));
    setCurrentIndex(newIdx);
  };

  const handlePrevMember = () => {
    const list = filteredMembers.length > 0 ? filteredMembers : sourceMembers;
    const currentIdx = list.findIndex((m) => m.id === selectedMemberId);
    const prevIdx = (currentIdx - 1 + list.length) % list.length;
    setSelectedMemberId(list[prevIdx].id);
    const newIdx = Math.min(maxIndex, Math.max(0, prevIdx - Math.floor(visibleCards / 2)));
    setCurrentIndex(newIdx);
  };

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between">
      <div>
        <PageHero
          titleWhite={{ es: 'Gobernanza y', en: 'Governance and' }}
          titleGreen={{ es: 'estructura institucional', en: 'institutional structure' }}
          description={{
            es: 'El Consejo Global Ambiental integra conducción estratégica, coordinación ejecutiva, dirección nacional de proyectos y participación honorífica especializada.',
            en: 'The Global Environmental Council integrates strategic leadership, executive coordination, national project direction and specialized honorary governance.',
          }}
          bgImage="https://images.unsplash.com/photo-1577985051167-0d49eec21977?w=1600&h=900&fit=crop"
        />

        {/* ─── SECCIÓN PRINCIPAL: GOBERNANZA COLEGIADA Y CARRUSEL ─── */}
        <section className="pt-16 sm:pt-20 pb-24 sm:pb-32 px-4 sm:px-8 md:px-16 lg:px-20 max-w-7xl mx-auto w-full min-h-[750px]">
          
          {/* Cabecera Editorial Unificada Centrada */}
          <div className="mb-12 sm:mb-14 max-w-5xl mx-auto text-center space-y-5">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-light text-[#2d2618] leading-[1.08] tracking-tight">
              {t({ es: 'Cuerpo de Gobernanza', en: 'Governance Body' })}{' '}
              <span className="italic text-[#4a5a22] font-normal">
                {t({ es: 'e Investigadores.', en: 'and Researchers.' })}
              </span>
            </h2>
            <p className="text-[#6b6048] font-sans text-sm sm:text-base font-light leading-relaxed max-w-3xl mx-auto">
              {t({
                es: 'El Consejo Global Ambiental integra conducción estratégica, coordinación ejecutiva, dirección nacional de proyectos y participación honorífica especializada. La Presidencia define prioridades y representa a la institución; la Secretaría Ejecutiva articula su gestión y cooperación; la Dirección Nacional de Proyectos desarrolla y da seguimiento a iniciativas; y el Consejo Honorífico incorpora perspectivas técnicas en las materias del CGA.',
                en: 'The Global Environmental Council integrates strategic leadership, executive coordination, national project direction, and specialized honorary governance. The Presidency defines priorities and represents the institution; the Executive Secretariat coordinates management and cooperation; the National Directorate of Projects develops and monitors initiatives; and the Honorary Council incorporates technical expertise across CGA domains.'
              })}
            </p>
          </div>

          {/* ─── CONTENEDOR PRINCIPAL INTERACTIVO CON ANIMACIÓN TRANSLATE OPTIMIZADA ─── */}
          <div className="relative min-h-[580px] lg:h-[580px]">
            
            {/* CARRUSEL Y TRACK DE TARJETAS */}
            <div className="overflow-hidden py-1 px-1 h-full">
              <motion.div
                className="flex -mx-3 sm:-mx-4 h-full"
                animate={{
                  x: selectedMemberId === null ? `-${currentIndex * (100 / visibleCards)}%` : '0%',
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ willChange: 'transform' }}
              >
                {filteredMembers.map((member, index) => {
                  const isSelected = selectedMemberId === member.id;
                  const isAnySelected = selectedMemberId !== null;
                  
                  // Posición del slot relativo al viewport visible
                  const slotInView = index - currentIndex;

                  let targetX = '0%';
                  let targetOpacity = 1;
                  let pointerEvents = 'auto';

                  if (isAnySelected) {
                    if (isSelected) {
                      targetX = `-${slotInView * 100}%`;
                      targetOpacity = 1;
                      pointerEvents = 'auto';
                    } else {
                      targetX = '600px';
                      targetOpacity = 0;
                      pointerEvents = 'none';
                    }
                  }

                  return (
                    <motion.div
                      key={member.id}
                      className="px-3 sm:px-4 w-full sm:w-1/2 lg:w-1/3 shrink-0 h-full"
                      animate={{
                        x: targetX,
                        opacity: targetOpacity,
                      }}
                      transition={{
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{ pointerEvents, willChange: 'transform, opacity' }}
                    >
                      {/* TARJETA DE MIEMBRO ESTILO EDITORIAL */}
                      <div
                        onClick={() => {
                          if (!isAnySelected) {
                            setSelectedMemberId(member.id);
                          }
                        }}
                        className={`group relative select-none h-full ${
                          !isAnySelected ? 'cursor-pointer' : ''
                        }`}
                      >
                        {/* Capa de fondo decorativa con patrón angular */}
                        <div 
                          className="absolute -top-3 -right-3 w-3/4 h-3/4 pointer-events-none rounded-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-300"
                          style={{
                            backgroundImage: 'repeating-linear-gradient(-45deg, #d8ceb6 0, #d8ceb6 1px, transparent 0, transparent 8px)',
                            backgroundSize: '12px 12px',
                          }}
                        />

                        {/* Contenedor Principal de la Tarjeta */}
                        <div className="relative bg-[#ffffff] rounded-2xl border border-[#d8ceb6] shadow-[0_4px_20px_rgba(45,38,24,0.04)] hover:border-[#4a5a22]/40 transition-colors duration-300 overflow-hidden flex flex-col justify-between h-full">
                          
                          {/* Botón Volver al Carrusel (visible en la tarjeta izquierda seleccionada) */}
                          {isSelected && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMemberId(null);
                              }}
                              className="absolute top-4 left-4 z-30 px-3 py-1.5 rounded-lg bg-[#2d2618]/90 hover:bg-[#3a4a18] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
                            >
                              <span className="font-bold text-sm">&larr;</span>
                              <span>{t({ es: 'Volver al carrusel', en: 'Back to carousel' })}</span>
                            </button>
                          )}

                          {/* Fotografía limpia de la persona */}
                          <div className="relative flex-1 min-h-[340px] w-full bg-[#f0eee9] overflow-hidden">
                            <img
                              src={formatDriveUrl(member.img)}
                              alt={member.name}
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                const currentSrc = e.currentTarget.src || '';
                                if (currentSrc.includes('googleusercontent.com/d/') && !e.currentTarget.dataset.retried) {
                                  e.currentTarget.dataset.retried = 'true';
                                  const idMatch = currentSrc.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
                                  if (idMatch && idMatch[1]) {
                                    e.currentTarget.src = `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1000`;
                                    return;
                                  }
                                }
                                if (member.id === 'francisco-solorio') {
                                  e.currentTarget.src = '/imports/Perfiles/FranciscoSolorio.png';
                                } else {
                                  e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop&auto=format';
                                }
                              }}
                              className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500 ease-out"
                            />

                            {!isAnySelected && (
                              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#2d2618]/85 text-[#f5efe3] text-[10px] font-sans font-medium uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm">
                                {t({ es: 'Abrir Ficha', en: 'Open Profile' })} &rarr;
                              </div>
                            )}
                          </div>

                          {/* Barra Inferior con Cargo Completo, Nombre, Separador y Share */}
                          <div className="p-4 sm:p-5 bg-white flex items-center justify-between border-t border-[#f0ece4] relative shrink-0">

                            <div className="space-y-1 pr-2">
                              <span className="block text-[11px] tracking-[0.16em] uppercase font-semibold text-[#7a6e58] font-sans line-clamp-1">
                                {t(member.displayRole || member.role)}
                              </span>
                              <h3 className="text-[14px] sm:text-[15px] font-extrabold uppercase tracking-tight text-[#221e16] font-sans leading-tight transition-colors duration-200 group-hover:text-[#4a5a22]">
                                {member.name}
                              </h3>
                            </div>

                            <div className="h-8 w-[1px] bg-[#e5dfd3] shrink-0 mx-2" />

                            <div className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                onClick={() => setActiveShareId(activeShareId === member.id ? null : member.id)}
                                className="w-8 h-8 flex items-center justify-center text-[#554e40] hover:text-[#4a5a22] hover:bg-[#f8f5ee] rounded-full transition-colors cursor-pointer"
                                title={t({ es: 'Contacto y Redes', en: 'Contact and Social Links' })}
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                                </svg>
                              </button>

                              <AnimatePresence>
                                {activeShareId === member.id && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.9 }}
                                    transition={{ duration: 0.18 }}
                                    className="absolute bottom-full right-0 mb-2 p-2 bg-[#2d2618] text-white rounded-lg shadow-xl flex items-center gap-2.5 z-30"
                                  >
                                    {member.social?.linkedin && (
                                      <a
                                        href={member.social.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1 hover:bg-white/20 rounded transition-colors text-white"
                                        title="LinkedIn"
                                      >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63 0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
                                        </svg>
                                      </a>
                                    )}

                                    {member.social?.email && (
                                      <a
                                        href={`mailto:${member.social.email}`}
                                        className="p-1 hover:bg-white/20 rounded transition-colors text-white"
                                        title="Email"
                                      >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                        </svg>
                                      </a>
                                    )}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                          </div>

                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* ─── FICHA DETALLADA (DOSSIER) EDITORIAL CON DISEÑO ELEGANTE Y MISMO ALTO ─── */}
            <AnimatePresence>
              {selectedMember && (
                <motion.div
                  key={`info-${selectedMember.id}`}
                  initial={{ opacity: 0, x: '100%' }}
                  animate={{ opacity: 1, x: '0%' }}
                  exit={{ opacity: 0, x: '100%' }}
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ willChange: 'transform, opacity' }}
                  className="w-full lg:w-[calc(66.666%-16px)] mt-6 lg:mt-0 lg:absolute lg:top-1 lg:right-1 lg:bottom-1 z-20 flex flex-col justify-between p-6 sm:p-7 lg:p-8 rounded-2xl bg-[#ffffff] border border-[#d8ceb6] shadow-[0_4px_25px_rgba(45,38,24,0.06)] overflow-hidden"
                >
                  {/* Encabezado Editorial Elegante con Botón de Cierre */}
                  <div className="flex items-start justify-between gap-4 pb-3 border-b border-[#e5dfd3] shrink-0">
                    <div className="space-y-0.5">
                      <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#5a6b2a]">
                        {t(selectedMember.tag)}
                      </div>
                      <h2 className="font-serif text-2xl sm:text-3xl lg:text-[30px] font-light text-[#221e16] leading-[1.12]">
                        {selectedMember.name}
                      </h2>
                      <p className="italic text-[#4a5a22] font-serif text-sm sm:text-base">
                        {t(selectedMember.displayRole || selectedMember.role)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedMemberId(null)}
                      className="w-8 h-8 rounded-full bg-[#f5efe3] hover:bg-[#3a4a18] text-[#5c523e] hover:text-white flex items-center justify-center transition-colors duration-200 cursor-pointer border border-[#d8ceb6] shrink-0"
                      title={t({ es: 'Cerrar y volver al carrusel', en: 'Close and return to carousel' })}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Semblanza Institucional */}
                  <div className="space-y-1.5 shrink-0 my-auto">
                    <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a6e58]">
                      {t({ es: 'Semblanza Institucional', en: 'Institutional Profile' })}
                    </div>
                    <p className="text-xs sm:text-[13px] text-[#4a4232] font-light leading-relaxed font-sans bg-[#faf7f0] p-3 sm:p-3.5 rounded-xl border border-[#ebe5d8] max-h-36 overflow-y-auto">
                      {t(selectedMember.bio)}
                    </p>
                  </div>

                  {/* Atribuciones y Responsabilidades Directivas */}
                  {selectedMember.responsibilities && selectedMember.responsibilities.length > 0 && (
                    <div className="space-y-1.5 shrink-0 my-auto">
                      <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5a6b2a]">
                        {t({ es: 'Atribuciones y Responsabilidades Institucionales', en: 'Board Duties and Responsibilities' })}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
                        {selectedMember.responsibilities.map((resp, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-[#faf7f0] border border-[#ebe5d8] text-[11px] text-[#5c523e] flex items-start gap-2 font-sans font-light leading-snug"
                          >
                            <span className="text-[#4a5a22] font-bold text-xs leading-none shrink-0">•</span>
                            <span>{t(resp)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pie de Ficha Editorial con Navegación y Contacto */}
                  <div className="pt-3 border-t border-[#e5dfd3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#7a6e58] font-sans shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#5a6b2a]" />
                      <span>
                        {t(selectedMember.country) || 'México'} &bull;{' '}
                        {t({ es: 'Órgano Colegiado CGA', en: 'CGA Collegial Body' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Controles de Navegación entre miembros */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={handlePrevMember}
                          className="w-7 h-7 rounded-lg bg-[#eae4d2]/80 hover:bg-[#3a4a18] hover:text-white text-[#2d2618] transition-colors border border-[#d8ceb6] cursor-pointer flex items-center justify-center"
                          title={t({ es: 'Miembro anterior', en: 'Previous member' })}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={handleNextMember}
                          className="w-7 h-7 rounded-lg bg-[#eae4d2]/80 hover:bg-[#3a4a18] hover:text-white text-[#2d2618] transition-colors border border-[#d8ceb6] cursor-pointer flex items-center justify-center"
                          title={t({ es: 'Siguiente miembro', en: 'Next member' })}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      {/* Botón de Contacto Directo */}
                      {selectedMember.social?.email && (
                        <a
                          href={`mailto:${selectedMember.social.email}`}
                          className="px-3 py-1.5 rounded-lg bg-[#3a4a18] hover:bg-[#2d3a12] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>{t('nav.contacto') || 'Contacto'}</span>
                        </a>
                      )}
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* ─── BARRA DE INDICADORES CON FLECHAS INTEGRADAS ─── */}
          <AnimatePresence>
            {selectedMemberId === null && maxIndex > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-center gap-4 pt-6"
              >
                {/* Flecha Izquierda */}
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  disabled={currentIndex === 0}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                    currentIndex === 0
                      ? 'opacity-30 cursor-not-allowed border-[#d8ceb6] text-[#8c826e]'
                      : 'bg-[#eae4d2]/90 hover:bg-[#3a4a18] hover:text-[#f5efe3] border-[#d8ceb6] text-[#2d2618] cursor-pointer shadow-sm active:scale-95'
                  }`}
                  aria-label={t({ es: 'Anterior', en: 'Previous' })}
                  title={t({ es: 'Deslizar a la izquierda', en: 'Slide left' })}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Puntos de Paginación */}
                <div className="flex items-center gap-2 px-3.5 py-2 bg-[#eae4d2]/70 rounded-full border border-[#d8ceb6]/80 shadow-xs">
                  {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        currentIndex === idx ? 'w-8 bg-[#3a4a18]' : 'w-2.5 bg-[#d8ceb6] hover:bg-[#8a8170]'
                      }`}
                      title={t({ es: 'Página', en: 'Page' }) + ` ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Flecha Derecha */}
                <button
                  type="button"
                  onClick={handleNextSlide}
                  disabled={currentIndex >= maxIndex}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                    currentIndex >= maxIndex
                      ? 'opacity-30 cursor-not-allowed border-[#d8ceb6] text-[#8c826e]'
                      : 'bg-[#eae4d2]/90 hover:bg-[#3a4a18] hover:text-[#f5efe3] border-[#d8ceb6] text-[#2d2618] cursor-pointer shadow-sm active:scale-95'
                  }`}
                  aria-label={t({ es: 'Siguiente', en: 'Next' })}
                  title={t({ es: 'Deslizar a la derecha', en: 'Slide right' })}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

              </motion.div>
            )}
          </AnimatePresence>

        </section>
      </div>

      <FooterNav />
    </div>
  );
}
