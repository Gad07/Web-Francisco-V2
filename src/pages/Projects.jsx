import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { useI18n } from '../i18n/index.jsx';

export default function Projects() {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const EASE = [0.22, 1, 0.36, 1];

  const projects = [
    {
      id: '01',
      code: 'P-01',
      category: 'emblematico',
      status: {
        es: 'Proyecto Emblemático',
        en: 'Flagship Project',
      },
      title: {
        es: 'Territorios que Alimentan: Gobernanza Ambiental para el Hambre Cero',
        en: 'Territories that Nourish: Environmental Governance for Zero Hunger',
      },
      shortTitle: {
        es: 'Territorios que Alimentan',
        en: 'Territories that Nourish',
      },
      subtitle: {
        es: 'Conservación Lacustre, Biodiversidad y Seguridad Alimentaria · Reconocimiento WESS 2026',
        en: 'Lake Conservation, Biodiversity & Food Security · WESS 2026 Recognition',
      },
      location: {
        es: 'ANP Ejidos de Xochimilco y San Gregorio Atlapulco, Ciudad de México',
        en: 'Xochimilco & San Gregorio Atlapulco Protected Area, Mexico City',
      },
      period: {
        es: '2023–2026 · Actividades documentadas 2023 y 2024',
        en: '2023–2026 · Documented activities in 2023 & 2024',
      },
      direction: {
        es: 'Mtro. Luis D. García González y Mtro. Francisco Solorio',
        en: 'Mtro. Luis D. García González & Mtro. Francisco Solorio',
      },
      desc: {
        es: 'Iniciativa emblemática del CGA que articula educación ambiental, conservación de la biodiversidad lacustre, participación comunitaria y seguridad alimentaria, fortaleciendo el vínculo vital entre las comunidades, los humedales y los sistemas productivos tradicionales de chinampas.',
        en: 'CGA flagship initiative linking environmental education, lake biodiversity conservation, community engagement and food security, strengthening the vital bond between local communities, wetlands and traditional chinampa farming systems.',
      },
      challenge: {
        es: 'Presión urbana sobre el suelo de conservación lacustre, degradación de canales tradicionales, pérdida de germoplasma criollo y acumulación de residuos vegetales posfestividad.',
        en: 'Urban pressure on conservation wetlands, degradation of traditional channels, loss of heirloom seed germplasm and accumulation of post-festival plant waste.',
      },
      solution: {
        es: 'Implementación de módulos biointensivos agroecológicos, banco comunitario de semillas criollas, campañas de acopio y compostaje de cempasúchil, y talleres formativos en campo.',
        en: 'Deployment of agroecological biointensive modules, community heirloom seed banks, marigold composting drives and on-site educational workshops.',
      },
      metrics: [
        {
          val: '6,890+',
          label: { es: 'Personas de alcance directo documentadas', en: 'Documented direct reach' },
        },
        {
          val: '1,500',
          label: { es: 'Semillas nativas resguardadas (50 especies)', en: 'Native seeds preserved across 50 species' },
        },
        {
          val: '557 kg',
          label: { es: 'Residuos orgánicos valorizados en composta', en: 'Organic waste composted' },
        },
        {
          val: '620',
          label: { es: 'Plantas de cempasúchil acopiadas', en: 'Marigold plants collected post-festival' },
        },
      ],
      deliverables: [
        {
          es: 'Alcance documentado de 6,890 participantes en talleres de divulgación ambiental y agroecología.',
          en: 'Documented reach of 6,890 participants in environmental outreach and agroecology workshops.',
        },
        {
          es: 'Banco de germoplasma con aprox. 1,500 semillas de 50 especies endémicas del Eje Neovolcánico Transversal.',
          en: 'Germplasm bank safeguarding approx. 1,500 seeds across 50 endemic species of the Trans-Mexican Volcanic Belt.',
        },
        {
          es: 'Campaña de acopio de 620 plantas y valorización de 44.14 m³ de biomasa para su reintegración a suelos.',
          en: 'Collection campaign of 620 plants and processing of 44.14 m³ of biomass for soil reintegration.',
        },
        {
          es: 'Vinculación técnica con 8 instituciones nacionales y 6 internacionales para transferencia biocultural.',
          en: 'Technical cooperation with 8 national and 6 international institutions for biocultural transfer.',
        },
      ],
      ods: [
        'ODS 2 · Hambre Cero',
        'ODS 4 · Educación de Calidad (4.7)',
        'ODS 6 · Agua Limpia (6.6)',
        'ODS 11 · Comunidades Sostenibles (11.7)',
        'ODS 12 · Consumo Responsable (12.5)',
        'ODS 15 · Ecosistemas Terrestres (15.1)',
      ],
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1400&h=900&fit=crop&auto=format',
          caption: { es: 'Humedales y parcelas chinamperas en Xochimilco', en: 'Wetlands and chinampa farming plots in Xochimilco' },
        },
        {
          url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1400&h=900&fit=crop&auto=format',
          caption: { es: 'Resguardo y germinación de semillas nativas', en: 'Native seed preservation and germination' },
        },
      ],
    },
    {
      id: '02',
      code: 'P-02',
      category: 'desarrollo',
      status: {
        es: 'En Desarrollo',
        en: 'In Development',
      },
      title: {
        es: 'Agendas Ambientales Estatales y Gobernanza Subnacional',
        en: 'State Environmental Agendas & Subnational Governance',
      },
      shortTitle: {
        es: 'Agendas Ambientales Estatales',
        en: 'State Environmental Agendas',
      },
      subtitle: {
        es: 'Planeación de Política Pública Subnacional · Homologación Regulatoria',
        en: 'Subnational Public Policy Planning · Regulatory Harmonization',
      },
      location: {
        es: 'Entidades Federativas de México (Ámbito Subnacional)',
        en: 'Mexican States and Subnational Territories',
      },
      period: {
        es: 'Fase de formulación técnica 2024–2026',
        en: 'Technical formulation phase 2024–2026',
      },
      direction: {
        es: 'Consejo Global Ambiental · Coordinación Técnica de Gobernanza',
        en: 'Global Environmental Council · Governance Technical Coordination',
      },
      desc: {
        es: 'Diseño de diagnósticos territoriales, prioridades de intervención y hojas de ruta para robustecer la planeación, presupuesto e indicadores de gobernanza ambiental ante los tres órdenes de gobierno en México.',
        en: 'Design of territorial diagnoses, intervention priorities and roadmaps to strengthen environmental planning, budgets and governance indicators across all three tiers of government in Mexico.',
      },
      challenge: {
        es: 'Dispersión normativa entre estados, debilidad técnica en presupuestos ambientales locales y ausencia de indicadores homologados de seguimiento a compromisos climáticos.',
        en: 'Normative fragmentation among states, technical gaps in local environmental budgeting and absence of standardized indicators tracking climate pledges.',
      },
      solution: {
        es: 'Modelos estandarizados de diagnóstico subnacional, baterías de indicadores institucionales y mesas de trabajo técnico con congresos y dependencias de medio ambiente.',
        en: 'Standardized subnational diagnostic models, institutional indicator batteries and technical roundtables with congresses and environmental agencies.',
      },
      metrics: [
        {
          val: '100%',
          label: { es: 'Alineación con metas climáticas nacionales', en: 'Alignment with national climate targets' },
        },
        {
          val: '32',
          label: { es: 'Entidades federativas bajo análisis', en: 'Federal states analyzed' },
        },
        {
          val: 'Norma',
          label: { es: 'Homologación de criterios regulatorios', en: 'Regulatory criteria harmonization' },
        },
        {
          val: '0',
          label: { es: 'Resultados no acreditados anticipadamente', en: 'Unverified premature claims' },
        },
      ],
      deliverables: [
        {
          es: 'Modelos de diagnóstico y planeación de política pública subnacional por biorregión.',
          en: 'Subnational public policy diagnosis and planning models per bioregion.',
        },
        {
          es: 'Matriz de indicadores de desempeño ambiental y gobernanza transparente para entidades.',
          en: 'Performance indicator matrix and transparent governance framework for states.',
        },
        {
          es: 'Propuesta de hojas de ruta regulatorias ante comisiones legislativas locales.',
          en: 'Proposed regulatory roadmaps presented to local legislative committees.',
        },
      ],
      ods: [
        'ODS 13 · Acción por el Clima (13.2)',
        'ODS 16 · Instituciones Sólidas (16.7)',
        'ODS 17 · Alianzas para Lograr los Objetivos',
      ],
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1400&h=900&fit=crop&auto=format',
          caption: { es: 'Mesas técnicas de deliberación de política pública ambiental', en: 'Environmental public policy technical roundtables' },
        },
        {
          url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&h=900&fit=crop&auto=format',
          caption: { es: 'Cartografía territorial y análisis de riesgos climáticos', en: 'Territorial cartography and climate risk analysis' },
        },
      ],
    },
    {
      id: '03',
      code: 'P-03',
      category: 'desarrollo',
      status: {
        es: 'En Desarrollo',
        en: 'In Development',
      },
      title: {
        es: 'Estrategias de Sostenibilidad y Gobernanza ESG',
        en: 'Sustainability Strategies & ESG Governance',
      },
      shortTitle: {
        es: 'Gobernanza y Sostenibilidad ESG',
        en: 'ESG Governance & Sustainability',
      },
      subtitle: {
        es: 'Transición Corporativa · Debida Diligencia Ambiental y Gestión de Riesgos',
        en: 'Corporate Transition · Environmental Due Diligence & Risk Management',
      },
      location: {
        es: 'México · Redes Empresariales y Organizacionales',
        en: 'Mexico · Corporate & Organizational Networks',
      },
      period: {
        es: 'Fase de diseño institucional 2025–2026',
        en: 'Institutional design phase 2025–2026',
      },
      direction: {
        es: 'Consejo Global Ambiental · Área de Sostenibilidad y ESG',
        en: 'Global Environmental Council · Sustainability & ESG Division',
      },
      desc: {
        es: 'Asistencia técnica a organizaciones e industrias para incorporar criterios ambientales, sociales y de gobernanza (ESG) en sus modelos operativos y cadenas de valor, previniendo riesgos ecológicos y erradicando el lavado verde.',
        en: 'Technical assistance to organizations and industries to incorporate environmental, social and governance (ESG) criteria into operating models and value chains, curbing ecological risks and preventing greenwashing.',
      },
      challenge: {
        es: 'Adopción de compromisos cosméticos sin métricas comprobables, debilidad en la trazabilidad de cadenas de suministro y exposición a sanciones por incumplimiento ambiental.',
        en: 'Adoption of cosmetic green pledges without verifiable metrics, opaque supply chains and high exposure to regulatory penalties.',
      },
      solution: {
        es: 'Metodologías de diagnóstico de riesgo climático, hojas de ruta de descarbonización basadas en ciencia y capacitación directiva en debida diligencia ambiental.',
        en: 'Climate risk diagnostic tools, science-based decarbonization roadmaps and executive leadership training in environmental due diligence.',
      },
      metrics: [
        {
          val: 'ESG',
          label: { es: 'Metodología homologada a estándares globales', en: 'Global standardized methodology' },
        },
        {
          val: '100%',
          label: { es: 'Trazabilidad y rigor documental', en: 'Traceability & documentary rigour' },
        },
        {
          val: '0%',
          label: { es: 'Tolerancia al lavado verde de imagen', en: 'Zero tolerance for greenwashing' },
        },
        {
          val: 'CO₂',
          label: { es: 'Rutas de transición y eficiencia energética', en: 'Transition roadmaps and energy efficiency' },
        },
      ],
      deliverables: [
        {
          es: 'Metodologías de diagnóstico de riesgo ambiental y debida diligencia en cadenas de valor.',
          en: 'Environmental risk assessment and supply-chain due diligence methodologies.',
        },
        {
          es: 'Módulos ejecutivos de capacitación en gobernanza y sostenibilidad corporativa.',
          en: 'Executive training modules in governance and corporate sustainability.',
        },
        {
          es: 'Guías de reporte no financiero y alineación con taxonomías sostenibles.',
          en: 'Non-financial reporting frameworks aligned with sustainable taxonomies.',
        },
      ],
      ods: [
        'ODS 12 · Producción y Consumo Responsables (12.6)',
        'ODS 13 · Acción por el Clima (13.2)',
        'ODS 17 · Alianzas para Lograr los Objetivos',
      ],
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&h=900&fit=crop&auto=format',
          caption: { es: 'Sostenibilidad corporativa y arquitectura bioclimática', en: 'Corporate sustainability and bioclimatic design' },
        },
        {
          url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1400&h=900&fit=crop&auto=format',
          caption: { es: 'Eficiencia energética y transición hacia energías limpias', en: 'Energy efficiency and clean transition' },
        },
      ],
    },
    {
      id: '04',
      code: 'P-04',
      category: 'desarrollo',
      status: {
        es: 'Política Pública',
        en: 'Public Policy',
      },
      title: {
        es: 'Reinserción Socioambiental',
        en: 'Socio-Environmental Reintegration',
      },
      shortTitle: {
        es: 'Reinserción Socioambiental',
        en: 'Socio-Environmental Reintegration',
      },
      subtitle: {
        es: 'Propuesta de Política Pública · Enfoque de Derechos y Restitución del Tejido Social',
        en: 'Public Policy Proposal · Human Rights-Based Framework',
      },
      location: {
        es: 'Centros de Reinserción Social CDMX y Zona Metropolitana',
        en: 'Correctional Centers in Mexico City & Metropolitan Area',
      },
      period: {
        es: 'Propuesta institucional 2026 · Vinculación activa',
        en: 'Institutional proposal 2026 · Active linkage',
      },
      direction: {
        es: 'Lic. Verónica González — Dirección Nacional de Proyectos',
        en: 'Lic. Verónica González — National Projects Directorate',
      },
      desc: {
        es: 'Planteamiento de política pública para integrar educación ambiental, producción de plantas nativas en huertos agroecológicos y procesos de reinserción social, empleando el cuidado de la naturaleza como palanca de restitución social y salud comunitaria.',
        en: 'Public policy proposal integrating environmental education, native plant propagation in agroecological gardens and social reintegration, utilizing nature stewardship as a driver of community restoration and mental health.',
      },
      challenge: {
        es: 'Falta de programas técnicos con valor ecológico en centros penitenciarios y desvinculación entre rehabilitación social y preservación de los ecosistemas urbanos.',
        en: 'Scarcity of technical programs with ecological value in correctional facilities and disconnection between rehabilitation and urban ecosystem care.',
      },
      solution: {
        es: 'Instalación de viveros forestales y módulos de bioinsumos en centros penitenciarios, con certificación en oficios verdes y respeto estricto a los derechos humanos.',
        en: 'Installation of forestry nurseries and bio-input modules in correctional facilities, certified in green trades with strict human rights adherence.',
      },
      metrics: [
        {
          val: '1º',
          label: { es: 'Modelo integral formulado en su tipo', en: 'First comprehensive model of its kind formulated' },
        },
        {
          val: 'Bio',
          label: { es: 'Producción de plantas para reforestación', en: 'Native plant production for reforestation' },
        },
        {
          val: '100%',
          label: { es: 'Participación voluntaria y digna', en: 'Voluntary & dignified participation' },
        },
        {
          val: 'Oficio',
          label: { es: 'Capacitación en técnicas agroecológicas', en: 'Agroecological technical training' },
        },
      ],
      deliverables: [
        {
          es: 'Planteamiento de modelo de intervención socioambiental y currícula pedagógica.',
          en: 'Socio-environmental intervention model design and educational curriculum.',
        },
        {
          es: 'Protocolos de salvaguarda de derechos humanos y pertinencia de actividades en reclusión.',
          en: 'Human rights safeguard protocols and activity suitability in confinement.',
        },
        {
          es: 'Esquema de articulación interinstitucional con dependencias de seguridad y bienestar.',
          en: 'Interinstitutional cooperation scheme with security and social welfare departments.',
        },
      ],
      ods: [
        'ODS 4 · Educación de Calidad (4.7)',
        'ODS 15 · Vida de Ecosistemas Terrestres',
        'ODS 16 · Paz, Justicia e Instituciones Sólidas',
      ],
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1400&h=900&fit=crop&auto=format',
          caption: { es: 'Manos y tierra: vínculo restaurativo y dignidad comunitaria', en: 'Hands and soil: restorative connection and dignity' },
        },
        {
          url: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef2c6e1?w=1400&h=900&fit=crop&auto=format',
          caption: { es: 'Cultivo agroecológico y propagación de especies vegetales', en: 'Agroecological cultivation and plant propagation' },
        },
      ],
    },
    {
      id: '05',
      code: 'P-05',
      category: 'cooperacion',
      status: {
        es: 'Cooperación Bilateral',
        en: 'Bilateral Cooperation',
      },
      title: {
        es: 'Cooperación Ambiental Bilateral México–Canadá',
        en: 'Mexico–Canada Bilateral Environmental Cooperation',
      },
      shortTitle: {
        es: 'Cooperación México–Canadá',
        en: 'Mexico–Canada Cooperation',
      },
      subtitle: {
        es: 'Agenda de Vinculación Institucional · Restauración Ecológica y Resiliencia Urbana',
        en: 'Institutional Linkage Agenda · Ecological Restoration & Urban Resilience',
      },
      location: {
        es: 'Toronto, Ottawa y Montreal (Canadá) & México',
        en: 'Toronto, Ottawa and Montreal (Canada) & Mexico',
      },
      period: {
        es: 'Agenda de vinculación institucional 2026',
        en: 'Institutional linkage agenda 2026',
      },
      direction: {
        es: 'Consejo Global Ambiental / Council for Green Action',
        en: 'Global Environmental Council / Council for Green Action',
      },
      desc: {
        es: 'Agenda bilateral de diplomacia ambiental y diálogo técnico realizada en centros neurálgicos de Canadá para intercambiar metodologías en conservación urbana, adaptación climática basada en la naturaleza y gobernanza territorial entre actores mexicanos y canadienses.',
        en: 'Bilateral environmental diplomacy and technical dialogue agenda conducted in Canada to exchange methodologies in urban conservation, nature-based climate adaptation and territorial governance between Mexican and Canadian stakeholders.',
      },
      challenge: {
        es: 'Desconexión entre experiencias territoriales locales y redes de innovación ambiental en Norteamérica ante la crisis climática compartida.',
        en: 'Disconnect between local territorial initiatives and North American environmental innovation hubs facing shared climate crises.',
      },
      solution: {
        es: 'Mesas de trabajo, visitas de campo a infraestructuras verdes en Canadá y acuerdos para proyectos conjuntos de protección a ecosistemas compartidos.',
        en: 'Working roundtables, field inspections of green infrastructure in Canada and agreements for joint initiatives protecting shared biomes.',
      },
      metrics: [
        {
          val: '3',
          label: { es: 'Ciudades canadienses en agenda activa', en: 'Host Canadian cities in active agenda' },
        },
        {
          val: '2026',
          label: { es: 'Año de consolidación y misiones técnicas', en: 'Year of technical missions & consolidation' },
        },
        {
          val: 'Norte',
          label: { es: 'Diplomacia ambiental hemisférica', en: 'Hemispheric environmental diplomacy' },
        },
        {
          val: 'Bi',
          label: { es: 'Cooperación multisectorial activa', en: 'Active multisectoral cooperation' },
        },
      ],
      deliverables: [
        {
          es: 'Intercambio sistemático de metodologías de restauración lacustre y sostenibilidad urbana.',
          en: 'Systematic exchange of wetland restoration and urban sustainability methods.',
        },
        {
          es: 'Diálogo con actores de la sociedad civil, universidades y organismos bilaterales.',
          en: 'Dialogue with civil society, academic institutions and bilateral entities.',
        },
        {
          es: 'Protocolos de vinculación para financiamiento climático y proyectos conjuntos.',
          en: 'Linkage protocols for climate finance and collaborative initiatives.',
        },
      ],
      ods: [
        'ODS 11 · Ciudades y Comunidades Sostenibles (11.7)',
        'ODS 13 · Acción por el Clima',
        'ODS 17 · Alianzas para Lograr los Objetivos (17.17)',
      ],
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&h=900&fit=crop&auto=format',
          caption: { es: 'Corredores biológicos y cuencas compartidas en Norteamérica', en: 'Biological corridors and shared watersheds in North America' },
        },
        {
          url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1400&h=900&fit=crop&auto=format',
          caption: { es: 'Biodiversidad de montaña y resiliencia ecológica', en: 'Mountain biodiversity and ecological resilience' },
        },
      ],
    },
  ];

  const currentProject = projects[activeIndex];

  const handleNext = () => {
    setDirection(1);
    setActivePhotoIdx(0);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActivePhotoIdx(0);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleSelect = (idx) => {
    setDirection(idx > activeIndex ? 1 : -1);
    setActivePhotoIdx(0);
    setActiveIndex(idx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  // Rotación automática suave de fotografías del proyecto
  useEffect(() => {
    if (!currentProject.photos || currentProject.photos.length <= 1) return;
    const interval = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % currentProject.photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentProject]);

  return (
    <div className="w-full min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between selection:bg-[#4a5a22] selection:text-white">
      <div>
        {/* =================================================================
            HERO EDITORIAL
            ================================================================= */}
        <PageHero
          titleWhite={{ es: 'Programas y', en: 'Programs and' }}
          titleGreen={{ es: 'proyectos territoriales', en: 'territorial projects' }}
          description={{
            es: 'Los programas y proyectos del CGA articulan capacidades técnicas, conocimientos territoriales y cooperación multisectorial con transparencia y rigor.',
            en: 'CGA programs and projects articulate technical capacities, territorial knowledge and multisectoral cooperation with transparency and rigour.',
          }}
          bgImage="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&h=900&fit=crop&auto=format"
        />

        {/* =================================================================
            CATÁLOGO INTERACTIVO CON SELECTOR HORIZONTAL Y PANTALLA VISUAL
            ================================================================= */}
        <section className="pt-16 sm:pt-20 pb-24 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto w-full">
          
          {/* Cabecera de la Sección Centrada */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2d2618] font-light leading-[1.14]">
              {t({ es: 'Portafolio de iniciativas y', en: 'Portfolio of initiatives and' })}{' '}
              <span className="italic text-[#4a5a22] font-normal block sm:inline">
                {t({ es: 'agendas de desarrollo territorial.', en: 'territorial agendas.' })}
              </span>
            </h2>
          </div>

          {/* ─── SELECTOR EDITORIAL (ARQUITECTÓNICO, SIN CÁPSULAS) ─── */}
          <div className="mb-12 w-full border-b border-[#d8ceb6]">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0 w-full divide-x divide-[#d8ceb6]/40">
              {projects.map((proj, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => handleSelect(idx)}
                    className={`group relative text-left p-3.5 sm:p-4.5 transition-all duration-200 cursor-pointer border-b-2 -mb-[2px] ${
                      isActive
                        ? 'border-[#334215] bg-[#eae4d2]/60 text-[#2d2618]'
                        : 'border-transparent text-[#7a6e58] hover:text-[#2d2618] hover:bg-[#eae4d2]/25'
                    }`}
                  >
                    <span
                      className={`font-serif text-xs font-semibold tabular transition-colors block mb-1 ${
                        isActive ? 'text-[#334215]' : 'text-[#8c7e65] group-hover:text-[#4a5a22]'
                      }`}
                    >
                      {proj.id}
                    </span>
                    <span
                      className={`text-xs sm:text-[13px] transition-colors leading-snug block ${
                        isActive ? 'text-[#2d2618] font-semibold' : 'text-[#5c523e] font-normal group-hover:text-[#2d2618]'
                      }`}
                    >
                      {t(proj.shortTitle)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── FORMATO REVISTA CINEMATOGRÁFICA (FICHA TÉCNICA REDISEÑADA) ─── */}
          <div className="w-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.article
                key={currentProject.id}
                custom={direction}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="w-full space-y-12"
              >
                {/* 1. HERO FOTOGRÁFICO PANORÁMICO CON TÍTULO EN LA BASE */}
                <div className="relative rounded-3xl overflow-hidden border border-[#d8ceb6] shadow-xl min-h-[440px] sm:min-h-[500px] md:min-h-[540px] flex flex-col justify-end p-6 sm:p-10 md:p-12">
                  {/* Foto de fondo panorámica limpia */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentProject.photos[activePhotoIdx].url}
                      src={currentProject.photos[activePhotoIdx].url}
                      alt={t(currentProject.title)}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Degradado sutil ÚNICAMENTE en la base para dar contraste al texto */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(15,12,8,0.92) 0%, rgba(15,12,8,0.60) 30%, rgba(15,12,8,0.12) 52%, transparent 72%)',
                    }}
                  />

                  {/* Título y subtítulo integrados en la base del hero */}
                  <div className="relative z-10 space-y-3 max-w-4xl">
                    <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[50px] text-white font-normal leading-[1.08] drop-shadow-md">
                      {t(currentProject.title)}
                    </h3>

                    <p className="font-serif italic text-base sm:text-xl text-[#f0ead8] font-light max-w-3xl leading-snug drop-shadow-sm">
                      {t(currentProject.subtitle)}
                    </p>
                  </div>
                </div>

                {/* 2. FRANJA DE MÉTRICAS GIGANTES EN 4 COLUMNAS ABIERTAS */}
                <div className="py-8 sm:py-10 border-y border-[#d8ceb6] w-full">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {currentProject.metrics.map((m, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#334215] tabular font-normal leading-none">
                          {m.val}
                        </div>
                        <div className="text-xs uppercase tracking-[0.16em] text-[#7a6e58] font-medium leading-snug">
                          {t(m.label)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. COLUMNAS ABIERTAS EDITORIALES (NARRATIVA, RETO/SOLUCIÓN, ENTREGABLES) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                  
                  {/* Columna 1: Narrativa y Gobernanza (lg:col-span-5) */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#4a5a22] block">
                        {t({ es: 'Propósito y Enfoque Territorial', en: 'Purpose & Territorial Approach' })}
                      </span>
                      <p className="font-serif text-xl sm:text-2xl text-[#2d2618] font-light leading-snug">
                        {t(currentProject.desc)}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#d8ceb6]/80 space-y-2 text-xs text-[#5c523e] font-light">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a6e58] block">
                        {t({ es: 'Gobernanza y Liderazgo Institucional', en: 'Institutional Governance & Leadership' })}
                      </span>
                      <p className="text-sm text-[#2d2618] font-medium">
                        {t(currentProject.direction)}
                      </p>
                      <p className="text-xs text-[#6b6048]">
                        {t(currentProject.period)}
                      </p>
                    </div>
                  </div>

                  {/* Columna 2: Diagnóstico y Solución Aplicada (lg:col-span-4) */}
                  <div className="lg:col-span-4 space-y-8 lg:border-l lg:border-[#d8ceb6] lg:pl-10">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-700/80" />
                        <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#2d2618]">
                          {t({ es: 'Reto Territorial', en: 'Territorial Challenge' })}
                        </span>
                      </div>
                      <p className="text-sm text-[#5c523e] font-light leading-relaxed">
                        {t(currentProject.challenge)}
                      </p>
                    </div>

                    <div className="space-y-2 pt-6 border-t border-[#d8ceb6]/60">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#4a5a22]" />
                        <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#4a5a22]">
                          {t({ es: 'Solución CGA Aplicada', en: 'Applied CGA Solution' })}
                        </span>
                      </div>
                      <p className="text-sm text-[#5c523e] font-light leading-relaxed">
                        {t(currentProject.solution)}
                      </p>
                    </div>
                  </div>

                  {/* Columna 3: Entregables e Hitos Auditables (lg:col-span-3) */}
                  <div className="lg:col-span-3 space-y-4 lg:border-l lg:border-[#d8ceb6] lg:pl-8">
                    <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#4a5a22] block">
                      {t({ es: 'Entregables Auditables', en: 'Auditable Deliverables' })}
                    </span>
                    <ol className="space-y-4 divide-y divide-[#d8ceb6]/60">
                      {currentProject.deliverables.map((d, i) => (
                        <li key={i} className={`flex items-start gap-3 ${i > 0 ? 'pt-4' : ''}`}>
                          <span className="shrink-0 font-serif text-sm font-semibold tabular text-[#4a5a22]">
                            {String(i + 1).padStart(2, '0')}.
                          </span>
                          <span className="text-xs text-[#5c523e] font-light leading-relaxed">
                            {t(d)}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>

                </div>

                {/* 4. FRANJA ODS EN TEXTO EDITORIAL ABIERTO (SIN CÁPSULAS) */}
                <div className="pt-6 border-t border-[#d8ceb6] flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#5c523e] w-full">
                  <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#4a5a22] shrink-0">
                    {t({ es: 'Correspondencia ODS:', en: 'SDG Correspondence:' })}
                  </span>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    {currentProject.ods.map((o, idx) => (
                      <React.Fragment key={idx}>
                        <span className="font-sans font-medium text-[#2d2618]">
                          {o}
                        </span>
                        {idx < currentProject.ods.length - 1 && (
                          <span className="text-[#a89d84] font-light select-none">&middot;</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* =================================================================
              CIERRE EDITORIAL: ENLACE A LÍNEAS ESTRATÉGICAS Y AGENDA 2030
              ================================================================= */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#2d2618] text-[#f5efe3] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-2 max-w-2xl text-center md:text-left">
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#cdd2a6]">
                {t({ es: 'Rendición de Cuentas y Metodología', en: 'Accountability & Methodology' })}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light leading-snug">
                {t({
                  es: 'Proyectos que convierten diagnósticos en resultados verificables',
                  en: 'Projects turning assessments into auditable field results',
                })}
              </h3>
              <p className="text-sm text-[#d8d2c2]/80 font-light leading-relaxed">
                {t({
                  es: 'Consulta las 10 Líneas Estratégicas institucionales o revisa la correspondencia detallada con las metas de la Agenda 2030 de Naciones Unidas.',
                  en: 'Explore the 10 Institutional Strategic Lines or examine the detailed correspondence with United Nations Agenda 2030 targets.',
                })}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <Link
                to="/agenda-2030"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#4a5a22] hover:bg-[#5a6b2a] text-[#f5efe3] font-sans font-semibold text-xs tracking-wider uppercase transition-all shadow-md text-center flex items-center justify-center gap-2"
              >
                <span>{t({ es: 'Ver Resultados ODS', en: 'View SDG Results' })}</span>
                <span className="text-sm">&rarr;</span>
              </Link>
              <Link
                to="/lineas-estrategicas"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#f5efe3] font-sans font-semibold text-xs tracking-wider uppercase transition-all border border-white/20 text-center"
              >
                <span>{t('nav.lineasEstrategicas')}</span>
              </Link>
            </div>
          </div>

        </section>
      </div>

      <FooterNav />
    </div>
  );
}
