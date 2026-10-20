import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { useI18n } from '../i18n/index.jsx';
import { useSiteSettings } from '../context/SiteSettingsContext.jsx';
import { DEFAULT_GOVERNANCE_MEMBERS } from '../data/governanceData.js';
import { formatDriveUrl } from '../utils/imageUtils.js';

function getMemberSection(member) {
  const cat = (member?.category || '').toLowerCase();
  const roleText = (
    (typeof member?.role?.es === 'string' ? member.role.es : '') + ' ' +
    (typeof member?.role?.en === 'string' ? member.role.en : '') + ' ' +
    (typeof member?.displayRole?.es === 'string' ? member.displayRole.es : '') + ' ' +
    (typeof member?.displayRole?.en === 'string' ? member.displayRole.en : '') + ' ' +
    (typeof member?.tag?.es === 'string' ? member.tag.es : '')
  ).toLowerCase();

  // 1. Gobierno (Secretaría Ejecutiva, Fundadores, etc.)
  if (
    cat === 'gobierno' ||
    cat === 'founders' ||
    member?.id === 'francisco-solorio' ||
    roleText.includes('secretario ejecutivo') ||
    roleText.includes('executive secretary') ||
    roleText.includes('secretaría ejecutiva')
  ) {
    return 'gobierno';
  }

  // 2. Direcciones (Dirección Nacional, Proyectos, Director/a)
  if (
    cat === 'direcciones' ||
    cat === 'direccion' ||
    cat === 'dirección' ||
    cat === 'proyectos' ||
    member?.id === 'veronica-gonzalez' ||
    roleText.includes('directora') ||
    roleText.includes('director') ||
    roleText.includes('dirección') ||
    roleText.includes('direccion')
  ) {
    return 'direcciones';
  }

  // 3. Consejería (Consejeros honoríficos, consejos especializados)
  return 'consejeria';
}

const GOVERNANCE_TABS = [
  {
    id: 'gobierno',
    label: { es: 'Gobierno', en: 'Governance' },
    badge: { es: 'Órgano Ejecutivo de Gobierno', en: 'Executive Governing Body' },
    title: { es: 'Secretaría Ejecutiva', en: 'Executive Secretariat' },
    desc: {
      es: 'Coordinación ejecutiva plenaria, gestión técnica y articulación de acuerdos institucionales en territorio.',
      en: 'Plenary executive coordination, technical management, and institutional agreements on the ground.'
    }
  },
  {
    id: 'direcciones',
    label: { es: 'Direcciones', en: 'Directorates' },
    badge: { es: 'Dirección Operativa & Proyectos', en: 'Operational & Project Directorate' },
    title: { es: 'Dirección Nacional de Proyectos', en: 'National Directorate of Projects' },
    desc: {
      es: 'Diseño, coordinación y seguimiento técnico de iniciativas socioambientales en territorio y vinculación comunitaria.',
      en: 'Design, coordination, and technical monitoring of territorial socio-environmental initiatives and community engagement.'
    }
  },
  {
    id: 'consejeria',
    label: { es: 'Consejería', en: 'Councils' },
    badge: { es: 'Cuerpo Consultivo y Científico', en: 'Advisory & Scientific Body' },
    title: { es: 'Consejerías Honoríficas Especializadas', en: 'Specialized Honorary Councils' },
    desc: {
      es: 'Perspectivas especializadas, dictamen científico y orientación estratégica en bienestar animal, educación e inclusión.',
      en: 'Specialized perspectives, scientific opinion, and strategic guidance in animal welfare, education, and inclusion.'
    }
  },
];

export default function Governance() {
  const { t } = useI18n();
  const { governanceMembers = [] } = useSiteSettings();

  const [activeTab, setActiveTab] = useState('gobierno');
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeShareId, setActiveShareId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleOutsideClick = () => setActiveShareId(null);
    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  // Lista de miembros activa (sincronizada desde Admin o data oficial)
  const sourceMembers = governanceMembers && governanceMembers.length > 0
    ? governanceMembers
    : DEFAULT_GOVERNANCE_MEMBERS;

  // Identificar al Presidente (por id o cargo) para ubicarlo afuera arriba con protagonismo editorial
  const presidentMember = sourceMembers.find(
    (m) =>
      m.id === 'luis-garcia' ||
      (typeof m.role?.es === 'string' && m.role.es.toLowerCase().includes('presidente')) ||
      (typeof m.displayRole?.es === 'string' && m.displayRole.es.toLowerCase().includes('presidente'))
  ) || sourceMembers[0];

  // Miembros excluyendo al presidente (que se dividen por pestañas en el carrusel de abajo)
  const nonPresidentMembers = useMemo(() => {
    return sourceMembers.filter((m) => m.id !== presidentMember?.id);
  }, [sourceMembers, presidentMember]);

  // Filtrar miembros según la pestaña activa
  const currentMembers = useMemo(() => {
    return nonPresidentMembers.filter((m) => getMemberSection(m) === activeTab);
  }, [nonPresidentMembers, activeTab]);

  const currentTabInfo = GOVERNANCE_TABS.find((t) => t.id === activeTab) || GOVERNANCE_TABS[0];

  // Cálculo de tarjetas visibles según viewport
  const visibleCards = windowWidth >= 1024 ? 3 : windowWidth >= 640 ? 2 : 1;
  const maxIndex = Math.max(0, currentMembers.length - visibleCards);

  const handlePrevSlide = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const selectedMember = currentMembers.find((m) => m.id === selectedMemberId) || nonPresidentMembers.find((m) => m.id === selectedMemberId);

  const handleNextMember = () => {
    const list = currentMembers.length > 0 ? currentMembers : nonPresidentMembers;
    const currentIdx = list.findIndex((m) => m.id === selectedMemberId);
    if (currentIdx === -1) return;
    const nextIdx = (currentIdx + 1) % list.length;
    setSelectedMemberId(list[nextIdx].id);
    const newIdx = Math.min(maxIndex, Math.max(0, nextIdx - Math.floor(visibleCards / 2)));
    setCurrentIndex(newIdx);
  };

  const handlePrevMember = () => {
    const list = currentMembers.length > 0 ? currentMembers : nonPresidentMembers;
    const currentIdx = list.findIndex((m) => m.id === selectedMemberId);
    if (currentIdx === -1) return;
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
              {t({ es: 'Gobierno y', en: 'Governance and' })}{' '}
              <span className="italic text-[#4a5a22] font-normal">
                {t({ es: 'estructura institucional.', en: 'institutional structure.' })}
              </span>
            </h2>
            <p className="text-[#6b6048] font-sans text-sm sm:text-base font-light leading-relaxed max-w-3xl mx-auto">
              {t({
                es: 'El Consejo Global Ambiental integra conducción estratégica, coordinación ejecutiva, dirección nacional de proyectos y participación honorífica especializada. La Presidencia define prioridades y representa a la institución; la Secretaría Ejecutiva articula su gestión y cooperación; la Dirección Nacional de Proyectos desarrolla y da seguimiento a iniciativas; y el Consejo Honorífico incorpora perspectivas técnicas en las materias del CGA.',
                en: 'The Global Environmental Council integrates strategic leadership, executive coordination, national project direction, and specialized honorary governance. The Presidency defines priorities and represents the institution; the Executive Secretariat coordinates management and cooperation; the National Directorate of Projects develops and monitors initiatives; and the Honorary Council incorporates technical expertise across CGA domains.'
              })}
            </p>
          </div>

          {/* ─── PRESIDENTE: DESTACADO SUPERIOR CON MÁXIMO PROTAGONISMO INSTITUCIONAL (ORIGINAL) ─── */}
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
                    {/* Fotografía de Alta Definición */}
                    <div>
                      <div className="relative aspect-[4/5.55] w-full rounded-2xl overflow-hidden shadow-md border-2 border-[#d8ceb6] bg-[#fbf9f5] group">
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
                          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-700 ease-out"
                        />
                      </div>
                    </div>

                    {/* ─── CONTACTO Y REDES SOCIALES ─── */}
                    <div className="pt-4 border-t border-[#e2dcce] mt-4 space-y-4">
                      <div className="mb-4 sm:mb-5">
                        <h4 className="font-serif text-[15px] sm:text-base lg:text-[17px] text-[#2d2618] font-normal tracking-tight leading-snug">
                          {t({ es: 'Contacto', en: 'Contact' })}{' '}
                          <span className="italic text-[#4a5a22]">
                            {t({ es: '& Redes Sociales', en: '& Social Networks' })}
                          </span>
                        </h4>
                      </div>

                      {/* Teléfonos México y Canadá */}
                      <div className="grid grid-cols-2 gap-4 sm:gap-5 pt-1">
                        <div>
                          <div className="text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-wider text-[#7a6e58]">
                            {t({ es: 'México', en: 'Mexico' })}
                          </div>
                          <a
                            href={`tel:${(presidentMember.social?.phoneMx || '+52 55 3083 1032').replace(/\s+/g, '')}`}
                            className="font-mono text-[11px] sm:text-xs font-semibold text-[#2d2618] hover:text-[#4a5a22] transition-colors block mt-0.5 tracking-tight"
                          >
                            {presidentMember.social?.phoneMx || '+52 55 3083 1032'}
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

                      {/* Canales Digitales y Redes */}
                      <div className="flex items-center gap-4 sm:gap-4.5 pt-1.5 text-[#554e40]">
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

                        <a
                          href={
                            presidentMember.social?.whatsapp?.startsWith('http')
                              ? presidentMember.social.whatsapp
                              : `https://wa.me/${(presidentMember.social?.whatsapp || presidentMember.social?.phoneMx || '525530831032').replace(/\D/g, '')}`
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
                      <div className="space-y-1.5 border-b border-[#e5dfd3] pb-5">
                        <h3 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-light text-[#221e16] leading-[1.08] tracking-tight">
                          {presidentMember.name}
                        </h3>

                        <p className="font-serif italic text-lg sm:text-xl text-[#4a5a22]">
                          {t(presidentMember.displayRole || presidentMember.role)}
                        </p>
                      </div>

                      <blockquote className="pl-4 sm:pl-5 border-l-2 border-[#4a5a22] py-1">
                        <p className="font-serif italic text-sm sm:text-base text-[#3d3422] leading-relaxed">
                          {t(presidentMember.quote || {
                            es: '«La diplomacia ambiental y la ciencia deben traducirse en transformaciones territoriales tangibles para las comunidades de México y las naciones con las que construimos alianzas.»',
                            en: '“Environmental diplomacy and science must translate into tangible territorial transformations for communities across Mexico and allied nations.”'
                          })}
                        </p>
                      </blockquote>

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

                    <div className="pt-5 border-t border-[#e5dfd3] flex flex-wrap items-center justify-end gap-3">
                      <Link
                        to="/luis-garcia"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4a5a22]/10 hover:bg-[#4a5a22]/20 text-[#3a4a18] text-xs font-semibold tracking-wide transition-all border border-[#4a5a22]/20 hover:border-[#4a5a22]/40"
                      >
                        <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                        <span>{t({ es: 'Ficha & Business Card', en: 'Profile & Business Card' })}</span>
                      </Link>

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

          {/* ─── BOTONES DE CATEGORÍA: GOBIERNO · DIRECCIONES · CONSEJERÍA ─── */}
          <div className="flex justify-start sm:justify-center mb-8 sm:mb-10 -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="country-tabs-scroll inline-flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-[#eae4d2]/80 border border-[#d8ceb6] shadow-xs w-full sm:w-auto">
              {GOVERNANCE_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const count = nonPresidentMembers.filter((m) => getMemberSection(m) === tab.id).length;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSelectedMemberId(null);
                      setCurrentIndex(0);
                    }}
                    className={`px-4 sm:px-7 py-2.5 rounded-xl text-xs sm:text-sm font-sans transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 flex-1 sm:flex-none justify-center ${
                      isActive
                        ? 'bg-[#3a4a18] text-white font-semibold shadow-xs'
                        : 'text-[#6b6048] hover:text-[#2d2618] hover:bg-[#f5efe3]/80 font-medium'
                    }`}
                  >
                    <span>{t(tab.label)}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#d8ceb6]/60 text-[#554e40]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── ENCABEZADO EDITORIAL DE LA SECCIÓN ACTIVA ─── */}
          <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#d8ceb6] pb-5">
            <div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#4a5a22] block mb-1">
                {t(currentTabInfo.badge)}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#2d2618]">
                {t(currentTabInfo.title)}
              </h3>
            </div>
            <p className="text-xs sm:text-[13px] text-[#7a6e58] font-sans max-w-md sm:text-right font-light leading-relaxed">
              {t(currentTabInfo.desc)}
            </p>
          </div>

          {/* ─── CONTENEDOR PRINCIPAL INTERACTIVO CON ANIMACIÓN TRANSLATE OPTIMIZADA ─── */}
          <div className="relative min-h-[420px] sm:min-h-[520px] lg:h-[580px]">
            
            {/* CARRUSEL Y TRACK DE TARJETAS */}
            <div className="overflow-hidden py-1 px-1 h-full">
              <motion.div
                className={`flex -mx-3 sm:-mx-4 h-full ${
                  selectedMemberId === null && currentMembers.length < visibleCards ? 'justify-center' : ''
                }`}
                animate={{
                  x: selectedMemberId === null ? `-${currentIndex * (100 / visibleCards)}%` : '0%',
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ willChange: 'transform' }}
              >
                {currentMembers.map((member, index) => {
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
                              <span>{t({ es: 'Volver', en: 'Back' })}</span>
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
                                } else if (member.id === 'veronica-gonzalez') {
                                  e.currentTarget.src = '/imports/Perfiles/VeronicaGonzalez.png';
                                } else if (member.id === 'carlos-esquivel') {
                                  e.currentTarget.src = '/imports/Perfiles/CarlosEsquivel.png';
                                } else if (member.id === 'erika-sanchez') {
                                  e.currentTarget.src = '/imports/Perfiles/ErikaSanchez.png';
                                } else {
                                  e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop&auto=format';
                                }
                              }}
                              className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500 ease-out"
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
                                className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all duration-200 cursor-pointer ${
                                  activeShareId === member.id
                                    ? 'bg-[#3a4a18] text-white border-[#3a4a18] shadow-xs'
                                    : 'border-[#d8ceb6] hover:border-[#4a5a22] bg-[#fbf9f5] hover:bg-white text-[#554e40] hover:text-[#4a5a22]'
                                }`}
                                title={t({ es: 'Contacto y Redes', en: 'Contact and Social Links' })}
                                aria-expanded={activeShareId === member.id}
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                              </button>

                              <AnimatePresence>
                                {activeShareId === member.id && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute bottom-full right-0 mb-2.5 z-40 flex flex-col items-end pointer-events-auto"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div className="relative bg-[#ffffff] border border-[#d8ceb6] rounded-xl shadow-[0_10px_28px_rgba(45,38,24,0.12),0_2px_6px_rgba(45,38,24,0.04)] p-1.5 flex items-center gap-1">
                                      {/* Caret / Flechita indicadora que apunta directo al botón */}
                                      <div className="absolute -bottom-1.5 right-2.5 w-3 h-3 bg-white border-b border-r border-[#d8ceb6] rotate-45 pointer-events-none" />

                                      {/* LinkedIn */}
                                      {member.social?.linkedin && (
                                        <a
                                          href={member.social.linkedin}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#554e40] hover:text-[#0077b5] hover:bg-[#0077b5]/10 active:scale-95 transition-all duration-200"
                                          title="LinkedIn"
                                          aria-label="LinkedIn"
                                        >
                                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63 0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
                                          </svg>
                                        </a>
                                      )}

                                      {/* WhatsApp */}
                                      {member.social?.whatsapp && (
                                        <a
                                          href={
                                            member.social.whatsapp.startsWith('http')
                                              ? member.social.whatsapp
                                              : `https://wa.me/${(member.social.whatsapp || '').replace(/\D/g, '')}`
                                          }
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#554e40] hover:text-[#25d366] hover:bg-[#25d366]/10 active:scale-95 transition-all duration-200"
                                          title="WhatsApp"
                                          aria-label="WhatsApp"
                                        >
                                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                          </svg>
                                        </a>
                                      )}

                                      {/* Email */}
                                      {member.social?.email && (
                                        <a
                                          href={`mailto:${member.social.email}`}
                                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#554e40] hover:text-[#4a5a22] hover:bg-[#4a5a22]/10 active:scale-95 transition-all duration-200"
                                          title={`Email: ${member.social.email}`}
                                          aria-label="Email"
                                        >
                                          <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                          </svg>
                                        </a>
                                      )}
                                    </div>
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
                  <div className="pt-3 border-t border-[#e5dfd3] flex items-center justify-between gap-3 text-xs text-[#7a6e58] font-sans shrink-0">
                    {/* Controles de Navegación entre miembros si hay más de 1 */}
                    {currentMembers.length > 1 ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={handlePrevMember}
                          className="px-2.5 py-1.5 rounded-lg bg-[#eae4d2]/80 hover:bg-[#3a4a18] hover:text-white text-[#2d2618] transition-colors border border-[#d8ceb6] cursor-pointer flex items-center gap-1 text-xs"
                          title={t({ es: 'Miembro anterior', en: 'Previous member' })}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                          </svg>
                          <span className="hidden sm:inline">{t({ es: 'Anterior', en: 'Prev' })}</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleNextMember}
                          className="px-2.5 py-1.5 rounded-lg bg-[#eae4d2]/80 hover:bg-[#3a4a18] hover:text-white text-[#2d2618] transition-colors border border-[#d8ceb6] cursor-pointer flex items-center gap-1 text-xs"
                          title={t({ es: 'Siguiente miembro', en: 'Next member' })}
                        >
                          <span className="hidden sm:inline">{t({ es: 'Siguiente', en: 'Next' })}</span>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div />
                    )}

                    {/* Canales Directos de Contacto */}
                    <div className="flex flex-wrap items-center gap-2">
                      {(selectedMember.id === 'francisco-solorio' || selectedMember.id === 'luis-garcia') && (
                        <Link
                          to={selectedMember.id === 'francisco-solorio' ? '/francisco-solorio' : '/luis-garcia'}
                          className="px-3 py-1.5 rounded-lg bg-[#4a5a22]/10 hover:bg-[#4a5a22]/20 text-[#3a4a18] text-xs font-semibold flex items-center gap-1.5 transition-all border border-[#4a5a22]/20"
                        >
                          <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                          </svg>
                          <span>{t({ es: 'Business Card', en: 'Business Card' })}</span>
                        </Link>
                      )}

                      {selectedMember.social?.whatsapp && (
                        <a
                          href={
                            selectedMember.social.whatsapp.startsWith('http')
                              ? selectedMember.social.whatsapp
                              : `https://wa.me/${(selectedMember.social.whatsapp || '').replace(/\D/g, '')}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-lg bg-[#25d366] hover:bg-[#20ba59] active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                          title="WhatsApp"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                          </svg>
                          <span>WhatsApp</span>
                        </a>
                      )}

                      {selectedMember.social?.email && (
                        <a
                          href={`mailto:${selectedMember.social.email}`}
                          className="px-3.5 py-1.5 rounded-lg bg-[#3a4a18] hover:bg-[#2d3a12] active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                        >
                          <svg className="w-3.5 h-3.5 fill-none" stroke="currentColor" viewBox="0 0 24 24">
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

          {/* ─── SWIPE HINT para mobile ─── */}
          {selectedMemberId === null && currentMembers.length > 1 && (
            <div className="swipe-hint items-center justify-center gap-2 pt-3 text-[10px] uppercase tracking-[0.2em] text-[#8a7e68] font-sans">
              <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>{t({ es: 'Usa las flechas para navegar', en: 'Use arrows to navigate' })}</span>
            </div>
          )}

        </section>
      </div>

      <FooterNav />
    </div>
  );
}
