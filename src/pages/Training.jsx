import React, { useState } from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import Reveal from '../components/Reveal.jsx';
import { useI18n } from '../i18n/index.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const EASE_LUX = [0.16, 1, 0.3, 1];

export default function Training() {
  const { t } = useI18n();
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

  const tabs = [
    { id: 'oferta', label: { es: 'Oferta Académica', en: 'Academic Overview' } },
    { id: 'diplomados', label: { es: 'Diplomados', en: 'Diplomas' } },
    { id: 'cursos', label: { es: 'Cursos & Talleres', en: 'Workshops' } },
    { id: 'webinars', label: { es: 'Conferencias', en: 'Conferences' } },
    { id: 'organizaciones', label: { es: 'Organizaciones', en: 'Organizations' } },
    { id: 'especialistas', label: { es: 'Especialistas', en: 'Specialists' } },
    { id: 'calendario', label: { es: 'Calendario', en: 'Calendar' } },
    { id: 'inscripciones', label: { es: 'Inscripciones', en: 'Admissions' } },
  ];

  const stats = [
    { value: '1,450+', label: { es: 'Líderes formados en 18 países', en: 'Graduates across 18 countries' } },
    { value: '94%', label: { es: 'Impacto directo en políticas territoriales', en: 'Direct impact on territorial policies' } },
    { value: '35+', label: { es: 'Catedráticos y científicos internacionales', en: 'International professors & scientists' } },
    { value: '100%', label: { es: 'Acreditación con validez institucional CGA', en: 'CGA institutional accreditation' } },
  ];

  const diplomados = [
    {
      id: 'dip-gobernanza',
      title: {
        es: 'Diplomado Internacional en Gobernanza Socioambiental y Biocultural',
        en: 'International Diploma in Socio-Environmental and Biocultural Governance',
      },
      duration: '140 horas lectivas · 5 meses · Modalidad Híbrida',
      dates: 'Convocatoria Abierta · Inicio: 12 de Mayo de 2026',
      badge: 'Certificación Internacional CGA Ginebra / México',
      desc: {
        es: 'Programa insignia diseñado para capacitar a tomadores de decisiones, líderes territoriales y gestores en la articulación de la Agenda 2030, resolución de controversias ecológicas y gobernanza de cuencas.',
        en: 'Flagship program designed to train policymakers, territorial leaders and managers in articulating Agenda 2030, resolving ecological disputes and watershed governance.',
      },
      target: {
        es: 'Dirigido a funcionarios públicos, directores de sustentabilidad, líderes ejidales e investigadores.',
        en: 'For public officials, sustainability directors, community leaders and researchers.',
      },
      modules: [
        'Módulo I: Gobernanza Territorial Multiescalar y Diplomacia Ambiental',
        'Módulo II: Restauración Ecológica y Conectividad de Corredores Biológicos',
        'Módulo III: Instrumentos Jurídicos Internacionales y Consulta Previa (C169 OIT)',
        'Módulo IV: Soberanía Alimentaria y Resguardo Biocultural de Semillas',
        'Módulo V: Proyecto Integrador de Aplicación Territorial In-Situ',
      ],
    },
    {
      id: 'dip-satelital',
      title: {
        es: 'Diplomado en Monitoreo Satelital, IA y Tecnologías para la Conservación',
        en: 'Diploma in Satellite Monitoring, AI and Conservation Technologies',
      },
      duration: '120 horas lectivas · 4 meses · Modalidad 100% Virtual con Laboratorios GIS',
      dates: 'Inicio: 1 de Junio de 2026',
      badge: 'Acreditación Científica & GIS Lab',
      desc: {
        es: 'Capacitación técnica avanzada en teledetección multiespectral (Sentinel, Landsat, Planet), algoritmos de inteligencia artificial para detección temprana de deforestación e inventarios de carbono forestal.',
        en: 'Advanced technical training in multispectral remote sensing (Sentinel, Landsat, Planet), AI algorithms for early deforestation detection and forest carbon inventories.',
      },
      target: {
        es: 'Biólogos, ingenieros ambientales, analistas geoespaciales y brigadas de vigilancia forestal.',
        en: 'Biologists, environmental engineers, geospatial analysts and forest rangers.',
      },
      modules: [
        'Módulo I: Fundamentos de Teledetección y Sensores Ópticos / Radar (SAR)',
        'Módulo II: Procesamiento Digital de Imágenes en Google Earth Engine y QGIS',
        'Módulo III: Modelos de Inteligencia Artificial aplicados a Biomas Críticos',
        'Módulo IV: Sistemas de Alerta Temprana y Reportes para Guardabosques',
      ],
    },
    {
      id: 'dip-agua',
      title: {
        es: 'Diplomado en Gestión Integral del Agua y Resiliencia Hídrica Urbana',
        en: 'Diploma in Integrated Water Management and Urban Water Resilience',
      },
      duration: '110 horas lectivas · 4 meses · Modalidad Híbrida',
      dates: 'Inicio: 15 de Agosto de 2026',
      badge: 'Especialidad de Cuenca Hidrográfica',
      desc: {
        es: 'Metodologías de vanguardia para la regeneración de acuíferos, cosecha pluvial a gran escala, diseño de infraestructura verde y gobernanza democrática de cuencas frente a la crisis climática.',
        en: 'Cutting-edge methodologies for aquifer regeneration, large-scale rainwater harvesting, green infrastructure design and democratic watershed governance.',
      },
      target: {
        es: 'Operadores de organismos de agua, urbanistas, consultores ambientales y líderes civiles.',
        en: 'Water utility operators, urban planners, environmental consultants and civil leaders.',
      },
      modules: [
        'Módulo I: Hidrología de Cuencas y Dinámica de Acuíferos Sobreexplotados',
        'Módulo II: Infraestructura Verde y Soluciones Basadas en la Naturaleza (SbN)',
        'Módulo III: Economía Circular del Agua, Tratamiento Descentralizado y Reúso',
        'Módulo IV: Marco Regulatorio, Derecho Humano al Agua y Tarifas Equitativas',
      ],
    },
    {
      id: 'dip-finanzas',
      title: {
        es: 'Diplomado en Finanzas Climáticas, Taxonomía Verde y Mercados de Biodiversidad',
        en: 'Diploma in Climate Finance, Green Taxonomy and Biodiversity Credits',
      },
      duration: '100 horas lectivas · 3.5 meses · Modalidad Virtual en Vivo',
      dates: 'Inicio: 7 de Septiembre de 2026',
      badge: 'Certificación en Criterios ESG / Fondos Verdes',
      desc: {
        es: 'Estructuración de bonos verdes, créditos de carbono de alta integridad, métricas de biodiversidad e inversión de impacto alineada con los estándares de la Unión Europea y el Banco Mundial.',
        en: 'Structuring green bonds, high-integrity carbon credits, biodiversity metrics and impact investing aligned with EU and World Bank standards.',
      },
      target: {
        es: 'Analistas financieros, gestores de fondos, ejecutivos de sostenibilidad y asesores de políticas.',
        en: 'Financial analysts, fund managers, sustainability executives and policy advisors.',
      },
      modules: [
        'Módulo I: Arquitectura Financiera Global del Clima (Fondo Verde, BID, BM)',
        'Módulo II: Mercados de Carbono Voluntario y Regulado (Artículo 6 Acuerdo de París)',
        'Módulo III: Créditos Bioculturales y Métricas de Conservación Marina y Terrestre',
        'Módulo IV: Auditoría, Trazabilidad Blockchain y Certificación de Proyectos',
      ],
    },
  ];

  const cursos = [
    {
      title: { es: 'Taller de Bancos Comunitarios de Semillas Nativas', en: 'Community Native Seed Banks Workshop' },
      hours: '30 horas · Presencial en Campo',
      dates: '19 - 23 Junio 2026',
      desc: { es: 'Protocolos de recolección botánica, pruebas de viabilidad, almacenamiento hermético y resguardo ante sequías prolongadas.', en: 'Botanical collection protocols, viability testing, hermetic storage and drought resilience.' },
      instructor: 'Dra. María Soledad Albarrán',
    },
    {
      title: { es: 'Curso de Medición de Huella de Carbono y GHG Protocol', en: 'Carbon Footprint Measurement & GHG Protocol Course' },
      hours: '40 horas · Virtual en Vivo',
      dates: '6 - 17 Julio 2026',
      desc: { es: 'Cálculo de emisiones Alcance 1, 2 y 3 para organizaciones, cadenas de suministro y planes de descarbonización neta.', en: 'Scope 1, 2 and 3 emissions calculation for organizations, supply chains and net-zero plans.' },
      instructor: 'Dr. Marcus Thorne',
    },
    {
      title: { es: 'Taller de Negociación, Mediación y Consulta Previa Indígena', en: 'Negotiation, Mediation & Indigenous Prior Consultation Workshop' },
      hours: '35 horas · Híbrido',
      dates: '10 - 15 Agosto 2026',
      desc: { es: 'Aplicación práctica de los estándares internacionales de consentimiento libre, previo e informado para megaproyectos.', en: 'Practical application of international free, prior and informed consent standards for major projects.' },
      instructor: 'Dr. Julien de Saint-Germain',
    },
    {
      title: { es: 'Curso de Bioeconomía Circular y Regeneración de Suelos', en: 'Circular Bioeconomy & Soil Regeneration Course' },
      hours: '30 horas · Presencial / Virtual',
      dates: '21 - 26 Septiembre 2026',
      desc: { es: 'Microbiología de suelos, compostaje industrial, bioinsumos agrícolas y valorización de biomasa residual.', en: 'Soil microbiology, industrial composting, agricultural bio-inputs and biomass valorization.' },
      instructor: 'Ing. Mateo Cárdenas',
    },
  ];

  const webinars = [
    {
      title: { es: 'Conferencia Magistral: La Voz de los Océanos en la Era del Antropoceno', en: 'Keynote: The Voice of the Oceans in the Anthropocene' },
      speaker: 'Dra. Elena Vance · Asesora Científica CGA Ginebra',
      date: '28 de Mayo, 2026 · 17:00 CET',
      type: 'Webinar Abierto · Transmisión Global',
      summary: { es: 'Análisis de la acidificación marina, zonas de oxígeno mínimo y el tratado global de alta mar.', en: 'Analysis of ocean acidification, oxygen minimum zones and the High Seas Treaty.' },
    },
    {
      title: { es: 'Panel Global: De la Soberanía Alimentaria a la Neutralidad de Carbono', en: 'Global Panel: From Food Sovereignty to Carbon Neutrality' },
      speaker: 'Delegados de WESS Ginebra, FAO y Líderes de Organizaciones Campesinas',
      date: '18 de Junio, 2026 · 16:00 CET',
      type: 'Mesa Redonda Multilateral',
      summary: { es: 'Experiencias de agroforestería comunitaria como sumideros de carbono y garantía de sustento.', en: 'Community agroforestry experiences as carbon sinks and livelihood security.' },
    },
    {
      title: { es: 'Coloquio Técnico: IA y Satélites al Servicio de los Guardianes de la Selva', en: 'Technical Colloquium: AI and Satellites Serving Forest Guardians' },
      speaker: 'Dr. Marcus Thorne & Laboratorio de Teledetección CGA',
      date: '9 de Julio, 2026 · 18:00 CET',
      type: 'Presentación de Casos de Éxito',
      summary: { es: 'Demostración en tiempo real de modelos neuronales detectando tala ilegal en la Selva Lacandona.', en: 'Real-time demonstration of neural networks detecting illegal logging in the Lacandon Forest.' },
    },
    {
      title: { es: 'Seminario Especial: Litigio Climático y Derechos de la Naturaleza', en: 'Special Seminar: Climate Litigation and Rights of Nature' },
      speaker: 'Dr. Julien de Saint-Germain & Juristas Internacionales',
      date: '27 de Agosto, 2026 · 17:30 CET',
      type: 'Seminario Jurídico Especializado',
      summary: { es: 'Precedentes vinculantes en cortes interamericanas y tribunales europeos sobre el ecocidio.', en: 'Binding precedents in Inter-American and European courts on ecocide.' },
    },
  ];

  const especialistas = [
    {
      name: 'Dr. Francisco Solorio',
      role: { es: 'Presidente del Consejo Directivo', en: 'President of the Board' },
      credentials: 'Dr. en Gobernanza Territorial y Políticas Públicas',
      expertise: { es: 'Liderazgo en diplomacia ambiental, conservación de biomas estratégicos y diseño de marcos de resolución de conflictos socioambientales.', en: 'Leadership in environmental diplomacy, biome conservation and socio-environmental conflict frameworks.' },
      origin: 'México / Suiza',
    },
    {
      name: 'Dra. María Soledad Albarrán',
      role: { es: 'Directora Académica y de Posgrados', en: 'Academic & Postgraduate Director' },
      credentials: 'Dra. en Ciencias Biológicas y Ecología del Paisaje',
      expertise: { es: 'Restauración biocultural de ecosistemas templados y tropicales, bancos de germoplasma y redes de custodia comunitaria de semillas.', en: 'Biocultural restoration of temperate/tropical biomes, germplasm banks and community seed stewardship.' },
      origin: 'Iberoamérica',
    },
    {
      name: 'Dr. Julien de Saint-Germain',
      role: { es: 'Catedrático de Derecho Ambiental Internacional', en: 'Professor of International Environmental Law' },
      credentials: 'LL.M. & Ph.D. en Derecho Internacional (Ginebra)',
      expertise: { es: 'Tratados multilaterales ambientales, derechos colectivos indígenas, litigio climático ante cortes supranacionales y gobernanza del agua.', en: 'Multilateral environmental treaties, collective indigenous rights, supranational climate litigation and water governance.' },
      origin: 'Suiza',
    },
    {
      name: 'Dra. Astrid Lindholm',
      role: { es: 'Directora del Laboratorio de Teledetección e IA', en: 'Director of Remote Sensing & AI Lab' },
      credentials: 'Ph.D. en Geociencias y Sensores Remotos',
      expertise: { es: 'Modelado geoespacial, cálculo de biomasa mediante radar SAR, y desarrollo de algoritmos de alerta temprana para la Amazonía y Selva Maya.', en: 'Geospatial modeling, SAR radar biomass calculation, and early-warning algorithms for Amazon and Maya Rainforest.' },
      origin: 'Suecia / México',
    },
    {
      name: 'Mtro. Cuauhtémoc Mendoza',
      role: { es: 'Coordinador de Diálogo Territorial y Saberes', en: 'Coordinator of Territorial Dialogue & Knowledge' },
      credentials: 'Mtro. en Antropología Ecológica y Mediación Comunitaria',
      expertise: { es: 'Protocolos de consulta previa, rescate de sistemas agrícolas ancestrales (chinampas, milpas) y soberanía hídrica local.', en: 'Prior consultation protocols, ancestral agricultural systems revival and local water sovereignty.' },
      origin: 'México',
    },
    {
      name: 'Dra. Claire Mercier',
      role: { es: 'Especialista en Finanzas Climáticas y Bonos Verdes', en: 'Climate Finance & Green Bonds Specialist' },
      credentials: 'Ph.D. en Economía Ambiental y Desarrollo Sostenible',
      expertise: { es: 'Estructuración de mecanismos de pago por servicios ambientales, mercados de carbono de alta integridad y taxonomía ESG europea.', en: 'Payment for ecosystem services mechanisms, high-integrity carbon markets and EU ESG taxonomy.' },
      origin: 'Francia / Suiza',
    },
  ];

  const calendario = [
    {
      quarter: 'Q1 · Enero - Marzo 2026',
      events: [
        { date: '15 Ene 2026', title: { es: 'Apertura de Convocatoria Anual de Becas CGA', en: 'Annual CGA Scholarship Call Opens' }, tag: 'Admisiones' },
        { date: '20 Feb 2026', title: { es: 'Webinar Inaugural: Desafíos Climáticos 2026', en: 'Inaugural Webinar: 2026 Climate Challenges' }, tag: 'Conferencia' },
        { date: '15 Mar 2026', title: { es: 'Cierre de Registro Temprano (Early Bird)', en: 'Early Bird Registration Deadline' }, tag: 'Aranceles' },
      ],
    },
    {
      quarter: 'Q2 · Abril - Junio 2026',
      events: [
        { date: '30 Abr 2026', title: { es: 'Cierre Definitivo de Postulaciones Diplomado en Gobernanza', en: 'Governance Diploma Final Application Deadline' }, tag: 'Admisiones' },
        { date: '12 May 2026', title: { es: 'Inicio de Clases: Diplomado en Gobernanza Socioambiental', en: 'Classes Begin: Socio-Environmental Governance Diploma' }, tag: 'Diplomado' },
        { date: '1 Jun 2026', title: { es: 'Inicio de Clases: Diplomado en Monitoreo Satelital e IA', en: 'Classes Begin: Satellite Monitoring & AI Diploma' }, tag: 'Diplomado' },
        { date: '19 Jun 2026', title: { es: 'Taller de Campo: Bancos Comunitarios de Semillas Nativas', en: 'Field Workshop: Community Native Seed Banks' }, tag: 'Taller' },
      ],
    },
    {
      quarter: 'Q3 · Julio - Septiembre 2026',
      events: [
        { date: '6 Jul 2026', title: { es: 'Curso Intensivo: Medición de Huella de Carbono y GHG', en: 'Intensive Course: Carbon Footprint & GHG Protocol' }, tag: 'Curso' },
        { date: '15 Ago 2026', title: { es: 'Inicio de Clases: Diplomado en Gestión Integral del Agua', en: 'Classes Begin: Integrated Water Management Diploma' }, tag: 'Diplomado' },
        { date: '7 Sep 2026', title: { es: 'Inicio de Clases: Diplomado en Finanzas Climáticas y Bonos', en: 'Classes Begin: Climate Finance & Green Bonds Diploma' }, tag: 'Diplomado' },
      ],
    },
    {
      quarter: 'Q4 · Octubre - Diciembre 2026',
      events: [
        { date: '15 Oct 2026', title: { es: 'Presentación de Proyectos Territoriales de Graduación', en: 'Final Territorial Graduation Project Presentations' }, tag: 'Evaluación' },
        { date: '15 Nov 2026', title: { es: 'Simposio Anual de Egresados y Red de Becarios CGA', en: 'Annual CGA Alumni & Fellows Network Symposium' }, tag: 'Simposio' },
        { date: '10 Dic 2026', title: { es: 'Ceremonia de Graduación y Entrega de Diplomas', en: 'Graduation Ceremony & Diploma Conferral' }, tag: 'Graduación' },
      ],
    },
  ];

  const handleOpenModal = (programTitle) => {
    setSelectedProgram(programTitle);
    setFormSubmitted(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#f5efe3] text-[#2d2618]">
      <PageHero
        titleWhite={{ es: 'Capacitación &', en: 'Training &' }}
        titleGreen={{ es: 'Academia de Liderazgo', en: 'Leadership Academy' }}
        description={{
          es: 'Programas de posgrado, diplomados internacionales, talleres técnicos y conferencias de alto nivel que fusionan el rigor científico con los saberes bioculturales del territorio.',
          en: 'Postgraduate diplomas, technical workshops and high-level keynotes fusing scientific rigor with biocultural territorial wisdom.',
        }}
        bgImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&h=900&fit=crop&auto=format"
      />

      {/* BARRA DE ESTADÍSTICAS / KPI */}
      <section className="border-b border-[#d8ceb6]/80 bg-[#eae4d2]/50 py-8 px-6 sm:px-12 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#4a5a22]">
                {s.value}
              </span>
              <p className="text-xs sm:text-sm text-[#6b6048] font-light max-w-[220px] mx-auto">
                {t(s.label)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PESTAÑAS INTERACTIVAS (GRID PERFECTO SIN DESBORDAMIENTOS) */}
      <section className="py-6 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-1 sm:gap-1.5 p-1.5 rounded-2xl bg-[#eae4d2]/80 border border-[#d8ceb6] shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full py-2.5 px-1 sm:px-2 rounded-xl text-[11px] sm:text-xs xl:text-xs font-sans font-medium text-center transition-all ${
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
      <main className="py-12 sm:py-16 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto min-h-[600px]">
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

            {/* CTA RÁPIDO A DIPLOMADOS */}
            <div className="p-8 sm:p-12 rounded-3xl bg-[#2d2618] text-[#f5efe3] flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#a8bc65]">
                  {t({ es: 'Convocatoria Ciclo 2026', en: '2026 Academic Cycle Open' })}
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl font-light mt-1 mb-2">
                  {t({ es: 'Explora nuestros 4 Diplomados Internacionales', en: 'Explore our 4 International Diplomas' })}
                </h4>
                <p className="text-sm text-[#d8ceb6] font-light max-w-xl">
                  {t({
                    es: 'Modalidades híbridas y virtuales con becas disponibles del 50% al 100% para líderes comunitarios y servidores públicos.',
                    en: 'Hybrid and online modalities with 50% to 100% scholarships for community leaders and civil servants.',
                  })}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('diplomados')}
                className="px-6 py-3.5 rounded-full bg-[#4a5a22] hover:bg-[#5a6b2a] text-[#f5efe3] text-xs font-bold uppercase tracking-wider transition-all shrink-0 shadow-lg"
              >
                {t({ es: 'Ver Diplomados', en: 'View Diplomas' })} &rarr;
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
                {t({ es: 'Diplomados Ejecutivos e Internacionales 2026', en: 'Executive & International Diplomas 2026' })}
              </h3>
            </div>

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
                {t({ es: 'Conferencias Magistrales & Webinars Globales', en: 'Keynotes & Global Webinars' })}
              </h3>
            </div>

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
          </div>
        )}

        {/* 5. PARA ORGANIZACIONES / IN-COMPANY */}
        {activeTab === 'organizaciones' && (
          <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#eae4d2]/80 border border-[#d8ceb6] shadow-sm space-y-8">
            <div>
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-[#4a5a22]">
                {t({ es: 'Soluciones Institucionales', en: 'Institutional Solutions' })}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#2d2618] font-light mt-2 mb-4">
                {t({ es: 'Programas a la Medida para Gobiernos, Empresas y ONGs', en: 'Tailored Training for Governments, Corporations & NGOs' })}
              </h3>
              <p className="text-[#6b6048] font-light text-base sm:text-lg leading-relaxed">
                {t({
                  es: 'Diseñamos diagnósticos de necesidades y capacitamos a gabinetes ministeriales, equipos de sostenibilidad corporativa, operadores de agua y consejos comunales con currículas cerradas in-situ o en campus virtual exclusivo.',
                  en: 'We design needs assessments and train ministerial cabinets, corporate sustainability teams, water operators and community councils with private on-site or online curricula.',
                })}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#f5efe3] border border-[#d8ceb6]">
                <span className="text-xs font-bold text-[#4a5a22] uppercase tracking-wider block mb-1">Sector Público</span>
                <h5 className="font-serif text-lg text-[#2d2618] font-medium mb-2">{t({ es: 'Gobiernos & Ministerios', en: 'Governments & Ministries' })}</h5>
                <p className="text-xs text-[#6b6048] font-light leading-relaxed">{t({ es: 'Ordenamientos territoriales, evaluación de impacto ambiental y fondos de resiliencia hídrica.', en: 'Territorial zoning, environmental impact assessment and water funds.' })}</p>
              </div>
              <div className="p-5 rounded-2xl bg-[#f5efe3] border border-[#d8ceb6]">
                <span className="text-xs font-bold text-[#4a5a22] uppercase tracking-wider block mb-1">Corporativo</span>
                <h5 className="font-serif text-lg text-[#2d2618] font-medium mb-2">{t({ es: 'Empresas & ESG', en: 'Corporations & ESG' })}</h5>
                <p className="text-xs text-[#6b6048] font-light leading-relaxed">{t({ es: 'Descarbonización de cadenas de valor, reporte de taxonomía verde y debida diligencia de biodiversidad.', en: 'Supply chain decarbonization, green taxonomy reporting and biodiversity due diligence.' })}</p>
              </div>
              <div className="p-5 rounded-2xl bg-[#f5efe3] border border-[#d8ceb6]">
                <span className="text-xs font-bold text-[#4a5a22] uppercase tracking-wider block mb-1">Territorial</span>
                <h5 className="font-serif text-lg text-[#2d2618] font-medium mb-2">{t({ es: 'Comunidades & Ejidos', en: 'Communities & Cooperatives' })}</h5>
                <p className="text-xs text-[#6b6048] font-light leading-relaxed">{t({ es: 'Formación de guardabosques comunitarios, gestión de viveros nativos y defensa del agua.', en: 'Ranger training, native nurseries management and water defense.' })}</p>
              </div>
            </div>

            <button
              onClick={() => handleOpenModal(t({ es: 'Programa In-Company / Para Organizaciones', en: 'In-Company / Organization Program' }))}
              className="px-8 py-4 rounded-full bg-[#4a5a22] hover:bg-[#5a6b2a] text-[#f5efe3] text-xs uppercase font-semibold tracking-wider transition-all shadow-md"
            >
              {t({ es: 'Solicitar Propuesta Institucional para mi Organización', en: 'Request Custom Proposal for my Organization' })} &rarr;
            </button>
          </div>
        )}

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
          </div>
        )}

        {/* 7. CALENDARIO ACADÉMICO 2026 */}
        {activeTab === 'calendario' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-[#4a5a22]">
                {t({ es: 'Cronograma Oficial', en: 'Official Timeline' })}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#2d2618] font-light mt-2">
                {t({ es: 'Calendario Académico y Convocatorias 2026', en: '2026 Academic Calendar & Calls' })}
              </h3>
            </div>

            <div className="space-y-6">
              {calendario.map((q, qIdx) => (
                <div key={qIdx} className="p-7 rounded-3xl bg-[#f5efe3] border border-[#d8ceb6] shadow-sm">
                  <h4 className="font-serif text-xl text-[#4a5a22] font-semibold mb-4 pb-2 border-b border-[#eae4d2]">
                    {q.quarter}
                  </h4>
                  <div className="space-y-3">
                    {q.events.map((ev, evIdx) => (
                      <div key={evIdx} className="p-3.5 rounded-xl bg-[#eae4d2]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-baseline gap-3">
                          <span className="text-xs font-bold text-[#2d2618] min-w-[90px]">{ev.date}</span>
                          <span className="text-xs text-[#6b6048] font-medium">{t(ev.title)}</span>
                        </div>
                        <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#4a5a22] self-start sm:self-auto">
                          {ev.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
                    <option value="">{t({ es: 'Selecciona un programa...', en: 'Select a program...' })}</option>
                    <option value="dip-gobernanza">Diplomado Internacional en Gobernanza Socioambiental</option>
                    <option value="dip-satelital">Diplomado en Monitoreo Satelital, IA y Conservación</option>
                    <option value="dip-agua">Diplomado en Gestión Integral del Agua y Resiliencia Hídrica</option>
                    <option value="dip-finanzas">Diplomado en Finanzas Climáticas y Bonos Verdes</option>
                    <option value="curso-semillas">Taller de Bancos Comunitarios de Semillas Nativas</option>
                    <option value="curso-huella">Curso de Medición de Huella de Carbono y GHG</option>
                    <option value="in-company">Programa Especial In-Company para Organizaciones</option>
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
                  {t({ es: '¡Postulación Recibida!', en: 'Application Submitted!' })}
                </h4>
                <p className="text-sm text-[#6b6048] font-light max-w-md mx-auto leading-relaxed">
                  {t({
                    es: 'Tu solicitud ha sido registrada en el Comité de Admisiones del CGA. Recibirás un correo con el expediente de admisión y las instrucciones en las próximas 48 horas.',
                    en: 'Your application has been logged by the CGA Admissions Committee. You will receive an email with admission files and next steps within 48 hours.',
                  })}
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#2d2618] text-[#f5efe3] text-xs uppercase font-semibold tracking-wider"
                >
                  {t({ es: 'Enviar otra postulación', en: 'Submit another application' })}
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
