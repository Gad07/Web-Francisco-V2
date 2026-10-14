import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { useI18n } from '../i18n/index.jsx';

export default function StrategicLines() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [expandedLine, setExpandedLine] = useState(null);

  const EASE = [0.22, 1, 0.36, 1];

  const categories = [
    { id: 'ALL', label: { es: 'Todas las Líneas', en: 'All Lines' } },
    { id: 'CLIMA', label: { es: 'Clima & Ecosistemas', en: 'Climate & Ecosystems' } },
    { id: 'GOBERNANZA', label: { es: 'Gobernanza & Legalidad', en: 'Governance & Rule of Law' } },
    { id: 'PRODUCCION', label: { es: 'Producción & Bienestar', en: 'Production & Wellbeing' } },
  ];

  const lines = [
    {
      id: '01',
      category: 'GOBERNANZA',
      title: {
        es: 'Gobernanza ambiental y política pública',
        en: 'Environmental governance and public policy',
      },
      desc: {
        es: 'Agendas estratégicas, marcos de coordinación institucional, análisis regulatorio, dictámenes técnicos e incidencia pública ante los tres órdenes de gobierno, alineada a los ODS 16 y 17.',
        en: 'Strategic agendas, institutional coordination frameworks, regulatory analysis, technical opinions and public advocacy before all three branches of government, aligned with SDGs 16 and 17.',
      },
      scope: [
        { es: 'Análisis regulatorio y normativo', en: 'Regulatory and normative analysis' },
        { es: 'Incidencia ante poderes públicos', en: 'Advocacy before public authorities' },
        { es: 'Dictámenes técnicos vinculantes', en: 'Binding technical opinions' },
      ],
      img: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&h=600&fit=crop&auto=format',
    },
    {
      id: '02',
      category: 'CLIMA',
      title: {
        es: 'Cambio climático, resiliencia y transición sostenible',
        en: 'Climate change, resilience and sustainable transition',
      },
      desc: {
        es: 'Mitigación, adaptación territorial, soluciones basadas en la naturaleza, gestión integral de riesgos y fortalecimiento de capacidades climáticas vinculadas a los ODS 7, 11 y 13.',
        en: 'Mitigation, territorial adaptation, nature-based solutions, comprehensive risk management and climate capacity building linked to SDGs 7, 11 and 13.',
      },
      scope: [
        { es: 'Modelos de adaptación climática', en: 'Climate adaptation models' },
        { es: 'Soluciones basadas en la naturaleza', en: 'Nature-based solutions' },
        { es: 'Gestión territorial del riesgo', en: 'Territorial risk management' },
      ],
      img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop&auto=format',
    },
    {
      id: '03',
      category: 'CLIMA',
      title: {
        es: 'Conservación, restauración y biodiversidad',
        en: 'Conservation, restoration and biodiversity',
      },
      desc: {
        es: 'Protección de ecosistemas prioritarios, regeneración de suelos, cuencas hídricas, corredores biológicos y preservación de especies nativas bajo los ODS 6, 14 y 15.',
        en: 'Protection of priority ecosystems, soil regeneration, watersheds, biological corridors and preservation of native species under SDGs 6, 14 and 15.',
      },
      scope: [
        { es: 'Restauración integral de cuencas', en: 'Full watershed restoration' },
        { es: 'Custodia de corredores biológicos', en: 'Stewardship of biological corridors' },
        { es: 'Protección de flora y fauna nativa', en: 'Protection of native flora and fauna' },
      ],
      img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop&auto=format',
    },
    {
      id: '04',
      category: 'GOBERNANZA',
      title: {
        es: 'Territorio, legalidad y cohesión social',
        en: 'Territory, rule of law and social cohesion',
      },
      desc: {
        es: 'Defensa del suelo de conservación, ordenamiento territorial ecológico, prevención de delitos ambientales y apropiación comunitaria en el marco de los ODS 11 y 16.',
        en: 'Defence of conservation land, ecological territorial planning, prevention of environmental crime and community appropriation within the framework of SDGs 11 and 16.',
      },
      scope: [
        { es: 'Defensa del suelo de conservación', en: 'Defence of conservation land' },
        { es: 'Ordenamiento ecológico comunitario', en: 'Community ecological planning' },
        { es: 'Prevención de ilícitos ambientales', en: 'Prevention of environmental offences' },
      ],
      img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop&auto=format',
    },
    {
      id: '05',
      category: 'GOBERNANZA',
      title: {
        es: 'Agenda 2030 y Objetivos de Desarrollo Sostenible',
        en: 'Agenda 2030 and the Sustainable Development Goals',
      },
      desc: {
        es: 'Integración transversal de los ODS en planes de desarrollo, sistemas de monitoreo, indicadores verificables y rendición de cuentas con enfoque transversal en el ODS 17.',
        en: 'Cross-cutting integration of the SDGs into development plans, monitoring systems, verifiable indicators and accountability, with a transversal focus on SDG 17.',
      },
      scope: [
        { es: 'Alineación transversal de planes', en: 'Cross-cutting plan alignment' },
        { es: 'Sistemas de monitoreo e indicadores', en: 'Monitoring systems and indicators' },
        { es: 'Auditoría de cumplimiento ODS', en: 'SDG compliance auditing' },
      ],
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&auto=format',
    },
    {
      id: '06',
      category: 'PRODUCCION',
      title: {
        es: 'Sistemas agroalimentarios y soberanía alimentaria',
        en: 'Agri-food systems and food sovereignty',
      },
      desc: {
        es: 'Prácticas sustentables, protección de semillas nativas, bioinsumos, circuitos cortos y fortalecimiento de la producción local alineados con el ODS 2.',
        en: 'Sustainable practices, protection of native seeds, bio-inputs, short supply chains and stronger local production, aligned with SDG 2.',
      },
      scope: [
        { es: 'Bancos de semillas criollas', en: 'Heirloom seed banks' },
        { es: 'Producción de bioinsumos agrícolas', en: 'Agricultural bio-input production' },
        { es: 'Circuitos cortos de comercio justo', en: 'Fair trade short circuits' },
      ],
      img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=600&fit=crop&auto=format',
    },
    {
      id: '07',
      category: 'PRODUCCION',
      title: {
        es: 'Bienestar animal y enfoque Una Salud',
        en: 'Animal welfare and the One Health approach',
      },
      desc: {
        es: 'Protección a la fauna silvestre, manejo ético de animales de trabajo y compañía, y bioseguridad comunitaria respondiendo a los ODS 3 y 15.',
        en: 'Protection of wildlife, ethical handling of working and companion animals, and community biosafety, addressing SDGs 3 and 15.',
      },
      scope: [
        { es: 'Programas de Una Salud en territorio', en: 'Territorial One Health programmes' },
        { es: 'Protección de fauna silvestre', en: 'Wildlife protection' },
        { es: 'Manejo ético y bioseguridad', en: 'Ethical handling and biosafety' },
      ],
      img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop&auto=format',
    },
    {
      id: '08',
      category: 'CLIMA',
      title: {
        es: 'Educación ambiental y cultura de la sostenibilidad',
        en: 'Environmental education and a culture of sustainability',
      },
      desc: {
        es: 'Formación de capacidades, campañas socioambientales, ciencia ciudadana y participación activa de juventudes vinculadas a los ODS 4 y 12.',
        en: 'Capacity building, socio-environmental campaigns, citizen science and active youth participation, linked to SDGs 4 and 12.',
      },
      scope: [
        { es: 'Programas de ciencia ciudadana', en: 'Citizen science programmes' },
        { es: 'Talleres de formación técnica', en: 'Technical training workshops' },
        { es: 'Campañas masivas socioambientales', en: 'Mass socio-environmental campaigns' },
      ],
      img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=600&fit=crop&auto=format',
    },
    {
      id: '09',
      category: 'GOBERNANZA',
      title: {
        es: 'Investigación, innovación y transferencia de conocimiento',
        en: 'Research, innovation and knowledge transfer',
      },
      desc: {
        es: 'Generación de datos científicos, diagnóstico socioambiental, publicaciones técnicas y soluciones tecnológicas abiertas respondiendo al ODS 9.',
        en: 'Scientific data generation, socio-environmental diagnostics, technical publications and open technological solutions, addressing SDG 9.',
      },
      scope: [
        { es: 'Monitoreo satelital en tiempo real', en: 'Real-time satellite monitoring' },
        { es: 'Dictámenes y reportes científicos', en: 'Scientific opinions and reports' },
        { es: 'Plataformas abiertas de datos', en: 'Open data platforms' },
      ],
      img: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&h=600&fit=crop&auto=format',
    },
    {
      id: '10',
      category: 'GOBERNANZA',
      title: {
        es: 'Alianzas estratégicas y cooperación internacional',
        en: 'Strategic alliances and international cooperation',
      },
      desc: {
        es: 'Vinculación multinivel con organismos globales, universidades, sociedad civil y sector privado para potenciar recursos alineados con el ODS 17.',
        en: 'Multi-level engagement with global organisations, universities, civil society and the private sector to leverage resources aligned with SDG 17.',
      },
      scope: [
        { es: 'Mesas de trabajo multilateral', en: 'Multilateral working groups' },
        { es: 'Fondos de cooperación internacional', en: 'International cooperation funds' },
        { es: 'Redes globales de conocimiento', en: 'Global knowledge networks' },
      ],
      img: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=800&h=600&fit=crop&auto=format',
    },
  ];

  const filteredLines = selectedCategory === 'ALL'
    ? lines
    : lines.filter((l) => l.category === selectedCategory);

  const countFor = (id) => (id === 'ALL' ? lines.length : lines.filter((l) => l.category === id).length);

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between">
      <div>
        <PageHero
          titleWhite={{ es: 'Ejes de intervención y', en: 'Areas of intervention and' }}
          titleGreen={{ es: 'líneas estratégicas', en: 'strategic lines' }}
          description={{
            es: 'Nuestras 10 líneas de trabajo responden de forma directa a las emergencias socioambientales y a las metas de la Agenda 2030.',
            en: 'Our 10 lines of work respond directly to socio-environmental emergencies and to the targets of the 2030 Agenda.',
          }}
          bgImage="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1600&h=900&fit=crop"
        />

        {/* ─── CABECERA EDITORIAL + SELECTOR DE ÁMBITOS ─── */}
        <section className="pt-16 sm:pt-24 pb-20 px-4 sm:px-8 md:px-16 lg:px-20 max-w-7xl mx-auto w-full">
          <div className="pb-8 border-b border-[#d8ceb6]/70 mb-10 text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-[#4a5a22]">
              {t({ es: 'Acción Territorial en 10 Dimensiones', en: 'Territorial Action in 10 Dimensions' })}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#2d2618] font-light leading-[1.14]">
              {t({ es: 'Diez líneas, un mismo', en: 'Ten lines, one shared' })}{' '}
              <span className="italic text-[#4a5a22] font-normal">
                {t({ es: 'compromiso territorial.', en: 'territorial commitment.' })}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#635741] font-light leading-relaxed">
              {t({
                es: 'Cada línea articula su campo de acción con ejes verificables, dictámenes técnicos y mecanismos de rendición de cuentas.',
                en: 'Each line links its field of action to verifiable goals, technical opinions and accountability mechanisms.',
              })}
            </p>
          </div>

          {/* Filtros por ámbito */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#d8ceb6]/40 mb-12">
            <span className="flex items-center gap-2.5 text-xs uppercase tracking-wider text-[#7a6e58] font-sans">
              <span className="w-2 h-2 rounded-full bg-[#4a5a22]" />
              {t({ es: 'Mostrando', en: 'Showing' })}{' '}
              <strong className="text-[#2d2618]">{filteredLines.length}</strong>{' '}
              {t({ es: 'de', en: 'of' })} {lines.length} {t({ es: 'líneas', en: 'lines' })}
            </span>

            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#eae4d2]/80 rounded-full border border-[#d8ceb6]">
              {categories.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`relative py-2 px-4 rounded-full text-xs font-sans transition-all duration-300 cursor-pointer ${
                      active ? 'text-[#f5efe3]' : 'text-[#6b6048] hover:text-[#2d2618]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="ambito-pill"
                        className="absolute inset-0 rounded-full bg-[#4a5a22] shadow-sm"
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5 font-medium">
                      {t(cat.label)}
                      <span className={`text-[10px] ${active ? 'text-[#cdd2a6]' : 'text-[#8a7e68]'}`}>
                        ({countFor(cat.id)})
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── GRID DE CARDS: SOLO IMAGEN, TÍTULO Y DESCRIPCIÓN (CLICK PARA DETALLE EN LA CARD) ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLines.map((line, i) => {
              const isExpanded = expandedLine === line.id;

              return (
                <motion.div
                  key={line.id}
                  onClick={() => setExpandedLine(isExpanded ? null : line.id)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.6, delay: 0.05 * (i % 3), ease: EASE }}
                  className="group relative rounded-2xl overflow-hidden border border-[#d8ceb6] shadow-md hover:shadow-xl hover:border-[#4a5a22]/70 transition-all duration-500 h-[420px] sm:h-[440px] flex flex-col justify-end cursor-pointer select-none"
                >
                  {/* Imagen a sangre completa */}
                  <img
                    src={line.img}
                    alt={t(line.title)}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                    loading="lazy"
                  />

                  {/* Degradado para máxima legibilidad */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(20,16,10,0.97) 0%, rgba(20,16,10,0.68) 46%, rgba(20,16,10,0.12) 80%, rgba(20,16,10,0.02) 100%)',
                    }}
                  />

                  {/* Estado normal: Solo Imagen, Título y Descripción */}
                  <div className="relative z-10 p-6 sm:p-7 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg font-light text-[#cdd2a6]">
                        {line.id}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl leading-tight text-white font-normal transition-colors duration-300 group-hover:text-[#e5eec2]">
                      {t(line.title)}
                    </h3>
                    <p className="text-xs text-[#e5decf]/90 font-light leading-relaxed line-clamp-3">
                      {t(line.desc)}
                    </p>
                  </div>

                  {/* Despliegue de Información Interno (EN LA TARJETA, SIN POP-UP) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedLine(null);
                        }}
                        className="absolute inset-0 z-20 bg-[#1a1610]/95 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between cursor-pointer border border-[#cdd2a6]/30 overflow-y-auto"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-white/15">
                            <span className="font-serif text-xl font-light text-[#cdd2a6]">
                              LÍNEA {line.id}
                            </span>
                            <button
                              type="button"
                              onClick={() => setExpandedLine(null)}
                              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-xs"
                              title="Cerrar detalle"
                            >
                              ✕
                            </button>
                          </div>

                          <div>
                            <h4 className="font-serif text-xl sm:text-2xl text-white font-normal leading-snug">
                              {t(line.title)}
                            </h4>
                            <p className="mt-2 text-xs text-[#e5decf]/90 font-light leading-relaxed">
                              {t(line.desc)}
                            </p>
                          </div>

                          <div className="space-y-1.5 pt-2 border-t border-white/15">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#cdd2a6] block">
                              {t({ es: 'Alcance Específico:', en: 'Specific Scope:' })}
                            </span>
                            <ul className="space-y-1.5">
                              {line.scope.map((s, idx) => (
                                <li
                                  key={idx}
                                  className="text-xs text-[#f5efe3]/90 font-light flex items-start gap-2"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#cdd2a6] mt-1.5 shrink-0" />
                                  <span>{t(s)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* ─── CIERRE EDITORIAL ─── */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#2d2618] text-[#f5efe3] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-2 max-w-2xl text-center md:text-left">
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#cdd2a6]">
                {t({ es: 'Operatividad y Territorio', en: 'Operations & Territory' })}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light leading-snug">
                {t({
                  es: 'Un marco vivo que se traduce en proyectos territoriales verificables',
                  en: 'A living framework that translates into verifiable territorial projects',
                })}
              </h3>
              <p className="text-sm text-[#d8d2c2]/80 font-light leading-relaxed">
                {t({
                  es: 'Explora el catálogo de intervenciones activas, alianzas multilaterales y bancos de germoplasma que materializan estas 10 líneas en campo.',
                  en: 'Explore the portfolio of active interventions, multilateral partnerships and germplasm banks that ground these 10 lines in the field.',
                })}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <Link
                to="/proyectos"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#4a5a22] hover:bg-[#5a6b2a] text-[#f5efe3] font-sans font-semibold text-xs tracking-wider uppercase transition-all shadow-md text-center flex items-center justify-center gap-2"
              >
                <span>{t({ es: 'Catálogo de Proyectos', en: 'Project Catalogue' })}</span>
                <span className="text-sm">&rarr;</span>
              </Link>
              <Link
                to="/agenda-2030"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#f5efe3] font-sans font-semibold text-xs tracking-wider uppercase transition-all border border-white/20 text-center"
              >
                <span>{t('nav.agenda2030')}</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <FooterNav />
    </div>
  );
}
