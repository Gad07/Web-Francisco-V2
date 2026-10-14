/**
 * Utilidades para manejo y normalización de URLs de imágenes en la plataforma.
 * Soporta conversión automática de enlaces compartidos de Google Drive
 * al formato directo de alta disponibilidad: https://lh3.googleusercontent.com/d/{ID}
 */

export function formatDriveUrl(url) {
  if (!url || typeof url !== 'string') return url || '';
  const trimmed = url.trim();

  // Caso 0: Sanitizar rutas locales de desarrollo para producción
  if (trimmed.startsWith('/src/imports/')) {
    return trimmed.replace('/src/imports/', '/imports/');
  }

  // Extraer el ID único del archivo de Google Drive
  let fileId = null;

  // Caso 1: Enlace compartido estándar de Drive: https://drive.google.com/file/d/{FILE_ID}/view...
  const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) {
    fileId = fileMatch[1];
  }

  // Caso 2: Enlace con parámetro id: https://drive.google.com/open?id={FILE_ID} o /uc?id={FILE_ID}
  if (!fileId) {
    const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch && idMatch[1]) {
      fileId = idMatch[1];
    }
  }

  // Caso 3: Enlace directo de googleusercontent ya existente
  if (!fileId) {
    const ucMatch = trimmed.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
    if (ucMatch && ucMatch[1]) {
      fileId = ucMatch[1];
    }
  }

  // Retornar la URL directa de alta velocidad y CORS abierto de Google CDN
  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return trimmed;
}
