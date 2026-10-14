/**
 * Colección inicial predeterminada de artículos institucionales y científicos del CGA.
 * Soporta:
 * - cardStyle: 'classic' | 'dark-overlay' (Diseño de tarjeta en catálogo)
 * - detailLayout: 'classic' | 'immersive' | 'split' | 'story' (4 Plantillas diferentes de lectura de detalle)
 */
export const INITIAL_ARTICLES = [
  {
    id: 'acuerdo-biocultural-pueblos-originarios',
    aliasId: 'feat-1',
    type: 'noticias',
    cardStyle: 'classic',
    detailLayout: 'classic', // Plantilla 1: Editorial Clásico Tradicional
    heroStyle: 'png-element',
    heroPng: '/imagenes/Rama 2.svg',
    heroPngPosition: 'right',
    heroPngSize: 'lg',
    heroPngOpacity: 0.85,
    heroPngHasBeigeOverlay: true,
    heroPngOverlayOpacity: 0.25,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1400&fit=crop&auto=format',
    category: { es: 'Comunicado Oficial · Ginebra / CDMX', en: 'Official Press Release · Geneva / CDMX' },
    date: '04 Abril 2026',
    title: {
      es: 'El Consejo Global Ambiental suscribe acuerdo histórico de custodia biocultural con 14 pueblos originarios',
      en: 'The Global Environmental Council signs landmark biocultural custody agreement with 14 indigenous peoples',
    },
    summary: {
      es: 'El acuerdo formaliza la protección de más de 450,000 hectáreas de corredores biológicos estratégicos y garantiza la soberanía comunitaria sobre bancos de germoplasma y semillas criollas ante la crisis climática.',
      en: 'The agreement formalizes the protection of over 450,000 hectares of strategic biological corridors and guarantees community sovereignty over heirloom seed banks in the face of climate crisis.',
    },
    paragraphs: [
      {
        es: 'En una sesión solemne celebrada con autoridades tradicionales, representantes comunitarios y observadores internacionales de las Naciones Unidas, el Consejo Global Ambiental formalizó el mecanismo de financiamiento directo y custodia biocultural para catorce pueblos originarios de Mesoamérica y la cuenca amazónica.',
        en: 'In a solemn session held with traditional authorities, community representatives, and international UN observers, the Global Environmental Council formalized direct funding and biocultural custody mechanisms for fourteen indigenous peoples across Mesoamerica and the Amazon basin.',
      },
      {
        es: 'Este protocolo pionero reconoce jurídicamente el valor intangible de los saberes ancestrales en la preservación de biomas críticos. A diferencia de los esquemas convencionales de intermediación financiera, el 100% de los fondos asignados se transfiere directamente a comités comunitarios de vigilancia territorial, equipamiento de brigadas forestales y resguardo de germoplasma.',
        en: 'This pioneering protocol legally recognizes the invaluable role of ancestral knowledge in preserving critical biomes. Unlike traditional financial intermediary schemes, 100% of allocated funding flows directly to community territorial surveillance committees, forest brigade equipment, and germplasm preservation.',
      },
      {
        es: '“La conservación de la biosfera no puede diseñarse desde escritorios lejanos sin escuchar a quienes han habitado y cuidado estos territorios durante milenios. Este acuerdo sella un pacto de hermandad, dignidad y ciencia aplicada para defender la vida en cada cuenca”, destacó la presidencia ejecutiva del Consejo.',
        en: '“Biosphere conservation cannot be designed from distant desks without listening to those who have inhabited and protected these lands for millennia. This agreement seals a pact of solidarity, dignity and applied science to defend life in every watershed,” highlighted the Council’s Executive Presidency.',
      },
      {
        es: 'Entre las metas operativas inmediatas para el bienio 2026-2028 se contempla el establecimiento de 28 estaciones meteorológicas comunitarias, la capacitación técnica de 400 jóvenes guardianes ambientales en fototrampeo satelital y la creación de 14 bancos soberanos de semillas nativas resistentes al estrés hídrico.',
        en: 'Immediate operational goals for the 2026-2028 biennium include establishing 28 community weather stations, technical training for 400 youth environmental guardians in satellite monitoring, and creating 14 sovereign native seed banks resilient to water stress.',
      },
    ],
    quote: {
      es: 'La conservación no es una imposición técnica: es un acto de justicia territorial y respeto irrestricto a la soberanía de los pueblos que custodian el pulmón del planeta.',
      en: 'Conservation is not a technical imposition: it is an act of territorial justice and unconditional respect for the sovereignty of peoples guarding the lungs of the planet.',
    },
    keyPoints: [
      { es: '450,000+ hectáreas bajo régimen de protección biocultural estricta.', en: '450,000+ hectares under strict biocultural protection.' },
      { es: 'Transferencia directa de fondos sin intermediación burocrática.', en: 'Direct fund transfer with zero bureaucratic intermediary overhead.' },
      { es: 'Red de monitoreo satelital operada por brigadas comunitarias capacitadas.', en: 'Satellite monitoring network operated by trained community brigades.' },
      { es: 'Resguardo soberano de bancos de germoplasma y semillas criollas.', en: 'Sovereign protection of germplasm banks and heirloom seeds.' },
    ],
    readTime: '5 min de lectura',
    author: 'Dirección de Prensa CGA',
    authorRole: { es: 'Secretaría de Comunicación y Medios · Ginebra / CDMX', en: 'Communications & Media Secretariat · Geneva / CDMX' },
    blocks: [
      {
        id: 'blk-1',
        type: 'paragraph',
        text: {
          es: 'En una sesión solemne celebrada con autoridades tradicionales, representantes comunitarios y observadores internacionales de las Naciones Unidas, el Consejo Global Ambiental formalizó el mecanismo de financiamiento directo y custodia biocultural para catorce pueblos originarios de Mesoamérica y la cuenca amazónica.',
          en: 'In a solemn session held with traditional authorities, community representatives, and international UN observers, the Global Environmental Council formalized direct funding and biocultural custody mechanisms for fourteen indigenous peoples across Mesoamerica and the Amazon basin.',
        },
        isLead: true,
      },
      {
        id: 'blk-cols-1',
        type: 'columns',
        columnCount: 3,
        columns: [
          {
            id: 'c1',
            type: 'stat',
            statNumber: '450k ha',
            title: { es: 'Custodia Biocultural', en: 'Biocultural Custody' },
            text: { es: 'Superficie territorial bajo régimen de protección comunitaria vinculante y soberana.', en: 'Territory under binding community protection.' },
            badge: { es: '01 · Alcance', en: '01 · Scope' },
          },
          {
            id: 'c2',
            type: 'card',
            badge: { es: '02 · Gobernanza', en: '02 · Governance' },
            title: { es: 'Transferencia Directa', en: 'Direct Allocation' },
            text: { es: 'Fondos asignados a comités de vigilancia territorial y equipamiento sin intermediación burocrática.', en: 'Direct community fund allocation with zero intermediaries.' },
          },
          {
            id: 'c3',
            type: 'stat',
            statNumber: '100%',
            title: { es: 'Soberanía de Semillas', en: 'Seed Sovereignty' },
            text: { es: 'Resguardo comunal de germoplasma y bancos de semillas criollas resistentes al estrés hídrico.', en: 'Community heirloom seed banks resilient to climate stress.' },
            badge: { es: '03 · Biomas', en: '03 · Biomes' },
          },
        ],
      },
      {
        id: 'blk-2',
        type: 'quote',
        text: {
          es: 'La conservación no es una imposición técnica: es un acto de justicia territorial y respeto irrestricto a la soberanía de los pueblos que custodian el pulmón del planeta.',
          en: 'Conservation is not a technical imposition: it is an act of territorial justice and unconditional respect for the sovereignty of peoples guarding the lungs of the planet.',
        },
        author: 'Dr. Francisco Solorio',
      },
      {
        id: 'blk-3',
        type: 'paragraph',
        text: {
          es: 'Este protocolo pionero reconoce jurídicamente el valor intangible de los saberes ancestrales en la preservación de biomas críticos. A diferencia de los esquemas convencionales de intermediación financiera, el 100% de los fondos asignados se transfiere directamente a comités comunitarios de vigilancia territorial, equipamiento de brigadas forestales y resguardo de germoplasma.',
          en: 'This pioneering protocol legally recognizes the invaluable role of ancestral knowledge in preserving critical biomes. Unlike traditional financial intermediary schemes, 100% of allocated funding flows directly to community territorial surveillance committees, forest brigade equipment, and germplasm preservation.',
        },
        isLead: false,
      },
      {
        id: 'blk-4',
        type: 'keyPoints',
        title: { es: 'Puntos Clave y Alcance Territorial', en: 'Key Points & Territorial Scope' },
        items: [
          { es: '450,000+ hectáreas bajo régimen de protección biocultural estricta.', en: '450,000+ hectares under strict biocultural protection.' },
          { es: 'Transferencia directa de fondos sin intermediación burocrática.', en: 'Direct fund transfer with zero bureaucratic intermediary overhead.' },
          { es: 'Red de monitoreo satelital operada por brigadas comunitarias capacitadas.', en: 'Satellite monitoring network operated by trained community brigades.' },
          { es: 'Resguardo soberano de bancos de germoplasma y semillas criollas.', en: 'Sovereign protection of germplasm banks and heirloom seeds.' },
        ],
      },
    ],
  },
  {
    id: 'mas-alla-de-los-bonos-de-carbono',
    aliasId: 'art-2',
    type: 'opinion',
    cardStyle: 'dark-overlay',
    detailLayout: 'split', // Plantilla 3: Revista Split
    heroStyle: 'solid-beige',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&fit=crop&auto=format',
    category: { es: 'Tribuna Editorial · Ensayo', en: 'Editorial Essay · Opinion' },
    date: '28 Marzo 2026',
    title: {
      es: 'Más allá de los bonos de carbono: la urgencia de la integridad ecosistémica',
      en: 'Beyond Carbon Credits: The Urgency of Ecosystem Integrity',
    },
    summary: {
      es: 'Reflexión del Presidente Francisco Solorio sobre cómo evitar la mercantilización especulativa de los bosques y priorizar la resiliencia viva comunitaria frente a monocultivos arbóreos.',
      en: 'Reflection by President Francisco Solorio on preventing speculative forest commodification and prioritizing living community resilience over tree monocultures.',
    },
    paragraphs: [
      {
        es: 'La compensación de emisiones de carbono corre el riesgo de convertirse en una coartada moral para aplazar la descarbonización profunda de los modelos productivos globales. Reducir la infinita complejidad biológica de una selva o un bosque templado a una simple métrica de toneladas de CO2 equivalente desvirtúa la verdadera naturaleza de los ecosistemas vivos.',
        en: 'Carbon offsetting risks becoming a moral excuse to delay the deep decarbonization of global production models. Reducing the infinite biological complexity of a rainforest or temperate woodland to simple metric tons of CO2 equivalent misrepresents the true nature of living ecosystems.',
      },
      {
        es: 'Un bosque primario no es únicamente un sumidero de carbono; es una red simbiótica de polinizadores, micorrizas subterráneas, recarga de mantos acuíferos y memoria cultural milenaria. Los proyectos de reforestación basados en monocultivos comerciales de rápido crecimiento suelen degradar los suelos y desplazar especies endémicas, generando una ilusión verde que carece de resiliencia ecológica.',
        en: 'A primary forest is not merely a carbon sink; it is a symbiotic network of pollinators, subterranean mycorrhizae, aquifer recharge and ancestral memory. Reforestation projects based on commercial monocultures often degrade soils and displace endemic species, creating a green illusion lacking ecological resilience.',
      },
      {
        es: 'Desde el Consejo Global Ambiental proponemos una transición inaplazable hacia los Créditos de Integridad Ecosistémica (CIE), los cuales evalúan la salud holística del hábitat: biodiversidad florística, calidad de cuencas hídricas, conectividad biológica y bienestar socioeconómico de las comunidades locales custodias.',
        en: 'At the Global Environmental Council, we propose an urgent transition toward Ecosystem Integrity Credits (EIC), which evaluate holistic habitat health: floral biodiversity, watershed quality, biological connectivity, and socio-economic wellbeing of local steward communities.',
      },
    ],
    quote: {
      es: 'No podemos salvar el clima destruyendo la biodiversidad. La integridad ecosistémica debe ser el núcleo irremplazable de toda política ambiental global.',
      en: 'We cannot save the climate by destroying biodiversity. Ecosystem integrity must be the irreplaceable core of all global environmental policy.',
    },
    keyPoints: [
      { es: 'Crítica a la mercantilización especulativa de los mercados voluntarios de carbono.', en: 'Critique of speculative commodification in voluntary carbon markets.' },
      { es: 'Propuesta de Créditos de Integridad Ecosistémica (CIE) con métricas multidimensionales.', en: 'Proposal of Ecosystem Integrity Credits (EIC) with multidimensional metrics.' },
      { es: 'Prioridad absoluta a la conservación de biomas nativos y policultivos forestales.', en: 'Absolute priority to preserving native biomes and multi-species forestry.' },
    ],
    readTime: '6 min de lectura',
    author: 'Dr. Francisco Solorio',
    authorRole: { es: 'Presidente Fundador del Consejo Global Ambiental', en: 'Founding President, Global Environmental Council' },
  },
  {
    id: 'voces-de-la-selva-ia-y-sabiduria-ancestral',
    aliasId: 'art-3',
    type: 'dialogos',
    cardStyle: 'classic',
    detailLayout: 'immersive', // Plantilla 2: Portada Inmersiva Cinematográfica
    heroStyle: 'image-bg',
    heroBgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&fit=crop&auto=format',
    heroBgOpacity: 0.3,
    heroBgOverlayOpacity: 0.9,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&fit=crop&auto=format',
    category: { es: 'Diálogos CGA · Episodio 12', en: 'CGA Dialogues · Episode 12' },
    date: '15 Marzo 2026',
    title: {
      es: 'Voces de la Selva: Inteligencia Artificial y Sabiduría Ancestral',
      en: 'Voices of the Rainforest: Artificial Intelligence and Ancestral Wisdom',
    },
    summary: {
      es: 'Conversatorio en profundidad con tecnólogos geoespaciales y guardabosques sobre cómo las alertas satelitales en tiempo real empoderan a las brigadas ejidales en la detección de tala clandestina.',
      en: 'In-depth talk with geospatial engineers and park rangers on how real-time satellite alerts empower communal brigades to halt illegal logging.',
    },
    paragraphs: [
      {
        es: 'En este nuevo capítulo de la serie Diálogos CGA, reunimos a especialistas en visión computacional satelital y líderes de brigadas comunitarias de vigilancia para explorar la confluencia entre tecnología de punta y conocimiento tradicional del territorio.',
        en: 'In this new episode of CGA Dialogues, we brought together satellite computer vision specialists and community patrol leaders to explore the confluence between cutting-edge technology and traditional territorial knowledge.',
      },
      {
        es: 'A través de sensores bioacústicos de bajo consumo alimentados por energía solar y algoritmos de detección espectral entrenados con imágenes radar SAR, las comunidades reciben alertas inmediatas ante el sonido de motosierras o deforestación no autorizada en menos de 8 minutos desde su inicio.',
        en: 'Through low-power solar bioacoustic sensors and spectral detection algorithms trained on SAR radar imagery, communities receive immediate alerts for chainsaws or unauthorized clearing within 8 minutes of onset.',
      },
    ],
    quote: {
      es: 'La inteligencia artificial es una herramienta extraordinaria, pero su verdadero poder germina cuando está al servicio de la gente que cuida la tierra con sus propias manos.',
      en: 'Artificial intelligence is an extraordinary tool, but its real power emerges when put at the service of those who protect the land with their own hands.',
    },
    keyPoints: [
      { es: 'Algoritmos bioacústicos con detección de motosierras y disparos en tiempo real.', en: 'Bioacoustic algorithms detecting chainsaws and gunshots in real time.' },
      { es: 'Integración con mapas satelitales térmicos y radar SAR de libre acceso.', en: 'Integration with thermal satellite mapping and open-access SAR radar.' },
      { es: 'Protocolo de respuesta territorial coordinado con autoridades ejidales.', en: 'Territorial response protocol coordinated with communal authorities.' },
    ],
    readTime: 'Podcast & Video · 42 min',
    author: 'Producción Multimedia CGA',
    authorRole: { es: 'Coordinación de Medios Audiovisuales', en: 'Audiovisual Media Coordination' },
  },
  {
    id: 'foro-global-gobernanza-ambiental-ginebra',
    aliasId: 'art-4',
    type: 'eventos',
    cardStyle: 'dark-overlay',
    detailLayout: 'classic',
    heroStyle: 'png-element',
    heroPng: '/imagenes/Rama 1.svg',
    heroPngPosition: 'left',
    heroPngSize: 'md',
    heroPngOpacity: 0.75,
    heroPngHasBeigeOverlay: false,
    heroPngOverlayOpacity: 0.2,
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900&fit=crop&auto=format',
    category: { es: 'Cumbre Internacional · Suiza', en: 'International Summit · Switzerland' },
    date: '18 - 21 Mayo 2026',
    title: {
      es: 'Foro Global de Gobernanza Ambiental, Cuencas y Diplomacia Climática en Ginebra',
      en: 'Global Environmental Governance, Watersheds & Climate Diplomacy Forum in Geneva',
    },
    summary: {
      es: 'Encuentro anual con ministros de medio ambiente, juristas supranacionales, directores de centros científicos y voceros comunitarios para consensuar la agenda internacional de resiliencia hídrica.',
      en: 'Annual meeting with ministers of environment, supranational jurists, scientific directors and community leaders to align international water resilience agendas.',
    },
    paragraphs: [
      {
        es: 'El Palacio de las Naciones en Ginebra, Suiza, será la sede del Foro Global de Gobernanza Ambiental 2026 convocado por el Consejo Global Ambiental. Durante cuatro jornadas de trabajo intensivo, delegados de 48 países debatirán tratados marco para la protección transfronteriza de ríos y acuíferos.',
        en: 'The Palais des Nations in Geneva, Switzerland, will host the 2026 Global Environmental Governance Forum convened by the Global Environmental Council. Over four days of intensive sessions, delegates from 48 nations will debate framework treaties for transboundary river and aquifer protection.',
      },
      {
        es: 'El evento incluirá mesas redondas de financiamiento multilateral, exhibición de tecnologías de regeneración de biomas y la presentación formal del Informe Global de Estado de Cuencas.',
        en: 'The event will include multilateral financing roundtables, biome regeneration technology showcases, and the official release of the Global Watershed Status Report.',
      },
    ],
    quote: {
      es: 'El agua no reconoce fronteras geopolíticas: su preservación exige una diplomacia valiente cimentada en la justicia ecológica.',
      en: 'Water recognizes no geopolitical boundaries: its preservation demands bold diplomacy rooted in ecological justice.',
    },
    keyPoints: [
      { es: '48 delegaciones ministeriales y representaciones científicas de primer nivel.', en: '48 ministerial delegations and top-tier scientific representations.' },
      { es: '16 paneles temáticos sobre litigio climático y derechos de la naturaleza.', en: '16 thematic panels on climate litigation and rights of nature.' },
      { es: 'Presentación del fondo fiduciario para la resiliencia hídrica comunitaria.', en: 'Presentation of the trust fund for community water resilience.' },
    ],
    readTime: 'Sede: Ginebra, Suiza',
    author: 'Comité Organizador CGA',
    authorRole: { es: 'Secretaría de Relaciones Multilaterales', en: 'Secretariat of Multilateral Relations' },
  },
  {
    id: 'informe-bianual-conservacion-biomas-carbono',
    aliasId: 'art-5',
    type: 'publicaciones',
    cardStyle: 'classic',
    detailLayout: 'story', // Plantilla 4: Storytelling Visual
    heroStyle: 'solid-beige',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900&fit=crop&auto=format',
    category: { es: 'Compendio Científico · Acceso Abierto', en: 'Scientific Compendium · Open Access' },
    date: 'Febrero 2026',
    title: {
      es: 'Informe Bianual de Conservación de Biomas y Captura de Carbono 2024-2026',
      en: 'Bi-Annual Biome Conservation and Carbon Sequestration Report 2024-2026',
    },
    summary: {
      es: 'Documento técnico con metodología abierta, mapas satelitales de alta resolución, índices de biomasa y resultados medibles en 9 cuencas prioritarias de México y América Latina.',
      en: 'Technical document with open methodology, high-resolution satellite maps, biomass indices and measurable outcomes across 9 priority watersheds.',
    },
    paragraphs: [
      {
        es: 'El Comité Científico del CGA publica su compendio bianual con datos auditados sobre el estado de conservación de bosques de niebla, selvas tropicales y manglares costeros. Con más de 120 páginas de cartografía satelital y análisis genómico de ADN ambiental (eDNA), este informe constituye una referencia esencial para tomadores de decisiones.',
        en: 'The CGA Scientific Committee publishes its bi-annual compendium with audited data on the conservation status of cloud forests, rainforests and coastal mangroves. With over 120 pages of satellite cartography and environmental eDNA genomic analysis, this report serves as an indispensable reference for policymakers.',
      },
    ],
    quote: {
      es: 'La evidencia empírica rigurosa y transparente es el cimiento insustituible para defender nuestros biomas.',
      en: 'Rigorous and transparent empirical evidence is the irreplaceable foundation for defending our biomes.',
    },
    keyPoints: [
      { es: 'Metodología abierta descargable con datos geoespaciales vectoriales.', en: 'Open downloadable methodology with vector geospatial data.' },
      { es: 'Evaluación de 9 cuencas prioritarias y 34 corredores biológicos.', en: 'Evaluation of 9 priority watersheds and 34 biological corridors.' },
      { es: 'Recomendaciones de política pública para metas NDC hacia 2030.', en: 'Public policy recommendations for NDC targets towards 2030.' },
    ],
    readTime: 'PDF Descargable · 18.4 MB',
    author: 'Comité Científico Editorial',
    authorRole: { es: 'Dirección de Investigación y Ciencias Ambientales', en: 'Directorate of Research and Environmental Science' },
  },
];

const STORAGE_KEY = 'cga_articles_cms_v1';
const CARD_STYLES_CYCLE = ['classic', 'dark-overlay'];
const DETAIL_LAYOUTS_CYCLE = ['classic', 'immersive', 'split', 'story'];

export function getStoredArticles() {
  if (typeof window === 'undefined') return INITIAL_ARTICLES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ARTICLES));
      return INITIAL_ARTICLES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Filtrar para garantizar exactamente una de cada categoría: noticias, opinión, diálogos, eventos, publicaciones
      const seenTypes = new Set();
      const uniqueByType = [];
      parsed.forEach((art) => {
        if (!seenTypes.has(art.type)) {
          seenTypes.add(art.type);
          uniqueByType.push(art);
        }
      });

      if (uniqueByType.length < parsed.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(uniqueByType));
        return uniqueByType.map((art, idx) => ({
          ...art,
          cardStyle: art.cardStyle === 'dark-overlay' ? 'dark-overlay' : (art.cardStyle === 'classic' ? 'classic' : CARD_STYLES_CYCLE[idx % CARD_STYLES_CYCLE.length]),
          detailLayout: art.detailLayout === 'academic' ? 'split' : (art.detailLayout || DETAIL_LAYOUTS_CYCLE[idx % DETAIL_LAYOUTS_CYCLE.length]),
        }));
      }

      return parsed.map((art, idx) => ({
        ...art,
        cardStyle: art.cardStyle === 'dark-overlay' ? 'dark-overlay' : (art.cardStyle === 'classic' ? 'classic' : CARD_STYLES_CYCLE[idx % CARD_STYLES_CYCLE.length]),
        detailLayout: art.detailLayout === 'academic' ? 'split' : (art.detailLayout || DETAIL_LAYOUTS_CYCLE[idx % DETAIL_LAYOUTS_CYCLE.length]),
      }));
    }
    return INITIAL_ARTICLES;
  } catch (e) {
    console.error('Error reading stored articles:', e);
    return INITIAL_ARTICLES;
  }
}

export function saveStoredArticles(articles) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  } catch (e) {
    console.error('Error saving articles to storage:', e);
  }
}
