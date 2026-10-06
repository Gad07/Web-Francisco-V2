import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { useI18n } from '../i18n/index.jsx';

export default function StrategicLines() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState('ALL');

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

        {/* ─── CABECERA EDITORIAL + FILTROS ─── */}
        <section className="pt-16 sm:pt-20 pb-20 px-4 sm:px-8 md:px-16 lg:px-20 max-w-7xl mx-auto w-full">

          <div className="pb-6 border-b border-[#d8ceb6]/70 mb-8">
            <div className="space-y-4 text-center">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2d2618] font-light leading-[1.12] lg:whitespace-nowrap">
                {t({ es: 'Diez líneas, un mismo', en: 'Ten lines, one shared' })}{' '}
                <span className="italic text-[#4a5a22] font-normal">
                  {t({ es: 'compromiso territorial.', en: 'territorial commitment.' })}
                </span>
              </h2>
              <p className="text-xs sm:text-[13px] text-[#635741] font-light leading-relaxed lg:whitespace-nowrap">
                {t({
                  es: 'Cada línea articula su campo de acción con ejes verificables, dictámenes técnicos y mecanismos de rendición de cuentas.',
                  en: 'Each line links its field of action to verifiable goals, technical opinions and accountability mechanisms.',
                })}
              </p>
            </div>
          </div>

          {/* Selector de categorías (independiente del título) */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#d8ceb6]/40 mb-10">
            <span className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#7a6e58] font-sans">
              <span className="w-2 h-2 rounded-full bg-[#5a6b2a]" />
              {t({ es: 'Mostrando', en: 'Showing' })} {filteredLines.length}{' '}
              {t({ es: 'de', en: 'of' })} {lines.length}{' '}
              {t({ es: 'líneas', en: 'lines' })}
            </span>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#8a7a5e] font-sans sm:pb-0.5">
                {t({ es: 'Filtrar por ámbito', en: 'Filter by area' })}
              </span>
              <div className="relative inline-flex flex-wrap items-center gap-1 p-1 bg-[#eae4d2]/80 rounded-full border border-[#d8ceb6] shadow-[inset_0_1px_2px_rgba(45,38,24,0.04)]">
                {categories.map((cat) => {
                  const active = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`relative py-2 pl-4 pr-3 rounded-full text-xs font-sans transition-colors duration-300 cursor-pointer ${
                        active ? 'text-[#f5efe3]' : 'text-[#6b6048] hover:text-[#2d2618]'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="ambito-pill"
                          className="absolute inset-0 rounded-full bg-[#3a4a18] shadow-sm"
                          transition={{ duration: 0.45, ease: EASE }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        {t(cat.label)}
                        <span className={`text-[9px] font-medium ${active ? 'text-[#c8d8a0]' : 'text-[#a89a7a]'}`}>
                          {countFor(cat.id)}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── GRID DE LÍNEAS ESTRATÉGICAS ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredLines.map((l, i) => (
              <motion.div
                key={l.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: 0.06 * i, ease: EASE }}
                className="group relative bg-[#2d2618] rounded-2xl border border-[#d8ceb6] overflow-hidden h-[420px] shadow-[0_6px_24px_rgba(45,38,24,0.10)] transition-colors duration-500 hover:border-[#4a5a22]/60"
              >
                {/* Imagen a sangre */}
                <img
                  src={l.img}
                  alt={t(l.title)}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                />

                {/* Degradado para legibilidad */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(45,38,24,0.97) 0%, rgba(45,38,24,0.66) 46%, rgba(45,38,24,0.10) 80%, rgba(45,38,24,0.02) 100%)' }}
                />

                {/* Contenido inferior */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                  <h3 className="font-serif text-2xl leading-tight text-[#f5efe3] transition-colors duration-300 group-hover:text-[#e5eec2]">
                    {t(l.title)}
                  </h3>
                  <p className="mt-2 text-xs text-[#e5decf]/80 font-light leading-relaxed line-clamp-2">
                    {t(l.desc)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ─── CIERRE EDITORIAL ─── */}
          <div className="mt-16 pt-8 border-t border-[#d8ceb6]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <h3 className="font-serif text-2xl sm:text-[28px] text-[#2d2618] font-light leading-snug max-w-md">
              {t({ es: 'Un marco vivo que se traduce', en: 'A living framework that becomes' })} <br />
              <span className="italic text-[#4a5a22] font-normal">
                {t({ es: 'en proyectos y territorio.', en: 'projects and territory.' })}
              </span>
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/agenda-2030"
                className="inline-flex items-center gap-2.5 bg-[#4a5a22] hover:bg-[#5a6b2a] text-[#f5efe3] rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.14em] font-medium transition-all duration-300 cursor-pointer"
              >
                <span>{t('nav.agenda2030')}</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7M3 12h18" />
                </svg>
              </Link>
              <Link
                to="/proyectos"
                className="inline-flex items-center gap-2.5 border border-[#2d2618]/30 hover:border-[#4a5a22] text-[#2d2618] rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.14em] font-medium transition-all duration-300 cursor-pointer"
              >
                <span>{t({ es: 'Ver proyectos', en: 'View projects' })}</span>
                <svg className="w-3.5 h-3.5 text-[#4a5a22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7M3 12h18" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <FooterNav />
    </div>
  );
}
