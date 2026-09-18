import { useState, useRef } from "react";
import { PageHero } from "../components/layout/PageHero";
import { useInView } from "../hooks/useInView";
import { Link } from "react-router-dom";

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categorySlug: string;
  location: string;
  status: string;
  desc: string;
  fullDesc: string;
  challenge: string;
  solution: string;
  img: string;
  gallery: string[];
  ods: { num: string; name: string }[];
  metrics: { val: string; label: string; desc: string }[];
  deliverables: string[];
  partners: string[];
  timeline: string;
}

export default function Projects() {
  const { ref: introRef, inView: introInView } = useInView(0.1);
  const { ref: consoleRef, inView: consoleInView } = useInView(0.1);
  const { ref: territoryRef, inView: territoryInView } = useInView(0.1);
  const { ref: methodRef, inView: methodInView } = useInView(0.1);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "metrics" | "deliverables" | "governance">("overview");
  const [activeTerritory, setActiveTerritory] = useState<number>(0);
  const [activeMethodStep, setActiveMethodStep] = useState<number>(0);

  const detailRef = useRef<HTMLDivElement>(null);
  const territoryCarouselRef = useRef<HTMLDivElement>(null);
  const [activeTerritoryIdx, setActiveTerritoryIdx] = useState<number>(0);

  const handleScrollTerritory = (direction: "left" | "right") => {
    if (territoryCarouselRef.current) {
      const cardWidth = territoryCarouselRef.current.firstElementChild?.clientWidth || 380;
      const scrollAmount = direction === "left" ? -(cardWidth + 24) : (cardWidth + 24);
      territoryCarouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollToTerritoryIndex = (idx: number) => {
    if (territoryCarouselRef.current) {
      const cards = territoryCarouselRef.current.children;
      if (cards[idx]) {
        cards[idx].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
        setActiveTerritoryIdx(idx);
      }
    }
  };

  const categories = [
    {
      id: "all",
      label: "Todos los proyectos",
      count: 6,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      ),
    },
    {
      id: "territorio",
      label: "Gobernanza Territorial",
      count: 2,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
          <line x1="8" y1="2" x2="8" y2="18"></line>
          <line x1="16" y1="6" x2="16" y2="22"></line>
        </svg>
      ),
    },
    {
      id: "politica",
      label: "Políticas Públicas",
      count: 1,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="21" x2="21" y2="21"></line>
          <line x1="6" y1="21" x2="6" y2="10"></line>
          <line x1="18" y1="21" x2="18" y2="10"></line>
          <line x1="12" y1="21" x2="12" y2="10"></line>
          <polygon points="12 3 3 8 21 8 12 3"></polygon>
        </svg>
      ),
    },
    {
      id: "cooperacion",
      label: "Cooperación Internacional",
      count: 1,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      ),
    },
    {
      id: "esg",
      label: "ESG & Sector Privado",
      count: 1,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
    },
    {
      id: "biodiversidad",
      label: "Cuencas & Biodiversidad",
      count: 1,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
        </svg>
      ),
    },
  ];

  const projects: ProjectItem[] = [
    {
      id: "hambre-cero",
      title: "Gobernanza Ambiental para el Hambre Cero",
      subtitle: "Reconocimiento Internacional WESS 2026",
      category: "Gobernanza Territorial",
      categorySlug: "territorio",
      location: "México y Corredores Agrícolas Rurales",
      status: "Fase Activa Territorial • Multianual",
      timeline: "2024–2028",
      desc: "Modelo integral que articula la conservación de suelos agrícolas degradados, bancos comunitarios de semillas criollas y seguridad alimentaria en comunidades vulnerables.",
      fullDesc: "Galardonado por el World Environmental Sustainability Summit (WESS 2026), este proyecto aborda la degradación de la tierra fértil y la pérdida de soberanía alimentaria en territorios rurales. Integra parcelas demostrativas agroecológicas, cosecha de agua pluvial y capacitación sin insumos químicos industriales.",
      challenge: "Degradación acelerada de suelos por monocultivo, encarecimiento de fertilizantes sintéticos y pérdida progresiva de germoplasma nativo.",
      solution: "Creación de bancos comunitarios de germoplasma, regeneración microbiológica del suelo con biofertilizantes y circuitos cortos de comercialización justa.",
      img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1400&h=900&fit=crop&auto=format",
      gallery: [
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=600&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&h=600&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&h=600&fit=crop&auto=format",
      ],
      ods: [
        { num: "ODS 02", name: "Hambre Cero" },
        { num: "ODS 12", name: "Producción Responsable" },
        { num: "ODS 15", name: "Vida Ecosistemas Terrestres" },
      ],
      metrics: [
        { val: "16,890+", label: "Personas beneficiadas", desc: "Familias rurales y pequeños productores capacitados" },
        { val: "1,500+", label: "Variedades criollas", desc: "Accesiones de semillas preservadas en bancos vivos" },
        { val: "420 ha", label: "Suelo regenerado", desc: "Superficie bajo manejo agroecológico y retención de agua" },
      ],
      deliverables: [
        "Red de 8 bancos comunitarios de germoplasma campesino",
        "Manual técnico de biopreparados y manejo de microbiología del suelo",
        "Sistemas de captación de agua pluvial para riego suplementario",
        "Protocolo de trazabilidad y certificación agroecológica local",
      ],
      partners: [
        "Asambleas Ejidales y Comunidades Agrarias",
        "Facultades de Ciencias Agrícolas y Biología",
        "Gobiernos Locales y Comités de Cuenca",
      ],
    },
    {
      id: "reinsercion",
      title: "Reinserción Socioambiental & Derechos Humanos",
      subtitle: "Iniciativa Legislativa en Parlamento CDMX",
      category: "Políticas Públicas",
      categorySlug: "politica",
      location: "Áreas Naturales Protegidas • Ciudad de México",
      status: "Dictamen Favorable en Parlamento",
      timeline: "2025–2027",
      desc: "Marco normativo y operativo para vincular la reinserción social con brigadas remuneradas de conservación, combate a incendios y saneamiento forestal.",
      fullDesc: "Propuesta de reforma formulada ante el Parlamento de Medio Ambiente de la Ciudad de México que concilia la justicia cívica restaurativa con las necesidades urgentes de restauración en las Áreas Naturales Protegidas y suelo de conservación. Otorga certificación técnica oficial y estipendio digno a personas en procesos de reinserción.",
      challenge: "Falta de oportunidades laborales dignas para personas preliberadas y déficit crónico de brigadistas en áreas naturales protegidas con alta presión urbana.",
      solution: "Programa de empleo verde formativo en prevención de incendios, control de plagas y reforestación comunitaria con acompañamiento psicosocial.",
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1400&h=900&fit=crop&auto=format",
      gallery: [
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop&auto=format",
      ],
      ods: [
        { num: "ODS 08", name: "Trabajo Decente" },
        { num: "ODS 15", name: "Ecosistemas Terrestres" },
        { num: "ODS 16", name: "Paz, Justicia e Instituciones" },
      ],
      metrics: [
        { val: "3 ANP", label: "Polígonos intervenidos", desc: "Desierto de los Leones, Ajusco y Bosque de Tlalpan" },
        { val: "350+", label: "Personas acreditadas", desc: "Certificación oficial en combate y prevención de incendios" },
        { val: "45,000", label: "Árboles nativos", desc: "Especies nativas plantadas con sobrevivencia superior al 85%" },
      ],
      deliverables: [
        "Iniciativa con proyecto de decreto legislativo articulada y presentada",
        "Manual de estándares de competencia laboral en saneamiento forestal",
        "Protocolo de salvaguardas y derechos humanos para brigadistas",
        "Mecanismo de evaluación de impacto socioambiental periódico",
      ],
      partners: [
        "Comisiones de Derechos Humanos Estatales",
        "Secretarías de Medio Ambiente y Protección Ciudadana",
        "Organizaciones Civiles de Reinserción Social",
      ],
    },
    {
      id: "ruta-mex-can",
      title: "Ruta Biocultural México–Canadá",
      subtitle: "Empoderamiento Femenino y Bioeconomía",
      category: "Cooperación Internacional",
      categorySlug: "cooperacion",
      location: "Canadá y Territorios Forestales de México",
      status: "Convenio Binacional en Ejecución",
      timeline: "2025–2028",
      desc: "Cooperación bilateral orientada a cooperativas de mujeres rurales para la comercialización ética de productos forestales no maderables y saberes ancestrales.",
      fullDesc: "Plataforma de intercambio técnico y diplomático que une a comunidades indígenas de México y Canadá en el desarrollo de cadenas de valor regenerativas. Transfiere tecnología limpia para la extracción y envasado de mieles meliponas, resinas aromáticas, fibras de maguey y plantas medicinales con sellos de trazabilidad.",
      challenge: "Intermediación abusiva en la comercialización de productos silvestres y falta de acceso directo a mercados internacionales de comercio justo.",
      solution: "Creación de un consorcio de exportación directa, certificación de buenas prácticas silvícolas y formación financiera para liderazgos comunitarios de mujeres.",
      img: "https://images.unsplash.com/photo-1592417817098-8f3d6ef2c6e1?w=1400&h=900&fit=crop&auto=format",
      gallery: [
        "https://images.unsplash.com/photo-1592417817098-8f3d6ef2c6e1?w=800&h=600&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&h=600&fit=crop&auto=format",
      ],
      ods: [
        { num: "ODS 05", name: "Igualdad de Género" },
        { num: "ODS 08", name: "Crecimiento Inclusivo" },
        { num: "ODS 17", name: "Alianzas Internacionales" },
      ],
      metrics: [
        { val: "28", label: "Cooperativas activas", desc: "Grupos productivos liderados al 100% por mujeres rurales" },
        { val: "14", label: "Sellos de origen verde", desc: "Líneas de productos forestales no maderables con registro" },
        { val: "2", label: "Naciones articuladas", desc: "Misiones técnicas y comerciales bilaterales permanentes" },
      ],
      deliverables: [
        "Protocolo binacional de bioeconomía forestal comunitaria",
        "Plataforma de comercio justo sin intermediación especulativa",
        "Programa de becas y pasantías técnicas México–Canadá",
        "Laboratorio de pruebas de pureza e inocuidad botánica",
      ],
      partners: [
        "Redes Binacionales de Mujeres Indígenas",
        "Agencias de Cooperación Internacional",
        "Universidades y Laboratorios Agroindustriales",
      ],
    },
    {
      id: "agendas-estatales",
      title: "Agendas Ambientales Estatales y Ordenamiento",
      subtitle: "Hojas de Ruta Técnicas con Visión Territorial",
      category: "Gobernanza Territorial",
      categorySlug: "territorio",
      location: "5 Entidades Federativas",
      status: "Hojas de Ruta Transferidas a Gobiernos",
      timeline: "2024–2026",
      desc: "Diagnósticos territoriales participativos y diseño de instrumentos vinculantes de ordenamiento ecológico y resiliencia climática.",
      fullDesc: "Asistencia técnica integral a gobiernos estatales para armonizar sus leyes locales con los tratados climáticos globales y resolver conflictos de uso de suelo. Incorpora mapas satelitales de calor hídrico, delimitación de zonas de recarga de acuíferos y mesas de concertación ejidal.",
      challenge: "Desactualización de planes de ordenamiento ecológico, vacíos normativos y desarticulación entre los tres órdenes de gobierno.",
      solution: "Metodología participativa de diagnóstico rápido, mesas de concertación técnica multisectorial y redacción de reglamentos ecológicos modernos.",
      img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1400&h=900&fit=crop&auto=format",
      gallery: [
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&auto=format",
      ],
      ods: [
        { num: "ODS 11", name: "Comunidades Sostenibles" },
        { num: "ODS 13", name: "Acción por el Clima" },
        { num: "ODS 16", name: "Instituciones Sólidas" },
      ],
      metrics: [
        { val: "5", label: "Estados asesorados", desc: "Entidades con diagnósticos y propuestas normativas entregadas" },
        { val: "44", label: "Talleres territoriales", desc: "Asambleas de consulta comunitaria y técnica realizadas" },
        { val: "100%", label: "Metas ODS alineadas", desc: "Matriz de indicadores auditables ante la ONU" },
      ],
      deliverables: [
        "Atlas geoespacial de vulnerabilidad climática y recarga de acuíferos",
        "Paquete de reformas a leyes estatales de equilibrio ecológico",
        "Instalación de consejos ciudadanos de vigilancia ambiental",
        "Guía metodológica para presupuestos verdes municipales",
      ],
      partners: [
        "Secretarías Estatales de Medio Ambiente",
        "Institutos Municipales de Planeación Urbana",
        "Colegios de Ingenieros y Urbanistas Ambientales",
      ],
    },
    {
      id: "estrategias-esg",
      title: "Debida Diligencia & Estrategias ESG Corporativas",
      subtitle: "Auditoría de Cadena de Valor y Descarbonización",
      category: "ESG & Sector Privado",
      categorySlug: "esg",
      location: "Nivel Nacional e Internacional",
      status: "Servicio Técnico Permanente",
      timeline: "Continuo",
      desc: "Acompañamiento a empresas para auditar su impacto en biodiversidad, descarbonizar cadenas de suministro y asegurar gobernanza ética.",
      fullDesc: "Servicio especializado para empresas industriales, inmobiliarias y agropecuarias que requieren transformar sus operaciones hacia estándares internacionales de debida diligencia ambiental. Aplica metodologías Science Based Targets (SBTi) y mecanismos de compensación con impacto territorial real.",
      challenge: "Riesgos de greenwashing, marcos regulatorios internacionales cada vez más exigentes (CSRD/ISSB) y presión de inversionistas éticos.",
      solution: "Auditorías independientes de ciclo de vida, modelos de economía circular in situ e inversión directa en conservación territorial con ejidos.",
      img: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1400&h=900&fit=crop&auto=format",
      gallery: [
        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&auto=format",
      ],
      ods: [
        { num: "ODS 09", name: "Industria e Innovación" },
        { num: "ODS 12", name: "Consumo Responsable" },
        { num: "ODS 13", name: "Acción Climática" },
      ],
      metrics: [
        { val: "-32%", label: "Huella hídrica promedio", desc: "Reducción lograda en procesos industriales auditados" },
        { val: "18", label: "Cadenas corporativas", desc: "Empresas con programas integrales de debida diligencia" },
        { val: "100%", label: "Reportes auditables", desc: "Cumplimiento estricto de estándares globales GRI e ISSB" },
      ],
      deliverables: [
        "Dictamen de materialidad ambiental independiente",
        "Estrategia de compensación con restauración forestal local verificada",
        "Código de conducta y debida diligencia para proveedores",
        "Capacitación ejecutiva en riesgos climáticos y transición justa",
      ],
      partners: [
        "Cámaras Industriales y Comerciales",
        "Fondos de Inversión de Impacto y Bancas de Desarrollo",
        "Organismos de Certificación y Normalización Internacional",
      ],
    },
    {
      id: "humedales-cuencas",
      title: "Rescate Biocultural de Humedales y Chinampas",
      subtitle: "Patrimonio de la Humanidad y Resiliencia Hídrica",
      category: "Cuencas & Biodiversidad",
      categorySlug: "biodiversidad",
      location: "Xochimilco, Tláhuac y Cuenca del Valle de México",
      status: "Acción Continua de Conservación",
      timeline: "2023–2030",
      desc: "Rehabilitación de canales prehispánicos, protección del ajolote y reactivación de chinampas productivas con monitoreo de calidad hídrica.",
      fullDesc: "Intervención territorial en el Área Natural Protegida Ejidos de Xochimilco y San Gregorio Atlapulco para restaurar refugios de fauna endémica, instalar biofiltros con flora nativa y brindar defensa jurídica a ejidatarios frente a presiones urbanas e invasiones clandestinas.",
      challenge: "Contaminación por descargas residuales, hundimientos diferenciales, proliferación de especies exóticas invasoras y abandono agrícola.",
      solution: "Biofiltros vegetales de tule y lirio en canales piloto, refugios acuáticos para ajolote y reactivación productiva de chinampas con agroecología.",
      img: "https://images.unsplash.com/photo-1542841791-afe1f1488c56?w=1400&h=900&fit=crop&auto=format",
      gallery: [
        "https://images.unsplash.com/photo-1542841791-afe1f1488c56?w=800&h=600&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1623880132570-ab1b4297c8c2?w=800&h=600&fit=crop&auto=format",
      ],
      ods: [
        { num: "ODS 06", name: "Agua Limpia y Saneamiento" },
        { num: "ODS 11", name: "Ciudades Sostenibles" },
        { num: "ODS 15", name: "Vida de Ecosistemas" },
      ],
      metrics: [
        { val: "18 km", label: "Canales desazolvados", desc: "Longitud de cauce tradicional saneado y con flujo restaurado" },
        { val: "12", label: "Refugios de ajolote", desc: "Unidades bioculturales con monitoreo genético y del agua" },
        { val: "95", label: "Chinampas activas", desc: "Parcelas tradicionales reincorporadas a la producción limpia" },
      ],
      deliverables: [
        "Monitoreo semanal de parámetros fisicoquímicos del agua",
        "Instalación de humedales artificiales y biofiltros de tule",
        "Censo de aves migratorias y fauna acuática endémica",
        "Acompañamiento legal en defensa comunitaria del suelo de conservación",
      ],
      partners: [
        "Asociaciones de Chinamperos Tradicionales",
        "Institutos de Biología y Limnología",
        "Autoridades de Conservación y Derechos Territoriales",
      ],
    },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.categorySlug === selectedCategory);

  const activeProject = activeProjectIndex !== null ? projects[activeProjectIndex] : null;

  const handleSelectProject = (index: number) => {
    setActiveProjectIndex(index);
    setActiveTab("overview");
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handlePrevProject = () => {
    if (activeProjectIndex === null) return;
    const nextIdx = activeProjectIndex === 0 ? projects.length - 1 : activeProjectIndex - 1;
    setActiveProjectIndex(nextIdx);
  };

  const handleNextProject = () => {
    if (activeProjectIndex === null) return;
    const nextIdx = activeProjectIndex === projects.length - 1 ? 0 : activeProjectIndex + 1;
    setActiveProjectIndex(nextIdx);
  };

  const [selectedPolygonIdx, setSelectedPolygonIdx] = useState<number>(0);

  const territoryPolygons = [
    {
      num: "01",
      code: "POL-01",
      title: "ANP Ejidos de Xochimilco y San Gregorio Atlapulco",
      shortTitle: "Xochimilco",
      category: "Cuencas & Humedales Prioritarios",
      location: "Xochimilco, Ciudad de México",
      summary: "Restauración integral de canales ancestrales, rescate de refugios acuáticos para el ajolote (Ambystoma mexicanum) y manejo de biofiltros con comunidades chinamperas.",
      statVal: "18 km",
      statLabel: "Canales Saneados",
      statSub: "12 refugios de ajolote • 95 chinampas",
      actions: [
        "Desazolve y saneamiento hidráulico de 18 km de canales prehispánicos.",
        "12 refugios acuáticos activos con monitoreo genético y del agua.",
        "Acompañamiento legal comunitario en defensa de títulos ejidales.",
      ],
      expediente: "CGA-TERR-XOCH-01",
      norm: 0.95,
    },
    {
      num: "02",
      code: "POL-02",
      title: "Suelo de Conservación del Valle de México",
      shortTitle: "Bosques & ANP",
      category: "Defensa Jurídica & Vigilancia Forestal",
      location: "Tlalpan, Milpa Alta y Magdalena Contreras",
      summary: "Prevención de delitos ambientales, detención de asentamientos irregulares y reforestación comunitaria con brigadas certificadas en zonas de recarga de acuíferos.",
      statVal: "45,000+",
      statLabel: "Árboles Nativos",
      statSub: "3 polígonos ANP • 350+ brigadistas",
      actions: [
        "Vigilancia comunitaria y prevención pericial de despojos boscosos.",
        "Brigadas técnicas remuneradas en combate y prevención de incendios.",
        "Plantación de especies nativas con sobrevivencia superior al 85%.",
      ],
      expediente: "CGA-TERR-CDMX-02",
      norm: 0.88,
    },
    {
      num: "03",
      code: "POL-03",
      title: "Bancos Vivos de Germoplasma y Semillas Criollas",
      shortTitle: "Germoplasma",
      category: "Biodiversidad Genética & Custodia",
      location: "Red Campesina e Interestatal",
      summary: "Preservación viva de semillas nativas y criollas de maíz, frijol y calabaza frente a la privatización y pérdida de germoplasma autóctono.",
      statVal: "1,500+",
      statLabel: "Semillas Criollas",
      statSub: "8 bancos vivos comunitarios instalados",
      actions: [
        "Red de 8 bancos comunitarios de germoplasma campesino.",
        "Protocolos de preservación viva y adaptación climática de semillas.",
        "Custodia y no privatización de variedades genéticas locales.",
      ],
      expediente: "CGA-TERR-GERM-03",
      norm: 0.93,
    },
    {
      num: "04",
      code: "POL-04",
      title: "Regeneración de Suelos Agrícolas y Manejo Orgánico",
      shortTitle: "Suelos Vivos",
      category: "Agroecología & Biopreparados",
      location: "Valles Agrícolas y Zonas Campesinas",
      summary: "Recuperación de la fertilidad microbiológica de suelos degradados mediante biopreparados locales, rotación de cultivos y retención de humedad pluvial.",
      statVal: "420 ha",
      statLabel: "Suelo Regenerado",
      statSub: "0% insumos químicos sintéticos",
      actions: [
        "Regeneración microbiológica de 420 ha de suelo agrícola.",
        "Laboratorios campesinos de biofertilizantes y compostaje.",
        "Sistemas de captación de agua pluvial para riego suplementario.",
      ],
      expediente: "CGA-TERR-SUEL-04",
      norm: 0.86,
    },
    {
      num: "05",
      code: "POL-05",
      title: "Corredores Rurales para la Soberanía Alimentaria",
      shortTitle: "Seguridad Rural",
      category: "Soberanía Alimentaria & Economía Local",
      location: "Comunidades Rurales de Alta Vulnerabilidad",
      summary: "Capacitación técnica a familias campesinas en agricultura biointensiva, huertos de traspatio y circuitos cortos de comercialización justa sin intermediarios.",
      statVal: "16,890+",
      statLabel: "Familias Beneficiadas",
      statSub: "44 talleres comunitarios impartidos",
      actions: [
        "Formación en agricultura biointensiva a 16,890+ personas.",
        "Circuitos de comercialización justa y consumo local.",
        "Seguimiento nutricional y de abasto en comunidades rurales.",
      ],
      expediente: "CGA-TERR-ALIM-05",
      norm: 0.96,
    },
    {
      num: "06",
      code: "POL-06",
      title: "Corredores Biológicos para Polinizadores Nativos",
      shortTitle: "Polinizadores",
      category: "Biodiversidad & Fauna Silvestre",
      location: "Puebla, Hidalgo y Morelos",
      summary: "Establecimiento de reservas botánicas de flora melífera nativa para la protección de abejas meliponas, mariposas monarca y murciélagos polinizadores.",
      statVal: "24",
      statLabel: "Islas Botánicas",
      statSub: "8 especies prioritarias • 100% mujeres rurales",
      actions: [
        "24 islas botánicas de vegetación melífera autóctona establecidas.",
        "Protección de rutas migratorias de mariposa monarca y fauna silvestre.",
        "Meliponicultura comunitaria con sellos de trazabilidad legal.",
      ],
      expediente: "CGA-TERR-POLI-06",
      norm: 0.90,
    },
  ];

  const methodologySteps = [
    {
      num: "01",
      title: "Diagnóstico & Dictamen Técnico",
      summary: "Revisión colegiada multidisciplinaria con análisis geoespacial, solvencia jurídica y viabilidad ecosistémica.",
      details: "Antes de cualquier intervención, el cuerpo directivo y consejeros honoríficos dictaminan la pertinencia del proyecto con base en datos empíricos y antecedentes territoriales.",
    },
    {
      num: "02",
      title: "Acuerdo & Consulta Comunitaria",
      summary: "Consentimiento previo e informado con asambleas ejidales, cooperativas y autoridades locales.",
      details: "Ningún proyecto se impone verticalmente. Se firman convenios formales de corresponsabilidad que respetan los usos, costumbres y títulos de propiedad legítimos.",
    },
    {
      num: "03",
      title: "Despliegue Operativo en Campo",
      summary: "Brigadas territoriales, transferencia de tecnología limpia y acompañamiento técnico permanente.",
      details: "Ejecución directa en suelo con personal certificado, medición en tiempo real de variables biofísicas y resolución técnica de contingencias in situ.",
    },
    {
      num: "04",
      title: "Auditoría & Trazabilidad ODS",
      summary: "Publicación abierta de indicadores de impacto verificables y relatorías de cumplimiento de metas globales.",
      details: "Cada entregable se somete a auditoría de desempeño con métricas de la Agenda 2030, disponibles para escrutinio público y organismos cooperantes.",
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20 selection:bg-[#85C441]/20">
      <PageHero
        titleWhite="Nuestros proyectos de"
        titleGreen="impacto territorial"
        description="Evidencia comprobable, rigor científico y experiencia técnica aplicada a la protección de ecosistemas, gobernanza y desarrollo sostenible comunitario."
        bgImage="https://images.unsplash.com/photo-1542841791-afe1f1488c56?w=1600&h=900&fit=crop"
      />

      {/* KPI Ticker Bar Institucional */}
      <section className="bg-neutral-50 border-b border-neutral-200/80 py-6 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-3">
            <span className="font-display text-3xl md:text-4xl font-bold text-[#85C441] block mb-1">
              16,890+
            </span>
            <span className="text-xs text-neutral-600 font-sans font-medium uppercase tracking-wider">
              Personas Beneficiadas
            </span>
          </div>
          <div className="p-3">
            <span className="font-display text-3xl md:text-4xl font-bold text-[#85C441] block mb-1">
              420+ ha
            </span>
            <span className="text-xs text-neutral-600 font-sans font-medium uppercase tracking-wider">
              Suelo Regenerado
            </span>
          </div>
          <div className="p-3">
            <span className="font-display text-3xl md:text-4xl font-bold text-[#85C441] block mb-1">
              1,500+
            </span>
            <span className="text-xs text-neutral-600 font-sans font-medium uppercase tracking-wider">
              Semillas Criollas
            </span>
          </div>
          <div className="p-3">
            <span className="font-display text-3xl md:text-4xl font-bold text-[#85C441] block mb-1">
              100%
            </span>
            <span className="text-xs text-neutral-600 font-sans font-medium uppercase tracking-wider">
              Métricas Auditables ODS
            </span>
          </div>
        </div>
      </section>

      {/* Intro Editorial */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center" ref={introRef}>
          <div
            style={{
              opacity: introInView ? 1 : 0,
              transform: introInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-[#85C441] mb-6 leading-tight font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              De los acuerdos <br />
              <span className="text-neutral-700">a los resultados verificables.</span>
            </h2>
            <div className="w-16 h-1 bg-[#85C441] rounded-full mx-auto mb-8" />
            <p
              className="text-neutral-600 text-lg md:text-xl font-sans font-normal leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              El Consejo Global Ambiental trasciende las declaraciones declarativas: operamos proyectos emblemáticos con gobernanza local, rigor metodológico y métricas auditables en los territorios más vulnerables.
            </p>
          </div>
        </div>
      </section>

      {/* CONSOLA INTERACTIVA DE PROYECTOS */}
      <section className="pt-2 pb-20 px-6 bg-white" ref={consoleRef}>
        <div className="max-w-6xl mx-auto" ref={detailRef}>

          {/* Encabezado del Módulo con Selector de Categorías */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-100 pb-8">
            <div>
              <h3
                className="font-display text-2xl md:text-4xl text-neutral-700 font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Catálogo Territorial Activo
              </h3>
            </div>

            {/* Selector de Categorías con Iconos y Tooltips Mejorados */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-label={cat.label}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      if (activeProjectIndex !== null) {
                        setActiveProjectIndex(null);
                      }
                    }}
                    className={`group relative px-3 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#85C441] text-white shadow-md scale-105"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
                    }`}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {/* Tooltip Flotante Moderno */}
                    <div className="absolute -top-9.5 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-neutral-900 text-white text-[11px] font-sans font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:-top-11 transition-all duration-200 ease-out z-40 flex items-center justify-center">
                      <span>{cat.label}</span>
                      <span className="w-2 h-2 bg-neutral-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                    </div>

                    <span className="flex items-center justify-center flex-shrink-0">
                      {cat.icon}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive ? "bg-white/30 text-white" : "bg-neutral-200 text-neutral-600"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* VISTA 1: GRID FOTOGRÁFICO INTUITIVO (Cuando activeProjectIndex === null) */}
          {activeProjectIndex === null && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 animate-fadeIn">
              {filteredProjects.map((p) => {
                const realIndex = projects.findIndex((item) => item.id === p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProject(realIndex)}
                    className="bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between group cursor-pointer"
                  >
                    {/* Imagen de Cabecera (Limpia, sin labels) */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                      {/* Número de Proyecto */}
                      <span
                        className="absolute top-4 left-4 font-display text-3xl font-bold text-[#85C441] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        0{realIndex + 1}
                      </span>

                      {/* Título en la Imagen (Solo el título) */}
                      <div className="absolute bottom-4 inset-x-4">
                        <h3
                          className="font-display text-lg font-bold text-white leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {p.title}
                        </h3>
                      </div>
                    </div>

                    {/* Contenido de la Tarjeta */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Descripción */}
                        <p className="text-neutral-600 text-xs sm:text-sm font-sans font-normal leading-relaxed mb-4">
                          {p.desc}
                        </p>

                        {/* Alcances y Ejes de Acción */}
                        <div className="space-y-1.5 mb-6">
                          {p.deliverables.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700 font-sans">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#85C441] flex-shrink-0" />
                              <span className="line-clamp-1">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Enlaces de Acción */}
                      <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectProject(realIndex);
                          }}
                          className="text-xs font-bold text-[#85C441] hover:text-[#72ad34] transition-colors flex items-center gap-1.5 cursor-pointer"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          <span>Ver ficha técnica</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </button>

                        <span className="text-[11px] font-semibold text-neutral-400">
                          {p.status.split("•")[0].trim()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* VISTA 2: SHOWCASE INMERSIVO EN PANTALLA COMPLETA (Cuando activeProject !== null) */}
          {activeProject !== null && (
            <div className="rounded-3xl bg-neutral-50/90 border border-neutral-200/90 overflow-hidden shadow-xl animate-fadeIn">

              {/* Barra Superior del Showcase con Controles */}
              <div className="p-4 md:p-6 bg-white border-b border-neutral-200/80 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setActiveProjectIndex(null)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#85C441] hover:bg-[#72ad34] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  <span>Regresar a la galería</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500 font-sans font-medium hidden sm:inline">
                    Proyecto {activeProjectIndex! + 1} de {projects.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handlePrevProject}
                      title="Proyecto Anterior"
                      className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextProject}
                      title="Siguiente Proyecto"
                      className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid Principal del Showcase Inmersivo */}
              <div className="grid lg:grid-cols-12 min-h-[580px]">

                {/* Columna Izquierda: Fotografía Principal & Galería */}
                <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-white border-b lg:border-b-0 lg:border-r border-neutral-200/80">
                  <div>
                    <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 shadow-md mb-4 group">
                      <img
                        src={activeProject.img}
                        alt={activeProject.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 inset-x-4 text-white">
                        <span className="text-[11px] text-[#85C441] font-bold uppercase tracking-wider block mb-1">
                          {activeProject.location}
                        </span>
                        <p className="text-xs text-white/90 font-sans">
                          Estatus: <strong className="text-white">{activeProject.status}</strong>
                        </p>
                      </div>
                    </div>

                    {/* ODS Asociados */}
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-500 block mb-2 font-sans">
                        Alineación Objetivos de Desarrollo Sostenible:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.ods.map((o, idx) => (
                          <div
                            key={idx}
                            className="px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs font-semibold text-neutral-700 flex items-center gap-1.5"
                          >
                            <span className="w-2 h-2 rounded-full bg-[#85C441]"></span>
                            <span>{o.num}: {o.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Botón CTA para Dossier Técnico */}
                  <div className="pt-6 mt-6 border-t border-neutral-100">
                    <Link
                      to="/contacto"
                      className="w-full py-3.5 px-6 bg-[#85C441] hover:bg-[#72ad34] text-white rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      <span>Solicitar Dossier Técnico Oficial</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Columna Derecha: Tabs Interactivos con la Ficha Técnica */}
                <div className="lg:col-span-7 p-6 md:p-10 flex flex-col justify-between">
                  <div>
                    {/* Header del Proyecto */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full bg-[#85C441]/15 text-[#85C441] text-xs font-bold font-sans">
                          {activeProject.category}
                        </span>
                        <span className="text-xs text-neutral-500 font-sans font-medium">
                          Periodo: {activeProject.timeline}
                        </span>
                      </div>
                      <h3
                        className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-700 font-bold leading-tight mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {activeProject.title}
                      </h3>
                      <p className="text-sm font-semibold text-[#85C441] font-sans">
                        {activeProject.subtitle}
                      </p>
                    </div>

                    {/* Barra de Tabs Interactivos */}
                    <div className="flex items-center gap-2 border-b border-neutral-200/80 pb-3 mb-6 overflow-x-auto">
                      {[
                        { id: "overview", label: "Resumen & Diagnóstico" },
                        { id: "metrics", label: "Métricas & Impacto" },
                        { id: "deliverables", label: "Entregables Técnicos" },
                        { id: "governance", label: "Aliados & Gobernanza" },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${activeTab === tab.id
                            ? "bg-[#85C441] text-white shadow-xs"
                            : "bg-white text-neutral-600 hover:bg-neutral-100"
                            }`}
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Contenido del Tab Activo */}
                    <div className="min-h-[260px]">
                      {activeTab === "overview" && (
                        <div className="space-y-4 animate-fadeIn">
                          <p className="text-neutral-600 text-sm md:text-base font-sans leading-relaxed">
                            {activeProject.fullDesc}
                          </p>

                          <div className="grid sm:grid-cols-2 gap-3 pt-2">
                            <div className="p-4 rounded-2xl bg-white border border-neutral-200/80">
                              <span className="text-xs font-bold text-red-500 block mb-1 font-sans">
                                Desafío Territorial:
                              </span>
                              <p className="text-neutral-600 text-xs font-sans leading-relaxed">
                                {activeProject.challenge}
                              </p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white border border-neutral-200/80">
                              <span className="text-xs font-bold text-[#85C441] block mb-1 font-sans">
                                Solución del Consejo:
                              </span>
                              <p className="text-neutral-600 text-xs font-sans leading-relaxed">
                                {activeProject.solution}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "metrics" && (
                        <div className="space-y-4 animate-fadeIn">
                          <div className="grid sm:grid-cols-3 gap-3">
                            {activeProject.metrics.map((m, idx) => (
                              <div
                                key={idx}
                                className="p-5 rounded-2xl bg-white border border-neutral-200/80 text-center shadow-xs"
                              >
                                <span className="font-display text-2xl md:text-3xl font-bold text-[#85C441] block mb-1">
                                  {m.val}
                                </span>
                                <span className="font-bold text-xs text-neutral-700 block mb-1 font-sans">
                                  {m.label}
                                </span>
                                <p className="text-[11px] text-neutral-500 font-sans leading-relaxed">
                                  {m.desc}
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 flex items-center justify-between text-xs text-neutral-600 font-sans">
                            <span>Metodología de medición: <strong>Auditoría de Campo y Análisis Satelital</strong></span>
                            <span className="text-[#85C441] font-bold">100% Verificado</span>
                          </div>
                        </div>
                      )}

                      {activeTab === "deliverables" && (
                        <div className="space-y-2.5 animate-fadeIn">
                          {activeProject.deliverables.map((deliv, idx) => (
                            <div
                              key={idx}
                              className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 flex items-start gap-3"
                            >
                              <span className="w-5 h-5 rounded-full bg-[#85C441]/20 text-[#85C441] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                ✓
                              </span>
                              <span className="text-neutral-700 text-xs sm:text-sm font-sans font-medium">
                                {deliv}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === "governance" && (
                        <div className="space-y-4 animate-fadeIn">
                          <p className="text-neutral-600 text-xs sm:text-sm font-sans leading-relaxed">
                            Este proyecto opera bajo un esquema de gobernanza participativa tripartita, involucrando a custodios comunitarios del suelo, especialistas de nuestras consejerías honoríficas y entidades públicas cooperantes.
                          </p>
                          <div className="space-y-2">
                            {activeProject.partners.map((partner, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-xl bg-white border border-neutral-200/80 flex items-center gap-3 text-xs sm:text-sm text-neutral-700 font-sans font-medium"
                              >
                                <span className="w-2 h-2 rounded-full bg-[#85C441]" />
                                <span>{partner}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Micro Footer del Showcase */}
                  <div className="pt-6 border-t border-neutral-200/70 flex items-center justify-between text-xs text-neutral-500 font-sans">
                    <span>Expediente Técnico: <strong>CGA-PROJ-{activeProject.id.toUpperCase()}</strong></span>
                    <span className="text-[#85C441] font-bold">Acceso Público y Transparente</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* POLÍGONOS DE INCIDENCIA TERRITORIAL - POLÍGONO CON ICONOS EN VÉRTICES (IZQ) & DESCRIPCIÓN (DER) */}
      <section className="py-20 px-6 bg-white border-t border-neutral-100 overflow-hidden" ref={territoryRef}>
        <div className="max-w-6xl mx-auto">

          {/* Encabezado */}
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-[#85C441] block mb-3 font-sans">
              Incidencia Bio-Espacial
            </span>
            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl text-[#85C441] font-bold leading-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Polígono de <span className="text-neutral-700">incidencia territorial.</span>
            </h2>
            <div className="w-16 h-1 bg-[#85C441] rounded-full mb-4" />
            <p className="text-neutral-500 font-sans text-sm md:text-base leading-relaxed">
              Selecciona cualquiera de los nodos del polígono para consultar el dictamen técnico y las métricas de intervención en campo.
            </p>
          </div>

          {/* Layout Split: Polígono con Iconos a la Izquierda, Descripción a la Derecha */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">

            {/* ── COLUMNA IZQUIERDA: POLÍGONO CON ICONOS EN LOS VÉRTICES ── */}
            <div className="w-full lg:w-1/2 flex flex-col items-center">
              <div className="relative w-full max-w-[460px] aspect-square p-6 sm:p-8 rounded-3xl bg-neutral-50/80 border border-neutral-200/80 shadow-sm flex items-center justify-center">
                <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="polyIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#85C441" stopOpacity="0.38" />
                      <stop offset="100%" stopColor="#85C441" stopOpacity="0.10" />
                    </linearGradient>
                    <filter id="polyGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Anillos concéntricos del polígono hexagonal */}
                  {[0.35, 0.68, 1.0].map((scale, ringIdx) => {
                    const r = 155 * scale;
                    const pts = territoryPolygons.map((_, i) => {
                      const angle = (i * 60 - 90) * (Math.PI / 180);
                      const x = 250 + r * Math.cos(angle);
                      const y = 250 + r * Math.sin(angle);
                      return `${x},${y}`;
                    }).join(" ");

                    return (
                      <polygon
                        key={ringIdx}
                        points={pts}
                        fill="none"
                        stroke={ringIdx === 2 ? "#d4d4d4" : "#e5e5e5"}
                        strokeWidth={ringIdx === 2 ? "1.5" : "1"}
                        strokeDasharray={ringIdx < 2 ? "3 3" : "none"}
                      />
                    );
                  })}

                  {/* Ejes radiales (6 radios desde el centro) */}
                  {territoryPolygons.map((_, i) => {
                    const angle = (i * 60 - 90) * (Math.PI / 180);
                    const x = 250 + 155 * Math.cos(angle);
                    const y = 250 + 155 * Math.sin(angle);
                    return (
                      <line
                        key={i}
                        x1="250"
                        y1="250"
                        x2={x}
                        y2={y}
                        stroke="#e5e5e5"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Área del Polígono de Impacto Relleno */}
                  {(() => {
                    const impactPoints = territoryPolygons.map((p, i) => {
                      const angle = (i * 60 - 90) * (Math.PI / 180);
                      const r = 155 * p.norm;
                      const x = 250 + r * Math.cos(angle);
                      const y = 250 + r * Math.sin(angle);
                      return `${x},${y}`;
                    }).join(" ");

                    return (
                      <polygon
                        points={impactPoints}
                        fill="url(#polyIconGrad)"
                        stroke="#85C441"
                        strokeWidth="2.5"
                        className="transition-all duration-500"
                      />
                    );
                  })()}

                  {/* Centro del polígono */}
                  <circle cx="250" cy="250" r="5" fill="#85C441" />
                  <circle cx="250" cy="250" r="10" fill="none" stroke="#85C441" strokeWidth="1" strokeOpacity="0.4" />

                  {/* Vértices Interactivos con ICONOS */}
                  {territoryPolygons.map((_, idx) => {
                    const isSelected = selectedPolygonIdx === idx;
                    const angle = (idx * 60 - 90) * (Math.PI / 180);
                    const r = 155 * territoryPolygons[idx].norm;
                    const vx = 250 + r * Math.cos(angle);
                    const vy = 250 + r * Math.sin(angle);

                    // Lista de iconos vectoriales por vértice
                    const icons = [
                      // 0: Agua / Humedales (Xochimilco)
                      <svg key={0} width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                      </svg>,
                      // 1: Bosques / Árboles (Suelo de Conservación)
                      <svg key={1} width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22v-6"></path>
                        <path d="M17 14l-5-5-5 5h3v4h4v-4h3z"></path>
                        <path d="M15 9l-3-3-3 3h2v3h2V9h2z"></path>
                      </svg>,
                      // 2: Semillas / Germoplasma
                      <svg key={2} width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22v-8"></path>
                        <path d="M12 14c-4.5 0-8-3.5-8-8 0 4.5 3.5 8 8 8z"></path>
                        <path d="M12 14c4.5 0 8-3.5 8-8 0 4.5 3.5 8 8 8z"></path>
                      </svg>,
                      // 3: Suelos Vivos / Capas
                      <svg key={3} width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                      </svg>,
                      // 4: Comunidad / Familias (Seguridad Rural)
                      <svg key={4} width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>,
                      // 5: Polinizadores / Flora
                      <svg key={5} width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M12 2a4 4 0 0 0-4 4c0 2 4 6 4 6s4-4 4-6a4 4 0 0 0-4-4z"></path>
                        <path d="M12 22a4 4 0 0 0 4-4c0-2-4-6-4-6s-4 4-4 6a4 4 0 0 0 4 4z"></path>
                        <path d="M2 12a4 4 0 0 0 4 4c2 0 6-4 6-4s-4-4-6-4a4 4 0 0 0-4 4z"></path>
                        <path d="M22 12a4 4 0 0 0-4-4c-2 0-6 4-6 4s4 4 6 4a4 4 0 0 0 4-4z"></path>
                      </svg>
                    ];

                    return (
                      <g
                        key={idx}
                        className="cursor-pointer group"
                        onClick={() => setSelectedPolygonIdx(idx)}
                        onMouseEnter={() => setSelectedPolygonIdx(idx)}
                      >
                        {/* Pulso animado para el nodo seleccionado */}
                        {isSelected && (
                          <circle
                            cx={vx}
                            cy={vy}
                            r="24"
                            fill="#85C441"
                            opacity="0.25"
                            className="animate-ping"
                          />
                        )}

                        {/* Área invisible grande para facilitar clic/toque */}
                        <circle cx={vx} cy={vy} r="26" fill="transparent" />

                        {/* Inserto HTML del icono dentro del SVG */}
                        <foreignObject
                          x={vx - 19}
                          y={vy - 19}
                          width="38"
                          height="38"
                          className="overflow-visible pointer-events-none"
                        >
                          <div
                            style={{
                              width: 38,
                              height: 38,
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: isSelected ? "#85C441" : "#ffffff",
                              color: isSelected ? "#ffffff" : "#666666",
                              border: isSelected ? "2px solid #ffffff" : "1.5px solid #d4d4d4",
                              boxShadow: isSelected ? "0 4px 16px rgba(133,196,65,0.45)" : "0 2px 6px rgba(0,0,0,0.06)",
                              transform: isSelected ? "scale(1.15)" : "scale(1)",
                              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                            }}
                          >
                            {icons[idx]}
                          </div>
                        </foreignObject>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* ── COLUMNA DERECHA: DESCRIPCIÓN AL TOCAR EL PUNTO ── */}
            <div className="w-full lg:w-1/2">
              {(() => {
                const active = territoryPolygons[selectedPolygonIdx];
                return (
                  <div
                    key={selectedPolygonIdx}
                    className="bg-white rounded-3xl border border-neutral-200/90 shadow-lg p-7 sm:p-8 transition-all duration-400"
                    style={{
                      animation: "fadeIn 0.35s ease-out",
                    }}
                  >
                    {/* Título y Ubicación */}
                    <div className="mb-5">
                      <h3
                        className="font-display text-2xl sm:text-3xl font-bold text-neutral-800 leading-snug mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {active.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-500 font-sans flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#85C441" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>{active.location}</span>
                      </p>
                    </div>

                    {/* Resumen */}
                    <p className="text-neutral-600 text-sm sm:text-base font-sans font-normal leading-relaxed mb-6">
                      {active.summary}
                    </p>

                    {/* Métrica Clave */}
                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/70 flex items-center justify-between gap-4 mb-6">
                      <div>
                        <span
                          className="block font-display text-3xl font-bold text-[#85C441] leading-none mb-1"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {active.statVal}
                        </span>
                        <span className="text-xs font-bold text-neutral-700 block">
                          {active.statLabel}
                        </span>
                      </div>
                      <span className="text-xs font-sans text-neutral-500 text-right max-w-[180px]">
                        {active.statSub}
                      </span>
                    </div>

                    {/* Protocolos en Territorio */}
                    <div className="space-y-2 mb-6">
                      {active.actions.map((act, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-700 font-sans">
                          <span className="w-4 h-4 rounded-full bg-[#85C441]/15 text-[#72ad34] flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                            ✓
                          </span>
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-sans">
                      <span className="text-[11px] font-mono font-medium text-neutral-400">
                        {active.expediente}
                      </span>

                      <Link
                        to="/contacto"
                        className="font-bold text-[#85C441] hover:text-[#72ad34] transition-colors flex items-center gap-1.5"
                      >
                        <span>Vincular polígono territorial</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </Link>
                    </div>

                  </div>
                );
              })()}
            </div>

          </div>

        </div>
      </section>

      {/* METODOLOGÍA INSTITUCIONAL — ANIMACIÓN AMBIENTAL */}
      <section className="py-20 px-6 bg-white border-t border-neutral-100 overflow-hidden" ref={methodRef}>
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div
            className="text-center mb-14"
            style={{
              opacity: methodInView ? 1 : 0,
              transform: methodInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <span className="text-xs uppercase tracking-widest font-bold text-[#85C441] block mb-3 font-sans">
              Garantía de Solvencia Técnica
            </span>
            <h3
              className="font-display text-3xl md:text-4xl text-neutral-700 font-bold leading-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Metodología de Evaluación<br />
              <span className="text-[#85C441]">y Despliegue</span>
            </h3>
            <div className="w-12 h-1 bg-[#85C441] rounded-full mx-auto mb-5" />
            <p className="text-neutral-500 text-sm font-sans max-w-xl mx-auto leading-relaxed">
              Cada intervención territorial sigue una rigurosa ruta de 4 etapas para asegurar legitimidad social y solidez científica.
            </p>
          </div>

          {/* Main layout: SVG ecosystem + step cards */}
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">

            {/* ── Photo Panel ── */}
            <div
              className="lg:w-[42%] rounded-3xl overflow-hidden relative"
              style={{
                minHeight: 480,
                opacity: methodInView ? 1 : 0,
                transition: "opacity 0.9s 0.2s",
              }}
            >
              {/* Photos — crossfade on step change */}
              {[
                "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=1000&fit=crop&auto=format&q=85",
                "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=1000&fit=crop&auto=format&q=85",
                "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=1000&fit=crop&auto=format&q=85",
                "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=1000&fit=crop&auto=format&q=85",
              ].map((src, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: activeMethodStep === i ? 1 : 0,
                    transition: "opacity 0.9s ease-in-out",
                  }}
                />
              ))}

              {/* Bottom gradient for text legibility */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }}
              />

              {/* Step pills + label */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <div className="flex gap-2 mb-3">
                  {methodologySteps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveMethodStep(i)}
                      style={{
                        height: 3,
                        width: activeMethodStep === i ? 28 : 10,
                        background: activeMethodStep === i ? "#85C441" : "rgba(255,255,255,0.35)",
                        borderRadius: 4,
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.4s ease",
                      }}
                    />
                  ))}
                </div>
                <span
                  className="block text-[10px] uppercase tracking-widest font-bold font-sans mb-1"
                  style={{ color: "#85C441", textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}
                >
                  Etapa {methodologySteps[activeMethodStep].num}
                </span>
                <p
                  className="font-display font-bold text-white leading-snug m-0"
                  style={{ fontSize: 15, fontFamily: "var(--font-display)", textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
                >
                  {methodologySteps[activeMethodStep].title}
                </p>
              </div>
            </div>
            {/* ── Step Cards Column ── */}
            <div className="lg:w-[58%] flex flex-col gap-4">
              {methodologySteps.map((step, idx) => {
                const isActive = activeMethodStep === idx;
                const stepLineArtIcons = [
                  // Step 0: Magnifier / Analysis icon
                  <svg key={0} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#85C441" : "#a3a3a3"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.3s" }}>
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>,
                  // Step 1: Handshake / Community icon
                  <svg key={1} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#85C441" : "#a3a3a3"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.3s" }}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>,
                  // Step 2: Sprout / Leaf icon
                  <svg key={2} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#85C441" : "#a3a3a3"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.3s" }}>
                    <path d="M12 22v-8"></path>
                    <path d="M12 14c-4.5 0-8-3.5-8-8 0 4.5 3.5 8 8 8z"></path>
                    <path d="M12 14c4.5 0 8-3.5 8-8 0 4.5-3.5 8-8 8z"></path>
                  </svg>,
                  // Step 3: Bar Chart / Analytics icon
                  <svg key={3} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#85C441" : "#a3a3a3"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.3s" }}>
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                    <line x1="2" y1="20" x2="22" y2="20"></line>
                  </svg>
                ];
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveMethodStep(idx)}
                    onClick={() => setActiveMethodStep(idx)}
                    className="rounded-2xl border cursor-pointer transition-all duration-400 overflow-hidden"
                    style={{
                      opacity: methodInView ? 1 : 0,
                      transform: methodInView ? "translateX(0)" : "translateX(40px)",
                      transition: `opacity 0.7s ${0.15 + idx * 0.1}s, transform 0.7s ${0.15 + idx * 0.1}s, border-color 0.3s, box-shadow 0.3s, background 0.3s`,
                      borderColor: isActive ? "#85C441" : "#e5e5e5",
                      boxShadow: isActive ? "0 4px 24px rgba(133,196,65,0.18)" : "none",
                      background: isActive ? "white" : "#fafafa",
                    }}
                  >
                    <div className="flex items-start gap-5 p-5">
                      {/* Number + SVG Line-Art Icon */}
                      <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
                        <span
                          className="font-display font-bold text-xl leading-none"
                          style={{ color: isActive ? "#85C441" : "#a3a3a3", transition: "color 0.3s" }}
                        >
                          {step.num}
                        </span>
                        <div className="w-7 h-7 flex items-center justify-center">
                          {stepLineArtIcons[idx]}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4
                          className="font-display font-bold text-base leading-snug mb-1.5"
                          style={{
                            fontFamily: "var(--font-display)",
                            color: isActive ? "#404040" : "#737373",
                            transition: "color 0.3s",
                          }}
                        >
                          {step.title}
                        </h4>
                        <p
                          className="text-xs font-sans leading-relaxed"
                          style={{ color: isActive ? "#525252" : "#a3a3a3", transition: "color 0.3s" }}
                        >
                          {step.summary}
                        </p>

                        {/* Expanded detail */}
                        <div
                          style={{
                            maxHeight: isActive ? 120 : 0,
                            overflow: "hidden",
                            transition: "max-height 0.45s cubic-bezier(0.16,1,0.3,1)",
                          }}
                        >
                          <div className="mt-3 pt-3 border-t border-neutral-100">
                            <p className="text-[11px] text-neutral-500 font-sans leading-relaxed">
                              {step.details}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Active indicator arrow */}
                      <div
                        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          background: isActive ? "#85C441" : "transparent",
                          border: isActive ? "none" : "1.5px solid #e5e5e5",
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isActive ? "white" : "#d4d4d4"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          style={{ transform: isActive ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </div>

                    {/* Green progress bar at bottom */}
                    <div
                      style={{
                        height: 3,
                        background: "#85C441",
                        transformOrigin: "left",
                        transform: isActive ? "scaleX(1)" : "scaleX(0)",
                        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                        borderRadius: "0 0 2px 2px",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL INSTITUCIONAL */}
      <section className="pt-8 pb-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center p-10 md:p-14 rounded-3xl bg-neutral-50/80 border border-neutral-200/80 shadow-xs">
          <div className="w-12 h-1 bg-[#85C441] rounded-full mx-auto mb-6" />
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl text-[#85C441] mb-5 font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Proponer un proyecto en mi territorio
          </h2>
          <p className="text-neutral-600 text-base md:text-lg font-sans font-normal leading-relaxed mb-8 max-w-2xl mx-auto">
            Invitamos a comunidades ejidales, gobiernos locales, empresas comprometidas con criterios ESG e instituciones académicas a postular o cofinanciar iniciativas de impacto socioambiental verificable.
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#85C441] hover:bg-[#72ad34] text-white rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span>Iniciar diálogo técnico</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
