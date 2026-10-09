/**
 * Utilidades para el Maquetador de Contenido Modular de Artículos del CGA.
 * Permite añadir bloques de distinto tipo, reordenarlos, duplicarlos y renderizarlos
 * en cualquier orden deseado sin restricciones de estructura fija.
 */

export const BLOCK_TYPES = [
  { id: 'paragraph', name: 'Párrafo', desc: 'Texto narrativo editorial', icon: 'AlignLeft' },
  { id: 'columns', name: 'Columnas (Multicolumna)', desc: '2, 3 o 4 columnas con elementos configurables', icon: 'Columns' },
  { id: 'heading', name: 'Subtítulo / Sección', desc: 'Encabezado H2 para dividir secciones', icon: 'Heading' },
  { id: 'quote', name: 'Cita Destacada (Pull Quote)', desc: 'Frase memorable con autor o fuente', icon: 'Quote' },
  { id: 'image', name: 'Imagen con Pie de Foto', desc: 'Fotografía intermedia con caption', icon: 'Image' },
  { id: 'callout', name: 'Caja Destacada / Nota', desc: 'Recuadro con fondo de color para notas clave', icon: 'AlertCircle' },
  { id: 'keyPoints', name: 'Puntos Clave / Hallazgos', desc: 'Lista de viñetas o puntos territoriales', icon: 'CheckCircle2' },
  { id: 'divider', name: 'Separador Editorial', desc: 'Línea o corte visual sutil', icon: 'Minus' },
];

export function createColumnItem(number = 1) {
  return {
    id: `col-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: 'text', // 'text' | 'card' | 'image' | 'stat' | 'quote'
    title: { es: `Pilar ${number}`, en: `Pillar ${number}` },
    text: { es: `Detalle descriptivo para la columna ${number}.`, en: '' },
    badge: { es: `0${number}`, en: `0${number}` },
    statNumber: `${number * 30}%`,
    image: '',
    caption: { es: '', en: '' },
    author: '',
  };
}

export function createBlock(type = 'paragraph') {
  const id = `block-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  switch (type) {
    case 'heading':
      return {
        id,
        type: 'heading',
        level: 'h2',
        text: { es: '', en: '' },
      };

    case 'quote':
      return {
        id,
        type: 'quote',
        text: { es: '', en: '' },
        author: '',
      };

    case 'image':
      return {
        id,
        type: 'image',
        url: '',
        caption: { es: '', en: '' },
        aspectRatio: '16/9', // '16/9' | '21/9' | '4/3'
      };

    case 'callout':
      return {
        id,
        type: 'callout',
        title: { es: 'Nota Editorial Relevante', en: 'Key Editorial Note' },
        text: { es: '', en: '' },
        style: 'beige', // 'beige' | 'moss' | 'dark'
      };

    case 'keyPoints':
      return {
        id,
        type: 'keyPoints',
        title: { es: 'Puntos Clave y Alcance Territorial', en: 'Key Points & Territorial Scope' },
        items: [
          { es: '', en: '' },
          { es: '', en: '' },
        ],
      };

    case 'columns':
      return {
        id,
        type: 'columns',
        columnCount: 3, // 2 | 3 | 4
        columns: [
          createColumnItem(1),
          createColumnItem(2),
          createColumnItem(3),
        ],
      };

    case 'divider':
      return {
        id,
        type: 'divider',
        style: 'line', // 'line' | 'leaf' | 'wide'
      };

    case 'paragraph':
    default:
      return {
        id,
        type: 'paragraph',
        text: { es: '', en: '' },
        isLead: false,
      };
  }
}

/**
 * Normaliza cualquier artículo existente (incluso legacy sin blocks)
 * convirtiendo sus párrafos, cita y keyPoints a un array ordenado de bloques.
 */
export function normalizeArticleBlocks(article) {
  if (!article) return [];

  // Si ya tiene bloques definidos y no está vacío, usarlos directamente
  if (Array.isArray(article.blocks) && article.blocks.length > 0) {
    return article.blocks;
  }

  const generated = [];

  // 1. Párrafos iniciales
  const paras = Array.isArray(article.paragraphs) ? article.paragraphs : [];
  const midPoint = Math.ceil(paras.length / 2);

  paras.slice(0, midPoint).forEach((p, idx) => {
    generated.push({
      id: `legacy-p-${idx}-${Date.now()}`,
      type: 'paragraph',
      text: typeof p === 'string' ? { es: p, en: '' } : { es: p.es || '', en: p.en || '' },
      isLead: idx === 0,
    });
  });

  // 2. Cita si existe
  if (article.quote && (article.quote.es || article.quote.en || typeof article.quote === 'string')) {
    generated.push({
      id: `legacy-q-${Date.now()}`,
      type: 'quote',
      text: typeof article.quote === 'string' ? { es: article.quote, en: '' } : { es: article.quote.es || '', en: article.quote.en || '' },
      author: article.author || '',
    });
  }

  // 3. Párrafos restantes
  paras.slice(midPoint).forEach((p, idx) => {
    generated.push({
      id: `legacy-p-${midPoint + idx}-${Date.now()}`,
      type: 'paragraph',
      text: typeof p === 'string' ? { es: p, en: '' } : { es: p.es || '', en: p.en || '' },
      isLead: false,
    });
  });

  // 4. Puntos clave si existen
  if (Array.isArray(article.keyPoints) && article.keyPoints.length > 0 && article.keyPoints.some(k => k.es || k.en || typeof k === 'string')) {
    generated.push({
      id: `legacy-kp-${Date.now()}`,
      type: 'keyPoints',
      title: { es: 'Puntos Clave y Alcance Territorial', en: 'Key Points & Territorial Scope' },
      items: article.keyPoints.map(k => typeof k === 'string' ? { es: k, en: '' } : { es: k.es || '', en: k.en || '' }),
    });
  }

  return generated.length > 0 ? generated : [createBlock('paragraph')];
}
