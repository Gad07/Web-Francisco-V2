import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cookie, Shield, Check, Sliders, X } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';

const STORAGE_KEY = 'cga_cookie_consent';

export default function CookieConsentBanner() {
  const { t, lang } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  const [preferences, setPreferences] = useState({
    necessary: true, // Always true
    functional: true,
    analytics: true,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Small delay for polite appearance
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(stored);
        setPreferences({
          necessary: true,
          functional: parsed.functional ?? true,
          analytics: parsed.analytics ?? true,
        });
      }
    } catch (e) {
      setIsVisible(true);
    }
  }, []);

  // Listen to open request from anywhere in the app (e.g. footer or cookie policy page)
  useEffect(() => {
    const handleOpen = () => {
      setShowPreferences(true);
      setIsVisible(true);
    };
    window.addEventListener('cga:open-cookie-preferences', handleOpen);
    return () => window.removeEventListener('cga:open-cookie-preferences', handleOpen);
  }, []);

  const saveConsent = (choice) => {
    const consentData = {
      necessary: true,
      functional: choice.functional ?? false,
      analytics: choice.analytics ?? false,
      timestamp: new Date().toISOString(),
      lang,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData));
    } catch (e) {
      // ignore
    }
    setPreferences({
      necessary: true,
      functional: consentData.functional,
      analytics: consentData.analytics,
    });
    setShowPreferences(false);
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ functional: true, analytics: true });
  };

  const handleAcceptNecessary = () => {
    saveConsent({ functional: false, analytics: false });
  };

  const handleSaveCustom = () => {
    saveConsent({
      functional: preferences.functional,
      analytics: preferences.analytics,
    });
  };

  return (
    <>
      {/* ─── MODAL DE CONFIGURACIÓN DETALLADA ─── */}
      <AnimatePresence>
        {showPreferences && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-xl bg-[#1e1910] text-[#f5efe3] rounded-3xl border border-[#4a3f2b] shadow-2xl p-6 sm:p-8 overflow-hidden font-sans"
            >
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-[#cdd2a6]/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label={t({ es: 'Cerrar preferencias', en: 'Close preferences' })}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#5a6b2a]/25 border border-[#5a6b2a]/40 flex items-center justify-center text-[#cdd2a6]">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-[#f5efe3]">
                    {t({ es: 'Preferencias de Cookies', en: 'Cookie Preferences' })}
                  </h3>
                  <p className="text-xs text-[#cdd2a6]/80 font-mono">
                    {t({ es: 'Consejo Global Ambiental · Gobernanza Digital', en: 'Global Environmental Council · Digital Governance' })}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#d8d2c2]/80 leading-relaxed mb-6 font-light">
                {t({
                  es: 'Puedes personalizar qué categorías de cookies deseas habilitar. Las cookies técnicas esenciales no se pueden desactivar ya que son indispensables para el funcionamiento y seguridad de la plataforma.',
                  en: 'Customize the categories of cookies you wish to enable. Essential technical cookies cannot be disabled as they are strictly required for platform operation and security.',
                })}
              </p>

              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                {/* 1. Esenciales */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs sm:text-sm text-white">
                        {t({ es: 'Cookies Técnicas & Esenciales', en: 'Strictly Necessary Cookies' })}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#5a6b2a]/40 text-[#cdd2a6] font-mono uppercase tracking-wider">
                        {t({ es: 'Siempre Activas', en: 'Always Active' })}
                      </span>
                    </div>
                    <p className="text-xs text-[#d8d2c2]/70 font-light leading-relaxed">
                      {t({
                        es: 'Garantizan la navegación, seguridad contra ataques, balanceo de carga y persistencia básica de la sesión.',
                        en: 'Ensure page routing, anti-tampering security, load balancing, and fundamental session integrity.',
                      })}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="mt-1 w-4 h-4 rounded text-[#5a6b2a] accent-[#5a6b2a] cursor-not-allowed opacity-70"
                  />
                </div>

                {/* 2. Preferencias / Funcionales */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-semibold text-xs sm:text-sm text-white block">
                      {t({ es: 'Cookies de Preferencias & Funcionalidad', en: 'Preferences & Functional Cookies' })}
                    </span>
                    <p className="text-xs text-[#d8d2c2]/70 font-light leading-relaxed">
                      {t({
                        es: 'Recuerdan tu idioma preferido (Español/Inglés) y ajustes visuales para que no tengas que reconfigurarlos en cada visita.',
                        en: 'Remember your preferred language (Spanish/English) and interface states so you don’t need to reset them each visit.',
                      })}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="chk-functional"
                    checked={preferences.functional}
                    onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-[#5a6b2a] accent-[#5a6b2a] cursor-pointer"
                  />
                </div>

                {/* 3. Analíticas */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-semibold text-xs sm:text-sm text-white block">
                      {t({ es: 'Cookies Analíticas & Rendimiento', en: 'Analytics & Performance Cookies' })}
                    </span>
                    <p className="text-xs text-[#d8d2c2]/70 font-light leading-relaxed">
                      {t({
                        es: 'Recopilan estadísticas anónimas agregadas para ayudarnos a entender qué publicaciones y ejes bioculturales tienen mayor impacto.',
                        en: 'Collect anonymous aggregated statistics to help us gauge which biocultural articles and axes drive the greatest public impact.',
                      })}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="chk-analytics"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-[#5a6b2a] accent-[#5a6b2a] cursor-pointer"
                  />
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Link
                  to="/politica-de-cookies"
                  onClick={() => setShowPreferences(false)}
                  className="text-xs text-[#cdd2a6] hover:underline underline-offset-4 font-light"
                >
                  {t({ es: 'Leer Política de Cookies completa →', en: 'Read full Cookie Policy →' })}
                </Link>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleAcceptNecessary}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs text-[#f5efe3] transition-colors"
                  >
                    {t({ es: 'Rechazar opcionales', en: 'Reject optional' })}
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCustom}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-[#5a6b2a] hover:bg-[#6b8032] text-xs font-semibold text-white transition-colors shadow-lg"
                  >
                    {t({ es: 'Guardar preferencias', en: 'Save preferences' })}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── BANNER FLOTANTE DE CONSENTIMIENTO ─── */}
      <AnimatePresence>
        {isVisible && !showPreferences && (
          <motion.aside
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-xl z-[9990] bg-[#1a150e]/95 backdrop-blur-xl border border-[#443824] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] text-[#f5efe3] rounded-3xl p-5 sm:p-6 font-sans select-none"
            role="region"
            aria-label={t({ es: 'Aviso de Cookies', en: 'Cookie Notice' })}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#5a6b2a]/25 border border-[#5a6b2a]/40 flex items-center justify-center text-[#cdd2a6] shrink-0 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-serif text-base sm:text-lg text-[#f5efe3] font-normal leading-snug">
                    {t({ es: 'Gestión de Cookies & Privacidad', en: 'Cookie & Privacy Governance' })}
                  </h4>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/10 text-[#cdd2a6]">
                    CGA 2026
                  </span>
                </div>

                <p className="text-xs sm:text-[13px] text-[#d8d2c2]/80 font-light leading-relaxed">
                  {t({
                    es: 'Utilizamos cookies propias y de terceros para optimizar la navegación técnica, recordar tus preferencias de idioma y medir el alcance e impacto de nuestras iniciativas bioculturales. Puedes aceptar todas, mantener solo las necesarias o configurar tus preferencias.',
                    en: 'We use first and third-party cookies to optimize technical navigation, preserve your language preferences, and evaluate the reach of our biocultural initiatives. You may accept all, keep strictly necessary, or customize your preferences.',
                  })}
                </p>

                <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#cdd2a6]">
                  <Link to="/politica-de-cookies" className="hover:underline underline-offset-2">
                    {t({ es: 'Política de Cookies', en: 'Cookie Policy' })}
                  </Link>
                  <span>·</span>
                  <Link to="/politica-de-privacidad" className="hover:underline underline-offset-2">
                    {t({ es: 'Aviso de Privacidad', en: 'Privacy Policy' })}
                  </Link>
                  <span>·</span>
                  <Link to="/terminos-y-condiciones" className="hover:underline underline-offset-2">
                    {t({ es: 'Términos y Condiciones', en: 'Terms & Conditions' })}
                  </Link>
                </div>

                {/* Acciones */}
                <div className="pt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-full bg-[#5a6b2a] hover:bg-[#6b8032] text-white text-xs font-semibold tracking-wide transition-all shadow-md active:scale-95 text-center cursor-pointer"
                  >
                    {t({ es: 'Aceptar todas', en: 'Accept all' })}
                  </button>

                  <button
                    type="button"
                    onClick={handleAcceptNecessary}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-[#f5efe3] text-xs font-medium transition-all active:scale-95 text-center cursor-pointer"
                  >
                    {t({ es: 'Solo esenciales', en: 'Essential only' })}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowPreferences(true)}
                    className="px-3 py-2 rounded-full border border-white/20 hover:border-white/40 text-[#cdd2a6] hover:text-white text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    title={t({ es: 'Personalizar cookies', en: 'Customize cookies' })}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>{t({ es: 'Configurar', en: 'Preferences' })}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

