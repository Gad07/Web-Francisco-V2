import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeaderNav({
  isLoaded = true,
  activeNav = 'hero',
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header
      id="main-nav"
      className={`fixed top-3 md:top-4 left-1/2 -translate-x-1/2 w-[94%] max-w-5xl z-50 px-4 md:px-6 h-[56px] md:h-[62px] rounded-full flex items-center justify-between transition-all duration-500 overflow-visible ${
        !isLoaded ? 'opacity-0 pointer-events-none -translate-y-8' : 'opacity-100 translate-y-0'
      } bg-[#f5efe3]/40 backdrop-blur-xl backdrop-saturate-150 border border-[#d8ceb6]/60 shadow-[0_4px_24px_rgba(45,38,24,0.06)] text-[#2d2618]`}
    >
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center flex-shrink-0 transition-transform duration-300 hover:scale-[1.03]"
      >
        <img
          src="/logos/Logo Bg transparente.svg"
          alt="Consejo Global Ambiental"
          className="h-[64px] md:h-[76px] w-auto object-contain drop-shadow-none"
        />
      </Link>

      {/* Navigation Links (Desktop) */}
      <nav className="hidden md:flex items-center gap-1.5 lg:gap-2.5 text-[12px] lg:text-[13px] tracking-[0.03em] font-sans font-medium">
        <Link
          to="/"
          className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
            location.pathname === '/'
              ? 'text-[#3a4a18] font-bold bg-[#4a5a22]/10'
              : 'text-[#6b6048] hover:text-[#2d2618] hover:bg-black/[0.03]'
          }`}
        >
          Inicio
        </Link>

        {/* Dropdown: El Consejo */}
        <div
          className="relative group"
          onMouseEnter={() => setOpenDropdown('consejo')}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <button
            onClick={() => toggleDropdown('consejo')}
            className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full transition-all duration-200 ${
              ['/nosotros', '/quienes-somos', '/gobernanza', '/asamblea-anual'].includes(location.pathname)
                ? 'text-[#3a4a18] font-bold bg-[#4a5a22]/10'
                : 'text-[#6b6048] hover:text-[#2d2618] hover:bg-black/[0.03]'
            }`}
          >
            <span>El Consejo</span>
            <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <AnimatePresence>
            {openDropdown === 'consejo' && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#f5efe3]/90 backdrop-blur-2xl border border-[#d8ceb6] rounded-2xl py-2 w-52 shadow-xl z-50 overflow-hidden"
              >
                <Link
                  to="/nosotros"
                  className="block px-4 py-2 text-xs text-[#6b6048] hover:text-[#2d2618] hover:bg-[#eae4d2]/80 transition-colors"
                >
                  Quiénes Somos
                </Link>
                <Link
                  to="/gobernanza"
                  className="block px-4 py-2 text-xs text-[#6b6048] hover:text-[#2d2618] hover:bg-[#eae4d2]/80 transition-colors"
                >
                  Gobernanza & Equipo
                </Link>
                <Link
                  to="/asamblea-anual"
                  className="block px-4 py-2 text-xs text-[#6b6048] hover:text-[#2d2618] hover:bg-[#eae4d2]/80 transition-colors"
                >
                  Asamblea Anual
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dropdown: Acción & Estrategias */}
        <div
          className="relative group"
          onMouseEnter={() => setOpenDropdown('accion')}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <button
            onClick={() => toggleDropdown('accion')}
            className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full transition-all duration-200 ${
              ['/lineas-estrategicas', '/proyectos', '/agenda-2030'].includes(location.pathname)
                ? 'text-[#3a4a18] font-bold bg-[#4a5a22]/10'
                : 'text-[#6b6048] hover:text-[#2d2618] hover:bg-black/[0.03]'
            }`}
          >
            <span>Acción & Estrategias</span>
            <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <AnimatePresence>
            {openDropdown === 'accion' && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#f5efe3]/90 backdrop-blur-2xl border border-[#d8ceb6] rounded-2xl py-2 w-56 shadow-xl z-50 overflow-hidden"
              >
                <Link
                  to="/lineas-estrategicas"
                  className="block px-4 py-2 text-xs text-[#6b6048] hover:text-[#2d2618] hover:bg-[#eae4d2]/80 transition-colors"
                >
                  Líneas Estratégicas
                </Link>
                <Link
                  to="/proyectos"
                  className="block px-4 py-2 text-xs text-[#6b6048] hover:text-[#2d2618] hover:bg-[#eae4d2]/80 transition-colors"
                >
                  Proyectos & Impacto WESS
                </Link>
                <Link
                  to="/agenda-2030"
                  className="block px-4 py-2 text-xs text-[#6b6048] hover:text-[#2d2618] hover:bg-[#eae4d2]/80 transition-colors"
                >
                  Agenda 2030 & ODS
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link
          to="/presencia-global"
          className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
            location.pathname === '/presencia-global'
              ? 'text-[#3a4a18] font-bold bg-[#4a5a22]/10'
              : 'text-[#6b6048] hover:text-[#2d2618] hover:bg-black/[0.03]'
          }`}
        >
          Presencia Global
        </Link>

        <Link
          to="/conocimiento"
          className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
            location.pathname === '/conocimiento'
              ? 'text-[#3a4a18] font-bold bg-[#4a5a22]/10'
              : 'text-[#6b6048] hover:text-[#2d2618] hover:bg-black/[0.03]'
          }`}
        >
          Conocimiento
        </Link>
      </nav>

      {/* Botones de acción derecha: Contacto */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          to="/contacto"
          className="flex items-center gap-1.5 bg-[#4a5a22] hover:bg-[#3a4a18] text-[#f5efe3] text-[11px] md:text-[12px] font-semibold tracking-[0.12em] uppercase px-5 py-2.5 rounded-full transition-all duration-200 group flex-shrink-0 shadow-sm"
        >
          <span>Contacto</span>
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
        </Link>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#2d2618] focus:outline-none"
          aria-label="Menú"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 mt-3 bg-[#f5efe3]/95 backdrop-blur-2xl border border-[#d8ceb6] rounded-3xl p-6 shadow-2xl z-50 flex flex-col gap-4 text-left font-sans"
          >
            <Link to="/" className="text-sm font-semibold text-[#2d2618]">Inicio</Link>
            
            <div className="border-t border-[#d8ceb6]/60 pt-3 flex flex-col gap-2">
              <div className="text-xs uppercase tracking-widest text-[#5a6b2a] font-bold">El Consejo</div>
              <Link to="/nosotros" className="text-sm text-[#6b6048] pl-2 hover:text-[#2d2618]">Quiénes Somos</Link>
              <Link to="/gobernanza" className="text-sm text-[#6b6048] pl-2 hover:text-[#2d2618]">Gobernanza</Link>
              <Link to="/asamblea-anual" className="text-sm text-[#6b6048] pl-2 hover:text-[#2d2618]">Asamblea Anual</Link>
            </div>

            <div className="border-t border-[#d8ceb6]/60 pt-3 flex flex-col gap-2">
              <div className="text-xs uppercase tracking-widest text-[#5a6b2a] font-bold">Acción</div>
              <Link to="/lineas-estrategicas" className="text-sm text-[#6b6048] pl-2 hover:text-[#2d2618]">Líneas Estratégicas</Link>
              <Link to="/proyectos" className="text-sm text-[#6b6048] pl-2 hover:text-[#2d2618]">Proyectos e Impacto WESS</Link>
              <Link to="/agenda-2030" className="text-sm text-[#6b6048] pl-2 hover:text-[#2d2618]">Agenda 2030 y ODS</Link>
            </div>

            <div className="border-t border-[#d8ceb6]/60 pt-3 flex flex-col gap-3">
              <Link to="/presencia-global" className="text-sm text-[#6b6048] hover:text-[#2d2618]">Presencia Global</Link>
              <Link to="/conocimiento" className="text-sm text-[#6b6048] hover:text-[#2d2618]">Conocimiento</Link>
              <Link to="/contacto" className="w-full text-center py-3 rounded-full text-xs uppercase tracking-widest font-bold text-[#f5efe3] bg-[#4a5a22] mt-2 shadow-sm">
                Contacto
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
