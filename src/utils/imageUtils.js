/**
 * Utilidades para manejo y normalización de URLs de imágenes en la plataforma.
 * Soporta conversión automática de enlaces compartidos de Google Drive
 * al formato directo de alta disponibilidad: https://lh3.googleusercontent.com/d/{ID}
 */

export function formatDriveUrl(url) {
  if (!url || typeof url !== 'string') return url || '';
  const trimmed = url.trim();

  // Si ya es un enlace directo de googleusercontent, mantenerlo
  if (trimmed.includes('googleusercontent.com/d/')) {
    return trimmed;
  }

  // Caso 1: Enlace compartido estándar de Drive: https://drive.google.com/file/d/{FILE_ID}/view...
  const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${fileMatch[1]}`;
  }

  // Caso 2: Enlace con parámetro id: https://drive.google.com/open?id={FILE_ID} o /uc?id={FILE_ID}
  const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
  }

  return trimmed;
}
