import React, { createContext, useContext, useState, useEffect } from 'react';

const SETTINGS_STORAGE_KEY = 'cga_site_settings';
const POPUPS_STORAGE_KEY = 'cga_popups_list';
const TRAINING_STORAGE_KEY = 'cga_training_data';
const APPLICATIONS_STORAGE_KEY = 'cga_training_applications';

export const POPUP_TARGET_ROUTES = [
  { id: 'all', label: 'Todas las páginas (Global)' },
  { id: '/', label: 'Inicio / Portada Principal (/)' },
  { id: '/capacitacion', label: 'Capacitación & Academia (/capacitacion)' },
  { id: '/comunicacion', label: 'Comunicación & Artículos (/comunicacion)' },
  { id: '/proyectos', label: 'Proyectos & Programas (/proyectos)' },
  { id: '/nosotros', label: 'Nosotros / Quiénes Somos (/nosotros)' },
  { id: '/gobernanza', label: 'Gobernanza & Estructura (/gobernanza)' },
  { id: '/agenda-2030', label: 'Agenda 2030 (/agenda-2030)' },
  { id: '/presencia-global', label: 'Presencia Global (/presencia-global)' },
  { id: '/contacto', label: 'Contacto (/contacto)' },
];

export const INITIAL_POPUPS_LIST = [
  {
    id: 'popup-001',
    name: 'Convocatoria Diplomados & Posgrados 2026',
    enabled: true,
    designType: 'split-modal', // 'classic-hero' | 'split-modal' | 'botanical-solid' | 'floating-corner'
    targetRoute: '/capacitacion',
    triggerType: 'time', // 'time' | 'scroll' | 'exit'
    triggerDelaySeconds: 3,
    triggerScrollPercent: 30,
    hasCtaButton: true,
    title: 'Convocatoria Abierta · Posgrados & Diplomados 2026',
    subtitle: 'Consejo Global Ambiental · Academia de Liderazgo',
    message: 'Se encuentra abierta la recepción de postulaciones y solicitudes de becas para el Diplomado Internacional en Gobernanza Socioambiental y Monitoreo Satelital con IA.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&fit=crop&auto=format',
    pngElement: '/imagenes/Rama 2.svg',
    highlightBadge: 'Inscripciones Abiertas',
    ctaText: 'Ver Convocatoria & Registrarse',
    ctaLink: '/capacitacion',
    secondaryCtaText: 'Conocer Más',
    secondaryCtaLink: '/contacto',
    cornerPosition: 'bottom-right',
    oncePerSession: false,
  },
  {
    id: 'popup-002',
    name: 'Alerta Rápida · Boletín Quincenal y Prensa',
    enabled: true,
    designType: 'floating-corner',
    targetRoute: '/comunicacion',
    triggerType: 'scroll',
    triggerDelaySeconds: 4,
    triggerScrollPercent: 35,
    hasCtaButton: true,
    title: 'Boletín Oficial de Clima y Biodiversidad',
    subtitle: 'Sala de Prensa CGA',
    message: 'Suscríbete al despacho quincenal con análisis satelital y acuerdos internacionales.',
    image: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=800&fit=crop&auto=format',
    pngElement: '/imagenes/Rama 1.svg',
    highlightBadge: 'Boletín Quincenal',
    ctaText: 'Leer Última Edición',
    ctaLink: '/comunicacion',
    secondaryCtaText: 'Cerrar',
    secondaryCtaLink: '',
    cornerPosition: 'bottom-right',
    oncePerSession: false,
  },
  {
    id: 'popup-003',
    name: 'Aviso Solemne · Declaratoria de Gobernanza',
    enabled: true,
    designType: 'botanical-solid',
    targetRoute: '/gobernanza',
    triggerType: 'time',
    triggerDelaySeconds: 4,
    triggerScrollPercent: 40,
    hasCtaButton: false, // Sin botón de CTA, solo comunicado solemne
    title: 'Declaratoria Marco de Gobernanza Socioambiental 2026-2030',
    subtitle: 'Ginebra · Ciudad de México',
    message: 'El Consejo Directivo ha formalizado los lineamientos rectores para la mediación de controversias ecológicas y la custodia comunitaria de biomas críticos.',
    image: '',
    pngElement: '/imagenes/Rama 2.svg',
    highlightBadge: 'Resolución Institucional',
    ctaText: '',
    ctaLink: '',
    secondaryCtaText: '',
    secondaryCtaLink: '',
    cornerPosition: 'bottom-right',
    oncePerSession: false,
  },
  {
    id: 'popup-004',
    name: 'Asesoría Territorial e Infraestructura Verde',
    enabled: false,
    designType: 'classic-hero',
    targetRoute: 'all',
    triggerType: 'scroll',
    triggerDelaySeconds: 5,
    triggerScrollPercent: 50,
    hasCtaButton: true,
    title: 'Consultoría Especializada en Cuencas y Restauración',
    subtitle: 'Programas Territoriales CGA',
    message: 'Acompañamos a gobiernos, ejidos y organizaciones en la formulación de proyectos de restauración ecológica e infraestructura basada en la naturaleza.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&fit=crop&auto=format',
    pngElement: '/imagenes/Liana.png',
    highlightBadge: 'Servicios Técnicos',
    ctaText: 'Solicitar Asesoría',
    ctaLink: '/contacto',
    secondaryCtaText: 'Ver Portafolio',
    secondaryCtaLink: '/proyectos',
    cornerPosition: 'bottom-right',
    oncePerSession: false,
  },
];

const DEFAULT_SETTINGS = {
  banner: {
    enabled: true,
    bannerStyle: 'static', // 'static' | 'text-marquee' | 'image-marquee'
    message: 'Inscripciones abiertas para diplomados internacionales y talleres de especialización ambiental.',
    showCta: true,
    ctaText: 'Postular ahora',
    ctaLink: '/capacitacion',
    theme: 'moss', // 'moss' | 'beige' | 'terracotta' | 'custom'
    bgColor: '#4a5a22',
    textColor: '#f5efe3',
    gradientEnabled: false,
    gradientDirection: 'to-r', // 'to-r' | 'to-b' | 'to-br' | 'radial'
    gradientFrom: '#4a5a22',
    gradientTo: '#2d3813',
    marqueeTexts: [
      'Inscripciones abiertas para diplomados internacionales 2026',
      'Nueva convocatoria de becas territoriales y formación de liderazgos',
      'Asamblea Global Ambiental · Ginebra · Registro abierto',
      'Monitoreo satelital activo en 47 corredores bioculturales',
    ],
    marqueeSpeed: 28,
    marqueeImages: [
      { id: '1', url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&q=80&fit=crop', link: '/conocimiento' },
      { id: '2', url: 'https://images.unsplash.com/photo-1623880132570-ab1b4297c8c2?w=500&q=80&fit=crop', link: '/proyectos' },
      { id: '3', url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=500&q=80&fit=crop', link: '/lineas-estrategicas' },
      { id: '4', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&q=80&fit=crop', link: '/nosotros' },
      { id: '5', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&q=80&fit=crop', link: '/agenda-2030' },
    ],
    imageHeight: 72,
  },
};

const DEFAULT_TRAINING_DATA = {
  stats: [
    { value: '1,450+', label: { es: 'Líderes formados en 18 países', en: 'Graduates across 18 countries' } },
    { value: '94%', label: { es: 'Impacto directo en políticas territoriales', en: 'Direct impact on territorial policies' } },
    { value: '35+', label: { es: 'Catedráticos y científicos internacionales', en: 'International professors & scientists' } },
    { value: '100%', label: { es: 'Acreditación con validez institucional CGA', en: 'CGA institutional accreditation' } },
  ],
  diplomados: [
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
  ],
  cursos: [
    {
      id: 'cur-semillas',
      title: { es: 'Taller de Bancos Comunitarios de Semillas Nativas', en: 'Community Native Seed Banks Workshop' },
      hours: '30 horas · Presencial en Campo',
      dates: '19 - 23 Junio 2026',
      desc: { es: 'Protocolos de recolección botánica, pruebas de viabilidad, almacenamiento hermético y resguardo ante sequías prolongadas.', en: 'Botanical collection protocols, viability testing, hermetic storage and drought resilience.' },
      instructor: 'Dra. María Soledad Albarrán',
    },
    {
      id: 'cur-carbono',
      title: { es: 'Curso de Medición de Huella de Carbono y GHG Protocol', en: 'Carbon Footprint Measurement & GHG Protocol Course' },
      hours: '40 horas · Virtual en Vivo',
      dates: '6 - 17 Julio 2026',
      desc: { es: 'Cálculo de emisiones Alcance 1, 2 y 3 para organizaciones, cadenas de suministro y planes de descarbonización neta.', en: 'Scope 1, 2 and 3 emissions calculation for organizations, supply chains and net-zero plans.' },
      instructor: 'Dr. Marcus Thorne',
    },
  ],
  webinars: [
    {
      id: 'web-oceanos',
      title: { es: 'Conferencia Magistral: La Voz de los Océanos en la Era del Antropoceno', en: 'Keynote: The Voice of the Oceans in the Anthropocene' },
      speaker: 'Dra. Elena Vance · Asesora Científica CGA Ginebra',
      date: '28 de Mayo, 2026 · 17:00 CET',
      type: 'Webinar Abierto · Transmisión Global',
      summary: { es: 'Análisis de la acidificación marina, zonas de oxígeno mínimo y el tratado global de alta mar.', en: 'Analysis of ocean acidification, oxygen minimum zones and the High Seas Treaty.' },
    },
  ],
  especialistas: [
    {
      id: 'esp-solorio',
      name: 'Dr. Francisco Solorio',
      role: { es: 'Presidente del Consejo Directivo', en: 'President of the Board' },
      credentials: 'Dr. en Gobernanza Territorial y Políticas Públicas',
      expertise: { es: 'Liderazgo en diplomacia ambiental, conservación de biomas estratégicos y diseño de marcos de resolución de conflictos socioambientales.', en: 'Leadership in environmental diplomacy, biome conservation and socio-environmental conflict frameworks.' },
      origin: 'México / Suiza',
    },
    {
      id: 'esp-albarran',
      name: 'Dra. María Soledad Albarrán',
      role: { es: 'Directora Académica y de Posgrados', en: 'Academic & Postgraduate Director' },
      credentials: 'Dra. en Ciencias Biológicas y Ecología del Paisaje',
      expertise: { es: 'Restauración biocultural de ecosistemas templados y tropicales, bancos de germoplasma y redes de custodia comunitaria de semillas.', en: 'Biocultural restoration of temperate/tropical biomes, germplasm banks and community seed stewardship.' },
      origin: 'Iberoamérica',
    },
  ],
  organizaciones: {
    subtitle: { es: 'Soluciones Institucionales a Medida', en: 'Tailored Institutional Solutions' },
    title: { es: 'Programas para Organizaciones, Gobiernos y Empresas', en: 'Custom Programs for Organizations, Governments & Corporations' },
    description: {
      es: 'Diseñamos diagnósticos integrales de madurez ecológica y capacitamos a gabinetes ministeriales, equipos corporativos de sostenibilidad (ESG), operadores de agua y comunidades territoriales mediante currículas cerradas in-situ o en campus virtual exclusivo.',
      en: 'We design comprehensive ecological maturity assessments and train ministerial cabinets, corporate sustainability teams, water operators and community councils with private on-site or online curricula.',
    },
    ctaText: { es: 'Solicitar Propuesta para mi Organización', en: 'Request Proposal for my Organization' },
    programs: [
      {
        id: 'org-gobiernos',
        sector: 'Sector Público',
        tag: 'Gobiernos & Ministerios',
        title: { es: 'Gobernanza de Cuencas, Políticas Públicas y Fondos Climáticos', en: 'Watershed Governance, Public Policies & Climate Funds' },
        desc: { es: 'Ordenamientos territoriales ecológicos, evaluación de impacto ambiental estratégico y estructuración de proyectos para fondos verdes internacionales.', en: 'Territorial zoning, environmental impact assessment and green fund structuring.' },
        modalities: ['In-Situ / Presencial', 'Asesoría Técnica', '30 a 90 hrs'],
        badge: 'Gubernamental',
      },
      {
        id: 'org-empresas',
        sector: 'Corporativo & ESG',
        tag: 'Empresas & Cadenas de Valor',
        title: { es: 'Descarbonización, Taxonomía Verde y Debida Diligencia (TNFD/TCFD)', en: 'Decarbonization, Green Taxonomy & Due Diligence (TNFD/TCFD)' },
        desc: { es: 'Capacitación in-company en cálculo de huella de carbono, reporte de sostenibilidad, métricas de biodiversidad y transición hacia modelos regenerativos.', en: 'In-company training on carbon footprint, sustainability reporting, biodiversity metrics and regenerative models.' },
        modalities: ['Campus Privado Virtual', 'Talleres Ejecutivos', '40 a 120 hrs'],
        badge: 'In-Company',
      },
      {
        id: 'org-comunidades',
        sector: 'Territorial',
        tag: 'Comunidades & Ejidos',
        title: { es: 'Custodia Territorial Biocultural y Bancos de Germoplasma', en: 'Biocultural Territorial Stewardship & Germplasm Banks' },
        desc: { es: 'Formación de brigadas comunitarias de vigilancia forestal, resguardo de semillas nativas, gestión de viveros y defensa comunitaria del agua.', en: 'Training community forest brigades, native seed preservation, nursery management and water defense.' },
        modalities: ['Talleres en Campo', 'Metodología Participativa', 'Flexible'],
        badge: 'Comunitario',
      },
      {
        id: 'org-multilateral',
        sector: 'Multilateral & ONGs',
        tag: 'Organismos Internacionales',
        title: { es: 'Monitoreo Satelital y Salvaguardas Socioambientales', en: 'Satellite Monitoring & Socio-Environmental Safeguards' },
        desc: { es: 'Implementación de telemetría geoespacial, indicadores ODS, auditoría de créditos bioculturales y gobernanza compartida.', en: 'Implementation of geospatial telemetry, SDG indicators, biocultural credit auditing and shared governance.' },
        modalities: ['Formato Híbrido', 'Certificación Oficial', '45 hrs'],
        badge: 'Internacional',
      },
    ],
    benefits: [
      { es: 'Diagnósticos de madurez socioambiental y currícula 100% personalizada a los retos de su entidad.', en: 'Socio-environmental maturity assessments and 100% custom curricula.' },
      { es: 'Acreditación y certificación institucional con validez internacional CGA Ginebra.', en: 'Accreditation and institutional certification with international validity.' },
      { es: 'Claustro de profesores internacionales, científicos y juristas especializados.', en: 'International faculty of top scientists, professors and environmental jurists.' },
      { es: 'Acceso a campus virtual privado con métricas de progreso y reportes ejecutivos.', en: 'Access to private virtual campus with progress analytics and executive reports.' },
    ],
  },
  calendario: [
    {
      id: 'cal-1',
      date: '2026-05-18',
      title: { es: 'Inicio: Diplomado Internacional en Gobernanza Socioambiental', en: 'Start: International Diploma in Socio-Environmental Governance' },
      time: '18:00 - 21:00 CET',
      category: 'Diplomado',
      modality: 'Virtual en Vivo (Campus CGA)',
      desc: { es: 'Apertura de la 5ª edición con conferencia inaugural del Dr. Francisco Solorio y claustrales internacionales.', en: 'Opening of the 5th cohort with keynote by Dr. Francisco Solorio and international faculty.' },
      link: '/capacitacion#diplomados',
      featured: true,
    },
    {
      id: 'cal-2',
      date: '2026-05-28',
      title: { es: 'Conferencia Magistral: La Voz de los Océanos en el Antropoceno', en: 'Keynote: The Voice of the Oceans in the Anthropocene' },
      time: '17:00 - 18:30 CET',
      category: 'Conferencia',
      modality: 'Transmisión Global Abierta',
      desc: { es: 'Dra. Elena Vance analiza la acidificación marina y las salvaguardas del Tratado de Alta Mar.', en: 'Dr. Elena Vance analyzes ocean acidification and High Seas Treaty safeguards.' },
      link: '/capacitacion#conferencias',
      featured: false,
    },
    {
      id: 'cal-3',
      date: '2026-06-15',
      title: { es: 'Inicio: Diplomado en Mercados de Carbono y Finanzas Verdes', en: 'Start: Diploma in Carbon Markets & Green Finance' },
      time: '18:30 - 21:30 CET',
      category: 'Diplomado',
      modality: 'Virtual en Vivo',
      desc: { es: 'Estructuración de créditos bioculturales, taxonomía europea y auditoría de bonos verdes.', en: 'Biocultural credits structuring, EU taxonomy and green bond audits.' },
      link: '/capacitacion#diplomados',
      featured: true,
    },
    {
      id: 'cal-4',
      date: '2026-06-19',
      title: { es: 'Taller de Campo: Bancos Comunitarios de Semillas Nativas', en: 'Field Workshop: Community Native Seed Banks' },
      time: '09:00 - 15:00 Local',
      category: 'Curso / Taller',
      modality: 'Presencial en Territorio',
      desc: { es: 'Protocolos de recolección botánica, viabilidad genética y custodia de germoplasma ante sequías.', en: 'Botanical collection protocols, genetic viability and germplasm custody.' },
      link: '/capacitacion#cursos',
      featured: false,
    },
    {
      id: 'cal-5',
      date: '2026-07-06',
      title: { es: 'Curso Intensivo: Medición de Huella de Carbono y GHG Protocol', en: 'Intensive Course: Carbon Footprint Measurement & GHG Protocol' },
      time: '17:00 - 20:00 CET',
      category: 'Curso / Taller',
      modality: 'Virtual en Vivo',
      desc: { es: 'Cálculo de emisiones Alcance 1, 2 y 3 para cadenas de suministro y planes net-zero.', en: 'Scope 1, 2 and 3 emissions calculation for supply chains and net-zero plans.' },
      link: '/capacitacion#cursos',
      featured: false,
    },
    {
      id: 'cal-6',
      date: '2026-08-14',
      title: { es: 'Cierre de Convocatoria: Becas de Excelencia Territorial 2026-II', en: 'Call Deadline: Territorial Excellence Scholarships 2026-II' },
      time: '23:59 CET',
      category: 'Beca & Convocatoria',
      modality: 'Recepción en Línea',
      desc: { es: 'Último día para recepción de expedientes de becas al 100% para líderes comunitarios y funcionarios públicos.', en: 'Final day for 100% scholarship applications for community leaders and public officials.' },
      link: '/capacitacion#inscripcion',
      featured: true,
    },
    {
      id: 'cal-7',
      date: '2026-09-07',
      title: { es: 'Inicio: Programa Ejecutivo In-Company de Madurez ESG para Consejos', en: 'Start: In-Company Executive ESG Maturity Program for Boards' },
      time: 'Horario Corporativo',
      category: 'In-Company',
      modality: 'Híbrido / Campus Privado',
      desc: { es: 'Programa cerrado para equipos directivos y consejos de administración en debida diligencia ambiental.', en: 'Closed executive program for boards on environmental due diligence.' },
      link: '/capacitacion#organizaciones',
      featured: false,
    },
  ],
};

const DEFAULT_APPLICATIONS = [
  {
    id: 'app-001',
    name: 'Lic. Claudia Morales Rangel',
    email: 'cmorales@sustentabilidad.gob.mx',
    phone: '+52 55 4123 8890',
    org: 'Secretaría de Medio Ambiente y Recursos Naturales',
    program: 'Diplomado Internacional en Gobernanza Socioambiental y Biocultural',
    scholarship: 'si',
    notes: 'Postulación institucional para el área de concertación social y cuencas.',
    date: '04 Abril 2026',
    status: 'Aprobada',
  },
];

const SiteSettingsContext = createContext(null);

export function SiteSettingsProvider({ children }) {
  // Lista de múltiples pop-ups
  const [popups, setPopups] = useState(() => {
    try {
      const stored = localStorage.getItem(POPUPS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_POPUPS_LIST;
    } catch {
      return INITIAL_POPUPS_LIST;
    }
  });

  const [siteSettings, setSiteSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          banner: {
            ...DEFAULT_SETTINGS.banner,
            ...(parsed.banner || {}),
          },
        };
      }
      return DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [trainingData, setTrainingData] = useState(() => {
    try {
      const stored = localStorage.getItem(TRAINING_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_TRAINING_DATA,
          ...parsed,
          organizaciones: {
            ...DEFAULT_TRAINING_DATA.organizaciones,
            ...(parsed.organizaciones || {}),
            programs: parsed.organizaciones?.programs?.length
              ? parsed.organizaciones.programs
              : DEFAULT_TRAINING_DATA.organizaciones.programs,
            benefits: parsed.organizaciones?.benefits?.length
              ? parsed.organizaciones.benefits
              : DEFAULT_TRAINING_DATA.organizaciones.benefits,
          },
          calendario: Array.isArray(parsed.calendario) && parsed.calendario.length > 0 && parsed.calendario[0].date
            ? parsed.calendario
            : DEFAULT_TRAINING_DATA.calendario,
        };
      }
      return DEFAULT_TRAINING_DATA;
    } catch {
      return DEFAULT_TRAINING_DATA;
    }
  });

  const [applications, setApplications] = useState(() => {
    try {
      const stored = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_APPLICATIONS;
    } catch {
      return DEFAULT_APPLICATIONS;
    }
  });

  // Guardar en localStorage ante cambios
  useEffect(() => {
    localStorage.setItem(POPUPS_STORAGE_KEY, JSON.stringify(popups));
  }, [popups]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem(TRAINING_STORAGE_KEY, JSON.stringify(trainingData));
  }, [trainingData]);

  useEffect(() => {
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);

  // ─── GESTIÓN DE POP-UPS (CRUD + TOGGLE + DUPLICAR) ───
  const savePopup = (popupData) => {
    setPopups((prev) => {
      const idx = prev.findIndex((p) => p.id === popupData.id);
      let updated;
      if (idx >= 0) {
        updated = [...prev];
        updated[idx] = { ...updated[idx], ...popupData };
      } else {
        updated = [popupData, ...prev];
      }
      return updated;
    });
  };

  const togglePopupStatus = (id, targetState = null) => {
    setPopups((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newState = targetState !== null ? targetState : !p.enabled;
          return { ...p, enabled: newState };
        }
        return p;
      })
    );
  };

  const deletePopup = (id) => {
    setPopups((prev) => prev.filter((p) => p.id !== id));
  };

  const duplicatePopup = (id) => {
    const orig = popups.find((p) => p.id === id);
    if (!orig) return;
    const duplicated = {
      ...JSON.parse(JSON.stringify(orig)),
      id: `popup-${Date.now()}`,
      name: `[Copia] ${orig.name}`,
      enabled: false, // Inicia desactivado para no crear conflictos
    };
    setPopups((prev) => [duplicated, ...prev]);
  };

  const resetPopupsToDefaults = () => {
    setPopups(INITIAL_POPUPS_LIST);
    localStorage.setItem(POPUPS_STORAGE_KEY, JSON.stringify(INITIAL_POPUPS_LIST));
  };

  // Helper para obtener el pop-up activo en una ruta específica
  const getActivePopupForRoute = (currentPathname) => {
    const enabledPopups = popups.filter((p) => p.enabled);
    if (enabledPopups.length === 0) return null;

    // 1. Prioridad: Coincidencia exacta con la ruta actual
    const exactMatch = enabledPopups.find((p) => p.targetRoute === currentPathname);
    if (exactMatch) return exactMatch;

    // 2. Prioridad: Coincidencia con ruta que empieza con (ej: /comunicacion/id)
    const prefixMatch = enabledPopups.find(
      (p) => p.targetRoute !== 'all' && p.targetRoute !== '/' && currentPathname.startsWith(p.targetRoute)
    );
    if (prefixMatch) return prefixMatch;

    // 3. Fallback: Pop-up global ('all')
    const globalMatch = enabledPopups.find((p) => p.targetRoute === 'all');
    return globalMatch || null;
  };

  const updateBanner = (bannerData) => {
    setSiteSettings((prev) => ({
      ...prev,
      banner: { ...prev.banner, ...bannerData },
    }));
  };

  const updateTrainingData = (updater) => {
    setTrainingData((prev) => (typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }));
  };

  const addApplication = (app) => {
    const newApp = {
      ...app,
      id: `app-${Date.now()}`,
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }),
      status: 'Pendiente',
    };
    setApplications((prev) => [newApp, ...prev]);
  };

  const updateApplicationStatus = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  const deleteApplication = (id) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        popups,
        savePopup,
        togglePopupStatus,
        deletePopup,
        duplicatePopup,
        resetPopupsToDefaults,
        getActivePopupForRoute,
        siteSettings,
        updateBanner,
        trainingData,
        updateTrainingData,
        applications,
        addApplication,
        updateApplicationStatus,
        deleteApplication,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) {
    throw new Error('useSiteSettings must be used within SiteSettingsProvider');
  }
  return ctx;
}
