import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_GOVERNANCE_MEMBERS } from '../data/governanceData.js';

const SETTINGS_STORAGE_KEY = 'cga_site_settings';
const POPUPS_STORAGE_KEY = 'cga_popups_list';
const TRAINING_STORAGE_KEY = 'cga_training_data';
const APPLICATIONS_STORAGE_KEY = 'cga_training_applications';
const ALLIANCES_STORAGE_KEY = 'cga_alliances_list';
const GOVERNANCE_STORAGE_KEY = 'cga_governance_members';

export const DEFAULT_ALLIANCES_LIST = [
  {
    id: 'wess',
    name: 'World Environmental Sustainability Summit (WESS)',
    shortName: 'WESS Geneva',
    acronym: 'WESS',
    type: 'multilateral',
    scope: { es: 'Global · Ginebra', en: 'Global · Geneva' },
    role: {
      es: 'Socio de gobernanza global y premiación de iniciativas de biocultura.',
      en: 'Global governance partner and bioculture initiatives awarding body.',
    },
    tag: 'Ginebra 2026',
    logo: '/imports/Logos/wess.png',
    website: 'https://mexicoporelclima.com/',
  },
  {
    id: 'rirb',
    name: 'Decenio de las Naciones Unidas sobre la Restauración de los ecosistemas',
    shortName: 'Restauración de los ecosistemas',
    acronym: 'DNUSRE',
    type: 'multilateral',
    scope: { es: 'Global · ONU', en: 'Global · UN' },
    role: {
      es: 'Prevención, detención y reversión de la degradación de ecosistemas en todo el mundo.',
      en: 'Preventing, halting and reversing the degradation of ecosystems worldwide.',
    },
    tag: 'Restauración Global',
    logo: '/imports/Logos/rirb.png',
    website: 'https://www.unesco.org/es/ecosystems-restoration-decade',
  },
  {
    id: 'iies',
    name: 'Instituto de Investigaciones en Ecosistemas y Sustentabilidad',
    shortName: 'IIES UNAM',
    acronym: 'IIES',
    type: 'academic',
    scope: { es: 'América Latina', en: 'Latin America' },
    role: {
      es: 'Monitoreo satelital conjunto, modelación climática y validación científica.',
      en: 'Joint satellite monitoring, climate modeling and scientific validation.',
    },
    tag: 'Investigación Aplicada',
    logo: '/imports/Logos/iies.png',
    website: 'https://www.cbd.int/',
  },
  {
    id: 'cecgb',
    name: 'Centro de Estudios del Cambio Global y la Biosfera',
    shortName: 'CECG Biosfera',
    acronym: 'CECG',
    type: 'academic',
    scope: { es: 'Internacional', en: 'International' },
    role: {
      es: 'Publicaciones arbitradas y capacitación de cuadros directivos ambientales.',
      en: 'Peer-reviewed publications and environmental leadership training.',
    },
    tag: 'Docencia & Ciencia',
    logo: '/imports/Logos/cecgb.jpg',
    website: 'https://earthcharter.org/',
  },
  {
    id: 'uceps',
    name: 'Unión de Comunidades y Ejidos Protectores de la Selva',
    shortName: 'UCEPS Selva',
    acronym: 'UCEPS',
    type: 'territorial',
    scope: { es: 'Territorial · Corredor Biológico', en: 'Territorial · Biological Corridor' },
    role: {
      es: 'Custodia territorial de 450,000 hectáreas de bosque de niebla y selva alta.',
      en: 'Territorial custody of 450,000 hectares of cloud and tropical rainforest.',
    },
    tag: 'Custodia Territorial',
    logo: '/imports/Logos/uceps.jpg',
    website: 'https://www.earthhour.org/',
  },
  {
    id: 'fgpb',
    name: 'Fondo Global para el Patrimonio Biocultural',
    shortName: 'Fondo Biocultural',
    acronym: 'FGPB',
    type: 'philanthropic',
    scope: { es: 'Multilateral', en: 'Multilateral' },
    role: {
      es: 'Financiamiento directo a proyectos comunitarios y brigadas contra la deforestación.',
      en: 'Direct funding for community projects and anti-deforestation brigades.',
    },
    tag: 'Financiamiento Verde',
    logo: '/imports/Logos/fgpb.png',
    website: 'https://www.expomexico.ca/',
  },
  {
    id: 'alliance-1791929073252',
    name: 'KabPrison Project México',
    shortName: 'KabPrison Project',
    acronym: 'KABPRISON',
    type: 'territorial',
    scope: { es: 'México · Social', en: 'Mexico · Social' },
    role: {
      es: 'Reinserción social a través de proyectos ambientales, huertos y sustentabilidad comunitaria.',
      en: 'Social reintegration through environmental projects, community gardens and sustainability.',
    },
    tag: 'Reinserción & Ecología',
    logo: '/imports/Logos/kabprison.png',
    website: 'https://www.instagram.com/kabprison_project_mexico/',
  },
  {
    id: 'alliance-1791929142382',
    name: 'Mares No Muros',
    shortName: 'Mares No Muros',
    acronym: 'MNM',
    type: 'multilateral',
    scope: { es: 'Costero & Marino', en: 'Coastal & Marine' },
    role: {
      es: 'Protección de corredores marinos y diplomacia ambiental para la conservación oceánica.',
      en: 'Protection of marine corridors and environmental diplomacy for ocean conservation.',
    },
    tag: 'Conservación Marina',
    logo: '/imports/Logos/maresnomuros.png',
    website: 'https://maresnomuros.org/',
  },
];


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
    id: 'popup-home-welcome',
    name: 'Pop-up de Bienvenida Institucional (Exclusivo Home)',
    enabled: true,
    designType: 'split-modal', // 'classic-hero' | 'split-modal' | 'botanical-solid' | 'floating-corner'
    targetRoute: '/',
    triggerType: 'time', // 'time' | 'scroll' | 'exit'
    triggerDelaySeconds: 2,
    triggerScrollPercent: 25,
    hasCtaButton: true,
    title: 'Bienvenido al Consejo Global Ambiental',
    subtitle: 'Preservación Biocultural, Gobernanza & Ciencia Aplicada',
    message: 'Conoce nuestras iniciativas internacionales de custodia biocultural, diplomacia ambiental y formación de liderazgos territoriales.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&fit=crop&auto=format',
    pngElement: '/imagenes/Rama 2.svg',
    highlightBadge: 'Mensaje Institucional',
    ctaText: 'Conocer Iniciativas',
    ctaLink: '/proyectos',
    secondaryCtaText: 'Sobre el Consejo',
    secondaryCtaLink: '/nosotros',
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
  ],
  webinars: [
    {
      id: 'web-oceanos',
      title: { es: 'Conferencia Magistral: La Voz de los Océanos en la Era del Antropoceno', en: 'Keynote: The Voice of the Oceans in the Anthropocene' },
      speaker: 'Dra. Erika Sánchez · Asesora Científica CGA',
      date: '28 de Mayo, 2026 · 17:00 CET',
      type: 'Webinar Abierto · Transmisión Global',
      summary: { es: 'Análisis de la educación socioambiental, resiliencia ecológica y salvaguardas del Tratado Global.', en: 'Analysis of socio-environmental education, ecological resilience and Global Treaty safeguards.' },
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
      desc: { es: 'Dra. Erika Sánchez analiza la educación socioambiental, resiliencia territorial y salvaguardas climáticas.', en: 'Dr. Erika Sánchez analyzes socio-environmental education, territorial resilience and climate safeguards.' },
      link: '/capacitacion#conferencias',
      featured: false,
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
  // Lista de pop-ups (limpia: exclusivamente 1 de bienvenida en Home)
  const [popups, setPopups] = useState(() => {
    try {
      const stored = localStorage.getItem(POPUPS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasLegacy = parsed.some(
            (p) =>
              p.id === 'popup-001' ||
              p.id === 'popup-002' ||
              p.id === 'popup-003' ||
              p.id === 'popup-004' ||
              p.targetRoute !== '/'
          );
          if (hasLegacy || parsed.length > 1) {
            localStorage.setItem(POPUPS_STORAGE_KEY, JSON.stringify(INITIAL_POPUPS_LIST));
            return INITIAL_POPUPS_LIST;
          }
          return parsed;
        }
      }
      localStorage.setItem(POPUPS_STORAGE_KEY, JSON.stringify(INITIAL_POPUPS_LIST));
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
        const needsSanitize =
          parsed.diplomados?.length > 1 ||
          parsed.cursos?.length > 1 ||
          parsed.especialistas?.length > 1 ||
          parsed.organizaciones?.programs?.length > 1;

        if (needsSanitize) {
          const sanitized = {
            ...DEFAULT_TRAINING_DATA,
            ...parsed,
            diplomados: DEFAULT_TRAINING_DATA.diplomados,
            cursos: DEFAULT_TRAINING_DATA.cursos,
            webinars: DEFAULT_TRAINING_DATA.webinars,
            especialistas: DEFAULT_TRAINING_DATA.especialistas,
            organizaciones: {
              ...DEFAULT_TRAINING_DATA.organizaciones,
              programs: DEFAULT_TRAINING_DATA.organizaciones.programs,
              benefits: DEFAULT_TRAINING_DATA.organizaciones.benefits,
            },
            calendario: DEFAULT_TRAINING_DATA.calendario,
          };
          localStorage.setItem(TRAINING_STORAGE_KEY, JSON.stringify(sanitized));
          return sanitized;
        }

        return {
          ...DEFAULT_TRAINING_DATA,
          ...parsed,
          diplomados: parsed.diplomados?.length ? parsed.diplomados.slice(0, 1) : DEFAULT_TRAINING_DATA.diplomados,
          cursos: parsed.cursos?.length ? parsed.cursos.slice(0, 1) : DEFAULT_TRAINING_DATA.cursos,
          webinars: parsed.webinars?.length ? parsed.webinars.slice(0, 1) : DEFAULT_TRAINING_DATA.webinars,
          especialistas: parsed.especialistas?.length ? parsed.especialistas.slice(0, 1) : DEFAULT_TRAINING_DATA.especialistas,
          organizaciones: {
            ...DEFAULT_TRAINING_DATA.organizaciones,
            ...(parsed.organizaciones || {}),
            programs: parsed.organizaciones?.programs?.length
              ? parsed.organizaciones.programs.slice(0, 1)
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
      localStorage.setItem(TRAINING_STORAGE_KEY, JSON.stringify(DEFAULT_TRAINING_DATA));
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

  const [alliances, setAlliances] = useState(() => {
    try {
      const stored = localStorage.getItem(ALLIANCES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const synced = DEFAULT_ALLIANCES_LIST.map((def) => {
            const match = parsed.find((p) => p.id === def.id);
            return match ? { ...def, ...match, logo: def.logo } : def;
          });
          localStorage.setItem(ALLIANCES_STORAGE_KEY, JSON.stringify(synced));
          return synced;
        }
      }
      localStorage.setItem(ALLIANCES_STORAGE_KEY, JSON.stringify(DEFAULT_ALLIANCES_LIST));
      return DEFAULT_ALLIANCES_LIST;
    } catch {
      return DEFAULT_ALLIANCES_LIST;
    }
  });

  const [governanceMembers, setGovernanceMembers] = useState(() => {
    try {
      const stored = localStorage.getItem(GOVERNANCE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filtrar miembros de prueba o residuales (Elena Vance, Mateo Morales)
          const cleaned = parsed.filter((m) => {
            const name = (m.name || '').toUpperCase();
            const id = (m.id || '').toLowerCase();
            return (
              id !== 'elena-vance' &&
              id !== 'mateo-morales' &&
              !name.includes('ELENA VANCE') &&
              !name.includes('MATEO MORALES')
            );
          });

          // Inyectar los 5 miembros oficiales verificados si no están en la lista
          const existingIds = new Set(cleaned.map((m) => m.id));
          DEFAULT_GOVERNANCE_MEMBERS.forEach((defM) => {
            if (!existingIds.has(defM.id)) {
              cleaned.push(defM);
            }
          });

          // Sincronizar atributos institucionales de los miembros oficiales
          const finalMembers = cleaned.map((m) => {
            const officialMatch = DEFAULT_GOVERNANCE_MEMBERS.find((defM) => defM.id === m.id);
            let imgUrl = m.img || officialMatch?.img || '';
            if (typeof imgUrl === 'string' && imgUrl.startsWith('/src/imports/')) {
              imgUrl = imgUrl.replace('/src/imports/', '/imports/');
            }
            if (officialMatch && (!imgUrl || imgUrl.includes('drive.google.com') || imgUrl.includes('placeholder') || imgUrl.includes('unsplash'))) {
              imgUrl = officialMatch.img;
            }
            if (officialMatch) {
              return {
                ...officialMatch,
                ...m,
                img: imgUrl || officialMatch.img,
                bio: m.bio || officialMatch.bio,
                responsibilities:
                  m.responsibilities && m.responsibilities.length > 0
                    ? m.responsibilities
                    : officialMatch.responsibilities,
              };
            }
            return {
              ...m,
              img: imgUrl,
            };
          });

          finalMembers.sort((a, b) => (parseInt(a.num, 10) || 99) - (parseInt(b.num, 10) || 99));

          localStorage.setItem(GOVERNANCE_STORAGE_KEY, JSON.stringify(finalMembers));
          return finalMembers;
        }
      }
      localStorage.setItem(GOVERNANCE_STORAGE_KEY, JSON.stringify(DEFAULT_GOVERNANCE_MEMBERS));
      return DEFAULT_GOVERNANCE_MEMBERS;
    } catch {
      return DEFAULT_GOVERNANCE_MEMBERS;
    }
  });

  // Limpieza reactiva en caso de que persistan vestigios en localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(GOVERNANCE_STORAGE_KEY);
      if (
        stored &&
        (stored.toUpperCase().includes('ELENA VANCE') ||
          stored.toUpperCase().includes('MATEO MORALES') ||
          stored.includes('elena-vance') ||
          stored.includes('mateo-morales'))
      ) {
        setGovernanceMembers((prev) => {
          const cleaned = prev.filter((m) => {
            const name = (m.name || '').toUpperCase();
            const id = (m.id || '').toLowerCase();
            return (
              id !== 'elena-vance' &&
              id !== 'mateo-morales' &&
              !name.includes('ELENA VANCE') &&
              !name.includes('MATEO MORALES')
            );
          });
          const existingIds = new Set(cleaned.map((m) => m.id));
          DEFAULT_GOVERNANCE_MEMBERS.forEach((defM) => {
            if (!existingIds.has(defM.id)) cleaned.push(defM);
          });
          cleaned.sort((a, b) => (parseInt(a.num, 10) || 99) - (parseInt(b.num, 10) || 99));
          localStorage.setItem(GOVERNANCE_STORAGE_KEY, JSON.stringify(cleaned));
          return cleaned;
        });
      }
    } catch (err) {
      console.warn('Error sanitizing governance storage:', err);
    }
  }, []);

  // Sincronizar automáticamente datos de gobernanza de localStorage con el proyecto
  useEffect(() => {
    try {
      const stored = localStorage.getItem(GOVERNANCE_STORAGE_KEY);
      if (stored) {
        fetch('/__api/sync-governance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: stored,
        }).catch(() => {});
      }
    } catch (e) {}
  }, []);

  // Limpieza reactiva de pop-ups residuales en caso de persistir en localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(POPUPS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          Array.isArray(parsed) &&
          (parsed.length > 1 ||
            parsed.some(
              (p) =>
                p.id === 'popup-001' ||
                p.id === 'popup-002' ||
                p.id === 'popup-003' ||
                p.id === 'popup-004' ||
                p.targetRoute !== '/'
            ))
        ) {
          setPopups(INITIAL_POPUPS_LIST);
          localStorage.setItem(POPUPS_STORAGE_KEY, JSON.stringify(INITIAL_POPUPS_LIST));
        }
      }
    } catch (err) {
      console.warn('Error sanitizing popups storage:', err);
    }
  }, []);

  // Limpieza reactiva de duplicados en capacitaciones (dejar exactamente 1 de cada una)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(TRAINING_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          parsed.diplomados?.length > 1 ||
          parsed.cursos?.length > 1 ||
          parsed.especialistas?.length > 1 ||
          parsed.organizaciones?.programs?.length > 1 ||
          (parsed.calendario && parsed.calendario.length > 5)
        ) {
          setTrainingData((prev) => {
            const cleaned = {
              ...prev,
              diplomados: prev.diplomados?.slice(0, 1) || DEFAULT_TRAINING_DATA.diplomados,
              cursos: prev.cursos?.slice(0, 1) || DEFAULT_TRAINING_DATA.cursos,
              webinars: prev.webinars?.slice(0, 1) || DEFAULT_TRAINING_DATA.webinars,
              especialistas: prev.especialistas?.slice(0, 1) || DEFAULT_TRAINING_DATA.especialistas,
              organizaciones: {
                ...prev.organizaciones,
                programs: prev.organizaciones?.programs?.slice(0, 1) || DEFAULT_TRAINING_DATA.organizaciones.programs,
              },
              calendario: DEFAULT_TRAINING_DATA.calendario,
            };
            localStorage.setItem(TRAINING_STORAGE_KEY, JSON.stringify(cleaned));
            return cleaned;
          });
        }
      }
    } catch (err) {
      console.warn('Error sanitizing training storage:', err);
    }
  }, []);

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

  useEffect(() => {
    localStorage.setItem(ALLIANCES_STORAGE_KEY, JSON.stringify(alliances));
  }, [alliances]);

  useEffect(() => {
    localStorage.setItem(GOVERNANCE_STORAGE_KEY, JSON.stringify(governanceMembers));
  }, [governanceMembers]);

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

  // ─── GESTIÓN DE ALIADOS INSTITUCIONALES ───
  const saveAlliance = (allianceData) => {
    setAlliances((prev) => {
      const idx = prev.findIndex((a) => a.id === allianceData.id);
      let updated;
      if (idx >= 0) {
        updated = [...prev];
        updated[idx] = { ...updated[idx], ...allianceData };
      } else {
        updated = [...prev, allianceData];
      }
      return updated;
    });
  };

  const deleteAlliance = (id) => {
    setAlliances((prev) => prev.filter((a) => a.id !== id));
  };

  const resetAlliancesToDefaults = () => {
    setAlliances(DEFAULT_ALLIANCES_LIST);
    localStorage.setItem(ALLIANCES_STORAGE_KEY, JSON.stringify(DEFAULT_ALLIANCES_LIST));
  };

  // ─── GESTIÓN DE CUERPO DE GOBERNANZA ───
  const saveGovernanceMember = (memberData) => {
    setGovernanceMembers((prev) => {
      const idx = prev.findIndex((m) => m.id === memberData.id);
      let updated;
      if (idx >= 0) {
        updated = [...prev];
        updated[idx] = { ...updated[idx], ...memberData };
      } else {
        updated = [...prev, memberData];
      }
      return updated;
    });
  };

  const deleteGovernanceMember = (id) => {
    setGovernanceMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const resetGovernanceToDefaults = () => {
    setGovernanceMembers(DEFAULT_GOVERNANCE_MEMBERS);
    localStorage.setItem(GOVERNANCE_STORAGE_KEY, JSON.stringify(DEFAULT_GOVERNANCE_MEMBERS));
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
        alliances,
        saveAlliance,
        deleteAlliance,
        resetAlliancesToDefaults,
        governanceMembers,
        saveGovernanceMember,
        deleteGovernanceMember,
        resetGovernanceToDefaults,
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
