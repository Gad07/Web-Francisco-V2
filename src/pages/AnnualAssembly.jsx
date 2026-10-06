import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { useI18n } from '../i18n/index.jsx';

export default function AnnualAssembly() {
  const { t } = useI18n();
  const [activeItem, setActiveItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const agendaItems = [
    {
      num: '01',
      title: { es: 'Informe Anual de Actividades', en: 'Annual Activity Report' },
      short: { es: 'Balance institucional y auditoría de impacto', en: 'Institutional review and impact audit' },
      tag: { es: 'Rendición de Cuentas', en: 'Accountability' },
      desc: {
        es: 'Evaluación transparente, cuantitativa y cualitativa de los resultados alcanzados durante el periodo en todos los territorios de incidencia directa del Consejo.',
        en: 'Transparent, quantitative and qualitative evaluation of the results achieved during the period across all territories where the Council has direct impact.',
      },
      details: [
        {
          es: 'Auditoría técnica de impacto socioambiental en los programas activos.',
          en: 'Technical socio-environmental impact audit of active programmes.',
        },
        {
          es: 'Rendición de cuentas sobre la asignación de recursos y fondos multilaterales.',
          en: 'Accountability reporting on the allocation of resources and multilateral funds.',
        },
        {
          es: 'Evaluación del cumplimiento de metas operativas por consejería especializada.',
          en: 'Evaluation of operational target compliance by each specialist councillorship.',
        },
      ],
      metrics: [
        { label: { es: 'Transparencia', en: 'Transparency' }, val: '100%' },
        { label: { es: 'Dictámenes', en: 'Opinions' }, val: '24+' },
        { label: { es: 'Territorios', en: 'Territories' }, val: { es: '10 Zonas', en: '10 Zones' } },
      ],
      img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&h=800&fit=crop&auto=format',
    },
    {
      num: '02',
      title: { es: 'Definición de Prioridades Territoriales', en: 'Setting Territorial Priorities' },
      short: { es: 'Focos de emergencia y asignación directa', en: 'Emergency hotspots and direct allocation' },
      tag: { es: 'Estrategia Territorial', en: 'Territorial Strategy' },
      desc: {
        es: 'Establecimiento de las líneas de acción estratégicas, focos de emergencia ambiental y asignación de programas directos sobre el suelo de conservación.',
        en: 'Establishment of strategic lines of action, environmental emergency hotspots and allocation of direct programmes on conservation land.',
      },
      details: [
        {
          es: 'Mapeo de zonas críticas para restauración de cuencas y biodiversidad.',
          en: 'Mapping of critical zones for watershed and biodiversity restoration.',
        },
        {
          es: 'Asignación prioritaria de brigadas y equipos técnicos en campo.',
          en: 'Priority deployment of brigades and technical field teams.',
        },
        {
          es: 'Articulación de acuerdos directos con ejidos, comunidades y custodios.',
          en: 'Direct agreements with communal landholdings, communities and custodians.',
        },
      ],
      metrics: [
        { label: { es: 'Líneas Estratégicas', en: 'Strategic Lines' }, val: '10' },
        { label: { es: 'Ecosistemas', en: 'Ecosystems' }, val: { es: '8 Clave', en: '8 Key' } },
        { label: { es: 'Comunidades', en: 'Communities' }, val: '35+' },
      ],
      img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1000&h=800&fit=crop&auto=format',
    },
    {
      num: '03',
      title: { es: 'Directrices de Cooperación Internacional', en: 'International Cooperation Guidelines' },
      short: { es: 'Validación de acuerdos multilaterales', en: 'Validation of multilateral agreements' },
      tag: { es: 'Diplomacia Ambiental', en: 'Environmental Diplomacy' },
      desc: {
        es: 'Validación colegiada de acuerdos multilaterales, convenios con organismos globales, agencias de desarrollo y misiones diplomáticas ambientales.',
        en: 'Collegiate validation of multilateral agreements, covenants with global bodies, development agencies and environmental diplomatic missions.',
      },
      details: [
        {
          es: 'Formalización de agendas conjuntas con agencias multilaterales.',
          en: 'Formalisation of joint agendas with multilateral agencies.',
        },
        {
          es: 'Integración de protocolos de cooperación y financiamiento verde.',
          en: 'Integration of cooperation protocols and green finance.',
        },
        {
          es: 'Intercambio de mejores prácticas científicas y marcos comparados.',
          en: 'Exchange of scientific best practices and comparative frameworks.',
        },
      ],
      metrics: [
        { label: { es: 'Organismos', en: 'Bodies' }, val: '12+' },
        { label: { es: 'Misiones', en: 'Missions' }, val: '6' },
        { label: { es: 'Convenios', en: 'Agreements' }, val: '15' },
      ],
      img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&h=800&fit=crop&auto=format',
    },
    {
      num: '04',
      title: { es: 'Adopción de Resoluciones Vinculantes', en: 'Adoption of Binding Resolutions' },
      short: { es: 'Compromisos estatutarios y mandatos', en: 'Statutory commitments and mandates' },
      tag: { es: 'Marco Jurídico', en: 'Legal Framework' },
      desc: {
        es: 'Formalización de compromisos estatutarios y normativos de observancia obligatoria para la presidencia, la secretaría ejecutiva y las consejerías honoríficas.',
        en: 'Formalisation of binding statutory and regulatory commitments for the presidency, the executive secretariat and the honorary councillorships.',
      },
      details: [
        {
          es: 'Votación nominal y registro formal de acuerdos en actas notariales.',
          en: 'Roll-call voting and formal recording of agreements in notarial minutes.',
        },
        {
          es: 'Emisión de mandatos ejecutivos para la dirección técnica.',
          en: 'Issuance of executive mandates for the technical directorate.',
        },
        {
          es: 'Publicación abierta e inmediata de resoluciones en el repositorio oficial.',
          en: 'Immediate open publication of resolutions in the official repository.',
        },
      ],
      metrics: [
        { label: { es: 'Resoluciones', en: 'Resolutions' }, val: '100%' },
        { label: { es: 'Quórum', en: 'Quorum' }, val: { es: 'Calificado', en: 'Qualified' } },
        { label: { es: 'Publicidad', en: 'Disclosure' }, val: { es: 'Irrestricta', en: 'Unrestricted' } },
      ],
      img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1000&h=800&fit=crop&auto=format',
    },
  ];

  const EASE = [0.22, 1, 0.36, 1];

  const visibleCards = windowWidth >= 1024 ? 4 : windowWidth >= 640 ? 2 : 1;
  const maxIndex = Math.max(0, agendaItems.length - visibleCards);

  const handlePrevSlide = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const handleNextSlide = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

  const selectedItem = activeItem !== null ? agendaItems[activeItem] : null;

  const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.28 } },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  const assemblyEvents = [
    {
      year: '2025',
      title: {
        es: 'Consolidación Territorial y Despliegue de las 10 Líneas',
        en: 'Territorial Consolidation and Rollout of the 10 Strategic Lines',
      },
      date: { es: '14 de Noviembre, 2025', en: 'November 14, 2025' },
      resolutionsCount: { es: '18 Resoluciones Aprobadas', en: '18 Resolutions Approved' },
      summary: {
        es: 'Sesión Ordinaria Plenaria celebrada con el 100% de consejerías acreditadas. Se realizó la evaluación integral del primer ciclo operativo, ratificación de alianzas multilaterales y aprobación unánime de los programas de restauración para cuencas prioritarias.',
        en: 'Ordinary plenary session held with 100% of accredited councillorships. The first operational cycle was comprehensively evaluated, multilateral alliances were ratified and restoration programmes for priority watersheds were unanimously approved.',
      },
      resolutions: [
        {
          es: 'Aprobación del Programa de Restauración Ecosistémica 2026-2030.',
          en: 'Approval of the 2026-2030 Ecosystem Restoration Programme.',
        },
        {
          es: 'Ratificación formal de convenios técnicos con 6 agencias de desarrollo internacional.',
          en: 'Formal ratification of technical agreements with 6 international development agencies.',
        },
        {
          es: 'Dictamen favorable e irrestricto de la auditoría de impacto socioambiental.',
          en: 'Favourable and unrestricted opinion on the socio-environmental impact audit.',
        },
      ],
    },
    {
      year: '2024',
      title: {
        es: "Incorporación de Consejerías Honoríficas y Marco 'Una Salud'",
        en: "Incorporation of Honorary Councillorships and the 'One Health' Framework",
      },
      date: { es: '22 de Octubre, 2024', en: 'October 22, 2024' },
      resolutionsCount: { es: '12 Resoluciones Aprobadas', en: '12 Resolutions Approved' },
      summary: {
        es: "Sesión Extraordinaria de Gobernanza con la participación del pleno constitutivo y asesores internacionales. Se formalizó el modelo de consejerías colegiadas y la integración del enfoque 'Una Salud' como eje rector en la evaluación de proyectos.",
        en: "Extraordinary governance session with the participation of the founding plenary and international advisers. The collegiate councillorship model was formalised and the 'One Health' approach was integrated as a guiding axis in project evaluation.",
      },
      resolutions: [
        {
          es: 'Institucionalización de las 10 Consejerías Honoríficas Especializadas.',
          en: 'Institutionalisation of the 10 Specialist Honorary Councillorships.',
        },
        {
          es: 'Adopción del protocolo de bioseguridad y bienestar animal en territorio.',
          en: 'Adoption of the biosafety and animal welfare protocol in the field.',
        },
        {
          es: 'Aprobación del reglamento de transparencia y rendición de cuentas.',
          en: 'Approval of the transparency and accountability regulation.',
        },
      ],
    },
    {
      year: '2023',
      title: {
        es: 'Estatutos del Consejo Global Ambiental y Agenda 2030',
        en: 'Statutes of the Global Environmental Council and Agenda 2030',
      },
      date: { es: '08 de Diciembre, 2023', en: 'December 8, 2023' },
      resolutionsCount: {
        es: 'Acta Constitutiva Formalizada',
        en: 'Founding Minutes Formalised',
      },
      summary: {
        es: 'Sesión Fundacional del Consejo efectuada con el liderazgo fundador y socios estratégicos. Se llevó a cabo la suscripción del acta constitutiva, promulgación de estatutos y trazado del plan quinquenal de acción ambiental.',
        en: 'Founding session of the Council held with founding leadership and strategic partners. The founding minutes were signed, the statutes promulgated and the five-year environmental action plan outlined.',
      },
      resolutions: [
        {
          es: 'Promulgación de los Estatutos Fundacionales del Consejo Global Ambiental.',
          en: 'Promulgation of the Founding Statutes of the Global Environmental Council.',
        },
        {
          es: 'Designación formal de la Presidencia y de la Secretaría Ejecutiva.',
          en: 'Formal appointment of the Presidency and the Executive Secretariat.',
        },
        {
          es: 'Definición y registro de las 10 Líneas Temáticas Estratégicas.',
          en: 'Definition and registration of the 10 Strategic Thematic Lines.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between">
      <div>
        <PageHero
          description={t({
            es: 'El espacio colegiado donde se aprueban las resoluciones estratégicas, se rinden cuentas públicas y se establecen las metas prioritarias para la protección socioambiental.',
            en: 'The collegiate body where strategic resolutions are approved, public accounts are rendered and priority goals are set for socio-environmental protection.',
          })}
          bgImage="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1600&h=900&fit=crop"
        />

        {/* ─── CONSOLA INTERACTIVA: PUNTOS DEL ORDEN DEL DÍA ─── */}
        <section className="pt-16 sm:pt-20 pb-20 px-4 sm:px-8 md:px-16 lg:px-20 max-w-7xl mx-auto w-full">

          {/* Cabecera Editorial */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#d8ceb6]/70 mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-light text-[#2d2618] leading-[1.15]">
              {t({ es: 'Puntos del Orden del Día', en: 'Agenda Items' })} <br />
              <span className="italic text-[#4a5a22] font-normal">
                {t({ es: 'y dictámenes aprobados.', en: 'and approved opinions.' })}
              </span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#635741] font-light leading-relaxed lg:text-right max-w-sm">
              {t({
                es: 'Selecciona cualquiera de los puntos de la agenda para consultar la memoria técnica, auditorías y acuerdos del pleno.',
                en: 'Select any agenda item to consult the technical report, audits and plenary agreements.',
              })}
            </p>
          </div>

          {/* GRUPO INTERACTIVO: TRACK DESLIZANTE + DOSSIER (estilo gobernanza) */}
          <div className="relative min-h-[540px] lg:h-[540px]">

            {/* Track de tarjetas */}
            <div className="overflow-hidden py-1 px-1 h-full">
              <motion.div
                className="flex -mx-3 sm:-mx-4 h-full"
                animate={{
                  x: activeItem === null ? `-${currentIndex * (100 / visibleCards)}%` : '0%',
                }}
                transition={{ duration: 0.55, ease: EASE }}
                style={{ willChange: 'transform' }}
              >
                {agendaItems.map((item, index) => {
                  const isSelected = activeItem === index;
                  const isAnySelected = activeItem !== null;
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
                      targetX = '480px';
                      targetOpacity = 0;
                      pointerEvents = 'none';
                    }
                  }

                  return (
                    <motion.div
                      key={item.num}
                      className="px-3 sm:px-4 w-full sm:w-1/2 lg:w-1/4 shrink-0 h-full"
                      animate={{ x: targetX, opacity: targetOpacity }}
                      transition={{ duration: 0.6, ease: EASE }}
                      style={{ pointerEvents, willChange: 'transform, opacity' }}
                    >
                      <div
                        onClick={() => {
                          if (!isAnySelected) {
                            setActiveItem(index);
                            setCurrentIndex(Math.min(maxIndex, Math.max(0, index - Math.floor(visibleCards / 2))));
                          }
                        }}
                        className={`group relative select-none h-full ${!isAnySelected ? 'cursor-pointer' : ''}`}
                      >
                        {/* Card de agenda: imagen a sangre + degradado */}
                        <div className="relative h-full min-h-[380px] bg-[#2d2618] rounded-2xl border border-[#d8ceb6] overflow-hidden shadow-[0_6px_24px_rgba(45,38,24,0.10)] transition-colors duration-500 group-hover:border-[#4a5a22]/50">
                          <img
                            src={item.img}
                            alt={t(item.title)}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                          />
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{ background: 'linear-gradient(to top, rgba(45,38,24,0.96) 0%, rgba(45,38,24,0.66) 44%, rgba(45,38,24,0.10) 80%, rgba(45,38,24,0.02) 100%)' }}
                          />

                          {/* Contenido inferior formal */}
                          <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c8d8a0] font-sans font-semibold">
                              {t(item.tag)}
                            </span>
                            <h3 className="mt-2 font-serif text-2xl leading-tight text-[#f5efe3] transition-colors duration-300 group-hover:text-[#e5eec2]">
                              {t(item.title)}
                            </h3>
                            <div className="mt-4 pt-4 border-t border-[#f5efe3]/15 flex items-center justify-between">
                              <span className="text-[9px] uppercase tracking-[0.24em] text-[#d8ceb6]/80 font-sans">
                                {isAnySelected && isSelected
                                  ? t({ es: 'Memoria desplegada', en: 'Report expanded' })
                                  : t({ es: 'Consultar memoria', en: 'View report' })}
                              </span>
                              <span className="text-[#c8d8a0] text-sm transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* DOSSIER EDITORIAL: entra desde la derecha */}
            <AnimatePresence>
              {selectedItem && (
                <motion.div
                  key={`dossier-${activeItem}`}
                  initial={{ opacity: 0, x: '100%' }}
                  animate={{ opacity: 1, x: '0%' }}
                  exit={{ opacity: 0, x: '100%' }}
                  transition={{ duration: 0.65, ease: EASE }}
                  style={{ willChange: 'transform, opacity' }}
                  className="w-full mt-6 lg:mt-0 lg:absolute lg:top-1 lg:right-1 lg:bottom-1 lg:w-[calc(70%-16px)] z-20 rounded-2xl overflow-hidden bg-[#2d2618] border border-[#d8ceb6]/70 shadow-[0_30px_70px_-30px_rgba(45,38,24,0.6)] min-h-[540px] lg:min-h-0 relative flex"
                >
                  <motion.img
                    src={selectedItem.img}
                    alt={t(selectedItem.title)}
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: EASE }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(120deg, rgba(45,38,24,0.98) 0%, rgba(45,38,24,0.92) 40%, rgba(45,38,24,0.55) 72%, rgba(45,38,24,0.12) 100%)' }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(45,38,24,0.9) 0%, rgba(45,38,24,0.25) 42%, rgba(45,38,24,0) 75%)' }}
                  />

                  <button
                    type="button"
                    onClick={() => setActiveItem(null)}
                    className="group/back absolute top-5 right-5 z-30 inline-flex items-center gap-2.5 bg-[#2d2618]/40 backdrop-blur-md border border-[#f5efe3]/25 hover:border-[#f5efe3]/60 text-[#f5efe3] rounded-full pl-4 pr-4 py-2 text-[10px] uppercase tracking-[0.18em] font-sans font-medium transition-all duration-300 cursor-pointer"
                  >
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover/back:-translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7 7-7M3 12h18" />
                    </svg>
                    <span>{t({ es: 'Volver al Pleno', en: 'Back to Plenary' })}</span>
                  </button>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="relative z-10 h-full w-full p-7 sm:p-10 lg:p-14 xl:p-16 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14"
                  >
                    <div className="flex-1 max-w-2xl space-y-5">
                      <motion.h2
                        variants={staggerItem}
                        className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#f5efe3] font-light leading-[1.1]"
                      >
                        {t(selectedItem.title)}
                      </motion.h2>

                      <motion.p
                        variants={staggerItem}
                        className="text-sm sm:text-base text-[#e5decf]/85 font-light leading-relaxed font-sans max-w-xl"
                      >
                        {t(selectedItem.desc)}
                      </motion.p>

                      <motion.div variants={staggerItem} className="space-y-3 pt-1">
                        {selectedItem.details.map((d, i) => (
                          <div key={i} className="flex items-start gap-3 text-[13px] sm:text-sm text-[#e5decf]/80 font-light leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c8d8a0] mt-2 shrink-0" />
                            <span>{t(d)}</span>
                          </div>
                        ))}
                      </motion.div>
                    </div>

                    <div className="shrink-0 lg:w-60 lg:border-l lg:border-[#f5efe3]/15 lg:pl-8 space-y-6">
                      <motion.div variants={staggerItem} className="flex flex-wrap gap-x-10 gap-y-6 lg:block lg:space-y-0">
                        {selectedItem.metrics.map((m, i) => (
                          <div key={i} className="space-y-1.5 lg:py-4 lg:border-t lg:border-[#f5efe3]/12 lg:first:border-t lg:last:pb-0">
                            <div className="font-serif text-3xl text-[#e5eec2] font-light leading-none whitespace-nowrap">{t(m.val)}</div>
                            <div className="text-[10px] text-[#d8ceb6]/70 uppercase tracking-[0.2em] whitespace-nowrap">{t(m.label)}</div>
                          </div>
                        ))}
                      </motion.div>

                      <motion.div variants={staggerItem}>
                        <Link
                          to="/contacto"
                          className="group/btn inline-flex items-center gap-2.5 bg-[#f5efe3] hover:bg-[#e9edd3] text-[#2d2618] rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.14em] font-medium transition-all duration-300 shadow-[0_8px_24px_-8px_rgba(45,38,24,0.45)] cursor-pointer"
                        >
                          <span>{t({ es: 'Solicitar Relatoría', en: 'Request Rapporteur' })}</span>
                          <svg
                            className="w-3.5 h-3.5 text-[#4a5a22] transition-transform duration-300 group-hover/btn:translate-x-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7M3 12h18" />
                          </svg>
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Paginación formal */}
          <AnimatePresence>
            {activeItem === null && maxIndex > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex items-center justify-center gap-5 pt-8"
              >
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  disabled={currentIndex === 0}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    currentIndex === 0
                      ? 'opacity-30 cursor-not-allowed border-[#d8ceb6] text-[#8c826e]'
                      : 'bg-[#eae4d2]/90 hover:bg-[#3a4a18] hover:text-[#f5efe3] border-[#d8ceb6] text-[#2d2618] cursor-pointer shadow-sm active:scale-95'
                  }`}
                  aria-label={t({ es: 'Anterior', en: 'Previous' })}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex items-center gap-2 px-4 py-2 bg-[#eae4d2]/70 rounded-full border border-[#d8ceb6]/80">
                  {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        currentIndex === idx ? 'w-8 bg-[#3a4a18]' : 'w-2.5 bg-[#d8ceb6] hover:bg-[#8a8170]'
                      }`}
                      aria-label={t({ es: 'Registro', en: 'Record' }) + ` ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNextSlide}
                  disabled={currentIndex >= maxIndex}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    currentIndex >= maxIndex
                      ? 'opacity-30 cursor-not-allowed border-[#d8ceb6] text-[#8c826e]'
                      : 'bg-[#eae4d2]/90 hover:bg-[#3a4a18] hover:text-[#f5efe3] border-[#d8ceb6] text-[#2d2618] cursor-pointer shadow-sm active:scale-95'
                  }`}
                  aria-label={t({ es: 'Siguiente', en: 'Next' })}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ─── SECCIÓN DE MEMORIAS Y RESOLUCIONES HISTÓRICAS ─── */}
        <section className="pb-24 px-4 sm:px-8 md:px-16 lg:px-20 max-w-7xl mx-auto w-full">

          {/* Cabecera Editorial */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#d8ceb6]/70 mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-light text-[#2d2618] leading-[1.15]">
              {t({ es: 'Registro Histórico', en: 'Historical Record' })} <br />
              <span className="italic text-[#4a5a22] font-normal">
                {t({ es: 'de resoluciones colegiadas.', en: 'of collegiate resolutions.' })}
              </span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#635741] font-light leading-relaxed lg:text-right max-w-sm">
              {t({
                es: 'Línea de tiempo institucional y acceso público a los dictámenes y acuerdos aprobados en cada periodo de sesiones.',
                en: 'Institutional timeline and public access to the opinions and agreements approved in each session period.',
              })}
            </p>
          </div>

          {/* Timeline centrado con espina central */}
          <div className="relative max-w-5xl mx-auto">
            {/* Espina central */}
            <motion.div
              className="absolute left-[15px] md:left-1/2 top-8 bottom-8 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-transparent via-[#9a8a6a]/40 to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE }}
            />
            <motion.span
              className="absolute left-[15px] md:left-1/2 top-4 w-1.5 h-1.5 rounded-full bg-[#3a4a18] -translate-x-1/2"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
            />
            <motion.span
              className="absolute left-[15px] md:left-1/2 -bottom-5 w-1.5 h-1.5 rounded-full bg-[#3a4a18] -translate-x-1/2"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.1, ease: EASE }}
            />

            {assemblyEvents.map((evt, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={evt.year}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: 0.1 * i, ease: EASE }}
                  className="group relative grid md:grid-cols-[1fr_64px_1fr] md:gap-8 md:items-center pl-12 md:pl-0 py-9 md:py-12 border-b border-[#d8ceb6]/40 last:border-b-0"
                >
                  {/* Nodo sobre la espina + halo */}
                  <motion.span
                    className="absolute left-[15px] md:left-1/2 top-10 md:top-1/2 md:-translate-y-1/2 -translate-x-1/2 z-10 h-4 w-4 rounded-full border-2 border-[#f5efe3] bg-[#4a5a22] shadow-[0_0_0_1.5px_rgba(74,90,34,0.35)]"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ type: 'spring', stiffness: 320, damping: 20, delay: 0.14 * i }}
                  />
                  <motion.span
                    className="absolute left-[15px] md:left-1/2 top-10 md:top-1/2 md:-translate-y-1/2 -translate-x-1/2 z-0 h-4 w-4 rounded-full bg-[#c8d8a0]"
                    initial={{ scale: 1.5, opacity: 0.45 }}
                    whileInView={{ scale: 2.8, opacity: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 1.1, ease: 'easeOut', delay: 0.14 * i }}
                  />

                  {(() => {
                    const ContentBlock = ({ align }) => (
                      <div className={`space-y-3 max-w-md ${align === 'right' ? 'text-right' : ''}`}>
                        <h3 className="font-serif text-xl lg:text-2xl text-[#2d2618] group-hover:text-[#4a5a22] transition-colors duration-300 font-light leading-snug">
                          {t(evt.title)}
                        </h3>
                        <p className="text-sm text-[#5c523e] font-light leading-relaxed font-sans line-clamp-2">{t(evt.summary)}</p>
                        <div className="pt-3 border-t border-[#d8ceb6]/40">
                          <p className="text-xs text-[#8a7a5e] font-light truncate">{evt.resolutions.map((r) => t(r)).join(' · ')}</p>
                        </div>
                        <span className="block text-[9px] uppercase tracking-[0.16em] text-[#8a7a5e] font-sans">{t(evt.date)}</span>
                      </div>
                    );
                    const YearBlock = ({ align }) => (
                      <div className={`space-y-2.5 ${align === 'right' ? 'text-right' : ''}`}>
                        <span className="font-serif text-4xl lg:text-5xl text-[#2d2618] group-hover:text-[#4a5a22] transition-colors duration-300 font-light leading-none">
                          {evt.year}
                        </span>
                      </div>
                    );

                    return (
                      <>
                        {/* ══ MÓVIL: año + contenido apilados ══ */}
                        <motion.div
                          initial={{ opacity: 0, x: 14 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-40px' }}
                          transition={{ duration: 0.6, delay: 0.1 * i, ease: EASE }}
                          className="md:hidden space-y-4"
                        >
                          <div className="space-y-2">
                            <span className="font-serif text-3xl text-[#2d2618] group-hover:text-[#4a5a22] transition-colors duration-300 font-light leading-none">
                              {evt.year}
                            </span>
                          </div>
                          <div className="space-y-3">
                            <h3 className="font-serif text-xl text-[#2d2618] group-hover:text-[#4a5a22] transition-colors duration-300 font-light leading-snug">
                              {t(evt.title)}
                            </h3>
                            <p className="text-sm text-[#5c523e] font-light leading-relaxed font-sans line-clamp-2">{t(evt.summary)}</p>
                            <div className="pt-3 border-t border-[#d8ceb6]/40">
                              <p className="text-xs text-[#8a7a5e] font-light truncate">{evt.resolutions.map((r) => t(r)).join(' · ')}</p>
                            </div>
                            <span className="block text-[9px] uppercase tracking-[0.16em] text-[#8a7a5e] font-sans">{t(evt.date)}</span>
                          </div>
                        </motion.div>

                        {/* ══ ESCRITORIO: año | nodo | contenido (alternado) ══ */}
                        {isEven ? (
                          <>
                            <motion.div
                              initial={{ opacity: 0, x: -28 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: '-40px' }}
                              transition={{ duration: 0.62, delay: 0.08 * i, ease: EASE }}
                              className="hidden md:flex flex-col md:col-start-1 items-end"
                            >
                              <ContentBlock align="right" />
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, x: 28 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: '-40px' }}
                              transition={{ duration: 0.62, delay: 0.16 * i, ease: EASE }}
                              className="hidden md:flex flex-col md:col-start-3 items-start"
                            >
                              <YearBlock align="left" />
                            </motion.div>
                          </>
                        ) : (
                          <>
                            <motion.div
                              initial={{ opacity: 0, x: -28 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: '-40px' }}
                              transition={{ duration: 0.62, delay: 0.08 * i, ease: EASE }}
                              className="hidden md:flex flex-col md:col-start-1 items-end"
                            >
                              <YearBlock align="right" />
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, x: 28 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: '-40px' }}
                              transition={{ duration: 0.62, delay: 0.16 * i, ease: EASE }}
                              className="hidden md:flex flex-col md:col-start-3 items-start"
                            >
                              <ContentBlock align="left" />
                            </motion.div>
                          </>
                        )}
                      </>
                    );
                  })()}
                </motion.div>
              );
            })}
          </div>
        </section>

      </div>

      <FooterNav />
    </div>
  );
}
