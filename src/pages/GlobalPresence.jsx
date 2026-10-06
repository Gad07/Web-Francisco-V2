import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import RealWorldMap from '../components/RealWorldMap.jsx';
import { useI18n } from '../i18n/index.jsx';

// Tiempos fluidos de la secuencia cinematográfica
const SPECIES_HOVER_DURATION = 2600; // Duración de vuelo/aparición de la fauna en el mapa
const SPECIES_EXIT_DURATION = 650;   // Duración de salida suave antes del deslizamiento del mapa

const SEDE_DETAILS = {
  mexico: {
    address: { es: 'Insurgentes Sur & Núcleo Pericial Xochimilco, CDMX', en: 'Insurgentes Sur & Xochimilco Forensic Center, CDMX' },
    desc: {
      es: 'Sede directiva global del Consejo. Coordina la defensa jurídica y pericial del suelo de conservación, la bioingeniería en canales lacustres y los convenios marco multilaterales.',
      en: 'Global executive headquarters. Coordinates legal and forensic defense of conservation land, lacustrine bioengineering and multilateral framework agreements.',
    },
    facilities: [
      { es: 'Laboratorio Central de Peritajes Ambientales y Geomática', en: 'Central Environmental Forensics & Geomatics Lab' },
      { es: 'Centro de Monitoreo Satelital de Cuencas Lacustres', en: 'Lacustrine Basins Satellite Monitoring Center' },
      { es: 'Sala de Asambleas Agrarias y Dictámenes Vinculantes', en: 'Agrarian Assemblies & Binding Opinions Hall' },
    ],
    metric: '2,657 ha',
    metricLabel: { es: 'en custodia pericial directa', en: 'under direct expert stewardship' },
  },
  colombia: {
    address: { es: 'Corredor Andino & Nodo de Investigación Biocultural', en: 'Andean Corridor & Biocultural Research Node' },
    desc: {
      es: 'Articulación técnica en América del Sur: custodia de páramos, bioeconomía comunitaria, protección de polinizadores y transferencia de bioingeniería.',
      en: 'Technical coordination in South America: páramo custody, community bioeconomy, pollinator protection and bioengineering transfer.',
    },
    facilities: [
      { es: 'Red de Bancos de Germoplasma y Semillas Nativas', en: 'Native Seed & Germplasm Banks Network' },
      { es: 'Módulo de Biofiltros y Tratamiento de Aguas', en: 'Biofilters & Water Treatment Unit' },
      { es: 'Mesa de Gobernanza Indígena', en: 'Indigenous Governance Roundtable' },
    ],
    metric: '8 Bancos',
    metricLabel: { es: 'de germoplasma comunitario', en: 'community germplasm banks' },
  },
  canada: {
    address: { es: 'Nodo Científico Norteamericano & Alianzas Académicas', en: 'North American Scientific Node & Academic Alliances' },
    desc: {
      es: 'Investigación avanzada y teledetección: modelos predictivos de incendios, captura de carbono en biomasa y convenios con universidades canadienses.',
      en: 'Advanced research and remote sensing: wildfire prediction, biomass carbon capture and agreements with Canadian universities.',
    },
    facilities: [
      { es: 'Unidad de Teledetección y Sumideros de Carbono', en: 'Remote Sensing & Carbon Sink Unit' },
      { es: 'Laboratorio de Prevención de Incendios', en: 'Wildfire Prevention Lab' },
      { es: 'Mesa de Estándares de Comercio Justo', en: 'Fair Trade Standards Table' },
    ],
    metric: '100% Datos',
    metricLabel: { es: 'en ciencia abierta', en: 'open science' },
  },
  espana: {
    address: { es: 'Paseo de la Castellana & Enlace Multilateral Bruselas', en: 'Paseo de la Castellana & Brussels Liaison' },
    desc: {
      es: 'Sede diplomática en Europa: interlocución con la Unión Europea, alineación con el Pacto Verde y canalización de cooperación técnica internacional.',
      en: 'Diplomatic HQ in Europe: EU liaison, Green Deal alignment and international technical cooperation.',
    },
    facilities: [
      { es: 'Oficina de Fondos Multilaterales', en: 'Multilateral Funds Office' },
      { es: 'Mesa de Derecho Ambiental Internacional', en: 'International Environmental Law Table' },
      { es: 'Centro de Políticas Públicas Sostenibles', en: 'Sustainable Public Policy Center' },
    ],
    metric: '12 Foros',
    metricLabel: { es: 'multilaterales con representación', en: 'multilateral forums' },
  },
  costarica: {
    address: { es: 'Centro de Innovación Ambiental & Corredor Biológico', en: 'Environmental Innovation Center & Biological Corridor' },
    desc: {
      es: 'Esquemas de pago por servicios ambientales, conectividad biológica transfronteriza y conservación de abejas nativas sin aguijón.',
      en: 'Payment for ecosystem services, cross-border biological connectivity and native stingless bee conservation.',
    },
    facilities: [
      { es: 'Módulo de Pagos por Servicios Ambientales', en: 'Ecosystem Services Payment Unit' },
      { es: 'Santuario de Meliponicultura', en: 'Meliponiculture Sanctuary' },
      { es: 'Monitoreo de Corredores Migratorios', en: 'Migratory Corridors Monitoring' },
    ],
    metric: '3 Corredores',
    metricLabel: { es: 'biológicos activos', en: 'active biological corridors' },
  },
};

export default function GlobalPresence() {
  const { t } = useI18n();
  const [activeCountryId, setActiveCountryId] = useState('mexico');
  const [showSpecies, setShowSpecies] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const timer1Ref = useRef(null);
  const timer2Ref = useRef(null);

  const handleSelectSede = (id) => {
    clearTimeout(timer1Ref.current);
    clearTimeout(timer2Ref.current);
    setActiveCountryId(id);
    setPlayKey((k) => k + 1);

    // 1. Mostrar fauna/flora
    setShowInfo(false);
    setShowSpecies(true);

    // 2. Transición de salida suave de la especie tras 2.6s
    timer1Ref.current = setTimeout(() => {
      setShowSpecies(false);
      // 3. Cuando la especie termina su salida, desplazar el mapa suavemente y abrir panel de sede
      timer2Ref.current = setTimeout(() => {
        setShowInfo(true);
      }, SPECIES_EXIT_DURATION);
    }, SPECIES_HOVER_DURATION);
  };

  const handleCloseInfo = () => {
    clearTimeout(timer1Ref.current);
    clearTimeout(timer2Ref.current);
    setShowInfo(false);
    setShowSpecies(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer1Ref.current);
      clearTimeout(timer2Ref.current);
    };
  }, []);

  const sedesList = [
    {
      id: 'mexico',
      num: '01',
      country: { es: 'México', en: 'Mexico' },
      city: { es: 'Ciudad de México', en: 'Mexico City' },
      sedeType: { es: 'Sede Central Global & Presidencia', en: 'Global Headquarters & Presidency' },
      code: 'MX',
      flag: '🇲🇽',
      lat: 23.6345,
      lon: -102.5528,
      status: { es: 'Sede Principal de Gobierno', en: 'Principal Government HQ' },
      email: 'sede.central@consejoglobalambiental.org',
    },
    {
      id: 'colombia',
      num: '02',
      country: { es: 'Colombia', en: 'Colombia' },
      city: { es: 'Bogotá D.C. / Medellín', en: 'Bogota D.C. / Medellin' },
      sedeType: { es: 'Sede Regional Andino-Amazónica', en: 'Andean-Amazonian Regional HQ' },
      code: 'CO',
      flag: '🇨🇴',
      lat: 4.5709,
      lon: -74.2973,
      status: { es: 'Delegación Regional de Biodiversidad', en: 'Regional Biodiversity Delegation' },
      email: 'sede.colombia@consejoglobalambiental.org',
    },
    {
      id: 'canada',
      num: '03',
      country: { es: 'Canadá', en: 'Canada' },
      city: { es: 'Ottawa / Vancouver', en: 'Ottawa / Vancouver' },
      sedeType: { es: 'Sede de Enlace Científico Boreal', en: 'Boreal Scientific Liaison HQ' },
      code: 'CA',
      flag: '🇨🇦',
      lat: 56.1304,
      lon: -106.3468,
      status: { es: 'Centro de Datos Satelitales y Clima', en: 'Satellite Data & Climate Center' },
      email: 'sede.canada@consejoglobalambiental.org',
    },
    {
      id: 'espana',
      num: '04',
      country: { es: 'España', en: 'Spain' },
      city: { es: 'Madrid / Bruselas', en: 'Madrid / Brussels' },
      sedeType: { es: 'Sede Diplomática & Delegación Europea', en: 'Diplomatic HQ & European Delegation' },
      code: 'ES',
      flag: '🇪🇸',
      lat: 40.4637,
      lon: -3.7492,
      status: { es: 'Delegación Permanente ante la UE e Iberoamérica', en: 'Permanent Delegation to EU & Ibero-America' },
      email: 'sede.espana@consejoglobalambiental.org',
    },
    {
      id: 'costarica',
      num: '05',
      country: { es: 'Costa Rica', en: 'Costa Rica' },
      city: { es: 'San José', en: 'San Jose' },
      sedeType: { es: 'Sede Mesoamericana & Servicios Ecosistémicos', en: 'Mesoamerican HQ & Ecosystem Services' },
      code: 'CR',
      flag: '🇨🇷',
      lat: 9.7489,
      lon: -83.7534,
      status: { es: 'Centro Regional de Conectividad Biológica', en: 'Regional Biological Connectivity Center' },
      email: 'sede.costarica@consejoglobalambiental.org',
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
          titleWhite={{ es: 'Red institucional de', en: 'Institutional network of' }}
          titleGreen={{ es: 'sedes internacionales', en: 'international headquarters' }}
          description={{
            es: 'El Consejo Global Ambiental opera a través de cinco sedes estratégicas. Explora el mapa cartográfico interactivo para descubrir la fauna y flora emblemática en custodia territorial.',
            en: 'The Global Environmental Council operates through five strategic headquarters. Explore the interactive cartographic map to discover emblematic fauna and flora under territorial stewardship.',
          }}
          bgImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop"
        />

        {/* ─── SECCIÓN EDITORIAL: CARTOGRAFÍA Y FAUNA/FLORA EN LOS BORDES ─── */}
        <section className="pt-16 sm:pt-24 pb-20 px-4 sm:px-8 md:px-16 lg:px-20 max-w-7xl mx-auto w-full">
          
          {/* Cabecera Editorial */}
          <div className="pb-8 border-b border-[#d8ceb6]/70 mb-10">
            <div className="space-y-3 text-center max-w-3xl mx-auto">
              <span className="text-[10px] uppercase tracking-[0.26em] text-[#5a6b2a] font-mono font-semibold">
                {t({ es: 'DIRECTORIO OFICIAL & BIODIVERSIDAD EN BORDES', en: 'OFFICIAL DIRECTORY & BORDER BIODIVERSITY' })}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2d2618] font-light leading-[1.12]">
                {t({ es: 'Sedes operativas con', en: 'Operational headquarters with' })}{' '}
                <span className="italic text-[#4a5a22] font-normal">
                  {t({ es: 'presencia territorial vinculante.', en: 'binding territorial presence.' })}
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-[#635741] font-light leading-relaxed">
                {t({
                  es: 'Haz clic en cualquier país en el mapa o en las pastillas inferiores. Los animales y flores emblemáticos aparecen emergiendo desde los bordes del propio mapa sin fondos ni interrupciones.',
                  en: 'Click on any country pin on the map or bottom pills. Emblematic animals and flowers emerge directly from the map borders with transparent backgrounds.',
                })}
              </p>
            </div>
          </div>

          {/* ─── MAPA + PANEL DE SEDE (el mapa y el panel se animan en sincronía perfecta sin saltos) ─── */}
          <div className="mb-20 flex flex-col lg:flex-row gap-6 items-stretch overflow-hidden">
            <motion.div
              layout
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className={showInfo ? 'w-full lg:w-[58%] shrink-0' : 'w-full shrink-0'}
            >
              <RealWorldMap
                sedes={sedesList}
                activeSedeId={activeCountryId}
                onSelectSede={handleSelectSede}
                showSpecies={showSpecies}
                speciesKey={playKey}
                isCompact={showInfo}
              />
            </motion.div>

            <AnimatePresence>
              {showInfo && (() => {
                const sede = sedesList.find((s) => s.id === activeCountryId) || sedesList[0];
                const info = SEDE_DETAILS[sede.id];
                return (
                  <motion.div
                    key={sede.id}
                    initial={{ opacity: 0, x: 30, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 30, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 min-w-0 flex flex-col"
                  >
                    <aside className="w-full h-full rounded-3xl border border-[#d8ceb6] bg-[#eae4d2]/70 p-6 sm:p-8 flex flex-col justify-between">
                      <div className="space-y-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <img src={`https://flagcdn.com/w80/${sede.code.toLowerCase()}.png`} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-[#f5efe3] shadow" />
                            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5a6b2a] font-semibold">
                              {t({ es: 'Sede', en: 'HQ' })} {sede.num} &middot; {sede.code}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={handleCloseInfo}
                            aria-label={t({ es: 'Cerrar', en: 'Close' })}
                            className="w-8 h-8 rounded-full border border-[#d8ceb6] text-[#635741] hover:text-[#2d2618] hover:border-[#4a5a22] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        <div>
                          <h3 className="font-serif text-3xl sm:text-4xl text-[#2d2618] font-light leading-tight">
                            {t(sede.country)}
                          </h3>
                          <p className="font-serif italic text-[#4a5a22] text-lg mt-1">{t(sede.sedeType)}</p>
                          <p className="text-xs text-[#7a6e58] font-mono mt-2">📍 {t(info.address)} &middot; {t(sede.city)}</p>
                        </div>

                        <p className="text-sm text-[#554a37] font-light leading-relaxed">{t(info.desc)}</p>

                        <div className="rounded-2xl bg-[#f5efe3] border border-[#d8ceb6] p-4">
                          <div className="font-serif text-3xl text-[#2d2618] font-light">{info.metric}</div>
                          <div className="text-xs text-[#4a5a22] font-mono">{t(info.metricLabel)}</div>
                        </div>

                        <ul className="space-y-2">
                          {info.facilities.map((f, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs text-[#554a37]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#4a5a22] mt-1.5 shrink-0" />
                              <span>{t(f)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-6 mt-6 border-t border-[#d8ceb6] flex flex-wrap items-center justify-between gap-3">
                        <a href={`mailto:${sede.email}`} className="text-xs text-[#4a5a22] font-mono underline break-all">
                          {sede.email}
                        </a>
                        <Link
                          to="/contacto"
                          className="inline-flex items-center gap-2 bg-[#4a5a22] hover:bg-[#5a6b2a] text-[#f5efe3] rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.14em] font-medium transition-colors"
                        >
                          {t({ es: 'Contactar sede', en: 'Contact HQ' })} &rarr;
                        </Link>
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
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#7a6e58] font-sans">
                {t({ es: 'Estrategia Multilateral', en: 'Multilateral Strategy' })}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light">
                {t({ es: 'Pilares de articulación y', en: 'Pillars of articulation and' })}{' '}
                <span className="italic text-[#4a5a22] font-normal">
                  {t({ es: 'cooperación global.', en: 'global cooperation.' })}
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {strategicPillars.map((step) => (
                <div
                  key={step.num}
                  className="bg-[#eae4d2]/60 rounded-xl p-5 border border-[#d8ceb6]/80 flex flex-col justify-between hover:border-[#4a5a22]/50 transition-colors"
                >
                  <span className="font-mono text-xs text-[#5a6b2a] font-semibold mb-3">
                    {step.num}
                  </span>
                  <div>
                    <h5 className="font-serif text-lg text-[#2d2618] mb-1.5">
                      {t(step.title)}
                    </h5>
                    <p className="text-[11px] text-[#635741] font-light leading-relaxed">
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
