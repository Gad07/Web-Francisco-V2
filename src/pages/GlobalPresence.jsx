import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import RealWorldMap from '../components/RealWorldMap.jsx';
import { useI18n } from '../i18n/index.jsx';
const SEDE_DETAILS = {
  mexico: {
    address: { es: 'Ciudad de México (Núcleo Directivo & Sede Central)', en: 'Mexico City (Executive Core & Central HQ)' },
    desc: {
      es: 'México es el país de origen y sede institucional del CGA. Desde la Ciudad de México se articula la dirección estratégica, la coordinación de proyectos y la vinculación con actores públicos, académicos, sociales y productivos.',
      en: 'Mexico is the country of origin and institutional headquarters of the CGA. From Mexico City, strategic direction, project coordination, and liaison with public, academic, social, and productive actors are articulated.',
    },
    miembros: [
      {
        name: 'Sede Central & Dirección Institucional',
        role: { es: 'Coordinación General y Gobernanza', en: 'General Coordination & Governance' },
        focus: { es: 'Conducción estratégica, articulación territorial de proyectos y vinculación institucional (Ciudad de México)', en: 'Strategic direction, territorial project coordination and institutional liaison (Mexico City)' },
      },
    ],
    proyectos: {
      es: 'Territorios que Alimentan y antecedentes territoriales en Xochimilco; agendas ambientales estatales, estrategias ESG y reinserción socioambiental en distintas fases de desarrollo.',
      en: 'Territories that Nourish and territorial background in Xochimilco; state environmental agendas, ESG strategies and socio-environmental reinsertion in various development phases.',
    },
    alianzas: {
      es: 'México por el Clima, KabPrison Project y Expo México Mujer',
      en: 'Mexico for Climate, KabPrison Project and Expo Mexico Woman',
    },
    alianzasEmail: 'alianzas@consejoglobalambiental.com',
    metric: '2020–2026',
    metricLabel: { es: 'periodo de consolidación y gobernanza', en: 'consolidation & governance period' },
  },
  canada: {
    address: { es: 'Toronto · Ottawa · Montreal', en: 'Toronto · Ottawa · Montreal' },
    desc: {
      es: 'La agenda de Council for Green Action — Canada concentra acciones de acercamiento, intercambio de experiencias y exploración de cooperación en conservación urbana, restauración ecológica, participación comunitaria y sostenibilidad territorial.',
      en: 'The Council for Green Action — Canada agenda focuses on outreach, sharing experiences, and exploring cooperation in urban conservation, ecological restoration, community engagement, and territorial sustainability.',
    },
    miembros: [
      {
        name: 'Council for Green Action — Canada',
        role: { es: 'Coordinación y Enlace Bilateral', en: 'Coordination & Bilateral Liaison' },
        focus: { es: 'Conservación urbana, restauración ecológica y vinculación México–Canadá', en: 'Urban conservation, ecological restoration & Mexico-Canada liaison' },
      },
    ],
    proyectos: {
      es: 'Vinculación con iniciativas de conservación y participación comunitaria, y diálogo continuo en espacios de cooperación bilateral México–Canadá.',
      en: 'Liaison with conservation and community engagement initiatives, and ongoing dialogue in Mexico-Canada bilateral cooperation spaces.',
    },
    alianzas: {
      es: 'Exploración de sinergias institucionales y académicas',
      en: 'Exploration of institutional and academic synergies',
    },
    alianzasEmail: 'partnerships@councilforgreenaction.com',
    metric: 'Bilateral',
    metricLabel: { es: 'agenda de vinculación bilateral activa', en: 'active bilateral liaison agenda' },
  },
  colombia: {
    address: { es: 'Bogotá D.C. (Enlace Académico)', en: 'Bogota D.C. (Academic Liaison)' },
    desc: {
      es: 'La agenda de vinculación en Colombia se orienta al intercambio de conocimiento académico y a explorar colaboraciones en sostenibilidad, cambio climático, ciencia y gobernanza ambiental.',
      en: 'The liaison agenda in Colombia is oriented towards academic knowledge exchange and exploring collaborations in sustainability, climate change, science, and environmental governance.',
    },
    miembros: [
      {
        name: 'Vinculación Académica & Científica',
        role: { es: 'Coordinación de Intercambio', en: 'Exchange Coordination' },
        focus: { es: 'Gobernanza ambiental, ciencia, cuencas y cambio climático (Bogotá D.C.)', en: 'Environmental governance, science, watersheds & climate change (Bogota D.C.)' },
      },
    ],
    proyectos: {
      es: 'Participación académica prevista en Bogotá en noviembre de 2026 (programada como evento futuro).',
      en: 'Academic participation planned in Bogota in November 2026 (scheduled as future event).',
    },
    alianzas: {
      es: 'Diálogo con actores académicos y ambientales',
      en: 'Dialogue with academic and environmental stakeholders',
    },
    alianzasEmail: 'alianzas@consejoglobalambiental.com',
    metric: 'Nov 2026',
    metricLabel: { es: 'participación académica programada', en: 'scheduled academic participation' },
  },
  costarica: {
    address: { es: 'San José (Proyección Regional)', en: 'San Jose (Regional Projection)' },
    desc: {
      es: 'Costa Rica forma parte de los países considerados en la proyección internacional del CGA. La información pública de esta sección se actualizará conforme se formalicen actividades, interlocuciones y mecanismos de cooperación.',
      en: 'Costa Rica is part of the countries considered in the CGA international projection. Public information in this section will be updated as activities, dialogues, and cooperation mechanisms are formalized.',
    },
    miembros: [
      {
        name: 'Mesa de Articulación y Cooperación',
        role: { es: 'Mecanismo de Enlace Regional', en: 'Regional Liaison Mechanism' },
        focus: { es: 'Diálogo ambiental y exploración de mecanismos de cooperación (San José)', en: 'Environmental dialogue & cooperation mechanisms exploration (San Jose)' },
      },
    ],
    proyectos: {
      es: 'En fase de articulación institucional y diálogo ambiental.',
      en: 'In phase of institutional coordination and environmental dialogue.',
    },
    alianzas: {
      es: 'Mecanismos de cooperación en desarrollo',
      en: 'Cooperation mechanisms in development',
    },
    alianzasEmail: 'alianzas@consejoglobalambiental.com',
    metric: 'Fase I',
    metricLabel: { es: 'articulación institucional y exploración', en: 'institutional coordination & exploration' },
  },
  espana: {
    address: { es: 'Madrid (Enlace Europeo)', en: 'Madrid (European Liaison)' },
    desc: {
      es: 'España forma parte de la proyección internacional del CGA. La página reunirá información verificable sobre actividades, interlocución institucional y cooperación técnica que se desarrollen en el país.',
      en: 'Spain is part of the CGA international projection. The page will gather verifiable information on activities, institutional dialogue, and technical cooperation developed in the country.',
    },
    miembros: [
      {
        name: 'Interlocución Institucional Europea',
        role: { es: 'Enlace Multilateral', en: 'Multilateral Liaison' },
        focus: { es: 'Redes ambientales iberoamericanas y cooperación técnica (Madrid)', en: 'Ibero-American environmental networks & technical cooperation (Madrid)' },
      },
    ],
    proyectos: {
      es: 'En fase de articulación institucional y cooperación técnica.',
      en: 'In phase of institutional coordination and technical cooperation.',
    },
    alianzas: {
      es: 'Interlocución con redes ambientales iberoamericanas',
      en: 'Dialogue with Ibero-American environmental networks',
    },
    alianzasEmail: 'alianzas@consejoglobalambiental.com',
    metric: 'Fase I',
    metricLabel: { es: 'cooperación técnica e interlocución', en: 'technical cooperation & dialogue' },
  },
};

export default function GlobalPresence() {
  const { t } = useI18n();
  const [activeCountryId, setActiveCountryId] = useState('mexico');
  const [showInfo, setShowInfo] = useState(true);

  const handleSelectSede = (id) => {
    setActiveCountryId(id);
    setShowInfo(true);
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
  };

  const sedesList = [
    {
      id: 'mexico',
      num: '01',
      country: { es: 'México', en: 'Mexico' },
      city: { es: 'Ciudad de México', en: 'Mexico City' },
      sedeType: { es: 'Sede Institucional & Dirección Global', en: 'Institutional HQ & Global Direction' },
      code: 'MX',
      lat: 23.6345,
      lon: -102.5528,
      status: { es: 'Sede Global y País de Origen', en: 'Global HQ & Country of Origin' },
      email: 'info@consejoglobalambiental.com',
    },
    {
      id: 'canada',
      num: '02',
      country: { es: 'Canadá', en: 'Canada' },
      city: { es: 'Toronto / Ottawa / Montreal', en: 'Toronto / Ottawa / Montreal' },
      sedeType: { es: 'Council for Green Action — Canada', en: 'Council for Green Action — Canada' },
      code: 'CA',
      lat: 56.1304,
      lon: -106.3468,
      status: { es: 'Agenda de Cooperación e Intercambio', en: 'Cooperation & Exchange Agenda' },
      email: 'info@councilforgreenaction.com',
    },
    {
      id: 'colombia',
      num: '03',
      country: { es: 'Colombia', en: 'Colombia' },
      city: { es: 'Bogotá D.C.', en: 'Bogota D.C.' },
      sedeType: { es: 'Vinculación Académica & Cooperación Técnica', en: 'Academic Liaison & Technical Cooperation' },
      code: 'CO',
      lat: 4.5709,
      lon: -74.2973,
      status: { es: 'Intercambio de Conocimiento', en: 'Knowledge Exchange' },
      email: 'info@consejoglobalambiental.com',
    },
    {
      id: 'costarica',
      num: '04',
      country: { es: 'Costa Rica', en: 'Costa Rica' },
      city: { es: 'San José', en: 'San Jose' },
      sedeType: { es: 'Proyección Internacional', en: 'International Projection' },
      code: 'CR',
      lat: 9.7489,
      lon: -83.7534,
      status: { es: 'Exploración de Mecanismos de Cooperación', en: 'Exploration of Cooperation Mechanisms' },
      email: 'info@consejoglobalambiental.com',
    },
    {
      id: 'espana',
      num: '05',
      country: { es: 'España', en: 'Spain' },
      city: { es: 'Madrid', en: 'Madrid' },
      sedeType: { es: 'Proyección Internacional', en: 'International Projection' },
      code: 'ES',
      lat: 40.4637,
      lon: -3.7492,
      status: { es: 'Interlocución Institucional', en: 'Institutional Dialogue' },
      email: 'info@consejoglobalambiental.com',
    },
  ];

  const strategicPillars = [
    {
      num: '01',
      title: { es: 'Gobernanza de Sedes', en: 'Headquarters Governance' },
      desc: {
        es: 'Estructura colegiada interconectada donde cada sede responde a un mandato territorial específico y rinde cuentas públicas.',
        en: 'Interconnected collegiate structure where each headquarters fulfills a specific territorial mandate with public accountability.',
      },
    },
    {
      num: '02',
      title: { es: 'Laboratorios & Peritajes', en: 'Forensic Laboratories' },
      desc: {
        es: 'Infraestructura técnica homologada en cada país para toma de muestras de agua, suelo, batimetría y cartografía satelital.',
        en: 'Standardized technical infrastructure in each country for water, soil, bathymetry and satellite cartography sampling.',
      },
    },
    {
      num: '03',
      title: { es: 'Custodia Territorial Directa', en: 'Direct Territorial Stewardship' },
      desc: {
        es: 'Las sedes operan en contacto permanente con comunidades ejidales, asambleas agrarias y pueblos originarios locales.',
        en: 'Headquarters operate in permanent contact with agrarian assemblies, communal landholders and local indigenous peoples.',
      },
    },
    {
      num: '04',
      title: { es: 'Canales Oficiales de Enlace', en: 'Official Liaison Channels' },
      desc: {
        es: 'Atención directa a gobiernos, universidades, organismos multilaterales y empresas para convenios vinculantes.',
        en: 'Direct engagement with governments, universities, multilateral bodies and enterprises for binding agreements.',
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between">
      <div>
        {/* ─── PAGE HERO EDITORIAL ─── */}
        <PageHero
          titleWhite={{ es: 'Presencia global y', en: 'Global presence and' }}
          titleGreen={{ es: 'cooperación territorial', en: 'territorial cooperation' }}
          description={{
            es: 'Con sede en México, el Consejo Global Ambiental conecta capacidades técnicas, experiencias comunitarias y espacios de diálogo en México, Canadá, Colombia, Costa Rica y España.',
            en: 'Headquartered in Mexico, the Global Environmental Council connects technical capabilities, community experiences, and dialogue spaces across Mexico, Canada, Colombia, Costa Rica, and Spain.',
          }}
          bgImage="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&h=900&fit=crop&auto=format"
        />

        {/* ─── SECCIÓN EDITORIAL: CARTOGRAFÍA Y COOPERACIÓN TERRITORIAL ─── */}
        <section className="pt-16 sm:pt-24 pb-20 px-4 sm:px-8 md:px-16 lg:px-20 max-w-7xl mx-auto w-full">
          
          {/* Cabecera Editorial */}
          <div className="pb-8 border-b border-[#d8ceb6]/70 mb-10">
            <div className="space-y-3 text-center max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2d2618] font-light leading-[1.12]">
                {t({ es: 'Cooperación entre territorios con', en: 'Territorial cooperation based on' })}{' '}
                <span className="italic text-[#4a5a22] font-normal">
                  {t({ es: 'base en acuerdos reales.', en: 'real agreements.' })}
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-[#635741] font-light leading-relaxed">
                {t({
                  es: 'Cada país se presenta de acuerdo con la naturaleza real de sus actividades y acuerdos, sin equiparar una visita institucional con una representación formal. Selecciona un país en el mapa para consultar su ficha técnica y directiva.',
                  en: 'Each country is presented according to the real nature of its activities and agreements, without equating an institutional visit with a formal representation. Select a country on the map to review its technical and executive profile.',
                })}
              </p>
            </div>
          </div>

          {/* ─── BOTONES SELECTORES DE PAÍSES (ARRIBA DEL MAPA) ─── */}
          <div className="flex items-center justify-center mb-10 px-2">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-[#eae4d2]/80 border border-[#d8ceb6] shadow-xs overflow-x-auto max-w-full">
              {sedesList.map((sede) => {
                const isActive = activeCountryId === sede.id;
                return (
                  <button
                    key={sede.id}
                    type="button"
                    onClick={() => handleSelectSede(sede.id)}
                    className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-sans transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      isActive
                        ? 'bg-[#3a4a18] text-white font-semibold shadow-xs'
                        : 'text-[#6b6048] hover:text-[#2d2618] hover:bg-[#f5efe3]/90 font-medium'
                    }`}
                  >
                    <img
                      src={`https://flagcdn.com/w40/${sede.code.toLowerCase()}.png`}
                      alt={t(sede.country)}
                      className="w-4 h-3 object-cover rounded-xs shadow-2xs shrink-0"
                    />
                    <span>{t(sede.country)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── MAPA + PANEL DE SEDE (el mapa y el panel se animan en sincronía perfecta sin saltos) ─── */}
          <div className="mb-20 flex flex-col lg:flex-row gap-6 items-stretch overflow-hidden">
            <motion.div
              layout
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className={showInfo ? 'w-full lg:w-[50%] shrink-0' : 'w-full shrink-0'}
            >
              <RealWorldMap
                sedes={sedesList}
                activeSedeId={activeCountryId}
                onSelectSede={handleSelectSede}
                isCompact={showInfo}
              />
            </motion.div>

            <AnimatePresence>
              {showInfo && (() => {
                const sede = sedesList.find((s) => s.id === activeCountryId) || sedesList[0];
                const info = SEDE_DETAILS[sede.id];
                return (
                  <motion.div
                    key="hq-info-panel"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex-1 min-w-0 flex flex-col"
                  >
                    <aside className="w-full h-full rounded-3xl border border-[#d8ceb6] bg-[#eae4d2]/70 p-6 sm:p-8 lg:p-9 flex flex-col justify-between overflow-hidden">
                      <div className="space-y-4 min-w-0">
                        {/* Cabecera con Título de Sede y botón de cierre */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <h3 className="font-serif text-3xl sm:text-4xl text-[#2d2618] font-light leading-tight">
                              {t(sede.country)}
                            </h3>
                            <p className="font-serif italic text-[#4a5a22] text-base sm:text-lg mt-1">
                              {t(sede.sedeType)}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleCloseInfo}
                            aria-label={t({ es: 'Cerrar', en: 'Close' })}
                            className="w-8 h-8 rounded-full border border-[#d8ceb6] text-[#635741] hover:text-[#2d2618] hover:border-[#4a5a22] hover:bg-[#f5efe3] flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-1"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        {/* Resumen institucional amplio y legible */}
                        <p className="text-sm text-[#554a37] font-light leading-relaxed">
                          {t(info.desc)}
                        </p>

                        {/* Mecanismo de Articulación y Enlace Institucional */}
                        {info.miembros && info.miembros.length > 0 && (
                          <div className="pt-2 border-t border-[#d8ceb6]/60 space-y-2">
                            <span className="font-serif italic text-xs text-[#4a5a22] block">
                              {t({ es: 'Articulación y enlace institucional:', en: 'Institutional coordination & liaison:' })}
                            </span>
                            <div className="space-y-2">
                              {info.miembros.map((m, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 text-xs">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#4a5a22] mt-1.5 shrink-0" />
                                  <div className="leading-snug min-w-0">
                                    <span className="font-medium text-[#2d2618] mr-1.5">{m.name}</span>
                                    <span className="text-[#4a5a22] font-serif italic text-[11px] mr-1">({t(m.role)})</span>
                                    <span className="text-[#6b6048] text-[11px] block font-light">
                                      {t(m.focus)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Proyectos y Alianzas */}
                        <div className="space-y-2.5 pt-2 border-t border-[#d8ceb6]/60">
                          <div className="flex items-start gap-2.5 text-xs text-[#554a37]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4a5a22] mt-1.5 shrink-0" />
                            <p className="leading-relaxed">
                              <span className="font-serif italic text-[#4a5a22] mr-1.5">{t({ es: 'Proyectos:', en: 'Projects:' })}</span>
                              <span className="text-[#2d2618] font-light">{t(info.proyectos)}</span>
                            </p>
                          </div>
                          <div className="flex items-start gap-2.5 text-xs text-[#554a37]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4a5a22] mt-1.5 shrink-0" />
                            <p className="leading-relaxed">
                              <span className="font-serif italic text-[#4a5a22] mr-1.5">{t({ es: 'Alianzas:', en: 'Alliances:' })}</span>
                              <span className="text-[#2d2618] font-light">{t(info.alianzas)}</span>
                              {info.alianzasEmail && (
                                <span className="text-[#4a5a22] ml-1 font-normal">
                                  &middot; {info.alianzasEmail}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Footer espacioso sin desbordes */}
                      <div className="pt-4 mt-5 border-t border-[#d8ceb6] flex flex-wrap items-center justify-between gap-3">
                        <div className="min-w-0">
                          <span className="text-[10px] text-[#7a6e58] block leading-tight">{t({ es: 'Contacto institucional', en: 'Institutional contact' })}</span>
                          <a
                            href={`mailto:${sede.email}`}
                            className="text-xs text-[#4a5a22] hover:underline font-medium truncate block"
                          >
                            {sede.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Link
                            to="/comunicacion"
                            className="text-xs text-[#554a37] hover:text-[#2d2618] px-3.5 py-2 rounded-full border border-[#d8ceb6] hover:border-[#4a5a22] transition-colors font-medium"
                          >
                            {t({ es: 'Comunicación', en: 'News' })} &rarr;
                          </Link>
                          <Link
                            to="/contacto"
                            className="inline-flex items-center gap-1.5 bg-[#4a5a22] hover:bg-[#3a4a18] text-[#f5efe3] rounded-full px-4 py-2 text-xs font-medium transition-all shadow-sm"
                          >
                            <span>{t({ es: 'Contactar', en: 'Contact' })}</span>
                            <span aria-hidden="true">&rarr;</span>
                          </Link>
                        </div>
                      </div>
                    </aside>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

          {/* ─── PILARES DE ARTICULACIÓN Y COOPERACIÓN GLOBAL (01 AL 04) ─── */}
          <div className="pt-12 border-t border-[#d8ceb6]/70">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light">
                {t({ es: 'Pilares de articulación y', en: 'Pillars of articulation and' })}{' '}
                <span className="italic text-[#4a5a22] font-normal">
                  {t({ es: 'cooperación global.', en: 'global cooperation.' })}
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {strategicPillars.map((step) => (
                <div
                  key={step.num}
                  className="pt-4 border-t border-[#d8ceb6] flex flex-col justify-between"
                >
                  <span className="font-serif italic text-lg text-[#4a5a22] mb-2 block">
                    {step.num}
                  </span>
                  <div>
                    <h5 className="font-serif text-lg text-[#2d2618] mb-1.5 font-normal">
                      {t(step.title)}
                    </h5>
                    <p className="text-xs text-[#635741] font-light leading-relaxed">
                      {t(step.desc)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── CIERRE EDITORIAL + CTAS ─── */}
          <div className="mt-20 pt-8 border-t border-[#d8ceb6]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <h3 className="font-serif text-2xl sm:text-[28px] text-[#2d2618] font-light leading-snug max-w-md">
              {t({ es: 'Vinculación institucional y', en: 'Institutional liaison and' })} <br />
              <span className="italic text-[#4a5a22] font-normal">
                {t({ es: 'atención directa en cada sede.', en: 'direct attention at every headquarters.' })}
              </span>
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2.5 bg-[#4a5a22] hover:bg-[#5a6b2a] text-[#f5efe3] rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.14em] font-medium transition-all duration-300 cursor-pointer shadow-sm"
              >
                <span>{t({ es: 'Contactar a una sede', en: 'Contact a headquarters' })}</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7M3 12h18" />
                </svg>
              </Link>
              <Link
                to="/gobernanza"
                className="inline-flex items-center gap-2.5 border border-[#2d2618]/30 hover:border-[#4a5a22] text-[#2d2618] rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.14em] font-medium transition-all duration-300 cursor-pointer"
              >
                <span>{t({ es: 'Estatuto de gobierno', en: 'Governance bylaws' })}</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ─── FOOTER ─── */}
      <FooterNav />
    </div>
  );
}
