import React, { useState, useMemo } from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import Reveal from '../components/Reveal.jsx';
import { useI18n } from '../i18n/index.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteSettings } from '../context/SiteSettingsContext.jsx';
import { getUnifiedAcademicCalendar } from '../utils/calendarSync.js';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  CheckCircle2,
  Filter,
  Building2,
  Landmark,
  Users,
  Globe,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Check,
  Tag,
  Grid,
  List,
} from 'lucide-react';

const EASE_LUX = [0.16, 1, 0.3, 1];

export default function Training() {
  const { t } = useI18n();
  const { siteSettings, trainingData, addApplication } = useSiteSettings();
  const [activeTab, setActiveTab] = useState('oferta');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    org: '',
    scholarship: 'no',
    notes: '',
  });

  // Estados interactivos para el Calendario
  const [calMonthOffset, setCalMonthOffset] = useState(4); // Mayo (0-indexed: 4 = Mayo 2026)
  const [calYear, setCalYear] = useState(2026);
  const [selectedCalEvent, setSelectedCalEvent] = useState(null);
  const [calCategoryFilter, setCalCategoryFilter] = useState('all');
  const [calViewMode, setCalViewMode] = useState('grid'); // 'grid' | 'list'

  const handlePrevMonth = () => {
    if (calMonthOffset === 0) {
      setCalMonthOffset(11);
      setCalYear(calYear - 1);
    } else {
      setCalMonthOffset(calMonthOffset - 1);
    }
  };

  const handleNextMonth = () => {
    if (calMonthOffset === 11) {
      setCalMonthOffset(0);
      setCalYear(calYear + 1);
    } else {
      setCalMonthOffset(calMonthOffset + 1);
    }
  };

  const handleOpenModal = (progName) => {
    setSelectedProgram(progName);
    setFormSubmitted(false);
  };

  const tabs = [
    { id: 'oferta', label: { es: 'Oferta Académica', en: 'Academic Overview' } },
    { id: 'diplomados', label: { es: 'Diplomados', en: 'Diplomas' } },
    { id: 'cursos', label: { es: 'Cursos & Talleres', en: 'Workshops' } },
    { id: 'webinars', label: { es: 'Conferencias', en: 'Conferences' } },
    { id: 'organizaciones', label: { es: 'Programas para Organizaciones', en: 'Programs for Organizations' } },
    { id: 'especialistas', label: { es: 'Especialistas', en: 'Specialists' } },
    { id: 'calendario', label: { es: 'Calendario', en: 'Calendar' } },
    { id: 'inscripciones', label: { es: 'Inscripciones', en: 'Admissions' } },
  ];

  const stats = trainingData?.stats || [
    { value: '1,450+', label: { es: 'Líderes formados en 18 países', en: 'Graduates across 18 countries' } },
    { value: '94%', label: { es: 'Impacto directo en políticas territoriales', en: 'Direct impact on territorial policies' } },
    { value: '35+', label: { es: 'Catedráticos y científicos internacionales', en: 'International professors & scientists' } },
    { value: '100%', label: { es: 'Acreditación con validez institucional CGA', en: 'CGA institutional accreditation' } },
  ];

  const diplomados = trainingData?.diplomados || [];
  const cursos = trainingData?.cursos || [];
  const webinars = trainingData?.webinars || [];
  const especialistas = trainingData?.especialistas || [];
  const organizaciones = trainingData?.organizaciones || {};
  const calendario = useMemo(() => getUnifiedAcademicCalendar(trainingData), [trainingData]);


  return (
    <div className="w-full min-h-screen bg-[#f5efe3] text-[#2d2618]">
      <PageHero
        titleWhite="CGA Academy"
        titleGreen="formación especializada"
        description="CGA Academy es el espacio de formación especializada del Consejo Global Ambiental. Desarrolla propuestas de aprendizaje relacionadas con gobernanza ambiental, cambio climático, biodiversidad, economía circular, educación y sostenibilidad institucional."
        bgImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&h=900&fit=crop&auto=format"
      />

      {/* PESTAÑAS INTERACTIVAS (GRID PERFECTO SIN DESBORDAMIENTOS) */}
      <section className="py-6 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1 sm:gap-1.5 p-1.5 rounded-2xl bg-[#eae4d2]/80 border border-[#d8ceb6] shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full py-2.5 px-1 sm:px-2 rounded-xl text-[10px] xs:text-[11px] sm:text-xs font-sans font-medium text-center transition-all leading-snug ${
                activeTab === tab.id
                  ? 'bg-[#4a5a22] text-[#f5efe3] shadow-md font-semibold'
                  : 'text-[#6b6048] hover:text-[#2d2618] hover:bg-[#f5efe3]/80'
              }`}
            >
              {t(tab.label)}
            </button>
          ))}
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <main className="py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto min-h-[600px]">
        {/* 1. OFERTA ACADÉMICA GENERAL */}
        {activeTab === 'oferta' && (
          <div className="space-y-16">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-[#4a5a22]">
                {t({ es: 'Modelo Pedagógico CGA', en: 'CGA Pedagogical Framework' })}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2d2618] font-light mt-3 mb-6">
                {t({ es: 'Formación de Vanguardia para la Acción Climática y Territorial', en: 'Cutting-Edge Education for Climate & Territorial Action' })}
              </h3>
              <p className="text-[#6b6048] font-light text-base sm:text-lg leading-relaxed">
                {t({
                  es: 'El Consejo Global Ambiental imparte programas educativos avalados por convenios con organismos multilaterales, universidades europeas y redes comunitarias. Nuestro enfoque une ciencia de datos, sensores satelitales, derecho ambiental y soberanía de los pueblos.',
                  en: 'The Global Environmental Council delivers educational programs backed by agreements with multilateral bodies, European universities and community networks. Our approach combines data science, satellite sensing, environmental law and grassroots sovereignty.',
                })}
              </p>
            </div>

            {/* 4 PILARES DEL MODELO */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  num: '01',
                  title: { es: 'Rigor Científico & GIS', en: 'Scientific Rigor & GIS' },
                  desc: { es: 'Acceso a laboratorios satelitales en tiempo real y bases de datos climáticas globales.', en: 'Access to real-time satellite labs and global climate databases.' },
                },
                {
                  num: '02',
                  title: { es: 'Saber Biocultural', en: 'Biocultural Wisdom' },
                  desc: { es: 'Integración del conocimiento ancestral de pueblos originarios y custodia de semillas.', en: 'Integration of indigenous ancestral knowledge and seed stewardship.' },
                },
                {
                  num: '03',
                  title: { es: 'Diplomacia & Leyes', en: 'Diplomacy & Law' },
                  desc: { es: 'Dominio de tratados de la ONU, convenios OIT, litigio climático y mediación de conflictos.', en: 'Mastery of UN treaties, ILO conventions, climate litigation and mediation.' },
                },
                {
                  num: '04',
                  title: { es: 'Aplicación en Campo', en: 'Field Application' },
                  desc: { es: 'Cada estudiante diseña e implementa un proyecto real en una cuenca o comunidad.', en: 'Every student designs and executes a real-world project in a watershed.' },
                },
              ].map((pil, idx) => (
                <div key={idx} className="p-7 rounded-3xl bg-[#eae4d2]/70 border border-[#d8ceb6] flex flex-col justify-between">
                  <div>
                    <span className="font-serif text-3xl text-[#4a5a22] font-light block mb-3">{pil.num}</span>
                    <h4 className="font-serif text-xl text-[#2d2618] font-light mb-2">{t(pil.title)}</h4>
                    <p className="text-sm text-[#6b6048] font-light leading-relaxed">{t(pil.desc)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* AVISO INSTITUCIONAL DE FORMACIÓN */}
            <div className="p-8 sm:p-12 rounded-3xl bg-[#2d2618] text-[#f5efe3] flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#a8bc65]">
                  {t({ es: 'CGA Academy', en: 'CGA Academy' })}
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl font-light mt-1 mb-2">
                  {t({ es: 'Próximas Convocatorias y Programas', en: 'Upcoming Calls & Programs' })}
                </h4>
                <p className="text-sm text-[#d8ceb6] font-light max-w-xl">
                  {t({
                    es: 'Los programas de formación especializada y convocatorias institucionales serán publicados a través de esta plataforma.',
                    en: 'Specialized training programs and institutional calls will be published through this platform.',
                  })}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('inscripciones')}
                className="px-6 py-3.5 rounded-full bg-[#4a5a22] hover:bg-[#5a6b2a] text-[#f5efe3] text-xs font-bold uppercase tracking-wider transition-all shrink-0 shadow-lg cursor-pointer"
              >
                {t({ es: 'Contacto & Registro', en: 'Contact & Registration' })} &rarr;
              </button>
            </div>
          </div>
        )}

        {/* 2. DIPLOMADOS */}
        {activeTab === 'diplomados' && (
          <div className="space-y-10">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-[#4a5a22]">
                {t({ es: 'Programas de Alta Especialización', en: 'High Specialization Programs' })}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#2d2618] font-light mt-2">
                {t({ es: 'Diplomados Ejecutivos e Internacionales', en: 'Executive & International Diplomas' })}
              </h3>
            </div>

            {diplomados.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {diplomados.map((item, i) => (
                  <Reveal key={item.id} delay={i * 0.1}>
                    <div className="p-8 sm:p-10 rounded-3xl bg-[#f5efe3] border border-[#d8ceb6] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between h-full">
                      <div>
                        <span className="block text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-[#4a5a22] mb-2.5">
                          {item.badge}
                        </span>
                        <h4 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light leading-snug mb-3">
                          {t(item.title)}
                        </h4>
                        <p className="text-xs text-[#8a7e68] font-medium uppercase tracking-wider mb-1">
                          {item.duration}
                        </p>
                        <p className="text-xs text-[#4a5a22] font-semibold mb-4">
                          {item.dates}
                        </p>
                        <p className="text-[#6b6048] text-sm font-light leading-relaxed mb-4">
                          {t(item.desc)}
                        </p>
                        <div className="p-3.5 rounded-xl bg-[#eae4d2]/60 mb-6 text-xs text-[#5c523e]">
                          <strong>{t({ es: 'Perfil de Ingreso: ', en: 'Candidate Profile: ' })}</strong>
                          {t(item.target)}
                        </div>

                        <div className="space-y-2 pt-4 border-t border-[#eae4d2]">
                          <p className="text-[11px] uppercase tracking-wider font-semibold text-[#2d2618]">
                            {t({ es: 'Estructura Curricular:', en: 'Curriculum Structure:' })}
                          </p>
                          <ul className="text-xs text-[#6b6048] space-y-1.5 list-disc list-inside font-light">
                            {item.modules.map((m, mIdx) => (
                              <li key={mIdx}>{m}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-[#eae4d2] flex items-center justify-between gap-4">
                        <button
                          onClick={() => handleOpenModal(t(item.title))}
                          className="w-full py-3.5 rounded-full bg-[#4a5a22] hover:bg-[#5a6b2a] text-[#f5efe3] text-xs uppercase font-semibold tracking-wider transition-all shadow-md text-center"
                        >
                          {t({ es: 'Solicitar Admisión & Temario', en: 'Apply & Request Syllabus' })} &rarr;
                        </button>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-6 rounded-3xl bg-[#eae4d2]/60 border border-[#d8ceb6] max-w-2xl mx-auto space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#4a5a22] block">
                  {t({ es: 'Convocatorias CGA', en: 'CGA Calls' })}
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light">
                  {t({ es: 'Próximamente Convocatorias de Diplomados', en: 'Upcoming Diploma Calls' })}
                </h4>
                <p className="text-sm text-[#6b6048] font-light leading-relaxed">
                  {t({
                    es: 'Actualmente no hay convocatorias abiertas en este ciclo. Puedes registrarte en la sección de inscripciones para recibir avisos de apertura.',
                    en: 'There are currently no open calls in this cycle. You can register in the admissions section to receive launch notifications.',
                  })}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 3. CURSOS Y TALLERES */}
        {activeTab === 'cursos' && (
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-[#4a5a22]">
                {t({ es: 'Educación Continua & Habilidades Técnicas', en: 'Continuing Education & Technical Skills' })}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#2d2618] font-light mt-2">
                {t({ es: 'Cursos Cortos y Talleres Especializados', en: 'Short Courses & Specialized Workshops' })}
              </h3>
            </div>

            {cursos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cursos.map((c, idx) => (
                  <div key={idx} className="p-8 rounded-3xl bg-[#eae4d2]/70 border border-[#d8ceb6] flex flex-col justify-between shadow-sm">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-semibold text-[#4a5a22] uppercase tracking-wider">{c.hours}</span>
                        <span className="text-xs text-[#8a7e68] font-medium">{c.dates}</span>
                      </div>
                      <h4 className="font-serif text-2xl text-[#2d2618] font-light mb-3">{t(c.title)}</h4>
                      <p className="text-sm text-[#6b6048] font-light leading-relaxed mb-4">{t(c.desc)}</p>
                      <p className="text-xs text-[#8a7e68]">
                        <strong>{t({ es: 'Catedrático: ', en: 'Instructor: ' })}</strong>{c.instructor}
                      </p>
                    </div>
                    <button
                      onClick={() => handleOpenModal(t(c.title))}
                      className="mt-6 py-3 rounded-full bg-[#2d2618] hover:bg-[#3a4a18] text-[#f5efe3] text-xs uppercase font-semibold tracking-wider transition-colors"
                    >
                      {t({ es: 'Inscribirme a este Curso', en: 'Enroll in this Course' })} &rarr;
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-6 rounded-3xl bg-[#eae4d2]/60 border border-[#d8ceb6] max-w-2xl mx-auto space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#4a5a22] block">
                  {t({ es: 'Educación Continua', en: 'Continuing Education' })}
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light">
                  {t({ es: 'Próximamente Talleres y Cursos Especializados', en: 'Upcoming Specialized Workshops' })}
                </h4>
                <p className="text-sm text-[#6b6048] font-light leading-relaxed">
                  {t({
                    es: 'No hay talleres o cursos técnicos programados en este momento. Las nuevas ediciones se darán a conocer a través de esta sección.',
                    en: 'There are currently no workshops or courses scheduled.',
                  })}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 4. CONFERENCIAS Y WEBINARS */}
        {activeTab === 'webinars' && (
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-[#4a5a22]">
                {t({ es: 'Diálogo Abierto & Divulgación', en: 'Open Dialogue & Outreach' })}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#2d2618] font-light mt-2">
                {t({ es: 'Conferencias Magistrales & Foros Globales', en: 'Keynotes & Global Forums' })}
              </h3>
            </div>

            {webinars.length > 0 ? (
              <div className="space-y-6 max-w-4xl mx-auto">
                {webinars.map((w, idx) => (
                  <div key={idx} className="p-7 sm:p-8 rounded-3xl bg-[#f5efe3] border border-[#d8ceb6] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <span className="block text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-[#4a5a22]">
                        {w.type}
                      </span>
                      <h4 className="font-serif text-2xl text-[#2d2618] font-light leading-snug">{t(w.title)}</h4>
                      <p className="text-sm text-[#4a5a22] font-medium">{w.speaker}</p>
                      <p className="text-xs text-[#6b6048] font-light leading-relaxed">{t(w.summary)}</p>
                      <p className="text-xs text-[#8a7e68] font-semibold pt-1">{w.date}</p>
                    </div>
                    <button
                      onClick={() => handleOpenModal(t(w.title))}
                      className="px-6 py-3 rounded-full bg-[#4a5a22] hover:bg-[#5a6b2a] text-[#f5efe3] text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 shadow-sm"
                    >
                      {t({ es: 'Reservar Lugar', en: 'Book Seat' })}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-6 rounded-3xl bg-[#eae4d2]/60 border border-[#d8ceb6] max-w-2xl mx-auto space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#4a5a22] block">
                  {t({ es: 'Divulgación Abierta', en: 'Open Outreach' })}
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light">
                  {t({ es: 'Próximamente Conferencias Magistrales', en: 'Upcoming Keynote Conferences' })}
                </h4>
                <p className="text-sm text-[#6b6048] font-light leading-relaxed">
                  {t({
                    es: 'No hay conferencias magistrales ni webinars programados en este momento.',
                    en: 'There are currently no keynote conferences or webinars scheduled.',
                  })}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 5. PROGRAMAS PARA ORGANIZACIONES (100% CONFIGURABLE) */}
        {activeTab === 'organizaciones' && (() => {
          const org = organizaciones || {};
          const progs = org.programs && org.programs.length > 0 ? org.programs : [];
          const benefits = org.benefits && org.benefits.length > 0 ? org.benefits : [];

          return (
            <div className="space-y-12 max-w-6xl mx-auto">
              {/* Encabezado Principal */}
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-[#4a5a22]">
                  {t(org.subtitle || { es: 'Soluciones Institucionales a Medida', en: 'Tailored Institutional Solutions' })}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2d2618] font-light leading-tight">
                  {t(org.title || { es: 'Programas para Organizaciones, Gobiernos y Empresas', en: 'Custom Programs for Organizations, Governments & Corporations' })}
                </h3>
                <p className="text-[#6b6048] font-light text-base sm:text-lg leading-relaxed pt-2">
                  {t(org.description || {
                    es: 'Diseñamos diagnósticos integrales de madurez ecológica y capacitamos a gabinetes ministeriales, equipos de sostenibilidad corporativa (ESG), operadores de agua y comunidades territoriales mediante currículas cerradas in-situ o en campus virtual exclusivo.',
                    en: 'We design comprehensive ecological maturity assessments and train ministerial cabinets, corporate sustainability teams, water operators and community councils with private on-site or online curricula.',
                  })}
                </p>
              </div>

              {/* Grid de Programas Especializados para Organizaciones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {progs.map((p) => (
                  <div
                    key={p.id}
                    className="p-8 rounded-3xl bg-[#f5efe3] border border-[#d8ceb6] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group space-y-6"
                  >
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-serif text-2xl text-[#2d2618] font-medium leading-snug group-hover:text-[#4a5a22] transition-colors">
                          {t(p.title)}
                        </h4>
                      </div>

                      <p className="text-xs sm:text-sm text-[#5c523e] font-light leading-relaxed">
                        {t(p.desc)}
                      </p>

                      {/* Modalidades / Formatos */}
                      {p.modalities && p.modalities.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {p.modalities.map((m, mIdx) => (
                            <span
                              key={mIdx}
                              className="px-2.5 py-1 rounded-lg bg-[#eae4d2] text-[#4a5a22] text-[11px] font-semibold font-sans border border-[#d8ceb6]/60"
                            >
                              • {m}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#eae4d2] flex items-center justify-between">
                      <span className="text-xs text-[#6b6048] font-light">
                        Diseño curricular a la medida
                      </span>
                      <button
                        onClick={() => handleOpenModal(typeof p.title === 'string' ? p.title : p.title?.es || 'Programa para Organizaciones')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                      >
                        <span>Solicitar Programa</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ventajas y Metodología Institucional */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#eae4d2]/90 border border-[#d8ceb6] space-y-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4a5a22]">
                  <Sparkles className="w-4 h-4" />
                  <span>Ventajas de Capacitación Institucional CGA</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {benefits.map((b, bIdx) => (
                    <div
                      key={bIdx}
                      className="p-4 rounded-2xl bg-[#f5efe3] border border-[#d8ceb6] flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#4a5a22] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#2d2618] font-medium leading-relaxed">
                        {t(b)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#d8ceb6]">
                  <div>
                    <h5 className="font-serif text-lg text-[#2d2618] font-medium">
                      ¿Requieres un diagnóstico o currícula específica para tu equipo?
                    </h5>
                    <p className="text-xs text-[#6b6048]">
                      Nuestro consejo académico estructura propuestas técnicas y financieras en menos de 72 horas.
                    </p>
                  </div>

                  <button
                    onClick={() => handleOpenModal('Propuesta Institucional / Programas para Organizaciones')}
                    className="px-6 py-3 rounded-full bg-[#2d2618] hover:bg-[#4a5a22] text-[#f5efe3] text-xs font-bold uppercase tracking-wider transition-colors shadow-md whitespace-nowrap cursor-pointer shrink-0"
                  >
                    {t(org.ctaText || { es: 'Solicitar Propuesta para mi Organización', en: 'Request Proposal for my Organization' })} &rarr;
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 6. CLAUSTRO DE ESPECIALISTAS */}
        {activeTab === 'especialistas' && (
          <div className="space-y-10">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-[#4a5a22]">
                {t({ es: 'Cuerpo Docente de Excelencia', en: 'Faculty of Excellence' })}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#2d2618] font-light mt-2">
                {t({ es: 'Catedráticos, Investigadores y Juristas Internacionales', en: 'International Professors, Researchers & Jurists' })}
              </h3>
            </div>

            {especialistas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {especialistas.map((sp, idx) => (
                  <div key={idx} className="p-8 rounded-3xl bg-[#f5efe3] border border-[#d8ceb6] shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-[#8a7e68] font-bold uppercase tracking-widest block mb-2">{sp.origin}</span>
                      <h4 className="font-serif text-2xl text-[#2d2618] font-light mb-1">{sp.name}</h4>
                      <p className="text-xs font-semibold text-[#4a5a22] mb-2">{t(sp.role)}</p>
                      <p className="text-[11px] text-[#8a7e68] italic mb-4">{sp.credentials}</p>
                      <p className="text-xs text-[#6b6048] font-light leading-relaxed">{t(sp.expertise)}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[#eae4d2] flex items-center justify-between text-[11px] text-[#8a7e68]">
                      <span>{t({ es: 'Claustro Docente CGA', en: 'CGA Faculty Board' })}</span>
                      <span className="text-[#4a5a22]">Ginebra · CDMX</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-6 rounded-3xl bg-[#eae4d2]/60 border border-[#d8ceb6] max-w-2xl mx-auto space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#4a5a22] block">
                  {t({ es: 'Cuerpo Académico', en: 'Academic Faculty' })}
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light">
                  {t({ es: 'Próximamente Claustro de Especialistas', en: 'Upcoming Faculty Board' })}
                </h4>
                <p className="text-sm text-[#6b6048] font-light leading-relaxed">
                  {t({
                    es: 'El claustro de catedráticos e investigadores internacionales se dará a conocer con la apertura del nuevo ciclo académico.',
                    en: 'The faculty of international professors and researchers will be announced with the launch of the new academic cycle.',
                  })}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 7. CALENDARIO ACADÉMICO INTERACTIVO (COMO CALENDARIO REAL) */}
        {activeTab === 'calendario' && (() => {
          const MONTH_NAMES_ES = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
          ];
          const WEEKDAYS_ES = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

          const daysInMonth = new Date(calYear, calMonthOffset + 1, 0).getDate();
          const firstDayIndex = (new Date(calYear, calMonthOffset, 1).getDay() + 6) % 7; // Lunes = 0

          const monthPrefix = `${calYear}-${String(calMonthOffset + 1).padStart(2, '0')}`;
          
          const filteredEvents = calendario.filter((ev) => {
            const matchCat = calCategoryFilter === 'all' || ev.category === calCategoryFilter;
            return matchCat;
          });

          const eventsThisMonth = filteredEvents.filter((ev) => ev.date && ev.date.startsWith(monthPrefix));

          // Color tags por categoría
          const getCategoryBadgeClass = (cat) => {
            switch (cat) {
              case 'Diplomado':
                return 'bg-[#4a5a22] text-[#f5efe3]';
              case 'Curso / Taller':
              case 'Cursos & Talleres':
                return 'bg-[#8c4a2f] text-[#f5efe3]';
              case 'Conferencia':
                return 'bg-[#205466] text-[#f5efe3]';
              case 'Beca & Convocatoria':
                return 'bg-[#8c6818] text-[#f5efe3]';
              case 'In-Company':
                return 'bg-[#5c3d75] text-[#f5efe3]';
              default:
                return 'bg-[#4a5a22] text-[#f5efe3]';
            }
          };

          return (
            <div className="space-y-8 max-w-6xl mx-auto">
              {/* Encabezado del Calendario */}
              <div className="text-center max-w-3xl mx-auto space-y-2">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-[#4a5a22]">
                  {t({ es: 'Cronograma Oficial 2026', en: 'Official 2026 Schedule' })}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2d2618] font-light">
                  {t({ es: 'Calendario Académico y Convocatorias', en: 'Academic Calendar & Calls' })}
                </h3>
                <p className="text-sm sm:text-base text-[#6b6048] font-light">
                  {t({
                    es: 'Consulta las fechas y actividades del nuevo ciclo académico y convocatorias institucionales.',
                    en: 'Check dates and activities of the new academic cycle and institutional calls.',
                  })}
                </p>
              </div>

              {calendario.length === 0 ? (
                <div className="text-center py-16 px-6 rounded-3xl bg-[#eae4d2]/60 border border-[#d8ceb6] max-w-2xl mx-auto space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#4a5a22] block">
                    {t({ es: 'Calendario Institucional', en: 'Institutional Calendar' })}
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light">
                    {t({ es: 'Sin Fechas Programadas Actualmente', en: 'No Scheduled Dates at This Time' })}
                  </h4>
                  <p className="text-sm text-[#6b6048] font-light leading-relaxed">
                    {t({
                      es: 'El cronograma oficial de convocatorias e inicios de ciclo se publicará próximamente.',
                      en: 'The official schedule of calls and cycle starts will be published soon.',
                    })}
                  </p>
                </div>
              ) : (
                <>
                  {/* Barra de Filtros por Categoría y Selector de Vista */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-[#eae4d2]/80 border border-[#d8ceb6]">
                <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#4a5a22] px-2 flex items-center gap-1 shrink-0">
                    <Filter className="w-3.5 h-3.5" />
                    <span>Filtrar:</span>
                  </span>
                  {[
                    { id: 'all', label: 'Todas las Fechas' },
                    { id: 'Diplomado', label: 'Diplomados' },
                    { id: 'Curso / Taller', label: 'Cursos & Talleres' },
                    { id: 'Conferencia', label: 'Conferencias' },
                    { id: 'Beca & Convocatoria', label: 'Becas' },
                    { id: 'In-Company', label: 'In-Company' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCalCategoryFilter(cat.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        calCategoryFilter === cat.id
                          ? 'bg-[#4a5a22] text-[#f5efe3] shadow-xs'
                          : 'bg-white/60 text-[#6b6048] hover:bg-white hover:text-[#2d2618]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1 bg-white/70 p-1 rounded-xl border border-[#d8ceb6] shrink-0">
                  <button
                    onClick={() => setCalViewMode('grid')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      calViewMode === 'grid' ? 'bg-[#4a5a22] text-white shadow-xs' : 'text-[#6b6048] hover:text-[#2d2618]'
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>Vista Calendario</span>
                  </button>
                  <button
                    onClick={() => setCalViewMode('list')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      calViewMode === 'list' ? 'bg-[#4a5a22] text-white shadow-xs' : 'text-[#6b6048] hover:text-[#2d2618]'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>Vista Lista</span>
                  </button>
                </div>
              </div>

              {/* VISTA 1: CALENDARIO MENSUAL EN CUADRÍCULA (GRID REAL) */}
              {calViewMode === 'grid' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Cuadrícula del Calendario (2 Columnas) */}
                  <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-[#f5efe3] border border-[#d8ceb6] shadow-sm space-y-6">
                    {/* Navegación del Mes */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#4a5a22] text-[#f5efe3] flex items-center justify-center shadow-xs">
                          <CalendarIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-normal capitalize">
                            {MONTH_NAMES_ES[calMonthOffset]} {calYear}
                          </h4>
                          <span className="text-[11px] text-[#6b6048] font-mono">
                            {eventsThisMonth.length} {eventsThisMonth.length === 1 ? 'actividad programada' : 'actividades programadas'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 bg-[#eae4d2] p-1 rounded-2xl border border-[#d8ceb6]">
                        <button
                          onClick={handlePrevMonth}
                          className="p-2 rounded-xl hover:bg-white text-[#2d2618] transition-colors cursor-pointer"
                          title="Mes Anterior"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setCalMonthOffset(4); setCalYear(2026); }}
                          className="px-3 py-1 text-[11px] font-bold text-[#4a5a22] hover:bg-white rounded-lg transition-colors cursor-pointer"
                        >
                          Hoy
                        </button>
                        <button
                          onClick={handleNextMonth}
                          className="p-2 rounded-xl hover:bg-white text-[#2d2618] transition-colors cursor-pointer"
                          title="Mes Siguiente"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Días de la semana */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-bold uppercase tracking-wider text-[#4a5a22] py-2 border-b border-[#eae4d2]">
                      {WEEKDAYS_ES.map((d, dIdx) => (
                        <div key={dIdx} className={dIdx >= 5 ? 'text-[#8c4a2f]' : ''}>
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Celdas de días del mes */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-2">
                      {/* Espacios vacíos antes del día 1 */}
                      {Array.from({ length: firstDayIndex }).map((_, emptyIdx) => (
                        <div
                          key={`empty-${emptyIdx}`}
                          className="h-16 sm:h-20 rounded-2xl bg-[#eae4d2]/30 border border-transparent opacity-40"
                        />
                      ))}

                      {/* Días del mes */}
                      {Array.from({ length: daysInMonth }).map((_, dIdx) => {
                        const dayNum = dIdx + 1;
                        const dateStr = `${calYear}-${String(calMonthOffset + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                        const dayEvents = filteredEvents.filter((e) => e.date === dateStr);
                        const hasEvents = dayEvents.length > 0;
                        const isSelected = selectedCalEvent && selectedCalEvent.date === dateStr;

                        return (
                          <div
                            key={dayNum}
                            onClick={() => hasEvents && setSelectedCalEvent(dayEvents[0])}
                            className={`h-16 sm:h-20 p-1.5 sm:p-2 rounded-2xl border transition-all flex flex-col justify-between ${
                              hasEvents
                                ? isSelected
                                  ? 'bg-[#4a5a22]/15 border-[#4a5a22] shadow-sm ring-2 ring-[#4a5a22]/30 cursor-pointer'
                                  : 'bg-white border-[#d8ceb6] hover:border-[#4a5a22] shadow-xs cursor-pointer hover:bg-[#eae4d2]/40'
                                : 'bg-[#eae4d2]/40 border-transparent text-[#8a7e68]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-xs font-bold ${
                                  hasEvents ? 'text-[#2d2618]' : 'text-[#8a7e68]'
                                }`}
                              >
                                {dayNum}
                              </span>
                              {hasEvents && (
                                <span className="w-2 h-2 rounded-full bg-[#4a5a22]" />
                              )}
                            </div>

                            {hasEvents && (
                              <div className="space-y-0.5 overflow-hidden">
                                {dayEvents.map((ev, evI) => (
                                  <div
                                    key={evI}
                                    className={`px-1 sm:px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold truncate leading-tight ${getCategoryBadgeClass(ev.category)}`}
                                  >
                                    {typeof ev.title === 'string' ? ev.title : ev.title?.es || 'Evento'}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Panel Lateral: Detalle del Evento Seleccionado o Próximos Eventos */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#eae4d2]/90 border border-[#d8ceb6] shadow-sm flex flex-col justify-between space-y-6">
                    {selectedCalEvent ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getCategoryBadgeClass(
                              selectedCalEvent.category
                            )}`}
                          >
                            {selectedCalEvent.category}
                          </span>
                          <span className="text-xs font-mono font-bold text-[#4a5a22]">
                            {selectedCalEvent.date}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-serif text-2xl text-[#2d2618] font-medium leading-snug">
                            {t(selectedCalEvent.title)}
                          </h4>
                          {selectedCalEvent.time && (
                            <div className="flex items-center gap-1.5 text-xs text-[#6b6048] font-semibold mt-1">
                              <Clock className="w-3.5 h-3.5 text-[#4a5a22]" />
                              <span>{selectedCalEvent.time}</span>
                            </div>
                          )}
                          {selectedCalEvent.modality && (
                            <div className="text-[11px] text-[#4a5a22] font-mono mt-0.5">
                              • {selectedCalEvent.modality}
                            </div>
                          )}
                        </div>

                        <p className="text-xs text-[#5c523e] font-light leading-relaxed">
                          {t(selectedCalEvent.desc)}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#4a5a22] block">
                          Actividades de {MONTH_NAMES_ES[calMonthOffset]}
                        </span>
                        {eventsThisMonth.length > 0 ? (
                          <div className="space-y-3">
                            {eventsThisMonth.map((ev) => (
                              <div
                                key={ev.id}
                                onClick={() => setSelectedCalEvent(ev)}
                                className="p-3.5 rounded-2xl bg-[#f5efe3] border border-[#d8ceb6] hover:border-[#4a5a22] transition-colors cursor-pointer space-y-1.5"
                              >
                                <div className="flex items-center justify-between text-[10px] font-bold">
                                  <span className={`px-2 py-0.5 rounded-full ${getCategoryBadgeClass(ev.category)}`}>
                                    {ev.category}
                                  </span>
                                  <span className="font-mono text-[#4a5a22]">{ev.date}</span>
                                </div>
                                <h5 className="font-serif text-sm text-[#2d2618] font-medium leading-snug">
                                  {t(ev.title)}
                                </h5>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-[#6b6048] italic py-6 text-center">
                            No hay actividades programadas en este mes con el filtro seleccionado.
                          </p>
                        )}
                      </div>
                    )}

                    <div className="pt-4 border-t border-[#d8ceb6] space-y-2">
                      <button
                        onClick={() =>
                          handleOpenModal(
                            selectedCalEvent
                              ? typeof selectedCalEvent.title === 'string'
                                ? selectedCalEvent.title
                                : selectedCalEvent.title?.es
                              : 'Admisiones & Convocatorias 2026'
                          )
                        }
                        className="w-full py-3.5 rounded-xl bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Postularme / Solicitar Información</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {selectedCalEvent && (
                        <button
                          onClick={() => setSelectedCalEvent(null)}
                          className="w-full py-2 rounded-xl text-xs text-[#6b6048] hover:text-[#2d2618] text-center"
                        >
                          Ver listado del mes
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* VISTA 2: LISTADO CRONOLÓGICO DETALLADO */}
              {calViewMode === 'list' && (
                <div className="space-y-4">
                  {filteredEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className="p-6 rounded-3xl bg-[#f5efe3] border border-[#d8ceb6] shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                    >
                      <div className="flex items-start sm:items-center gap-5 flex-1">
                        <div className="p-3.5 rounded-2xl bg-[#eae4d2] text-[#4a5a22] text-center min-w-[85px] shrink-0 border border-[#d8ceb6]">
                          <span className="text-[10px] uppercase font-bold tracking-wider block text-[#6b6048]">
                            Fecha
                          </span>
                          <span className="font-mono text-sm font-bold text-[#2d2618] block mt-0.5">
                            {ev.date}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getCategoryBadgeClass(ev.category)}`}>
                              {ev.category}
                            </span>
                            {ev.time && (
                              <span className="text-xs text-[#6b6048] font-semibold flex items-center gap-1">
                                <Clock className="w-3 h-3 text-[#4a5a22]" />
                                {ev.time}
                              </span>
                            )}
                            {ev.modality && (
                              <span className="text-[11px] text-[#4a5a22] font-mono">
                                • {ev.modality}
                              </span>
                            )}
                          </div>

                          <h4 className="font-serif text-xl text-[#2d2618] font-medium">
                            {t(ev.title)}
                          </h4>
                          <p className="text-xs text-[#6b6048] font-light max-w-2xl">
                            {t(ev.desc)}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenModal(typeof ev.title === 'string' ? ev.title : ev.title?.es)}
                        className="px-5 py-2.5 rounded-full bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-bold uppercase tracking-wider shadow-sm transition-all whitespace-nowrap self-end sm:self-center cursor-pointer"
                      >
                        Inscribirme &rarr;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      );
        })()}

        {/* 8. INSCRIPCIONES Y BECAS */}
        {activeTab === 'inscripciones' && (
          <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#f5efe3] border border-[#d8ceb6] shadow-lg">
            <div className="text-center mb-8">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-[#4a5a22]">
                {t({ es: 'Proceso de Admisión', en: 'Admission Process' })}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#2d2618] font-light mt-2 mb-3">
                {t({ es: 'Inscripción y Solicitud de Becas de Excelencia', en: 'Enrollment & Scholarship Application' })}
              </h3>
              <p className="text-xs text-[#6b6048] max-w-lg mx-auto font-light">
                {t({
                  es: 'El CGA otorga becas del 50% al 100% para postulantes de comunidades vulnerables, líderes indígenas y servidores públicos de cuencas prioritarias.',
                  en: 'CGA grants 50% to 100% scholarships for applicants from vulnerable communities, indigenous leaders and civil servants in priority watersheds.',
                })}
              </p>
            </div>

            {!formSubmitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSubmitted(true);
                }}
                className="space-y-4 font-sans"
              >
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4a5a22] mb-1">
                    {t({ es: 'Programa de Interés', en: 'Program of Interest' })}
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#eae4d2]/70 border border-[#d8ceb6] text-sm focus:outline-none focus:border-[#4a5a22] text-[#2d2618]"
                  >
                    <option value="">{t({ es: 'Selecciona una opción...', en: 'Select an option...' })}</option>
                    {diplomados.map((d) => (
                      <option key={d.id} value={d.id}>{t(d.title)}</option>
                    ))}
                    {cursos.map((c) => (
                      <option key={c.id} value={c.id}>{t(c.title)}</option>
                    ))}
                    {webinars.map((w) => (
                      <option key={w.id} value={w.id}>{t(w.title)}</option>
                    ))}
                    <option value="aviso-apertura">{t({ es: 'Notificación de apertura de nuevas convocatorias', en: 'Notification for upcoming calls' })}</option>
                    <option value="solicitud-institucional">{t({ es: 'Solicitud de programa institucional para organizaciones', en: 'Institutional program request for organizations' })}</option>
                    <option value="informacion-general">{t({ es: 'Información general de la Academia CGA', en: 'General CGA Academy information' })}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4a5a22] mb-1">
                    {t({ es: 'Nombre Completo', en: 'Full Name' })}
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#eae4d2]/70 border border-[#d8ceb6] text-sm focus:outline-none focus:border-[#4a5a22]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#4a5a22] mb-1">
                      {t({ es: 'Correo Electrónico', en: 'Email' })}
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#eae4d2]/70 border border-[#d8ceb6] text-sm focus:outline-none focus:border-[#4a5a22]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#4a5a22] mb-1">
                      {t({ es: 'Teléfono / WhatsApp (con código de país)', en: 'Phone / WhatsApp (with country code)' })}
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#eae4d2]/70 border border-[#d8ceb6] text-sm focus:outline-none focus:border-[#4a5a22]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#4a5a22] mb-1">
                      {t({ es: 'Organización / Institución / Cargo', en: 'Organization / Role' })}
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#eae4d2]/70 border border-[#d8ceb6] text-sm focus:outline-none focus:border-[#4a5a22]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#4a5a22] mb-1">
                      {t({ es: '¿Postulas a Beca Institucional?', en: 'Applying for Scholarship?' })}
                    </label>
                    <select
                      value={formData.scholarship}
                      onChange={(e) => setFormData({ ...formData, scholarship: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#eae4d2]/70 border border-[#d8ceb6] text-sm focus:outline-none focus:border-[#4a5a22]"
                    >
                      <option value="no">{t({ es: 'No (Inscripción General)', en: 'No (General Admission)' })}</option>
                      <option value="parcial">{t({ es: 'Sí, Beca Parcial (50%)', en: 'Yes, Partial Scholarship (50%)' })}</option>
                      <option value="total">{t({ es: 'Sí, Beca Total (100% Mérito / Líder Comunitario)', en: 'Yes, Full Scholarship (100% Community Leader)' })}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4a5a22] mb-1">
                    {t({ es: 'Carta de Exposición de Motivos / Comentarios', en: 'Statement of Purpose / Notes' })}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={t({ es: 'Cuéntanos brevemente tu trayectoria y cómo aplicarás lo aprendido...', en: 'Tell us briefly about your background and application plans...' })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#eae4d2]/70 border border-[#d8ceb6] text-sm focus:outline-none focus:border-[#4a5a22]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#4a5a22] hover:bg-[#5a6b2a] text-[#f5efe3] text-xs font-bold uppercase tracking-wider transition-all shadow-md mt-4"
                >
                  {t({ es: 'Enviar Solicitud de Inscripción / Beca', en: 'Submit Admission & Scholarship Application' })} &rarr;
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#4a5a22]/20 text-[#4a5a22] flex items-center justify-center text-3xl mx-auto">
                  ✓
                </div>
                <h4 className="font-serif text-3xl text-[#2d2618] font-light">
                  Solicitud Recibida
                </h4>
                <p className="text-sm text-[#5c523e] font-light max-w-lg mx-auto leading-relaxed">
                  Tu solicitud de inscripción fue recibida. El equipo académico dará seguimiento conforme al calendario y condiciones de la convocatoria.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#2d2618] text-[#f5efe3] text-xs uppercase font-semibold tracking-wider hover:bg-[#3a4a18] transition-colors"
                >
                  Registrar otra solicitud
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL POPUP CUANDO SE HACE CLIC EN "SOLICITAR ADMISIÓN" DESDE CUALQUIER SECCIÓN */}
      <AnimatePresence>
        {selectedProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d2618]/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: EASE_LUX }}
              className="relative w-full max-w-xl p-8 rounded-3xl bg-[#f5efe3] border border-[#d8ceb6] shadow-2xl text-[#2d2618]"
            >
              <button
                onClick={() => { setSelectedProgram(null); setFormSubmitted(false); }}
                className="absolute top-6 right-6 text-xl text-[#6b6048] hover:text-[#2d2618]"
              >
                ✕
              </button>

              {!formSubmitted ? (
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#4a5a22]">
                    {t({ es: 'Formulario de Admisión Directa', en: 'Direct Admission Form' })}
                  </span>
                  <h4 className="font-serif text-2xl font-light mt-1 mb-2">
                    {selectedProgram}
                  </h4>
                  <p className="text-xs text-[#6b6048] mb-6">
                    {t({
                      es: 'Ingresa tus datos para recibir el temario oficial, aranceles y requisitos de beca institucional.',
                      en: 'Enter your details to receive official syllabus, tuition fees and scholarship requirements.',
                    })}
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#4a5a22] mb-1">
                        {t({ es: 'Nombre Completo', en: 'Full Name' })}
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#eae4d2]/70 border border-[#d8ceb6] text-sm focus:outline-none focus:border-[#4a5a22]"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#4a5a22] mb-1">
                          {t({ es: 'Correo Electrónico', en: 'Email' })}
                        </label>
                        <input
                          required
                          type="email"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#eae4d2]/70 border border-[#d8ceb6] text-sm focus:outline-none focus:border-[#4a5a22]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#4a5a22] mb-1">
                          {t({ es: 'Teléfono / WhatsApp', en: 'Phone / WhatsApp' })}
                        </label>
                        <input
                          required
                          type="tel"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#eae4d2]/70 border border-[#d8ceb6] text-sm focus:outline-none focus:border-[#4a5a22]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#4a5a22] mb-1">
                        {t({ es: 'Institución / Organización / País', en: 'Institution / Organization / Country' })}
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#eae4d2]/70 border border-[#d8ceb6] text-sm focus:outline-none focus:border-[#4a5a22]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 py-3.5 rounded-full bg-[#4a5a22] hover:bg-[#5a6b2a] text-[#f5efe3] text-xs uppercase font-semibold tracking-wider transition-all shadow-md"
                    >
                      {t({ es: 'Enviar Solicitud', en: 'Submit Request' })} &rarr;
                    </button>
                  </form>
                </div>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#4a5a22]/20 text-[#4a5a22] flex items-center justify-center text-2xl mx-auto">
                    ✓
                  </div>
                  <h4 className="font-serif text-2xl text-[#2d2618] font-light">
                    {t({ es: '¡Solicitud Registrada!', en: 'Request Registered!' })}
                  </h4>
                  <p className="text-sm text-[#6b6048] font-light max-w-md mx-auto">
                    {t({
                      es: 'El equipo de admisiones del CGA te enviará la información completa por correo electrónico.',
                      en: 'The CGA admissions team will email you the full program information.',
                    })}
                  </p>
                  <button
                    onClick={() => { setSelectedProgram(null); setFormSubmitted(false); }}
                    className="px-6 py-2.5 rounded-full bg-[#2d2618] text-[#f5efe3] text-xs uppercase font-semibold tracking-wider"
                  >
                    {t({ es: 'Cerrar', en: 'Close' })}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <FooterNav />
    </div>
  );
}
