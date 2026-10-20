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
          <div className="flex items-center gap-4">
            <span className="uppercase tracking-[0.2em] font-medium text-[10px] sm:text-[11px]">{t('footer.cities')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}