import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n, LANGUAGES } from './index.jsx';

/**
 * LanguageSwitch — Submenú de Idioma Minimalista y Ligero
 * Trigger tipo label limpio (ej. "ES ▾") que despliega un submenú
 * compacto, estilizado y sin saturar visualmente el navbar.
 */
export default function LanguageSwitch({ tone = 'default', className = '', align = 'right' }) {
  const { lang, setLang } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const closeTimerRef = useRef(null);

  const isDark = tone === 'dark';
  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(closeTimerRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

  const handleSelect = (code) => {
    setLang(code);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger: Label limpio y ligero con flecha discreta */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`group inline-flex items-center gap-1 px-2 py-1 rounded-md font-sans text-[12px] font-semibold tracking-wider uppercase cursor-pointer select-none transition-colors duration-200 ${
          isDark
            ? isOpen
              ? 'text-white bg-white/10'
              : 'text-[#f5efe3]/80 hover:text-white hover:bg-white/5'
            : isOpen
            ? 'text-[#4a5a22] bg-[#4a5a22]/10'
            : 'text-[#5c523e] hover:text-[#2d2618] hover:bg-[#4a5a22]/5'
        }`}
      >
        <span>{currentLang.short}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          } ${isDark ? 'text-white/60 group-hover:text-white' : 'text-[#7a6e58] group-hover:text-[#2d2618]'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Submenú: Limpio, compacto y sin sobrecargar la pantalla */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 3, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute top-full mt-1.5 w-36 rounded-xl border p-1 shadow-lg backdrop-blur-xl z-50 ${
              align === 'left' ? 'left-0 origin-top-left' : 'right-0 origin-top-right'
            } ${
              isDark
                ? 'bg-[#141811]/95 border-white/15 text-[#f5efe3] shadow-[0_12px_32px_rgba(0,0,0,0.6)]'
                : 'bg-[#fbf8f1]/95 border-[#d8ceb6] text-[#2d2618] shadow-[0_12px_28px_rgba(45,38,24,0.18)]'
            }`}
          >
            {LANGUAGES.map((item) => {
              const isActive = item.code === lang;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => handleSelect(item.code)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs font-sans font-medium transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'bg-white/10 text-[#d8eb96] font-semibold'
                        : 'bg-[#4a5a22]/10 text-[#4a5a22] font-semibold'
                      : isDark
                      ? 'text-[#f5efe3]/75 hover:bg-white/5 hover:text-white'
                      : 'text-[#6a5e48] hover:bg-[#4a5a22]/5 hover:text-[#2d2618]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold tracking-wider opacity-60">
                      {item.short}
                    </span>
                    <span>{item.label}</span>
                  </span>

                  {isActive && (
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


