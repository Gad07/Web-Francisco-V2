/**
 * Colección de artículos institucionales y científicos del CGA.
 * Estado: Limpio (Sin noticias ni artículos pre-cargados).
 */
export const INITIAL_ARTICLES = [];

const STORAGE_KEY = 'cga_articles_cms_v7';

export function getStoredArticles() {
  if (typeof window === 'undefined') return [];
  try {
    // Purgar agresivamente todas las versiones anteriores con mock data
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('cga_articles_cms') || key === 'cga_articles')) {
        if (key !== STORAGE_KEY) {
          try { localStorage.removeItem(key); } catch {}
        }
      }
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [];
    }
    // Filtrar cualquier vestigio de mock articles
    const mockIds = ['tratado-de-biomas', 'moratoria-mineria', 'cumbre-biodiversidad', 'restauracion-arrecifes', 'justicia-climatica', 'corredores-biologicos'];
    const cleaned = parsed.filter(a => a && a.id && !mockIds.includes(a.id) && !mockIds.includes(a.aliasId));
    if (cleaned.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    }
    return cleaned;
  } catch (e) {
    return [];
  }
}

export function saveStoredArticles(articles) {
  if (typeof window === 'undefined') return;
  try {
    const mockIds = ['tratado-de-biomas', 'moratoria-mineria', 'cumbre-biodiversidad', 'restauracion-arrecifes', 'justicia-climatica', 'corredores-biologicos'];
    const cleaned = (articles || []).filter(a => a && a.id && !mockIds.includes(a.id) && !mockIds.includes(a.aliasId));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
  } catch (e) {
    console.error('Error saving articles to storage:', e);
  }
}

