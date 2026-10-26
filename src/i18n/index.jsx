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

export const ENGLISH_DOMAINS = [
  'councilforgreenaction.com',
  'www.councilforgreenaction.com',
];

export const SPANISH_DOMAINS = [
  'consejoglobalambiental.com',
  'www.consejoglobalambiental.com',
];

export const USER_CHOICE_KEY = 'cga:user_selected_lang';

function isSupported(code) {
  return Object.prototype.hasOwnProperty.call(DICTIONARIES, code);
}

export function getDomainLanguage(hostname) {
  const host = (hostname || '').toLowerCase();
  
  // 1. Dominio en inglés o prefijo en.
  if (
    host === 'councilforgreenaction.com' ||
    host === 'www.councilforgreenaction.com' ||
    host.endsWith('.councilforgreenaction.com') ||
    host.startsWith('en.')
  ) {
    return 'en';
  }

  // 2. Dominio en español o prefijo es.
  if (
    host === 'consejoglobalambiental.com' ||
    host === 'www.consejoglobalambiental.com' ||
    host.endsWith('.consejoglobalambiental.com') ||
    host.startsWith('es.')
  ) {
    return 'es';
  }

  return null;
}

function detectLang() {
  if (typeof window !== 'undefined') {
    // 1. Parámetro explícito en la URL: ?lang=en o ?lang=es (máxima prioridad)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang && isSupported(urlLang.toLowerCase())) {
        const resolved = urlLang.toLowerCase();
        try {
          window.localStorage.setItem(USER_CHOICE_KEY, resolved);
          window.localStorage.setItem(STORAGE_KEY, resolved);
        } catch {}
        return resolved;
      }
    } catch {}

    // 2. Selección manual explícita previa del usuario
    try {
      const userChoice = window.localStorage.getItem(USER_CHOICE_KEY);
      if (userChoice && isSupported(userChoice)) {
        return userChoice;
      }
    } catch {}

    // 3. Dominio específico (consejoglobalambiental.com -> ES, councilforgreenaction.com -> EN)
    try {
      const domainLang = getDomainLanguage(window.location.hostname);
      if (domainLang) {
        // Asegurar que no quede un valor residual incorrecto en STORAGE_KEY
        try {
          window.localStorage.setItem(STORAGE_KEY, domainLang);
        } catch {}
        return domainLang;
      }
    } catch {}

    // 4. Idioma del navegador para entornos genéricos (localhost, etc.)
    try {
      const nav = typeof navigator !== 'undefined' ? (navigator.language || '').toLowerCase() : '';
      if (nav.startsWith('en')) return 'en';
    } catch {}
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
    } catch {
      // sin persistencia disponible
    }
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('translate', 'no');
    document.documentElement.classList.add('notranslate');
    if (document.body) {
      document.body.setAttribute('data-lang', lang);
      document.body.setAttribute('translate', 'no');
      document.body.classList.add('notranslate');
    }

    // Mantiene title / description / Open Graph alineados con el idioma activo
    const dict = DICTIONARIES[lang] || DICTIONARIES[DEFAULT_LANG];
    if (dict && dict.meta) {
      document.title = dict.meta.title;
      setMetaContent('meta[name="description"]', dict.meta.description);
      setMetaContent('meta[property="og:title"]', dict.meta.title);
      setMetaContent('meta[property="og:description"]', dict.meta.ogDescription);
      setMetaContent('meta[property="og:locale"]', dict.meta.ogLocale);
    }
  }, [lang]);

  const setLang = useCallback((next) => {
    if (isSupported(next)) {
      // Persistencia síncrona inmediata antes de cualquier re-render o recarga
      try {
        window.localStorage.setItem(USER_CHOICE_KEY, next);
        window.localStorage.setItem(STORAGE_KEY, next);
        document.documentElement.lang = next;
        document.documentElement.setAttribute('data-lang', next);
      } catch {}
      setLangState(next);
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === 'es' ? 'en' : 'es';
      try {
        window.localStorage.setItem(USER_CHOICE_KEY, next);
        window.localStorage.setItem(STORAGE_KEY, next);
        document.documentElement.lang = next;
        document.documentElement.setAttribute('data-lang', next);
      } catch {}
      return next;
    });
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
