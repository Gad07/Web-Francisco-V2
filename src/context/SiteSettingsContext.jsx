import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_GOVERNANCE_MEMBERS } from '../data/governanceData.js';
import { fetchAllDbData, saveDbCollection } from '../utils/api.js';

const SETTINGS_STORAGE_KEY = 'cga_site_settings_v6';
const POPUPS_STORAGE_KEY = 'cga_popups_list';
const TRAINING_STORAGE_KEY = 'cga_training_data_v6';
const APPLICATIONS_STORAGE_KEY = 'cga_training_applications_v6';
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
    name: 'Alas Metropolitanas',
    shortName: 'Alas Metropolitanas',
    acronym: 'ALAS',
    type: 'territorial',
    scope: { es: 'Territorial · Biodiversidad Urbana', en: 'Territorial · Urban Biodiversity' },
    role: {
      es: 'Conservación de fauna aviar, protección de corredores biológicos y biodiversidad metropolitana.',
      en: 'Avian wildlife conservation, biological corridor protection and metropolitan biodiversity.',
    },
    tag: 'Biodiversidad Urbana',
    logo: '/imports/Logos/alasmetropolitanas.jpg',
    website: 'https://mexicoporelclima.com/',
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
    message: 'Consejo Global Ambiental · Plataforma Institucional de Custodia Biocultural y Diplomacia Ambiental.',
    showCta: true,
    ctaText: 'Conocer más',
    ctaLink: '/contacto',
    theme: 'moss', // 'moss' | 'beige' | 'terracotta' | 'custom'
    bgColor: '#4a5a22',
    textColor: '#f5efe3',
    gradientEnabled: false,
    gradientDirection: 'to-r', // 'to-r' | 'to-b' | 'to-br' | 'radial'
    gradientFrom: '#4a5a22',
    gradientTo: '#2d3813',
    marqueeTexts: [
      'Consejo Global Ambiental · Plataforma Institucional',
      'Monitoreo satelital activo en 47 corredores bioculturales',
      'Asamblea Global Ambiental · Ginebra',
      'Custodia biocultural y gobernanza territorial',
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
  stats: [],
  diplomados: [],
  cursos: [],
  webinars: [],
  especialistas: [],
  organizaciones: {
    subtitle: { es: 'Soluciones Institucionales a Medida', en: 'Tailored Institutional Solutions' },
    title: { es: 'Programas para Organizaciones, Gobiernos y Empresas', en: 'Custom Programs for Organizations, Governments & Corporations' },
    description: {
      es: 'Diseñamos diagnósticos integrales de madurez ecológica y capacitamos a gabinetes ministeriales, equipos corporativos y operadores territoriales bajo solicitud formal.',
      en: 'We design comprehensive ecological maturity assessments and train institutional teams under formal request.',
    },
    ctaText: { es: 'Solicitar Propuesta Institucional', en: 'Request Institutional Proposal' },
    programs: [],
    benefits: [],
  },
  calendario: [],
};

const DEFAULT_APPLICATIONS = [];

const SiteSettingsContext = createContext(null);

export function SiteSettingsProvider({ children }) {
  // Lista de pop-ups
  const [popups, setPopups] = useState(() => {
    try {
      const stored = localStorage.getItem(POPUPS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
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
          ...(parsed || {}),
          diplomados: Array.isArray(parsed?.diplomados) ? parsed.diplomados : [],
          cursos: Array.isArray(parsed?.cursos) ? parsed.cursos : [],
          webinars: Array.isArray(parsed?.webinars) ? parsed.webinars : [],
          especialistas: Array.isArray(parsed?.especialistas) ? parsed.especialistas : [],
          organizaciones: {
            ...DEFAULT_TRAINING_DATA.organizaciones,
            ...(parsed?.organizaciones || {}),
            programs: Array.isArray(parsed?.organizaciones?.programs) ? parsed.organizaciones.programs : [],
            benefits: Array.isArray(parsed?.organizaciones?.benefits) ? parsed.organizaciones.benefits : [],
          },
          calendario: Array.isArray(parsed?.calendario) ? parsed.calendario : [],
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

  const [alliances, setAlliances] = useState(() => {
    try {
      const stored = localStorage.getItem(ALLIANCES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
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
          return parsed;
        }
      }
      return DEFAULT_GOVERNANCE_MEMBERS;
    } catch {
      return DEFAULT_GOVERNANCE_MEMBERS;
    }
  });

  // Sincronización inicial automática desde MySQL en Hostinger
  useEffect(() => {
    let isMounted = true;
    fetchAllDbData().then((dbData) => {
      if (!isMounted || !dbData || !dbData.success) return;

      if (dbData.siteSettings) {
        setSiteSettings((prev) => ({ ...prev, ...dbData.siteSettings }));
        try { localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(dbData.siteSettings)); } catch {}
      }
      if (Array.isArray(dbData.alliances)) {
        setAlliances(dbData.alliances);
        try { localStorage.setItem(ALLIANCES_STORAGE_KEY, JSON.stringify(dbData.alliances)); } catch {}
      }
      if (Array.isArray(dbData.governanceMembers)) {
        setGovernanceMembers(dbData.governanceMembers);
        try { localStorage.setItem(GOVERNANCE_STORAGE_KEY, JSON.stringify(dbData.governanceMembers)); } catch {}
      }
      if (Array.isArray(dbData.popups)) {
        setPopups(dbData.popups);
        try { localStorage.setItem(POPUPS_STORAGE_KEY, JSON.stringify(dbData.popups)); } catch {}
      }
      if (dbData.trainingData && typeof dbData.trainingData === 'object') {
        setTrainingData((prev) => ({ ...prev, ...dbData.trainingData }));
        try { localStorage.setItem(TRAINING_STORAGE_KEY, JSON.stringify(dbData.trainingData)); } catch {}
      }
      if (Array.isArray(dbData.applications)) {
        setApplications(dbData.applications);
        try { localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(dbData.applications)); } catch {}
      }
    });
    return () => { isMounted = false; };
  }, []);

  // Sincronización automática entre pestañas abiertas (Admin <-> Sitio Web)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (!e.newValue) return;
      try {
        if (e.key === ALLIANCES_STORAGE_KEY) {
          setAlliances(JSON.parse(e.newValue));
        } else if (e.key === GOVERNANCE_STORAGE_KEY) {
          setGovernanceMembers(JSON.parse(e.newValue));
        } else if (e.key === SETTINGS_STORAGE_KEY) {
          setSiteSettings(JSON.parse(e.newValue));
        } else if (e.key === POPUPS_STORAGE_KEY) {
          setPopups(JSON.parse(e.newValue));
        } else if (e.key === TRAINING_STORAGE_KEY) {
          setTrainingData(JSON.parse(e.newValue));
        }
      } catch (err) {
        console.warn('Error syncing storage event:', err);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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
      try { localStorage.setItem(POPUPS_STORAGE_KEY, JSON.stringify(updated)); } catch {}
      saveDbCollection('popups', updated);
      return updated;
    });
  };

  const togglePopupStatus = (id, targetState = null) => {
    setPopups((prev) => {
      const updated = prev.map((p) => {
        if (p.id === id) {
          const newState = targetState !== null ? targetState : !p.enabled;
          return { ...p, enabled: newState };
        }
        return p;
      });
      try { localStorage.setItem(POPUPS_STORAGE_KEY, JSON.stringify(updated)); } catch {}
      saveDbCollection('popups', updated);
      return updated;
    });
  };

  const deletePopup = (id) => {
    setPopups((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try { localStorage.setItem(POPUPS_STORAGE_KEY, JSON.stringify(updated)); } catch {}
      saveDbCollection('popups', updated);
      return updated;
    });
  };

  const duplicatePopup = (id) => {
    const orig = popups.find((p) => p.id === id);
    if (!orig) return;
    const duplicated = {
      ...JSON.parse(JSON.stringify(orig)),
      id: `popup-${Date.now()}`,
      name: `[Copia] ${orig.name}`,
      enabled: false,
    };
    setPopups((prev) => {
      const updated = [duplicated, ...prev];
      try { localStorage.setItem(POPUPS_STORAGE_KEY, JSON.stringify(updated)); } catch {}
      saveDbCollection('popups', updated);
      return updated;
    });
  };

  const resetPopupsToDefaults = () => {
    setPopups(INITIAL_POPUPS_LIST);
    try { localStorage.setItem(POPUPS_STORAGE_KEY, JSON.stringify(INITIAL_POPUPS_LIST)); } catch {}
    saveDbCollection('popups', INITIAL_POPUPS_LIST);
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
    setSiteSettings((prev) => {
      const updated = {
        ...prev,
        banner: { ...prev.banner, ...bannerData },
      };
      try { localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated)); } catch {}
      saveDbCollection('settings', updated);
      return updated;
    });
  };

  const updateTrainingData = (updater) => {
    setTrainingData((prev) => {
      const updated = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      try { localStorage.setItem(TRAINING_STORAGE_KEY, JSON.stringify(updated)); } catch {}
      saveDbCollection('training', updated);
      return updated;
    });
  };

  const addApplication = (app) => {
    const newApp = {
      ...app,
      id: `app-${Date.now()}`,
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }),
      status: 'Pendiente',
    };
    setApplications((prev) => {
      const updated = [newApp, ...prev];
      try { localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(updated)); } catch {}
      saveDbCollection('applications', updated);
      return updated;
    });
  };

  const updateApplicationStatus = (id, newStatus) => {
    setApplications((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a));
      try { localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(updated)); } catch {}
      saveDbCollection('applications', updated);
      return updated;
    });
  };

  const deleteApplication = (id) => {
    setApplications((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      try { localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(updated)); } catch {}
      saveDbCollection('applications', updated);
      return updated;
    });
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
      try { localStorage.setItem(ALLIANCES_STORAGE_KEY, JSON.stringify(updated)); } catch {}
      saveDbCollection('alliances', updated);
      return updated;
    });
  };

  const deleteAlliance = (id) => {
    setAlliances((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      try { localStorage.setItem(ALLIANCES_STORAGE_KEY, JSON.stringify(updated)); } catch {}
      saveDbCollection('alliances', updated);
      return updated;
    });
  };

  const resetAlliancesToDefaults = () => {
    setAlliances(DEFAULT_ALLIANCES_LIST);
    try { localStorage.setItem(ALLIANCES_STORAGE_KEY, JSON.stringify(DEFAULT_ALLIANCES_LIST)); } catch {}
    saveDbCollection('alliances', DEFAULT_ALLIANCES_LIST);
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
      try { localStorage.setItem(GOVERNANCE_STORAGE_KEY, JSON.stringify(updated)); } catch {}
      saveDbCollection('governance', updated);
      return updated;
    });
  };

  const deleteGovernanceMember = (id) => {
    setGovernanceMembers((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      try { localStorage.setItem(GOVERNANCE_STORAGE_KEY, JSON.stringify(updated)); } catch {}
      saveDbCollection('governance', updated);
      return updated;
    });
  };

  const resetGovernanceToDefaults = () => {
    setGovernanceMembers(DEFAULT_GOVERNANCE_MEMBERS);
    try { localStorage.setItem(GOVERNANCE_STORAGE_KEY, JSON.stringify(DEFAULT_GOVERNANCE_MEMBERS)); } catch {}
    saveDbCollection('governance', DEFAULT_GOVERNANCE_MEMBERS);
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
