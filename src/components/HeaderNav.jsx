import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { useI18n } from '../i18n/index.jsx';
import LanguageSwitch from '../i18n/LanguageSwitch.jsx';

const EASE_LUX = [0.16, 1, 0.3, 1];
const EASE_SPRING = { type: 'spring', stiffness: 340, damping: 30 };

const NAV_DEBOUNCE = 300;

const CONSEJO_LINKS = [
  { to: '/nosotros', labelKey: 'nav.quienesSomos', subKey: 'navSub.quienesSomos' },
  { to: '/gobernanza', labelKey: 'nav.gobernanza', subKey: 'navSub.gobernanza' },
  { to: '/asamblea-anual', labelKey: 'nav.asambleaAnual', subKey: 'navSub.asambleaAnual' },
];

const ACCION_LINKS = [
  { to: '/lineas-estrategicas', labelKey: 'nav.lineasEstrategicas', subKey: 'navSub.lineasEstrategicas' },
  { to: '/proyectos', labelKey: 'nav.proyectos', subKey: 'navSub.proyectos' },
  { to: '/agenda-2030', labelKey: 'nav.agenda2030', subKey: 'navSub.agenda2030' },
];

const ACTIVE_ROUTES_CONSEJO = ['/nosotros', '/quienes-somos', '/gobernanza', '/asamblea-anual'];
const ACTIVE_ROUTES_ACCION = ['/lineas-estrategicas', '/proyectos', '/agenda-2030'];

function Dropdown({ open, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.25, ease: EASE_LUX }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[250px] overflow-hidden rounded-2xl border border-[#d8ceb6] bg-[#f5efe3] p-2 shadow-[0_24px_50px_-24px_rgba(45,38,24,0.4)] z-50 origin-top"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DropdownItem({ to, label, sub, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay, ease: EASE_LUX }}
    >
      <Link
        to={to}
        className="group flex items-center justify-between gap-4 rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-[#4a5a22]/8"
      >
        <span>
          <span className="block text-[13px] font-medium text-[#4a5340] group-hover:text-[#2d2618] transition-colors duration-200">{label}</span>
          {sub && <span className="mt-0.5 block text-[11px] font-light text-[#8a7e68]">{sub}</span>}
        </span>
        <span className="translate-x-[-4px] text-[#4a5a22] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">&rarr;</span>
      </Link>
    </motion.div>
  );
}

function NavLink({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`group relative inline-flex h-9 shrink-0 items-center px-1.5 xl:px-2.5 font-sans text-[12.5px] xl:text-[13px] font-medium tracking-[0.03em] whitespace-nowrap transition-colors duration-300 ${
        active ? 'text-[#3a4a18] font-semibold' : 'text-[#5c523e] hover:text-[#2d2618]'
      }`}
    >
      <span>{label}</span>
    </Link>
  );
}

function DropdownTrigger({ label, open, onClick, active = false }) {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex h-9 shrink-0 items-center gap-1 xl:gap-1.5 px-1.5 xl:px-2.5 whitespace-nowrap font-sans text-[12.5px] xl:text-[13px] font-medium tracking-[0.03em] transition-colors duration-300 active:scale-[0.98] ${
        open || active ? 'text-[#3a4a18] font-semibold' : 'text-[#5c523e] hover:text-[#2d2618]'
      }`}
    >
      <span>{label}</span>
      <motion.span
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.3, ease: EASE_LUX }}
        className="text-[10px] opacity-60"
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
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const openTimerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const location = useLocation();

  const scrollY = useMotionValue(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-[top,width,height,border-radius,padding,background-color,border-color,box-shadow] duration-500 ease-out text-[#2d2618] ${
          isModalOpen ? 'pointer-events-none' : ''
        } ${
          isScrolled
            ? 'top-3 md:top-4 w-[94%] max-w-6xl h-[60px] md:h-[64px] rounded-full px-4 sm:px-6 md:px-8 bg-[#f5efe3]/90 backdrop-blur-2xl backdrop-saturate-150 border border-[#d8ceb6]/85 shadow-[0_18px_45px_-16px_rgba(45,38,24,0.32)] ring-1 ring-inset ring-white/40'
            : 'top-0 w-full max-w-none h-[76px] md:h-[80px] rounded-none px-6 sm:px-10 lg:px-12 xl:px-16 bg-gradient-to-b from-[#f5efe3]/95 via-[#f5efe3]/75 to-transparent border-0 border-transparent shadow-none'
        } ${!isLoaded ? 'pointer-events-none' : ''}`}
      >
        <div className="mx-auto flex w-full h-full items-center justify-between gap-3 sm:gap-6">
          {/* Cluster izquierdo: logo */}
          <div className="flex items-center gap-4 min-w-0 flex-shrink-0">
            <Link
              to="/"
              className="group flex items-center flex-shrink-0 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
              aria-label={t('a11y.home')}
            >
              <img
                src="/logos/logo-cga-header.webp"
                alt={t('brand.name') || 'Consejo Global Ambiental'}
                className={`w-auto object-contain drop-shadow-none transition-all duration-500 ease-out group-hover:scale-[1.04] ${
                  isScrolled ? 'h-[38px] md:h-[42px]' : 'h-[50px] md:h-[56px] lg:h-[58px]'
                }`}
              />
            </Link>
          </div>

          {/* Navegación central (desktop) */}
          <nav
            className="hidden lg:flex items-center gap-2 xl:gap-4 2xl:gap-6 flex-shrink-0"
            onMouseLeave={scheduleClose}
          >
            <div onMouseEnter={() => openMenu(null)}>
              <NavLink to="/" label={t('nav.home')} active={location.pathname === '/'} />
            </div>

            <div className="relative" onMouseEnter={() => openMenu('consejo')}>
              <DropdownTrigger
                label={t('nav.consejo')}
                open={openDropdown === 'consejo'}
                active={isConsejoActive}
                onClick={() => setOpenDropdown(openDropdown === 'consejo' ? null : 'consejo')}
              />
              <Dropdown open={openDropdown === 'consejo'}>
                {CONSEJO_LINKS.map((l, i) => (
                  <DropdownItem
                    key={l.to}
                    to={l.to}
                    label={t(l.labelKey)}
                    sub={t(l.subKey)}
                    delay={0.04 * i}
                  />
                ))}
              </Dropdown>
            </div>

            <div className="relative" onMouseEnter={() => openMenu('accion')}>
              <DropdownTrigger
                label={t('nav.accion')}
                open={openDropdown === 'accion'}
                active={isAccionActive}
                onClick={() => setOpenDropdown(openDropdown === 'accion' ? null : 'accion')}
              />
              <Dropdown open={openDropdown === 'accion'}>
                {ACCION_LINKS.map((l, i) => (
                  <DropdownItem
                    key={l.to}
                    to={l.to}
                    label={t(l.labelKey)}
                    sub={t(l.subKey)}
                    delay={0.04 * i}
                  />
                ))}
              </Dropdown>
            </div>

            <NavLink to="/presencia-global" label={t('nav.presenciaGlobal')} active={location.pathname === '/presencia-global'} />
            <NavLink to="/conocimiento" label={t('nav.conocimiento')} active={location.pathname === '/conocimiento'} />
          </nav>

          {/* Acciones derecha */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <LanguageSwitch />

            <Link
              to="/contacto"
              className={`group hidden sm:inline-flex h-9 items-center gap-2.5 rounded-full px-4 xl:px-5 font-sans text-[11px] lg:text-[12px] font-semibold tracking-[0.12em] uppercase transition-all duration-500 ease-out active:scale-[0.97] ring-1 ring-inset ${
                isScrolled
                  ? 'bg-[#4a5a22] text-[#f5efe3] ring-[#f5efe3]/15 shadow-[0_8px_24px_-10px_rgba(74,90,34,0.5)] hover:bg-[#5a6b2a]'
                  : 'bg-[#2d2618] text-[#f5efe3] ring-transparent shadow-[0_4px_16px_-6px_rgba(45,38,24,0.4)] hover:bg-[#3a3423]'
              }`}
            >
              <span>{t('nav.contacto')}</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#d8ceb6]/70 bg-[#f5efe3]/80 text-[#2d2618] backdrop-blur-md active:scale-90 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a5a22]/50"
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

      {/* Mobile full-screen overlay con numeración editorial */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_LUX }}
            className="fixed inset-0 z-40 bg-[#f5efe3]/98 backdrop-blur-2xl lg:hidden flex flex-col justify-start overflow-y-auto"
          >
            <div className="px-6 sm:px-10 pt-24 pb-16 flex flex-col gap-1 font-sans min-h-full justify-between">
              <div className="flex flex-col gap-1">
                {[
                  { to: '/', labelKey: 'nav.home', num: '01' },
                  { to: '/nosotros', labelKey: 'nav.quienesSomos', num: '02' },
                  { to: '/gobernanza', labelKey: 'nav.gobernanza', num: '03' },
                  { to: '/asamblea-anual', labelKey: 'nav.asambleaAnual', num: '04' },
                  { to: '/lineas-estrategicas', labelKey: 'nav.lineasEstrategicas', num: '05' },
                  { to: '/proyectos', labelKey: 'nav.proyectos', num: '06' },
                  { to: '/agenda-2030', labelKey: 'nav.agenda2030', num: '07' },
                  { to: '/presencia-global', labelKey: 'nav.presenciaGlobal', num: '08' },
                  { to: '/conocimiento', labelKey: 'nav.conocimiento', num: '09' },
                ].map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.04 * i, ease: EASE_LUX }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between border-b border-[#d8ceb6]/40 py-3.5 sm:py-4 font-sans text-[20px] sm:text-[24px] font-medium tracking-tight transition-colors duration-300 ${
                        location.pathname === l.to ? 'text-[#4a5a22]' : 'text-[#2d2618] hover:text-[#4a5a22]'
                      }`}
                    >
                      <span className="flex items-baseline gap-4 sm:gap-5 min-w-0">
                        <span className="font-sans text-[10px] tracking-[0.2em] text-[#8a7e68] not-italic tabular flex-shrink-0">{l.num}</span>
                        <span className="truncate">{t(l.labelKey)}</span>
                      </span>
                      <span className="text-base sm:text-lg opacity-40">&rarr;</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, delay: 0.4, ease: EASE_LUX }}
                className="mt-8 pt-4"
              >
                <Link
                  to="/contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[#4a5a22] py-3.5 sm:py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#f5efe3] active:scale-[0.98] transition-all duration-200 shadow-lg"
                >
                  <span>{t('nav.contacto')}</span>
                  <span>&rarr;</span>
                </Link>
                <p className="mt-5 text-center text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#7a6e58] font-sans">
                  {t('brand.name')} &middot; 2026
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}