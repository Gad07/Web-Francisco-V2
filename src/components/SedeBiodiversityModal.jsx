import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/index.jsx';

export default function SedeBiodiversityModal({ sede, isOpen, onClose, onSelectSede, sedesList }) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('fauna'); // 'fauna' | 'flora' | 'sede'

  const EASE = [0.22, 1, 0.36, 1];

  // Cerrar con Escape y navegación con flechas
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        const idx = sedesList.findIndex((s) => s.id === sede.id);
        const prevIdx = idx > 0 ? idx - 1 : sedesList.length - 1;
        onSelectSede(sedesList[prevIdx].id);
      }
      if (e.key === 'ArrowRight') {
        const idx = sedesList.findIndex((s) => s.id === sede.id);
        const nextIdx = idx < sedesList.length - 1 ? idx + 1 : 0;
        onSelectSede(sedesList[nextIdx].id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, sede, sedesList, onClose, onSelectSede]);

  if (!isOpen || !sede) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="sede-biodiversity-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="fixed inset-0 z-[9999] flex flex-col justify-between overflow-y-auto bg-[#0c120b]/95 text-slate-100 backdrop-blur-2xl"
      >
        {/* Fondo de Vídeo / Fotografía Territorial */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <AnimatePresence mode="sync">
            <motion.div
              key={sede.videoSrc || sede.img}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full"
            >
              {sede.videoSrc ? (
                <video
                  src={sede.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={sede.img}
                  alt={t(sede.country)}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Gradiente sutil */}
        <div className="fixed inset-0 bg-gradient-to-t from-[#0c120b] via-[#0c120b]/80 to-transparent pointer-events-none z-10" />

        {/* ─── TOP BAR: SELECTOR DE SEDES & BOTÓN CERRAR ─── */}
        <div className="relative z-20 w-full px-6 sm:px-12 md:px-16 py-6 flex items-center justify-between pointer-events-auto border-b border-white/10">
          {/* Selector de Países Sede */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-2xl no-scrollbar">
            {sedesList.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectSede(s.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans transition-all duration-300 cursor-pointer flex items-center gap-2 shrink-0 ${
                  sede.id === s.id
                    ? 'bg-[#a3e635] text-[#141e13] font-semibold shadow-lg shadow-[#a3e635]/20 scale-105'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white border border-white/10'
                }`}
              >
                <span>{s.flag}</span>
                <span>{t(s.country)}</span>
              </button>
            ))}
          </div>

          {/* Botón Cerrar */}
          <button
            onClick={onClose}
            className="group inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-[#141e13] backdrop-blur-xl border border-white/20 text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer ml-4"
          >
            <span>{t({ es: 'Cerrar', en: 'Close' })}</span>
            <svg className="w-3 h-3 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ─── CUERPO PRINCIPAL: FAUNA & FLORA EMBLEMÁTICA ─── */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 py-8 md:py-12 flex-1 flex flex-col justify-start">
          
          {/* Header del País */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/15">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">{sede.flag}</span>
                <span className="text-xs uppercase tracking-[0.24em] font-mono text-[#a3e635] font-semibold">
                  SEDE OFICIAL &middot; {sede.code}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                  {t(sede.city)}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight">
                {t(sede.country)}
              </h2>
              <p className="font-serif text-lg sm:text-xl text-[#c8d8a0] font-light italic mt-1">
                {t({
                  es: 'Biodiversidad emblemática y especies en custodia territorial',
                  en: 'Emblematic biodiversity & species under territorial stewardship',
                })}
              </p>
            </div>

            {/* Pestañas de Filtrado: Fauna / Flora / Datos de Sede */}
            <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-full border border-white/20 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setActiveTab('fauna')}
                className={`px-4 py-2 rounded-full text-xs font-sans transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  activeTab === 'fauna'
                    ? 'bg-[#3a4a18] text-[#f5efe3] font-semibold shadow-sm border border-[#a3e635]/40'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>🐾</span>
                <span>{t({ es: 'Fauna Emblemática', en: 'Emblematic Fauna' })}</span>
                <span className="text-[10px] opacity-70">({sede.fauna?.length || 0})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('flora')}
                className={`px-4 py-2 rounded-full text-xs font-sans transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  activeTab === 'flora'
                    ? 'bg-[#3a4a18] text-[#f5efe3] font-semibold shadow-sm border border-[#a3e635]/40'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>🌸</span>
                <span>{t({ es: 'Flora & Árboles', en: 'Flora & Trees' })}</span>
                <span className="text-[10px] opacity-70">({sede.flora?.length || 0})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sede')}
                className={`px-4 py-2 rounded-full text-xs font-sans transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  activeTab === 'sede'
                    ? 'bg-[#3a4a18] text-[#f5efe3] font-semibold shadow-sm border border-[#a3e635]/40'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>🏛️</span>
                <span>{t({ es: 'Datos de Sede', en: 'HQ Details' })}</span>
              </button>
            </div>
          </div>

          {/* ─── VISTA DE FAUNA EMBLEMÁTICA ─── */}
          {activeTab === 'fauna' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {sede.fauna?.map((animal, idx) => (
                <motion.div
                  key={animal.name.es}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 overflow-hidden flex flex-col justify-between p-5 backdrop-blur-xl group transition-all duration-300 shadow-xl"
                >
                  <div>
                    {/* Imagen del Animal */}
                    <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 bg-black/40">
                      <img
                        src={animal.img}
                        alt={t(animal.name)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 text-[10px] text-[#a3e635] font-mono">
                        {t(animal.status)}
                      </div>
                      <div className="absolute bottom-2.5 left-3 right-3">
                        <h4 className="font-serif text-xl text-white font-normal leading-tight">
                          {t(animal.name)}
                        </h4>
                        <p className="text-[11px] text-slate-300 italic font-serif">
                          {animal.scientificName}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-200 font-light leading-relaxed mb-3">
                      {t(animal.desc)}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#c8d8a0] font-mono">
                    <span>{t({ es: 'Rol ecológico:', en: 'Ecological role:' })}</span>
                    <span className="font-medium text-white">{t(animal.role)}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* ─── VISTA DE FLORA EMBLEMÁTICA ─── */}
          {activeTab === 'flora' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sede.flora?.map((plant, idx) => (
                <motion.div
                  key={plant.name.es}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 overflow-hidden flex flex-col justify-between p-6 backdrop-blur-xl group transition-all duration-300 shadow-xl"
                >
                  <div>
                    <div className="relative h-52 w-full rounded-xl overflow-hidden mb-4 bg-black/40">
                      <img
                        src={plant.img}
                        alt={t(plant.name)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] text-[#a3e635] font-mono font-medium">
                        {t(plant.badge)}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h4 className="font-serif text-2xl text-white font-normal leading-tight">
                          {t(plant.name)}
                        </h4>
                        <p className="text-xs text-[#c8d8a0] italic font-serif">
                          {plant.scientificName}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-[13px] text-slate-200 font-light leading-relaxed mb-4">
                      {t(plant.desc)}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#c8d8a0] font-mono">
                    <span>{t({ es: 'Importancia biocultural:', en: 'Biocultural value:' })}</span>
                    <span className="text-white font-medium">{t(plant.significance)}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* ─── VISTA DE DATOS OFICIALES DE LA SEDE ─── */}
          {activeTab === 'sede' && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-7 rounded-3xl bg-white/10 border border-white/20 p-8 backdrop-blur-xl space-y-6">
                <div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-white font-light mb-2">
                    {t(sede.sedeType)}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-[#c8d8a0] font-mono">
                    <span>📍 {t(sede.address)} &middot; {t(sede.city)}, {t(sede.country)}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-200 font-light leading-relaxed">
                  {t(sede.desc)}
                </p>

                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-wider text-[#d8ceb6] font-semibold font-mono">
                    {t({ es: 'Instalaciones & Laboratorios:', en: 'Facilities & Laboratories:' })}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {sede.facilities.map((fac, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200 flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] mt-1.5 shrink-0" />
                        <span>{t(fac)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-3xl bg-white/10 border border-white/20 p-8 backdrop-blur-xl space-y-6">
                <div className="p-5 rounded-2xl bg-black/50 border border-white/15">
                  <div className="text-xs uppercase tracking-widest text-slate-300 font-semibold mb-1">
                    {t({ es: 'Capacidad en territorio', en: 'Territorial capacity' })}
                  </div>
                  <div className="font-serif text-4xl sm:text-5xl text-white font-light">
                    {sede.metric}
                  </div>
                  <div className="text-xs text-[#a3e635] font-mono mt-1">
                    {t(sede.metricLabel)}
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div>
                    <span className="text-[#d8ceb6] font-medium">{t({ es: 'Jurisdicción:', en: 'Jurisdiction:' })}</span> {t(sede.jurisdiction)}
                  </div>
                  <div>
                    <span className="text-[#d8ceb6] font-medium">{t({ es: 'Correo oficial:', en: 'Official email:' })}</span>{' '}
                    <a href={`mailto:${sede.email}`} className="text-[#a3e635] font-mono underline">
                      {sede.email}
                    </a>
                  </div>
                </div>

                <Link
                  to="/contacto"
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#f5efe3] hover:bg-white text-[#141e13] font-semibold text-xs uppercase tracking-widest transition-all shadow-xl cursor-pointer"
                >
                  <span>{t({ es: 'Contactar a esta Sede', en: 'Contact this Headquarters' })}</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Footer de Navegación Rápida entre Sedes */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
            <span>
              {t({ es: 'Explorando Sede', en: 'Exploring HQ' })} {sede.num} / {sedesList.length}: <strong className="text-white">{t(sede.country)}</strong>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400">
                Usa las teclas &larr; &rarr; para navegar entre países
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
