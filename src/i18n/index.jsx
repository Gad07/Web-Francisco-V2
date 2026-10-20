import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import es from './locales/es.js';
import en from './locales/en.js';

export const LANGUAGES = [
  { code: 'es', short: 'ES', label: 'Español', htmlLang: 'es' },
  { code: 'en', short: 'EN', label: 'English', htmlLang: 'en' },
];

export const DEFAULT_LANG = 'es';
export const STORAGE_KEY = 'cga:lang';

const DICTIONARIES = { es, en };

const I18nContext = createContext(null);

// Dominios o patrones que inician directamente en inglés
export const ENGLISH_DOMAINS = [
  'councilforgreenaction.com',
  'www.councilforgreenaction.com',
  'global',
  'international',
  'en.',
];

function isSupported(code) {
  return Object.prototype.hasOwnProperty.call(DICTIONARIES, code);
}

function detectLang() {
  if (typeof window !== 'undefined') {
    // 1. Parámetro explícito en la URL: ?lang=en o ?lang=es
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang && isSupported(urlLang.toLowerCase())) {
        return urlLang.toLowerCase();
      }
    } catch {}

    // 2. Dominio fijo en inglés: councilforgreenaction.com (y subdominios)
    try {
      const host = (window.location.hostname || '').toLowerCase();
      const isCouncilEn = host === 'councilforgreenaction.com' || 
                          host === 'www.councilforgreenaction.com' ||
                          host.endsWith('.councilforgreenaction.com') ||
                          host.startsWith('en.');

      if (isCouncilEn) {
        // En councilforgreenaction.com el idioma por defecto SIEMPRE es inglés
        const saved = window.localStorage.getItem(STORAGE_KEY + ':councilforgreenaction');
        if (saved && isSupported(saved)) return saved;
        return 'en';
      }

      // Otros dominios con prefijo de inglés
      if (ENGLISH_DOMAINS.some((pattern) => host.includes(pattern))) {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved && isSupported(saved)) return saved;
        return 'en';
      }
    } catch {}

    // 3. Preferencia guardada en localStorage
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && isSupported(saved)) return saved;
    } catch {}

    // 4. Idioma del navegador del visitante
    const nav = typeof navigator !== 'undefined' ? navigator.language : '';
    if (typeof nav === 'string' && nav.toLowerCase().startsWith('en')) return 'en';
  }

  return DEFAULT_LANG;
}

function lookup(dictionary, key) {
  return key.split('.').reduce((acc, part) => (acc == null ? undefined : acc[part]), dictionary);
}

function setMetaContent(selector, content) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute('content', content);
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(detectLang);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
      const host = (window.location.hostname || '').toLowerCase();
      if (host.includes('councilforgreenaction.com')) {
        window.localStorage.setItem(STORAGE_KEY + ':councilforgreenaction', lang);
      }
    } catch {
      // sin persistencia disponible — el cambio de idioma sigue funcionando en sesion
    }
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);
    if (document.body) {
      document.body.setAttribute('data-lang', lang);
    }

    // Mantiene title / description / Open Graph alineados con el idioma activo
    const dict = DICTIONARIES[lang] || DICTIONARIES[DEFAULT_LANG];
    document.title = dict.meta.title;
    setMetaContent('meta[name="description"]', dict.meta.description);
    setMetaContent('meta[property="og:title"]', dict.meta.title);
    setMetaContent('meta[property="og:description"]', dict.meta.ogDescription);
    setMetaContent('meta[property="og:locale"]', dict.meta.ogLocale);
  }, [lang]);

  const setLang = useCallback((next) => {
    if (isSupported(next)) setLangState(next);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === 'es' ? 'en' : 'es'));
  }, []);

  const t = useCallback(
    (input) => {
      // 1) Clave del diccionario compartido: t('nav.home')
      if (typeof input === 'string') {
        const found = lookup(DICTIONARIES[lang], input);
        if (typeof found === 'string') return found;
        const fallback = lookup(DICTIONARIES[DEFAULT_LANG], input);
        if (typeof fallback === 'string') return fallback;
        return input;
      }
      // 2) Par bilingue en linea para contenido editorial: t({ es: '...', en: '...' })
      if (input && typeof input === 'object') {
        const value = input[lang] ?? input[DEFAULT_LANG];
        return typeof value === 'string' ? value : '';
      }
      return '';
    },
    [lang]
  );

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t, languages: LANGUAGES }),
    [lang, setLang, toggleLang, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n() debe usarse dentro de <I18nProvider>');
  return ctx;
}

export default I18nProvider;
