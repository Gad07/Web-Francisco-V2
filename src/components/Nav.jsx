import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../imports/Logo.png';

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'pt-3 px-4' : 'pt-5 px-6 md:px-12'
      }`}
    >
      <nav
        className={`mx-auto flex items-center justify-between transition-all duration-500 ${
          isScrolled
            ? 'max-w-6xl bg-black/75 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2.5 shadow-2xl'
            : 'max-w-7xl bg-transparent border-transparent px-2 py-2'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center cursor-pointer group relative">
          <img
            src={logoImg}
            alt="Consejo Global Ambiental"
            className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-7">
          <Link
            to="/"
            className={`text-xs uppercase tracking-[0.18em] font-medium transition-colors duration-300 ${
              isActive('/') ? 'text-[#a3e635]' : 'text-white/80 hover:text-white'
            }`}
          >
            Inicio
          </Link>

          {/* Dropdown: El Consejo */}
          <div className="relative group">
            <button
              className={`flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-medium transition-colors duration-300 py-1 ${
                ['/quienes-somos', '/gobernanza', '/asamblea-anual'].includes(location.pathname)
                  ? 'text-[#a3e635]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <span>El Consejo</span>
              <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-neutral-950/95 backdrop-blur-2xl border border-white/15 rounded-2xl py-2.5 w-52 shadow-2xl">
              <Link
                to="/quienes-somos"
                className="block px-5 py-2.5 text-xs tracking-wider text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                Quiénes Somos
              </Link>
              <Link
                to="/gobernanza"
                className="block px-5 py-2.5 text-xs tracking-wider text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                Gobernanza
              </Link>
              <Link
                to="/asamblea-anual"
                className="block px-5 py-2.5 text-xs tracking-wider text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                Asamblea Anual
              </Link>
            </div>
          </div>

          {/* Dropdown: Acción */}
          <div className="relative group">
            <button
              className={`flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-medium transition-colors duration-300 py-1 ${
                ['/lineas-estrategicas', '/proyectos', '/agenda-2030'].includes(location.pathname)
                  ? 'text-[#a3e635]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <span>Acción</span>
              <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-neutral-950/95 backdrop-blur-2xl border border-white/15 rounded-2xl py-2.5 w-60 shadow-2xl">
              <Link
                to="/lineas-estrategicas"
                className="block px-5 py-2.5 text-xs tracking-wider text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                Líneas Estratégicas
              </Link>
              <Link
                to="/proyectos"
                className="block px-5 py-2.5 text-xs tracking-wider text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                Proyectos e Impacto
              </Link>
              <Link
                to="/agenda-2030"
                className="block px-5 py-2.5 text-xs tracking-wider text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                Agenda 2030 y ODS
              </Link>
            </div>
          </div>

          <Link
            to="/presencia-global"
            className={`text-xs uppercase tracking-[0.18em] font-medium transition-colors duration-300 ${
              isActive('/presencia-global') ? 'text-[#a3e635]' : 'text-white/80 hover:text-white'
            }`}
          >
            Presencia Global
          </Link>

          <Link
            to="/conocimiento"
            className={`text-xs uppercase tracking-[0.18em] font-medium transition-colors duration-300 ${
              isActive('/conocimiento') ? 'text-[#a3e635]' : 'text-white/80 hover:text-white'
            }`}
          >
            Conocimiento
          </Link>

          {/* CTA: Contacto */}
          <Link
            to="/contacto"
            className="ml-3 relative inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.18em] font-semibold text-black bg-[#85C441] hover:bg-[#96d552] transition-all duration-300 shadow-[0_0_20px_rgba(133,196,65,0.4)] hover:shadow-[0_0_30px_rgba(133,196,65,0.7)] hover:scale-105"
          >
            Contacto
          </Link>
        </div>

        {/* Mobile menu trigger button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-white/90 hover:text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 bg-neutral-950/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-2xl z-50 flex flex-col gap-4 text-left">
          <Link to="/" className="text-sm uppercase tracking-wider text-slate-200 hover:text-[#a3e635]">Inicio</Link>
          <div className="border-t border-white/10 pt-3 flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">El Consejo</span>
            <Link to="/quienes-somos" className="text-sm tracking-wider text-slate-300 pl-3 hover:text-white">Quiénes Somos</Link>
            <Link to="/gobernanza" className="text-sm tracking-wider text-slate-300 pl-3 hover:text-white">Gobernanza</Link>
            <Link to="/asamblea-anual" className="text-sm tracking-wider text-slate-300 pl-3 hover:text-white">Asamblea Anual</Link>
          </div>
          <div className="border-t border-white/10 pt-3 flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Acción</span>
            <Link to="/lineas-estrategicas" className="text-sm tracking-wider text-slate-300 pl-3 hover:text-white">Líneas Estratégicas</Link>
            <Link to="/proyectos" className="text-sm tracking-wider text-slate-300 pl-3 hover:text-white">Proyectos e Impacto</Link>
            <Link to="/agenda-2030" className="text-sm tracking-wider text-slate-300 pl-3 hover:text-white">Agenda 2030 y ODS</Link>
          </div>
          <div className="border-t border-white/10 pt-3 flex flex-col gap-3">
            <Link to="/presencia-global" className="text-sm uppercase tracking-wider text-slate-200 hover:text-[#a3e635]">Presencia Global</Link>
            <Link to="/conocimiento" className="text-sm uppercase tracking-wider text-slate-200 hover:text-[#a3e635]">Conocimiento</Link>
            <Link to="/contacto" className="w-full text-center py-3 rounded-full text-xs uppercase tracking-widest font-bold text-black bg-[#85C441] mt-2">
              Contacto
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
