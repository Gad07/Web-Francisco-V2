import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { useI18n } from '../i18n/index.jsx';

const EASE_LUX = [0.16, 1, 0.3, 1];
const EASE_SPRING = { type: 'spring', stiffness: 340, damping: 30 };

const NAV_DEBOUNCE = 300;

const CONSEJO_LINKS = [
  { to: '/quienes-somos', labelKey: 'nav.quienesSomos', subKey: 'navSub.quienesSomos' },
  { to: '/gobernanza', labelKey: 'nav.gobiernoEstructura', subKey: 'navSub.gobiernoEstructura' },
  { to: '/alianzas-institucionales', labelKey: 'nav.alianzasInstitucionales', subKey: 'navSub.alianzasInstitucionales' },
  { to: '/informes-anuales', labelKey: 'nav.informesAnuales', subKey: 'navSub.informesAnuales' },
];

const ACCION_LINKS = [
  { to: '/lineas-estrategicas', labelKey: 'nav.ejesAccion', subKey: 'navSub.ejesAccion' },
  { to: '/proyectos', labelKey: 'nav.programasProyectos', subKey: 'navSub.programasProyectos' },
  { to: '/agenda-2030', labelKey: 'nav.resultadosImpacto', subKey: 'navSub.resultadosImpacto' },
];

const CAPACITACION_LINKS = [
  { to: '/capacitacion', labelKey: 'nav.ofertaAcademica' },
  { to: '/capacitacion', labelKey: 'nav.diplomados' },
  { to: '/capacitacion', labelKey: 'nav.cursosTalleres' },
  { to: '/capacitacion', labelKey: 'nav.conferenciasWebinars' },
  { to: '/capacitacion', labelKey: 'nav.programasOrganizaciones' },
  { to: '/capacitacion', labelKey: 'nav.especialistas' },
  { to: '/capacitacion', labelKey: 'nav.calendario' },
  { to: '/capacitacion', labelKey: 'nav.inscripciones' },
];

const COMUNICACION_LINKS = [
  { to: '/comunicacion', labelKey: 'nav.noticiasComunicados' },
  { to: '/comunicacion', labelKey: 'nav.eventos' },
  { to: '/comunicacion', labelKey: 'nav.opinionAnalisis' },
  { to: '/comunicacion', labelKey: 'nav.dialogosCGA' },
  { to: '/comunicacion', labelKey: 'nav.publicaciones' },
];

const ACTIVE_ROUTES_CONSEJO = ['/nosotros', '/quienes-somos', '/gobernanza', '/alianzas-institucionales', '/informes-anuales', '/asamblea-anual'];
const ACTIVE_ROUTES_ACCION = ['/lineas-estrategicas', '/ejes-de-accion', '/proyectos', '/programas-proyectos', '/agenda-2030'];
const ACTIVE_ROUTES_CAPACITACION = ['/capacitacion'];
const ACTIVE_ROUTES_COMUNICACION = ['/comunicacion', '/conocimiento'];

function SocialIcon({ id, className = 'w-3.5 h-3.5 fill-current' }) {
  switch (id) {
    case 'linkedin':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63 0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
        </svg>
      );
    case 'x':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      );
    default:
      return null;
  }
}

const DIRECT_SOCIAL_NETWORKS = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    shortName: 'LinkedIn',
    title: 'Consejo Global Ambiental — LinkedIn',
    href: 'https://www.linkedin.com/company/consejo-global-ambiental/posts/?feedView=all',
    hoverClass: 'hover:text-[#0077b5] hover:bg-[#0077b5]/10',
  },
  {
    id: 'x',
    name: 'X',
    shortName: 'X',
    title: 'Consejo Global Ambiental — X (@CGA_Oficial)',
    href: 'https://x.com/CGA_Oficial',
    hoverClass: 'hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/15',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    shortName: 'Instagram',
    title: 'Consejo Global Ambiental — Instagram (@consejoglobalambiental)',
    href: 'https://www.instagram.com/consejoglobalambiental/',
    hoverClass: 'hover:text-[#e4405f] hover:bg-[#e4405f]/10',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    shortName: 'Facebook',
    title: 'Consejo Global Ambiental — Facebook',
    href: 'https://www.facebook.com/consejoglobalambiental/',
    hoverClass: 'hover:text-[#1877f2] hover:bg-[#1877f2]/10',
  },
];

function Dropdown({ open, isDark = false, align = 'center', children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.25, ease: EASE_LUX }}
          className={`absolute top-full mt-2 min-w-[240px] overflow-hidden rounded-2xl border p-2 backdrop-blur-2xl z-50 origin-top ${
            align === 'right' ? 'right-0 left-auto translate-x-0' : 'left-1/2 -translate-x-1/2'
          } ${
            isDark
              ? 'border-white/15 bg-[#141811]/95 text-[#f5efe3] shadow-[0_24px_50px_-24px_rgba(0,0,0,0.8)]'
              : 'border-[#d8ceb6] bg-[#f5efe3] text-[#2d2618] shadow-[0_24px_50px_-24px_rgba(45,38,24,0.4)]'
          }`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DropdownItem({ to, label, sub, delay, isDark = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay, ease: EASE_LUX }}
    >
      <Link
        to={to}
        className={`group flex items-center justify-between gap-4 rounded-xl px-4.5 py-3 transition-colors duration-200 ${
          isDark
            ? 'hover:bg-white/10 text-[#e0d8c7]'
            : 'hover:bg-[#4a5a22]/8 text-[#4a5340]'
        }`}
      >
        <span>
          <span className={`block text-[13.5px] sm:text-[14px] font-medium transition-colors duration-200 ${
            isDark ? 'text-[#f5efe3] group-hover:text-white' : 'text-[#4a5340] group-hover:text-[#2d2618]'
          }`}>
            {label}
          </span>
          {sub && (
            <span className={`mt-0.5 block text-[11.5px] font-light ${
              isDark ? 'text-[#a8a090]' : 'text-[#8a7e68]'
            }`}>
              {sub}
            </span>
          )}
        </span>
        <span className={`translate-x-[-4px] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 ${
          isDark ? 'text-[#d8eb96]' : 'text-[#4a5a22]'
        }`}>
          &rarr;
        </span>
      </Link>
    </motion.div>
  );
}

function DropdownLanguageItem({ label, sub, active, onClick, delay, isDark = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay, ease: EASE_LUX }}
    >
      <button
        type="button"
        onClick={onClick}
        className={`w-full group flex items-center justify-between gap-4 rounded-xl px-4.5 py-3 transition-colors duration-200 text-left cursor-pointer ${
          active
            ? isDark
              ? 'bg-white/10 text-white font-semibold'
              : 'bg-[#4a5a22]/10 text-[#4a5a22] font-semibold'
            : isDark
            ? 'hover:bg-white/10 text-[#e0d8c7]'
            : 'hover:bg-[#4a5a22]/8 text-[#4a5340]'
        }`}
      >
        <span>
          <span className={`block text-[13.5px] sm:text-[14px] font-medium transition-colors duration-200 ${
            active
              ? isDark ? 'text-white' : 'text-[#4a5a22]'
              : isDark ? 'text-[#f5efe3] group-hover:text-white' : 'text-[#4a5340] group-hover:text-[#2d2618]'
          }`}>
            {label}
          </span>
          {sub && (
            <span className={`mt-0.5 block text-[11.5px] font-light ${
              isDark ? 'text-[#a8a090]' : 'text-[#8a7e68]'
            }`}>
              {sub}
            </span>
          )}
        </span>
        <span className={`text-xs font-bold transition-all duration-200 ${
          active
            ? isDark ? 'text-[#d8eb96]' : 'text-[#4a5a22]'
            : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-[-4px]'
        }`}>
          {active ? '✓' : '→'}
        </span>
      </button>
    </motion.div>
  );
}

function NavLink({ to, label, active, isDark = false }) {
  const activeClass = isDark ? 'text-[#d8eb96] font-semibold drop-shadow-[0_1px_8px_rgba(216,235,150,0.4)]' : 'text-[#3a4a18] font-semibold';
  const idleClass = isDark ? 'text-[#f5efe3]/85 hover:text-white drop-shadow-sm' : 'text-[#5c523e] hover:text-[#2d2618]';

  return (
    <Link
      to={to}
      className={`group relative inline-flex h-9 shrink-0 items-center px-1.5 sm:px-2 lg:px-2.5 xl:px-3 2xl:px-3.5 rounded-xl font-sans text-[11.5px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px] font-medium tracking-[0.01em] whitespace-nowrap transition-all duration-200 hover:bg-black/[0.04] ${
        isDark ? 'hover:bg-white/10' : ''
      } ${
        active ? activeClass : idleClass
      }`}
    >
      <span>{label}</span>
    </Link>
  );
}

function DropdownTrigger({ label, open, onClick, active = false, isDark = false }) {
  const activeClass = isDark ? 'text-[#d8eb96] font-semibold drop-shadow-[0_1px_8px_rgba(216,235,150,0.4)]' : 'text-[#3a4a18] font-semibold';
  const idleClass = isDark ? 'text-[#f5efe3]/85 hover:text-white drop-shadow-sm' : 'text-[#5c523e] hover:text-[#2d2618]';

  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex h-9 shrink-0 items-center gap-1 xl:gap-1.5 px-1.5 sm:px-2 lg:px-2.5 xl:px-3 2xl:px-3.5 rounded-xl whitespace-nowrap font-sans text-[11.5px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px] font-medium tracking-[0.01em] transition-all duration-200 active:scale-[0.98] cursor-pointer hover:bg-black/[0.04] ${
        isDark ? 'hover:bg-white/10' : ''
      } ${
        open || active ? activeClass : idleClass
      }`}
    >
      <span>{label}</span>
      <motion.span
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.3, ease: EASE_LUX }}
        className={`text-[10px] ${isDark ? 'text-[#d8eb96]' : 'opacity-60'}`}
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.span>
    </button>
  );
}

export default function HeaderNav({
  isLoaded = true,
}) {
  const { t, lang, setLang } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const openTimerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const location = useLocation();

  const scrollY = useMotionValue(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const handleModal = (e) => {
      setIsModalOpen(Boolean(e?.detail?.open));
    };
    window.addEventListener('cga:modal', handleModal);
    return () => window.removeEventListener('cga:modal', handleModal);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollY.set(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [scrollY]);

  // ─── DETECCIÓN DINÁMICA DE FONDO OSCURO BAJO LA NAVBAR ───
  useEffect(() => {
    const checkDarkTheme = () => {
      // 1. Elementos explícitamente marcados con data-nav-theme="dark" o data-theme="dark"
      const darkElements = document.querySelectorAll('[data-nav-theme="dark"], [data-theme="dark"]');
      const headerThreshold = 75; // px desde el tope del viewport
      let overDark = false;

      for (const el of darkElements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= headerThreshold && rect.bottom >= 25) {
          overDark = true;
          break;
        }
      }

      // 2. Verificación secundaria por secciones con fondo oscuro (#0a0d08, black)
      if (!overDark) {
        const darkSection = document.querySelector('section.bg-\\[\\#0a0d08\\], [data-template="immersive"]');
        if (darkSection) {
          const rect = darkSection.getBoundingClientRect();
          if (rect.top <= headerThreshold && rect.bottom >= 25) {
            overDark = true;
          }
        }
      }

      setIsDarkTheme(overDark);
    };

    checkDarkTheme();
    window.addEventListener('scroll', checkDarkTheme, { passive: true });
    window.addEventListener('resize', checkDarkTheme, { passive: true });

    const observer = new MutationObserver(checkDarkTheme);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      window.removeEventListener('scroll', checkDarkTheme);
      window.removeEventListener('resize', checkDarkTheme);
      observer.disconnect();
    };
  }, [location.pathname, location.search]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const openMenu = (name) => {
    clearTimeout(closeTimerRef.current);
    openTimerRef.current = setTimeout(() => setOpenDropdown(name), 40);
  };
  const scheduleClose = () => {
    clearTimeout(openTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpenDropdown(null), NAV_DEBOUNCE);
  };

  useEffect(() => () => {
    clearTimeout(openTimerRef.current);
    clearTimeout(closeTimerRef.current);
  }, []);

  const isConsejoActive = ACTIVE_ROUTES_CONSEJO.includes(location.pathname);
  const isAccionActive = ACTIVE_ROUTES_ACCION.includes(location.pathname);
  const isCapacitacionActive = ACTIVE_ROUTES_CAPACITACION.includes(location.pathname);
  const isComunicacionActive = ACTIVE_ROUTES_COMUNICACION.includes(location.pathname);

  return (
    <>
      {/* Cabecera editorial — Sin scroll es barra fija completa; Con scroll pasa a cápsula flotante centrada */}
      <motion.header
        id="main-nav"
        initial={false}
        animate={{
          y: isModalOpen ? -45 : 0,
          opacity: !isLoaded || isModalOpen ? 0 : 1,
        }}
        transition={{
          duration: isModalOpen ? 0.35 : 0.45,
          ease: EASE_LUX,
        }}
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-[top,width,height,border-radius,padding,background-color,border-color,box-shadow,color] duration-500 ease-out ${
          isModalOpen ? 'pointer-events-none' : ''
        } ${
          isDarkTheme ? 'text-[#f5efe3]' : 'text-[#2d2618]'
        } ${
          isScrolled
            ? isDarkTheme
              ? 'top-3 md:top-4 w-[98%] max-w-[1580px] 2xl:max-w-[1680px] h-[64px] md:h-[68px] rounded-full px-3.5 sm:px-5 md:px-6 xl:px-8 bg-black/65 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 shadow-[0_18px_45px_-16px_rgba(0,0,0,0.8)] ring-1 ring-inset ring-white/10'
              : 'top-3 md:top-4 w-[98%] max-w-[1580px] 2xl:max-w-[1680px] h-[64px] md:h-[68px] rounded-full px-3.5 sm:px-5 md:px-6 xl:px-8 bg-[#f5efe3]/90 backdrop-blur-2xl backdrop-saturate-150 border border-[#d8ceb6]/85 shadow-[0_18px_45px_-16px_rgba(45,38,24,0.32)] ring-1 ring-inset ring-white/40'
            : isDarkTheme
              ? 'top-0 w-full max-w-none h-[80px] md:h-[88px] rounded-none px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 bg-gradient-to-b from-black/85 via-black/45 to-transparent border-0 border-transparent shadow-none'
              : 'top-0 w-full max-w-none h-[80px] md:h-[88px] rounded-none px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 bg-gradient-to-b from-[#f5efe3]/95 via-[#f5efe3]/75 to-transparent border-0 border-transparent shadow-none'
        } ${!isLoaded ? 'pointer-events-none' : ''}`}
      >
        <div className="mx-auto flex w-full h-full items-center justify-between gap-2 lg:gap-3 xl:gap-5">
          {/* Cluster izquierdo: logo que se adapta a fondo claro u oscuro */}
          <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
            <Link
              to="/"
              className="group flex items-center flex-shrink-0 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] overflow-hidden"
              style={{
                height: isScrolled ? '40px' : '52px',
                maxHeight: isScrolled ? '40px' : '52px',
                lineHeight: 0
              }}
              aria-label={t('a11y.home')}
            >
              <img
                src={lang === 'en' ? '/logos/Logo%20EN.svg' : '/logos/Logo%20ES.svg'}
                alt={t('brand.name') || 'Consejo Global Ambiental'}
                width="240"
                height="55"
                style={{
                  height: isScrolled ? '40px' : '52px',
                  maxHeight: isScrolled ? '40px' : '52px',
                  width: 'auto',
                  maxWidth: isScrolled ? '185px' : '235px',
                  objectFit: 'contain',
                  display: 'block'
                }}
                className={`h-9.5 md:h-[52px] w-auto max-h-9.5 md:max-h-[52px] max-w-[180px] md:max-w-[235px] object-contain transition-all duration-300 ease-out group-hover:scale-[1.03] ${
                  isDarkTheme ? 'drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]' : 'drop-shadow-none'
                }`}
              />
            </Link>
          </div>

          {/* Navegación central (desktop) */}
          <nav
            className="hidden lg:flex items-center gap-0.5 lg:gap-1 xl:gap-2.5 2xl:gap-4 flex-shrink-0"
            onMouseLeave={scheduleClose}
          >
            {/* 1. EL CONSEJO */}
            <div className="relative" onMouseEnter={() => openMenu('consejo')}>
              <DropdownTrigger
                label={t('nav.consejo')}
                open={openDropdown === 'consejo'}
                active={isConsejoActive}
                isDark={isDarkTheme}
                onClick={() => setOpenDropdown(openDropdown === 'consejo' ? null : 'consejo')}
              />
              <Dropdown open={openDropdown === 'consejo'} isDark={isDarkTheme}>
                {CONSEJO_LINKS.map((l, i) => (
                  <DropdownItem
                    key={l.to}
                    to={l.to}
                    label={t(l.labelKey)}
                    sub={t(l.subKey)}
                    delay={0.03 * i}
                    isDark={isDarkTheme}
                  />
                ))}
              </Dropdown>
            </div>

            {/* 2. NUESTRA ACCIÓN */}
            <div className="relative" onMouseEnter={() => openMenu('accion')}>
              <DropdownTrigger
                label={t('nav.nuestraAccion')}
                open={openDropdown === 'accion'}
                active={isAccionActive}
                isDark={isDarkTheme}
                onClick={() => setOpenDropdown(openDropdown === 'accion' ? null : 'accion')}
              />
              <Dropdown open={openDropdown === 'accion'} isDark={isDarkTheme}>
                {ACCION_LINKS.map((l, i) => (
                  <DropdownItem
                    key={l.to}
                    to={l.to}
                    label={t(l.labelKey)}
                    sub={t(l.subKey)}
                    delay={0.03 * i}
                    isDark={isDarkTheme}
                  />
                ))}
              </Dropdown>
            </div>

            {/* 3. PRESENCIA GLOBAL */}
            <div onMouseEnter={() => openMenu(null)}>
              <NavLink to="/presencia-global" label={t('nav.presenciaGlobal')} active={location.pathname === '/presencia-global'} isDark={isDarkTheme} />
            </div>

            {/* 4. CAPACITACIÓN */}
            <div onMouseEnter={() => openMenu(null)}>
              <NavLink to="/capacitacion" label={t('nav.capacitacion')} active={isCapacitacionActive} isDark={isDarkTheme} />
            </div>

            {/* 5. COMUNICACIÓN */}
            <div onMouseEnter={() => openMenu(null)}>
              <NavLink to="/comunicacion" label={t('nav.comunicacion')} active={isComunicacionActive} isDark={isDarkTheme} />
            </div>

            {/* 6. IDIOMA */}
            <div className="relative" onMouseEnter={() => openMenu('idioma')}>
              <DropdownTrigger
                label={t('nav.idioma') || 'Idioma'}
                open={openDropdown === 'idioma'}
                active={false}
                isDark={isDarkTheme}
                onClick={() => setOpenDropdown(openDropdown === 'idioma' ? null : 'idioma')}
              />
              <Dropdown open={openDropdown === 'idioma'} isDark={isDarkTheme}>
                <DropdownLanguageItem
                  label="Español (ES)"
                  sub={t('navSub.idiomaEs') || 'Edición Institucional'}
                  active={lang === 'es'}
                  onClick={() => {
                    setLang('es');
                    setOpenDropdown(null);
                  }}
                  delay={0}
                  isDark={isDarkTheme}
                />
                <DropdownLanguageItem
                  label="English (EN)"
                  sub={t('navSub.idiomaEn') || 'International Edition'}
                  active={lang === 'en'}
                  onClick={() => {
                    setLang('en');
                    setOpenDropdown(null);
                  }}
                  delay={0.03}
                  isDark={isDarkTheme}
                />
              </Dropdown>
            </div>
          </nav>

          {/* Acciones derecha: Redes sociales oficiales directas (LinkedIn, X, Instagram, Facebook) · Apoya al CGA · Contacto */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* ─── Redes Sociales Oficiales Directas (LinkedIn, X, Instagram, Facebook) ─── */}
            <div className="hidden min-[1080px]:flex items-center gap-0.5 xl:gap-1 text-inherit">
              {DIRECT_SOCIAL_NETWORKS.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.title}
                  aria-label={social.title}
                  className={`group relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 active:scale-95 ${
                    isDarkTheme
                      ? 'text-[#f5efe3]/80 hover:text-white hover:bg-white/10'
                      : 'text-[#5c523e]/85 hover:text-[#2d2618] hover:bg-black/[0.04]'
                  } ${social.hoverClass}`}
                >
                  <span className="transition-transform duration-200 group-hover:scale-115 flex items-center justify-center">
                    <SocialIcon id={social.id} className="w-3.5 h-3.5 fill-current" />
                  </span>
                </a>
              ))}
            </div>

            {/* Separador vertical sutil */}
            <div
              className={`hidden min-[1080px]:block h-4 w-px mx-0.5 xl:mx-1 transition-colors duration-300 ${
                isDarkTheme ? 'bg-white/20' : 'bg-[#d8ceb6]/90'
              }`}
            />

            <Link
              to="/apoya"
              className={`group hidden sm:inline-flex h-8.5 md:h-9 items-center px-3 sm:px-3.5 xl:px-4 font-sans text-[11px] xl:text-[12px] font-semibold tracking-[0.05em] uppercase rounded-full transition-all duration-300 ring-1 ring-inset active:scale-[0.97] ${
                isDarkTheme
                  ? 'text-[#f5efe3] bg-white/10 hover:bg-white/20 ring-white/25 shadow-sm'
                  : 'text-[#4a5a22] bg-[#4a5a22]/10 hover:bg-[#4a5a22]/20 ring-[#4a5a22]/30 shadow-sm'
              }`}
            >
              <span>{t('nav.apoyaCGA')}</span>
            </Link>

            <Link
              to="/contacto"
              className={`group hidden sm:inline-flex h-8.5 md:h-9 items-center justify-center rounded-full px-3.5 sm:px-4 xl:px-4.5 font-sans text-[11px] xl:text-[12px] font-semibold tracking-[0.06em] uppercase transition-all duration-500 ease-out active:scale-[0.97] ring-1 ring-inset ${
                isDarkTheme
                  ? isScrolled
                    ? 'bg-[#4a5a22] text-[#f5efe3] ring-white/15 shadow-[0_8px_24px_-10px_rgba(74,90,34,0.6)] hover:bg-[#5a6b2a]'
                    : 'bg-[#a8bc65]/20 text-[#f5efe3] ring-1 ring-white/20 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.5)] hover:bg-[#a8bc65]/35 backdrop-blur-md'
                  : isScrolled
                    ? 'bg-[#4a5a22] text-[#f5efe3] ring-[#f5efe3]/15 shadow-[0_8px_24px_-10px_rgba(74,90,34,0.5)] hover:bg-[#5a6b2a]'
                    : 'bg-[#2d2618] text-[#f5efe3] ring-transparent shadow-[0_4px_16px_-6px_rgba(45,38,24,0.4)] hover:bg-[#3a3423]'
              }`}
            >
              <span>{t('nav.contacto')}</span>
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border backdrop-blur-md active:scale-90 transition-all duration-200 focus:outline-none ${
                isDarkTheme
                  ? 'border-white/20 bg-black/45 text-white hover:bg-black/60'
                  : 'border-[#d8ceb6]/70 bg-[#f5efe3]/80 text-[#2d2618] hover:bg-[#f5efe3]'
              }`}
              aria-label={mobileMenuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
              aria-expanded={mobileMenuOpen}
            >
              <motion.span animate={mobileMenuOpen ? { rotate: 45 } : { rotate: 0 }} className="flex flex-col items-center justify-center gap-[5px]" transition={{ duration: 0.3, ease: EASE_LUX }}>
                <motion.span animate={mobileMenuOpen ? { y: 3.5, width: 16 } : { y: 0, width: 16 }} className="block h-[1.5px] bg-current" style={{ width: 16 }} />
                <motion.span animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="block h-[1.5px] bg-current" style={{ width: 16 }} />
                <motion.span animate={mobileMenuOpen ? { y: -3.5, width: 16 } : { y: 0, width: 16 }} className="block h-[1.5px] bg-current" style={{ width: 16 }} />
              </motion.span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen overlay con arquitectura agrupada */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_LUX }}
            className="fixed inset-0 z-40 bg-[#f5efe3]/98 backdrop-blur-2xl lg:hidden flex flex-col justify-start overflow-y-auto"
          >
            <div className="px-6 sm:px-10 pt-24 pb-16 flex flex-col gap-6 font-sans min-h-full justify-between">
              <div className="flex flex-col gap-5">
                {/* 01. EL CONSEJO */}
                <div className="border-b border-[#d8ceb6]/40 pb-3">
                  <div className="flex items-baseline gap-3 text-xs uppercase font-bold tracking-widest text-[#4a5a22] mb-2">
                    <span>01</span>
                    <span>{t('nav.consejo')}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-6">
                    {CONSEJO_LINKS.map((l) => (
                      <Link
                        key={l.to}
                        to={l.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm text-[#2d2618] hover:text-[#4a5a22] py-1 font-medium transition-colors"
                      >
                        {t(l.labelKey)}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 02. NUESTRA ACCIÓN */}
                <div className="border-b border-[#d8ceb6]/40 pb-3">
                  <div className="flex items-baseline gap-3 text-xs uppercase font-bold tracking-widest text-[#4a5a22] mb-2">
                    <span>02</span>
                    <span>{t('nav.nuestraAccion')}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-6">
                    {ACCION_LINKS.map((l) => (
                      <Link
                        key={l.to}
                        to={l.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm text-[#2d2618] hover:text-[#4a5a22] py-1 font-medium transition-colors"
                      >
                        {t(l.labelKey)}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 03. PRESENCIA GLOBAL */}
                <Link
                  to="/presencia-global"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between border-b border-[#d8ceb6]/40 pb-2.5 text-lg font-medium text-[#2d2618]"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="text-[10px] tracking-widest text-[#8a7e68] font-bold">03</span>
                    <span>{t('nav.presenciaGlobal')}</span>
                  </span>
                  <span className="text-sm opacity-40">&rarr;</span>
                </Link>

                {/* 04. CAPACITACIÓN */}
                <Link
                  to="/capacitacion"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between border-b border-[#d8ceb6]/40 pb-2.5 text-lg font-medium text-[#2d2618]"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="text-[10px] tracking-widest text-[#8a7e68] font-bold">04</span>
                    <span>{t('nav.capacitacion')}</span>
                  </span>
                  <span className="text-sm opacity-40">&rarr;</span>
                </Link>

                {/* 05. COMUNICACIÓN */}
                <Link
                  to="/comunicacion"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between border-b border-[#d8ceb6]/40 pb-2.5 text-lg font-medium text-[#2d2618]"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="text-[10px] tracking-widest text-[#8a7e68] font-bold">05</span>
                    <span>{t('nav.comunicacion')}</span>
                  </span>
                  <span className="text-sm opacity-40">&rarr;</span>
                </Link>
              </div>

              <div className="mt-6 pt-3 flex flex-col gap-3">
                {/* ─── REDES SOCIALES INSTITUCIONALES (MOBILE) ─── */}
                <div className="border-t border-[#d8ceb6]/40 pt-4 pb-1">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs uppercase font-bold tracking-widest text-[#4a5a22] font-sans">
                      {t('nav.redesSociales') || 'Redes Sociales'}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#7a6e58] font-medium font-sans">
                      Canales Oficiales
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {DIRECT_SOCIAL_NETWORKS.map((s) => (
                      <a
                        key={s.id}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={s.title}
                        aria-label={s.title}
                        className="group flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl bg-white/75 border border-[#d8ceb6]/60 text-[#3a3020] hover:text-[#4a5a22] hover:bg-white active:scale-95 transition-all shadow-xs"
                      >
                        <span className="w-5 h-5 flex items-center justify-center transition-transform duration-200 group-hover:scale-115">
                          <SocialIcon id={s.id} className="w-4 h-4 fill-current" />
                        </span>
                        <span className="text-[10px] font-semibold tracking-tight text-center truncate max-w-full px-0.5">
                          {s.shortName}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#d8ceb6]/40 pt-3 pb-1">
                  <span className="text-xs text-[#7a6e58] uppercase font-semibold tracking-wider font-sans">
                    {t('nav.idioma') || 'Idioma'}
                  </span>
                  <div className="flex items-center gap-1.5 font-sans">
                    <button
                      type="button"
                      onClick={() => setLang('es')}
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        lang === 'es'
                          ? 'bg-[#4a5a22] text-[#f5efe3] shadow-xs'
                          : 'bg-[#eae3d2] text-[#7a6e58] hover:bg-[#ded5c0]'
                      }`}
                    >
                      ES
                    </button>
                    <button
                      type="button"
                      onClick={() => setLang('en')}
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        lang === 'en'
                          ? 'bg-[#4a5a22] text-[#f5efe3] shadow-xs'
                          : 'bg-[#eae3d2] text-[#7a6e58] hover:bg-[#ded5c0]'
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>

                <Link
                  to="/apoya"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-3 rounded-full border border-[#4a5a22] text-[#4a5a22] py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#4a5a22]/10 active:scale-[0.98] transition-all"
                >
                  <span>{t('nav.apoyaCGA')}</span>
                </Link>

                <Link
                  to="/contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[#4a5a22] py-3.5 sm:py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#f5efe3] active:scale-[0.98] transition-all duration-200 shadow-lg"
                >
                  <span>{t('nav.contacto')}</span>
                  <span>&rarr;</span>
                </Link>
                <p className="mt-2 text-center text-[10px] uppercase tracking-[0.2em] text-[#7a6e58] font-sans">
                  {t('brand.name')} &middot; 2026
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}