import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { useI18n } from '../i18n/index.jsx';

const EASE = [0.22, 1, 0.36, 1];

export default function Agenda2030() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeOdsIndex, setActiveOdsIndex] = useState(null);

  // Sincronizar evento para ocultar / mostrar la barra de navegación automáticamente
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('cga:modal', { detail: { open: activeOdsIndex !== null } })
    );
  }, [activeOdsIndex]);

  const categories = [
    { id: 'ALL', label: { es: 'Todos los ODS', en: 'All SDGs' } },
    { id: 'BIOSFERA', label: { es: 'Biosfera & Clima', en: 'Biosphere & Climate' } },
    { id: 'GOBERNANZA', label: { es: 'Gobernanza & Justicia', en: 'Governance & Justice' } },
    { id: 'PRODUCCION', label: { es: 'Bioeconomía & Alimentos', en: 'Bioeconomy & Food' } },
  ];

  const odsList = [
    {
      id: 'ods-06',
      num: '06',
      category: 'BIOSFERA',
      categoryLabel: { es: 'Biosfera & Clima', en: 'Biosphere & Climate' },
      title: { es: 'Agua Limpia y Saneamiento', en: 'Clean Water & Sanitation' },
      tagline: { es: 'Bioingeniería y custodia de recarga hidrológica', en: 'Bioengineering & hydrological recharge custody' },
      desc: {
        es: 'Dictámenes periciales y bioingeniería para la preservación de cuencas lacustres de Xochimilco y mantos acuíferos metropolitanos de alta vulnerabilidad.',
        en: 'Expert reports and bioengineering for the preservation of Xochimilco wetland basins and highly vulnerable metropolitan aquifers.',
      },
      metric: '2,657 ha',
      metricLabel: { es: 'en custodia pericial hídrica', en: 'under hydrological expert stewardship' },
      deliverables: [
        { es: 'Biofiltros con macrófitas autóctonas en canales lacustres', en: 'Native macrophyte biofilters in canal networks' },
        { es: 'Monitoreo de calidad del agua y batimetría periódica', en: 'Regular water quality and bathymetry monitoring' },
        { es: 'Protección de zonas de recarga del acuífero profundo', en: 'Protection of key deep aquifer infiltration zones' },
      ],
      mediaType: 'video',
      videoSrc: '/video/ods_06_agua.mp4',
      img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&h=900&fit=crop&auto=format',
      featured: true,
    },
    {
      id: 'ods-02',
      num: '02',
      category: 'PRODUCCION',
      categoryLabel: { es: 'Bioeconomía & Alimentos', en: 'Bioeconomy & Food' },
      title: { es: 'Hambre Cero', en: 'Zero Hunger' },
      tagline: { es: 'Soberanía alimentaria y agricultura biointensiva', en: 'Food sovereignty & biointensive farming' },
      desc: {
        es: 'Agricultura biointensiva, huertos familiares y custodia comunitaria de germoplasma criollo en suelo de conservación.',
        en: 'Biointensive agriculture, family gardens and community custody of heirloom germplasm on conservation land.',
      },
      metric: '16,890+',
      metricLabel: { es: 'personas beneficiadas', en: 'people benefited' },
      deliverables: [
        { es: 'Red de 8 bancos comunitarios de semillas criollas', en: 'Network of 8 community heirloom seed banks' },
        { es: 'Módulos de biopreparados y manejo agroecológico', en: 'Bio-input modules and agroecological management' },
        { es: 'Circuitos cortos de abasto y comercialización justa', en: 'Fair and solidarity-based short trade circuits' },
      ],
      mediaType: 'video',
      videoSrc: '/video/ods_02_hambre_cero.mp4',
      img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1000&h=800&fit=crop&auto=format',
      featured: false,
    },
    {
      id: 'ods-13',
      num: '13',
      category: 'BIOSFERA',
      categoryLabel: { es: 'Biosfera & Clima', en: 'Biosphere & Climate' },
      title: { es: 'Acción por el Clima', en: 'Climate Action' },
      tagline: { es: 'Mitigación forestal y resiliencia territorial', en: 'Forest mitigation & climate resilience' },
      desc: {
        es: 'Monitoreo satelital para prevención de incendios y cuantificación de captura de carbono en biomasa forestal nativa.',
        en: 'Satellite monitoring for fire prevention and quantification of forest carbon sequestration in native biomass.',
      },
      metric: '18M',
      metricLabel: { es: 'árboles en corredores', en: 'trees in corridors' },
      deliverables: [
        { es: 'Obras de captación e infiltración pluvial', en: 'Rainwater harvesting and infiltration works' },
        { es: 'Brigadas comunitarias de prevención de incendios', en: 'Community wildfire prevention brigades' },
        { es: 'Planes locales de resiliencia climática territorial', en: 'Local climate resilience action plans' },
      ],
      mediaType: 'video',
      videoSrc: '/video/ods_13_clima.mp4',
      img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1000&h=800&fit=crop&auto=format',
      featured: false,
    },
    {
      id: 'ods-11',
      num: '11',
      category: 'GOBERNANZA',
      categoryLabel: { es: 'Gobernanza & Justicia', en: 'Governance & Justice' },
      title: { es: 'Ciudades y Comunidades Sostenibles', en: 'Sustainable Cities & Communities' },
      tagline: { es: 'Defensa jurídica del suelo de conservación', en: 'Legal defence of conservation land' },
      desc: {
        es: 'Defensa legal y técnica del suelo de conservación, contención de la mancha urbana y ordenamiento ecológico participativo.',
        en: 'Legal and technical defence of conservation land, containment of urban sprawl and participatory ecological planning.',
      },
      metric: '88,000 ha',
      metricLabel: { es: 'bajo vigilancia técnica continua', en: 'under continuous technical monitoring' },
      deliverables: [
        { es: 'Peritajes técnicos en suelo de conservación', en: 'Technical expert reports on conservation land' },
        { es: 'Cartografía participativa de riesgos socioambientales', en: 'Participatory socio-environmental risk mapping' },
        { es: 'Resolución pacífica de controversias ejidales', en: 'Peaceful resolution of communal land disputes' },
      ],
      mediaType: 'video',
      videoSrc: '/video/ods_11_ciudades.mp4',
      img: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=1400&h=900&fit=crop&auto=format',
      featured: true,
    },
    {
      id: 'ods-15',
      num: '15',
      category: 'BIOSFERA',
      categoryLabel: { es: 'Biosfera & Clima', en: 'Biosphere & Climate' },
      title: { es: 'Vida de Ecosistemas Terrestres', en: 'Life on Land' },
      tagline: { es: 'Regeneración de suelos y santuarios florales', en: 'Soil regeneration & floral sanctuaries' },
      desc: {
        es: 'Restauración ecológica de suelos degradados, custodia de corredores biológicos boscosos y reservas para polinizadores autóctonos.',
        en: 'Ecological restoration of degraded soils, stewardship of forest corridors and sanctuaries for native pollinators.',
      },
      metric: '24',
      metricLabel: { es: 'islas de polinizadores activas', en: 'active pollinator sanctuaries' },
      deliverables: [
        { es: '24 islas botánicas de flora melífera nativa', en: '24 botanical islands of native honey flora' },
        { es: 'Reforestación técnica con especies endémicas', en: 'Technical reforestation with endemic species' },
        { es: 'Monitoreo de biodiversidad con cámaras trampa', en: 'Biodiversity monitoring with camera traps' },
      ],
      mediaType: 'video',
      videoSrc: '/video/ods_15_ecosistemas.mp4',
      img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&h=900&fit=crop&auto=format',
      featured: true,
    },
    {
      id: 'ods-03',
      num: '03',
      category: 'PRODUCCION',
      categoryLabel: { es: 'Bioeconomía & Alimentos', en: 'Bioeconomy & Food' },
      title: { es: 'Salud y Bienestar', en: 'Good Health & Well-being' },
      tagline: { es: 'Enfoque integral Una Salud en territorio', en: 'One Health integrated territorial approach' },
      desc: {
        es: 'Modelo Una Salud: salud ecosistémica, trato digno a la fauna silvestre y eliminación de contaminantes tóxicos en agua y suelo.',
        en: 'One Health model: ecosystem health, humane wildlife treatment and elimination of toxic contaminants in water and soil.',
      },
      metric: '100%',
      metricLabel: { es: 'libre de agroquímicos sintéticos', en: 'free from synthetic agrochemicals' },
      deliverables: [
        { es: 'Monitoreo biológico de mantos freáticos y suelo', en: 'Biological monitoring of aquifers and soil' },
        { es: 'Protocolos de bioseguridad y bienestar animal', en: 'Biosafety and animal welfare protocols' },
        { es: 'Sustitución de plaguicidas altamente peligrosos', en: 'Phasing out high-hazard pesticides' },
      ],
      mediaType: 'video',
      videoSrc: '/video/ods_03_salud.mp4',
      img: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=1000&h=800&fit=crop&auto=format',
      featured: false,
    },
    {
      id: 'ods-04',
      num: '04',
      category: 'GOBERNANZA',
      categoryLabel: { es: 'Gobernanza & Justicia', en: 'Governance & Justice' },
      title: { es: 'Educación de Calidad', en: 'Quality Education' },
      tagline: { es: 'Escuelas de campo y alfabetización ecológica', en: 'Farmer field schools & ecological literacy' },
      desc: {
        es: 'Formación técnica comunitaria, escuelas agroecológicas vivas y capacitación jurídica para la defensa territorial.',
        en: 'Technical community capacity building, living agroecological schools and legal training for territorial defence.',
      },
      metric: '44',
      metricLabel: { es: 'escuelas de campo activas', en: 'active field schools' },
      deliverables: [
        { es: 'Talleres prácticos con asambleas ejidales', en: 'Hands-on workshops with communal assemblies' },
        { es: 'Diplomados en legislación ambiental aplicada', en: 'Applied environmental law diplomas' },
        { es: 'Capacitación comunitaria en monitoreo biocultural', en: 'Community training in biocultural monitoring' },
      ],
      mediaType: 'video',
      videoSrc: '/video/ods_04_educacion.mp4',
      img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&h=800&fit=crop&auto=format',
      featured: false,
    },
    {
      id: 'ods-08',
      num: '08',
      category: 'PRODUCCION',
      categoryLabel: { es: 'Bioeconomía & Alimentos', en: 'Bioeconomy & Food' },
      title: { es: 'Trabajo Decente y Crecimiento', en: 'Decent Work & Growth' },
      tagline: { es: 'Bioeconomía circular y cooperativas verdes', en: 'Circular bioeconomy & green cooperatives' },
      desc: {
        es: 'Consolidación de cooperativas campesinas, laboratorios locales de bioinsumos y empleos verdes con valor agregado.',
        en: 'Consolidation of peasant cooperatives, local bio-input laboratories and sustainable green jobs with added value.',
      },
      metric: '12',
      metricLabel: { es: 'cooperativas de bioinsumos', en: 'bio-input cooperatives' },
      deliverables: [
        { es: 'Laboratorios comunitarios de bioinsumos', en: 'Local bio-input laboratories' },
        { es: 'Rutas agroturísticas bioculturales sostenibles', en: 'Sustainable biocultural agritourism routes' },
        { es: 'Acompañamiento técnico para formalización', en: 'Technical guidance for formal enterprise setup' },
      ],
      mediaType: 'video',
      videoSrc: '/video/ods_08_trabajo.mp4',
      img: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=1000&h=800&fit=crop&auto=format',
      featured: false,
    },
    {
      id: 'ods-12',
      num: '12',
      category: 'PRODUCCION',
      categoryLabel: { es: 'Bioeconomía & Alimentos', en: 'Bioeconomy & Food' },
      title: { es: 'Producción y Consumo Responsables', en: 'Responsible Consumption' },
      tagline: { es: 'Cierre de ciclos de nutrientes y residuo cero', en: 'Closing nutrient loops & zero waste' },
      desc: {
        es: 'Transición hacia economías circulares en el campo, aprovechamiento de biomasa residual y sustitución de agroquímicos.',
        en: 'Transition to rural circular economies, full utilization of residual biomass and synthetic fertilizer replacement.',
      },
      metric: '100%',
      metricLabel: { es: 'nutrientes recirculados', en: 'recirculated nutrients' },
      deliverables: [
        { es: 'Compostaje masivo de biomasa residual', en: 'Large-scale residual biomass composting' },
        { es: 'Sustitución integral de fertilizantes sintéticos', en: 'Full replacement of synthetic fertilizers' },
        { es: 'Modelos de residuo cero en parcelas y chinampas', en: 'Zero-waste models on plots and chinampas' },
      ],
      mediaType: 'video',
      videoSrc: '/video/ods_12_produccion.mp4',
      img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1000&h=800&fit=crop&auto=format',
      featured: false,
    },
    {
      id: 'ods-16',
      num: '16',
      category: 'GOBERNANZA',
      categoryLabel: { es: 'Gobernanza & Justicia', en: 'Governance & Justice' },
      title: { es: 'Paz, Justicia e Instituciones Sólidas', en: 'Peace, Justice & Strong Inst.' },
      tagline: { es: 'Dictámenes periciales y legalidad territorial', en: 'Expert technical reports & rule of law' },
      desc: {
        es: 'Gobernanza ambiental participativa, dictámenes periciales en tribunales y salvaguarda de la tenencia social de la tierra.',
        en: 'Participatory environmental governance, court expert opinions and legal protection of social land tenure.',
      },
      metric: '100%',
      metricLabel: { es: 'respaldo asambleario formal', en: 'assembly consensus endorsement' },
      deliverables: [
        { es: 'Dictámenes periciales en tribunales agrarios y civiles', en: 'Expert witness opinions in agrarian and civil courts' },
        { es: 'Acompañamiento legal a asambleas ejidales', en: 'Legal advisory for communal assemblies' },
        { es: 'Transparencia y libre acceso a expedientes técnicos', en: 'Open access and transparency for technical files' },
      ],
      mediaType: 'video',
      videoSrc: '/video/ods_16_paz.mp4',
      img: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1400&h=900&fit=crop&auto=format',
      featured: true,
    },
    {
      id: 'ods-17',
      num: '17',
      category: 'GOBERNANZA',
      categoryLabel: { es: 'Gobernanza & Justicia', en: 'Governance & Justice' },
      title: { es: 'Alianzas para los Objetivos', en: 'Partnerships for the Goals' },
      tagline: { es: 'Diplomacia ambiental y articulación global', en: 'Environmental diplomacy & global partnerships' },
      desc: {
        es: 'Articulación multisectorial entre sociedad civil, academia, gobiernos y organismos multilaterales para rigor e inversión.',
        en: 'Multisectoral collaboration across civil society, academia, government and multilateral agencies.',
      },
      metric: '30+',
      metricLabel: { es: 'aliados institucionales', en: 'institutional network allies' },
      deliverables: [
        { es: 'Consejo Consultivo de especialistas honoríficos', en: 'Advisory Council of honorary specialists' },
        { es: 'Convenios de investigación con universidades', en: 'Research agreements with top universities' },
        { es: 'Mesas de cooperación técnica multilateral', en: 'Multilateral technical cooperation working groups' },
      ],
      mediaType: 'video',
      videoSrc: '/video/ods_17_alianzas.mp4',
      img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&h=800&fit=crop&auto=format',
      featured: false,
    },
  ];

  const transversales = [
    {
      num: '01',
      title: { es: 'Fin de la Pobreza', en: 'No Poverty' },
      concept: { es: 'Soberanía Económica Rural', en: 'Rural Economic Sovereignty' },
      desc: {
        es: 'Protección de medios de vida campesinos y circuitos cortos sin intermediarios.',
        en: 'Safeguarding peasant livelihoods and direct short-market trade circuits.',
      },
    },
    {
      num: '05',
      title: { es: 'Igualdad de Género', en: 'Gender Equality' },
      concept: { es: 'Liderazgo de Mujeres en Campo', en: 'Women Leadership in the Field' },
      desc: {
        es: 'Comités de mujeres encabezan los proyectos de germoplasma, huertos y meliponicultura.',
        en: 'Women committees lead germplasm banks, agroecological plots and stingless beekeeping.',
      },
    },
    {
      num: '10',
      title: { es: 'Reducción de Desigualdades', en: 'Reduced Inequalities' },
      concept: { es: 'Justicia Territorial Inclusiva', en: 'Inclusive Territorial Justice' },
      desc: {
        es: 'Prioridad de inversión técnica en comunidades históricamente marginadas.',
        en: 'Priority deployment of technical resources in historically marginalized communities.',
      },
    },
  ];

  const methodSteps = [
    {
      num: '01',
      title: { es: 'Alineación ONU', en: 'UN Alignment' },
      desc: { es: 'Correlación de metas e indicadores oficiales de la Agenda 2030 con el territorio.', en: 'Mapping official 2030 Agenda targets and indicators to local reality.' },
    },
    {
      num: '02',
      title: { es: 'Peritaje Técnico', en: 'Technical Analysis' },
      desc: { es: 'Levantamiento de línea base con muestreo físico-químico, batimetría y cartografía SIG.', en: 'Baseline field sampling, bathymetry and high-resolution GIS mapping.' },
    },
    {
      num: '03',
      title: { es: 'Pacto Comunitario', en: 'Community Accord' },
      desc: { es: 'Validación en asambleas ejidales con actas formales de corresponsabilidad.', en: 'Consensus validation with communal assemblies through binding custody pacts.' },
    },
    {
      num: '04',
      title: { es: 'Auditoría Abierta', en: 'Open Audit' },
      desc: { es: 'Expedientes públicos, memorias técnicas y rendición de cuentas permanente.', en: 'Public digital records, technical reports and verifiable indicators.' },
    },
  ];

  const filteredOds = selectedCategory === 'ALL'
    ? odsList
    : odsList.filter((item) => item.category === selectedCategory);

  const countFor = (id) => (id === 'ALL' ? odsList.length : odsList.filter((item) => item.category === id).length);

  // Navegación en modal
  const activeOds = activeOdsIndex !== null ? odsList[activeOdsIndex] : null;

  const handlePrevOds = () => {
    if (activeOdsIndex === null) return;
    setActiveOdsIndex((prev) => (prev > 0 ? prev - 1 : odsList.length - 1));
  };

  const handleNextOds = () => {
    if (activeOdsIndex === null) return;
    setActiveOdsIndex((prev) => (prev < odsList.length - 1 ? prev + 1 : 0));
  };

  // Atajos de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeOdsIndex === null) return;
      if (e.key === 'Escape') setActiveOdsIndex(null);
      if (e.key === 'ArrowLeft') handlePrevOds();
      if (e.key === 'ArrowRight') handleNextOds();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeOdsIndex]);

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between">
      <div>
        {/* ─── PAGE HERO ─── */}
        <PageHero
          titleWhite={{ es: 'Compromiso global y metas de la', en: 'Global commitment and targets of' }}
          titleGreen={{ es: 'Agenda 2030', en: '2030 Agenda' }}
          description={{
            es: 'Alineamos cada dictamen, intervención en campo y modelo de gobernanza con los Objetivos de Desarrollo Sostenible de la ONU.',
            en: 'We align every technical opinion, field intervention and governance model with the UN Sustainable Development Goals.',
          }}
          bgImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop"
        />

        {/* ─── SECCIÓN EDITORIAL PRINCIPAL ─── */}
        <section className="pt-16 sm:pt-20 pb-20 px-4 sm:px-8 md:px-16 lg:px-20 max-w-7xl mx-auto w-full">
          
          {/* Cabecera Editorial */}
          <div className="pb-6 border-b border-[#d8ceb6]/70 mb-8">
            <div className="space-y-3 text-center">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2d2618] font-light leading-[1.12]">
                {t({ es: 'Acción territorial con impacto', en: 'Territorial action with' })}{' '}
                <span className="italic text-[#4a5a22] font-normal">
                  {t({ es: 'multilateral verificable.', en: 'verifiable multilateral impact.' })}
                </span>
              </h2>
              <p className="text-xs sm:text-[13px] text-[#635741] font-light leading-relaxed max-w-2xl mx-auto">
                {t({
                  es: 'Intervenimos de manera directa y vinculante en 11 ODS prioritarios, articulando rigor científico, defensa jurídica y custodia biocultural.',
                  en: 'We intervene directly and bindingly in 11 priority SDGs, articulating scientific rigor, legal defence and biocultural custody.',
                })}
              </p>
            </div>
          </div>

          {/* Selector de Categorías / Filtros */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#d8ceb6]/40 mb-10">
            <span className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#7a6e58] font-sans">
              <span className="w-2 h-2 rounded-full bg-[#5a6b2a]" />
              {t({ es: 'Mostrando', en: 'Showing' })} {filteredOds.length}{' '}
              {t({ es: 'de', en: 'of' })} {odsList.length}{' '}
              {t({ es: 'ODS prioritarios', en: 'priority SDGs' })}
            </span>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#8a7a5e] font-sans sm:pb-0.5">
                {t({ es: 'Filtrar por eje', en: 'Filter by pillar' })}
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
                          layoutId="ods-filter-pill"
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

          {/* ─── BENTO GRID LIMPIO CON DIFERENCIA DE TAMAÑOS ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredOds.map((ods, i) => {
              const isHero = selectedCategory === 'ALL' ? ods.featured : false;
              const originalIndex = odsList.findIndex((o) => o.id === ods.id);
              
              return (
                <motion.div
                  key={ods.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.04 * i, ease: EASE }}
                  onClick={() => setActiveOdsIndex(originalIndex)}
                  className={`group relative bg-[#2d2618] rounded-2xl border border-[#d8ceb6] overflow-hidden shadow-[0_6px_24px_rgba(45,38,24,0.10)] transition-all duration-500 hover:border-[#4a5a22]/70 hover:shadow-[0_12px_32px_rgba(45,38,24,0.18)] cursor-pointer flex flex-col justify-end p-6 sm:p-7 ${
                    isHero ? 'lg:col-span-2 min-h-[390px] sm:min-h-[430px]' : 'col-span-1 min-h-[390px] sm:min-h-[430px]'
                  }`}
                >
                  {/* Imagen a sangre de fondo */}
                  <img
                    src={ods.img}
                    alt={t(ods.title)}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                  />

                  {/* Degradado para legibilidad */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: isHero
                        ? 'linear-gradient(to top, rgba(45,38,24,0.98) 0%, rgba(45,38,24,0.72) 48%, rgba(45,38,24,0.15) 80%, rgba(45,38,24,0.02) 100%)'
                        : 'linear-gradient(to top, rgba(45,38,24,0.98) 0%, rgba(45,38,24,0.75) 50%, rgba(45,38,24,0.15) 80%, rgba(45,38,24,0.02) 100%)',
                    }}
                  />

                  {/* Contenido Editorial Inferior Integrado */}
                  <div className="relative z-10 space-y-2.5 max-w-2xl">
                    <h3 className={`font-serif text-[#f5efe3] transition-colors duration-300 group-hover:text-[#e5eec2] ${
                      isHero ? 'text-2xl sm:text-3xl leading-tight' : 'text-xl sm:text-2xl leading-tight'
                    }`}>
                      {t(ods.title)}
                    </h3>

                    <p className={`text-[#e5decf]/80 font-light leading-relaxed ${
                      isHero ? 'text-xs sm:text-[13px] line-clamp-2' : 'text-xs line-clamp-2'
                    }`}>
                      {t(ods.desc)}
                    </p>

                    <div className="pt-2.5 border-t border-white/15 flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif text-lg sm:text-xl text-[#a9bd6f] font-normal leading-none">
                          {ods.metric}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-[#e5decf]/70 font-sans font-light">
                          {t(ods.metricLabel)}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-xs text-[#f5efe3] group-hover:text-[#a9bd6f] transition-colors duration-300 font-sans">
                        <span>{t({ es: 'Explorar', en: 'Explore' })}</span>
                        <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ─── SALVAGUARDAS TRANSVERSALES (ODS 1, 5, 10) ─── */}
          <div className="mt-20 pt-12 border-t border-[#d8ceb6]/70">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#7a6e58] font-sans">
                {t({ es: 'Enfoque de Equidad Social', en: 'Social Equity Framework' })}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light">
                {t({ es: 'Salvaguardas', en: 'Transversal' })}{' '}
                <span className="italic text-[#4a5a22] font-normal">
                  {t({ es: 'transversales del Consejo.', en: 'safeguards of the Council.' })}
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {transversales.map((item) => (
                <div
                  key={item.num}
                  className="bg-[#eae4d2]/60 rounded-2xl p-6 border border-[#d8ceb6] shadow-sm hover:border-[#4a5a22]/50 transition-colors duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#4a5a22] font-medium tracking-wider">
                        ODS {item.num}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#7a6e58]">
                        {t(item.concept)}
                      </span>
                    </div>
                    <h4 className="font-serif text-xl text-[#2d2618]">
                      {t(item.title)}
                    </h4>
                    <p className="text-xs text-[#635741] font-light leading-relaxed">
                      {t(item.desc)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── RUTA DE RENDICIÓN DE CUENTAS (01 AL 04) ─── */}
          <div className="mt-20 pt-12 border-t border-[#d8ceb6]/70">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#7a6e58] font-sans">
                {t({ es: 'Metodología & Rigor', en: 'Methodology & Rigor' })}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light">
                {t({ es: 'Cadena de custodia y', en: 'Chain of custody and' })}{' '}
                <span className="italic text-[#4a5a22] font-normal">
                  {t({ es: 'trazabilidad científica.', en: 'scientific traceability.' })}
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {methodSteps.map((step) => (
                <div
                  key={step.num}
                  className="bg-[#f0ebd9] rounded-xl p-5 border border-[#d8ceb6]/80 flex flex-col justify-between"
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
              {t({ es: 'Un marco vivo que se traduce', en: 'A living framework that becomes' })} <br />
              <span className="italic text-[#4a5a22] font-normal">
                {t({ es: 'en proyectos y territorio.', en: 'projects and territory.' })}
              </span>
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/lineas-estrategicas"
                className="inline-flex items-center gap-2.5 bg-[#4a5a22] hover:bg-[#5a6b2a] text-[#f5efe3] rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.14em] font-medium transition-all duration-300 cursor-pointer"
              >
                <span>{t({ es: 'Líneas estratégicas', en: 'Strategic lines' })}</span>
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

      {/* ─── EXPERIENCIA INMERSIVA FULLSCREEN CON VIDEO DE FONDO Y TRANSICIÓN SEDOSA ─── */}
      <AnimatePresence>
        {activeOds && (
          <motion.div
            id="ods-immersion-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] flex flex-col justify-between overflow-y-auto bg-[#0a0d0a] text-slate-100 transform-gpu"
          >
            {/* Fondo Cinemático: Crossfade sedoso entre videos sin vibración de escala */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
              <AnimatePresence mode="sync">
                <motion.div
                  key={activeOds.videoSrc || activeOds.img}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full"
                >
                  {activeOds.mediaType === 'video' ? (
                    <video
                      src={activeOds.videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={activeOds.img}
                      alt={t(activeOds.title)}
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Gradiente Orgánico de Fondo */}
            <div className="fixed inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/35 pointer-events-none z-10" />

            {/* ─── TOP BAR: SELECTOR RÁPIDO + BOTÓN CERRAR ─── */}
            <div className="relative z-20 w-full px-6 sm:px-12 md:px-16 py-7 flex items-center justify-between pointer-events-auto">
              <div className="w-8 sm:w-16" />

              {/* Selector Rápido de ODS en Desktop */}
              <div className="hidden lg:flex items-center gap-1.5 bg-black/40 p-1.5 rounded-full border border-white/15 backdrop-blur-md">
                {odsList.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveOdsIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-sans transition-all duration-300 cursor-pointer ${
                      activeOdsIndex === idx
                        ? 'bg-white/25 text-white font-medium border border-white/30 shadow-sm'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    ODS {item.num}
                  </button>
                ))}
              </div>

              {/* Botón Cerrar */}
              <button
                onClick={() => setActiveOdsIndex(null)}
                className="group inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 bg-black/50 hover:bg-[#f5efe3] text-[#f5efe3] hover:text-[#2d2618] backdrop-blur-xl border border-white/25 hover:border-[#f5efe3] text-[11px] font-sans font-semibold uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.96] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] cursor-pointer"
                aria-label={t({ es: 'Cerrar inmersión', en: 'Close immersion' })}
              >
                <span>{t({ es: 'Cerrar', en: 'Close' })}</span>
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white/15 group-hover:bg-[#2d2618]/10 transition-colors">
                  <svg className="w-2.5 h-2.5 transition-transform duration-300 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
              </button>
            </div>

            {/* ─── CUERPO INMERSIVO EDITORIAL NÍTIDO Y ESTABLE ─── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeOds.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative z-20 max-w-6xl mx-auto w-full px-6 sm:px-12 md:px-16 py-12 md:py-16 flex-1 flex flex-col justify-end"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
                  {/* Columna Izquierda: Título y Síntesis */}
                  <div className="lg:col-span-7 space-y-5">
                    <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-tight leading-[1.05]">
                      {t(activeOds.title)}
                    </h2>

                    <p className="font-serif text-lg sm:text-xl text-[#d8ceb6] font-light italic leading-snug">
                      &ldquo;{t(activeOds.tagline)}&rdquo;
                    </p>

                    <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-xl font-sans">
                      {t(activeOds.desc)}
                    </p>

                    <div className="pt-3 flex flex-wrap items-center gap-4">
                      <Link
                        to="/proyectos"
                        onClick={() => setActiveOdsIndex(null)}
                        className="inline-flex items-center gap-2 py-3 px-7 rounded-full bg-[#f5efe3] hover:bg-white text-[#2d2618] font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl group cursor-pointer"
                      >
                        <div>{t({ es: 'Ver Proyectos Territoriales', en: 'View Territorial Projects' })}</div>
                        <div className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</div>
                      </Link>

                      {/* Controles Anterior / Siguiente en Mobile */}
                      <div className="flex items-center gap-2 lg:hidden">
                        <button
                          type="button"
                          onClick={handlePrevOds}
                          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 transition-all flex items-center justify-center cursor-pointer active:scale-95"
                          title={t({ es: 'Anterior', en: 'Previous' })}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={handleNextOds}
                          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 transition-all flex items-center justify-center cursor-pointer active:scale-95"
                          title={t({ es: 'Siguiente', en: 'Next' })}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Columna Derecha: Métricas y Entregables en Territorio */}
                  <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-white/15 lg:pl-10">
                    {/* Métrica de Impacto */}
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                      <div className="font-serif text-4xl sm:text-5xl text-[#f5efe3] font-light mb-1">
                        {activeOds.metric}
                      </div>
                      <div className="text-xs text-[#a9bd6f] font-mono tracking-wide">
                        {t(activeOds.metricLabel)}
                      </div>
                    </div>

                    {/* Acciones Clave */}
                    <div className="space-y-2.5">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#d8ceb6] font-semibold">
                        {t({ es: 'Acciones clave en territorio:', en: 'Key territorial actions:' })}
                      </div>
                      {activeOds.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs text-slate-300 font-light leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#a9bd6f] mt-1.5 shrink-0" />
                          <span>{t(item)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-white/10 text-xs text-slate-400 font-light flex items-center justify-between">
                      <span>
                        <span className="text-[#d8ceb6] font-medium">{t({ es: 'Eje:', en: 'Pillar:' })}</span> {t(activeOds.categoryLabel)}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">
                        {activeOdsIndex + 1} / {odsList.length}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FOOTER ─── */}
      <FooterNav />
    </div>
  );
}
