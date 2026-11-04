import React, { useEffect } from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import Reveal from '../components/Reveal.jsx';
import { useI18n } from '../i18n/index.jsx';
import { Link } from 'react-router-dom';
import { Cookie, Sliders, Settings, CheckCircle2, Info, Compass, Shield } from 'lucide-react';

export default function CookiePolicy() {
  const { t } = useI18n();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const openCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent('cga:open-cookie-preferences'));
  };

  const cookieTable = [
    {
      name: 'cga:lang',
      provider: 'Consejo Global Ambiental (Propia)',
      purpose: {
        es: 'Almacena el idioma preferido del usuario (Español o Inglés) para mantener la consistencia durante toda su navegación.',
        en: 'Preserves the user’s preferred language (Spanish or English) to ensure seamless navigation across sessions.',
      },
      duration: { es: '1 año / Persistente', en: '1 year / Persistent' },
      type: { es: 'Preferencia / Funcional', en: 'Preference / Functional' },
    },
    {
      name: 'cga_cookie_consent',
      provider: 'Consejo Global Ambiental (Propia)',
      purpose: {
        es: 'Registra las categorías de cookies que el usuario ha aceptado o rechazado a través del banner de consentimiento.',
        en: 'Records which cookie categories the user accepted or declined in the consent banner.',
      },
      duration: { es: '1 año / Persistente', en: '1 year / Persistent' },
      type: { es: 'Técnica / Esencial', en: 'Technical / Essential' },
    },
    {
      name: 'cga:user_selected_lang',
      provider: 'Consejo Global Ambiental (Propia)',
      purpose: {
        es: 'Indica si el usuario seleccionó un idioma explícitamente en el menú superior o si se utilizó la autodetección geográfica por dominio.',
        en: 'Flags whether the user manually toggled language or domain auto-routing was applied.',
      },
      duration: { es: '6 meses', en: '6 months' },
      type: { es: 'Preferencia / Funcional', en: 'Preference / Functional' },
    },
    {
      name: 'cga_popup_seen_*',
      provider: 'Consejo Global Ambiental (Propia)',
      purpose: {
        es: 'Evita que los anuncios o comunicados institucionales emergentes se muestren repetidamente durante la misma sesión de consulta.',
        en: 'Prevents institutional modal notices from re-appearing repetitively within the active session.',
      },
      duration: { es: 'Sesión del navegador', en: 'Browser Session' },
      type: { es: 'Técnica / Funcional', en: 'Technical / Functional' },
    },
    {
      name: '_ga / _ga_*',
      provider: 'Google Analytics (Tercero, opcional)',
      purpose: {
        es: 'Métricas estadísticas anónimas agregadas sobre el número de visitantes únicos, páginas más leídas y tiempo de permanencia.',
        en: 'Aggregated anonymous statistical metrics concerning unique visitors, top articles, and reading time.',
      },
      duration: { es: 'Hasta 2 años (desactivable)', en: 'Up to 2 years (deactivatable)' },
      type: { es: 'Analítica / Rendimiento', en: 'Analytics / Performance' },
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f5efe3] text-[#2d2618]">
      <PageHero
        titleWhite={{ es: 'Política de', en: 'Policy of' }}
        titleGreen={{ es: 'Cookies y Rastreo', en: 'Cookies & Tracking' }}
        description={{
          es: 'Información clara, transparente y verificable sobre el uso de cookies y tecnologías de almacenamiento local en la plataforma del Consejo Global Ambiental.',
          en: 'Clear, transparent, and verifiable details regarding the use of cookies and local storage technologies across the Global Environmental Council platform.',
        }}
        bgImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&fit=crop&auto=format"
      />

      <main className="py-16 sm:py-24 px-6 sm:px-12 md:px-20 max-w-5xl mx-auto font-sans">
        {/* Banner de gestión rápida */}
        <Reveal>
          <div className="p-6 sm:p-8 rounded-3xl bg-[#ece4d0]/70 border border-[#d8ceb6] shadow-sm mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#4a5a22]/15 border border-[#4a5a22]/30 flex items-center justify-center text-[#4a5a22] shrink-0">
                <Cookie className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#4a5a22] block font-semibold">
                  {t({ es: 'Centro de Preferencias Interactivo', en: 'Interactive Preferences Center' })}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-[#2d2618] font-light">
                  {t({ es: 'Control sobre tus cookies', en: 'Full Control Over Your Cookies' })}
                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={openCookiePreferences}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4a5a22] hover:bg-[#3a4a18] text-[#f5efe3] text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
            >
              <Sliders className="w-4 h-4" />
              <span>{t({ es: 'Abrir Gestor de Cookies', en: 'Open Cookie Manager' })}</span>
            </button>
          </div>
        </Reveal>

        {/* Sección 1: ¿Qué son? */}
        <div className="space-y-12">
          <Reveal>
            <section className="p-8 sm:p-10 rounded-3xl bg-white/80 border border-[#d8ceb6] shadow-sm space-y-4">
              <h3 className="font-serif text-2xl text-[#2d2618] font-light flex items-center gap-2">
                <span>01.</span>
                <span>{t({ es: '¿Qué son las Cookies y Tecnologías Similares?', en: 'What Are Cookies and Similar Technologies?' })}</span>
              </h3>
              <div className="text-sm sm:text-base text-[#5c523e] font-light leading-relaxed space-y-3">
                <p>
                  {t({
                    es: 'Una cookie es un pequeño archivo de texto que un sitio web descarga en tu dispositivo (computadora, tableta o teléfono móvil) cuando lo visitas. Las cookies permiten que el sitio reconozca tu dispositivo, recuerde tus acciones o preferencias en el tiempo y garantice una experiencia de navegación eficiente y segura.',
                    en: 'A cookie is a small text file downloaded onto your device (computer, tablet, or smartphone) upon visiting a website. Cookies allow the platform to identify your browser, remember choices or preferences over time, and ensure a secure, streamlined browsing experience.',
                  })}
                </p>
                <p>
                  {t({
                    es: 'Además de cookies convencionales, podemos utilizar almacenamiento local del navegador (LocalStorage y SessionStorage) para retener configuraciones de interfaz de alto rendimiento sin sobrecargar las peticiones de red.',
                    en: 'In addition to traditional cookies, we may utilize browser local storage (LocalStorage and SessionStorage) to preserve high-performance UI states without generating superfluous network overhead.',
                  })}
                </p>
              </div>
            </section>
          </Reveal>

          {/* Sección 2: Categorías de Cookies */}
          <Reveal delay={0.05}>
            <section className="p-8 sm:p-10 rounded-3xl bg-white/80 border border-[#d8ceb6] shadow-sm space-y-6">
              <h3 className="font-serif text-2xl text-[#2d2618] font-light flex items-center gap-2">
                <span>02.</span>
                <span>{t({ es: 'Categorías de Cookies que Emplea el CGA', en: 'Categories of Cookies Employed by the CGA' })}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Esenciales */}
                <div className="p-6 rounded-2xl bg-[#ece4d0]/50 border border-[#d8ceb6] space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#4a5a22]/15 flex items-center justify-center text-[#4a5a22] mb-3">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-sm text-[#2d2618]">
                    {t({ es: 'Estrictamente Necesarias', en: 'Strictly Necessary' })}
                  </h4>
                  <p className="text-xs text-[#6b6048] font-light leading-relaxed">
                    {t({
                      es: 'Son esenciales para permitirte navegar por el sitio y utilizar sus funciones seguras. No requieren tu consentimiento previo y no pueden ser desactivadas.',
                      en: 'Essential for site navigation and core security features. They do not require prior consent and cannot be turned off.',
                    })}
                  </p>
                </div>

                {/* Preferencias */}
                <div className="p-6 rounded-2xl bg-[#ece4d0]/50 border border-[#d8ceb6] space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#4a5a22]/15 flex items-center justify-center text-[#4a5a22] mb-3">
                    <Settings className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-sm text-[#2d2618]">
                    {t({ es: 'Preferencias & Idioma', en: 'Preferences & Language' })}
                  </h4>
                  <p className="text-xs text-[#6b6048] font-light leading-relaxed">
                    {t({
                      es: 'Recuerdan tu elección entre Español e Inglés, así como selecciones de visualización, para que no tengas que reconfigurarlas en cada ingreso.',
                      en: 'Store your language preference (Spanish/English) and view toggles so you do not need to reconfigure them on every visit.',
                    })}
                  </p>
                </div>

                {/* Analíticas */}
                <div className="p-6 rounded-2xl bg-[#ece4d0]/50 border border-[#d8ceb6] space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#4a5a22]/15 flex items-center justify-center text-[#4a5a22] mb-3">
                    <Info className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-sm text-[#2d2618]">
                    {t({ es: 'Métricas & Rendimiento', en: 'Analytics & Performance' })}
                  </h4>
                  <p className="text-xs text-[#6b6048] font-light leading-relaxed">
                    {t({
                      es: 'Nos permiten medir de manera anónima y agregada el tráfico de visitantes, identificar artículos de mayor interés y optimizar el rendimiento técnico.',
                      en: 'Allow us to gauge aggregate anonymous visitor traffic, evaluate article readership, and optimize overall page performance.',
                    })}
                  </p>
                </div>
              </div>
            </section>
          </Reveal>

          {/* Sección 3: Tabla inventario */}
          <Reveal delay={0.1}>
            <section className="p-8 sm:p-10 rounded-3xl bg-white/80 border border-[#d8ceb6] shadow-sm space-y-6 overflow-hidden">
              <h3 className="font-serif text-2xl text-[#2d2618] font-light flex items-center gap-2">
                <span>03.</span>
                <span>{t({ es: 'Inventario Detallado de Cookies', en: 'Detailed Cookie Inventory' })}</span>
              </h3>

              <div className="overflow-x-auto -mx-8 sm:mx-0 px-8 sm:px-0">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#d8ceb6] text-[#4a5a22] font-mono uppercase tracking-wider">
                      <th className="py-3 px-3 font-semibold">{t({ es: 'Nombre', en: 'Name' })}</th>
                      <th className="py-3 px-3 font-semibold">{t({ es: 'Proveedor', en: 'Provider' })}</th>
                      <th className="py-3 px-3 font-semibold">{t({ es: 'Propósito', en: 'Purpose' })}</th>
                      <th className="py-3 px-3 font-semibold">{t({ es: 'Duración', en: 'Duration' })}</th>
                      <th className="py-3 px-3 font-semibold">{t({ es: 'Categoría', en: 'Category' })}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e6decb] text-[#5c523e]">
                    {cookieTable.map((cookie) => (
                      <tr key={cookie.name} className="hover:bg-[#f5efe3]/60 transition-colors">
                        <td className="py-3.5 px-3 font-mono font-bold text-[#2d2618] whitespace-nowrap">
                          {cookie.name}
                        </td>
                        <td className="py-3.5 px-3 whitespace-nowrap">{cookie.provider}</td>
                        <td className="py-3.5 px-3 min-w-[260px] leading-relaxed font-light">{t(cookie.purpose)}</td>
                        <td className="py-3.5 px-3 whitespace-nowrap font-mono text-[11px]">{t(cookie.duration)}</td>
                        <td className="py-3.5 px-3 whitespace-nowrap font-mono text-[11px] text-[#4a5a22] font-semibold">
                          {t(cookie.type)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </Reveal>

          {/* Sección 4: Desactivar en navegadores */}
          <Reveal delay={0.15}>
            <section className="p-8 sm:p-10 rounded-3xl bg-white/80 border border-[#d8ceb6] shadow-sm space-y-4">
              <h3 className="font-serif text-2xl text-[#2d2618] font-light flex items-center gap-2">
                <span>04.</span>
                <span>{t({ es: 'Cómo Gestionar Cookies desde tu Navegador', en: 'How to Manage Cookies in Your Browser' })}</span>
              </h3>
              <p className="text-sm text-[#5c523e] font-light leading-relaxed">
                {t({
                  es: 'Además de usar nuestro gestor de preferencias, puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador que utilices:',
                  en: 'Besides using our preferences center, you can allow, block, or delete cookies installed on your computer by configuring your browser settings:',
                })}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#ece4d0]/50 border border-[#d8ceb6] hover:border-[#4a5a22] transition-colors flex items-center justify-between"
                >
                  <span className="font-medium text-[#2d2618]">Google Chrome</span>
                  <span className="text-[#4a5a22]">↗</span>
                </a>
                <a
                  href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#ece4d0]/50 border border-[#d8ceb6] hover:border-[#4a5a22] transition-colors flex items-center justify-between"
                >
                  <span className="font-medium text-[#2d2618]">Mozilla Firefox</span>
                  <span className="text-[#4a5a22]">↗</span>
                </a>
                <a
                  href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#ece4d0]/50 border border-[#d8ceb6] hover:border-[#4a5a22] transition-colors flex items-center justify-between"
                >
                  <span className="font-medium text-[#2d2618]">Apple Safari</span>
                  <span className="text-[#4a5a22]">↗</span>
                </a>
                <a
                  href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#ece4d0]/50 border border-[#d8ceb6] hover:border-[#4a5a22] transition-colors flex items-center justify-between"
                >
                  <span className="font-medium text-[#2d2618]">Microsoft Edge</span>
                  <span className="text-[#4a5a22]">↗</span>
                </a>
              </div>
            </section>
          </Reveal>
        </div>

        {/* Enlaces cruzados */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-4 text-xs text-[#5c523e]">
          <Link to="/terminos-y-condiciones" className="hover:text-[#4a5a22] underline underline-offset-4">
            {t({ es: 'Ver Términos y Condiciones →', en: 'View Terms & Conditions →' })}
          </Link>
          <span>·</span>
          <Link to="/politica-de-privacidad" className="hover:text-[#4a5a22] underline underline-offset-4">
            {t({ es: 'Ver Aviso de Privacidad →', en: 'View Privacy Notice →' })}
          </Link>
        </div>
      </main>

      <FooterNav />
    </div>
  );
}

