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
  const { t } = useI18n();

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
        {/* Cabecera de cierre */}
        <div className="pt-36 sm:pt-48 md:pt-56 pb-16 md:pb-24 border-b border-[#f5efe3]/15">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-10">
            <Reveal delay={0.08}>
              <h2
                className="font-serif text-2xl sm:text-4xl lg:text-5xl xl:text-[60px] text-[#f5efe3] font-light leading-[1.14] max-w-3xl text-balance"
                style={{ textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}
              >
                {t('footer.futurePrefix')}
                <span className="italic text-[#cdd2a6] font-normal">{t('footer.futureEmphasis')}</span>
                {t('footer.futureSuffix')}
              </h2>
            </Reveal>

            <Reveal delay={0.16} className="flex-shrink-0 lg:pb-2">
              <Link
                to="/contacto"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full py-2 pl-5 pr-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f5efe3] bg-white/10 ring-1 ring-inset ring-white/20 backdrop-blur-xl backdrop-saturate-150 shadow-[0_12px_32px_-14px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/15 hover:ring-white/30 hover:shadow-[0_16px_40px_-14px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.42)] active:scale-[0.98]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full bg-[#5a6b2a]/25"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/30 via-white/5 to-transparent"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-[130%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]"
                />
                <span className="relative z-10 pl-1">{t('footer.join')}</span>
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 ring-1 ring-inset ring-white/25 backdrop-blur-md transition-all duration-300 group-hover:bg-white/25 group-hover:rotate-45">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Columnas unificadas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 py-12 md:py-16">
          <div className="sm:col-span-2 lg:col-span-4">
            <Reveal>
              <Link to="/" className="group inline-block mb-6" aria-label={t('a11y.home')}>
                <img
                  src="/logos/logo-cga-footer.webp"
                  alt={t('brand.name')}
                  className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain drop-shadow-[0_2px_14px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </Link>
              <p className="text-[#d8d2c2]/80 text-[13px] font-light leading-relaxed max-w-xs">
                {t('footer.about')}
              </p>
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
          <span>{t('footer.rights')}</span>
          <span className="inline-flex items-center gap-1.5 text-[#d8d2c2]/90">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5a6b2a] inline-block" />
            <span>{t('footer.developer')}</span>
          </span>
          <span className="uppercase tracking-[0.2em] font-medium">{t('footer.cities')}</span>
        </div>
      </div>
    </footer>
  );
}