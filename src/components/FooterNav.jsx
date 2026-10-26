import React from 'react';
import { Link } from 'react-router-dom';
import Reveal, { RevealItem } from './Reveal';
import { useI18n } from '../i18n/index.jsx';

const LINK_HOVER = 'transition-colors duration-200 hover:text-[#f5efe3]';

const GROUP_CONSEJO = [
  { to: '/quienes-somos', labelKey: 'nav.quienesSomos' },
  { to: '/gobernanza', labelKey: 'nav.gobiernoEstructura' },
  { to: '/alianzas-institucionales', labelKey: 'nav.alianzasInstitucionales' },
  { to: '/informes-anuales', labelKey: 'nav.informesAnuales' },
];

const GROUP_ACCION = [
  { to: '/lineas-estrategicas', labelKey: 'nav.ejesAccion' },
  { to: '/proyectos', labelKey: 'nav.programasProyectos' },
  { to: '/agenda-2030', labelKey: 'nav.resultadosImpacto' },
  { to: '/presencia-global', labelKey: 'nav.presenciaGlobal' },
];

const GROUP_CAPACITACION = [
  { to: '/capacitacion', labelKey: 'nav.ofertaAcademica' },
  { to: '/capacitacion', labelKey: 'nav.diplomados' },
  { to: '/capacitacion', labelKey: 'nav.cursosTalleres' },
  { to: '/capacitacion', labelKey: 'nav.inscripciones' },
];

const GROUP_COMUNICACION = [
  { to: '/comunicacion', labelKey: 'nav.noticiasComunicados' },
  { to: '/comunicacion', labelKey: 'nav.opinionAnalisis' },
  { to: '/comunicacion', labelKey: 'nav.dialogosCGA' },
  { to: '/comunicacion', labelKey: 'nav.publicaciones' },
];

const TERRITORY_PHOTO =
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80&fit=crop&auto=format';

export default function FooterNav() {
  const { t, lang } = useI18n();
  const logoSrc = lang === 'en' ? '/logos/Logo%20EN.svg' : '/logos/Logo%20ES.svg';

  return (
    <footer className="relative overflow-hidden bg-[#241f16] text-[#d8d2c2] font-sans">
      {/* Fotografía real del territorio — fondo único del footer */}
      <img
        src={TERRITORY_PHOTO}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Veladuras unificadas: base espresso + tinte moss */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(24,20,12,0.94) 0%, rgba(45,38,24,0.74) 40%, rgba(45,38,24,0.5) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 90% at 18% 30%, rgba(90,107,42,0.18) 0%, transparent 55%)' }}
      />

      {/* Fundido superior desde la sección bone */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-36 z-10"
        style={{ background: 'linear-gradient(to bottom, #f5efe3 0%, rgba(245,239,227,0.55) 50%, transparent 100%)' }}
      />

      {/* Orbes atmosféricos */}
      <div aria-hidden className="orb orb-bone orb-drift w-[30rem] h-[30rem] -top-24 -left-24 opacity-40" />
      <div aria-hidden className="orb orb-ocean orb-drift-slow w-[26rem] h-[26rem] bottom-10 -right-24 opacity-25" />

      {/* Contenido único del footer */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 md:px-20">
        {/* Cabecera de cierre: Titular arriba y Botón abajo unificados */}
        <div className="pt-20 sm:pt-36 md:pt-48 lg:pt-56 pb-16 md:pb-24 border-b border-[#f5efe3]/15">
          <div className="flex flex-col items-start gap-8 sm:gap-10 max-w-4xl">
            <Reveal delay={0.08}>
              <h2
                className="font-serif text-2xl sm:text-4xl lg:text-5xl xl:text-[60px] text-[#f5efe3] font-light leading-[1.14] text-balance"
                style={{ textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}
              >
                {t('footer.futurePrefix')}
                <span className="italic text-[#cdd2a6] font-normal">{t('footer.futureEmphasis')}</span>
                {t('footer.futureSuffix')}
              </h2>
            </Reveal>

            <Reveal delay={0.16} className="pt-2">
              <Link
                to="/contacto"
                className="group relative inline-flex items-center gap-3.5 sm:gap-4 rounded-full bg-[#fbf9f4] hover:bg-white text-[#222c10] py-3 pl-7 pr-3 sm:py-3.5 sm:pl-8 sm:pr-3.5 font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.18em] shadow-[0_16px_38px_-10px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.25)] hover:shadow-[0_22px_45px_-8px_rgba(0,0,0,0.65)] ring-1 ring-white/80 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <span>{t('footer.join')}</span>
                <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#3d4a1b] text-[#fbf9f4] transition-all duration-300 group-hover:bg-[#2c3613] group-hover:rotate-45 shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Columnas unificadas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 py-12 md:py-16 items-center">
          <div className="sm:col-span-2 lg:col-span-4 flex items-center">
            <Reveal>
              <Link to="/" className="group inline-flex items-center" aria-label={t('a11y.home')}>
                <img
                  src={logoSrc}
                  alt={t('brand.name')}
                  width="384"
                  height="154"
                  style={{
                    height: '154px',
                    maxHeight: '176px',
                    width: 'auto',
                    maxWidth: '384px',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'brightness(0) invert(1)',
                  }}
                  className="h-24 sm:h-28 md:h-[154px] max-w-[224px] sm:max-w-[304px] md:max-w-[384px] w-auto object-contain brightness-0 invert drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </Link>
            </Reveal>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <RevealItem index={1}>
              <p className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#cdd2a6] mb-4 sm:mb-5">{t('nav.consejo')}</p>
              <ul className="space-y-2.5 sm:space-y-3 text-[13px] border-l border-[#f5efe3]/15 pl-4">
                {GROUP_CONSEJO.map((l) => (
                  <li key={l.labelKey}>
                    <Link to={l.to} className={LINK_HOVER}>{t(l.labelKey)}</Link>
                  </li>
                ))}
              </ul>
            </RevealItem>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <RevealItem index={2}>
              <p className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#cdd2a6] mb-4 sm:mb-5">{t('nav.nuestraAccion')}</p>
              <ul className="space-y-2.5 sm:space-y-3 text-[13px] border-l border-[#f5efe3]/15 pl-4">
                {GROUP_ACCION.map((l) => (
                  <li key={l.labelKey}>
                    <Link to={l.to} className={LINK_HOVER}>{t(l.labelKey)}</Link>
                  </li>
                ))}
              </ul>
            </RevealItem>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <RevealItem index={3}>
              <p className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#cdd2a6] mb-4 sm:mb-5">{t('nav.capacitacion')}</p>
              <ul className="space-y-2.5 sm:space-y-3 text-[13px] border-l border-[#f5efe3]/15 pl-4">
                {GROUP_CAPACITACION.map((l) => (
                  <li key={l.labelKey}>
                    <Link to={l.to} className={LINK_HOVER}>{t(l.labelKey)}</Link>
                  </li>
                ))}
              </ul>
            </RevealItem>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <RevealItem index={4}>
              <p className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#cdd2a6] mb-4 sm:mb-5">{t('nav.comunicacion')}</p>
              <ul className="space-y-2.5 sm:space-y-3 text-[13px] border-l border-[#f5efe3]/15 pl-4">
                {GROUP_COMUNICACION.map((l) => (
                  <li key={l.labelKey}>
                    <Link to={l.to} className={LINK_HOVER}>{t(l.labelKey)}</Link>
                  </li>
                ))}
              </ul>
            </RevealItem>
          </div>
        </div>

        {/* Barra final */}
        <div className="py-6 sm:py-8 border-t border-[#f5efe3]/15 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#d8d2c2]/70 font-light text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span>{t('footer.rights')}</span>
            <span className="text-[#d8d2c2]/80 text-[10px]">
              {t({ es: 'Desarrollado por', en: 'Developed by' })}{' '}
              <a
                href="https://gadielpalma.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5efe3] hover:text-[#cdd2a6] underline underline-offset-2 transition-colors duration-200 font-medium"
              >
                Gadiel Palma
              </a>
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3.5 sm:gap-4">
            <div className="flex items-center gap-3 text-[#f5efe3]/70">
              <a
                href="https://www.linkedin.com/company/consejo-global-ambiental/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn — Consejo Global Ambiental"
                aria-label="LinkedIn"
                className="hover:text-[#0077b5] hover:scale-110 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63 0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/consejoglobalambiental/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram — Consejo Global Ambiental"
                aria-label="Instagram"
                className="hover:text-[#e4405f] hover:scale-110 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://x.com/CGA_Oficial"
                target="_blank"
                rel="noopener noreferrer"
                title="X (Twitter) — Consejo Global Ambiental (@CGA_Oficial)"
                aria-label="X (Twitter)"
                className="hover:text-white hover:scale-110 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/consejoglobalambiental/"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook — Consejo Global Ambiental"
                aria-label="Facebook"
                className="hover:text-[#1877f2] hover:scale-110 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
            <div className="h-3 w-px bg-[#f5efe3]/20 hidden sm:block" />
            <span className="uppercase tracking-[0.2em] font-medium text-[10px] sm:text-[11px]">{t('footer.cities')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}