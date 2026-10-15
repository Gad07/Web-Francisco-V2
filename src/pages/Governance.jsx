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

  // Identificar al Presidente (por id o cargo) para ubicarlo arriba del carrusel
  const presidentMember = sourceMembers.find(
    (m) =>
      m.id === 'luis-garcia' ||
      (typeof m.role?.es === 'string' && m.role.es.toLowerCase().includes('presidente')) ||
      (typeof m.displayRole?.es === 'string' && m.displayRole.es.toLowerCase().includes('presidente'))
  ) || sourceMembers[0];

  // Lista de miembros mostrada exclusivamente en el carrusel (sin el presidente)
  const filteredMembers = sourceMembers.filter((m) => m.id !== presidentMember?.id);

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

          {/* ─── PRESIDENTE: DESTACADO SUPERIOR CON MÁXIMO PROTAGONISMO INSTITUCIONAL ─── */}
          {presidentMember && (
            <div className="mb-16 sm:mb-20">
              <div className="relative bg-[#ffffff] rounded-3xl border-2 border-[#d8ceb6] shadow-[0_12px_45px_rgba(45,38,24,0.07)] overflow-hidden">
                {/* Textura decorativa institucional de fondo */}
                <div 
                  className="absolute -top-12 -right-12 w-96 h-96 pointer-events-none opacity-35"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(-45deg, #d8ceb6 0, #d8ceb6 1px, transparent 0, transparent 10px)',
                    backgroundSize: '14px 14px',
                  }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
                  {/* ─── COLUMNA IZQUIERDA: FOTOGRAFÍA OFICIAL & CANALES DE CONTACTO DIRECTO ─── */}
                  <div className="lg:col-span-5 bg-[#fbf9f5] border-b lg:border-b-0 lg:border-r border-[#e8e2d4] p-6 sm:p-8 flex flex-col justify-between">
                    {/* Fotografía de Alta Definición (ajuste fino: 5% menos de altura) */}
                    <div>
                      <div className="relative aspect-[4/5.55] w-full rounded-2xl overflow-hidden shadow-md border-2 border-[#d8ceb6] bg-white group">
                        <img
                          src={formatDriveUrl(presidentMember.img)}
                          alt={presidentMember.name}
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
                            e.currentTarget.src = '/imports/Perfiles/LuisGarcia.png';
                          }}
                          className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-700 ease-out"
                        />
                      </div>
                    </div>

                    {/* ─── CONTACTO Y REDES SOCIALES (LIMPIO, SIN CARDS, ESTRUCTURADO Y MODERNO) ─── */}
                    <div className="pt-4 border-t border-[#e2dcce] mt-4 space-y-4">
                      {/* Título Editorial (~25% más chico con mayor separación inferior) */}
                      <div className="mb-4 sm:mb-5">
                        <h4 className="font-serif text-[15px] sm:text-base lg:text-[17px] text-[#2d2618] font-normal tracking-tight leading-snug">
                          {t({ es: 'Contacto', en: 'Contact' })}{' '}
                          <span className="italic text-[#4a5a22]">
                            {t({ es: '& Redes Sociales', en: '& Social Networks' })}
                          </span>
                        </h4>
                      </div>

                      {/* Teléfonos México y Canadá: Más pequeños y proporcionados */}
                      <div className="grid grid-cols-2 gap-4 sm:gap-5 pt-1">
                        <div>
                          <div className="text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-wider text-[#7a6e58]">
                            {t({ es: 'México', en: 'Mexico' })}
                          </div>
                          <a
                            href={`tel:${(presidentMember.social?.phoneMx || '+52 55 4569 1548').replace(/\s+/g, '')}`}
                            className="font-mono text-[11px] sm:text-xs font-semibold text-[#2d2618] hover:text-[#4a5a22] transition-colors block mt-0.5 tracking-tight"
                          >
                            {presidentMember.social?.phoneMx || '+52 55 4569 1548'}
                          </a>
                        </div>

                        <div className="border-l border-[#e2dcce] pl-4 sm:pl-5">
                          <div className="text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-wider text-[#7a6e58]">
                            {t({ es: 'Canadá', en: 'Canada' })}
                          </div>
                          <a
                            href={`tel:${(presidentMember.social?.phoneCa || '+1 437 290 8820').replace(/\s+/g, '')}`}
                            className="font-mono text-[11px] sm:text-xs font-semibold text-[#2d2618] hover:text-[#4a5a22] transition-colors block mt-0.5 tracking-tight"
                          >
                            {presidentMember.social?.phoneCa || '+1 437 290 8820'}
                          </a>
                        </div>
                      </div>

                      {/* Canales Digitales y Redes: Iconos un 25% más chicos (w-4 h-4 / 16px) */}
                      <div className="flex items-center gap-4 sm:gap-4.5 pt-1.5 text-[#554e40]">
                        {/* Correo Electrónico Institucional */}
                        {presidentMember.social?.email && (
                          <a
                            href={`mailto:${presidentMember.social.email}`}
                            className="text-[#554e40] hover:text-[#4a5a22] hover:scale-115 transition-all duration-200"
                            title={`Correo Directo: ${presidentMember.social.email}`}
                            aria-label="Correo Electrónico"
                          >
                            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </a>
                        )}

                        {/* WhatsApp Oficial */}
                        <a
                          href={
                            presidentMember.social?.whatsapp?.startsWith('http')
                              ? presidentMember.social.whatsapp
                              : `https://wa.me/${(presidentMember.social?.whatsapp || presidentMember.social?.phoneMx || '525545691548').replace(/\D/g, '')}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#554e40] hover:text-[#25d366] hover:scale-115 transition-all duration-200"
                          title="WhatsApp Directo"
                          aria-label="WhatsApp"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                          </svg>
                        </a>

                        {/* LinkedIn */}
                        <a
                          href={presidentMember.social?.linkedin || 'https://www.linkedin.com'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#554e40] hover:text-[#0077b5] hover:scale-115 transition-all duration-200"
                          title="LinkedIn"
                          aria-label="LinkedIn"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63 0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
                          </svg>
                        </a>

                        {/* Facebook */}
                        <a
                          href={presidentMember.social?.facebook || 'https://www.facebook.com'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#554e40] hover:text-[#1877f2] hover:scale-115 transition-all duration-200"
                          title="Facebook"
                          aria-label="Facebook"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>

                        {/* Instagram */}
                        <a
                          href={presidentMember.social?.instagram || 'https://www.instagram.com'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#554e40] hover:text-[#e4405f] hover:scale-115 transition-all duration-200"
                          title="Instagram"
                          aria-label="Instagram"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* ─── COLUMNA DERECHA: CARGO, VISIÓN ESTRATÉGICA, SEMBLANZA Y ATRIBUCIONES ─── */}
                  <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-7 bg-white">
                    <div className="space-y-6">
                      {/* Encabezado y Título Principal */}
                      <div className="space-y-1.5 border-b border-[#e5dfd3] pb-5">
                        <h3 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-light text-[#221e16] leading-[1.08] tracking-tight">
                          {presidentMember.name}
                        </h3>

                        <p className="font-serif italic text-lg sm:text-xl text-[#4a5a22]">
                          {t(presidentMember.displayRole || presidentMember.role)}
                        </p>
                      </div>

                      {/* Declaración de Misión / Cita de Presidencia (Estilo Editorial Limpio) */}
                      <blockquote className="pl-4 sm:pl-5 border-l-2 border-[#4a5a22] py-1">
                        <p className="font-serif italic text-sm sm:text-base text-[#3d3422] leading-relaxed">
                          {t({
                            es: '«La diplomacia ambiental y la ciencia deben traducirse en transformaciones territoriales tangibles para las comunidades de México y las naciones con las que construimos alianzas.»',
                            en: '“Environmental diplomacy and science must translate into tangible territorial transformations for communities across Mexico and allied nations.”'
                          })}
                        </p>
                      </blockquote>

                      {/* Semblanza Institucional Extensa */}
                      <div className="space-y-2">
                        <h4 className="font-serif text-base font-normal text-[#2d2618]">
                          {t({ es: 'Semblanza y Trayectoria Institucional', en: 'Institutional Profile & Career' })}
                        </h4>
                        <div className="text-sm sm:text-[15px] text-[#4a4232] font-light leading-relaxed font-sans space-y-3">
                          <p>
                            {t(presidentMember.bio)}
                          </p>
                          <p className="text-xs sm:text-[13px] text-[#6b6048]">
                            {t({
                              es: 'Bajo su conducción, el Consejo Global Ambiental ha consolidado puentes de cooperación bilateral en Norteamérica —destacando agendas de vinculación en Toronto, Ottawa y Montreal a través del Council for Green Action Canada— y ha estrechado colaboración técnica con organismos multilaterales, entidades académicas y comunidades locales.',
                              en: 'Under his leadership, the Global Environmental Council has consolidated bilateral cooperation bridges in North America—featuring liaison agendas in Toronto, Ottawa, and Montreal through Council for Green Action Canada—and strengthened technical collaboration with multilateral bodies, academia, and local communities.'
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Atribuciones y Responsabilidades Directivas (Lista Editorial Limpia) */}
                      {presidentMember.responsibilities && presidentMember.responsibilities.length > 0 && (
                        <div className="space-y-2.5 pt-2">
                          <h4 className="font-serif text-base font-normal text-[#2d2618]">
                            {t({ es: 'Atribuciones y Conducción Estratégica', en: 'Strategic Duties & Plenary Leadership' })}
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 pt-1">
                            {presidentMember.responsibilities.map((resp, idx) => (
                              <li
                                key={idx}
                                className="text-xs text-[#5c523e] flex items-start gap-2 font-sans font-light leading-snug"
                              >
                                <span className="text-[#4a5a22] font-bold text-sm leading-none shrink-0 mt-0.5">•</span>
                                <span>{t(resp)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Barra de Acciones Directas */}
                    <div className="pt-5 border-t border-[#e5dfd3] flex items-center justify-end">
                      {presidentMember.social?.email && (
                        <a
                          href={`mailto:${presidentMember.social.email}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3a4a18] hover:bg-[#2d3a12] text-white text-xs font-semibold tracking-wide transition-all shadow-xs"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>{t({ es: 'Escribir a Presidencia', en: 'Write to Presidency' })}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── ENCABEZADO DE LA SECCIÓN DEL CARRUSEL COLEGIADO ─── */}
          <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#d8ceb6] pb-5">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#2d2618]">
                {t({ es: 'Secretaría Ejecutiva, Direcciones y Consejerías', en: 'Executive Secretariat, Directorates and Councils' })}
              </h3>
            </div>
            <p className="text-xs sm:text-[13px] text-[#7a6e58] font-sans max-w-md sm:text-right font-light">
              {t({
                es: 'Explora a los integrantes del cuerpo colegiado y selecciona cualquier ficha para conocer sus atribuciones.',
                en: 'Explore the members of the collegial body and select any card to view their responsibilities.'
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

                            <div className="space-y-0.5 pr-2">
                              <h3 className="text-[14px] sm:text-[15px] font-extrabold uppercase tracking-tight text-[#221e16] font-sans leading-tight transition-colors duration-200 group-hover:text-[#4a5a22]">
                                {member.name}
                              </h3>
                              <p className="text-xs text-[#554e40] font-serif italic line-clamp-1">
                                {t(member.displayRole || member.role)}
                              </p>
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
                    <div className="space-y-1">
                      <h2 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-light text-[#221e16] leading-[1.12]">
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
                    <h4 className="font-serif text-sm font-medium text-[#2d2618]">
                      {t({ es: 'Semblanza Institucional', en: 'Institutional Profile' })}
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#4a4232] font-light leading-relaxed font-sans bg-[#faf7f0] p-3 sm:p-3.5 rounded-xl border border-[#ebe5d8] max-h-36 overflow-y-auto">
                      {t(selectedMember.bio)}
                    </p>
                  </div>

                  {/* Atribuciones y Responsabilidades Directivas */}
                  {selectedMember.responsibilities && selectedMember.responsibilities.length > 0 && (
                    <div className="space-y-1.5 shrink-0 my-auto">
                      <h4 className="font-serif text-sm font-medium text-[#2d2618]">
                        {t({ es: 'Atribuciones y Responsabilidades Institucionales', en: 'Board Duties and Responsibilities' })}
                      </h4>
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
