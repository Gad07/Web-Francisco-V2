import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n, LANGUAGES } from './index.jsx';

const EASE_LUX = [0.16, 1, 0.3, 1];

function GlobeIcon({ className = '' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
    </svg>
  );
}

export default function LanguageSwitch({ tone = 'default', align = 'right', className = '' }) {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) close();
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        close();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  const choose = (code) => {
    setLang(code);
    close();
    triggerRef.current?.focus();
  };

  // tone="solid" para superficies oscuras (menú móvil, footer)
  const isSolid = tone === 'solid';
  const triggerClass = isSolid
    ? 'border-[#6b6048]/25 bg-[#f5efe3]/70 text-[#3a4a18] hover:bg-[#f5efe3]'
    : 'border-[#d8ceb6]/70 bg-[#f5efe3]/60 text-[#5c523e] hover:text-[#2d2618] hover:border-[#4a5a22]/40 hover:bg-[#f5efe3]';

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t('a11y.selectLanguage')}: ${current.label}`}
        className={`group inline-flex h-9 items-center gap-1.5 rounded-full border pl-2.5 pr-2.5 font-sans text-[11px] font-semibold tracking-[0.14em] uppercase backdrop-blur-md transition-all duration-300 active:scale-[0.97] ${triggerClass} ${
          open ? (isSolid ? 'border-[#4a5a22]/50 text-[#2d2618]' : 'border-[#4a5a22]/50 text-[#2d2618]') : ''
        }`}
      >
        <GlobeIcon className="h-[15px] w-[15px] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="tabular-nums">{current.short}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE_LUX }}
          className="opacity-55"
        >
          <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            aria-label={t('a11y.language')}
            tabIndex={-1}
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE_LUX }}
            style={{ transformOrigin: align === 'right' ? 'top right' : 'top left' }}
            className={`absolute top-full mt-2 z-50 min-w-[168px] overflow-hidden rounded-2xl border border-[#d8ceb6] bg-[#f5efe3] p-1.5 shadow-[0_24px_50px_-24px_rgba(45,38,24,0.45)] backdrop-blur-xl ${
              align === 'right' ? 'right-0' : 'left-0'
            }`}
          >
            {LANGUAGES.map((l, i) => {
              const active = l.code === lang;
              return (
                <motion.button
                  key={l.code}
                  role="option"
                  aria-selected={active}
                  type="button"
                  onClick={() => choose(l.code)}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.24, delay: 0.04 * i, ease: EASE_LUX }}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left font-sans transition-colors duration-200 ${
                    active ? 'bg-[#4a5a22]/10' : 'hover:bg-[#4a5a22]/8'
                  }`}
                >
                  <span className="flex items-baseline gap-2.5 min-w-0">
                    <span
                      className={`text-[11px] font-bold tracking-[0.14em] tabular-nums ${
                        active ? 'text-[#4a5a22]' : 'text-[#8a7e68]'
                      }`}
                    >
                      {l.short}
                    </span>
                    <span
                      className={`text-[13px] font-medium truncate ${
                        active ? 'text-[#2d2618]' : 'text-[#4a5340]'
                      }`}
                    >
                      {l.label}
                    </span>
                  </span>
                  <AnimatePresence>
                    {active && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.2, ease: EASE_LUX }}
                        className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#4a5a22]"
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
